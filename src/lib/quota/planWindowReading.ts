/**
 * planWindowReading.ts — pure mappers from a provider usage payload to the
 * figure of ONE plan window (PlanWindowReading), or null.
 *
 * A reading exists only when the payload carries the requested window's own
 * figure. Everything getSaturation does to always return a number (reading
 * another window, the worst case across windows, rate-limit headers, the
 * fail-open 0) yields null here, and so does a payload marked as stale: the
 * attribution book must only move on a fresh figure of the window it tracks.
 *
 * No I/O: saturationSignals.ts calls these on the payload it already fetched.
 */

import type { QuotaWindow } from "./dimensions";
import type { PlanWindowReading } from "./types";

/** getClaudeUsage (open-sse/services/usage/claude.ts) quota keys per window. */
const CLAUDE_WINDOW_KEYS: Partial<Record<QuotaWindow, string>> = {
  "5h": "session (5h)",
  weekly: "weekly (7d)",
};

/** fetchCodexQuota (codexQuotaFetcher.ts) `windows` keys per window. */
const CODEX_WINDOW_KEYS: Partial<Record<QuotaWindow, string>> = {
  "5h": "session",
  weekly: "weekly",
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** ISO reset time → epoch ms; null when absent or unparseable. */
function resetMs(value: unknown): number | null {
  if (typeof value !== "string" || !value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

/** The entry of `map[keys[window]]` inside `payload[field]`, or null. */
function windowEntry(
  payload: Record<string, unknown>,
  field: string,
  keys: Partial<Record<QuotaWindow, string>>,
  window: QuotaWindow
): Record<string, unknown> | null {
  const key = keys[window];
  const map = asRecord(payload[field]);
  return key && map ? asRecord(map[key]) : null;
}

/** Shape of the Codex quota: `windows[key] = { percentUsed, resetAt }`. */
function fractionWindowEntry(
  quota: unknown,
  keys: Partial<Record<QuotaWindow, string>>,
  window: QuotaWindow
): Record<string, unknown> | null {
  const q = asRecord(quota);
  if (!q || q.stale === true) return null;
  return windowEntry(q, "windows", keys, window);
}

function fractionReading(
  entry: Record<string, unknown> | null,
  fetchedAt: number
): PlanWindowReading | null {
  if (!entry) return null;
  const used = entry.percentUsed;
  if (typeof used !== "number" || !Number.isFinite(used)) return null;
  return { used: clamp01(used), resetAt: resetMs(entry.resetAt), fetchedAt };
}

/**
 * When the provider produced a Claude usage figure, as far as this process can tell: the
 * `_observedAt` of a figure served from response headers, otherwise the time of the usage
 * endpoint read behind it. Unknown or unparseable → `builtAt` (the moment the saturation
 * cache entry is built); a time ahead of `builtAt` is clamped to it, so a clock ahead of
 * ours never makes every later reading look old.
 */
export function claudeUsageDataTime(
  usage: unknown,
  endpointReadAt: number | null,
  builtAt: number
): number {
  const u = asRecord(usage);
  const dataTime =
    u?._source === "response-headers" ? Date.parse(String(u._observedAt)) : endpointReadAt;
  return typeof dataTime === "number" && Number.isFinite(dataTime)
    ? Math.min(dataTime, builtAt)
    : builtAt;
}

/**
 * Claude OAuth usage (getClaudeUsage): `quotas[key].used` is percent used,
 * 0..100. No reading for a stale (rate-limited) response or a window whose
 * percentage the provider did not report.
 */
export function claudePlanReading(
  usage: unknown,
  window: QuotaWindow,
  fetchedAt: number
): PlanWindowReading | null {
  const u = asRecord(usage);
  if (!u || u._stale === true) return null;
  const entry = windowEntry(u, "quotas", CLAUDE_WINDOW_KEYS, window);
  if (!entry || entry.fractionReported === false) return null;
  const used = entry.used;
  if (typeof used !== "number" || !Number.isFinite(used)) return null;
  return { used: clamp01(used / 100), resetAt: resetMs(entry.resetAt), fetchedAt };
}

/** Codex quota (fetchCodexQuota): the 5h session or the weekly window. */
export function codexPlanReading(
  quota: unknown,
  window: QuotaWindow,
  fetchedAt: number
): PlanWindowReading | null {
  return fractionReading(fractionWindowEntry(quota, CODEX_WINDOW_KEYS, window), fetchedAt);
}
