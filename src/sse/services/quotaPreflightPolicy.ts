import { hasCodexCreditOptIn } from "@/lib/providers/quotaCutoffOptIns";
import { isQuotaPreflightEnabled } from "@omniroute/open-sse/services/quotaPreflight.ts";
import { toCodexBaseQuotaWindowName } from "@omniroute/open-sse/config/codexQuotaScopes.ts";

export interface QuotaPreflightPolicy {
  enabled: boolean;
  defaultThresholdPercent: number;
  providerWindowDefaults: Record<string, Record<string, number>>;
}
export interface QuotaPreflightConnection {
  providerSpecificData?: Record<string, unknown> | null;
  quotaWindowThresholds?: Record<string, number> | null;
}

/** The dispatch latency gate, without fetching quota or claiming a connection lease. */
export function shouldApplyQuotaCutoff(
  provider: string,
  connectionValue: unknown,
  policy: QuotaPreflightPolicy,
  requestedModel: string | null = null
): boolean {
  const connection = connectionValue as QuotaPreflightConnection;
  const creditOptIn = hasCodexCreditOptIn(provider, connection, requestedModel);
  if (connection.providerSpecificData?.quotaPreflightEnabled === false && !creditOptIn)
    return false;
  return (
    Object.keys(connection.quotaWindowThresholds || {}).length > 0 ||
    Object.keys(policy.providerWindowDefaults[provider] || {}).length > 0 ||
    isQuotaPreflightEnabled(connection as Record<string, unknown>) ||
    creditOptIn ||
    policy.enabled === true ||
    policy.defaultThresholdPercent > 2
  );
}

/** Window names to look up for a provider; Codex checks the scoped name before the base name. */
function lookupWindowNames(provider: string, windowName: string): string[] {
  return provider === "codex"
    ? [...new Set([windowName, toCodexBaseQuotaWindowName(windowName)].filter(Boolean) as string[])]
    : [windowName];
}

/** Preserve dispatch's lookup order, including scoped-before-base Codex windows. */
export function resolveMinRemainingPercent(
  provider: string,
  connectionValue: unknown,
  policy: QuotaPreflightPolicy,
  windowName: string | null
): number {
  const connection = connectionValue as QuotaPreflightConnection;
  if (windowName !== null) {
    for (const name of lookupWindowNames(provider, windowName)) {
      const override = (connection.quotaWindowThresholds || {})[name];
      if (typeof override === "number") return override;
      const providerDefault = (policy.providerWindowDefaults[provider] || {})[name];
      if (typeof providerDefault === "number") return providerDefault;
    }
  }
  return policy.defaultThresholdPercent;
}

/**
 * True when the operator explicitly configured a cutoff for this window (per-connection
 * override, per-provider window default, or a global/legacy opt-in) — #17884. A configured
 * cutoff must still block a window that a healthy-override would otherwise let through.
 */
export function isConfiguredCutoff(
  provider: string,
  connectionValue: unknown,
  policy: QuotaPreflightPolicy,
  windowName: string | null
): boolean {
  const connection = connectionValue as QuotaPreflightConnection;
  if (windowName !== null) {
    const overrides = connection.quotaWindowThresholds || {};
    const defaults = policy.providerWindowDefaults[provider] || {};
    for (const name of lookupWindowNames(provider, windowName)) {
      if (Object.hasOwn(overrides, name) || Object.hasOwn(defaults, name)) return true;
    }
  }
  return (
    policy.enabled === true ||
    policy.defaultThresholdPercent > 2 ||
    isQuotaPreflightEnabled(connection as Record<string, unknown>)
  );
}
