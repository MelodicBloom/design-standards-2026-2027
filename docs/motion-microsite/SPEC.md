---
title: Motion System Microsite — Full Spec
version: 1.0.1
stack: Next.js 15 · TypeScript · Tailwind v4 · Framer Motion 11 · Vercel
org: MelodicBloom / design-standards-2026-2027
route: /motion-system
deploy: melodicbloom.com/motion-system
---

# Motion System Microsite — Full Spec v1.0

## Overview

A single long-scroll editorial microsite that demonstrates, documents, and distributes the `motion-system-master` skill. The page IS the proof — every section uses the motion system's own tokens. Visitors leave with a working mental model of the system and a direct path to download or deploy it.

---

## Architecture

### Route
`app/motion-system/page.tsx` (Next.js App Router, SSG)

### Sections in order

| # | Section | Tag | Role | Duration | Easing |
|---|---|---|---|---|---|
| 1 | HeroSection | hero | Expressive | xl 700ms | organic-enter |
| 2 | ManifestoSection | manifesto | Expressive | xl 700ms | organic-enter |
| 3 | TagMatrixSection | comparison | Informational | sm 240ms | structured-ui |
| 4 | TokenExplorerSection | technical | Informational | md 320ms | structured-ui |
| 5 | MotionTokenGenerator | — | interactive | md 320ms | structured-ui |
| 6 | CTASection | cta | Focus | xs 180ms | organic-accent |

### Navigation
Sticky minimal nav · xxs 120ms · structured-ui · smooth scroll to section anchors

### Deploy target
Vercel · `melodicbloom.com/motion-system` · SSG · ISR disabled (fully static)

---

## Performance Benchmarks

All benchmarks measured on Vercel production deployment.
Mobile target: Moto G4 throttle profile (4G, 4× CPU slowdown) via Lighthouse CI.

| Metric | Target | Fail threshold |
|---|---|---|
| Lighthouse Performance | ≥ 95 | < 90 |
| Lighthouse Accessibility | ≥ 98 | < 95 |
| Lighthouse Best Practices | ≥ 95 | < 90 |
| Lighthouse SEO | ≥ 95 | < 90 |
| LCP (Largest Contentful Paint) | < 1.8s | > 2.5s |
| CLS (Cumulative Layout Shift) | < 0.05 | > 0.1 |
| INP (Interaction to Next Paint) | < 100ms | > 200ms |
| TBT (Total Blocking Time) | < 150ms | > 300ms |
| FCP (First Contentful Paint) | < 1.2s | > 1.8s |
| TTFB | < 400ms | > 600ms |
| Total JS bundle (gzip) | < 180kB | > 250kB |
| CSS (gzip) | < 30kB | > 50kB |

### Enforcement
- Lighthouse CI runs on every PR via GitHub Actions
- Bundle analysis via `@next/bundle-analyzer` on every merge to main
- CLS monitored with `web-vitals` package + Vercel Analytics

---

## Design Standards

### Color tokens (W3C → CSS vars → Tailwind extend)

| Token | Value | Usage |
|---|---|---|
| `--color-brand-violet` | #8b5cf6 | Primary accent, focus rings, highlights |
| `--color-brand-coral` | #f97b6b | Secondary accent, CTA hover |
| `--color-brand-cyan` | #22d3ee | Tertiary accent, data viz |
| `--color-brand-gold` | #f5c842 | Expressive accent, manifesto |
| `--color-surface-base` | #0a0a0a | Page background (dark default) |
| `--color-surface-raised` | #141414 | Card / section backgrounds |
| `--color-surface-overlay` | #1f1f1f | Hover / overlay surfaces |
| `--color-text-primary` | #f5f5f5 | Body text |
| `--color-text-secondary` | #a3a3a3 | Captions, meta |
| `--color-text-muted` | #525252 | Placeholders, disabled |

### Typography

| Role | Family | Weight | Size range |
|---|---|---|---|
| Display / hero | Clash Display | 600–700 | clamp(2.5rem, 6vw, 5rem) |
| Section heading | Clash Display | 500–600 | clamp(1.75rem, 4vw, 3rem) |
| Subheading | Clash Display | 500 | clamp(1.2rem, 2.5vw, 1.75rem) |
| Body | Satoshi | 400 | clamp(0.9rem, 1.1vw, 1.1rem) |
| Label | Satoshi | 500 | 0.75rem |
| Code / mono | JetBrains Mono | 400 | 0.8rem |

