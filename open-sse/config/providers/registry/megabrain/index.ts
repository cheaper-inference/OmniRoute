import type { RegistryEntry } from "../../shared.ts";

export const megabrainProvider: RegistryEntry = {
  id: "megabrain",
  alias: "mb",
  // #DUAL-AUTH: OAuth-primary (device code, the same flow as kilocode's: MegaBrain's
  // gateway is built on Kilo's) and also a direct `mb-v1-…` API key. Both use the
  // same authPrefix and baseUrl.
  format: "openai",
  executor: "default",
  baseUrl: "https://api.getmegabrain.com/api/openrouter/chat/completions",
  modelsUrl: "https://api.getmegabrain.com/api/openrouter/models",
  authType: "oauth",
  authHeader: "Authorization",
  authPrefix: "Bearer ",
  // `X-KILOCODE-FEATURE: omniroute` puts a signed-in account's requests on its MegaBrain
  // plan (session and weekly limits); without it the gateway bills them as raw API use
  // from the credit balance.
  headers: {
    "X-KILOCODE-EDITORNAME": "OmniRoute",
    "X-KILOCODE-FEATURE": "omniroute",
  },
  oauth: {
    initiateUrl: "https://api.getmegabrain.com/api/device-auth/codes",
    pollUrlBase: "https://api.getmegabrain.com/api/device-auth/codes",
  },
  models: [
    { id: "mb-auto/free", name: "MegaBrain Auto Free" },
    { id: "z-ai/glm-5.3", name: "GLM 5.3" },
    { id: "z-ai/glm-5.3-prime", name: "GLM 5.3 Prime" },
    { id: "moonshotai/kimi-k3", name: "Kimi K3" },
    { id: "moonshotai/kimi-k3.1-pro", name: "Kimi K3.1 Pro" },
    { id: "moonshotai/kimi-k2.7-code", name: "Kimi K2.7 Code" },
    { id: "minimax/minimax-m3", name: "MiniMax M3" },
    { id: "x-ai/grok-4.7", name: "Grok 4.7" },
    { id: "x-ai/grok-build-0.1", name: "Grok Build 0.1" },
    { id: "deepseek/deepseek-v4-pro", name: "DeepSeek V4 Pro" },
    { id: "qwen/qwen3.8-flash", name: "Qwen3.8 Flash" },
    { id: "anthropic/claude-opus-5.5", name: "Claude Opus 5.5" },
    { id: "anthropic/claude-sonnet-5.5", name: "Claude Sonnet 5.5" },
    { id: "openai/gpt-6-sol", name: "GPT-6 Sol" },
    { id: "google/gemini-3.7-flash", name: "Gemini 3.7 Flash" },
  ],
  passthroughModels: true,
};
