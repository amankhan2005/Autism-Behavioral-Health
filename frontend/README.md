# Autism & Behavioral Health LLC — Frontend (Redesigned)

A complete visual redesign of the ABA therapy website. **React 19 + Vite + Tailwind + Framer Motion + React Router + React Hook Form + Zod + Axios.**
All existing functionality is preserved — forms, API contract, routing, and SEO are unchanged. Only the design layer was rebuilt.

## What changed in the redesign
- **Type:** Inter everywhere (display + body + buttons). Plus Jakarta Sans removed.
- **Palette:** a sophisticated, mostly-light system — deep teal `brand` primary + warm `clay` accent over cream/white neutrals. No blue/green alternation. All tokens live in `tailwind.config.js` (change once, updates the whole site).
- **Hero:** full-width background **video**, centered content, one/two CTAs. Add your clip at `public/media/hero.mp4` — until then a branded poster (`public/media/hero-poster.svg`) shows.
- **Navigation:** clean navbar with a **Services dropdown**, clear **active states** (Services stays active on `/services/*`), "Get Started" CTA, Employee Portal as a secondary link.
- **Home:** Hero → Trust strip → About → Services → Why Choose Us → Process → Mission + Vision → Insurance → FAQ → CTA. **No testimonials.**
- **Services:** every service has its **own image** and a detail page with unique 200–400-word content (Overview, Who it supports, What we provide, Care process, What to expect, FAQ, CTA).
- **Legal pages:** premium, readable layout with a desktop **table of contents**.
- **Footer:** simplified — logo + blurb, Contact, Navigation, Legal, socials.

## Run locally
```bash
npm install
cp .env.example .env          # VITE_API_URL = your backend, VITE_SITE_URL = your domain
npm run dev                   # http://localhost:5173
npm run build                 # generates sitemap.xml, then builds → dist/
```

## Backend
Unchanged. Point `VITE_API_URL` at your existing API (e.g. `https://abh-api.onrender.com/api/v1`).
Forms still post to `/contact`, `/schedule-care`, `/insurance-inquiry`. The contact page splits First/Last name in the UI and merges them into `fullName` before submitting, so the API contract is identical.

## Replace before launch — `TODO(client)`
Search the repo for `TODO(client)`:
- `public/media/hero.mp4` — hero background video.
- `public/images/services/*.svg` — replace placeholders with real service photography (keep filenames or update `src/content/services.js`).
- `src/content/site.js` — phone, email, address, hours, socials, **PDFfiller URL**, insurers.
- `tailwind.config.js` — confirm the `brand`/`clay` hex against the final logo.
- `src/components/layout/Logo.jsx` — real logo SVG.
- About/Contact image placeholders and the Contact Google Map embed.
- `src/content/legal.js` — counsel-reviewed copy; keep "last updated" current.

## Deploy (Vercel)
`vercel.json` + `public/_redirects` handle SPA routing. Set `VITE_API_URL` and `VITE_SITE_URL`.
