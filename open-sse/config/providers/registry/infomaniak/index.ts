import type { RegistryEntry } from "../../shared.ts";

// Infomaniak AI Tools: every account gets its own product id in the endpoint path
// (https://api.infomaniak.com/2/ai/<product_id>/openai/v1), so connections must set
// providerSpecificData.baseUrl; the validator rejects a connection without it. The
// live catalog comes from <baseUrl>/models, these entries are the offline seed.
export const infomaniakProvider: RegistryEntry = {
  id: "infomaniak",
  alias: "imk",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.infomaniak.com/2/ai/<product_id>/openai/v1/chat/completions",
  authType: "apikey",
  authHeader: "Authorization",
  authPrefix: "Bearer",
  models: [
    { id: "Qwen/Qwen3.5-397B-A17B-FP8", name: "Qwen3.5 397B A17B" },
    { id: "google/gemma-4-31B-it", name: "Gemma 4 31B" },
  ],
};
