/**
 * Single source of truth for personal info, links and navigation.
 * Update values here — every section reads from this file.
 */
export const SITE = {
  name: "Md Rashedul Haque Rasel",
  shortName: "Rasel",
  role: "Frontend-Focused Full Stack Developer",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  email: "rashedulhaquerasel1@gmail.com",
  // Set NEXT_PUBLIC_SITE_URL to your deployed domain (used for SEO / Open Graph)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Portfolio of Md Rashedul Haque Rasel — a frontend-focused full stack developer building fast, modern and interactive web apps with React, Next.js and the MERN stack.",
} as const;

export const SOCIALS = {
  github: { label: "GitHub", href: "https://github.com/RashedulHaqueRasel1", handle: "@RashedulHaqueRasel1" },
  // TODO: replace with your real LinkedIn profile URL
  linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/rashedul-haque-rasel", handle: "in/rashedul-haque-rasel" },
  email: { label: "Email", href: `mailto:${SITE.email}`, handle: SITE.email },
} as const;

export type NavLink = { label: string; href: `#${string}` };

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Labs", href: "#open-source" },
  { label: "Contact", href: "#contact" },
];

/** Shared easing used for programmatic Lenis scrolls. */
export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
