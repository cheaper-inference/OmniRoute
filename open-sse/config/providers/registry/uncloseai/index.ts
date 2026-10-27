import type { RegistryEntry } from "../../shared.ts";

export const uncloseaiProvider: RegistryEntry = {
  id: "uncloseai",
  alias: "unc",
  format: "openai",
  executor: "default",
  baseUrl: "https://hermes.ai.unturf.com/v1/chat/completions",
  modelsUrl: "https://hermes.ai.unturf.com/v1/models",
  authType: "optional",
  authHeader: "bearer",
  toolCalling: "emulated",
  // The roster rotates every few weeks (see the models[] comment below), so the
  // context window must NOT hang off a pinned model id: resolveTokenLimit() would
  // miss a newly-rotated id, fall through to the generic 128000 catch-all, and let
  // enforceOutputTokenBudget() hand out a completion budget that overflows the real
  // 65536 window (upstream then 400s: "context length 65536 ... you requested
  // 65537"). A provider-level default survives the rotation — any uncloseai model
  // resolves to 65536 even with no discovery/import run. Per-model discovery
  // (max_model_len → auto:discovery override) still wins when a sync has run.
  defaultContextLength: 65536,
  models: [
    // 2026-10-16 refresh — upstream rotated its roster again (it does this every
    // few weeks): /v1/models now serves exactly one model, and the previously
    // catalogued id (Lorbus/Qwen3.6-27B-int4-AutoRound) returns 404 "model does
    // not exist" on /v1/chat/completions. The live id below was read straight
    // from GET https://hermes.ai.unturf.com/v1/models (vllm backend,
    // max_model_len 65536).
    {
      id: "turboderp/Qwen3.8-27B-exl3",
      name: "Qwen3.8 27B exl3 (🆓 Free)",
      contextLength: 65536,
    },
  ],
};
