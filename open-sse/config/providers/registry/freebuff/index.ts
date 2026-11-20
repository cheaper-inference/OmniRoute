import type { RegistryEntry } from "../../shared.ts";

/**
 * Freebuff (Codebuff free tier).
 *
 * The model list below mirrors a live `GET /api/v1/freebuff/models` response
 * captured 2026-11-11. It is a fallback only: the executor resolves every
 * request through that catalog at runtime, so a rotated catalog does not need a
 * code change - only these labels go stale.
 *
 * `contextLength` comes from each catalog row's `contextWindow`; models without
 * one upstream fall back to the client default (131_072).
 */
export const freebuffProvider: RegistryEntry = {
  id: "freebuff",
  alias: "fb",
  format: "openai",
  executor: "freebuff",
  // The upstream only serves the free tier over a streamed connection; a JSON
  // request is rejected. OmniRoute accumulates the SSE for non-stream clients.
  forceStream: true,
  baseUrl: "https://www.codebuff.com/api/v1",
  authType: "apikey",
  authHeader: "bearer",
  models: [
    {
      id: "deepseek/deepseek-v4-flash",
      name: "DeepSeek V4.1 Flash Fast",
      supportsReasoning: true,
      contextLength: 1_048_576,
      supportedThinkingEfforts: ["low", "high", "max"],
    },
    {
      id: "fbc/deepseek-flash",
      name: "DeepSeek V4.1 Flash",
      supportsReasoning: true,
      contextLength: 1_048_576,
      supportedThinkingEfforts: ["low", "high"],
    },
    {
      id: "fbc/deepseek-flash-slow",
      name: "DeepSeek V4.1 Flash Slow",
      supportsReasoning: true,
      contextLength: 131_072,
    },
    {
      id: "upstage/solar-mini4",
      name: "Solar Mini 4",
      supportsReasoning: true,
      contextLength: 500_000,
    },
    {
      id: "upstage/solar-pro4",
      name: "Solar Pro 4",
      supportsReasoning: true,
      contextLength: 500_000,
    },
    {
      id: "fbc/glyph-cluster",
      name: "Glyph Cluster",
      supportsReasoning: true,
      contextLength: 256_000,
    },
    {
      id: "fbc/nemotron-3.5-lightning",
      name: "Nemotron 3.5 Lightning",
      supportsReasoning: true,
      contextLength: 256_000,
    },
    {
      id: "fbc/beam-free",
      name: "Beam 1.0",
      supportsReasoning: true,
      contextLength: 256_000,
    },
    {
      id: "openai/gpt-6-luna",
      name: "GPT-6 Luna",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1_000_000,
      supportedThinkingEfforts: ["low", "medium", "high", "xhigh"],
    },
    {
      id: "openai/gpt-6.1-terra",
      name: "GPT-6.1 Terra",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 1_000_000,
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
    {
      id: "meta/muse-spark-1.3-contributor",
      name: "Muse Spark 1.3",
      supportsReasoning: true,
      contextLength: 1_000_000,
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
    {
      id: "fbc/claude-haiku-5.5-100k",
      name: "Claude Haiku 5.5",
      supportsReasoning: true,
      supportsVision: true,
      contextLength: 100_000,
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
    {
      id: "fbc/muse-ember",
      name: "Muse Ember",
      supportsReasoning: true,
      contextLength: 100_000,
      supportedThinkingEfforts: ["low", "medium", "high"],
    },
  ],
};
