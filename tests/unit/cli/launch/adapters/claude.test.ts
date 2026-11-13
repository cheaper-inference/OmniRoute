// Golden tests for the claude launch adapter (bin/cli/launch/adapters/claude.mjs).
//
// Recipe line -> source (dossier tools/claude.md, architecture r2 sections 2.3 and 14):
// - tier core, strategy inject, model optional: architecture 2.3 and section 14 (claude row).
// - version gate min 2.1.83, recommended 2.1.242, features customModelOption/hostManaged/
//   modelPicker/behavesAs: dossier section 1 "Minimum versions" table and "Gate".
// - install commands, binary `claude`, `--version` parse: dossier section 1 "Identity".
// - protocol anthropic-messages, root base URL (no /v1): dossier section 2.
// - env recipe (ANTHROPIC_BASE_URL, ANTHROPIC_AUTH_TOKEN, empty ANTHROPIC_API_KEY,
//   CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST=1, tier pins, subagent pin, output cap 128000,
//   AUTO_MODE_SERVER=0 when unset, attribution/feedback/error-reporting off): dossier section 3
//   "Recipe" and section 2 (auto-mode classifier).
// - window env: exactly claudeWindowEnv (architecture 2.3; dossier section 4 "Context and
//   output"): no window claim at or above 200k, no [1m] suffix.
// - provider selectors unset, discovery off: dossier section 3 recipe, section 4 discovery facts.
// - `--settings` modelPicker file, replaceBuiltInOptions, raw ids, behavesAs, skipWebFetchPreflight:
//   dossier section 4 "Recommended" and section 5 (WebFetch preflight).
// - `--settings` mergeJson, `--bare` / `--setting-sources` warn: dossier section 3 "User args".
// - one-row ANTHROPIC_CUSTOM_MODEL_OPTION fallback below 2.1.242: dossier section 1 "Gate".
// - `--private` -> DISABLE_TELEMETRY, CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: dossier section 3.
// - preflight managed availableModels, postExit `model` key snapshot: dossier sections 4 and 5.
// - profile -> CLAUDE_CONFIG_DIR: architecture 2.3 (launch.mjs prior art).

import { test } from "node:test";
import assert from "node:assert/strict";

import adapter from "../../../../../bin/cli/launch/adapters/claude.mjs";
import { FIXTURE_ROWS, fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";
import type { LaunchPlan } from "../../../../../bin/cli/launch/contract.d.ts";

const view = adapter.capabilities.modelList.view;
const CURRENT = "2.1.323";

type Overrides = Parameters<typeof fixtureCtx>[0];

function ctxFor(overrides: Overrides = {}) {
  return fixtureCtx({ tool: adapter.id, viewSpec: view, version: CURRENT, ...overrides });
}

function settingsFile(plan: LaunchPlan) {
  const file = plan.tempFiles.find((f) => f.path === "claude-settings.json");
  return file ? JSON.parse(String(file.contents)) : undefined;
}

function pickerIds(plan: LaunchPlan): string[] {
  const settings = settingsFile(plan);
  return (settings?.modelPicker?.options ?? []).map((o: { model: string }) => o.model);
}

function run(caseName: string, overrides: Overrides = {}, opts: { injected?: boolean } = {}) {
  const ctx = ctxFor(overrides);
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, {
    adapter,
    ...(opts.injected === false ? {} : { injectedIds: pickerIds }),
  });
  assertGolden(adapter.id, caseName, plan);
  return plan;
}

/** Error cases: the thrown LaunchError (code, message, hint) is pinned as a golden too. */
function expectError(caseName: string, code: string, overrides: Overrides) {
  const ctx = ctxFor(overrides);
  let thrown: { name?: string; code?: string; toJSON?: () => unknown } | undefined;
  try {
    adapter.plan(ctx);
  } catch (error) {
    thrown = error as typeof thrown;
  }
  assert.equal(thrown?.name, "LaunchError", `${caseName}: plan() throws a LaunchError`);
  assert.equal(thrown?.code, code, `${caseName}: error code`);
  assertGolden(adapter.id, caseName, thrown?.toJSON?.());
}

