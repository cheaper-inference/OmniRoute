import test from "node:test";
import assert from "node:assert/strict";

import { providerRuleRegistry } from "../../open-sse/config/providerErrorRules.ts";
import {
  checkFallbackError,
  shouldMarkAccountExhaustedFrom429,
} from "../../open-sse/services/accountFallback.ts";
import {
  SAME_ACCOUNT_TRANSPORT_RETRY_MAX,
  sameAccountRetryMaxFor,
  shouldRetrySameAccountTransport,
} from "../../src/sse/services/sameAccountTransportRetry.ts";

/**
 * Freebuff meters a free account in Freebucks: one admission reserves a whole
 * hour. An exhausted pool answers HTTP 429 with `pool: "freebucks"` - the same
 * status a per-minute throttle uses - so the classifier has to read the body,
 * otherwise the account is parked for seconds and retried against a budget that
 * only refills at the Pacific-day boundary.
 */

function matchFor(provider: string, status: number, body: unknown) {
  const rules = providerRuleRegistry.get(provider) ?? [];
  for (const rule of rules) {
    const match = rule.match({ status, headers: {}, body });
    if (match) return match;
  }
  return null;
}

/** Live shape captured 2026-11-18 from an account with daily 25/25 spent. */
const EXHAUSTED = {
  status: "rate_limited",
  pool: "freebucks",
  poolLabel: "Freebucks",
  limit: 25,
  recentCount: 25,
  period: "pacific_day",
  retryAfterMs: 6_148_883,
  freebucksShortfall: { price: 15, balance: 0 },
};

test("freebuff rules: a spent Freebucks pool is quota exhaustion at connection scope", () => {
  const match = matchFor("freebuff", 429, EXHAUSTED);
  assert.ok(match, "the exhausted body must match a rule");
  assert.equal(match!.reason, "quota_exhausted");
  assert.equal(match!.scope, "connection", "the pool is per account, not per model");
});

test("freebuff rules: the alias family matches too", () => {
  assert.equal(matchFor("fb", 429, EXHAUSTED)?.reason, "quota_exhausted");
});

test("freebuff rules: a short throttle with quota left is not exhaustion", () => {
  const throttled = {
    status: "rate_limited",
    pool: "freebucks",
    limit: 25,
    recentCount: 3,
    retryAfterMs: 5_000,
  };
  assert.equal(matchFor("freebuff", 429, throttled), null);
});

test("freebuff rules: a reported shortfall is exhaustion even without counters", () => {
  const match = matchFor("freebuff", 429, {
    status: "rate_limited",
    pool: "freebucks",
    freebucksShortfall: { price: 15, balance: 0 },
  });
  assert.equal(match?.reason, "quota_exhausted");
});

test("freebuff rules: counter exhaustion without freebucksShortfall still matches", () => {
  const counterOnly = {
    status: "rate_limited",
    pool: "freebucks",
    limit: 25,
    recentCount: 25,
  };
  const match = matchFor("freebuff", 429, counterOnly);
  assert.equal(match?.reason, "quota_exhausted");
  assert.equal(match?.scope, "connection");
});

test("freebuff rules: other providers and statuses are untouched", () => {
  assert.equal(matchFor("freebuff", 500, EXHAUSTED), null, "only 429/402 carry this");
  assert.equal(matchFor("openai", 429, EXHAUSTED), null, "rule is provider-scoped");
});

test("same-account retry: content-policy refusals are never retried for freebuff", () => {
  const base = {
    provider: "freebuff",
    status: 500,
    errorText: "safety refusal",
    attempt: 0,
    hasForcedConnection: false,
    hasEmittedOutput: false,
  };
  assert.equal(
    shouldRetrySameAccountTransport({ ...base, errorCode: "content_policy_violation" }),
    false
  );
  assert.equal(shouldRetrySameAccountTransport({ ...base, errorCode: "cyber_policy" }), false);
  assert.equal(
    shouldRetrySameAccountTransport({ ...base, errorType: "content_policy_violation" }),
    false
  );
});

test("same-account retry: freebuff gets a larger budget than the global default", () => {
  // Every Freebuff admission bills a one-hour slot, so retrying the account in
  // use is cheaper than rotating to a fresh one for a transient blip.
  assert.equal(sameAccountRetryMaxFor("freebuff"), 3);
  assert.equal(sameAccountRetryMaxFor("fb"), 3);
  assert.equal(sameAccountRetryMaxFor("openai"), SAME_ACCOUNT_TRANSPORT_RETRY_MAX);
  assert.equal(sameAccountRetryMaxFor(null), SAME_ACCOUNT_TRANSPORT_RETRY_MAX);
});

test("same-account retry: the freebuff budget is actually consumed by the predicate", () => {
  const base = {
    provider: "freebuff",
    status: 503,
    errorText: "upstream connect error",
    attempt: 0,
    hasForcedConnection: false,
    hasEmittedOutput: false,
  };
  // Three retries are allowed for freebuff, the fourth is refused.
  assert.equal(shouldRetrySameAccountTransport({ ...base, attempt: 0 }), true);
  assert.equal(shouldRetrySameAccountTransport({ ...base, attempt: 2 }), true);
  assert.equal(shouldRetrySameAccountTransport({ ...base, attempt: 3 }), false);
  // Another provider keeps the global single retry.
  assert.equal(shouldRetrySameAccountTransport({ ...base, provider: "openai", attempt: 1 }), false);
});

