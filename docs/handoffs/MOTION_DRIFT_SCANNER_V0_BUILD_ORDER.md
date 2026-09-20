# Motion Drift Scanner v0 — Codex Build Order

**Status:** READY_FOR_CODEX_EXECUTION  
**Canonical repository:** `MelodicBloom/design-standards-2026-2027`  
**Working branch:** `agent/motion-drift-scanner-v0`  
**Authoritative base:** `1279b0c38cc1183d1c764d5ed7dbc2f91e6660b2`  
**Accepted governing policy:** ADR-0001, commit `3ff1ce033d7069554141b4ebda57d948c9849a1c`  
**Merged evidence baseline:** PR #6 / merge commit `1279b0c38cc1183d1c764d5ed7dbc2f91e6660b2`

## 1. Purpose

Build a trustworthy observation layer before any motion-policy enforcement is allowed.

The scanner is not a linter and is not a fixer. Its first job is to distinguish different kinds of motion-bearing code well enough that a later human or agent can decide what should be mapped, remediated, preserved, excluded, or left unresolved.

## 2. Intention

Increase confidence that automated governance will not flatten valid local design systems, rewrite reference evidence, or mistake procedural rendering cadence for interaction-motion debt.

The scanner should make uncertainty explicit rather than hide it.

## 3. Stakes

A syntactic scanner that simply finds `160ms`, `ease`, or `setInterval` would produce dangerous false positives.

Known risks already observed:

- `nextjs-boilerplate` has a legitimate local semantic motion vocabulary.
- Seed Loom mixes production UI with preserved reference/demo artifacts.
- `svg-filter-lab` uses a 220ms interval to evolve SVG turbulence; that is procedural rendering cadence, not an interaction transition.
- reduced-motion rules can contain duration overrides that should not be counted as ordinary drift.

If v0 cannot distinguish these cases, no CI enforcement is authorized.

## 4. Primary use cases

### U1 — Direct product interaction observation
Identify production transitions such as focus feedback, controls, modal/drawer movement, navigation, state switches, and interaction acknowledgement.

### U2 — Local design-system interoperability
Recognize local semantic motion tokens and represent their relationship to canonical roles without renaming or deleting local vocabulary.

### U3 — Evidence/reference preservation
Distinguish production UI from reference specimens, demonstrations, historical fixtures, or governed generated artifacts.

### U4 — Accessibility-context recognition
Identify reduced-motion and related accessibility overrides separately from ordinary motion declarations.

### U5 — Procedural-rendering exclusion
Recognize timers/cadence used for filters, simulations, shaders, or rendering evolution and keep those outside ADR-0001 interaction-motion debt.

### U6 — Explicit uncertainty
Emit `unclassified` where available evidence cannot support a confident semantic determination.

## 5. Descriptive definition of done

A human reviewer can point the scanner at the three bound repository snapshots and receive a provenance-rich inventory that explains, for each candidate:

- where it came from;
- what kind of artifact it appears to be;
- what motion values or tokens it uses;
- which classification was assigned;
- why;
- how confident the scanner is;
- whether it appears governed, mapped, exempt, procedural, or unresolved;
- what the next review action should be.

The scanner changes no consumer source files.

## 6. Testable definition of done

PASS only when all are true:

1. The schema validates emitted JSON.
2. Two clean scans of the same bound inputs produce byte-identical normalized JSON output, except fields explicitly documented as non-deterministic; v0 should preferably have none.
3. JSON and Markdown receipts describe the same observation set and counts.
4. Known baseline examples are represented in tests.
5. A local semantic token in `nextjs-boilerplate` can be represented as `mapped_local_token` without destructive renaming.
6. The Seed Loom `src/filter-atelier/styles.css` transition can be observed as production interaction motion.
7. Seed Loom reference paths can be represented as `reference_fixture`.
8. The `svg-filter-lab` 220ms turbulence interval is `procedural_rendering_cadence`, not interaction-motion debt.
9. Reduced-motion logic can be represented as `accessibility_override`.
10. Ambiguous fixtures remain `unclassified`.
11. The scanner writes only to its declared output directory.
12. Consumer repositories remain detached at their exact bound SHAs and clean after scanning.
13. No failing CI gate, token migration, source rewrite, or automatic remediation is introduced.
14. `npm run typecheck` passes.
15. `npm test` passes.

## 7. Required classifications

The schema MUST support exactly these v0 classifications:

- `canonical_token`
- `mapped_local_token`
- `hardcoded_interaction_motion`
- `partial_token_drift`
- `accessibility_override`
- `reference_fixture`
- `procedural_rendering_cadence`
- `unclassified`

