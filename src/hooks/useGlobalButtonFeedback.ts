import { useEffect } from "react";

const INTERACTIVE_SELECTOR = 'button, a[href], [role="button"]';
const NORMAL_VIBRATION_PATTERN = [10, 14, 8];
const PRIMARY_VIBRATION_PATTERN = [16, 24, 12, 28, 10];
const VISUAL_FEEDBACK_CLASS = "feedback-pulse";
const ATTENTION_SELECTOR = INTERACTIVE_SELECTOR;
const VIEWPORT_ATTENTION_CLASS = "viewport-attention-highlight";
const ATTENTION_ANIMATION_DURATION_MS = 520;
const ATTENTION_BAND_TOP_RATIO = 0.35;
const ATTENTION_BAND_BOTTOM_RATIO = 0.65;
const ATTENTION_RETRIGGER_DELAY_MS = 220;

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

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observedElements = new Set<HTMLElement>();
    const inBandState = new WeakMap<HTMLElement, boolean>();
    const lastTriggerAt = new WeakMap<HTMLElement, number>();
    const resetTimers = new WeakMap<HTMLElement, number>();
    const activeAnimations = new WeakMap<HTMLElement, Animation>();
    let animationFrameId = 0;
    let isCheckScheduled = false;

    const clearResetTimer = (element: HTMLElement) => {
      const activeTimer = resetTimers.get(element);

      if (activeTimer !== undefined) {
        window.clearTimeout(activeTimer);
        resetTimers.delete(element);
      }
    };

    const triggerViewportAttention = (element: HTMLElement) => {
      clearResetTimer(element);

      const runningAnimation = activeAnimations.get(element);
      if (runningAnimation) {
        runningAnimation.cancel();
        activeAnimations.delete(element);
      }

      if (typeof element.animate === "function") {
        const animation = element.animate(
          [
            {
              transform: "scale(1.03)",
              boxShadow: "0 0 0 0 rgba(30, 187, 210, 0.85), 0 0 38px 8px rgba(30, 187, 210, 0.72)",
              offset: 0,
            },
            {
              transform: "scale(1.025)",
              boxShadow: "0 0 0 0 rgba(30, 187, 210, 0.62), 0 0 26px 4px rgba(30, 187, 210, 0.5)",
              offset: 0.4,
            },
            {
              transform: "scale(1)",
              boxShadow: "0 0 0 0 rgba(30, 187, 210, 0)",
              offset: 1,
            },
          ],
          {
            duration: ATTENTION_ANIMATION_DURATION_MS,
            easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          }
        );

        activeAnimations.set(element, animation);

        animation.addEventListener("finish", () => {
          if (activeAnimations.get(element) === animation) {
            activeAnimations.delete(element);
          }
        });

        animation.addEventListener("cancel", () => {
          if (activeAnimations.get(element) === animation) {
            activeAnimations.delete(element);
          }
        });

        return;
      }

      element.classList.remove(VIEWPORT_ATTENTION_CLASS);
      void element.offsetWidth;
      element.classList.add(VIEWPORT_ATTENTION_CLASS);

      const resetTimer = window.setTimeout(() => {
        element.classList.remove(VIEWPORT_ATTENTION_CLASS);
        resetTimers.delete(element);
      }, ATTENTION_ANIMATION_DURATION_MS);

      resetTimers.set(element, resetTimer);
    };

    const runBandCheck = () => {
      const viewportHeight = window.innerHeight;
      const bandTop = viewportHeight * ATTENTION_BAND_TOP_RATIO;
      const bandBottom = viewportHeight * ATTENTION_BAND_BOTTOM_RATIO;
      const now = Date.now();

      observedElements.forEach((element) => {
        if (!element.isConnected) {
          return;
        }

        const rect = element.getBoundingClientRect();
        const isInBand = rect.bottom > bandTop && rect.top < bandBottom;
        const wasInBand = inBandState.get(element) ?? false;

        if (isInBand && !wasInBand) {
          const lastAt = lastTriggerAt.get(element) ?? 0;

          if (now - lastAt >= ATTENTION_RETRIGGER_DELAY_MS) {
            triggerViewportAttention(element);
            lastTriggerAt.set(element, now);
          }
        }

        inBandState.set(element, isInBand);
      });
    };

    const scheduleBandCheck = () => {
      if (isCheckScheduled) {
        return;
      }

      isCheckScheduled = true;
      animationFrameId = window.requestAnimationFrame(() => {
        isCheckScheduled = false;
        runBandCheck();
      });
    };

    const observeElement = (element: HTMLElement) => {
      if (observedElements.has(element)) {
        return;
      }

      observedElements.add(element);
      inBandState.set(element, false);
      scheduleBandCheck();
    };

    const unobserveElement = (element: HTMLElement) => {
      if (!observedElements.has(element)) {
        return;
      }

      clearResetTimer(element);
      element.classList.remove(VIEWPORT_ATTENTION_CLASS);

      const runningAnimation = activeAnimations.get(element);
      if (runningAnimation) {
        runningAnimation.cancel();
        activeAnimations.delete(element);
      }

      observedElements.delete(element);
      inBandState.delete(element);
      lastTriggerAt.delete(element);
    };

    const collectElements = (root: ParentNode) => {
      root.querySelectorAll(ATTENTION_SELECTOR).forEach((node) => {
        if (node instanceof HTMLElement) {
          observeElement(node);
        }
      });
    };

    collectElements(document);
    scheduleBandCheck();

    const handleViewportActivity = () => {
      scheduleBandCheck();
    };

    window.addEventListener("scroll", handleViewportActivity, { passive: true, capture: true });
    window.addEventListener("wheel", handleViewportActivity, { passive: true });
    window.addEventListener("touchmove", handleViewportActivity, { passive: true });
    window.addEventListener("resize", handleViewportActivity, { passive: true });

    const mutationObserver = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) {
            return;
          }

          if (node instanceof HTMLElement && node.matches(ATTENTION_SELECTOR)) {
            observeElement(node);
            return;
          }

          collectElements(node);
          scheduleBandCheck();
        });

        record.removedNodes.forEach((node) => {
          if (!(node instanceof Element)) {
            return;
          }

          if (node instanceof HTMLElement && node.matches(ATTENTION_SELECTOR)) {
            unobserveElement(node);
            return;
          }

          node.querySelectorAll(ATTENTION_SELECTOR).forEach((child) => {
            if (child instanceof HTMLElement) {
              unobserveElement(child);
            }
          });

          scheduleBandCheck();
        });
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("scroll", handleViewportActivity, { capture: true });
      window.removeEventListener("wheel", handleViewportActivity);
      window.removeEventListener("touchmove", handleViewportActivity);
      window.removeEventListener("resize", handleViewportActivity);

      observedElements.forEach((element) => {
        clearResetTimer(element);
        element.classList.remove(VIEWPORT_ATTENTION_CLASS);

        const runningAnimation = activeAnimations.get(element);
        if (runningAnimation) {
          runningAnimation.cancel();
          activeAnimations.delete(element);
        }
      });

      observedElements.clear();
    };
  }, []);
}