import { cn } from "@/lib/cn";
import Reveal from "./Reveal";

/** Status-dot eyebrow pill used across sections. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.04] px-3.5 py-1.5 font-mono text-xs tracking-wide text-bone/80 backdrop-blur-md",
        className,
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      <span>{children}</span>
    </span>
  );
}

/**
 * Consistent section header: numbered eyebrow, headline with an italic serif
 * accent phrase, and an optional lead paragraph.
 */
export default function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  lead,
  align = "left",
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <Eyebrow>
          {index} {"//"} {eyebrow}
        </Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[1.06] font-medium tracking-tight text-bone">
          {title} <span className="font-serif font-normal text-accent italic">{accent}</span>
          <span className="font-serif text-accent">.</span>
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-4 max-w-xl text-sm leading-relaxed text-bone/65 md:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
