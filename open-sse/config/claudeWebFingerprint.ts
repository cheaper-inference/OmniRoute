/**
 * Claude Web — shared browser fingerprint source of truth
 *
 * Cloudflare binds the `cf_clearance` cookie minted by the Turnstile solver
 * to the User-Agent (+ TLS/JA3 fingerprint + IP) that solved the challenge.
 * If the completion request later replays that cookie under a *different*
 * User-Agent, Cloudflare rejects it and the executor surfaces a persistent
 * 429 (see #7548).
 *
 * Every part of the claude-web pipeline that talks to claude.ai — the
 * Turnstile solver, the direct-fetch executor, and the httpBackedChat
 * fast path — MUST derive its User-Agent / Client-Hints headers from this
 * single function so they can never drift apart again.
 *
 * Platform choice: Linux, matching the TLS client and the browser-pool default.
 */
import { chromeUserAgent, newestChromeVersion } from "../utils/browserProfiles.ts";

export interface ClaudeWebFingerprint {
  userAgent: string;
  secChUa: string;
  secChUaPlatform: string;
  /** Major version shared with the TLS profile, so a bumped library invalidates old cookies. */
  version: string;
}

export function claudeWebFingerprint(): ClaudeWebFingerprint {
  const version = newestChromeVersion();
  return {
    userAgent: chromeUserAgent("X11; Linux x86_64", version),
    secChUa: `"Chromium";v="${version}", "Not-A.Brand";v="24", "Google Chrome";v="${version}"`,
    secChUaPlatform: '"Linux"',
    version,
  };
}

/**
 * Manual bump channel for the cf_clearance cache key: increment when the
 * fingerprint logic itself changes (e.g. platform switch) without a wreq-js
 * catalog bump, so cookies minted under the old logic are treated as stale.
 * Library version bumps are already covered by `claudeWebFingerprint().version`.
 */
export const CLAUDE_WEB_FINGERPRINT_VERSION = "v2-linux-unified";
