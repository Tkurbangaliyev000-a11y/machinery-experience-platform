import { useEffect, useRef, useState } from "react";
import AppRouter from "./router";
import { useGlobalButtonFeedback } from "./hooks/useGlobalButtonFeedback";
import { getTranslations, LanguageProvider, type AppLanguage } from "./i18n";
import "./AppFeedbackControls.css";

const FEEDBACK_SETTINGS_KEY = "tm-feedback-settings";

type FeedbackSettings = {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  language: AppLanguage;
};

type IconProps = {
  active: boolean;
};

function supportsVibration() {
  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

function showsVibrationToggle() {
  return supportsVibration();
}

function SoundIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="feedback-controls__iconSvg">
      <path
        d="M5 10v4h4l5 4V6l-5 4H5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {active ? (
        <>
          <path d="M17 9a4 4 0 0 1 0 6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M19.8 6.8a7.2 7.2 0 0 1 0 10.4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </>
      ) : (
        <path d="M17 8 22 16M22 8l-5 8" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      )}
    </svg>
  );
}

function VibrationIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="feedback-controls__iconSvg">
      <rect
        x="7"
        y="4"
        width="10"
        height="16"
        rx="2.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" />
      {active ? (
        <>
          <path d="M4.5 9.2a4.2 4.2 0 0 0 0 5.6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M19.5 9.2a4.2 4.2 0 0 1 0 5.6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </>
      ) : (
        <path d="M6 6l12 12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      )}
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="feedback-controls__iconSvg">
      <path
        d="M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path
        d="m19.4 15.1 1.1 1.9-2.1 3.6-2.3-.6a7.8 7.8 0 0 1-1.7 1l-.4 2.3H10l-.4-2.3a7.8 7.8 0 0 1-1.7-1l-2.3.6L3.5 17l1.1-1.9a8.3 8.3 0 0 1 0-2.2L3.5 11l2.1-3.6 2.3.6a7.8 7.8 0 0 1 1.7-1L10 4.7h4l.4 2.3a7.8 7.8 0 0 1 1.7 1l2.3-.6 2.1 3.6-1.1 1.9c.1.4.1.7.1 1.1s0 .7-.1 1.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="feedback-controls__iconSvg">
      <path
        d="M12 3.2a8.8 8.8 0 1 0 0 17.6 8.8 8.8 0 0 0 0-17.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path d="M3.8 12h16.4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path
        d="M12 3.6c2.3 2.4 3.7 5.4 3.7 8.4s-1.4 6-3.7 8.4c-2.3-2.4-3.7-5.4-3.7-8.4s1.4-6 3.7-8.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function sanitizeLanguage(language: unknown): AppLanguage {
  if (language === "en" || language === "ru" || language === "kk") {
    return language;
  }

  return "ru";
}

function readFeedbackSettings(): FeedbackSettings {
  if (typeof window === "undefined") {
    return { soundEnabled: true, vibrationEnabled: true, language: "ru" };
  }

  const rawValue = window.localStorage.getItem(FEEDBACK_SETTINGS_KEY);

  if (!rawValue) {
    return { soundEnabled: true, vibrationEnabled: true, language: "ru" };
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<FeedbackSettings>;

    return {
      soundEnabled: parsed.soundEnabled ?? true,
      vibrationEnabled: parsed.vibrationEnabled ?? true,
      language: sanitizeLanguage(parsed.language),
    };
  } catch {
    return { soundEnabled: true, vibrationEnabled: true, language: "ru" };
  }
}

export default function App() {
  const [feedbackSettings, setFeedbackSettings] = useState<FeedbackSettings>(readFeedbackSettings);
  const [vibrationSupported] = useState(showsVibrationToggle);
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const controlsRef = useRef<HTMLElement | null>(null);
  const translations = getTranslations(feedbackSettings.language);
  const languageOptions: AppLanguage[] = ["en", "ru", "kk"];

  useGlobalButtonFeedback(feedbackSettings);

  useEffect(() => {
    window.localStorage.setItem(FEEDBACK_SETTINGS_KEY, JSON.stringify(feedbackSettings));
  }, [feedbackSettings]);

  useEffect(() => {
    if (!isControlsOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node) || controlsRef.current?.contains(target)) {
        return;
      }

      setIsControlsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsControlsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isControlsOpen]);

  const toggleSetting = (setting: keyof FeedbackSettings) => {
    if (setting === "language") {
      return;
    }

    setFeedbackSettings((current) => ({
      ...current,
      [setting]: !current[setting],
    }));
  };

  const setLanguage = (language: AppLanguage) => {
    setFeedbackSettings((current) => ({
      ...current,
      language,
    }));
  };

  return (
    <LanguageProvider language={feedbackSettings.language}>
      <AppRouter />

      <aside
        ref={controlsRef}
        className={`feedback-controls ${isControlsOpen ? "is-open" : ""}`}
        aria-label={translations.settingsPanelLabel}
      >
        <button
          type="button"
          className={`feedback-controls__launcher ${isControlsOpen ? "is-open" : ""}`}
          onClick={() => setIsControlsOpen((current) => !current)}
          aria-expanded={isControlsOpen}
          aria-controls="feedback-controls-panel"
          aria-label={isControlsOpen ? translations.closeSettings : translations.openSettings}
          data-feedback="none"
        >
          <GearIcon />
        </button>

        <div id="feedback-controls-panel" className="feedback-controls__panel">
          <div className="feedback-controls__header">
            <p className="feedback-controls__title">{translations.interfaceFeedback}</p>
            <span className="feedback-controls__badge">{translations.systemBadge}</span>
          </div>

          <div className="feedback-controls__grid">
            <button
              type="button"
              className={`feedback-controls__button ${feedbackSettings.soundEnabled ? "is-active" : ""}`}
              onClick={() => toggleSetting("soundEnabled")}
              aria-pressed={feedbackSettings.soundEnabled}
              data-feedback="none"
            >
              <span className="feedback-controls__icon" aria-hidden="true">
                <SoundIcon active={feedbackSettings.soundEnabled} />
              </span>
              <span className="feedback-controls__copy">
                <span className="feedback-controls__label">{translations.sound}</span>
                <span className="feedback-controls__hint">{translations.soundHint}</span>
              </span>
              <span className="feedback-controls__state">{feedbackSettings.soundEnabled ? translations.on : translations.off}</span>
            </button>

            {vibrationSupported && (
              <button
                type="button"
                className={`feedback-controls__button ${feedbackSettings.vibrationEnabled ? "is-active" : ""}`}
                onClick={() => toggleSetting("vibrationEnabled")}
                aria-pressed={feedbackSettings.vibrationEnabled}
                data-feedback="none"
              >
                <span className="feedback-controls__icon" aria-hidden="true">
                  <VibrationIcon active={feedbackSettings.vibrationEnabled} />
                </span>
                <span className="feedback-controls__copy">
                  <span className="feedback-controls__label">{translations.vibration}</span>
                  <span className="feedback-controls__hint">{translations.vibrationHint}</span>
                </span>
                <span className="feedback-controls__state">{feedbackSettings.vibrationEnabled ? translations.on : translations.off}</span>
              </button>
            )}

            <div className="feedback-controls__button feedback-controls__button--language" role="group" aria-label={translations.language}>
              <span className="feedback-controls__icon" aria-hidden="true">
                <LanguageIcon />
              </span>
              <span className="feedback-controls__copy">
                <span className="feedback-controls__label">{translations.language}</span>
                <span className="feedback-controls__hint">{translations.languageHint}</span>
              </span>
              <div className="feedback-controls__languageRow">
                {languageOptions.map((language) => (
                  <button
                    key={language}
                    type="button"
                    className={`feedback-controls__languageButton ${feedbackSettings.language === language ? "is-active" : ""}`}
                    onClick={() => setLanguage(language)}
                    aria-pressed={feedbackSettings.language === language}
                    data-feedback="none"
                  >
                    {language === "en" ? translations.english : language === "ru" ? translations.russian : translations.kazakh}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </LanguageProvider>
  );
}