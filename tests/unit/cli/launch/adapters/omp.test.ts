// omp adapter goldens. Recipe lines come from the dossier tools/omp.md:
// - section 3 option A: `-e` extension with pi.registerProvider, api openai-completions,
//   OMNIROUTE_API_KEY always exported (sentinel when auth is off), --model omniroute/<id>,
//   skip our --model when the user passes --model, --api-key not trusted.
// - section 4: static models[] fields and the 128000 / 32768 defaults.
// - section 5: --config overlay with startup.checkUpdate false, --provider is legacy.
// - section 1: version gate min 18.8.5, install commands.
import { test } from "node:test";
import assert from "node:assert/strict";
import adapter from "../../../../../bin/cli/launch/adapters/omp.mjs";
import { isLaunchError } from "../../../../../bin/cli/launch/contract.mjs";
import { FIXTURE_ROWS, fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;

function extractIds(plan: any): string[] {
  const file = plan.tempFiles.find((f: any) => f.path === "omniroute.ts");
  const text: string = file.contents;
  const start = text.indexOf("const MODELS = ") + "const MODELS = ".length;
  const end = text.indexOf(";\n\nexport default", start);
  return JSON.parse(text.slice(start, end)).map((m: any) => m.id);
}

function run(name: string, overrides: Record<string, unknown> = {}, ctxPatch?: (c: any) => any) {
  const base = fixtureCtx({
    tool: adapter.id,
    viewSpec: view,
    version: "18.8.5",
    ...overrides,
  } as any);
  const ctx = ctxPatch ? ctxPatch(base) : base;
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: extractIds } as any);
  assertGolden(adapter.id, name, plan);
  return plan;
}

test("omp adapter declares its capabilities", () => {
  assert.equal(adapter.id, "omp");
  assert.equal(adapter.capabilities.tier, "core");
  assert.equal(adapter.capabilities.modelList.strategy, "inject");
  assert.equal(adapter.capabilities.modelList.injectLimit, undefined);
  assert.equal(adapter.capabilities.versionGate?.min, "18.8.5");
  assert.ok(Object.isFrozen(adapter));
});

test("golden: default", () => {
  const plan = run("default");
  assert.deepEqual(plan.argv.slice(0, 4), [
    "-e",
    "${STATE}/omniroute.ts",
    "--config",
    "${TMP}/omp-overlay.yml",
  ]);
});
test("golden: unknown-context", () => {
  run("unknown-context", { model: "mystery/unknown-context" });
});
test("golden: no-model", () => {
  run("no-model", { model: null });
});
test("golden: win32", () => {
  run("win32", { platform: "win32" });
});
test("golden: passthrough skips our --model", () => {
  const plan = run("passthrough", { args: ["--model", "omniroute/openai/gpt-5.2", "-p", "hi"] });
  assert.equal(plan.argv.filter((a: string) => a === "--model").length, 1);
});
test("golden: keyless uses the sentinel", () => {
  const plan = run("keyless", {}, (base) => ({ ...base, auth: { ...base.auth, source: "none" } }));
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "omniroute-no-auth");
});

test("legacy --provider skips our --model", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    viewSpec: view,
    version: "18.8.5",
    args: ["--provider", "omniroute"],
  } as any);
  const plan = adapter.plan(ctx);
  assert.equal(plan.argv.includes("--model"), false);
});

test("throws ToolVersionTooOld below the minimum", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "18.8.0" } as any);
  assert.throws(
    () => adapter.plan(ctx),
    (e: any) => isLaunchError(e) && e.code === "ToolVersionTooOld"
  );
});
test("throws ModelNotFound on an empty view", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "18.8.5", rows: [] } as any);
  assert.throws(
    () => adapter.plan(ctx),
    (e: any) => isLaunchError(e) && e.code === "ModelNotFound"
  );
});
test("throws ModelUnsuitable for a small explicit model", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    version: "18.8.5",
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
    viewSpec: { name: "omp", filter: {}, order: "catalog" },
    model: "tiny/ctx-16k",
  } as any);
  assert.throws(
    () => adapter.plan(ctx),
    (e: any) => isLaunchError(e) && e.code === "ModelUnsuitable"
  );
});
