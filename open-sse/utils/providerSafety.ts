import { isRegisteredFeatureFlagEnabled } from "./registeredFeatureFlag.ts";

/**
 * Default-off feature flag (#17049): keep explicit provider safety stops as terminal,
 * request-scoped refusals through error projection and combo routing.
 */
export const PROVIDER_SAFETY_STOPS_TERMINAL_FLAG = "PROVIDER_SAFETY_STOPS_TERMINAL";

/** Explicit protocol safety-stop codes (plus the bounded local label for the legacy shape). */
export const PROVIDER_SAFETY_ERROR_CODES: ReadonlySet<string> = new Set([
  "misalignment_policy_violation",
  "content_policy_violation",
  "provider_safety_rejection",
]);

export function isProviderSafetyStopsEnabled(): boolean {
  return isRegisteredFeatureFlagEnabled(PROVIDER_SAFETY_STOPS_TERMINAL_FLAG);
}

/** True when `value` is a safety-stop code and the flag lets it through the public allowlists. */
export function isPublicProviderSafetyCode(value: string): boolean {
  return PROVIDER_SAFETY_ERROR_CODES.has(value.toLowerCase()) && isProviderSafetyStopsEnabled();
}

export interface ProviderSafetyInput {
  status?: unknown;
  code?: unknown;
  type?: unknown;
  message?: unknown;
}

/**
 * Classify explicit protocol safety stops without inferring a private detector from prose.
 * Returns null unless PROVIDER_SAFETY_STOPS_TERMINAL is on, so every caller keeps its
 * existing handling by default.
 */
export function classifyProviderSafetyError(
  input: ProviderSafetyInput
): { status: number; code: string } | null {
  if (!isProviderSafetyStopsEnabled()) return null;
  let code = typeof input.code === "string" ? input.code : "";
  if (!PROVIDER_SAFETY_ERROR_CODES.has(code)) {
    if (
      (input.code !== undefined &&
        input.code !== null &&
        input.code !== "" &&
        input.code !== "invalid_request_error" &&
        input.code !== "bad_request") ||
      input.type !== "invalid_request_error" ||
      input.message !==
        "This request was blocked by our safety systems. Reason: Potentially unintended activity."
    ) {
      return null;
    }
    // A bounded local label preserves a legacy stop without inventing its upstream code.
    code = "provider_safety_rejection";
  }
  const status = input.status ?? (code === "misalignment_policy_violation" ? 403 : 400);
  if (status !== 400 && status !== 403) return null;
  return { status, code };
}
