import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

const API_ROOT = "https://api.atlascloud.ai/v1";

export const atlascloudProvider = buildOpenAiCompatibleRegistryEntry({
  id: "atlascloud",
  alias: "ac",
  baseUrl: `${API_ROOT}/chat/completions`,
  modelsUrl: `${API_ROOT}/models`,
  passthroughModels: true,
  models: [
    { id: "deepseek-ai/deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    { id: "deepseek-ai/deepseek-v4-flash", name: "DeepSeek V4 Flash" },
    { id: "moonshotai/kimi-k3", name: "Kimi K3" },
    { id: "moonshotai/kimi-k2.6", name: "Kimi K2.6" },
    { id: "zai-org/glm-5.2", name: "GLM 5.2" },
    { id: "zai-org/glm-5.1", name: "GLM 5.1" },
    { id: "qwen/qwen3.8-max", name: "Qwen 3.8 Max" },
    { id: "qwen/qwen3.5-397b-a17b", name: "Qwen 3.5 397B A17B" },
    { id: "minimaxai/minimax-m3", name: "MiniMax M3", supportsVision: true },
  ],
});