test("same-account retry: freebuff retries transient 429/500/409 but skips exhausted Freebucks", () => {
  const base = {
    provider: "freebuff",
    attempt: 0,
    hasForcedConnection: false,
    hasEmittedOutput: false,
  };
  assert.equal(
    shouldRetrySameAccountTransport({
      ...base,
      status: 429,
      errorText: "overusage: please slow down",
      errorCode: "freebuff_transient_rate_limit",
    }),
    true
  );
  assert.equal(
    shouldRetrySameAccountTransport({
      ...base,
      status: 500,
      errorText: "internal server error",
    }),
    true
  );
  assert.equal(
    shouldRetrySameAccountTransport({
      ...base,
      status: 409,
      errorText: "model_locked",
      errorCode: "model_locked",
    }),
    true
  );
  assert.equal(
    shouldRetrySameAccountTransport({
      ...base,
      status: 409,
      errorText: "purchase_claim_released",
      errorCode: "purchase_claim_released",
    }),
    false
  );
  assert.equal(
    shouldRetrySameAccountTransport({
      ...base,
      status: 429,
      errorText: JSON.stringify(EXHAUSTED),
      errorCode: "freebucks_exhausted",
    }),
    false,
    "spent Freebucks pool should rotate to the next account immediately"
  );
  assert.equal(
    shouldRetrySameAccountTransport({
      ...base,
      status: 401,
      errorText: "invalid token",
      errorCode: "invalid_token",
    }),
    false
  );
  // Global 429 behavior for non-freebuff providers stays non-retryable here.
  assert.equal(
    shouldRetrySameAccountTransport({
      ...base,
      provider: "openai",
      status: 429,
      errorText: "rate limit",
    }),
    false
  );
});

test("freebuff fallback: exhausted Freebucks parks the account for the real reset and rotates", () => {
  const decision = checkFallbackError(
    429,
    JSON.stringify(EXHAUSTED),
    0,
    "deepseek/deepseek-v4-flash",
    "freebuff",
    null,
    null,
    { code: "freebucks_exhausted", type: "rate_limit_error" }
  );
  assert.equal(decision.shouldFallback, true);
  assert.equal(decision.reason, "quota_exhausted");
  assert.equal(decision.cooldownMs, 6_148_883);
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "freebuff",
      null,
      undefined,
      undefined,
      JSON.stringify(EXHAUSTED)
    ),
    true
  );
});

test("freebuff fallback: exhausted Freebucks also honors Retry-After header when body was summarized", () => {
  const headers = new Headers({ "retry-after": "6149" });
  const decision = checkFallbackError(
    429,
    "Freebuff Freebucks limit reached (rate_limited)",
    0,
    "deepseek/deepseek-v4-flash",
    "freebuff",
    headers,
    null,
    { code: "freebucks_exhausted", type: "rate_limit_error" }
  );
  assert.equal(decision.shouldFallback, true);
  assert.equal(decision.cooldownMs, 6_149_000);
});

test("freebuff fallback: transient errors and overusage 429 never rotate to a standby account", () => {
  for (const [status, text, code] of [
    [429, "Freebuff limit reached (rate_limited): overusage", "freebuff_transient_rate_limit"],
    [500, "Freebuff upstream failed (500): overloaded", "upstream_error"],
    [502, "Freebuff upstream failed (502): bad gateway", "upstream_error"],
    [503, "Freebuff upstream failed (503): service unavailable", "upstream_error"],
    [409, "Freebuff upstream failed (409): model_unavailable", "model_unavailable"],
    [
      410,
      "Freebuff rejected this client version (410 freebuff_update_required)",
      "freebuff_update_required",
    ],
  ] as const) {
    const decision = checkFallbackError(
      status,
      text,
      0,
      "deepseek/deepseek-v4-flash",
      "freebuff",
      null,
      null,
      {
        code,
      }
    );
    assert.equal(
      decision.shouldFallback,
      false,
      `status ${status} (${code}) must not burn standby account`
    );
    assert.equal(decision.cooldownMs, 0, `status ${status} (${code}) must not cool active account`);
  }
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "freebuff",
      "deepseek/deepseek-v4-flash",
      undefined,
      undefined,
      "overusage: please slow down"
    ),
    false,
    "transient 429 must not poison quotaCache for 5 minutes"
  );
});

test("freebuff fallback: invalid token (401) and country_blocked (403) still rotate", () => {
  const authDecision = checkFallbackError(
    401,
    "Freebuff authentication failed (401)",
    0,
    null,
    "freebuff",
    null,
    null,
    {
      code: "invalid_token",
      type: "authentication_error",
    }
  );
  assert.equal(authDecision.shouldFallback, true);

  const regionDecision = checkFallbackError(
    403,
    "Freebuff blocks this region (country_blocked)",
    0,
    null,
    "freebuff",
    null,
    null,
    { code: "country_blocked", type: "provider_policy" }
  );
  assert.equal(regionDecision.shouldFallback, true);
});
