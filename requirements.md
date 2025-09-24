# Product Requirements Document (PRD)

**Project:** Mumo Mwangangi — Personal Portfolio Website

**Platform:** Web (Next.js) • Animations: Framer Motion • Styling: Tailwind CSS & NextUI

**Author:** ChatGPT (draft for Mumo Mwangangi)

**Date:** 24 September 2025

---

## 1. Purpose & Vision

Provide a modern, high-performance, accessible, and highly animated personal portfolio that showcases Mumo’s skills in Business Intelligence, software engineering, data storytelling, and design. The site should act as a living resume — converting visitors into collaborators, employers, or clients — while demonstrating technical craftsmanship (Next.js + Framer Motion) and excellent visual/interaction design.

### Success metrics

* Visitor conversion: contact form submissions ≥ 2/month (first 3 months)
* Performance: Lighthouse scores ≥ 90 (Performance, Accessibility)
* Engagement: average session duration ≥ 90s
* Accessibility: WCAG AA compliance for major pages

---

## 2. Target Audience

* Recruiters & hiring managers at tech companies and universities
* Project collaborators and startup founders
* Clients seeking BI / dashboard / web development work
* Conference or speaking organizers

---

## 3. Key User Stories

1. As a recruiter, I want a clear summary of Mumo’s skills and experience so I can quickly assess fit.
2. As a hiring manager, I want to view demos and case studies so I can evaluate technical depth.
3. As a client, I want to contact Mumo easily and view pricing / engagement options.
4. As a visitor, I want a fast, visually engaging site so I remember the candidate.

---

## 4. Core Pages & Features

* **Home / Hero**: Bold intro, animated headline, short pitch, CTAs (View Work, Contact).
* **About**: Condensed CV, timeline with animated milestones, quick facts (skills, tools).
* **Work / Projects**: Card grid of projects; each card opens a detailed case study (modal or route) with images, metrics, role, tech stack, challenge → solution → impact.
* **Case Study Detail**: Deep-dive page with interactive charts or embedded Power BI screenshots, downloadable PDF.
* **Services**: Short list of offerings (BI dashboards, web apps, consulting).
* **Blog / Insights** (optional): Articles on BI, code, design — filterable tags.
* **Contact**: Minimal form + mailto + links to LinkedIn/GitHub + **direct WhatsApp button** for instant messaging.
* **Resume (Download)**: PDF download and printable resume page.

Technical features

* SEO-friendly with static generation (SSG) for core pages and incremental static regeneration (ISR) for blog / projects.
* Fast image loading: next/image with AVIF/WebP fallback.
* Analytics: Plausible or Google Analytics, optional heatmap.
* CMS (optional): headless CMS like Sanity or Strapi for easy updates.

---

## 5. UX / UI Direction

**Visual language**: Minimal, modern, generous whitespace, bold typographic scale. Subtle glassmorphism panels for content blocks to provide depth. Accent color: one strong brand color (recommendation: teal/emerald or deep purple) with neutral grayscale palette.

**Unique touches requested**:

* A polished theme toggle that animates between dark and light modes using Framer Motion (not just instant, but an orchestrated morphing icon + background transition).
* A micro-interaction system: animated hover states, link underlines that draw, button press ripples, and content reveal animations.
* A project showcase carousel with physics-based swipes on touch devices.

**Layout system**:

* Responsive grid (mobile-first). Use CSS grid for project gallery and Flexbox for hero and header.
* Sticky header with compact nav and animated reveal on scroll.

---

## 6. Interaction & Animation Guidelines (Framer Motion)

* **Hero entrance**: Staggered text fade + slide from y-axis with spring easing.
* **Project cards**: Scale + shadow lift on hover; subtle 3D parallax using pointer position.
* **Case study modal**: Use shared layout transitions (Framer Motion’s `AnimateSharedLayout`) to animate a project card into its detail view.
* **Theme toggle**: Animated morphing icon (sun ↔ moon) with background color transition and CSS variables for colors. Save preference to `localStorage`.
* **Routing**: Use Framer Motion `AnimatePresence` to provide smooth page transitions on route change.
* **Performance rule**: Keep animations to GPU-friendly transforms (translate, scale, opacity). Avoid animating layout-heavy properties frequently.

