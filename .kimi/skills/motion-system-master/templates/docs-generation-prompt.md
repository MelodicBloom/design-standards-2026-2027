# Template: Motion Documentation Generation Prompt

Use to generate motion documentation for a component library or design system reference.

## Prompt template

```
Task: Generate motion documentation for the following component set using motion-system-master v1.0.2.

Components: [list component names]

Format: [markdown table / JSON / Storybook MDX / Notion table]

For each component, document:
- Tag
- Primary motion role
- Secondary motion role (if applicable)
- Brand dialect
- Enter duration token
- Exit duration (from exit reference table)
- Easing token
- Trigger
- Stagger offset and max (if applicable)
- Properties animated
- Reduced-motion fallback
- Accessibility notes
- Framer Motion variant name
- Example Framer transition object

System reference: motion-system-master v1.0.2
```

## Filled example

```
Task: Generate motion docs for HeroSection, CardGrid, ModalOverlay, CTAButton, NavBar.

Format: markdown table.

Columns: Tag | Role | Dialect | Enter token | Exit | Easing | Trigger | Fallback | Framer variant

Reference: motion-system-master v1.0.2 token-spec.json and slide-type-matrix.md
```
