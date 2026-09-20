# ADR-0002 — Procedural Rendering Escalation

**Status:** Proposed  
**Decision class:** Cross-system rendering / interaction governance  
**Canonical home:** `MelodicBloom/design-standards-2026-2027`  
**Base SHA:** `1279b0c38cc1183d1c764d5ed7dbc2f91e6660b2`

## 1. Provenance

This ADR follows accepted ADR-0001 and the merged motion-drift baseline. It is derived from the preserved deterministic-operations synthesis in `qt314wink/living-intelligence-architecture`, repository evidence from `qt314wink/svg-filter-lab`, and concrete inline SVG-filter usage in `qt314wink/nextjs-boilerplate`.

Repository evidence at proposal time includes:

- `qt314wink/svg-filter-lab@951f95f974687ee03b574b95a5b96920c39c8172`
  - `src/hooks/useSVGFilter.ts`
  - `src/components/SVGFilterDefs.tsx`
  - `packages/svg-filters/filter-catalog.json`
- `qt314wink/nextjs-boilerplate@b1bcbcc3199b41b37616bd377a0461e4a6f489bf`
  - `src/components/shell/ShellRoot.tsx`
- `MelodicBloom/shader-gallery@e59ae2ca8c0d07b9492a0713b29a0bf7b6cae774`
  - `aurora/index.html`
- `MelodicBloom/aether@dd45f60dd6c9195a9c29a2c311bf4cfab7705716`
  - `src/components/ShaderCanvas.tsx`

The evidence shows real use of `feTurbulence`, `feDisplacementMap`, parameterized `baseFrequency`, and a separate GPU-backed class of continuously evaluated fragment-shader fields. It also shows that procedural rendering cadence can be numerically timed without being interaction motion, so ADR-0001 and ADR-0002 must remain distinct.

## 2. Context

The system needs a repeatable way to choose between CSS/DOM, SVG, Canvas 2D, and GPU-backed rendering without defaulting to the heaviest substrate.

The problem is not “which rendering technology is best.” It is how to select the least-complex rendering substrate that can faithfully express the required visual mechanism within performance, accessibility, inspectability, and portability constraints.

Without a policy, individual products can:

- reach for WebGL where SVG would be sufficient;
- bake visual textures into assets that could remain procedural and parameterized;
- treat all numeric animation cadence as interaction motion;
- create untraceable one-off shader or filter implementations;
- make performance and fallback decisions inconsistently.

## 3. Decision boundary

This ADR decides:

- the default rendering escalation order;
- when a rendering substrate may be promoted to the next tier;
- what evidence is required to justify escalation;
- how semantic controls map to machine-facing parameters;
- how fallback behavior and reduced-motion concerns are separated from rendering fidelity;
- how procedural rendering cadence is classified relative to ADR-0001.

This ADR does **not** decide:

- the visual style of a product;
- universal bans on WebGL, Canvas, shaders, or filters;
- product-specific art direction;
- the exact API for every procedural control;
- that SVG is always cheaper than Canvas/WebGL;
- a universal FPS requirement across undefined devices.

## 4. Forces

The decision must balance:

- fidelity to the intended visual mechanism;
- runtime cost;
- bundle/dependency cost;
- accessibility and fallback behavior;
- parameter inspectability;
- reproducibility;
- portability;
- ease of testing;
- maintainability;
- graceful degradation;
- the ability to expose controls to non-specialist users.

## 5. Decision

1. Rendering implementations **MUST** begin with the least-complex substrate capable of faithfully expressing the required behavior.
2. The default escalation order is:

   `DOM/CSS → SVG/SVG filters → Canvas 2D → WebGL/WebGPU`

