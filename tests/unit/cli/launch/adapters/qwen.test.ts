// Qwen Code adapter goldens. Recipe sources (/home/krrish/tmp/olaunch/tools/qwen.md):
// - Section 3 "Ephemeral injection": QWEN_CODE_SYSTEM_SETTINGS_PATH temp file (0600), argv
//   `--auth-type openai --model <id>`, env OMNIROUTE_API_KEY (non-empty), usage stats off,
//   models.dev refresh off, system file keys (enableAutoUpdate, managed memory, usage stats,
//   selectedType, model.name, modelProviders.openai with contextWindowSize).
// - Section 3 last bullets: skip --model/-m and --auth-type when the user passed them; warn on
//   --openai-base-url / --openai-api-key.
// - Section 4 "Model list and metadata": one entry per view row, unknown context declares none.
// - Section 1 "Minimum version": recommended >= 0.27.0 (no verified hard min, so no throw).
// - Section 5: ~/.qwen writes cannot be prevented, only noted; QWEN_HOME left alone.
// - architecture section 14 (qwen row): tier core, inject strategy.
import assert from "node:assert/strict";
import test from "node:test";

import adapter from "../../../../../bin/cli/launch/adapters/qwen.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;
const base = { tool: adapter.id, viewSpec: view, version: "0.27.2" };

function injectedIds(plan: { tempFiles: Array<{ contents?: string }> }): string[] {
  const settings = JSON.parse(plan.tempFiles[0].contents as string);
  return settings.modelProviders.openai.map((entry: { id: string }) => entry.id);
}

function run(name: string, overrides: Record<string, unknown> = {}) {
  const ctx = fixtureCtx({ ...base, ...overrides });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden(adapter.id, name, plan);
  return { ctx, plan };
}

test("qwen default: model chosen, view with context", () => {
  const { plan, ctx } = run("default");
  assert.deepEqual(plan.argv, ["--auth-type", "openai", "--model", ctx.model!.id]);
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}");
  assert.deepEqual(plan.secretSites, [{ kind: "env", key: "OMNIROUTE_API_KEY" }]);
  assert.equal(plan.warnings.length, 0);
  assert.equal(plan.tempFiles[0].mode, 0o600);
});

test("qwen model without known context", () => {
  const { plan } = run("unknown-context", { model: "mystery/unknown-context" });
  assert.ok(plan.warnings.some((w) => w.includes("no known context window")));
  const settings = JSON.parse(plan.tempFiles[0].contents as string);
  const entry = settings.modelProviders.openai.find(
    (e: { id: string }) => e.id === "mystery/unknown-context"
  );
  assert.equal(entry.generationConfig, undefined);
});

test("qwen version below recommended warns", () => {
  const { plan } = run("old-version", { version: "0.26.0" });
  assert.ok(plan.warnings.some((w) => w.includes("recommended 0.27.0")));
});

test("qwen win32", () => {
  run("win32", { platform: "win32", shell: true });
});

test("qwen user passthrough args are appended", () => {
  const { plan } = run("passthrough", { args: ["-p", "say PONG", "--output-format", "json"] });
  assert.deepEqual(plan.argv.slice(-4), ["-p", "say PONG", "--output-format", "json"]);
});

test("qwen skips our --model when the user passed -m", () => {
  const { plan } = run("user-model", { args: ["-m", "openai/gpt-5.2"] });
  assert.deepEqual(plan.argv, ["--auth-type", "openai", "-m", "openai/gpt-5.2"]);
});

test("qwen skips our --auth-type when the user passed one (warns when not openai)", () => {
  const { plan } = run("user-auth-type", { args: ["--auth-type=anthropic"] });
  assert.ok(!plan.argv.includes("openai"));
  assert.ok(plan.warnings.some((w) => w.includes("--auth-type")));
});

test("qwen empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ ...base, rows: [] });
  assert.throws(
    () => adapter.plan(ctx),
    (err: { code?: string }) => err.code === "ModelNotFound"
  );
});

test("qwen without a model throws ModelRequired", () => {
  const ctx = fixtureCtx({ ...base, model: null });
  assert.throws(
    () => adapter.plan(ctx),
    (err: { code?: string }) => err.code === "ModelRequired"
  );
});

test("qwen declares passthrough warn rules and no hard version minimum", () => {
  const flags = adapter.capabilities.passthrough!.map((r) => r.flag);
  assert.deepEqual(flags, ["--openai-base-url", "--openai-api-key"]);
  assert.equal(adapter.capabilities.versionGate!.min, undefined);
  assert.equal(adapter.capabilities.minContextTokens, undefined);
});
