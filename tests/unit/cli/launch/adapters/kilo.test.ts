// tests/unit/cli/launch/adapters/kilo.test.ts: golden tests for the Kilo Code CLI adapter.
//
// Behavior covered:
// - versionGate.min 7.8.27, no recommended -> no below-recommended golden case.
// - binaries ["kilo", "kilocode"].
// - KILO_CONFIG_CONTENT shape, --model skip-ours rule, foreign-model enabled_providers drop +
//   warning, --attach / `kilo attach` warning.
// - apiKey / OMNIROUTE_API_KEY omitted when keyless.
// - env.unset KILO_API_KEY, KILO_PROVIDER.
// - no /v1/models discovery -> inject strategy, models map keyed by row.id, limit.context /
//   limit.output defaults.

import { test } from "node:test";
import assert from "node:assert/strict";

import { CONFIG_BYTE_BUDGET } from "../../../../../bin/cli/launch/adapters/kilo.mjs";
import adapter from "../../../../../bin/cli/launch/adapters/kilo.mjs";
import { fixtureCtx, FIXTURE_ROWS } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";
import { isLaunchError } from "../../../../../bin/cli/launch/contract.mjs";

const view = adapter.capabilities.modelList.view;

function injectedIds(plan) {
  const config = JSON.parse(plan.env.set.KILO_CONFIG_CONTENT);
  return Object.keys(config.provider.omniroute.models);
}

function run(caseName, overrides) {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "7.8.27", ...overrides });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden(adapter.id, caseName, plan);
  return { ctx, plan };
}

test("adapter declares the expected static capabilities", () => {
  assert.equal(adapter.id, "kilo");
  assert.equal(adapter.displayName, "Kilo Code CLI");
  assert.deepEqual(adapter.binaries, ["kilo", "kilocode"]);
  assert.equal(adapter.capabilities.tier, "supported");
  assert.equal(adapter.capabilities.modelList.strategy, "inject");
  assert.equal(adapter.capabilities.modelList.injectLimit, 300);
  assert.equal(adapter.capabilities.modelList.view.limit, 300);
  assert.equal(adapter.capabilities.modelList.view.spread, "provider");
  assert.deepEqual(adapter.contract, { major: 1, minor: 3 });
  assert.equal(adapter.capabilities.versionGate.min, "7.8.27");
  assert.equal(adapter.capabilities.versionGate.recommended, undefined);
});

test("default: linux, model = first view row", () => {
  const { plan } = run("default", { platform: "linux" });
  assert.deepEqual(plan.argv.slice(0, 2), ["--model", `omniroute/${FIXTURE_ROWS[0].id}`]);
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}");
  assert.equal(plan.env.set.KILO_NO_DAEMON, "1");
  assert.equal(plan.env.set.KILO_DISABLE_AUTOUPDATE, "1");
  assert.equal(plan.env.set.KILO_TELEMETRY_LEVEL, "off");
  assert.deepEqual(plan.env.unset, ["KILO_API_KEY", "KILO_PROVIDER"]);
});

test("unknown-context: model with no known contextTokens is accepted", () => {
  run("unknown-context", { model: "mystery/unknown-context" });
});

test("no-model: defaults to the first view row and notes it", () => {
  const { plan } = run("no-model", { model: null });
  assert.ok(plan.notes.some((note) => note.includes("No model chosen: defaulting to")));
});

test("win32: platform-specific fixture home", () => {
  run("win32", { platform: "win32" });
});

test("passthrough: user -m to a non-OmniRoute model drops enabled_providers and warns", () => {
  const { plan } = run("passthrough", { args: ["-m", "anthropic/claude-x", "--print-logs"] });
  assert.ok(!plan.argv.includes("--model"));
  assert.equal(plan.argv[0], "-m");
  const config = JSON.parse(plan.env.set.KILO_CONFIG_CONTENT);
  assert.equal(config.enabled_providers, undefined);
  assert.ok(
    plan.warnings.some((w) => w.includes("--model anthropic/claude-x is not an OmniRoute model"))
  );
});

