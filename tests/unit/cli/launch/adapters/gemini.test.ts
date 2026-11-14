// Gemini CLI adapter tests. Recipe lines map to dossier tools/gemini.md:
// - env GEMINI_CLI_HOME=${TMP}, settings merged over the user's: section 3 "Recommended"
// - GOOGLE_GEMINI_BASE_URL is the root (no /v1beta): section 2 Protocol
// - selectedType gemini-api-key (avoids GATEWAY auth, exit 41): section 3 hard facts
// - bearer mechanism + GEMINI_API_KEY in env only: section 3 "Key travels in env"
// - unset GOOGLE_GENAI_API_VERSION, GEMINI_MODEL, ...: section 3 env -u list, section 5
// - aux alias remap, tools.exclude for non-Gemini ids, compressionThreshold: section 4
// - privacy / update / IDE nudge keys: section 5
// - --acp rejected, --sandbox warned, no auto-trust: section 3 bullets, section 8
// - version gate min 0.25, recommended 0.68: section 1
import { test } from "node:test";
import assert from "node:assert/strict";
import type { LaunchPlan } from "../../../../../bin/cli/launch/contract.d.ts";
import adapter from "../../../../../bin/cli/launch/adapters/gemini.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const view = adapter.capabilities.modelList.view;

function run(name: string, overrides: Record<string, unknown> = {}) {
  const ctx = fixtureCtx({ tool: adapter.id, viewSpec: view, ...overrides });
  const plan = adapter.plan(ctx);
  checkPlanInvariants(plan, ctx, { adapter, singleModel: ctx.model.id });
  assertGolden(adapter.id, name, plan);
  return { ctx, plan };
}

const settingsOf = (plan: LaunchPlan) => JSON.parse(plan.tempFiles[0].contents);

test("default", () => {
  const { plan } = run("default");
  assert.deepEqual(plan.argv, ["-m", "anthropic/claude-sonnet-4-6"]);
  assert.equal(plan.env.set.GOOGLE_GEMINI_BASE_URL, "http://127.0.0.1:20128");
  assert.equal(plan.env.set.GEMINI_API_KEY, "${TOKEN}");
  assert.equal(plan.env.set.GEMINI_CLI_HOME, "${TMP}");
  assert.equal(plan.tempFiles[0].mergeBase.path, "/home/fixture/.gemini/settings.json");
  const s = settingsOf(plan);
  assert.equal(s.security.auth.selectedType, "gemini-api-key");
  assert.equal(s.model.compressionThreshold, 0.095);
  assert.deepEqual(s.tools.exclude, ["google_web_search", "web_fetch"]);
  assert.ok(
    plan.secretSites.some(
      (x: { kind: string; key: string }) => x.kind === "env" && x.key === "GEMINI_API_KEY"
    )
  );
});

test("unknown-context", () => {
  const { plan } = run("unknown-context", { model: "mystery/unknown-context" });
  assert.equal(settingsOf(plan).model, undefined);
  assert.ok(plan.notes.some((n: string) => /unknown/.test(n)));
});

test("gemini-model keeps web tools", () => {
  const rows = [
    {
      id: "google/gemini-3-pro",
      label: "Gemini 3 Pro",
      contextTokens: 1048576,
      capabilities: ["tool_calling"],
      kind: "model",
    },
  ];
  const { plan } = run("gemini-model", { rows });
  const s = settingsOf(plan);
  assert.equal(s.tools, undefined);
  assert.equal(s.model.compressionThreshold, 0.5);
  assert.equal(s.modelConfigs.customAliases["web-search"].modelConfig.model, "google/gemini-3-pro");
});

test("version-below-recommended", () => {
  const { plan } = run("version-below-recommended", { version: "0.30.1" });
  assert.equal(plan.warnings.length, 1);
  assert.match(plan.warnings[0], /0\.68\.0/);
});

test("win32", () => {
  const { plan } = run("win32", { platform: "win32" });
  assert.equal(plan.tempFiles[0].mergeBase.path, "C:\\Users\\fixture\\.gemini\\settings.json");
  assert.equal(
    plan.env.set.GEMINI_CLI_TRUSTED_FOLDERS_PATH,
    "C:\\Users\\fixture\\.gemini\\trustedFolders.json"
  );
});

