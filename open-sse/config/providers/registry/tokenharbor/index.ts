import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const tokenharborProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "tokenharbor",
  alias: "tokenharbor",
  baseUrl: "https://tokenharbor.ai/v1/chat/completions",
  modelsUrl: "https://tokenharbor.ai/v1/models",
  models: [],
  passthroughModels: true,
});
