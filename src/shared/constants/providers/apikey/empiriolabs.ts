/**
 * EmpirioLabs AI (https://empiriolabs.ai): OpenAI-compatible Chat Completions API.
 * Kept in its own file, like the beatapi extract, so the family files do not grow.
 */
export const APIKEY_PROVIDERS_EMPIRIOLABS = {
  empiriolabs: {
    id: "empiriolabs",
    serviceKinds: ["llm"],
    alias: "empiriolabs",
    name: "EmpirioLabs AI",
    icon: "cloud",
    color: "#0A7CFF",
    textIcon: "EL",
    passthroughModels: true,
    website: "https://empiriolabs.ai",
    // Prepaid balance with per-model pricing; no recurring free tier, so no Free badge.
    hasFree: false,
    authHint:
      "Create an API key at https://platform.empiriolabs.ai/dashboard/api-keys, then paste it here.",
    apiHint:
      "OpenAI-compatible base URL: https://api.empiriolabs.ai/v1. Prepaid balance with per-model pricing listed at https://docs.empiriolabs.ai/models-pricing. Chat models only through this entry.",
  },
};
