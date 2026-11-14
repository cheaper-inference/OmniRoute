// Hermes adapter tests. Recipe facts under test (from the Hermes Agent docs and CLI behaviour):
//   binary `hermes`, install.sh --non-interactive / install.ps1 -NonInteractive
//   version `Hermes Agent v<x.y.z> (<date>)`, `vunknown` tolerated
//   soft gate ">= v0.16.0 or unknown" (recommended only, no hard min)
//   protocol chat_completions at <root>/v1
//   no --provider/--base-url/--api-key flags (guard, TUI refusal, argv key)
//   temp HERMES_HOME + config.yaml (named provider, base_url, key_env, context pin,
//     updates.check off, plugin checks off, shared_metrics consent, idle exit 30, toolsets)
//   HERMES_GATEWAY_LOCK_DIR=<tmp>/locks, teardown `hermes gateway stop`
//   key by env reference (key_env)
//   env scrub list
//   user args appended; -m/--provider/--base-url/--api-key owned,
//     --ignore-user-config/--safe-mode rejected
//   model via model.default, no -m
//   min context 64k, hard reject; known window required for the pin
//   providers.omniroute { api, key_env, transport, default_model, models }
//   Windows recipe unverified (warning)

import { test } from "node:test";
import assert from "node:assert/strict";

import adapter from "../../../../../bin/cli/launch/adapters/hermes.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";
import type {
  LaunchPlan,
  LaunchModelRow,
  TempFileSpec,
  LaunchAdapter,
} from "../../../../../bin/cli/launch/contract.d.ts";

type ErrLike = { code?: string; message?: string; hint?: string; exitCode?: number; name?: string };

const view = adapter.capabilities.modelList.view;

function configText(plan: LaunchPlan): string {
  const file = plan.tempFiles.find((f: TempFileSpec) => f.path === "config.yaml");
  assert.ok(file, "config.yaml is written");
  return file.contents;
}

/** Ids under `providers.omniroute.models` (keys at 6-space indent after `    models:`). */
function injectedIds(plan: LaunchPlan): string[] {
  const lines = configText(plan).split("\n");
  const start = lines.indexOf("    models:");
  assert.ok(start >= 0, "providers.omniroute.models block present");
  const ids: string[] = [];
  for (const line of lines.slice(start + 1)) {
    const match = /^ {6}(\S.*?):(?: \{\})?$/.exec(line);
    if (match) {
      ids.push(match[1].startsWith('"') ? JSON.parse(match[1]) : match[1]);
      continue;
    }
    if (/^ {8}/.test(line)) continue; // context_length under an id
    break;
  }
  return ids;
}

function run(caseName: string, overrides: Record<string, unknown> = {}) {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, ...overrides });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, injectedIds });
  assertGolden("hermes", caseName, plan);
  return { ctx, plan };
}

function throwsCode(fn: () => unknown, code: string) {
  assert.throws(fn, (error: ErrLike) => error?.name === "LaunchError" && error.code === code);
}

const relaxedView = {
  ...view,
  filter: { ...view.filter, minContextTokens: undefined, requireKnownContext: false },
};

test("capabilities declare the recipe", () => {
  const caps = adapter.capabilities;
  assert.equal(adapter.id, "hermes");
  assert.equal((adapter as LaunchAdapter & { displayName?: string }).displayName, "Hermes Agent");
  assert.deepStrictEqual(adapter.binaries, ["hermes"]);
  assert.equal(caps.protocol, "openai-chat");
  assert.equal(caps.tier, "core");
  assert.equal(caps.model, "optional");
  assert.equal(caps.minContextTokens, 64000);
  assert.equal(caps.supportsProfile, false);
  assert.deepStrictEqual(caps.platforms, ["darwin", "linux", "win32"]);
  assert.equal(caps.modelList.strategy, "inject");
  assert.equal(caps.modelList.injectLimit, undefined);
  assert.deepStrictEqual(caps.modelList.view.filter, {
    kinds: ["chat"],
    protocols: ["openai-chat"],
    capabilities: ["tools"],
    minContextTokens: 64000,
    requireKnownContext: true,
  });
  assert.deepStrictEqual(caps.versionGate, {
    args: ["--version"],
    pattern: "Hermes Agent v(\\d+\\.\\d+\\.\\d+)",
    recommended: "0.16.0",
  });
  const pattern = new RegExp(caps.versionGate!.pattern!);
  assert.equal(pattern.exec("Hermes Agent v0.17.2 (2026.9.24)")?.[1], "0.17.2");
  assert.equal(pattern.exec("Hermes Agent vunknown (2026.9.24)"), null);
  assert.match(caps.install.commands.linux![0], /install\.sh \| bash -s -- --non-interactive$/);
  assert.match(caps.install.commands.win32![0], /install\.ps1.*-NonInteractive$/);
  const actions = Object.fromEntries((caps.passthrough || []).map((r) => [r.flag, r.action]));
  assert.deepStrictEqual(actions, {
    "--model": "owned",
    "--provider": "owned",
    "--base-url": "owned",
    "--api-key": "owned",
    "--ignore-user-config": "reject",
    "--safe-mode": "reject",
  });
});

