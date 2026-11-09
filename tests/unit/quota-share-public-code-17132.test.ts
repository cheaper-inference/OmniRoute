import test from "node:test";
import assert from "node:assert/strict";
import { createErrorResult } from "../../open-sse/utils/error.ts";
import { isComboRequestScopedFailure } from "../../open-sse/services/combo/comboPredicates.ts";

test("quota-share classification survives JSON serialization and Retry-After stays in seconds", async () => {
  const result = createErrorResult(
    429,
    "Absolute quota cap reached for your API key",
    60000,
    "quota_share_blocked"
  );
  const body = await result.response.clone().json();
  assert.equal(result.errorCode, "quota_share_blocked");
  assert.equal(body.error.code, "quota_share_blocked");
  assert.equal(result.response.headers.get("retry-after"), "60");
  assert.equal(isComboRequestScopedFailure(result.response, body.error.message, body.error), true);
});

test("an unknown internal error identifier is still projected to the safe public 429 default", async () => {
  const result = createErrorResult(429, "Try later", 3000, "private_unrecognized_error_17132");
  const body = await result.response.json();
  assert.equal(result.errorCode, "private_unrecognized_error_17132");
  assert.equal(body.error.code, "rate_limit_exceeded");
  assert.equal(JSON.stringify(body).includes("private_unrecognized_error_17132"), false);
  assert.equal(result.response.headers.get("retry-after"), "3");
});

test("other 429 classifications and absent retry hints keep their existing public behavior", async () => {
  for (const code of [undefined, "rate_limit_exceeded", "quota_exhausted"]) {
    const result = createErrorResult(429, "Provider quota unavailable", null, code);
    const body = await result.response.json();
    assert.equal(result.status, 429);
    assert.equal(body.error.code, code ?? "rate_limit_exceeded");
    assert.equal(result.response.headers.get("retry-after"), null);
    assert.equal(
      isComboRequestScopedFailure(result.response, body.error.message, body.error),
      false
    );
  }
});
