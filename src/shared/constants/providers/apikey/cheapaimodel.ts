/**
 * cheapaimodel API-key catalog entry. Kept out of gateways.ts so that frozen file
 * does not grow past its ceiling, the same wiring as ainetcafe (#13862).
 */
export const cheapaimodelGateway = {
  cheapaimodel: {
    id: "cheapaimodel",
    serviceKinds: ["llm"],
    alias: "cheapaimodel",
    name: "cheapaimodel",
    icon: "hub",
    color: "#FB6B12",
    textIcon: "CAM",
    passthroughModels: true,
    website: "https://cheapaimodel.ai",
    // Prepaid USD balance billed per token (minimum top-up $5, no subscription).
    // There is no free tier, so no Free badge.
    hasFree: false,
    // Only Chat Completions is wired here; the gateway has no embeddings, image,
    // audio or Responses endpoint.
    apiHint:
      "Create an API key at https://console.cheapaimodel.ai/keys, then use https://api.cheapaimodel.ai/v1 as the OpenAI-compatible base URL. Open-weight models (DeepSeek, GLM, Kimi) plus Grok, prepaid in USD and billed per token. Chat Completions only; the model list comes from /v1/models, which needs the key.",
  },
} as const;
