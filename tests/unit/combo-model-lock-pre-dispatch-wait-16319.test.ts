/**
 * #16319 — a combo whose every target is skipped before dispatch by a SHORT,
 * transient model lockout answered a bare 503 ALL_TARGETS_SKIPPED in ~100ms:
 * the zero-attempt branch only consulted the circuit-open wait, and the
 * general cooldown wait is gated on state.earliestRetryAfter, which nothing
 * populates when no attempt was dispatched. The zero-attempt branch now also
 * consults resolveComboCooldownWaitDecision (lock-remaining driven; quota,
 * auth and not-found locks excluded) and re-dispatches; when no wait is
 * allowed, the terminal response upgrades to 429 with the earliest transient
 * lock expiry instead of a hint-less 503.
 *
 * Harness mirrors tests/unit/combo-priority-all-circuit-open.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-lock-wait-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const { resetAllComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { recordModelLockoutFailure, clearAllModelLockouts, getModelLockoutInfo, isModelLocked } =
  await import("../../open-sse/services/accountFallback.ts");

const log = { info() {}, warn() {}, error() {}, debug() {} };

function run(
  comboOverrides: Record<string, unknown>,
  settings: Record<string, unknown> | null,
  isModelAvailable: () => Promise<boolean> = async () => true
) {
  const calls: string[] = [];
  const promise = handleComboChat({
    body: {},
    combo: {
      name: "glm-flash",
      strategy: "priority",
      models: ["zai/glm-5.3-flash"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
      ...comboOverrides,
    },
    handleSingleModel: async (_body: Record<string, unknown>, modelStr: string) => {
      calls.push(modelStr);
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
    isModelAvailable,
    log,
    settings,
    allCombos: null,
  });
  return { promise, calls };
}

test.beforeEach(() => {
  resetAllComboMetrics();
  clearAllModelLockouts();
});

test.after(() => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

test("a short transient model lock is waited out and the combo re-dispatches (#16319)", async () => {
  // The reported shape: the previous request just finished, the next one lands
  // 0.5s later with the model lock still ~8s from expiry. A SHORT lock (1.2s)
  // must be waited out inside comboCooldownWait, not crystallized as a 503.
  recordModelLockoutFailure("zai", "", "glm-5.3-flash", "rate_limit", 429, 0, null, {
    exactCooldownMs: 1200,
  });
  const started = Date.now();
  const { promise, calls } = run({}, null);
  const res = await promise;
  const elapsed = Date.now() - started;

  assert.equal(res.status, 200);
  assert.deepEqual(calls, ["zai/glm-5.3-flash"], "the target must be retried after the wait");
  assert.ok(elapsed >= 1100, `expected to wait out the ~1.2s lock, took ${elapsed}ms`);
});

test("an unpinned target is not skipped while another connection is free (#16551)", async () => {
  recordModelLockoutFailure("zai", "connection-1", "glm-5.3-flash", "rate_limit", 429, 0, null, {
    exactCooldownMs: 1200,
  });
  assert.equal(isModelLocked("zai", "", "glm-5.3-flash"), false);
  assert.equal(getModelLockoutInfo("zai", "connection-2", "glm-5.3-flash"), null);

  const started = Date.now();
  const { promise, calls } = run({}, null);
  const res = await promise;
  const elapsed = Date.now() - started;

  assert.equal(res.status, 200);
  assert.deepEqual(calls, ["zai/glm-5.3-flash"], "the pre-dispatch gate must not skip");
  assert.ok(elapsed < 1000, `a free connection must not be waited out, took ${elapsed}ms`);
});

test("every locked connection waits on the earliest transient expiry (#16551)", async () => {
  recordModelLockoutFailure(
    "zai",
    "connection-quota",
    "glm-5.3-flash",
    "quota_exhausted",
    429,
    0,
    null,
    {
      exactCooldownMs: 400,
    }
  );
  recordModelLockoutFailure("zai", "connection-1", "glm-5.3-flash", "rate_limit", 429, 0, null, {
    exactCooldownMs: 4000,
  });
  recordModelLockoutFailure("zai", "connection-2", "glm-5.3-flash", "rate_limit", 429, 0, null, {
    exactCooldownMs: 1200,
  });

  const started = Date.now();
  const { promise, calls } = run(
    {},
    {
      resilienceSettings: {
        comboCooldownWait: { enabled: true, maxWaitMs: 2000, maxAttempts: 1, budgetMs: 300_000 },
      },
    },
    async () => false
  );
  const res = await promise;
  const elapsed = Date.now() - started;

  assert.equal(calls.length, 0, "a fully locked pool must not dispatch");
  assert.ok(elapsed >= 1100, `expected the earliest ~1.2s transient lock, took ${elapsed}ms`);
  assert.ok(elapsed < 2500, `must not wait out the later 4s lock, took ${elapsed}ms`);
  assert.equal(res.status, 429);
});

test("a quota model lock is never waited out and advertises no model-lock retry-after", async () => {
  // quota_exhausted locks run to midnight — the cooldown-wait helper excludes
  // them, and the terminal response must not stitch their expiry onto a 429.
  recordModelLockoutFailure("zai", "", "glm-5.3-flash", "quota_exhausted", 429, 0, null, {
    exactCooldownMs: 60_000,
  });
  const started = Date.now();
  const { promise, calls } = run({}, null);
  const res = await promise;
  const elapsed = Date.now() - started;

  assert.equal(res.status, 503);
  assert.deepEqual(calls, [], "no upstream call is made for a quota-locked target");
  assert.ok(elapsed < 1000, `quota lock must not be waited out, took ${elapsed}ms`);
  const body = (await res.json()) as { error?: { code?: string; retry_after?: number } };
  assert.equal(body.error?.code, "ALL_TARGETS_SKIPPED");
  assert.ok(!body.error?.retry_after, "a quota lock must not produce a retry hint");
});

test("when no wait is allowed the skipped response upgrades to 429 with the transient lock expiry", async () => {
  recordModelLockoutFailure("zai", "", "glm-5.3-flash", "rate_limit", 429, 0, null, {
    exactCooldownMs: 1200,
  });
  // Lock (1.2s) exceeds the configured wait ceiling (0.4s) → no wait, but the
  // client still learns when to come back instead of reading an outage.
  const started = Date.now();
  const { promise, calls } = run(
    {},
    {
      resilienceSettings: {
        comboCooldownWait: { enabled: true, maxWaitMs: 400, maxAttempts: 5, budgetMs: 300_000 },
      },
    }
  );
  const res = await promise;
  const elapsed = Date.now() - started;

  assert.equal(res.status, 429);
  assert.deepEqual(calls, []);
  assert.ok(elapsed < 1000, `the response must not wait out the lock, took ${elapsed}ms`);
  const body = (await res.json()) as {
    error?: { code?: string; type?: string; retry_after?: number; reset_at?: string };
  };
  assert.equal(body.error?.code, "ALL_TARGETS_SKIPPED");
  assert.equal(body.error?.type, "rate_limit_error");
  const retrySeconds = body.error?.retry_after ?? 0;
  assert.ok(retrySeconds >= 1, `expected a retry_after hint, got ${retrySeconds}`);
  assert.ok(retrySeconds <= 3, `retry_after should reflect the ~1.2s lock, got ${retrySeconds}s`);
  const resetAtMs = body.error?.reset_at ? Date.parse(body.error.reset_at) : NaN;
  assert.ok(
    Number.isFinite(resetAtMs) && resetAtMs - started > 600 && resetAtMs - started < 5000,
    `reset_at should reflect the ~1.2s lock, got ${new Date(resetAtMs).toISOString()}`
  );
});
