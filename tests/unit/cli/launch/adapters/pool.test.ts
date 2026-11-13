// Poolside Pool adapter tests. Recipe lines map to tools/pool.md:
// env POOLSIDE_STANDALONE_BASE_URL=<root>/v1, POOLSIDE_API_KEY=${TOKEN}: section 3 "Ephemeral injection"
// env POOLSIDE_STANDALONE_MODEL / _CONTEXT_LENGTH (omitted when unknown): sections 3 and 4
// argv -m <id> then user args, never a launcher "--": section 3 "Passthrough"
// win32 rejected: section 3 "Windows"; server-view (Pool reads /v1/models): section 4
import { test } from "node:test";
import assert from "node:assert/strict";
import adapter from "../../../../../bin/cli/launch/adapters/pool.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const viewSpec = adapter.capabilities.modelList.view;
const base = (extra = {}) => fixtureCtx({ tool: adapter.id, viewSpec, ...extra });

function golden(name: string, ctx) {
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter });
  assertGolden(adapter.id, name, plan);
  return plan;
}

test("default", () => {
  const plan = golden("default", base());
  assert.equal(plan.argv[0], "-m");
  assert.equal(plan.env.set.POOLSIDE_API_KEY, "${TOKEN}");
  assert.equal(plan.modelList.injected, 0);
});

test("darwin", () => {
  golden("darwin", base({ platform: "darwin" }));
});

test("unknown-context", () => {
  const plan = golden("unknown-context", base({ model: "mystery/unknown-context" }));
  assert.equal("POOLSIDE_STANDALONE_CONTEXT_LENGTH" in plan.env.set, false);
});

test("passthrough", () => {
  const plan = golden("passthrough", base({ args: ["-p", "reply OK"] }));
  assert.deepEqual(plan.argv.slice(-2), ["-p", "reply OK"]);
  assert.equal(plan.argv.includes("--"), false);
});

test("remote-gateway", () => {
  const plan = golden(
    "remote-gateway",
    base({
      rootUrl: "https://gw.example.com/",
      origin: "remote",
      model: "mystery/unknown-context",
      env: { POOLSIDE_STANDALONE_CONTEXT_LENGTH: "9999" },
    })
  );
  assert.deepEqual(plan.env.unset, ["POOLSIDE_STANDALONE_CONTEXT_LENGTH"]);
});

test("win32 is unsupported", () => {
  assert.throws(() => adapter.plan(base({ platform: "win32" })), {
    name: "LaunchError",
    code: "UnsupportedPlatform",
  });
});

test("empty view", () => {
  assert.throws(() => adapter.plan(base({ rows: [] })), {
    name: "LaunchError",
    code: "ModelNotFound",
  });
});

test("no model", () => {
  assert.throws(() => adapter.plan(base({ model: null })), {
    name: "LaunchError",
    code: "ModelRequired",
  });
});

for (const flag of ["-m", "--model"]) {
  test(`${flag} conflicts`, () => {
    assert.throws(() => adapter.plan(base({ args: [flag, "x"] })), {
      name: "LaunchError",
      code: "ConfigConflict",
    });
  });
}
