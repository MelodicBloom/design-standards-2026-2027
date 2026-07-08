---
title: Motion System Microsite — QA Checklist
version: 1.0.0
total_items: 51
---

# QA Checklist — Motion System Microsite

Run this checklist before every merge to main and before every production deploy.
Each item must be explicitly checked. No partial passes.

---

## Motion (9 items)

| # | Check | Pass | Notes |
|---|---|---|---|
| M1 | All durations reference `var(--motion-duration-*)`, zero hardcoded values | | |
| M2 | All easings reference `var(--motion-ease-*)`, zero hardcoded values | | |
| M3 | Only `transform` and `opacity` animated — no `width`, `height`, `margin`, `padding`, `top`, `left` | | |
| M4 | `prefers-reduced-motion: reduce` collapses all transitions to `0.01ms` globally + component-level | | |
| M5 | Stagger budgets match tag spec: hero 80ms/max 4, manifesto 120ms, comparison 40ms/row | | |
| M6 | Scroll reveals trigger at 15–20% viewport entry (IntersectionObserver threshold: 0.15) | | |
| M7 | Hero and manifesto scroll reveals are once-only (observer disconnects after first trigger) | | |
| M8 | All exit durations shorter than corresponding enter durations | | |
| M9 | Max 1 primary animated focal point per viewport beat — no competing expressive layers | | |

---

## Accessibility (10 items)

| # | Check | Pass | Notes |
|---|---|---|---|
| A1 | Body text contrast ≥ 4.5:1 (WCAG 2.2 AA) — verified with Colour Contrast Analyser | | |
| A2 | Large text (≥18px or ≥14px bold) contrast ≥ 3:1 | | |
| A3 | All interactive elements reachable and operable via Tab, Enter, Space | | |
| A4 | Focus ring: 2px solid `--color-brand-violet`, offset 2px, visible on all interactive elements | | |
| A5 | No motion used as sole communication channel — all meaning preserved with motion off | | |
| A6 | All icon-only and decorative buttons have `aria-label` | | |
| A7 | Heading hierarchy is logical: single h1 → h2 → h3, no skips | | |
| A8 | All `<img>` elements have meaningful `alt` text (not filename, not empty unless decorative) | | |
| A9 | Skip-to-main-content link is first focusable element, visible on focus | | |
| A10 | Tested with VoiceOver + Safari and NVDA + Chrome — no broken announcements | | |

---

## Performance (12 items)

| # | Check | Target | Pass | Notes |
|---|---|---|---|---|
| P1 | Lighthouse Performance | ≥ 95 | | |
| P2 | Lighthouse Accessibility | ≥ 98 | | |
| P3 | Lighthouse Best Practices | ≥ 95 | | |
| P4 | Lighthouse SEO | ≥ 95 | | |
| P5 | LCP on 4G mid-tier mobile | < 1.8s | | |
| P6 | CLS | < 0.05 | | |
| P7 | INP | < 100ms | | |
| P8 | Total JS bundle (gzip) | < 180kB | | |
| P9 | Framer Motion imported with named imports only (tree-shaken) | confirmed | | |
| P10 | No unused CSS in production build | confirmed | | |
| P11 | Fonts: `font-display: swap`, subset to used Unicode ranges | confirmed | | |
| P12 | All images: WebP or AVIF, explicit `width`+`height` attrs, `loading="lazy"` below fold | confirmed | | |

---

## Design Tokens (7 items)

| # | Check | Pass | Notes |
|---|---|---|---|
| T1 | Zero hardcoded color values (hex, rgb, hsl) in any component file | | |
| T2 | Zero hardcoded `px` spacing values outside the 4px token scale | | |
| T3 | Zero hardcoded `font-size` values outside the fluid type scale | | |
| T4 | W3C Design Token JSON (`tokens/motion.json`) is the sole source of truth for motion values | | |
| T5 | CSS custom properties generated deterministically from token JSON | | |
| T6 | Dark mode loads without FOUC | | |
| T7 | Tailwind `theme.extend` references only token values, no raw values | | |

---

## Code Quality (6 items)

| # | Check | Pass | Notes |
|---|---|---|---|
| C1 | TypeScript strict mode enabled, zero type errors (`tsc --noEmit`) | | |
| C2 | Zero `console.error` / `console.warn` in production build | | |
| C3 | All components use semantic HTML elements | | |
| C4 | ESLint passes with zero warnings (airbnb-typescript + jsx-a11y) | | |
| C5 | Prettier format enforced via pre-commit hook (lint-staged) | | |
| C6 | No prop drilling beyond 2 levels | | |

---

## Content (7 items)

| # | Check | Pass | Notes |
|---|---|---|---|
| CN1 | Hero section uses its own motion tokens live — page opening is self-demonstrating | | |
| CN2 | Tag matrix renders all 35 tags with all 6 columns fully populated | | |
| CN3 | Token explorer previews all 9 tokens interactively with live easing curve | | |
| CN4 | MotionTokenGenerator exports valid CSS, Tailwind config, and JSON | | |
| CN5 | CTA section links correctly to Gumroad download and GitHub repo | | |
| CN6 | Manifesto copy sourced from Beautiful Imperfection and The Death of Perfect | | |
| CN7 | Page `<head>`: title, description, og:image (1200×630), twitter:card, canonical | | |

---

## Sign-off

| Role | Name | Date | Signature |
|---|---|---|---|
| Designer | | | |
| Developer | | | |
| QA | | | |

All 51 items must be green before merge to main.
