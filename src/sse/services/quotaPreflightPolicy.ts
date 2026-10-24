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

/** Preserve dispatch's lookup order, including scoped-before-base Codex windows. */
export function resolveMinRemainingPercent(
  provider: string,
  connectionValue: unknown,
  policy: QuotaPreflightPolicy,
  windowName: string | null
): number {
  const connection = connectionValue as QuotaPreflightConnection;
  if (windowName !== null) {
    const names =
      provider === "codex"
        ? [
            ...new Set(
              [windowName, toCodexBaseQuotaWindowName(windowName)].filter(Boolean) as string[]
            ),
          ]
        : [windowName];
    for (const name of names) {
      const override = (connection.quotaWindowThresholds || {})[name];
      if (typeof override === "number") return override;
      const providerDefault = (policy.providerWindowDefaults[provider] || {})[name];
      if (typeof providerDefault === "number") return providerDefault;
    }
  }
  return policy.defaultThresholdPercent;
}
