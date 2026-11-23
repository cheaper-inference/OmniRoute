// @ts-nocheck
//
// Token Rotation Map (codex-multi-auth pattern) — extracted from
// open-sse/services/tokenRefresh.ts. See ../shared.ts for provenance notes.
//
// When a rotating-token provider (Codex, Kimi, GitLab Duo, etc.) refreshes,
// the old refresh_token is consumed and a new one is issued. Any subsequent
// caller arriving with the OLD token would, without protection, hit upstream
// and trigger "refresh_token_reused" — which Auth0 treats as a security event
// and invalidates the entire token family.
//
// This in-memory map caches RECENT rotations so a stale caller can be redirected
// to the new tokens WITHOUT touching upstream. The DB staleness check inside
// the per-connection mutex covers the same scenario when connectionId is known,
// but not all callers pass connectionId (e.g., legacy code paths, retries that
// snapshot credentials before the rotation lands in DB).
//
// Ported from ndycode/codex-multi-auth (lib/refresh-queue.ts:218-248), the only
// publicly known tool that reliably sustains multiple Codex OAuth accounts.
//
// Key format: `provider:sha256(oldRefreshToken)`
// Value: { result: tokens, expiresAt: ms_since_epoch }
import { pbkdf2Sync } from "node:crypto";

const CACHE_SECRET = "omniroute-token-cache";

/**
 * Build the dedup/rotation cache key for a (provider, refreshToken) pair.
 * Hashed so a raw refresh_token never sits in a Map key in plaintext.
 *
 * `discriminator` replaces the refresh_token for providers that refresh from a
 * credential OTHER than an OAuth refresh_token (Devin Desktop's `auth1_…`). Those
 * connections have no refresh_token, so without a discriminator every account of
 * such a provider would hash to the same key and share one in-flight refresh —
 * handing account A's tokens to account B.
 */
export function getRefreshCacheKey(provider, refreshToken, discriminator = null) {
  const secret =
    typeof refreshToken === "string" && refreshToken.length > 0 ? refreshToken : discriminator;
  // No identifier at all: keep the historical shape so existing callers/tests stay
  // stable. Such a connection must NOT use the shared in-flight cache (the caller
  // guards on this), because the key cannot distinguish accounts.
  if (typeof secret !== "string" || secret.length === 0) {
    return `${provider}:anonymous`;
  }
  const tokenHash = pbkdf2Sync(secret, CACHE_SECRET, 1000, 32, "sha256").toString("hex");
  return `${provider}:${tokenHash}`;
}

/**
 * True when this credentials object carries a usable per-connection identity for
 * the refresh caches, so a shared in-flight promise cannot leak across accounts.
 */
export function hasRefreshCacheIdentity(credentials) {
  if (!credentials || typeof credentials !== "object") return false;
  if (typeof credentials.refreshToken === "string" && credentials.refreshToken.length > 0) {
    return true;
  }
  return typeof credentials.refreshCacheDiscriminator === "string"
    ? credentials.refreshCacheDiscriminator.length > 0
    : false;
}

type RotationEntry = {
  result: { accessToken: string; refreshToken: string; expiresIn?: number; expiresAt?: string };
  expiresAt: number;
};
const tokenRotationMap = new Map<string, RotationEntry>();
const ROTATION_MAP_TTL_MS = 60 * 1000; // 60 seconds — long enough to catch in-flight stale callers

function cleanupRotationMap(now: number = Date.now()): void {
  if (tokenRotationMap.size === 0) return;
  for (const [key, entry] of tokenRotationMap.entries()) {
    if (entry.expiresAt <= now) tokenRotationMap.delete(key);
  }
}

export function lookupRotation(
  provider: string,
  refreshToken: string,
  discriminator: string | null = null
): RotationEntry | undefined {
  cleanupRotationMap();
  const key = getRefreshCacheKey(provider, refreshToken, discriminator);
  const entry = tokenRotationMap.get(key);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    tokenRotationMap.delete(key);
    return undefined;
  }
  return entry;
}

export function recordRotation(
  provider: string,
  oldRefreshToken: string,
  result: { accessToken: string; refreshToken: string; expiresIn?: number; expiresAt?: string }
): void {
  if (!oldRefreshToken || !result.refreshToken || oldRefreshToken === result.refreshToken) {
    return;
  }
  const key = getRefreshCacheKey(provider, oldRefreshToken);
  tokenRotationMap.set(key, {
    result,
    expiresAt: Date.now() + ROTATION_MAP_TTL_MS,
  });
}

// Exported for tests + diagnostics; not part of the public API surface.
export function _getTokenRotationMapStats(): { size: number; entries: number } {
  cleanupRotationMap();
  return { size: tokenRotationMap.size, entries: tokenRotationMap.size };
}

export function _clearTokenRotationMap(): void {
  tokenRotationMap.clear();
}
