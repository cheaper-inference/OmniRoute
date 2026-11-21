/**
 * Query and response contract of the self-service usage endpoint (GET /api/v1/me/usage).
 *
 * The response always goes through `selfUsageResponseSchema.parse()`, which drops any key
 * outside this contract. It carries the provider and model of the calling key's own requests as
 * recorded, counts, costs, average latency, success rates, dates and the retention setting. No
 * connection, account, other key or request id is part of it. A combo request whose every target
 * was refused is recorded with the routing label as provider (the combo name, `auto` or `combo`)
 * and the model string the client sent. Other refused requests (open circuit breaker, model
 * cooldown, quota-parked skip) keep the target provider and model.
 *
 * `costUsd` is the billed cost, where flat-rate subscription providers count $0. `listPriceUsd`
 * is the same usage priced at list price, subscriptions included. A request whose model has no
 * price row counts its stored cost (reported by the provider or calculated when recorded). Only
 * a request with neither counts 0, with no marker, so a total can be partial.
 *
 * `coverage.retentionDays` is the operator's raw usage-history retention setting.
 * `truncatedByRetention` compares the requested range with it and does not check whether rows
 * are actually missing. `byModel` keeps the 50 provider-and-model pairs with the most requests,
 * so with more pairs it does not add up to `summary`. `byModelTruncated` is then true. A model
 * whose pairs fall on both sides of the cut shows partial totals. `summary.uniqueModels` counts
 * every recorded model spelling.
 */

import { z } from "zod";

/**
 * Closed set of windows. It stops at `90d` to bound the cost of a call. The per-key source reads
 * raw usage history only, never the daily summaries (which carry no key).
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
  // The 50 provider-and-model pairs with the most requests.
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
  // True when more provider-and-model pairs existed than `byModel` keeps.
  byModelTruncated: z.boolean(),
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
