// Crush adapter tests. Recipe lines and their sources in /tools/crush.md (dossier):
//   binary `crush`, install commands            dossier lines 14-23
//   version gate `--version`, min 0.101.0        lines 24-25 (no recommended: only one tested)
//   protocol `completions` = openai-chat         lines 29-30; base_url carries /v1 (line 30)
//   crush.json in the data dir, highest priority lines 43-50, 65-83
//   CRUSH_DATA_DIR / CRUSH_GLOBAL_DATA / CRUSH_CACHE_DIR   lines 56-58, 84
//   never CRUSH_GLOBAL_CONFIG                    line 60
//   auto-update + metrics off                    lines 81, 85, 110-111
//   key only as $OMNIROUTE_API_KEY env ref       line 89
//   no -m on the root command; models.large/small   line 90
//   -D/--data-dir rejected, -c/--cwd warned      line 92
//   no CRUSH_CLIENT_SERVER                       line 93
//   explicit models[] with context_window (needs known context)   lines 96-99
//   per-cwd persistent data dir (init dialog, sessions)           lines 63, 106-108

import { test } from "node:test";
import assert from "node:assert/strict";

import adapter from "../../../../../bin/cli/launch/adapters/crush.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;

function injectedIds(plan: any): string[] {
  const file = plan.tempFiles.find((f: any) => f.path === "data/crush.json");
  return JSON.parse(file.contents).providers.omniroute.models.map((m: any) => m.id);
}

function run(caseName: string, overrides: Record<string, unknown> = {}) {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, ...overrides });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden("crush", caseName, plan);
  return { ctx, plan };
}

function config(plan: any) {
  return JSON.parse(plan.tempFiles[0].contents);
}

test("default launch writes crush.json and owns the data dirs", () => {
  const { plan } = run("default");
  assert.deepStrictEqual(plan.argv, []);
  assert.equal(plan.env.set.CRUSH_DATA_DIR, "${STATE}/data");
  assert.equal(plan.env.set.CRUSH_GLOBAL_DATA, "${STATE}/gdata");
  assert.equal(plan.env.set.CRUSH_CACHE_DIR, "${TMP}/cache");
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}");
  assert.ok(!("CRUSH_GLOBAL_CONFIG" in plan.env.set));
  assert.ok(!plan.env.unset.includes("CRUSH_GLOBAL_CONFIG"));
  assert.deepStrictEqual(plan.secretSites, [{ kind: "env", key: "OMNIROUTE_API_KEY" }]);
  const cfg = config(plan);
  assert.equal(cfg.providers.omniroute.type, "completions");
  assert.equal(cfg.providers.omniroute.api_key, "$OMNIROUTE_API_KEY");
  assert.ok(!plan.tempFiles[0].contents.includes("${TOKEN}"));
  assert.deepStrictEqual(cfg.models.large, {
    provider: "omniroute",
    model: "anthropic/claude-sonnet-4-6",
  });
  for (const m of cfg.providers.omniroute.models) assert.ok(m.context_window > 0);
  assert.equal(cfg.options.disable_metrics, true);
});

test("rows without a known context window are filtered out", () => {
  const { ctx, plan } = run("unknown-context");
  assert.ok(!ctx.view.rows.some((r: any) => r.id === "mystery/unknown-context"));
  assert.ok(!injectedIds(plan).includes("mystery/unknown-context"));
  assert.ok(!injectedIds(plan).includes("plain/no-tools"));
});

test("explicit model becomes models.large and models.small", () => {
  const { plan } = run("explicit-model", { model: "openai/gpt-5.2" });
  const cfg = config(plan);
  assert.equal(cfg.models.large.model, "openai/gpt-5.2");
  assert.equal(cfg.models.small.model, "openai/gpt-5.2");
  const entry = cfg.providers.omniroute.models.find((m: any) => m.id === "openai/gpt-5.2");
  assert.equal(entry.can_reason, true);
  assert.equal(entry.default_max_tokens, 128000);
});

test("model without max output falls back to 16k default_max_tokens", () => {
  const { plan } = run("no-max-output", { model: "fastest" });
  const entry = config(plan).providers.omniroute.models.find((m: any) => m.id === "fastest");
  assert.equal(entry.default_max_tokens, 16384);
});

