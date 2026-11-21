/**
 * Regression coverage for the iterative cooldown/set-retry loop in
 * dispatchWithCooldownRetry and for the jitter helper used by blind retries.
 *
 * - #7360: lastStatus/earliestRetryAfter persist across set retries. A model that
 *   locked out on set 0 is pre-skipped on sets 1..N; the final answer must still be
 *   the upstream 429, not a bogus 503.
 * - Waits derived from a known deadline (model lock expiry) are never jittered
 *   downwards: the re-dispatch happens only after the lock has cleared.
 * - calculateFullJitter stays inside [0, cap] and honours an injected RNG.
 * - The per-target retry delay and the set-retry delay really go through that jitter.
 * - A cooldown re-dispatch restarts the set counter, exactly like the old recursive call.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-combo-set-retry-jitter-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-combo-set-retry-jitter-secret";

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");
const { calculateFullJitter } = await import("../../open-sse/utils/jitterBackoff.ts");

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

function lockoutSettings(baseCooldownMs: number) {
  return {
    modelLockout: {
      enabled: true,
      errorCodes: [403, 429],
      baseCooldownMs,
      maxCooldownMs: 60_000,
      maxBackoffSteps: 0,
      useExponentialBackoff: false,
    },
  };
}

function rateLimit(retryAfterMs: number) {
  return new Response(
    JSON.stringify({
      error: { message: "rate limited (429)" },
      retryAfter: new Date(Date.now() + retryAfterMs).toISOString(),
    }),
    { status: 429, headers: { "content-type": "application/json" } }
  );
}

function serverError() {
  return new Response(JSON.stringify({ error: { message: "upstream exploded" } }), {
    status: 500,
    headers: { "content-type": "application/json" },
  });
}

function success() {
  return new Response(JSON.stringify({ id: "ok", choices: [{ message: { content: "ok" } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function withRandom<T>(value: number, run: () => Promise<T>): Promise<T> {
  const originalRandom = Math.random;
  Math.random = () => value;
  try {
    return await run();
  } finally {
    Math.random = originalRandom;
  }
}

test.beforeEach(() => {
  clearAllModelLockouts();
});

test.after(() => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best effort */
  }
});

test("set retries keep the upstream 429 once the locked model is pre-skipped (#7360)", async () => {
  let calls = 0;
  const res = await handleComboChat({
    body: { model: "default" },
    combo: {
      name: `set-retry-${Math.random().toString(16).slice(2, 8)}`,
      strategy: "priority",
      models: ["openai/gpt-4"],
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        maxSetRetries: 2,
        setRetryDelayMs: 0,
      },
    },
    handleSingleModel: async () => {
      calls += 1;
      return rateLimit(30_000);
    },
    isModelAvailable: async () => true,
    log: createLog() as never,
    settings: {
      ...lockoutSettings(30_000),
      resilienceSettings: { comboCooldownWait: { enabled: false } },
    },
    allCombos: null,
  });

  assert.equal(calls, 1, "the locked model is pre-skipped on the later set retries");
  assert.equal(res.status, 429, `expected the upstream 429, got ${res.status}`);
});

test("cooldown wait is never jittered below the model lock expiry", async () => {
  const LOCK_MS = 400;
  const dispatchedAt: number[] = [];
  const originalRandom = Math.random;
  // Worst case for a full-jitter implementation: the RNG always yields ~0.
  Math.random = () => 0;
  try {
    const res = await handleComboChat({
      body: { model: "default" },
      combo: {
        name: `lock-wait-${Math.random().toString(16).slice(2, 8)}`,
        strategy: "priority",
        models: ["openai/gpt-4"],
        config: {
          maxRetries: 0,
          retryDelayMs: 0,
          fallbackDelayMs: 0,
          maxSetRetries: 0,
        },
      },
      handleSingleModel: async () => {
        dispatchedAt.push(Date.now());
        if (dispatchedAt.length === 1) return rateLimit(LOCK_MS);
        return new Response(
          JSON.stringify({ id: "ok", choices: [{ message: { content: "ok" } }] }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          }
        );
      },
      isModelAvailable: async () => true,
      log: createLog() as never,
      settings: lockoutSettings(LOCK_MS),
      allCombos: null,
    });

    assert.equal(res.status, 200);
    assert.equal(dispatchedAt.length, 2);
    assert.ok(
      dispatchedAt[1] - dispatchedAt[0] >= LOCK_MS - 50,
      `re-dispatch fired ${dispatchedAt[1] - dispatchedAt[0]}ms after the 429, before the ${LOCK_MS}ms lock cleared`
    );
  } finally {
    Math.random = originalRandom;
  }
});

