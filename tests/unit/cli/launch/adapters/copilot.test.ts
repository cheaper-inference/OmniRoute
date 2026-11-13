// Copilot CLI adapter tests. Recipe lines map to tools/copilot.md:
// env COPILOT_PROVIDER_BASE_URL/TYPE/WIRE_API/API_KEY, COPILOT_MODEL: section 3 "recipe"
// COPILOT_OFFLINE, COPILOT_AUTO_UPDATE: section 3
// unset COPILOT_PROVIDERS_CONFIG and bearer token precedence: sections 3 and 5
// MAX_PROMPT/OUTPUT_TOKENS env, 128k default and warning: sections 2 and 4
// min version 1.0.109: section 1
// argv --model <id> then user args, --model rejected: section 3 "User args"
import { test } from "node:test";
import assert from "node:assert/strict";
import adapter from "../../../../../bin/cli/launch/adapters/copilot.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const viewSpec = adapter.capabilities.modelList.view;
const version = "1.0.111";

function run(name: string, overrides: Record<string, unknown> = {}) {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version, ...overrides });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter });
  assertGolden(adapter.id, name, plan);
  return plan;
}

test("default", () => {
  const plan = run("default");
  assert.equal(plan.env.set.COPILOT_PROVIDER_BASE_URL, "http://127.0.0.1:20128/v1");
  assert.equal(plan.env.set.COPILOT_PROVIDER_API_KEY, "${TOKEN}");
  assert.deepEqual(plan.argv.slice(0, 1), ["--model"]);
  assert.deepEqual(plan.warnings, []);
  assert.ok(!plan.argv.some((a) => a.includes("${TOKEN}")));
});

test("unknown-context", () => {
  const plan = run("unknown-context", { model: "mystery/unknown-context" });
  assert.equal(plan.env.set.COPILOT_PROVIDER_MAX_PROMPT_TOKENS, undefined);
  assert.ok(plan.notes.some((n) => n.includes("128000")));
});

test("small-context", () => {
  const plan = run("small-context", { model: "small/ctx-32k" });
  assert.deepEqual(plan.warnings, ["Copilot recommends 128k context; small/ctx-32k has 32768"]);
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version, model: "small/ctx-32k" });
  assert.deepEqual(adapter.modelWarnings!(ctx.model, ctx), plan.warnings);
});

test("win32", () => {
  run("win32", { platform: "win32" });
});

test("passthrough", () => {
  const plan = run("passthrough", { args: ["-p", "Reply OK"] });
  assert.deepEqual(plan.argv.slice(-2), ["-p", "Reply OK"]);
});

test("remote-gateway", () => {
  const plan = run("remote-gateway", {
    rootUrl: "https://gw.example.com/",
    origin: "remote",
    env: {
      COPILOT_PROVIDERS_CONFIG: "/x/providers.json",
      COPILOT_PROVIDER_BEARER_TOKEN: "stale",
      COPILOT_PROVIDER_FOO: "x",
      COPILOT_HOME: "/keep",
    },
  });
  assert.equal(plan.env.set.COPILOT_PROVIDER_BASE_URL, "https://gw.example.com/v1");
  assert.ok(plan.env.unset.includes("COPILOT_PROVIDER_FOO"));
  assert.ok(!plan.env.unset.includes("COPILOT_HOME"));
});

test("below min version throws ToolVersionTooOld", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version: "1.0.100" });
  assert.throws(() => adapter.plan(ctx), { name: "LaunchError", code: "ToolVersionTooOld" });
});

test("empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version, rows: [] });
  assert.throws(() => adapter.plan(ctx), { name: "LaunchError", code: "ModelNotFound" });
});

test("no model throws ModelRequired", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version, model: null });
  assert.throws(() => adapter.plan(ctx), { name: "LaunchError", code: "ModelRequired" });
});

test("user --model throws ConfigConflict", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version, args: ["--model", "x"] });
  assert.throws(() => adapter.plan(ctx), { name: "LaunchError", code: "ConfigConflict" });
});
