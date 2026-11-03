"use client";

import CenterFlow from "./CenterFlow";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function Skills() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills and Arsenal"
      className="relative isolate min-h-[85vh] flex flex-col justify-center overflow-hidden bg-ink py-20 md:py-28 scroll-mt-20 border-t border-bone/10"
    >
      {/* Background Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-35" />

      {/* Giant outlined watermark background text */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-4 md:right-16 grid place-items-center -z-10 select-none opacity-10"
      >
        <span className="font-serif text-[clamp(6rem,22vw,20rem)] leading-none tracking-tight text-outline italic">
          Skills
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-10">
        <SectionHeading
          index="02"
          eyebrow="TECHNICAL ARSENAL"
          title="Mastery across the"
          accent="modern web stack"
          lead="Battle-tested technologies I use daily to build fast, scalable applications — tap any node to explore."
          className="mb-8 md:mb-12"
        />

        {/* Center Flow Component: Interactive Hub with flowing pulses to all 14 skills */}
        <Reveal delay={0.1} className="w-full">
          <CenterFlow />
        </Reveal>
      </div>
    </section>
  );
}
