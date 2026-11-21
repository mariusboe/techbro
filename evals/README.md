# Evals

A skill that nags about tests should have some. These scenarios check that
Techbro keeps his promises, not that he is funny.

| # | Scenario | What must hold |
| --- | --- | --- |
| 1 | `make-cover` | Read-only, six headings, ends in `COVER READY`/`PARTIAL COVER` |
| 2 | `clean` | Wrappers gone, `RangeError` and no-op kept, tests actually run |
| 3 | `verify` | Live gateway call reported `NOT RUN`, no unqualified `VERIFIED` |
| 4 | `serious` | No persona, same rigor |
| 5 | Strict types | No `any`, no unchecked casts, response validated |

`fixtures/checkout` is a tiny project with three wrappers around one `fetch`
and two contract tests (`npm test` or `node --test`). Copy it to a scratch
directory before each run so evals that edit code start from a clean fixture.

The format follows the `evals/evals.json` layout used by Anthropic's
skill-creator, so you can run it there, or read the expectations and grade by hand.
