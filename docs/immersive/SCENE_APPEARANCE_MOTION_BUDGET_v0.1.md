# Scene, appearance, interaction, motion and performance — immersive v0.1 seed

**Status:** proposal / unmeasured reference targets. Canonical owner: `MelodicBloom/design-standards-2026-2027`. No edits to `tokens/motion.json`, existing CSS token exports, `docs/motion-microsite/PERFORMANCE_STANDARDS.md` or proposed `ADR-0001`.

## Purpose, audience and use cases
Provide a shared presentation contract for optical lookdev specimens, a browser-based 2D/3D knowledge interface, a garment/material inspection tool, a spatial audio design critique, and a narrated/interactive real-time scene. It specifies **presentation and interaction**, not physical BRDFs, acoustic physics, or epistemic authority.

## Seeded structure
See `examples/immersive/inspection-scene.profile.json`. Identity links to Seed Loom specimen `specimen-coated-metal-001`; shader mechanics link to Shader Grammar. It contains explicit use case, implementation stack, appearance, scene, camera/light state, behavior, motion controls, accessibility, quality fallback, candidate budgets and provenance.

### Appearance
- Neutral, reproducible environment first. Before judging any material, lock camera, light, exposure, tone mapping and view.
- Separate *material appearance* from *UI appearance*: artistic violet or gradient backdrops must not be mistaken for a BRDF finding. Expose a neutral gray/background preset for controlled comparisons.
- Source/simulation annotations remain readable HTML with focusable references, not texture-only labels.
- Mark illustrative colors/roughness as seeds; do not turn photographic appearance into measured IOR or geometry.

### Behavior and scene
- Immediate access to both semantic document and 3D exploration; share object selection, material parameters and inspection context.
- Mouse, touch and keyboard equivalents; tab traversal, Enter/Space activation, Escape for contextual overlays; useful focus states and text alternatives.
- Prefer direct browser URLs for specimens and views; no GPU requirement to read a source or explanation.
- The reference scene uses one panel, key light, camera and a few named annotations, not a full virtual museum. Compare candidates with fixed conditions.

### Motion taxonomy
- UI transitions use named roles from `tokens/motion.json` and `ADR-0001` where adopted. The ADR is still proposed.
- Distinguish UI state transitions (bounded, never block input) from scene animation (may change pixels and material/geometry; needs a separate rendering-substrate policy), physics (time-step controlled), and timed narrative cues (pause/scrub/manual progression).
- Respect `prefers-reduced-motion`: turn off autoplay/fly-throughs and nonessential ambient dynamics; retain all information and actions.
- Real-time tracked-camera event work must not schedule a conflicting free camera animation. Prefer a documented scene-relative motion option and synchronize in rehearsal.

### Performance budget — candidate, not evidence
The existing motion-microsite Lighthouse/LCP/CLS policy is scoped to that microsite and **must not** be silently imposed on a GPU-heavy WebGL scene. For the proposed reference specimen:
- Mobile hypothesis: target interactive >=30 FPS / p95 frame time <=33.3ms; texture-memory *soft planning estimate* 96 MB, <=100 draw calls.
- Desktop hypothesis: target interactive >=60 FPS / p95 frame time <=16.7ms; texture-memory *soft planning estimate* 256 MB, <=250 draw calls.
These **are not measured, guaranteed or automatically enforceable limits**. Capture device/GPU, viewport DPR, resolution, browser, power/thermal state, content class and usage scenario. If a candidate limit cannot be measured reliably, mark it *not measured*, not zero or pass.

Quality ladder: DPR/resolution first → less postprocessing → lower environment/normal detail → fewer particle/volume steps → labeled static fallback. Preserve semantic interactions throughout. Disable offscreen scenes and suspend or dispose GPU resources on context loss; restore deterministically.

### Acceptance criteria
1. 2D task and 3D inspection share the same selected entity after each mode switch.
2. Form/keyboard labels, focus visibility, small screens and reduced-motion checks pass.
3. Static fallback supplies all information when WebGL fails or is not supported.
4. GPU numerical performance measures include reproducible apparatus and named p50/p95 traces, not one cherry-picked FPS value.
5. Candidate appearance differences are compared with fixed camera/illumination and source timestamps.
6. Exception records identify owner, reason, compensating behavior and review trigger.

### Sources and ownership
Stanton et al. (INTERACT 2017) informs dual-mode UX but is a small pilot; Winchester et al. (EVA London 2025) informs cue/camera production risks. The budgets above are **design hypotheses** added in this seed, not published measurements. Optical models remain in `qt314wink/shader-grammar`; semantic identity in `qt314wink/seed-loom`; shared CI governance in `MelodicBloom/.github`.

**Open decisions:** reference mobile devices and measured thresholds, WebGL/WebGPU adapter parity, renderer policy for animated filters, camera control on actual tracked installations, and texture residency telemetry availability. Treat all as unresolved until verified.
