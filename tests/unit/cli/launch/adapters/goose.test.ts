// goose adapter golden tests. Recipe sources, all in tools/goose.md (olaunch dossier):
// - Tier "supported", binary `goose`: header + section 1 (Identity).
// - Install commands and URL: section 1 (download_cli.sh with CONFIGURE=false, brew, ps1).
// - Version gate min 1.59.0 (no separate recommended): section 1 "Minimum version".
// - protocol openai-chat, GOOSE_PROVIDER=openai, OPENAI_BASE_URL=<root>/v1: section 2 "Primary
//   route" and section 3 recipe block.
// - OPENAI_BASE_PATH=/v1/chat/completions (leading slash): section 2 "DANGER (Responses
//   auto-switch)".
// - GOOSE_PATH_ROOT=${TMP}, GOOSE_DISABLE_KEYRING=1, GOOSE_TELEMETRY_OFF=1: section 3 "Full
//   isolation" and section 5 "Telemetry".
// - OPENAI_API_KEY from env only, always set: section 3 "API key".
// - env scrub list: section 3 "Scrub inherited env".
// - argv "session" as explicit subcommand, warn on --provider/--model: section 3 "Extra user
//   args after `--`".
// - GOOSE_CONTEXT_LIMIT from the picked model: section 4 "Launcher options" (one global value);
//   unknown context leaves goose on its 128000 default (section 4 resolution order).
// - Reasoning suffix mangling warning: section 5 "Model-name mangling".
// - Open questions picked per section 8: see the adapter's "Deviations / open items" block.
import { test } from "node:test";
import assert from "node:assert/strict";

import adapter from "../../../../../bin/cli/launch/adapters/goose.mjs";
import { fixtureCtx } from "../_helpers/fixtureCtx.mjs";
import { assertGolden, checkPlanInvariants } from "../_helpers/golden.mjs";

const viewSpec = adapter.capabilities.modelList.view;
const base = { tool: adapter.id, viewSpec, version: "1.59.0" };

// server-view injects nothing: `serverView: true` asserts injected === 0 (not the full view).
type Plan = ReturnType<typeof adapter.plan>;
type Ctx = Parameters<typeof adapter.plan>[0];
const hasCode = (code: string) => (err: unknown) => (err as { code?: string }).code === code;

function check(plan: Plan, ctx: Ctx) {
  checkPlanInvariants(plan, ctx, { adapter, serverView: true });
}

test("goose: default plan", () => {
  const ctx = fixtureCtx({ ...base, model: "anthropic/claude-sonnet-4-6" });
  const plan = adapter.plan(ctx);
  check(plan, ctx);
  assertGolden("goose", "default", plan);
  assert.equal(plan.env.set.GOOSE_CONTEXT_LIMIT, "200000");
  assert.equal(plan.env.set.OPENAI_API_KEY, "${TOKEN}");
  assert.equal(plan.env.set.OPENAI_BASE_PATH, "/v1/chat/completions");
  assert.equal(plan.modelList.injected, 0);
  assert.equal(plan.modelList.strategy, "server-view");
  assert.equal(plan.needsTempDir, true);
  assert.deepEqual(plan.argv, ["session"]);
  assert.ok(!JSON.stringify(plan.argv).includes("${TOKEN}"));
});

test("goose: gpt-5 id keeps the chat completions path", () => {
  const ctx = fixtureCtx({ ...base, model: "openai/gpt-5.2" });
  const plan = adapter.plan(ctx);
  check(plan, ctx);
  assert.equal(plan.env.set.OPENAI_BASE_PATH, "/v1/chat/completions");
  assert.equal(plan.env.set.GOOSE_MODEL, "openai/gpt-5.2");
});

test("goose: model without known context leaves GOOSE_CONTEXT_LIMIT unset", () => {
  const ctx = fixtureCtx({ ...base, model: "mystery/unknown-context" });
  const plan = adapter.plan(ctx);
  check(plan, ctx);
  assertGolden("goose", "unknown-context", plan);
  assert.ok(!("GOOSE_CONTEXT_LIMIT" in plan.env.set));
  assert.ok(plan.env.unset.includes("GOOSE_CONTEXT_LIMIT"));
  assert.equal(plan.warnings.length, 1);
});

