import test from "node:test";
import assert from "node:assert/strict";
import {
  parseAntigravityQuotaSummary,
  parseAntigravityWeeklyQuotas,
  detectAntigravityArgonEligibility,
} from "../../../open-sse/services/usage/antigravityWeeklyQuota.ts";

test("parseAntigravityQuotaSummary and parseAntigravityWeeklyQuotas parse live Gemini 4 Argon group without clobbering Gemini Models", () => {
  // Given: the live retrieveUserQuotaSummary payload containing "Gemini Models", "Claude and GPT models", and "Gemini 4 Argon"
  const summaryData = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          {
            bucketId: "gemini-weekly",
            displayName: "Weekly Limit Remaining",
            window: "weekly",
            remainingFraction: 0.973,
            resetTime: "2026-10-31T00:58:36Z",
          },
          {
            bucketId: "gemini-5h",
            displayName: "Five Hour Limit Remaining",
            window: "5h",
            remainingFraction: 0.999,
            resetTime: "2026-10-26T09:24:03Z",
          },
        ],
      },
      {
        displayName: "Claude and GPT models",
        buckets: [
          {
            bucketId: "3p-weekly",
            displayName: "Weekly Limit Remaining",
            window: "weekly",
            remainingFraction: 1,
            resetTime: "2026-11-01T23:21:54Z",
          },
          {
            bucketId: "3p-5h",
            displayName: "Five Hour Limit Remaining",
            window: "5h",
            remainingFraction: 1,
            resetTime: "2026-10-26T09:39:21Z",
          },
        ],
      },
      {
        displayName: "Gemini 4 Argon",
        buckets: [
          {
            bucketId: "gemini-argon-wtu-weekly",
            displayName: "Gemini 4 Argon Weekly Limit",
            window: "weekly",
            remainingFraction: 0.44,
            resetTime: "2026-10-30T09:33:19Z",
          },
        ],
      },
    ],
  };

  // When: parsing summary and weekly quotas
  const summary = parseAntigravityQuotaSummary(summaryData);
  const quotas = parseAntigravityWeeklyQuotas(summaryData);

  // Then: all 3 groups are preserved, Gemini 3.x is not overwritten by Argon, and Argon weekly + alias are populated
  assert.equal(summary.groups.length, 3);
  assert.equal(summary.hasArgon, true);

  const expectedArgonQuota = {
    window: "weekly" as const,
    quotaGroupId: "gemini_4_argon",
    quotaAggregate: true as const,
    used: 560,
    total: 1000,
    resetAt: "2026-10-30T09:33:19.000Z",
    remainingPercentage: 44,
    unlimited: false,
    fractionReported: true,
    quotaSource: "retrieveUserQuotaSummary" as const,
  };

  assert.deepEqual(quotas.gemini_4_argon_weekly, expectedArgonQuota);
  assert.deepEqual(quotas.argon_weekly, expectedArgonQuota);
  assert.notEqual(
    quotas.gemini_4_argon_weekly,
    quotas.argon_weekly,
    "argon_weekly alias should be a distinct shallow copy"
  );
  assert.equal(quotas.gemini_weekly?.remainingPercentage, 97.3);
  assert.equal(quotas.claude_gpt_weekly?.remainingPercentage, 100);
});

test("parseAntigravityWeeklyQuotas normalizes varied Argon group names and falls back to bucketId when displayName is missing", () => {
  const variedDisplayPayload = {
    quotaSummary: {
      groups: [
        {
          displayName: "Gemini 4 Argon Models",
          buckets: [
            {
              bucketId: "gemini-argon-wtu-weekly",
              remaining: {
                remainingFraction: 0.4,
                resetTime: "2026-10-29T00:00:00Z",
              },
            },
          ],
        },
      ],
    },
  };

  const missingDisplayPayload = {
    groups: [
      {
        displayName: "",
        buckets: [
          {
            bucketId: "gemini-argon-wtu-weekly",
            displayName: "Argon Weekly",
            remainingFraction: 0.25,
            resetTime: "2026-10-30T00:00:00Z",
          },
        ],
      },
    ],
  };

  const variedQuotas = parseAntigravityWeeklyQuotas(variedDisplayPayload);
  const bucketFallbackQuotas = parseAntigravityWeeklyQuotas(missingDisplayPayload);

  assert.equal(variedQuotas.gemini_4_argon_weekly?.remainingPercentage, 40);
  assert.equal(variedQuotas.argon_weekly?.remainingPercentage, 40);
  assert.equal(variedQuotas.gemini_4_argon_weekly?.resetAt, "2026-10-29T00:00:00.000Z");

  assert.equal(bucketFallbackQuotas.gemini_4_argon_weekly?.remainingPercentage, 25);
  assert.equal(bucketFallbackQuotas.argon_weekly?.remainingPercentage, 25);
  assert.equal(bucketFallbackQuotas.gemini_4_argon_weekly?.used, 750);
  assert.equal(bucketFallbackQuotas.gemini_4_argon_weekly?.resetAt, "2026-10-30T00:00:00.000Z");
});

