// An unmatched 4xx (e.g. 405, 409, 415) is request-shaped, like a generic 400:
// it must not put a healthy account on a transient cooldown. Auth-shaped 4xx
// (401/402/403) and retryable 408/429 keep the transient fallback. Port of
// 9router 20a43f5a.
import test from "node:test";
import assert from "node:assert/strict";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";

test("unmatched 4xx (405/409/415) is not account-fallback-worthy and sets no cooldown", () => {
  for (const status of [405, 409, 415]) {
    const result = checkFallbackError(status, "request rejected", 0, "m", null, null);
    assert.equal(result.shouldFallback, false, `status ${status}: shouldFallback must be false`);
    assert.equal(result.cooldownMs, 0, `status ${status}: cooldownMs must be 0`);
  }
});

test("auth-shaped 4xx (401/402/403) keeps fallback eligibility", () => {
  for (const status of [401, 402, 403]) {
    const result = checkFallbackError(status, "request rejected", 0, "m", null, null);
    assert.equal(result.shouldFallback, true, `status ${status}: shouldFallback must stay true`);
  }
});

test("non-retryable 5xx (501) keeps the transient fallback", () => {
  const result = checkFallbackError(501, "not implemented", 0, "m", null, null);
  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);
});
