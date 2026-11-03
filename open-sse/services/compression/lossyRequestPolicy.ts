import { isSafeDefault } from "./engineCatalog.ts";
import type { DerivedPlan } from "./deriveDefaultPlan.ts";
import type { CompressionPipelineStep } from "./types.ts";

/**
 * HouMinXi's plan for the default path: dedup and whitespace folding stay on.
 * Summaries, relevance filters, style rewrites and tool-result truncation run only when
 * the request opts in.
 */
const LOSSY_SINGLE_MODES = new Set([
  "standard",
  "aggressive",
  "ultra",
  "rtk",
  "relevance",
  "omniglyph",
  "codex-responses",
]);

/**
 * Lite folds whitespace, but its tool-result step cuts every earlier tool result to a few
 * thousand characters. On a long agent session that silently removed ~42% of the context
 * (1,009,611 -> 580,575 tokens on one live request) without any opt-in. Without an opt-in
 * lite runs whitespace/dedup cleanup only; an explicit step config wins over settings.lite.
 */
const LOSSLESS_LITE_STEP = { engine: "lite", config: { compressToolResults: false } } as const;

export const SAFE_DEFAULT_PIPELINE = [{ engine: "session-dedup" }, LOSSLESS_LITE_STEP] as const;

type PlanStep = DerivedPlan["stackedPipeline"][number];

function isSafeEngine(id: string): boolean {
  try {
    return isSafeDefault(id);
  } catch {
    return false;
  }
}

function withoutToolResultTruncation(step: PlanStep): PlanStep {
  if (step.engine !== "lite") return step;
  return { ...step, config: { ...(step.config ?? {}), compressToolResults: false } };
}

/**
 * True when this request asked for lossy compression.
 * `allow-lossy` keeps the operator plan. `engine:<id>` and a named combo are
 * themselves the opt-in. `off`, `default`, and `safe` are not.
 */
export function headerOptsIntoLossy(header: string | null, plan: DerivedPlan): boolean {
  if (!header) return false;
  const lower = header.trim().toLowerCase();
  if (!lower || lower === "off" || lower === "default" || lower === "safe") return false;
  if (lower === "allow-lossy") return true;
  // `engine:<id>` and a named combo both arrive as source request-header.
  return plan.source === "request-header";
}

/** Replace lossy steps with a safe configured pipeline unless the request opted in. */
export function applyLossyRequestPolicy(
  plan: DerivedPlan,
  header: string | null,
  configuredPipeline?: readonly CompressionPipelineStep[]
): DerivedPlan {
  if (headerOptsIntoLossy(header, plan)) return plan;
  return downgradeUnrequestedLossy(plan, configuredPipeline);
}

export function downgradeUnrequestedLossy(
  plan: DerivedPlan,
  configuredPipeline?: readonly CompressionPipelineStep[]
): DerivedPlan {
  if (plan.mode === "off") return plan;

  if (plan.mode === "stacked") {
    const kept = plan.stackedPipeline.filter((step) => isSafeEngine(step.engine));
    const allKept = kept.length === plan.stackedPipeline.length;
    if (allKept && !kept.some((step) => step.engine === "lite")) return plan;
    return {
      ...plan,
      mode: "stacked",
      stackedPipeline:
        kept.length > 0 ? kept.map(withoutToolResultTruncation) : [...SAFE_DEFAULT_PIPELINE],
    };
  }

  if (LOSSY_SINGLE_MODES.has(plan.mode)) {
    const kept = (configuredPipeline ?? []).filter((step) => isSafeEngine(step.engine));
    return {
      ...plan,
      mode: "stacked",
      stackedPipeline: kept.length > 0 ? kept : [...SAFE_DEFAULT_PIPELINE],
    };
  }

  return plan;
}
