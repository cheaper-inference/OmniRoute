// Continue CLI adapter tests. Recipe lines covered:
//   --config ${TMP}/config.yaml, never --model
//   env CONTINUE_GLOBAL_DIR=${TMP}/home, key by env
//   CONTINUE_METRICS_ENABLED=0
//   index/globalContext.json autoUpdateCli=false
//   contextLength/maxTokens, 32768 fallback
//   passthrough --config/--model/--org/--agent
//   node >=20, soft version gate
import { test } from "node:test";
import assert from "node:assert/strict";
import type { LaunchPlan } from "../../../../../bin/cli/launch/contract.d.ts";
import adapter from "../../../../../bin/cli/launch/adapters/continue.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;
const VERSION = "1.5.47";

function yamlIds(plan: LaunchPlan): string[] {
  const file = plan.tempFiles.find((f: { path: string }) => f.path === "config.yaml");
  return [...file.contents.matchAll(/^ {2}- name: (.+)$/gm)].map((m) => m[1].replace(/^"|"$/g, ""));
}

function make(over: Record<string, unknown> = {}) {
  return fixtureCtx({ tool: adapter.id, viewSpec: view, version: VERSION, ...over });
}

test("default: first view row is the default model", () => {
  const ctx = make();
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: yamlIds(plan) });
  assert.equal(yamlIds(plan)[0], ctx.model.id);
  assert.deepEqual(plan.argv, ["--config", "${TMP}/config.yaml"]);
  assert.ok(!plan.argv.includes("--model"));
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}");
  assert.deepEqual(plan.secretSites, [{ kind: "env", key: "OMNIROUTE_API_KEY" }]);
  assert.ok(plan.tempFiles[0].contents.includes("${{ secrets.OMNIROUTE_API_KEY }}"));
  assertGolden(adapter.id, "default", plan);
});

test("no-model: view order, first row becomes the default", () => {
  const ctx = make({ model: null });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: yamlIds(plan) });
  assert.equal(yamlIds(plan)[0], ctx.view.rows[0].id);
  assertGolden(adapter.id, "no-model", plan);
});

test("chosen-not-first: chosen model moves to the front", () => {
  const ctx = make({ model: "openai/gpt-5.2" });
  const plan = adapter.plan(ctx);
  const ids = yamlIds(plan);
  assert.equal(ids[0], "openai/gpt-5.2");
  // The invariant expects view order, so put the YAML ids back in view order via the view index.
  const order = ctx.view.rows.map((r: { id: string }) => r.id);
  const viewOrdered = [...ids].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: viewOrdered });
  assertGolden(adapter.id, "chosen-not-first", plan);
});

test("unknown-context: fallback context and a note", () => {
  const ctx = make({ model: "mystery/unknown-context" });
  const plan = adapter.plan(ctx);
  const order = ctx.view.rows.map((r: { id: string }) => r.id);
  const ids = yamlIds(plan);
  checkPlanInvariants(plan, ctx, {
    adapter,
    injectedIds: [...ids].sort((a, b) => order.indexOf(a) - order.indexOf(b)),
  });
  assert.equal(ids[0], "mystery/unknown-context");
  assert.ok(plan.tempFiles[0].contents.includes("contextLength: 32768"));
  assert.equal(plan.notes.length, 1);
  assertGolden(adapter.id, "unknown-context", plan);
});

test("version-below-recommended: warns and launches", () => {
  const ctx = make({ version: "1.4.0" });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: yamlIds(plan) });
  assert.equal(plan.warnings.length, 1);
  assert.match(plan.warnings[0], /1\.4\.0/);
  assertGolden(adapter.id, "version-below-recommended", plan);
});

test("win32", () => {
  const ctx = make({ platform: "win32" });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: yamlIds(plan) });
  assertGolden(adapter.id, "win32", plan);
});

test("passthrough: args kept last, warn flags warn", () => {
  const ctx = make({ args: ["-p", "hi", "--org", "acme"] });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: yamlIds(plan) });
  assert.deepEqual(plan.argv.slice(-4), ["-p", "hi", "--org", "acme"]);
  assert.equal(plan.warnings.length, 1);
  assertGolden(adapter.id, "passthrough", plan);
});

test("remote-gateway", () => {
  const ctx = make({
    rootUrl: "https://gw.example.com/",
    origin: "remote",
    env: { CONTINUE_API_BASE: "https://stale.example.com/" },
  });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: yamlIds(plan) });
  assert.ok(plan.tempFiles[0].contents.includes("https://gw.example.com/v1"));
  assertGolden(adapter.id, "remote-gateway", plan);
});

test("limit: 25 tool rows write 20", () => {
  const rows = Array.from({ length: 25 }, (_, i) => ({
    id: `syn/model-${String(i).padStart(2, "0")}`,
    label: `Synthetic ${i}`,
    contextTokens: 100000,
    maxOutputTokens: 8000,
    capabilities: ["tool_calling"],
    kind: "model",
  }));
  const ctx = make({ rows });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: yamlIds(plan) });
  assert.equal(plan.modelList.injected, 20);
  assert.equal(yamlIds(plan).length, 20);
  // A chosen model beyond the cap goes first and the last row is dropped.
  const far = make({ rows, model: "syn/model-24" });
  const farPlan = adapter.plan(far);
  assert.equal(yamlIds(farPlan).length, 20);
  assert.equal(yamlIds(farPlan)[0], "syn/model-24");
  assertGolden(adapter.id, "limit", plan);
});

test("throws: empty view, owned --config, rejected --model", () => {
  assert.throws(() => adapter.plan(make({ rows: [] })), {
    name: "LaunchError",
    code: "ModelNotFound",
  });
  assert.throws(() => adapter.plan(make({ args: ["--config", "x.yaml"] })), {
    name: "LaunchError",
    code: "ConfigConflict",
  });
  assert.throws(() => adapter.plan(make({ args: ["--model", "o/p"] })), {
    name: "LaunchError",
    code: "ConfigConflict",
  });
});
