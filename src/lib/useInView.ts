"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Observes an element and reports whether it is in the viewport.
 * `once` keeps it `true` after the first intersection (for reveal animations).
 */
export function useInView<T extends Element>({
  rootMargin = "0px",
  threshold = 0,
  once = false,
}: { rootMargin?: string; threshold?: number; once?: boolean } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin, threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView] as const;
}

/** Ref-based variant for RAF loops: avoids re-renders, just flips a boolean. */
export function useVisibleRef<T extends Element>(rootMargin = "100px") {
  const ref = useRef<T | null>(null);
  const visible = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, visible] as const;
}
