"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiLayers,
  FiX,
  FiMaximize2,
  FiActivity,
  FiCheck,
  FiCode,
} from "react-icons/fi";
import { useLenis } from "lenis/react";
import FlexCarousel, { FlexCarouselItem, DEFAULT_ITEMS } from "./FlexCarousel";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SOCIALS, easeOutQuart } from "@/lib/site";
import { cn } from "@/lib/cn";

const FALLBACK_URL = SOCIALS.github.href;

export default function Work() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<FlexCarouselItem | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const measure = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top + window.scrollY, scrollable: rect.height - window.innerHeight, rectTop: rect.top };
  }, []);

  // Map page scroll inside the pinned section → carousel progress.
  // The carousel has its own spring, so we pass the raw value (no extra RAF loop).
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

  // Lock scroll and pause Lenis while the case-study modal is open
  useEffect(() => {
    if (!selectedProject) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [selectedProject, lenis]);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedProject]);

  const activeProject = DEFAULT_ITEMS[activeIdx] || DEFAULT_ITEMS[0];
  const pad = (n: number) => String(n).padStart(2, "0");

  const handleOpenModal = useCallback((project: FlexCarouselItem) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

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
            <Eyebrow>03 {"//"} SELECTED WORK</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.05] font-medium tracking-tight text-bone">
              Projects built with <span className="font-serif font-normal text-accent italic">craft</span>
              <span className="font-serif text-accent">.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-right font-mono text-xs leading-relaxed text-bone/45 md:block">
            Scroll to browse · drag to explore · click a card for the full case study
          </p>
        </div>

        {/* WebGL carousel */}
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
            onSelect={(_, item) => handleOpenModal(item)}
            className="h-full w-full"
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

            <div className="flex items-center gap-4">
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

              <button
                onClick={() => handleOpenModal(activeProject)}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.05] px-4 py-1.5 font-mono text-xs text-bone backdrop-blur-md transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
              >
                <FiMaximize2 className="size-3.5 transition-transform group-hover:scale-110" />
                <span>Open case study</span>
                <FiArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          React Bits Modal Cards — Expanding Full-Screen Modal
          ========================================================= */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          data-lenis-prevent
          className="fixed inset-0 z-[120] flex animate-backdrop-in items-center justify-center bg-black/85 p-3 backdrop-blur-2xl sm:p-5 md:p-8"
          onClick={handleCloseModal}
          onWheel={(e) => e.stopPropagation()}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative w-full max-w-4xl lg:max-w-5xl h-[88vh] max-h-[88vh] flex flex-col rounded-3xl border border-bone/20 bg-[#0c0f18]/95 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden select-text overscroll-contain animate-modal-in"
          >
            {/* =====================================================
                Sticky Top HUD Header Bar inside Modal
                ===================================================== */}
            <div className="sticky top-0 z-40 w-full px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between border-b border-bone/10 bg-[#0c0f18]/95 backdrop-blur-xl shrink-0">
              {/* Left Breadcrumb & Category Badge */}
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-mono text-accent">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                  <span>{selectedProject.category || "Case Study"}</span>
                </span>
                <span className="hidden sm:inline-block text-xs font-mono text-bone/50 truncate">
                  {"// "}
                  {selectedProject.title}
                </span>
              </div>

              {/* Right: Quick Action Buttons & Prominent Close Button */}
              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={selectedProject.liveUrl || FALLBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent px-4 py-1.5 text-xs font-mono font-semibold text-ink transition-all hover:scale-105 shadow-[0_0_12px_rgba(210,255,58,0.35)]"
                >
                  <span>Live Preview</span>
                  <FiArrowUpRight className="size-3.5" />
                </a>

                <a
                  href={selectedProject.githubUrl || FALLBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-bone/20 bg-bone/[0.05] px-3.5 py-1.5 text-xs font-mono text-bone transition-all hover:border-bone/50 hover:bg-bone/[0.1]"
                >
                  <FiGithub className="size-3.5" />
                  <span>Code</span>
                </a>

                {/* Close Button */}
                <button
                  ref={closeBtnRef}
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  className="size-9 sm:size-10 rounded-full border border-bone/20 bg-bone/[0.06] text-bone hover:border-accent hover:text-accent hover:bg-accent/10 backdrop-blur-xl flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <FiX className="size-4 sm:size-5" />
                </button>
              </div>
            </div>

            {/* =====================================================
                Scrollable Case Study Body (Full Natural Scroll)
                ===================================================== */}
            <div
              data-lenis-prevent
              tabIndex={0}
              onWheel={(e) => e.stopPropagation()}
              className="overflow-y-auto flex-1 min-h-0 custom-modal-scrollbar p-5 sm:p-8 md:p-10 space-y-10 overscroll-contain focus:outline-none"
            >
              {/* 1. Hero Image Visual Showcase */}
              <div className="relative h-64 sm:h-80 md:h-[400px] w-full rounded-2xl overflow-hidden border border-bone/15 bg-ink shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element -- remote demo images */}
                <img
                  src={selectedProject.src}
                  alt={selectedProject.alt || selectedProject.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Gradient Overlays */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0f18] via-[#0c0f18]/30 to-black/50"
                />

                {/* Floating Bottom Info in Hero Banner */}
                <div className="absolute bottom-5 sm:bottom-7 left-5 sm:left-8 right-5 sm:right-8 z-10">
                  <span className="font-mono text-xs sm:text-sm text-accent tracking-wider uppercase block mb-1">
                    {selectedProject.subtitle}
                  </span>
                  <h3
                    id="modal-title"
                    className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-bone"
                  >
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Mobile Quick Action Buttons (visible on small screens) */}
              <div className="flex sm:hidden flex-wrap items-center gap-3">
                <a
                  href={selectedProject.liveUrl || FALLBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-5 py-2.5 text-xs font-mono font-semibold text-ink"
                >
                  <span>Live Preview</span>
                  <FiArrowUpRight className="size-3.5" />
                </a>

                <a
                  href={selectedProject.githubUrl || FALLBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.04] px-5 py-2.5 text-xs font-mono text-bone"
                >
                  <FiGithub className="size-3.5" />
                  <span>Source Code</span>
                </a>
              </div>

              {/* 2. Executive Overview & Narrative */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-accent mb-3 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  <span>Executive Summary &amp; Overview</span>
                </h4>
                <p className="text-base sm:text-lg leading-relaxed text-bone/85 font-sans">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* 3. The Challenge vs Engineered Solution (2-Column Cards) */}
              {(selectedProject.challenge || selectedProject.solution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* The Problem / Challenge */}
                  <div className="rounded-2xl border border-bone/15 bg-bone/[0.02] p-5 sm:p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="size-2 rounded-full bg-amber-400" />
                      <h5 className="font-mono text-xs uppercase tracking-wider text-bone/70">
                        The Engineering Challenge
                      </h5>
                    </div>
                    <p className="text-sm text-bone/80 leading-relaxed font-sans">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  {/* The Engineered Solution */}
                  <div className="rounded-2xl border border-accent/25 bg-accent/[0.03] p-5 sm:p-6 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="size-2 rounded-full bg-accent" />
                      <h5 className="font-mono text-xs uppercase tracking-wider text-accent">
                        Architected Solution
                      </h5>
                    </div>
                    <p className="text-sm text-bone/85 leading-relaxed font-sans">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>
              )}

              {/* 4. Key Architectural Highlights (Grid Cards) */}
              {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-bone/50 mb-4 flex items-center gap-2">
                    <FiLayers className="size-3.5 text-accent" />
                    <span>Key Architectural Highlights</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {selectedProject.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 rounded-2xl border border-bone/12 bg-bone/[0.025] p-4 sm:p-5 backdrop-blur-sm hover:border-bone/25 transition-colors"
                      >
                        <span className="size-6 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shrink-0 mt-0.5">
                          <FiCheck className="size-3.5" />
                        </span>
                        <p className="text-xs sm:text-sm text-bone/85 leading-relaxed">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Performance & Telemetry Metrics */}
              {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-bone/50 mb-4 flex items-center gap-2">
                    <FiActivity className="size-3.5 text-accent" />
                    <span>Production Telemetry &amp; Metrics</span>
                  </h4>
                  <div className="grid grid-cols-3 gap-3.5">
                    {selectedProject.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.03] to-transparent p-4 sm:p-5 text-center"
                      >
                        <div className="font-mono text-xl sm:text-3xl font-bold text-accent tracking-tight">
                          {m.value}
                        </div>
                        <div className="text-[11px] sm:text-xs font-mono text-bone/60 mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Technologies & Tools Used */}
              {selectedProject.tech && selectedProject.tech.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-bone/50 mb-3 flex items-center gap-2">
                    <FiCode className="size-3.5 text-accent" />
                    <span>Technology Stack &amp; Tools</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-bone/15 bg-bone/[0.04] px-3.5 py-1.5 text-xs font-mono text-bone/85 hover:border-accent hover:text-accent transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Bottom CTA Actions Banner */}
              <div className="rounded-2xl border border-bone/15 bg-gradient-to-r from-bone/[0.03] via-bone/[0.05] to-bone/[0.03] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <h5 className="text-base sm:text-lg font-medium text-bone">
                    Ready to explore this live project?
                  </h5>
                  <p className="text-xs sm:text-sm text-bone/60 mt-1">
                    Inspect production deployment or review the GitHub code repository.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={selectedProject.liveUrl || FALLBACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 py-2.5 text-xs font-mono font-semibold text-ink transition-transform hover:scale-105 shadow-[0_0_15px_rgba(210,255,58,0.35)]"
                  >
                    <span>Live Preview</span>
                    <FiArrowUpRight className="size-3.5" />
                  </a>

                  <a
                    href={selectedProject.githubUrl || FALLBACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-bone/20 bg-bone/[0.05] px-5 py-2.5 text-xs font-mono text-bone hover:border-bone/50 hover:bg-bone/[0.1] transition-all"
                  >
                    <FiGithub className="size-3.5" />
                    <span>Repository</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Exit Bar */}
            <div className="border-t border-bone/10 bg-[#0c0f18]/95 px-6 sm:px-8 py-3.5 flex items-center justify-between shrink-0">
              <span className="text-xs font-mono text-bone/45">
                Press <kbd className="px-1.5 py-0.5 rounded border border-bone/20 bg-bone/[0.05] text-bone/70">ESC</kbd> or click outside to close
              </span>
              <button
                onClick={handleCloseModal}
                className="text-xs font-mono text-accent hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Close Case Study</span>
                <span>✕</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
