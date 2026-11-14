// Golden tests for bin/cli/launch/adapters/codex.mjs.
//
// What each recipe line covers:
// - provider `-c` flags (model_provider, name, base_url = ensureV1(root), wire_api "responses",
//   env_key, requires_openai_auth=false); Responses API only.
// - `-c model_catalog_json=${STATE}/model.json`: launcher-owned catalog, never ~/.codex; win32
//   raw value (TOML parse, raw string fallback).
// - catalog entry keys (slug, display_name, supported_reasoning_levels, shell_type "default",
//   visibility, supported_in_api, priority, support_verbosity false, truncation_policy bytes
//   10000, experimental_supported_tools, base_instructions, context_window 128000 fallback,
//   supports_reasoning_summary_parameter false for non-reasoning rows).
// - base_instructions = Codex prompt.md (asset codex/base-instructions.txt).
// - service_tier, check_for_update_on_startup, analytics.enabled, feedback.enabled,
//   features.plugins=false (no curated plugin catalog sync, verified live on 0.169.0).
// - OMNIROUTE_API_KEY never empty (sentinel) and the stripped OPENAI_* / CODEX_API_KEY env.
// - owned passthrough (-m/--model, -p/--profile, --oss, --local-provider, -c on model,
//   model_provider, model_providers.*, model_catalog_json, profile).
// - user args appended after ours, global `-c` before a subcommand. User
//   `-c` values are hoisted to the root because a subcommand `-c` replaces every root `-c`
//   (clap `global = true`; reproduced live on codex-cli 0.115.0, same code at 69231e1).
// - supports_reasoning_summaries / supports_parallel_tool_calls: ignored now, written
//   by ollama; required by older catalog schemas, reproduced live on 0.115.0.
// - version gate min 0.134.0, recommended 0.160.1 (verified live).
// - empty view -> ModelNotFound.
// - postExitChecks file-unchanged on CODEX_HOME/config.toml (Codex-owned trust write).

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import adapter from "../../../../../bin/cli/launch/adapters/codex.mjs";
import {
  NO_AUTH_SENTINEL,
  expandAssetRefs,
  isLaunchError,
} from "../../../../../bin/cli/launch/contract.mjs";
import { FIXTURE_ROWS, FIXTURE_VIEW_SPEC, fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { ASSETS_DIR, assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";
import type { LaunchPlan } from "../../../../../bin/cli/launch/contract.d.ts";

const view = adapter.capabilities.modelList.view;
type FixtureOptions = Parameters<typeof fixtureCtx>[0];
type Ctx = ReturnType<typeof fixtureCtx>;

function ctxFor(overrides: FixtureOptions = {}): Ctx {
  return fixtureCtx({ tool: adapter.id, viewSpec: view, ...overrides });
}

function catalog(plan: LaunchPlan, readAsset: (path: string) => string = () => "x") {
  const file = plan.tempFiles.find((entry) => entry.path === "model.json");
  assert.ok(file && typeof file.contents === "string", "plan writes model.json");
  return JSON.parse(expandAssetRefs(file.contents, readAsset)) as {
    models: Array<Record<string, unknown>>;
  };
}

const injectedIds = (plan: LaunchPlan) => catalog(plan).models.map((m) => String(m.slug));

function runCase(caseName: string, ctx: Ctx): LaunchPlan {
  const plan = adapter.plan(ctx) as LaunchPlan;
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden(adapter.id, caseName, plan);
  return plan;
}

function assertLaunchError(fn: () => unknown, code: string, pattern?: RegExp) {
  assert.throws(fn, (error: unknown) => {
    assert.ok(isLaunchError(error), `expected a LaunchError, got ${String(error)}`);
    assert.equal((error as { code: string }).code, code);
    if (pattern) assert.match((error as Error).message, pattern);
    return true;
  });
}

function argValue(plan: LaunchPlan, prefix: string): string | undefined {
  return plan.argv.find((arg) => arg.startsWith(prefix));
}

test("default: provider -c flags, ${STATE} catalog, key only in env", () => {
  const plan = runCase("default", ctxFor());
  assert.equal(plan.argv.at(-1), 'model="anthropic/claude-sonnet-4-6"');
  assert.equal(
    argValue(plan, "model_providers.omniroute.base_url="),
    'model_providers.omniroute.base_url="http://127.0.0.1:20128/v1"'
  );
  assert.equal(argValue(plan, "model_catalog_json="), 'model_catalog_json="${STATE}/model.json"');
  // No curated plugin sync: it leaves a background git fetch running after codex exits.
  assert.equal(argValue(plan, "features.plugins="), "features.plugins=false");
  const pluginsAt = plan.argv.indexOf("features.plugins=false");
  assert.equal(plan.argv[pluginsAt - 1], "-c");
  assert.ok(pluginsAt < plan.argv.indexOf(argValue(plan, "model=")), "before the model override");
  assert.deepEqual(plan.env.set, { OMNIROUTE_API_KEY: "${TOKEN}" });
  assert.deepEqual(plan.secretSites, [{ kind: "env", key: "OMNIROUTE_API_KEY" }]);
  assert.equal(plan.needsTempDir, false);
  assert.equal(plan.tempFiles[0].root, "state");
  assert.ok(!JSON.stringify(plan).includes("/home/fixture/.omniroute"), "no DATA_DIR literal");
  const sonnet = catalog(plan).models[0];
  assert.equal(sonnet.context_window, 200000);
  assert.equal(sonnet.max_context_window, 200000);
  assert.deepEqual(sonnet.input_modalities, ["text", "image"]);
  assert.equal(sonnet.default_reasoning_level, "medium");
});

test("model without known context: 128000 fallback window + warning", () => {
  const plan = runCase("model-unknown-context", ctxFor({ model: "mystery/unknown-context" }));
  const row = catalog(plan).models.find((m) => m.slug === "mystery/unknown-context");
  assert.equal(row?.context_window, 128000);
  assert.equal(row?.max_context_window, undefined);
  assert.equal(row?.supports_reasoning_summary_parameter, false);
  assert.ok(plan.warnings.some((w) => w.includes("no known context window")));
});

test("no model: ModelRequired (Codex would fall back to an OpenAI default slug)", () => {
  assertLaunchError(() => adapter.plan(ctxFor({ model: null })), "ModelRequired");
});

test("version below recommended: launches with a warning", () => {
  const plan = runCase("version-below-recommended", ctxFor({ version: "0.150.0" }));
  assert.ok(plan.warnings.some((w) => w.includes("0.160.1")));
});

test("version below min: ToolVersionTooOld", () => {
  assertLaunchError(
    () => adapter.plan(ctxFor({ version: "codex-cli 0.120.0" })),
    "ToolVersionTooOld",
    /0\.134\.0/
  );
  // The gate boundary is inclusive.
  assert.doesNotThrow(() => adapter.plan(ctxFor({ version: "0.134.0" })));
});

test("no feature-gated recipe lines: features do not change the plan", () => {
  const base = adapter.plan(ctxFor());
  assert.deepEqual(adapter.plan(ctxFor({ features: { anything: true } })), base);
  assert.equal(adapter.capabilities.versionGate?.features, undefined);
});

test("win32: raw catalog path (no TOML escapes for backslashes), Windows config path", () => {
  const plan = runCase("win32", ctxFor({ platform: "win32", shell: true }));
  assert.equal(argValue(plan, "model_catalog_json="), "model_catalog_json=${STATE}/model.json");
  assert.equal(plan.postExitChecks[0].path, "C:\\Users\\fixture\\.codex\\config.toml");
});

test("CODEX_HOME is left to the user; the post-exit check follows it", () => {
  const plan = runCase("codex-home", ctxFor({ env: { CODEX_HOME: "/srv/codex-home" } }));
  assert.equal(plan.postExitChecks[0].path, "/srv/codex-home/config.toml");
  assert.ok(!("CODEX_HOME" in plan.env.set) && !plan.env.unset.includes("CODEX_HOME"));
});

test("profile: --profile <name> after the launcher -c flags", () => {
  const plan = runCase("profile", ctxFor({ profile: "work" }));
  const at = plan.argv.indexOf("--profile");
  assert.equal(plan.argv[at + 1], "work");
  assert.ok(at > plan.argv.indexOf('model="anthropic/claude-sonnet-4-6"'));
});

test("user passthrough after --: appended after ours", () => {
  const args = ["exec", "--skip-git-repo-check", "--json", "Reply with exactly: OK"];
  const plan = runCase("passthrough", ctxFor({ args }));
  assert.deepEqual(plan.argv.slice(-args.length), args);
});

test("user -c after a subcommand is hoisted to the root, after ours (clap global clobber)", () => {
  const args = [
    "exec",
    "--skip-git-repo-check",
    "-c",
    'model_reasoning_effort="high"',
    '--config=web_search="disabled"',
    "-cservice_tier=flex",
    "Reply with exactly: OK",
    "--",
    "-c",
    "literal",
  ];
  const plan = runCase("passthrough-config", ctxFor({ args, profile: "work" }));
  const exec = plan.argv.indexOf("exec");
  assert.deepEqual(plan.argv.slice(exec), [
    "exec",
    "--skip-git-repo-check",
    "Reply with exactly: OK",
    "--",
    "-c",
    "literal",
  ]);
  const ours = plan.argv.indexOf('model="anthropic/claude-sonnet-4-6"');
  assert.deepEqual(plan.argv.slice(ours + 1, exec), [
    "-c",
    'model_reasoning_effort="high"',
    "-c",
    'web_search="disabled"',
    "-c",
    "service_tier=flex",
    "--profile",
    "work",
  ]);
});

test("owned passthrough flags: ConfigConflict", () => {
  const owned = [
    ["-m", "gpt-5"],
    ["--model", "gpt-5"],
    ["--model=gpt-5"],
    ["exec", "-m", "gpt-5", "hi"],
    ["-p", "mine"],
    ["--profile=mine"],
    ["-c", 'model="gpt-5"'],
    ["-cmodel=gpt-5"],
    ["-c", 'model_provider="openai"'],
    ["--config", "model_providers.omniroute.base_url=http://evil/v1"],
    ["--config=model_catalog_json=/tmp/other.json"],
    ["-c", 'profile="x"'],
    ["--oss"],
    ["--local-provider", "ollama"],
  ];
  for (const args of owned) {
    assertLaunchError(() => adapter.plan(ctxFor({ args })), "ConfigConflict");
  }
  // Everything after a bare `--` is a prompt for Codex, not an option.
  assert.doesNotThrow(() => adapter.plan(ctxFor({ args: ["exec", "--", "-m is fine here"] })));
});

test("empty view: ModelNotFound", () => {
  assertLaunchError(() => adapter.plan(ctxFor({ rows: [] })), "ModelNotFound");
});

test("explicit model below minContextTokens: ModelUnsuitable", () => {
  const rows = [
    ...FIXTURE_ROWS,
    {
      id: "tiny/ctx-16k",
      label: "Tiny 16k",
      contextTokens: 16384,
      capabilities: ["tool_calling"],
      kind: "model",
    },
  ];
  // Core may hand an explicit --model the view filter dropped; plan() still rejects it.
  const ctx = fixtureCtx({
    tool: "codex",
    rows,
    viewSpec: FIXTURE_VIEW_SPEC,
    model: "tiny/ctx-16k",
  });
  assertLaunchError(() => adapter.plan(ctx), "ModelUnsuitable", /32000/);
  assert.equal(adapter.capabilities.minContextTokens, 32000);
  assert.equal(adapter.capabilities.modelList.view.filter.minContextTokens, 32000);
});

test("no auth: OMNIROUTE_API_KEY gets the non-empty sentinel, no secret site", () => {
  const base = ctxFor();
  const ctx = { ...base, auth: { ...base.auth, token: "", source: "none" as const } } as Ctx;
  const plan = runCase("no-auth", ctx);
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, NO_AUTH_SENTINEL);
  assert.deepEqual(plan.secretSites, []);
});

test("model outside the view: catalog stays the view, plan warns", () => {
  const base = ctxFor();
  const outside = FIXTURE_ROWS.find((row) => row.id === "plain/no-tools");
  const ctx = { ...base, model: { ...outside, capabilities: [...(outside?.capabilities || [])] } };
  const plan = adapter.plan(ctx as Ctx) as LaunchPlan;
  checkPlanInvariants(plan, ctx as Ctx, { adapter, injectedIds });
  assert.ok(plan.warnings.some((w) => w.includes("not in the Codex view")));
  assert.equal(plan.argv.at(-1), 'model="plain/no-tools"');
});

test("view limit: at most 500 catalog entries, priority follows view order", () => {
  const rows = Array.from({ length: 520 }, (_, i) => ({
    id: `bulk/m-${String(i).padStart(3, "0")}`,
    contextTokens: 64000,
    capabilities: ["tool_calling"],
    kind: "model" as const,
  }));
  const ctx = ctxFor({ rows });
  assert.equal(ctx.view.rows.length, 500);
  const plan = adapter.plan(ctx) as LaunchPlan;
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  const models = catalog(plan).models;
  assert.equal(plan.modelList.injected, 500);
  assert.deepEqual(
    models.slice(0, 3).map((m) => m.priority),
    [0, 1, 2]
  );
});

test("expanded catalog is valid Codex JSON with the vendored base instructions", () => {
  const plan = adapter.plan(ctxFor()) as LaunchPlan;
  const text = readFileSync(join(ASSETS_DIR, "codex/base-instructions.txt"), "utf8");
  assert.ok(text.startsWith("You are a coding agent running in the Codex CLI"));
  const models = catalog(plan, (path) => readFileSync(join(ASSETS_DIR, path), "utf8")).models;
  const required = [
    "slug",
    "display_name",
    "supported_reasoning_levels",
    "shell_type",
    "visibility",
    "supported_in_api",
    "priority",
    "support_verbosity",
    "truncation_policy",
    "experimental_supported_tools",
    "base_instructions",
  ];
  assert.ok(models.length > 0);
  for (const model of models) {
    for (const key of required) assert.ok(key in model, `${String(model.slug)} has ${key}`);
    assert.equal(model.base_instructions, text);
  }
});

test("view spread: every provider keeps rows and the view has exactly the cap", () => {
  const rows = [] as Array<{
    id: string;
    contextTokens: number;
    capabilities: string[];
    kind: "model";
  }>;
  for (const [provider, count] of [
    ["big", 900],
    ["mid", 60],
    ["small", 10],
  ] as const) {
    for (let i = 0; i < count; i += 1) {
      rows.push({
        id: `${provider}/m-${String(i).padStart(4, "0")}`,
        contextTokens: 64000,
        capabilities: ["tool_calling"],
        kind: "model",
      });
    }
  }
  const ctx = ctxFor({ rows });
  assert.equal(ctx.view.rows.length, 500);
  const providers = new Set(ctx.view.rows.map((r) => r.id.split("/")[0]));
  assert.deepEqual([...providers].sort(), ["big", "mid", "small"]);
  assert.equal(adapter.capabilities.modelList.view.spread, "provider");
  assert.deepEqual(adapter.contract, { major: 1, minor: 3 });
});
