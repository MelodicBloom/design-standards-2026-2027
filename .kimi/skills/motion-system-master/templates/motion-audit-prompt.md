# Template: Motion Audit Prompt

Use to audit an existing component or page section against motion-system-master v1.0.2 compliance.

## Prompt template

```
Task: Audit the following [component / section / file] for motion compliance against motion-system-master v1.0.2.

Subject: [paste component code or describe the UI]

Audit criteria:
1. Is the motion role correctly assigned? (Informational / Expressive / Focus)
2. Is the tag correct?
3. Is the brand dialect appropriate for the component purpose?
4. Are semantic tokens used, or are durations/easings hardcoded?
5. Is prefers-reduced-motion handled (via useReducedMotion() or CSS media query)?
6. Are only performance-safe properties animated (transform / opacity)?
7. Is motion density appropriate for the content type?
8. Is text readable during and after animation?
9. Are interactive states keyboard-accessible?
10. Is exit behavior shorter and calmer than enter behavior?
11. Does stagger, if used, improve hierarchy rather than cluttering it?

Output format:
- One-line summary
- Per-criterion result: PASS / FAIL / PARTIAL + brief note
- List of token replacements for any hardcoded values
- Code change suggestions for each failure
- Accessibility risk flags (high / medium / low)
```

## Filled example

```
Task: Audit the NavBar component for motion compliance against motion-system-master v1.0.2.

Subject: [paste NavBar code]

Focus on:
- Is the active state using xs 180ms or shorter?
- Are hover states using xxs 120ms?
- Is there any expressive motion on a structural nav element?
- Is reduced-motion handled?
- Are hardcoded transition values present?

Output: summary + per-criterion pass/fail + token replacements + risk flags
```
