# ADR-0001 — Semantic Motion Profiles

**Status:** Proposed
**Decision class:** Cross-system design / interaction governance
**Canonical home:** `MelodicBloom/design-standards-2026-2027`
**Base SHA:** `f0ec18da4d9b6d9885506815bb772910782bff6e`

## 1. Provenance

This ADR is derived from the deterministic-operations synthesis preserved in `qt314wink/living-intelligence-architecture` on branch `agent/operational-synthesis-2026-08-07`, commit `cc47d0c4f38fe0aa380c9e851ce9a1f934b582f6`, and from the current motion-token and performance authority in this repository.

Authoritative implementation references at proposal time:

- `tokens/motion.json`
- `styles/motion-tokens.css`
- `docs/motion-microsite/PERFORMANCE_STANDARDS.md`
- `docs/motion-microsite/`
- open PR #4 (`feat/motion-microsite-phase1`) as implementation evidence, not as a dependency

Evidence classes are distinguished throughout as repository evidence, design decision, or proposed threshold.

## 2. Context

The design system already defines semantic motion tokens, generated CSS projections, reduced-motion behavior, and performance-oriented motion guidance. Consuming applications can still introduce hard-coded local durations, browser-default easings, or expressive motion that is not clearly governed by semantic role.

The problem is therefore not simply whether to use CSS easing or spring physics. The architectural problem is how to preserve expressive capacity while making state-changing interaction motion deterministic, inspectable, portable, accessible, and reviewable across consuming products.

If no decision is made, token authority can remain nominal while application-level motion drifts independently.

## 3. Decision boundary

This ADR decides:

- how semantic motion roles map to bounded timing profiles;
- which motion categories are allowed on critical interaction paths;
- how reduced-motion behavior is governed;
- how local motion exceptions are classified and reviewed;
- what evidence is required before motion policy is treated as satisfied.

This ADR does **not** decide:

- visual composition or art direction;
- shader, Canvas, SVG, WebGL, or animated-filter rendering policy;
- a universal animation library requirement;
- product-specific choreography;
- replacement of all current token values;
- performance claims for every possible device.

Rendering-substrate exceptions, including whether animated filters may be allowed, belong to the procedural-rendering decision track and must not be introduced implicitly through this ADR.

## 4. Forces

The decision must balance:

- deterministic state communication;
- perceived responsiveness;
- accessibility and reduced-motion requirements;
- portability across React, CSS, Figma, and future consumers;
- expressive editorial motion where it does not block task completion;
- low implementation and dependency overhead;
- inspectability by human reviewers and agentic coding workers;
- avoidance of silent local-value drift.

## 5. Decision

1. Production interaction motion **MUST** resolve to a named semantic motion token or a documented exception.
2. Critical state-changing UI motion **MUST** use a bounded structural profile and **MUST NOT** delay state recognition, input availability, or task completion beyond its declared interaction budget.
3. Motion governed by the current motion-microsite performance standard **MUST** use `transform` and `opacity` only unless that performance standard is deliberately revised in a separate reviewable change.
4. Longer editorial or atmospheric motion **MAY** use expressive profiles when it is non-blocking and does not obscure state, focus, or operability, while still obeying the current allowed-property contract.
5. Reduced-motion mode **MUST** remove non-essential spatial motion and **MUST** preserve state legibility and operability.
6. Consuming applications **MUST NOT** invent hard-coded durations or easings when an equivalent canonical token exists.
7. New local motion values **MUST** be either promoted into canonical token governance or recorded as an explicit exception with rationale and verification evidence.
8. A rendering policy that requires properties outside the current `transform`/`opacity` contract **MUST** be decided outside this ADR before use is treated as compliant.

## 6. Semantic profiles

The current token source remains authoritative. This ADR introduces semantic interpretation of those values rather than replacing them.

| Profile | Intended role | Current token range / examples | Constraint |
|---|---|---|---|
| Immediate | focus, tooltip, acknowledgement | `xxs` 120ms | must not block input |
| Responsive | button, affordance, direct feedback | `xs` 180ms | short acknowledgement path |
| Structural | card, row, drawer, modal, context/state change | `sm` 240ms / `md` 320ms | critical state transition budget |
| Editorial | section, gallery, explanatory reveal | `lg` 520ms | non-blocking |
| Atmospheric | hero, manifesto, ambient entrance | `xl` 700ms | decorative/narrative only; must not delay operability |

Current named easing roles remain authoritative unless separately revised:

- `organicEnter`
- `organicAccent`
- `structuredUi`

A proposed enterprise profile using `cubic-bezier(0.2, 0.8, 0.2, 1)` is retained as an **experimental candidate**, not canonical replacement, until benchmarked against the existing role-based easing system.

## 7. Invariants

Regardless of framework or rendering library:

- semantic role precedes implementation syntax;
- motion values are centrally traceable;
- state must remain understandable without animation;
- reduced-motion users retain equivalent task capability;
- decorative motion cannot hold execution authority over interactive state;
- current allowed animated properties remain governed by `PERFORMANCE_STANDARDS.md` until deliberately changed;
- performance claims must name the reference environment used to verify them;
- a reviewer must be able to determine whether a transition is compliant without reverse-engineering arbitrary local values.

## 8. Alternatives considered

### A. Universal 300ms / single easing profile

Advantages:

- highly predictable;
- simple governance;
- easy to audit;
- low cognitive overhead for implementers.

Disadvantages:

- collapses distinct interaction and editorial roles;
- would discard already-established semantic timing tiers;
- risks making immediate feedback feel slow and narrative motion feel mechanically uniform.

Disposition: **retain as a bounded enterprise/structured profile candidate, not universal policy.**

### B. Existing semantic token tiers without stronger enforcement

