"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiCode,
  FiPackage,
  FiTerminal,
  FiExternalLink,
  FiLayers,
  FiStar,
  FiShield,
  FiClock,
  FiFileText,
} from "react-icons/fi";
import { SiNpm, SiGithub } from "react-icons/si";
import { PROJECTS } from "@/lib/projects";
import { Eyebrow } from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

interface NpmPackageCardProps {
  name: string;
  version: string;
  tagline: string;
  command: string;
  description: string;
  highlights: string[];
  npmUrl: string;
  slug: string;
  image: string;
  accentBadge: string;
  features: { label: string; value: string }[];
}

function NpmPackageCard({
  name,
  version,
  tagline,
  command,
  description,
  highlights,
  npmUrl,
  slug,
  image,
  accentBadge,
  features,
}: NpmPackageCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[32px] border border-bone/15 bg-[#0e121d]/90 p-6 sm:p-8 backdrop-blur-2xl transition-all duration-500 hover:border-accent/40 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
      {/* Glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 size-60 rounded-full bg-accent/[0.06] blur-3xl group-hover:bg-accent/15 transition-all duration-700"
      />

      <div>
        {/* Top Header & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-red-400">
              <SiNpm className="size-3.5 text-red-400" />
              <span>NPM Package</span>
            </span>
            <span className="rounded-full border border-bone/15 bg-bone/[0.05] px-2.5 py-0.5 font-mono text-[11px] text-bone/70">
              v{version}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[11px] text-accent">
            <FiStar className="size-3" />
            <span>{accentBadge}</span>
          </span>
        </div>

        {/* Title & Tagline */}
        <div className="mt-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-bone group-hover:text-accent transition-colors">
              {name}
            </h3>
            <a
              href={npmUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${name} on npmjs.com`}
              className="grid size-9 place-items-center rounded-full border border-bone/15 bg-bone/[0.04] text-bone/70 transition-all hover:border-red-400 hover:bg-red-500/10 hover:text-red-400"
            >
              <FiExternalLink className="size-4" />
            </a>
          </div>
          <p className="mt-1 font-mono text-xs text-bone/50">{tagline}</p>
        </div>

        {/* Interactive CLI Install Command Box */}
        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-bone/12 bg-black/60 px-4 py-3 font-mono text-xs shadow-inner">
          <div className="flex items-center gap-2.5 overflow-x-auto text-bone/90">
            <FiTerminal className="size-4 text-accent shrink-0" />
            <span className="text-accent/70 select-none">$</span>
            <code className="text-bone font-medium select-all">{command}</code>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-bone/15 bg-bone/[0.06] px-3 py-1.5 text-[11px] font-mono text-bone/80 transition-all hover:border-accent hover:bg-accent/15 hover:text-accent cursor-pointer shrink-0"
            title="Copy install command"
          >
            {copied ? (
              <>
                <FiCheck className="size-3 text-accent" />
                <span className="text-accent font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <FiCopy className="size-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Visual Preview */}
        <Link
          href={`/projects/${slug}`}
          className="relative mt-6 block aspect-[16/9] w-full overflow-hidden rounded-2xl border border-bone/12 bg-ink-soft cursor-pointer shadow-md"
        >
          <Image
            src={image}
            alt={name}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
        </Link>

        {/* Description */}
        <p className="mt-5 text-xs sm:text-sm text-bone/70 leading-relaxed font-sans">
          {description}
        </p>

        {/* Highlights List */}
        <ul className="mt-4 space-y-2">
          {highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs font-mono text-bone/65"
            >
              <FiCheck className="size-3.5 text-accent mt-0.5 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Metrics & Actions */}
      <div className="mt-6 pt-5 border-t border-bone/10">
        <div className="grid grid-cols-2 gap-3 mb-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-bone/10 bg-bone/[0.02] p-2.5"
            >
              <span className="block font-mono text-[10px] uppercase text-bone/45">
                {f.label}
              </span>
              <span className="mt-0.5 block font-mono text-xs font-semibold text-accent">
                {f.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline"
          >
            <span>Read Architecture Case Study</span>
            <FiArrowUpRight className="size-3.5" />
          </Link>

          <a
            href={npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-2 font-mono text-xs font-semibold text-red-300 transition-all hover:bg-red-500 hover:text-white"
          >
            <SiNpm className="size-4" />
            <span>npm registry</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function OpenSource() {
  return (
    <section
      id="open-source"
      aria-label="Open Source & Published Tools"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-bone/10 bg-ink py-20 sm:py-28 md:py-32"
    >
      {/* Background Lighting & Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -z-10 size-[700px] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[160px]"
      />

      {/* Outlined Watermark Text */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-12 right-4 -z-10 opacity-[0.06] select-none md:right-16"
      >
        <span className="font-serif text-[clamp(6rem,18vw,16rem)] leading-none tracking-tight text-outline italic">
          Labs
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-bone/10">
            <div className="max-w-2xl">
              <Eyebrow>05 {"//"} OPEN SOURCE &amp; LABS</Eyebrow>
              <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] font-medium tracking-tight text-bone">
                Developer Tools &amp;{" "}
                <span className="font-serif font-normal italic text-accent">
                  Published Packages
                </span>
                <span className="font-serif text-accent">.</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg font-sans text-bone/65 leading-relaxed">
                Open-source libraries, security CLI tooling, browser extensions,
                and viral web experiences engineered and maintained by Rashedul Haque Rasel.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.npmjs.com/~rashedulhaquerasel1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-xs text-red-300 backdrop-blur-md transition-all hover:bg-red-500 hover:text-white"
              >
                <SiNpm className="size-3.5" />
                <span>NPM Author Profile</span>
                <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://github.com/RashedulHaqueRasel1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.05] px-4 py-2 font-mono text-xs text-bone backdrop-blur-md transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
              >
                <SiGithub className="size-3.5" />
                <span>GitHub Repositories</span>
                <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>

        {/* 1. PUBLISHED NPM PACKAGES (HERO 2-COL GRID) */}
        <div className="mt-12 sm:mt-16">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
            <FiPackage className="size-4" />
            <span>FEATURED NPM PACKAGES ON NPMJS.COM</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* smart-pdf-js */}
            <Reveal delay={0.05}>
              <NpmPackageCard
                name="smart-pdf-js"
                version="1.0.1"
                tagline="Modern DOM-to-PDF Generator • OKLCH CSS & Smart Pagination"
                command="npm i smart-pdf-js"
                description="Engineered to solve modern CSS color crashes (OKLCH, Display-P3, CSS variables) and element page-break clipping in web-to-PDF conversion. Provides automatic pagination, retina upscaling, and TypeScript types out of the box."
                highlights={[
                  "Native OKLCH & Tailwind CSS v4 color space normalization",
                  "Smart multi-page pagination preventing text & image cutting",
                  "High-DPI canvas rasterization for crisp vector-like output",
                  "Zero-config promise API with customizable margins & layouts",
                ]}
                npmUrl="https://www.npmjs.com/package/smart-pdf-js"
                slug="smart-pdf-js"
                image="/images/projects/smart-pdf-js.png"
                accentBadge="Modern OKLCH Support"
                features={[
                  { label: "NPM Registry", value: "v1.0.1 Live" },
                  { label: "Color Gamut", value: "OKLCH Ready" },
                  { label: "Architecture", value: "Smart Breakpoints" },
                  { label: "TypeScript", value: "100% Typed" },
                ]}
              />
            </Reveal>

            {/* env-secret */}
            <Reveal delay={0.1}>
              <NpmPackageCard
                name="env-secret"
                version="1.0.1"
                tagline="Zero-Dependency Security CLI for Encrypting & Decrypting .env"
                command="npm i env-secret"
                description="Built to prevent leaked API keys and accidental repository commits. Uses native Node.js crypto primitives with Argon2 key derivation and AES-256-GCM authenticated encryption. Safely commit .env.enc files to git."
                highlights={[
                  "Zero external runtime dependencies for zero supply chain bloat",
                  "Argon2 password key derivation + AES-256-GCM cipher",
                  "Safe version control workflow: commit encrypted .env.enc files",
                  "Both interactive terminal CLI and programmatic ESM/CJS import",
                ]}
                npmUrl="https://www.npmjs.com/package/env-secret"
                slug="env-secret"
                image="/images/projects/env-secret.png"
                accentBadge="Zero-Dependency Security"
                features={[
                  { label: "NPM Registry", value: "v1.0.1 Live" },
                  { label: "Dependencies", value: "0 Zero-Bloat" },
                  { label: "Key Derivation", value: "Argon2 KDF" },
                  { label: "Cipher", value: "AES-256-GCM" },
                ]}
              />
            </Reveal>
          </div>
        </div>

        {/* 2. PERSONAL CREATIONS & WEB PRODUCTS (3-COL BENTO GRID) */}
        <div className="mt-16 sm:mt-24">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
              <FiCode className="size-4" />
              <span>PERSONAL WEB PRODUCTS &amp; BROWSER EXTENSIONS</span>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs text-bone/40">
              Conceived &amp; Developed Solo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: MCQ BD */}
            <Reveal delay={0.02}>
              <article className="group flex flex-col justify-between rounded-3xl border border-bone/12 bg-[#0e121d]/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] h-full">
                <div>
                  <Link
                    href="/projects/mcqbd"
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-bone/10 bg-ink-soft block cursor-pointer"
                  >
                    <Image
                      src="/images/projects/mcqbd.png"
                      alt="MCQ BD — HSC &amp; Admission Exam Preparation Platform"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] text-emerald-300 backdrop-blur-md">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>HSC &amp; Admission • Active Dev</span>
                      </span>
                    </div>
                  </Link>

                  <div className="mt-5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href="/projects/mcqbd"
                        className="group-hover:text-accent transition-colors"
                      >
                        <h3 className="font-sans text-xl font-medium text-bone">
                          MCQ BD 🎓
                        </h3>
                      </Link>
                      <Link
                        href="/projects/mcqbd"
                        className="grid size-8 place-items-center rounded-full border border-bone/15 bg-bone/[0.04] text-bone/70 transition-all hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-400 shrink-0"
                        title="View Case Study"
                      >
                        <FiArrowUpRight className="size-4" />
                      </Link>
                    </div>
                    <p className="mt-1 font-mono text-xs text-bone/50">
                      স্মার্টফোন দিয়েই HSC ও ভর্তি পরীক্ষার ১০০% প্রস্তুতি
                    </p>
                    <p className="mt-3 text-xs text-bone/65 leading-relaxed line-clamp-3">
                      বাংলাদেশের উচ্চ মাধ্যমিক (HSC) পরীক্ষার্থীদের জন্য তৈরি পূর্ণাঙ্গ ডিজিটাল এক্সাম
                      প্ল্যাটফর্ম। ৪টি মূল স্তম্ভ: অধ্যায়ভিত্তিক অনুশীলন, সকল বোর্ড প্রশ্ন (২০১৮-২৪),
                      শীর্ষ কলেজ টেস্ট পেপার এবং ঢাবি/বুয়েট/মেডিকেল ভর্তি প্রস্তুতি।
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-bone/8">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {["React Native", "Expo SDK 52", "Next.js 16", "Node.js", "MongoDB Atlas"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded-md border border-bone/10 bg-bone/[0.03] px-2 py-0.5 text-[10px] font-mono text-bone/60"
                        >
                          {t}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <Link
                      href="/projects/mcqbd"
                      className="text-accent hover:underline inline-flex items-center gap-1"
                    >
                      <span>Case Study</span>
                      <FiArrowUpRight className="size-3" />
                    </Link>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                        In Active Dev
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Card 2: Anatomy Lab 3D */}
            <Reveal delay={0.06}>
              <article className="group flex flex-col justify-between rounded-3xl border border-bone/12 bg-[#0e121d]/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-[0_20px_50px_rgba(20,184,166,0.15)] h-full">
                <div>
                  <Link
                    href="/projects/human-anatomy-3d"
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-bone/10 bg-ink-soft block cursor-pointer"
                  >
                    <Image
                      src="/images/projects/human-anatomy-3d.png"
                      alt="Anatomy Lab 3D — Real-Time 3D Human Anatomy & Virtual Surgery"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 font-mono text-[10px] text-teal-300 backdrop-blur-md">
                        <span>3D WebGL &amp; Surgery Simulator</span>
                      </span>
                    </div>
                  </Link>

                  <div className="mt-5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href="/projects/human-anatomy-3d"
                        className="group-hover:text-accent transition-colors"
                      >
                        <h3 className="font-sans text-xl font-medium text-bone">
                          Anatomy Lab 3D
                        </h3>
                      </Link>
                      <a
                        href="https://human-anatomy-3d-v2.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid size-8 place-items-center rounded-full border border-bone/15 bg-bone/[0.04] text-bone/70 transition-all hover:border-teal-400 hover:bg-teal-500/10 hover:text-teal-400 shrink-0"
                        title="Launch 3D Anatomy Lab"
                      >
                        <FiArrowUpRight className="size-4" />
                      </a>
                    </div>
                    <p className="mt-1 font-mono text-xs text-bone/50">
                      Real 3D Human Anatomy &amp; Surgery Practice
                    </p>
                    <p className="mt-3 text-xs text-bone/65 leading-relaxed line-clamp-3">
                      Interactive real human anatomy, live physiology, and virtual surgery
                      simulator in the browser for medical students. Cut with a scalpel,
                      observe beating hearts and blood flow, and practice 16 surgical procedures.
                      Bilingual (English / বাংলা).
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-bone/8">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {["Next.js 16", "Three.js", "R3F", "GLSL Shaders", "BVH Picking"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded-md border border-bone/10 bg-bone/[0.03] px-2 py-0.5 text-[10px] font-mono text-bone/60"
                        >
                          {t}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <Link
                      href="/projects/human-anatomy-3d"
                      className="text-accent hover:underline inline-flex items-center gap-1"
                    >
                      <span>Case Study</span>
                      <FiArrowUpRight className="size-3" />
                    </Link>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/RashedulHaqueRasel1/Human-Anatomy-3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-bone/70 hover:text-bone underline"
                      >
                        <span>GitHub</span>
                      </a>
                      <a
                        href="https://human-anatomy-3d-v2.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-teal-300 hover:text-teal-200 underline"
                      >
                        <span>Launch 3D</span>
                        <FiExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>

            {/* Card 3: BlankPage */}
            <Reveal delay={0.1}>
              <article className="group flex flex-col justify-between rounded-3xl border border-bone/12 bg-[#0e121d]/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] h-full">
                <div>
                  <Link
                    href="/projects/blank-page"
                    className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-bone/10 bg-ink-soft block cursor-pointer"
                  >
                    <Image
                      src="/images/projects/blankpage.png"
                      alt="BlankPage — Zen Distraction-Free Writing Workspace"
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-mono text-[10px] text-sky-300 backdrop-blur-md">
                        <span>Zen Productivity</span>
                      </span>
                    </div>
                  </Link>

                  <div className="mt-5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href="/projects/blank-page"
                        className="group-hover:text-accent transition-colors"
                      >
                        <h3 className="font-sans text-xl font-medium text-bone">
                          BlankPage
                        </h3>
                      </Link>
                      <a
                        href="https://blank-page-v1.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid size-8 place-items-center rounded-full border border-bone/15 bg-bone/[0.04] text-bone/70 transition-all hover:border-accent hover:bg-accent hover:text-ink shrink-0"
                        title="Open BlankPage"
                      >
                        <FiArrowUpRight className="size-4" />
                      </a>
                    </div>
                    <p className="mt-1 font-mono text-xs text-bone/50">
                      Minimalist Distraction-Free Workspace
                    </p>
                    <p className="mt-3 text-xs text-bone/65 leading-relaxed line-clamp-3">
                      A serene writing canvas for authors and thinkers. Features ambient
                      focus soundscapes (rain, vinyl fireplace, coffee shop), live word telemetry,
                      local caching, and instant one-click web publishing.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-bone/8">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {["Next.js", "React", "TypeScript", "Web Audio API", "Vercel"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded-md border border-bone/10 bg-bone/[0.03] px-2 py-0.5 text-[10px] font-mono text-bone/60"
                        >
                          {t}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <Link
                      href="/projects/blank-page"
                      className="text-accent hover:underline inline-flex items-center gap-1"
                    >
                      <span>Case Study</span>
                      <FiArrowUpRight className="size-3" />
                    </Link>
                    <a
                      href="https://blank-page-v1.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-bone/70 hover:text-bone underline"
                    >
                      <span>Launch App</span>
                      <FiExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>

          {/* Link to view all works */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.04] px-6 py-3 font-mono text-xs text-bone backdrop-blur-md transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              <FiLayers className="size-3.5 transition-transform group-hover:scale-110" />
              <span>Explore All Projects &amp; Tools in Archive ({PROJECTS.length})</span>
              <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
