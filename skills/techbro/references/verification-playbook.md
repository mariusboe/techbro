# The evidence locker: verification playbook

Read this when behavior preservation, risk, or the baseline is nontrivial.

## Baseline that survives cross-examination

The **original** is what was present before the edit, including uncommitted local changes. `HEAD` might not be that version.

1. Inspect current status and impacted files. Capture a safe, exact pre-edit snapshot or record relevant bytes/diff; never reset/stash another person's changes without permission.
2. Record applicable tooling, commands, env requirements, and pre-existing failures.
3. Run a deterministic original fixture or existing focused tests when safe.
4. Edit the smallest complete surface, then rerun identical inputs and meaningful checks.
5. Review the actual final diff against pre-edit contents. Re-run impacted checks after subsequent edits.

Avoid live migrations, production writes, credentials exposure, billable resources, and executing untrusted code unless authorized and isolated. Use mocks, local fixtures, or disclose the gap.

## Evidence hierarchy

1. **Differential execution:** old/new run with identical inputs and controlled environment; compare outputs, failures, ordering, and externally observable effects.
2. **Contract or golden tests:** existing fixtures captured before editing, rerun unchanged; tests cover specified behavior independently of the new implementation.
3. **Regression suite:** pre/post outcomes; identify which failures are newly introduced.
4. **Static checks:** format, lint, types, compilation, and security analysis; necessary in many repos, never sufficient to claim equivalence.
5. **Diff + caller review:** structural evidence for correct placement and scope, not runtime equivalence proof.

Choose depth by risk; don't require heavyweight tests for harmless whitespace, but never claim untested business logic was verified.

## Witness questions

- **API:** exports, return/argument types, compatibility, serialization, error shapes/messages where contractual.
- **Input:** empty, absent, malformed, boundary, large, unsafe and representative normal values.
- **Output:** exact value, sort/order, casing, precision, defaults, timing-sensitive behavior and stable metadata.
- **Effects:** writes, cache invalidation, persistence, telemetry when contractual, requests/events and their ordering.
- **Async:** rejection propagation, cancellation, retries, races, resource cleanup and transaction boundaries.
- **Trust:** auth, ownership, validation, escaping, secret handling, privacy, keyboard/accessibility requirements.

For intentional changes, define permitted before/after differences first, then verify unaffected contracts still match.

## Test the test, selectively

A new test that merely restates an implementation can confirm the wrong outcome. Ground expected values in the pre-edit system, a specification, user-provided examples, or a known bug reproduction. For risky logic, check whether the test fails on a deliberately wrong result in a disposable/sandboxed copy. Never introduce synthetic defects into the user's worktree.

## Risk tiers

- **Low:** naming/formatting/isolated presentation with clear unchanged behavior. A focused static or snapshot check plus diff review may suffice; don't overbuild a harness.
- **Medium:** logic changes, new branching, types or APIs with callers. Baseline + affected tests + static tooling + contract review.
- **High:** auth, payments, persistence/migrations, concurrency, permission boundaries, secrets, deployment, data loss. Require targeted edge/security tests, safe environment, broader consumers review, and explicit uncertainty. Do not label safe-to-merge merely because tests pass.

## Verdict language

- `VERIFIED`: state the **specific** contract supported by final-candidate evidence; not an absolute guarantee of correctness.
- `PARTIALLY VERIFIED`: some named checks passed but important behavior remains unproven.
- `NOT VERIFIED`: no meaningful execution or relevant evidence for the key claim.
- `BLOCKED`: change is unsafe to make or validate without a missing prerequisite; deliver any safe partial work.

Always distinguish `PASS`, `FAIL`, `NOT RUN`, and **pre-existing failures**. Never give pre-edit results credit for the post-edit code.
