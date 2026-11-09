import type { PreferredAccountFailoverSettings } from "@/lib/resilience/settings/types";

/**
 * Preferred-account response-start failover, scoped to connections selected
 * through the API key's soft preference list (never forced pins / combo steps).
 * Only a request-scoped locally shortened deadline may rotate to ONE sibling.
 *
 * Timeouts are response-start (upstream headers), not token-generation/TTFT.
 * Off by default. Operators can supply provider/model overrides via Resilience.
 */
export type PreferredFailoverSettings = PreferredAccountFailoverSettings;

export const DEFAULT_PREFERRED_FAILOVER_SETTINGS: PreferredFailoverSettings = {
  enabled: false,
  defaultTimeoutMs: 20_000,
  providerTimeoutsMs: {},
  modelTimeoutsMs: {},
};

const MIN_MS = 500;
const MAX_MS = 120_000;
const MAX_OVERRIDES = 64;
const MAX_KEY_LENGTH = 180;

// 0 disables the preferred-timeout policy for a provider or exact model.
// The existing underlying provider deadline still applies unchanged.
function validTimeout(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    (value === 0 || (value >= MIN_MS && value <= MAX_MS))
  );
}

function validKey(key: string): boolean {
  // Reject prototype-looking names and wildcard forms other than trailing *.
  return (
    key.length > 0 && key.length <= MAX_KEY_LENGTH && /^[a-z0-9][a-z0-9._/@:+-]*\*?$/i.test(key)
  );
}

function readOverrides(value: unknown, fallback: Record<string, number>): Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return fallback;
  const entries = Object.entries(value);
  if (entries.length > MAX_OVERRIDES) return fallback;
  const result: Record<string, number> = {};
  for (const [rawKey, ms] of entries) {
    const key = rawKey.trim().toLowerCase();
    if (!validKey(key) || !validTimeout(ms)) continue;
    result[key] = ms;
  }
  return result;
}

export function normalizePreferredFailoverSettings(
  value: unknown,
  fallback: PreferredFailoverSettings = DEFAULT_PREFERRED_FAILOVER_SETTINGS
): PreferredFailoverSettings {
  const data =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  return {
    enabled: typeof data.enabled === "boolean" ? data.enabled : fallback.enabled,
    defaultTimeoutMs:
      validTimeout(data.defaultTimeoutMs) && data.defaultTimeoutMs > 0
        ? data.defaultTimeoutMs
        : fallback.defaultTimeoutMs,
    providerTimeoutsMs: readOverrides(data.providerTimeoutsMs, fallback.providerTimeoutsMs),
    modelTimeoutsMs: readOverrides(data.modelTimeoutsMs, fallback.modelTimeoutsMs),
  };
}

export function readPreferredFailoverSettings(): PreferredFailoverSettings {
  // New global opt-in. Do not reuse the old Antigravity-only env flag: its
  // reuse would unexpectedly activate preferred failover for every provider.
  return {
    ...DEFAULT_PREFERRED_FAILOVER_SETTINGS,
    enabled: /^(?:1|true)$/i.test(process.env.OMNIROUTE_PREFERRED_ACCOUNT_FAILOVER_ENABLED || ""),
  };
}

export type PreferredFailoverDeadline = {
  timeoutMs: number | undefined;
  mayRotateOnRequestTimeout: boolean;
};

type PreferredCredentialState = {
  selectedByApiKeyPreference?: boolean;
  preferredFallbackAvailable?: boolean;
};

function canonicalProvider(provider: string): string {
  const name = provider.trim().toLowerCase();
  return name === "agy" ? "antigravity" : name;
}

function canonicalModelKey(provider: string, modelId: string): string {
  const raw = modelId.trim().toLowerCase();
  const slash = raw.indexOf("/");
  const bare =
    slash > 0 && canonicalProvider(raw.slice(0, slash)) === provider ? raw.slice(slash + 1) : raw;
  return provider + "/" + bare;
}

function findModelOverride(overrides: Record<string, number>, key: string): number | undefined {
  const direct = Object.prototype.hasOwnProperty.call(overrides, key) ? overrides[key] : undefined;
  if (direct !== undefined) return direct;
  let winner: number | undefined;
  let longest = 0;
  // Optional trailing * matches model families, e.g. anthropic/claude-opus-*.
  for (const [pattern, value] of Object.entries(overrides)) {
    if (!pattern.endsWith("*")) continue;
    const prefix = pattern.slice(0, -1);
    if (prefix.length > longest && key.startsWith(prefix)) {
      winner = value;
      longest = prefix.length;
    }
  }
  return winner;
}

// Isolate override precedence from request-scoped deadline policy. This keeps
// disabled (0) values meaningful and avoids duplicating fallback checks.
function configuredPreferredTimeoutMs(
  provider: string,
  modelId: string | undefined,
  settings: PreferredFailoverSettings
): number {
  const p = canonicalProvider(provider);
  const m = canonicalModelKey(p, modelId ?? "");
  const modelOverride = findModelOverride(settings.modelTimeoutsMs, m);
  if (modelOverride !== undefined) return modelOverride;
  const providerOverride = Object.prototype.hasOwnProperty.call(settings.providerTimeoutsMs, p)
    ? settings.providerTimeoutsMs[p]
    : p === "antigravity"
      ? settings.providerTimeoutsMs.agy
      : undefined;
  if (providerOverride !== undefined) return providerOverride;
  // Preserve the existing Antigravity fast-path defaults.
  if (p !== "antigravity") return settings.defaultTimeoutMs;
  return /^antigravity\/gemini-3\.8-flash(?:-tiered|-high|-medium|-low)?$/.test(m) ? 12_000 : 5_000;
}

export function resolvePreferredConnectionUpstreamStartTimeoutMs(
  provider: string,
  credentials: PreferredCredentialState | null | undefined,
  requestHintMs?: number,
  modelId?: string,
  settings: PreferredFailoverSettings = readPreferredFailoverSettings()
): PreferredFailoverDeadline {
  const hint =
    typeof requestHintMs === "number" && Number.isFinite(requestHintMs) && requestHintMs > 0
      ? Math.floor(requestHintMs)
      : undefined;
  if (
    !settings.enabled ||
    credentials?.selectedByApiKeyPreference !== true ||
    credentials?.preferredFallbackAvailable !== true
  ) {
    return { timeoutMs: hint, mayRotateOnRequestTimeout: false };
  }

  const selected = configuredPreferredTimeoutMs(provider, modelId, settings);
  const capMs = validTimeout(selected) ? selected : settings.defaultTimeoutMs;
  if (capMs === 0) return { timeoutMs: hint, mayRotateOnRequestTimeout: false };

  return {
    timeoutMs: hint === undefined ? capMs : Math.min(hint, capMs),
    // A stricter/equal trusted hint keeps the upstream-only timeout contract.
    // This guard is also necessary when a provider has an internal shorter cap.
    mayRotateOnRequestTimeout: hint === undefined || capMs < hint,
  };
}
