import type { DerivedPlan } from "../deriveDefaultPlan.ts";
import type { AdaptiveTelemetry, ContextBudgetConfig, LadderStage } from "./types.ts";
import { DEFAULT_LADDER, aggressivenessOf, expectedReductionFactor } from "./ladder.ts";
import { computeTarget } from "./computeTarget.ts";
import { isSafeDefault } from "../engineCatalog.ts";

export interface ResolveAdaptiveInput {
  basePlan: DerivedPlan;
  estimatedTokens: number;
  modelContextLimit: number | null;
  requestMaxTokens: number | null;
  config: ContextBudgetConfig;
  /**
   * Injected per-stage estimator (design §4.1/§9). Returns the NEW token estimate after a
   * stage is applied to a prompt of `priorTokens`. Default models it with the cheap
   * per-engine expected-reduction factor (no dry-run, no real tokenizer).
   */
  estimate?: (priorTokens: number, stage: LadderStage) => number;
}

export interface ResolveAdaptiveResult {
  plan: DerivedPlan;
  telemetry: AdaptiveTelemetry | null;
}

const defaultEstimate = (prior: number, stage: LadderStage): number =>
  Math.round(prior * expectedReductionFactor(stage.engine));

/**
 * Pure adaptive resolver (design §4.2). Floors/escalates a base plan so the (estimated)
 * compressed prompt fits the context budget. Never drops content: if the ladder is
 * exhausted while still over target, returns the best-effort plan with fit=false.
 *
 * Returns telemetry=null only when there is no usable target (unknown model limit) — the
 * caller then skips adaptive entirely (design §6: skip, never throw).
 */
export function resolveAdaptivePlan(input: ResolveAdaptiveInput): ResolveAdaptiveResult {
  const { basePlan, estimatedTokens, modelContextLimit, requestMaxTokens, config } = input;
  const estimate = input.estimate ?? defaultEstimate;

  if (config.mode === "off") return { plan: basePlan, telemetry: null };
  if (!modelContextLimit || modelContextLimit <= 0) {
    return { plan: basePlan, telemetry: null }; // unknown limit → skip (D-C / §6)
  }

  const target = computeTarget(config.policy, modelContextLimit, requestMaxTokens, config);
  const headroomBefore = target - estimatedTokens;

  // replace-autotrigger only acts on a bare Default/off base plan; an explicit choice wins.
  if (defersToBasePlan(config, basePlan)) {
    return {
      plan: basePlan,
      telemetry: {
        policy: config.policy,
        target,
        headroomBefore,
        stagesApplied: [],
        headroomAfter: headroomBefore,
        fit: headroomBefore >= 0,
      },
    };
  }

  // Already fits → never over-compress (D-C2).
  if (headroomBefore >= 0) {
    return {
      plan: basePlan,
      telemetry: {
        policy: config.policy,
        target,
        headroomBefore,
        stagesApplied: [],
        headroomAfter: headroomBefore,
        fit: true,
      },
    };
  }

  const stages = escalationStages(config, basePlan);

  let current = estimatedTokens;
  const applied: LadderStage[] = [];
  for (const stage of stages) {
    current = estimate(current, stage);
    applied.push(stage);
    if (current <= target) break;
  }

  const headroomAfter = target - current;
  const fit = headroomAfter >= 0;
  return {
    plan: planFromStages(basePlan, applied),
    telemetry: {
      policy: config.policy,
      target,
      headroomBefore,
      stagesApplied: applied.map((s) => s.engine),
      headroomAfter,
      fit,
    },
  };
}

function defersToBasePlan(config: ContextBudgetConfig, basePlan: DerivedPlan): boolean {
  return (
    config.mode === "replace-autotrigger" &&
    aggressivenessOf(basePlan.mode) > aggressivenessOf("off") &&
    !isLosslessDefault(basePlan)
  );
}