test("goose: version below min throws ToolVersionTooOld", () => {
  const ctx = fixtureCtx({ ...base, version: "1.58.9" });
  assert.throws(() => adapter.plan(ctx), hasCode("ToolVersionTooOld"));
});

test("goose: win32", () => {
  const ctx = fixtureCtx({ ...base, platform: "win32", shell: false });
  const plan = adapter.plan(ctx);
  check(plan, ctx);
  assertGolden("goose", "win32", plan);
});

test("goose: user passthrough args and inherited env scrub", () => {
  const ctx = fixtureCtx({
    ...base,
    args: ["--with-builtin", "developer", "--model", "x"],
    env: { ANTHROPIC_API_KEY: "k", GOOSE_TOOLSHIM_FOO: "1", GOOSE_PROVIDER: "anthropic" },
  });
  const plan = adapter.plan(ctx);
  check(plan, ctx);
  assertGolden("goose", "passthrough", plan);
  assert.deepEqual(plan.argv, ["session", "--with-builtin", "developer", "--model", "x"]);
  assert.ok(plan.env.unset.includes("ANTHROPIC_API_KEY"));
  assert.ok(plan.env.unset.includes("GOOSE_TOOLSHIM_FOO"));
  assert.ok(!plan.env.unset.includes("GOOSE_PROVIDER"));
  const flags = (adapter.capabilities.passthrough ?? []).map(
    (r: { flag: string; action: string }) => [r.flag, r.action]
  );
  assert.deepEqual(flags, [
    ["--provider", "warn"],
    ["--model", "warn"],
  ]);
});

test("goose: reasoning suffix on a responses-routed id warns", () => {
  const rows = [
    {
      id: "my/gpt-5-high",
      contextTokens: 200000,
      capabilities: ["tool_calling"],
      kind: "model" as const,
    },
  ];
  const ctx = fixtureCtx({ ...base, rows, model: "my/gpt-5-high" });
  const plan = adapter.plan(ctx);
  check(plan, ctx);
  assert.equal(plan.warnings.length, 1);
});

test("goose: empty view throws ModelNotFound", () => {
  const ctx = fixtureCtx({ ...base, rows: [] });
  assert.throws(
    () => adapter.plan(ctx),
    (err: unknown) => hasCode("ModelNotFound")(err) && Boolean((err as { hint?: string }).hint)
  );
});

test("goose: no model throws ModelRequired", () => {
  const ctx = fixtureCtx({ ...base, model: null });
  assert.throws(() => adapter.plan(ctx), hasCode("ModelRequired"));
});

test("goose: explicit model below minContextTokens throws ModelUnsuitable", () => {
  const loose = { name: "goose-loose", filter: {}, order: "catalog" as const };
  const rows = [
    {
      id: "tiny/ctx-16k",
      contextTokens: 16384,
      capabilities: ["tool_calling"],
      kind: "model" as const,
    },
  ];
  const ctx = fixtureCtx({ ...base, viewSpec: loose, rows, model: "tiny/ctx-16k" });
  assert.ok((ctx.model?.contextTokens ?? 0) < (adapter.capabilities.minContextTokens ?? 0));
  assert.throws(() => adapter.plan(ctx), hasCode("ModelUnsuitable"));
});

test("goose: one-shot passthrough replaces the default session subcommand", () => {
  const ctx = fixtureCtx({
    ...base,
    args: ["run", "--no-session", "-q", "-t", "reply with OK"],
  });
  const plan = adapter.plan(ctx);
  check(plan, ctx);
  assertGolden("goose", "one-shot", plan);
  assert.deepEqual(plan.argv, ["run", "--no-session", "-q", "-t", "reply with OK"]);
});

test("goose: no passthrough and non one-shot passthrough keep the session subcommand", () => {
  const none = adapter.plan(fixtureCtx({ ...base }));
  assert.deepEqual(none.argv, ["session"]);
  const other = adapter.plan(fixtureCtx({ ...base, args: ["--resume", "run"] }));
  assert.deepEqual(other.argv, ["session", "--resume", "run"]);
});
