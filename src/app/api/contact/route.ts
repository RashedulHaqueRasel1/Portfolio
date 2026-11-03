import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

type Payload = { name?: string; email?: string; topic?: string; message?: string; company?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields, humans don't.
  if (body.company) return NextResponse.json({ ok: true });

  const name = body.name?.trim().slice(0, 120) ?? "";
  const email = body.email?.trim().slice(0, 200) ?? "";
  const topic = body.topic?.trim().slice(0, 80) ?? "General";
  const message = body.message?.trim().slice(0, 5000) ?? "";

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please fill in all fields correctly." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No mail provider configured — the client falls back to opening a mailto: link.
    return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? SITE.email],
      reply_to: email,
      subject: `[Portfolio] ${topic} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, fallback: "mailto" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