test("passthrough", () => {
  const { plan } = run("passthrough", { args: ["--sandbox", "-p", "hi"] });
  assert.deepEqual(plan.argv.slice(-3), ["--sandbox", "-p", "hi"]);
  assert.equal(plan.warnings.length, 1);
  assert.match(plan.warnings[0], /24828/);
});

test("remote-gateway", () => {
  const { plan } = run("remote-gateway", {
    rootUrl: "https://gw.example.com/",
    origin: "remote",
    env: {
      GEMINI_MODEL: "gemini-2.5-pro",
      GOOGLE_GENAI_API_VERSION: "v1",
      NO_PROXY: "corp.local,localhost",
    },
  });
  assert.equal(plan.env.set.GOOGLE_GEMINI_BASE_URL, "https://gw.example.com");
  assert.equal(plan.env.set.NO_PROXY, "127.0.0.1,localhost,corp.local");
  assert.ok(plan.env.unset.includes("GEMINI_MODEL"));
  assert.ok(plan.env.unset.includes("GOOGLE_GENAI_API_VERSION"));
});

test("custom-gemini-home", () => {
  const { plan } = run("custom-gemini-home", { env: { GEMINI_CLI_HOME: "/opt/gh" } });
  assert.equal(plan.tempFiles[0].mergeBase.path, "/opt/gh/.gemini/settings.json");
  assert.equal(plan.env.set.GEMINI_CLI_TRUSTED_FOLDERS_PATH, "/opt/gh/.gemini/trustedFolders.json");
});

test("existing trusted folders path is kept", () => {
  const { plan } = run("trusted-path-set", {
    env: { GEMINI_CLI_TRUSTED_FOLDERS_PATH: "/x/t.json" },
  });
  assert.equal(plan.env.set.GEMINI_CLI_TRUSTED_FOLDERS_PATH, undefined);
});

test("env.unset is sorted, unique, disjoint from set", () => {
  const { plan } = run("default");
  assert.deepEqual(plan.env.unset, [...new Set(plan.env.unset)].sort());
  for (const key of plan.env.unset) assert.ok(!(key in plan.env.set));
});

test("throws", () => {
  const base = { tool: adapter.id, viewSpec: view };
  assert.throws(() => adapter.plan(fixtureCtx({ ...base, version: "0.1.7" })), {
    name: "LaunchError",
    code: "ToolVersionTooOld",
  });
  assert.throws(() => adapter.plan(fixtureCtx({ ...base, rows: [] })), {
    name: "LaunchError",
    code: "ModelNotFound",
  });
  assert.throws(() => adapter.plan(fixtureCtx({ ...base, model: null })), {
    name: "LaunchError",
    code: "ModelRequired",
  });
  for (const flag of ["--acp", "--experimental-acp"]) {
    assert.throws(() => adapter.plan(fixtureCtx({ ...base, args: [flag] })), {
      name: "LaunchError",
      code: "ConfigConflict",
    });
  }
});

test("one-shot -p adds --skip-trust", () => {
  const { plan } = run("one-shot", { args: ["-p", "hi"] });
  assert.deepEqual(plan.argv, ["-m", "anthropic/claude-sonnet-4-6", "--skip-trust", "-p", "hi"]);
  assert.ok(!plan.notes.some((n: string) => /Folder trust stays on/.test(n)));
});

test("one-shot --prompt=x adds --skip-trust", () => {
  const { plan } = run("one-shot-long", { args: ["--prompt=hi"] });
  assert.deepEqual(plan.argv, ["-m", "anthropic/claude-sonnet-4-6", "--skip-trust", "--prompt=hi"]);
});

test("one-shot with user --skip-trust is not duplicated", () => {
  const { plan } = run("one-shot-user-skip-trust", { args: ["--skip-trust", "-p", "hi"] });
  assert.deepEqual(plan.argv, ["-m", "anthropic/claude-sonnet-4-6", "--skip-trust", "-p", "hi"]);
});

test("no prompt flag leaves argv unchanged", () => {
  const { plan } = run("no-prompt", { args: ["--approval-mode", "yolo"] });
  assert.deepEqual(plan.argv, ["-m", "anthropic/claude-sonnet-4-6", "--approval-mode", "yolo"]);
  assert.ok(plan.notes.some((n: string) => /Folder trust stays on/.test(n)));
});