test("the per-target retry delay goes through full jitter", async () => {
  const messages: string[] = [];
  const dispatchedAt: number[] = [];
  const res = await withRandom(0, () =>
    handleComboChat({
      body: { model: "default" },
      combo: {
        name: "retry-jitter-floor",
        strategy: "priority",
        models: ["openai/gpt-4"],
        config: { maxRetries: 1, retryDelayMs: 5_000, fallbackDelayMs: 0, maxSetRetries: 0 },
      },
      handleSingleModel: async () => {
        dispatchedAt.push(Date.now());
        return dispatchedAt.length === 1 ? serverError() : success();
      },
      isModelAvailable: async () => true,
      log: { ...createLog(), info: (_tag: string, msg: string) => messages.push(msg) } as never,
      settings: {},
      allCombos: null,
    })
  );

  assert.equal(res.status, 200);
  assert.equal(dispatchedAt.length, 2);
  assert.ok(
    messages.some((msg) => msg.startsWith("Retrying openai/gpt-4 in 0ms")),
    "the retry must log the jittered delay, not the 5000ms base"
  );
  assert.ok(dispatchedAt[1] - dispatchedAt[0] < 2_500, "the retry must sleep the jittered delay");
});

test("the set-retry delay goes through full jitter", async () => {
  const dispatchedAt: number[] = [];
  const res = await withRandom(0, () =>
    handleComboChat({
      body: { model: "default" },
      combo: {
        name: "set-retry-jitter-floor",
        strategy: "priority",
        models: ["openai/gpt-4"],
        config: {
          maxRetries: 0,
          retryDelayMs: 0,
          fallbackDelayMs: 0,
          maxSetRetries: 1,
          setRetryDelayMs: 5_000,
        },
      },
      handleSingleModel: async () => {
        dispatchedAt.push(Date.now());
        return dispatchedAt.length === 1 ? serverError() : success();
      },
      isModelAvailable: async () => true,
      log: createLog() as never,
      settings: {},
      allCombos: null,
    })
  );

  assert.equal(res.status, 200);
  assert.equal(dispatchedAt.length, 2);
  assert.ok(
    dispatchedAt[1] - dispatchedAt[0] < 2_500,
    "the set retry must sleep the jittered delay"
  );
});

test("a set-retry delay above the default jitter cap keeps its own ceiling", async () => {
  const SET_RETRY_DELAY_MS = 60_000;
  const RANDOM = 0.005;
  const dispatchedAt: number[] = [];
  const res = await withRandom(RANDOM, () =>
    handleComboChat({
      body: { model: "default" },
      combo: {
        name: "set-retry-jitter-ceiling",
        strategy: "priority",
        models: ["openai/gpt-4"],
        config: {
          maxRetries: 0,
          retryDelayMs: 0,
          fallbackDelayMs: 0,
          maxSetRetries: 1,
          setRetryDelayMs: SET_RETRY_DELAY_MS,
        },
      },
      handleSingleModel: async () => {
        dispatchedAt.push(Date.now());
        return dispatchedAt.length === 1 ? serverError() : success();
      },
      isModelAvailable: async () => true,
      log: createLog() as never,
      settings: {},
      allCombos: null,
    })
  );

  assert.equal(res.status, 200);
  const elapsedMs = dispatchedAt[1] - dispatchedAt[0];
  // A 30s ceiling would sleep 150ms here. Timers never fire early, so this cannot flake.
  assert.ok(elapsedMs >= SET_RETRY_DELAY_MS * RANDOM - 5, `slept only ${elapsedMs}ms`);
});

test("a cooldown re-dispatch restarts the set counter, as the recursive call did", async () => {
  const LOCK_MS = 120;
  const messages: string[] = [];
  let calls = 0;
  const res = await handleComboChat({
    body: { model: "default" },
    combo: {
      name: `redispatch-${Math.random().toString(16).slice(2, 8)}`,
      strategy: "priority",
      models: ["openai/gpt-4"],
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        maxSetRetries: 1,
        setRetryDelayMs: 0,
      },
    },
    handleSingleModel: async () => {
      calls += 1;
      return calls <= 2 ? rateLimit(LOCK_MS) : success();
    },
    isModelAvailable: async () => true,
    log: { ...createLog(), info: (_tag: string, msg: string) => messages.push(msg) } as never,
    settings: lockoutSettings(LOCK_MS),
    allCombos: null,
  });

  assert.equal(res.status, 200);
  assert.equal(calls, 3);
  // Without the reset the re-dispatch stays on set 1 and logs a set retry per pass (3).
  assert.equal(messages.filter((msg) => msg.includes("retrying set (1/1)")).length, 2);
});

test("calculateFullJitter stays within [0, capped exponential] and uses the injected RNG", () => {
  assert.equal(calculateFullJitter(0, { baseDelayMs: 100, random: () => 0 }), 0);
  assert.equal(calculateFullJitter(0, { baseDelayMs: 100, random: () => 0.5 }), 50);
  // attempt 3 => 100 * 2^3 = 800
  assert.equal(calculateFullJitter(3, { baseDelayMs: 100, random: () => 0.5 }), 400);
  // capped by maxDelayMs
  assert.equal(
    calculateFullJitter(10, { baseDelayMs: 100, maxDelayMs: 1_000, random: () => 0.999999 }),
    999
  );
  for (let i = 0; i < 200; i++) {
    const v = calculateFullJitter(2, { baseDelayMs: 100, maxDelayMs: 250 });
    assert.ok(v >= 0 && v < 250, `value ${v} escaped [0, 250)`);
  }
});
