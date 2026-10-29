/**
 * Per-token cooldown for the Claude OAuth usage endpoint
 * (`https://api.anthropic.com/api/oauth/usage`).
 *
 * Anthropic rate-limits this quota endpoint independently of `/v1/messages`.
 * When polled from multiple connections at once (dashboard auto-refresh + the
 * combo health-scheduler), it spams `429` and that surfaces as noisy provider
 * errors plus increased upstream load. Chat with the same token still works.
 *
 * We track a per-credential "skip until" timestamp. When we see a `429`, we
 * suppress further OAuth-usage polls for that credential until the cooldown
 * expires; `getClaudeUsage` serves the last known quota (flagged stale) in the
 * meantime. The cooldown honors a bounded `Retry-After` /
 * `anthropic-ratelimit-*-reset` hint (see `computeClaudeUsageRetryMs`).
 *
 * Map keys are a SHA-256 of the access token, never the raw token.
 *
 * Pure helpers (no fetch, no timers) keep this TDD-friendly.
 *
 * Inspired-by upstream 9router commit `79df34ca`.
 */

import { opaqueTokenFingerprint } from "../utils/opaqueTokenFingerprint.ts";

export const OAUTH_USAGE_429_COOLDOWN_MS = 180_000; // 3 minutes (floor + default)
export const OAUTH_USAGE_429_MAX_COOLDOWN_MS = 30 * 60_000; // 30 minutes (ceiling)

/** Largest valid JS Date value (ms) — anything above is a garbage header. */
const MAX_DATE_MS = 8.64e15;

const oauthCooldown = new Map<string, number>();

/** Stable, non-reversible map key for a credential. */
export function hashClaudeCredential(accessToken: string): string {
  return opaqueTokenFingerprint(accessToken);
}

/** Returns true while `accessToken` is still inside its 429 cooldown window. */
export function isClaudeOauthUsageCoolingDown(
  accessToken: string | undefined,
  now: number = Date.now()
): boolean {
  if (!accessToken) return false;
  const key = hashClaudeCredential(accessToken);
  const until = oauthCooldown.get(key);
  if (until === undefined) return false;
  if (until > now) return true;
  // Lazy GC of expired entries — keeps the Map bounded by active tokens.
  oauthCooldown.delete(key);
  return false;
}

/** Record a 429 from the OAuth usage endpoint for `accessToken`. */
export function markClaudeOauthUsage429(
  accessToken: string | undefined,
  now: number = Date.now(),
  cooldownMs: number = OAUTH_USAGE_429_COOLDOWN_MS
): void {
  if (!accessToken) return;
  oauthCooldown.set(hashClaudeCredential(accessToken), now + cooldownMs);
}

/** `Retry-After` as delta-seconds or HTTP-date → ms from `now`, or null. */
function parseRetryAfterMs(value: string | null, now: number): number | null {
  const text = (value ?? "").trim();
  if (!text) return null;
  const seconds = Number(text);
  if (Number.isFinite(seconds)) return seconds >= 0 ? seconds * 1000 : null;
  const at = Date.parse(text);
  return Number.isFinite(at) ? Math.max(0, at - now) : null;
}

/** `anthropic-ratelimit-*-reset` (epoch s / epoch ms / ISO) → ms from `now`, or null. */
function parseResetHeaderMs(value: string | null, now: number): number | null {
  const text = (value ?? "").trim();
  if (!text) return null;
  const numeric = Number(text);
  const at = Number.isFinite(numeric)
    ? numeric < 1e12
      ? numeric * 1000
      : numeric
    : Date.parse(text);
  return Number.isFinite(at) && at > now && at <= MAX_DATE_MS ? at - now : null;
}

/**
 * Cooldown to apply after a `429` from the OAuth usage endpoint.
 *
 * Prefers `Retry-After`; without it, uses the furthest
 * `anthropic-ratelimit-*-reset` header. The result is clamped to
 * [OAUTH_USAGE_429_COOLDOWN_MS, OAUTH_USAGE_429_MAX_COOLDOWN_MS], and
 * defaults to the floor when no usable hint is present.
 */
export function computeClaudeUsageRetryMs(
  headers: Headers | null | undefined,
  now: number = Date.now()
): number {
  let parsed: number | null = null;
  if (headers) {
    parsed = parseRetryAfterMs(headers.get("retry-after"), now);
    if (parsed === null) {
      headers.forEach((value, name) => {
        if (!/^anthropic-ratelimit-.+-reset$/i.test(name)) return;
        const candidate = parseResetHeaderMs(value, now);
        if (candidate !== null && (parsed === null || candidate > parsed)) parsed = candidate;
      });
    }
  }
  return Math.min(
    OAUTH_USAGE_429_MAX_COOLDOWN_MS,
    Math.max(OAUTH_USAGE_429_COOLDOWN_MS, parsed ?? OAUTH_USAGE_429_COOLDOWN_MS)
  );
}

/** Test-only: clear all entries. */
export function _resetClaudeOauthUsageCooldown(): void {
  oauthCooldown.clear();
}

/** Test-only: the current map keys (hashed credentials). */
export function _claudeOauthUsageCooldownKeysForTest(): string[] {
  return [...oauthCooldown.keys()];
}
