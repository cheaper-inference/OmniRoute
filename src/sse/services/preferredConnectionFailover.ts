import type {
  AntigravityPreferredFailoverSettings,
} from "@/lib/resilience/settings/types";

/** Response-start cap for an API-key preferred Antigravity connection.
 *
 * Opt-in: a preferred account is only a soft ordering hint. A locally shortened
 * deadline may try ONE eligible sibling, without cooling the first account.
 * A forced pin, managed lease, Muse owner or combo target never uses this policy.
 */
export type PreferredFailoverSettings = AntigravityPreferredFailoverSettings;

export const DEFAULT_PREFERRED_FAILOVER_SETTINGS: PreferredFailoverSettings = {
  enabled: false,
  preferredTimeoutMs: 5_000,
  gemini38PreferredTimeoutMs: 12_000,
};

type PreferredCredentialState = {
  selectedByApiKeyPreference?: boolean;
  preferredFallbackAvailable?: boolean;
};

function boundedMs(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isInteger(value) &&
    value >= 500 && value <= 120_000 ? value : fallback;
}

export function normalizePreferredFailoverSettings(
  value: unknown,
  fallback: PreferredFailoverSettings = DEFAULT_PREFERRED_FAILOVER_SETTINGS
): PreferredFailoverSettings {
  const data = value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown> : {};
  return {
    enabled: typeof data.enabled === "boolean" ? data.enabled : fallback.enabled,
    preferredTimeoutMs: boundedMs(data.preferredTimeoutMs, fallback.preferredTimeoutMs),
    gemini38PreferredTimeoutMs: boundedMs(
      data.gemini38PreferredTimeoutMs,
      fallback.gemini38PreferredTimeoutMs
    ),
  };
}

export function readPreferredFailoverSettings(): PreferredFailoverSettings {
  // The environment flag is an opt-in fallback for installations without a
  // persisted Resilience override. Saved dashboard values take precedence.
  return {
    ...DEFAULT_PREFERRED_FAILOVER_SETTINGS,
    enabled: /^(?:1|true)$/i.test(
      process.env.OMNIROUTE_ANTIGRAVITY_PREFERRED_FAILOVER_ENABLED || ""
    ),
  };
}

export type PreferredFailoverDeadline = {
  timeoutMs: number | undefined;
  /** True only when the preferred deadline actually shortened this request. */
  mayRotateOnRequestTimeout: boolean;
};

export function resolvePreferredConnectionUpstreamStartTimeoutMs(
  provider: string,
  credentials: PreferredCredentialState | null | undefined,
  requestHintMs?: number,
  modelId?: string,
  settings: PreferredFailoverSettings = readPreferredFailoverSettings()
): PreferredFailoverDeadline {
  const hint = typeof requestHintMs === "number" && Number.isFinite(requestHintMs) &&
    requestHintMs > 0 ? Math.floor(requestHintMs) : undefined;
  if (
    !settings.enabled ||
    (provider !== "antigravity" && provider !== "agy") ||
    credentials?.selectedByApiKeyPreference !== true ||
    credentials?.preferredFallbackAvailable !== true
  ) {
    return { timeoutMs: hint, mayRotateOnRequestTimeout: false };
  }

  const bareModel = (modelId || "").replace(/^(?:antigravity|agy)\//i, "");
  const isGemini38 = /^gemini-3\.8-flash(?:-tiered|-high|-medium|-low)?$/i.test(bareModel);
  const capMs = isGemini38
    ? boundedMs(settings.gemini38PreferredTimeoutMs, DEFAULT_PREFERRED_FAILOVER_SETTINGS.gemini38PreferredTimeoutMs)
    : boundedMs(settings.preferredTimeoutMs, DEFAULT_PREFERRED_FAILOVER_SETTINGS.preferredTimeoutMs);
  return {
    timeoutMs: hint === undefined ? capMs : Math.min(hint, capMs),
    // A trusted internal caller's equal or stricter hint retains its
    // original no-rotation contract from PR #19162.
    mayRotateOnRequestTimeout: hint === undefined || capMs < hint,
  };
}
