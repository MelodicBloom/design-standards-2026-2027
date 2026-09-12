# Motion Drift Baseline v0 — Representative Consumer Scan

**Status:** Evidence record only. Non-exhaustive; no enforcement authorized.
**Date:** 2026-09-11
**Governing proposal:** PR #5, ADR-0001 — Semantic Motion Profiles

## Purpose

Measure enough real consuming-repository behavior to determine whether a later enforcement mechanism is justified. This record does not change runtime code, tokens, lint rules, CI, or application behavior.

## Scope and source bindings

| Repository | Ref | Bound SHA | Role in sample |
|---|---|---|---|
| `qt314wink/nextjs-boilerplate` | `main` | `b1bcbcc3199b41b37616bd377a0461e4a6f489bf` | Mature UI consumer with local semantic tokens and component CSS |
| `qt314wink/seed-loom` | `main` | `59da68c0d4a5b5152a3fd34501cb90ef5b81da8c` | Governed product/research system with embedded UI surfaces and reference artifacts |
| `qt314wink/svg-filter-lab` | `main` | `951f95f974687ee03b574b95a5b96920c39c8172` | Rendering-focused library/lab used to test the ADR boundary between interaction motion and procedural rendering cadence |

## Method and limitation

This v0 baseline uses GitHub indexed code search plus direct inspection of selected authoritative files. It is intentionally a representative audit, not a complete repository-wide AST/static-analysis count. Absence of a code-search hit is not treated as proof of absence.

Classification:

- **canonical-equivalent** — transition resolves through a local semantic duration/easing token and can plausibly map to ADR-0001 without redesign;
- **partial-token drift** — duration is tokenized but easing or other motion semantics remain hard-coded/local;
- **hard-coded drift** — duration/easing is embedded directly in component/reference CSS;
- **accessibility override** — reduced-motion/focus rule that intentionally disables or collapses motion;
- **rendering cadence, outside ADR-0001** — timing controls procedural rendering updates rather than interaction-state transition semantics;
- **needs semantic classification** — implementation exists but role cannot be confidently assigned from the indexed snippet alone.

## Findings

### 1. `nextjs-boilerplate`

**Observed architecture:** This repository already contains its own semantic motion vocabulary in `src/styles/tokens.css`:

- `--no-dur-instant: 80ms`
- `--no-dur-fast: 160ms`
- `--no-dur-medium: 320ms`
- `--no-dur-slow: 560ms`
- `--no-dur-bloom: 680ms`

It also uses named easings such as `--no-ease-ripple`, `--no-ease-bloom`, `--no-ease-inlay`, and `--no-ease-settle` across component styles.

**Interpretation:** This is not a simple noncompliant consumer. It has a mature local token system whose values partly align with the proposed canonical timing tiers but use different names and some different values. ADR-0001 should therefore avoid demanding blind token-name replacement. The likely integration problem is semantic crosswalk + drift elimination, not wholesale deletion of local design language.

**Indexed evidence categories:**

- Canonical-equivalent/local-token usage appears in `NacreCard.module.css`, `TokenChip.module.css`, `PearlButton.module.css`, `AbaloneTile.module.css`, `src/styles/surfaces.css`, and other surfaces.
- Partial-token drift appears where tokenized durations are paired with raw `ease`, for example `ArtifactGrid.module.css`, `ReliquaryHero.module.css`, `LaceModal.module.css`, and `StudioPreview.module.css`.
- Hard-coded drift remains in places such as `app/globals.css` (`180ms ease`, `220ms ease`), `SiteNav.module.css` (`160ms ease`), and `CinematicEngine.module.css` (`180ms ease`).
- Accessibility-specific overrides exist separately and should not be counted as ordinary drift when they intentionally collapse motion.

**Risk profile:** medium.

The primary risk is **semantic divergence**, not complete absence of governance. A naive linter that merely rejects noncanonical variable names would destroy legitimate local design-system meaning and create unnecessary churn.

**Best next use case:** build a mapping table between `--no-*` motion roles and ADR-0001 roles, then isolate raw numeric/ease declarations that bypass both systems.

### 2. `seed-loom`

**Observed architecture:** UI motion is sparse and fragmented across product UI, experimental/reference HTML, and initiative artifacts.

Direct product evidence in `src/filter-atelier/styles.css` includes:

`transition: border-color 160ms ease, box-shadow 160ms ease;`

The same surface includes a reduced-motion media path, which is a positive accessibility signal but does not remove the hard-coded transition values.

