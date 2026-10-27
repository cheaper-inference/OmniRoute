import { DEFAULT_QUOTA_THRESHOLD_PERCENT, getQuotaWindowStatus } from "@/domain/quotaCache";
import { defersQuotaCutoff } from "@/lib/providers/quotaCutoffOptIns";
import { applyCodexWindowPolicy } from "@/lib/providers/codexQuotaWindowPolicy";
import { toNumber } from "@/shared/utils/numeric";
import { toCodexScopedQuotaWindowName } from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import { cooldownUntilMs } from "@omniroute/open-sse/services/accountFallback.ts";
import { formatQuotaUsageReason } from "@omniroute/open-sse/services/quotaWindowLabel.ts";

type JsonRecord = Record<string, unknown>;
export interface QuotaLimitPolicy {
  enabled: boolean;
  thresholdPercent: number;
  windows: string[];
}
const MIN_QUOTA_THRESHOLD_PERCENT = 1;
const MAX_QUOTA_THRESHOLD_PERCENT = 100;
function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}
function toBooleanOrDefault(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}
function normalizeQuotaThreshold(
  value: unknown,
  fallback = DEFAULT_QUOTA_THRESHOLD_PERCENT
): number {
  const parsed = toNumber(value, fallback);
  return Math.min(MAX_QUOTA_THRESHOLD_PERCENT, Math.max(MIN_QUOTA_THRESHOLD_PERCENT, parsed));
}
export function normalizeWindowName(windowName: unknown): string | null {
  if (typeof windowName !== "string") return null;
  const normalized = windowName.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}
export function resolveQuotaLimitPolicy(
  provider: string,
  providerSpecificData: JsonRecord
): QuotaLimitPolicy {
  const rawPolicy = asRecord(providerSpecificData.limitPolicy);
  const rawWindows = Array.isArray(rawPolicy.windows) ? rawPolicy.windows : [];
  const windows = rawWindows.map(normalizeWindowName).filter(Boolean) as string[];
  if (provider === "codex") {
    const defaultWindows = applyCodexWindowPolicy(windows, providerSpecificData);
    const enabled = toBooleanOrDefault(rawPolicy.enabled, defaultWindows.length > 0);
    return {
      enabled,
      thresholdPercent: normalizeQuotaThreshold(rawPolicy.thresholdPercent),
      windows: defaultWindows,
    };
  }
  return {
    enabled: toBooleanOrDefault(rawPolicy.enabled, false),
    thresholdPercent: normalizeQuotaThreshold(rawPolicy.thresholdPercent),
    windows,
  };
}
export function evaluateQuotaLimitPolicy(
  provider: string,
  connection: { id: string; providerSpecificData: JsonRecord },
  requestedModel: string | null = null
): { blocked: boolean; reasons: string[]; resetAt: string | null } {
  if (defersQuotaCutoff(provider, connection.providerSpecificData, requestedModel))
    return { blocked: false, reasons: [], resetAt: null };
  const policy = resolveQuotaLimitPolicy(provider, connection.providerSpecificData);
  if (!policy.enabled || policy.windows.length === 0)
    return { blocked: false, reasons: [], resetAt: null };
  const reasons: string[] = [];
  const resetCandidates: Array<string | null> = [];
  for (const windowName of policy.windows) {
    const effectiveWindowName =
      provider === "codex" ? toCodexScopedQuotaWindowName(windowName, requestedModel) : windowName;
    const status = getQuotaWindowStatus(
      connection.id,
      effectiveWindowName,
      policy.thresholdPercent
    );
    if (!status?.reachedThreshold) continue;
    reasons.push(
      formatQuotaUsageReason(
        {
          key: effectiveWindowName,
          displayName: status.displayName,
          windowSeconds: status.windowSeconds,
        },
        status.usedPercentage
      )
    );
    resetCandidates.push(status.resetAt);
  }
  return {
    blocked: reasons.length > 0,
    reasons,
    resetAt:
      resetCandidates
        .map((raw) => ({ raw, ms: cooldownUntilMs(raw) }))
        .filter(({ ms }) => Number.isFinite(ms) && ms > Date.now())
        .sort((a, b) => a.ms - b.ms)[0]?.raw || null,
  };
}
