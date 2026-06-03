---
name: motion-system-master
description: Comprehensive motion-system skill for slide decks, editorial microsites, React/Next websites, and multi-brand design systems. Encodes motion roles, tag taxonomies, token architecture, easing and duration guidance, accessibility rules, implementation matrices, and decision hierarchies.
compatibility: Kimi CLI / React / Next.js / Tailwind / CSS / design token pipelines
version: 1.0.2
---

# Motion System Master Skill

## Purpose

Use this skill to classify, design, audit, document, or implement motion systems across slides, editorial microsites, websites, and product UI. This skill is not limited to deck translation. It is a semantic motion framework for modern digital systems where expressive visual identity must coexist with stable interaction infrastructure.

This system is grounded in two ideas:
1. In an era of AI-generated polish, visible imperfection and controlled expressive variance can signal human presence, distinctiveness, and trust.
2. Chaos only works when the underlying system remains calm, readable, accessible, and rule-bound. Expressive surfaces must sit on top of invisible structural discipline.

## Operating model

Always classify motion in this order:
1. Determine whether the UI moment is structural, atmospheric, or interactive.
2. Determine the user's primary need: understanding / feeling / attention guidance.
3. Assign a primary motion role: Informational / Expressive / Focus.
4. Assign a tag type.
5. Assign a brand dialect: Organic / Structured / Hybrid.
6. Apply semantic tokens.
7. Apply accessibility and reduced-motion rules.
8. Apply performance constraints.
9. Generate implementation output.
10. Document rationale, fallback behavior, and QA expectations.

Never pick motion based only on visual taste.

## Motion roles

### Informational
Use when the user needs help understanding hierarchy, sequence, progression, state change, comparison, mechanism, or navigation structure. Should be clear, legible, calm, and restrained. Reveals one thing at a time.

### Expressive
Use when the goal is emotional framing, atmospheric tone, brand presence, editorial identity, or narrative impact. Strongest in hero moments, gallery surfaces, manifesto endings, and brand-led showcases. Must preserve readability and never destabilize functional interfaces.

### Focus
Use when the goal is to draw attention, confirm interaction, support affordance, highlight priority content, or clarify which object changed. Short, controlled, and tactical.

## Brand dialects

### Organic
- Feel: warm, fluid, embodied, tactile, breathable, soft, atmospheric
- Default easing: cubic-bezier(0.22, 1, 0.36, 1) for entrances; cubic-bezier(0.16, 1, 0.3, 1) for accents
- Duration bias: slightly longer, more spacious
- Best for: hero reveals, galleries, manifesto sections, soft card lift, atmospheric transitions

### Structured
- Feel: architectural, deliberate, controlled, mechanical, editorial, precise
- Default easing: cubic-bezier(0.4, 0, 0.2, 1)
- Duration bias: slightly shorter, tighter
- Best for: tabs, diagrams, comparison modules, navigation, system states, technical reveals

### Hybrid
- Mix Organic and Structured per component purpose
- Rule: expressive surfaces can be Organic; structural UI should remain Structured

## Tag taxonomy

### Content/editorial tags
hero, thesis, comparison, process, technical, proof, manifesto, pause, cta, gallery, diagram, callout, bridge

### Website and app tags
nav, modal, drawer, form, feedback, state-change, list, detail, dashboard, media, loading, wayfinding, section-divider, background-atmosphere, tooltip, popover, accordion, tabs, carousel, card-grid, search, empty-state

## Tag definitions (key entries)

- hero: Expressive, Organic, xl 700ms, high density, fade-only reduced motion
- thesis: Informational+Expressive, Hybrid, lg 520ms, medium density
- comparison: Informational, Structured, sm 240ms, row-by-row reveal
- process: Informational, Structured, md 320ms, staged progression
- technical: Informational, Structured, md 320ms, diagram-led
- proof: Focus, Structured, sm 240ms, subtle emphasis only
- manifesto: Expressive, Organic, xl 700ms, emotional resolution
- pause: none, 0-180ms, near stillness
- cta: Focus, Organic accent, xs 180ms, affordance clarity
- gallery: Expressive, Organic, lg 520ms, gentle stagger
- diagram: Informational, Structured, md 320ms, one concept at a time
- callout: Focus, Organic accent, xxs 120ms, quick emphasis
- bridge: Informational, Hybrid, sm 240ms, soft handoff
- nav: Focus, Structured, xxs 120ms, low noise
- modal: Focus, Structured, md 320ms, clear entry
- drawer: Informational, Structured, md 320ms, directional
- form: Informational, Structured, xs 180ms, clarity first
- feedback: Focus, Organic accent, xs 180ms, fast and obvious
- state-change: Focus, Structured, xs 180ms
- dashboard: Informational, Structured, sm 240ms, low drama
- background-atmosphere: Expressive, Organic, xl 700ms, always optional

