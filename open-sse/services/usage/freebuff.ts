/**
 * usage/freebuff.ts — Freebuff (Codebuff free tier) usage fetcher.
 *
 * Freebuff meters usage two ways, and a live `GET /api/v1/freebuff/session`
 * response carries both:
 *
 *   1. `rateLimitsByModel[modelKey]` — weighted "sessions" per catalog model:
 *      { model, pool, poolLabel, limit, recentCount, period, resetAt,
 *        resetTimeZone, windowHours, entitlementBreakdown }
 *      Several models share one `pool` ("limited" -> "Daily"), so rows are
 *      grouped by pool and the largest usage in the pool is reported once.
 *
 *   2. `freebucks` — the shared daily credit pool that a premium model actually
 *      charges: { balance, daily:{limit,spent,remaining,resetAt}, wallet,
 *      prices:{[modelKey]: cost}, planRequiredModelIds }.
 *
 * `status` is `"none"` when no hour is running, or `"active"` with
 * { instanceId, model, expiresAt, remainingMs } for the live hour.
 *
 * Model keys in the response are opaque catalog ids (`m-…`), not human ids, so
 * quota labels come from `poolLabel` and the model key is reported as-is.
 */

import { toRecord, toNumber } from "./scalars.ts";
import { parseResetTime, type UsageQuota } from "./quota.ts";

type JsonRecord = Record<string, unknown>;

const FREEBUFF_SESSION_URL =
  process.env.OMNIROUTE_FREEBUFF_SESSION_URL ?? "https://www.codebuff.com/api/v1/freebuff/session";

/** The official client's runtime UA; the endpoint 401s an unknown client. */
const FREEBUFF_RUNTIME_UA = "Bun/1.3.14";
const FREEBUFF_CLIENT_VERSION = "0.2.36";

const SESSION_MS = 60 * 60 * 1000;