Do not add more categories unless a real fixture cannot be represented and the reason is documented in the PR.

## 8. Minimum observation schema

Each observation SHOULD include:

- `schemaVersion`
- `repository`
- `boundSha`
- `path`
- `lineStart` / `lineEnd` when reliable
- `artifactClass`
- `classification`
- `semanticRole`
- `durationSource`
- `durationValue`
- `easingSource`
- `easingValue`
- `tokenReference`
- `canonicalMapping`
- `reducedMotionContext`
- `evidenceExcerpt` or stable evidence hash
- `confidence`
- `reason`
- `exceptionStatus`
- `recommendedNextAction`

Confidence MUST be bounded and interpretable. Recommended v0 representation:

- `high`
- `medium`
- `low`

Do not invent pseudo-precision percentages without calibrated evidence.

## 9. Bound source inputs

Use `tools/motion-drift-scanner/source-manifest.json` as the machine-readable authority.

### Governance sources

1. `docs/adr/ADR-0001-semantic-motion-profiles.md`
2. `docs/audits/2026-09-11-motion-drift-baseline-v0.md`
3. `tokens/motion.json`
4. `docs/motion-microsite/PERFORMANCE_STANDARDS.md`

### Consumer snapshot A
`qt314wink/nextjs-boilerplate@b1bcbcc3199b41b37616bd377a0461e4a6f489bf`

Important anchors:

- `src/styles/tokens.css`
- local durations:
  - 80ms
  - 160ms
  - 320ms
  - 400ms
  - 560ms
  - 680ms
- named local easings:
  - `--no-ease-bloom`
  - `--no-ease-veil`
  - `--no-ease-inlay`
  - `--no-ease-settle`
  - `--no-ease-ripple`

### Consumer snapshot B
`qt314wink/seed-loom@59da68c0d4a5b5152a3fd34501cb90ef5b81da8c`

Important anchors:

- `src/filter-atelier/styles.css`
- known production example:
  `transition: border-color 160ms ease, box-shadow 160ms ease;`
- reference paths:
  - `packages/svg-filter-atlas/reference/**`
  - `initiatives/textile-interface/reference/**`

### Consumer snapshot C
`qt314wink/svg-filter-lab@951f95f974687ee03b574b95a5b96920c39c8172`

Important anchors:

- `src/hooks/useSVGFilter.ts`
- default `interval = 220`
- interval drives updates to `feTurbulence.baseFrequency`
- this is the negative-control case proving numeric timing is not automatically interaction motion.

## 10. Environment

Preferred environment:

- Linux / WSL / Codex cloud shell
- Git
- Node 20–22
- npm
- network access to GitHub for initial source checkout and package installation

User-local compatibility target:

- Windows + WSL Ubuntu
- Node 22.x
- Android Termux may run the scanner later, but Termux compatibility is not a v0 acceptance blocker.

Bootstrap:

```bash
git fetch origin
git checkout agent/motion-drift-scanner-v0
bash scripts/bootstrap-motion-drift-scanner.sh
```

The bootstrap script:

- verifies branch/base;
- verifies Node range;
- requires a clean worktree;
- checks out all three consumers at exact SHAs;
- installs pinned scanner dependencies;
- creates `package-lock.json` if absent.

If a lockfile is generated, commit it before claiming implementation readiness.

## 11. Expected file matrix

Codex MAY refine names, but preserve responsibilities.

```text
tools/motion-drift-scanner/
  package.json
  package-lock.json
  source-manifest.json
  tsconfig.json
  src/
    cli.ts
    scan.ts
    classify.ts
    extract/
      css.ts
      js-ts.ts
      paths.ts
    render/
      json.ts
      markdown.ts
    types.ts
  schemas/
    motion-drift-observation.schema.json
    motion-drift-report.schema.json
  fixtures/
    nextjs-boilerplate/
    seed-loom/
    svg-filter-lab/
  tests/
    classification.test.ts
    determinism.test.ts
    schema.test.ts
    nonmutation.test.ts
    receipts.test.ts

docs/audits/generated/
  .gitkeep or README only if required;
  generated scan receipts should not be committed by default unless the PR explicitly needs representative fixtures.

scripts/
  bootstrap-motion-drift-scanner.sh
```

## 12. Implementation order

### Phase 0 — Preflight

Report:

- Codex version
- Node/npm versions
- repository
- branch
- HEAD
- merge-base against expected base
- dirty/clean state
- bound input SHAs
- dependency install result

