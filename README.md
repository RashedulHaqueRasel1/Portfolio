# Rasel — Portfolio

Personal portfolio of **Md Rashedul Haque Rasel**, built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Lenis smooth scrolling and a custom WebGL (ogl) project carousel.

## Sections

| Section | Component |
| --- | --- |
| Hero (rotating role, live code terminal, tech arc) | `src/components/Hero` |
| About (profile card, story, animated stats) | `src/components/About` |
| Skills (interactive circuit network / mobile grid) | `src/components/Skills` |
| Work (scroll-pinned WebGL carousel + case-study modal) | `src/components/Work` |
| Contact (validated form + API route) | `src/components/Contact`, `src/app/api/contact` |
| Footer | `src/components/Footer` |

## Editing content

- **Personal info, email, socials, nav links** → `src/lib/site.ts`
- **Projects** → `DEFAULT_ITEMS` in `src/components/Work/FlexCarousel.tsx`
- **Skills** → `TECH_NODES` in `src/components/Skills/CenterFlow.tsx` and `TECH_STACK` in `src/components/TechStack/TechArcCarousel.tsx`

## Getting started

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

## Contact form

The form posts to `/api/contact`. Set `RESEND_API_KEY` (from [resend.com](https://resend.com)) to deliver messages by email. Without it, the form gracefully opens the visitor's mail client with the message pre-filled.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
