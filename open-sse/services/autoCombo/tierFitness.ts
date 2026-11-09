/**
 * Tier -> task-fitness table shared by the live resolver
 * (`taskFitness.ts`, resolution layer 3) and the persisted `models_dev_tier`
 * rebuild (`src/lib/db/modelIntelligence.ts`).
 *
 * Kept in a dependency-free leaf module so both sides import ONE copy: the DB
 * domain module must not import `taskFitness.ts` (it imports the DB module),
 * and two hand-synced copies drift.
 */

/** Capability subset the tier derivation reads (a `model_capabilities` aggregate). */
export interface TierCapabilityRow {
  tool_call: boolean | null;
  reasoning: boolean | null;
  limit_context: number | null;
}

/**
 * Intelligence tier derived from models.dev capability data.
 * Tier assignment rules:
 * - `reasoning === true` -> "premium"
 * - `tool_call === true && context >= 128000` -> "standard"
 * - `tool_call === true` -> "fast"
 * - everything else -> "budget"
 */
export const TIER_TASK_FITNESS: Record<string, Record<string, number>> = {
  premium: {
    coding: 0.92,
    review: 0.93,
    planning: 0.94,
    analysis: 0.95,
    debugging: 0.9,
    documentation: 0.88,
    default: 0.85,
  },
  standard: {
    coding: 0.85,
    review: 0.84,
    planning: 0.85,
    analysis: 0.85,
    debugging: 0.82,
    documentation: 0.85,
    default: 0.78,
  },
  fast: {
    coding: 0.78,
    review: 0.72,
    planning: 0.7,
    analysis: 0.72,
    debugging: 0.75,
    documentation: 0.8,
    default: 0.72,
  },
  budget: {
    coding: 0.65,
    review: 0.6,
    planning: 0.55,
    analysis: 0.58,
    debugging: 0.6,
    documentation: 0.7,
    default: 0.55,
  },
};

/** Task categories every tier row covers (the keys of each tier's score map). */
export const TIER_CATEGORIES = [
  "coding",
  "review",
  "planning",
  "analysis",
  "debugging",
  "documentation",
  "default",
] as const;

export function deriveTierFromCapabilities(cap: TierCapabilityRow): string {
  if (cap.reasoning === true) return "premium";
  if (cap.tool_call === true && (cap.limit_context ?? 0) >= 128000) return "standard";
  if (cap.tool_call === true) return "fast";
  return "budget";
}
