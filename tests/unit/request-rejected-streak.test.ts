/**
 * open-sse/services/requestRejectedStreak.ts (#12859): per-connection-and-model
 * streak of upstream per-request refusals → growing cooldown. The ladder never
 * escalates to a terminal state: the threshold refusal earns the longest
 * (temporary) rung. One cooldown episode counts once: refusals landing while
 * the model is already excluded were in flight before the cooldown and are not
 * new evidence.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  recordRequestRejected,
  seedRequestRejectedStreak,
  hasRequestRejectedStreak,
  clearRequestRejectedStreak,
  __resetRequestRejectedStreaksForTests,
  REQUEST_REJECTED_WINDOW_MS,
  REQUEST_REJECTED_ESCALATION_THRESHOLD,
  REQUEST_REJECTED_COOLDOWNS_MS,
} = await import("../../open-sse/services/requestRejectedStreak.ts");
const { COOLDOWN_MS } = await import("../../open-sse/config/errorConfig.ts");

const MIN = 60 * 1000;
const T0 = 1_000_000;
const MODEL = "claude-sonnet-4-6";

test.beforeEach(() => __resetRequestRejectedStreaksForTests());

test("ladder comes from COOLDOWN_MS and has one rung per refusal", () => {
  assert.equal(REQUEST_REJECTED_COOLDOWNS_MS[0], COOLDOWN_MS.requestRejected);
  assert.equal(REQUEST_REJECTED_COOLDOWNS_MS[1], COOLDOWN_MS.requestRejectedRepeat);
  assert.equal(REQUEST_REJECTED_COOLDOWNS_MS.length, REQUEST_REJECTED_ESCALATION_THRESHOLD);
});

test("first refusal: first cooldown rung, counted, no escalation", () => {
  const v = recordRequestRejected("conn-a", MODEL, T0);
  assert.equal(v.streak, 1);
  assert.equal(v.counted, true);
  assert.equal(v.escalate, false);
  assert.equal(v.cooldownMs, COOLDOWN_MS.requestRejected);
  assert.equal(v.threshold, REQUEST_REJECTED_ESCALATION_THRESHOLD);
  assert.equal(v.windowMs, REQUEST_REJECTED_WINDOW_MS);
});

test("refusals that land while the model is already excluded are the same episode", () => {
  const first = recordRequestRejected("conn-a", MODEL, T0);
  // Three parallel requests that were in flight when the first 403 came back.
  const inFlight = [1, 2, 3].map((s) => recordRequestRejected("conn-a", MODEL, T0 + s * 1000));
  for (const v of inFlight) {
    assert.equal(v.counted, false, "not new evidence");
    assert.equal(v.streak, 1, "streak stays at 1");
    assert.equal(v.escalate, false, "a burst must never lock the model out at the threshold");
    assert.ok(v.cooldownMs > 0 && v.cooldownMs <= first.cooldownMs, "remaining cooldown");
  }
});

test("consecutive episodes grow the cooldown up to the longest rung", () => {
  const first = recordRequestRejected("conn-a", MODEL, T0);
  const second = recordRequestRejected("conn-a", MODEL, T0 + first.cooldownMs + 1);
  assert.equal(second.streak, 2);
  assert.equal(second.counted, true);
  assert.equal(second.cooldownMs, COOLDOWN_MS.requestRejectedRepeat);
  assert.equal(second.escalate, false);

  const third = recordRequestRejected(
    "conn-a",
    MODEL,
    T0 + first.cooldownMs + second.cooldownMs + 2
  );
  assert.equal(third.streak, 3);
  assert.equal(third.escalate, false, "the threshold is a long cooldown, never a ban");
  assert.equal(
    third.cooldownMs,
    REQUEST_REJECTED_COOLDOWNS_MS[REQUEST_REJECTED_COOLDOWNS_MS.length - 1],
    "the threshold refusal earns the longest rung"
  );

  // Past the threshold the cooldown stays capped instead of growing forever.
  const fourth = recordRequestRejected("conn-a", MODEL, T0 + 24 * 60 * MIN - 1);
  assert.equal(fourth.escalate, false);
  assert.equal(fourth.cooldownMs, third.cooldownMs, "capped at the longest rung");
});

test("a refusal outside the staleness window starts a new streak", () => {
  recordRequestRejected("conn-a", MODEL, T0);
  const late = recordRequestRejected("conn-a", MODEL, T0 + REQUEST_REJECTED_WINDOW_MS + 1);
  assert.equal(late.streak, 1);
  assert.equal(late.cooldownMs, COOLDOWN_MS.requestRejected);
});

test("a success (clearRequestRejectedStreak) resets the count", () => {
  const first = recordRequestRejected("conn-a", MODEL, T0);
  clearRequestRejectedStreak("conn-a", MODEL);
  const next = recordRequestRejected("conn-a", MODEL, T0 + first.cooldownMs + 1);
  assert.equal(next.streak, 1, "sporadic refusals separated by successes never accumulate");
  assert.equal(next.cooldownMs, COOLDOWN_MS.requestRejected);
});

test("streaks are per connection", () => {
  const a1 = recordRequestRejected("conn-a", MODEL, T0);
  recordRequestRejected("conn-a", MODEL, T0 + a1.cooldownMs + 1);
  const other = recordRequestRejected("conn-b", MODEL, T0 + a1.cooldownMs + 2);
  assert.equal(other.streak, 1);
});

test("seedRequestRejectedStreak restores one refusal from before a restart", () => {
  const lastRefusalAt = T0 - 10 * MIN;
  assert.equal(seedRequestRejectedStreak("conn-a", MODEL, lastRefusalAt, T0), true);
  assert.equal(hasRequestRejectedStreak("conn-a", MODEL), true);
  const v = recordRequestRejected("conn-a", MODEL, T0);
  assert.equal(v.streak, 2, "the seeded refusal counts as the first of the streak");
  assert.equal(v.counted, true, "the seeded refusal's cooldown is not re-applied");
});

test("seedRequestRejectedStreak ignores stale rows and existing state", () => {
  assert.equal(
    seedRequestRejectedStreak("conn-a", MODEL, T0 - REQUEST_REJECTED_WINDOW_MS, T0),
    false
  );
  assert.equal(seedRequestRejectedStreak("conn-a", MODEL, Number.NaN, T0), false);
  assert.equal(hasRequestRejectedStreak("conn-a", MODEL), false);

  recordRequestRejected("conn-b", MODEL, T0);
  assert.equal(seedRequestRejectedStreak("conn-b", MODEL, T0 - MIN, T0), false, "already tracked");
});
