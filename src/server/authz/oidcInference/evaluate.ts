/**
 * OIDC inference-auth request evaluation: verify → map roles to key groups →
 * provision/reconcile shadow key.
 *
 * Reuses the Entra shadow-key design (see ssoIdentities.ts): the OIDC user is
 * backed by an api_keys row so group policy, budgets, combos and call-log
 * attribution apply unchanged. Identity key is `oidc:<issuerHash>:<sub>` to
 * keep it distinct from Entra's `oid` (a bare UUID) — never the raw issuer
 * URL, which would break the TEXT PRIMARY KEY semantics with long values.
 *
 * Resolution is cached by token fingerprint for the same reason as Entra:
 * signature verification is cheap once JWKS is warm, but reconciling groups
 * on every request would mean a SQLite write per prompt.
 */

import { createHash } from "node:crypto";
import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import * as log from "@/sse/utils/logger";
import { getSsoShadowSecret, provisionSsoIdentity } from "@/lib/db/ssoIdentities";
import { getOidcInferenceConfig, type OidcInferenceConfig } from "./config";
import {
  looksLikeOidcJwt,
  verifyOidcInferenceToken,
  type OidcInferenceIdentity,
} from "./verifyToken";

export interface OidcInferenceAuthSuccess {
  ok: true;
  oid: string;
  label: string;
  secret: string;
}

export interface OidcInferenceAuthFailure {
  ok: false;
  status: number;
  code: string;
  message: string;
}

export type OidcInferenceAuthResult = OidcInferenceAuthSuccess | OidcInferenceAuthFailure;

const RESOLUTION_TTL_MS = 5 * 60 * 1000;
const MAX_CACHE_ENTRIES = 5000;

interface CacheEntry {
  policyFingerprint: string;
  oid: string;
  label: string;
  keyGroupIds: string[];
  roles: string[];
  expiresAt: number;
}

const resolutionCache = new Map<string, CacheEntry>();

export function resetOidcInferenceResolutionCache(): void {
  resolutionCache.clear();
}

/** A cached verdict only survives while it matches the current policy and token expiry. */
function isCacheEntryUsable(
  cached: CacheEntry | undefined,
  policyDigest: string,
  now: number
): cached is CacheEntry {
  return Boolean(cached && cached.expiresAt > now && cached.policyFingerprint === policyDigest);
}

/** Bind token-verification successes to every trust and role-policy input. */
function policyFingerprint(config: OidcInferenceConfig): string {
  const mappings = config.roleMappings
    .map((mapping) => `${mapping.role}=${mapping.keyGroupId}`)
    .sort((left, right) => left.localeCompare(right));
  const trust = [
    config.enabled,
    config.issuer,
    config.audience,
    mappings.join("|"),
    config.defaultKeyGroupId ?? "",
  ];
  return createHash("sha256").update(trust.join("\n")).digest("hex");
}

/** Identity key: stable per (issuer, sub), valid for the sso_identities PK. */
export function oidcInferenceIdentityKey(issuer: string, sub: string): string {
  const issuerHash = createHash("sha256").update(issuer).digest("hex").slice(0, 16);
  return `oidc:${issuerHash}:${sub}`;
}

/**
 * Role → key-group resolution. Mirrors the Entra rule that an identity with
 * zero groups means "unrestricted downstream" and is therefore never
 * acceptable: a user whose roles map to nothing is DENIED here, not let
 * through wide open.
 */
function resolveKeyGroupsForRoles(
  roles: string[],
  config: Awaited<ReturnType<typeof getOidcInferenceConfig>>
): { keyGroupIds: string[]; matchedRoles: string[] } {
  const held = new Set(roles);
  const keyGroupIds = new Set<string>();
  const matchedRoles: string[] = [];
  for (const mapping of config.roleMappings) {
    if (held.has(mapping.role)) {
      keyGroupIds.add(mapping.keyGroupId);
      matchedRoles.push(mapping.role);
    }
  }
  if (keyGroupIds.size === 0 && config.defaultKeyGroupId) {
    keyGroupIds.add(config.defaultKeyGroupId);
  }
  return { keyGroupIds: [...keyGroupIds], matchedRoles };
}