test("passthrough-omniroute: user --model omniroute/... keeps enabled_providers, no warning", () => {
  const { plan } = run("passthrough-omniroute", { args: ["--model", "omniroute/openai/gpt-5.2"] });
  assert.equal(plan.argv[0], "--model");
  assert.equal(plan.argv[1], "omniroute/openai/gpt-5.2");
  const config = JSON.parse(plan.env.set.KILO_CONFIG_CONTENT);
  assert.deepEqual(config.enabled_providers, ["omniroute"]);
  assert.deepEqual(plan.warnings, []);
});

test("attach: kilo attach <url> warns that it ignores the OmniRoute config", () => {
  const { plan } = run("attach", { args: ["attach", "http://127.0.0.1:4097"] });
  assert.ok(
    plan.warnings.includes("--attach points at another server that ignores the OmniRoute config")
  );
});

test("keyless: ctx.auth.source none omits apiKey and OMNIROUTE_API_KEY", () => {
  const base = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "7.8.27" });
  const ctx = { ...base, auth: { ...base.auth, source: "none" } };
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden(adapter.id, "keyless", plan);
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, undefined);
  const config = JSON.parse(plan.env.set.KILO_CONFIG_CONTENT);
  assert.equal(config.provider.omniroute.options.apiKey, undefined);
});

test("throws ToolVersionTooOld below the minimum version", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "7.8.0" });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ToolVersionTooOld"
  );
});

test("throws ModelNotFound on an empty view", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    viewSpec: view,
    version: "7.8.27",
    rows: [],
    model: null,
  });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ModelNotFound"
  );
});

test("throws ModelUnsuitable for an explicit small-context model", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    viewSpec: { name: "kilo", filter: {}, order: "catalog" },
    version: "7.8.27",
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
    model: "tiny/ctx-16k",
  });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ModelUnsuitable"
  );
});

const kiloView = adapter.capabilities.modelList.view;
const kiloIds = (plan) =>
  Object.keys(JSON.parse(plan.env.set.KILO_CONFIG_CONTENT).provider.omniroute.models);

function bulkRows(perProvider: Record<string, number>, idPad = 0) {
  const rows = [];
  for (const [provider, count] of Object.entries(perProvider)) {
    for (let i = 0; i < count; i += 1) {
      rows.push({
        id: `${provider}/${"x".repeat(idPad)}model-${String(i).padStart(4, "0")}`,
        label: `${provider} model ${i} ${"y".repeat(idPad)}`,
        contextTokens: 64000,
        capabilities: ["tool_calling"],
        kind: "model" as const,
      });
    }
  }
  return rows;
}

test("view spread: every provider keeps rows and the view has exactly the cap", () => {
  const rows = bulkRows({ big: 900, mid: 40, small: 10 });
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: kiloView, version: "7.8.27", rows });
  assert.equal(ctx.view.rows.length, 300);
  const providers = new Set(ctx.view.rows.map((r) => r.id.split("/")[0]));
  assert.deepEqual([...providers].sort(), ["big", "mid", "small"]);
});

test("config at the cap with realistic long ids stays under the byte budget", () => {
  const rows = bulkRows({ a: 200, b: 200, c: 200 }, 40);
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: kiloView, version: "7.8.27", rows });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: kiloIds });
  assert.equal(kiloIds(plan).length, 300);
  assert.ok(Buffer.byteLength(plan.env.set.KILO_CONFIG_CONTENT) < CONFIG_BYTE_BUDGET);
  assert.deepEqual(
    plan.warnings.filter((w) => w.includes("Dropped")),
    []
  );
});

test("over-budget config drops rows from the end and warns", () => {
  const rows = bulkRows({ a: 150, b: 150 }, 400);
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: kiloView, version: "7.8.27", rows });
  const plan = adapter.plan(ctx);
  const ids = kiloIds(plan);
  assert.ok(ids.length < 300 && ids.length >= 1);
  assert.deepEqual(
    ids,
    ctx.view.rows.slice(0, ids.length).map((r) => r.id)
  );
  assert.ok(Buffer.byteLength(plan.env.set.KILO_CONFIG_CONTENT) <= CONFIG_BYTE_BUDGET);
  assert.ok(plan.warnings.some((w) => w.includes(`Dropped ${300 - ids.length} of 300`)));
  assert.equal(plan.modelList.injected, ids.length);
});
