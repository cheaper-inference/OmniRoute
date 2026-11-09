/**
 * Concurrency-limit 429s ("too many concurrent requests") are contention on a
 * healthy account, not a rate-limit or quota verdict. The predicate below lets
 * the connection-cooldown path skip the exponential backoff ladder for them.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { classify429, looksLikeConcurrencyLimit } from "../../src/shared/utils/classify429.ts";

const CONCURRENCY_BODIES = [
  "Too many concurrent requests for this account. Please retry shortly.",
  "concurrency limit exceeded",
  "Concurrent request limit reached (max 4)",
  "You have exceeded the concurrent requests limit for your organization",
  "parallel request limit reached",
  "Too many simultaneous requests",
  "Maximum concurrency reached for this key",
  JSON.stringify({ error: { message: "Too many concurrent connections", type: "rate_limit" } }),
  "[1302] 您当前使用该API的并发数过高，请降低并发，或联系客服增加限额。",
  "High concurrency usage of this API, please reduce concurrency or contact customer service",
];

for (const body of CONCURRENCY_BODIES) {
  test(`looksLikeConcurrencyLimit detects: ${body.slice(0, 48)}`, () => {
    assert.equal(looksLikeConcurrencyLimit(body), true);
  });
}

test("looksLikeConcurrencyLimit accepts parsed object bodies", () => {
  assert.equal(
    looksLikeConcurrencyLimit({ error: { message: "Too many concurrent requests" } }),
    true
  );
});

test("looksLikeConcurrencyLimit ignores plain rate limits and empty bodies", () => {
  assert.equal(looksLikeConcurrencyLimit("Rate limit exceeded: too many requests"), false);
  assert.equal(looksLikeConcurrencyLimit("Requests per minute limit reached"), false);
  assert.equal(looksLikeConcurrencyLimit(""), false);
  assert.equal(looksLikeConcurrencyLimit(null), false);
  assert.equal(looksLikeConcurrencyLimit(undefined), false);
});

test("looksLikeConcurrencyLimit never shadows an explicit quota body", () => {
  assert.equal(
    looksLikeConcurrencyLimit(
      "You exceeded your current quota, please check your plan and billing details (concurrent requests limit)"
    ),
    false
  );
  assert.equal(
    looksLikeConcurrencyLimit("daily limit reached; too many concurrent requests"),
    false
  );
  assert.equal(looksLikeConcurrencyLimit("insufficient_quota"), false);
});

test("looksLikeConcurrencyLimit stays linear on long adversarial input (ReDoS guard)", () => {
  const evil = "too many concurrent ".repeat(5000) + "x".repeat(50_000);
  const started = Date.now();
  looksLikeConcurrencyLimit(evil);
  assert.ok(Date.now() - started < 500, "pattern scan must stay fast");
});

test("classify429 contract for the breaker is unchanged: concurrency 429 still reads rate_limit", () => {
  // The circuit breaker's per-kind cooldowns key on FailureKind; the concurrency
  // signal is consumed by the connection-cooldown path only.
  assert.equal(classify429({ status: 429, body: "Too many concurrent requests" }), "rate_limit");
});