IF repository, branch, or base differs:
STOP before implementation.

IF an equivalent scanner PR already exists:
STOP and compare rather than duplicate.

### Phase 1 — Schema first

Implement JSON Schema before detection logic.

Create one minimal valid report by hand.

Validate it with AJV.

Do not proceed until schema test passes.

### Phase 2 — Fixtures before generalized scanning

Create minimal fixture snippets derived from the exact bound sources.

Each fixture MUST record:

- source repo
- source SHA
- source path
- source excerpt or line reference
- expected classification
- reason

Do not alter fixtures simply to fit implementation behavior.

### Phase 3 — Extraction

Use PostCSS for CSS declarations and safe parsing.

Detect at minimum:

- `transition`
- `transition-duration`
- `transition-timing-function`
- animation timing where relevant
- CSS custom property references
- `prefers-reduced-motion`

For JS/TS v0, detect explicit procedural timing patterns conservatively:

- `setInterval`
- known render/filter hooks
- associated semantic evidence such as `feTurbulence`, `baseFrequency`, shader/render loop context

Do not build a general JavaScript semantic analyzer in v0.

### Phase 4 — Classification

Classification should combine:

1. source path/artifact class;
2. syntax;
3. token reference;
4. surrounding semantic evidence;
5. known source-manifest hints.

Priority examples:

- reference directory + motion syntax -> `reference_fixture`, unless explicit metadata proves production promotion;
- reduced-motion block -> `accessibility_override`;
- interval modifying SVG turbulence -> `procedural_rendering_cadence`;
- local semantic duration + local semantic easing with stable mapping -> `mapped_local_token`;
- canonical token -> `canonical_token`;
- tokenized duration + raw easing -> candidate `partial_token_drift`;
- raw production UI duration/easing -> candidate `hardcoded_interaction_motion`;
- insufficient semantic context -> `unclassified`.

Never classify solely from duration numeric equality.

### Phase 5 — Deterministic receipts

Emit:

```text
out/<run-id or stable-name>/motion-drift.json
out/<run-id or stable-name>/motion-drift.md
```

Prefer stable names for v0, e.g.:

```text
out/baseline-v0/report.json
out/baseline-v0/report.md
```

Sort observations deterministically by:

1. repository
2. path
3. line
4. classification
5. stable evidence hash

No timestamps in the canonical comparison payload unless isolated from the deterministic report.

### Phase 6 — Tests

Minimum tests:

- schema accepts valid report;
- schema rejects missing required provenance;
- mapped local token fixture;
- hardcoded production fixture;
- partial-token fixture;
- accessibility override fixture;
- reference fixture;
- procedural cadence fixture;
- unclassified fixture;
- deterministic repeat run;
- consumer inputs remain clean;
- JSON/Markdown observation counts match.

### Phase 7 — Trial scan

Run only against the three bound snapshots.

Do not silently switch to repository current heads.

Compare output to baseline expectations.

Produce a discrepancy ledger rather than forcing expected results.

### Phase 8 — Review and PR

Review:

- `git diff --check`
- `npm run typecheck`
- `npm test`
- two-run deterministic receipt diff
- `git status` in all consumer checkouts

Open or update a PR only after those pass.

PR remains observation-only.

## 13. Explicit if/then rules

IF a candidate cannot be classified from source evidence:
THEN emit `unclassified`; do not guess.

IF a local token system has meaningful semantic names:
THEN map it; do not rename it.

IF a duration equals a canonical value but uses unrelated semantics:
THEN numeric equality is insufficient for `canonical_token`.

IF a file is under a known reference/demo path:
THEN default to `reference_fixture`, unless explicit promotion evidence exists.

IF code is inside `prefers-reduced-motion`:
THEN represent accessibility context separately before judging drift.

IF an interval drives turbulence, shader, simulation, or rendering evolution:
THEN route to `procedural_rendering_cadence` unless evidence shows it controls UI state.

IF source evidence contradicts the merged baseline:
THEN source-at-bound-SHA wins; record a baseline discrepancy.

IF a dependency can be removed without losing correctness:
THEN prefer fewer dependencies and update package + lockfile.

IF tests require changing source fixtures:
THEN STOP; fix implementation instead.

IF the full scan/test job is likely to exceed 60 seconds:
THEN launch it with Codex Process Jobs as one finite foreground workload and release the turn; do not poll it in the launch turn.

IF `main` advances after work begins:
THEN compare changes to ADR-0001, baseline, token source, and performance standards before rebasing.
Do not blindly rebase.

