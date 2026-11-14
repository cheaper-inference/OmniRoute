// Pi adapter golden tests. Recipe from the tool's own docs and source:
// - binary `pi`, install commands, min version 0.85.1 (--version).
// - api "openai-completions" against <root>/v1.
// - `-e <state>/omniroute.ts --provider omniroute --model <id>`, key via env
//   OMNIROUTE_API_KEY ("$OMNIROUTE_API_KEY" in the file), sentinel when auth is off,
//   PI_SKIP_VERSION_CHECK=1, skip our --provider/--model when the user passes either.
// - model fields (reasoning, input, zero cost, contextWindow 128000, maxTokens).
// - no NO_PROXY (open item), no -ne/-nc/--no-session/--offline.

import { test } from "node:test";
import assert from "node:assert/strict";
import adapter from "../../../../../bin/cli/launch/adapters/pi.mjs";
import { isLaunchError } from "../../../../../bin/cli/launch/contract.mjs";
import { FIXTURE_ROWS, fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;

function injectedIds(plan) {
  const text = plan.tempFiles[0].contents;
  const start = text.indexOf("const MODELS = ") + "const MODELS = ".length;
  const end = text.indexOf(";\n\nexport default", start);
  return JSON.parse(text.slice(start, end)).map((m) => m.id);
}

function run(name, overrides = {}, mutate = (c) => c) {
  const ctx = mutate(
    fixtureCtx({ tool: adapter.id, viewSpec: view, version: "0.85.1", ...overrides })
  );
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden(adapter.id, name, plan);
  return plan;
}

test("pi adapter declares its capabilities", () => {
  assert.ok(Object.isFrozen(adapter));
  assert.equal(adapter.id, "pi");
  assert.equal(adapter.displayName, "Pi");
  assert.deepEqual(adapter.binaries, ["pi"]);
  assert.equal(adapter.capabilities.tier, "core");
  assert.equal(adapter.capabilities.modelList.strategy, "inject");
  assert.equal(adapter.capabilities.modelList.injectLimit, undefined);
  assert.equal(adapter.capabilities.versionGate.min, "0.85.1");
});

test("default", () => {
  const plan = run("default");
  assert.deepEqual(plan.argv.slice(0, 6), [
    "-e",
    "${STATE}/omniroute.ts",
    "--provider",
    "omniroute",
    "--model",
    "anthropic/claude-sonnet-4-6",
  ]);
  assert.ok(!plan.tempFiles[0].contents.includes("${TOKEN}"));
});

test("unknown-context", () => {
  const plan = run("unknown-context", { model: "mystery/unknown-context" });
  const models = JSON.parse(
    plan.tempFiles[0].contents.split("const MODELS = ")[1].split(";\n\nexport")[0]
  );
  const row = models.find((m) => m.id === "mystery/unknown-context");
  assert.equal(row.contextWindow, 128000);
  assert.equal(row.maxTokens, 16384);
});

test("no-model", () => {
  const plan = run("no-model", { model: null });
  assert.ok(plan.notes.some((n) => n.startsWith("No model chosen")));
});

test("win32", () => {
  run("win32", { platform: "win32" });
});

test("passthrough", () => {
  const plan = run("passthrough", { args: ["--model", "openai/gpt-5.2", "--thinking", "high"] });
  assert.ok(!plan.argv.includes("--provider"));
  assert.deepEqual(plan.argv.slice(0, 2), ["-e", "${STATE}/omniroute.ts"]);
  assert.deepEqual(plan.argv.slice(-4), ["--model", "openai/gpt-5.2", "--thinking", "high"]);
});

test("keyless", () => {
  const plan = run("keyless", {}, (base) => ({ ...base, auth: { ...base.auth, source: "none" } }));
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "omniroute-no-auth");
  assert.deepEqual(plan.secretSites, []);
});

test("below the minimum version throws ToolVersionTooOld", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "0.84.0" });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ToolVersionTooOld"
  );
});

test("empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "0.85.1", rows: [] });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ModelNotFound"
  );
});

test("small explicit model throws ModelUnsuitable", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    version: "0.85.1",
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
    viewSpec: { name: "pi", filter: {}, order: "catalog" },
    model: "tiny/ctx-16k",
  });
  assert.throws(
    () => adapter.plan(ctx),
    (e) => isLaunchError(e) && e.code === "ModelUnsuitable"
  );
});
