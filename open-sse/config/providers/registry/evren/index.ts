import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

export const evrenProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "evren",
  alias: "evren",
  baseUrl: "https://evren-llmapi.ssyz.org.tr/v1/chat/completions",
  modelsUrl: "https://evren-llmapi.ssyz.org.tr/v1/models",
  // Vision verdicts were exercised live with an image_url chat request; the rest
  // of the catalog is discovered from /v1/models via passthroughModels.
  models: [
    { id: "qwen3-vl-30b", name: "Qwen3 VL 30B", supportsVision: true },
    { id: "gemma-4-31b", name: "Gemma 4 31B", supportsVision: true },
    { id: "qwen3.8-flash-next", name: "Qwen3.8 Flash Next", supportsVision: true },
    { id: "deepseek-v4.1-flash", name: "DeepSeek V4.1 Flash", supportsVision: true },
    // Upstream rejects image_url for this model (text-only "Wave 1").
    { id: "glm-5.3", name: "GLM 5.3", supportsVision: false },
  ],
  passthroughModels: true,
});
