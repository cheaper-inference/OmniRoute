// Pooled gateways of the new-api family report a dry key as HTTP 400 with
// code `insufficient_user_quota` (message often localized), and some upstreams
// say "run out of funds". Both are account-scoped credit exhaustion: the pool
// must rotate to the next key and park the dry one as credits_exhausted.
// A generic request-scoped 400 must stay non-fallback and never turn terminal.

import test from "node:test";
import assert from "node:assert/strict";

import { checkFallbackError, isCreditsExhausted } from "../../open-sse/services/accountFallback.ts";
import { classifyProviderError } from "../../open-sse/services/errorClassifier.ts";
import { resolveTerminalConnectionStatus } from "../../src/sse/services/authTerminalStatus.ts";

function classify(status: number, errorText: string, provider = "openai") {
  const result = checkFallbackError(status, errorText, 0, "gpt-4.1", provider);
  const terminal = result.shouldFallback
    ? resolveTerminalConnectionStatus(
        status,
        result,
        classifyProviderError(status, errorText, provider),
        provider,
        false,
        errorText
      )
    : null;
  return { result, terminal };
}

test("400 new-api insufficient_user_quota with a localized message rotates and parks", () => {
  const body = JSON.stringify({
    error: { code: "insufficient_user_quota", message: "用户额度不足", type: "api_error" },
  });
  assert.equal(isCreditsExhausted(body), true);
  const { result, terminal } = classify(400, body);
  assert.equal(result.shouldFallback, true);
  assert.equal(result.creditsExhausted, true);
  assert.equal(terminal, "credits_exhausted");
});

test("400 bare insufficient_user_quota code rotates and parks", () => {
  const { result, terminal } = classify(400, "insufficient_user_quota");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.creditsExhausted, true);
  assert.equal(terminal, "credits_exhausted");
});

test("400 'run out of funds' rotates and parks", () => {
  for (const text of ["You have run out of funds", "Account is out of funds."]) {
    assert.equal(isCreditsExhausted(text), true, text);
    const { result, terminal } = classify(400, text);
    assert.equal(result.shouldFallback, true, text);
    assert.equal(result.creditsExhausted, true, text);
    assert.equal(terminal, "credits_exhausted", text);
  }
});

test("b.ai 'credit insufficient balance' 400 still classifies as credits exhaustion", () => {
  const body = JSON.stringify({
    error: {
      message: "credit insufficient balance: balance=70953 required=433802",
      type: "api_error",
      code: "insufficient_user_quota",
    },
  });
  const { result, terminal } = classify(400, body);
  assert.equal(result.shouldFallback, true);
  assert.equal(result.creditsExhausted, true);
  assert.equal(terminal, "credits_exhausted");
});

test("ordinary request-scoped 400s never become terminal", () => {
  for (const text of [
    "context length exceeded",
    "Invalid request: messages must not be empty",
    JSON.stringify({ error: { code: "invalid_request_error", message: "bad parameter" } }),
    // Neither "funds" nor "quota" alone is a credit signal.
    "Transfer of funds is not supported by this endpoint",
    "quota_project_id is not a valid parameter",
  ]) {
    const { result, terminal } = classify(400, text);
    assert.notEqual(result.creditsExhausted, true, text);
    assert.equal(terminal, null, text);
  }
});

test("agentrouter's temporary 用户额度不足 (restated to 429) is not parked terminal", () => {
  // parseUpstreamError() passes the extracted message; the new-api code travels
  // separately as structuredError.type and is not part of the text signals.
  const message = "用户额度不足";
  assert.equal(isCreditsExhausted(message), false);
  const result = checkFallbackError(429, message, 0, "claude-sonnet-4", "agentrouter", null, null, {
    type: "insufficient_user_quota",
  });
  assert.notEqual(result.creditsExhausted, true);
});
