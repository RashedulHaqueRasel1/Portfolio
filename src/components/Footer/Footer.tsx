"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiCheck,
  FiClock,
  FiCopy,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiTerminal,
} from "react-icons/fi";
import { NAV_LINKS, SITE, SOCIALS, easeOutQuart } from "@/lib/site";
import { cn } from "@/lib/cn";

const SOCIAL_CARDS = [
  {
    ...SOCIALS.github,
    Icon: FiGithub,
    color: "#f2efe9",
    hoverBg: "hover:border-bone/40 hover:bg-bone/[0.06]",
  },
  {
    ...SOCIALS.linkedin,
    Icon: FiLinkedin,
    color: "#38bdf8",
    hoverBg: "hover:border-[#38bdf8]/40 hover:bg-[#38bdf8]/[0.06]",
  },
  {
    ...SOCIALS.email,
    Icon: FiMail,
    color: "#d2ff3a",
    hoverBg: "hover:border-accent/40 hover:bg-accent/[0.06]",
  },
];

export default function Footer() {
  const lenis = useLenis();
  const [timeStr, setTimeStr] = useState("");
  const [greeting, setGreeting] = useState("Hello");
  const [copied, setCopied] = useState(false);

  // Live Dhaka Local Time (UTC+6) & Dynamic Time-of-Day Greeting
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: SITE.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(now.toLocaleTimeString("en-US", options));

      // Calculate hour in Dhaka timezone for context greeting
      const dhakaHour = parseInt(
        now.toLocaleTimeString("en-US", {
          timeZone: SITE.timezone,
          hour: "numeric",
          hour12: false,
        }),
        10
      );

      if (dhakaHour >= 5 && dhakaHour < 12) {
        setGreeting("Good morning");
      } else if (dhakaHour >= 12 && dhakaHour < 17) {
        setGreeting("Good afternoon");
      } else if (dhakaHour >= 17 && dhakaHour < 21) {
        setGreeting("Good evening");
      } else {
        setGreeting("Working late");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6, easing: easeOutQuart });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.4, easing: easeOutQuart, offset: href === "#home" ? 0 : -8 });
    } else {
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <footer
      aria-label="Footer"
      className="relative isolate overflow-hidden bg-ink pt-12 md:pt-16 pb-10 border-t border-bone/10"
    >
      {/* Background Atmosphere & Atmospheric Gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-[circle_at_50%_0%] from-accent/[0.05] via-violet/[0.03] to-transparent"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-accent/[0.03] blur-[140px] -z-10"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-10">
        {/* =========================================================
            Top Section: High-Impact Call to Action Banner
            ========================================================= */}
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-bone/15 bg-gradient-to-b from-[#141824]/90 via-[#0f131f]/95 to-[#0b0e17]/95 p-8 md:p-12 lg:p-14 shadow-[0_24px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          {/* Accent Glow in the CTA Card */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-accent/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-32 size-96 rounded-full bg-violet/20 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Left: Punchy Headline */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-mono text-accent mb-5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                <span>Open for New Opportunities • 2026</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-bone leading-[1.08]">
                Have an ambitious idea?{" "}
                <span className="font-serif italic font-normal text-accent">
                  Let&apos;s build it together.
                </span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-bone/70 max-w-xl font-sans leading-relaxed">
                Whether you need a performant web application, a modern redesign, or a full-stack
                MERN engineering lead, I&apos;m ready to bring your vision to life.
              </p>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-end xl:items-center justify-start lg:justify-end gap-3.5">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-accent px-7 text-sm font-semibold text-ink shadow-[0_8px_30px_rgba(210,255,58,0.4)] transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(210,255,58,0.6)] cursor-pointer"
              >
                <span>Start a Project</span>
                <span className="grid size-8 place-items-center rounded-full bg-ink text-accent transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                  <FiArrowUpRight className="size-4" />
                </span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className={cn(
                  "group inline-flex h-13 items-center justify-center gap-2.5 rounded-full border px-6 text-sm font-medium backdrop-blur-md transition-all duration-300 cursor-pointer",
                  copied
                    ? "border-accent/60 bg-accent/15 text-accent shadow-[0_0_20px_rgba(210,255,58,0.3)]"
                    : "border-bone/20 bg-bone/[0.04] text-bone hover:border-bone/40 hover:bg-bone/[0.08]"
                )}
              >
                {copied ? (
                  <>
                    <FiCheck className="size-4 text-accent" />
                    <span className="font-mono text-xs text-accent">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="size-4 text-bone/60 group-hover:text-bone transition-colors" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            Middle Hub: 4-Column Bento Architecture
            ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-16 border-b border-bone/10">
          {/* Column 1: Brand, Identity & Philosophy (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="group inline-flex items-center gap-3 font-semibold tracking-tight cursor-pointer select-none"
              >
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-bone font-serif text-xl font-normal text-ink italic transition-all duration-500 ease-out-expo group-hover:-rotate-12 group-hover:scale-105 group-hover:bg-accent group-hover:shadow-[0_0_20px_rgba(210,255,58,0.5)]"
                >
                  R
                </span>
                <span className="text-2xl font-medium text-bone group-hover:text-white transition-colors">
                  rasel<span className="text-accent font-serif font-bold text-2xl">.</span>
                </span>
              </a>

              <p className="mt-4 text-sm text-bone/70 leading-relaxed font-sans max-w-sm">
                Frontend-Focused Full Stack Developer dedicated to crafting fluid, responsive,
                and high-performance web systems with React, Next.js, and modern MERN architecture.
              </p>
            </div>

            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-3 rounded-2xl border border-bone/12 bg-bone/[0.025] px-4 py-3 backdrop-blur-md max-w-sm">
              <span className="relative flex size-2.5 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>
              <div className="text-xs">
                <span className="block font-medium text-bone">Available for Work</span>
                <span className="text-[11px] font-mono text-bone/50">Remote &amp; Contract Worldwide</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation / Sitemap (2 cols on lg) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
              <span className="size-1 rounded-full bg-accent" />
              <span>Sitemap</span>
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link, idx) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group inline-flex items-center gap-2.5 text-sm text-bone/70 hover:text-bone transition-colors"
                  >
                    <span className="font-mono text-[10px] text-bone/35 group-hover:text-accent transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="h-px w-2 bg-bone/20 transition-all duration-300 group-hover:w-4 group-hover:bg-accent" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Social & Profiles (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-bone/45 mb-4 flex items-center gap-2">
              <span className="size-1 rounded-full bg-bone/40" />
              <span>Connect</span>
            </h3>
            <ul className="space-y-2.5">
              {SOCIAL_CARDS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className={cn(
                      "group flex items-center justify-between rounded-2xl border border-bone/10 bg-bone/[0.02] p-3 text-xs text-bone/80 transition-all duration-300 backdrop-blur-md",
                      social.hoverBg
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="grid size-8 shrink-0 place-items-center rounded-xl border border-bone/10 bg-bone/[0.04] transition-transform duration-300 group-hover:scale-110"
                        style={{ color: social.color }}
                      >
                        <social.Icon className="size-4" />
                      </span>
                      <div className="truncate">
                        <span className="block font-medium text-bone group-hover:text-white transition-colors">
                          {social.label}
                        </span>
                        <span className="block truncate font-mono text-[10.5px] text-bone/45">
                          {social.handle}
                        </span>
                      </div>
                    </div>
                    <FiArrowUpRight className="size-4 text-bone/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent shrink-0 ml-2" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Telemetry, Clock & Location (3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-b from-bone/[0.03] to-transparent p-5 backdrop-blur-xl shadow-lg">
              {/* Header with live dot */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-bone/60">
                  <FiClock className="size-3.5 text-accent" />
                  <span>Dhaka Time</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>UTC+6</span>
                </span>
              </div>

              {/* Digital Clock Display */}
              <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-bone tabular-nums">
                {timeStr || "12:00:00 PM"}
              </div>

              {/* Greeting & Location */}
              <div className="mt-3 pt-3 border-t border-bone/10 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-bone/50">Status:</span>
                  <span className="text-accent">{greeting}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-bone/50">Location:</span>
                  <span className="text-bone/80 flex items-center gap-1">
                    <FiMapPin className="size-3 text-accent" />
                    <span>Dhaka, BD</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-bone/40 pt-1">
                  <span>Coordinates:</span>
                  <span>23.81° N, 90.41° E</span>
                </div>
              </div>
            </div>

            {/* Back to top card */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group flex w-full cursor-pointer items-center justify-between rounded-2xl border border-bone/15 bg-bone/[0.03] px-4 py-3 text-xs font-mono text-bone/70 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
            >
              <span className="flex items-center gap-2">
                <FiTerminal className="size-3.5 text-accent" />
                <span>Scroll to top</span>
              </span>
              <span className="grid size-7 place-items-center rounded-full border border-bone/15 bg-bone/[0.04] transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-ink">
                <FiArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>

        {/* =========================================================
            3D Debossed Sculpted Brand Plate
            ========================================================= */}
        <div className="relative my-10 sm:my-14 flex justify-center select-none">
          {/* Brand Atmosphere Glow behind the slab */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-3xl h-36 rounded-full bg-gradient-to-r from-accent/10 via-violet/15 to-transparent blur-3xl -z-10"
          />

          {/* 3D Floating Brand Pedestal Slab */}
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-bone/15 bg-gradient-to-b from-[#161a25] via-[#10131c] to-[#0a0c12] py-10 sm:py-16 px-6 sm:px-12 text-center shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.14),inset_0_-2px_4px_rgba(0,0,0,0.7)]">
            {/* Top specular highlight rim with subtle brand accent */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-80"
            />

            {/* 3D Debossed / Engraved 'Rasel' in Brand Theme */}
            <h2
              className="font-serif not-italic font-normal text-[clamp(4.5rem,15vw,11.5rem)] leading-[0.88] tracking-tight inline-block select-none"
              style={{
                color: "transparent",
                backgroundImage:
                  "linear-gradient(180deg, #050608 0%, #11141c 40%, rgba(242, 239, 233, 0.28) 100%)",
                WebkitBackgroundClip: "text",
                filter:
                  "drop-shadow(0px 1.5px 1px rgba(242, 239, 233, 0.4)) drop-shadow(0px -2px 3px rgba(0, 0, 0, 0.98)) drop-shadow(0px 2px 8px rgba(210, 255, 58, 0.15))",
              }}
            >
              Rasel
              <span
                className="text-accent inline-block ml-1"
                style={{
                  WebkitTextFillColor: "#d2ff3a",
                  filter: "drop-shadow(0 0 16px rgba(210, 255, 58, 0.6))",
                }}
              >
                .
              </span>
            </h2>
          </div>
        </div>

        {/* =========================================================
            Bottom Legal & Credits Bar
            ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-bone/50 border-t border-bone/10 pt-6">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-bone/60">
              <FiGlobe className="size-3.5 text-accent" />
              <span>Built with Next.js 16, React 19 &amp; Lenis</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
