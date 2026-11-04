"use client";

import { FiBriefcase, FiCalendar, FiMapPin, FiZap, FiLayout, FiLink, FiUsers } from "react-icons/fi";
import {
  SiExpress,
  SiFigma,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const EXPERIENCES = [
  {
    role: "Frontend Developer",
    company: "ScaleUp Ads Agency",
    location: "Dhaka, Bangladesh",
    period: "August 2025 – Present",
    status: "Present / Active",
    type: "(Full-Time)",
    description:
      "Core frontend engineer building scalable, responsive web applications and client experiences using cutting-edge web technologies and modern rendering paradigms.",
    achievements: [
      {
        icon: FiZap,
        title: "Dynamic UI & Performance Strategy",
        text: "Developed responsive and dynamic UI using Next.js, React, TypeScript, and Tailwind CSS, implementing SSR, CSR, and SSG strategies for optimal performance and search visibility.",
      },
      {
        icon: FiLayout,
        title: "Pixel-Perfect Design Fidelity",
        text: "Translated Figma design systems into pixel-perfect, production-ready interfaces with uncompromising attention to visual consistency, typography, and web accessibility standards.",
      },
      {
        icon: FiLink,
        title: "Full-Stack API Integration",
        text: "Integrated RESTful APIs and collaborated closely with backend developers (Node.js, Express.js, MongoDB) to deliver robust, end-to-end full-stack functionality.",
      },
      {
        icon: FiUsers,
        title: "Agile Culture & Code Standards",
        text: "Contributed in agile teams with effective communication, participating actively in sprint cycles, peer code reviews, and upholding high maintainability standards.",
      },
    ],
    stack: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Figma", icon: SiFigma },
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Professional Work Experience"
      className="relative isolate min-h-[70vh] flex flex-col justify-center overflow-hidden bg-ink py-20 md:py-28 scroll-mt-20 border-t border-bone/10"
    >
      {/* Background Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />

      {/* Giant outlined watermark background text */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-4 md:right-16 grid place-items-center -z-10 select-none opacity-10"
      >
        <span className="font-serif text-[clamp(6rem,20vw,18rem)] leading-none tracking-tight text-outline italic">
          Experience
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-10">
        <SectionHeading
          index="03"
          eyebrow="CAREER JOURNEY"
          title="Proven experience in"
          accent="production teams"
          lead="Real-world experience delivering high-performance, user-centric web applications and collaborating across agile engineering teams."
          className="mb-10 md:mb-14"
        />

        {/* Experience Cards Container */}
        <div className="space-y-8">
          {EXPERIENCES.map((exp, idx) => (
            <Reveal key={idx} delay={0.08} className="w-full">
              <div className="group relative overflow-hidden rounded-3xl border border-bone/15 bg-[#0f131f]/85 p-6 md:p-9 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-bone/30">
                {/* Radial ambient glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-32 -left-32 size-80 rounded-full bg-accent/10 blur-3xl transition-opacity group-hover:opacity-25"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-violet/15 blur-3xl"
                />

                {/* Top Header Row: Role, Company, Period & Status */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-bone/10 pb-6 md:pb-8">
                  {/* Role & Company */}
                  <div className="flex items-start gap-4">
                    <div className="size-12 md:size-14 rounded-2xl border border-bone/15 bg-bone/[0.04] grid place-items-center shrink-0 shadow-inner">
                      <FiBriefcase className="size-5 md:size-6 text-accent" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-bone">
                          {exp.role}
                        </h3>
                        {/* <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-mono text-emerald-400">
                          <span className="relative flex size-1.5">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                          </span>
                          <span>{exp.status}</span>
                        </span> */}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs md:text-sm text-bone/65 font-sans">
                        <span className="font-semibold text-bone/90">{exp.company}</span>
                        <span className="text-bone/20">•</span>
                        <span className="inline-flex items-center gap-1">
                          <FiMapPin className="size-3.5 text-accent shrink-0" />
                          <span>{exp.location}</span>
                        </span>
                        <span className="text-bone/20">•</span>
                        <span className="text-[11px] font-mono text-bone/50">{exp.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div className="flex items-center gap-2 self-start lg:self-center">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-bone/15 bg-bone/[0.04] px-4 py-2 text-xs font-mono text-bone/85 backdrop-blur-md">
                      <FiCalendar className="size-3.5 text-accent shrink-0" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>

                {/* Role Highlights: 2x2 Feature Grid */}
                <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {exp.achievements.map((item, aIdx) => (
                    <div
                      key={aIdx}
                      className="group/item rounded-2xl border border-bone/10 bg-bone/[0.02] p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:border-bone/20 hover:bg-bone/[0.04]"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="size-9 rounded-xl border border-accent/20 bg-accent/[0.08] grid place-items-center shrink-0 mt-0.5 transition-colors group-hover/item:border-accent/40 group-hover/item:bg-accent/15">
                          <item.icon className="size-4 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-bone tracking-tight mb-1">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-[13px] text-bone/70 leading-relaxed font-normal">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Tech Stack Tags */}
                <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-bone/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-bone/50 uppercase tracking-wider shrink-0">
                    {"// Technologies Applied"}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-bone/10 bg-bone/[0.03] px-2.5 py-1 text-xs font-mono text-bone/75 backdrop-blur-md hover:border-bone/25 transition-colors"
                      >
                        <tech.icon className="size-3 text-bone/50 shrink-0" />
                        <span>{tech.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
