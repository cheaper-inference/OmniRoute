// Golden plan tests for bin/cli/launch/adapters/openclaw.mjs (architecture 2.3, 14, 16.2 step 1).
//
// Recipe lines and their source in the dossier tools/openclaw.md:
// - tier core, Node pre-check, launcher declares the model list: line 3
// - install commands (curl --no-onboard, npm --allow-scripts, pnpm --allow-build): lines 14-17
// - binaries openclaw then clawdbot: line 18
// - versionGate `--version` + /OpenClaw (\d{4}\.\d+\.\d+)/, min 2026.11.x: lines 19-20
// - preflight node-version ">=24.16.0 <25 || >=26.1.0": lines 21, 109
// - protocol openai-completions, baseUrl ends in /v1: line 26; ids with "/" work: line 30
// - OPENCLAW_STATE_DIR / OPENCLAW_CONFIG_PATH redirect everything: line 33
// - apiKey "${OMNIROUTE_API_KEY:-omniroute-local}" literal: line 38
// - tui has no --model, primary comes from agents.defaults.model.primary: line 39
// - generated openclaw.json (strict schema, so exactly these keys): lines 37, 41-74
// - declare every view model, skipBootstrap, workspace = cwd or the state default: lines 75-77
// - env recipe (STATE_DIR in temp, NO_AUTO_UPDATE, DO_NOT_TRACK, XDG_CACHE_HOME), rm after
//   exit, key only in env: lines 79-90
// - --url/--token/--password/--tls-fingerprint and a positional target are errors: line 91
// - entry mapping and maxTokens defaults, requireKnownContext: lines 95-98, 124
// - context floor 4000 (hard), warning under 8000: line 99
// - inherited env to strip: line 110; no teardown (no Gateway, no daemon): lines 35, 102, 125
// - native Windows untested, WSL2 recommended: line 142

import { test } from "node:test";
import assert from "node:assert/strict";

