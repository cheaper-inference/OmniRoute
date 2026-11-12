import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const grokifiedProvider: RegistryEntry = {
  id: "grokified",
  alias: "grokified",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.grokified.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["grokified"],
};
