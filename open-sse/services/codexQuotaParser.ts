import {
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_QUOTA_WEEKLY,
  getCodexModelScope,
  isCodexSparkLimitDescriptor,
} from "../config/codexQuotaScopes.ts";
import { parseCodexPaidCredits } from "@/lib/providers/codexPaidCredits";
import type { CodexDualWindowQuota } from "./codexQuotaFetcher.ts";
export const CODEX_WINDOW_SESSION = "session";
export const CODEX_WINDOW_WEEKLY = "weekly";

function parseCodexNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
}
function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}
function parseWindowReset(window: Record<string, unknown>): string | null {
  const resetAt = parseCodexNumber(window["reset_at"] ?? window["resetAt"], 0);
  if (resetAt > 0) return new Date(resetAt * 1000).toISOString();
  const resetAfterSeconds = parseCodexNumber(
    window["reset_after_seconds"] ?? window["resetAfterSeconds"],
    0
  );
  if (resetAfterSeconds > 0) return new Date(Date.now() + resetAfterSeconds * 1000).toISOString();
  return null;
}
function parseCodexWindow(window: Record<string, unknown> | null | undefined) {
  if (!window || Object.keys(window).length === 0) return null;
  const percentUsed = parseCodexNumber(window["used_percent"] ?? window["usedPercent"], 0) / 100;
  return { percentUsed, resetAt: parseWindowReset(window) };
}
function parseBankedResetCredits(data: Record<string, unknown>): number | undefined {
  const resetCredits = toRecord(data["rate_limit_reset_credits"] ?? data["rateLimitResetCredits"]);
  const availableCount = resetCredits["available_count"] ?? resetCredits["availableCount"];
  const count = parseCodexNumber(availableCount, NaN);
  return Number.isFinite(count) ? count : undefined;
}
function parseRateLimitReachedType(data: Record<string, unknown>): string | undefined {
  const reachedType = data["rate_limit_reached_type"] ?? data["rateLimitReachedType"];
  if (typeof reachedType === "string" && reachedType.trim().length > 0) return reachedType.trim();
  const reachedTypeObj = toRecord(reachedType);
  const type = reachedTypeObj["type"];
  return typeof type === "string" && type.trim().length > 0 ? type.trim() : undefined;
}
function findSparkRateLimit(data: Record<string, unknown>): Record<string, unknown> | null {
  const additional = data["additional_rate_limits"] ?? data["additionalRateLimits"];
  if (!Array.isArray(additional)) return null;
  for (const entryValue of additional) {
    const entry = toRecord(entryValue);
    if (
      !isCodexSparkLimitDescriptor(
        entry["limit_name"],
        entry["limitName"],
        entry["metered_feature"],
        entry["meteredFeature"],
        entry["limit_id"],
        entry["limitId"],
        entry["id"],
        entry["name"],
        entry["title"],
        entry["model"],
        entry["model_id"],
        entry["modelId"]
      )
    )
      continue;
    return toRecord(entry["rate_limit"] ?? entry["rateLimit"]);
  }
  return null;
}
function getCodexRateLimitWindows(rateLimit: Record<string, unknown>) {
  return {
    primary: parseCodexWindow(toRecord(rateLimit["primary_window"] ?? rateLimit["primaryWindow"])),
    secondary: parseCodexWindow(
      toRecord(rateLimit["secondary_window"] ?? rateLimit["secondaryWindow"])
    ),
  };
}
function assignCodexWindows(
  target: Record<string, { percentUsed: number; resetAt: string | null }>,
  rateLimit: Record<string, unknown>,
  names: { primary: string; secondary: string }
): void {
  const { primary, secondary } = getCodexRateLimitWindows(rateLimit);
  if (primary) target[names.primary] = primary;
  if (secondary) target[names.secondary] = secondary;
}
function getSelectedCodexRateLimit(
  normalRateLimit: Record<string, unknown>,
  sparkRateLimit: Record<string, unknown> | null,
  useSparkWindows: boolean
): Record<string, unknown> | null {
  if (useSparkWindows) return sparkRateLimit;
  return normalRateLimit;
}
function parseCodexPlan(data: Record<string, unknown>): string | undefined {
  const rawPlan = data["plan_type"] ?? data["planType"];
  return typeof rawPlan === "string" && rawPlan.trim() ? rawPlan.trim() : undefined;
}
function getDominantResetAt(
  quota: Pick<CodexDualWindowQuota, "window5h" | "window7d">
): string | null {
  if (quota.window7d.percentUsed > quota.window5h.percentUsed)
    return quota.window7d.resetAt || quota.window5h.resetAt;
  if (quota.window5h.percentUsed > quota.window7d.percentUsed)
    return quota.window5h.resetAt || quota.window7d.resetAt;
  return quota.window7d.resetAt || quota.window5h.resetAt;
}
/** The dispatch fetcher's parser, also usable without importing its network/identity graph. */
export function parseCodexUsageResponse(
  data: unknown,
  requestedModel?: string | null
): CodexDualWindowQuota | null {
  const obj = toRecord(data);
  const normalRateLimit = toRecord(obj["rate_limit"] ?? obj["rateLimit"]);
  const sparkRateLimit = findSparkRateLimit(obj);
  const useSparkWindows = getCodexModelScope(requestedModel) === "spark";
  const selectedRateLimit = getSelectedCodexRateLimit(
    normalRateLimit,
    sparkRateLimit,
    useSparkWindows
  );
  if (!selectedRateLimit) return null;
  const { primary: parsedPrimary, secondary: parsedSecondary } =
    getCodexRateLimitWindows(selectedRateLimit);
  if (!parsedPrimary && !parsedSecondary) return null;
  const window5h = parsedPrimary ?? { percentUsed: 0, resetAt: null };
  const window7d = parsedSecondary ?? { percentUsed: 0, resetAt: null };
  const worstPercentUsed = Math.max(window5h.percentUsed, window7d.percentUsed);
  const limitReached = Boolean(
    selectedRateLimit["limit_reached"] ?? selectedRateLimit["limitReached"]
  );
  const windows: Record<string, { percentUsed: number; resetAt: string | null }> = {};
  assignCodexWindows(windows, selectedRateLimit, {
    primary: useSparkWindows ? CODEX_SPARK_QUOTA_SESSION : CODEX_WINDOW_SESSION,
    secondary: useSparkWindows ? CODEX_SPARK_QUOTA_WEEKLY : CODEX_WINDOW_WEEKLY,
  });
  const allWindows = { ...windows };
  if (sparkRateLimit)
    assignCodexWindows(allWindows, sparkRateLimit, {
      primary: CODEX_SPARK_QUOTA_SESSION,
      secondary: CODEX_SPARK_QUOTA_WEEKLY,
    });
  assignCodexWindows(allWindows, normalRateLimit, {
    primary: CODEX_WINDOW_SESSION,
    secondary: CODEX_WINDOW_WEEKLY,
  });
  const bankedResetCredits = parseBankedResetCredits(obj);
  const paidCredits = parseCodexPaidCredits(obj.credits);
  const rateLimitReachedType = parseRateLimitReachedType(obj);
  const plan = parseCodexPlan(obj);
  return {
    ...(plan ? { plan } : {}),
    used: Math.round(worstPercentUsed * 100),
    total: 100,
    percentUsed: worstPercentUsed,
    resetAt: getDominantResetAt({ window5h, window7d }),
    windows,
    allWindows,
    window5h,
    window7d,
    limitReached,
    ...(bankedResetCredits !== undefined ? { bankedResetCredits } : {}),
    ...(paidCredits ? { paidCredits } : {}),
    ...(rateLimitReachedType !== undefined ? { rateLimitReachedType } : {}),
  };
}
