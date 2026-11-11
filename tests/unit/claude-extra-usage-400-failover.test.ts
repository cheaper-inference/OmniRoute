/**
 * Claude OAuth answers HTTP 400 `invalid_request_error` with "You're out of extra usage"
 * when one account's extra-usage allowance is spent. That is an account-scoped quota
 * signal, not a malformed request: the connection must get a short self-recovering
 * cooldown and the request must fail over to the next Claude connection.
 * Genuine request-scoped 400s must keep their current behavior.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");

const OUT_OF_EXTRA_USAGE =
  "You're out of extra usage. Add more at claude.ai/settings/usage and keep going.";

const quota400 = {
  status: 400,
  errorCode: null,
  errorType: "invalid_request_error",
  rawMessage: OUT_OF_EXTRA_USAGE,
};

test("out-of-extra-usage 400 is not skipped: the connection must be cooled down", () => {
  assert.equal(shouldSkipConnDisable(quota400, false, false, "claude"), false);
});

test("out-of-extra-usage 400 via structured error object is not skipped", () => {
  const result = {
    status: 400,
    errorType: "invalid_request_error",
    error: { message: OUT_OF_EXTRA_USAGE },
  };
  assert.equal(shouldSkipConnDisable(result, false, false, "claude"), false);
});

test("out-of-extra-usage 400 yields a short, non-terminal fallback cooldown", () => {
  const decision = checkFallbackError(
    400,
    OUT_OF_EXTRA_USAGE,
    0,
    "claude-sonnet-4-5",
    "claude",
    null,
    null,
    { code: null, type: "invalid_request_error" }
  );
  assert.equal(decision.shouldFallback, true);
  assert.ok(decision.cooldownMs > 0, "cooldown must be positive so the account is skipped");
  assert.ok(decision.cooldownMs <= 60 * 60 * 1000, "cooldown must be short and self-recovering");
  assert.notEqual(decision.reason, "credits_exhausted");
  assert.notEqual(decision.reason, "banned");
});

test("plain invalid_request_error 400 stays request-scoped", () => {
  const result = {
    status: 400,
    errorType: "invalid_request_error",
    rawMessage: "messages.0.content: Input should be a valid string",
  };
  assert.equal(shouldSkipConnDisable(result, false, false, "claude"), true);
});

test("invalid_request_error 400 without any message stays request-scoped", () => {
  const result = { status: 400, errorType: "invalid_request_error" };
  assert.equal(shouldSkipConnDisable(result, false, false, "claude"), true);
});

test("context-overflow 400 stays request-scoped", () => {
  const result = {
    status: 400,
    errorType: "invalid_request_error",
    rawMessage: "prompt is too long: 250000 tokens > 200000 maximum",
  };
  assert.equal(shouldSkipConnDisable(result, false, false, "claude"), true);
});
