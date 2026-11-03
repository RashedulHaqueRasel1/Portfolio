"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";

/** Thin lime bar at the very top of the viewport showing page scroll progress. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useLenis(({ progress }) => {
    if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-[2px]">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent/60 via-accent to-accent shadow-[0_0_10px_rgba(210,255,58,0.6)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
