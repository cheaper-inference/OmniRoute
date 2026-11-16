import type { RegistryEntry } from "../../shared.ts";

export const cloudflare_aiProvider: RegistryEntry = {
  id: "cloudflare-ai",
  alias: "cf",
  format: "openai",
  executor: "cloudflare-ai",
  // URL is dynamic: uses accountId from credentials. The executor builds it.
  baseUrl: "https://api.cloudflare.com/client/v4/accounts",
  authType: "apikey",
  authHeader: "bearer",
  // 10K Neurons/day free: ~150 LLM responses or 500s Whisper audio — global edge.
  // #8717: omit dead ids (llama-3.3-70b-instruct, llama-3.1-8b-instruct,
  // gemma-3-12b-it, qwen2.5-coder-15b-instruct) — Workers AI returns 400/403/410.
  // #17881: contextLength values are the Workers AI model pages' "context_window"; without one
  // a combo cannot clamp its advertised window to the smallest member.
  // Sweep 2026-11-16 (live /ai/models/search, `require_workers_paid` property): drop the ids
  // with planned_deprecation_date 2026-11-20 (deepseek-r1-distill-qwen-32b,
  // llama-3.2-3b-instruct, qwq-32b) and kimi-k2.6, which also requires Workers Paid
  // (403 code 5035 on the Free plan) — every 🆓 entry below must run on the Free plan.
  models: [
    {
      id: "@cf/mistral/mistral-7b-instruct-v0.2-lora",
      name: "Mistral 7B (🆓)",
      contextLength: 15000,
    },
    {
      id: "@cf/qwen/qwen2.5-coder-32b-instruct",
      name: "Qwen 2.5 Coder 32B (🆓)",
      contextLength: 32768,
    },
    {
      id: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      name: "Llama 3.3 70B (FP8 Fast 🆓 ~150 resp/day)",
      contextLength: 24000,
    },
    {
      id: "@cf/zai-org/glm-4.7-flash",
      name: "GLM 4.7 Flash (🆓)",
      contextLength: 131072,
    },
    { id: "@cf/google/gemma-4-26b-a4b-it", name: "Gemma 4 26B (🆓)", contextLength: 256000 },
    { id: "@cf/openai/gpt-oss-120b", name: "GPT-OSS 120B (🆓)", contextLength: 128000 },
    { id: "@cf/openai/gpt-oss-20b", name: "GPT-OSS 20B (🆓)", contextLength: 128000 },
    { id: "@cf/qwen/qwen3.8-27b", name: "Qwen 3.8 27B (🆓)", contextLength: 262144 },
    {
      id: "@cf/meta/llama-4-scout-17b-16e-instruct",
      name: "Llama 4 Scout 17B (🆓)",
      contextLength: 131000,
    },
    {
      id: "@cf/mistralai/mistral-small-3.1-24b-instruct",
      name: "Mistral Small 3.1 24B (🆓)",
      contextLength: 128000,
    },
  ],
};
