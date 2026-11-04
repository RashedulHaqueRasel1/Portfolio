"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiGithub,
  FiSearch,
  FiLayers,
  FiActivity,
  FiCode,
  FiPackage,
  FiStar,
} from "react-icons/fi";
import { SiNpm } from "react-icons/si";
import { PROJECTS, type ProjectItem } from "@/lib/projects";
import Footer from "@/components/Footer/Footer";
import { cn } from "@/lib/cn";

type FilterTab = "all" | "client" | "personal" | "npm";

export default function AllProjectsPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTab, setFilterTab] = useState<FilterTab>("all");

  const tabCounts = useMemo(() => {
    return {
      all: PROJECTS.length,
      client: PROJECTS.filter((p) => !p.isPersonal).length,
      personal: PROJECTS.filter((p) => p.isPersonal).length,
      npm: PROJECTS.filter((p) => Boolean(p.packageManager)).length,
    };
  }, []);

  const filteredProjects = useMemo(() => {
    let list = PROJECTS;

    if (filterTab === "client") {
      list = list.filter((p) => !p.isPersonal);
    } else if (filterTab === "personal") {
      list = list.filter((p) => p.isPersonal);
    } else if (filterTab === "npm") {
      list = list.filter((p) => Boolean(p.packageManager));
    }

    const q = searchQuery.toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)),
    );
  }, [searchQuery, filterTab]);

  return (
    <div className="relative min-h-screen bg-ink text-bone">
      {/* Background Ambience */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-glow opacity-40" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 right-1/4 -z-10 size-[500px] rounded-full bg-accent/[0.04] blur-[150px]"
      />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-12 lg:px-16 pt-28 sm:pt-36 md:pt-40 pb-20">
        {/* Back Link & Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-bone/15 bg-bone/[0.04] px-4 py-2 font-mono text-xs text-bone/70 backdrop-blur-md transition-all hover:border-accent hover:bg-accent/10 hover:text-accent"
          >
            <FiArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            <span>Archive ({PROJECTS.length} Works)</span>
          </span>
        </div>

        {/* Page Hero Header */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            <FiLayers className="size-3.5" />
            <span>PORTFOLIO DIRECTORY</span>
          </div>
          <h1 className="mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.04] font-medium tracking-tight text-bone">
            All Projects &amp;{" "}
            <span className="font-serif font-normal italic text-accent">
              Case Studies
            </span>
            <span className="font-serif text-accent">.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base md:text-lg font-sans text-bone/65 leading-relaxed">
            A comprehensive index of client full-stack platforms, personal creations,
            browser extensions, and published open-source NPM packages built with
            modern React, Next.js, Node.js, and TypeScript.
          </p>
        </div>

        {/* Category Tabs Filter */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterTab("all")}
            className={cn(
              "rounded-full px-4 py-2 font-mono text-xs transition-all cursor-pointer border",
              filterTab === "all"
                ? "border-accent bg-accent text-ink font-semibold shadow-[0_0_20px_rgba(210,255,58,0.3)]"
                : "border-bone/15 bg-bone/[0.04] text-bone/70 hover:border-bone/30 hover:text-bone",
            )}
          >
            All Works ({tabCounts.all})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("client")}
            className={cn(
              "rounded-full px-4 py-2 font-mono text-xs transition-all cursor-pointer border",
              filterTab === "client"
                ? "border-accent bg-accent text-ink font-semibold shadow-[0_0_20px_rgba(210,255,58,0.3)]"
                : "border-bone/15 bg-bone/[0.04] text-bone/70 hover:border-bone/30 hover:text-bone",
            )}
          >
            Client Ventures ({tabCounts.client})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("personal")}
            className={cn(
              "rounded-full px-4 py-2 font-mono text-xs transition-all cursor-pointer border",
              filterTab === "personal"
                ? "border-accent bg-accent text-ink font-semibold shadow-[0_0_20px_rgba(210,255,58,0.3)]"
                : "border-bone/15 bg-bone/[0.04] text-bone/70 hover:border-bone/30 hover:text-bone",
            )}
          >
            Personal &amp; Labs ({tabCounts.personal})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("npm")}
            className={cn(
              "rounded-full px-4 py-2 font-mono text-xs transition-all cursor-pointer border flex items-center gap-1.5",
              filterTab === "npm"
                ? "border-red-400 bg-red-500 text-white font-semibold shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                : "border-red-500/30 bg-red-500/10 text-red-300 hover:border-red-400 hover:text-white",
            )}
          >
            <SiNpm className="size-3.5" />
            <span>NPM Packages ({tabCounts.npm})</span>
          </button>
        </div>

        {/* Search Bar & Project Count */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-y border-bone/10 py-5">
          <div className="flex items-center gap-2 text-xs font-mono text-bone/50">
            <span>
              Showing <span className="font-semibold text-accent">{filteredProjects.length}</span> of {PROJECTS.length} projects
            </span>
            {(searchQuery || filterTab !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setFilterTab("all");
                }}
                className="ml-2 text-accent underline cursor-pointer hover:text-[#e4ff6b]"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 size-4 text-bone/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tech or keyword..."
              className="w-full rounded-full border border-bone/15 bg-ink/70 pl-11 pr-4 py-2.5 text-xs font-mono text-bone placeholder:text-bone/35 outline-none transition-all focus:border-accent focus:bg-ink focus:shadow-[0_0_0_3px_rgba(210,255,58,0.12)]"
            />
          </div>
        </div>

        {/* Projects Bento Grid */}
        {filteredProjects.length === 0 ? (
          <div className="my-20 flex flex-col items-center justify-center rounded-3xl border border-bone/10 bg-bone/[0.02] p-12 text-center">
            <FiSearch className="size-10 text-bone/30 mb-3" />
            <h3 className="text-lg font-medium text-bone">No projects found</h3>
            <p className="mt-1 text-xs text-bone/50 max-w-sm">
              No works matched your search query &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-5 rounded-full border border-accent bg-accent/10 px-5 py-2 text-xs font-mono text-accent hover:bg-accent hover:text-ink transition-colors cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.slug}
                className="group relative flex flex-col rounded-3xl border border-bone/12 bg-[#0e121d]/90 p-5 sm:p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* Visual Cover Image with Zoom Effect */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink-soft border border-bone/10 block cursor-pointer"
                >
                  <Image
                    src={project.src}
                    alt={project.alt || project.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-bone/20 bg-ink/80 px-3 py-1 font-mono text-[11px] text-bone backdrop-blur-md">
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span>{project.category}</span>
                    </span>
                  </div>

                  {/* Badge or Personal Flag */}
                  {project.badge && (
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-ink/90 px-2.5 py-1 font-mono text-[10px] font-semibold text-accent backdrop-blur-md">
                        <FiStar className="size-2.5 text-accent" />
                        <span>{project.badge}</span>
                      </span>
                    </div>
                  )}

                  {/* Project Number */}
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-xs font-semibold text-bone/60 bg-ink/70 rounded-full px-2 py-0.5 backdrop-blur-md">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Link>

                {/* Content Body */}
                <div className="mt-5 flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group-hover:text-accent transition-colors"
                      >
                        <h2 className="text-xl sm:text-2xl font-sans font-medium text-bone tracking-tight">
                          {project.title}
                        </h2>
                      </Link>
                      <Link
                        href={`/projects/${project.slug}`}
                        aria-label={`View ${project.title} Case Study`}
                        className="grid size-8 place-items-center rounded-full border border-bone/15 bg-bone/[0.04] text-bone/70 transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-ink shrink-0"
                      >
                        <FiArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>

                    <p className="mt-1 font-mono text-xs text-bone/45 truncate">
                      {project.subtitle}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-bone/65 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips & Metrics */}
                  <div className="mt-6 pt-5 border-t border-bone/8">
                    {/* Metrics preview */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mb-3.5 flex items-center gap-2 overflow-x-auto">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/25 bg-accent/8 px-2.5 py-1 text-[11px] font-mono text-accent">
                          <FiActivity className="size-3" />
                          <span>
                            {project.metrics[0].label}: {project.metrics[0].value}
                          </span>
                        </span>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-bone/10 bg-bone/[0.03] px-2 py-0.5 text-[11px] font-mono text-bone/60"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="rounded-md border border-bone/10 bg-bone/[0.02] px-1.5 py-0.5 text-[11px] font-mono text-bone/40">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="mt-5 flex items-center justify-between pt-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent hover:underline"
                      >
                        <span>Read Case Study</span>
                        <FiArrowUpRight className="size-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {project.npmUrl && (
                          <a
                            href={project.npmUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="NPM Registry"
                            className="grid size-7 place-items-center rounded-full border border-red-500/30 text-red-400 hover:text-white hover:bg-red-500 transition-colors"
                          >
                            <SiNpm className="size-3.5" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub Repository"
                            className="grid size-7 place-items-center rounded-full border border-bone/15 text-bone/60 hover:text-bone hover:border-bone/40 transition-colors"
                          >
                            <FiGithub className="size-3.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Live Demo"
                            className="grid size-7 place-items-center rounded-full border border-bone/15 text-bone/60 hover:text-accent hover:border-accent transition-colors"
                          >
                            <FiArrowUpRight className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA Card */}
        <section className="mt-20 rounded-3xl border border-bone/15 bg-gradient-to-b from-[#111625] to-ink p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-72 rounded-full bg-accent/10 blur-3xl"
          />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-medium text-bone tracking-tight">
            Have an ambitious project in mind?
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm sm:text-base text-bone/65 leading-relaxed">
            I specialize in building scalable web architectures, modern interactive
            frontends, and full-stack solutions. Let&apos;s build something exceptional.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-[0_6px_25px_rgba(210,255,58,0.4)] transition-all hover:scale-105"
            >
              <span>Start A Project</span>
              <FiArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-bone/20 bg-bone/[0.04] px-6 py-3 text-sm font-medium text-bone transition-all hover:bg-bone/10"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
