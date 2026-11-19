/**
 * Usage fetcher for the Gemini App (Robin) provider (`gemini-app` / `gapp`).
 *
 * Calls the read-only `GetUsageInfo` gRPC endpoint and maps its verified rows to
 * the shared `UsageQuota` shape. No generation, quota reset, retry or model
 * switching is performed here — the transport is strictly observational.
 */

import type { UsageQuota } from "./quota.ts";
import {
  decodeUsageInfo,
  mergeQuotaObservation,
  quotaFailureCode,
  safeQuota,
  type UsageRow,
} from "../../executors/gemini-app/quota.ts";
import { fetchGoogleUsageInfo } from "../../executors/gemini-app/quotaTransport.ts";

type JsonRecord = Record<string, unknown>;

export interface GeminiAppUsageOptions {
  forceRefresh?: boolean;
}

/** Injectable so unit tests can exercise the mapping without an HTTP/2 socket. */
export type GeminiAppUsageFetcher = typeof fetchGoogleUsageInfo;

export interface GeminiAppUsageResult {
  plan: string;
  quotaGroups: Array<{ name: string; quotas: Record<string, UsageQuota> }>;
  quotas: Record<string, UsageQuota>;
  quotaMetadata: ReturnType<typeof safeQuota>;
  raw?: JsonRecord;
}

const FAILURE_MESSAGES: Record<string, string> = {
  QUOTA_CREDENTIAL_REQUIRED: "Gemini App credential required for quota lookup",
  QUOTA_AUTH_REJECTED: "Gemini App rejected the quota credentials",
  QUOTA_RATE_LIMITED: "Gemini App quota lookup rate-limited",
  QUOTA_TIMEOUT: "Gemini App quota lookup timed out",
  QUOTA_CANCELLED: "Gemini App quota lookup cancelled",
  QUOTA_PRECONDITION_REQUIRED: "Accept the current Gemini Terms of Service, then retry",
  QUOTA_HTTP_REJECTED: "Gemini App quota endpoint rejected the request",
  QUOTA_UPSTREAM_REJECTED: "Gemini App quota endpoint returned an error",
  QUOTA_INVALID_RESPONSE: "Gemini App quota endpoint returned an invalid response",
  QUOTA_INVALID_STATUS: "Gemini App quota endpoint returned an invalid status",
  QUOTA_RESPONSE_TOO_LARGE: "Gemini App quota response too large",
  QUOTA_INCOMPLETE_RESPONSE: "Gemini App quota response was incomplete",
  QUOTA_CONNECTION_FAILED: "Gemini App quota connection failed",
  QUOTA_STREAM_FAILED: "Gemini App quota stream failed",
  QUOTA_STREAM_RESET: "Gemini App quota stream was reset",
  QUOTA_STREAM_CLOSED_EARLY: "Gemini App quota stream closed early",
  INVALID_QUOTA_METADATA: "Gemini App quota metadata was invalid",
};

function messageFor(code: string): string {
  return FAILURE_MESSAGES[code] ?? "Gemini App quota lookup failed";
}

function quotaKey(row: UsageRow, index: number): string {
  const label = row.label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return label || `row-${index}`;
}

function mapRows(rows: readonly UsageRow[]): Record<string, UsageQuota> {
  const quotas: Record<string, UsageQuota> = {};
  rows.forEach((row, index) => {
    if (row.providerPercent === null) return;
    const used = Math.min(100, Math.max(0, row.providerPercent));
    quotas[quotaKey(row, index)] = {
      used,
      total: 100,
      remaining: Math.max(0, 100 - used),
      remainingPercentage: Math.max(0, Math.min(100, Math.round((100 - used) * 100) / 100)),
      resetAt: row.providerTimestamp,
      unlimited: false,
      fractionReported: true,
      displayName: row.label || `Quota ${index + 1}`,
    } satisfies UsageQuota;
  });
  return quotas;
}

/** Fetch and normalize the current Gemini App quota snapshot. */
export async function getGeminiAppUsage(
  accessToken?: string,
  _options: GeminiAppUsageOptions = {},
  fetcher: GeminiAppUsageFetcher = fetchGoogleUsageInfo
): Promise<GeminiAppUsageResult | { message: string }> {
  try {
    const info = await fetcher(accessToken ?? "");
    const decoded = decodeUsageInfo(info.payload);
    const observed = safeQuota({
      source: "official",
      status: "ok",
      provider: "google-robin",
      updatedAt: info.observedAt,
      usageUpdatedAt: info.observedAt,
      usageRows: decoded.usageRows,
    });
    const metadata = mergeQuotaObservation(undefined, observed);
    const quotas = mapRows(metadata.usageRows);

    return {
      plan: "gemini-app",
      quotaGroups: Object.keys(quotas).length ? [{ name: "Gemini App", quotas }] : [],
      quotas,
      quotaMetadata: metadata,
    };
  } catch (error) {
    const code = quotaFailureCode(error);
    return { message: messageFor(code) };
  }
}
