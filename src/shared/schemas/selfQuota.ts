/**
 * Contract of the self-service quota endpoint (/api/v1/me/quota/[provider]): the response of GET
 * and PATCH, and the PATCH body by which the key holder records lending consent.
 *
 * The response always goes through `selfQuotaResponseSchema.parse()`, which drops any key
 * outside this contract (no pool or connection ids, no account e-mail or name).
 *
 * `reason` values: store_unavailable, percent_attribution_unavailable, window_not_reported,
 * plus the ones resolveAccountQuotaEntries already emits (connection_lookup_failed,
 * not_supported, fetch_failed, not_available). Percent shares also report percent_window_ended
 * and account_not_used_by_key.
 */

import { z } from "zod";
import { LENDING_UNTIL_MAX_MS, LENDING_UNTIL_MIN_MS } from "@/shared/constants/quotaLending";
import {
  BorrowModeSchema,
  PolicySchema,
  QuotaUnitSchema,
  QuotaWindowSchema,
} from "@/lib/quota/dimensions";

export const selfQuotaStatusSchema = z.enum(["ok", "stale", "unavailable"]);

/**
 * The {provider} path segment, shared by the API route and the /quota/{provider} page: trimmed,
 * lowercased, then a registry-id shape. Alias resolution happens after this check.
 */
export const selfQuotaProviderSegmentSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9][a-z0-9._-]{0,63}$/);

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
  // Percent windows only, with status ok or stale, for a key with the account scope:
  // attributed + external = consumed.
  attributed: z.number().optional(),
  external: z.number().optional(),
  // What the key may use above its share now, lent by other keys (an aggregate). Set only in a
  // consent pool. null when it does not apply to the key's policy or cannot be read.
  borrowAvailable: z.number().nullable().optional(),
});

/** The most member slices a dimension carries: the view sends none for a larger pool. */
export const MAX_MEMBER_SLICES = 20;

// One member's use of a window, without id, name or weight. Strict: an extra key is rejected.
const memberSlice = z
  .object({
    slot: z.number().int().positive(),
    consumed: z.number().nonnegative(),
    isYou: z.boolean(),
  })
  .strict();

// Pool bucket; limit = plan limit x accounts.
const sharedDimension = z.object({
  unit: z.enum(["requests", "tokens", "usd"]),
  window: QuotaWindowSchema,
  limit: z.number(),
  total: bar.optional(),
  yourShare: share,
  members: z.array(memberSlice).min(3).max(MAX_MEMBER_SLICES).optional(),
});

// One account; limit = plan limit.
const accountDimension = z.object({
  unit: z.literal("percent"),
  window: QuotaWindowSchema,
  limit: z.number(),
  account: bar.optional(),
  yourShare: share,
  members: z.array(memberSlice).min(3).max(MAX_MEMBER_SLICES).optional(),
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
  borrowMode: BorrowModeSchema,
  // The key's own lending consent. lendingUntil is epoch ms. lendingActive is true only in a
  // consent pool, with a percentage above 0 and the deadline not reached.
  lendingPercent: z.number().int().min(0).max(100).default(0),
  lendingUntil: z.number().int().nullable().default(null),
  lendingActive: z.boolean().default(false),
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

/** PATCH body: the key's lending consent for one pool, named by its `ref`. */
export const selfLendingPatchSchema = z
  .object({
    pool: z.string().regex(/^qpr_[0-9a-f]{32}$/),
    lendingPercent: z.number().int().min(0).max(100),
    lendingUntil: z.number().int().max(LENDING_UNTIL_MAX_MS).nullable().optional(),
  })
  .strict();

// Re-exported so the existing importers of this module keep their import path.
export { LENDING_UNTIL_MAX_MS, LENDING_UNTIL_MIN_MS };

/**
 * "ok" for no deadline or a future instant in milliseconds. "seconds" for a value below
 * LENDING_UNTIL_MIN_MS, which reads as Unix seconds. "past" for an instant at or before nowMs.
 */
export function checkLendingDeadline(
  until: number | null | undefined,
  nowMs: number
): "ok" | "seconds" | "past" {
  if (until === null || until === undefined) return "ok";
  if (until < LENDING_UNTIL_MIN_MS) return "seconds";
  return until <= nowMs ? "past" : "ok";
}

export type SelfLendingPatch = z.infer<typeof selfLendingPatchSchema>;
export type SelfQuotaStatus = z.infer<typeof selfQuotaStatusSchema>;
export type SelfQuotaBar = z.infer<typeof bar>;
export type SelfQuotaShare = z.infer<typeof share>;
export type SelfQuotaMemberSlice = z.infer<typeof memberSlice>;
export type SelfQuotaSharedDimension = z.infer<typeof sharedDimension>;
export type SelfQuotaAccountDimension = z.infer<typeof accountDimension>;
export type SelfQuotaAccount = z.infer<typeof account>;
export type SelfQuotaPool = z.infer<typeof pool>;
export type SelfQuotaBlocks = z.infer<typeof blocks>;
export type SelfQuotaResponse = z.infer<typeof selfQuotaResponseSchema>;
