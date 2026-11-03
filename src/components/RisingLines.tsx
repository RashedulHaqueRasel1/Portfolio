"use client";

import { useEffect, useRef } from "react";

interface RisingLine {
  x: number;
  y: number;
  originY: number;
  maxAscent: number; // Total height it travels before completely vanishing
  speed: number;
  baseLength: number; // Starts long, shrinks into a dot as it ascends
  lineWidth: number;
  baseHeadRadius: number;
  color: string;
  maxAlpha: number;
  swaySpeed: number;
  swayAmount: number;
  swayPhase: number;
}

interface RisingSpark {
  x: number;
  y: number;
  originY: number;
  maxAscent: number;
  speed: number;
  size: number;
  color: string;
  maxAlpha: number;
  swaySpeed: number;
  swayPhase: number;
}

const LINE_COLORS = [
  "#d2ff3a", // Electric Lime (Primary accent)
  "#d2ff3a", // Weighted lime
  "#f2efe9", // Bone White
  "#ffffff", // Diamond White
  "#a78bfa", // Soft Violet
];

export default function RisingLines() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ultra-sparse, minimal count (only 4-6 lines, 2-3 sparks total across the screen)
    const NUM_LINES = Math.min(6, Math.max(4, Math.floor(width / 260)));
    const NUM_SPARKS = Math.min(3, Math.max(2, Math.floor(width / 400)));

    // Mouse updraft interactivity
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseUpdraft = 0;

    // Factory: spawn a line that starts long, becomes a dot, then dissolves
    const createLine = (randomStartProgress = false): RisingLine => {
      const maxAscent = 240 + Math.random() * 220; // Travels 240px - 460px
      const color = LINE_COLORS[Math.floor(Math.random() * LINE_COLORS.length)];
      const speed = 0.65 + Math.random() * 0.85; // Smooth gentle glide
      const originY = height + 10;
      const startDist = randomStartProgress ? Math.random() * maxAscent : 0;

      return {
        x: Math.random() * width,
        y: originY - startDist,
        originY,
        maxAscent,
        speed,
        baseLength: 45 + Math.random() * 55, // Starts long (45px - 100px)
        lineWidth: 0.7 + Math.random() * 0.6, // Sleek line (0.7px - 1.3px)
        baseHeadRadius: 0.9 + Math.random() * 0.6, // Dot radius (0.9px - 1.5px)
        color,
        maxAlpha: 0.35 + Math.random() * 0.35, // Soft alpha (0.35 - 0.70)
        swaySpeed: 0.8 + Math.random() * 1.4,
        swayAmount: 0.2 + Math.random() * 0.6,
        swayPhase: Math.random() * Math.PI * 2,
      };
    };

    // Factory: spawn fine ambient sparks
    const createSpark = (randomStartProgress = false): RisingSpark => {
      const maxAscent = 180 + Math.random() * 200;
      const originY = height + 5;
      const startDist = randomStartProgress ? Math.random() * maxAscent : 0;

      return {
        x: Math.random() * width,
        y: originY - startDist,
        originY,
        maxAscent,
        speed: 0.45 + Math.random() * 0.55,
        size: 0.6 + Math.random() * 0.5,
        color: LINE_COLORS[Math.floor(Math.random() * LINE_COLORS.length)],
        maxAlpha: 0.25 + Math.random() * 0.3,
        swaySpeed: 1.0 + Math.random() * 1.8,
        swayPhase: Math.random() * Math.PI * 2,
      };
    };

    const lines: RisingLine[] = Array.from({ length: NUM_LINES }, () => createLine(true));
    const sparks: RisingSpark[] = Array.from({ length: NUM_SPARKS }, () => createSpark(true));

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseUpdraft = Math.min(mouseUpdraft + 0.12, 0.8);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      mouseUpdraft = Math.max(0, mouseUpdraft - delta * 0.7);

      ctx.clearRect(0, 0, width, height);

      // --- 1. Glowing Horizon Baseline ---
      const horizonHeight = 110;
      const horizonGradient = ctx.createLinearGradient(0, height - horizonHeight, 0, height);
      horizonGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      horizonGradient.addColorStop(0.6, "rgba(122, 92, 255, 0.02)");
      horizonGradient.addColorStop(0.9, "rgba(210, 255, 58, 0.04)");
      horizonGradient.addColorStop(1, "rgba(210, 255, 58, 0.10)");

      ctx.fillStyle = horizonGradient;
      ctx.fillRect(0, height - horizonHeight, width, horizonHeight);

      ctx.strokeStyle = "rgba(210, 255, 58, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height - 1);
      ctx.lineTo(width, height - 1);
      ctx.stroke();

      // --- 2. Rising Lines: Long Line -> Shrinks into a Dot -> Slowly Dissolves ---
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Horizontal sway
        const sway = Math.sin(currentTime * 0.002 * line.swaySpeed + line.swayPhase) * line.swayAmount;
        const currentX = line.x + sway;

        // Proximity updraft
        const distToMouse = Math.hypot(currentX - mouseX, line.y - mouseY);
        const mouseLift = distToMouse < 200 ? (1 - distToMouse / 200) * (0.6 + mouseUpdraft) : 0;

        // Ascend upwards
        line.y -= (line.speed + mouseLift) * (delta * 60);

        // Distance traveled above horizon
        const distanceTraveled = line.originY - line.y;

        // Respawn when full ascent is complete
        if (distanceTraveled >= line.maxAscent) {
          const fresh = createLine(false);
          line.x = fresh.x;
          line.y = fresh.y;
          line.originY = fresh.originY;
          line.maxAscent = fresh.maxAscent;
          line.speed = fresh.speed;
          line.baseLength = fresh.baseLength;
          line.lineWidth = fresh.lineWidth;
          line.baseHeadRadius = fresh.baseHeadRadius;
          line.color = fresh.color;
          line.maxAlpha = fresh.maxAlpha;
          continue;
        }

        const ascentProgress = Math.max(0, Math.min(1, distanceTraveled / line.maxAscent));

        // --- THE TRANSFORMATION ---
        // Phase 1 (0% -> 60% of ascent): Line tail steadily shrinks down to 0
        // Phase 2 (60% -> 100% of ascent): Line tail is gone; only the glowing dot remains, slowly dissolving away!
        const tailShrinkProgress = Math.min(1, ascentProgress / 0.6);
        const currentLength = line.baseLength * (1 - tailShrinkProgress);

        // Alpha calculation:
        // Born from horizon: fades in during first 8%
        // Full visibility from 8% to 60% as line transforms into a dot
        // From 60% to 100%: the dot slowly dissolves into the dark
        let alpha = line.maxAlpha;
        if (ascentProgress < 0.08) {
          alpha *= ascentProgress / 0.08;
        } else if (ascentProgress > 0.6) {
          // As a dot, it slowly and smoothly fades away
          alpha *= 1 - (ascentProgress - 0.6) / 0.4;
        }

        if (alpha <= 0.01) continue;

        ctx.save();
        ctx.globalAlpha = alpha;

        // 1. Draw the Tail (only while it's still shrinking towards the dot)
        if (currentLength > 1.5) {
          const tailY = line.y + currentLength;
          const lineGrad = ctx.createLinearGradient(currentX, line.y, currentX, tailY);
          lineGrad.addColorStop(0, line.color);
          lineGrad.addColorStop(0.35, line.color);
          lineGrad.addColorStop(1, "rgba(0,0,0,0)"); // Fades out to tail

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = line.lineWidth;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(currentX, line.y);
          ctx.lineTo(currentX, tailY);
          ctx.stroke();
        }

        // 2. Draw the Glowing Dot / Spark
        // When it becomes just a dot (after tail shrinks), it gently pulses and glints
        const headRadius =
          ascentProgress > 0.6
            ? line.baseHeadRadius * (1 - (ascentProgress - 0.6) * 0.35)
            : line.baseHeadRadius;

        ctx.fillStyle = line.color;
        ctx.beginPath();
        ctx.arc(currentX, line.y, headRadius, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo on the dot
        if (alpha > 0.25) {
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(currentX, line.y, headRadius * 2.0, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // --- 3. Rising Sparks: Gentle floating embers that dissolve ---
      for (let i = 0; i < sparks.length; i++) {
        const spark = sparks[i];

        const sway = Math.sin(currentTime * 0.0025 * spark.swaySpeed + spark.swayPhase) * 1.2;
        const currentX = spark.x + sway;

        spark.y -= spark.speed * (delta * 60);

        const distanceTraveled = spark.originY - spark.y;

        if (distanceTraveled >= spark.maxAscent) {
          const fresh = createSpark(false);
          spark.x = fresh.x;
          spark.y = fresh.y;
          spark.originY = fresh.originY;
          spark.maxAscent = fresh.maxAscent;
          spark.speed = fresh.speed;
          spark.size = fresh.size;
          spark.color = fresh.color;
          spark.maxAlpha = fresh.maxAlpha;
          continue;
        }

        const progress = Math.max(0, Math.min(1, distanceTraveled / spark.maxAscent));
        const alpha =
          spark.maxAlpha * (progress < 0.1 ? progress / 0.1 : 1 - (progress - 0.1) / 0.9);

        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = spark.color;
        ctx.beginPath();
        ctx.arc(currentX, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 opacity-55 mix-blend-screen transition-opacity duration-700"
    />
  );
}