test("claude: declared capabilities", () => {
  const caps = adapter.capabilities;
  assert.equal(adapter.id, "claude");
  assert.deepEqual(adapter.binaries, ["claude"]);
  assert.equal(caps.tier, "core");
  assert.equal(caps.protocol, "anthropic-messages");
  assert.equal(caps.modelList.strategy, "inject");
  assert.equal(caps.modelList.injectLimit, 200);
  assert.equal(caps.versionGate?.min, "2.1.83");
  assert.equal(caps.versionGate?.recommended, "2.1.242");
  assert.deepEqual(
    caps.passthrough?.map((r) => [r.flag, r.action]),
    [
      ["--settings", "mergeJson"],
      ["--bare", "warn"],
      ["--setting-sources", "warn"],
    ]
  );
});

test("claude: default (model with known context, full picker)", () => {
  const plan = run("default");
  assert.deepEqual(plan.argv, [
    "--settings",
    "${TMP}/claude-settings.json",
    "--model",
    "anthropic/claude-sonnet-4-6",
  ]);
  assert.equal(plan.env.set.ANTHROPIC_AUTH_TOKEN, "${TOKEN}");
  assert.equal(plan.env.set.ANTHROPIC_API_KEY, "");
  assert.equal(plan.env.set.CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST, "1");
  assert.equal(plan.env.set.CLAUDE_CODE_MAX_OUTPUT_TOKENS, "64000");
  assert.equal(plan.env.set.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "190000");
  assert.ok(!("CLAUDE_CODE_MAX_CONTEXT_TOKENS" in plan.env.set));
  assert.ok(!("CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY" in plan.env.set));
  const settings = settingsFile(plan);
  assert.equal(settings.modelPicker.replaceBuiltInOptions, true);
  assert.equal(settings.modelPicker.options[0].behavesAs, "claude-sonnet-4-6");
});

test("claude: model without known context", () => {
  const plan = run("unknown-context", { model: "mystery/unknown-context" });
  assert.equal(plan.env.set.CLAUDE_CODE_AUTO_COMPACT_WINDOW, "190000");
  assert.ok(!("CLAUDE_CODE_MAX_CONTEXT_TOKENS" in plan.env.set));
  assert.ok(!("CLAUDE_CODE_MAX_OUTPUT_TOKENS" in plan.env.set));
});

test("claude: small known window (32k) declares the window and skips compaction", () => {
  const plan = run("small-context", { model: "small/ctx-32k" });
  assert.equal(plan.env.set.CLAUDE_CODE_MAX_CONTEXT_TOKENS, "32768");
  assert.ok(!("CLAUDE_CODE_AUTO_COMPACT_WINDOW" in plan.env.set));
});

test("claude: no model (model optional)", () => {
  const plan = run("no-model", { model: null });
  assert.ok(!plan.argv.includes("--model"));
  assert.ok(!("ANTHROPIC_DEFAULT_SONNET_MODEL" in plan.env.set));
});

test("claude: below recommended degrades to one custom model option", () => {
  const plan = run("below-recommended", { version: "2.1.200" }, { injected: false });
  assert.equal(plan.tempFiles.length, 0);
  assert.equal(plan.env.set.ANTHROPIC_CUSTOM_MODEL_OPTION, "anthropic/claude-sonnet-4-6");
  assert.equal(plan.modelList.injected, 1);
  assert.ok(plan.warnings.some((w) => w.includes("2.1.242")));
});

test("claude: below recommended keeps a user --settings as the single file", () => {
  const plan = run(
    "below-recommended-settings",
    { version: "2.1.200", passthroughJson: { "--settings": { effortLevel: "low" } } },
    { injected: false }
  );
  assert.deepEqual(settingsFile(plan), { effortLevel: "low" });
});

test("claude: behavesAs needs 2.1.257", () => {
  const plan = run("no-behaves-as", { version: "2.1.250" });
  assert.ok(settingsFile(plan).modelPicker.options.every((o: object) => !("behavesAs" in o)));
});

test("claude: below min throws ToolVersionTooOld", () => {
  expectError("below-min", "ToolVersionTooOld", { version: "2.1.81" });
});

test("claude: win32 paths", () => {
  const plan = run("win32", { platform: "win32" });
  assert.equal(plan.postExitChecks[0].path, "C:\\Users\\fixture\\.claude\\settings.json");
});

test("claude: profile sets CLAUDE_CONFIG_DIR", () => {
  const plan = run("profile", { profile: "work" });
  assert.equal(plan.env.set.CLAUDE_CONFIG_DIR, "/home/fixture/.claude/profiles/work");
  assert.equal(plan.postExitChecks[0].path, "/home/fixture/.claude/profiles/work/settings.json");
});

test("claude: invalid profile name is a ConfigConflict", () => {
  expectError("bad-profile", "ConfigConflict", { profile: "../escape" });
});