IF ADR-0002 merges while this scanner is in progress:
THEN do not expand v0 scope; merely note the additional rendering policy source for a future scanner version.

## 14. Subagent operating instructions

The parent Codex agent owns:

- branch integrity;
- architecture;
- integration;
- final classification semantics;
- commits/PR;
- stop decisions.

Subagents may be used for parallel evidence and implementation only with exclusive responsibilities.

### Subagent A — Evidence mapper (read-only)

Task:

- inspect all three bound consumers;
- produce candidate paths and expected classifications;
- identify false-positive traps;
- do not modify code.

Output:
`notes/evidence-map.md` or return directly to parent.

### Subagent B — Schema/fixture worker

Exclusive write ownership:

- `tools/motion-drift-scanner/schemas/**`
- `tools/motion-drift-scanner/fixtures/**`
- schema-specific tests only if assigned.

Must not edit parser/classifier files.

### Subagent C — Extractor worker

Exclusive write ownership:

- `tools/motion-drift-scanner/src/extract/**`

Must not decide policy classification beyond returning normalized evidence.

### Subagent D — QA adversary (read-only by default)

After integration:

- invent false-positive/false-negative cases;
- test classification boundaries;
- inspect deterministic output;
- challenge path heuristics;
- return findings.

#### Subagent safety rules

IF two subagents would edit the same file:
THEN do not run those writes in parallel.

IF a subagent discovers a policy ambiguity:
THEN return it to parent; subagent must not invent a new category.

IF using worktrees:
THEN create one worktree per writing subagent and merge/cherry-pick intentionally.

IF a subagent result lacks source path + SHA:
THEN treat it as advisory, not evidence.

Maximum useful concurrency for v0: 3 workers plus parent.

## 15. Useful skills / tools

### Superpowers
Use for:

- TDD;
- verification-before-completion;
- worktree isolation;
- review discipline.

### GitHub
Use as source authority for:

- SHAs;
- files;
- PR boundaries;
- receipts.

### Codex Process Jobs
Use only for finite local workloads likely to exceed about 60 seconds:

- complete multi-repo scan;
- full test/evaluation suite;
- repeated deterministic run comparison.

Do not use it for quick unit tests or interactive development.

### Data
Use to reason about:

- schema dimensions;
- classification counts;
- coverage denominator;
- confidence distribution.

Do not publish compliance percentages until an exhaustive enough denominator exists.

### AgentProof
Optional after implementation is stable, to instrument a fresh Codex execution/evaluation.
Do not claim retroactive proof.

### Auto Preference Learner
Use only after completion in Suggest mode.
Candidate durable rules may be proposed, never silently applied.

## 16. Non-goals

Do NOT:

- add CI failure gates;
- rewrite consumer code;
- migrate tokens;
- normalize local design-language names;
- change ADR-0001;
- merge ADR-0002 through this branch;
- benchmark unrelated WebGL/rendering workloads;
- scan arbitrary latest repository heads;
- claim universal compliance.

## 17. Decisions reserved for the user

These are not implementation blockers; use recommended defaults unless the user changes them before merge.

### D1 — Canonical home
Recommended: keep scanner in `design-standards-2026-2027`.

Alternative: move executable scanner to a dedicated governance-tooling repo later.

### D2 — Treatment of `unclassified`
Recommended: informational/warning only in v0 and v1.

Alternative: block release once classifier precision is measured.

### D3 — Local token mappings
Recommended: report mappings in scan output first; do not create a central alias registry in v0.

Alternative: introduce a versioned cross-repository alias registry now.

### D4 — Line precision
Recommended: best-effort line ranges plus stable evidence excerpt/hash.

Alternative: require exact AST/source locations for every observation before merge.

### D5 — Scope expansion
Recommended: only the three bound consumers in v0.

Alternative: add more repositories after the classifier passes the known fixtures.

## 18. Final receipt required from Codex

Return:

- repository
- base SHA
- branch
- starting HEAD
- final HEAD
- files changed
- dependency lockfile status
- schema version
- source snapshots
- commands executed
- tests and results
- deterministic comparison result
- classification coverage matrix
- observation counts
- unclassified count
- known false-positive risks
- known false-negative risks
- sample JSON receipt path
- sample Markdown receipt path
- consumer worktree cleanliness
- PR URL
- merge-readiness confidence
- unresolved user decisions
- next smallest bounded action

## 19. Stop state

The correct end state for v0 is:

`READY_FOR_HUMAN_REVIEW_OBSERVATION_ONLY`

Not:

`ENFORCEMENT_ENABLED`

