/**
 * AtmoRouter (https://atmorouter.dev) — OpenAI-compatible pay-per-token aggregator gateway.
 * Extracted from the frozen gateways hub so that file stays at the release-tip ceiling.
 */
export const APIKEY_PROVIDERS_ATMOROUTER = {
  atmorouter: {
    id: "atmorouter",
    serviceKinds: ["llm"],
    alias: "atmorouter",
    name: "AtmoRouter",
    icon: "hub",
    color: "#09090B",
    textIcon: "AR",
    passthroughModels: true,
    website: "https://atmorouter.dev",
    authHint:
      "Create an API key (ar-…) under Dashboard → API Keys at https://atmorouter.dev/dashboard/keys, then paste it here.",
    apiHint:
      "OpenAI-compatible base URL: https://atmorouter.dev/v1. Pay per token from a prepaid balance; the model list is public — check the live model list at https://atmorouter.dev/v1/models before selecting one.",
  },
};
