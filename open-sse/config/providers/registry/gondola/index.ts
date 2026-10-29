import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const gondolaProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "gondola",
  alias: "gondola",
  baseUrl: "https://api.gondola-ai.com/v1/chat/completions",
  modelsUrl: "https://api.gondola-ai.com/v1/models",
  models: [],
  passthroughModels: true,
});
