/**
 * Issue #2321 — Anthropic OAuth (Claude Pro/Team) 429 responses with phrases
 * like "Usage Limit Reached" must be classified as QUOTA_EXHAUSTED with a
 * long cooldown, not as a generic RATE_LIMIT_EXCEEDED with a ~5s base
 * cooldown. Without this fix all Pro accounts on the same subscription
 * cascade into a tight retry loop until the 5h quota window resets.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { classifyErrorText, parseRetryFromErrorText, checkFallbackError, getProviderProfile } =
  await import("../../open-sse/services/accountFallback.ts");
const { isSubscriptionQuotaText, isClaudeModelCreditEntitlementText } =
  await import("../../open-sse/services/quotaTextCooldowns.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");

test("#2321 classifyErrorText flags 'Usage Limit Reached' as QUOTA_EXHAUSTED", () => {
  const out = classifyErrorText("Usage Limit Reached. Please wait until 10:00 AM");
  assert.equal(out, RateLimitReason.QUOTA_EXHAUSTED);
});

test("#2321 classifyErrorText flags 'Claude Pro usage limit reached' as QUOTA_EXHAUSTED", () => {
  const out = classifyErrorText("Claude Pro usage limit reached.");
  assert.equal(out, RateLimitReason.QUOTA_EXHAUSTED);
});

test("#2321 classifyErrorText flags possessive 'you've reached your usage limit'", () => {
  const out = classifyErrorText("Sorry — you've reached your usage limit for this model.");
  assert.equal(out, RateLimitReason.QUOTA_EXHAUSTED);
});

test("#2321 classifyErrorText still returns RATE_LIMIT_EXCEEDED for generic rate_limit", () => {
  // Regression guard: short-term rate limits (per-minute TPM) must remain
  // transient so we don't lock accounts for an hour after a normal burst.
  const out = classifyErrorText("rate_limit_exceeded: too many requests");
  assert.equal(out, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("Claude native account rate-limit text is subscription quota only for Claude", () => {
  const text = "This request would exceed your account's rate limit. Please try again later.";
  assert.equal(isSubscriptionQuotaText(text.toLowerCase(), "claude"), true);
  assert.equal(isSubscriptionQuotaText(text.toLowerCase(), "antigravity"), false);
});

test("#2321 parseRetryFromErrorText extracts an ISO timestamp", () => {
  const future = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const ms = parseRetryFromErrorText(`Usage Limit Reached. Try again at ${future}`);
  assert.ok(ms !== null, "expected non-null wait time");
  assert.ok(ms! > 30 * 60 * 1000 && ms! <= 60 * 60 * 1000, `expected ~1h wait, got ${ms}ms`);
});

test("#2321 parseRetryFromErrorText ignores past ISO timestamps", () => {
  const past = "2020-01-01T00:00:00Z";
  const ms = parseRetryFromErrorText(`Try again at ${past}`);
  assert.equal(ms, null);
});

test("#2321 parseRetryFromErrorText still handles the 'reset after Xh' format (backward compat)", () => {
  const ms = parseRetryFromErrorText("Your quota will reset after 1h30m");
  assert.equal(ms, (60 + 30) * 60 * 1000);
});

test("#2321 checkFallbackError returns ~1h cooldown for OAuth 429 + Usage Limit Reached", () => {
  const out = checkFallbackError(
    429,
    "Usage Limit Reached. Please wait until 5h.",
    0,
    null,
    "claude" // OAuth provider
  );
  assert.equal(out.shouldFallback, true);
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  // Either the 1h default OR an upstream retry hint — both are far above
  // the ~5s base cooldown that caused the cascade.
  assert.ok(
    out.cooldownMs >= 5 * 60 * 1000,
    `expected long cooldown (>=5min), got ${out.cooldownMs}ms`
  );
});

test("Claude native account rate-limit text gets subscription quota cooldown", () => {
  const out = checkFallbackError(
    429,
    "This request would exceed your account's rate limit. Please try again later.",
    0,
    null,
    "claude"
  );
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.ok(out.cooldownMs >= 5 * 60 * 1000, `expected long cooldown, got ${out.cooldownMs}ms`);
});

test("#2321 checkFallbackError ignores ISO timestamp when upstream retry hints are disabled", () => {
  const future = new Date(Date.now() + 45 * 60 * 1000).toISOString();
  const out = checkFallbackError(
    429,
    `Claude Pro usage limit reached. Try again at ${future}`,
    0,
    null,
    "claude"
  );
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(out.usedUpstreamRetryHint, false);
  assert.equal(out.cooldownMs, 60 * 60 * 1000);
});

test("#2321 checkFallbackError honors ISO timestamp when upstream retry hints are enabled", () => {
  const futureMs = 45 * 60 * 1000;
  const future = new Date(Date.now() + futureMs).toISOString();
  const profile = { ...getProviderProfile("claude"), useUpstreamRetryHints: true };
  const out = checkFallbackError(
    429,
    `Claude Pro usage limit reached. Try again at ${future}`,
    0,
    null,
    "claude",
    null,
    profile
  );
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  // Within ~30s of the requested wait time.
  assert.ok(
    Math.abs(out.cooldownMs - futureMs) < 30_000,
    `expected ~${futureMs}ms cooldown, got ${out.cooldownMs}ms`
  );
});

test("#2321 generic 429 without quota keyword still gets the short cooldown path", () => {
  // Regression guard: plain rate-limit must NOT get the 1h cooldown.
  const out = checkFallbackError(429, "rate_limit_exceeded", 0, null, "claude");
  assert.equal(out.shouldFallback, true);
  // Generic 429 keeps the short retryable path (< 5 min).
  assert.ok(
    out.cooldownMs < 5 * 60 * 1000,
    `expected short cooldown (<5min), got ${out.cooldownMs}ms`
  );
});

// Claude returns this 429 once the account's monthly extra-usage spend cap is reached. It is a
// long-window quota (it clears when the billing month rolls over or the cap is raised), so the
// connection must be parked for the subscription cooldown instead of being retried every few seconds.
const MONTHLY_SPEND_LIMIT_TEXT =
  "This request would exceed your account's monthly spend limit. Please try again later.";

test("Claude monthly spend limit text is subscription quota only for Claude", () => {
  assert.equal(isSubscriptionQuotaText(MONTHLY_SPEND_LIMIT_TEXT.toLowerCase(), "claude"), true);
  assert.equal(isSubscriptionQuotaText(MONTHLY_SPEND_LIMIT_TEXT.toLowerCase(), "codex"), false);
});

test("Claude monthly spend limit 429 gets the subscription quota cooldown", () => {
  const out = checkFallbackError(429, MONTHLY_SPEND_LIMIT_TEXT, 0, null, "claude");
  assert.equal(out.shouldFallback, true);
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.ok(out.cooldownMs >= 5 * 60 * 1000, `expected long cooldown, got ${out.cooldownMs}ms`);
});

test("Claude per-minute rate limit text is not mistaken for the monthly spend limit", () => {
  const out = checkFallbackError(
    429,
    "rate_limit_error: 50 requests per minute",
    0,
    null,
    "claude"
  );
  assert.ok(out.cooldownMs < 5 * 60 * 1000, `expected short cooldown, got ${out.cooldownMs}ms`);
});

const MODEL_CREDIT_ENTITLEMENT_TEXT = "[429]: Usage credits are required for this model.";

test("#18058: model-credit entitlement is a Claude-only long-window quota", () => {
  assert.equal(
    isSubscriptionQuotaText(MODEL_CREDIT_ENTITLEMENT_TEXT.toLowerCase(), "claude"),
    true
  );
  for (const provider of ["codex", "antigravity", "gemini", "anthropic", undefined]) {
    assert.equal(
      isSubscriptionQuotaText(MODEL_CREDIT_ENTITLEMENT_TEXT.toLowerCase(), provider),
      false,
      String(provider)
    );
  }
  assert.equal(isClaudeModelCreditEntitlementText(MODEL_CREDIT_ENTITLEMENT_TEXT), true);
  assert.equal(isClaudeModelCreditEntitlementText(null), false);
  assert.equal(isClaudeModelCreditEntitlementText(undefined), false);
  assert.equal(isSubscriptionQuotaText("requests per minute limit reached", "claude"), false);
});

test("#18058: model entitlement 429 uses hour-scale quota, not short retry or depleted wallet", () => {
  const result = checkFallbackError(429, MODEL_CREDIT_ENTITLEMENT_TEXT, 0, null, "claude");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(result.cooldownMs, 60 * 60 * 1000);
  assert.notEqual(result.creditsExhausted, true, "one-model entitlement is not account-wide debt");
  assert.notEqual(result.permanent, true);
});

test("#18058: unrelated Claude rate-limit 429 stays transient", () => {
  const result = checkFallbackError(
    429,
    "rate_limit_error: 50 requests per minute",
    0,
    null,
    "claude"
  );
  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs < 5 * 60 * 1000);
});
