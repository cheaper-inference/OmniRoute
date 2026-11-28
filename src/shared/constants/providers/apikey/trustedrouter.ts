/**
 * TrustedRouter (https://trustedrouter.com): privacy-first OpenAI-compatible AI
 * gateway running in hardware-attested Confidential Space TEEs.
 * Kept in its own file, like beatapi and empiriolabs, so the frozen gateways hub
 * stays at its release-tip ceiling.
 */
export const APIKEY_PROVIDERS_TRUSTEDROUTER = {
  trustedrouter: {
    id: "trustedrouter",
    serviceKinds: ["llm", "embedding"],
    alias: "trustedrouter",
    name: "TrustedRouter",
    icon: "router",
    color: "#0F172A",
    textIcon: "TR",
    passthroughModels: true,
    website: "https://trustedrouter.com",
    hasFree: true,
    freeNote: "Free routing tier available via trustedrouter/free",
    authHint:
      "Create an API key at https://trustedrouter.com/console/api-keys, then paste it here as a Bearer token.",
    apiHint:
      "OpenAI-compatible base URL: https://api.trustedrouter.com/v1 (chat completions, responses, embeddings, and live /v1/models discovery across 500+ models plus trustedrouter/* privacy presets).",
  },
};
