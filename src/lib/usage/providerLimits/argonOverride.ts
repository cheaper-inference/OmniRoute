/**
 * Operator override for Antigravity Gemini 4 Argon eligibility.
 *
 * Google's quota summary lists no Argon group for Pro accounts that still serve Gemini 4, so the
 * detected value would mark them ineligible on every quota refresh. A boolean
 * providerSpecificData.hasArgonOverride replaces the detected value; null or absent follows
 * detection.
 */

/** The eligibility to apply: the operator's boolean override, else the detected value. */
export function resolveArgonEligibility(psd: Record<string, unknown>, detected: unknown): unknown {
  return typeof psd.hasArgonOverride === "boolean" ? psd.hasArgonOverride : detected;
}

/**
 * Whether a quota refresh has an Argon decision to apply. The summary omits the detected value
 * when it has no groups; a stored override must still apply then.
 */
export function hasArgonDecision(psd: Record<string, unknown>, detected: unknown): boolean {
  return typeof resolveArgonEligibility(psd, detected) === "boolean";
}
