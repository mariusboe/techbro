# Standards protocol: no cargo-cult coding

Apply relevant, open, maintained documentation for the language/runtime/framework
and the versions **actually in the repository**. Do not assert that every project
must use every standard below. Do not fetch internet references if prohibited or
unavailable; state which sources could not be checked.

## Resolution order

1. **Safety and externally binding behavior:** user requirements, API contracts,
   security/privacy/accessibility obligations, version-specific platform behavior.
2. **Machine-checkable repository truth:** compiler/language version, `tsconfig`,
   `pyproject.toml`, package manifests, `.editorconfig`, lockfiles, linter/formatter,
   code-generation config, `AGENTS.md`/`CLAUDE.md`, CI and actual tests.
3. **Applicable official/open standards:** language specs, official style guidance,
   framework conventions, security guidance, accessibility specs and supported APIs.
4. **Established repository architecture:** ownership, dependency direction, public
   interfaces and proven local patterns *when they are sound*.
5. **Taste:** lowest priority. Avoid unrelated formatting and mass migrations.

This is not simply "repo style wins" or "newest blog post wins." A repository
setting may be deliberately version-bound; an established pattern may be wrong.
Describe a conflict and select the safest compatible option within scope. Do not
silently rewrite the codebase to match external taste. Escalate real contradictions
rather than inventing a compromise that compromises correctness.

## Short standards catalogue (examples, not a universal checklist)

| Applicable stack | Open or public authority | What to inspect |
| --- | --- | --- |
| Any | [EditorConfig](https://editorconfig.org/), installed formatter/linter | Whitespace, line endings, local tool decisions |
| Python | [PEP 8](https://peps.python.org/pep-0008/), [typing spec](https://typing.python.org/en/latest/spec/) | Versioned syntax, API types, local Ruff/Black/mypy/pyright |
| TypeScript | [TypeScript strict](https://www.typescriptlang.org/tsconfig/strict.html), [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing) | Compiler options, runtime validation, typed boundaries |
| Go | [Effective Go](https://go.dev/doc/effective_go), `gofmt`, `go vet` | Idiomatic API and built-in formatting |
| Rust | [Rust Style Guide](https://doc.rust-lang.org/style-guide/), `rustfmt`, `clippy` | Edition, ownership, fallible operations, checks |
| Web security | [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) | Auth, validation, escaping, data protection; choose relevant controls |

For other languages: find **the official spec or recognized public standard**
that matches the project's runtime and codebase. Do not assume Python/TypeScript
examples transfer to Java, C#, Kotlin, PHP, Swift, etc.

## Anti-imitation checks

- Is this a standard, repository constraint, opinion, or accidental pattern?
- Does the guidance match the installed language and framework versions?
- Would copying it alter behavior, exceptions, security, or public contracts?
- Can a native feature or existing local helper express the requirement better?
- Does the pattern survive tool checks and tests, not just look familiar?
- If local rules conflict with current guidance: is the legacy choice intentional,
  compatibility-bound, or technical debt? Document the reason either way.

Examples: do not copy an existing unvalidated cast just because callers use it;
do not install a new formatter when a repo one already exists; do not use a
pattern from a newer framework release in an older project; do not "fix" an
inconsistent naming convention by renaming public APIs without a compatibility plan.

## Evidence in the case file

Record **standard/source + version/applicability + repository configuration +
observed deviation + disposition**. Label sources that were inferred or not
verified. Propose standards upgrades separately if they are out of task scope.
