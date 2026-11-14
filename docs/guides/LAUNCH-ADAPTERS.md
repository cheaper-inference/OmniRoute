---
title: "Adding a launch adapter"
version: 3.8.54
lastUpdated: 2026-11-13
---

# Adding a launch adapter

`omnirouter launch <tool>` starts a coding tool pointed at your OmniRoute gateway. Everything that
is specific to one tool lives in one file: a launch adapter in `bin/cli/launch/adapters/<id>.mjs`.
This page is for contributors who want to add or change one. For how to use the command, see
[LAUNCH.md](./LAUNCH.md). For the older shared run/configure contracts, see
[CLI-LAUNCH-CONTRACTS.md](./CLI-LAUNCH-CONTRACTS.md).

An adapter does one thing: given a context, return a plan. It never spawns anything. Core
(`bin/cli/launch/core/`) resolves the gateway, mints a session token, writes temp files, runs
preflight checks, spawns the tool, runs teardown and cleans up.

## The contract

Types live in `bin/cli/launch/contract.d.ts`, implementations in `bin/cli/launch/contract.mjs`.
An adapter default-exports the result of `defineAdapter({...})`, which validates the static shape
and freezes the data. The current contract is `{ major: 1, minor: 2 }`; declare the minor you
need (`defineAdapter` refuses a minor above the current one).

A `LaunchAdapter` has:

- `contract`, `id` (lowercase, must equal the manifest id), `displayName`, `binaries` (tried in
  order), `capabilities`, and `plan(ctx)`.
- Optional hooks: `toToolModelId`, `exitHints`, `modelWarnings`, `diagnose`, `planExec`,
  `statusLine`.

`capabilities` is static data:

- `protocol`: the wire protocol the tool speaks to the gateway.
- `model`: `"required"`, `"optional"` or `"none"`.
- `tier`: `"core"`, `"supported"` or `"later"` (see Tiers below).
- `platforms`, `supportsProfile`, `install` (commands per platform, shown on ToolNotFound; never
  run automatically), optional `versionGate` (`args`, `pattern`, `min`, `recommended`, `features`),
  optional `minContextTokens`, optional `passthrough` rules.
- `passthrough` rules describe flags the user may type after `--`: `action` is `reject`, `warn`,
  `mergeJson` (core parses the value and hands it to you in `ctx.passthroughJson`) or `owned`.
- `modelList`: how the tool learns which models exist (next section).

### Model list strategies

`capabilities.modelList.strategy` is one of:

- `inject`: you write the models into the tool's own config (a temp file, env, or argv). Use
  `injectRows(ctx, injectLimit)` to take the rows; do not filter again. Report the count in
  `plan.modelList.injected`.
- `server-view`: the tool reads `GET /v1/models` itself, and core PATCHes the session view so the
  gateway serves only the selected rows. You write no list: `injected` is `0`.
- `both`: inject and also serve a view (codex uses this).

Every strategy declares `modelList.view`, a `ViewSelectSpec`. Core applies it once (filter, then
order, then limit) and passes the result as `ctx.view` (`name`, `hash`, `rows`). Typical shape:

```js
view: {
  name: "goose",
  filter: { protocols: ["openai-chat"], capabilities: ["tools"], minContextTokens: 32000 },
  order: "preferences",
}
```

Set `plan.modelList.viewHash` to `ctx.view.hash`. `serve` (`prefix`, `mode`, `shape`) tunes how a
server-view is presented, and `injectLimit` caps the rows for inject and both.

### What `plan(ctx)` returns

`createPlan(tool, parts)` fills every required field. The parts you will use most:

- `argv`: strings only.
- `env`: `{ set, unset }`. Unset every inherited variable that could override the launch, and never
  list a key in both.
- `tempFiles`: `{ path, root: "tmp" | "state", contents, mode, format }`. `${TMP}` is removed after
  exit; `${STATE}` (`DATA_DIR/launch/<tool>/<cwdHash>/`) is kept. Use `asset` or `assetRef` for
  static files under `bin/cli/launch/assets/`; use `mergeBase` to deep-merge over a read-only JSON
  file. `tempDirs` creates directories first (contract 1.2).
- `needsTempDir`, `notes`, `warnings`, `modelList`.
- `preflight`: checks core runs before spawn. Kinds: `node-version`, `tool-version`, `env-absent`,
  `env-equals`, `file-json-key`, `port-free`.
- `teardown`: commands run after exit, before `${TMP}` is removed (`${TOOL}` is the resolved
  binary), with `timeoutMs` and `onError: "warn" | "ignore"`.
- `postExitChecks`: warn-only checks (`json-key-unchanged`, `file-unchanged`). They never edit
  user files.
