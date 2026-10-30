import { isSafeDefault } from "./engineCatalog.ts";
import type { DerivedPlan } from "./deriveDefaultPlan.ts";

/**
 * HouMinXi's plan for the default path: dedup and non-tool whitespace folding stay on.
 * Unique tool text stays verbatim. Summaries, relevance filters, and style rewrites
 * run only when the request opts in.
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

export const SAFE_DEFAULT_PIPELINE = [
  { engine: "session-dedup" },
  { engine: "lite", config: { compressToolResults: false, preserveToolWhitespace: true } },
] as const;

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

/** Replace lossy steps with dedup + tool-preserving Lite unless the request opted in. */
export function applyLossyRequestPolicy(plan: DerivedPlan, header: string | null): DerivedPlan {
  if (headerOptsIntoLossy(header, plan)) return plan;
  return downgradeUnrequestedLossy(plan);
}

export function downgradeUnrequestedLossy(plan: DerivedPlan): DerivedPlan {
  if (plan.mode === "off") return plan;

  let pipeline: DerivedPlan["stackedPipeline"];
  if (plan.mode === "stacked") {
    pipeline = plan.stackedPipeline.filter((step) => isSafeEngine(step.engine));
  } else if (plan.mode === "lite") {
    // A scoped step overrides global Lite settings without changing the stored config.
    pipeline = [{ engine: "lite" }];
  } else if (LOSSY_SINGLE_MODES.has(plan.mode)) {
    pipeline = [];
  } else {
    return plan;
  }

  if (pipeline.length === 0) pipeline = [...SAFE_DEFAULT_PIPELINE];
  return {
    ...plan,
    mode: "stacked",
    stackedPipeline: pipeline.map((step) =>
      step.engine === "lite"
        ? {
            ...step,
            config: { ...step.config, compressToolResults: false, preserveToolWhitespace: true },
          }
        : step
    ),
  };
}
