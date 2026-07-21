import { type FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { LEASING_QUIZ_URL } from "../../features/leasing/constants";
import { LeasingApiError, sendLeasingApplication } from "../../features/leasing/api";
import type { LeasingApplicationPayload, LeasingFieldErrors } from "../../features/leasing/types";
import "./LeasingApplicationModal.css";

type LeasingApplicationModalProps = {
  isOpen: boolean;
  model?: string;
  onClose: () => void;
};

type SubmissionState = "idle" | "loading" | "success" | "error";

const MODEL_PATTERN = /(LOVOL\s+(?:FR\d{3,4}F|FW\d{2,3}F|FR\d{3,4}[A-Z]?|FL\d{3,4}[A-Z-]*|FB\d+[A-Z]?|FT\s?\d+))/i;

const LEASING_COSTS: Record<string, string> = {
  "LOVOL FR315F": "По запросу",
  "LOVOL FR335F": "По запросу",
  "LOVOL FR375F": "По запросу",
  "LOVOL FR560F": "По запросу",
  "LOVOL FW215F": "По запросу",
  default: "По запросу",
};

const inferMachineModel = (explicitModel?: string): string => {
  if (explicitModel && explicitModel.trim().length > 0) {
    return explicitModel.trim();
  }

  const heading = document.querySelector("h1")?.textContent ?? "";
  const headingMatch = heading.match(MODEL_PATTERN);
  if (headingMatch?.[1]) {
    return headingMatch[1].toUpperCase().replace(/\s+/g, " ").trim();
  }

  const path = window.location.pathname.toUpperCase();
  const pathMatch = path.match(/(FR\d{3,4}F|FW\d{2,3}F|FL\d{3,4}[A-Z-]*|FB\d+[A-Z]?|FT\d+)/);
  if (pathMatch?.[1]) {
    return `LOVOL ${pathMatch[1]}`;
  }

  return "LOVOL FR315F";
};

const inferMachineCost = (model: string): string => {
  return LEASING_COSTS[model] ?? LEASING_COSTS.default;
};

const initialPayload = (model: string): LeasingApplicationPayload => ({
  model,
  cost: inferMachineCost(model),
  name: "",
  phone: "",
  company: "",
  city: "",
  comment: "",
  consent: false,
});

const validateForm = (payload: LeasingApplicationPayload): LeasingFieldErrors => {
  const errors: LeasingFieldErrors = {};

  if (!payload.name.trim()) {
    errors.name = "Укажите имя";
  }

  const phone = payload.phone.trim();
  if (!phone) {
    errors.phone = "Укажите телефон";
  } else if (!/^[0-9+()\-\s]{6,20}$/.test(phone)) {
    errors.phone = "Проверьте формат телефона";
  }

  if (!payload.consent) {
    errors.consent = "Подтвердите согласие";
  }

  return errors;
};

export default function LeasingApplicationModal({ isOpen, model, onClose }: LeasingApplicationModalProps) {
  const [form, setForm] = useState<LeasingApplicationPayload>(() => initialPayload(inferMachineModel(model)));
  const [errors, setErrors] = useState<LeasingFieldErrors>({});
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("Не удалось отправить заявку. Попробуйте ещё раз.");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && submissionState !== "loading") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, model, onClose, submissionState]);

  const isLoading = submissionState === "loading";
  const isSuccess = submissionState === "success";

  const setField = (field: keyof LeasingApplicationPayload, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "name" || field === "phone" || field === "consent") {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const openLeasingQuiz = () => {
    window.location.href = LEASING_QUIZ_URL;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading || isSuccess) {
      return;
    }

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmissionState("loading");
    setErrorMessage("Не удалось отправить заявку. Попробуйте ещё раз.");

    try {
      await sendLeasingApplication({
        ...form,
        name: form.name.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        city: form.city.trim(),
        comment: form.comment.trim(),
      });

      setSubmissionState("success");
      window.setTimeout(() => {
        openLeasingQuiz();
      }, 2000);
    } catch (error) {
      if (error instanceof LeasingApiError) {
        if (error.code === "misconfigured_endpoint") {
          setErrorMessage("Сервис временно недоступен: не настроен адрес Telegram Worker. Обратитесь к администратору.");
        } else if (error.code === "timeout") {
          setErrorMessage("Сервер не ответил вовремя. Проверьте интернет и попробуйте ещё раз.");
        } else if (error.code === "network") {
          setErrorMessage("Ошибка сети при отправке заявки. Проверьте подключение и попробуйте ещё раз.");
        } else {
          setErrorMessage("Не удалось отправить заявку в Telegram. Проверьте настройки бота и попробуйте ещё раз.");
        }
      }
      setSubmissionState("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="leasing-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          onClick={() => {
            if (!isLoading) {
              onClose();
            }
          }}
        >
          <motion.section
            className="leasing-modal"
            initial={{ opacity: 0, y: 36, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 22, scale: 0.985 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="leasing-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="leasing-modal-close"
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              disabled={isLoading}
            >
              <X size={18} />
            </button>

            <header className="leasing-modal-head">
              <h2 id="leasing-modal-title">Оформление заявки на лизинг</h2>
              <p>
                Заполните контактные данные. После отправки заявки вы автоматически будете перенаправлены на официальный сервис
                Halyk Leasing для продолжения оформления.
              </p>
            </header>

            <form className="leasing-modal-form" onSubmit={handleSubmit} noValidate>
              <label className="leasing-field">
                <span>Модель техники</span>
                <input type="text" value={form.model} readOnly />
              </label>

              <label className="leasing-field">
                <span>Стоимость</span>
                <input type="text" value={form.cost} readOnly />
              </label>

              <div className="leasing-grid">
                <label className={`leasing-field${errors.name ? " has-error" : ""}`}>
                  <span>Имя *</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setField("name", event.target.value)}
                    autoComplete="name"
                    disabled={isLoading || isSuccess}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <em>{errors.name}</em>}
                </label>

                <label className={`leasing-field${errors.phone ? " has-error" : ""}`}>
                  <span>Телефон *</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setField("phone", event.target.value)}
                    autoComplete="tel"
                    disabled={isLoading || isSuccess}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <em>{errors.phone}</em>}
                </label>

                <label className="leasing-field">
                  <span>Компания</span>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(event) => setField("company", event.target.value)}
                    autoComplete="organization"
                    disabled={isLoading || isSuccess}
                  />
                </label>

                <label className="leasing-field">
                  <span>Город</span>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(event) => setField("city", event.target.value)}
                    autoComplete="address-level2"
                    disabled={isLoading || isSuccess}
                  />
                </label>

                <label className="leasing-field leasing-field--full">
                  <span>Комментарий</span>
                  <textarea
                    className="leasing-textarea"
                    value={form.comment}
                    onChange={(event) => setField("comment", event.target.value)}
                    placeholder="Расскажите, какой срок и условия лизинга вам нужны"
                    disabled={isLoading || isSuccess}
                  />
                </label>
              </div>

              <label className={`leasing-consent${errors.consent ? " has-error" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) => setField("consent", event.target.checked)}
                  disabled={isLoading || isSuccess}
                />
                <span>Даю согласие на обработку персональных данных.</span>
              </label>
              {errors.consent && <p className="leasing-consentError">{errors.consent}</p>}

              {submissionState === "error" && (
                <p className="leasing-status leasing-status--error">{errorMessage}</p>
              )}

              {isSuccess && (
                <div className="leasing-status leasing-status--success" role="status" aria-live="polite">
                  <span className="leasing-successIcon" aria-hidden="true">
                    <CheckCircle2 size={34} />
                  </span>
                  <span>
                    ✅ Заявка успешно отправлена.
                    <br />
                    Наш менеджер уже получил вашу заявку.
                    <br />
                    Сейчас вы будете автоматически перенаправлены на официальный сайт Halyk Leasing для завершения оформления.
                  </span>
                </div>
              )}

              <button className="leasing-submit" type="submit" disabled={isLoading || isSuccess}>
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="leasing-spin" />
                    <span>Отправка заявки...</span>
                  </>
                ) : (
                  <span>Отправить</span>
                )}
              </button>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
