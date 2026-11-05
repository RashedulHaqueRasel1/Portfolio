"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/cn";
import { NAV_LINKS, SOCIALS, easeOutQuart } from "@/lib/site";

const LINKS = NAV_LINKS;
const SOCIAL_LIST = [SOCIALS.github, SOCIALS.linkedin, SOCIALS.email];

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const lastScroll = useRef(0);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* Hide on scroll down, reveal on scroll up — driven by Lenis */
  const lenis = useLenis(({ scroll }) => {
    setScrolled(scroll > 24);
    const delta = scroll - lastScroll.current;
    if (Math.abs(delta) < 8) return;
    setHidden(delta > 0 && scroll > 240);
    lastScroll.current = scroll;
  });

  /* Track which section is in view */
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Sliding pill follows the hovered link, falls back to the active one */
  const updatePill = useCallback(() => {
    const target = linkRefs.current[hovered ?? active];
    if (!target) return setPill((p) => ({ ...p, visible: false }));
    setPill({ left: target.offsetLeft, width: target.offsetWidth, visible: true });
  }, [hovered, active]);

  useIsomorphicLayoutEffect(() => {
    updatePill();
  }, [updatePill]);

  useEffect(() => {
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  /* Lock scroll while the mobile menu is open */
  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const goTo = (e: React.MouseEvent, href: string) => {
    setMenuOpen(false);
    setActive(href);
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      // Navigate back to the homepage section
      window.location.href = `/${href}`;
      return;
    }
    e.preventDefault();
    requestAnimationFrame(() => {
      lenis?.scrollTo(href, { duration: 1.5, easing: easeOutQuart, offset: href === "#home" ? 0 : -8 });
    });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-100 px-4 sm:px-6 md:px-10 pt-4",
          "animate-nav-in transition-transform duration-700 ease-out-expo",
          hidden && !menuOpen && "-translate-y-[130%]",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "relative mx-auto grid h-14 max-w-7xl grid-cols-[1fr_auto] items-center rounded-full border pr-1.5 pl-3 md:grid-cols-[1fr_auto_1fr] md:pl-4",
            "transition-all duration-500 ease-out-expo",
            scrolled
              ? "border-white/10 bg-ink-soft/80 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl backdrop-saturate-150"
              : "border-white/5 bg-ink/30 backdrop-blur-sm",
          )}
        >
          {/* Logo */}
          <a
            href="/"
            id="nav-logo"
            onClick={(e) => {
              if (typeof window !== "undefined" && window.location.pathname !== "/") {
                return;
              }
              goTo(e, "#home");
            }}
            className="group inline-flex items-center gap-2.5 justify-self-start font-semibold tracking-tight cursor-pointer select-none"
          >
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-full bg-bone font-serif text-lg font-normal text-ink italic transition-all duration-500 ease-out-expo group-hover:-rotate-12 group-hover:scale-105 group-hover:bg-accent"
            >
              R
            </span>
          </a>

          {/* Desktop links with sliding pill */}
          <ul
            onMouseLeave={() => setHovered(null)}
            className="relative hidden items-center gap-0.5 rounded-full border border-bone/10 bg-white/[0.03] p-1 backdrop-blur-md md:flex"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-1 left-0 rounded-full bg-bone shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-[transform,width,opacity] duration-500 ease-out-expo"
              style={{
                transform: `translateX(${pill.left}px)`,
                width: pill.width,
                opacity: pill.visible ? 1 : 0,
              }}
            />
            {LINKS.map((link) => {
              const isOn = (hovered ?? active) === link.href;
              return (
                <li key={link.href}>
                  <a
                    id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    ref={(el) => {
                      linkRefs.current[link.href] = el;
                    }}
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    onClick={(e) => goTo(e, link.href)}
                    aria-current={active === link.href ? "true" : undefined}
                    className={cn(
                      "group/link relative z-10 block overflow-hidden rounded-full px-4 lg:px-5 py-2 text-sm font-medium transition-colors duration-300",
                      isOn ? "text-ink font-semibold" : "text-bone/60 hover:text-bone",
                    )}
                  >
                    {/* vertical text roll on hover */}
                    <span
                      data-text={link.label}
                      className="relative inline-block leading-[1.4] transition-transform duration-500 ease-out-expo group-hover/link:-translate-y-[120%] after:absolute after:top-[120%] after:left-0 after:content-[attr(data-text)]"
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 justify-self-end">
            <a
              href="#contact"
              id="nav-cta"
              onClick={(e) => goTo(e, "#contact")}
              className="group hidden h-[42px] items-center gap-2.5 rounded-full bg-accent pr-2 pl-4 text-sm font-semibold text-ink transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_8px_25px_-4px_rgba(210,255,58,0.5)] min-[481px]:inline-flex"
            >
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink/50" />
                <span className="relative inline-flex size-2 rounded-full bg-ink" />
              </span>
              <span>Let&apos;s talk</span>
              <span className="grid size-7 place-items-center rounded-full bg-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="size-3.5 fill-none stroke-accent [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"
                >
                  <path d="M4 12 12 4M5.5 4H12v6.5" />
                </svg>
              </span>
            </a>

            {/* Mobile toggle */}
            <button
              id="nav-menu-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative size-[42px] cursor-pointer rounded-full bg-bone hover:bg-accent transition-colors duration-300 md:hidden"
            >
              <span
                className={cn(
                  "absolute inset-x-[13px] h-[1.5px] rounded bg-ink transition-[rotate,top] duration-500 ease-out-expo",
                  menuOpen ? "top-[20.5px] rotate-45" : "top-[17px]",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-[13px] h-[1.5px] rounded bg-ink transition-[rotate,top] duration-500 ease-out-expo",
                  menuOpen ? "top-[20.5px] -rotate-45" : "top-[24px]",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu — circular reveal from the burger */}
      <div
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 z-90 flex flex-col justify-between bg-ink/95 px-6 pt-32 pb-10 backdrop-blur-2xl md:hidden",
          "transition-[clip-path] duration-700 ease-in-out-expo",
          menuOpen
            ? "[clip-path:circle(150%_at_calc(100%_-_44px)_44px)]"
            : "pointer-events-none [clip-path:circle(0%_at_calc(100%_-_44px)_44px)]",
        )}
      >
        <ul>
          {LINKS.map((link, i) => (
            <li key={link.href} className="overflow-hidden border-b border-bone/10">
              <a
                id={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                href={link.href}
                tabIndex={menuOpen ? 0 : -1}
                onClick={(e) => goTo(e, link.href)}
                style={{ transitionDelay: menuOpen ? `${0.2 + i * 0.06}s` : "0s" }}
                className={cn(
                  "flex items-baseline gap-4 py-4 font-serif text-[clamp(2.5rem,10vw,4rem)] leading-none tracking-tight",
                  "transition-[translate,color] duration-700 ease-out-expo hover:text-accent hover:italic",
                  menuOpen ? "translate-y-0" : "translate-y-[110%]",
                  active === link.href ? "text-bone italic" : "text-bone/50",
                )}
              >
                <span className="font-sans text-xs tracking-wider text-accent not-italic font-mono">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={cn(
            "flex items-center justify-between gap-6 pt-6 border-t border-bone/10 text-sm text-bone/60 transition-opacity duration-500",
            menuOpen ? "opacity-100 delay-500" : "opacity-0",
          )}
        >
          <div className="flex gap-5">
            {SOCIAL_LIST.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={menuOpen ? 0 : -1}
                className="transition-colors hover:text-accent font-mono text-xs tracking-wide"
              >
                {s.label}
              </a>
            ))}
          </div>
          <span className="text-xs font-mono text-accent">Available for work</span>
        </div>
      </div>
    </>
  );
}
