/**
 * Codex Ultrafast model scope (#16678). Lives in the engine so the Codex executor and the
 * chatCore service-tier resolver read it without an open-sse → src import (boundary
 * ratchet, quality-baseline.json); `src/lib/providers/codexServiceTierModels.ts` re-exports
 * it for the dashboard and the settings modules.
 */

/** Official Ultrafast model IDs; automatic defaults must not guess future variants. */
export const CODEX_ULTRAFAST_SUPPORTED_MODELS: readonly string[] = ["gpt-6-astra", "gpt-6.1-sol"];

export function isCodexUltrafastModel(model: unknown): boolean {
  if (typeof model !== "string") return false;
  const id = model.trim().toLowerCase().split("/").pop();
  return CODEX_ULTRAFAST_SUPPORTED_MODELS.includes(id || "");
}

/** Scope defaults only. Explicit caller and upstream-reported tiers keep their contract. */
export function scopeCodexServiceTierDefault<Tier extends string>(
  tier: Tier | undefined,
  model: unknown
): Tier | undefined {
  return tier === "ultrafast" && !isCodexUltrafastModel(model) ? undefined : tier;
}

// Product/model names are intentionally identical in every UI locale.
export const CODEX_ULTRAFAST_LABEL = "Ultrafast";
export const CODEX_ULTRAFAST_MODEL_LABEL = `Ultrafast (${CODEX_ULTRAFAST_SUPPORTED_MODELS.join(", ")})`;
