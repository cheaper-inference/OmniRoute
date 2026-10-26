import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeOpenAIChatUrl } from "@omniroute/open-sse/executors/default/urlNormalizers.ts";
import { normalizeBaseUrl } from "./urlHelpers.ts";
import { buildBearerHeaders } from "./headers.ts";
import { validateDirectChatProvider } from "./directChatProbe.ts";
import { resolveKilocodeValidationModel } from "@/lib/providers/clineKilocodeValidationModel";

/**
 * Resolve the Kilo Code chat endpoint for a configured base URL.
 *
 * The probe must hit EXACTLY the route the executor would hit, otherwise a valid key
 * can be reported as invalid (the probe and the real request disagree on the URL).
 * `DefaultExecutor.buildUrl()` resolves an OpenAI-format provider's custom base URL
 * through `normalizeOpenAIChatUrl()`, so the validator delegates to the same helper
 * instead of re-implementing the path shape (#16298).
 */
export function resolveKilocodeChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  return normalizeOpenAIChatUrl(normalized);
}

export interface ValidateKilocodeProviderOptions {
  apiKey?: string;
  providerSpecificData?: Record<string, unknown> | null;
  isLocal?: boolean;
}

export async function validateKilocodeProvider({
  apiKey,
  providerSpecificData = {},
  isLocal = false,
}: ValidateKilocodeProviderOptions = {}) {
  // providerSpecificData.baseUrl is `unknown` (persisted JSON) — narrow it before
  // handing it to normalizeBaseUrl(string). A malformed stored value (object, number)
  // must fall back to the registry base URL, not crash the probe (#2463 class).
  const configuredBaseUrl =
    normalizeBaseUrl(
      typeof providerSpecificData.baseUrl === "string" ? providerSpecificData.baseUrl : ""
    ) ||
    getRegistryEntry("kilocode")?.baseUrl ||
    "https://api.kilo.ai/api/openrouter/chat/completions";

  const headers = buildBearerHeaders(apiKey, providerSpecificData);
  headers["Content-Type"] = "application/json";
  headers["X-KILOCODE-EDITORNAME"] = "OmniRoute";

  // The probe model must be one every account can serve. Selecting the registry's
  // FIRST model happened to be the free router for Kilo, but the rule was catalog
  // ORDER rather than availability — the same rule picked Cline's paid model and
  // reported valid keys as invalid (402). Pin the free router explicitly.
  // See src/lib/providers/clineKilocodeValidationModel.ts.
  const model = resolveKilocodeValidationModel(providerSpecificData);

  return validateDirectChatProvider({
    url: resolveKilocodeChatUrl(configuredBaseUrl),
    headers,
    body: {
      model,
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 1,
    },
    providerSpecificData,
    isLocal,
  });
}
