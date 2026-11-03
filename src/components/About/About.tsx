"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import { SITE, SOCIALS, easeOutQuart } from "@/lib/site";
import { useInView } from "@/lib/useInView";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const STATS = [
  { value: "02+", label: "Years of Experience", sub: "Building modern web apps" },
  { value: "20+", label: "Projects Completed", sub: "Production & side products" },
  { value: "10+", label: "Core Technologies", sub: "Frontend to backend stacks" },
  { value: "100%", label: "Code Dedication", sub: "Clean, robust & scalable" },
] as const;

const HIGHLIGHT_POINTS = [
  "Frontend-focused with deep full-stack MERN capabilities",
  "Clean, maintainable code structured with modern design patterns",
  "Strong problem-solving mindset and rapid learning curve",
  "Keen eye for aesthetic minimalism and fluid motion design",
];

/** Counts the numeric part of a stat (e.g. "20+") up from zero when it scrolls into view. */
function CountUp({ value }: { value: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>({ once: true, rootMargin: "0px 0px -10% 0px" });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const pad = match ? match[1].length : 0;
  const suffix = match ? match[2] : value;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400);
      setN(Math.round(target * easeOutQuart(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {match ? String(n).padStart(pad, "0") + suffix : value}
    </span>
  );
}

export default function About() {
  const lenis = useLenis();
  const goContact = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo("#contact", { duration: 1.5, easing: easeOutQuart });
  };

  return (
    <section
      id="about"
      aria-label="About Md Rashedul Haque Rasel"
      className="relative isolate min-h-screen overflow-hidden bg-ink py-24 md:py-32 scroll-mt-20 border-t border-bone/10"
    >
      {/* Background Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />

      {/* Giant outlined watermark background text */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-4 md:right-16 grid place-items-center -z-10 select-none opacity-10"
      >
        <span className="font-serif text-[clamp(6rem,22vw,20rem)] leading-none tracking-tight text-outline italic">
          About
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-10">
        <SectionHeading
          index="01"
          eyebrow="ABOUT ME"
          title="Engineering interfaces that feel"
          accent="effortless"
          className="mb-12 md:mb-16"
        />

        {/* Main Grid: Left Portrait Profile Card + Right Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Visual Profile Card (5 cols on lg) */}
          <Reveal className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-bone/30">
              {/* Radial glow highlight behind image */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-accent/15 blur-3xl transition-opacity group-hover:opacity-30"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-violet/20 blur-3xl"
              />

              {/* Portrait Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-bone/10 bg-gradient-to-b from-bone/[0.06] via-ink-soft to-ink">
                <Image
                  src="/images/Rashedul_Haque_Rasel.png"
                  alt={SITE.name}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 420px"
                />

                {/* Status Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/10 bg-ink/75 p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-xs font-mono text-bone/90">Available for Work</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-bone/60 font-mono">
                    <FiMapPin className="size-3 text-accent" />
                    <span>Dhaka, BD</span>
                  </div>
                </div>
              </div>

              {/* Profile Details below image */}
              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-medium text-bone tracking-tight">
                    Md Rashedul Haque Rasel
                  </h3>
                  <p className="text-xs font-mono text-accent mt-0.5">
                    Frontend Focused &amp; Full Stack Developer
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                    href={SOCIALS.email.href}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-ink transition-all duration-300 hover:shadow-[0_4px_20px_rgba(210,255,58,0.4)] hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Hire Me</span>
                    <FiArrowUpRight className="size-3.5" />
                  </a>

                  <a
                    href="#contact"
                    onClick={goContact}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-bone/20 bg-bone/[0.04] px-4 py-2.5 text-xs font-semibold text-bone hover:border-bone/40 hover:bg-bone/[0.08] transition-all duration-300 cursor-pointer"
                  >
                    <span>Get in Touch</span>
                  </a>
                </div>

                {/* Social Links Row */}
                <div className="pt-3 border-t border-bone/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-bone/50 uppercase tracking-wider">
                    Connect
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={SOCIALS.github.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub Profile"
                      className="size-8 rounded-full border border-bone/10 bg-bone/[0.03] grid place-items-center text-bone/70 hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      <FiGithub className="size-4" />
                    </a>
                    <a
                      href={SOCIALS.linkedin.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn Profile"
                      className="size-8 rounded-full border border-bone/10 bg-bone/[0.03] grid place-items-center text-bone/70 hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      <FiLinkedin className="size-4" />
                    </a>
                    <a
                      href={SOCIALS.email.href}
                      aria-label="Send Email"
                      className="size-8 rounded-full border border-bone/10 bg-bone/[0.03] grid place-items-center text-bone/70 hover:text-accent hover:border-accent/40 transition-colors"
                    >
                      <FiMail className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Bento Grid of Narrative, Stats, Pillars, and Mindset (7 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
            {/* Bento Card 1: Narrative & Journey */}
            <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-6 md:p-8 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  {"// Background & Philosophy"}
                </span>
                <span className="text-xs font-mono text-bone/40">Story</span>
              </div>

              <h3 className="text-xl md:text-2xl font-medium tracking-tight text-bone mb-4">
                Passionate about turning complex challenges into delightful, frictionless experiences.
              </h3>

              <div className="space-y-4 text-xs md:text-sm text-bone/75 leading-relaxed font-normal">
                <p>
                  I am a developer who believes web applications should not only be functionally solid
                  under the hood, but also visually captivating and smooth to navigate. My focus
                  revolves around building production-grade web systems using React, Next.js, and the
                  full MERN stack.
                </p>
                <p>
                  From state management with Zustand and Redux to architecting modular backend REST
                  APIs with Express and Node.js, I bridge client-side polish with server-side stability.
                  Whether constructing interactive dashboards, real-time web applications, or
                  immersive portfolio showcases, my goal is always pixel perfection and rock-solid
                  code quality.
                </p>
              </div>

              {/* Highlights Checkmark List */}
              <div className="mt-6 pt-6 border-t border-bone/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HIGHLIGHT_POINTS.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <FiCheckCircle className="size-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs text-bone/85 leading-normal">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>

            {/* Bento Card 2: Key Stats Counter Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {STATS.map((stat, i) => (
                <Reveal
                  key={i}
                  delay={0.12 + i * 0.06}
                  className="h-full"
                >
                <div
                  className="group relative h-full overflow-hidden rounded-2xl border border-bone/15 bg-[#0f131f]/80 p-5 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-accent/40"
                >
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-accent tracking-tight italic">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-bone tracking-tight">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 text-[11px] text-bone/50 font-mono leading-tight">
                    {stat.sub}
                  </div>
                </div>
                </Reveal>
              ))}
            </div>

            {/* Bento Card 4: Philosophy Quote Strip */}
            <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-r from-accent/[0.05] via-violet/[0.05] to-transparent p-5 md:p-6 backdrop-blur-xl flex items-center gap-4">
              <div className="hidden sm:grid size-12 rounded-full border border-accent/30 bg-accent/10 place-items-center shrink-0">
                <span className="font-serif italic text-accent text-2xl font-bold">“</span>
              </div>
              <p className="text-xs sm:text-sm font-serif italic text-bone/85 leading-relaxed">
                “Great software isn’t just about raw code—it’s the synergy between intuitive feel,
                visual elegance, and rock-solid architecture.”
                <span className="block not-italic font-sans font-mono text-[11px] text-accent mt-1">
                  — Md Rashedul Haque Rasel
                </span>
              </p>
            </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
