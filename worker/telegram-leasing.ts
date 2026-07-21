type LeasingPayload = {
  model: string;
  cost: string;
  name: string;
  phone: string;
  company?: string;
  city?: string;
  comment?: string;
  consent: boolean;
};

type WorkerEnv = {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  ALLOWED_ORIGINS?: string;
};

const DEFAULT_CHAT_ID = "2054432621";
const SOURCE = "Каталог Turkuaz Machinery CA";

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

const getOrigin = (request: Request, env: WorkerEnv): string => {
  const origin = request.headers.get("Origin") ?? "";
  const configured = env.ALLOWED_ORIGINS?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];

  if (configured.length === 0) {
    return origin || "*";
  }

  if (origin && configured.includes(origin)) {
    return origin;
  }

  return configured[0];
};

const withCors = (response: Response, origin: string): Response => {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Vary", "Origin");
  return new Response(response.body, { status: response.status, headers });
};

const getText = (value: unknown): string => String(value ?? "").trim();

const normalizePayload = async (request: Request): Promise<LeasingPayload | null> => {
  try {
    const body = (await request.json()) as LeasingPayload;
    return {
      model: getText(body.model),
      cost: getText(body.cost),
      name: getText(body.name),
      phone: getText(body.phone),
      company: getText(body.company),
      city: getText(body.city),
      comment: getText(body.comment),
      consent: Boolean(body.consent),
    };
  } catch {
    return null;
  }
};

const validatePayload = (payload: LeasingPayload): string | null => {
  if (!payload.model) return "missing_model";
  if (!payload.cost) return "missing_cost";
  if (!payload.name) return "missing_name";
  if (!payload.phone || !/^[0-9+()\-\s]{6,20}$/.test(payload.phone)) return "invalid_phone";
  if (!payload.consent) return "missing_consent";
  return null;
};

const formatMessage = (payload: LeasingPayload): string => {
  const now = new Date();
  const date = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Almaty",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const time = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Asia/Almaty",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const comment = payload.comment ? payload.comment : "—";
  const company = payload.company || "—";
  const city = payload.city || "—";

  return [
    "🚜 <b>Новая заявка на лизинг</b>",
    "━━━━━━━━━━━━━━━━━━━━",
    `<b>Имя:</b> ${escapeHtml(payload.name)}`,
    `<b>Телефон:</b> ${escapeHtml(payload.phone)}`,
    `<b>Модель техники:</b> ${escapeHtml(payload.model)}`,
    `<b>Стоимость:</b> ${escapeHtml(payload.cost)}`,
    `<b>Комментарий:</b> ${escapeHtml(comment)}`,
    `<b>Компания:</b> ${escapeHtml(company)}`,
    `<b>Город:</b> ${escapeHtml(city)}`,
    `<b>Дата:</b> ${escapeHtml(date)}`,
    `<b>Время:</b> ${escapeHtml(time)}`,
    `<b>Источник:</b> ${SOURCE}`,
  ].join("\n");
};

const sendTelegramMessage = async (env: WorkerEnv, text: string): Promise<Response> => {
  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim() || DEFAULT_CHAT_ID;

  if (!token) {
    return json({ ok: false, error: "telegram_not_configured" }, 500);
  }

  const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    const raw = await telegramResponse.text();
    return json({ ok: false, error: "telegram_request_failed", details: raw }, 502);
  }

  const result = (await telegramResponse.json()) as { ok?: boolean };
  if (!result.ok) {
    return json({ ok: false, error: "telegram_request_failed" }, 502);
  }

  return json({ ok: true }, 200);
};

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const origin = getOrigin(request, env);

    if (request.method === "OPTIONS") {
      return withCors(json({ ok: true }), origin);
    }

    if (request.method !== "POST") {
      return withCors(json({ ok: false, error: "method_not_allowed" }, 405), origin);
    }

    const payload = await normalizePayload(request);
    if (!payload) {
      return withCors(json({ ok: false, error: "invalid_body" }, 400), origin);
    }

    const validationError = validatePayload(payload);
    if (validationError) {
      return withCors(json({ ok: false, error: validationError }, 400), origin);
    }

    const response = await sendTelegramMessage(env, formatMessage(payload));
    return withCors(response, origin);
  },
};
