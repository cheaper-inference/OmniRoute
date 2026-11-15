/**
 * Obscurify.ai API-key catalog entry. Kept out of gateways.ts so that frozen file
 * does not grow past its line ceiling.
 */
export const obscurifyGateway = {
  obscurify: {
    id: "obscurify",
    serviceKinds: ["llm"],
    alias: "obscurify",
    name: "Obscurify.ai",
    icon: "visibility_off",
    color: "#7C3AED",
    textIcon: "OBS",
    passthroughModels: true,
    website: "https://obscurify.ai",
    // Privacy-focused: accounts are a random account number with no email. Models tagged
    // Zero retention in /v1/models are zero-data-retention; other models may not be.
    apiHint:
      "Create an account on obscurify.ai (a random account number, no email), click Show API Key on the account page, then use https://obscurify.ai/v1 as the OpenAI-compatible base URL. The API works on any plan with a positive balance; model IDs look like deepseek/deepseek-v4-flash.",
  },
} as const;
