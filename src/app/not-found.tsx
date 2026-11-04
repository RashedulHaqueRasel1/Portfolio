import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-5 bg-ink text-bone">
      {/* Subtle background glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-glow opacity-30" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-20" />

      <main className="max-w-md mx-auto space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
          404 // Not Found
        </span>

        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-bone">
          Page Not Found
        </h1>

        <p className="text-sm sm:text-base text-bone/60 leading-relaxed font-sans">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-mono text-xs font-semibold text-ink shadow-[0_0_20px_rgba(210,255,58,0.25)] transition-all hover:scale-105 hover:bg-[#e4ff6b]"
          >
            <FiArrowLeft className="size-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
