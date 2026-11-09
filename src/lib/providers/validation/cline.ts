import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeOpenAIChatUrl } from "@omniroute/open-sse/executors/default/urlNormalizers.ts";
import { normalizeBaseUrl } from "./urlHelpers.ts";
import { validateDirectChatProvider } from "./directChatProbe.ts";
import { buildClinepassHeaders } from "@/shared/utils/clineAuth.ts";
import {
  resolveClineValidationModel,
  resolveClinepassValidationModel,
} from "@/lib/providers/clineKilocodeValidationModel";

/**
 * Resolve the Cline chat endpoint for a configured base URL.
 *
 * The probe must hit EXACTLY the route the executor would hit, otherwise a valid key
 * can be reported as invalid (the probe and the real request disagree on the URL).
 * `DefaultExecutor.buildUrl()` resolves an OpenAI-format provider's custom base URL
 * through `normalizeOpenAIChatUrl()`, so the validator delegates to the same helper
 * instead of re-implementing the path shape. The previous local version appended
 * `/api/v1/chat/completions` to an already-normalized `/api/v1` base, producing
 * `/api/api/v1/chat/completions` — a route Cline does not serve (#16298).
 */
export function resolveClineChatUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  return normalizeOpenAIChatUrl(normalized);
}

export interface ValidateClineProviderOptions {
  apiKey?: string;
  providerSpecificData?: Record<string, unknown> | null;
  isLocal?: boolean;
  provider?: string;
}

export async function validateClineProvider({
  apiKey,
  providerSpecificData = {},
  isLocal = false,
  provider = "cline",
}: ValidateClineProviderOptions = {}) {
  // providerSpecificData.baseUrl is `unknown` (persisted JSON) — narrow it before
  // handing it to normalizeBaseUrl(string). A malformed stored value (object, number)
  // must fall back to the registry base URL, not crash the probe (#2463 class).
  const configuredBaseUrl =
    normalizeBaseUrl(
      typeof providerSpecificData.baseUrl === "string" ? providerSpecificData.baseUrl : ""
    ) ||
    getRegistryEntry(provider)?.baseUrl ||
    "https://api.cline.bot/api/v1/chat/completions";

  const headers = buildClinepassHeaders({ apiKey }, undefined, { clientType: "omniroute" });
  headers["Content-Type"] = "application/json";

  // The probe model must be one every account can serve. Selecting the registry's
  // FIRST model picked Cline's paid `z-ai/glm-5.2`, which answers 402 for an account
  // without credit — the probe maps 402 to "Validation failed: 402" and reported a
  // valid key as invalid. ClinePass lives in its own `cline-pass/*` namespace, so it
  // keeps a model from that namespace. See src/lib/providers/clineKilocodeValidationModel.ts.
  const model =
    provider === "clinepass"
      ? resolveClinepassValidationModel(providerSpecificData)
      : resolveClineValidationModel(providerSpecificData);

  return validateDirectChatProvider({
    url: resolveClineChatUrl(configuredBaseUrl),
    headers,
    body: {
      model,
      messages: [{ role: "user", content: "ping" }],
      // Cline requires stream mode, else it returns "generateText is not implemented".
      stream: true,
    },
    providerSpecificData,
    isLocal,
  });
}
