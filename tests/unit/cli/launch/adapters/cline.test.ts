// Cline adapter tests. Recipe from the tool's own docs and source:
// - tier core, binary `cline`, install `npm install -g cline`
// - `--version` bare semver, min 3.0.67 (custom providers broken before)
// - protocol openai-chat, base URL with /v1 (ensureV1)
// - sandbox env CLINE_SANDBOX / CLINE_SANDBOX_DATA_DIR / CLINE_DATA_DIR, CLINE_DIR left unset
// - temp files providers.json, models.json, global-settings.json (0600)
// - custom provider id `omniroute`, key only in providers.json, never argv
// - extra env CLINE_NO_AUTO_UPDATE, CLINE_DISABLE_CLINE_PASS_NOTICE, NO_UPDATE_NOTIFIER
// - models.json limits, 128k / 16k fallback
// - passthrough rejects (-k, --data-dir, --config, -z), warn --acp, -P/-m last-wins
// - post-exit ~/.cline/data/settings/* unchanged

import { test } from "node:test";
import assert from "node:assert/strict";

import adapter from "../../../../../bin/cli/launch/adapters/cline.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";
import type {
  LaunchContext,
  LaunchPlan,
  LaunchModelRow,
  TempFileSpec,
  PostExitCheck,
  PassthroughRule,
} from "../../../../../bin/cli/launch/contract.d.ts";

type ErrLike = { code?: string; message?: string; hint?: string; exitCode?: number; name?: string };

const viewSpec = adapter.capabilities.modelList.view;
const VERSION = "3.0.74";

// ctx.util.json sorts object keys, so models.json loses view order. Restore it from the view.
function injectedIdsFor(ctx: LaunchContext) {
  return (plan: LaunchPlan): string[] => {
    const file = plan.tempFiles.find((f: TempFileSpec) => f.path === "settings/models.json");
    const written = new Set(Object.keys(JSON.parse(file.contents).providers.omniroute.models));
    return ctx.view.rows.map((r: LaunchModelRow) => r.id).filter((id: string) => written.has(id));
  };
}

function run(caseName: string, overrides: Record<string, unknown> = {}) {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version: VERSION, ...overrides });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: injectedIdsFor(ctx) });
  assertGolden("cline", caseName, plan);
  return { ctx, plan };
}

test("cline capabilities", () => {
  const caps = adapter.capabilities;
  assert.equal(adapter.id, "cline");
  assert.equal(caps.tier, "core");
  assert.equal(caps.protocol, "openai-chat");
  assert.equal(caps.modelList.strategy, "inject");
  assert.equal(caps.versionGate?.min, "3.0.67");
  assert.equal(caps.supportsProfile, false);
  assert.deepEqual(adapter.binaries, ["cline"]);
});

test("cline default plan", () => {
  const { plan } = run("default");
  assert.deepEqual(plan.argv.slice(0, 2), ["-P", "omniroute"]);
  assert.equal(plan.env.set.CLINE_SANDBOX, "1");
  assert.equal(plan.env.set.CLINE_DATA_DIR, "${TMP}");
  assert.ok(!plan.argv.join(" ").includes("${TOKEN}"));
  assert.deepEqual(plan.secretSites, [{ kind: "file", key: "settings/providers.json" }]);
  assert.ok(plan.tempFiles.every((f: TempFileSpec) => f.mode === 0o600));
  assert.ok(plan.postExitChecks.every((c: PostExitCheck) => c.kind === "file-unchanged"));
});

test("cline model without known context uses 128k / 16k defaults", () => {
  const { plan } = run("unknown-context", { model: "mystery/unknown-context" });
  const models = JSON.parse(
    plan.tempFiles.find((f: TempFileSpec) => f.path === "settings/models.json").contents
  ).providers.omniroute.models;
  assert.equal(models["mystery/unknown-context"].contextWindow, 128000);
  assert.equal(models["mystery/unknown-context"].maxTokens, 16384);
});

test("cline below min version throws ToolVersionTooOld", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version: "3.0.66" });
  assert.throws(
    () => adapter.plan(ctx),
    (err: ErrLike) => err.code === "ToolVersionTooOld"
  );
});

test("cline unknown version skips the gate", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version: "not-a-version" });
  assert.doesNotThrow(() => adapter.plan(ctx));
});

test("cline win32", () => {
  const { plan } = run("win32", { platform: "win32", shell: true });
  const paths = plan.postExitChecks.map((c: PostExitCheck) => c.path);
  assert.ok(paths[0].startsWith("C:\\Users\\fixture\\.cline\\data\\settings\\"));
});

test("cline user passthrough after --", () => {
  const { plan } = run("passthrough", { args: ["--timeout", "60", "fix the bug"] });
  assert.deepEqual(plan.argv.slice(-3), ["--timeout", "60", "fix the bug"]);
});

test("cline passthrough rules", () => {
  const rules = adapter.capabilities.passthrough ?? [];
  const byFlag = (flag: string) => rules.find((r: PassthroughRule) => r.flag === flag);
  assert.equal(byFlag("-P")?.action, "owned");
  assert.equal(byFlag("-m")?.action, "owned");
  assert.equal(byFlag("-k")?.action, "reject");
  assert.equal(byFlag("--data-dir")?.action, "reject");
  assert.equal(byFlag("--config")?.action, "reject");
  assert.equal(byFlag("-z")?.action, "reject");
  assert.deepEqual(byFlag("-z")?.aliases, ["--zen"]);
  assert.equal(byFlag("--acp")?.action, "warn");
});

test("cline empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec, version: VERSION, rows: [] });
  assert.throws(
    () => adapter.plan(ctx),
    (err: ErrLike) => err.code === "ModelNotFound"
  );
});
