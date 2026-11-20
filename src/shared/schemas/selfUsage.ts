/**
 * Query and response contract of the self-service usage endpoint (GET /api/v1/me/usage).
 *
 * The response always goes through `selfUsageResponseSchema.parse()`, which drops any key
 * outside this contract. It carries model names and provider ids of the calling key's own
 * requests, counts, costs and dates: no connection, account, other key, combo or request id.
 *
 * `costUsd` is the billed cost, where flat-rate subscription providers count $0. `listPriceUsd`
 * is the same usage priced at list price, subscriptions included.
 */

import { z } from "zod";

/**
 * Closed set of windows. Longer ones are not offered: the per-key source reads raw rows only,
 * and rows older than the usage-history retention are gone (`coverage` says when).
 */
export const SELF_USAGE_RANGES = ["1d", "7d", "30d", "90d"] as const;
export type SelfUsageRange = (typeof SELF_USAGE_RANGES)[number];

export const selfUsageQuerySchema = z.object({
  range: z.enum(SELF_USAGE_RANGES).default("30d"),
});

const money = { costUsd: z.number(), listPriceUsd: z.number() };
const counts = {
  requests: z.number(),
  promptTokens: z.number(),
  completionTokens: z.number(),
  totalTokens: z.number(),
};

export const selfUsageResponseSchema = z.object({
  range: z.enum(SELF_USAGE_RANGES),
  generatedAt: z.string(),
  coverage: z.object({
    from: z.string(),
    to: z.string(),
    retentionDays: z.number(),
    truncatedByRetention: z.boolean(),
  }),
  summary: z.object({
    ...counts,
    ...money,
    successfulRequests: z.number(),
    successRatePct: z.number(),
    uniqueModels: z.number(),
    avgLatencyMs: z.number(),
    firstRequest: z.string().nullable(),
    lastRequest: z.string().nullable(),
  }),
  daily: z.array(z.object({ date: z.string(), ...counts, ...money })),
  dailyByModel: z.array(
    z.object({ date: z.string(), model: z.string(), totalTokens: z.number(), ...money })
  ),
  // Top 50 by requests.
  byModel: z.array(
    z.object({
      model: z.string(),
      provider: z.string(),
      ...counts,
      ...money,
      avgLatencyMs: z.number(),
      successRatePct: z.number(),
      lastUsed: z.string().nullable(),
    })
  ),
  byProvider: z.array(
    z.object({
      provider: z.string(),
      ...counts,
      ...money,
      avgLatencyMs: z.number(),
      successRatePct: z.number(),
    })
  ),
});

export type SelfUsageResponse = z.infer<typeof selfUsageResponseSchema>;
