"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiRedux,
  SiGit,
  SiStripe,
} from "react-icons/si";
import { FiLayers } from "react-icons/fi";

interface TechNode {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "State & Tools";
  icon: React.ReactNode;
  accent: string;
  description: string;
  tags: string[];
}

// All 14 skills arranged symmetrically across the Center Flow architecture
const TECH_NODES: Record<string, TechNode> = {
  // Top Row: Core Frameworks & Languages
  typescript: {
    id: "typescript",
    name: "TypeScript",
    category: "Frontend",
    icon: <SiTypescript className="size-7" style={{ color: "#3178c6" }} />,
    accent: "#3178c6",
    description: "Type-safe scalable application development.",
    tags: ["Strict Types", "Generics", "Interfaces"],
  },
  nextjs: {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    icon: <SiNextdotjs className="size-7 text-white" />,
    accent: "#ffffff",
    description: "Full-stack production React framework.",
    tags: ["App Router", "SSR / SSG", "Server Actions"],
  },
  react: {
    id: "react",
    name: "React.js",
    category: "Frontend",
    icon: <SiReact className="size-7" style={{ color: "#61dafb" }} />,
    accent: "#61dafb",
    description: "Component-driven reactive user interfaces.",
    tags: ["Custom Hooks", "Reactive State", "Virtual DOM"],
  },
  javascript: {
    id: "javascript",
    name: "JavaScript (ES6+)",
    category: "Frontend",
    icon: <SiJavascript className="size-7 rounded" style={{ color: "#f7df1e" }} />,
    accent: "#f7df1e",
    description: "Modern asynchronous web programming.",
    tags: ["ES6+", "Async / Await", "Event Loop"],
  },

  // Left Column: Styling & Client State
  tailwind: {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    icon: <SiTailwindcss className="size-7" style={{ color: "#38bdf8" }} />,
    accent: "#38bdf8",
    description: "Utility-first modern responsive styling.",
    tags: ["v4 CSS", "Responsive", "Glassmorphism"],
  },
  zustand: {
    id: "zustand",
    name: "Zustand",
    category: "State & Tools",
    icon: (
      <div className="relative size-7">
        <Image src="/icons/zustand.svg" alt="Zustand" fill className="object-contain" />
      </div>
    ),
    accent: "#f59e0b",
    description: "Lightweight frictionless state management.",
    tags: ["Global State", "Zero Boilerplate", "Hooks"],
  },
  redux: {
    id: "redux",
    name: "Redux Toolkit",
    category: "State & Tools",
    icon: <SiRedux className="size-7" style={{ color: "#764abc" }} />,
    accent: "#764abc",
    description: "Predictable centralized global store.",
    tags: ["RTK Query", "Normalized Cache", "Global State"],
  },

  // Right Column: Backend & Development Tools
  nodejs: {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    icon: <SiNodedotjs className="size-7" style={{ color: "#5fa04e" }} />,
    accent: "#5fa04e",
    description: "Scalable server-side JavaScript runtime.",
    tags: ["Runtime", "Event-Driven", "REST APIs"],
  },
  express: {
    id: "express",
    name: "Express.js",
    category: "Backend",
    icon: <SiExpress className="size-7 text-white" />,
    accent: "#f2efe9",
    description: "Minimal modular backend APIs.",
    tags: ["Middleware", "JWT Auth", "Route Handlers"],
  },
  git: {
    id: "git",
    name: "Git & GitHub",
    category: "State & Tools",
    icon: <SiGit className="size-7" style={{ color: "#f05032" }} />,
    accent: "#f05032",
    description: "Distributed version control workflow.",
    tags: ["Version Control", "PR Workflows", "CI/CD"],
  },

  // Bottom Row: Databases & Cloud Infrastructure
  firebase: {
    id: "firebase",
    name: "Firebase",
    category: "Database",
    icon: <SiFirebase className="size-7" style={{ color: "#ffca28" }} />,
    accent: "#ffca28",
    description: "Real-time cloud database platform.",
    tags: ["Firestore", "OAuth Auth", "Real-Time"],
  },
  mongodb: {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    icon: <SiMongodb className="size-7" style={{ color: "#47a248" }} />,
    accent: "#47a248",
    description: "Flexible high-performance NoSQL database.",
    tags: ["NoSQL", "Mongoose", "Aggregation"],
  },
  postgresql: {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    icon: <SiPostgresql className="size-7" style={{ color: "#4169e1" }} />,
    accent: "#4169e1",
    description: "Robust relational SQL database.",
    tags: ["SQL", "Relational", "ACID Compliant"],
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    category: "State & Tools",
    icon: <SiStripe className="size-7" style={{ color: "#635bff" }} />,
    accent: "#635bff",
    description: "Secure global payments infrastructure.",
    tags: ["Checkout", "Webhooks", "Payment Security"],
  },
};

