# Adapter test helpers

An adapter stream writes `tests/unit/cli/launch/adapters/<id>.test.ts` like this:

```ts
import adapter from "../../../../../bin/cli/launch/adapters/<id>.mjs"; // default export
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;
const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, platform: "win32", args: ["--yolo"] });
const plan = adapter.plan(ctx);
checkPlanInvariants(plan, ctx, { adapter, injectedIds: (p) => /* ids your plan wrote */ [] });
assertGolden(adapter.id, "win32", plan); // tests/unit/cli/launch/golden/<id>.win32.json
```

- `fixtureCtx` options: `platform`, `home`, `env`, `rows` (default `FIXTURE_ROWS`, with and without
  context), `viewSpec`, `prefs`, `model` (row id, or `null` for none), `binary`, `shell`, `version`,
  `features`, `args`, `passthroughJson`, `profile`, `cwd`, `rootUrl`, `origin`, `settings`.
- `checkPlanInvariants` model-list options: `injectedIds` compares against the whole view (cut by
  `injectLimit`). Server-view adapters pass `{ serverView: true }` (asserts `injected === 0`, and
  `injectedIds` empty when given). Single-model tools pass `{ singleModel: ctx.model.id }` (asserts
  `injected === 1`, `ctx.model.id` equals it, and `injectedIds` deep-equals `[id]` when given).
  Both skip the full-view comparison and are mutually exclusive.
- Cases to cover (section 16.2): no model, model with/without context, below `recommended`,
  win32, profile, user passthrough, empty view (`rows: []`, expect a `LaunchError`).
- Create or refresh goldens with `UPDATE_GOLDEN=1`, then review the JSON diff before committing.
- Static assets (contract 1.1) live in `bin/cli/launch/assets/`: use `{ path, asset: "<relpath>" }`
  for a verbatim copy, or `assetRef(relpath, { json: true })` inside `contents`; the invariants
  check that each referenced asset exists (`assetsDir` option, `false` skips the check).
- `boundary.test.ts` also imports every `adapters/*.mjs` default export and runs the invariants.
