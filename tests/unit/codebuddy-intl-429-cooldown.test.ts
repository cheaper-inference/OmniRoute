// Phase E — dated 429 reaches the shared cooldown path.
//
// The persistent freeze reuses `provider_connections.rate_limited_until`, which
// `getProviderCredentials` already honors. What was missing is the PARSE: the
// shared hint parser did not read CodeBuddy's `{code, msg, data:{resetTime}}`
// envelope, so a dated 429 degraded to the generic backoff and the account was
// retried before the provider's unlock date.
import test from "node:test";
import assert from "node:assert/strict";

import { parseDetailedRetryHintFromJsonBody } from "../../open-sse/services/retryAfterJson.ts";

const MAX = 24 * 60 * 60 * 1000;

test("reads the CodeBuddy data.resetTime envelope", () => {
  const resetTime = new Date(Date.now() + 45 * 60_000).toISOString();
  const body = JSON.stringify({ code: 11129, msg: "rate limited", data: { resetTime } });

  const hint = parseDetailedRetryHintFromJsonBody(body, MAX);
  assert.ok(hint);
  assert.equal(hint.provenance, "body");
  // Within a couple of seconds of the requested 45 minutes.
  assert.ok(Math.abs(hint.retryAfterMs - 45 * 60_000) < 5_000, String(hint.retryAfterMs));
});

test("reads snake_case and epoch variants of the envelope", () => {
  const epochSeconds = Math.floor(Date.now() / 1000) + 600;
  const body = JSON.stringify({ data: { reset_time: epochSeconds } });
  const hint = parseDetailedRetryHintFromJsonBody(body, MAX);
  assert.ok(hint);
  assert.ok(Math.abs(hint.retryAfterMs - 600_000) < 5_000);
});

test("an already-expired envelope date is not a hint", () => {
  const resetTime = new Date(Date.now() - 60_000).toISOString();
  const body = JSON.stringify({ data: { resetTime } });
  assert.equal(parseDetailedRetryHintFromJsonBody(body, MAX), null);
});

test("a bare 429 body still yields no hint", () => {
  const body = JSON.stringify({ code: 429, msg: "too many requests" });
  assert.equal(parseDetailedRetryHintFromJsonBody(body, MAX), null);
});

test("the google.rpc shapes keep precedence over the envelope", () => {
  const resetTime = new Date(Date.now() + 30 * 60_000).toISOString();
  const body = JSON.stringify({
    error: {
      details: [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "26s" }],
      resetsAt: resetTime,
    },
    data: { resetTime },
  });

  const hint = parseDetailedRetryHintFromJsonBody(body, MAX);
  assert.ok(hint);
  assert.equal(hint.provenance, "google_rpc_retry_info");
  assert.equal(hint.retryAfterMs, 26_000);
});
