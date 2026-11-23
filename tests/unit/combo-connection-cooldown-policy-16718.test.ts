import test from "node:test";
import assert from "node:assert/strict";
import {
  recordSkippedConnectionCooldown,
  resolveSkippedConnectionCooldownTerminal,
} from "../../open-sse/services/combo/skippedConnectionCooldown.ts";

const NOW = Date.parse("2030-01-01T00:00:00Z");
const createState = () => ({
  skippedConnectionCooldownUntil: undefined as number | undefined,
  observedFailure: true,
  allObservedFailuresQuota: true,
});

test("selects the earliest eligible deadline without marking the whole combo exhausted", () => {
  const state = createState();
  for (const retryAfterMs of [20_000, 5000, 10_000]) {
    recordSkippedConnectionCooldown(
      state,
      { available: false, reason: "connection_cooldown", retryAfterMs },
      NOW
    );
  }
  assert.deepEqual(resolveSkippedConnectionCooldownTerminal(402, state, NOW), {
    status: 429,
    retryAfter: new Date(NOW + 5000).toISOString(),
    quotaExhausted: false,
  });
});

test("unknown, missing, and malformed cooldowns do not fabricate retry hints", () => {
  const state = createState();
  for (const retryAfterMs of [0, -1, NaN, Infinity]) {
    recordSkippedConnectionCooldown(
      state,
      { available: false, reason: "connection_cooldown", retryAfterMs },
      NOW
    );
  }
  recordSkippedConnectionCooldown(state, false, NOW);
  recordSkippedConnectionCooldown(state, "model_not_in_catalog", NOW);
  assert.deepEqual(resolveSkippedConnectionCooldownTerminal(402, state, NOW), {
    status: 402,
    retryAfter: null,
    quotaExhausted: true,
  });
});

test("a peer that recovered during dispatch still allows an immediate retry", () => {
  const state = createState();
  recordSkippedConnectionCooldown(
    state,
    { available: false, reason: "connection_cooldown", retryAfterMs: 5000 },
    NOW
  );
  const result = resolveSkippedConnectionCooldownTerminal(402, state, NOW + 6000);
  assert.equal(result.status, 429);
  assert.equal(result.retryAfter, new Date(NOW + 6001).toISOString());
});

test("request failures and other terminal classes retain their contract", () => {
  const state = createState();
  state.skippedConnectionCooldownUntil = NOW + 5000;
  for (const status of [400, 401, 403, 404, 422, 500, 503]) {
    assert.equal(resolveSkippedConnectionCooldownTerminal(status, state, NOW).status, status);
    assert.equal(resolveSkippedConnectionCooldownTerminal(status, state, NOW).retryAfter, null);
  }
});

test("out-of-range dates cannot throw while building the terminal response", () => {
  const state = createState();
  state.skippedConnectionCooldownUntil = Number.MAX_VALUE;
  assert.equal(resolveSkippedConnectionCooldownTerminal(402, state, NOW).status, 402);
});
