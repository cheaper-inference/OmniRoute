import assert from "node:assert/strict";
import test from "node:test";
import { subscriptionEligibility } from "../src/policy.ts";
import { consumeProbeBudget } from "../src/health/probeBudget.ts";
import { evaluateEndpoint, updateCacheFromProbe } from "../src/health/evaluate.ts";
import { endpointHealthKey, shouldProbe } from "../src/health/cache.ts";

const endpoint = (billingClass: "subscription" | "payg" | "unknown" = "subscription") => ({
  connectionId: "conn",
  providerId: "provider",
  modelId: "model",
  billingClass,
  active: true,
});

test("strict subscription policy excludes payg and unknown", () => {
  assert.deepEqual(subscriptionEligibility(endpoint()), { eligible: true });
  assert.equal(subscriptionEligibility(endpoint("payg")).eligible, false);
  assert.equal(subscriptionEligibility(endpoint("unknown")).eligible, false);
});

test("temporary 429 preserves last-known-good endpoint", () => {
  const previous = {
    key: endpointHealthKey("conn", "model"),
    status: "healthy" as const,
    checkedAt: 1,
    lastSuccessAt: 1,
    failureCount: 0,
  };
  const next = updateCacheFromProbe({
    previous,
    key: previous.key,
    now: 10_000,
    result: { ok: false, statusCode: 429, rateLimited: true, retryAfterSeconds: 60 },
  });
  assert.equal(next.status, "temporary_failure");
  assert.equal(evaluateEndpoint(endpoint(), next).state, "temporarily_unavailable");
  assert.equal(
    evaluateEndpoint(endpoint(), next).state === "temporarily_unavailable"
      ? evaluateEndpoint(endpoint(), next).preserve
      : false,
    true,
  );
});

test("auth and model-not-supported failures are permanent until resync", () => {
  for (const statusCode of [400, 401, 403, 404]) {
    const entry = updateCacheFromProbe({
      key: "k",
      now: 1,
      result: { ok: false, statusCode, error: "unsupported" },
    });
    assert.equal(entry.status, "permanent_failure");
  }
});

test("healthy result is cached for 24 hours", () => {
  const entry = updateCacheFromProbe({ key: "k", now: 1_000, result: { ok: true } });
  assert.equal(shouldProbe(entry, 1_000 + 23 * 60 * 60 * 1000), false);
  assert.equal(shouldProbe(entry, 1_000 + 24 * 60 * 60 * 1000), true);
});

test("probe budget allows only five probes per UTC day", () => {
  let state = { day: "", used: 0 };
  const now = Date.UTC(2026, 10, 11);
  for (let index = 0; index < 5; index++) {
    const result = consumeProbeBudget(state, now);
    assert.equal(result.allowed, true);
    state = result.state;
  }
  assert.equal(consumeProbeBudget(state, now).allowed, false);
  assert.equal(consumeProbeBudget(state, now + 24 * 60 * 60 * 1000).allowed, true);
});
