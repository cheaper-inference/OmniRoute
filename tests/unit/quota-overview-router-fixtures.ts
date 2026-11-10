import assert from "node:assert/strict";
import { getOpenrouterUsage } from "../../open-sse/services/usage/openrouter.ts";
import { correctFromRateLimitHeaders } from "../../open-sse/services/openrouterFreeWindow.ts";
import { mock } from "node:test";
import { buildKiroUsageResult } from "../../open-sse/services/usage/kiro.ts";
import { buildCodexUsageQuotas } from "../../open-sse/services/codexUsageQuotas.ts";
import { getDevinCliUsage } from "../../open-sse/services/usage/devinCli.ts";
import { getKimiUsage } from "../../open-sse/services/usage/kimi.ts";
import { getGlmUsage } from "../../open-sse/services/usage/glm.ts";
import { formatGitHubQuotaSnapshot } from "../../open-sse/services/usage/github.ts";
import { normalizeClaudeUsageQuotas } from "../../open-sse/services/usage/claudeQuota.ts";
import { getAntigravityUsage } from "../../open-sse/services/usage/antigravity.ts";
import { parseAntigravityQuotaSummary } from "../../open-sse/services/usage/antigravityWeeklyQuota.ts";

export const now = Date.parse("2099-01-01T00:00:00Z");
export const resetAt = "2099-01-02T00:00:00Z";
export const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };
export const quota = (remainingPercentage: number) => ({
  used: 100 - remainingPercentage,
  total: 100,
  remainingPercentage,
  resetAt,
});
// These are synthetic response builders, not recorded provider/production payloads.
export async function withResponse<T>(body: unknown, run: () => Promise<T>): Promise<T> {
  const fetch = mock.method(globalThis, "fetch", async () =>
    body instanceof Uint8Array ? new Response(new Uint8Array(body)) : Response.json(body)
  );
  try {
    return await run();
  } finally {
    fetch.mock.restore();
  }
}
function varint(value: number): number[] {
  const bytes: number[] = [];
  while (value > 127) {
    bytes.push((value % 128) + 128);
    value = Math.floor(value / 128);
  }
  return [...bytes, value];
}
function message(field: number, bytes: number[]): number[] {
  return [...varint(field * 8 + 2), ...varint(bytes.length), ...bytes];
}
export function kiro(base: number, trial = base) {
  const result = buildKiroUsageResult({
    nextDateReset: resetAt,
    usageBreakdownList: [
      {
        resourceType: "AGENTIC_REQUEST",
        currentUsageWithPrecision: 100 - base,
        usageLimitWithPrecision: 100,
        freeTrialInfo: {
          currentUsageWithPrecision: 100 - trial,
          usageLimitWithPrecision: 100,
        },
      },
    ],
  });
  assert.ok("quotas" in result);
  return result;
}
export function codex(plan: number, spark: number | null = plan, review = plan, credits?: object) {
  const window = (remaining: number, seconds: number) => ({
    used_percent: 100 - remaining,
    reset_at: Date.parse(resetAt) / 1000,
    limit_window_seconds: seconds,
  });
  const rate = (remaining: number) => ({
    primary_window: window(remaining, 18000),
    secondary_window: window(remaining, 604800),
  });
  const payload = {
    rate_limit: rate(plan),
    additional_rate_limits:
      spark === null ? [] : [{ limit_name: "GPT-5.3-Codex-Spark", rate_limit: rate(spark) }],
    code_review_rate_limit: rate(review),
    credits,
  };
  return { ...buildCodexUsageQuotas(payload), payload };
}
export async function devin(daily: number, weekly = daily) {
  const fields = [
    [14, daily],
    [15, weekly],
    [17, Date.parse(resetAt) / 1000],
    [18, Date.parse(resetAt) / 1000],
  ];
  const bytes = new Uint8Array(
    message(
      1,
      message(
        13,
        fields.flatMap(([field, value]) => [...varint(field * 8), ...varint(value)])
      )
    )
  );
  const usage = await withResponse(bytes, () => getDevinCliUsage("synthetic-token"));
  assert.ok(usage.quotas, "Devin builder must decode synthetic quota fields");
  return usage;
}
export async function kimi(short: number, weekly = short) {
  return withResponse(
    {
      usage: { limit: 100, used: 100 - weekly, resetTime: resetAt },
      limits: [
        {
          window: { duration: 5, timeUnit: "TIME_UNIT_HOUR" },
          detail: { limit: 100, used: 100 - short, resetTime: resetAt },
        },
      ],
    },
    () => getKimiUsage(undefined, "synthetic-key")
  );
}
export async function glm(short: number, weekly = short, monthly = short) {
  const usage = await withResponse(
    {
      success: true,
      data: {
        limits: [
          {
            type: "TOKENS_LIMIT",
            unit: 3,
            number: 5,
            percentage: 100 - short,
            nextResetTime: Date.parse(resetAt),
          },
          {
            type: "TOKENS_LIMIT",
            unit: 6,
            number: 1,
            percentage: 100 - weekly,
            nextResetTime: Date.parse(resetAt),
          },
          {
            type: "TIME_LIMIT",
            usage: 100,
            remaining: monthly,
            nextResetTime: Date.parse(resetAt),
          },
        ],
      },
    },
    () => getGlmUsage("synthetic-key")
  );
  assert.ok("quotas" in usage, "GLM builder must consume the synthetic limits");
  return usage;
}
export function github(remaining: number) {
  return {
    quotas: Object.fromEntries(
      ["chat", "completions", "premium_interactions"].map((name) => [
        name,
        formatGitHubQuotaSnapshot({ entitlement: 100, remaining }, resetAt)!,
      ])
    ),
  };
}
export function claude(plan: number, sonnet = plan) {
  return normalizeClaudeUsageQuotas({
    five_hour: { utilization: 100 - plan, resets_at: resetAt },
    seven_day: { utilization: 100 - plan, resets_at: resetAt },
    seven_day_sonnet: { utilization: 100 - sonnet, resets_at: resetAt },
  });
}
export async function openrouter(balance: number, free = balance) {
  const syntheticConnectionId = `synthetic-openrouter-${balance}-${free}`;
  correctFromRateLimitHeaders(`conn:${syntheticConnectionId}`, {
    "x-ratelimit-limit": "100",
    "x-ratelimit-remaining": String(free),
    "x-ratelimit-reset": String(Date.parse(resetAt) / 1000),
  });
  const usage = await withResponse(
    {
      data: {
        limit: 100,
        limit_remaining: balance,
        limit_reset: Date.parse(resetAt) / 1000,
        total_credits: 100,
        total_usage: 100 - balance,
      },
    },
    () => getOpenrouterUsage(syntheticConnectionId, "synthetic-key")
  );
  assert.ok(usage.quotas, "actual usage builder must succeed against synthetic fetch");
  return { ...usage, syntheticConnectionId };
}
export async function antigravityModels(
  provider: "antigravity" | "agy",
  gemini: number,
  claude = 80
) {
  const model = (remaining: number) => ({
    quotaInfo: { remainingFraction: remaining / 100, resetTime: resetAt },
  });
  const usage = await withResponse(
    {
      currentTier: { id: "free-tier" },
      models: { "gemini-3-flash": model(gemini), "claude-sonnet-4-5": model(claude) },
    },
    () =>
      getAntigravityUsage(
        provider,
        `synthetic-${provider}-${gemini}-${claude}`,
        undefined,
        undefined,
        undefined,
        { forceRefresh: true }
      )
  );
  assert.ok(
    usage.quotas?.["gemini-3-flash"],
    "real model builder must consume the synthetic response"
  );
  return usage;
}
export function antigravity(gemini: number, claude = gemini) {
  const summary = parseAntigravityQuotaSummary({
    groups: [
      {
        groupId: "gemini",
        buckets: ["session", "weekly"].map((window) => ({
          window,
          remainingFraction: gemini / 100,
          resetTime: resetAt,
        })),
      },
      {
        groupId: "claude_gpt",
        buckets: ["session", "weekly"].map((window) => ({
          window,
          remainingFraction: claude / 100,
          resetTime: resetAt,
        })),
      },
    ],
  });
  return { quotas: summary.quotas, quotaGroups: summary.groups };
}
