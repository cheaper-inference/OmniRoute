import { ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE } from "../config/constants.ts";

/**
 * A confirmed exhausted response-header deadline, NOT an arbitrary HTTP 504.
 * Preserve the original error across URL and Pro fallback layers, so the
 * account selector can try a different eligible account instead of replaying.
 */
export function isAntigravityPreResponseTimeout(error: unknown): boolean {
  return (
    error !== null &&
    typeof error === "object" &&
    (error as { code?: unknown }).code === ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE
  );
}
