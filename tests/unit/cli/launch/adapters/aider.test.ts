// Aider launch adapter tests. Recipe from the tool's own docs and source:
// - Ephemeral injection: --env-file <tmp>/aider.env (0600) with AIDER_OPENAI_API_BASE (the /v1
//   form) and AIDER_OPENAI_API_KEY; --model/--weak-model/--editor-model openai/<m>;
//   --no-analytics (not "--analytics false"), --no-check-update, --no-show-release-notes;
//   user args appended last; reject --openai-api-base/--openai-api-key/--env-file/--api-key;
//   a user --model replaces ours and the weak/editor pins follow it.
// - Model metadata: temp --model-metadata-file keyed "openai/<m>" with max_input_tokens from
//   context; unknown context entries omit it; --no-show-model-warnings.
// - No minimum version, so there is no versionGate min/recommended and no ToolVersionTooOld
//   case. Unset inherited OPENAI_API_KEY/OPENAI_API_BASE/OPENAI_BASE_URL (run.mjs prior art).
//   No preflight, teardown or postExit checks.
// - Tier core, strategy inject, openai-chat.

import test from "node:test";
import assert from "node:assert/strict";

import adapter from "../../../../../bin/cli/launch/adapters/aider.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;

function metadataIds(plan) {
  const file = plan.tempFiles.find((f) => f.path === "aider.model.metadata.json");
  return Object.keys(JSON.parse(file.contents)).map((key) => key.replace(/^openai\//, ""));
}

function check(plan, ctx) {
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: metadataIds });
}

function planFor(caseName, overrides = {}) {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, ...overrides });
  const plan = adapter.plan(ctx);
  check(plan, ctx);
  assertGolden("aider", caseName, plan);
  return { ctx, plan };
}

test("aider: static capabilities", () => {
  assert.equal(adapter.id, "aider");
  assert.equal(adapter.capabilities.tier, "core");
  assert.equal(adapter.capabilities.protocol, "openai-chat");
  assert.equal(adapter.capabilities.modelList.strategy, "inject");
  assert.equal(adapter.capabilities.versionGate.min, undefined);
  assert.equal(adapter.capabilities.versionGate.recommended, undefined);
});

test("aider: default plan pins models, env file and metadata", () => {
  const { plan } = planFor("default");
  assert.deepEqual(plan.argv.slice(0, 8), [
    "--env-file",
    "${TMP}/aider.env",
    "--model",
    "openai/anthropic/claude-sonnet-4-6",
    "--weak-model",
    "openai/anthropic/claude-sonnet-4-6",
    "--editor-model",
    "openai/anthropic/claude-sonnet-4-6",
  ]);
  assert.ok(plan.argv.includes("--no-analytics"));
  assert.ok(!plan.argv.some((a) => a.includes("${TOKEN}")));
  assert.deepEqual(plan.secretSites, [{ kind: "file", key: "aider.env" }]);
  const env = plan.tempFiles.find((f) => f.path === "aider.env");
  assert.match(env.contents, /AIDER_OPENAI_API_BASE="http:\/\/127\.0\.0\.1:20128\/v1"/);
  assert.match(env.contents, /AIDER_OPENAI_API_KEY="\$\{TOKEN\}"/);
  assert.equal(env.mode, 0o600);
  assert.deepEqual(plan.teardown, []);
  assert.deepEqual(plan.preflight, []);
  assert.deepEqual(plan.postExitChecks, []);
});

test("aider: model without known context omits max_input_tokens", () => {
  const { plan } = planFor("unknown-context", { model: "mystery/unknown-context" });
  const file = plan.tempFiles.find((f) => f.path === "aider.model.metadata.json");
  const meta = JSON.parse(file.contents);
  assert.equal(meta["openai/mystery/unknown-context"].max_input_tokens, undefined);
  assert.equal(meta["openai/openai/gpt-5.2"].max_input_tokens, 400000);
});

test("aider: old version never blocks (no gate)", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "0.10.0" });
  const plan = adapter.plan(ctx);
  assert.deepEqual(plan.warnings, []);
});

test("aider: win32", () => {
  planFor("win32", { platform: "win32", shell: false });
});

test("aider: user passthrough args come last", () => {
  const { plan } = planFor("passthrough", { args: ["--no-git", "--edit-format", "diff"] });
  assert.deepEqual(plan.argv.slice(-3), ["--no-git", "--edit-format", "diff"]);
});

test("aider: user --model replaces ours and weak/editor follow it", () => {
  const { plan } = planFor("user-model", { args: ["--model", "openai/fastest"] });
  assert.equal(plan.argv.filter((a) => a === "--model").length, 1);
  assert.equal(plan.argv[plan.argv.indexOf("--weak-model") + 1], "openai/fastest");
  assert.equal(plan.argv[plan.argv.indexOf("--editor-model") + 1], "openai/fastest");
  assert.deepEqual(plan.warnings, []);
});

test("aider: user --model without openai/ prefix warns", () => {
  const { plan } = planFor("user-model-bare", { args: ["--model=fastest"] });
  assert.equal(plan.warnings.length, 1);
});

test("aider: user pinned weak model is kept", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, args: ["--weak-model", "openai/x"] });
  const plan = adapter.plan(ctx);
  assert.equal(plan.argv.filter((a) => a === "--weak-model").length, 1);
});

test("aider: reject rules declared for routing flags", () => {
  const flags = adapter.capabilities.passthrough.map((r) => r.flag);
  assert.deepEqual(flags, ["--openai-api-base", "--openai-api-key", "--env-file", "--api-key"]);
  assert.ok(adapter.capabilities.passthrough.every((r) => r.action === "reject"));
});

test("aider: empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, rows: [] });
  assert.throws(
    () => adapter.plan(ctx),
    (err) => err.code === "ModelNotFound" && typeof err.hint === "string"
  );
});

test("aider: no model throws ModelRequired", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, model: null });
  assert.throws(
    () => adapter.plan(ctx),
    (err) => err.code === "ModelRequired"
  );
});
