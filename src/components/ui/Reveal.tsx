"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/useInView";

/** Fades + lifts its children into view the first time they scroll on screen. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const [ref, inView] = useInView<HTMLElement>({ rootMargin: "0px 0px -12% 0px", once: true });

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn(
        "transition-[opacity,translate] duration-[1100ms] ease-out-expo motion-reduce:transition-none",
        inView ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{
        transitionDelay: `${delay}s`,
        translate: inView ? "0 0" : `0 ${y}px`,
      }}
    >
      {children}
    </Tag>
  );
}