test("version below the minimum throws ToolVersionTooOld; at the minimum passes", () => {
  const old = fixtureCtx({ tool: adapter.id, viewSpec: view, version: "0.100.9" });
  assert.throws(() => adapter.plan(old), { code: "ToolVersionTooOld" });
  const ok = run("at-min-version", { version: "0.101.0" });
  assert.deepStrictEqual(ok.plan.warnings, []);
  // No recommended version in the dossier, so there is no below-recommended warning case.
  assert.equal(adapter.capabilities.versionGate?.recommended, undefined);
});

test("win32 plan keeps placeholder paths and the same config", () => {
  const { plan } = run("win32", { platform: "win32" });
  assert.equal(plan.env.set.CRUSH_DATA_DIR, "${STATE}/data");
});

test("user passthrough args are appended unchanged", () => {
  const { plan } = run("passthrough", { args: ["--yolo", "hello"] });
  assert.deepStrictEqual(plan.argv, ["--yolo", "hello"]);
});

test("one-shot run gets --verbose (flaky empty stdout workaround)", () => {
  const { plan } = run("one-shot", { args: ["run", "hello"] });
  assert.deepStrictEqual(plan.argv, ["run", "--verbose", "hello"]);
});

test("one-shot run with user --verbose is not duplicated", () => {
  const { plan } = run("one-shot-user-verbose", { args: ["run", "-v", "hello"] });
  assert.deepStrictEqual(plan.argv, ["run", "-v", "hello"]);
});

test("no passthrough is unchanged", () => {
  const { plan } = run("default");
  assert.deepStrictEqual(plan.argv, []);
});

test("--data-dir / -D is rejected, --cwd warns", () => {
  for (const args of [
    ["-D", "/x"],
    ["--data-dir", "/x"],
  ]) {
    const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, args });
    assert.throws(() => adapter.plan(ctx), { code: "ConfigConflict" });
  }
  const { plan } = run("passthrough-cwd", { args: ["-c", "/work"] });
  assert.equal(plan.warnings.length, 1);
  const rules = adapter.capabilities.passthrough!;
  assert.equal(rules.find((r: any) => r.flag === "--data-dir")!.action, "reject");
  assert.equal(rules.find((r: any) => r.flag === "--cwd")!.action, "warn");
});

test("empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, rows: [], model: null });
  assert.throws(() => adapter.plan(ctx), { code: "ModelNotFound" });
});

test("a view of only unknown-context rows is empty", () => {
  const ctx = fixtureCtx({
    tool: adapter.id,
    viewSpec: view,
    model: null,
    rows: [{ id: "x/y", capabilities: ["tool_calling"], kind: "model" }],
  });
  assert.throws(() => adapter.plan(ctx), { code: "ModelNotFound" });
});

test("a chosen model without a context window is ModelUnsuitable", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view });
  const bad = { ...ctx, model: { id: "x/y", capabilities: [], kind: "model" } };
  assert.throws(() => adapter.plan(bad as any), { code: "ModelUnsuitable" });
});

test("different cwd gives the same plan (STATE is keyed per cwd by core)", () => {
  const a = run("cwd-a", { cwd: "/work/a" }).plan;
  const b = adapter.plan(fixtureCtx({ tool: adapter.id, viewSpec: view, cwd: "/work/b" }));
  assert.deepStrictEqual(a, b);
});

test("capabilities", () => {
  const caps = adapter.capabilities;
  assert.equal(adapter.id, "crush");
  assert.deepStrictEqual(adapter.binaries, ["crush"]);
  assert.equal(caps.tier, "core");
  assert.equal(caps.protocol, "openai-chat");
  assert.equal(caps.modelList.strategy, "inject");
  assert.equal(caps.modelList.view.filter.requireKnownContext, true);
  assert.deepStrictEqual(caps.modelList.view.filter.capabilities, ["tools"]);
  assert.equal(caps.versionGate?.min, "0.101.0");
  assert.equal(caps.supportsProfile, false);
  assert.deepStrictEqual(caps.platforms, ["darwin", "linux", "win32"]);
});
