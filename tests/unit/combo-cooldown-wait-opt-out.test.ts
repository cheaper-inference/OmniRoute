import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-wait-opt-out-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const { createCombo, updateCombo, getComboById } = await import("../../src/lib/db/combos.ts");
const { createComboSchema, updateComboSchema } =
  await import("../../src/shared/validation/schemas/combo.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { resetAllCircuitBreakers, getCircuitBreaker } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { recordModelLockoutFailure, clearAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");

const MODELS = ["openai/gpt-4", "claude/claude-sonnet-4"];
const CONFIG = { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, maxSetRetries: 0 };
const SETTINGS = {
  modelLockout: {
    enabled: true,
    errorCodes: [429],
    baseCooldownMs: 150,
    maxCooldownMs: 2000,
    maxBackoffSteps: 0,
    useExponentialBackoff: false,
  },
  resilienceSettings: {
    comboCooldownWait: { enabled: true, maxWaitMs: 2000, maxAttempts: 1, budgetMs: 3000 },
  },
};
const log = { info() {}, warn() {}, error() {}, debug() {} };

function response(status: number, model: string) {
  return new Response(
    JSON.stringify(
      status === 429
        ? {
            error: { message: `${model} rate limited` },
            retryAfter: new Date(Date.now() + 350).toISOString(),
          }
        : { choices: [{ message: { content: "recovered" } }] }
    ),
    { status, headers: { "Content-Type": "application/json" } }
  );
}

test.beforeEach(() => {
  resetAllComboMetrics();
  resetAllCircuitBreakers();
  clearAllModelLockouts();
});

test.after(() => {
  clearAllModelLockouts();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

for (const optOut of [false, true]) {
  test(`two-target priority 429: ${optOut ? "false skips waiting and redispatch" : "absent preserves waiting and recovery"}`, async (t) => {
    const timer = t.mock.method(globalThis, "setTimeout");
    const calls: string[] = [];
    const res = await handleComboChat({
      body: {},
      combo: {
        name: `wait-opt-out-${optOut}`,
        strategy: "priority",
        models: MODELS,
        config: { ...CONFIG, ...(optOut ? { comboCooldownWaitEnabled: false } : {}) },
      },
      handleSingleModel: async (_body: Record<string, unknown>, model: string) => {
        calls.push(model);
        return response(calls.filter((seen) => seen === model).length === 1 ? 429 : 200, model);
      },
      isModelAvailable: async () => true,
      log,
      settings: SETTINGS,
      allCombos: null,
    });
    const sleeps = timer.mock.calls.filter((call) => {
      const delay = Number(call.arguments[1]);
      return delay > 0 && delay <= SETTINGS.resilienceSettings.comboCooldownWait.maxWaitMs;
    });
    assert.equal(res.status, optOut ? 429 : 200);
    assert.deepEqual(calls, optOut ? MODELS : [...MODELS, MODELS[0]]);
    assert.equal(sleeps.length, optOut ? 0 : 1, "observe actual cooldown sleep scheduling");
  });
}

test("per-combo false bypasses a short pre-dispatch model-lock wait", async (t) => {
  recordModelLockoutFailure("openai", "", "gpt-4", "rate_limit", 429, 0, null, {
    exactCooldownMs: 1000,
  });
  const timer = t.mock.method(globalThis, "setTimeout");
  let calls = 0;
  const res = await handleComboChat({
    body: {},
    combo: {
      name: "opt-out-model-lock",
      strategy: "priority",
      models: [MODELS[0]],
      config: { ...CONFIG, comboCooldownWaitEnabled: false },
    },
    handleSingleModel: async () => {
      calls += 1;
      return response(200, MODELS[0]);
    },
    isModelAvailable: async () => true,
    log,
    settings: SETTINGS,
    allCombos: null,
  });
  assert.equal(res.status, 429);
  assert.equal(calls, 0, "a locked target must not be dispatched or redispatched");
  assert.ok(Number(res.headers.get("Retry-After")) > 0);
  assert.equal(
    timer.mock.calls.filter((call) => Number(call.arguments[1]) <= 2000).length,
    0,
    "no short sleep is scheduled"
  );
});

test("per-combo false bypasses a short pre-dispatch circuit-open wait", async (t) => {
  for (const provider of ["openai", "claude"]) {
    const breaker = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 1000 });
    await assert.rejects(
      breaker.execute(async () => Promise.reject(new Error("synthetic failure")))
    );
    assert.equal(breaker.getStatus().state, "OPEN");
  }
  const timer = t.mock.method(globalThis, "setTimeout");
  let calls = 0;
  const res = await handleComboChat({
    body: {},
    combo: {
      name: "opt-out-circuit-open",
      strategy: "priority",
      models: MODELS,
      config: { ...CONFIG, comboCooldownWaitEnabled: false },
    },
    handleSingleModel: async () => {
      calls += 1;
      return response(200, MODELS[0]);
    },
    isModelAvailable: async () => true,
    log,
    settings: SETTINGS,
    allCombos: null,
  });
  assert.equal(res.status, 503);
  assert.equal(calls, 0, "open breakers must not be retried after waiting");
  assert.ok(Number(res.headers.get("Retry-After")) > 0);
  assert.equal(
    timer.mock.calls.filter((call) => Number(call.arguments[1]) <= 2000).length,
    0,
    "no short sleep is scheduled"
  );
});

test("create/update boolean false survives SQLite persistence and returned records", async () => {
  const created = await createCombo(
    createComboSchema.parse({
      name: "persist-wait-opt-out",
      models: MODELS,
      config: { comboCooldownWaitEnabled: false },
    })
  );
  assert.equal(created.config?.comboCooldownWaitEnabled, false);
  const id = String(created.id);
  assert.equal((await getComboById(id))?.config?.comboCooldownWaitEnabled, false);
  await updateCombo(id, updateComboSchema.parse({ config: { comboCooldownWaitEnabled: true } }));
  const updated = await updateCombo(
    id,
    updateComboSchema.parse({ config: { comboCooldownWaitEnabled: false } })
  );
  assert.equal(updated?.config?.comboCooldownWaitEnabled, false);
  assert.equal((await getComboById(id))?.config?.comboCooldownWaitEnabled, false);
});
