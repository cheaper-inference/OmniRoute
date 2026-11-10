import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * A success must not clear a lockout whose cooldown IS a verified upstream
 * reset declaration, and internal live-test probes must not clear lockouts or
 * mark quota healthy at all.
 *
 * The wall shape: an upstream declares "rate limited until T" in a header the
 * gateway verifies (Retry-After / X-RateLimit-Reset / RetryInfo — the
 * exactCooldownIsUpstreamReset ruling, #6863 vs #7940). recordModelLockoutFailure
 * honors it exactly (never clamped). But the success path in chat.ts called
 * clearModelLock + markQuotaHealthy unconditionally — and walls frequently let
 * small or test-shaped requests through while still rejecting real traffic, so
 * one 200 erased a lock the upstream had declared open for hours/days, and
 * re-poisoned quota-health ranking.
 */
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-lockout-reset-survives-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-lockout-reset-survives-secret";

const {
  recordModelLockoutFailure,
  clearModelLock,
  clearModelLockExemptingUpstreamResets,
  clearAllModelLockouts,
  isModelLocked,
} = await import("../../open-sse/services/accountFallback.ts");
const { clearMultiKeyLockExemptingUpstreamResets } = await import(
  "../../open-sse/services/accountFallback/exactModelLock.ts"
);
import type {
  ModelFailureState,
  ModelLockoutEntry,
} from "../../open-sse/services/accountFallback.ts";

const REASON = "rate_limited";

test("exempting clear keeps a future upstream-reset lock, clears expired and unstamped ones", () => {
  const now = Date.now();
  const lockouts = new Map<string, ModelLockoutEntry>([
    ["k-stamped-live", { reason: REASON, until: now + 3_600_000, lockedAt: now, failureCount: 1, lastFailureAt: now, resetAfterMs: 300_000, upstreamReset: true }],
    ["k-stamped-dead", { reason: REASON, until: now - 1_000, lockedAt: now, failureCount: 1, lastFailureAt: now, resetAfterMs: 300_000, upstreamReset: true }],
    ["k-plain", { reason: REASON, until: now + 3_600_000, lockedAt: now, failureCount: 1, lastFailureAt: now, resetAfterMs: 300_000 }],
  ]);
  const failures = new Map<string, ModelFailureState>([
    ["k-stamped-live", { failureCount: 1, lastFailureAt: now, resetAfterMs: 300_000 }],
    ["k-stamped-dead", { failureCount: 1, lastFailureAt: now, resetAfterMs: 300_000 }],
    ["k-plain", { failureCount: 1, lastFailureAt: now, resetAfterMs: 300_000 }],
  ]);

  const cleared = clearMultiKeyLockExemptingUpstreamResets(
    lockouts,
    failures,
    ["k-stamped-live", "k-stamped-dead", "k-plain", "k-absent"],
    now
  );

  assert.equal(cleared, true, "something was cleared");
  assert.equal(lockouts.has("k-stamped-live"), true, "a still-open upstream reset stays armed");
  assert.equal(failures.has("k-stamped-live"), true);
  assert.equal(lockouts.has("k-stamped-dead"), false, "an expired stamp clears like everything else");
  assert.equal(failures.has("k-stamped-dead"), false);
  assert.equal(lockouts.has("k-plain"), false, "an unstamped lock clears exactly as before");
  assert.equal(failures.has("k-plain"), false);
});

test("a verified upstream reset is stamped and survives the exempting success clear", () => {
  clearAllModelLockouts();

  // Verified header reset: honored exactly, never clamped (#6863) — this is the
  // shape that must survive a later success.
  recordModelLockoutFailure("openai", "conn-verified", "gpt-w", REASON, 429, 30_000, null, {
    exactCooldownMs: 3_600_000,
    maxCooldownMs: 60_000,
    exactCooldownIsUpstreamReset: true,
  });
  assert.equal(isModelLocked("openai", "conn-verified", "gpt-w"), true);

  clearModelLockExemptingUpstreamResets("openai", "conn-verified", "gpt-w");
  assert.equal(
    isModelLocked("openai", "conn-verified", "gpt-w"),
    true,
    "one 200 must not erase a lock the upstream declared open for another hour"
  );

  // Other clearing paths (e.g. manual reset) keep the old behavior.
  clearModelLock("openai", "conn-verified", "gpt-w");
  assert.equal(isModelLocked("openai", "conn-verified", "gpt-w"), false);
});

test("a prose-derived hint clamped by maxCooldownMs is NOT stamped and still clears on success", () => {
  clearAllModelLockouts();

  // Body-prose hint: a useful exact hint but bounded by maxCooldownMs (#7940) —
  // the applied cooldown is NOT the declared value, so no stamp.
  recordModelLockoutFailure("openai", "conn-prose", "gpt-p", REASON, 429, 30_000, null, {
    exactCooldownMs: 3_600_000,
    maxCooldownMs: 60_000,
  });
  assert.equal(isModelLocked("openai", "conn-prose", "gpt-p"), true);

  clearModelLockExemptingUpstreamResets("openai", "conn-prose", "gpt-p");
  assert.equal(
    isModelLocked("openai", "conn-prose", "gpt-p"),
    false,
    "clamped/synthetic cooldowns keep clearing on success exactly as before"
  );
});

test("the stamp survives a shorter unstamped re-lock (backoff must not outlive the wall)", () => {
  clearAllModelLockouts();

  recordModelLockoutFailure("openai", "conn-mixed", "gpt-m", REASON, 429, 30_000, null, {
    exactCooldownMs: 3_600_000,
    maxCooldownMs: 60_000,
    exactCooldownIsUpstreamReset: true,
  });
  // A later plain transient failure on the same target: short backoff — the
  // longer wall lock (and its stamp) must be preserved.
  recordModelLockoutFailure("openai", "conn-mixed", "gpt-m", REASON, 429, 1_000);

  clearModelLockExemptingUpstreamResets("openai", "conn-mixed", "gpt-m");
  assert.equal(
    isModelLocked("openai", "conn-mixed", "gpt-m"),
    true,
    "a short re-lock must not strip the stamp from the longer wall lock"
  );
});

test("exempting clear with no lockouts at all is a benign no-op returning false", () => {
  clearAllModelLockouts();
  assert.equal(clearModelLockExemptingUpstreamResets("openai", "conn-none", "gpt-n"), false);
});
