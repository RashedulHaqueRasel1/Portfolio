"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { SOCIALS, easeOutQuart } from "@/lib/site";
import CodeTerminalPreview from "./CodeTerminalPreview";
import TechArcCarousel from "@/components/TechStack/TechArcCarousel";

/** A line of text that slides up from behind a mask. */
function RevealLine({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span
        className={cn("inline-block animate-rise", className)}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </span>
    </span>
  );
}

const ROLES = [
  "Frontend Developer",
  "MERN Stack Developer",
  "Full Stack Developer",
  "React Native Developer",
] as const;

const EXTENDED_ROLES = [...ROLES, ROLES[0]];

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const [hasTransition, setHasTransition] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setHasTransition(true);
      setIndex((prev) => prev + 1);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index === ROLES.length) {
      const resetTimer = setTimeout(() => {
        setHasTransition(false);
        setIndex(0);
      }, 600);
      return () => clearTimeout(resetTimer);
    }
  }, [index]);

  return (
    <span className="relative block h-[1.25em] overflow-hidden">
      <span
        className={`flex flex-col ${hasTransition
          ? "transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          : ""
          }`}
        style={{
          transform: `translateY(-${(index * 100) / EXTENDED_ROLES.length}%)`,
        }}
      >
        {EXTENDED_ROLES.map((role, i) => (
          <span
            key={i}
            className="flex h-[1.25em] items-center font-serif font-normal tracking-[-0.02em] text-accent italic md:pl-[0.05em] whitespace-nowrap"
          >
            {role}
            <span className="font-serif text-bone/40 not-italic ml-1">.</span>
          </span>
        ))}
      </span>
    </span>
  );
}

const HERO_SOCIALS = [
  { ...SOCIALS.github, Icon: FiGithub },
  { ...SOCIALS.linkedin, Icon: FiLinkedin },
  { ...SOCIALS.email, Icon: FiMail },
];

function HeroActions() {
  const lenis = useLenis();
  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    lenis?.scrollTo(href, { duration: 1.5, easing: easeOutQuart });
  };

  return (
    <div
      className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 sm:gap-4"
      style={{ animationDelay: "1s" }}
    >
      <a
        href="#work"
        onClick={(e) => go(e, "#work")}
        className="group inline-flex h-12 items-center gap-3 rounded-full bg-accent pr-1.5 pl-6 text-sm font-semibold text-ink transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-6px_rgba(210,255,58,0.55)]"
      >
        <span>View my work</span>
        <span className="grid size-9 place-items-center rounded-full bg-ink text-accent transition-transform duration-500 ease-out-expo group-hover:rotate-45">
          <FiArrowUpRight className="size-4" />
        </span>
      </a>
      <a
        href="#contact"
        onClick={(e) => go(e, "#contact")}
        className="inline-flex h-12 items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.04] px-6 text-sm font-medium text-bone backdrop-blur-md transition-all duration-300 hover:border-bone/40 hover:bg-bone/[0.08]"
      >
        Get in touch
      </a>
      <div className="flex items-center gap-2 sm:ml-2">
        {HERO_SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={label}
            className="grid size-10 place-items-center rounded-full border border-bone/12 bg-bone/[0.03] text-bone/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

function ScrollCue() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => lenis?.scrollTo("#about", { duration: 1.5, easing: easeOutQuart })}
      aria-label="Scroll to About section"
      className="group absolute right-6 bottom-6 z-30 hidden cursor-pointer items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-bone/45 uppercase transition-colors hover:text-bone xl:flex"
    >
      <span>Scroll</span>
      <span className="relative grid h-9 w-6 place-items-start justify-center rounded-full border border-bone/20 pt-1.5 group-hover:border-accent/50">
        <span className="size-1 animate-scroll-dot rounded-full bg-accent" />
      </span>
      <FiArrowDown className="size-3.5" />
    </button>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative isolate min-h-svh overflow-hidden bg-ink pt-28 md:pt-28 lg:pt-26 pb-0 flex flex-col justify-between"
    >
      {/* Background Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-80" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-50" />

      {/* Giant outlined Rasel name in background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center -z-10">
        <span className="font-serif text-[clamp(8rem,28vw,28rem)] leading-[0.9] tracking-[-0.04em] text-outline italic select-none opacity-30">
          <RevealLine delay={0.35}>Rasel</RevealLine>
        </span>
      </div>

      {/* Main Foreground Container */}
      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-10 flex-1 flex flex-col justify-between z-25">
        {/* Top Banner Row: Left (Headline & Bio) + Right (Code Terminal) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start pt-12 md:pt-18 lg:pt-26 pb-4">
          {/* Left Column: Role Pill, Headline, Bio */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start relative cursor-default z-20 pt-2 sm:pt-4 lg:pt-6">
            {/* Professional Role Pill Badge */}
            <div className="mb-4 inline-flex animate-fade-up items-center gap-2 self-start rounded-full border border-bone/15 bg-bone/[0.04] px-3.5 py-1.5 text-xs font-mono tracking-wide text-bone/80 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span>Available for New Opportunities</span>
            </div>

            <h1 className="flex flex-col leading-[0.96] tracking-[-0.04em]">
              <span className="text-[clamp(2.8rem,5vw,5rem)] font-medium">
                <RevealLine
                  delay={0.55}
                  className="bg-gradient-to-r from-bone via-bone to-bone/80 bg-clip-text text-transparent"
                >
                  Creative
                </RevealLine>
              </span>
              <span className="text-[clamp(2.2rem,4vw,4rem)]">
                <RevealLine delay={0.68}>
                  <RotatingRole />
                </RevealLine>
              </span>
            </h1>

            <p
              className="mt-5 max-w-xl animate-fade-up text-sm md:text-base leading-relaxed font-normal text-bone/80"
              style={{ animationDelay: "0.85s" }}
            >
              Building fast, modern web apps with{" "}
              <span className="text-bone font-medium">React</span>,{" "}
              <span className="text-bone font-medium">Next.js</span> &amp;{" "}
              <span className="text-bone font-medium">MERN</span>.
              <span className="block text-bone/65 mt-2 text-xs md:text-sm">
                Focused on pixel-perfect interfaces and scalable full-stack engineering.
              </span>
            </p>

            <HeroActions />
          </div>

          {/* Right Column: Code Terminal */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative z-20">
            <div className="w-full max-w-[560px] animate-fade-in rounded-2xl" style={{ animationDelay: "0.5s" }}>
              <CodeTerminalPreview />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Parabolic Curved Technologies Arc */}
      <div className="relative z-10 mt-auto w-full overflow-hidden pt-0">
        <TechArcCarousel embedded={true} />
      </div>
      <ScrollCue />
    </section>
  );
}