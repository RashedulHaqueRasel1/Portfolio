"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowUpRight, FiLayers } from "react-icons/fi";
import { useLenis } from "lenis/react";
import FlexCarousel, { DEFAULT_ITEMS } from "./FlexCarousel";
import { PROJECTS } from "@/lib/projects";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { easeOutQuart } from "@/lib/site";
import { cn } from "@/lib/cn";

export default function Work() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const sectionRef = useRef<HTMLElement | null>(null);

  const measure = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top + window.scrollY, scrollable: rect.height - window.innerHeight, rectTop: rect.top };
  }, []);

  // Map page scroll inside the pinned section → carousel progress.
  const lenis = useLenis(() => {
    const m = measure();
    if (!m || m.scrollable <= 0) return;
    setScrollProgress(Math.max(0, Math.min(1, -m.rectTop / m.scrollable)));
  });

  // Initial sync (e.g. page reloaded mid-section)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const m = measure();
      if (m && m.scrollable > 0) setScrollProgress(Math.max(0, Math.min(1, -m.rectTop / m.scrollable)));
    });
    return () => cancelAnimationFrame(id);
  }, [measure]);

  const scrollToProject = (i: number) => {
    const m = measure();
    if (!m) return;
    const target = m.top + (i / Math.max(1, DEFAULT_ITEMS.length - 1)) * m.scrollable;
    lenis?.scrollTo(target, { duration: 1.2, easing: easeOutQuart });
  };

  const activeProject = DEFAULT_ITEMS[activeIdx] || DEFAULT_ITEMS[0];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected Works & Projects"
      className="relative w-full border-t border-bone/10 bg-ink"
      style={{ height: "420vh" }}
    >
      {/* Sticky full-screen stage */}
      <div className="sticky top-0 isolate flex h-svh w-full flex-col justify-between overflow-hidden pt-20 select-none sm:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-50" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[140px] md:size-[850px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-4 -z-10 grid -translate-y-1/2 place-items-center opacity-[0.06] select-none md:right-16"
        >
          <span className="font-serif text-[clamp(8rem,24vw,22rem)] leading-none tracking-tight text-outline italic">
            Work
          </span>
        </div>

        {/* Section header */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-4 px-5 md:px-8 lg:px-10">
          <div>
            <Eyebrow>04 {"//"} SELECTED WORK</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] font-medium tracking-tight text-bone">
              Projects built with <span className="font-serif font-normal text-accent italic">craft</span>
              <span className="font-serif text-accent">.</span>
            </h2>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.05] px-4 py-2 font-mono text-xs text-bone backdrop-blur-md transition-all hover:border-accent hover:bg-accent hover:text-ink shadow-sm"
            >
              <FiLayers className="size-3.5 transition-transform group-hover:scale-110" />
              <span>All Projects ({PROJECTS.length})</span>
              <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <p className="hidden max-w-xs text-right font-mono text-[11px] leading-relaxed text-bone/45 md:block">
              6 featured projects • Click to view case study
            </p>
          </div>
        </div>

        {/* WebGL carousel — Clicking project navigates directly to /projects/[slug] */}
        <div className="relative z-10 flex min-h-0 w-full flex-1 items-center justify-center">
          <FlexCarousel
            items={DEFAULT_ITEMS}
            preset="liquid"
            cardHeight={0.62}
            gap={24}
            radius={22}
            fit="natural"
            squeeze={0.2}
            followCursor={true}
            captions={false}
            captureWheel={false}
            scrollProgress={scrollProgress}
            onChange={(idx) => setActiveIdx(idx)}
            onSelect={(_, item) => router.push(`/projects/${item.slug}`)}
            className="h-full w-full cursor-pointer"
          />
        </div>

        {/* Bottom HUD */}
        <div className="relative z-20 flex w-full flex-col gap-3 px-5 pb-6 sm:px-8 sm:pb-8 md:px-12">
          <div className="h-[2.5px] w-full overflow-hidden rounded-full bg-bone/10">
            <div
              className="h-full origin-left bg-accent shadow-[0_0_10px_rgba(210,255,58,0.65)] transition-transform duration-150 ease-out"
              style={{ transform: `scaleX(${Math.max(0.04, scrollProgress)})` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex min-w-0 items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tabular-nums">
                [{pad(activeIdx + 1)} / {pad(DEFAULT_ITEMS.length)}]
              </span>
              <span className="truncate text-sm font-medium tracking-tight text-bone">{activeProject.title}</span>
              <span className="hidden font-mono text-xs text-bone/45 sm:inline-block">
                • {activeProject.category || activeProject.subtitle}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-1.5 md:flex" role="tablist" aria-label="Projects">
                {DEFAULT_ITEMS.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={i === activeIdx}
                    aria-label={`Go to ${item.title}`}
                    onClick={() => scrollToProject(i)}
                    className="group grid h-6 cursor-pointer place-items-center px-0.5"
                  >
                    <span
                      className={cn(
                        "block h-1.5 rounded-full transition-all duration-500 ease-out-expo",
                        i === activeIdx ? "w-6 bg-accent" : "w-1.5 bg-bone/25 group-hover:bg-bone/60",
                      )}
                    />
                  </button>
                ))}
              </div>

              {/* Direct links to active project case study & All Projects page */}
              <Link
                href={`/projects/${activeProject.slug}`}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs text-accent backdrop-blur-md transition-all hover:border-accent hover:bg-accent hover:text-ink"
              >
                <span>View Case Study</span>
                <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/projects"
                className="group hidden sm:inline-flex cursor-pointer items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.05] px-4 py-1.5 font-mono text-xs text-bone backdrop-blur-md transition-all hover:border-bone/40 hover:bg-bone/10"
              >
                <FiLayers className="size-3.5 transition-transform group-hover:scale-110" />
                <span>All Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
