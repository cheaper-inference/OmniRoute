/**
 * Opt-in newest-generation promotion for built-in `auto` / `auto/*` routes.
 *
 * `resolveAutoStrategy` ranks targets by score, and a linear scoring weight cannot
 * guarantee that a newer generation outranks an older one with strong historical
 * telemetry without distorting cross-family weights or breaking `preserveRungOrder`.
 * So the promotion is a SLOT-PRESERVING pass applied after scoring, eligibility
 * filtering and rung restoration:
 *
 *   - candidates are bucketed by `(ladder rung, health group)` — a newer generation
 *     never crosses a rung boundary and never jumps ahead of a healthy sibling while
 *     it carries a soft status/quota penalty or is quota-cutoff blocked;
 *   - inside a bucket, `promoteNewestGenerationsInOrder` moves the newest eligible
 *     generation of each tier-scoped family into that family's first slot;
 *   - a fail-closed price guard compares RAW blended $/1M costs (unpriced = `null`
 *     fails closed) against the top-ranked older candidate, so turning the preference
 *     on can never silently escalate spend.
 *
 * Kept out of `resolveAutoStrategy.ts` so the ordering host stays under the
 * file-size cap and this pass is unit-testable without a combo pipeline.
 */
import {
  parseModelGeneration,
  promoteNewestGenerationsInOrder,
  resolveNewestPriceMultiplier,
  type NewestGenerationCandidate,
} from "../autoCombo/modelGeneration.ts";
import { parseModel } from "../model.ts";
import { accountPreferenceRank, type AccountPreferences } from "./accountPreferences.ts";
import { costKey, resolveRawPoolCosts, type PricingLookup } from "./candidateCost.ts";
import type { AutoProviderCandidate, ResolvedComboTarget } from "./types.ts";

/** Bucket component for pools that carry no ladder rung (plain `auto`, `auto/<family>`). */
const DEFAULT_RUNG = "__default__";

export interface NewestGenerationPromotionInput {
  orderedTargets: readonly ResolvedComboTarget[];
  /** Every built candidate, INCLUDING quota-cutoff-blocked ones (they form their own bucket). */
  candidates: readonly AutoProviderCandidate[];
  /** `autoNewestMaxPriceMultiplier`; unset falls back to the fail-safe 1.0. */
  maxPriceMultiplier: unknown;
  /** True for rung-ordered pools (`:thrifty`), where no upward price jump is allowed. */
  clampPriceMultiplierToOne: boolean;
  /** Optional per-combo account tier preferences; preferred/normal/reserve tiers never cross. */
  accountPreferences?: AccountPreferences;
  getPricing: PricingLookup;
}

export interface NewestGenerationPromotionResult {
  orderedTargets: ResolvedComboTarget[];
  promoted: boolean;
  /** Human-readable before/after summary for `selectionReason`, or null when nothing moved. */
  reason: string | null;
  /** Visible diagnostic reasons when a newer candidate was held back by the price guard. */
  skippedReasons: string[];
}

function providerAndModel(target: ResolvedComboTarget): { provider: string; model: string } {
  const parsed = parseModel(target.modelStr);
  return {
    provider: target.provider || parsed.provider || parsed.providerAlias || "unknown",
    model: parsed.model || target.modelStr,
  };
}

/**
 * Health group of a candidate. Soft penalties and the hard quota cutoff each get
 * their own group so a penalized or blocked newer generation can never be promoted
 * ahead of a healthy older one.
 */
function healthGroup(candidate: AutoProviderCandidate | undefined): string {
  if (!candidate) return "healthy";
  if (candidate.quotaCutoffBlocked === true) return "blocked";
  if (candidate.statusPenalty || candidate.quotaSoftPenalty || candidate.quotaUnreadable) {
    return "penalised";
  }
  return "healthy";
}

export async function promoteNewestGenerationTargets(
  input: NewestGenerationPromotionInput
): Promise<NewestGenerationPromotionResult> {
  const { orderedTargets } = input;
  if (orderedTargets.length < 2) {
    return {
      orderedTargets: [...orderedTargets],
      promoted: false,
      reason: null,
      skippedReasons: [],
    };
  }

  const byExecutionKey = new Map(
    input.candidates.map((candidate) => [candidate.executionKey, candidate])
  );
  const costs = await resolveRawPoolCosts(
    orderedTargets.map((target) => providerAndModel(target)),
    input.getPricing
  );
  const multiplier = resolveNewestPriceMultiplier(input.maxPriceMultiplier, {
    clampToOne: input.clampPriceMultiplierToOne,
  });

  const hasAccountPreferences =
    !!input.accountPreferences && Object.keys(input.accountPreferences).length > 0;
  const describe = (target: ResolvedComboTarget): NewestGenerationCandidate | null => {
    const generation = parseModelGeneration(target.modelStr);
    if (!generation) return null;
    const { provider, model } = providerAndModel(target);
    const prefRank = hasAccountPreferences
      ? `|pref=${accountPreferenceRank(target.connectionId, input.accountPreferences!)}`
      : "";
    return {
      bucket: `${target.ladderRung ?? DEFAULT_RUNG}|${healthGroup(byExecutionKey.get(target.executionKey))}${prefRank}`,
      tierFamilyKey: generation.tierFamilyKey,
      version: generation.version,
      stabilityRank: generation.stabilityRank,
      rawCost: costs.get(costKey(provider, model)) ?? null,
    };
  };

  const formatCost = (cost: number | null | undefined) =>
    cost === null || cost === undefined ? "null" : cost;
  const skippedReasons: string[] = [];
  const seenSkips = new Set<string>();

  const promoted = promoteNewestGenerationsInOrder(orderedTargets, describe, {
    maxPriceMultiplier: multiplier,
    onBlocked: (info) => {
      const msg =
        `newest-generation skipped: ${info.baseline.modelStr} → ${info.blocked.modelStr}` +
        ` (${info.reason}: cost ${formatCost(info.baselineCost)} → ${formatCost(info.newerCost)}, multiplier=${multiplier})`;
      if (!seenSkips.has(msg)) {
        seenSkips.add(msg);
        skippedReasons.push(msg);
      }
    },
  });
  const changed = promoted.some((target, index) => target !== orderedTargets[index]);
  if (!changed) {
    return {
      orderedTargets: [...orderedTargets],
      promoted: false,
      reason: null,
      skippedReasons,
    };
  }

  const before = orderedTargets[0];
  const after = promoted[0];
  const beforeGeneration = describe(before);
  const afterGeneration = describe(after);
  const reason =
    `newest-generation: ${before.modelStr} → ${after.modelStr}` +
    ` | bucket=${afterGeneration?.bucket ?? DEFAULT_RUNG}` +
    ` | cost ${formatCost(beforeGeneration?.rawCost)} → ${formatCost(afterGeneration?.rawCost)}` +
    ` | multiplier=${multiplier}`;

  return { orderedTargets: promoted, promoted: true, reason, skippedReasons };
}
