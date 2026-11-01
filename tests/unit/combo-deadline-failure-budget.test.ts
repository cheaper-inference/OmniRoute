/**
 * OMNIROUTE_COMBO_MAX_DEADLINE_FAILURES — opt-in sub-budget for
 * stream-readiness deadline failures in a combo run.
 *
 * The global-attempts cap is calibrated for fast failures (429/5xx swap-outs
 * that cost seconds). A readiness-deadline failure instead burns a full
 * readiness window plus a heavyweight body re-dispatch on every rotation, so
 * a handful of them multiplies user latency and gateway memory while the
 * global cap still has headroom. Unset (default) = disabled: the budget
 * clamp returns 0 and the combo keeps today's rotation behavior.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { clampDeadlineFailureBudget, isReadinessDeadlineFailure } = await import(
  "../../open-sse/services/combo/comboPredicates.ts"
);

test("budget: unset/empty/null → 0 (disabled, the default)", () => {
  assert.equal(clampDeadlineFailureBudget(undefined), 0);
  assert.equal(clampDeadlineFailureBudget(null), 0);
  assert.equal(clampDeadlineFailureBudget(""), 0);
});

test("budget: positive integer passes through", () => {
  assert.equal(clampDeadlineFailureBudget("3"), 3);
  assert.equal(clampDeadlineFailureBudget(5), 5);
  assert.equal(clampDeadlineFailureBudget("1"), 1);
});

test("budget: zero, negatives and junk → 0 (disabled); fractions floor like the attempts clamp", () => {
  for (const junk of ["0", "-3", "junk", ""]) {
    assert.equal(clampDeadlineFailureBudget(junk), 0, `expected disabled for ${JSON.stringify(junk)}`);
  }
  assert.equal(clampDeadlineFailureBudget("2.9"), 2, "floors, mirroring clampGlobalAttempts");
});

test("budget: values above the hard cap are clamped", () => {
  const clamped = clampDeadlineFailureBudget("99999");
  assert.ok(clamped > 0 && clamped < 99999, "clamped into the attempts hard cap range");
});

test("classifier: only 504 + STREAM_READINESS_TIMEOUT marker counts", () => {
  assert.equal(isReadinessDeadlineFailure(504, "STREAM_READINESS_TIMEOUT"), true);
  assert.equal(isReadinessDeadlineFailure(504, "upstream text containing STREAM_READINESS_TIMEOUT inside"), true);
  // Fast failures and other 504 shapes must NOT count.
  assert.equal(isReadinessDeadlineFailure(429, "STREAM_READINESS_TIMEOUT"), false);
  assert.equal(isReadinessDeadlineFailure(500, "internal"), false);
  assert.equal(isReadinessDeadlineFailure(504, "some other upstream 504 body"), false);
  assert.equal(isReadinessDeadlineFailure(504, ""), false);
});