Motion presets

* Use coherent motion tokens: `duration-short = 200ms`, `duration-medium = 400ms`, `duration-long = 700ms`, `spring-config = { stiffness: 120, damping: 14 }`.

---

## 7. Typography & Fonts

**Primary font**: Inter or Satoshi (modern, geometric, readable).
**Display font** (hero): A tasteful variable font with personality — e.g., 'Clash Display', 'GT Super Display', or 'Sora'.
**Monospace** for code blocks: `JetBrains Mono` or `Source Code Pro`.

Font loading

* Use `next/font` (or self-host variable fonts) to avoid CLS. Use `font-display: swap` and subset to latin. Pair a neutral UI sans with a characterful display for hero headlines.

---

## 8. UI Components & Design System

Base using Tailwind CSS + optional NextUI component primitives.

Core components

* `Header` (logo, nav, theme toggle)
* `Hero` (heading, subheading, CTA)
* `ProjectCard` (image, title, tags, stats)
* `CaseStudy` (rich content container)
* `Timeline` (animated milestones)
* `ContactForm` (validated with reCAPTCHA or honeypot) with **WhatsApp button component**
* `Footer` (social links, copyright)

Design tokens

* Colors, spacing scale, motion durations and elevation tokens centralized as CSS variables or Tailwind config.

Accessibility

* Semantic HTML, `aria-*` for interactive elements, focus-visible styles, keyboard navigable modals and carousels, contrast checks.

---

## 9. Tech Stack & Architecture

* **Frontend**: Next.js + TypeScript
* **Animations**: Framer Motion
* **Styling**: Tailwind CSS + NextUI or custom components
* **Hosting**: Vercel (recommended) or Netlify
* **Images**: next/image + Cloudflare or Vercel image optimization
* **CMS**: Sanity / Contentful / Markdown + MDX (if blog desired)
* **Forms**: Netlify forms, Formspree, or simple serverless API endpoint + email via SendGrid + **direct WhatsApp link integration (wa.me/number)**
* **Analytics**: Plausible or Google Analytics

Security

* Use HTTPS everywhere, set proper CSP headers, and sanitize any user inputs.

---

## 10. SEO & Performance

* Metadata for Open Graph + Twitter Cards.
* Structured data (JSON-LD) for Person and CreativeWork.
* Preload critical fonts and key LCP image.
* Image optimization and prioritization of hero image.

---

## 11. Acceptance Criteria

* All pages pass Lighthouse Performance ≥ 90 and Accessibility ≥ 90 on desktop.
* Theme toggle persists across sessions and animates smoothly.
* Projects load as SSG/ISR and deep-links work.
* Contact form sends to configured email **and WhatsApp button correctly opens WhatsApp chat with prefilled message**.
* Animations are smooth and do not cause layout shift or jank on mid-range device.

---

## 12. Launch Checklist

* [ ] Finalize copy and project images (optimized).
* [ ] Set up domain (e.g., mumo.dev or mumo.mwangangi.com) and DNS.
* [ ] Configure deployment (Vercel) and environment variables (EMAIL\_API\_KEY, CMS keys).
* [ ] Add analytics and privacy notice.
* [ ] Run Lighthouse audit and fix issues.

---

## 13. Suggested Timeline (Lean MVP)

* Week 1: Wireframes, content collection, font + color tokens.
* Week 2: Build homepage, header, theme toggle, and hero animations (Framer Motion).
* Week 3: Projects page and project detail flow with shared layout transitions.
* Week 4: About, Contact form (with WhatsApp button), SEO, testing, deploy to Vercel.

---

## 14. Example Acceptance Tests

* Theme toggle: Toggle light/dark, reload page, confirm preference retained.
* Project modal: Click card → modal opens with shared animation; close with Esc → focus returns to card.
* Contact: Submit form with valid data → success message; submit empty required field → validation error.
* WhatsApp button: Click → opens WhatsApp Web/mobile app with prefilled message to Mumo’s number.

---

## 15. Next Steps

1. Review copy and finalize which projects/case studies to include.
2. Approve color palette and hero font choice.
3. I can generate a component scaffold (Next.js + Framer Motion + Tailwind) and starter code if you want — say the word and I’ll scaffold it.

---

*End of PRD.*