3. Escalation **MUST** be justified by a concrete limitation of the current substrate, not by preference for a more powerful technology.
4. Semantic user-facing controls **MUST** remain traceable to machine-facing parameters when those controls manipulate procedural rendering.
5. A numeric cadence or interval that controls procedural rendering **MUST NOT** be classified as interaction-motion drift solely because it is expressed in milliseconds.
6. Procedural rendering that cannot run safely or legibly in a target environment **MUST** have an explicit fallback or non-procedural representation.
7. Rendering systems **SHOULD** avoid shipping heavy static texture payloads when equivalent procedural output can be generated predictably within the declared performance budget.
8. WebGL/WebGPU **MAY** be used when the required fidelity, throughput, spatial dimensionality, simulation complexity, or particle/field density cannot be met reliably by lower tiers.
9. SVG filters **MAY** be used for print-like grain, displacement, compositing, masking, and similar 2D effects when browser support and performance evidence are sufficient for the affected surface.
10. Rendering-substrate policy **MUST** remain independent from ADR-0001 semantic interaction-motion policy, while both policies may share performance evidence.

## 6. Escalation profiles

| Tier | Default use | Escalate when |
|---|---|---|
| DOM/CSS | layout, transforms, opacity, simple gradients/masks | required effect cannot be expressed faithfully or inspectably |
| SVG / SVG filters | vectors, masks, turbulence, displacement, compositing, scalable procedural 2D | pixel-field throughput, large-scene complexity, or interaction rate becomes unsuitable |
| Canvas 2D | raster drawing, image processing, high-frequency 2D updates | GPU parallelism, 3D, large particle counts, advanced shader effects, or throughput require more |
| WebGL / WebGPU | shaders, 3D, large particle/field systems, advanced simulation | no higher tier in this ADR; justify complexity and fallback explicitly |

The tier is selected by mechanism, not by visual prestige.

## 7. Semantic-to-machine traceability

Human-facing controls may use domain language such as:

- Chaos Frequency
- Grain Density
- Distortion Strength
- Misregistration
- Bloom Spread
- Surface Roughness

The implementation must preserve a traceable mapping such as:

`Chaos Frequency → distortion.frequency → feTurbulence.baseFrequency`

or:

`Distortion Strength → displacement.scale → feDisplacementMap.scale`

The UI may simplify terminology, but simplification must not erase the underlying controllable parameter.

## 8. Repository-grounded evidence

### SVG procedural rendering

`svg-filter-lab` contains explicit `baseFrequency` control in `useSVGFilter.ts`, including runtime updates to an SVG turbulence node.

`SVGFilterDefs.tsx` contains concrete `feTurbulence` configurations with fixed base-frequency values.

`filter-catalog.json` documents procedural parameters such as `baseFrequency`, `numOctaves`, and related texture controls.

### Inline application usage

`nextjs-boilerplate/src/components/shell/ShellRoot.tsx` contains an inline SVG filter combining `feTurbulence` and `feDisplacementMap`, demonstrating that the lower-tier SVG path is already product-usable.

### Timing boundary

The motion-drift baseline identified a 220ms procedural SVG-noise update cadence in `svg-filter-lab`. This is rendering cadence, not interaction-state transition timing, and therefore belongs under this ADR rather than ADR-0001.

### Repository-backed GPU escalation case

`MelodicBloom/shader-gallery/aurora/index.html` implements a full-screen WebGL fragment shader with time and resolution uniforms, procedural hash/noise functions, and a six-octave FBM loop evaluated per fragment on every animation frame.

`MelodicBloom/aether/src/components/ShaderCanvas.tsx` provides the reusable runtime form of the same class of mechanism: a high-performance WebGL context, compiled vertex/fragment programs, continuously updated `u_time` and `u_res` uniforms, and semantic controls including speed, intensity, and scale.

This is a credible escalation case because the required mechanism is a continuously evaluated per-pixel shader field with explicit shader uniforms and multi-octave procedural computation. Recreating a superficially similar appearance with SVG filters would be a different mechanism and would not preserve the same GLSL program, uniform contract, or per-fragment computation model. The justification is therefore mechanism fidelity and GPU-parallel evaluation, not visual prestige.

This evidence does **not** establish that every animated field requires WebGL. It establishes one concrete repository-backed class where WebGL is justified under the proposed escalation rule.

## 9. Alternatives considered

### A. SVG-first universal policy

Advantages:

- inspectable;
- portable;
- lightweight for many 2D effects;
- strong parameter traceability.

Disadvantages:

