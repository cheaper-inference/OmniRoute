---
title: "Launch quality gates"
lastUpdated: 2026-11-14
---

# Launch quality gates

One command checks the production code of `omnirouter launch` against the operator's quality
gates and prints a per file, per function report. It exits 1 when any gate has a violation.

```bash
npm run quality:launch                          # table plus one line per violation
npm run quality:launch -- --json report.json    # same data, also written as JSON
```

Runner: `scripts/quality/launch-quality.mjs`. Limits and the scope list:
`config/quality/launch-gates.json`. A full run takes about 40 seconds (most of it is the
coverage run for CRAP). Output: a summary table (gate, limit, violations, worst value), then
one line per violation in the form `file:line function value`, sorted worst first.

## Gates

| Gate                  | Limit       | Unit                                                   | Tool                                                         |
| --------------------- | ----------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| Cyclomatic complexity | <= 10       | per function                                           | ESLint core `complexity`                                     |
| Cognitive complexity  | <= 15       | per function                                           | `eslint-plugin-sonarjs` `cognitive-complexity`               |
| Halstead difficulty   | <= 30       | per function                                           | `scripts/quality/launch-halstead.mjs` (TypeScript API)       |
| File length           | < 500 lines | per file                                               | ESLint core `max-lines` (max 499, blanks and comments count) |
| CRAP                  | <= 25       | per function                                           | ESLint `complexity` plus `c8` statement coverage             |
| Dead code             | 0           | unused files, unused exports                           | `scripts/quality/launch-scans.mjs` (TypeScript parser)       |
| Duplicate code        | 0           | clones inside the scope                                | `jscpd`, default thresholds                                  |
| `any` / `unknown`     | 0           | TS keywords, JSDoc `{any}`, `{*}`, `{unknown}` in .mjs | `scripts/quality/launch-scans.mjs` (TypeScript AST)          |

No mutation testing.

### Complexity and file length (ESLint)

The runner loads the dedicated flat config `config/quality/launch-gates.eslint.config.mjs`
through the ESLint Node API (`overrideConfigFile`), because the repo config ignores `bin/`.
Only the three gate rules run; `noInlineConfig` is on, so an `eslint-disable` comment cannot
hide a violation. Equivalent command:

```bash
npx eslint --config config/quality/launch-gates.eslint.config.mjs <scope files>
```

ESLint reports each function at its head; the runner maps that location to the function span
found by `listFunctions` in `scripts/quality/launch-halstead.mjs`, so every per function gate
uses the same function names (`name`, `Class.method`, `get x`, `<anonymous>`).

### Halstead difficulty

`scripts/quality/launch-halstead.mjs` walks the TypeScript AST down to token leaves (it parses
.mjs, .ts and .d.ts). Per function with a body:

1. Tokens inside the function span count, except the spans of nested functions (each nested
   function is measured on its own). Comments and trivia never count.
2. Operands: identifiers, private identifiers and literals (number, bigint, string, regex,
   template pieces). Operators: every other token (keywords including `true`, `false`, `null`,
   `this`, and all punctuators and operator tokens).
3. n1 and n2: distinct operators and operands by token text. N1 and N2: totals.
4. difficulty = (n1 / 2) * (N2 / n2), 0 when n2 is 0.

Standalone: `node scripts/quality/launch-halstead.mjs <file>...` prints every function.

### CRAP

CRAP = cc^2 * (1 - coverage)^3 + cc, per function, where:

1. cc is the ESLint `complexity` value of the function (the runner lints the scope a second
   time with `complexity` at max 0, so every function gets a value).
2. coverage is the statement coverage of that function from the launch unit tests, in [0, 1].
   `c8` runs the tests below with the json reporter into a temporary directory under
   `$TMPDIR`; the runner takes the statements whose start line is inside the function span,
   minus the inner lines of nested functions, and divides hit by total. A file never loaded by
   the tests has coverage 0; a function with no statements counts as covered.

Coverage tests (`coverageTests` in `config/quality/launch-gates.json`):
`tests/unit/cli/launch/**/*.test.ts`, `tests/unit/shared/launch-view-select.test.ts`,
`tests/unit/api/launch-*.test.ts`, `tests/unit/catalog-launch-view.test.ts`,
`tests/unit/db/launch-sessions.test.ts`. Equivalent command:

```bash
npx c8 --reporter=json --report-dir "$TMPDIR/cov" --exclude='tests/**' node \
  --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
  --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit <coverage tests>
```

### Dead code

`runDeadCode` in `scripts/quality/launch-scans.mjs` parses every source file under `bin/`,
`src/`, `open-sse/`, `tests/`, `scripts/` and `electron/` with the TypeScript parser, collects
static imports, re exports, `import()`, `require()`, template literal imports (resolved as
globs) and JSDoc `import("x").Name` references, and resolves relative, `@/` and
`@omniroute/open-sse` specifiers.

1. Unused file: a scope file that no other file references; entries are the `route.ts` files
   and `bin/omnirouter.mjs`.
