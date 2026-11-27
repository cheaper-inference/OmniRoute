import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * NaraRouter — OpenAI-compatible aggregator (router.bynara.id).
 *
 * Free accounts must link Telegram before calling the API. The active Free
 * plan lists Agnes 2.5 Flash with 7M tokens/day (GET /api/plans, 2026-11-27).
 * The registry also keeps the other pinned routes for accounts with access.
 */
export const naraProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "nara",
  baseUrl: "https://router.bynara.id/v1/chat/completions",
  models: [
    {
      id: "agnes-2.0-flash",
      name: "Agnes 2.0 Flash",
      contextLength: 262144,
      toolCalling: true,
      supportsVision: true,
      supportsReasoning: true,
    },
    {
      id: "agnes-2.5-flash",
      name: "Agnes 2.5 Flash",
      contextLength: 524288,
      toolCalling: true,
      supportsVision: true,
      supportsReasoning: true,
    },
    {
      id: "laguna-s-2.1",
      name: "Laguna S 2.1",
      contextLength: 262144,
      toolCalling: true,
      supportsReasoning: true,
    },
    {
      id: "minimax-m3-free",
      name: "MiniMax M3 (free)",
      contextLength: 1000000,
      supportsVision: true,
      supportsReasoning: true,
    },
    { id: "mistral-large", name: "Mistral Large", contextLength: 252000, toolCalling: true },
    {
      id: "mistral-medium-3-5",
      name: "Mistral Medium 3.5",
      contextLength: 256000,
      toolCalling: true,
      supportsVision: true,
    },
    { id: "qwen3.8-27b", name: "Qwen3.8 27B", toolCalling: true },
    {
      id: "stepfun-3.7-flash",
      name: "StepFun 3.7 Flash",
      contextLength: 262144,
      toolCalling: true,
    },
  ],
});
