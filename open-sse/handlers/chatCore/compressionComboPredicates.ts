/**
 * chatCore compression-combo helpers (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Extracted from handleChatCore's compression setup: the two predicates detect the built-in
 * RTK→caveman stacked pipeline and whether a runtime combo has at least one pipeline layer
 * (byte-identical to the original inline closures); defaultComboForRequest resolves the legacy
 * default combo for one request — yielding to a plan the request header chose, otherwise
 * applying the lossy request policy to the combo's pipeline. No handler state is captured.
 */

import type {
  CompressionConfig,
  CompressionPipelineStep,
} from "../../services/compression/types.ts";
import type { CompressionSource } from "../../services/compression/deriveDefaultPlan.ts";
import { applyLossyRequestPolicy } from "../../services/compression/lossyRequestPolicy.ts";
import { planFromHeader } from "../../services/compression/planResolution.ts";

export type RuntimeCompressionCombo = {
  id: string;
  pipeline: NonNullable<CompressionConfig["stackedPipeline"]>;
  languagePacks: string[];
  outputMode: boolean;
  outputModeIntensity: string;
  /** Per-combo style selection; empty/undefined inherits the global panel. */
  outputStyles?: CompressionConfig["outputStyles"];
};

export function isBuiltinStackedPipeline(
  pipeline: CompressionConfig["stackedPipeline"] | undefined
): boolean {
  if (!Array.isArray(pipeline) || pipeline.length !== 2) return false;
  const [first, second] = pipeline;
  return (
    first?.engine === "rtk" &&
    (first.intensity === undefined || first.intensity === "standard") &&
    !first.config &&
    second?.engine === "caveman" &&
    (second.intensity === undefined || second.intensity === "full") &&
    !second.config
  );
}

export function isStackedCompressionCombo(
  compressionCombo: RuntimeCompressionCombo | null
): compressionCombo is RuntimeCompressionCombo {
  // >= 1: a single-engine default combo (user enabled exactly one layer via the per-engine config
  // page) must still apply. applyCompressionComboConfig already guards length === 0.
  return Boolean(compressionCombo && compressionCombo.pipeline.length >= 1);
}

/** Apply the request's lossy policy to a configured stacked pipeline. */
export function applyStackedLossyRequestPolicy(
  pipeline: RuntimeCompressionCombo["pipeline"],
  header: string | null
): RuntimeCompressionCombo["pipeline"] {
  return applyLossyRequestPolicy({ mode: "stacked", stackedPipeline: pipeline }, header)
    .stackedPipeline as RuntimeCompressionCombo["pipeline"];
}

/**
 * The legacy default combo as this request may run it, or null when it must not apply. A plan
 * the request header chose (a named combo, engine:<id>, default) wins over every operator layer.
 * The default combo is operator configuration, not a request opt-in, so its lossy steps get the
 * same policy resolveBasePlan applies to every other plan.
 */
export function defaultComboForRequest(
  compressionCombo: RuntimeCompressionCombo | null,
  request: {
    config: CompressionConfig;
    header: string | null;
    combos: Record<string, CompressionPipelineStep[]>;
  }
): RuntimeCompressionCombo | null {
  if (!isStackedCompressionCombo(compressionCombo)) return null;
  if (request.header && planFromHeader(request.config, request.header, request.combos)) return null;
  return {
    ...compressionCombo,
    pipeline: applyStackedLossyRequestPolicy(compressionCombo.pipeline, request.header),
  };
}

/**
 * Whether chatCore must run the resolved plan's pipeline instead of the merged config's.
 * Without a combo the derived plan always runs. The seeded default combo is operator
 * configuration, not a choice for this request, so when the context-budget dial had to
 * escalate (the request does not fit the model window) its escalated pipeline runs too.
 * Active profiles, routing overrides, and request headers use their resolved pipeline.
 * An adaptive escalation drops the source; an explicit profile still keeps its base
 * pipeline in that case.
 */
export function shouldRunResolvedPipeline(state: {
  comboApplied: boolean;
  comboIsDefault: boolean;
  comboIdConfigured: boolean;
  adaptiveStagesApplied: number;
  planSource?: CompressionSource;
}): boolean {
  if (
    state.planSource === "active-profile" ||
    state.planSource === "routing-override" ||
    state.planSource === "request-header"
  ) {
    return true;
  }
  if (!state.comboApplied && !state.comboIdConfigured) return true;
  return state.comboIsDefault && state.adaptiveStagesApplied > 0;
}
