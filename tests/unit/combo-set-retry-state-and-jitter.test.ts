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
