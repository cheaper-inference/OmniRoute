import type { RegistryEntry } from "../../shared.ts";

export const nous_researchProvider: RegistryEntry = {
  id: "nous-research",
  alias: "nous",
  format: "openai",
  executor: "default",
  baseUrl: "https://inference-api.nousresearch.com/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // Nous publishes its whole catalog on /v1/models (397 ids at 2026-11-28, including
  // deepseek/deepseek-v4.1-flash-1017), but the static list below is all the flat
  // /v1/models route and combo routing can see without this flag. It also multiplexes
  // vendors behind one connection, so a single retired model must not cool down the
  // whole connection (same reason as nvidia/aihorde/alibaba).
  passthroughModels: true,
  models: [
    { id: "Hermes-4-405B", name: "Hermes 4 405B (Nous Research)" },
    { id: "Hermes-4-70B", name: "Hermes 4 70B (Nous Research)" },
    { id: "deepseek/deepseek-v4.1-flash-1017", name: "DeepSeek V4.1 Flash 1017" },
  ],
};