Reference/experimental surfaces include additional local timings, for example `packages/svg-filter-atlas/reference/svg-filter-atelier-v2.html` with `.2s` transitions and multi-second `ease-in-out` ambient animation, and `initiatives/textile-interface/reference/swatch-card/index.html` with a local `--recovery` transition value.

**Interpretation:** Seed Loom should distinguish three ownership classes before remediation:

1. production interaction UI;
2. reference/demo specimens;
3. governed/generated artifacts that are intentionally evidence fixtures.

Applying one automated rule to all three would conflate product policy with preserved experimental evidence.

**Risk profile:** medium-high for classification error, low-to-medium for current interaction-motion volume.

**Best next use case:** annotate each motion-bearing path with artifact class before considering automated enforcement. The first production candidate is `src/filter-atelier/styles.css`; reference HTML should remain evidence until separately promoted.

### 3. `svg-filter-lab`

Indexed search returned no ordinary CSS `transition:` hits in source. Direct source inspection nevertheless found explicit procedural animation cadence:

- `FilterSurface.tsx` defaults `animatedNoise.interval` to `220`ms when a preset does not define another interval;
- `useSVGFilter.ts` defaults `interval = 220` and drives `feTurbulence` `baseFrequency` updates through `window.setInterval`.

**Classification:** rendering cadence, outside ADR-0001.

This is important negative evidence: a numeric timing value is not automatically interaction-motion drift. The 220ms interval controls stochastic SVG-filter evolution, not state-change feedback, focus, drawer/modal timing, or interaction acknowledgement.

**Risk profile:** high if an enforcement tool searches numeric durations without semantic context; otherwise low for ADR-0001.

**Best next use case:** explicitly exclude procedural-rendering cadence from ADR-0001 scanning and route it to the future procedural-rendering ADR.

## Cross-repository synthesis

The representative scan supports ADR-0001's core premise that motion governance drift exists, but it also shows that enforcement must be semantic rather than purely syntactic.

Three distinct cases exist:

1. **governed local motion vocabularies** that need crosswalks (`nextjs-boilerplate`);
2. **hard-coded or experimental UI timings** that need ownership classification before remediation (`seed-loom`);
3. **non-interaction rendering cadence** that must be excluded from the ADR (`svg-filter-lab`).

Therefore a repository-wide rule such as “reject every duration not equal to a canonical token” is not justified by the evidence.

## Use-case profiles

### U1 — Direct product interaction compliance

Examples: button, modal, drawer, navigation, focus/focus-within feedback, context switching.

Desired outcome: every production interaction transition resolves to an accepted semantic role/token or documented exception.

### U2 — Local design-system interoperability

Example: `nextjs-boilerplate` Nacre/NO token family.

Desired outcome: preserve local naming/brand semantics where meaningful while proving a stable mapping to canonical behavioral roles.

### U3 — Reference and evidence preservation

Examples: Seed Loom reference HTML/specimens.

Desired outcome: preserve historical/experimental evidence without falsely treating it as production conformance debt.

### U4 — Procedural rendering exclusion

Example: `svg-filter-lab` 220ms turbulence update interval.

Desired outcome: prevent interaction-motion policy from accidentally governing rendering simulation cadence.

## Initial KPI baseline shape

This v0 does **not** claim a percentage compliance rate because the scan is not exhaustive enough to establish a denominator.

The next measurable dataset should count, per production motion declaration:

- repository;
- path;
- artifact class;
- semantic role;
- duration source;
- easing source;
- canonical/local token mapping;
- hard-coded values;
- reduced-motion behavior;
- exception status;
- remediation class;
- confidence.

Only after that dataset exists should `motion policy coverage` be calculated.

## Recommended next action

Create a small machine-readable audit schema and scanner **only for observation**, with no failing CI gate and no rewriting behavior.

The scanner should first support these classifications:

- `canonical_token`
- `mapped_local_token`
- `hardcoded_interaction_motion`
- `partial_token_drift`
- `accessibility_override`
- `reference_fixture`
- `procedural_rendering_cadence`
- `unclassified`

The first executable trial should target only the three bound SHAs in this report and emit JSON + Markdown receipts. Enforcement remains out of scope.

## Stop conditions

Do not introduce lint failures, token rewrites, or component edits until:

- ADR-0001 is accepted or explicitly revised;
- the scanner can distinguish production interaction motion from reference fixtures and rendering cadence;
- local-token crosswalks can be represented without destructive renaming;
- scan output has been manually checked against at least one known example from each classification family.
