import { useEffect } from "react";

const INTERACTIVE_SELECTOR = 'button, a[href], [role="button"]';
const NORMAL_VIBRATION_PATTERN = [10, 14, 8];
const PRIMARY_VIBRATION_PATTERN = [16, 24, 12, 28, 10];
const VISUAL_FEEDBACK_CLASS = "feedback-pulse";

type FeedbackSettings = {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
};

type FeedbackEvent = PointerEvent | TouchEvent | MouseEvent | KeyboardEvent;

function triggerVibration(pattern: number | number[]) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") {
    return false;
  }

  try {
    return navigator.vibrate(pattern);
  } catch {
    return false;
  }
}

function triggerVisualFeedback(element: Element) {
  if (!(element instanceof HTMLElement)) {
    return;
  }

  element.classList.remove(VISUAL_FEEDBACK_CLASS);
  void element.offsetWidth;
  element.classList.add(VISUAL_FEEDBACK_CLASS);

  window.setTimeout(() => {
    element.classList.remove(VISUAL_FEEDBACK_CLASS);
  }, 240);
}

function handleInteractiveFeedback(element: Element, settings: FeedbackSettings) {
  const feedbackType = element.getAttribute("data-feedback");

  if (feedbackType === "none") {
    return;
  }

  const usePrimaryFeedback = feedbackType === "primary";

  if (settings.vibrationEnabled) {
    const didVibrate = triggerVibration(usePrimaryFeedback ? PRIMARY_VIBRATION_PATTERN : NORMAL_VIBRATION_PATTERN);

    if (!didVibrate) {
      triggerVisualFeedback(element);
    }
  }

  // Click sounds are intentionally disabled; only haptic/visual feedback remains.
}

export function useGlobalButtonFeedback(settings: FeedbackSettings) {
  useEffect(() => {
    let lastInteractionKey = "";
    let lastInteractionAt = 0;

    const dispatchFeedback = (event: FeedbackEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const interactiveElement = target.closest(INTERACTIVE_SELECTOR);

      if (!interactiveElement) {
        return;
      }

      const interactionKey = `${interactiveElement.tagName}:${interactiveElement.getAttribute("aria-label") ?? interactiveElement.textContent?.trim() ?? ""}`;
      const now = Date.now();

      if (interactionKey === lastInteractionKey && now - lastInteractionAt < 340) {
        return;
      }

      lastInteractionKey = interactionKey;
      lastInteractionAt = now;

      handleInteractiveFeedback(interactiveElement, settings);
    };

    const handlePointerDown = (event: PointerEvent) => {
      dispatchFeedback(event);
    };

    const handleTouchStart = (event: TouchEvent) => {
      dispatchFeedback(event);
    };

    const handleClick = (event: MouseEvent) => {
      dispatchFeedback(event);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }

      dispatchFeedback(event);
    };

    document.addEventListener("pointerdown", handlePointerDown, { capture: true });
    document.addEventListener("touchstart", handleTouchStart, { capture: true, passive: true });
    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, { capture: true });
      document.removeEventListener("touchstart", handleTouchStart, { capture: true });
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [settings]);
}