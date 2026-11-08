/**
 * Inception Labs key check. `inception` is registered as an OpenAI-compatible provider, so the
 * generic probe validates a key by calling `GET /v1/models` and returning `{valid:true}` on the
 * first 2xx. Inception serves that route WITHOUT authentication — a bogus
 * `Authorization: Bearer sk-bogus` gets 200 with the full catalog — so the setup dialog and the
 * connection Test accepted any string, and the first rejection the user saw was a 401 on their
 * first real request.
 *
 * `POST /v1/chat/completions` is the authenticated route (401 for a bad key), so a single
 * 1-token probe there is the correct auth check — the same remedy applied to Zylo (#13828).
 */
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeBaseUrl, resolveV1ChatCompletionsUrl } from "./urlHelpers";
import { buildBearerHeaders } from "./headers";
import { validateDirectChatProvider } from "./directChatProbe";

/** Cheapest generally-available chat model; overridable via `validationModelId`. */
export const INCEPTION_DEFAULT_VALIDATION_MODEL_ID = "mercury-2";

export async function validateInceptionProvider({ apiKey, providerSpecificData = {} }: any) {
  const configuredBaseUrl =
    normalizeBaseUrl(providerSpecificData.baseUrl) ||
    getRegistryEntry("inception")?.baseUrl ||
    "https://api.inceptionlabs.ai/v1/chat/completions";

  return validateDirectChatProvider({
    url: resolveV1ChatCompletionsUrl(configuredBaseUrl),
    headers: buildBearerHeaders(apiKey, providerSpecificData),
    body: {
      model: providerSpecificData.validationModelId || INCEPTION_DEFAULT_VALIDATION_MODEL_ID,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    },
    providerSpecificData,
  });
}