### Spacing

4px base grid. All spacing tokens are multiples of 4.
`--space-1: 4px` through `--space-24: 96px`
Section padding: `--space-20` (80px) vertical on desktop, `--space-12` (48px) on mobile.

### Contrast requirements

| Context | Minimum ratio | Standard |
|---|---|---|
| Body text on dark bg | 4.5:1 | WCAG 2.2 AA |
| Large text (≥18px bold) | 3:1 | WCAG 2.2 AA |
| Interactive UI components | 3:1 | WCAG 2.2 AA |
| Placeholder text | 4.5:1 | WCAG 2.2 AA |

---

## Motion Specification

All motion values are CSS custom properties. No hardcoded durations or easings in components.

### Per-section motion spec

| Section | Tag | Duration token | Easing token | Props | Stagger | Scroll trigger | Reduced motion |
|---|---|---|---|---|---|---|---|
| HeroSection | hero | `--motion-duration-xl` 700ms | `--motion-ease-organic-enter` | opacity, translateY | 80ms · max 4 items | page load | fade only |
| ManifestoSection | manifesto | `--motion-duration-xl` 700ms | `--motion-ease-organic-enter` | opacity, translateY | 120ms | 15% viewport | fade only |
| TagMatrixSection | comparison | `--motion-duration-sm` 240ms | `--motion-ease-structured-ui` | opacity, translateX | 40ms per row | 15% viewport | instant |
| TokenExplorerSection | technical | `--motion-duration-md` 320ms | `--motion-ease-structured-ui` | opacity, translateY | none | 15% viewport | instant |
| MotionTokenGenerator | — | `--motion-duration-md` 320ms | `--motion-ease-structured-ui` | opacity | none | 15% viewport | instant |
| CTASection | cta | `--motion-duration-xs` 180ms | `--motion-ease-organic-accent` | scale, opacity | none | 15% viewport | instant |
| Nav (sticky) | nav | `--motion-duration-xxs` 120ms | `--motion-ease-structured-ui` | opacity | none | interaction | instant |

### Scroll behavior
- IntersectionObserver threshold: 0.15 (15% visible)
- All hero/manifesto reveals: once-only
- Fast-scroll: jump to final stable state (no replay)

### Exit motion
- Modal/overlay close: 160–180ms fade
- Tab content swap: 120ms opacity
- Page leave: minimal, opacity only

### Global constraints
- Max 1 primary animated element per viewport beat
- No layout-thrashing properties (no width, height, margin, padding animation)
- background-atmosphere: suppressed on mobile and prefers-reduced-motion

---

## QA Checklist (51 items)

### Motion (9)
- [ ] All durations via `var(--motion-duration-*)`
- [ ] All easings via `var(--motion-ease-*)`
- [ ] Only transform and opacity animated (no layout props)
- [ ] `prefers-reduced-motion` collapses all motion to instant or near-zero
- [ ] Stagger budgets match tag spec (hero 80ms/4, manifesto 120ms, comparison 40ms)
- [ ] Scroll reveals trigger at 15–20% viewport entry
- [ ] Scroll reveals are once-only for hero and manifesto
- [ ] Exit durations shorter than enter durations
- [ ] Max 1 primary animated focal point per viewport beat

### Accessibility (10)
- [ ] WCAG AA contrast on all body text ≥ 4.5:1
- [ ] WCAG AA contrast on large text ≥ 3:1
- [ ] All interactive elements keyboard-accessible (Tab + Enter/Space)
- [ ] Focus ring: 2px solid `--color-brand-violet`, offset 2px on all interactive elements
- [ ] No motion used as sole communication channel
- [ ] ARIA labels on icon-only and decorative buttons
- [ ] Logical heading hierarchy: single h1 → h2 → h3, no skips
- [ ] All `<img>` elements have meaningful `alt` text
- [ ] Skip-to-main-content link is first focusable element, visible on focus
- [ ] Tested with VoiceOver + Safari and NVDA + Chrome

