import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Restart persistence for in-memory model lockouts.
 *
 * `modelLockouts` / `modelFailureState` are module-level Maps — every restart
 * (deploy, crash, container recycle) wiped them, so the first request after
 * boot re-entered each still-cooling target once and re-learned the cooldown
 * from scratch. These tests pin the snapshot/restore contract that fixes it.
 */
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-lockout-persist-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-lockout-persist-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_PERSIST_MODEL_LOCKOUTS;

const {
  lockModel,
  isModelLocked,
  clearAllModelLockouts,
  recordModelLockoutFailure,
  exportModelLockoutStateForPersistence,
  restoreModelLockoutStateForPersistence,
} = await import("../../open-sse/services/accountFallback.ts");
const {
  serializeModelLockoutState,
  parsePersistedModelLockoutState,
} = await import("../../open-sse/services/accountFallback/lockoutPersistence.ts");
const {
  saveModelLockoutSnapshotToDb,
  restoreModelLockoutsFromDb,
  startModelLockoutSnapshotInterval,
} = await import("../../src/sse/services/modelLockoutPersistence.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

const REASON = "rate_limited";
// Far from expiring — entry.until is well in the future.
const ACTIVE_COOLDOWN_MS = 240_000;
// Negative cooldown backdates `until` into the past, deterministically
// producing an already-expired entry without a real sleep.
const EXPIRED_COOLDOWN_MS = -60_000;

test.after(async () => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("serialize/parse roundtrip preserves lockout and failure entries", () => {
  const now = Date.now();
  const state = serializeModelLockoutState({
    lockouts: [
      [
        "openai::conn-1::gpt-x",
        { until: now + 60_000, lockedAt: now, failureCount: 2, lastFailureAt: now, resetAfterMs: 300_000 },
      ],
    ],
    failures: [
      [
        "openai::conn-1::gpt-x",
        { failureCount: 2, lastFailureAt: now, resetAfterMs: 300_000, lastCooldownMs: 10_000 },
      ],
    ],
  });
  const parsed = parsePersistedModelLockoutState(JSON.parse(JSON.stringify(state)));
  assert.ok(parsed, "roundtrip through JSON must parse");
  assert.equal(parsed.lockouts.length, 1);
  assert.equal(parsed.lockouts[0][0], "openai::conn-1::gpt-x");
  assert.equal(parsed.lockouts[0][1].failureCount, 2);
  assert.equal(parsed.failures.length, 1);
  assert.equal(parsed.failures[0][1].lastCooldownMs, 10_000);
});

test("parse rejects malformed payloads without throwing", () => {
  assert.equal(parsePersistedModelLockoutState(null), null);
  assert.equal(parsePersistedModelLockoutState("nope"), null);
  assert.equal(parsePersistedModelLockoutState(42), null);
  // Wrong version — future formats must not be half-applied.
  assert.equal(
    parsePersistedModelLockoutState({ version: 99, savedAt: 1, lockouts: [], failures: [] }),
    null
  );
  // Entries with wrong shapes are dropped individually, valid siblings survive.
  const partial = parsePersistedModelLockoutState({
    version: 1,
    savedAt: 1,
    lockouts: [
      ["bad", { until: "soon", lockedAt: 1, failureCount: 1, lastFailureAt: 1, resetAfterMs: 1 }],
      [
        "good",
        { until: Date.now() + 60_000, lockedAt: 1, failureCount: 1, lastFailureAt: 1, resetAfterMs: 1 },
      ],
    ],
    failures: [["bad", { failureCount: "two", lastFailureAt: 1, resetAfterMs: 1 }]],
  });
  assert.ok(partial);
  assert.equal(partial.lockouts.length, 1);
  assert.equal(partial.lockouts[0][0], "good");
  assert.equal(partial.failures.length, 0);
});

test("a restart wipe then restore keeps the still-active model locked", () => {
  clearAllModelLockouts();

  lockModel("openai", "conn-restart", "gpt-restart", REASON, ACTIVE_COOLDOWN_MS);
  assert.equal(isModelLocked("openai", "conn-restart", "gpt-restart"), true);

  const snap = exportModelLockoutStateForPersistence();
  clearAllModelLockouts(); // simulated restart: both maps are empty again
  assert.equal(isModelLocked("openai", "conn-restart", "gpt-restart"), false);

  const restored = restoreModelLockoutStateForPersistence(snap.lockouts, snap.failures);
  assert.equal(restored, 1);
  assert.equal(isModelLocked("openai", "conn-restart", "gpt-restart"), true);
});

test("restore drops already-expired lockouts and out-of-window failure state", () => {
  clearAllModelLockouts();
  const now = Date.now();

  const restored = restoreModelLockoutStateForPersistence(
    [
      ["k-live", { until: now + 120_000, lockedAt: now, failureCount: 1, lastFailureAt: now, resetAfterMs: 300_000 }],
      ["k-expired", { until: now - 1_000, lockedAt: now, failureCount: 1, lastFailureAt: now, resetAfterMs: 300_000 }],
    ],
    [
      // Still inside the escalation window — kept.
      ["k-live", { failureCount: 3, lastFailureAt: now - 1_000, resetAfterMs: 300_000, lastCooldownMs: 10_000 }],
      // Escalation window long over — restoring it would wrongly keep counts alive.
      ["k-expired", { failureCount: 9, lastFailureAt: now - 10 * 60_000, resetAfterMs: 300_000, lastCooldownMs: 10_000 }],
    ]
  );
  assert.equal(restored, 1, "only the still-active lockout re-arms");
  assert.equal(isModelLocked("openai", "anything", "whatever"), false, "raw-key restore is not name-addressable here; count is the contract");
});

test("restored failure state keeps escalation across a restart", () => {
  clearAllModelLockouts();

  const first = recordModelLockoutFailure("openai", "conn-esc", "gpt-esc", REASON, 429, 1_000);
  assert.equal(first.failureCount, 1);

  const snap = exportModelLockoutStateForPersistence();
  clearAllModelLockouts(); // simulated restart
  restoreModelLockoutStateForPersistence(snap.lockouts, snap.failures);

  const second = recordModelLockoutFailure("openai", "conn-esc", "gpt-esc", REASON, 429, 1_000);
  assert.equal(
    second.failureCount,
    2,
    "failureCount must continue escalating instead of restarting at 1 after a restart"
  );
});

test("DB snapshot roundtrip survives a simulated restart and drops expired entries", () => {
  clearAllModelLockouts();

  lockModel("openai", "conn-db", "gpt-db", REASON, ACTIVE_COOLDOWN_MS);
  lockModel("openai", "conn-db-old", "gpt-db", REASON, EXPIRED_COOLDOWN_MS);
  assert.equal(saveModelLockoutSnapshotToDb(), true);

  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = 'resilience' AND key = 'modelLockoutState'")
    .get() as { value: string } | undefined;
  assert.ok(row, "snapshot must be persisted in key_value");

  clearAllModelLockouts(); // simulated restart
  assert.equal(isModelLocked("openai", "conn-db", "gpt-db"), false);

  assert.equal(restoreModelLockoutsFromDb(), 1, "only the still-active lockout restores");
  assert.equal(isModelLocked("openai", "conn-db", "gpt-db"), true);
  assert.equal(isModelLocked("openai", "conn-db-old", "gpt-db"), false);
});

test("restore with no persisted snapshot is a no-op returning 0", () => {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = 'resilience' AND key = 'modelLockoutState'")
    .run();
  assert.equal(restoreModelLockoutsFromDb(), 0);
});

test("kill-switch (OMNIROUTE_PERSIST_MODEL_LOCKOUTS=0) disables snapshot and restore", () => {
  process.env.OMNIROUTE_PERSIST_MODEL_LOCKOUTS = "0";
  try {
    clearAllModelLockouts();
    lockModel("openai", "conn-off", "gpt-off", REASON, ACTIVE_COOLDOWN_MS);
    assert.equal(saveModelLockoutSnapshotToDb(), false);
    assert.equal(restoreModelLockoutsFromDb(), 0);
  } finally {
    delete process.env.OMNIROUTE_PERSIST_MODEL_LOCKOUTS;
  }
});

test("snapshot interval starts at most once", () => {
  assert.equal(startModelLockoutSnapshotInterval(), true);
  assert.equal(startModelLockoutSnapshotInterval(), false, "second start must be a no-op");
});
