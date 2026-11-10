/**
 * Header fingerprint resolution for `httpBackedChat()`.
 *
 * claude.ai MUST reuse the exact fingerprint the Turnstile solver used to
 * mint `cf_clearance` (see `open-sse/config/claudeWebFingerprint.ts`) —
 * otherwise Cloudflare rejects the replayed cookie and every request 429s
 * (#7548). Other `httpBackedChat` callers (e.g. duckduckgo-web) keep their
 * own independent fingerprint, which never needs to match a solved cookie.
 */
import { claudeWebFingerprint } from "../config/claudeWebFingerprint.ts";
import { chromeUserAgent, newestChromeVersion } from "../utils/browserProfiles.ts";

export interface HttpBackedChatFingerprint {
  userAgent: string;
  secChUa: string;
  secChUaPlatform: string;
}

function duckduckgoFallbackFingerprint(): HttpBackedChatFingerprint {
  const version = newestChromeVersion();
  return {
    userAgent: chromeUserAgent("Macintosh; Intel Mac OS X 10_15_7", version),
    secChUa: `"Chromium";v="${version}", "Google Chrome";v="${version}", "Not-A.Brand";v="99"`,
    secChUaPlatform: '"macOS"',
  };
}

export function resolveHttpBackedChatFingerprint(
  chatUrlMatchDomain: string
): HttpBackedChatFingerprint {
  return chatUrlMatchDomain === "claude.ai"
    ? claudeWebFingerprint()
    : duckduckgoFallbackFingerprint();
}
