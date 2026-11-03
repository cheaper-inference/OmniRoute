/**
 * usage/nan.ts — NaN.Builders usage fetcher.
 *
 * GET https://cloud-api.nan.builders/api/usage/quota with the Bearer key returns the
 * per-model token counters shown on the NaN.Builders dashboard:
 *
 *   { "models": [ { "model": "glm5.3", "tokensUsed": 2500, "cap": 10000,
 *                   "periodEnd": "2026-11-01T00:00:00Z" }, ... ] }
 *
 * (`/v1/usage` on the API host can return an empty history for an active key, so the
 * dashboard counters are the source of truth.) Each row becomes one token quota that
 * resets at `periodEnd`. A malformed row makes the whole report unavailable rather than
 * showing a partially-guessed panel.
 *
 * Depends only on the sibling quota leaf — no host coupling — so it lives as a co-located
 * provider leaf, mirroring usage/apmix.ts.
 */

import { type UsageQuota, parseResetTime } from "./quota.ts";
import { sanitizeErrorMessage } from "../../utils/error.ts";

const NAN_USAGE_URL = "https://cloud-api.nan.builders/api/usage/quota";
const PLAN = "NaN.Builders";
const UNAVAILABLE_MESSAGE = "NaN.Builders quota unavailable: missing or invalid model counters.";

/** Bound the usage probe so a hung upstream cannot hold the limits panel. */
const FETCH_TIMEOUT_MS = 10_000;

export type NanUsageResult = {
  plan?: string;
  quotas?: Record<string, UsageQuota>;
  message?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toQuota(row: unknown, seen: Record<string, UsageQuota>): [string, UsageQuota] | null {
  if (!isRecord(row)) return null;
  const { model, tokensUsed, cap } = row;
  if (typeof model !== "string" || !model.trim() || Object.hasOwn(seen, model)) return null;
  if (typeof tokensUsed !== "number" || !Number.isSafeInteger(tokensUsed) || tokensUsed < 0) {
    return null;
  }
  if (typeof cap !== "number" || !Number.isSafeInteger(cap) || cap <= 0) return null;

  const periodEnd = row.periodEnd ?? null;
  if (
    periodEnd !== null &&
    (typeof periodEnd !== "string" || !Number.isFinite(Date.parse(periodEnd)))
  ) {
    return null;
  }

  const remaining = Math.max(0, cap - tokensUsed);
  return [
    model,
    {
      used: tokensUsed,
      total: cap,
      remaining,
      remainingPercentage: Math.round((remaining / cap) * 10_000) / 100,
      resetAt: parseResetTime(periodEnd),
      unlimited: false,
      displayName: `${model} (tokens)`,
    },
  ];
}

/** Map the `/api/usage/quota` payload into per-model token quotas. */
export function formatNanUsage(report: unknown): NanUsageResult {
  const unavailable = { plan: PLAN, message: UNAVAILABLE_MESSAGE };
  const rows = isRecord(report) ? report.models : undefined;
  if (!Array.isArray(rows) || rows.length === 0) return unavailable;

  const quotas: Record<string, UsageQuota> = Object.create(null);
  for (const row of rows) {
    const entry = toQuota(row, quotas);
    if (!entry) return unavailable;
    quotas[entry[0]] = entry[1];
  }
  return { plan: PLAN, quotas: { ...quotas } };
}

/** Fetch the NaN.Builders per-model token quotas for one API key. */
export async function getNanUsage(apiKey: string): Promise<NanUsageResult> {
  if (!apiKey) {
    return { message: "NaN.Builders API key not available. Add a key to view usage." };
  }

  try {
    const res = await fetch(NAN_USAGE_URL, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });

    if (!res.ok) {
      if (res.status === 401) return { plan: PLAN, message: "Invalid NaN.Builders API key." };
      return { plan: PLAN, message: `NaN.Builders quota API error (${res.status})` };
    }

    return formatNanUsage(await res.json());
  } catch (error) {
    return {
      plan: PLAN,
      message: `NaN.Builders connected. Unable to fetch usage: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
    };
  }
}
