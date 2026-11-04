"use client";

import { useState } from "react";
import {
  FiCheckCircle,
  FiChevronDown,
  FiGithub,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import { cn } from "@/lib/cn";
import { SITE, SOCIALS } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";
type Fields = { name: string; email: string; message: string };

const EMPTY: Fields = { name: "", email: "", message: "" };

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = "Please enter a valid email address.";
  if (f.message.trim().length < 5) errors.message = "Please write a short message.";
  return errors;
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [service, setService] = useState("Full-Time Engineering Role");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const errors = touched ? validate(fields) : {};

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const openMailto = () => {
    const subject = encodeURIComponent(`${service} — ${fields.name}`);
    const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    if (Object.keys(validate(fields)).length) return;

    const honeypot = (new FormData(e.currentTarget).get("company") as string) || "";
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, topic: service, company: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        setFields(EMPTY);
        setTouched(false);
      } else if (data.fallback === "mailto") {
        openMailto();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-bone/10 bg-ink py-20 md:py-28"
    >
      {/* Background Lighting & Grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />

      {/* Outlined Watermark Text */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-4 -z-10 opacity-10 select-none md:right-16"
      >
        <span className="font-serif text-[clamp(6rem,20vw,18rem)] leading-none tracking-tight text-outline italic">
          Contact
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1360px] px-5 md:px-8 lg:px-10">
        <Reveal delay={0.06}>
          {/* Main Unified Bento Container */}
          <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] border border-bone/15 bg-[#0f131f]/90 p-7 sm:p-10 md:p-12 lg:p-14 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Info, and Direct Contact Pills */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-8">
                <div>
                  {/* Top Pill Badge matching example */}
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 py-1.5 pl-1.5 pr-4 mb-6">
                    <span className="grid size-6 place-items-center rounded-full bg-accent text-ink">
                      <FiMail className="size-3" />
                    </span>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                      Start A Project
                    </span>
                  </div>

                  {/* Large Bold Headline */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium tracking-tight text-bone leading-[1.1] mb-5">
                    Let&apos;s Build Your <br className="hidden sm:inline" />
                    <span className="text-accent font-serif italic">Digital Future</span>.
                  </h2>

                  {/* Subtitle description */}
                  <p className="text-sm md:text-base text-bone/70 leading-relaxed max-w-xl font-normal">
                    Ready to launch your next project or looking to hire a dedicated frontend / full-stack engineer?
                    Fill out the form or reach out directly to start a conversation about your business needs.
                  </p>
                </div>

                {/* Bottom Direct Contact Items: 2x2 Grid */}
                <div className="pt-6 border-t border-bone/10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 max-w-xl">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="group flex items-center gap-3 text-xs sm:text-sm text-bone/85 hover:text-accent transition-colors min-w-0"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-bone/[0.05] border border-bone/15 text-accent group-hover:border-accent group-hover:bg-accent/15 transition-all shrink-0">
                      <FiMail className="size-4" />
                    </span>
                    <span className="font-medium truncate">{SITE.email}</span>
                  </a>

                  <div className="flex items-center gap-3 text-xs sm:text-sm text-bone/85 min-w-0">
                    <span className="grid size-10 place-items-center rounded-full bg-bone/[0.05] border border-bone/15 text-accent shrink-0">
                      <FiMapPin className="size-4" />
                    </span>
                    <span className="font-medium truncate">{SITE.location}</span>
                  </div>

                  <a
                    href={SOCIALS.linkedin.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-xs sm:text-sm text-bone/85 hover:text-accent transition-colors min-w-0"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-bone/[0.05] border border-bone/15 text-accent group-hover:border-accent group-hover:bg-accent/15 transition-all shrink-0">
                      <FiLinkedin className="size-4" />
                    </span>
                    <span className="font-medium">LinkedIn</span>
                  </a>

                  <a
                    href={SOCIALS.github.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 text-xs sm:text-sm text-bone/85 hover:text-accent transition-colors min-w-0"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-bone/[0.05] border border-bone/15 text-accent group-hover:border-accent group-hover:bg-accent/15 transition-all shrink-0">
                      <FiGithub className="size-4" />
                    </span>
                    <span className="font-medium">GitHub</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Distinct Rounded Form Card matching example */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-bone/15 bg-[#141a29]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                  {/* Subtle ambient accent glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-20 size-48 rounded-full bg-accent/10 blur-3xl"
                  />

                  {status === "sent" ? (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <span className="grid size-14 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                        <FiCheckCircle className="size-7" />
                      </span>
                      <h3 className="mt-5 text-xl font-medium text-bone">Message Sent!</h3>
                      <p className="mt-2 text-xs sm:text-sm text-bone/70 max-w-xs">
                        Thanks for reaching out. I&apos;ll reply to your inbox within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus("idle")}
                        className="mt-6 rounded-full border border-bone/20 bg-bone/[0.04] px-5 py-2 text-xs font-mono text-bone hover:border-accent hover:text-accent transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form noValidate onSubmit={onSubmit} className="relative flex flex-col gap-4">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-bone/70 mb-1.5">
                          Your name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Name"
                          value={fields.name}
                          onChange={update("name")}
                          className={cn(
                            "w-full rounded-2xl border bg-ink/70 px-4 py-3 text-sm text-bone outline-none transition-all placeholder:text-bone/30",
                            "focus:bg-ink focus:border-accent focus:shadow-[0_0_0_3px_rgba(210,255,58,0.12)]",
                            errors.name ? "border-red-400/80" : "border-bone/12 hover:border-bone/25",
                          )}
                        />
                        {errors.name && <p className="mt-1 text-[11px] text-red-400 font-sans">{errors.name}</p>}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-bone/70 mb-1.5">
                          Your email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="Email"
                          value={fields.email}
                          onChange={update("email")}
                          className={cn(
                            "w-full rounded-2xl border bg-ink/70 px-4 py-3 text-sm text-bone outline-none transition-all placeholder:text-bone/30",
                            "focus:bg-ink focus:border-accent focus:shadow-[0_0_0_3px_rgba(210,255,58,0.12)]",
                            errors.email ? "border-red-400/80" : "border-bone/12 hover:border-bone/25",
                          )}
                        />
                        {errors.email && <p className="mt-1 text-[11px] text-red-400 font-sans">{errors.email}</p>}
                      </div>

                      {/* Services Select Dropdown matching example */}
                      <div>
                        <label htmlFor="service" className="block text-xs font-mono uppercase tracking-wider text-bone/70 mb-1.5">
                          Services
                        </label>
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full appearance-none rounded-2xl border border-bone/12 bg-ink/70 px-4 py-3 pr-10 text-sm text-bone outline-none transition-all hover:border-bone/25 focus:border-accent focus:bg-ink focus:shadow-[0_0_0_3px_rgba(210,255,58,0.12)] cursor-pointer"
                          >
                            <option value="Full-Time Engineering Role" className="bg-[#0f131f] text-bone">
                              Full-Time Engineering Role
                            </option>
                            <option value="Freelance Web Application" className="bg-[#0f131f] text-bone">
                              Freelance Web Application
                            </option>
                            <option value="UI/UX & Frontend Systems" className="bg-[#0f131f] text-bone">
                              UI/UX &amp; Frontend Systems
                            </option>
                            <option value="Technical Collaboration" className="bg-[#0f131f] text-bone">
                              Technical Collaboration
                            </option>
                            <option value="General Inquiry" className="bg-[#0f131f] text-bone">
                              Just saying hi
                            </option>
                          </select>
                          <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-bone/50" />
                        </div>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-bone/70 mb-1.5">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Tell me about your project or role..."
                          value={fields.message}
                          onChange={update("message")}
                          className={cn(
                            "w-full rounded-2xl border bg-ink/70 px-4 py-3 text-sm text-bone outline-none transition-all placeholder:text-bone/30 resize-none",
                            "focus:bg-ink focus:border-accent focus:shadow-[0_0_0_3px_rgba(210,255,58,0.12)]",
                            errors.message ? "border-red-400/80" : "border-bone/12 hover:border-bone/25",
                          )}
                        />
                        {errors.message && <p className="mt-1 text-[11px] text-red-400 font-sans">{errors.message}</p>}
                      </div>

                      {/* Anti-spam honeypot */}
                      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                      {/* Submit Button matching example */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-accent pl-1.5 pr-6 py-1.5 text-sm font-semibold text-ink transition-all duration-300 hover:shadow-[0_6px_25px_rgba(210,255,58,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait"
                        >
                          <span className="grid size-9 place-items-center rounded-full bg-ink text-accent transition-transform duration-300 group-hover:rotate-[-20deg]">
                            {status === "sending" ? (
                              <FiLoader className="size-4 animate-spin" />
                            ) : (
                              <FiSend className="size-4" />
                            )}
                          </span>
                          <span>{status === "sending" ? "Sending..." : "Submit"}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


