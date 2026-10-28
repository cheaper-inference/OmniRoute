import type { RegistryEntry } from "../../shared.ts";

export const mistralProvider: RegistryEntry = {
  id: "mistral",
  alias: "mistral",
  // Mistral serves the OpenAI Responses format natively (public preview, stateless:
  // https://docs.mistral.ai/studio/conversations/responses). Responses clients pass
  // through; Chat Completions clients are translated by chatCore.
  format: "openai-responses",
  executor: "default",
  baseUrl: "https://api.mistral.ai/v1/responses",
  // Key validation and model discovery cannot be derived from a /responses URL.
  modelsUrl: "https://api.mistral.ai/v1/models",
  testKeyModelsUrl: "https://api.mistral.ai/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "mistral-large-latest", name: "Mistral Large 3" },
    { id: "mistral-medium-3-5", name: "Mistral Medium 3.5" },
    { id: "mistral-small-latest", name: "Mistral Small 4" },
    { id: "devstral-latest", name: "Devstral 2" },
    { id: "codestral-latest", name: "Codestral" },
  ],
};
