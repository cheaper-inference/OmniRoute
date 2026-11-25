import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const teamorouterProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "teamorouter",
  alias: "teamorouter",
  baseUrl: "https://api.teamorouter.com/v1/chat/completions",
  modelsUrl: "https://api.teamorouter.com/v1/models",
  models: [],
  passthroughModels: true,
});
