/**
 * Response contract of the self-service quota endpoint (GET /api/v1/me/quota/[provider]).
 *
 * The response always goes through `selfQuotaResponseSchema.parse()`, which drops any key
 * outside this contract (no pool or connection ids, no account e-mail or name).
 *
 * `reason` values: store_unavailable, percent_attribution_unavailable, window_not_reported,
 * plus the ones resolveAccountQuotaEntries already emits (connection_lookup_failed,
 * not_supported, fetch_failed, not_available).
 */

import { z } from "zod";
import { PolicySchema, QuotaUnitSchema, QuotaWindowSchema } from "@/lib/quota/dimensions";

export const selfQuotaStatusSchema = z.enum(["ok", "stale", "unavailable"]);

const bar = z.object({
  used: z.number().nullable(),
  status: selfQuotaStatusSchema,
  reason: z.string().optional(),
  resetAt: z.string().nullable().optional(),
});

const share = z.object({
  fairShare: z.number(),
  consumed: z.number().nullable(),
  remaining: z.number().nullable(),
  status: selfQuotaStatusSchema,
  reason: z.string().optional(),
});

// Pool bucket; limit = plan limit x accounts.
const sharedDimension = z.object({
  unit: z.enum(["requests", "tokens", "usd"]),
  window: QuotaWindowSchema,
  limit: z.number(),
  total: bar.optional(),
  yourShare: share,
});

// One account; limit = plan limit.
const accountDimension = z.object({
  unit: z.literal("percent"),
  window: QuotaWindowSchema,
  limit: z.number(),
  account: bar.optional(),
  yourShare: share,
});

const account = z.object({
  slot: z.number().int().positive(),
  label: z.string(), // "Account 1", by pool order
  dimensions: z.array(accountDimension),
  modelWindows: z
    .object({
      status: selfQuotaStatusSchema,
      reason: z.string().optional(),
      windows: z.array(
        z.object({ label: z.string(), usedPercent: z.number(), resetAt: z.string().nullable() })
      ),
    })
    .optional(),
});

const pool = z.object({
  ref: z.string(),
  name: z.string(),
  provider: z.string(),
  borrowMode: z.literal("saturation"),
  policy: PolicySchema,
  weight: z.number() /* the weight the gate uses */,
  cap: z.object({ unit: QuotaUnitSchema, value: z.number() }).nullable(),
  accountVisible: z.boolean(),
  dimensions: z.array(sharedDimension),
  accounts: z.array(account),
});

const blocks = z.object({
  schedules: z.array(
    z.object({
      pool: z.string(),
      state: z.enum(["open", "closed"]),
      reason: z.enum(["blackout", "outside-window"]).nullable(),
      label: z.string().nullable(),
      retryAfterSeconds: z.number().nullable(),
      reserves: z.array(
        z.object({
          window: z.union([QuotaWindowSchema, z.literal("any")]),
          percent: z.number(),
        })
      ),
      budget: z
        .object({
          unit: z.enum(["requests", "tokens", "usd"]),
          window: QuotaWindowSchema,
          exhausted: z.boolean().nullable(),
        })
        .nullable(),
    })
  ),
  modelCaps: z.array(
    z.object({
      pool: z.string(),
      model: z.string(),
      unit: QuotaUnitSchema,
      window: z.literal("hourly"),
      cap: z.number(),
      consumed: z.number().nullable(),
      reached: z.boolean().nullable(),
    })
  ),
});

export const selfQuotaResponseSchema = z.object({
  provider: z.string(),
  generatedAt: z.string(),
  pools: z.array(pool),
  availableModels: z.array(z.string()),
  expiresAt: z.string().nullable(),
  apiBaseUrl: z.string().nullable(),
  blocks,
});

export type SelfQuotaStatus = z.infer<typeof selfQuotaStatusSchema>;
export type SelfQuotaBar = z.infer<typeof bar>;
export type SelfQuotaShare = z.infer<typeof share>;
export type SelfQuotaSharedDimension = z.infer<typeof sharedDimension>;
export type SelfQuotaAccountDimension = z.infer<typeof accountDimension>;
export type SelfQuotaAccount = z.infer<typeof account>;
export type SelfQuotaPool = z.infer<typeof pool>;
export type SelfQuotaBlocks = z.infer<typeof blocks>;
export type SelfQuotaResponse = z.infer<typeof selfQuotaResponseSchema>;
