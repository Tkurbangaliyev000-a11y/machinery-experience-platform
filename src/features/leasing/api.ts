import type { LeasingApplicationPayload } from "./types";

const LEASING_WORKER_ENDPOINT = "https://machinery-platform-leasing.tmca-leasing.workers.dev";

type LeasingApiErrorCode = "misconfigured_endpoint" | "network" | "timeout" | "request_failed";

export class LeasingApiError extends Error {
  code: LeasingApiErrorCode;

  constructor(code: LeasingApiErrorCode, message?: string) {
    super(message ?? code);
    this.name = "LeasingApiError";
    this.code = code;
  }
}

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("timeout"));
    }, timeoutMs);

    promise
      .then((result) => {
        window.clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error: unknown) => {
        window.clearTimeout(timeoutId);
        reject(error);
      });
  });
};

export const sendLeasingApplication = async (payload: LeasingApplicationPayload): Promise<void> => {
  const endpoint = LEASING_WORKER_ENDPOINT;

  let response: Response;

  try {
    response = await withTimeout(
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
      15000,
    );
  } catch (error) {
    if (error instanceof Error && error.message === "timeout") {
      throw new LeasingApiError("timeout");
    }

    throw new LeasingApiError("network");
  }

  if (response.ok) {
    return;
  }

  let errorCode: string | undefined;

  try {
    const errorBody = (await response.json()) as { error?: string };
    errorCode = errorBody.error;
  } catch {
    errorCode = undefined;
  }

  if (errorCode === "telegram_not_configured") {
    throw new LeasingApiError("request_failed", "telegram_not_configured");
  }

  throw new LeasingApiError("request_failed");
};