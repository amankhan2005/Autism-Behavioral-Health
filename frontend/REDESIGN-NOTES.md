# Autism & Behavioral Health LLC — Redesign Notes

Full frontend redesign per the redesign brief. Stack unchanged: React 19 + Vite +
Tailwind + React Router + Framer Motion + React Hook Form + Zod + Axios. Backend untouched.
Scope: **autism / ABA only** (no psychiatric or mental-health services or copy).

## Brand & color system
- New identity built on the logo colors: **blue** (primary), **green** (secondary),
  **pink** (accent), with neurodiversity **spectrum** accents (yellow/orange/red/purple)
  used only on small elements — icons, dots, numbers, dividers, the spectrum rule.
- Tokens in `tailwind.config.js`: `brand` (blue), `green`, `pink`, `sun/tangerine/coral/grape`,
  `cta` (the Call Us Now red), plus cool neutrals (`ink/muted/line/surface/cream`).
- Type: **Plus Jakarta Sans** (display/headings) + **Inter** (body/UI).

## What changed
- **Navbar** — white text always; transparent over the hero video, solid blue on scroll and
  on every inner page. Home link, **About dropdown** (About Us / Our Team), Services dropdown,
  and a prominent red **Call Us Now · 302-983-8390** button (`tel:3029838390`). Mobile menu is a
  solid blue panel with white text and the same red CTA.
- **Hero** — background video kept, **overlay removed**, big bold **blue** heading (text-shadow
  for legibility, no tint over the video), red Call Us Now CTA, and a **right-to-left marquee**.
- **Breadcrumbs** on every inner page — parent links **blue**, current page **green** pill.
- **Our Team** (`/our-team`) — Rose Ngatia & Mercy Ngatia (mental-health references removed;
  autism/ABA credentials kept) + **"We are Hiring BCBAs"** CTA → Contact.
- **Services** — rebuilt with alternating editorial rows, large imagery, spectrum accents, per-service CTAs.
- **Insurance** — animated logo **marquee** (two rows), 3-step flow, verification form, FAQs.
- **Resources** — Delaware directory with category color-coding, search, hover.
- **Home** — added the insurance **logo scroller**.
- **Contact** — new details everywhere, **Fax** added, real Google Maps embed.
- **Footer** — company / quick links / contact (incl. fax) + spectrum hairline +
  **"Designed & Developed by WebieApp Solutions LLC"** → webieapp.com.

## Client TODOs (drop-in spots, clearly marked in code)
- **Logo:** replace the placeholder spectrum mark in `src/components/layout/Logo.jsx`
  with the real logo (add asset to `src/assets/`).
- **Hero video:** add `public/media/hero.mp4` (a recolored poster fallback already ships).
- **Service images:** replace the placeholders in `public/images/services/*.svg` with real photos.
- **Team photos:** set `photo:` paths in `src/content/team.js` (initials avatars show until then).
- **Insurance logos:** swap the text chips in `InsuranceMarquee.jsx` for real carrier logos; confirm the carrier list in `src/content/site.js`.
- **Socials:** real profile URLs in `src/content/site.js`.

## Note on scope
Per the autism/ABA-only correction, the **Delaware Mental Health Association** was omitted from
Resources. To add it back, append one entry to `src/content/resources.js`.

## Contact details (single source of truth: `src/content/site.js`)
- 750 Barksdale Rd, Newark, DE 19709 · info@autismbehavioralhealths.com
- Phone 302-983-8390 · Fax 302-639-6688
