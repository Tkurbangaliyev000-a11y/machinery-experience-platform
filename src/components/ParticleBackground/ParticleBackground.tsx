import { useEffect, useRef } from "react";
import "./ParticleBackground.css";

const BG = "#020206";
const ACCENT_RGB = "30, 187, 210";
const FRAME_MS = 1000 / 30;
const MAX_DPR = 2;

type Dot = {
  x: number;
  y: number;
  depth: number;
  phaseX: number;
  phaseY: number;
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    let animId = 0;
    let lastFrame = 0;
    let logicalWidth = 0;
    let logicalHeight = 0;
    let dots: Dot[] = [];

    const spacing = () => {
      if (logicalWidth < 560) return 28;
      if (logicalWidth < 900) return 32;
      return 36;
    };

    const baseRadius = () => (logicalWidth < 768 ? 0.95 : 1.1);

    const buildGrid = () => {
      const step = spacing();
      const cols = Math.ceil(logicalWidth / step) + 2;
      const rows = Math.ceil(logicalHeight / step) + 2;
      const xStart = (logicalWidth - (cols - 1) * step) * 0.5;
      const yStart = (logicalHeight - (rows - 1) * step) * 0.5;
      const next: Dot[] = [];

      for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
          const jitterX = Math.sin(c * 1.77 + r * 0.91) * step * 0.16;
          const jitterY = Math.cos(c * 1.13 + r * 1.61) * step * 0.14;
          const x = xStart + c * step + jitterX;
          const y = yStart + r * step + jitterY;
          const depth = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(c * 0.81 + r * 0.47));
          const phaseX = c * 0.21 + r * 0.18;
          const phaseY = c * 0.16 + r * 0.24;
          next.push({ x, y, depth, phaseX, phaseY });
        }
      }

      dots = next;
    };

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      logicalWidth = window.innerWidth;
      logicalHeight = window.innerHeight;
      canvas.width = Math.round(logicalWidth * dpr);
      canvas.height = Math.round(logicalHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      if (reducedMotion || document.hidden) renderStatic();
    };

    const paintBase = () => {
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);
    };

    const drawScene = (t: number) => {
      paintBase();
      const rBase = baseRadius();

      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        const waveY = Math.sin(t * 0.16 + dot.phaseY + dot.x * 0.0038);
        const waveX = Math.cos(t * 0.11 + dot.phaseX + dot.y * 0.0032);
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.2 + dot.phaseX * 0.8);

        const depthScale = 0.85 + dot.depth * 0.55;
        const offsetX = waveX * (1.2 + dot.depth * 1.9);
        const offsetY = waveY * (2.6 + dot.depth * 3.0);
        const glowRadius = rBase * depthScale * (2.1 + pulse * 0.5);
        const coreRadius = rBase * depthScale * (0.95 + pulse * 0.2);

        const glowAlpha = 0.085 + dot.depth * 0.11 + pulse * 0.02;
        const coreAlpha = 0.17 + dot.depth * 0.22 + pulse * 0.04;

        ctx.fillStyle = `rgba(${ACCENT_RGB}, ${glowAlpha})`;
        ctx.beginPath();
        ctx.arc(dot.x + offsetX, dot.y + offsetY, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${ACCENT_RGB}, ${coreAlpha})`;
        ctx.beginPath();
        ctx.arc(dot.x + offsetX, dot.y + offsetY, coreRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      const sweepX = ((t * 17) % (logicalWidth * 1.9)) - logicalWidth * 0.55;
      const sweep = ctx.createRadialGradient(
        sweepX,
        logicalHeight * 0.45,
        0,
        sweepX,
        logicalHeight * 0.45,
        logicalWidth * 0.75,
      );
      sweep.addColorStop(0, `rgba(${ACCENT_RGB}, 0.17)`);
      sweep.addColorStop(0.48, `rgba(${ACCENT_RGB}, 0.08)`);
      sweep.addColorStop(1, `rgba(${ACCENT_RGB}, 0)`);
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);

      const vignette = ctx.createRadialGradient(
        logicalWidth * 0.5,
        logicalHeight * 0.5,
        logicalWidth * 0.14,
        logicalWidth * 0.5,
        logicalHeight * 0.5,
        logicalWidth * 0.92,
      );
      vignette.addColorStop(0, "rgba(2, 2, 6, 0)");
      vignette.addColorStop(1, "rgba(2, 2, 6, 0.46)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, logicalWidth, logicalHeight);
    };

    const renderStatic = () => {
      drawScene(0);
    };

    const renderFrame = (ts: number) => {
      drawScene(ts * 0.001);
    };

    const stop = () => {
      if (animId) cancelAnimationFrame(animId);
      animId = 0;
    };

    const start = () => {
      if (reducedMotion || document.hidden || animId) return;
      animId = requestAnimationFrame(frame);
    };

    const frame = (ts: number) => {
      animId = requestAnimationFrame(frame);
      if (document.hidden || ts - lastFrame < FRAME_MS) return;
      lastFrame = ts;
      renderFrame(ts);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
        return;
      }
      lastFrame = 0;
      start();
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) {
        stop();
        renderStatic();
      } else {
        lastFrame = 0;
        start();
      }
    };

    setup();
    window.addEventListener("resize", setup);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);
    start();

    return () => {
      stop();
      window.removeEventListener("resize", setup);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-bg-canvas" />;
}

