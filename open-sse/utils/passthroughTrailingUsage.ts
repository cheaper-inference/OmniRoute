import {
  deriveUsageEvidence,
  hasEstimatedUsageEvidence,
  mergeUsageEvidence,
  usableTokenCounter,
} from "./usageEvidence.ts";
import { estimateUsage, type UsageLike } from "./usageTracking.ts";
import { mergeCacheCreationFields } from "./cacheWriteUsage.ts";

type UsageRecord = UsageLike;
function previousInputIsKnown(previous: unknown): boolean {
  if (!previous || typeof previous !== "object") return false;
  return (
    usableTokenCounter((previous as UsageRecord).prompt_tokens) &&
    deriveUsageEvidence(previous).input.source !== "unknown"
  );
}
function repairTrailingInput(
  summary: UsageRecord,
  previous: unknown,
  body: unknown,
  length: number,
  format: string
): void {
  if (!(summary.completion_tokens > 0)) return;
  if ((summary.prompt_tokens ?? 0) !== 0) return;
  if (summary.prompt_tokens == null && previousInputIsKnown(previous)) return;
  const estimated = estimateUsage(body, length, format);
  if (!(estimated?.prompt_tokens > 0)) return;
  summary.usage_evidence = {
    ...deriveUsageEvidence(summary),
    input: deriveUsageEvidence(estimated).input,
  };
  summary.estimated = true;
  summary.prompt_tokens = estimated.prompt_tokens;
  // A reported total may contain additional categories, so never add an estimate to it.
  if (!usableTokenCounter(summary.total_tokens))
    summary.total_tokens = summary.completion_tokens + estimated.prompt_tokens;
}
function fillMissingTotal(result: UsageRecord, summary: UsageRecord): void {
  if (usableTokenCounter(summary.total_tokens)) return;
  if (usableTokenCounter(result.prompt_tokens) && usableTokenCounter(result.completion_tokens))
    result.total_tokens = result.prompt_tokens + result.completion_tokens;
}
/** Merge the last cumulative receipt without fabricating counters the provider omitted. */
export function resolveTrailingUsageSummary(
  summary: UsageRecord,
  previous: unknown,
  body: unknown,
  totalContentLength: number,
  sourceFormat: string
) {
  repairTrailingInput(summary, previous, body, totalContentLength, sourceFormat);
  if (!previous || typeof previous !== "object" || Array.isArray(previous)) return summary;
  const result: UsageRecord = {
    ...previous,
    ...summary,
    ...mergeCacheCreationFields(previous, summary),
    usage_evidence: mergeUsageEvidence(previous, summary),
  };
  fillMissingTotal(result, summary);
  if (hasEstimatedUsageEvidence(result)) result.estimated = true;
  else delete result.estimated;
  return result;
}
/** Output-only summaries must reach the merge before generic zero-input repair. */
export function hasPriorInputForTrailingUsage(payload: unknown, previous: unknown): boolean {
  const event = payload as { choices?: unknown[]; usage?: UsageRecord } | null;
  if (!Array.isArray(event?.choices) || event.choices.length !== 0 || !event.usage) return false;
  if (event.usage.prompt_tokens != null || event.usage.input_tokens != null) return false;
  return previousInputIsKnown(previous);
}
