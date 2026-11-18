import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const runcrateProvider: RegistryEntry = {
  id: "runcrate",
  alias: "runcrate",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.runcrate.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["runcrate"],
};