test("claude: user passthrough args and --settings merge (ours wins for modelPicker only)", () => {
  const plan = run("passthrough", {
    args: ["--permission-mode", "plan", "-p", "two words"],
    passthroughJson: {
      "--settings": {
        effortLevel: "low",
        modelPicker: { replaceBuiltInOptions: false, options: [{ model: "user/model" }] },
        env: { FOO: "bar" },
      },
    },
  });
  assert.deepEqual(plan.argv.slice(-4), ["--permission-mode", "plan", "-p", "two words"]);
  assert.equal(plan.argv.filter((a) => a === "--settings").length, 1);
  const settings = settingsFile(plan);
  assert.equal(settings.effortLevel, "low");
  assert.deepEqual(settings.env, { FOO: "bar" });
  assert.equal(settings.modelPicker.replaceBuiltInOptions, true);
});

test("claude: non-object --settings is a ConfigConflict", () => {
  expectError("bad-settings", "ConfigConflict", {
    passthroughJson: { "--settings": ["not", "an", "object"] },
  });
});

test("claude: inherited env (ANTHROPIC_* unset, user window vars respected)", () => {
  const plan = run("inherited-env", {
    env: {
      ANTHROPIC_MODEL: "user-model",
      ANTHROPIC_CUSTOM_HEADERS: "X-A: 1",
      ANTHROPIC_API_KEY: "sk-user",
      CLAUDE_CODE_USE_BEDROCK: "1",
      CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY: "1",
      CLAUDE_CODE_AUTO_MODE_SERVER: "1",
      CLAUDE_CODE_MAX_OUTPUT_TOKENS: "16000",
    },
  });
  assert.ok(plan.env.unset.includes("ANTHROPIC_MODEL"));
  assert.ok(plan.env.unset.includes("CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY"));
  assert.ok(!("CLAUDE_CODE_AUTO_MODE_SERVER" in plan.env.set));
  assert.ok(!("CLAUDE_CODE_MAX_OUTPUT_TOKENS" in plan.env.set));
  assert.equal(plan.env.set.ANTHROPIC_API_KEY, "");
});

test("claude: --private turns telemetry off", () => {
  const plan = run("private", { settings: { privateMode: true } });
  assert.equal(plan.env.set.DISABLE_TELEMETRY, "1");
  assert.equal(plan.env.set.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC, "1");
});

test("claude: auth off uses the no-auth sentinel (no secret site)", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, version: CURRENT });
  const noAuth = { ...ctx, auth: { ...ctx.auth, source: "none" as const } };
  const plan = adapter.plan(noAuth);
  checkPlanInvariants(plan, noAuth, { adapter, injectedIds: pickerIds });
  assertGolden(adapter.id, "no-auth", plan);
  assert.equal(plan.env.set.ANTHROPIC_AUTH_TOKEN, "omniroute-no-auth");
  assert.deepEqual(plan.secretSites, []);
});

test("claude: unreadable version assumes a current release and warns", () => {
  const plan = run("unknown-version", { version: "" });
  assert.ok(plan.warnings.some((w) => w.includes("Could not read")));
  assert.equal(settingsFile(plan).modelPicker.options[0].behavesAs, "claude-sonnet-4-6");
});

test("claude: injectLimit caps the picker at 200 rows", () => {
  const rows = Array.from({ length: 205 }, (_, i) => ({
    id: `bulk/model-${String(i).padStart(3, "0")}`,
    contextTokens: 128000,
    capabilities: ["tool_calling"],
    kind: "model" as const,
  }));
  const ctx = ctxFor({ rows });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds: pickerIds });
  assert.equal(plan.modelList.injected, 200);
});

test("claude: empty view throws ModelNotFound", () => {
  expectError("empty-view", "ModelNotFound", { rows: [], model: null });
});

test("claude: explicit model below minContextTokens throws ModelUnsuitable", () => {
  // Core resolves an explicit --model from the catalog even when the view filter dropped it;
  // simulate that with a view spec lacking the context floor.
  const rows = [
    ...FIXTURE_ROWS,
    { id: "tiny/ctx-16k", contextTokens: 16000, capabilities: ["tool_calling"], kind: "model" },
  ];
  const loose = { ...view, filter: { ...view.filter, minContextTokens: undefined } };
  expectError("model-unsuitable", "ModelUnsuitable", {
    rows,
    viewSpec: loose,
    model: "tiny/ctx-16k",
  });
});
