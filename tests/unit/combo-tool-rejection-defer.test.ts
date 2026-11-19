/**
 * Opt-in (OMNIROUTE_TOOL_REJECTION_DEFER): a combo target that answers 3 distinct tool
 * requests with a provider 400 is tried last for tool requests. Plain chat is unaffected,
 * and one served tool request clears the model.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tool-defer-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const tracker = await import("../../open-sse/services/combo/toolRejectionTracker.ts");
const { resolveComboTargetPipeline } =
  await import("../../open-sse/services/combo/targetResolution.ts");

const FLAG = "OMNIROUTE_TOOL_REJECTION_DEFER";
const log = { info() {}, warn() {}, error() {}, debug() {} };
const TOOLS = [{ type: "function", function: { name: "lookup", parameters: {} } }];

test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function reject400() {
  return new Response(JSON.stringify({ error: { message: "tools parameter rejected upstream" } }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}

function ok200() {
  return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

/** One priority-combo request; `bad` answers 400 to tool requests, `good` always serves. */
async function send(bad: string, good: string, n: number, withTools: boolean, badServes = false) {
  const dispatches: string[] = [];
  const body: Record<string, unknown> = {
    messages: [{ role: "user", content: `request ${n} for ${bad}` }],
  };
  if (withTools) body.tools = TOOLS;
  const result = await handleComboChat({
    body,
    combo: { id: `c-${bad}`, name: `combo-${bad}`, strategy: "priority", models: [bad, good] },
    handleSingleModel: async (reqBody: Record<string, unknown>, modelStr: string) => {
      dispatches.push(modelStr);
      return modelStr === bad && Array.isArray(reqBody.tools) && !badServes ? reject400() : ok200();
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });
  assert.equal(result.status, 200);
  return dispatches;
}

test("flag on: 3 distinct tool 400s defer the model to the back for tool requests", async () => {
  process.env[FLAG] = "true";
  const [bad, good] = ["openai/defer-bad-a", "openai/defer-good-a"];
  for (let n = 1; n <= 3; n++) {
    assert.deepEqual(await send(bad, good, n, true), [bad, good], `request ${n} tries bad first`);
  }
  assert.deepEqual(await send(bad, good, 4, true), [good], "request 4 starts on the good model");
});

test("flag on: plain chat still tries the declared order", async () => {
  process.env[FLAG] = "true";
  const [bad, good] = ["openai/defer-bad-b", "openai/defer-good-b"];
  for (let n = 1; n <= 3; n++) await send(bad, good, n, true);
  assert.deepEqual(await send(bad, good, 4, false), [bad]);
});

test("flag on: two rejections are not enough", async () => {
  process.env[FLAG] = "true";
  const [bad, good] = ["openai/defer-bad-c", "openai/defer-good-c"];
  for (let n = 1; n <= 2; n++) await send(bad, good, n, true);
  assert.deepEqual(await send(bad, good, 3, true), [bad, good]);
});

test("flag on: the same request repeated is one distinct request", async () => {
  process.env[FLAG] = "true";
  const [bad, good] = ["openai/defer-bad-d", "openai/defer-good-d"];
  for (let n = 1; n <= 4; n++) await send(bad, good, 1, true);
  assert.deepEqual(await send(bad, good, 1, true), [bad, good]);
});

test("flag off (default): order never changes", async () => {
  delete process.env[FLAG];
  const [bad, good] = ["openai/defer-bad-e", "openai/defer-good-e"];
  for (let n = 1; n <= 5; n++) {
    assert.deepEqual(await send(bad, good, n, true), [bad, good]);
  }
});

test("flag on: a served tool request clears earlier rejections", async () => {
  process.env[FLAG] = "true";
  const [bad, good] = ["openai/defer-bad-f", "openai/defer-good-f"];
  for (let n = 1; n <= 2; n++) await send(bad, good, n, true);
  assert.deepEqual(await send(bad, good, 3, true, true), [bad], "served: no fallback needed");
  for (let n = 4; n <= 5; n++) await send(bad, good, n, true);
  assert.deepEqual(await send(bad, good, 6, true), [bad, good], "count restarted after the serve");
});

const toolBody = (n: number) => ({
  messages: [{ role: "user", content: `tracker request ${n}` }],
  tools: TOOLS,
});
const target = (modelStr: string, connectionId?: string) =>
  ({ modelStr, provider: "openai", connectionId }) as never;

test("flag on: rejection state is kept per connection", () => {
  process.env[FLAG] = "true";
  const a = target("openai/defer-conn", "conn-a");
  const b = target("openai/defer-conn", "conn-b");
  for (let n = 1; n <= 3; n++) tracker.recordToolRejection(a, toolBody(n));
  // A request served on connection B must not clear connection A's rejections.
  tracker.recordToolServed(b, toolBody(4));
  assert.deepEqual(tracker.deferToolRejectingTargets([a, b], toolBody(5)), [b, a]);
});

test("flag on: each target keeps only the most recent distinct rejected requests", () => {
  process.env[FLAG] = "true";
  const t = target("openai/defer-bounded", "conn-bounded");
  for (let n = 1; n <= 50; n++) tracker.recordToolRejection(t, toolBody(n));
  assert.equal(tracker.__toolRejectionHistorySizeForTests(t), 3);
  assert.deepEqual(tracker.deferToolRejectingTargets([t], toolBody(51)), [t]);
});

test("flag on: the target pipeline applies the deferral before it hands back the order", async () => {
  process.env[FLAG] = "true";
  const [bad, good] = ["openai/defer-bad-g", "openai/defer-good-g"];
  for (let n = 1; n <= 3; n++) tracker.recordToolRejection(target(bad), toolBody(n));
  const result = await resolveComboTargetPipeline({
    body: toolBody(4),
    combo: { id: "c-defer-g", name: "combo-defer-g", models: [bad, good], config: {} },
    strategy: "priority",
    config: {},
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => ok200(),
    buildAutoCandidates: async () => [],
  } as never);
  assert.ok(!("earlyResponse" in result), "expected a resolved pipeline");
  assert.deepEqual(
    (result as { orderedTargets: Array<{ modelStr: string }> }).orderedTargets.map(
      (t) => t.modelStr
    ),
    [good, bad]
  );
});
