"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiCheckCircle,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
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
  { highlight: "Full-Stack MERN:", text: "React, Next.js, Node.js & MongoDB" },
  { highlight: "Clean Architecture:", text: "Modular, scalable & maintainable code" },
  { highlight: "State & Data Flow:", text: "Zustand, Redux Toolkit & REST APIs" },
  { highlight: "Fluid Motion & UX:", text: "Responsive design & micro-interactions" },
];

const CORE_STACK = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Redux / Zustand", icon: SiRedux },
] as const;

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Visual Profile Card (5 cols on lg) */}
          <Reveal className="lg:col-span-5 xl:col-span-4 h-full">
            <div className="group relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-bone/30">
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
              <div className="relative aspect-[4/4.9] min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] w-full overflow-hidden rounded-2xl border border-bone/10 bg-gradient-to-b from-bone/[0.06] via-ink-soft to-ink">
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
              <div className="mt-5 flex flex-col gap-4 shrink-0">
                <div>
                  <h3 className="text-xl font-medium text-bone tracking-tight">
                    Md Rashedul Haque Rasel
                  </h3>
                  <p className="text-xs font-mono text-accent mt-0.5">
                    Frontend Focused &amp; Full Stack Developer
                  </p>
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
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between gap-6">
            {/* Bento Card 1: Narrative & Journey */}
            <Reveal delay={0.08} className="flex-1 flex flex-col">
            <div className="relative h-full flex-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-6 md:p-8 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-accent uppercase tracking-widest">
                    {"// Background & Philosophy"}
                  </span>
                  <span className="text-xs font-mono text-bone/40">Story</span>
                </div>

                <div className="mb-5">
                  <h3 className="text-base sm:text-lg md:text-[21px] font-normal leading-relaxed tracking-tight text-bone/90">
                    I&apos;m{" "}
                    <span className="font-semibold text-accent">
                      Md Rashedul Haque Rasel
                    </span>{" "}
                    — a{" "}
                    <span className="font-semibold text-bone">
                      Frontend-Focused Full-Stack Engineer
                    </span>{" "}
                    currently focused on architecting resilient{" "}
                    <span className="rounded bg-accent px-1.5 py-0.5 font-semibold text-ink text-xs sm:text-sm inline-block">
                      System Design
                    </span>
                    , maximizing{" "}
                    <span className="rounded bg-accent px-1.5 py-0.5 font-semibold text-ink text-xs sm:text-sm inline-block">
                      Web Performance
                    </span>{" "}
                    for sub-second speeds, and shipping mission-critical{" "}
                    <span className="rounded bg-accent px-1.5 py-0.5 font-semibold text-ink text-xs sm:text-sm inline-block">
                      Scalable Architecture
                    </span>{" "}
                    that drives real business value.
                  </h3>

                  <p className="mt-3.5 text-xs sm:text-sm text-bone/70 leading-relaxed font-normal">
                    Bridging client-side fidelity with server-side stability across the{" "}
                    <span className="text-bone font-medium">MERN stack</span> (React, Next.js, Node.js, Express, MongoDB) — transforming demanding product requirements into pixel-perfect, production-grade applications.
                  </p>
                </div>

                {/* Core Stack Pills */}
                <div className="pt-3 pb-1 border-t border-bone/10">
                  <span className="text-[11px] font-mono text-bone/50 uppercase tracking-wider block mb-2.5">
                    {"// Core Tech Arsenal"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {CORE_STACK.map((tech) => (
                      <span
                        key={tech.name}
                        className="group/tech inline-flex items-center gap-1.5 rounded-xl border border-bone/10 bg-bone/[0.03] px-3 py-1.5 text-xs font-mono text-bone/70 backdrop-blur-md transition-all duration-300 hover:border-bone/30 hover:bg-bone/[0.08] hover:text-bone cursor-default"
                      >
                        <tech.icon className="size-3.5 text-bone/45 group-hover/tech:text-accent transition-colors shrink-0" />
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights Checkmark List */}
              <div className="mt-6 pt-5 border-t border-bone/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HIGHLIGHT_POINTS.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <FiCheckCircle className="size-4 text-accent/70 shrink-0 mt-0.5" />
                    <span className="text-xs text-bone/70 leading-normal">
                      <span className="font-medium text-bone">{item.highlight}</span>{" "}
                      <span>{item.text}</span>
                    </span>
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

          </div>
        </div>
      </div>
    </section>
  );
}
