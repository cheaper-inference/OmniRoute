import type { RegistryEntry } from "../../shared.ts";
import { CONOL_FALLBACK_MODELS } from "../../../../services/conolModels.ts";

export const conol_webProvider: RegistryEntry = {
  id: "conol-web",
  alias: "cnl",
  format: "openai",
  executor: "conol-web",
  baseUrl: "https://conol.ai/api/sessions",
  authType: "apikey",
  authHeader: "cookie",
  passthroughModels: true,
  models: CONOL_FALLBACK_MODELS,
};