## Token architecture

### Duration scale
- motion-duration-xxs: 120ms (hover, focus, tooltip)
- motion-duration-xs: 180ms (button, affordance)
- motion-duration-sm: 240ms (card, row, small reveal)
- motion-duration-md: 320ms (section, modal, drawer)
- motion-duration-lg: 520ms (editorial, gallery, bridge)
- motion-duration-xl: 700ms (hero, manifesto, atmosphere)

### Easing tokens
- motion-ease-organic-enter: cubic-bezier(0.22, 1, 0.36, 1)
- motion-ease-organic-accent: cubic-bezier(0.16, 1, 0.3, 1)
- motion-ease-structured-ui: cubic-bezier(0.4, 0, 0.2, 1)

## Motion sequencing rules

When more than one element animates in the same section, sequence by hierarchy:
- headline first
- supporting copy second
- media or decorative layers last

Default stagger guidance:
- hero: 80ms between elements, max 4 visible staggered items
- card grid: 40ms between items, max 6 items before batching
- list/detail views: 20–40ms between rows
- manifesto and gallery: 60–120ms depending on density

Rules:
- Do not stagger everything by default; only stagger when hierarchy benefits from it.
- Cap total stagger budget so the section resolves quickly.
- If a stagger competes with reading, collapse to a single reveal.

## Exit and leave motion

Exit motion should usually be shorter than entrance motion.
Use exits to preserve continuity, not to add spectacle.

Rules:
- modal close: 160–240ms
- drawer close: 180–260ms
- tab/content swap: 120–180ms
- page leave: minimal, unless the transition is part of a narrative sequence
- expressive exits are rare; favor calm fade or slide-out behavior

If content is disappearing from a task-critical area, prioritize immediate clarity over flourish.

## Scroll-linked motion

Scroll-linked motion must be used sparingly and only when it clarifies narrative or hierarchy.

Rules:
- Trigger reveals when 15–20% of the section enters the viewport
- Prefer once-only reveals for hero, thesis, and manifesto tags
- Allow repeatable reveals only for lightweight utility content
- Never bind essential comprehension to continuous scroll progress alone
- If the scroll is fast, jump to the final stable state rather than replaying a long sequence

## Responsive motion rules

Motion should adapt to device context.

Rules:
- On mobile, reduce durations by roughly 20% for structural motion
- Suppress background-atmosphere, heavy parallax, and long looping ambient motion on low-power or narrow screens
- Convert hover-only affordances into tap/press behaviors
- Keep touch-triggered motion short and unambiguous
- If the screen is dense, simplify the animation rather than shrinking the text area

## Conflict resolution

When roles conflict in one component, use this precedence:
- Focus overrides Informational when feedback or affordance clarity is at stake
- Informational overrides Expressive when comprehension could suffer
- Expressive is allowed only after structure and interaction clarity are resolved

## Anti-patterns

Do not:
- animate width, height, margin, padding, or top/left for routine motion
- use motion-xl inside forms, checkout flows, or dense data tables
- stack multiple expressive effects on the same focal beat
- rely on motion as the only cue for meaning
- run ambient loops that compete with readable text
- omit reduced-motion fallbacks on anything except truly static content
- introduce motion that delays task completion without clear benefit

## QA checklist

Before shipping, verify:
- the tag is correct
- the motion role is correct
- the dialect matches the component purpose
- durations come from semantic tokens
- easing comes from semantic tokens
- only transform and opacity are animated unless explicitly justified
- reduced-motion behavior is present and readable
- keyboard focus states are clear
- motion does not obscure text or controls
- exit behavior is shorter and calmer than enter behavior
- stagger, if used, improves hierarchy rather than cluttering it

## Framer Motion mapping