function quotaFromCounts(
  used: number,
  total: number,
  resetAt: unknown,
  displayName: string
): UsageQuota {
  const safeTotal = Math.max(0, total);
  const safeUsed = safeTotal > 0 ? Math.min(Math.max(0, used), safeTotal) : 0;
  const remaining = Math.max(0, safeTotal - safeUsed);
  return {
    used: safeUsed,
    total: safeTotal,
    remaining,
    remainingPercentage: safeTotal > 0 ? (remaining / safeTotal) * 100 : 0,
    resetAt: parseResetTime(resetAt),
    unlimited: false,
    displayName,
  };
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function periodLabel(row: JsonRecord): string {
  const period = typeof row["period"] === "string" ? row["period"] : "";
  if (period === "pacific_week") return "week";
  if (period === "pacific_day" || period === "day") return "day";
  return "period";
}

export function parseFreebuffUsage(payload: JsonRecord): { quotas: Record<string, UsageQuota> } {
  const quotas: Record<string, UsageQuota> = {};

  // 1. Weighted session pools. Rows sharing a `pool` are one allowance, so keep
  //    the heaviest usage seen in the pool rather than summing (summing would
  //    double-count the same shared limit).
  const byModel = toRecord(payload["rateLimitsByModel"]);
  const single = toRecord(payload["rateLimit"]);
  const rows: JsonRecord[] = Object.values(byModel).map((v) => toRecord(v));
  if (rows.length === 0 && Object.keys(single).length > 0) rows.push(single);

  const pools = new Map<string, { label: string; limit: number; used: number; row: JsonRecord }>();
  for (const row of rows) {
    const limit = toNumber(row["limit"], 0);
    if (limit <= 0) continue;
    const model = typeof row["model"] === "string" ? (row["model"] as string) : "";
    const poolKey =
      typeof row["pool"] === "string" && row["pool"] ? (row["pool"] as string) : model || "pool";
    const label =
      typeof row["poolLabel"] === "string" && row["poolLabel"]
        ? (row["poolLabel"] as string)
        : model || "Sessions";
    const used = toNumber(row["recentCount"], 0);

    const existing = pools.get(poolKey);
    if (!existing) {
      pools.set(poolKey, { label, limit, used, row });
      continue;
    }
    // Same pool: report the worst case, and keep the tightest limit.
    pools.set(poolKey, {
      label: existing.label,
      limit: Math.min(existing.limit, limit),
      used: Math.max(existing.used, used),
      row: existing.row,
    });
  }

  for (const { label, limit, used, row } of pools.values()) {
    const rounded = round1(used);
    const period = periodLabel(row);
    quotas[label] = quotaFromCounts(
      rounded,
      limit,
      row["resetAt"],
      `${label}: ${round1(Math.max(0, limit - rounded))} of ${limit} sessions left this ${period}`
    );
  }

  // 2. Freebucks: the shared daily pool the premium models charge against.
  const freebucks = toRecord(payload["freebucks"]);
  const daily = toRecord(freebucks["daily"]);
  const dailyLimit = toNumber(daily["limit"], 0);
  if (dailyLimit > 0) {
    // `remaining` is authoritative when present; `spent` otherwise.
    const remainingReported = toNumber(daily["remaining"], Number.NaN);
    const spent = Number.isFinite(remainingReported)
      ? Math.max(0, dailyLimit - remainingReported)
      : toNumber(daily["spent"], 0);
    const wallet = toNumber(toRecord(freebucks["wallet"])["balance"], 0);
    const balance = toNumber(freebucks["balance"], 0);
    quotas["Freebucks (daily)"] = quotaFromCounts(
      spent,
      dailyLimit,
      daily["resetAt"],
      `Freebucks: ${Math.max(0, dailyLimit - spent)} of ${dailyLimit} left today` +
        (wallet > 0 ? ` (+${wallet} wallet)` : "") +
        (balance > 0 && balance !== dailyLimit - spent ? ` · balance ${balance}` : "")
    );
  }

  // 3. The live one-hour session, if any.
  //    Display-only countdown: mark `fractionReported: false` so
  //    genericQuotaFetcher excludes it from preflight cutoff enforcement (a
  //    session with 30 s left reports <2% remaining, which would otherwise fail
  //    a still-active hour under a 2% cutoff).
  if (payload["status"] === "active") {
    const remainingMs = Math.max(0, toNumber(payload["remainingMs"], 0));
    const model = typeof payload["model"] === "string" ? (payload["model"] as string) : "";
    quotas["Current session"] = {
      ...quotaFromCounts(
        SESSION_MS - Math.min(remainingMs, SESSION_MS),
        SESSION_MS,
        payload["expiresAt"],
        `Session${model ? ` (${model})` : ""}: ${Math.ceil(remainingMs / 60000)} min left`
      ),
      fractionReported: false,
    };
  }

  // 4. Verification wall: the account cannot start a session until it clears.
  if (payload["verificationRequired"] === true) {
    const kind = typeof payload["verificationKind"] === "string" ? payload["verificationKind"] : "";
    // 1 of 1 used: the wall blocks every session until it is cleared.
    quotas["Verification"] = quotaFromCounts(
      1,
      1,
      payload["resetAt"],
      `Account verification required${kind ? ` (${kind})` : ""} — see https://freebuff.com/verify-phone`
    );
  }

  return { quotas };
}

export async function getFreebuffUsage(accessToken?: string, apiKey?: string) {
  const token = accessToken || apiKey || "";
  if (!token) {
    return { message: "Freebuff auth token not available. Reconnect the Freebuff account." };
  }

  let response: Response;
  try {
    response = await fetch(FREEBUFF_SESSION_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "User-Agent": FREEBUFF_RUNTIME_UA,
        // The session endpoint reports the per-model pools only when asked.
        "x-freebuff-client-version": FREEBUFF_CLIENT_VERSION,
        "x-freebuff-include-unused-rate-limits": "1",
      },
    });
  } catch (error) {
    return { message: `Freebuff connected. Unable to fetch usage: ${(error as Error).message}` };
  }

  if (response.status === 401 || response.status === 403) {
    return { message: "Freebuff connected. The auth token was rejected — log in again." };
  }

  const rawText = await response.text();
  let payload: JsonRecord = {};
  try {
    payload = rawText ? toRecord(JSON.parse(rawText)) : {};
  } catch {
    return { message: "Freebuff connected. Unable to parse the session response." };
  }

  // 429 `rate_limited` still carries the quota snapshot; other non-2xx are errors.
  if (!response.ok && response.status !== 429) {
    return { message: `Freebuff connected. Session endpoint returned HTTP ${response.status}.` };
  }

  const parsed = parseFreebuffUsage(payload);
  if (Object.keys(parsed.quotas).length === 0) {
    return { message: "Freebuff connected. No quota data in the session response." };
  }
  return parsed;
}
