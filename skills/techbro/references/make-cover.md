# Make Cover: due diligence before the pitch

**Command:** `make-cover` as the first argument to the Techbro skill.

**Hard boundary (hands off the code):** no source changes, cleanup rewrites, dependency installs,
formatters in write mode, file-generating tests/builds, code generation, commits,
resets, stashes, lockfile changes, or report files in the repository by default.
Safe read-only scans may be used, and commands that create caches must be sandboxed
outside the project. If you cannot inspect something safely, label it `NOT CHECKED`.
Never run project code simply because it is present; review scripts and risks first.

## Case-file method

1. **Identify the real project:** top-level workspace(s), language/runtime versions,
   lockfiles, build/CI configs, project-local agents instructions and current `git status`.
   In monorepos inspect only relevant applications/packages first.
2. **Trace call paths:** entry points; called functions/services; module ownership;
   external interfaces; state and persistence; error/cancellation flows; dependency
   direction; tests protecting these paths. Prefer a concise dependency sketch.
3. **Find standards:** official version-compatible references, configured tooling,
   open security/a11y requirements when relevant. Follow `open-standards.md` and
   *name conflicts*. Local code is not automatically a recommended pattern.
4. **Describe existing behavior:** contract with default, boundary, invalid, and
   error cases; dependencies on ordering, timing, transactions and side effects.
   Capture original behavior only via safe, permitted checks. Pre-existing failures
   are part of the baseline and do not become invisible after refactoring.
5. **Rank findings:** correctness/security risk first, then behavior-preserving
   simplification, type safety, architecture, then cosmetic issues. Use file paths
   and functions where possible; avoid giant undifferentiated laundry lists.
6. **Propose a minimal implementation:** staged file-by-file targets and exact
   verification plan; identify uncertain assumptions and required decisions.

## Required output format

### 1. Scope & evidence
What was examined / not examined, version/tooling, dirty worktree and safe checks.

### 2. Architecture map
Key entry points, ownership, call and data flow, trust boundaries and contracts.

### 3. Standards ledger
Applicable official/open guidance, local settings, conflicting conventions,
chosen approach and reasons. Cite primary source URLs if used.

### 4. Original contract
Behavior to preserve, explicit intended deltas, baseline tests or fixtures,
missing observable evidence.

### 5. Cleanup targets
Prioritized items (P0 correctness/security, P1 maintainability/typing, P2 cosmetic)
with paths, reasons, scope and risks. No invented findings.

### 6. Execution & verification plan
Smallest complete change sequence, targeted check commands, differential evidence,
and what remains blocked. **No changes applied.**

End with `COVER READY` if sufficient evidence, `PARTIAL COVER` if incomplete, or
`BLOCKED` if analysis cannot safely proceed. If explicitly asked to output a
`COVER.md` file, write it only to the user-approved path and make clear that this
is documentation, not a code modification.

A cover is not a green test suite. Do not claim equivalence without execution.
