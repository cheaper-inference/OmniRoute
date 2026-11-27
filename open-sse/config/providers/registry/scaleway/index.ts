import type { RegistryEntry } from "../../shared.ts";

export const scalewayProvider: RegistryEntry = {
  id: "scaleway",
  alias: "scw",
  format: "openai",
  executor: "default",
  baseUrl: "https://api.scaleway.ai/v1/chat/completions",
  authType: "apikey",
  authHeader: "bearer",
  // 1M tokens free for new accounts — EU/GDPR (Paris), no credit card needed under limit
  models: [
    { id: "qwen3-235b-a22b-instruct-2507", name: "Qwen3 235B A22B" },
    { id: "llama-3.1-70b-instruct", name: "Llama 3.1 70B" },
    { id: "llama-3.1-8b-instruct", name: "Llama 3.1 8B" },
    { id: "mistral-small-3.2-24b-instruct-2506", name: "Mistral Small 3.2" },
    { id: "deepseek-v3-0324", name: "DeepSeek V3" },
    { id: "gpt-oss-120b", name: "GPT-OSS 120B" },
  ],
};
