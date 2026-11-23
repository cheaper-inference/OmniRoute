// Z.AI/GLM reports an out-of-credit account as HTTP 429 with code 1113 and a
// Chinese-only body ("余额不足或无可用资源包,请充值。"), no Retry-After. It must be
// classified as terminal credits exhaustion — not as a transient rate limit
// that keeps re-selecting a dead key on a short backoff. The sibling 1302 body
// ("Rate limit reached for requests") stays a transient rate limit.

import test from "node:test";
import assert from "node:assert/strict";

import { COOLDOWN_MS, RateLimitReason } from "../../open-sse/config/constants.ts";
import { checkFallbackError, isCreditsExhausted } from "../../open-sse/services/accountFallback.ts";
import { classifyProviderError } from "../../open-sse/services/errorClassifier.ts";
import { resolveTerminalConnectionStatus } from "../../src/sse/services/authTerminalStatus.ts";
import { classify429, looksLikeQuotaExhausted } from "../../src/shared/utils/classify429.ts";

// Live-captured Z.AI payloads. parseUpstreamError() hands the classifier the
// extracted `error.message`; raw-body callers see the whole JSON.
const GLM_1113_MESSAGE = "余额不足或无可用资源包,请充值。";
const GLM_1113_BODY = JSON.stringify({ error: { code: "1113", message: GLM_1113_MESSAGE } });
const GLM_1302_BODY = JSON.stringify({
  error: { code: "1302", message: "Rate limit reached for requests" },
});

function terminalStatusFor(status: number, errorText: string, provider: string) {
  const result = checkFallbackError(status, errorText, 0, "glm-4.6", provider);
  return resolveTerminalConnectionStatus(
    status,
    result,
    classifyProviderError(status, errorText, provider),
    provider,
    false,
    errorText
  );
}

for (const [label, text] of [
  ["extracted message", GLM_1113_MESSAGE],
  ["raw JSON body", GLM_1113_BODY],
] as const) {
  test(`GLM 1113 (${label}) is credits exhaustion, not a transient 429`, () => {
    assert.equal(isCreditsExhausted(text), true);
    for (const provider of ["glm", "zai"]) {
      const result = checkFallbackError(429, text, 0, "glm-4.6", provider);
      assert.equal(result.shouldFallback, true, provider);
      assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED, provider);
      assert.equal(result.creditsExhausted, true, provider);
      // Same cooldown as every other credits-exhausted body, not the short 429 backoff.
      assert.equal(result.cooldownMs, COOLDOWN_MS.paymentRequired, provider);
      assert.equal(terminalStatusFor(429, text, provider), "credits_exhausted", provider);
    }
  });
}

test("GLM 1113 bracketed code form is credits exhaustion", () => {
  assert.equal(isCreditsExhausted("[1113][余额不足或无可用资源包,请充值。]"), true);
  assert.equal(isCreditsExhausted("[1113] account has no available resource package"), true);
});

test("GLM 1113 body classifies as a quota (long-period) signal for 429s", () => {
  assert.equal(looksLikeQuotaExhausted(GLM_1113_MESSAGE), true);
  assert.equal(classify429({ status: 429, body: GLM_1113_BODY }), "quota_exhausted");
});

test("GLM 1302 rate limit stays transient with growing backoff", () => {
  const first = checkFallbackError(429, GLM_1302_BODY, 0, "glm-4.6", "glm");
  assert.equal(first.shouldFallback, true);
  assert.equal(first.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.equal(first.creditsExhausted, undefined);
  assert.equal(isCreditsExhausted(GLM_1302_BODY), false);
  assert.equal(terminalStatusFor(429, GLM_1302_BODY, "glm"), null);

  const second = checkFallbackError(
    429,
    GLM_1302_BODY,
    first.newBackoffLevel ?? 0,
    "glm-4.6",
    "glm"
  );
  assert.equal(second.creditsExhausted, undefined);
  assert.ok(second.cooldownMs > first.cooldownMs, "backoff grows on repeated 1302");
});

test("bare 请充值 (top-up) wording alone is NOT terminal — Kimi/Qwen quota stays quota", () => {
  const kimi = "您的账户额度已用尽，请充值后重试。";
  const qwen = "当前账户的免费额度已用完，请前往控制台充值。";
  for (const body of [kimi, qwen, "请充值"]) {
    assert.equal(isCreditsExhausted(body), false, body);
  }
  assert.equal(classify429({ status: 429, body: kimi }), "quota_exhausted");
  assert.equal(classify429({ status: 429, body: qwen }), "quota_exhausted");
});

test("bare code 1113 without the bracket marker is not a credits signal", () => {
  assert.equal(isCreditsExhausted("request id 1113 failed upstream"), false);
});