export async function evaluateOidcInferenceAuth(token: string): Promise<OidcInferenceAuthResult> {
  const config = await getOidcInferenceConfig();
  if (!config.enabled) {
    return {
      ok: false,
      status: 401,
      code: "AUTH_OIDC_INFERENCE_DISABLED",
      message: "OIDC inference authentication is not enabled",
    };
  }
  if (!config.issuer || !config.audience) {
    // Fail closed: a half-configured block must not accept tokens.
    return {
      ok: false,
      status: 401,
      code: "AUTH_OIDC_INFERENCE_INCOMPLETE",
      message: "OIDC inference authentication is not configured",
    };
  }

  const fingerprint = opaqueTokenFingerprint(token);
  const currentPolicyFingerprint = policyFingerprint(config);
  const now = Date.now();
  const cached = resolutionCache.get(fingerprint);
  if (isCacheEntryUsable(cached, currentPolicyFingerprint, now)) {
    // Re-read the shadow secret rather than trusting the cache: it goes null
    // the moment the shadow key is deactivated or deleted, which is how a
    // revoked user loses access without waiting for the token to expire.
    const secret = getSsoShadowSecret(cached.oid);
    if (secret) return { ok: true, oid: cached.oid, label: cached.label, secret };
  }

  const verified = await verifyOidcInferenceToken(token, config);
  if (!verified.ok) {
    const verifyFailure = verified as {
      status: number;
      code: string;
      message: string;
    };
    return {
      ok: false,
      status: verifyFailure.status,
      code: verifyFailure.code,
      message: verifyFailure.message,
    };
  }

  const oid = oidcInferenceIdentityKey(config.issuer, verified.identity.sub);
  const { keyGroupIds } = resolveKeyGroupsForRoles(verified.identity.roles, config);
  if (keyGroupIds.length === 0) {
    log.warn("OIDC_INFERENCE", "User holds no mapped role — denying", {
      oid,
      roles: verified.identity.roles,
    });
    return {
      ok: false,
      status: 403,
      code: "AUTH_OIDC_INFERENCE_NO_ROLE",
      message: "No access: your account is not assigned the required role",
    };
  }
  return await provisionAndCacheVerifiedUser(
    fingerprint,
    currentPolicyFingerprint,
    now,
    oid,
    verified,
    keyGroupIds,
    config
  );
}

async function provisionAndCacheVerifiedUser(
  fingerprint: string,
  policyDigest: string,
  now: number,
  oid: string,
  verified: { identity: OidcInferenceIdentity },
  keyGroupIds: string[],
  config: OidcInferenceConfig
): Promise<OidcInferenceAuthResult> {
  const secret = await provisionSsoIdentity({
    oid,
    tenantId: config.issuer,
    upn: verified.identity.label,
    displayName: verified.identity.label,
    keyGroupIds,
  });
  if (!secret) {
    return {
      ok: false,
      status: 503,
      code: "AUTH_OIDC_INFERENCE_PROVISION_FAILED",
      message: "Failed to provision access for this identity",
    };
  }

  // Bound the cache by token expiry: never serve a cached verdict past exp.
  const ttl = Math.min(RESOLUTION_TTL_MS, Math.max(1, verified.identity.expiresAt - now));
  resolutionCache.set(fingerprint, {
    policyFingerprint: policyDigest,
    oid,
    label: verified.identity.label,
    keyGroupIds,
    roles: verified.identity.roles,
    expiresAt: now + ttl,
  });
  pruneCache();

  return { ok: true, oid, label: verified.identity.label, secret };
}

function pruneCache(): void {
  const now = Date.now();
  for (const [key, entry] of resolutionCache) {
    if (entry.expiresAt <= now) resolutionCache.delete(key);
  }
  while (resolutionCache.size > MAX_CACHE_ENTRIES) {
    const oldest = resolutionCache.keys().next().value;
    if (oldest === undefined) break;
    resolutionCache.delete(oldest);
  }
}

export { looksLikeOidcJwt };
