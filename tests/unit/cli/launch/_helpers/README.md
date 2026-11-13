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
- Cases to cover (section 16.2): no model, model with/without context, below `recommended`,
  win32, profile, user passthrough, empty view (`rows: []`, expect a `LaunchError`).
- Create or refresh goldens with `UPDATE_GOLDEN=1`, then review the JSON diff before committing.
- `boundary.test.ts` also imports every `adapters/*.mjs` default export and runs the invariants.
