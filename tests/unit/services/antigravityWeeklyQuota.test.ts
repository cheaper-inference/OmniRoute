import test from "node:test";
import assert from "node:assert";
import {
  parseAntigravityWeeklyQuotas,
  detectAntigravityArgonEligibility,
} from "../../../open-sse/services/usage/antigravityWeeklyQuota.ts";

test("parseAntigravityWeeklyQuotas parses Gemini 4 Argon Models weekly quota and populates argon_weekly alias", () => {
  // Given: a retrieveUserQuotaSummary payload containing "Gemini 4 Argon Models" and standard family groups
  const summaryData = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          {
            bucketId: "gemini-wtu-weekly",
            displayName: "Weekly",
            remainingFraction: 0.85,
            resetTime: "2026-10-28T12:00:00Z",
          },
        ],
      },
      {
        displayName: "Gemini 4 Argon Models",
        buckets: [
          {
            bucketId: "gemini-argon-wtu-5h",
            displayName: "5 hour",
            remainingFraction: 0.9,
            resetTime: "2026-10-23T20:00:00Z",
          },
          {
            bucketId: "gemini-argon-wtu-weekly",
            displayName: "Weekly",
            remainingFraction: 0.72,
            resetTime: "2026-10-28T12:00:00Z",
          },
        ],
      },
      {
        displayName: "Claude and GPT models",
        buckets: [
          {
            bucketId: "claude-gpt-wtu-weekly",
            displayName: "Weekly",
            remainingFraction: 0.5,
            resetTime: "2026-10-28T12:00:00Z",
          },
        ],
      },
    ],
  };

  // When: parsing the weekly quotas
  const quotas = parseAntigravityWeeklyQuotas(summaryData);

  // Then: both gemini_4_argon_weekly and argon_weekly are present with exact expected fields
  const expectedArgonQuota = {
    used: 280,
    total: 1000,
    resetAt: "2026-10-28T12:00:00.000Z",
    remainingPercentage: 72,
    unlimited: false,
    fractionReported: true,
    quotaSource: "retrieveUserQuota",
    displayName: "Gemini 4 Argon Models",
  };

  assert.deepStrictEqual(quotas.gemini_4_argon_weekly, expectedArgonQuota);
  assert.deepStrictEqual(quotas.argon_weekly, expectedArgonQuota);
  assert.notStrictEqual(
    quotas.gemini_4_argon_weekly,
    quotas.argon_weekly,
    "argon_weekly alias should be a distinct shallow copy"
  );
  assert.strictEqual(quotas.gemini_weekly?.remainingPercentage, 85);
  assert.strictEqual(quotas.claude_gpt_weekly?.remainingPercentage, 50);
});

test("parseAntigravityWeeklyQuotas normalizes varied Argon group names and falls back to bucketId when displayName is missing", () => {
  // Given: varied group display names ("Gemini Argon Models") or missing group displayName with bucketId "gemini-argon-wtu-weekly"
  const variedDisplayPayload = {
    quotaSummary: {
      groups: [
        {
          displayName: "Gemini Argon Models",
          buckets: [
            {
              bucketId: "gemini-argon-wtu-weekly",
              remainingFraction: 0.4,
              resetTime: "2026-10-29T00:00:00Z",
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

  // When: parsing both payloads
  const variedQuotas = parseAntigravityWeeklyQuotas(variedDisplayPayload);
  const bucketFallbackQuotas = parseAntigravityWeeklyQuotas(missingDisplayPayload);

  // Then: both normalize canonically to gemini_4_argon_weekly and argon_weekly
  assert.strictEqual(variedQuotas.gemini_4_argon_weekly?.remainingPercentage, 40);
  assert.strictEqual(variedQuotas.argon_weekly?.remainingPercentage, 40);
  assert.strictEqual(
    variedQuotas.gemini_4_argon_weekly?.resetAt,
    "2026-10-29T00:00:00.000Z"
  );

  assert.strictEqual(bucketFallbackQuotas.gemini_4_argon_weekly?.remainingPercentage, 25);
  assert.strictEqual(bucketFallbackQuotas.argon_weekly?.remainingPercentage, 25);
  assert.strictEqual(bucketFallbackQuotas.gemini_4_argon_weekly?.used, 750);
  assert.strictEqual(
    bucketFallbackQuotas.gemini_4_argon_weekly?.resetAt,
    "2026-10-30T00:00:00.000Z"
  );
});

test("detectAntigravityArgonEligibility returns true for Argon-entitled accounts", () => {
  // Given: a summary payload with Gemini 4 Argon Models group
  const summaryWithArgonGroup = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [{ bucketId: "gemini-wtu-weekly", remainingFraction: 0.9 }],
      },
      {
        displayName: "Gemini 4 Argon Models",
        buckets: [{ bucketId: "gemini-argon-wtu-weekly", remainingFraction: 0.72 }],
      },
    ],
  };

  // And: a summary payload where group displayName is generic but bucketId contains argon (not disabled)
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

  // When / Then
  assert.strictEqual(detectAntigravityArgonEligibility(summaryWithArgonGroup), true);
  assert.strictEqual(detectAntigravityArgonEligibility(summaryWithArgonBucket), true);
});

test("detectAntigravityArgonEligibility returns false for non-Argon accounts or when Argon bucket is disabled", () => {
  // Given: a non-Argon account payload with only Gemini Models and Claude and GPT models
  const nonArgonSummary = {
    groups: [
      {
        displayName: "Gemini Models",
        buckets: [
          {
            bucketId: "gemini-wtu-weekly",
            displayName: "Weekly",
            remainingFraction: 0.8,
            resetTime: "2026-10-28T12:00:00Z",
          },
        ],
      },
      {
        displayName: "Claude and GPT models",
        buckets: [
          {
            bucketId: "claude-gpt-wtu-weekly",
            displayName: "Weekly",
            remainingFraction: 0.6,
            resetTime: "2026-10-28T12:00:00Z",
          },
        ],
      },
    ],
  };

  // And: a payload where an Argon bucket exists on a generic group but is explicitly disabled
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

  // When: checking eligibility and weekly quotas
  const quotas = parseAntigravityWeeklyQuotas(nonArgonSummary);

  // Then: eligibility is false and gemini_4_argon_weekly is absent
  assert.strictEqual(detectAntigravityArgonEligibility(nonArgonSummary), false);
  assert.strictEqual(quotas.gemini_4_argon_weekly, undefined);
  assert.strictEqual(quotas.argon_weekly, undefined);
  assert.strictEqual(detectAntigravityArgonEligibility(disabledArgonBucketSummary), false);
});

test("detectAntigravityArgonEligibility returns undefined when summaryData is null, empty, or invalid", () => {
  // Given / When / Then: transient failures or empty groups must return undefined, never false
  assert.strictEqual(detectAntigravityArgonEligibility(null), undefined);
  assert.strictEqual(detectAntigravityArgonEligibility(undefined), undefined);
  assert.strictEqual(detectAntigravityArgonEligibility("invalid"), undefined);
  assert.strictEqual(detectAntigravityArgonEligibility({}), undefined);
  assert.strictEqual(detectAntigravityArgonEligibility({ groups: [] }), undefined);
  assert.strictEqual(
    detectAntigravityArgonEligibility({ quotaSummary: { groups: [] } }),
    undefined
  );
});
