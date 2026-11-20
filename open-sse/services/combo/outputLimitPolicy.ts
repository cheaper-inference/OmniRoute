import { getExplicitModelOutputCap, getResolvedModelCapabilities } from "../modelCapabilities.ts";
import { evaluateContextLimit } from "./contextOverrideGate.ts";
import type { RequestCompatibilityRequirements } from "./comboStructure.ts";
import type { ResolvedComboTarget } from "./types.ts";

export function exceedsKnownOutputLimit(
  requestedOutputTokens: number,
  maxOutputTokens: number | null
): boolean {
  if (requestedOutputTokens <= 0 || maxOutputTokens === null) return false;
  return maxOutputTokens < requestedOutputTokens;
}

export function hasKnownCompatibleContextLimit(
  target: ResolvedComboTarget,
  requirements: RequestCompatibilityRequirements
): boolean {
  if (requirements.requiredContextTokens <= 0) return false;
  const capabilities = getResolvedModelCapabilities({
    provider: target.providerId || target.provider || null,
    model: target.modelStr,
  });
  return evaluateContextLimit(capabilities, requirements, target.modelStr) === true;
}

export type CompatFilterOptions = {
  /**
   * Opt-in legacy behavior (#8488): when every target fails a hard capability
   * requirement (tools / vision / structured_output), restore the full pool
   * instead of returning an empty list. Default is fail-closed.
   */
  failOpen?: boolean;
  /**
   * Opt-in: a known output ceiling below the request's `max_tokens` no longer
   * removes the target; it keeps its place in the strategy order (operator
   * priority wins). Clients like Claude Code send max_tokens as a generous
   * ceiling (128000), which otherwise strips every 64k-output model from the
   * combo; translators clamp to the model cap, and a real rejection still falls
   * through to the next target. Explicit false keeps hard exclusion. When
   * unset, Anthropic requests may fall back only on output-only exhaustion.
   */
  outputLimitAdvisory?: boolean;
  sourceFormat?: string | null;
};

/** An explicit combo policy wins over the global fallback; absence is automatic. */
export function resolveOutputLimitAdvisory(
  config: unknown,
  settings: unknown
): boolean | undefined {
  const local = (config as Record<string, unknown> | null | undefined)?.outputLimitAdvisory;
  if (typeof local === "boolean") return local;
  const global = (settings as Record<string, unknown> | null | undefined)?.outputLimitAdvisory;
  return typeof global === "boolean" ? global : undefined;
}

function contextRequirementsWithOutputCap(
  requirements: RequestCompatibilityRequirements,
  cap: number
): RequestCompatibilityRequirements {
  return { ...requirements, requiredContextTokens: requirements.estimatedInputTokens + cap };
}

function isAutomaticOutputCapRequest(
  body: Record<string, unknown>,
  options?: CompatFilterOptions
): boolean {
  return (
    options?.sourceFormat === "claude" &&
    options.outputLimitAdvisory === undefined &&
    typeof body.max_tokens === "number" &&
    Number.isSafeInteger(body.max_tokens) &&
    body.max_tokens > 0 &&
    body.max_completion_tokens === undefined &&
    body.max_output_tokens === undefined
  );
}

/**
 * null means the automatic policy does not apply. An empty map means it applies
 * but no target can use a dispatchable cap without another incompatibility.
 */
export function getAutomaticOutputCapFallback(
  body: Record<string, unknown>,
  rejected: Array<{ target: ResolvedComboTarget; reasons: string[] }>,
  requirements: RequestCompatibilityRequirements,
  options?: CompatFilterOptions
): ReadonlyMap<ResolvedComboTarget, RequestCompatibilityRequirements> | null {
  if (
    !isAutomaticOutputCapRequest(body, options) ||
    !rejected.some(({ reasons }) => reasons.includes("output_tokens"))
  ) {
    return null;
  }

  const clampable = new Map<ResolvedComboTarget, RequestCompatibilityRequirements>();
  for (const { target, reasons } of rejected) {
    if (
      !reasons.includes("output_tokens") ||
      reasons.some((reason) => reason !== "output_tokens" && reason !== "context_window")
    ) {
      continue;
    }
    // Use the provider-scoped explicit ceiling dispatch enforces, not an
    // inferred capacity or a ceiling advertised by another provider.
    const cap = getExplicitModelOutputCap({
      provider: target.providerId || target.provider || null,
      model: target.modelStr,
    });
    if (
      cap === null ||
      !Number.isInteger(cap) ||
      cap <= 0 ||
      cap >= requirements.requestedOutputTokens
    ) {
      continue;
    }
    // A window mismatch caused solely by the unclamped reservation is not an
    // independent incompatibility. Input and the adjusted total must still fit.
    const adjusted = contextRequirementsWithOutputCap(requirements, cap);
    if (hasKnownCompatibleContextLimit(target, adjusted)) clampable.set(target, adjusted);
  }
  return clampable;
}

/**
 * #17958: under `outputLimitAdvisory` a target whose known output limit sits
 * below `max_tokens` stays in the pool, and dispatch caps its reply at that
 * limit (`getExplicitModelOutputCap` into `enforceOutputTokenBudget`). Size its
 * context-window check with the same cap, so it is not demoted for a budget it
 * would never be sent. The output_tokens check still sees the full request, and
 * an unknown limit keeps the full requested budget. A limit of zero or less
 * counts as unknown, as it does at dispatch.
 */
export function contextRequirementsForTarget(
  target: ResolvedComboTarget,
  requirements: RequestCompatibilityRequirements,
  outputLimitAdvisory: boolean
): RequestCompatibilityRequirements {
  if (!outputLimitAdvisory) return requirements;
  const { maxOutputTokens } = getResolvedModelCapabilities({
    provider: target.providerId || target.provider || null,
    model: target.modelStr,
  });
  if (
    typeof maxOutputTokens !== "number" ||
    maxOutputTokens <= 0 ||
    !exceedsKnownOutputLimit(requirements.requestedOutputTokens, maxOutputTokens)
  ) {
    return requirements;
  }
  return contextRequirementsWithOutputCap(requirements, maxOutputTokens);
}
