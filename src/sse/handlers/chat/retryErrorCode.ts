/**
 * The upstream error code that goes with the credential retry loop's last error
 * (#21119). When every account of a provider fails, handleNoCredentials() answers
 * with the last upstream message; without the upstream's own code (for example
 * `gemini_web_signed_out`) the status table's default (401 → invalid_api_key)
 * reads as "your OmniRoute key is invalid".
 *
 * chat.ts keeps the code next to `requestRetryLastError` and records it at every
 * site that sets that error: this helper for an upstream answer, `null` for errors
 * OmniRoute synthesizes itself (stream classification, timeouts, capacity).
 */
export function upstreamErrorCodeOf(result: { errorCode?: unknown }): string | null {
  return typeof result.errorCode === "string" && result.errorCode ? result.errorCode : null;
}