// 14 Connection paths perfectly balanced in a 1160 x 620 coordinate space
// Originating directly from the circular boundary of the central globe icon (radius ~ 38px at 580, 310)
const PATH_CONFIGS = [
  // Top row (4 nodes)
  {
    key: "nextjs",
    nodeX: 470,
    nodeY: 65,
    pathD: "M 565 274 C 565 170, 470 140, 470 93",
    length: 195,
    delay: 0.0,
  },
  {
    key: "react",
    nodeX: 690,
    nodeY: 65,
    pathD: "M 595 274 C 595 170, 690 140, 690 93",
    length: 195,
    delay: 0.38,
  },
  {
    key: "typescript",
    nodeX: 300,
    nodeY: 85,
    pathD: "M 552 285 C 440 285, 370 170, 320 105",
    length: 280,
    delay: 0.76,
  },
  {
    key: "javascript",
    nodeX: 860,
    nodeY: 85,
    pathD: "M 608 285 C 720 285, 790 170, 840 105",
    length: 280,
    delay: 1.14,
  },

  // Left column (3 nodes)
  {
    key: "tailwind",
    nodeX: 160,
    nodeY: 185,
    pathD: "M 545 298 C 360 298, 260 190, 188 185",
    length: 370,
    delay: 1.52,
  },
  {
    key: "zustand",
    nodeX: 95,
    nodeY: 310,
    pathD: "M 542 310 L 123 310",
    length: 419,
    delay: 1.9,
  },
  {
    key: "redux",
    nodeX: 160,
    nodeY: 435,
    pathD: "M 545 322 C 360 322, 260 430, 188 435",
    length: 370,
    delay: 2.28,
  },

  // Right column (3 nodes)
  {
    key: "nodejs",
    nodeX: 1000,
    nodeY: 185,
    pathD: "M 615 298 C 800 298, 900 190, 972 185",
    length: 370,
    delay: 2.66,
  },
  {
    key: "express",
    nodeX: 1065,
    nodeY: 310,
    pathD: "M 618 310 L 1037 310",
    length: 419,
    delay: 3.04,
  },
  {
    key: "git",
    nodeX: 1000,
    nodeY: 435,
    pathD: "M 615 322 C 800 322, 900 430, 972 435",
    length: 370,
    delay: 3.42,
  },

  // Bottom row (4 nodes)
  {
    key: "mongodb",
    nodeX: 470,
    nodeY: 555,
    pathD: "M 565 346 C 565 450, 470 480, 470 527",
    length: 195,
    delay: 3.8,
  },
  {
    key: "postgresql",
    nodeX: 690,
    nodeY: 555,
    pathD: "M 595 346 C 595 450, 690 480, 690 527",
    length: 195,
    delay: 4.18,
  },
  {
    key: "firebase",
    nodeX: 300,
    nodeY: 535,
    pathD: "M 552 335 C 440 335, 370 450, 320 515",
    length: 280,
    delay: 4.56,
  },
  {
    key: "stripe",
    nodeX: 860,
    nodeY: 535,
    pathD: "M 608 335 C 720 335, 790 450, 840 515",
    length: 280,
    delay: 4.94,
  },
];

