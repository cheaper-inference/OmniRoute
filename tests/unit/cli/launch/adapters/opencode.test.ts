// OpenCode adapter golden tests. Recipe lines come from /home/krrish/tmp/olaunch/tools/opencode.md:
// - section 1: binary `opencode`, install commands, min version 1.18.30 (--version), v2 feature
//   gate at 2.0.0, version string parsed as the last whitespace field minus a leading "v".
// - section 3: the whole config travels in OPENCODE_CONFIG_CONTENT (v1 shape with `provider`,
//   v2 shape with `providers`), OMNIROUTE_API_KEY only via env (omitted when keyless),
//   OPENCODE_DISABLE_AUTOUPDATE=1 always, OPENCODE_DISABLE_FREE_MODELS=1 on v2 only;
//   v2 prepends --standalone unless the user already passed --server or --standalone
//   ("--server together with --standalone is an error"); v1 passes --model unless the user
//   passed --model/-m, and warns when the user's model is not an omniroute/* ref;
//   --continue/-c or --session/-s on v2 note that a resumed session may keep its old model.
// - section 4: models map keyed by row id, limit.context/limit.output always emitted.
// - section 5: share:"disabled", autoupdate/update disabled.
import { test } from "node:test";
import assert from "node:assert/strict";
import adapter from "../../../../../bin/cli/launch/adapters/opencode.mjs";
import { isLaunchError } from "../../../../../bin/cli/launch/contract.mjs";
import { FIXTURE_ROWS, fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;

function injectedIds(plan) {
  const config = JSON.parse(plan.env.set.OPENCODE_CONFIG_CONTENT);
  const container = config.providers ?? config.provider;
  return Object.keys(container.omniroute.models);
}

function run(name, overrides = {}, mutate = (c) => c) {
  const ctx = mutate(
    fixtureCtx({ tool: adapter.id, viewSpec: view, version: "1.18.30", ...overrides })
  );
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden(adapter.id, name, plan);
  return plan;
}

test("opencode adapter declares its capabilities", () => {
  assert.ok(Object.isFrozen(adapter));
  assert.equal(adapter.id, "opencode");
  assert.equal(adapter.displayName, "OpenCode");
  assert.deepEqual(adapter.binaries, ["opencode"]);
  assert.equal(adapter.capabilities.tier, "core");
  assert.equal(adapter.capabilities.modelList.strategy, "inject");
  assert.equal(adapter.capabilities.modelList.injectLimit, 100);
  assert.equal(adapter.capabilities.modelList.view.limit, 100);
  assert.equal(adapter.capabilities.versionGate.min, "1.18.30");
  assert.equal(adapter.capabilities.versionGate.features.v2, "2.0.0");
  assert.equal(adapter.capabilities.versionGate.recommended, undefined);
});

test("default", () => {
  const plan = run("default");
  const config = JSON.parse(plan.env.set.OPENCODE_CONFIG_CONTENT);
  assert.equal(config.provider.omniroute.npm, "@ai-sdk/openai-compatible");
  assert.equal(config.model, "omniroute/anthropic/claude-sonnet-4-6");
  assert.equal(config.small_model, "omniroute/anthropic/claude-sonnet-4-6");
  assert.deepEqual(plan.argv.slice(0, 2), ["--model", "omniroute/anthropic/claude-sonnet-4-6"]);
  assert.equal(plan.env.set.OPENCODE_DISABLE_AUTOUPDATE, "1");
  assert.equal(plan.env.set.OPENCODE_DISABLE_FREE_MODELS, undefined);
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}");
});

test("v2", () => {
  const plan = run("v2", { version: "2.3.0", features: { v2: true } });
  const config = JSON.parse(plan.env.set.OPENCODE_CONFIG_CONTENT);
  assert.ok(config.providers);
  assert.equal(config.providers.omniroute.package, "@opencode/ai/providers/openai-compatible");
  assert.equal(config.agents.title.model, "omniroute/anthropic/claude-sonnet-4-6");
  assert.deepEqual(plan.argv.slice(0, 1), ["--standalone"]);
  assert.equal(plan.env.set.OPENCODE_DISABLE_FREE_MODELS, "1");
  assert.deepEqual(plan.warnings, []);
});

test("v2-below-recommended", () => {
  const plan = run("v2-below-recommended", { version: "2.1.0", features: { v2: true } });
  assert.ok(
    plan.warnings.some(
      (w) =>
        w ===
        "OpenCode 2.1.0 is untested below 2.3.0; upgrade if the model list or provider is missing"
    )
  );
});

test("unknown-context", () => {
  const plan = run("unknown-context", { model: "mystery/unknown-context" });
  const config = JSON.parse(plan.env.set.OPENCODE_CONFIG_CONTENT);
  const row = config.provider.omniroute.models["mystery/unknown-context"];
  assert.deepEqual(row.limit, { context: 128000, output: 32000 });
});

test("no-model", () => {
  const plan = run("no-model", { model: null });
  assert.ok(plan.notes.some((n) => n.startsWith("No model chosen")));
});

test("win32", () => {
  run("win32", { platform: "win32", rootUrl: "http://127.0.0.1:20128" });
});

test("passthrough", () => {
  const plan = run("passthrough", { args: ["-m", "openai/gpt-4o", "--print-logs"] });
  assert.ok(!plan.argv.includes("--model"));
  assert.deepEqual(plan.argv, ["-m", "openai/gpt-4o", "--print-logs"]);
  assert.ok(
    plan.warnings.some(
      (w) =>
        w ===
        "--model openai/gpt-4o is not an OmniRoute model; that provider is not routed through OmniRoute"
    )
  );
});

test("passthrough-v2", () => {
  const plan = run("passthrough-v2", {
    version: "2.3.0",
    features: { v2: true },
    args: ["--server", "http://x"],
  });
  assert.ok(!plan.argv.includes("--standalone"));
  assert.deepEqual(plan.argv, ["--server", "http://x"]);
});

test("v2 resumed session note", () => {
  const plan = run("v2-resume-note", {
    version: "2.3.0",
    features: { v2: true },
    args: ["--continue"],
  });
  assert.ok(
    plan.notes.some(
      (n) => n === "A resumed session may keep its earlier model over the OmniRoute default"
    )
  );
});

test("keyless", () => {
  const base = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "1.18.30" });
  const ctx = { ...base, auth: { ...base.auth, source: "none" } };
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden(adapter.id, "keyless", plan);
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, undefined);
  const config = JSON.parse(plan.env.set.OPENCODE_CONFIG_CONTENT);
  assert.equal(config.provider.omniroute.options.apiKey, undefined);
  assert.deepEqual(plan.secretSites, []);
});

test("below the minimum version throws ToolVersionTooOld", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "1.18.0" });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ToolVersionTooOld"
  );
});

test("empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "1.18.30", rows: [] });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ModelNotFound"
  );
});

test("small explicit model throws ModelUnsuitable", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    version: "1.18.30",
    rows: [
      {
        id: "tiny/ctx-16k",
        label: "Tiny 16k",
        contextTokens: 16000,
        capabilities: ["tool_calling"],
        kind: "model",
      },
      ...FIXTURE_ROWS,
    ],
    viewSpec: { name: "opencode", filter: {}, order: "catalog" },
    model: "tiny/ctx-16k",
  });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ModelUnsuitable"
  );
});
