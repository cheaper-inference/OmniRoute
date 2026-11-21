/**
 * Authentication gate of the self-service routes (today `/v1/me/quota/{provider}`). Checks run in
 * a fixed order: feature flag, header credentials, key validation, key metadata, scope. Callers
 * can replace only the key store the gate reads; the checks themselves are not injectable.
 *
 * There is no per-address attempt limit here: behind a reverse proxy callers can share one
 * address (it depends on whether forwarded client addresses are trusted), so a lockout could let
 * any client deny the API to every key holder.
 */
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

import { hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

const SELF_SERVICE_FLAG = "QUOTA_SELF_PANEL";
const INVALID_KEY_MESSAGE = "Valid API key required";

export interface SelfServiceKey {
  id: string;
  name: string;
  scopes: string[];
  allowedQuotas: string[];
  /** As stored on the key: an empty list means no restriction. */
  allowedConnections: string[];
  expiresAt: string | null;
}

// The optional `undefined` members let `if (!auth.ok) return auth.response;` narrow under the
// repository's `strict: false` compiler settings.
export type SelfServiceAuth =
  | { ok: true; key: SelfServiceKey; response?: undefined }
  | { ok: false; response: Response; key?: undefined };

type KeyMetadata = {
  id: string;
  name: string;
  scopes?: string[] | null;
  allowedQuotas?: string[] | null;
  allowedConnections?: string[] | null;
  expiresAt?: string | null;
};

export type SelfServiceKeyStore = Pick<
  typeof import("@/lib/db/apiKeys"),
  "validateApiKey" | "getApiKeyMetadata"
>;

export function selfServiceJson(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {}
): Response {
  return Response.json(body, { status, headers: { ...headers, "Cache-Control": "no-store" } });
}

export function selfServiceError(
  status: number,
  message: string,
  headers: Record<string, string> = {}
): Response {
  return selfServiceJson(buildErrorBody(status, message), status, headers);
}

function refuse(status: number, message: string): SelfServiceAuth {
  return { ok: false, response: selfServiceError(status, message) };
}

/** Header credentials in the order they are tried: Bearer token, then `x-api-key`. */
function readCredentialCandidates(request: Request): string[] {
  const authorization = request.headers.get("Authorization") ?? "";
  const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  const xApiKey = request.headers.get("x-api-key")?.trim();
  return [...new Set([bearer, xApiKey].filter((value): value is string => Boolean(value)))];
}

/**
 * The first candidate the key store accepts, or null when none validates. The key row is read
 * on every call (`bypassCache`): the validation cache would keep answering "valid" for up to a
 * minute after a key's expiry, and this gate has no other expiry check.
 */
async function findValidCandidate(store: SelfServiceKeyStore, candidates: string[]) {
  for (const candidate of candidates) {
    if (await store.validateApiKey(candidate, { bypassCache: true })) return candidate;
  }
  return null;
}

function toSelfServiceKey(metadata: KeyMetadata): SelfServiceKey {
  return {
    id: metadata.id,
    name: metadata.name,
    scopes: Array.isArray(metadata.scopes) ? [...metadata.scopes] : [],
    allowedQuotas: Array.isArray(metadata.allowedQuotas) ? [...metadata.allowedQuotas] : [],
    allowedConnections: Array.isArray(metadata.allowedConnections)
      ? [...metadata.allowedConnections]
      : [],
    expiresAt: metadata.expiresAt ?? null,
  };
}

/** `keyStore` defaults to the API key table in `src/lib/db/apiKeys.ts`. */
export async function authenticateSelfServiceRequest(
  request: Request,
  keyStore?: SelfServiceKeyStore
): Promise<SelfServiceAuth> {
  if (!isFeatureFlagEnabled(SELF_SERVICE_FLAG)) return refuse(404, "Not found");

  const candidates = readCredentialCandidates(request);
  if (candidates.length === 0) return refuse(401, INVALID_KEY_MESSAGE);

  const store: SelfServiceKeyStore = keyStore ?? (await import("@/lib/db/apiKeys"));
  const apiKey = await findValidCandidate(store, candidates);
  if (!apiKey) return refuse(401, INVALID_KEY_MESSAGE);

  const metadata = await store.getApiKeyMetadata(apiKey);
  if (!metadata || metadata.id === "env-key") return refuse(401, INVALID_KEY_MESSAGE);
  if (!hasSelfUsageScope(metadata.scopes)) {
    return refuse(403, "API key lacks the self:usage scope");
  }
  return { ok: true, key: toSelfServiceKey(metadata) };
}
