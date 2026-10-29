/**
 * Production adapter for {@link partitionJevTargets}: the same pre-dispatch
 * gates the attempt loop would apply, without mutating attempt state.
 */

import { isAccountSemaphoreFull, isModelLocked } from "../accountFallback.ts";
import { checkCredentialGate } from "../credentialGate.ts";
import { isProviderInCooldown } from "../providerCooldownTracker.ts";
import { parseModel } from "../model.ts";
import type { ResilienceSettings } from "../../../src/lib/resilience/settings";
import { findOpenCircuitBreaker, readConnectionForCooldownGate } from "./executeTargetGates.ts";
import { resolvePersistedConnectionCooldownSkipReason } from "./comboPredicates.ts";
import { resolveQuotaExhaustionCutoffForTarget } from "./quotaExhaustionCutoff.ts";
import { resolveResetWindowConfig } from "./quotaScoring.ts";
import {
  deriveRequestCompatibilityRequirements,
  filterTargetsByRequestCompatibility,
} from "./comboStructure.ts";
import { applyContextRequirements } from "./contextRequirements.ts";
import { evaluateContextLimit } from "./contextOverrideGate.ts";
import { lookupPositiveCap } from "./concurrencyCaps.ts";
import { getResolvedModelCapabilities } from "../modelCapabilities.ts";
import {
  modelAvailabilitySkipReason,
  type ComboLogger,
  type IsModelAvailable,
  type ResolvedComboTarget,
} from "./types.ts";
import type { CheckJevBlock } from "./jevEligibility.ts";
import { partitionJevTargets, type JevPartition } from "./jevEligibility.ts";

export type JevBlockCheckerDeps = {
  body: Record<string, unknown>;
  config: Record<string, unknown> | null | undefined;
  resilienceSettings: ResilienceSettings;
  log: ComboLogger;
  isModelAvailable?: IsModelAvailable;
  comboName: string;
  deferContextOverflowWhenCompressible?: boolean;
};

/**
 * Build the production `checkBlock` port. Per-target gates first; list-level
 * tools/vision and context filters are applied in {@link partitionJevTargetsForAsk}.
 */
export function createJevBlockChecker(deps: JevBlockCheckerDeps): CheckJevBlock {
  const resetWindowConfig = resolveResetWindowConfig(deps.config);
  const gates: Array<CheckJevBlock> = [
    async (target) => {
      const provider = target.provider;
      if (!provider) return null;
      return findOpenCircuitBreaker(provider, target.connectionId) ? "circuit_open" : null;
    },
    async (target) => {
      const provider = target.provider;
      if (
        !deps.resilienceSettings.providerCooldown.enabled ||
        !provider ||
        provider === "unknown"
      ) {
        return null;
      }
      return isProviderInCooldown(
        provider,
        target.connectionId ?? undefined,
        deps.resilienceSettings
      ) || isProviderInCooldown(provider, undefined, deps.resilienceSettings)
        ? "provider_cooldown"
        : null;
    },
    async (target) => {
      if (!target.connectionId) return null;
      const persisted = await resolvePersistedConnectionCooldownSkipReason(target, (id) =>
        readConnectionForCooldownGate(id, false)
      );
      return persisted ? "persisted_cooldown" : null;
    },
    async (target) => {
      const provider = target.provider;
      const rawModel = parseModel(target.modelStr).model || target.modelStr;
      return provider && rawModel && isModelLocked(provider, target.connectionId || "", rawModel)
        ? "model_lockout"
        : null;
    },
    async (target) => {
      const provider = target.provider;
      if (!provider || !target.connectionId) return null;
      const quotaCutoff = await resolveQuotaExhaustionCutoffForTarget(
        provider,
        target.connectionId,
        deps.resilienceSettings,
        resetWindowConfig,
        deps.comboName,
        deps.log,
        target.modelStr
      );
      return quotaCutoff.blocked ? "quota_cutoff" : null;
    },
    async (target) => {
      if (!deps.isModelAvailable) return null;
      return modelAvailabilitySkipReason(await deps.isModelAvailable(target.modelStr, target));
    },
    async (target) => {
      if (!target.connectionId) return null;
      return checkCredentialGate(target.connectionId, target.provider, target.modelStr).allowed ===
        false
        ? "credential_gate"
        : null;
    },
    async (target) => {
      if (!target.connectionId || !target.provider) return null;
      const cap = await lookupPositiveCap(target.connectionId);
      return cap && isAccountSemaphoreFull(target.provider, target.connectionId, cap)
        ? "concurrency_cap"
        : null;
    },
  ];

  return async (target) => {
    for (const gate of gates) {
      const reason = await gate(target);
      if (reason) return reason;
    }
    return null;
  };
}

