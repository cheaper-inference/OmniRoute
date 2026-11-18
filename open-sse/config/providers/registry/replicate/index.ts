import type { RegistryEntry } from "../../shared.ts";

export const replicateProvider: RegistryEntry = {
  id: "replicate",
  alias: "replicate",
  format: "openai",
  executor: "replicate",
  baseUrl: "https://api.replicate.com/v1",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    { id: "meta/meta-llama-3-70b-instruct", name: "Llama 3 70B Instruct" },
    { id: "mistralai/mistral-7b-instruct-v0.2", name: "Mistral 7B Instruct v0.2" },
  ],
};
