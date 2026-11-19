import type { RegistryEntry } from "../../shared.ts";

export const chatgptProvider: RegistryEntry = {
  id: "chatgpt",
  alias: "chatgpt",
  format: "openai-responses",
  executor: "chatgpt",
  forceStream: true,
  baseUrl: "https://api.openai.com/v1/responses",
  modelsUrl: "https://api.openai.com/v1/models",
  authType: "oauth",
  authHeader: "bearer",
  reasoningTransport: "opaque",
  passthroughModels: true,
  // No speculative entitlement list: models are discovered for each registration.
  models: [],
};
