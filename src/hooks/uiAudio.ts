type UiTone = {
  duration: number;
  frequency: number;
  frequencyEnd?: number;
  gain: number;
  type: OscillatorType;
};

type ClipConfig = {
  src: string;
  volume: number;
  playbackRate?: number;
  loop?: boolean;
};

let audioContext: AudioContext | null = null;
let clickAudio: HTMLAudioElement | null = null;
let primaryClickAudio: HTMLAudioElement | null = null;
let hoverAudio: HTMLAudioElement | null = null;

const FEEDBACK_SETTINGS_KEY = "tm-feedback-settings";
const BASE_URL = import.meta.env.BASE_URL;

function toPublicAssetUrl(path: string) {
  return `${BASE_URL}${path.replace(/^\/+/, "")}`;
}

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  const audioWindow = window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };
  const AudioContextCtor = audioWindow.AudioContext || audioWindow.webkitAudioContext;

  if (!AudioContextCtor) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextCtor();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  return audioContext;
}

function playTone(tone: UiTone) {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  const startTime = context.currentTime;
  const endFrequency = tone.frequencyEnd ?? tone.frequency;

  oscillator.type = tone.type;
  oscillator.frequency.setValueAtTime(tone.frequency, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(endFrequency, 1), startTime + tone.duration);

  gainNode.gain.setValueAtTime(0.0001, startTime);
  gainNode.gain.exponentialRampToValueAtTime(tone.gain, startTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + tone.duration);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + tone.duration + 0.02);
}

function isUiSoundEnabled() {
  if (typeof window === "undefined") {
    return true;
  }

  const rawValue = window.localStorage.getItem(FEEDBACK_SETTINGS_KEY);

  if (!rawValue) {
    return true;
  }

  try {
    const parsed = JSON.parse(rawValue) as { soundEnabled?: boolean };
    return parsed.soundEnabled ?? true;
  } catch {
    return true;
  }
}

function getAudioElement(cache: HTMLAudioElement | null, config: ClipConfig) {
  if (typeof Audio === "undefined") {
    return null;
  }

  if (!cache || !cache.src.endsWith(config.src)) {
    cache = new Audio(config.src);
    cache.preload = "auto";
  }

  cache.loop = config.loop ?? false;
  cache.volume = config.volume;
  cache.playbackRate = config.playbackRate ?? 1;

  return cache;
}

export function primeUiAudio() {
  getAudioContext();

  clickAudio = getAudioElement(clickAudio, { src: toPublicAssetUrl("sounds/click.mp3"), volume: 0.32 }) ?? clickAudio;
  primaryClickAudio = getAudioElement(primaryClickAudio, { src: toPublicAssetUrl("sounds/primary-click.mp3"), volume: 0.4 }) ?? primaryClickAudio;
  hoverAudio = getAudioElement(hoverAudio, { src: toPublicAssetUrl("sounds/hover.mp3"), volume: 0.14 }) ?? hoverAudio;

  clickAudio?.load();
  primaryClickAudio?.load();
  hoverAudio?.load();
}

function playClip(config: ClipConfig, fallback: () => void, audioRef: "click" | "primary" | "hover") {
  if (!isUiSoundEnabled()) {
    return;
  }

  const currentAudio = audioRef === "click" ? clickAudio : audioRef === "primary" ? primaryClickAudio : hoverAudio;
  const audio = getAudioElement(currentAudio, config);

  if (!audio) {
    fallback();
    return;
  }

  if (audioRef === "click") {
    clickAudio = audio;
  } else if (audioRef === "primary") {
    primaryClickAudio = audio;
  } else {
    hoverAudio = audio;
  }

  if (audio.readyState === 0) {
    audio.load();
  }

  try {
    audio.currentTime = 0;
  } catch {
    // ignore seek errors before metadata is ready
  }

  audio.play().catch(() => fallback());
}

export function createLoaderStartAudio() {
  if (typeof Audio === "undefined") {
    return null;
  }

  const audio = new Audio(toPublicAssetUrl("sounds/loader-start.mp3"));
  audio.preload = "auto";
  audio.loop = false;
  audio.volume = 0.2;

  return audio;
}

export function createLoaderIdleAudio() {
  if (typeof Audio === "undefined") {
    return null;
  }

  const audio = new Audio(toPublicAssetUrl("sounds/loader-idle.mp3"));
  audio.preload = "auto";
  audio.loop = true;
  audio.volume = 0.1;

  return audio;
}

export function createLoader60sAudio() {
  if (typeof Audio === "undefined") {
    return null;
  }

  const audio = new Audio(toPublicAssetUrl("sounds/loader-60s.mp3"));
  audio.preload = "auto";
  audio.loop = false;
  audio.volume = 0.42;

  return audio;
}

export function playHoverSound() {
  playClip({ src: toPublicAssetUrl("sounds/hover.mp3"), volume: 0.14 }, playHoverTone, "hover");
}

export function playClickSound() {
  playClip({ src: toPublicAssetUrl("sounds/click.mp3"), volume: 0.32 }, playClickTone, "click");
}

export function playPrimaryClickSound() {
  playClip({ src: toPublicAssetUrl("sounds/primary-click.mp3"), volume: 0.4 }, playPrimaryClickTone, "primary");
}

export function playClickTone() {
  playTone({ duration: 0.1, frequency: 280, frequencyEnd: 170, gain: 0.05, type: "triangle" });
}

export function playPrimaryClickTone() {
  playTone({ duration: 0.14, frequency: 230, frequencyEnd: 130, gain: 0.06, type: "triangle" });
}

export function playHoverTone() {
  playTone({ duration: 0.06, frequency: 620, frequencyEnd: 780, gain: 0.018, type: "sine" });
}