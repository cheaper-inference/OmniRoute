import { normalizeComboStep } from "@/lib/combos/steps";

/** One probe result as returned by POST /api/combos/test. */
export type ComboTestResultLike = {
  stepId?: string | null;
  status?: string;
  statusCode?: number;
  isTimeout?: boolean;
};

type ComboLike = { name?: string; models?: unknown[] };

const TRANSIENT_STATUS_CODES = new Set([408, 429]);

/**
 * A failed probe only says "this model is broken" when the upstream answered with a
 * non-transient 4xx. Timeouts, rate limits, 5xx and probes without a status code
 * (network errors, client aborts, skipped web-session providers) must not prune a combo.
 */
export function isRemovableComboTestFailure(result: ComboTestResultLike | null | undefined) {
  if (!result || result.status !== "error" || result.isTimeout) return false;
  const code = Number(result.statusCode);
  return code >= 400 && code < 500 && !TRANSIENT_STATUS_CODES.has(code);
}

/** Step ids whose every probe failed removably (one step can be probed once per account). */
export function collectRemovableFailedStepIds(
  results: readonly ComboTestResultLike[] | null | undefined
): string[] {
  const allFailed = new Map<string, boolean>();
  for (const result of results ?? []) {
    const stepId = typeof result?.stepId === "string" ? result.stepId : "";
    if (!stepId) continue;
    allFailed.set(stepId, (allFailed.get(stepId) ?? true) && isRemovableComboTestFailure(result));
  }
  return [...allFailed].filter(([, failed]) => failed).map(([stepId]) => stepId);
}

/**
 * Drop the top-level combo steps whose id is in `failedStepIds`. Ids are derived with
 * normalizeComboStep, exactly as resolveNestedComboTargets does for the test route, so
 * failures inside a nested combo never remove anything from this one.
 */
export function removeFailedComboSteps(combo: ComboLike, failedStepIds: readonly string[]) {
  const models = Array.isArray(combo?.models) ? combo.models : [];
  const failed = new Set(failedStepIds);
  const kept = models.filter((entry, index) => {
    const step = normalizeComboStep(entry, { comboName: combo.name, index });
    return !(step?.kind === "model" && failed.has(step.id));
  });
  return { models: kept, removedCount: models.length - kept.length };
}
