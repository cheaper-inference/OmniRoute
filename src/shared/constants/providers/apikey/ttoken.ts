/**
 * TTOken (https://ttoken.dev): Indonesian pay-per-token AI gateway, OpenAI-compatible `/v1`.
 * Kept in its own file, like the beatapi and empiriolabs extracts, so the family files do not grow.
 */
export const APIKEY_PROVIDERS_TTOKEN = {
  ttoken: {
    id: "ttoken",
    serviceKinds: ["llm"],
    alias: "ttoken",
    name: "TTOken",
    icon: "hub",
    color: "#FFB21A",
    textIcon: "TT",
    passthroughModels: true,
    website: "https://ttoken.dev",
    notice: {
      apiKeyUrl: "https://ttoken.dev/dashboard/keys",
    },
    authHint:
      "Create a key for the Gateway product at https://ttoken.dev/dashboard/keys (it starts with sk-ttoken-v1-), then paste it here. Keys made for other TTOken products are refused.",
    apiHint:
      "OpenAI-compatible base URL: https://api.ttoken.dev/v1. Pay per token from a prepaid balance in Indonesian Rupiah. Model ids keep their vendor prefix (deepseek/deepseek-v4.1-flash); ttoken/auto lets TTOken pick the model.",
  },
};
