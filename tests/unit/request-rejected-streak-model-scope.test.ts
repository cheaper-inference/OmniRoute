/**
 * #12859 follow-up: the REQUEST_REJECTED streak is keyed by connection, but an
 * upstream per-request refusal is scoped to what was actually asked. Two failure
 * shapes put the wrong thing into the count:
 *
 * 1. A provider whose refusals are model-specific (today: a model the plan does
 *    not include, a model gated behind an entitlement) refuses model B three
 *    times while model A works fine. The connection-wide streak reaches the
 *    threshold and the account is written `banned` / `isActive: false` — every
 *    model, including the healthy one, is disabled until the operator reconnects
 *    by hand. A refusal on one model must never disable the connection.
 * 2. The escalation is unrecoverable from the routing side: nothing in the
 *    routing path reactivates the connection, so the streak's last step deletes
 *    the operator's account. A long cooldown achieves the same "stop hammering
 *    the upstream" goal and heals on its own.
 *
 * The streak therefore belongs to `connectionId|model`, and the ladder ends in a
 * long cooldown instead of a ban.
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  recordRequestRejected,
  seedRequestRejectedStreak,
  hasRequestRejectedStreak,
  clearRequestRejectedStreak,
  __resetRequestRejectedStreaksForTests,
  REQUEST_REJECTED_ESCALATION_THRESHOLD,
  REQUEST_REJECTED_COOLDOWNS_MS,
  REQUEST_REJECTED_MAX_COOLDOWN_MS,
} = await import("../../open-sse/services/requestRejectedStreak.ts");
const { COOLDOWN_MS } = await import("../../open-sse/config/errorConfig.ts");

const MIN = 60 * 1000;
const T0 = 1_000_000;
const CONN = "conn-a";
const MODEL_A = "claude-opus-4-6";
const MODEL_B = "claude-sonnet-4-6";

test.beforeEach(() => __resetRequestRejectedStreaksForTests());

test("the ladder never escalates to a terminal state", () => {
  assert.equal(
    REQUEST_REJECTED_COOLDOWNS_MS.length,
    REQUEST_REJECTED_ESCALATION_THRESHOLD,
    "every rung of the ladder — including the threshold one — must be a cooldown"
  );
  assert.equal(
    REQUEST_REJECTED_MAX_COOLDOWN_MS,
    COOLDOWN_MS.requestRejectedRepeat * 4,
    "the last rung caps at a long-but-temporary cooldown"
  );
});

test("three consecutive refusals on ONE model stay a cooldown — never a ban", () => {
  let t = T0;
  const verdicts = [];
  for (let i = 0; i < REQUEST_REJECTED_ESCALATION_THRESHOLD; i++) {
    const v = recordRequestRejected(CONN, MODEL_B, t);
    verdicts.push(v);
    assert.equal(v.escalate, false, `refusal ${i + 1} must not escalate`);
    assert.ok(v.cooldownMs > 0, `refusal ${i + 1} must still exclude the model`);
    t += v.cooldownMs + 1;
  }
  assert.deepEqual(
    verdicts.map((v) => v.streak),
    [1, 2, 3]
  );
  assert.equal(
    verdicts[2].cooldownMs,
    REQUEST_REJECTED_MAX_COOLDOWN_MS,
    "the threshold refusal is the longest cooldown, not a terminal write"
  );
});

test("a refusal on one model does not accumulate refusals from a sibling model", () => {
  let t = T0;
  // Model B is refused repeatedly; model A keeps being refused too, but each
  // model's streak is its own.
  for (let i = 0; i < REQUEST_REJECTED_ESCALATION_THRESHOLD; i++) {
    const v = recordRequestRejected(CONN, MODEL_B, t);
    assert.equal(v.streak, i + 1, "model B counts only model B refusals");
    t += v.cooldownMs + 1;
  }
  const sibling = recordRequestRejected(CONN, MODEL_A, t);
  assert.equal(sibling.streak, 1, "model A has never been refused before");
  assert.equal(
    sibling.cooldownMs,
    REQUEST_REJECTED_COOLDOWNS_MS[0],
    "model A starts at the first rung"
  );
});

test("the same model on another connection has its own streak", () => {
  const first = recordRequestRejected(CONN, MODEL_B, T0);
  const other = recordRequestRejected("conn-b", MODEL_B, T0 + first.cooldownMs + 1);
  assert.equal(other.streak, 1);
});

test("a success on one model clears only that model", () => {
  let t = T0;
  const b1 = recordRequestRejected(CONN, MODEL_B, t);
  recordRequestRejected(CONN, MODEL_A, t + 1);
  clearRequestRejectedStreak(CONN, MODEL_B);
  assert.equal(hasRequestRejectedStreak(CONN, MODEL_B), false, "model B cleared");
  assert.equal(hasRequestRejectedStreak(CONN, MODEL_A), true, "model A still tracked");
  const next = recordRequestRejected(CONN, MODEL_B, t + b1.cooldownMs + 2);
  assert.equal(next.streak, 1);
  t = 0;
});

test("a connection-wide clear forgets every model of that connection", () => {
  recordRequestRejected(CONN, MODEL_A, T0);
  recordRequestRejected(CONN, MODEL_B, T0);
  clearRequestRejectedStreak(CONN);
  assert.equal(hasRequestRejectedStreak(CONN, MODEL_A), false);
  assert.equal(hasRequestRejectedStreak(CONN, MODEL_B), false);
});

test("a seeded refusal restores only the model it was recorded for", () => {
  const lastRefusalAt = T0 - 10 * MIN;
  assert.equal(seedRequestRejectedStreak(CONN, MODEL_B, lastRefusalAt, T0), true);
  assert.equal(hasRequestRejectedStreak(CONN, MODEL_B), true);
  assert.equal(hasRequestRejectedStreak(CONN, MODEL_A), false, "the sibling is untouched");

  const v = recordRequestRejected(CONN, MODEL_B, T0);
  assert.equal(v.streak, 2, "the seeded refusal counts as the first of the streak");
  assert.equal(v.counted, true);
});

test("a refusal with no model keeps working (connection-scoped fallback)", () => {
  const v = recordRequestRejected(CONN, undefined, T0);
  assert.equal(v.streak, 1);
  assert.equal(v.counted, true);
  assert.equal(hasRequestRejectedStreak(CONN), true, "a connection-wide lookup sees it");
});

test("refusals that land during the cooldown are the same episode, per model", () => {
  const first = recordRequestRejected(CONN, MODEL_B, T0);
  for (const s of [1, 2, 3]) {
    const v = recordRequestRejected(CONN, MODEL_B, T0 + s * 1000);
    assert.equal(v.counted, false);
    assert.equal(v.streak, 1);
    assert.ok(v.cooldownMs > 0 && v.cooldownMs <= first.cooldownMs);
  }
  // The sibling model is not excluded by model B's cooldown.
  const sibling = recordRequestRejected(CONN, MODEL_A, T0 + 1000);
  assert.equal(sibling.counted, true, "model A is a fresh episode");
  assert.equal(sibling.streak, 1);
});
