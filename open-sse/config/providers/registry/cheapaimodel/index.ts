import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const cheapaimodelProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "cheapaimodel",
  alias: "cheapaimodel",
  baseUrl: "https://api.cheapaimodel.ai/v1/chat/completions",
  modelsUrl: "https://api.cheapaimodel.ai/v1/models",
  models: [],
  passthroughModels: true,
});
