import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyProviderFailure,
  failureVerdictFor,
} from "../../src/lib/resilience/failureClassification.ts";
import { DEFAULT_FAILOVER_POLICY, shouldFailover } from "../../src/lib/routing/adaptiveRouting.ts";
import { classifyComboOutcome } from "../../open-sse/services/combo/comboErrorAggregation.ts";

// One error must get one verdict across the routing preview and provider failover.
// These cases replay the same responses through both sites that judge a 4xx/5xx.

function verdict(status: number, message: string) {
  const failure = classifyProviderFailure({ providerId: "provider", statusCode: status, message });
  return {
    failoverType: failure.type,
    retryable: failure.retryable,
    shared: failureVerdictFor(status, message),
    preview: classifyComboOutcome(status, message),
    failoverDecision: shouldFailover(failure, DEFAULT_FAILOVER_POLICY),
  };
}

test("429 keeps one verdict across preview and failover", () => {
  const result = verdict(429, "rate limit exceeded");
  assert.equal(result.failoverType, "rate_limit");
  assert.equal(result.retryable, true);
  assert.equal(result.shared, "rate_limit");
  assert.equal(result.preview, "rate_limit");
  assert.equal(result.failoverDecision, true);
});

test("401 keeps one verdict across preview and failover", () => {
  const result = verdict(401, "invalid api key");
  assert.equal(result.failoverType, "authentication_error");
  assert.equal(result.retryable, false);
  assert.equal(result.shared, "authentication_error");
  assert.equal(result.preview, "auth");
  assert.equal(result.failoverDecision, false);
});

test("429 with an auth body keeps the verbatim verdict on both sides", () => {
  const result = verdict(429, "rate limit exceeded; invalid api key");
  assert.equal(result.failoverType, "authentication_error");
  assert.equal(result.retryable, false);
  assert.equal(result.shared, "authentication_error");
  assert.equal(result.preview, "auth");
  assert.equal(result.failoverDecision, false);
});

test("client-facing labels keep 408, 499, 504 and 502 auth unchanged", () => {
  assert.equal(classifyComboOutcome(408, "request timeout"), "timeout");
  assert.equal(classifyComboOutcome(499, "client closed request"), "timeout");
  assert.equal(classifyComboOutcome(504, "gateway timeout"), "provider");
  assert.equal(classifyComboOutcome(502, "invalid api key"), "auth");
});

test("rate-limit and timeout text outside 429/408/499 stays labelled model", () => {
  assert.equal(failureVerdictFor(200, "rate limit exceeded"), "rate_limit");
  assert.equal(classifyComboOutcome(200, "rate limit exceeded"), "model");
  assert.equal(failureVerdictFor(200, "request timeout"), "timeout");
  assert.equal(classifyComboOutcome(200, "request timeout"), "model");
  assert.equal(failureVerdictFor(429, "monthly quota exceeded"), "quota_exhausted");
  assert.equal(classifyComboOutcome(429, "monthly quota exceeded"), "rate_limit");
  assert.equal(failureVerdictFor(402, "payment required"), "quota_exhausted");
  assert.equal(classifyComboOutcome(402, "payment required"), "model");
});

test("the shared verdict ignores case, surrounding space and regex punctuation", () => {
  assert.equal(failureVerdictFor(429, "  RATE LIMIT EXCEEDED  "), "rate_limit");
  assert.equal(failureVerdictFor(429, "rate-limit"), "rate_limit");
  assert.equal(failureVerdictFor(undefined, ""), "unknown");
  assert.equal(failureVerdictFor(undefined, undefined), "unknown");
});
