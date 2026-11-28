import type { RegistryEntry } from "../../shared.ts";

export const longcatProvider: RegistryEntry = {
  id: "longcat",
  alias: "lc",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.longcat.chat/openai/v1/chat/completions",
  authType: "apikey",
  authHeader: "Authorization",
  authPrefix: "Bearer",
  // https://longcat.chat/platform/docs/change-log (2026-11-27): API usage is billed.
  models: [
    {
      id: "LongCat-2.0",
      name: "LongCat 2.0",
      contextLength: 1048576,
    },
  ],
};
