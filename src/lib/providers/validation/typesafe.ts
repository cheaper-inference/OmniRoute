import { SYSTEMONE_BACKENDS } from "@omniroute/open-sse/config/systemOneRegistry.ts";
import { parseTypeSafeModels } from "@omniroute/open-sse/handlers/systemOneCatalog.ts";
import { buildBearerHeaders } from "./headers";
import { toValidationErrorResult, validationRead } from "./transport";
import {
  evaluateSystemOneChoice,
  type SystemOneChoiceUnavailable,
} from "@omniroute/open-sse/services/typesafe/systemOne.ts";

/** Credential validation is an authenticated catalog read, never paid inference. */
export async function validateTypeSafeProvider({
  apiKey,
  providerSpecificData = {},
  fetchImpl = validationRead,
}: {
  apiKey: string;
  providerSpecificData?: Record<string, unknown>;
  fetchImpl?: typeof validationRead;
}) {
  try {
    const url = SYSTEMONE_BACKENDS.typesafe.modelsUrl;
    const response = await fetchImpl(url, {
      method: "GET",
      headers: buildBearerHeaders(apiKey, providerSpecificData),
    });
    if (response.ok) {
      parseTypeSafeModels(await response.json());
      return { valid: true, error: null, method: "typesafe_models", testedEndpoint: `GET ${url}` };
    }
    return {
      valid: false,
      error: `TypeSafe catalog validation returned HTTP ${response.status}`,
      method: "typesafe_models",
      testedEndpoint: `GET ${url}`,
    };
  } catch (error) {
    return toValidationErrorResult(error);
  }
}

/**
 * TypeSafe AI (System One / Jev) API-key validation.
 *
 * Probes POST /v1/systemone with a tiny choice question. A 2xx with a parseable
 * choice means the key works; 401/403 means invalid; everything else is treated
 * as unavailable (credentials may still be fine).
 */
export async function validateTypesafeProvider({
  apiKey,
  fetchImpl,
}: {
  apiKey?: string | null;
  fetchImpl?: typeof fetch;
}) {
  const result = await evaluateSystemOneChoice({
    apiKey,
    state: "ping",
    instructions: "Pick any option.",
    criteria: {
      ok: "A valid routing destination",
      other: "Any other destination",
    },
    timeoutMs: 10_000,
    fetchImpl,
  });

  if (result.ok) {
    return { valid: true, error: null, method: "typesafe_systemone" };
  }
  // `strict: false` does not narrow the union by the boolean `ok`; past the early return it is the failure arm.
  const failure = result as SystemOneChoiceUnavailable;

  if (failure.reason === "missing_api_key") {
    return { valid: false, error: "API key is required" };
  }

  if (failure.reason === "http_error" && (failure.status === 401 || failure.status === 403)) {
    return { valid: false, error: "Invalid API key" };
  }

  if (failure.reason === "http_error" && failure.status === 429) {
    return {
      valid: true,
      error: null,
      method: "typesafe_systemone",
      warning: "Rate limited, but credentials appear valid",
    };
  }

  if (failure.reason === "timeout" || failure.reason === "network_error") {
    return {
      valid: false,
      error: `TypeSafe unreachable (${failure.reason})`,
    };
  }

  return {
    valid: false,
    error: failure.detail || `TypeSafe validation failed (${failure.reason})`,
  };
}
