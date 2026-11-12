import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const obscurifyProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "obscurify",
  alias: "obscurify",
  baseUrl: "https://obscurify.ai/v1/chat/completions",
  modelsUrl: "https://obscurify.ai/v1/models",
  models: [],
  passthroughModels: true,
});