Advantages:

- already implemented;
- expressive and role-aware;
- generated across canonical token and CSS layers.

Disadvantages:

- does not by itself prevent local drift in consuming applications;
- role-to-failure-budget mapping remains under-specified.

Disposition: **retain as foundation, strengthen governance.**

### C. Bounded hybrid profile

Use existing semantic tiers while imposing stricter critical-path budgets, exception rules, reduced-motion constraints, and verification requirements.

Advantages:

- preserves expressive range;
- creates deterministic operational boundaries;
- aligns with existing token architecture;
- supports automated drift detection later.

Disadvantages:

- requires classification of motion by semantic role;
- exceptions require documentation and review.

Disposition: **preferred proposal.**

## 9. Consequences

Positive:

- clearer cross-system motion governance;
- less hard-coded drift;
- deterministic agent-generated component behavior;
- easier accessibility and performance review;
- expressive motion remains available where appropriate.

Negative:

- motion classification becomes an explicit design responsibility;
- consuming repositories may reveal existing non-compliant local values;
- later CI enforcement will require token-resolution or exception metadata.

New obligations:

- establish a baseline audit of consuming repositories before setting adoption percentages;
- preserve the existing automated performance baseline while adding cross-browser/manual interaction coverage only when justified;
- record approved exceptions with owner, rationale, and expiry/review trigger.

## 10. Failure criteria

A critical interaction implementation fails this ADR when any of the following is observed:

- it uses an undeclared local duration/easing with no documented exception;
- the visual transition exceeds its declared critical-state budget without approved rationale;
- decorative animation prevents or delays interaction availability;
- reduced-motion mode retains non-essential spatial choreography;
- motion causes unintended layout shift;
- a claimed performance threshold cannot be reproduced on the declared reference environment;
- it introduces animated properties outside the current performance-standard contract without a separately reviewed policy change.

The proposed `>320ms` threshold for critical structural state transitions is a policy proposal grounded in the current `md` token, not a universal empirical constant. It remains subject to benchmark evidence.

## 11. Verification contract

Documentation verification:

- every normative rule in this ADR must map to a token, review rule, test, benchmark, current performance standard, or explicit exception process.

Current automated baseline:

- Vercel production measurement;
- Lighthouse CI;
- Moto G4 mobile throttle;
- 4G network profile;
- 4× CPU slowdown;
- the hard-fail thresholds already declared in `docs/motion-microsite/PERFORMANCE_STANDARDS.md`.

This existing automated baseline is preserved. It is not treated as universal physical-device or cross-browser coverage.

Implementation verification when a consuming application changes:

- inspect transition values for canonical token resolution;
- verify keyboard operability before, during, and after transition;
- verify reduced-motion behavior;
- inspect unintended layout shift;
- verify allowed animated properties against the current performance standard;
- run the repository's declared automated performance baseline where applicable;
- add manual cross-browser or physical-device evidence when the consuming product's risk or use case warrants it;
- record exceptions and evidence in the PR receipt.

Vercel preview evidence is required only when runtime behavior in a deployed consuming application changes. This ADR-only documentation change does not require deployment.

## 12. Measurement plan

Primary KPI:

**Motion policy coverage** = production interaction transitions resolving to a named semantic motion token or documented exception / audited production interaction transitions.

Driver metric:

**Unclassified motion drift** = count of hard-coded duration/easing values with neither canonical token mapping nor approved exception.

Guardrails:

- reduced-motion conformance;
- no unintended layout shift caused by motion;
- no decorative motion blocks critical input;
- current allowed-property contract remains intact unless separately revised;
- performance evaluated against a declared environment rather than an undefined universal-device claim.

No adoption percentage target is accepted until baseline drift is measured.

## 13. Rollout

Phase 0 — accept or revise this ADR without changing runtime tokens or the current performance-standard property contract.

Phase 1 — audit representative consuming repositories for hard-coded motion drift.

Phase 2 — propose token/schema or lint/test enforcement only after the audit demonstrates the highest-value enforcement mechanism.

Phase 3 — validate consuming implementations through preview deployments and recorded receipts where runtime behavior changes.

A later procedural-rendering ADR may propose changes to allowed animated properties. Such changes must be independently reviewed and must not be inferred from ADR-0001.

## 14. Rollback

Because this change is policy-only, rollback consists of superseding or reverting this ADR. Existing runtime tokens and performance standards remain unchanged until a later independently reviewed implementation or policy change.

## 15. Reconsideration triggers

Reopen this ADR when:

- measured interaction performance contradicts the proposed structural budget;
- accessibility testing shows a semantic profile creates avoidable barriers;
- a new platform cannot faithfully consume the canonical token model;
- a repeated exception pattern indicates the taxonomy is incomplete;
- the canonical performance standard changes its allowed animated-property contract;
- browser/rendering changes materially alter current performance assumptions.

## 16. Canonical ownership and downstream use cases

Canonical policy owner: `MelodicBloom/design-standards-2026-2027`.

Typical downstream proof surfaces:

- context switchers, drawers, modals, tabs, and navigation in product UIs;
- editorial and portfolio reveals that must remain non-blocking;
- generated components where coding agents must select named motion roles;
- consuming repositories that need to distinguish compliant local behavior from drift;
- Vercel previews used to demonstrate and profile runtime behavior after implementation changes.

## 17. Decision receipt requirements

Before moving this ADR from Proposed to Accepted, the reviewing PR should record:

- exact base and head SHA;
- alternatives reviewed;
- unresolved threshold assumptions;
- the current automated performance baseline and any additional manual validation selected;
- whether any token/runtime/performance-standard files changed;
- evidence used to accept or revise the policy;
- the next smallest implementation or audit action.
