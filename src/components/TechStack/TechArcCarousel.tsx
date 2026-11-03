"use client";

import React, { useEffect, useRef, useCallback } from "react";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiRedux,
  SiPostgresql,
  SiFirebase,
  SiGit,
  SiStripe,
  SiJavascript,
} from "react-icons/si";

interface TechItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "State" | "Tool" | "Payment";
  pill: string;
  desc: string;
  accentColor: string;
  icon: React.ReactNode;
}

const TECH_STACK: TechItem[] = [
  {
    id: "react",
    name: "React.js",
    category: "Frontend",
    pill: "Hooks & Architecture",
    desc: "Reusable components, virtual DOM, and fluid state-driven UI.",
    accentColor: "#61dafb",
    icon: <SiReact className="size-11" style={{ color: "#61dafb" }} />,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    pill: "SSR, SSG & App Router",
    desc: "Hybrid rendering, server actions, and high-performance SEO.",
    accentColor: "#ffffff",
    icon: <SiNextdotjs className="size-11 text-white" />,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    pill: "Type-Safe Clean Code",
    desc: "Strict type safety, custom interfaces, and resilient contracts.",
    accentColor: "#3178c6",
    icon: <SiTypescript className="size-11" style={{ color: "#3178c6" }} />,
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    pill: "Scalable Services",
    desc: "Event-driven runtime powering high-throughput backend APIs.",
    accentColor: "#5fa04e",
    icon: <SiNodedotjs className="size-11" style={{ color: "#5fa04e" }} />,
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    pill: "REST Endpoints & JWT",
    desc: "Robust middleware pipelines, secure token auth & routing.",
    accentColor: "#f2efe9",
    icon: <SiExpress className="size-11 text-white" />,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    pill: "Mongoose & NoSQL",
    desc: "Document schemas, pipeline aggregations, and indexing.",
    accentColor: "#47a248",
    icon: <SiMongodb className="size-11" style={{ color: "#47a248" }} />,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    pill: "Pixel-Perfect UI",
    desc: "Utility-first design tokens, modern responsive layouts & dark mode.",
    accentColor: "#38bdf8",
    icon: <SiTailwindcss className="size-11" style={{ color: "#38bdf8" }} />,
  },
  {
    id: "zustand",
    name: "Zustand",
    category: "State",
    pill: "ScubaLife & Vendo",
    desc: "Minimalist, hook-based global state with zero boilerplate.",
    accentColor: "#f59e0b",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/icons/zustand.svg"
        alt="Zustand"
        className="size-11 object-contain"
      />
    ),
  },
  {
    id: "redux",
    name: "Redux Toolkit",
    category: "State",
    pill: "Centralized Store",
    desc: "Predictable state container with RTK Query and typed dispatch.",
    accentColor: "#764abc",
    icon: <SiRedux className="size-11" style={{ color: "#764abc" }} />,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    pill: "Relational Schemas",
    desc: "ACID transactions, relational modeling, and complex joins.",
    accentColor: "#336791",
    icon: <SiPostgresql className="size-11" style={{ color: "#4169e1" }} />,
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Backend",
    pill: "Auth & Realtime DB",
    desc: "Instant OAuth authentication, Firestore sync & cloud hosting.",
    accentColor: "#ffa000",
    icon: <SiFirebase className="size-11" style={{ color: "#ffca28" }} />,
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Tool",
    pill: "CI/CD & Reviews",
    desc: "Feature branches, code reviews, semantic versioning & PRs.",
    accentColor: "#f05032",
    icon: <SiGit className="size-11" style={{ color: "#f05032" }} />,
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "Payment",
    pill: "Online Payments",
    desc: "Seamless checkout, webhooks & automated order processing.",
    accentColor: "#635bff",
    icon: <SiStripe className="size-11" style={{ color: "#635bff" }} />,
  },
  {
    id: "javascript",
    name: "JavaScript ES6+",
    category: "Frontend",
    pill: "Core Engine",
    desc: "Async/await, DOM APIs, event loop, and modular functional code.",
    accentColor: "#f7df1e",
    icon: <SiJavascript className="size-11 rounded" style={{ color: "#f7df1e" }} />,
  },
];

const CARD_WIDTH = 230;
const CARD_GAP = 28;
const ITEM_WIDTH = CARD_WIDTH + CARD_GAP;
const TOTAL_ITEMS = TECH_STACK.length;
const TRACK_WIDTH = TOTAL_ITEMS * ITEM_WIDTH;

interface TechArcCarouselProps {
  embedded?: boolean;
}

