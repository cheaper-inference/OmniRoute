/**
 * Freebuff failure policy: protect standby accounts from accidental hour billing.
 *
 * Every Freebuff admission reserves a one-hour session on the selected account.
 * Rotating to another account on a transient blip (5xx, 409, or a short
 * overusage 429) burns that standby account's quota for nothing, so Freebuff
 * only rotates when the active account itself cannot serve requests anymore
 * (exhausted Freebucks pool, invalid/expired token, or account/region block).
 * Every other error stays on the active account for bounded retries and then
 * surfaces to the caller without cooling or switching away from that account.
 */

const FREEBUFF_PROVIDERS = new Set(["freebuff", "fb"]);
const DEFAULT_EXHAUSTED_COOLDOWN_MS = 60 * 60 * 1000;
const MAX_FREEBUFF_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

export type FreebuffFallbackDecision = {
  shouldFallback: boolean;
  cooldownMs: number;
  baseCooldownMs?: number;
  reason: string;
  quotaResetHintMs?: number;
  skipProviderBreaker?: boolean;
};

export function isFreebuffProvider(provider: string | null | undefined): boolean {
  return typeof provider === "string" && FREEBUFF_PROVIDERS.has(provider.trim().toLowerCase());
}

/**
 * Extract `Retry-After`, `retryAfterMs`, or `resetAt` into milliseconds until
 * the pool resets, clamped to a sane ceiling.
 */
export function parseFreebuffResetMs(
  errorText?: string | null,
  headers?: Headers | Record<string, string> | null,
  nowMs: number = Date.now()
): number | null {
  if (headers) {
    const retryAfter =
      typeof (headers as Headers).get === "function"
        ? (headers as Headers).get("retry-after")
        : ((headers as Record<string, string>)["retry-after"] ??
          (headers as Record<string, string>)["Retry-After"]);
    if (typeof retryAfter === "string" && retryAfter.trim()) {
      const trimmed = retryAfter.trim();
      if (/^\d+$/.test(trimmed)) {
        const ms = Number(trimmed) * 1000;
        if (ms > 0) return Math.min(ms, MAX_FREEBUFF_COOLDOWN_MS);
      } else {
        const ts = Date.parse(trimmed);
        if (Number.isFinite(ts) && ts > nowMs) {
          return Math.min(ts - nowMs, MAX_FREEBUFF_COOLDOWN_MS);
        }
      }
    }
  }

  if (!errorText) return null;
  const retryAfterMatch = /"retryAfterMs"\s*:\s*(\d+)/i.exec(errorText);
  if (retryAfterMatch) {
    const ms = Number(retryAfterMatch[1]);
    if (Number.isFinite(ms) && ms > 0) return Math.min(ms, MAX_FREEBUFF_COOLDOWN_MS);
  }
  const resetAtMatch = /"resetAt"\s*:\s*"([^"]+)"/i.exec(errorText);
  if (resetAtMatch) {
    const ts = Date.parse(resetAtMatch[1]);
    if (Number.isFinite(ts) && ts > nowMs) {
      return Math.min(ts - nowMs, MAX_FREEBUFF_COOLDOWN_MS);
    }
  }
  return null;
}

/**
 * True only when the upstream body proves this account's Freebucks pool is
 * spent (live probe 2026-11-18: HTTP 429 with `pool: "freebucks"`,
 * `freebucksShortfall`, and/or `recentCount >= limit`). A plain 429 without
 * Freebucks proof (e.g. short overusage/throttle) returns false.
 */
export function isFreebuffQuotaExhausted(
  status: number,
  errorText?: string | null,
  errorCode?: string | null
): boolean {
  if (
    errorCode === "freebucks_exhausted" ||
    errorCode === "insufficient_quota" ||
    errorCode === "quota_exhausted"
  ) {
    return true;
  }
  if (status !== 429 && status !== 402) return false;
  const text = String(errorText || "");
  if (!/freebucks/i.test(text)) return false;
  if (/freebucksShortfall/i.test(text)) return true;

  const recentMatch = /"recentCount"\s*:\s*(\d+)/i.exec(text);
  const limitMatch = /"limit"\s*:\s*(\d+)/i.exec(text);
  if (recentMatch && limitMatch) {
    const recent = Number(recentMatch[1]);
    const limit = Number(limitMatch[1]);
    if (Number.isFinite(recent) && Number.isFinite(limit) && limit > 0 && recent >= limit) {
      return true;
    }
  }
  const balanceMatch = /"balance"\s*:\s*(\d+)/i.exec(text);
  if (balanceMatch && Number(balanceMatch[1]) === 0 && /"pool"\s*:\s*"freebucks"/i.test(text)) {
    return true;
  }
  return false;
}

function isFreebuffAccountFailure(
  status: number,
  errorText: string,
  errorCode?: string | null
): boolean {
  if (status === 401 || errorCode === "invalid_token" || errorCode === "invalid_api_key") {
    return true;
  }
  if (
    errorCode === "country_blocked" ||
    (status === 403 &&
      /country_blocked|verificationRequired|account.*(suspend|ban|deactivat)/i.test(errorText))
  ) {
    return true;
  }
  return false;
}

/**
 * Provider-specific fallback decision for `checkFallbackError()`.
 *
 * Returns `null` only for credential/account blocks (401, country_blocked) so
 * the generic auth/terminal-status pipeline rotates to a working account.
 */
export function resolveFreebuffFallbackDecision(input: {
  status: number;
  errorText: string;
  headers?: Headers | Record<string, string> | null;
  structuredError?: { code?: string | null; type?: string | null } | null;
  nowMs?: number;
}): FreebuffFallbackDecision | null {
  const { status, errorText, headers, structuredError, nowMs = Date.now() } = input;
  const errorCode = structuredError?.code ?? null;

  if (isFreebuffQuotaExhausted(status, errorText, errorCode)) {
    const resetMs =
      parseFreebuffResetMs(errorText, headers, nowMs) ?? DEFAULT_EXHAUSTED_COOLDOWN_MS;
    return {
      shouldFallback: true,
      cooldownMs: resetMs,
      baseCooldownMs: resetMs,
      reason: "quota_exhausted",
      quotaResetHintMs: resetMs,
      skipProviderBreaker: true,
    };
  }

  if (isFreebuffAccountFailure(status, errorText, errorCode)) {
    return null;
  }

  // Transient / overusage / model / protocol errors must never park the active
  // account or rotate to a standby account whose hour would be billed.
  const reason =
    status === 429
      ? "rate_limit_exceeded"
      : status >= 500
        ? "server_error"
        : status === 409
          ? "model_capacity"
          : "unknown";
  return {
    shouldFallback: false,
    cooldownMs: 0,
    reason,
    ...(status < 500 ? { skipProviderBreaker: true } : {}),
  };
}
