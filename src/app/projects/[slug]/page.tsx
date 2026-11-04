import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiGithub,
  FiCheck,
  FiActivity,
  FiLayers,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiCode,
  FiTerminal,
  FiStar,
} from "react-icons/fi";
import { SiNpm } from "react-icons/si";
import {
  PROJECTS,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/projects";
import Footer from "@/components/Footer/Footer";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.category} | ${SITE.name}`,
      description: project.description,
      images: [{ url: project.src, alt: project.title }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <div className="relative min-h-screen bg-ink text-bone">
      {/* Ambient Lighting Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-glow opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed top-1/4 left-1/2 -z-10 size-[700px] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[160px]"
      />

      <main className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 md:px-12 lg:px-16 pt-28 sm:pt-36 md:pt-40 pb-24">
        {/* Top Breadcrumb Navigation & Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-bone/10">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.04] px-4 py-2 font-mono text-xs text-bone/70 backdrop-blur-md transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
            >
              <FiArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              <span>All Projects</span>
            </Link>

            <span className="hidden sm:inline-block font-mono text-xs text-bone/35">
              /
            </span>

            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              <span>{project.category}</span>
            </span>
          </div>

          {/* Quick External Actions */}
          <div className="flex items-center gap-3">
            {project.npmUrl && (
              <a
                href={project.npmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 font-mono text-xs text-red-300 backdrop-blur-md transition-all hover:bg-red-500 hover:text-white"
              >
                <SiNpm className="size-3.5" />
                <span className="hidden sm:inline">NPM Package</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.04] px-4 py-2 font-mono text-xs text-bone backdrop-blur-md transition-all hover:border-bone/50 hover:bg-bone/10"
              >
                <FiGithub className="size-3.5" />
                <span className="hidden sm:inline">Repository</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-accent bg-accent px-5 py-2 font-mono text-xs font-semibold text-ink shadow-[0_0_20px_rgba(210,255,58,0.35)] transition-all hover:scale-105"
              >
                <span>Live Preview</span>
                <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Project Hero Section */}
        <section className="mt-12 sm:mt-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                CASE STUDY // {project.category}
              </span>
              {project.badge && (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent">
                  <FiStar className="size-3" />
                  <span>{project.badge}</span>
                </span>
              )}
            </div>

            <h1 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-medium tracking-tight text-bone">
              {project.title}
              <span className="font-serif text-accent">.</span>
            </h1>

            <p className="mt-2 text-base sm:text-xl font-mono text-bone/60">
              {project.subtitle}
            </p>

            <p className="mt-6 text-base sm:text-lg md:text-xl font-sans text-bone/75 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Metadata Card Bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-bone/10 bg-[#0f1320]/80 p-5 sm:p-6 backdrop-blur-xl">
            <div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-bone/45">
                <FiUser className="size-3 text-accent" /> Role
              </span>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-bone">
                {project.role || "Full-Stack Engineer"}
              </p>
            </div>

            <div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-bone/45">
                <FiCalendar className="size-3 text-accent" /> Timeline
              </span>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-bone">
                {project.date || "2026"}
              </p>
            </div>

            <div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-bone/45">
                <FiBriefcase className="size-3 text-accent" /> Context
              </span>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-bone">
                {project.client || "Client Venture"}
              </p>
            </div>

            <div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-bone/45">
                <FiCode className="size-3 text-accent" /> Primary Stack
              </span>
              <p className="mt-1.5 text-xs sm:text-sm font-medium text-bone truncate">
                {project.tech.slice(0, 2).join(", ")}
              </p>
            </div>
          </div>

          {/* Quick Install Terminal Box for NPM Packages */}
          {project.packageManager && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-red-500/25 bg-red-500/5 px-5 py-3.5 font-mono text-xs backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <SiNpm className="size-5 text-red-400 shrink-0" />
                <div className="flex items-center gap-2">
                  <span className="text-accent/80 select-none">$</span>
                  <code className="text-bone font-medium font-mono text-xs sm:text-sm select-all">
                    {project.packageManager}
                  </code>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-[11px] text-red-300">
                  Published Library
                </span>
                {project.npmUrl && (
                  <a
                    href={project.npmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-bone/20 bg-bone/[0.05] px-3 py-1 text-bone hover:border-red-400 hover:text-white hover:bg-red-500 transition-all text-xs"
                  >
                    <span>npmjs.com</span>
                    <FiArrowUpRight className="size-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Hero Visual Display Container — Single clean screenshot */}
        <section className="relative mt-12 sm:mt-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border border-bone/15 bg-ink-soft shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
            <Image
              src={project.src}
              alt={project.alt || project.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 1440px) 100vw, 1360px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-50" />
          </div>
        </section>

        {/* Performance & Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-bone/50 mb-4">
              KEY BENCHMARKS &amp; DELIVERED METRICS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-bone/12 bg-[#0e121e]/90 p-6 backdrop-blur-xl transition-all hover:border-accent/30"
                >
                  <div className="flex items-center justify-between text-bone/45">
                    <span className="font-mono text-xs uppercase tracking-wider">
                      {metric.label}
                    </span>
                    <FiActivity className="size-4 text-accent" />
                  </div>
                  <div className="mt-3 text-3xl sm:text-4xl font-sans font-bold tracking-tight text-bone">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Deep-Dive Case Study Narrative */}
        <section className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          {/* Main Editorial Text (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Section */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-sans font-medium text-bone tracking-tight flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent text-sm">
                  01
                </span>
                <span>The Architecture &amp; Overview</span>
              </h2>
              <p className="mt-5 text-sm sm:text-base md:text-lg text-bone/75 font-sans leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>


            {/* Key Deliverables & Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="pt-4">
                <h3 className="text-xl sm:text-2xl font-sans font-medium text-bone tracking-tight mb-5">
                  Key Technical Deliverables
                </h3>
                <ul className="space-y-3">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 rounded-2xl border border-bone/8 bg-bone/[0.02] p-4 text-xs sm:text-sm text-bone/80 font-sans leading-relaxed"
                    >
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent/20 text-accent mt-0.5">
                        <FiCheck className="size-3" />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar: Tech Stack Breakdown & Specs (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 rounded-3xl border border-bone/12 bg-[#0c101c]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
                TECHNOLOGY STACK
              </h3>
              <p className="text-xs text-bone/50 mb-5 leading-relaxed">
                Core languages, frameworks, state managers, and infrastructure
                used across this project.
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-bone/12 bg-bone/[0.04] px-3 py-1.5 font-mono text-xs text-bone/85 hover:border-accent hover:text-accent transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons in Sidebar */}
              <div className="mt-8 pt-6 border-t border-bone/10 flex flex-col gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 font-mono text-xs font-semibold text-ink shadow-[0_0_20px_rgba(210,255,58,0.35)] transition-all hover:scale-[1.02]"
                  >
                    <span>Launch Live Demo</span>
                    <FiArrowUpRight className="size-3.5" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-bone/20 bg-bone/[0.05] py-3 font-mono text-xs text-bone transition-all hover:bg-bone/10"
                  >
                    <FiGithub className="size-3.5" />
                    <span>View GitHub Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Next / Previous Project Pagination Bar */}
        <section className="mt-20 sm:mt-28 border-t border-bone/10 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Previous Project Card */}
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-bone/10 bg-[#0e121e]/80 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-accent/40 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-bone/45 group-hover:text-accent transition-colors">
                <FiArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
                <span>PREVIOUS PROJECT</span>
              </div>
              <div className="mt-4">
                <h4 className="text-xl sm:text-2xl font-sans font-medium text-bone group-hover:text-accent transition-colors">
                  {prev.title}
                </h4>
                <p className="mt-1 text-xs font-mono text-bone/50 truncate">
                  {prev.category}
                </p>
              </div>
            </Link>

            {/* Next Project Card */}
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col justify-between rounded-3xl border border-bone/10 bg-[#0e121e]/80 p-6 sm:p-8 backdrop-blur-xl transition-all hover:border-accent/40 hover:-translate-y-1 text-left sm:text-right"
            >
              <div className="flex items-center justify-start sm:justify-end gap-2 text-xs font-mono text-bone/45 group-hover:text-accent transition-colors">
                <span>NEXT PROJECT</span>
                <FiArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="mt-4">
                <h4 className="text-xl sm:text-2xl font-sans font-medium text-bone group-hover:text-accent transition-colors">
                  {next.title}
                </h4>
                <p className="mt-1 text-xs font-mono text-bone/50 truncate">
                  {next.category}
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Return to Home / Contact Banner */}
        <section className="mt-16 rounded-3xl border border-bone/12 bg-gradient-to-b from-[#111522] to-ink p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-sans font-medium text-bone tracking-tight">
            Ready to collaborate on your next vision?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-bone/60 max-w-md mx-auto leading-relaxed">
            I am currently open for worldwide remote and on-site roles.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="rounded-full bg-accent px-6 py-2.5 font-mono text-xs font-semibold text-ink shadow-[0_6px_20px_rgba(210,255,58,0.35)] transition-all hover:scale-105"
            >
              Get In Touch
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-bone/20 bg-bone/[0.04] px-6 py-2.5 font-mono text-xs text-bone transition-all hover:bg-bone/10"
            >
              Browse All Projects
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
