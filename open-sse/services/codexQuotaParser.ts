import {
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_QUOTA_WEEKLY,
  getCodexModelScope,
  isCodexSparkLimitDescriptor,
} from "../config/codexQuotaScopes.ts";
import { parseCodexPaidCredits } from "@/lib/providers/codexPaidCredits";
import type { CodexDualWindowQuota } from "./codexQuotaFetcher.ts";
import {
  codexQuotaWindowKey,
  isCodexLimitReached,
  parseCodexQuotaWindow,
  type CodexQuotaWindow,
} from "./codexQuotaSignals.ts";
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
function getCodexRateLimitWindows(rateLimit: Record<string, unknown>): {
  primary: CodexQuotaWindow | null;
  secondary: CodexQuotaWindow | null;
} {
  return {
    primary: parseCodexQuotaWindow(
      rateLimit["primary_window"] ?? rateLimit["primaryWindow"],
      "primary"
    ),
    secondary: parseCodexQuotaWindow(
      rateLimit["secondary_window"] ?? rateLimit["secondaryWindow"],
      "secondary"
    ),
  };
}
function assignCodexWindows(
  target: Record<string, { percentUsed: number; resetAt: string | null }>,
  rateLimit: Record<string, unknown>,
  names: { primary: string; secondary: string }
): void {
  const { primary, secondary } = getCodexRateLimitWindows(rateLimit);
  if (primary) target[codexQuotaWindowKey(primary, names)] = primary;
  if (secondary) target[codexQuotaWindowKey(secondary, names)] = secondary;
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
function getDominantResetAt(windows: CodexQuotaWindow[]): string | null {
  const dominant = [...windows].sort(
    (a, b) =>
      b.percentUsed - a.percentUsed ||
      Number(b.windowSeconds === 604800) - Number(a.windowSeconds === 604800)
  );
  return dominant.find((window) => window.resetAt)?.resetAt ?? null;
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
  const measured = [parsedPrimary, parsedSecondary].filter(
    (window): window is CodexQuotaWindow => window !== null
  );
  const worstPercentUsed = Math.max(...measured.map((window) => window.percentUsed));
  const limitReached = isCodexLimitReached(selectedRateLimit);
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
  // Fixed compatibility slots follow measured durations, never primary/secondary position.
  const window5h = windows[useSparkWindows ? CODEX_SPARK_QUOTA_SESSION : CODEX_WINDOW_SESSION];
  const window7d = windows[useSparkWindows ? CODEX_SPARK_QUOTA_WEEKLY : CODEX_WINDOW_WEEKLY];
  const bankedResetCredits = parseBankedResetCredits(obj);
  const paidCredits = parseCodexPaidCredits(obj.credits);
  const rateLimitReachedType = parseRateLimitReachedType(obj);
  const plan = parseCodexPlan(obj);
  return {
    ...(plan ? { plan } : {}),
    used: Math.round(worstPercentUsed * 100),
    total: 100,
    percentUsed: worstPercentUsed,
    resetAt: getDominantResetAt(measured),
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