test("detectAntigravityArgonEligibility returns true for Argon-entitled accounts", () => {
  const summaryWithArgonGroup = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [{ bucketId: "gemini-weekly", remainingFraction: 0.9 }],
      },
      {
        displayName: "Gemini 4 Argon",
        buckets: [{ bucketId: "gemini-argon-wtu-weekly", remainingFraction: 0 }],
      },
    ],
  };

  const summaryWithArgonBucket = {
    quotaSummary: {
      groups: [
        {
          displayName: "Experimental Tier",
          buckets: [{ bucketId: "gemini-argon-wtu-weekly", remainingFraction: 0.5 }],
        },
      ],
    },
  };

  assert.equal(detectAntigravityArgonEligibility(summaryWithArgonGroup), true);
  assert.equal(detectAntigravityArgonEligibility(summaryWithArgonBucket), true);
});

test("detectAntigravityArgonEligibility returns false for non-Argon accounts or when Argon bucket is disabled", () => {
  const nonArgonSummary = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          {
            bucketId: "gemini-weekly",
            displayName: "Weekly Limit Remaining",
            window: "weekly",
            remainingFraction: 0.8,
            resetTime: "2026-10-28T12:00:00Z",
          },
        ],
      },
      {
        displayName: "Claude and GPT models",
        buckets: [
          {
            bucketId: "3p-weekly",
            displayName: "Weekly Limit Remaining",
            window: "weekly",
            remainingFraction: 0.6,
            resetTime: "2026-10-28T12:00:00Z",
          },
        ],
      },
    ],
  };

  const disabledArgonBucketSummary = {
    groups: [
      {
        displayName: "Experimental Tier",
        buckets: [
          {
            bucketId: "gemini-argon-wtu-weekly",
            disabled: true,
            remainingFraction: 0,
          },
        ],
      },
    ],
  };

  const quotas = parseAntigravityWeeklyQuotas(nonArgonSummary);

  assert.equal(detectAntigravityArgonEligibility(nonArgonSummary), false);
  assert.equal(quotas.gemini_4_argon_weekly, undefined);
  assert.equal(quotas.argon_weekly, undefined);
  assert.equal(detectAntigravityArgonEligibility(disabledArgonBucketSummary), false);
});

test("parseAntigravityQuotaSummary distinguishes Pro plan with Argon group vs Ultra plan without Argon group", () => {
  const proSummary = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          {
            bucketId: "gemini-weekly",
            window: "weekly",
            remainingFraction: 0.8,
            resetTime: "2026-10-31T00:00:00Z",
          },
        ],
      },
      {
        displayName: "Gemini 4 Argon",
        description:
          "For paid Pro plans, Argon quota is separate. Higher Argon quota (included as part of the larger Gemini quota bucket) is available on Ultra plans.",
        buckets: [
          {
            bucketId: "gemini-argon-wtu-weekly",
            window: "weekly",
            remainingFraction: 0.5,
            resetTime: "2026-10-31T00:00:00Z",
          },
        ],
      },
    ],
  };

  const ultraSummary = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          {
            bucketId: "gemini-weekly",
            window: "weekly",
            remainingFraction: 0.95,
            resetTime: "2026-10-31T00:00:00Z",
          },
        ],
      },
    ],
  };

  const parsedPro = parseAntigravityQuotaSummary(proSummary, "Pro");
  assert.equal(parsedPro.hasArgon, true);
  assert.equal(parsedPro.quotas.gemini_4_argon_weekly?.remainingPercentage, 50);
  assert.equal(parsedPro.quotas.gemini_weekly?.remainingPercentage, 80);

  const parsedUltra = parseAntigravityQuotaSummary(ultraSummary, "Ultra");
  assert.equal(parsedUltra.hasArgon, true);
  assert.equal(parsedUltra.quotas.gemini_4_argon_weekly, undefined);
  assert.equal(parsedUltra.quotas.gemini_weekly?.remainingPercentage, 95);

  const parsedFreeWithoutArgon = parseAntigravityQuotaSummary(ultraSummary, "Free");
  assert.equal(parsedFreeWithoutArgon.hasArgon, false);
});

test("fetchAndParseAntigravityWeeklyQuotas and fetchAndParseAntigravityQuotaSummary handle network responses and fallback group IDs", async () => {
  const { fetchAndParseAntigravityWeeklyQuotas, fetchAndParseAntigravityQuotaSummary } =
    await import("../../../open-sse/services/usage/antigravityWeeklyQuota.ts");

  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = (async () => {
      return {
        ok: true,
        json: async () => ({
          groups: [
            {
              groupId: "custom_fallback_tier",
              displayName: "Custom Fallback Tier",
              buckets: [
                {
                  bucketId: "custom-weekly",
                  window: "weekly",
                  remainingFraction: 0.9,
                  resetTime: "2026-11-01T00:00:00Z",
                },
              ],
            },
          ],
        }),
      } as Response;
    }) as typeof fetch;

    const summary = await fetchAndParseAntigravityQuotaSummary(
      "test-token-1234567890123456",
      "test-proj",
      "ide",
      { forceRefresh: true }
    );
    assert.equal(summary.groups.length, 1);
    assert.equal(summary.groups[0].id, "custom_fallback_tier");
    assert.equal(summary.quotas["custom_fallback_tier_weekly"]?.remainingPercentage, 90);

    const weekly = await fetchAndParseAntigravityWeeklyQuotas(
      "test-token-1234567890123456",
      "test-proj",
      "ide"
    );
    assert.equal(weekly["custom_fallback_tier_weekly"]?.remainingPercentage, 90);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