/**
 * Partition for the Jev choice call: per-target gates, then hard request
 * compatibility and context requirements. Survivors are the only options.
 */
export async function partitionJevTargetsForAsk(
  targets: readonly ResolvedComboTarget[],
  deps: JevBlockCheckerDeps
): Promise<JevPartition> {
  const perTarget = await partitionJevTargets(targets, createJevBlockChecker(deps));
  if (perTarget.eligible.length === 0) return perTarget;

  const compatFailOpen =
    (deps.config as { compatFilterFailOpen?: unknown } | null | undefined)?.compatFilterFailOpen ===
    true;
  const contextRequirements = (
    deps.config as { contextRequirements?: Parameters<typeof applyContextRequirements>[1] } | null
  )?.contextRequirements;
  const compatibility = filterTargetsByRequestCompatibility(
    perTarget.eligible,
    deps.body,
    deps.log,
    "Jev pre-ask",
    { failOpen: compatFailOpen }
  );
  const compatibilityOrdered = preserveInputOrder(perTarget.eligible, compatibility);
  const compatibilityBlocks = getRemovedTargets(perTarget.eligible, compatibilityOrdered);
  const contextEligible = filterJevTargetsByHardRequestContext(
    compatibilityOrdered,
    deps.body,
    deps.deferContextOverflowWhenCompressible
  );
  const hardContextBlocks = getRemovedTargets(compatibilityOrdered, contextEligible).map(
    (item) => ({
      ...item,
      reason: "context_window" as const,
    })
  );
  const afterRequirements = applyContextRequirements(
    contextEligible,
    contextRequirements,
    deps.log
  );
  const contextRequirementBlocks = getRemovedTargets(contextEligible, afterRequirements).map(
    (item) => ({ ...item, reason: "context_requirements" as const })
  );
  const eligible = preserveInputOrder(contextEligible, afterRequirements);

  return {
    eligible,
    blocked: [
      ...perTarget.blocked,
      ...compatibilityBlocks,
      ...hardContextBlocks,
      ...contextRequirementBlocks,
    ],
  };
}

/**
 * Context limits are advisory to the general combo filter. Jev should not
 * choose a known-too-small model while a known-fitting candidate exists.
 * Keep the existing fail-open pool when none fit so compression and the
 * normal attempt loop retain their chance to recover.
 */
export function filterJevTargetsByHardRequestContext(
  targets: readonly ResolvedComboTarget[],
  body: Record<string, unknown>,
  deferContextOverflowWhenCompressible = false
): ResolvedComboTarget[] {
  if (deferContextOverflowWhenCompressible || targets.length < 2) return [...targets];
  const requirements = deriveRequestCompatibilityRequirements(body);
  if (requirements.requiredContextTokens <= 0) return [...targets];

  const fitting = targets.filter((target) => {
    const capabilities = getResolvedModelCapabilities({
      provider: target.providerId || target.provider || null,
      model: target.modelStr,
    });
    return evaluateContextLimit(capabilities, requirements, target.modelStr) !== false;
  });
  return fitting.length > 0 ? fitting : [...targets];
}

function preserveInputOrder(
  before: readonly ResolvedComboTarget[],
  after: readonly ResolvedComboTarget[]
): ResolvedComboTarget[] {
  const survivorKeys = new Set(after.map((target) => target.executionKey));
  return before.filter((target) => survivorKeys.has(target.executionKey));
}

function getRemovedTargets(
  before: readonly ResolvedComboTarget[],
  after: readonly ResolvedComboTarget[]
): JevPartition["blocked"] {
  const survivors = new Set(after.map((target) => target.executionKey));
  return before
    .filter((target) => !survivors.has(target.executionKey))
    .map((target) => ({ target, reason: "availability" as const }));
}