export default function TechArcCarousel({ embedded = false }: TechArcCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);
  const speedRef = useRef(0.7);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Update card positions along parabolic arch
  const updateCardTransforms = useCallback(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth || 1400;
    const centerX = containerWidth / 2;
    const currentOffset = offsetRef.current;

    for (let i = 0; i < TOTAL_ITEMS; i++) {
      const cardEl = cardRefs.current[i];
      if (!cardEl) continue;

      let baseX = (i * ITEM_WIDTH + currentOffset) % TRACK_WIDTH;
      if (baseX < 0) baseX += TRACK_WIDTH;

      let distFromCenter = baseX - centerX;
      if (distFromCenter > TRACK_WIDTH / 2) distFromCenter -= TRACK_WIDTH;
      if (distFromCenter < -TRACK_WIDTH / 2) distFromCenter += TRACK_WIDTH;

      const normX = distFromCenter / (containerWidth * 0.52);

      // Outside viewport bounds
      if (Math.abs(normX) > 1.35) {
        cardEl.style.opacity = "0";
        cardEl.style.pointerEvents = "none";
        cardEl.style.transform = "translate3d(0, -9999px, 0)";
        continue;
      }

      // Parabolic arch: apex is high in center, dipping downwards to left and right
      const translateY = Math.pow(normX, 2) * 72; // dip amount
      const rotateZ = normX * 18; // rotation tilt matching user image
      const scale = Math.max(0.86, 1.05 - Math.pow(normX, 2) * 0.14);
      const opacity = Math.max(0, Math.min(1, 1 - (Math.abs(normX) - 0.9) / 0.4));
      const zIndex = Math.round(100 - Math.abs(distFromCenter) / 10);

      cardEl.style.opacity = opacity.toString();
      cardEl.style.zIndex = zIndex.toString();
      cardEl.style.pointerEvents = opacity > 0.3 ? "auto" : "none";
      cardEl.style.transform = `translate3d(${distFromCenter}px, ${translateY}px, 0px) rotate(${rotateZ}deg) scale(${scale})`;
    }
  }, []);

  // Continuous animation loop — frame-rate independent, paused while off-screen
  useEffect(() => {
    const el = containerRef.current;
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (el) observer.observe(el);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 16.667, 3);
      last = now;
      if (visible && !document.hidden) {
        if (!isDraggingRef.current) {
          const targetSpeed = reduced ? 0 : isHoveredRef.current ? 0.15 : 0.7;
          speedRef.current += (targetSpeed - speedRef.current) * 0.05 * dt;
          offsetRef.current -= speedRef.current * dt;
        }
        updateCardTransforms();
      }
      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [updateCardTransforms]);

  // Drag and swipe interactions (pointer events cover mouse, touch and pen)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 4 && !e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    offsetRef.current = dragStartOffsetRef.current + delta;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const carouselBody = (
    <div
      ref={containerRef}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") isHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative mx-auto w-full overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing ${
        embedded ? "h-[200px] md:h-[235px]" : "h-[380px] md:h-[420px]"
      }`}
    >
      {/* Left & Right Edge Fades */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-40 w-24 md:w-48 bg-gradient-to-r from-ink via-ink/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-40 w-24 md:w-48 bg-gradient-to-l from-ink via-ink/80 to-transparent"
      />

      {/* Center Anchor Point where cards are positioned */}
      <div className={`absolute left-1/2 -translate-x-1/2 ${embedded ? "top-2" : "top-10"}`}>
        {TECH_STACK.map((tech, i) => (
          <div
            key={tech.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              width: `${CARD_WIDTH}px`,
              marginLeft: `-${CARD_WIDTH / 2}px`,
            }}
            className="group absolute top-0 left-0 will-change-transform transition-[box-shadow,border-color] duration-300"
          >
            {/* Luxury Glass Card matching user's reference screenshot */}
            <div
              className="relative flex h-[290px] flex-col justify-between overflow-hidden rounded-2xl border border-bone/15 bg-[#0f131f]/90 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              style={{
                boxShadow: `0 16px 36px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(242, 239, 233, 0.08)`,
              }}
            >
              {/* Subtle Brand Accent Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-12 -right-12 size-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ backgroundColor: tech.accentColor }}
              />

              {/* Top Row: Floating badge pill matching screenshot */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-bone/15 bg-bone/[0.05] px-2.5 py-0.5 text-[10.5px] font-mono text-bone/75 backdrop-blur-md">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: tech.accentColor }}
                  />
                  <span>{tech.pill}</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-bone/40">
                  {tech.category}
                </span>
              </div>

              {/* Middle: Tech Logo with Soft Glow */}
              <div className="my-auto flex flex-col items-center text-center py-2">
                <div className="relative mb-3.5 grid place-items-center rounded-2xl bg-bone/[0.03] p-3 border border-bone/10 transition-transform duration-300 group-hover:scale-110">
                  {tech.icon}
                </div>
                <h3 className="text-lg font-medium text-bone tracking-tight">
                  {tech.name}
                </h3>
              </div>

              {/* Bottom: CV Highlight Description */}
              <div className="border-t border-bone/10 pt-3">
                <p className="text-[11.5px] leading-relaxed text-bone/60 line-clamp-2">
                  {tech.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (embedded) {
    return carouselBody;
  }

  return (
    <section
      aria-label="Technology Stack"
      className="relative isolate overflow-hidden bg-ink py-16 md:py-24 border-t border-bone/10"
    >
      {/* Background Soft Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-[circle_at_50%_40%] from-accent/[0.04] via-violet/[0.04] to-transparent"
      />

      {/* Header Eyebrow & Title */}
      <div className="mx-auto max-w-4xl px-6 text-center mb-12 md:mb-16">
        <p className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-bone/50 uppercase font-mono">
          <span className="h-px w-6 bg-accent" />
          Technical Expertise &amp; Core Stack
          <span className="h-px w-6 bg-accent" />
        </p>
        <h2 className="mt-3.5 text-2xl md:text-4xl font-medium tracking-tight text-bone">
          Technologies I Build With
        </h2>
        <p className="mt-2.5 text-sm md:text-base text-bone/60 max-w-xl mx-auto">
          Hover to pause, drag horizontally to explore full-stack capabilities.
        </p>
      </div>

      {carouselBody}
    </section>
  );
}
