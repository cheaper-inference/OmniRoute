import type { RegistryEntry } from "../../shared.ts";

// BytePlus ModelArk (Ark) — OpenAI-compatible, ap-southeast-1 region, Bearer auth.
// Re-added after the registry modularization (#3993) dropped it; restores #3877.
export const byteplusProvider: RegistryEntry = {
  id: "byteplus",
  alias: "bpm",
  format: "openai",
  executor: "default",
  baseUrl: "https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions",
  modelsUrl: "https://ark.ap-southeast.bytepluses.com/api/v3/models",
  authType: "apikey",
  authHeader: "bearer",
  defaultContextLength: 128000,
  models: [
    { id: "seed-2.0", name: "Seed 2.0" },
    { id: "kimi-k2-thinking", name: "Kimi K2 Thinking", supportsReasoning: true },
    { id: "glm-4.7", name: "GLM 4.7" },
    { id: "gpt-oss-120b", name: "GPT-OSS-120B" },
    // Chat model IDs from the public ModelArk list (2026-11-27).
    { id: "dola-seed-2-1-turbo-260628", name: "Dola Seed 2.1 Turbo", supportsReasoning: true },
    { id: "seed-2-0-lite-260428", name: "Seed 2.0 Lite", supportsReasoning: true },
    { id: "seed-2-0-mini-260428", name: "Seed 2.0 Mini", supportsReasoning: true },
    { id: "seed-2-0-code-preview-260328", name: "Seed 2.0 Code Preview", supportsReasoning: true },
    { id: "seed-2-0-pro-260328", name: "Seed 2.0 Pro", supportsReasoning: true },
    {
      id: "deepseek-v4-1-flash-economy-261017",
      name: "DeepSeek V4.1 Flash Economy",
      supportsReasoning: true,
    },
    { id: "deepseek-v4-1-flash-261017", name: "DeepSeek V4.1 Flash", supportsReasoning: true },
    {
      id: "deepseek-v4-1-flash-260910",
      name: "DeepSeek V4.1 Flash (260910)",
      supportsReasoning: true,
    },
    { id: "deepseek-v4-pro-ga-260813", name: "DeepSeek V4 Pro GA", supportsReasoning: true },
    { id: "deepseek-v4-flash-ga-260731", name: "DeepSeek V4 Flash GA", supportsReasoning: true },
    { id: "deepseek-v4-flash-260425", name: "DeepSeek V4 Flash", supportsReasoning: true },
    { id: "deepseek-v4-pro-260425", name: "DeepSeek V4 Pro", supportsReasoning: true },
    { id: "glm-5-3-flash-260828", name: "GLM 5.3 Flash", supportsReasoning: true },
    { id: "glm-5-2-260617", name: "GLM 5.2", supportsReasoning: true },
  ],
};
