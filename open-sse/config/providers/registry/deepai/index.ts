import type { RegistryEntry } from "../../shared.ts";

export const deepaiProvider: RegistryEntry = {
  id: "deepai",
  alias: "deepai",
  format: "custom",
  executor: "default",
  baseUrl: "https://api.deepai.org",
  authType: "apikey",
  authHeader: "api-key",
  models: [
    { id: "text2img", name: "Text to Image" },
  ],
};
