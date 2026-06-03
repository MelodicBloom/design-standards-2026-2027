# Template: Deck-to-Website Section Mapping Prompt

Use to translate a slide deck section into a web-native React/Next editorial module, applying motion-system-master v1.0.2 tag classification.

## Prompt template

```
Task: Translate the following slide into a web-native React/Next section using motion-system-master v1.0.2.

Slide content:
- Title: [slide title]
- Body: [slide body text or bullet points]
- Visual: [describe hero image, background, or diagram]
- Intent: [what this slide is trying to make the viewer understand or feel]

Slide tag: [hero / thesis / comparison / gallery / manifesto / etc — from the tag taxonomy]
Source deck dialect: [Organic — Beautiful Imperfection style / Structured — The Death of Perfect style]

Web section requirements:
- Preserve original thesis and narrative intent
- Translate visual hierarchy into HTML/CSS/motion equivalents
- Do not replicate slide layout literally; design for scroll-based reading
- Expand for web-native interaction (hover states, scroll reveals, keyboard nav)

Motion spec:
- Apply tag-appropriate role, easing, and density rules from the skill
- Reduced-motion fallback appropriate to the tag
- Keep expressive motion away from dense reading areas (Zone B rule)
- Stagger: apply only if it improves hierarchy

Output: TypeScript + Tailwind component + motion token references + reduced-motion fallback + Figma annotation string
```

## Filled example

```
Translate:
- Title: The Death of Perfect
- Body: We built systems that prioritized optimization over connection. We created a digital dystopia of flawless algorithmic soup. Now, we must redesign it.
- Visual: Full-bleed dark background, slow ambient texture drift, large expressive type
- Intent: Emotional resolution — leave the audience with a mandate to act

Tag: manifesto
Dialect: Organic (Beautiful Imperfection + Death of Perfect converge here)

Motion: xl 700ms, ease-organic-enter, fade-rise for headline, stagger 80ms for body lines
Exit: page leave or section scroll-out, calm fade 320ms
Reduced motion: opacity fade only, no y movement, suppress ambient drift

Output: TypeScript + Tailwind, motion-duration-xl, motion-ease-organic-enter, Figma annotation
```
