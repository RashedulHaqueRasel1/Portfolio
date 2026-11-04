"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FiRefreshCw, FiArrowLeft } from "react-icons/fi";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center text-center px-5 bg-ink text-bone">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-glow opacity-30" />

      <main className="max-w-md mx-auto space-y-4">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-red-400">
          Error // 500
        </span>

        <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-bone">
          Something Went Wrong
        </h1>

        <p className="text-sm sm:text-base text-bone/60 leading-relaxed font-sans">
          An unexpected error occurred. Please try again or return home.
        </p>

        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-semibold text-ink transition-all hover:scale-105"
          >
            <FiRefreshCw className="size-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.05] px-5 py-2.5 font-mono text-xs text-bone transition-all hover:bg-bone/10"
          >
            <FiArrowLeft className="size-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
