"use client";

import { useLenis } from "lenis/react";
import { FiArrowUp, FiGithub, FiGlobe, FiLinkedin, FiMail } from "react-icons/fi";
import { SITE, SOCIALS, easeOutQuart } from "@/lib/site";

export default function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5, easing: easeOutQuart });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      aria-label="Footer"
      className="relative isolate overflow-hidden border-t border-bone/10 bg-ink pt-6 sm:pt-8 md:pt-10 pb-0 select-none"
    >
      {/* Atmospheric Ambient Glow rising from the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 sm:h-96 bg-[radial-gradient(ellipse_80%_65%_at_50%_100%,rgba(234,88,12,0.18),rgba(210,255,58,0.06),transparent)] blur-3xl -z-10"
      />

      {/* Top 2-Sided Row: Left Info & Right Socials/Contact */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 md:px-14 lg:px-16 mb-8 sm:mb-12 md:mb-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-6">
          {/* Left Side: Roles Availability, Location & Copyright */}
          <div className="flex flex-col gap-1.5 max-w-lg">
            <p className="text-base sm:text-lg md:text-xl font-sans font-medium text-bone/90 tracking-tight">
              Open for Worldwide Remote &amp; On-Site Roles.
            </p>
            <p className="text-xs sm:text-sm text-bone/60 font-sans">
              Dhaka, Bangladesh
            </p>
            <p className="mt-1 text-xs text-bone/45 font-mono">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
          </div>

          {/* Right Side: Social Icons & Direct Contact E-mail */}
          <div className="flex flex-col items-start sm:items-end text-left sm:text-right gap-3">
            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5">
              <a
                href={SOCIALS.github.href}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="size-10 rounded-full border border-bone/15 bg-bone/[0.04] grid place-items-center text-bone/75 hover:text-ink hover:bg-accent hover:border-accent transition-all duration-300"
              >
                <FiGithub className="size-4" />
              </a>
              <a
                href={SOCIALS.linkedin.href}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="size-10 rounded-full border border-bone/15 bg-bone/[0.04] grid place-items-center text-bone/75 hover:text-ink hover:bg-accent hover:border-accent transition-all duration-300"
              >
                <FiLinkedin className="size-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Send Email"
                className="size-10 rounded-full border border-bone/15 bg-bone/[0.04] grid place-items-center text-bone/75 hover:text-ink hover:bg-accent hover:border-accent transition-all duration-300"
              >
                <FiMail className="size-4" />
              </a>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top"
                className="size-10 rounded-full border border-bone/15 bg-bone/[0.04] grid place-items-center text-bone/75 hover:text-ink hover:bg-accent hover:border-accent transition-all duration-300 cursor-pointer"
              >
                <FiArrowUp className="size-4" />
              </button>
            </div>

            {/* Direct Contact Email */}
            {/* <p className="text-xs sm:text-sm text-bone/65 font-sans">
              <span className="text-bone/40">E-mail: </span>
              <a
                href={`mailto:${SITE.email}`}
                className="text-bone/85 hover:text-accent transition-colors font-medium"
              >
                {SITE.email}
              </a>
            </p> */}
          </div>
        </div>
      </div>

      {/* Full-Bleed Giant Brand Typography 'Rasel' rising from bottom */}
      <div className="relative overflow-hidden text-center select-none pointer-events-none w-full">
        <span className="block font-sans font-bold tracking-tight text-[clamp(7.5rem,28vw,38rem)] leading-[0.72] text-bone/[0.12] whitespace-nowrap -mb-3 sm:-mb-6 md:-mb-10 lg:-mb-14">
          Rasel
        </span>
      </div>
    </footer>
  );
}
