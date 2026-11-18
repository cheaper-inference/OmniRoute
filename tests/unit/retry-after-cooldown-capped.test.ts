/**
 * An upstream Retry-After header or a JSON `retryDelay` hint must not lock a
 * connection for longer than the 30-day provider cooldown cap. A huge header
 * value must also not make the cooldown timestamp writer throw.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  checkFallbackError,
  getUnavailableUntil,
  parseRetryAfterFromBody,
} from "../../open-sse/services/accountFallback.ts";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

test("Retry-After header of 100 years is capped at 30 days", () => {
  const res = checkFallbackError(429, "rate limit exceeded", 0, "gpt-4", "openai", {
    "retry-after": "3153600000",
  });
  assert.equal(res.retryHintSource, "header");
  assert.ok(res.cooldownMs <= THIRTY_DAYS_MS, `cooldownMs ${res.cooldownMs} exceeds 30 days`);
  assert.ok(res.cooldownMs > 0);
});

test("a 14-digit Retry-After does not make getUnavailableUntil throw", () => {
  const res = checkFallbackError(
    429,
    "rate limited",
    0,
    null,
    "openai",
    new Headers({ "retry-after": "99999999999999" })
  );
  assert.ok(res.cooldownMs <= THIRTY_DAYS_MS, `cooldownMs ${res.cooldownMs} exceeds 30 days`);
  assert.doesNotThrow(() => getUnavailableUntil(res.cooldownMs));
});

test("a normal Retry-After header is kept as sent", () => {
  const res = checkFallbackError(429, "rate limit exceeded", 0, "gpt-4", "openai", {
    "retry-after": "120",
  });
  assert.equal(res.retryHintSource, "header");
  assert.ok(res.cooldownMs > 115_000 && res.cooldownMs <= 120_000, `got ${res.cooldownMs}`);
});

test("body retryDelay of 9999999999s is capped at 30 days", () => {
  const r = parseRetryAfterFromBody({ error: { details: [{ retryDelay: "9999999999s" }] } });
  assert.equal(r.retryAfterMs, THIRTY_DAYS_MS);
});

test("a normal body retryDelay is kept as sent", () => {
  const r = parseRetryAfterFromBody({ error: { details: [{ retryDelay: "33s" }] } });
  assert.equal(r.retryAfterMs, 33_000);
});

test("a TPD 429 with a 100-year Retry-After is capped at 30 days", () => {
  const res = checkFallbackError(
    429,
    "[429]: Your account org-x / proj-y request reached organization TPD rate limit, current: 1537190, limit: 1500000",
    0,
    null,
    "openai-compatible-chat-e2971611-bc02-4c37-8fc5-39b8e3906fdf",
    { "retry-after": "3153600000" }
  );
  assert.equal(res.dailyQuotaExhausted, true);
  assert.equal(res.cooldownMs, THIRTY_DAYS_MS);
  assert.doesNotThrow(() => getUnavailableUntil(res.cooldownMs));
});

test("a TPD 429 with a normal Retry-After keeps the header wait", () => {
  const res = checkFallbackError(
    429,
    "[429]: Your account org-x / proj-y request reached organization TPD rate limit, current: 1537190, limit: 1500000",
    0,
    null,
    "openai-compatible-chat-e2971611-bc02-4c37-8fc5-39b8e3906fdf",
    { "retry-after": "3600" }
  );
  assert.equal(res.dailyQuotaExhausted, true);
  assert.ok(res.cooldownMs > 3_590_000 && res.cooldownMs <= 3_600_000, `got ${res.cooldownMs}`);
});