import adapter from "../../../../../bin/cli/launch/adapters/openclaw.mjs";
import { FIXTURE_ROWS, fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";
import type { LaunchPlan } from "../../../../../bin/cli/launch/contract.d.ts";

const view = adapter.capabilities.modelList.view;
const VERSION = "2026.11.3";

type ModelEntry = { id: string; contextWindow?: number; maxTokens: number; input: string[] };

function config(plan: LaunchPlan) {
  const file = plan.tempFiles.find((f) => f.path === "openclaw.json");
  assert.ok(file && typeof file.contents === "string", "openclaw.json is written");
  return JSON.parse(file.contents as string);
}

function injectedIds(plan: LaunchPlan): string[] {
  return (config(plan).models.providers.omniroute.models as ModelEntry[]).map((m) => m.id);
}

function ctxWith(overrides: Record<string, unknown> = {}) {
  return fixtureCtx({ tool: adapter.id, viewSpec: view, version: VERSION, ...overrides });
}

function check(caseName: string, ctx: ReturnType<typeof fixtureCtx>) {
  const plan = adapter.plan(ctx) as LaunchPlan;
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden("openclaw", caseName, plan);
  return plan;
}

function throwsCode(fn: () => unknown, code: string) {
  assert.throws(fn, (error: { name?: string; code?: string }) => {
    assert.equal(error?.name, "LaunchError");
    assert.equal(error?.code, code);
    return true;
  });
}

test("declared capabilities match the dossier", () => {
  const caps = adapter.capabilities;
  assert.equal(adapter.id, "openclaw");
  assert.deepEqual(adapter.binaries, ["openclaw", "clawdbot"]);
  assert.equal(caps.tier, "core");
  assert.equal(caps.protocol, "openai-chat");
  assert.equal(caps.modelList.strategy, "inject");
  assert.equal(caps.modelList.injectLimit, undefined);
  assert.equal(caps.minContextTokens, 4000);
  assert.deepEqual(view.filter.capabilities, ["tools"]);
  assert.deepEqual(view.filter.protocols, ["openai-chat"]);
  assert.equal(view.filter.minContextTokens, 4000);
  assert.equal(view.filter.requireKnownContext, true);
  assert.equal(caps.model, "optional");
  assert.equal(caps.supportsProfile, false);
  assert.deepEqual(caps.versionGate, {
    args: ["--version"],
    pattern: "OpenClaw (\\d{4}\\.\\d+\\.\\d+)",
    min: "2026.11.0",
    recommended: "2026.11.3",
  });
  assert.match("OpenClaw 2026.11.3 (847611d)", new RegExp(caps.versionGate!.pattern!));
  assert.deepEqual(
    caps.passthrough!.map((rule) => [rule.flag, rule.action]),
    [
      ["--url", "reject"],
      ["--token", "reject"],
      ["--password", "reject"],
      ["--tls-fingerprint", "reject"],
    ]
  );
});

test("node-version preflight guards the Node the tool runs on", () => {
  const plan = adapter.plan(ctxWith()) as LaunchPlan;
  assert.deepEqual(
    plan.preflight.map((check) => [check.kind, (check as { range?: string }).range]),
    [["node-version", ">=24.16.0 <25 || >=26.1.0"]]
  );
  assert.deepEqual(plan.teardown, []);
  assert.deepEqual(plan.postExitChecks, []);
});

test("default: chosen model, every view row declared with context, key only in env", () => {
  const plan = check("default", ctxWith({ cwd: "/home/fixture/project" }));
  const cfg = config(plan);
  assert.deepEqual(plan.argv, ["tui", "--local"]);
  assert.equal(cfg.agents.defaults.model.primary, "omniroute/anthropic/claude-sonnet-4-6");
  assert.equal(cfg.agents.defaults.workspace, "/home/fixture/project");
  assert.equal(cfg.agents.defaults.skipBootstrap, true);
  assert.equal(cfg.models.providers.omniroute.baseUrl, "http://127.0.0.1:20128/v1");
  assert.equal(cfg.models.providers.omniroute.apiKey, "${OMNIROUTE_API_KEY:-omniroute-local}");
  for (const entry of cfg.models.providers.omniroute.models as ModelEntry[]) {
    assert.equal(typeof entry.contextWindow, "number", `${entry.id} has a context window`);
  }
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}");
  assert.equal(plan.env.set.OPENCLAW_STATE_DIR, "${TMP}/state");
  assert.deepEqual(plan.secretSites, [{ kind: "env", key: "OMNIROUTE_API_KEY" }]);
  assert.ok(!plan.tempFiles[0].contents!.includes("${TOKEN}"), "no token in the config file");
});

test("no model: the first view row becomes primary", () => {
  const plan = check("no-model", ctxWith({ model: null }));
  assert.equal(config(plan).agents.defaults.model.primary, "omniroute/anthropic/claude-sonnet-4-6");
});

test("model without known context: filtered out, and rejected if a looser view keeps it", () => {
  const ctx = ctxWith();
  assert.ok(!ctx.view.rows.some((row) => row.id === "mystery/unknown-context"));
  assert.ok(!ctx.view.rows.some((row) => row.id === "plain/no-tools"));
  const loose = { ...view, filter: { ...view.filter, requireKnownContext: false } };
  throwsCode(
    () => adapter.plan(ctxWith({ viewSpec: loose, model: "mystery/unknown-context" })),
    "ModelUnsuitable"
  );
});

test("explicit model below minContextTokens is ModelUnsuitable", () => {
  const rows = [
    ...FIXTURE_ROWS,
    { id: "tiny/ctx-2k", contextTokens: 2048, capabilities: ["tool_calling"], kind: "model" },
  ];
  const loose = { ...view, filter: { ...view.filter, minContextTokens: undefined } };
  throwsCode(
    () => adapter.plan(ctxWith({ rows, viewSpec: loose, model: "tiny/ctx-2k" })),
    "ModelUnsuitable"
  );
});

test("small context under 8000 launches with a warning", () => {
  const rows = [
    { id: "small/ctx-6k", contextTokens: 6000, capabilities: ["tool_calling"], kind: "model" },
  ];
  const plan = check("small-context", ctxWith({ rows, model: "small/ctx-6k" }));
  const entry = config(plan).models.providers.omniroute.models[0];
  assert.equal(entry.maxTokens, 8192);
  assert.ok(plan.warnings.some((w) => w.includes("warns below 8000")));
});

