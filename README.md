# Claude Studio v2 — Next.js + Tailwind CSS + Anthropic Claude API

A modern, dark-themed SaaS-style AI prompt interface built with Next.js 15 App Router and Tailwind CSS v4.

---

## What's new in v2

- **Tailwind CSS v4** — utility-first styling throughout, zero CSS modules
- **Dark SaaS aesthetic** — deep slate canvas, indigo accents, glassmorphism card
- **Animated background** — blurred glow blobs + subtle grid texture
- **Copy to Clipboard** — one-click copy with ✓ confirmation state
- **Smooth hover effects** — glow on generate button, transitions everywhere
- **Responsive** — works great on mobile, tablet, and desktop
- **Accessible** — `aria-busy`, `aria-label`, `aria-live` throughout

---

## Project Structure

```
src/app/
├── api/generate/route.js     ← Secure server route (Anthropic SDK)
├── components/
│   └── PromptForm.js         ← Full UI: textarea, buttons, response, copy
├── globals.css               ← Tailwind entry + custom animations
├── layout.js                 ← Root layout + metadata
└── page.js                   ← Home page with background FX + card
```

---

## Getting Started

```bash
# Install
npm install

# Add your key
cp .env.local.example .env.local
# → set ANTHROPIC_API_KEY=sk-ant-...

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add env var: `ANTHROPIC_API_KEY` → your key
4. Deploy ✓

---

## Tailwind v4 Notes

This project uses **Tailwind CSS v4** with the new `@tailwindcss/postcss` plugin. The `@theme {}` block in `globals.css` replaces `tailwind.config.js` for custom tokens.

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --font-sans: 'Sora', sans-serif;
  --color-brand: #6366f1;
}
```

No `tailwind.config.js` needed.
