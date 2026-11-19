import { normalizeProviderSpecificData } from "@/lib/providers/requestDefaults";
import { WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";
import { withDerivedCookieExpiry } from "@/shared/utils/webCookieExpiry";
import { ensureCodexFingerprintSeed } from "@omniroute/open-sse/config/codexIdentity.ts";
import { isValidCliUserID } from "@omniroute/open-sse/executors/claudeIdentity.ts";

type Metadata = Record<string, unknown>;

function isMetadata(value: unknown): value is Metadata {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/**
 * Operator-set controls a fresh OAuth payload never carries (#20620): the quota controls
 * every provider honours, plus the Claude opt-ins edited in the connection modal.
 * A key is kept only when the incoming payload lacks it, so an explicit write still wins.
 */
const OPERATOR_CONTROL_KEYS = [
  "limitPolicy",
  "quotaPreflightEnabled",
  "allowPaidCredits",
  "blockExtraUsage",
  "lowPriorityMode",
  "autoLimitReset",
  "keepMidConversationSystem",
  "peakHourProtection",
] as const;

/** OAuth refreshes cannot reset operator controls they do not supply. */
export function normalizeConnectionProviderSpecificData(
  provider: string | null,
  providerSpecificData: unknown,
  credentials: { accessToken?: unknown; refreshToken?: unknown },
  existingProviderSpecificData?: unknown
) {
  const normalized = normalizeProviderSpecificData(provider, providerSpecificData);
  const withExpiry = withDerivedCookieExpiryForProvider(provider, normalized, credentials);

  // `null` / a non-object payload is an explicit clear, so nothing is carried over.
  if (isMetadata(providerSpecificData) && isMetadata(existingProviderSpecificData)) {
    for (const key of OPERATOR_CONTROL_KEYS) {
      if (
        !Object.hasOwn(providerSpecificData, key) &&
        Object.hasOwn(existingProviderSpecificData, key)
      ) {
        withExpiry[key] = existingProviderSpecificData[key];
      }
    }
    // A fresh Claude login always mints a new device id; keep the one already in use.
    if (provider === "claude" && isValidCliUserID(existingProviderSpecificData.cliUserID)) {
      withExpiry.cliUserID = existingProviderSpecificData.cliUserID;
    }
  }
  if (provider !== "codex") return withExpiry;

  return ensureCodexFingerprintSeed(
    withExpiry,
    credentials,
    (existingProviderSpecificData as Metadata | null) ?? null
  );
}

function withDerivedCookieExpiryForProvider(
  provider: string | null,
  providerSpecificData: unknown,
  credentials: unknown
): Metadata {
  const key = String(provider || "").toLowerCase();
  if (!(WEB_COOKIE_PROVIDERS as Metadata)[key]) {
    return (providerSpecificData ?? {}) as Metadata;
  }
  const source = credentials as Metadata | null;
  const credential =
    source && typeof source === "object"
      ? (typeof source.apiKey === "string" && source.apiKey) ||
        (typeof source.cookie === "string" && source.cookie) ||
        null
      : null;
  return withDerivedCookieExpiry(providerSpecificData, credential);
}
