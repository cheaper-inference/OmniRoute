// DeepSeek Harness adapter golden tests. Recipe lines come from tools/deepseek.md:
// - section 3 "Ephemeral injection": `dsh web --patch ${TMP}/omniroute.cordis.yml`, direct
//   llm-pi-ai + agent-default-model rows, apiKeyEnv OMNIROUTER_DSH_API_KEY, DSH_TELEMETRY_DISABLED=1,
//   reject user --patch and --profile, pass the rest (e.g. `-- --port 3081`).
// - section 4 "Model list and metadata": models[] from the view, explicit contextWindow,
//   maxTokens = min(maxOutput, ctx/8) omitted when ctx - maxTokens < 2*65536 or output unknown.
// - section 1 "Identity": Node >=24.9.0 preflight, install `npm install -g @deepseek-ai/dsh@latest`.
// - section 2 "Protocol": api openai-completions at <root>/v1 (wire protocol openai-chat).
// - architecture section 14 deepseek row: core tier, inject strategy.
// The dossier gives no version min/recommended, so there are no version-gate cases.

import assert from "node:assert/strict";
import test from "node:test";

import adapter from "../../../../../bin/cli/launch/adapters/deepseek.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;
// Same view minus the context floor, so small/ctx-32k is selectable.
const looseView = {
  ...view,
  filter: { ...view.filter, minContextTokens: undefined },
};

function injectedIds(plan) {
  const patch = plan.tempFiles[0].contents;
  const ids = [];
  const lines = patch.split("\n");
  const start = lines.findIndex((line) => line.trim() === "models:");
  for (let i = start + 1; i < lines.length; i++) {
    const match = /^\s+- id: (.+)$/.exec(lines[i]);
    if (!match) {
      if (/^- id:/.test(lines[i])) break;
      continue;
    }
    ids.push(JSON.parse(match[1].startsWith('"') ? match[1] : JSON.stringify(match[1])));
  }
  return ids;
}

function run(caseName: string, overrides = {}) {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, ...overrides });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden("deepseek", caseName, plan);
  return plan;
}

test("default: web profile, patch file, key via env, telemetry off", () => {
  const plan = run("default");
  assert.deepEqual(plan.argv, ["web", "--patch", "${TMP}/omniroute.cordis.yml"]);
  assert.equal(plan.env.set.OMNIROUTER_DSH_API_KEY, "${TOKEN}");
  assert.equal(plan.env.set.DSH_TELEMETRY_DISABLED, "1");
  assert.deepEqual(plan.secretSites, [{ kind: "env", key: "OMNIROUTER_DSH_API_KEY" }]);
  assert.equal(plan.preflight[0].kind, "node-version");
  assert.equal(plan.teardown.length, 0);
  assert.equal(plan.postExitChecks.length, 0);
  assert.ok(!plan.tempFiles[0].contents.includes("${TOKEN}"));
});

test("model without known context", () => {
  const plan = run("unknown-context", { model: "mystery/unknown-context" });
  assert.match(plan.tempFiles[0].contents, /agent-default-model/);
});

test("win32", () => {
  run("win32", { platform: "win32", shell: true });
});

test("user passthrough args go after the owned flags", () => {
  const plan = run("passthrough", { args: ["--port", "3081", "--no-open"] });
  assert.deepEqual(plan.argv.slice(-2), ["3081", "--no-open"]);
  assert.deepEqual(plan.argv.slice(0, 3), ["web", "--patch", "${TMP}/omniroute.cordis.yml"]);
});

test("user --patch and --profile are rejected", () => {
  for (const args of [["--patch", "x.yml"], ["--patch=x.yml"], ["--profile", "tui"]]) {
    const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, args });
    assert.throws(
      () => adapter.plan(ctx),
      (err: { code?: string; hint?: string }) => err.code === "ConfigConflict"
    );
  }
  const flags = adapter.capabilities.passthrough.map((r) => [r.flag, r.action]);
  assert.deepEqual(flags, [
    ["--patch", "reject"],
    ["--profile", "reject"],
  ]);
});

test("empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, rows: [] });
  assert.throws(
    () => adapter.plan(ctx),
    (err: { code?: string; hint?: string }) =>
      err.code === "ModelNotFound" && typeof err.hint === "string"
  );
});

test("no model throws ModelRequired", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, model: null });
  assert.throws(
    () => adapter.plan(ctx),
    (err: { code?: string; hint?: string }) => err.code === "ModelRequired"
  );
});

test("explicit model below minContextTokens throws ModelUnsuitable", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: looseView, model: "small/ctx-32k" });
  assert.throws(
    () => adapter.plan(ctx),
    (err: { code?: string; hint?: string }) => err.code === "ModelUnsuitable"
  );
});

test("old and new versions never gate (dossier gives no min)", () => {
  for (const version of ["0.1.0", "0.2.2-rc.1"]) {
    const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version });
    assert.deepEqual(adapter.plan(ctx).warnings, []);
  }
});

test("one-shot: headless replaces web, patch stays", () => {
  const plan = run("one-shot", { args: ["headless", "reply with OK"] });
  assert.deepEqual(plan.argv, [
    "headless",
    "--patch",
    "${TMP}/omniroute.cordis.yml",
    "reply with OK",
  ]);
  assert.ok(!plan.argv.includes("web"));
  assert.equal(plan.notes.length, 0);
});

test("non-one-shot passthrough keeps the web subcommand", () => {
  const plan = run("passthrough", { args: ["--port", "3081", "--no-open"] });
  assert.equal(plan.argv[0], "web");
});