test("default launch: temp HERMES_HOME, config.yaml, env scrub, gateway teardown", () => {
  const { ctx, plan } = run("default");
  assert.deepStrictEqual(plan.argv, []);
  assert.equal(plan.needsTempDir, true);
  assert.deepStrictEqual(plan.env.set, {
    HERMES_HOME: "${TMP}",
    HERMES_GATEWAY_LOCK_DIR: "${TMP}/locks",
    OMNIROUTE_API_KEY: "${TOKEN}",
  });
  assert.deepStrictEqual(plan.env.unset, [
    "HERMES_TUI",
    "HERMES_IGNORE_USER_CONFIG",
    "HERMES_SAFE_MODE",
    "HERMES_INFERENCE_PROVIDER",
    "HERMES_MODEL",
    "OPENAI_BASE_URL",
    "OPENAI_API_KEY",
    "CUSTOM_BASE_URL",
  ]);
  assert.deepStrictEqual(plan.secretSites, [{ kind: "env", key: "OMNIROUTE_API_KEY" }]);
  // The lock dir is declared for core to create (contract 1.2), never created by the adapter.
  assert.deepStrictEqual(plan.tempDirs, [{ path: "locks", mode: 0o700 }]);
  assert.deepStrictEqual(adapter.contract, { major: 1, minor: 2 });
  assert.deepStrictEqual(plan.teardown, [
    { argv: ["${TOOL}", "gateway", "stop"], env: "plan", timeoutMs: 5000, onError: "warn" },
  ]);
  assert.deepStrictEqual(plan.preflight, []);
  assert.deepStrictEqual(plan.postExitChecks, []);
  assert.deepStrictEqual(plan.warnings, []);

  const file = plan.tempFiles[0];
  assert.equal(file.mode, 0o600);
  assert.equal(file.format, "yaml");
  const text = configText(plan);
  assert.ok(!text.includes("${TOKEN}"), "the key is only referenced by key_env");
  // model.provider names the providers.omniroute entry: Hermes 0.19.0 reads key_env only on a
  // named entry (runtime_provider.py:674-676); bare `custom` ignores model.key_env and sends
  // "no-key-required" (runtime_provider.py:1065-1070, 1182-1183), so the minted token never left.
  assert.match(
    text,
    /^model:\n {2}provider: omniroute\n {2}default: anthropic\/claude-sonnet-4-6\n/
  );
  assert.ok(!/provider: custom\n/.test(text), "bare custom drops key_env on Hermes 0.19.0");
  assert.match(
    text,
    /\nproviders:\n {2}omniroute:\n {4}name: OmniRoute\n {4}api: "http:\/\/127\.0\.0\.1:20128\/v1"\n {4}key_env: OMNIROUTE_API_KEY\n/
  );
  assert.equal(plan.env.set.OMNIROUTE_API_KEY, ctx.auth.token, "key_env names the token env var");
  assert.match(text, /\n {2}base_url: "http:\/\/127\.0\.0\.1:20128\/v1"\n/);
  assert.match(text, /\n {2}key_env: OMNIROUTE_API_KEY\n {2}context_length: 200000\n/);
  assert.match(text, /\nupdates:\n {2}check: false\n/);
  assert.match(text, /\nplugins:\n {2}auto_update_check_hours: 0\n/);
  assert.match(text, /\n {4}enabled: false\n {4}send: false\n {4}offer_version: 2\n/);
  assert.match(text, /\ngateway:\n {2}unmanaged_idle_exit_seconds: 30\n/);
  assert.match(text, /\ntoolsets:\n {2}- hermes-cli\n {2}- web\n$/);
  // Small, unknown-context and tool-less rows never reach the tool.
  const ids = injectedIds(plan);
  assert.deepStrictEqual(
    ids,
    ctx.view.rows.map((r: LaunchModelRow) => r.id)
  );
  for (const id of ["small/ctx-32k", "mystery/unknown-context", "plain/no-tools"]) {
    assert.ok(!ids.includes(id), `${id} is filtered out of the view`);
  }
});

test("no --model: Hermes starts on the first view row (noted)", () => {
  const { ctx, plan } = run("no-model", { model: null });
  assert.equal(ctx.model, undefined);
  assert.match(configText(plan), /\n {2}default: anthropic\/claude-sonnet-4-6\n/);
  assert.ok(plan.notes.some((n: string) => n.startsWith("No --model given")));
});

test("explicit model sets model.default and pins its catalog window", () => {
  const { plan } = run("explicit-model", { model: "openai/gpt-5.2" });
  const text = configText(plan);
  assert.match(text, /\n {2}default: openai\/gpt-5\.2\n/);
  assert.match(text, /\n {2}context_length: 400000\n/);
  assert.match(text, /\n {4}default_model: openai\/gpt-5\.2\n/);
});

