import { normalizeProviderSpecificData } from "@/lib/providers/requestDefaults";
import { WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";
import { withDerivedCookieExpiry } from "@/shared/utils/webCookieExpiry";
import { ensureCodexFingerprintSeed } from "@omniroute/open-sse/config/codexIdentity.ts";

type Metadata = Record<string, unknown>;

function isMetadata(value: unknown): value is Metadata {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** OAuth refreshes cannot reset operator quota controls they do not supply. */
export function normalizeConnectionProviderSpecificData(
  provider: string | null,
  providerSpecificData: unknown,
  credentials: { accessToken?: unknown; refreshToken?: unknown },
  existingProviderSpecificData?: unknown
) {
  const normalized = normalizeProviderSpecificData(provider, providerSpecificData);
  const withExpiry = withDerivedCookieExpiryForProvider(provider, normalized, credentials);
  if (provider !== "codex") return withExpiry;

  if (isMetadata(providerSpecificData) && isMetadata(existingProviderSpecificData)) {
    for (const key of ["limitPolicy", "quotaPreflightEnabled"] as const) {
      if (
        !Object.hasOwn(providerSpecificData, key) &&
        Object.hasOwn(existingProviderSpecificData, key)
      ) {
        withExpiry[key] = existingProviderSpecificData[key];
      }
    }
  }
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
