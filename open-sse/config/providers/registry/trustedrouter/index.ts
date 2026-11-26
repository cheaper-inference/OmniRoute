import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * TrustedRouter (https://trustedrouter.com): privacy-first OpenAI-compatible AI
 * gateway running inside hardware-attested Confidential Space TEEs with Bearer
 * API keys from https://trustedrouter.com/console/api-keys.
 *
 * Serves `/v1/chat/completions`, `/v1/responses`, `/v1/embeddings`, and a public
 * `GET /v1/models` catalog (~600+ rows across chat, responses, embeddings, rerank,
 * video, and decision models). Because `GET /v1/models` is public (200 with any or
 * no key), key validation uses the authenticated `GET /v1/key` endpoint instead
 * (200 = valid, 401 = invalid). Live dashboard discovery goes through
 * `PROVIDER_MODELS_CONFIG.trustedrouter`, which filters to visible chat models and
 * carries context windows, max output tokens, vision, tool-calling, and reasoning
 * metadata.
 *
 * The seed below is the offline fallback (verified live against `/v1/models` on
 * 2026-11-26). Vendor-prefixed ids require the `trustedrouter/` provider prefix so
 * they never shadow direct vendor providers.
 */
export const trustedrouterProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "trustedrouter",
  alias: "trustedrouter",
  baseUrl: "https://api.trustedrouter.com/v1/chat/completions",
  responsesBaseUrl: "https://api.trustedrouter.com/v1/responses",
  testKeyModelsUrl: "https://api.trustedrouter.com/v1/key",
  defaultContextLength: 128000,
  passthroughModels: true,
  models: [
    {
      id: "trustedrouter/auto",
      name: "TrustedRouter Auto",
      aliases: ["nyte/auto"],
      contextLength: 1048576,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "trustedrouter/zdr",
      name: "TrustedRouter ZDR",
      aliases: ["nyte/zdr"],
      contextLength: 1048576,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "trustedrouter/e2e",
      name: "TrustedRouter E2E",
      aliases: ["nyte/e2e"],
      contextLength: 1048576,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "trustedrouter/trusted",
      name: "TrustedRouter Trusted",
      aliases: ["nyte/trusted"],
      contextLength: 1048576,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "trustedrouter/confidential",
      name: "TrustedRouter Confidential",
      aliases: ["nyte/confidential"],
      contextLength: 1048576,
      toolCalling: true,
      supportsVision: true,
    },
    {
      id: "trustedrouter/free",
      name: "TrustedRouter Free",
      aliases: ["nyte/free"],
      contextLength: 128000,
    },
    {
      id: "deepseek/deepseek-v4-flash",
      name: "DeepSeek V4 Flash",
      requiresProviderPrefix: true,
      contextLength: 1048576,
      maxOutputTokens: 393216,
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "deepseek/deepseek-v4.1-flash-1017",
      name: "DeepSeek V4.1 Flash 1017",
      requiresProviderPrefix: true,
      contextLength: 1048576,
      maxOutputTokens: 393216,
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "anthropic/claude-sonnet-4.6",
      name: "Claude Sonnet 4.6",
      requiresProviderPrefix: true,
      contextLength: 1000000,
      maxOutputTokens: 128000,
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "anthropic/claude-opus-4.6",
      name: "Claude Opus 4.6",
      requiresProviderPrefix: true,
      contextLength: 1000000,
      maxOutputTokens: 128000,
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "openai/gpt-5.4",
      name: "GPT-5.4",
      requiresProviderPrefix: true,
      contextLength: 1050000,
      maxOutputTokens: 128000,
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
    {
      id: "google/gemini-2.5-flash",
      name: "Gemini 2.5 Flash",
      requiresProviderPrefix: true,
      contextLength: 1048576,
      maxOutputTokens: 65536,
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
    },
  ],
});
