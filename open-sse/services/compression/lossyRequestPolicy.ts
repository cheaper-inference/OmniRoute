import { isSafeDefault } from "./engineCatalog.ts";
import type { DerivedPlan } from "./deriveDefaultPlan.ts";
import type { CompressionPipelineStep } from "./types.ts";

/**
 * HouMinXi's plan for the default path: dedup and whitespace folding stay on.
 * Summaries, relevance filters, and style rewrites run only when the request
 * opts in.
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

export const SAFE_DEFAULT_PIPELINE = [{ engine: "session-dedup" }, { engine: "lite" }] as const;

function isSafeEngine(id: string): boolean {
  try {
    return isSafeDefault(id);
  } catch {
    return false;
  }
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
    if (kept.length === plan.stackedPipeline.length) return plan;
    return {
      ...plan,
      mode: "stacked",
      stackedPipeline: kept.length > 0 ? kept : [...SAFE_DEFAULT_PIPELINE],
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
