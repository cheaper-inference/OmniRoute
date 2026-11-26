/**
 * EVREN (SSYZ) API-key catalog entry. Kept out of gateways.ts so that frozen file
 * does not grow past its line ceiling.
 */
export const evrenGateway = {
  evren: {
    id: "evren",
    serviceKinds: ["llm"],
    alias: "evren",
    name: "EVREN",
    icon: "bolt",
    color: "#7C3AED",
    textIcon: "EVR",
    passthroughModels: true,
    website: "https://evren.ssyz.org.tr/llm/models",
    apiHint:
      "Create a key (evren_llm_...) at https://evren.ssyz.org.tr/api-keys and accept the usage terms once (POST /v1/terms/accept) or requests fail with 403 terms_not_accepted. OpenAI-compatible base URL: https://evren-llmapi.ssyz.org.tr/v1.",
  },
} as const;
