/**
 * usage/infcode.ts — InfCode (Token Infinity) credit-quota fetcher.
 *
 * InfCode connects through OAuth and talks to the Tokfinity inference gateway
 * (see config/providers/registry/inf-code/index.ts). Seat credits are NOT
 * reported by that gateway — they live on the user-center dashboard API:
 *
 *   GET {userCenter}/api/user_center/v1/dashboard/personal/quotas
 *   Authorization: Bearer <inf-code access token>
 *
 * Response observed live on 2026-11-05 (`data_mode: "live"`), abridged:
 *
 *   {
 *     "meta": { "currency": "CNY", "timezone": "Asia/Shanghai", ... },
 *     "credit_usage": {
 *       "seat": {
 *         "status": "available",
 *         "used_credits": "376.0882",
 *         "total_credits": "14600",
 *         "remaining_credits": "14223.9118",
 *         "unit": "credit",
 *         "usage_rate": 0.0257,
 *         "seat_cycle": { "start_at": "...", "end_at": "2026-12-04T16:00:00Z", ... }
 *       },
 *       "shared_pool": { ..., "period": { "from": "2026-11-01", "to": "2026-12-01" } },
 *       "package":     { ... },
 *       "subject_limit": { "limit_enabled": false, "limit_credits": null, ... }
 *     },
 *     "links": { "tokenhub_console": "https://tokenhub.infplacex.com/console" }
 *   }
 *
 * Three upstream quirks drive the mapping below:
 *
 * 1. Credits are decimal STRINGS ("376.0882"), never numbers — every value
 *    goes through `toNumber`.
 * 2. `shared_pool` and `package` are still present with `total_credits: "0"`
 *    for an account that has no pool/package. A 0/0 quota renders as
 *    *exhausted* in Provider Limits, so those buckets are dropped instead.
 * 3. The seat window resets on `seat_cycle.end_at` (a timestamp), while the
 *    other buckets only carry `period.to` (a date) — both are read, seat
 *    first, because `createQuotaFromUsage` accepts either form.
 *
 * The dashboard host is configurable because private deployments serve the
 * same user center under their own `infone-*.tokensinfinity.com` host
 * (INF_CODE_USER_CENTER_BASE, mirroring INF_CODE_API_BASE).
 */

import { sanitizeErrorMessage } from "../../utils/error.ts";
import { createQuotaFromUsage, type UsageQuota } from "./quota.ts";
import { pickFirstNonEmptyString, toNumber, toRecord } from "./scalars.ts";

/** Public Token Infinity user center. Private deployments override via env. */
const DEFAULT_USER_CENTER_BASE = "https://infone.tokensinfinity.com";

/** Personal credit dashboard behind the user-center login. */
const QUOTAS_PATH = "/api/user_center/v1/dashboard/personal/quotas";

/**
 * The user center is a different origin from the inference gateway and is not
 * on any request hot path (Provider Limits sync only), so a stalled call must
 * not hold the whole sync — same bound as the other usage leaves.
 */
const QUOTA_FETCH_TIMEOUT_MS = 15_000;

/** Resolve the quotas endpoint (per-connection override → env → public SaaS). */
export function resolveInfCodeQuotasUrl(baseOverride?: string | null): string {
  const configured = pickFirstNonEmptyString(baseOverride, process.env.INF_CODE_USER_CENTER_BASE);
  const base = (configured ?? DEFAULT_USER_CENTER_BASE).replace(/\/+$/, "");
  return `${base}${QUOTAS_PATH}`;
}

interface CreditBucket {
  used: number;
  total: number;
  resetAt: string | null;
}

/**
 * Read one `credit_usage.*` bucket. Returns null when the bucket is not an
 * actual quota — either upstream marked it unavailable, or its denominator is
 * zero (a pool the account does not have).
 */
function readCreditBucket(value: unknown): CreditBucket | null {
  const bucket = toRecord(value);
  const status = bucket.status;
  if (typeof status === "string" && status !== "available") return null;

  const total = toNumber(bucket.total_credits, 0);
  if (total <= 0) return null;

  const used = Math.min(Math.max(0, toNumber(bucket.used_credits, 0)), total);
  const seatCycle = toRecord(bucket.seat_cycle);
  const period = toRecord(bucket.period);
  const resetAt = pickFirstNonEmptyString(seatCycle.end_at, period.to) ?? null;

  return { used, total, resetAt };
}

function buildQuota(bucket: CreditBucket, displayName: string): UsageQuota {
  return { ...createQuotaFromUsage(bucket.used, bucket.total, bucket.resetAt), displayName };
}

/**
 * Map the user-center payload onto the `{ [quotaKey]: UsageQuota }` shape the
 * dashboard and quota preflight consume. Pure — exported for unit testing.
 */
export function mapInfCodeQuotas(payload: unknown): Record<string, UsageQuota> {
  const creditUsage = toRecord(toRecord(payload).credit_usage);
  const quotas: Record<string, UsageQuota> = {};

  const seat = readCreditBucket(creditUsage.seat);
  if (seat) quotas.seat_credits = buildQuota(seat, "Seat credits");

  const sharedPool = readCreditBucket(creditUsage.shared_pool);
  if (sharedPool) quotas.shared_pool_credits = buildQuota(sharedPool, "Shared pool");

  const pkg = readCreditBucket(creditUsage.package);
  if (pkg) quotas.package_credits = buildQuota(pkg, "Package credits");

  // Self-set personal cap. Off by default upstream (`limit_enabled: false`),
  // and a disabled cap with limit_credits null is not a quota.
  const subjectLimit = toRecord(creditUsage.subject_limit);
  if (subjectLimit.limit_enabled === true) {
    const total = toNumber(subjectLimit.limit_credits, 0);
    if (total > 0) {
      quotas.personal_limit_credits = buildQuota(
        {
          used: Math.min(Math.max(0, toNumber(subjectLimit.used_credits, 0)), total),
          total,
          resetAt: null,
        },
        "Personal limit"
      );
    }
  }

  return quotas;
}

/**
 * InfCode Usage
 * Fetches seat/shared-pool/package credit usage from the user-center API.
 */
export async function getInfCodeUsage(
  accessToken?: string | null,
  providerSpecificData?: unknown
): Promise<unknown> {
  const token = typeof accessToken === "string" ? accessToken.trim() : "";
  if (!token) {
    return { message: "InfCode session token not available. Re-authenticate the connection." };
  }

  const psd = toRecord(providerSpecificData);
  const baseOverride = typeof psd.userCenterBase === "string" ? psd.userCenterBase : null;

  try {
    const response = await fetch(resolveInfCodeQuotasUrl(baseOverride), {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      signal: AbortSignal.timeout(QUOTA_FETCH_TIMEOUT_MS),
    });

    if (!response.ok) {
      // The quota sync recognises auth-shaped messages and refreshes the
      // connection before retrying, so keep the status in the text.
      if (response.status === 401 || response.status === 403) {
        return {
          message: `InfCode rejected the session token (HTTP ${response.status}). Re-authenticate the connection.`,
        };
      }
      return { message: `InfCode quota API error (HTTP ${response.status}).` };
    }

    const quotas = mapInfCodeQuotas(await response.json());
    if (Object.keys(quotas).length === 0) {
      return { message: "InfCode connected. No credit quota reported for this account." };
    }

    const seat = quotas.seat_credits;
    const limitReached = seat !== undefined && (seat.remaining ?? 0) <= 0;

    return { plan: "InfCode", quotas, isAvailable: !limitReached, limitReached };
  } catch (error) {
    return {
      message: `InfCode connected. Unable to fetch usage: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
