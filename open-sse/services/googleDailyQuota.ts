import { nextConfiguredResetMs, nextDailyResetAtMs } from "./dailyQuotaReset.ts";
import { googleDailyQuotaIds, hasGoogleDailyQuotaViolation } from "./retryAfterJson.ts";

/**
 * Google documents the Gemini API requests-per-day quota as resetting at midnight
 * Pacific time. Used only when the operator has not configured a node daily-reset clock.
 */
export const GOOGLE_DAILY_QUOTA_RESET_TIMEZONE = "America/Los_Angeles";

const GOOGLE_QUOTA_FAILURE_TYPE = "type.googleapis.com/google.rpc.QuotaFailure";

const MAX_GOOGLE_DAILY_QUOTA_COOLDOWN_MS = 25 * 60 * 60 * 1000; // one day + DST slack

/**
 * Milliseconds until a Google daily (`PerDay`) quota resets: the operator's node daily-reset
 * clock when configured, otherwise the next midnight Pacific. Always a future, finite window,
 * so the resulting lockout self-recovers.
 */
export function googleDailyQuotaCooldownMs(
  dailyReset?: { timezone?: unknown; hour?: unknown; nowMs?: number } | null
): number {
  const nowMs = dailyReset?.nowMs ?? Date.now();
  const configuredMs = nextConfiguredResetMs(dailyReset?.timezone, dailyReset?.hour, nowMs);
  const waitMs =
    configuredMs ?? nextDailyResetAtMs(GOOGLE_DAILY_QUOTA_RESET_TIMEZONE, 0, nowMs) - nowMs;
  return Math.min(Math.max(waitMs, 1), MAX_GOOGLE_DAILY_QUOTA_COOLDOWN_MS);
}

/**
 * The chat pipeline classifies failures from the upstream `error.message` only, which for
 * Gemini reads the same for per-minute and per-day exhaustion. When the full upstream body
 * reports a daily violation, append a compact QuotaFailure line (PerDay quota ids only) so
 * `checkFallbackError` sees it. Client-facing bodies keep only the first line of a message.
 * Returns `text` unchanged otherwise (and when it already carries the signal).
 */
export function appendGoogleDailyQuotaViolation(text: string, upstreamBody: unknown): string {
  const quotaIds = googleDailyQuotaIds(upstreamBody);
  if (quotaIds.length === 0 || hasGoogleDailyQuotaViolation(text)) return text;
  const detail = {
    "@type": GOOGLE_QUOTA_FAILURE_TYPE,
    violations: quotaIds.map((quotaId) => ({ quotaId })),
  };
  return `${text}\n${JSON.stringify(detail)}`;
}
