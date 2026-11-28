import type { RegistryEntry } from "../../shared.ts";
import { kiroProvider } from "../kiro/index.ts";

export const kiroCliProvider: RegistryEntry = {
  id: "kiro-cli",
  alias: "kiro-cli",
  format: "openai",
  executor: "kiro-cli",
  baseUrl: "kiro-cli://local/acp",
  authType: "none",
  authHeader: "none",
  defaultContextLength: kiroProvider.defaultContextLength,
  models: kiroProvider.models.map((model) => ({
    id: model.id,
    name: model.name,
    toolCalling: false,
    supportsVision: false,
    supportsReasoning: false,
  })),
};