test("unknown-context model: dropped by the view, refused when forced in", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view });
  assert.ok(!ctx.view.rows.some((r: LaunchModelRow) => r.id === "mystery/unknown-context"));
  assert.throws(() =>
    fixtureCtx({ tool: adapter.id, viewSpec: view, model: "mystery/unknown-context" })
  );
  const forced = fixtureCtx({
    tool: adapter.id,
    viewSpec: relaxedView,
    model: "mystery/unknown-context",
  });
  throwsCode(() => adapter.plan(forced), "ModelUnsuitable");
});

test("explicit model below 64k context is ModelUnsuitable", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: relaxedView, model: "small/ctx-32k" });
  throwsCode(() => adapter.plan(ctx), "ModelUnsuitable");
});

test("version below recommended launches with a warning", () => {
  const { plan } = run("below-recommended", { version: "0.15.2" });
  assert.equal(plan.warnings.length, 1);
  assert.match(plan.warnings[0], /0\.15\.2 is older than 0\.16\.0/);
});

test("no hard minimum: a very old version still plans (soft gate), unknown is skipped", () => {
  // Hermes documents only a soft gate, so versionGate.min is absent and
  // ToolVersionTooOld is never thrown by this adapter.
  assert.equal(adapter.capabilities.versionGate!.min, undefined);
  const old = adapter.plan(fixtureCtx({ tool: adapter.id, viewSpec: view, version: "0.1.0" }));
  assert.equal(old.warnings.length, 1);
  const unknown = adapter.plan(
    fixtureCtx({ tool: adapter.id, viewSpec: view, version: "unknown" })
  );
  assert.deepStrictEqual(unknown.warnings, []);
});

test("win32: same placeholders, Windows warning", () => {
  const { plan } = run("win32", { platform: "win32" });
  assert.equal(plan.env.set.HERMES_HOME, "${TMP}");
  assert.equal(plan.env.set.HERMES_GATEWAY_LOCK_DIR, "${TMP}/locks");
  assert.ok(!JSON.stringify(plan).includes("C:\\\\Users"), "nothing points into the user home");
  assert.deepStrictEqual(plan.warnings, [
    "The temp-home recipe and gateway teardown are not yet verified on Windows",
  ]);
});

test("user passthrough args are appended verbatim", () => {
  const args = ["-z", "Reply with the word PONG", "--yolo", "--tui"];
  const { plan } = run("passthrough", { args });
  assert.deepStrictEqual(plan.argv, args);
});

test("owned flags are ConfigConflict", () => {
  for (const args of [
    ["-m", "x"],
    ["--model=x"],
    ["--provider", "openrouter"],
    ["--base-url", "http://elsewhere/v1"],
    ["--api-key", "sk-x"],
  ]) {
    const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, args });
    throwsCode(() => adapter.plan(ctx), "ConfigConflict");
  }
});

test("config-ignoring flags are refused", () => {
  for (const flag of ["--ignore-user-config", "--safe-mode"]) {
    const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, args: ["chat", flag] });
    throwsCode(() => adapter.plan(ctx), "ConfigConflict");
  }
});

test("profile is not supported and does not change the plan", () => {
  const base = adapter.plan(fixtureCtx({ tool: adapter.id, viewSpec: view }));
  const withProfile = adapter.plan(
    fixtureCtx({ tool: adapter.id, viewSpec: view, profile: "work" })
  );
  assert.deepStrictEqual(withProfile, base);
});

test("empty view is ModelNotFound", () => {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, rows: [], model: null });
  throwsCode(() => adapter.plan(ctx), "ModelNotFound");
});

test("other gateway root keeps exactly one /v1", () => {
  const { plan } = run("remote-root", { rootUrl: "https://gw.example.test/v1/", origin: "remote" });
  assert.match(configText(plan), /\n {2}base_url: "https:\/\/gw\.example\.test\/v1"\n/);
});

test("the key site always carries ${TOKEN}, also with the gateway auth off", () => {
  // Core substitutes the minted olx_ session token for ${TOKEN} on every launch, the anonymous
  // posture included, so the plan never has an empty-key or missing-key branch.
  for (const source of ["session", "none"]) {
    const base = fixtureCtx({ tool: adapter.id, viewSpec: view });
    const ctx = { ...base, auth: { ...base.auth, source } } as typeof base;
    const plan = adapter.plan(ctx);
    assert.equal(plan.env.set.OMNIROUTE_API_KEY, "${TOKEN}", `auth.source=${source}`);
    assert.ok(!plan.env.unset.includes("OMNIROUTE_API_KEY"), `auth.source=${source}`);
    assert.deepStrictEqual(plan.secretSites, [{ kind: "env", key: "OMNIROUTE_API_KEY" }]);
    assert.match(configText(plan), /\n {2}key_env: OMNIROUTE_API_KEY\n/);
    assert.match(configText(plan), /\n {4}key_env: OMNIROUTE_API_KEY\n/);
  }
});
