"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/cn";

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const lenis = useLenis();

  // Lock scrolling while loading
  useEffect(() => {
    if (isVisible) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isVisible, lenis]);

  useEffect(() => {
    // Quick, clean loading timeout (~900ms)
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 900);

    // Unmount after smooth fade transition (~1400ms total)
    const removeTimer = setTimeout(() => {
      setIsMounted(false);
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#07080a] select-none",
        "transition-opacity duration-500 ease-out",
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Subtle brand glow behind loader */}
      <div
        aria-hidden
        className="pointer-events-none absolute size-56 rounded-full bg-accent/10 blur-3xl"
      />

      {/* Clean, minimalist spinner & brand initial */}
      <div className="relative flex flex-col items-center gap-4">
        <div className="relative grid size-12 place-items-center">
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-bone/10 border-t-accent animate-spin" />
          {/* Brand Initial */}
          <span className="font-serif text-sm font-semibold italic text-bone">
            R
          </span>
        </div>

        {/* Minimal loading text */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-bone/60 tracking-widest uppercase">
          <span>Loading</span>
          <span className="inline-flex gap-0.5 text-accent font-bold">
            <span className="animate-pulse">.</span>
            <span className="animate-pulse delay-150">.</span>
            <span className="animate-pulse delay-300">.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