- `secretSites`: set `plan.secretSites = findTokenSites(plan)` as the last step.

Placeholders are `${TMP}`, `${STATE}`, `${TOKEN}`, `${TOOL}` (`PLACEHOLDERS` in the contract).
`ctx.auth.token` is always the literal `${TOKEN}` placeholder; core substitutes the minted session
token at spawn time.

### Errors an adapter may throw

`ADAPTER_ERROR_CODES` is exactly `ModelRequired`, `ModelUnsuitable`, `ConfigConflict`,
`UnsupportedPlatform` and `ModelNotFound`. Throw them as `new LaunchError(code, message, { hint })`.
In `planLaunch` (`bin/cli/launch/core/plan.mjs`) any other code, or a non-`LaunchError` throw, is
rewrapped as `Internal`. Version gating belongs in `versionGate`, which core enforces.

### Pure helpers

Import these from `../contract.mjs`: `createPlan`, `defineAdapter`, `findTokenSites`, `LaunchError`,
`PLACEHOLDERS`, `ensureV1`, `stripTrailingSlash`, `tempPath`, `statePath`, `json` (canonical, sorted
keys), `yaml`, `toml`, `tomlString`, `dotenv`, `isValidEnvKey`, `deepMerge`, `findFlag`, `hasFlag`,
`rowLabel`, `injectRows`, `assetRef`, `claudeWindowEnv`. The same utilities are also on `ctx.util`
(`tempPath`, `statePath`, `ensureV1`, `toml`, `json`, `yaml`).

## Boundary rules

These are enforced by `tests/unit/cli/launch/boundary.test.ts`:

1. An adapter imports only `../contract.mjs`. No other adapter, no core module, no `node:*` module.
2. `plan()` is pure and synchronous: no `process.*`, no `fetch(`, no `eval`/`Function`. Read the
   platform, home, env and gateway URL from `ctx`. The test runs every adapter with `process.env`
   and `fetch` replaced by throwing traps.
3. `plan()` is deterministic and returns plain JSON (the invariants re-run it and compare).
4. Core never branches on a tool name; tool differences are data (capabilities) or adapter code.
5. `${TOKEN}` never appears in `argv`. Put it in `env.set` or a temp file, and list it in
   `secretSites`.
6. Temp file paths are relative to `${TMP}` or `${STATE}`, with no `..` segments.

## Registration

1. Create `bin/cli/launch/adapters/<id>.mjs`.
2. Import it in `bin/cli/launch/adapters/index.mjs` and add it to `ALL_ADAPTERS`. The list exports
   only adapters whose tier is not `later`.
3. Add or update the tool in `config/cli-tools-manifest.json` with `"surfaces": { "launch": true }`
   (plus `displayName`, `aliases` and `binaries`). `bin/cli/launch/registry.mjs` orders the registry
   by manifest declaration order and resolves aliases from the manifest.
4. Update the counts in the tests: `REGISTRY_SIZE` in `boundary.test.ts`, and the id and tier counts
   in `tests/unit/cli/launch/registry.test.ts`.
5. `tests/unit/cli/cli-manifest-drift.test.ts` fails if `surfaces.launch` in the manifest and
   `launchRegistry.ids()` disagree. Tools with tier `later` keep `launch: false`.

## Examples

A server-view adapter, `bin/cli/launch/adapters/goose.mjs`, is env only and writes no list:

```js
const plan = createPlan("goose", {
  argv: ["session", ...ctx.passthroughArgs],
  env: { set: env, unset: [...unset].sort() },
  warnings,
  modelList: { strategy: "server-view", viewHash: ctx.view.hash, injected: 0 },
});
plan.secretSites = findTokenSites(plan);
return plan;
```

An inject adapter, `bin/cli/launch/adapters/crush.mjs`, writes a config file into `${STATE}` and
passes the key by env reference:

```js
const rows = injectRows(ctx);
// ...
env: { set: { CRUSH_DATA_DIR: statePath("data"), OMNIROUTE_API_KEY: PLACEHOLDERS.TOKEN } },
tempFiles: [
  {
    path: "data/crush.json",
    root: "state",
    contents: `${ctx.util.json(config, { indent: 2 })}\n`,
    format: "json",
    mode: 0o600,
  },
],
modelList: { strategy: "inject", viewHash: ctx.view.hash, injected: rows.length },
```

### One-shot use

Pass the tool's own one-shot args after `--`. When they start with a subcommand listed in the
adapter's `ONE_SHOT_SUBCOMMANDS`, that subcommand replaces the default interactive one:

