# Template: React/Next Motion Component Prompt

Use when asking Kimi CLI to generate a React/Next.js component with motion from the motion-system-master skill.

## Prompt template

```
Task: Generate a [COMPONENT_TYPE] React component with motion from the motion-system-master skill v1.0.2.

Component: [NAME]
Tag: [TAG — e.g. hero / card-grid / modal / cta]
Primary motion role: [Informational / Expressive / Focus]
Brand dialect: [Organic / Structured / Hybrid]

Motion behavior:
- Enter: [describe enter state, e.g. fade + rise on scroll-in]
- Exit: [describe exit state if applicable, e.g. fade out 200ms]
- Stagger: [describe stagger if needed, e.g. 40ms between cards, max 6]
- Trigger: [scroll / page-load / hover / interaction]

Token references:
- Duration: [e.g. motion-duration-lg → 0.52s in Framer]
- Easing: [e.g. motion-ease-organic-enter → [0.22, 1, 0.36, 1]]

Framer Motion:
- Use enterOrganic / enterStructured / exitCalm / focusPulse variant names
- Use useReducedMotion(); if true collapse all durations to 0, opacity only
- Use AnimatePresence only if exit continuity is required

Accessibility:
- prefers-reduced-motion handled via useReducedMotion()
- keyboard nav and visible focus
- no motion as the only signal of state change

Performance:
- transform and opacity only
- no width/height/margin/padding animation

Output: TypeScript + Tailwind, inline motion comments, reduced-motion block
```

## Filled example

```
Task: Generate a HeroSection React component with motion from motion-system-master v1.0.2.

Component: HeroSection
Tag: hero
Primary motion role: Expressive
Brand dialect: Organic

Motion behavior:
- Enter: headline fades up (y: 24 → 0, opacity: 0 → 1) on page-load
- Stagger: 80ms after headline, subheadline follows; 80ms after that, CTA appears
- Background texture drifts at ambient opacity (suppress on reduced-motion)
- Exit: none (hero is persistent)
- Trigger: page-load / AnimatePresence on mount

Token references:
- Duration: motion-duration-xl → 0.70s
- Easing: motion-ease-organic-enter → [0.22, 1, 0.36, 1]
- Stagger: 0.08s between headline / sub / cta

Framer Motion:
- enterOrganic variant; staggerChildren 0.08
- useReducedMotion(): if true, instant opacity only, no y movement, no drift

Accessibility: useReducedMotion(), visible focus on CTA, heading hierarchy h1
Performance: transform + opacity only
Output: TypeScript + Tailwind
```
