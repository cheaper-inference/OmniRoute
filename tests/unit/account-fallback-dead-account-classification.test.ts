/**
 * Dead-account classification in checkFallbackError.
 *
 * 1. DashScope answers a key with no balance as 400 `Arrearage` and a key without
 *    the model service as 403 `AccessDenied.Unpurchased`. Both stay true until the
 *    owner pays, so the connection must park (credits_exhausted), not retry.
 * 2. A ban phrase quoted inside a 429 or 5xx body is not a ban. Only a real
 *    refusal status may give the one-year permanent cooldown.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");

const ARREARAGE_BODY = JSON.stringify({
  error: {
    code: "Arrearage",
    type: "Arrearage",
    message: "Access denied, please make sure your account is in good standing.",
  },
  request_id: "req-1",
});

const UNPURCHASED_BODY = JSON.stringify({
  error: {
    code: "AccessDenied.Unpurchased",
    type: "AccessDenied.Unpurchased",
    message: "Access to model denied. Please make sure you are eligible for using the model.",
  },
});

test("DashScope Arrearage 400 parks the connection as credits exhausted", () => {
  const result = checkFallbackError(400, ARREARAGE_BODY, 0, "qwen-plus", "alibaba");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.creditsExhausted, true);
  assert.ok(result.cooldownMs > 0);
});

test("DashScope Arrearage matches by structured code when the body is plain text", () => {
  const result = checkFallbackError(
    400,
    "Access denied, please make sure your account is in good standing.",
    0,
    "qwen-plus",
    "alibaba",
    null,
    null,
    { code: "Arrearage", type: "Arrearage" }
  );
  assert.equal(result.creditsExhausted, true);
});

test("DashScope AccessDenied.Unpurchased 403 parks the connection, not a 3 s retry", () => {
  const result = checkFallbackError(403, UNPURCHASED_BODY, 0, "qwen-plus", "alibaba");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.creditsExhausted, true);
  assert.ok(result.cooldownMs >= 60_000, `cooldown ${result.cooldownMs} ms is too short`);
});

test("a DashScope Arrearage 400 is not skipped as a request-scoped 400", () => {
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 400,
        rawMessage: "Access denied, please make sure your account is in good standing.",
      },
      false,
      false,
      "alibaba"
    ),
    false
  );
});

test("generic 400 and generic AccessDenied 403 keep their old verdicts", () => {
  const bad400 = checkFallbackError(
    400,
    "Invalid value for temperature",
    0,
    "qwen-plus",
    "alibaba"
  );
  assert.equal(bad400.shouldFallback, false);
  assert.notEqual(bad400.creditsExhausted, true);

  const plain403 = checkFallbackError(
    403,
    JSON.stringify({ error: { code: "AccessDenied", message: "Access denied." } }),
    0,
    "qwen-plus",
    "alibaba"
  );
  assert.notEqual(plain403.creditsExhausted, true);
  assert.notEqual(plain403.permanent, true);
});

test("the good-standing phrase on a 429 is not a dead-account verdict", () => {
  const result = checkFallbackError(
    429,
    "rate limit reached; check that your account is in good standing",
    0,
    "qwen-plus",
    "alibaba"
  );
  assert.notEqual(result.creditsExhausted, true);
  assert.notEqual(result.permanent, true);
});

test("a ban phrase quoted in a 429 body does not lock the account for a year", () => {
  const result = checkFallbackError(
    429,
    "Rate limited. Earlier error was: your account has been suspended",
    0,
    "gpt-5",
    "openai"
  );
  assert.notEqual(result.permanent, true);
  assert.ok(result.cooldownMs < 24 * 60 * 60 * 1000, `cooldown ${result.cooldownMs} ms`);
});

test("a ban phrase quoted in a 500 body does not lock the account for a year", () => {
  const result = checkFallbackError(
    500,
    "upstream relay failure: account_deactivated",
    0,
    "gpt-5",
    "openai"
  );
  assert.notEqual(result.permanent, true);
  assert.ok(result.cooldownMs < 24 * 60 * 60 * 1000, `cooldown ${result.cooldownMs} ms`);
});

test("real ban statuses 401 and 403 stay permanent", () => {
  for (const status of [401, 403]) {
    const result = checkFallbackError(
      status,
      "This account has been deactivated",
      0,
      "m",
      "openai"
    );
    assert.equal(result.permanent, true, `status ${status}`);
  }
});
