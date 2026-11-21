/**
 * rateLimitManager/groqTokenWindow — opt-in token-window tracking for Groq.
 *
 * Groq reports its token window on every response as `x-ratelimit-limit-tokens`
 * and `x-ratelimit-remaining-tokens`. The header-learned path only reads the
 * request window, so the token window was never recorded. With
 * RATE_LIMIT_GROQ_TOKEN_TRACKING=true this module records both values on the
 * Groq connection's learned-limit entry. Default off: with the flag unset, no
 * Groq token state is written.
 *
 * @module services/rateLimitManager/groqTokenWindow
 */

import { toNumberOrNull } from "../../utils/numeric.ts";

export interface GroqTokenWindow {
  tokenLimit?: number;
  tokenRemaining?: number;
}

export function isGroqTokenTrackingEnabled(): boolean {
  const raw = process.env.RATE_LIMIT_GROQ_TOKEN_TRACKING?.trim().toLowerCase();
  return raw === "true" || raw === "1" || raw === "on";
}

/**
 * Read the Groq token window from response headers. Returns an empty object
 * when the flag is off, the provider is not Groq, or the headers are absent.
 */
export function readGroqTokenWindow(
  provider: string,
  headers: Record<string, string>
): GroqTokenWindow {
  if (provider !== "groq" || !isGroqTokenTrackingEnabled()) return {};
  const tokenLimit = toNumberOrNull(headers["x-ratelimit-limit-tokens"]);
  const tokenRemaining = toNumberOrNull(headers["x-ratelimit-remaining-tokens"]);
  return {
    ...(tokenLimit !== null && tokenLimit > 0 ? { tokenLimit } : {}),
    ...(tokenRemaining !== null && tokenRemaining >= 0 ? { tokenRemaining } : {}),
  };
}