### Performance (12)
- [ ] Lighthouse Performance ≥ 95
- [ ] Lighthouse Accessibility ≥ 98
- [ ] LCP < 1.8s on 4G mid-tier mobile
- [ ] CLS < 0.05 (no font or image layout shift)
- [ ] INP < 100ms
- [ ] TBT < 150ms
- [ ] JS bundle < 180kB gzip
- [ ] Framer Motion: named imports only (tree-shaken)
- [ ] No unused CSS in production build
- [ ] Fonts: `display:swap`, subset to used glyphs only
- [ ] All images: WebP/AVIF, explicit `width`+`height`, lazy below fold
- [ ] No render-blocking scripts
- [ ] SSG confirmed (no runtime data fetching)

### Design Tokens (7)
- [ ] Zero hardcoded color hex/rgb/hsl in components
- [ ] Zero hardcoded `px` spacing outside token scale
- [ ] Zero hardcoded `font-size` outside type scale
- [ ] W3C token JSON is sole source of truth
- [ ] CSS vars generated deterministically from token JSON
- [ ] Dark mode stable, no FOUC on first load
- [ ] Tailwind config `extend` references only token values

### Code Quality (6)
- [ ] TypeScript strict mode, zero type errors
- [ ] Zero console errors/warnings in production
- [ ] All components use semantic HTML elements
- [ ] ESLint: zero warnings
- [ ] Prettier format enforced
- [ ] No prop drilling beyond 2 levels

### Content (7)
- [ ] Hero section runs its own motion tokens live (self-demonstrating)
- [ ] Tag matrix shows all 35 tags, all 6 columns populated
- [ ] Token explorer previews all 9 tokens interactively
- [ ] MotionTokenGenerator exports valid CSS/Tailwind/JSON
- [ ] CTA links to Gumroad + GitHub
- [ ] Manifesto copy sourced from Beautiful Imperfection + Death of Perfect
- [ ] Page meta: `title`, `description`, `og:image`, `twitter:card`, `canonical`

---

## File Tree

```
tokens/
  motion.json               ← W3C token source (repo root)
styles/
  motion-tokens.css         ← generated CSS vars (repo root)
tailwind/
  motion-theme.js           ← Tailwind theme.extend (repo root)
app/
  motion-system/
    page.tsx
    layout.tsx
    components/
      HeroSection.tsx
      ManifestoSection.tsx
      TagMatrixSection.tsx
      TokenExplorerSection.tsx
      MotionTokenGenerator.tsx
      CTASection.tsx
      StickyNav.tsx
    hooks/
      useReducedMotion.ts
      useInView.ts
    styles/
      motion-system.css
styles/
  tokens.css
public/
  og/
    motion-system-og.png
docs/
  motion-microsite/
    SPEC.md
    QA_CHECKLIST.md
    PERFORMANCE_STANDARDS.md
    DESIGN_STANDARDS.md
```

---

## Deployment

| Step | Command | Expected output |
|---|---|---|
| Build | `next build` | Zero errors, zero warnings |
| Bundle check | `ANALYZE=true next build` | JS < 180kB gzip |
| Lighthouse CI | `lhci autorun` | All scores ≥ target |
| Deploy | `vercel --prod` | URL: melodicbloom.com/motion-system |
| Smoke test | Manual + Playwright | All 51 QA items checked |

---

## Milestones

| Phase | Scope | Definition of done |
|---|---|---|
| P0 | Token JSON + CSS vars + Tailwind config | W3C JSON generates CSS vars, Tailwind build passes, all 7 design token QA items green |
| P1 | HeroSection + ManifestoSection + Nav | Motion spec met, reduced-motion tested, Lighthouse ≥ 95 on these sections |
| P2 | TagMatrixSection + TokenExplorerSection | All 35 tags rendered, scroll reveals working, stagger correct |
| P3 | MotionTokenGenerator integration | Exports valid CSS/Tailwind/JSON, no bundle regression |
| P4 | CTASection + page meta + OG image | CTA functional, all meta tags correct, og:image renders |
| P5 | Full QA pass | All 51 checklist items green, Lighthouse CI passing, deploy confirmed |
