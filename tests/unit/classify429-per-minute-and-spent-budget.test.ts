import { test } from "node:test";
import assert from "node:assert/strict";
import { classify429, looksLikeQuotaExhausted } from "../../src/shared/utils/classify429.ts";

// A throttle that reuses the quota error code must read as a rate limit.
test("classify429: insufficient_quota beside a per-minute limit is a rate limit", () => {
  assert.equal(
    classify429({
      status: 429,
      body: {
        error: {
          code: "insufficient_quota",
          message: "Rate limit reached: 60 requests per minute for this token plan. Retry later.",
        },
      },
    }),
    "rate_limit"
  );
  assert.equal(
    classify429({
      status: 429,
      body: "insufficient_quota: exceeded the RPM limit (30 requests per minute)",
    }),
    "rate_limit"
  );
});

test("classify429: OpenAI out-of-credit text keeps insufficient_quota as quota_exhausted", () => {
  assert.equal(
    classify429({
      status: 429,
      body: {
        error: {
          type: "insufficient_quota",
          code: "insufficient_quota",
          message: "You exceeded your current quota, please check your plan and billing details.",
        },
      },
    }),
    "quota_exhausted"
  );
});

test("classify429: a per-minute word does not hide a longer window or spent balance", () => {
  assert.equal(
    classify429({
      status: 429,
      body: "insufficient_quota: per minute burst is fine but your daily limit is spent",
    }),
    "quota_exhausted"
  );
  assert.equal(
    classify429({
      status: 429,
      body: "insufficient_quota per minute check failed: insufficient balance, please recharge",
    }),
    "quota_exhausted"
  );
});

test("classify429: a non-429 insufficient_quota body stays quota_exhausted", () => {
  assert.equal(
    classify429({ status: 402, body: "insufficient_quota (60 requests per minute plan)" }),
    "quota_exhausted"
  );
});

// LiteLLM spent-key 429.
const LITELLM_SPENT_KEY =
  "Budget has been exceeded! Key=sk-xxxx Current cost: 10.2, Max budget: 10.0";

test("classify429: a spent LiteLLM key budget is quota_exhausted", () => {
  assert.equal(classify429({ status: 429, body: LITELLM_SPENT_KEY }), "quota_exhausted");
  assert.equal(
    classify429({ status: 429, body: { error: { message: LITELLM_SPENT_KEY } } }),
    "quota_exhausted"
  );
  assert.equal(looksLikeQuotaExhausted(LITELLM_SPENT_KEY), true);
  assert.equal(looksLikeQuotaExhausted("budget exhausted for this team"), true);
});

test("classify429: plain rate-limit and budget-token wording stay rate_limit", () => {
  assert.equal(classify429({ status: 429, body: "Rate limit exceeded" }), "rate_limit");
  assert.equal(
    classify429({ status: 429, body: "thinking.budget_tokens must be less than max_tokens" }),
    "rate_limit"
  );
  assert.equal(looksLikeQuotaExhausted("Rate limit exceeded"), false);
});

// Decision order step 3: a sub-hour retry window beats quota keywords (#9504). A spent budget
// whose body also declares a short retry delay therefore stays a rate limit; one without a hint
// is quota exhaustion (test above). A retry delay of an hour or more does not override it.
test("classify429: a spent budget with a short retry hint is a rate limit, with a long one it is quota", () => {
  assert.equal(
    classify429({
      status: 429,
      body: {
        error: {
          message: `${LITELLM_SPENT_KEY}. Please retry in 30s`,
          details: [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "30s" }],
        },
      },
    }),
    "rate_limit"
  );
  assert.equal(
    classify429({
      status: 429,
      body: {
        error: {
          message: LITELLM_SPENT_KEY,
          details: [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay: "86400s" }],
        },
      },
    }),
    "quota_exhausted"
  );
});
