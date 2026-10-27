import type { RegistryEntry } from "../../shared.ts";

// reasoning_effort enums probed from the upstream's 400 messages: the OpenAI enum plus "max".
// deepseek-v4-pro rejects "none"/"minimal", so the declared clamp raises both to "low".
// Models without a probed enum stay undeclared and fall back to the learned clamp.
const TOKEN_PLAN_EFFORTS = ["none", "minimal", "low", "medium", "high", "xhigh", "max"];

export const qwen_cloud_token_planProvider: RegistryEntry = {
  id: "qwen-cloud-token-plan",
  alias: "qct",
  format: "openai",
  executor: "default",
  baseUrl:
    "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/chat/completions",
  modelsUrl: "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/models",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "qwen3.8-max",
      name: "Qwen3.8 Max",
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 131_072,
      supportedThinkingEfforts: TOKEN_PLAN_EFFORTS,
    },
    {
      id: "qwen3.7-max",
      name: "Qwen3.7 Max",
      supportsReasoning: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 131_072,
    },
    {
      id: "qwen3.7-plus",
      name: "Qwen3.7 Plus",
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 131_072,
    },
    {
      // https://help.aliyun.com/en/model-studio/qwen3-8-flash (#14232)
      id: "qwen3.8-flash",
      name: "Qwen3.8 Flash",
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 131_072,
      supportedThinkingEfforts: TOKEN_PLAN_EFFORTS,
    },
    {
      id: "qwen3.6-flash",
      name: "Qwen3.6 Flash",
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 65_536,
    },
    {
      id: "glm-5.2",
      name: "GLM 5.2",
      supportsReasoning: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 131_072,
      supportedThinkingEfforts: TOKEN_PLAN_EFFORTS,
    },
    {
      id: "deepseek-v4-pro",
      name: "DeepSeek V4 Pro",
      supportsReasoning: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 393_216,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max"],
    },
    {
      // https://help.aliyun.com/en/model-studio/deepseek-v4-1-flash (#14232)
      id: "deepseek-v4.1-flash",
      name: "DeepSeek V4.1 Flash",
      supportsReasoning: true,
      supportsVision: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 393_216,
    },
    {
      id: "deepseek-v4-flash-0731",
      name: "DeepSeek V4 Flash",
      supportsReasoning: true,
      toolCalling: true,
      contextLength: 1_000_000,
      maxOutputTokens: 393_216,
      supportedThinkingEfforts: TOKEN_PLAN_EFFORTS,
    },
  ],
};
