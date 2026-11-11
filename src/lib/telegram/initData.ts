/**
 * Telegram WebApp initData verification.
 *
 * A Telegram Mini App authenticates by passing `initData` (from the
 * Telegram.WebApp SDK's `initData` property) to its backend. The only
 * trustworthy anchor is the `hash` field: an HMAC-SHA256 over the sorted
 * `key=value` pairs (minus `hash`), keyed with SHA256 of the bot token.
 *
 * Reference: https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
 *
 * This module is pure and dependency-free (node:crypto only) so it is
 * directly unit-testable. Never trust the client-side `initData` alone —
 * verification MUST happen server-side.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

export interface VerifyInitDataOptions {
  /**
   * Maximum allowable future clock skew in seconds.
   * If auth_date is further in the future than this limit, verification fails.
   * Defaults to maxAgeSec when not specified.
   */
  maxClockSkewSec?: number;
  /**
   * Whether to record and reject replayed initData signatures within the validity window.
   * Defaults to false in the pure library function for backwards compatibility.
   */
  antiReplay?: boolean;
  /**
   * Explicit key to track for replay protection (defaults to the initData signature hash).
   */
  replayKey?: string;
  /**
   * Custom current unix epoch timestamp in seconds (defaults to Date.now() / 1000).
   */
  nowSec?: number;
}

const MAX_REPLAY_CACHE_SIZE = 10_000;
const replayCache = new Map<string, number>();

function sweepReplayCache(nowSec: number): void {
  for (const [key, expiresAt] of replayCache.entries()) {
    if (expiresAt <= nowSec) {
      replayCache.delete(key);
    }
  }
}

/** Reset the in-memory anti-replay cache (useful for testing). */
export function clearInitDataReplayCache(): void {
  replayCache.clear();
}

/** Parse a URLSearchParams-style initData string into a record. */
export function parseInitData(initData: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!initData) return out;
  for (const pair of initData.split("&")) {
    const eq = pair.indexOf("=");
    if (eq <= 0) continue;
    let key: string;
    let value: string;
    try {
      key = decodeURIComponent(pair.slice(0, eq));
      value = decodeURIComponent(pair.slice(eq + 1));
    } catch {
      // A malformed percent escape is not a valid initData field. Skip the pair
      // so the caller gets a signature mismatch (401) instead of an uncaught
      // URIError (500).
      continue;
    }
    if (key && !(key in out)) out[key] = value;
  }
  return out;
}

/**
 * Verify a Telegram WebApp initData string against the bot token.
 *
 * @param initData raw initData string from the Mini App (or `initDataUnsafe` reconstruction)
 * @param botToken Telegram bot token (`<id>:<secret>`) — the HMAC secret source
 * @param maxAgeSec optional freshness bound on `auth_date` (default 24h per Telegram docs)
 * @param options optional clock skew tolerance and anti-replay protection
 * @returns true when the signature matches, auth_date is fresh (within past and future bounds), and not replayed
 */
export function verifyInitData(
  initData: string,
  botToken: string,
  maxAgeSec = 24 * 60 * 60,
  options?: VerifyInitDataOptions
): boolean {
  if (!initData || !botToken) return false;
  const data = parseInitData(initData);
  const providedHash = data["hash"];
  if (!providedHash) return false;

  const now = options?.nowSec ?? Math.floor(Date.now() / 1000);

  // Freshness check on auth_date (unix seconds) - bounds both past and future.
  if (maxAgeSec > 0) {
    const authDate = Number.parseInt(data["auth_date"] ?? "", 10);
    if (!Number.isFinite(authDate) || authDate <= 0) return false;
    // Check past expiration
    if (now - authDate > maxAgeSec) return false;
    // Check future expiration (clock skew tolerance)
    const maxFutureSkew = options?.maxClockSkewSec ?? maxAgeSec;
    if (authDate - now > maxFutureSkew) return false;
  }

  // Anti-replay check
  const antiReplay = options?.antiReplay ?? false;
  const replayKey = options?.replayKey ?? providedHash;
  if (antiReplay) {
    sweepReplayCache(now);
    const existingExpiry = replayCache.get(replayKey);
    if (existingExpiry !== undefined && existingExpiry > now) {
      return false;
    }
  }

  // Rebuild the data-check string: sorted key=value pairs, excluding hash.
  const pairs = Object.entries(data)
    .filter(([k]) => k !== "hash")
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`);

  const dataCheckString = pairs.join("\n");

  // secret_key = HMAC_SHA256(key="WebAppData", bot_token)
  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();

  // expected_hash = HMAC_SHA256(secret_key, dataCheckString) hex
  const expectedHash = createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

  const provided = Buffer.from(providedHash, "utf8");
  const expected = Buffer.from(expectedHash, "utf8");
  if (provided.length !== expected.length) return false;
  if (!timingSafeEqual(provided, expected)) return false;

  // Signature is valid. If anti-replay is active, store key until expiry.
  if (antiReplay) {
    const authDate = Number.parseInt(data["auth_date"] ?? "", 10);
    const ttl = maxAgeSec > 0 ? maxAgeSec : 24 * 60 * 60;
    const expiresAt = (Number.isFinite(authDate) && authDate > 0 ? authDate : now) + ttl;
    if (replayCache.size >= MAX_REPLAY_CACHE_SIZE) {
      sweepReplayCache(now);
      if (replayCache.size >= MAX_REPLAY_CACHE_SIZE) {
        const firstKey = replayCache.keys().next().value;
        if (firstKey) replayCache.delete(firstKey);
      }
    }
    replayCache.set(replayKey, expiresAt);
  }

  return true;
}
