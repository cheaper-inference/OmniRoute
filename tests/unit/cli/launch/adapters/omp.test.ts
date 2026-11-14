// omp adapter goldens. Recipe facts under test:
// - `-e` extension with pi.registerProvider, api openai-completions,
//   OMNIROUTE_API_KEY always exported (sentinel when auth is off), --model omniroute/<id>,
//   skip our --model when the user passes --model, --api-key not trusted.
// - static models[] fields and the 128000 / 32768 defaults.
// - --config overlay with startup.checkUpdate false, --provider is legacy.
// - version gate min 18.8.5, install commands.
import { test } from "node:test";
import assert from "node:assert/strict";
import adapter from "../../../../../bin/cli/launch/adapters/omp.mjs";
import { isLaunchError } from "../../../../../bin/cli/launch/contract.mjs";
import { FIXTURE_ROWS, fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";
import type {
  LaunchPlan,
  TempFileSpec,
  LaunchContext,
} from "../../../../../bin/cli/launch/contract.d.ts";

type ErrLike = { code?: string; message?: string; hint?: string; exitCode?: number; name?: string };
// fixtureCtx takes JSDoc-typed overrides; tests pass partial viewSpec values, hence the casts below.
type CtxOverrides = Parameters<typeof fixtureCtx>[0];

const view = adapter.capabilities.modelList.view;

function extractIds(plan: LaunchPlan): string[] {
  const file = plan.tempFiles.find((f: TempFileSpec) => f.path === "omniroute.ts");
  const text: string = file.contents;
  const start = text.indexOf("const MODELS = ") + "const MODELS = ".length;
  const end = text.indexOf(";\n\nexport default", start);
  return JSON.parse(text.slice(start, end)).map((m: { id: string }) => m.id);
}

function run(
  name: string,
  overrides: Record<string, unknown> = {},
  ctxPatch?: (c: LaunchContext) => LaunchContext
) {
  const base = fixtureCtx({
    tool: adapter.id,
    viewSpec: view,
    version: "18.8.5",
    ...overrides,
  } as unknown as CtxOverrides);
  const ctx = ctxPatch ? ctxPatch(base) : base;
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: extractIds } as unknown as Parameters<
    typeof checkPlanInvariants
  >[2]);
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

test("extension apiKey is the bare env var name and the plan env carries the token", () => {
  const plan = run("default");
  const ext: string = plan.tempFiles.find((f: TempFileSpec) => f.path === "omniroute.ts").contents;
  assert.match(ext, /apiKey: "OMNIROUTE_API_KEY",/);
  assert.equal(ext.includes("$OMNIROUTE_API_KEY"), false);
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}");
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
  } as unknown as CtxOverrides);
  const plan = adapter.plan(ctx);
  assert.equal(plan.argv.includes("--model"), false);
});

test("throws ToolVersionTooOld below the minimum", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    viewSpec: view,
    version: "18.8.0",
  } as unknown as CtxOverrides);
  assert.throws(
    () => adapter.plan(ctx),
    (e: ErrLike) => isLaunchError(e) && e.code === "ToolVersionTooOld"
  );
});
test("throws ModelNotFound on an empty view", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    viewSpec: view,
    version: "18.8.5",
    rows: [],
  } as unknown as CtxOverrides);
  assert.throws(
    () => adapter.plan(ctx),
    (e: ErrLike) => isLaunchError(e) && e.code === "ModelNotFound"
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
  } as unknown as CtxOverrides);
  assert.throws(
    () => adapter.plan(ctx),
    (e: ErrLike) => isLaunchError(e) && e.code === "ModelUnsuitable"
  );
});
