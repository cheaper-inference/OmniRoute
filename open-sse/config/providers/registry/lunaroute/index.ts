import type { RegistryEntry, RegistryModel } from "../../shared.ts";
import { getAnthropicCompatHeaders } from "../../shared.ts";

// Authenticated LunaRoute dashboard catalog observed 2026-11-10. Keep the
// live /v1/models discovery enabled below: the static rows carry capabilities
// and limits while passthrough admits newly activated models.
export const LUNAROUTE_CHAT_MODELS: RegistryModel[] = [
  {
    id: "deepseek-4.1-flash",
    name: "DeepSeek 4.1 Flash",
    contextLength: 1_048_576,
    maxInputTokens: 1_048_576,
    maxOutputTokens: 262_144,
    toolCalling: true,
    supportsReasoning: true,
    supportsVision: true,
  },
  {
    id: "deepseek-4.1-flash-background",
    name: "DeepSeek 4.1 Flash (Background)",
    contextLength: 1_048_576,
    maxInputTokens: 1_048_576,
    maxOutputTokens: 262_144,
    toolCalling: true,
    supportsReasoning: true,
    supportsVision: true,
  },
  {
    id: "glm-5.3-flash",
    name: "GLM 5.3 Flash",
    contextLength: 524_288,
    maxInputTokens: 524_288,
    maxOutputTokens: 163_840,
    toolCalling: true,
    supportsReasoning: true,
    supportsVision: true,
  },
  {
    id: "glm-5.3-flash-background",
    name: "GLM 5.3 Flash (Background)",
    contextLength: 524_288,
    maxInputTokens: 524_288,
    maxOutputTokens: 163_840,
    toolCalling: true,
    supportsReasoning: true,
    supportsVision: true,
  },
  {
    id: "muse-spark-open",
    name: "Muse Spark Open",
    contextLength: 524_288,
    maxInputTokens: 524_288,
    maxOutputTokens: 131_072,
    toolCalling: true,
    supportsReasoning: true,
    supportsVision: true,
  },
  {
    id: "muse-spark-open-background",
    name: "Muse Spark Open (Background)",
    contextLength: 524_288,
    maxInputTokens: 524_288,
    maxOutputTokens: 131_072,
    toolCalling: true,
    supportsReasoning: true,
    supportsVision: true,
  },
];

export const lunarouteProvider: RegistryEntry = {
  id: "lunaroute",
  alias: "lr",
  format: "openai",
  executor: "default",
  baseUrl: "https://gw.lunaroute.com/v1/chat/completions",
  modelsUrl: "https://gw.lunaroute.com/v1/models",
  responsesBaseUrl: "https://gw.lunaroute.com/v1/responses",
  authType: "apikey",
  authHeader: "bearer",
  models: LUNAROUTE_CHAT_MODELS,
  passthroughModels: true,
  alternateFormats: [
    {
      format: "claude",
      baseUrl: "https://gw.lunaroute.com/v1/messages",
      authHeader: "x-api-key",
      headers: getAnthropicCompatHeaders(),
      label: "Anthropic-compatible",
    },
  ],
};
