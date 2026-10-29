/**
 * ParalonCloud (https://paraloncloud.com) — OpenAI-compatible inference on a
 * decentralized GPU network. Kept in its own file, like the beatapi extract, so the
 * family files do not grow.
 */
export const APIKEY_PROVIDERS_PARALONCLOUD = {
  paraloncloud: {
    id: "paraloncloud",
    serviceKinds: ["llm"],
    alias: "paraloncloud",
    name: "ParalonCloud",
    icon: "cloud",
    color: "#22B8A8",
    textIcon: "PC",
    passthroughModels: true,
    website: "https://paraloncloud.com",
    hasFree: false,
    authHint: "Create an API key (prlc_…) in the ParalonCloud console, then paste it here.",
    apiHint:
      "OpenAI-compatible base URL: https://paraloncloud.com/v1. Prepaid credits, priced per token. The catalog follows the GPUs online on the network; check the live model list before selecting one.",
  },
};
