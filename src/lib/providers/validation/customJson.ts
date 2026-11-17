import {
  CustomJsonError,
  isCustomJsonProviderData,
  normalizeCustomJsonConfig,
} from "@omniroute/open-sse/utils/customJson.ts";

export { isCustomJsonProviderData };

/**
 * Connection validation for a custom JSON API node. A business endpoint may have side
 * effects, so saving, auto-testing or health-checking a connection never calls it: only
 * the stored config is checked, and a valid one reports "unsupported" (an unverifiable
 * connection — kept usable, never marked invalid). A real request is sent only when the
 * operator explicitly runs the node test (POST /api/provider-nodes/validate).
 */
export function validateCustomJsonConnection(providerSpecificData: Record<string, unknown>) {
  try {
    normalizeCustomJsonConfig(providerSpecificData.customJson, providerSpecificData.baseUrl);
  } catch (error) {
    const message =
      error instanceof CustomJsonError ? error.message : "Invalid custom JSON configuration";
    return { valid: false, error: message, unsupported: false };
  }
  return {
    valid: false,
    unsupported: true,
    error: "Custom JSON endpoints are not called by connection tests",
  };
}
