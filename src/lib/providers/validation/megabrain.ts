/**
 * MegaBrain key check. MegaBrain serves `GET /api/openrouter/models` WITHOUT
 * authentication (200 for any key), so the generic models probe would green a bogus
 * `mb-v1-…` key. `GET /api/profile/limits` is a free authenticated read that accepts
 * both an API key and the device-code token (401 for a bad one), so it is the auth check.
 */
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { buildBearerHeaders } from "./headers";
import { toValidationErrorResult, validationRead } from "./transport";
import { normalizeBaseUrl } from "./urlHelpers";

const LIMITS_PATH = "/api/profile/limits";

/** The limits route on the host of the connection's base URL override, else the registry's. */
export function resolveMegabrainLimitsUrl(baseUrl?: string): string {
  const configured =
    normalizeBaseUrl(baseUrl ?? "") ||
    getRegistryEntry("megabrain")?.baseUrl ||
    "https://api.getmegabrain.com/api/openrouter/chat/completions";
  return `${new URL(configured).origin}${LIMITS_PATH}`;
}

export async function validateMegabrainProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const res = await validationRead(resolveMegabrainLimitsUrl(providerSpecificData.baseUrl), {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });
    if (res.status === 200) return { valid: true, error: null };
    if (res.status === 401 || res.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }
    return { valid: false, error: `Validation failed: ${res.status}` };
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}
