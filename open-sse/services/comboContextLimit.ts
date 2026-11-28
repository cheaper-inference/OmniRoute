// Combo context-limit resolution. Extracted from contextManager.ts (which is
// under a frozen file-size ratchet) so the precedence rules below have a single
// home; contextManager re-exports it for existing importers.
import { resolveTokenLimit } from "./contextManager.ts";

export type ComboContextLimitSource = "combo-explicit" | "target" | "combo-min" | "fallback";

/**
 * Resolve the context limit to use for a COMBO request.
 *
 * Precedence:
 * 1. `comboContextLength` — an operator-set `context_length` on the combo
 *    record (Agent Features → Context length). It is an explicit declaration of
 *    the window this combo runs at, so it outranks every inferred value,
 *    including a target's own registry/catalog window. The combo editor
 *    persisted this field and `/v1/models` advertised it, but nothing consulted
 *    it at request time — so a combo whose members carry no per-model window
 *    fell through to the provider's generic `defaultContextLength` (openrouter
 *    128000, command-code 200000) and rejected large requests the operator had
 *    explicitly sized for.
 * 2. The executing target's own specific window. chatCore always executes with
 *    the CONCRETE target's provider/model (handleSingleModel resolves the target
 *    before delegating), so that window is authoritative. An unconditional
 *    min(...allTargets) compressed a 1M-target request at the smallest sibling's
 *    window, destructively purging history ("agent keeps forgetting things").
 * 3. min(...comboTargetLimits) — a defensive fallback for when the current
 *    provider/model resolves no specific limit at all.
 *
 * A non-finite or non-positive `comboContextLength` is ignored, so steps 2-3
 * keep their pre-existing behavior exactly.
 *
 * `placeholder: true` (step 2 only) means the executing target's own window is a passthrough
 * provider's unsourced default (`resolveTokenLimit().placeholder`): the returned number is a guess,
 * so the caller must not enforce or compact against it. It is reported as the target's own limit
 * rather than a sibling's `combo-min`, because a sibling's window is no evidence about this model's.
 */
export function resolveComboContextLimit(options: {
  provider: string;
  model: string | null;
  comboTargetLimits: number[];
  comboContextLength?: number | null;
}): { limit: number; source: ComboContextLimitSource; placeholder?: boolean } {
  const explicit = options.comboContextLength;
  if (typeof explicit === "number" && Number.isFinite(explicit) && explicit > 0) {
    return { limit: explicit, source: "combo-explicit" };
  }
  const own = resolveTokenLimit(options.provider, options.model ?? null);
  if (own.specific) {
    return { limit: own.limit, source: "target" };
  }
  if (own.placeholder) {
    return { limit: own.limit, source: "target", placeholder: true };
  }
  const knownTargets = (options.comboTargetLimits || []).filter(
    (value) => Number.isFinite(value) && value > 0
  );
  if (knownTargets.length > 0) {
    return { limit: Math.min(...knownTargets), source: "combo-min" };
  }
  return { limit: own.limit, source: "fallback" };
}
