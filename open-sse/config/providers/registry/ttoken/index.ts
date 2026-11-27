import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * TTOken (https://ttoken.dev) — Indonesian pay-per-token AI gateway billed in Rupiah,
 * OpenAI-compatible `/v1`.
 *
 * Keys look like `sk-ttoken-v1-*` and are made per product at https://ttoken.dev/dashboard/keys;
 * only a key made for the Gateway product can call these endpoints, other product keys get 403.
 * `GET https://api.ttoken.dev/v1/models` is key-scoped (401 without a key, and it lists only the
 * models that key may run), so `modelsUrl` drives key validation and dashboard discovery and
 * `passthroughModels` keeps every other id the key allows usable.
 *
 * One lane only: TTOken also serves `/v1/messages` and `/v1/responses`, but those are translated
 * to Chat Completions server-side and reject image blocks, so OmniRoute's own translation onto
 * the chat lane keeps every client format, vision included, on the verified path.
 *
 * Model ids carry their vendor prefix, so a full OmniRoute id is
 * `ttoken/deepseek/deepseek-v4.1-flash`; `ttoken/auto` lets TTOken pick the model. The seed is
 * the generally available chat models of the public catalogue
 * (`GET https://api.ttoken.dev/api/v1/models`, checked 2026-11-28); the approval-gated model is
 * left out on purpose.
 */
export const ttokenProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "ttoken",
  alias: "ttoken",
  baseUrl: "https://api.ttoken.dev/v1/chat/completions",
  modelsUrl: "https://api.ttoken.dev/v1/models",
  models: [
    { id: "deepseek/deepseek-v4.1-flash", name: "DeepSeek V4.1 Flash" },
    { id: "z-ai/glm-5.3-flash", name: "GLM 5.3 Flash" },
    { id: "qwen/qwen3.8-27b", name: "Qwen 3.8 27B" },
    { id: "netra/deepseek-v4.1-flash-netra", name: "DeepSeek V4.1 Flash (Netra)" },
    { id: "ttoken/auto", name: "TTOken Auto" },
  ],
  passthroughModels: true,
});
