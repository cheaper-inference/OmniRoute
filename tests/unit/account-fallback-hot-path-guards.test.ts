/**
 * Hot-path guards for accountFallback:
 * - With no model lockouts, the per-connection lock check must not touch the
 *   canonical-provider LRU (it runs once per connection on every request).
 * - A very long error text must not stall classification: several patterns use an
 *   unbounded `.*` between two literals, which is quadratic on long text.
 */
import test from "node:test";
import assert from "node:assert/strict";

const af = await import("../../open-sse/services/accountFallback.ts");
const { checkFallbackError, isModelLocked, getModelLockoutInfo, lockModel } = af;

test("isModelLocked with no lockouts does not touch the canonical provider cache", () => {
  af.clearAllModelLockouts();
  af.canonicalProviderCache.clear();
  assert.equal(isModelLocked("openai", "conn-1", "gpt-4o"), false);
  assert.equal(getModelLockoutInfo("openai", "conn-1", "gpt-4o"), null);
  assert.equal(af.canonicalProviderCache.size, 0);
});

test("isModelLocked still sees a lock once one exists", () => {
  af.clearAllModelLockouts();
  lockModel("openai", "conn-1", "gpt-4o", "rate_limit_exceeded", 60_000);
  assert.equal(isModelLocked("openai", "conn-1", "gpt-4o"), true);
  assert.equal(isModelLocked("openai", "conn-2", "gpt-4o"), false);
  assert.ok(getModelLockoutInfo("openai", "conn-1", "gpt-4o"));
  af.clearAllModelLockouts();
  assert.equal(isModelLocked("openai", "conn-1", "gpt-4o"), false);
});

test("a 100 KB error text is classified in bounded time", () => {
  const started = performance.now();
  checkFallbackError(400, "context ".repeat(12_500), 0, "gpt-4o", "openai");
  checkFallbackError(400, "max ".repeat(25_000), 0, "gpt-4o", "openai");
  const elapsedMs = performance.now() - started;
  assert.ok(elapsedMs < 150, `classification took ${Math.round(elapsedMs)} ms`);
});

test("a context-overflow signal at the head or the tail of a long text still matches", () => {
  const filler = "lorem ipsum ".repeat(1_000);
  const head = checkFallbackError(
    400,
    `maximum context length exceeded. ${filler}`,
    0,
    "gpt-4o",
    "openai"
  );
  const tail = checkFallbackError(
    400,
    `${filler} maximum context length exceeded.`,
    0,
    "gpt-4o",
    "openai"
  );
  const none = checkFallbackError(400, filler, 0, "gpt-4o", "openai");
  assert.equal(head.shouldFallback, true);
  assert.equal(tail.shouldFallback, true);
  assert.equal(none.shouldFallback, false);
});

test("a long JSON body keeps its structure, so a Google daily quota is still detected", () => {
  const body = JSON.stringify({
    error: {
      code: 429,
      message: "x".repeat(3_000),
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.QuotaFailure",
          violations: [{ quotaId: "GenerateRequestsPerDayPerProjectPerModel-FreeTier" }],
        },
      ],
    },
  });
  const result = checkFallbackError(429, body, 0, "gemini-2.5-pro", "gemini");
  assert.equal(result.dailyQuotaExhausted, true);
});

test("a JSON body over the text cap still yields its Google daily quota and retry hint", () => {
  const body = JSON.stringify({
    error: {
      code: 429,
      message: "x".repeat(6_000),
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.QuotaFailure",
          violations: [{ quotaId: "GenerateRequestsPerDayPerProjectPerModel-FreeTier" }],
        },
      ],
    },
  });
  const result = checkFallbackError(429, body, 0, "gemini-2.5-pro", "gemini");
  assert.equal(result.dailyQuotaExhausted, true);
});

test("a 100 KB JSON-looking body is classified in bounded time", () => {
  const started = performance.now();
  checkFallbackError(400, `{"error":"${"context ".repeat(12_500)}"}`, 0, "gpt-4o", "openai");
  const elapsedMs = performance.now() - started;
  assert.ok(elapsedMs < 150, `classification took ${Math.round(elapsedMs)} ms`);
});
