import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const teapotrouterProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "teapotrouter",
  alias: "teapotrouter",
  baseUrl: "https://api.teapotrouter.com/v1/chat/completions",
  modelsUrl: "https://api.teapotrouter.com/v1/models",
  models: [],
  passthroughModels: true,
});
