import type { RegistryEntry } from "../../shared.ts";
import { CHAT_OPENAI_COMPAT_MODELS } from "../../shared.ts";

export const hetznerProvider: RegistryEntry = {
  id: "hetzner",
  alias: "hetzner",
  format: "openai",
  executor: "default",
  baseUrl: "https://inference.hetzner.com/api/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  models: CHAT_OPENAI_COMPAT_MODELS["hetzner"],
};
