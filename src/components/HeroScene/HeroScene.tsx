import "./HeroScene.css";
import { useEffect, useRef } from "react";
import { createLoader60sAudio, playHoverSound } from "../../hooks/uiAudio.ts";
import { useTranslations } from "../../i18n";

type Props = {
  onEnter: () => void;
};

const LOADER_TARGET_VOLUME = 0.42;
const LOADER_FADE_IN_MS = 1800;
const LOADER_SOUND_SESSION_MS = 60000;
const LOADER_VIBRATION_INTERVAL_MS = 4200;
const LOADER_VIBRATION_PATTERN = [10, 70, 8];
const FEEDBACK_SETTINGS_KEY = "tm-feedback-settings";

export default function HeroScene({ onEnter }: Props) {
  const loaderSound = useRef(createLoader60sAudio());
  const sceneRef = useRef<HTMLElement | null>(null);
  const translations = useTranslations();
  const logoSrc = `${import.meta.env.BASE_URL}TMlogo.png`;

  useEffect(() => {
    const activeLoaderSound = loaderSound.current;
    let fadeFrameId = 0;
    let hasSessionStarted = false;
    let hasSessionStopped = false;
    let hasVibrationStarted = false;
    let stopTimeoutId: number | null = null;
    let vibrationIntervalId: number | null = null;

    const removeUnlockListeners = () => {
      document.removeEventListener("touchstart", unlockOnGesture, true);
      document.removeEventListener("pointerdown", unlockOnGesture, true);
      document.removeEventListener("keydown", unlockOnGesture, true);
    };

    const removeVibrationUnlockListeners = () => {
      document.removeEventListener("touchstart", vibrationUnlockOnGesture, true);
      document.removeEventListener("pointerdown", vibrationUnlockOnGesture, true);
      document.removeEventListener("keydown", vibrationUnlockOnGesture, true);
    };

    const isVibrationEnabled = () => {
      if (typeof window === "undefined") {
        return true;
      }

      const raw = window.localStorage.getItem(FEEDBACK_SETTINGS_KEY);

      if (!raw) {
        return true;
      }

      try {
        const parsed = JSON.parse(raw) as { vibrationEnabled?: boolean };
        return parsed.vibrationEnabled ?? true;
      } catch {
        return true;
      }
    };

    const stopSession = () => {
      if (hasSessionStopped) {
        return;
      }

      hasSessionStopped = true;

      if (stopTimeoutId !== null) {
        clearTimeout(stopTimeoutId);
        stopTimeoutId = null;
      }

      if (vibrationIntervalId !== null) {
        clearInterval(vibrationIntervalId);
        vibrationIntervalId = null;
      }

      removeVibrationUnlockListeners();

      if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
        navigator.vibrate(0);
      }

      activeLoaderSound?.pause();
    };

    const startAccompanyingVibration = () => {
      if (
        hasVibrationStarted ||
        typeof navigator === "undefined" ||
        typeof navigator.vibrate !== "function" ||
        !isVibrationEnabled()
      ) {
        return;
      }

      const didStart = navigator.vibrate(LOADER_VIBRATION_PATTERN);

      if (!didStart) {
        return;
      }

      hasVibrationStarted = true;
      removeVibrationUnlockListeners();

      vibrationIntervalId = window.setInterval(() => {
        navigator.vibrate(LOADER_VIBRATION_PATTERN);
      }, LOADER_VIBRATION_INTERVAL_MS);
    };

    const startSession = () => {
      if (hasSessionStarted) {
        return;
      }

      hasSessionStarted = true;
      startAccompanyingVibration();
      stopTimeoutId = window.setTimeout(stopSession, LOADER_SOUND_SESSION_MS);
    };

    function vibrationUnlockOnGesture() {
      startAccompanyingVibration();
    }

    document.addEventListener("touchstart", vibrationUnlockOnGesture, true);
    document.addEventListener("pointerdown", vibrationUnlockOnGesture, true);
    document.addEventListener("keydown", vibrationUnlockOnGesture, true);

    const fadeInLoader = () => {
      if (!activeLoaderSound) {
        return;
      }

      activeLoaderSound.volume = 0;
      const fadeStart = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - fadeStart) / LOADER_FADE_IN_MS, 1);
        const easedProgress = 0.5 - 0.5 * Math.cos(Math.PI * progress);
        activeLoaderSound.volume = LOADER_TARGET_VOLUME * easedProgress;

        if (progress < 1) {
          fadeFrameId = requestAnimationFrame(step);
        }
      };

      fadeFrameId = requestAnimationFrame(step);
    };

    const tryStartLoader = () => {
      if (!activeLoaderSound || hasSessionStopped) {
        return;
      }

      if (!activeLoaderSound.paused && activeLoaderSound.currentTime > 0) {
        startSession();
        removeUnlockListeners();
        return;
      }

      activeLoaderSound.currentTime = 0;
      const playResult = activeLoaderSound.play();

      if (playResult && typeof playResult.then === "function") {
        playResult.then(() => {
          startSession();
          fadeInLoader();
          removeUnlockListeners();
        }).catch(() => {});
        return;
      }

      startSession();
      fadeInLoader();
      removeUnlockListeners();
    };

    // Start the single 60-second loader soundtrack on the first screen.
    // If autoplay is blocked, the first user interaction unlocks playback.
    tryStartLoader();

    function unlockOnGesture() {
      tryStartLoader();
    }

    document.addEventListener("touchstart", unlockOnGesture, true);
    document.addEventListener("pointerdown", unlockOnGesture, true);
    document.addEventListener("keydown", unlockOnGesture, true);

    return () => {
      removeUnlockListeners();
      removeVibrationUnlockListeners();
      cancelAnimationFrame(fadeFrameId);
      stopSession();
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = scene.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
      const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

      scene.style.setProperty("--hero-x", `${offsetX * 18}px`);
      scene.style.setProperty("--hero-y", `${offsetY * 18}px`);
    };

    const handlePointerLeave = () => {
      scene.style.setProperty("--hero-x", "0px");
      scene.style.setProperty("--hero-y", "0px");
    };

    scene.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      scene.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const handleEnter = () => {
    onEnter();
  };

  return (
    <section ref={sceneRef} className="hero-scene">
      <div className="overlay" />

      <div className="grid" />

      <div className="glow glow1" />
      <div className="glow glow2" />
      <div className="glow glow3" />

      <div className="hero-content">
        <img className="hero-top-logo" src={logoSrc} alt="Turkuaz Machinery CA" />

        <div className="hero-copy">
          <p className="subtitle">{translations.heroEyebrow}</p>
          <h1>{translations.heroTitle}</h1>
          <p className="description">{translations.heroLead}</p>
        </div>

        <button
          data-feedback="primary"
          className="hero-enter premium-button"
          onMouseEnter={() => {
            playHoverSound();
          }}
          onClick={handleEnter}
        >
          {translations.heroEnter}
        </button>
      </div>
    </section>
  );
}