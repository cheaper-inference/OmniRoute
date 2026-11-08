import type { RegistryEntry } from "../../shared.ts";

export const mistralProvider: RegistryEntry = {
  id: "mistral",
  alias: "mistral",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.mistral.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 262144,
  models: [
    {
      id: "mistral-large-latest",
      name: "Mistral Large 3",
      contextLength: 262144,
      supportsVision: true,
      toolCalling: true,
    },
    {
      id: "mistral-large-4",
      name: "Mistral Large 4",
      contextLength: 1048576,
      supportsVision: true,
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "mistral-medium-3-5",
      name: "Mistral Medium 3.5",
      contextLength: 262144,
      supportsVision: true,
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "mistral-small-latest",
      name: "Mistral Small 4",
      contextLength: 262144,
      supportsVision: true,
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "codestral-latest",
      name: "Codestral",
      contextLength: 131072,
      toolCalling: true,
    },
    // No static vision flag on these rows: it would beat a synced row's verdict for the id.
    {
      id: "ministral-14b-latest",
      name: "Ministral 3 14B",
      contextLength: 262144,
      toolCalling: true,
    },
    {
      id: "ministral-8b-latest",
      name: "Ministral 3 8B",
      contextLength: 262144,
      toolCalling: true,
    },
    {
      id: "ministral-3b-latest",
      name: "Ministral 3 3B",
      contextLength: 262144,
      toolCalling: true,
    },
    {
      id: "voxtral-small-latest",
      name: "Voxtral Small",
      contextLength: 32768,
      toolCalling: true,
      supportsAudio: true,
    },
  ],
};
