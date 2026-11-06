/**
 * Pareto Inference key check. `pareto` is registered as an OpenAI-compatible provider, so the
 * generic probe would validate a key with `GET /v1/models` and return `{valid:true}` on the
 * first 2xx. Pareto serves that route WITHOUT authentication (200 for `Bearer sk-bogus`,
 * verified 2026-11-06), so it cannot prove a key.
 *
 * `POST /v1/chat/completions` authenticates first: a bad key gets 401. A valid key sending a
 * non-streamed request gets `400 streaming_only`, which the gateway returns before it holds
 * credits, so this probe is never billed and works on an account with a zero balance.
 * `evaluateAuthProbeStatus` treats that 400 as a valid key. Same remedy as Inception / Zylo.
 */
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeBaseUrl, resolveV1ChatCompletionsUrl } from "./urlHelpers";
import { buildBearerHeaders } from "./headers";
import { validateDirectChatProvider } from "./directChatProbe";

/** Default probe model; overridable via `validationModelId`. */
export const PARETO_DEFAULT_VALIDATION_MODEL_ID = "z-ai/glm-5.3-flash";

export async function validateParetoProvider({ apiKey, providerSpecificData = {} }: any) {
  const configuredBaseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) ||
    getRegistryEntry("pareto")?.baseUrl ||
    "https://api.paretoinference.com/v1/chat/completions";

  return validateDirectChatProvider({
    url: resolveV1ChatCompletionsUrl(configuredBaseUrl),
    headers: buildBearerHeaders(apiKey, providerSpecificData),
    body: {
      model: providerSpecificData.validationModelId || PARETO_DEFAULT_VALIDATION_MODEL_ID,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}
