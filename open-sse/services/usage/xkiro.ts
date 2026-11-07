/**
 * usage/xkiro.ts — xKiro daily free-token quota.
 *
 * GET https://api.xkiro.com/v1/usage with the Bearer key (free to call) returns
 * the daily free-token allowance and the paid wallet
 * (https://docs.xkiro.com/api/usage/):
 *
 *   { "free_tokens": { "used_today": 100, "limit_per_day": 1000, "remaining": 900 },
 *     "wallet": { "balance_usd": "1.000000" } }
 *
 * Only `free_tokens` is mapped, onto `quotas.free_daily`: the strict-zero-cost
 * filter (`autoCombo/freeAccessQuota.ts`) derives free eligibility from these
 * quotas, so the paid wallet must never surface as free headroom. Anything
 * missing, unbounded or inconsistent yields no quota, which the filter reads
 * as UNKNOWN (fail closed). The request runs through the connection's proxy.
 */

import { toRecord, toNumber, clampPercentage } from "./scalars.ts";
import { type UsageQuota } from "./quota.ts";
import { fetchWithConnectionProxy } from "../connectionProxyFetch.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const XKIRO_USAGE_URL = "https://api.xkiro.com/v1/usage";
const FETCH_TIMEOUT_MS = 10_000;

/** Map `free_tokens` to a quota, or null when it is not a bounded, consistent window. */
function parseFreeTokens(value: unknown): UsageQuota | null {
  const freeTokens = toRecord(value);
  const used = toNumber(freeTokens.used_today, Number.NaN);
  const total = toNumber(freeTokens.limit_per_day, Number.NaN);
  const remaining = toNumber(freeTokens.remaining, Number.NaN);
  if (![used, total, remaining].every(Number.isFinite)) return null;
  if (total <= 0 || used < 0 || remaining < 0) return null;
  // The last request of the day can overshoot the limit; remaining then stays at 0.
  const overshot = remaining === 0 && used >= total;
  if (!overshot && used + remaining !== total) return null;
  return {
    used,
    total,
    remaining,
    remainingPercentage: clampPercentage((remaining / total) * 100),
    resetAt: null,
    unlimited: false,
  };
}

export async function getXkiroUsage(
  connectionId: string,
  apiKey: string
): Promise<{ plan: string; quotas: Record<string, UsageQuota>; message?: string }> {
  const plan = "xKiro";
  if (!apiKey) {
    return { plan, quotas: {}, message: "xKiro API key not available. Add a key to view usage." };
  }

  try {
    const res = await fetchWithConnectionProxy(connectionId, XKIRO_USAGE_URL, {
      method: "GET",
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res) return { plan, quotas: {}, message: "xKiro usage request failed." };
    if (res.status === 401 || res.status === 403) {
      return { plan, quotas: {}, message: "Invalid xKiro API key." };
    }
    if (!res.ok) return { plan, quotas: {}, message: `xKiro usage API error (${res.status})` };

    const freeDaily = parseFreeTokens(toRecord(await res.json()).free_tokens);
    if (!freeDaily) {
      return { plan, quotas: {}, message: "xKiro usage response has no valid free-token quota." };
    }
    return { plan, quotas: { free_daily: freeDaily } };
  } catch (error) {
    return {
      plan,
      quotas: {},
      message: `xKiro usage request failed: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