- goose: `-- run --no-session -q -t "<prompt>"` runs `goose run ...` instead of `goose session`.
- openclaw: `-- agent --message "<prompt>"` runs `openclaw agent --local ...` instead of the TUI.
- deepseek: `-- headless "<prompt>"` runs `dsh headless --patch <tmp> ...` instead of `dsh web`.
- gemini: with `-p` or `--prompt` the adapter adds `--skip-trust` unless you passed it.
- crush: `-- run "<prompt>"` gets `--verbose` added, because crush 0.101.0 can exit with empty
  stdout without it.

For preflight and teardown, see `openclaw.mjs` (a `node-version` preflight) and `hermes.mjs` (a
`${TOOL} gateway stop` teardown). For `mergeJson` and a version-gated model picker, see
`claude.mjs`.

## Tests

Each adapter has `tests/unit/cli/launch/adapters/<id>.test.ts`. Helpers are in
`tests/unit/cli/launch/_helpers/` (see its README): `fixtureCtx` builds a frozen context,
`checkPlanInvariants` asserts the contract invariants for one plan, and `assertGolden` compares a
plan with `tests/unit/cli/launch/golden/<id>.<case>.json`.

Cover at least: no model, a model with and without a known context window, below the recommended
version, `win32`, a profile (if supported), user passthrough args, and an empty view (expect a
`LaunchError`). Pass `{ serverView: true }` to `checkPlanInvariants` for server-view adapters, or
`injectedIds` for inject adapters.

Goldens are created and refreshed with `UPDATE_GOLDEN=1`. Review the JSON diff before you commit it;
without the variable a missing or different golden fails the test.

```bash
UPDATE_GOLDEN=1 node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
  --import ./tests/_setup/isolateDataDir.ts --test tests/unit/cli/launch/adapters/<id>.test.ts

node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
  --import ./tests/_setup/isolateDataDir.ts --test \
  tests/unit/cli/launch/adapters/<id>.test.ts tests/unit/cli/launch/boundary.test.ts \
  tests/unit/cli/launch/registry.test.ts tests/unit/cli/cli-manifest-drift.test.ts
```

There is no separate conformance suite: the last test in `boundary.test.ts` imports every adapter,
plans it under the traps and runs `checkPlanInvariants`, which is the conformance check.

## Research dossier

Write the dossier before the code. The repo does not store dossiers; put it in the PR description
(or under `docs/` if it is long-lived). Use these headings:

1. Identity: install commands, binary names, version command and output format, minimum version and
   why, license.
2. Protocol: wire protocol, which OmniRoute endpoint, root versus `/v1` base URL, streaming and
   tool-call requirements.
3. Ephemeral injection: exact env vars, flags and temp files, precedence against the user's config,
   how the key travels (never argv), how the model is chosen, which user args conflict.
4. Model list and metadata: can the tool discover models, how must they be declared, context window
   and max output defaults.
5. Onboarding, auth and network gotchas: first-run wizards, telemetry and update checks, settings
   that silently override the launch.
6. Verification: how to confirm in the tool that it talks to OmniRoute, plus a smoke command.
7. Open questions: anything unverified, marked as such.

Header lines: tier (with the reason), sources read, and the docs version checked.

## Tiers

- `core`: golden-tested, listed by default. 12 adapters today.
- `supported`: golden-tested, marked supported. 7 today.
- `later`: not registered. `bin/cli/launch/adapters/index.mjs` and `createRegistry` both drop it.

Pick `supported` for a new tool unless a maintainer agrees it should be `core`.

## Not shipped yet

Declarative JSON adapters and third-party adapter packages are planned for a later release. None
of that exists in `bin/cli` today, so every adapter is a reviewed built-in module.

## Checklist

1. Write the dossier (PR description).
2. Create `bin/cli/launch/adapters/<id>.mjs` with `defineAdapter`, importing only `../contract.mjs`.
3. Declare capabilities, view, install recipe, version gate and passthrough rules.
4. Implement a pure `plan(ctx)`: env, argv, temp files, preflight, teardown, `modelList`,
   `plan.secretSites = findTokenSites(plan)`.
5. Keep `${TOKEN}` out of argv; unset inherited variables that could override the launch.
6. Register it in `adapters/index.mjs` and set `surfaces.launch: true` in
   `config/cli-tools-manifest.json`.
7. Write `tests/unit/cli/launch/adapters/<id>.test.ts`; generate goldens with `UPDATE_GOLDEN=1` and
   review them.
8. Bump `REGISTRY_SIZE` and the registry test counts.
9. Run the adapter test, `boundary.test.ts`, `registry.test.ts` and `cli-manifest-drift.test.ts`.
10. Run `npm run check:docs-all` if you touched `docs/`, and add the tool to [LAUNCH.md](./LAUNCH.md).