2. Unused export: an export of a scope file that no other file imports by name. Uses from
   tests count as used. An export used only inside its own file is reported (as knip does).
   Next.js route handler exports (`GET`, `POST`, `dynamic`, and so on) are framework entries.

knip was not used: scoping it to these files while counting tests as users and resolving the
lazy adapter loading needed a bespoke config with false positives.

### Duplicate code

`runDuplicates` runs `jscpd` on exactly the scope files with a throwaway config (no gitignore,
default 50 token and 5 line thresholds, json reporter into `$TMPDIR`). Every clone is one
violation, reported at its first fragment with the partner location; value is its line count.

### `any` and `unknown`

`runAnyUnknown`: in .ts and .d.ts files every `any` and `unknown` keyword type node; in .mjs
files the JSDoc type expressions (`@param`, `@returns`, `@type`, `@typedef`, `@property` and
inline casts) for `any`, `*` and `unknown`, including inside `Object<string, any>`.

## Scope

Production files the launch work created, listed in `config/quality/launch-gates.json`
(`scope`, 66 files). Resolved with:

```bash
git diff --name-only --diff-filter=A 82f60e5ef6..dbdc1d572c
```

kept to `.mjs`, `.ts` and `.d.ts` under `bin/cli/launch/**`, `bin/omnirouter.mjs`,
`src/app/api/launch/**`, `src/shared/launch/**`, `src/shared/validation/launchView.ts`,
`src/lib/db/launchSessions.ts` and `src/app/api/v1/models/catalogLaunchView.ts`, excluding
`bin/cli/launch/assets/**` and tests. Upstream files the launch work only edited are out of
scope.

## Baseline results

Measured on commit `dbdc1d572c` (2026-11-14): 299 violations across 66 files. `L/` stands for
`bin/cli/launch/`.

| Gate                  | Limit       | Violations | Worst |
| --------------------- | ----------- | ---------- | ----- |
| Cyclomatic complexity | <= 10       | 72         | 97    |
| Cognitive complexity  | <= 15       | 36         | 104   |
| Halstead difficulty   | <= 30       | 59         | 74    |
| File length           | < 500 lines | 3          | 834   |
| CRAP                  | <= 25       | 17         | 355.4 |
| Dead code             | 0           | 37         |       |
| Duplicate code        | 0           | 21         | 35    |
| `any` / `unknown`     | 0           | 54         |       |

### Worst offenders

| Gate                  | Worst offenders (file:function value)                                                                                                                                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cyclomatic complexity | `L/core/plan.mjs:validatePlan` 97, `L/core/pipeline.mjs:runLaunch` 92, `L/core/gateway/local-reaper.mjs:acquireLocal` 58, `L/core/execute.mjs:executePlan` 46, `src/shared/launch/viewSelect.ts:rowPasses` 38                                       |
| Cognitive complexity  | `L/core/plan.mjs:validatePlan` 104, `L/core/gateway/local-reaper.mjs:acquireLocal` 85, `L/core/pipeline.mjs:runLaunch` 55, `L/core/pipeline.mjs:previewLaunch` 40, `L/adapters/claude.mjs:plan` 38                                                  |
| Halstead difficulty   | `src/shared/launch/viewSelect.ts:sha256Hex` 74, `L/core/gateway/local-reaper.mjs:acquireLocal` 66.67, `L/core/pipeline.mjs:runLaunch` 63, `L/core/plan.mjs:validatePlan` 61.85, `L/core/preflight.mjs:evaluateOne` 55.07                            |
| File length           | `L/core/pipeline.mjs` 834, `L/contract.mjs` 682, `L/command.mjs` 542                                                                                                                                                                                |
| CRAP                  | `L/core/state.mjs:acquireLock` 355.4 (cc 19, 2% covered), `L/core/plan.mjs:validatePlan` 107.78, `L/core/pipeline.mjs:runLaunch` 104.81, `L/core/gateway/process.mjs:stopPidGracefully` 63.26, `L/core/gateway/local-reaper.mjs:acquireLocal` 61.47 |
| Dead code             | 37 unused exports, 0 unused files; most in `L/core/reaper.mjs` (6), `src/shared/validation/launchView.ts` (5), `L/core/state.mjs` (4)                                                                                                               |
| Duplicate code        | `L/adapters/opencode.mjs:189` clone of `L/adapters/pi.mjs:106` 35 lines, `L/adapters/omp.mjs:18` clone of `L/adapters/pi.mjs:19` 16, `L/adapters/omp.mjs:73` clone of `L/adapters/pi.mjs:78` 16                                                     |
| `any` / `unknown`     | `src/lib/db/launchSessions.ts` 20, `L/contract.d.ts` 18, `L/core/errors.mjs` 3, `src/app/api/v1/models/catalogLaunchView.ts` 3                                                                                                                      |

The full per violation list is printed by `npm run quality:launch` and written by `--json`.

## Results after fixes

pending
