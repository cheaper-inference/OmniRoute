// Kimi Code CLI adapter tests. Recipe lines map to tools/kimi.md:
// env KIMI_MODEL_NAME/API_KEY/PROVIDER_TYPE/BASE_URL/MAX_CONTEXT_SIZE/CAPABILITIES/DISPLAY_NAME: section 3
// env KIMI_DISABLE_TELEMETRY, KIMI_CODE_NO_AUTO_UPDATE: section 5
// env unset KIMI_API_KEY, KIMI_BASE_URL, KIMI_CODE_BASE_URL, KIMI_CODE_PROVIDER_NAME, stale KIMI_MODEL_*: section 3
// context fallback 128000: section 4; legacy kimi-cli refusal (1.x): section 1
// argv has no -m, user -m/--model rejected: section 3
import { test } from "node:test";
import assert from "node:assert/strict";
import type { LaunchPlan } from "../../../../../bin/cli/launch/contract.d.ts";
import adapter from "../../../../../bin/cli/launch/adapters/kimi.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const viewSpec = adapter.capabilities.modelList.view;
const base = { tool: adapter.id, viewSpec, version: "2.6.2" };

function run(name: string, overrides: Record<string, unknown>, check?: (plan: LaunchPlan) => void) {
  test(name, () => {
    const ctx = fixtureCtx({ ...base, ...overrides });
    const plan = adapter.plan(ctx);
    checkPlanInvariants(plan, ctx, { adapter, singleModel: ctx.model.id });
    check?.(plan);
    assertGolden(adapter.id, name, plan);
  });
}

run("default", {}, (plan) => {
  assert.equal(plan.env.set.KIMI_MODEL_CAPABILITIES, "tool_use,image_in,thinking");
  assert.equal(plan.env.set.KIMI_MODEL_API_KEY, "${TOKEN}");
  assert.equal(plan.env.set.KIMI_MODEL_BASE_URL, "http://127.0.0.1:20128/v1");
  assert.deepEqual(plan.argv, []);
  assert.equal(plan.modelList.injected, 1);
});
run("gpt", { model: "openai/gpt-5.2" }, (plan) => {
  assert.equal(plan.env.set.KIMI_MODEL_CAPABILITIES, "tool_use,thinking");
});
run("unknown-context", { model: "mystery/unknown-context" }, (plan) => {
  assert.equal(plan.env.set.KIMI_MODEL_MAX_CONTEXT_SIZE, "128000");
  assert.equal(plan.env.set.KIMI_MODEL_CAPABILITIES, "tool_use");
  assert.ok(plan.notes.some((n: string) => n.includes("unknown")));
});
run("version-below-recommended", { version: "2.3.3" }, (plan) => {
  assert.equal(plan.warnings.length, 1);
});
run("win32", { platform: "win32" });
run("passthrough", { args: ["-p", "Reply OK", "--yolo"] }, (plan) => {
  assert.deepEqual(plan.argv, ["-p", "Reply OK", "--yolo"]);
});
run(
  "remote-gateway",
  {
    rootUrl: "https://gw.example.com/",
    origin: "remote",
    env: {
      KIMI_API_KEY: "stale",
      KIMI_MODEL_THINKING_EFFORT: "high",
      KIMI_MODEL_NAME: "old",
    },
  },
  (plan) => {
    assert.equal(plan.env.set.KIMI_MODEL_BASE_URL, "https://gw.example.com/v1");
    assert.ok(plan.env.unset.includes("KIMI_MODEL_THINKING_EFFORT"));
    assert.ok(plan.env.unset.includes("KIMI_API_KEY"));
    assert.ok(!plan.env.unset.includes("KIMI_MODEL_NAME"));
  }
);

test("legacy kimi-cli 1.52.0 is refused", () => {
  const ctx = fixtureCtx({ ...base, version: "1.52.0" });
  assert.throws(
    () => adapter.plan(ctx),
    (err: { name?: string; code?: string; message?: string; hint?: string }) =>
      err.name === "LaunchError" &&
      err.code === "ToolVersionTooOld" &&
      /legacy Python kimi-cli/.test(err.message) &&
      /npm install -g @moonshot-ai\/kimi-code/.test(err.hint)
  );
});

test("raw legacy version output (kimi, version 1.52.0) is still refused", () => {
  const ctx = fixtureCtx({ ...base, version: "kimi, version 1.52.0" });
  assert.throws(() => adapter.plan(ctx), { name: "LaunchError", code: "ToolVersionTooOld" });
});

test("empty view is ModelNotFound", () => {
  const ctx = fixtureCtx({ ...base, rows: [] });
  assert.throws(() => adapter.plan(ctx), { name: "LaunchError", code: "ModelNotFound" });
});

test("no model is ModelRequired", () => {
  const ctx = fixtureCtx({ ...base, model: null });
  assert.throws(() => adapter.plan(ctx), { name: "LaunchError", code: "ModelRequired" });
});

for (const flag of ["-m", "--model"]) {
  test(`user ${flag} is ConfigConflict`, () => {
    const ctx = fixtureCtx({ ...base, args: [flag, "foo"] });
    assert.throws(() => adapter.plan(ctx), { name: "LaunchError", code: "ConfigConflict" });
  });
}
