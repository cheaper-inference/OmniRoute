import type { RegistryEntry } from "../../shared.ts";
import { buildOpenAiCompatibleRegistryEntry } from "../../shared.ts";

/**
 * Pareto Inference (https://paretoinference.com) — OpenAI-compatible Chat Completions on
 * Pareto's own GPUs. Prepaid credits, Bearer API key (`PARETO_API_KEY`).
 *
 * - Streaming only: a request without `stream: true` is refused with `400 streaming_only`
 *   before any credit is held, so `forceStream` keeps the upstream call streamed and
 *   OmniRoute assembles the JSON body for non-streaming clients.
 * - Reasoning is returned in `reasoning_content` (models.dev `interleaved.field`).
 * - 1M context and a 131,072-token output cap on every model.
 * - `GET /v1/models` is public (200 without a key), so it drives discovery but cannot prove
 *   a key — see src/lib/providers/validation/pareto.ts.
 *
 * Seed ids verified 2026-11-06 against https://api.paretoinference.com/v1/models and
 * https://docs.paretoinference.com/pricing. No static prices: with models.dev sync on, its
 * `pareto` provider prices these ids (DeepSeek has peak/off-peak rates a flat table cannot hold).
 */
export const paretoProvider: RegistryEntry = buildOpenAiCompatibleRegistryEntry({
  id: "pareto",
  alias: "pareto",
  baseUrl: "https://api.paretoinference.com/v1/chat/completions",
  modelsUrl: "https://api.paretoinference.com/v1/models",
  forceStream: true,
  defaultContextLength: 1_000_000,
  models: [
    {
      id: "z-ai/glm-5.3-flash",
      name: "GLM 5.3 Flash",
      contextLength: 1_000_000,
      maxOutputTokens: 131_072,
      toolCalling: true,
      supportsReasoning: true,
      supportedThinkingEfforts: ["low", "high", "max"],
      supportsVision: true,
      interleavedField: "reasoning_content",
    },
    {
      id: "deepseek/deepseek-v4.1-flash",
      name: "DeepSeek V4.1 Flash",
      contextLength: 1_000_000,
      maxOutputTokens: 131_072,
      toolCalling: true,
      supportsReasoning: true,
      supportedThinkingEfforts: ["none", "low", "high", "max"],
      supportsVision: true,
      interleavedField: "reasoning_content",
    },
    {
      id: "xiaomi/mimo-v2.6-flash",
      name: "MiMo V2.6 Flash",
      contextLength: 1_000_000,
      maxOutputTokens: 131_072,
      toolCalling: true,
      supportsReasoning: true,
      supportsVision: true,
      interleavedField: "reasoning_content",
    },
  ],
});