- insufficient for many high-throughput, 3D, or field-based systems;
- can become expensive on large surfaces or complex filter graphs;
- browser implementations differ.

Disposition: **retain as an important default tier, not universal policy.**

### B. WebGL-first policy

Advantages:

- maximum expressive range;
- strong fit for shader, 3D, particle, and simulation workloads;
- GPU parallelism.

Disadvantages:

- unnecessary complexity for simpler effects;
- larger implementation and fallback burden;
- more difficult debugging and accessibility integration;
- higher risk of overengineering.

Disposition: **reject as default.**

### C. Mechanism-driven escalation ladder

Advantages:

- optimizes for minimum sufficient complexity;
- preserves WebGL where it is actually needed;
- creates explainable architecture decisions;
- supports deterministic escalation and review.

Disadvantages:

- requires teams and agents to classify rendering mechanisms;
- cross-browser evidence may still be needed;
- performance thresholds remain contextual.

Disposition: **preferred proposal.**

## 10. Failure criteria

An implementation fails this ADR when:

- it escalates substrate without a documented lower-tier limitation;
- semantic UI controls cannot be traced to rendering parameters;
- procedural cadence is incorrectly counted as ADR-0001 interaction-motion debt;
- a heavy texture or rendering dependency is introduced without explaining why procedural/lower-tier alternatives were insufficient;
- fallback behavior is absent where the selected substrate is not dependable;
- a performance claim is made without naming the measured surface/environment;
- generated output is visually plausible but no longer reproducible from recorded parameters.

## 11. Verification contract

For each new procedural rendering implementation, record:

- desired visual mechanism;
- selected substrate;
- alternatives considered;
- reason lower tiers were insufficient;
- relevant parameters;
- semantic-control mapping;
- expected update cadence;
- performance environment;
- fallback behavior;
- reduced-motion relevance, if any;
- visual-regression or representative-frame evidence;
- source/provenance for presets or parameter defaults.

## 12. Measurement plan

Primary outcome:

**Substrate justification coverage** = procedural rendering implementations with an explicit mechanism + substrate + escalation rationale / audited procedural rendering implementations.

Driver metrics:

- unexplained WebGL/WebGPU introductions;
- untraceable semantic controls;
- static texture payloads replacing feasible procedural effects;
- rendering cadence misclassified as interaction motion;
- fallback coverage.

No universal substrate quota is established.

## 13. Rollout

Phase 0 — accept or revise this ADR.

Phase 1 — inventory representative procedural-rendering examples across SVG, Canvas, and WebGL repositories.

Phase 2 — define a machine-readable rendering-mechanism receipt schema.

Phase 3 — add non-blocking audit tooling that detects substrate use and missing receipts.

Phase 4 — only then consider targeted CI enforcement where evidence shows it is useful.

## 14. Reconsideration triggers

Reopen this ADR when:

- browser rendering capabilities materially change;
- WebGPU becomes a practical default for workloads currently served by WebGL;
- repeated exceptions show the escalation ladder is incomplete;
- measured SVG/filter performance contradicts current assumptions on representative surfaces;
- the product portfolio develops a rendering class not described here.

## 15. Canonical ownership and downstream use cases

Canonical policy owner: `MelodicBloom/design-standards-2026-2027`.

Primary proof/implementation surfaces:

- `qt314wink/svg-filter-lab`
- `qt314wink/nextjs-boilerplate`
- shader/material repositories
- future Canvas/WebGL/WebGPU labs
- product interfaces exposing procedural controls

Typical use cases:

- Riso/misregistration preview;
- procedural grain and distortion;
- material/surface simulation;
- interactive shader controls;
- generative visual editors;
- browser-based fabrication previsualization;
- deterministic design-to-render pipelines.

## 16. Decision receipt requirements

Before moving this ADR from Proposed to Accepted, the reviewing PR should record:

- exact base and head SHA;
- evidence reviewed;
- at least one SVG success case;
- at least one credible escalation case where SVG is insufficient;
- known browser/performance caveats;
- whether the tier order is accepted as default policy;
- whether semantic-to-machine traceability is proportionate;
- next smallest bounded action.