export default function CenterFlow() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>("nextjs");

  const pathRefs = useRef<Record<string, SVGPathElement | null>>({});
  const globeRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hoveredKeyRef = useRef<string | null>(null);
  const selectedKeyRef = useRef<string | null>("nextjs");

  // Keep refs in sync for 60-120fps direct hardware-accelerated RAF animation
  useEffect(() => {
    hoveredKeyRef.current = hoveredKey;
  }, [hoveredKey]);

  useEffect(() => {
    selectedKeyRef.current = selectedKey;
  }, [selectedKey]);

  const toggleNode = (key: string) => {
    setSelectedKey((prev) => (prev === key ? null : key));
  };

  // Ultra-smooth, calm and slower RAF loop (zero React re-render overhead)
  useEffect(() => {
    let animId: number;
    const start = performance.now();
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (rootRef.current) observer.observe(rootRef.current);

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (!visible) return;
      const elapsed = (now - start) / 1000;

      // 1. Continuous 3D Globe Rotation (16 degrees/second = smooth 22.5s full turn)
      if (globeRef.current) {
        const globeAngle = (elapsed * 16) % 360;
        globeRef.current.style.transform = `rotateX(18deg) rotateY(${globeAngle.toFixed(2)}deg)`;
      }

      // 2. Pulse Flow Animation along Circuit Paths
      PATH_CONFIGS.forEach((cfg) => {
        const el = pathRefs.current[cfg.key];
        if (!el) return;

        const isHovered = hoveredKeyRef.current === cfg.key;
        const isSelected = selectedKeyRef.current === cfg.key;
        const isActive = isHovered || isSelected;

        // Relaxed, calm travel duration (5.2s normal, 3.2s on active)
        const cycleDuration = isActive ? 3.2 : 5.2;
        const progress = ((elapsed + cfg.delay) % cycleDuration) / cycleDuration;

        const packetLen = 58;
        const totalLen = cfg.length;
        const dashOffset = -((progress * (totalLen + packetLen)) - packetLen);

        // Perfectly smooth sinusoidal breathing opacity
        const sinOpacity = Math.sin(progress * Math.PI);
        const targetOpacity = Math.max(0, sinOpacity * (isActive ? 1.0 : 0.85));

        el.setAttribute("stroke-dashoffset", dashOffset.toFixed(2));
        el.setAttribute("opacity", targetOpacity.toFixed(3));
      });
    };

    animId = requestAnimationFrame(loop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  const activeTech = selectedKey ? TECH_NODES[selectedKey] : null;

  return (
    <div ref={rootRef} className="relative w-full max-w-[1160px] mx-auto select-none my-6">
      {/* Mobile: compact selectable grid (the radial network needs a wide screen) */}
      <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-7 md:hidden">
        {PATH_CONFIGS.map((cfg) => {
          const tech = TECH_NODES[cfg.key];
          const isSelected = selectedKey === cfg.key;
          return (
            <button
              key={cfg.key}
              type="button"
              onClick={() => toggleNode(cfg.key)}
              aria-pressed={isSelected}
              aria-label={tech.name}
              className={`flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border p-2 transition-all duration-300 ${
                isSelected
                  ? "border-accent/60 bg-[#141722]/95 shadow-[0_0_14px_rgba(210,255,58,0.2)]"
                  : "border-bone/10 bg-[#0e1017]/90"
              }`}
            >
              {tech.icon}
              <span className="w-full truncate text-center font-mono text-[9px] text-bone/55">
                {tech.name.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop: radial circuit network */}
      <div className="hidden w-full md:block">
        <div className="relative w-full aspect-[1160/620] overflow-visible">
          {/* Subtle Faint Ambient Background Glow (Subtle and not overpowering) */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 sm:size-80 rounded-full opacity-20 blur-3xl transition-all duration-700"
            style={{
              background:
                "radial-gradient(circle, rgba(210, 255, 58, 0.15) 0%, rgba(122, 92, 255, 0.1) 45%, rgba(11, 11, 12, 0) 70%)",
            }}
          />

          {/* =========================================================
              SVG Layer: Circuit Paths & Flowing Dotted Light Pulses
              ========================================================= */}
          <svg
            viewBox="0 0 1160 620"
            className="absolute inset-0 size-full pointer-events-none overflow-visible"
          >
            <defs>
              {/* Electric Lime Neon Glow Filter tuned for thin sharp dotted pulses */}
              <filter id="themePulseGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Base Subtle Circuit Connection Lines (Ultra-thin & precise) */}
            {PATH_CONFIGS.map((cfg) => {
              const isHovered = hoveredKey === cfg.key;
              const isSelected = selectedKey === cfg.key;
              const isActive = isHovered || isSelected;

              return (
                <path
                  key={`base-${cfg.key}`}
                  d={cfg.pathD}
                  fill="none"
                  stroke={
                    isSelected
                      ? "rgba(210, 255, 58, 0.75)"
                      : isHovered
                        ? "rgba(210, 255, 58, 0.5)"
                        : "rgba(242, 239, 233, 0.07)"
                  }
                  strokeWidth={isActive ? 1.5 : 0.9}
                  strokeLinecap="round"
                  className="transition-colors duration-300"
                />
              );
            })}

            {/* 2. Traveling Dotted Neon Light Pulses (Slow, graceful beads streaming outward) */}
            {PATH_CONFIGS.map((cfg) => {
              const isHovered = hoveredKey === cfg.key;
              const isSelected = selectedKey === cfg.key;
              const isActive = isHovered || isSelected;

              // Dotted packet: 7 tiny rounded beads (1.5px dot + 8.5px spacing)
              const dotCluster = "1.5 8.5 1.5 8.5 1.5 8.5 1.5 8.5 1.5 8.5 1.5 8.5 1.5";
              const packetLen = 58;
              const totalLen = cfg.length;

              return (
                <path
                  key={`pulse-${cfg.key}`}
                  ref={(el) => {
                    pathRefs.current[cfg.key] = el;
                  }}
                  d={cfg.pathD}
                  fill="none"
                  stroke={isSelected ? "#ffffff" : "#d2ff3a"}
                  strokeWidth={isActive ? 2.0 : 1.5}
                  strokeLinecap="round"
                  filter="url(#themePulseGlow)"
                  strokeDasharray={`${dotCluster} ${totalLen + packetLen * 2}`}
                  strokeDashoffset={packetLen}
                  opacity={0}
                />
              );
            })}
          </svg>

          {/* =========================================================
              Center: Minimal & Refined 3D Tech Core (Clean, Calm & Professional)
              ========================================================= */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
            <div
              className="group relative flex items-center justify-center size-[76px] cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none"
              style={{ perspective: "800px" }}
              title="Central Tech Hub — Click to reset selection"
              role="button"
              tabIndex={0}
              aria-label="Central Tech Hub"
              onClick={() => setSelectedKey(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedKey(null);
                }
              }}
            >
              {/* 1. Ultra-Subtle Ambient Background Glow (Calm & non-distracting) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-full opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-35"
                style={{
                  background:
                    "radial-gradient(circle, rgba(210,255,58,0.25) 0%, rgba(122,92,255,0.15) 50%, transparent 70%)",
                }}
              />

              {/* 2. Semi-Translucent Glass Sphere (Light, airy & blends seamlessly) */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full border border-bone/15 bg-[#141824]/30 backdrop-blur-sm transition-all duration-300 group-hover:border-accent/40 group-hover:bg-[#141824]/40 pointer-events-none overflow-hidden"
                style={{
                  boxShadow:
                    "inset 0 1px 1.5px rgba(255,255,255,0.12), 0 0 12px rgba(210,255,58,0.06)",
                }}
              >
                {/* Very subtle soft curvature glint */}
                <div
                  className="absolute -top-1 left-3 size-7 rounded-full pointer-events-none opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 30%, rgba(255,255,255,0.4) 0%, transparent 70%)",
                  }}
                />
              </div>

              {/* 3. Clean 3D Rotating Wireframe (3 meridians + 1 equator, calm line weight) */}
              <div
                ref={globeRef}
                className="relative size-full rounded-full transition-transform duration-300 pointer-events-none"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(18deg) rotateY(0deg)",
                  willChange: "transform",
                }}
              >
                {/* 3 Meridian Rings (Clean 60° spacing instead of dense mesh) */}
                <div
                  className="absolute inset-0 rounded-full border border-accent/35 pointer-events-none"
                  style={{ transform: "rotateY(0deg)" }}
                />
                <div
                  className="absolute inset-0 rounded-full border border-accent/25 pointer-events-none"
                  style={{ transform: "rotateY(60deg)" }}
                />
                <div
                  className="absolute inset-0 rounded-full border border-accent/25 pointer-events-none"
                  style={{ transform: "rotateY(120deg)" }}
                />

                {/* Single Clean Equator Ring */}
                <div
                  className="absolute inset-0 rounded-full border border-accent/30 pointer-events-none"
                  style={{ transform: "rotateX(90deg)" }}
                />

                {/* Subtle dashed latitude guides */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[58px] rounded-full border border-dashed border-bone/10 pointer-events-none"
                  style={{ transform: "translateY(-16px) rotateX(90deg)" }}
                />
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[58px] rounded-full border border-dashed border-bone/10 pointer-events-none"
                  style={{ transform: "translateY(16px) rotateX(90deg)" }}
                />
              </div>

              {/* 4. Elegant Minimal Central Core (Soft, eye-friendly glowing dot) */}
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-10"
              >
                {/* Gentle soft pulsing halo */}
                <div className="absolute size-4 rounded-full bg-accent/20 animate-pulse" />
                {/* Clean core dot */}
                <div className="relative size-2 rounded-full bg-bone shadow-[0_0_6px_rgba(210,255,58,0.45)] transition-all duration-300 group-hover:bg-accent group-hover:scale-110" />
              </div>

              {/* 5. Minimal Clean Hover Badge */}
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-bone/15 bg-ink/95 px-2 py-0.5 text-[10px] font-mono text-bone shadow-lg backdrop-blur-md transition-all duration-200 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 z-50 flex items-center gap-1.5"
              >
                <span className="size-1 rounded-full bg-accent" />
                <span className="text-bone/90">CORE HUB</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              14 Outer Nodes (Clickable & Interactive)
              ========================================================= */}
          {PATH_CONFIGS.map((cfg) => {
            const tech = TECH_NODES[cfg.key];
            if (!tech) return null;
            const isHovered = hoveredKey === cfg.key;
            const isSelected = selectedKey === cfg.key;

            // Convert coordinate values (1160 x 620) to percentage
            const leftPercent = (cfg.nodeX / 1160) * 100;
            const topPercent = (cfg.nodeY / 620) * 100;

            return (
              <div
                key={cfg.key}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                }}
                onClick={() => toggleNode(cfg.key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleNode(cfg.key);
                  }
                }}
                onFocus={() => setHoveredKey(cfg.key)}
                onBlur={() => setHoveredKey(null)}
                onDoubleClick={() => setSelectedKey(null)}
                onMouseEnter={() => setHoveredKey(cfg.key)}
                onMouseLeave={() => setHoveredKey(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group cursor-pointer focus:outline-none"
                role="button"
                tabIndex={0}
                aria-label={`Select ${tech.name}`}
              >
                {/* Outer Squircle Container matching website dark & lime palette */}
                <div
                  className={`relative flex size-14 sm:size-15 md:size-[66px] items-center justify-center rounded-2xl border transition-all duration-300 backdrop-blur-xl ${isSelected
                    ? "border-accent/60 bg-[#141722]/95 shadow-[0_0_14px_rgba(210,255,58,0.25)] scale-105"
                    : isHovered
                      ? "border-accent/40 bg-[#131620]/90 shadow-[0_0_8px_rgba(210,255,58,0.15)] scale-105"
                      : "border-bone/10 bg-[#0e1017]/90 hover:border-bone/25 hover:bg-[#131620]"
                    }`}
                >
                  {/* Tech Icon (Prominent & Clean) */}
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {tech.icon}
                  </div>
                </div>

                {/* Clean Hover Tooltip (Without 'Advanced' or 'Core Stack' badges) */}
                <div
                  className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-bone/15 bg-ink/95 px-2.5 py-1 text-[11px] font-mono text-bone shadow-2xl backdrop-blur-md transition-all duration-200 z-50 ${cfg.nodeY < 240 ? "top-full mt-2.5" : "bottom-full mb-2.5"
                    } ${isHovered && !isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                >
                  <div className="font-semibold text-bone">{tech.name}</div>
                  <div className="text-[9.5px] text-accent/80 tracking-wider uppercase mt-0.5">
                    {tech.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          Compact Interactive Technology Details Section (1-2 Lines)
          Appears/Updates when clicking any node in the Center Flow
          ========================================================= */}
      <div className="mt-4 sm:mt-6 w-full max-w-3xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-bone/15 bg-gradient-to-r from-[#0f121d]/95 via-[#131722]/95 to-[#0f121d]/95 p-4 sm:p-5 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
          {/* Subtle Ambient Glow corresponding to active tech */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -left-12 size-36 rounded-full opacity-25 blur-2xl transition-all duration-500"
            style={{ backgroundColor: activeTech?.accent || "#d2ff3a" }}
          />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            {/* Left: Tech Icon + Title & Description directly underneath */}
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-bone/15 bg-bone/[0.04] p-2 text-white shadow-inner mt-0.5">
                {activeTech ? (
                  activeTech.icon
                ) : (
                  <FiLayers className="size-6 text-accent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-bone tracking-tight">
                    {activeTech ? activeTech.name : "Full-Stack Arsenal"}
                  </h3>
                  {activeTech && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent/90 border border-accent/20 bg-accent/10 rounded px-1.5 py-0.5">
                      {activeTech.category}
                    </span>
                  )}
                  {/* <span className="flex size-2 rounded-full bg-accent animate-ping" /> */}
                </div>
                {/* Description placed directly underneath */}
                <p className="mt-1 text-xs sm:text-sm text-bone/75 font-sans leading-relaxed">
                  {activeTech
                    ? activeTech.description
                    : "End-to-end modern web stack."}
                </p>
              </div>
            </div>

            {/* Right: Key Tags */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 shrink-0 self-start sm:self-center">
              {(activeTech
                ? activeTech.tags
                : ["Frontend", "Backend", "Databases", "DevOps & Tools"]
              ).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-bone/10 bg-bone/[0.03] px-2 py-0.5 text-[10.5px] font-mono text-bone/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Small interaction hint */}
        <p className="text-center mt-2.5 text-[11px] font-mono text-bone/45 tracking-wide">
          {activeTech
            ? "Click again to deactivate • Click any node to explore"
            : "Click any node above to explore details"}
        </p>
      </div>
    </div>
  );
}
