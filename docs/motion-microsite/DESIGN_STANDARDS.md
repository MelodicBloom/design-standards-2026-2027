---
title: Motion System Microsite — Design Standards
version: 1.0.0
---

# Design Standards — Motion System Microsite

## Color tokens

Source of truth: `tokens/color.json` (W3C Design Token format)
Generated output: `styles/tokens.css`

| Token | Value | WCAG on #0a0a0a | Usage |
|---|---|---|---|
| `--color-brand-violet` | #8b5cf6 | 5.2:1 ✓ AA | Primary accent, focus rings |
| `--color-brand-coral` | #f97b6b | 4.6:1 ✓ AA | Secondary accent, CTA hover |
| `--color-brand-cyan` | #22d3ee | 6.1:1 ✓ AA | Tertiary accent |
| `--color-brand-gold` | #f5c842 | 8.3:1 ✓ AA | Expressive accent, manifesto |
| `--color-surface-base` | #0a0a0a | — | Page background |
| `--color-surface-raised` | #141414 | — | Card backgrounds |
| `--color-surface-overlay` | #1f1f1f | — | Hover surfaces |
| `--color-text-primary` | #f5f5f5 | 16.9:1 ✓ AAA | Body text |
| `--color-text-secondary` | #a3a3a3 | 5.8:1 ✓ AA | Captions, meta |
| `--color-text-muted` | #525252 | 1.9:1 ✗ | Decorative only, never on meaningful text |

## Typography

| Role | Token | Family | Weight | Size | Line height |
|---|---|---|---|---|---|
| Hero display | `--type-display-hero` | Clash Display | 700 | clamp(2.5rem,6vw,5rem) | 1.0 |
| Section heading | `--type-display-section` | Clash Display | 600 | clamp(1.75rem,4vw,3rem) | 1.1 |
| Subheading | `--type-heading-sub` | Clash Display | 500 | clamp(1.2rem,2.5vw,1.75rem) | 1.2 |
| Body | `--type-body` | Satoshi | 400 | clamp(0.9rem,1.1vw,1.1rem) | 1.6 |
| Label | `--type-label` | Satoshi | 500 | 0.75rem | 1.4 |
| Code / mono | `--type-mono` | JetBrains Mono | 400 | 0.8rem | 1.5 |

All `font-size` values use `clamp()`. No raw `px` font-size in components.
`font-display: swap` on all custom fonts. Unicode-range subset applied.

## Spacing scale (4px base grid)

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Micro gap |
| `--space-2` | 8px | Tight gap |
| `--space-3` | 12px | Component padding sm |
| `--space-4` | 16px | Component padding md |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Section inner padding |
| `--space-12` | 48px | Section vertical padding mobile |
| `--space-16` | 64px | Section vertical padding tablet |
| `--space-20` | 80px | Section vertical padding desktop |
| `--space-24` | 96px | Hero vertical padding |

## Elevation and depth

| Level | Token | Shadow | Usage |
|---|---|---|---|
| 0 | `--elevation-0` | none | Base surface |
| 1 | `--elevation-1` | 0 1px 3px rgba(0,0,0,0.4) | Cards at rest |
| 2 | `--elevation-2` | 0 4px 16px rgba(0,0,0,0.5) | Cards on hover |
| 3 | `--elevation-3` | 0 8px 32px rgba(139,92,246,0.2) | Modals, overlays |

## Dark mode

Default: dark. Light mode via `data-theme="light"` on `<html>`.
All color tokens have light-mode overrides in `styles/tokens.css`.
No FOUC: theme class set server-side before first paint via Next.js `<Script>` in `_document`.

## Responsive breakpoints

| Token | Value | Description |
|---|---|---|
| `--breakpoint-sm` | 640px | Mobile to phablet |
| `--breakpoint-md` | 768px | Tablet |
| `--breakpoint-lg` | 1024px | Desktop |
| `--breakpoint-xl` | 1280px | Wide |
| `--breakpoint-2xl` | 1536px | Ultra-wide |

Max content width: 1200px. Centered with `margin: 0 auto`.
