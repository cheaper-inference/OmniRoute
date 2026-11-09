import type { RegistryEntry } from "../../shared.ts";
import { resolvePublicCred } from "../../shared.ts";
import {
  getGrokBuildClientVersion,
  GROK_BUILD_MODELS_URL,
  GROK_BUILD_TOKEN_URL,
} from "../../../grokBuild.ts";

export const grok_cliProvider: RegistryEntry = {
  id: "grok-cli",
  alias: "gc",
  format: "openai",
  executor: "grok-cli",
  // Keep the generic translate-path contract stable. GrokCliExecutor owns the
  // official Grok Build upstream URL and always dispatches to /v1/responses.
  baseUrl: "https://cli-chat-proxy.grok.com/v1/chat/completions",
  reasoningTransport: "opaque",
  modelsUrl: GROK_BUILD_MODELS_URL,
  clientVersion: getGrokBuildClientVersion(),
  authType: "oauth",
  authHeader: "bearer",
  passthroughModels: true,
  models: [
    {
      id: "grok-4.7",
      name: "Grok 4.7",
      contextLength: 500000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh"],
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["presencePenalty", "frequencyPenalty", "logprobs", "topLogprobs"],
    },
    {
      // Grok 4.7 on the faster lane Grok Build uses. cli-chat-proxy accepts it, so it
      // carries grok-4.7's window and efforts. Vision is left undeclared until probed.
      id: "grok-4.7-build-fast",
      name: "Grok 4.7 Build Fast",
      contextLength: 500000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh"],
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["presencePenalty", "frequencyPenalty", "logprobs", "topLogprobs"],
    },
    {
      id: "grok-4.6",
      name: "Grok 4.6",
      contextLength: 500000,
      supportsReasoning: true,
      // Verified with a Responses `input_image` probe. grok-4.5 misread the same image,
      // so it stays undeclared.
      supportsVision: true,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh"],
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["presencePenalty", "frequencyPenalty", "logprobs", "topLogprobs"],
    },
    {
      id: "grok-4.5",
      name: "Grok 4.5",
      contextLength: 500000,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "medium", "high"],
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["presencePenalty", "frequencyPenalty", "logprobs", "topLogprobs"],
    },
    {
      // Accepted by cli-chat-proxy but not advertised by its /models. No window, effort
      // list or vision flag is declared: none has been confirmed against the live upstream.
      id: "grok-code-fast-1",
      name: "Grok Code Fast 1",
      toolCalling: true,
      targetFormat: "openai-responses",
      unsupportedParams: ["presencePenalty", "frequencyPenalty", "logprobs", "topLogprobs"],
    },
  ],
  oauth: {
    clientIdEnv: "GROK_OAUTH_CLIENT_ID",
    clientIdDefault: resolvePublicCred("grok_id", "GROK_OAUTH_CLIENT_ID"),
    tokenUrl: GROK_BUILD_TOKEN_URL,
  },
};