test("below recommended version: launches with a warning", () => {
  const plan = check("below-recommended", ctxWith({ version: "2026.11.1" }));
  assert.ok(plan.warnings.some((w) => w.includes("2026.11.3")));
});

test("below min version throws ToolVersionTooOld", () => {
  throwsCode(() => adapter.plan(ctxWith({ version: "2026.10.9" })), "ToolVersionTooOld");
});

test("win32: paths stay placeholders, cwd is JSON-escaped, untested-platform warning", () => {
  const plan = check("win32", ctxWith({ platform: "win32", cwd: "C:\\work\\proj" }));
  assert.equal(config(plan).agents.defaults.workspace, "C:\\work\\proj");
  assert.equal(plan.env.set.OPENCLAW_CONFIG_PATH, "${TMP}/openclaw.json");
  assert.ok(plan.warnings.some((w) => w.includes("WSL2")));
});

test("user passthrough after -- is appended to tui --local", () => {
  const plan = check("passthrough", ctxWith({ args: ["--session", "work", "--thinking", "high"] }));
  assert.deepEqual(plan.argv, ["tui", "--local", "--session", "work", "--thinking", "high"]);
});

test("Gateway flags and a positional session target are rejected", () => {
  for (const args of [
    ["--url", "ws://x"],
    ["--token=abc"],
    ["--password", "p"],
    ["--tls-fingerprint", "f"],
    ["mysession"],
  ]) {
    throwsCode(() => adapter.plan(ctxWith({ args })), "ConfigConflict");
  }
});

test("inherited OpenClaw and provider env is unset", () => {
  const plan = check(
    "inherit-env",
    ctxWith({
      env: {
        OPENCLAW_PROFILE: "work",
        OPENCLAW_GATEWAY_TOKEN: "t",
        OPENAI_API_KEY: "sk",
        OPENAI_BASE_URL: "https://api.openai.com/v1",
        OMNIROUTE_API_KEY: "user",
      },
    })
  );
  assert.deepEqual(plan.env.unset, [
    "OPENAI_API_KEY",
    "OPENAI_BASE_URL",
    "OPENCLAW_AGENT_DIR",
    "OPENCLAW_GATEWAY_TOKEN",
    "OPENCLAW_HOME",
    "OPENCLAW_PROFILE",
    "OPENCLAW_WORKSPACE_DIR",
  ]);
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}");
});

test("empty view throws ModelNotFound", () => {
  throwsCode(() => adapter.plan(ctxWith({ rows: [], model: null })), "ModelNotFound");
});

test("one-shot passthrough (agent) replaces tui and adds --local", () => {
  const plan = check("one-shot", ctxWith({ args: ["agent", "--message", "reply with OK"] }));
  assert.deepEqual(plan.argv, ["agent", "--local", "--message", "reply with OK"]);
  assert.ok(plan.env.set.OPENCLAW_STATE_DIR);
  assert.ok(plan.env.set.OPENCLAW_CONFIG_PATH);
});

test("one-shot passthrough does not duplicate --local and leaves agent exec alone", () => {
  const a = adapter.plan(ctxWith({ args: ["agent", "--local", "--message", "x"] })) as LaunchPlan;
  assert.deepEqual(a.argv, ["agent", "--local", "--message", "x"]);
  const b = adapter.plan(ctxWith({ args: ["agent", "exec", "--json", "x"] })) as LaunchPlan;
  assert.deepEqual(b.argv, ["agent", "exec", "--json", "x"]);
});

test("one-shot passthrough still rejects gateway flags; non one-shot is unchanged", () => {
  throwsCode(() => adapter.plan(ctxWith({ args: ["agent", "--token", "t"] })), "ConfigConflict");
  const plain = adapter.plan(ctxWith({ args: [] })) as LaunchPlan;
  assert.deepEqual(plain.argv, ["tui", "--local"]);
  throwsCode(() => adapter.plan(ctxWith({ args: ["status"] })), "ConfigConflict");
});
