// Opt-in (QUOTA_MONTHLY_TEXT_COOLDOWN=1): a 429 whose text names a monthly quota cap gets
// the long quota cooldown (parsed reset, else 24 h) instead of the 3 s generic backoff.
import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");

const FLAG = "QUOTA_MONTHLY_TEXT_COOLDOWN";
const DAY_MS = 24 * 60 * 60 * 1000;
const MONTHLY_BODY = "token plan person monthly quota limit exceeded";

test.afterEach(() => {
  delete process.env[FLAG];
});

test("flag unset: monthly quota text keeps the short generic cooldown", () => {
  const r = checkFallbackError(429, MONTHLY_BODY, 0, null, "qianfan");
  assert.equal(r.cooldownMs, 3000);
  assert.equal(r.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("flag on: monthly quota text without a reset time cools for 24 h as quota_exhausted", () => {
  process.env[FLAG] = "1";
  const r = checkFallbackError(429, MONTHLY_BODY, 0, null, "qianfan");
  assert.equal(r.shouldFallback, true);
  assert.equal(r.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(r.cooldownMs, DAY_MS);
});

test("flag on: a stated reset in days wins over the 24 h fallback", () => {
  process.env[FLAG] = "1";
  const r = checkFallbackError(
    429,
    "Monthly usage limit reached. Resets in 5 days.",
    0,
    null,
    "qianfan"
  );
  assert.equal(r.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.equal(r.cooldownMs, 5 * DAY_MS);
});

test("flag on: unrelated text that merely contains 'monthly' keeps the short cooldown", () => {
  process.env[FLAG] = "1";
  const r = checkFallbackError(
    429,
    "monthly digest service busy, too many requests",
    0,
    null,
    "qianfan"
  );
  assert.equal(r.cooldownMs, 3000);
  assert.equal(r.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});
