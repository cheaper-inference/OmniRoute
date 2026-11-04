/**
 * A 429 that reports a CONCURRENCY limit means the account is healthy but busy.
 * checkFallbackError must fail over to a sibling connection immediately with a
 * short fixed cooldown and must NOT climb the exponential backoff ladder, nor
 * record a provider-breaker failure.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError, CONCURRENCY_LIMIT_COOLDOWN_MS } =
  await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");

test("concurrency 429 fails over without escalating backoff (apikey provider)", () => {
  const out = checkFallbackError(429, "concurrency limit exceeded", 3, null, "openai");
  assert.equal(out.shouldFallback, true);
  assert.equal(out.reason, "concurrency_limited");
  assert.ok(out.cooldownMs > 0 && out.cooldownMs <= 2000, `cooldown ${out.cooldownMs}`);
  assert.ok(
    out.newBackoffLevel === undefined || out.newBackoffLevel === 3,
    `backoff must not escalate, got ${out.newBackoffLevel}`
  );
  assert.equal(out.skipProviderBreaker, true);
  assert.equal(out.cooldownMs, CONCURRENCY_LIMIT_COOLDOWN_MS);
});

test("concurrency 429 fails over without escalating backoff (oauth provider)", () => {
  const out = checkFallbackError(
    429,
    JSON.stringify({ error: { message: "Too many concurrent requests for this account" } }),
    5,
    null,
    "claude"
  );
  assert.equal(out.shouldFallback, true);
  assert.equal(out.reason, "concurrency_limited");
  assert.ok(out.cooldownMs <= 2000, `cooldown ${out.cooldownMs}`);
  assert.ok(out.newBackoffLevel === undefined || out.newBackoffLevel === 5);
});

test("concurrency 429 honors an upstream Retry-After hint", () => {
  const out = checkFallbackError(429, "Too many concurrent requests", 2, null, "openai", {
    "retry-after": "7",
  });
  assert.equal(out.reason, "concurrency_limited");
  assert.equal(out.cooldownMs, 7000);
  assert.equal(out.usedUpstreamRetryHint, true);
  assert.ok(out.newBackoffLevel === undefined || out.newBackoffLevel === 2);
});

test("control: plain rate-limit 429 still climbs the backoff ladder", () => {
  const out = checkFallbackError(429, "Rate limit exceeded", 3, null, "openai");
  assert.equal(out.shouldFallback, true);
  assert.notEqual(out.reason, "concurrency_limited");
  assert.equal(out.newBackoffLevel, 4);
});

test("control: quota 429 that also mentions concurrency stays a quota verdict", () => {
  const quotaOnly = "You exceeded your current quota, please check your plan and billing details.";
  const mixed = `${quotaOnly} Too many concurrent requests.`;
  for (const provider of ["openai", "claude"]) {
    const baseline = checkFallbackError(429, quotaOnly, 0, null, provider);
    const out = checkFallbackError(429, mixed, 0, null, provider);
    assert.notEqual(out.reason, "concurrency_limited");
    assert.equal(out.reason, baseline.reason);
    assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  }
});

test("control: concurrency wording on a non-429 status is not reclassified", () => {
  const out = checkFallbackError(503, "too many concurrent requests", 1, null, "openai");
  assert.notEqual(out.reason, "concurrency_limited");
});
