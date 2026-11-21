import { carryComputedUsageTotals, markComputedUsageTotal } from "./computedUsageTotals.ts";
import {
  deriveUsageEvidence,
  hasEstimatedUsageEvidence,
  mergeUsageEvidence,
  usableTokenCounter,
} from "./usageEvidence.ts";
import { estimateUsage, extractUsage, type UsageLike } from "./usageTracking.ts";
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
  if (!usableTokenCounter(summary.total_tokens)) {
    summary.total_tokens = summary.completion_tokens + estimated.prompt_tokens;
    markComputedUsageTotal(summary, "total_tokens");
  }
}
function fillMissingTotal(result: UsageRecord, summary: UsageRecord, previous: UsageRecord): void {
  if (usableTokenCounter(summary.total_tokens)) return;
  if (
    result.prompt_tokens === previous.prompt_tokens &&
    result.completion_tokens === previous.completion_tokens &&
    usableTokenCounter(previous.total_tokens)
  ) {
    result.total_tokens = previous.total_tokens;
    carryComputedUsageTotals(previous, result);
    return;
  }
  if (usableTokenCounter(result.prompt_tokens) && usableTokenCounter(result.completion_tokens)) {
    result.total_tokens = result.prompt_tokens + result.completion_tokens;
    markComputedUsageTotal(result, "total_tokens");
  }
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
  carryComputedUsageTotals(summary.total_tokens === undefined ? previous : summary, result);
  fillMissingTotal(result, summary, previous as UsageRecord);
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

/** Empty/all-zero token placeholders carry no new measurement after a real receipt. */
function isTokenPlaceholder(usage: UsageRecord): boolean {
  const keys = Object.keys(usage);
  if (keys.length === 0) return true;
  if (
    !keys.every((key) =>
      [
        "prompt_tokens",
        "input_tokens",
        "completion_tokens",
        "output_tokens",
        "total_tokens",
      ].includes(key)
    )
  )
    return false;
  const input = usage.prompt_tokens ?? usage.input_tokens;
  const output = usage.completion_tokens ?? usage.output_tokens;
  return input === 0 && output === 0 && (usage.total_tokens ?? 0) === 0;
}

function discardTrailingPlaceholder(
  event: { choices?: unknown[]; usage?: UsageRecord },
  previous: unknown
): boolean {
  if (!Array.isArray(event?.choices) || event.choices.length !== 0 || !event.usage) return false;
  if (!previousInputIsKnown(previous) || !isTokenPlaceholder(event.usage)) return false;
  delete event.usage;
  return true;
}

/** Fill a partial Chat receipt before generic sanitization can invent input. */
export function completeTrailingUsagePayload(
  payload: unknown,
  previous: unknown,
  body: unknown,
  contentLength: number,
  format: string
): boolean {
  const event = payload as { choices?: unknown[]; usage?: UsageRecord };
  if (discardTrailingPlaceholder(event, previous)) return true;
  if (!hasPriorInputForTrailingUsage(payload, previous)) return false;
  const summary = {
    ...event.usage,
    prompt_tokens: (previous as UsageRecord).prompt_tokens,
    usage_evidence: mergeUsageEvidence(previous, event.usage),
    completion_tokens:
      event.usage.completion_tokens ??
      event.usage.output_tokens ??
      (previous as UsageRecord).completion_tokens,
  };
  // Normalize the incoming receipt before merging: a previous canonical cache
  // field must not take precedence over a newly reported alias, including zero.
  const normalized = extractUsage({ usage: summary });
  const cacheRead = normalized?.cached_tokens ?? normalized?.cache_read_input_tokens;
  event.usage = resolveTrailingUsageSummary(
    {
      ...summary,
      ...normalized,
      ...(cacheRead !== undefined
        ? { cached_tokens: cacheRead, cache_read_input_tokens: cacheRead }
        : {}),
      total_tokens: summary.total_tokens,
    },
    previous,
    body,
    contentLength,
    format
  );
  const mergedCacheRead = event.usage.cached_tokens ?? event.usage.cache_read_input_tokens;
  if (usableTokenCounter(mergedCacheRead))
    event.usage.prompt_tokens_details = {
      ...event.usage.prompt_tokens_details,
      cached_tokens: mergedCacheRead,
    };
  return true;
}