For React/Next implementations, map this skill into Framer Motion with these conventions:
- `initial` = hidden or pre-entry state
- `animate` = final readable state
- `exit` = short, calm leave state
- `transition.duration` = semantic duration token (in seconds: xxs = 0.12, xs = 0.18, sm = 0.24, md = 0.32, lg = 0.52, xl = 0.70)
- `transition.ease` = semantic easing token
- `AnimatePresence` = only where enter/exit continuity matters
- `useReducedMotion()` = required for accessible variants; when true, collapse all durations to 0 and use opacity only

Variant naming convention:
- `enterOrganic` — xl/lg enters, Organic dialect
- `enterStructured` — sm/md enters, Structured dialect
- `exitCalm` — all exits (shorter than corresponding enter)
- `focusPulse` — Focus role microinteractions
- `staggerChildren` — parent variant with `staggerChildren` delay set to tag-appropriate offset

## Figma handoff annotations

When documenting motion in Figma, annotate each component or frame with a compact motion spec note:

```
[tag] | [role] | [dialect] | [duration token] | [easing token] | [trigger] | [reduced-motion fallback]
```

Example:
```
hero | Expressive | Organic | motion-duration-xl | motion-ease-organic-enter | page-load | fade only
```

Apply this note to every animated layer or group in the Figma file so engineering can read the full motion intent without needing to interpret visual timing from prototype previews.

## Accessibility rules (mandatory)

- Support prefers-reduced-motion always
- Preserve content order and meaning when motion is removed
- Maintain text contrast and readability at all times
- Keep focus states visible
- Ensure keyboard accessibility throughout
- Avoid flashing and abrupt disruptive movement
- Never use motion as the only communication channel

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Performance rules

- Prefer transform and opacity; avoid width/height/margin/padding animation
- Limit simultaneous animated focal points to 1 primary per beat
- Stagger secondary elements rather than animating all at once
- Keep SVG and WebGL strategic; no heavy looping in content areas
- Treat ambient motion as optional enhancement, not core infrastructure

## React/Next implementation rules

- Use semantic token references, not hardcoded values
- Support reduced-motion at component level via useReducedMotion()
- Prefer transforms and opacity over layout-thrashing properties
- Keep interactive states short and obvious
- Avoid running large ambient animations near content-dense areas
- Route-level transitions only when they do not slow navigation
- Scroll-based reveals used sparingly and meaningfully

## Documentation pipeline

1. Define token JSON (references/token-spec.json)
2. Validate against schema
3. Generate CSS variables (references/motion-tokens.css)
4. Generate Tailwind mappings (references/tailwind-motion.js)
5. Generate docs tables (references/slide-type-matrix.md)
6. Publish to repo or package
7. Test in component library or app

## Changelog

### 1.0.2
- Added: motion sequencing and stagger budgets
- Added: exit and leave motion rules
- Added: scroll-linked motion trigger thresholds
- Added: responsive motion rules for mobile and low-power
- Added: conflict resolution precedence
- Added: anti-patterns section
- Added: QA checklist (11 criteria)
- Added: Framer Motion mapping with variant naming and duration conversion
- Added: Figma handoff annotation format
- Added: changelog structure

### 1.0.1
- Initial operational skill with roles, tags, tokens, accessibility, performance, and references

## Source-derived insight summary

From Beautiful Imperfection:
- Imperfection functions as honesty, tactility, and human signal
- Glitch, melt, blur, and psychedelic forms are expressive layers when controlled
- Chaos requires mathematical and accessible foundations
- Deploy expressive effects in hero/gallery/campaign zones; keep checkout and dense reading calm

From The Death of Perfect:
- Polished sameness is losing distinction; algorithmic perfection has become invisible
- Slight inconsistency and human correction can restore presence and trust
- The architecture must remain calm even when the surface becomes feral
- Zone A (riot) vs Zone B (calm): hero and campaigns get chaos; nav and forms stay invisible

## References
- references/token-spec.json — full JSON token schema with triggers and fallbacks
- references/motion-tokens.css — CSS variables + utility classes
- references/tailwind-motion.js — Tailwind theme extension
- references/slide-type-matrix.md — 35-tag classification matrix with density and fallback columns
- templates/react-component-prompt.md — prompt template for generating motion components
- templates/motion-audit-prompt.md — prompt template for auditing motion compliance
- templates/docs-generation-prompt.md — prompt template for generating component docs
- templates/deck-to-web-section-prompt.md — prompt template for deck-to-web translation
- examples/beautiful-imperfection-mapping.md — 10-slide motion mapping, Organic dialect
- examples/death-of-perfect-mapping.md — 11-slide motion mapping, Structured dialect
