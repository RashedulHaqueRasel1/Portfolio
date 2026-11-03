"use client";

import { useEffect, useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiLoader,
  FiMail,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import { cn } from "@/lib/cn";
import { SITE, SOCIALS } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const TOPICS = ["Full-time role", "Freelance project", "Collaboration", "Just saying hi"] as const;

type Status = "idle" | "sending" | "sent" | "error";
type Fields = { name: string; email: string; message: string };

const EMPTY: Fields = { name: "", email: "", message: "" };

function validate(f: Fields) {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) errors.email = "Please enter a valid email.";
  if (f.message.trim().length < 10) errors.message = "Tell me a bit more (10+ characters).";
  return errors;
}

function Field({
  id,
  label,
  error,
  textarea,
  ...props
}: {
  id: keyof Fields;
  label: string;
  error?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const base = cn(
    "peer w-full rounded-2xl border bg-ink/40 px-4 pt-6 pb-2.5 text-sm text-bone outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder-transparent",
    "focus:bg-ink/70 focus:shadow-[0_0_0_4px_rgba(210,255,58,0.08)]",
    error ? "border-red-400/60 focus:border-red-400" : "border-bone/12 hover:border-bone/25 focus:border-accent/60",
  );
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={id} name={id} rows={5} placeholder={label} className={cn(base, "resize-none")} {...props} />
      ) : (
        <input id={id} name={id} placeholder={label} className={base} {...props} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2 left-4 font-mono text-[10.5px] tracking-wider text-bone/45 uppercase transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-placeholder-shown:font-sans peer-focus:top-2 peer-focus:font-mono peer-focus:text-[10.5px] peer-focus:tracking-wider peer-focus:text-accent peer-focus:uppercase"
      >
        {label}
      </label>
      {error && <p className="mt-1.5 pl-1 text-xs text-red-300/90">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: SITE.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  const errors = touched ? validate(fields) : {};

  const update = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const openMailto = () => {
    const subject = encodeURIComponent(`${topic} — ${fields.name}`);
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
        body: JSON.stringify({ ...fields, topic, company: honeypot }),
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

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — ignore */
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-bone/10 bg-ink py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 right-4 -z-10 opacity-10 select-none md:right-16"
      >
        <span className="font-serif text-[clamp(6rem,20vw,18rem)] leading-none tracking-tight text-outline italic">
          Contact
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-10">
        <SectionHeading
          index="04"
          eyebrow="GET IN TOUCH"
          title="Have an idea? Let’s make it"
          accent="real"
          lead="Whether it’s a full-time role, a freelance build or just a hello — send a message and I’ll get back to you within 24 hours."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Left — contact details */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <Reveal>
              <button
                type="button"
                onClick={copyEmail}
                className="group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-5 text-left backdrop-blur-xl transition-colors duration-300 hover:border-accent/40 md:p-6"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                  <FiMail className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] tracking-wider text-bone/45 uppercase">Email me</span>
                  <span className="mt-0.5 block truncate text-sm font-medium text-bone md:text-base">{SITE.email}</span>
                </span>
                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] transition-colors",
                    copied ? "border-accent/40 bg-accent/10 text-accent" : "border-bone/15 text-bone/60 group-hover:text-bone",
                  )}
                >
                  {copied ? <FiCheck className="size-3.5" /> : <FiCopy className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              <Reveal delay={0.06}>
                <div className="h-full rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-5 backdrop-blur-xl">
                  <FiMapPin className="size-4 text-accent" />
                  <p className="mt-3 font-mono text-[11px] tracking-wider text-bone/45 uppercase">Based in</p>
                  <p className="mt-0.5 text-sm font-medium text-bone">{SITE.location}</p>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="h-full rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-5 backdrop-blur-xl">
                  <FiClock className="size-4 text-accent" />
                  <p className="mt-3 font-mono text-[11px] tracking-wider text-bone/45 uppercase">Local time</p>
                  <p className="mt-0.5 text-sm font-medium text-bone tabular-nums">{time || "—"} · UTC+6</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.18}>
              <div className="rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-5 backdrop-blur-xl md:p-6">
                <p className="font-mono text-[11px] tracking-wider text-bone/45 uppercase">Find me online</p>
                <div className="mt-4 flex flex-col gap-2">
                  {[
                    { ...SOCIALS.github, Icon: FiGithub },
                    { ...SOCIALS.linkedin, Icon: FiLinkedin },
                  ].map(({ label, href, handle, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-bone/10 bg-bone/[0.02] px-4 py-3 transition-all duration-300 hover:border-bone/25 hover:bg-bone/[0.05]"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="size-4 text-bone/70 transition-colors group-hover:text-accent" />
                        <span className="text-sm font-medium text-bone">{label}</span>
                        <span className="hidden font-mono text-xs text-bone/40 sm:inline">{handle}</span>
                      </span>
                      <FiArrowUpRight className="size-4 text-bone/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex items-center gap-3 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
                </span>
                <p className="text-sm text-bone/80">
                  <span className="font-medium text-bone">Open to work</span> — remote & on-site roles, freelance projects.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative h-full overflow-hidden rounded-3xl border border-bone/15 bg-[#0f131f]/80 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-8">
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-accent/10 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-violet/15 blur-3xl" />

              {status === "sent" ? (
                <div className="relative flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="grid size-16 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <FiCheckCircle className="size-7" />
                  </span>
                  <h3 className="mt-6 text-2xl font-medium tracking-tight text-bone">Message on its way!</h3>
                  <p className="mt-2 max-w-sm text-sm text-bone/65">
                    Thanks for reaching out. I&apos;ll reply to your inbox as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 cursor-pointer rounded-full border border-bone/20 px-5 py-2.5 font-mono text-xs text-bone transition-colors hover:border-accent hover:text-accent"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={onSubmit} className="relative flex flex-col gap-5">
                  <div>
                    <p className="mb-3 font-mono text-[11px] tracking-wider text-bone/45 uppercase">
                      What are you reaching out about?
                    </p>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Topic">
                      {TOPICS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={topic === t}
                          onClick={() => setTopic(t)}
                          className={cn(
                            "cursor-pointer rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300",
                            topic === t
                              ? "border-accent bg-accent text-ink"
                              : "border-bone/15 bg-bone/[0.03] text-bone/70 hover:border-bone/35 hover:text-bone",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field id="name" label="Your name" autoComplete="name" value={fields.name} onChange={update("name")} error={errors.name} />
                    <Field
                      id="email"
                      label="Email address"
                      type="email"
                      autoComplete="email"
                      value={fields.email}
                      onChange={update("email")}
                      error={errors.email}
                    />
                  </div>
                  <Field
                    id="message"
                    label="Tell me about your project or role"
                    textarea
                    value={fields.message}
                    onChange={update("message")}
                    error={errors.message}
                  />

                  {/* Honeypot */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

                  <div className="flex flex-col-reverse items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                    <p className="text-xs text-bone/45">
                      {status === "error" ? (
                        <span className="text-red-300/90">
                          Something went wrong.{" "}
                          <button type="button" onClick={openMailto} className="cursor-pointer underline">
                            Email me directly
                          </button>
                          .
                        </span>
                      ) : (
                        "Usually replies within 24 hours."
                      )}
                    </p>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-accent py-2 pr-2 pl-6 text-sm font-semibold text-ink transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(210,255,58,0.4)] disabled:cursor-wait disabled:opacity-70"
                    >
                      <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                      <span className="grid size-9 place-items-center rounded-full bg-ink text-accent transition-transform duration-500 ease-out-expo group-hover:rotate-[-20deg]">
                        {status === "sending" ? <FiLoader className="size-4 animate-spin" /> : <FiSend className="size-4" />}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
