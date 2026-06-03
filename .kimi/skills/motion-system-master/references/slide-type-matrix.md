# Motion Tag Reference Matrix v1.0.2

## Content and editorial tags

| Tag | Primary role | Secondary role | Dialect | Duration token | Stagger | Density | Reduced motion |
|---|---|---|---|---|---|---|---|
| hero | Expressive | — | Organic | xl 700ms | 80ms / max 4 | High | fade only |
| thesis | Informational | Expressive | Hybrid | lg 520ms | 60ms / max 3 | Medium | instant |
| comparison | Informational | — | Structured | sm 240ms | 40ms / row | Medium | instant |
| process | Informational | — | Structured | md 320ms | 40ms / step | Medium | instant |
| technical | Informational | — | Structured | md 320ms | none | Low-Medium | instant |
| proof | Focus | — | Structured | sm 240ms | none | Low | instant |
| manifesto | Expressive | — | Organic | xl 700ms | 80ms / max 3 | High | fade only |
| pause | None | — | — | 0–180ms | — | None | n/a |
| cta | Focus | — | Organic accent | xs 180ms | none | Low | instant |
| gallery | Expressive | — | Organic | lg 520ms | 60ms / max 6 | Medium-High | fade only |
| diagram | Informational | — | Structured | md 320ms | 40ms / concept | Low-Medium | instant |
| callout | Focus | — | Organic accent | xxs 120ms | none | Low | instant |
| bridge | Informational | — | Hybrid | sm 240ms | none | Low | instant |

## Website and app tags

| Tag | Primary role | Dialect | Duration token | Exit duration | Density | Reduced motion |
|---|---|---|---|---|---|---|
| nav | Focus | Structured | xxs 120ms | instant | Low | instant |
| modal | Focus | Structured | md 320ms | 200ms | Medium | instant |
| drawer | Informational | Structured | md 320ms | 200ms | Low | instant |
| form | Informational | Structured | xs 180ms | instant | Low | instant |
| feedback | Focus | Organic accent | xs 180ms | instant | Low | instant |
| state-change | Focus | Structured | xs 180ms | instant | Low | instant |
| list | Informational | Structured | sm 240ms | instant | Low | instant |
| detail | Informational | Hybrid | sm 240ms | instant | Low | instant |
| dashboard | Informational | Structured | sm 240ms | instant | Low | instant |
| media | Expressive | Organic | lg 520ms | 240ms | Medium | fade only |
| loading | Focus | Structured | md 320ms | instant | Low | minimal |
| wayfinding | Informational | Structured | xs 180ms | instant | Low | instant |
| section-divider | Expressive | Hybrid | sm 240ms | instant | Low | instant |
| background-atmosphere | Expressive | Organic | xl 700ms | — | Low | none (suppress entirely) |
| tooltip | Focus | Structured | xxs 120ms | instant | Low | instant |
| popover | Focus | Structured | xs 180ms | instant | Low | instant |
| accordion | Informational | Structured | md 320ms | 200ms | Low | instant |
| tabs | Focus | Structured | xs 180ms | 120ms | Low | instant |
| carousel | Expressive | Hybrid | md 320ms | 200ms | Medium | instant |
| card-grid | Informational | Hybrid | sm 240ms | instant | Medium | instant |
| search | Focus | Structured | xxs 120ms | instant | Low | instant |
| empty-state | Expressive | Organic accent | md 320ms | instant | Low | instant |

## Stagger budgets by tag

| Context | Stagger offset | Max items before batching |
|---|---|---|
| hero | 80ms | 4 |
| manifesto | 80ms | 3 |
| gallery | 60ms | 6 |
| thesis | 60ms | 3 |
| card-grid | 40ms | 6 |
| comparison rows | 40ms | unlimited (batch if >8) |
| process steps | 40ms | unlimited |
| list/detail rows | 20–40ms | unlimited |

## Exit duration reference

| Enter token | Exit duration | Notes |
|---|---|---|
| xxs 120ms | instant | No perceptible exit needed |
| xs 180ms | 120ms | One step down |
| sm 240ms | 180ms | One step down |
| md 320ms | 200ms | Slightly shorter than enter |
| lg 520ms | 240ms | Much shorter; calm |
| xl 700ms | 320ms | Still expressive but fast |
