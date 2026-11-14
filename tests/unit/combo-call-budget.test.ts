import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-call-budget-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { resolveComboTargetPipeline } =
  await import("../../open-sse/services/combo/targetResolution.ts");
const { clearAllStickyBindings } =
  await import("../../open-sse/services/combo/sessionStickiness.ts");
const budget = await import("../../open-sse/services/combo/comboCallBudget.ts").catch(() => null);

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  clearAllStickyBindings();
  budget?.resetComboCallBudgets();
});

const noopLog = { info() {}, warn() {}, error() {}, debug() {} } as never;
const MODELS = ["openai/gpt-4o", "anthropic/claude-3", "gemini/gemini-2.5-pro"];

async function resolve(name: string, config: Record<string, unknown>) {
  const result = await resolveComboTargetPipeline({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { id: name, name, models: MODELS, config },
    strategy: "priority",
    config,
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: noopLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
  } as never);
  assert.ok(!("earlyResponse" in result), "expected a resolved pipeline");
  return (result as { orderedTargets: Array<{ modelStr: string }> }).orderedTargets.map(
    (target) => target.modelStr
  );
}

test("combo over its call budget dispatches the first target only", async () => {
  const config = { budgetCalls: 2, budgetWindowMs: 60_000 };
  assert.deepEqual(await resolve("cap-a", config), MODELS);
  assert.deepEqual(await resolve("cap-a", config), MODELS);
  assert.deepEqual(await resolve("cap-a", config), [MODELS[0]]);
});

test("a withheld request is charged too, so the combo stays degraded inside the window", async () => {
  const config = { budgetCalls: 1, budgetWindowMs: 60_000 };
  await resolve("cap-b", config);
  assert.deepEqual(await resolve("cap-b", config), [MODELS[0]]);
  assert.deepEqual(await resolve("cap-b", config), [MODELS[0]]);
});

test("the full target list returns when the window has passed", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 1_000_000 });
  const config = { budgetCalls: 1, budgetWindowMs: 60_000 };
  await resolve("cap-c", config);
  assert.deepEqual(await resolve("cap-c", config), [MODELS[0]]);
  t.mock.timers.tick(60_000);
  assert.deepEqual(await resolve("cap-c", config), MODELS);
});

test("each combo keeps its own counter and window", async () => {
  const config = { budgetCalls: 1, budgetWindowMs: 60_000 };
  await resolve("cap-d1", config);
  assert.deepEqual(await resolve("cap-d1", config), [MODELS[0]]);
  assert.deepEqual(await resolve("cap-d2", config), MODELS);
});

test("no budgetCalls: every request keeps the full target list (default off)", async () => {
  for (let i = 0; i < 5; i++) assert.deepEqual(await resolve("cap-e", {}), MODELS);
});