/** Escalation: start just ABOVE the base plan's aggressiveness (floor escalates beyond it). */
function escalationStages(config: ContextBudgetConfig, basePlan: DerivedPlan): LadderStage[] {
  const override = config.ladderOverride && config.ladderOverride.length > 0;
  const ladder = override ? (config.ladderOverride as LadderStage[]) : DEFAULT_LADDER;
  if (config.mode === "replace-autotrigger" && isLosslessDefault(basePlan)) {
    return losslessDefaultStages(basePlan, ladder, Boolean(override));
  }
  const startTier =
    config.mode === "floor" ? aggressivenessOf(basePlan.mode) : aggressivenessOf("off");
  return ladder.filter((s) => aggressivenessOf(s.engine) > startTier);
}

type PlanStep = DerivedPlan["stackedPipeline"][number];

function isLosslessStep(step: PlanStep): boolean {
  let safe = false;
  try {
    safe = isSafeDefault(step.engine);
  } catch {
    return false;
  }
  // lite is lossless only with tool-result truncation explicitly off (lossy request policy).
  return safe && (step.engine !== "lite" || step.config?.compressToolResults === false);
}

/**
 * The panel Default after the lossy request policy: dedup and whitespace folding only.
 * It is not an operator choice to keep at any cost, so an over-window request escalates it.
 */
function isLosslessDefault(plan: DerivedPlan): boolean {
  return (
    plan.source === "default" &&
    plan.mode === "stacked" &&
    plan.stackedPipeline.length > 0 &&
    plan.stackedPipeline.every(isLosslessStep)
  );
}

/**
 * Escalation order for the lossless safe Default. With the default ladder: first re-enable
 * lite's tool-result truncation (the step every request ran before the lossy request policy
 * made it opt-in, and the one measured to fit long sessions), then the ladder engines the
 * base does not already run. An operator ladderOverride is authoritative: its stages run in
 * its order and lite is never forced in. A base engine is never credited twice, except lite,
 * whose stage upgrades the base step in place.
 */
function losslessDefaultStages(
  basePlan: DerivedPlan,
  ladder: LadderStage[],
  override: boolean
): LadderStage[] {
  const baseEngines = new Set(basePlan.stackedPipeline.map((step) => step.engine));
  const remaining = ladder.filter(
    (s) => (!baseEngines.has(s.engine) || s.engine === "lite") && aggressivenessOf(s.engine) > 0
  );
  if (override) return remaining;
  return [{ engine: "lite" }, ...remaining.filter((s) => s.engine !== "lite")];
}

/**
 * Turn the applied ladder stages into a DerivedPlan. A single applied stage that is a
 * single-mode engine collapses to that engine's mode; otherwise a stacked pipeline.
 * The base plan's own pipeline is preserved as the prefix (floor escalates AFTER the base).
 * A stage whose engine already runs in the base is not repeated; an applied `lite` stage
 * re-enables the base lite step's tool-result truncation in place.
 */
function planFromStages(basePlan: DerivedPlan, applied: LadderStage[]): DerivedPlan {
  if (applied.length === 0) return basePlan;
  const basePipeline = basePlan.mode === "stacked" ? basePlan.stackedPipeline : [];
  const appliedEngines = new Set(applied.map((stage) => stage.engine));
  const baseEngines = new Set(basePipeline.map((step) => step.engine));
  const upgradedBase = basePipeline.map((step) =>
    step.engine === "lite" && appliedEngines.has("lite") ? withToolResultTruncation(step) : step
  );
  const stackedPipeline = [
    ...upgradedBase,
    ...applied.filter((stage) => !baseEngines.has(stage.engine)),
  ];
  return { mode: "stacked", stackedPipeline };
}

function withToolResultTruncation(step: PlanStep): PlanStep {
  if (step.config?.compressToolResults !== false) return step;
  const { compressToolResults: _lossless, ...rest } = step.config;
  return Object.keys(rest).length > 0
    ? { ...step, config: rest }
    : { engine: step.engine, ...(step.intensity ? { intensity: step.intensity } : {}) };
}
