---
title: Motion System Microsite — Performance Standards
version: 1.0.0
---

# Performance Standards — Motion System Microsite

## Benchmark targets

All scores measured on Vercel production. Mobile profile: Moto G4 throttle (4G, 4× CPU) via Lighthouse CI.

| Metric | Target | Hard fail | Tool |
|---|---|---|---|
| Lighthouse Performance | ≥ 95 | < 90 | Lighthouse CI |
| Lighthouse Accessibility | ≥ 98 | < 95 | Lighthouse CI |
| Lighthouse Best Practices | ≥ 95 | < 90 | Lighthouse CI |
| Lighthouse SEO | ≥ 95 | < 90 | Lighthouse CI |
| LCP | < 1.8s | > 2.5s | CrUX / Lighthouse |
| CLS | < 0.05 | > 0.1 | CrUX / Lighthouse |
| INP | < 100ms | > 200ms | web-vitals |
| FCP | < 1.2s | > 1.8s | Lighthouse |
| TTFB | < 400ms | > 600ms | Lighthouse |
| JS bundle (gzip) | < 180kB | > 250kB | @next/bundle-analyzer |
| CSS (gzip) | < 30kB | > 50kB | @next/bundle-analyzer |

## Enforcement

```yaml
# .github/workflows/lighthouse-ci.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000/motion-system
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true
          temporaryPublicStorage: true
```

```json
{
  "path": "/motion-system",
  "timings": [
    { "metric": "first-contentful-paint",  "budget": 1200 },
    { "metric": "largest-contentful-paint", "budget": 1800 },
    { "metric": "cumulative-layout-shift",  "budget": 0.05 },
    { "metric": "total-blocking-time",      "budget": 150  }
  ],
  "resourceSizes": [
    { "resourceType": "script",     "budget": 180 },
    { "resourceType": "stylesheet", "budget": 30  },
    { "resourceType": "total",      "budget": 500 }
  ]
}
```

## Animation performance rules

- All animations use `transform` and `opacity` only — GPU-composited, zero layout cost
- No `will-change` on more than 3 elements simultaneously
- `will-change: transform` only on actively animating elements; removed after animation completes
- Framer Motion `useReducedMotion()` hook at every animated component root
- No `AnimatePresence` wrapping static content
- IntersectionObserver for scroll reveals (not scroll event listeners)
- All ambient/atmospheric motion suppressed on `prefers-reduced-motion` and screens < 640px

## Bundle strategy

- Framer Motion: named imports only
- Dynamic import for MotionTokenGenerator (loaded when section enters viewport)
- Clash Display and Satoshi via `next/font` with `display: swap` and unicode-range subset
- All below-fold images: `loading="lazy"` + WebP/AVIF + explicit `width`/`height`
- SSG for all sections — zero runtime data fetching
