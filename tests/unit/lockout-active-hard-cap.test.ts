import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-lockout-hard-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-lockout-hard-cap-secret";

const FLAG = "OMNIROUTE_MODEL_LOCKOUT_HARD_CAP";
const {
  lockModel,
  isModelLocked,
  clearAllModelLockouts,
  evictModelLockoutOverflow,
  getModelLockoutSize,
  MODEL_LOCKOUT_EVICTION_CAP,
} = await import("../../open-sse/services/accountFallback.ts");
const { evictLockoutOverflow, resolveActiveLockoutHardCap } =
  await import("../../open-sse/services/accountFallback/lockoutEviction.ts");
import type {
  ModelFailureState,
  ModelLockoutEntry,
} from "../../open-sse/services/accountFallback.ts";

test.afterEach(() => {
  delete process.env[FLAG];
  clearAllModelLockouts();
});

const entry = (until: number): ModelLockoutEntry => ({
  reason: "rate_limited",
  until,
  lockedAt: until - 60_000,
  failureCount: 1,
  lastFailureAt: until - 60_000,
  resetAfterMs: 30 * 60 * 1000,
});
const failure = (): ModelFailureState => ({
  failureCount: 3,
  lastFailureAt: Date.now(),
  resetAfterMs: 30 * 60 * 1000,
});

test("the hard cap reads a positive integer and is off for anything else", () => {
  for (const value of [undefined, "", "0", "-5", "abc", "1.5", "off"]) {
    assert.equal(resolveActiveLockoutHardCap({ [FLAG]: value }), 0, `value ${String(value)}`);
  }
  assert.equal(resolveActiveLockoutHardCap({ [FLAG]: "1200" }), 1200);
});

test("cap off: a map full of active lockouts is left alone, exactly as the #6923 rule says", () => {
  const farFuture = Date.now() + 3_600_000;
  const locks = new Map<string, ModelLockoutEntry>();
  for (let i = 0; i < 20; i += 1) locks.set(`k${i}`, entry(farFuture + i));
  evictLockoutOverflow(locks, new Map(), 5, 0);
  assert.equal(locks.size, 20);
});

test("cap on: active lockouts beyond the hard cap are evicted, soonest to expire first", () => {
  const base = Date.now() + 3_600_000;
  const locks = new Map<string, ModelLockoutEntry>();
  const failures = new Map<string, ModelFailureState>([["k0", failure()]]);
  // Insert in reverse order of expiry, so insertion order is NOT the eviction order.
  for (let i = 19; i >= 0; i -= 1) locks.set(`k${i}`, entry(base + i * 1000));
  evictLockoutOverflow(locks, failures, 5, 12);
  assert.equal(locks.size, 12);
  assert.deepEqual(
    [...locks.keys()].map((key) => Number(key.slice(1))).sort((a, b) => a - b),
    [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    "the 8 lockouts closest to expiry went; the longest stay"
  );
  assert.equal(failures.has("k0"), true, "escalation state is kept, so a re-lock keeps escalating");
});

test("cap on: the failure sweep keeps the escalation state of the lockouts the hard cap evicted", () => {
  const base = Date.now() + 3_600_000;
  const locks = new Map<string, ModelLockoutEntry>();
  const failures = new Map<string, ModelFailureState>();
  // Every lock has its failure record, so the failure map is over the cap as well.
  for (let i = 0; i < 13; i += 1) {
    locks.set(`k${i}`, entry(base + i * 1000));
    failures.set(`k${i}`, failure());
  }
  evictLockoutOverflow(locks, failures, 10, 11);
  assert.equal(locks.size, 11);
  assert.equal(locks.has("k0") || locks.has("k1"), false, "the 2 closest to expiry went");
  assert.equal(failures.size, 13, "no failure record went with its evicted lock");
  assert.ok(failures.has("k0") && failures.has("k1"), "a re-lock of k0/k1 keeps escalating");
});

test("cap on: expired entries go first, then only as many active ones as the hard cap needs", () => {
  const now = Date.now();
  const locks = new Map<string, ModelLockoutEntry>();
  for (let i = 0; i < 3; i += 1) locks.set(`dead${i}`, entry(now - 1_000 - i));
  for (let i = 0; i < 9; i += 1) locks.set(`live${i}`, entry(now + 3_600_000 + i));
  evictLockoutOverflow(locks, new Map(), 4, 8);
  const left = [...locks.keys()].sort();
  assert.equal(
    left.some((key) => key.startsWith("dead")),
    false,
    "expired entries went first"
  );
  assert.equal(locks.size, 8);
  assert.equal(left.includes("live0"), false, "then the one active lockout closest to expiry");
  assert.equal(left.filter((key) => key.startsWith("live")).length, 8);
});

test("through the service: off keeps 1300 active lockouts, on trims them to the hard cap", () => {
  const cap = MODEL_LOCKOUT_EVICTION_CAP;
  const fill = () => {
    clearAllModelLockouts();
    // Cooldowns 1 minute apart: the order of expiry is fixed whatever the clock does.
    for (let i = 0; i < cap + 300; i += 1) {
      lockModel(`hc-p-${i}`, `conn-${i}`, `m-${i}`, "rate_limited", 3_600_000 + i * 60_000);
    }
  };

  delete process.env[FLAG];
  fill();
  evictModelLockoutOverflow();
  assert.equal(getModelLockoutSize(), cap + 300, "default: active lockouts are never evicted");

  process.env[FLAG] = String(cap + 100);
  fill();
  evictModelLockoutOverflow();
  assert.equal(getModelLockoutSize(), cap + 100);
  assert.equal(isModelLocked("hc-p-0", "conn-0", "m-0"), false, "the soonest to expire went");
  assert.equal(isModelLocked("hc-p-199", "conn-199", "m-199"), false);
  assert.ok(isModelLocked("hc-p-200", "conn-200", "m-200"), "the 200th is within the hard cap");
  assert.ok(isModelLocked(`hc-p-${cap + 299}`, `conn-${cap + 299}`, `m-${cap + 299}`));
});
