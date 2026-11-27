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
  // #21007: deepseek-r1-distill-qwen-32b, llama-3.2-3b-instruct, qwq-32b and kimi-k2.6 were
  // retired on 2026-11-20 and return 410 (developers.cloudflare.com/changelog/post/
  // 2026-11-05-planned-model-deprecations/).
  // #17881: contextLength values are the Workers AI model pages' "context_window"; without one
  // a combo cannot clamp its advertised window to the smallest member.
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
    { id: "@cf/google/gemma-4-26b-a4b-it", name: "Gemma 4 26B (🆓)", contextLength: 262144 },
    // context_window from developers.cloudflare.com/workers-ai/models/mistral-small-3.1-24b-instruct/
    // (verified 2026-11-23).
    {
      id: "@cf/mistralai/mistral-small-3.1-24b-instruct",
      name: "Mistral Small 3.1 24B (🆓)",
      contextLength: 128000,
    },
  ],
};
