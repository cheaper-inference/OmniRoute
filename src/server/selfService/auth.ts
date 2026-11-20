/**
 * Authentication gate shared by the self-service routes (`/v1/me/quota/{provider}` and
 * `/v1/me/usage`). Checks run in a fixed order: feature flag, per-address lockout,
 * header credentials, key validation, key metadata, scope.
 *
 * Failed key validations count against the same lockout map as the dashboard login, under a
 * `self-service:` namespace so they cannot lock the login itself. A missing key never counts,
 * and a valid key never clears the failure budget of its address: holding one key must not
 * buy a fresh set of guesses for others.
 */
import { buildErrorBody } from "@omniroute/open-sse/utils/error";

import { getClientIpFromRequest } from "@/lib/ipUtils";
import { getCachedSettings } from "@/lib/db/readCache";
import { beginLoginAttempt, endLoginAttempt, recordLoginFailure } from "@/server/auth/loginGuard";
import { getLoginLockoutKey } from "@/server/auth/loginPeer";
import { hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

const SELF_SERVICE_FLAG = "QUOTA_SELF_PANEL";
const LOCKOUT_NAMESPACE = "self-service:";

export interface SelfServiceKey {
  id: string;
  name: string;
  scopes: string[];
  allowedQuotas: string[];
  expiresAt: string | null;
}

export type SelfServiceAuth = { ok: true; key: SelfServiceKey } | { ok: false; response: Response };

type KeyMetadata = {
  id: string;
  name: string;
  scopes?: string[] | null;
  allowedQuotas?: string[] | null;
  expiresAt?: string | null;
};

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

function refuse(status: number, message: string, headers?: Record<string, string>) {
  return { ok: false as const, response: selfServiceError(status, message, headers) };
}

function lockedOut(retryAfterSeconds: number | undefined) {
  const headers = retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined;
  return refuse(429, "Too many failed attempts. Try again later.", headers);
}

function lockoutKeyFor(request: Request): string {
  const peer = getLoginLockoutKey(request, getClientIpFromRequest(request));
  return LOCKOUT_NAMESPACE + (peer ?? "unknown");
}

async function isBruteForceProtectionEnabled(): Promise<boolean> {
  const settings = await getCachedSettings();
  return settings.bruteForceProtection !== false;
}

/** Header credentials in the order they are tried: Bearer token, then `x-api-key`. */
function readCredentialCandidates(request: Request): string[] {
  const authorization = request.headers.get("Authorization") ?? "";
  const bearer = authorization.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  const xApiKey = request.headers.get("x-api-key")?.trim();
  return [...new Set([bearer, xApiKey].filter((value): value is string => Boolean(value)))];
}

/** The first candidate the key store accepts, or null when none validates. */
async function findValidCandidate(candidates: string[]): Promise<string | null> {
  const { validateApiKey } = await import("@/lib/db/apiKeys");
  for (const candidate of candidates) {
    if (await validateApiKey(candidate)) return candidate;
  }
  return null;
}

function toSelfServiceKey(metadata: KeyMetadata): SelfServiceKey {
  return {
    id: metadata.id,
    name: metadata.name,
    scopes: Array.isArray(metadata.scopes) ? [...metadata.scopes] : [],
    allowedQuotas: Array.isArray(metadata.allowedQuotas) ? [...metadata.allowedQuotas] : [],
    expiresAt: metadata.expiresAt ?? null,
  };
}

async function authenticateCandidates(
  candidates: string[],
  lockoutKey: string,
  enabled: boolean
): Promise<SelfServiceAuth> {
  const apiKey = await findValidCandidate(candidates);
  if (!apiKey) {
    const decision = recordLoginFailure(lockoutKey, { enabled });
    if (!decision.allowed) return lockedOut(decision.retryAfterSeconds);
    return refuse(401, "Valid API key required");
  }

  const { getApiKeyMetadata } = await import("@/lib/db/apiKeys");
  const metadata = await getApiKeyMetadata(apiKey);
  if (!metadata || metadata.id === "env-key") return refuse(401, "Valid API key required");
  if (!hasSelfUsageScope(metadata.scopes)) {
    return refuse(403, "API key lacks the self:usage scope");
  }
  return { ok: true, key: toSelfServiceKey(metadata) };
}

export async function authenticateSelfServiceRequest(request: Request): Promise<SelfServiceAuth> {
  if (!isFeatureFlagEnabled(SELF_SERVICE_FLAG)) return refuse(404, "Not found");

  const lockoutKey = lockoutKeyFor(request);
  const enabled = await isBruteForceProtectionEnabled();
  const guard = beginLoginAttempt(lockoutKey, { enabled });
  if (!guard.allowed) return lockedOut(guard.retryAfterSeconds);

  try {
    const candidates = readCredentialCandidates(request);
    if (candidates.length === 0) return refuse(401, "Valid API key required");
    return await authenticateCandidates(candidates, lockoutKey, enabled);
  } finally {
    // beginLoginAttempt reserves a slot only while the guard is enabled.
    if (enabled) endLoginAttempt(lockoutKey);
  }
}
