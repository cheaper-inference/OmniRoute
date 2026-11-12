import {
  deriveUsageEvidence,
  hasEstimatedUsageEvidence,
  mergeUsageEvidence,
  usableTokenCounter,
} from "@/lib/usage/usageEvidence";
import { estimateUsage } from "./usageTracking.ts";
import { mergeCacheCreationFields } from "./cacheWriteUsage.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UsageRecord = Record<string, any>;

/**
 * Passthrough chat path: resolve the usage for a trailing usage-only
 * (`choices: []`) summary frame.
 *
 * - Some upstreams (e.g. Ollama Cloud) emit `prompt_tokens: 0` although input
 *   was sent; estimate the input count from the request body (mutates `summary`,
 *   which is what gets forwarded to the client).
 * - #15619: the real trailing summary wins over the finish-chunk usage
 *   (last-wins, never summed); fields the summary omits (e.g. completion_tokens)
 *   are kept from the previous usage.
 */
export function resolveTrailingUsageSummary(
  summary: UsageRecord,
  previous: unknown,
  body: unknown,
  totalContentLength: number,
  sourceFormat: string
) {
  if (typeof summary === "object" && !Array.isArray(summary) && summary.completion_tokens > 0) {
    const previousInput =
      previous && typeof previous === "object"
        ? (previous as UsageRecord).prompt_tokens
        : undefined;
    const retainsPreviousInput =
      summary.prompt_tokens == null &&
      usableTokenCounter(previousInput) &&
      deriveUsageEvidence(previous).input.source !== "unknown";
    if ((summary.prompt_tokens ?? 0) === 0 && !retainsPreviousInput) {
      const estimated = estimateUsage(body, totalContentLength, sourceFormat);
      if (estimated?.prompt_tokens > 0) {
        summary.usage_evidence = {
          ...deriveUsageEvidence(summary),
          input: deriveUsageEvidence(estimated).input,
        };
        summary.estimated = true;
        summary.prompt_tokens = estimated.prompt_tokens;
        summary.total_tokens =
          (summary.total_tokens ?? summary.completion_tokens) + estimated.prompt_tokens;
      }
    }
  }
  if (previous && typeof previous === "object" && !Array.isArray(previous)) {
    const result: UsageRecord = {
      ...previous,
      ...summary,
      ...mergeCacheCreationFields(previous, summary),
      usage_evidence: mergeUsageEvidence(previous, summary),
    };
    if (
      summary.total_tokens == null &&
      usableTokenCounter(result.prompt_tokens) &&
      usableTokenCounter(result.completion_tokens)
    )
      result.total_tokens = result.prompt_tokens + result.completion_tokens;
    if (hasEstimatedUsageEvidence(result)) result.estimated = true;
    else delete result.estimated;
    return result;
  }
  return summary;
}

/** Output-only summaries must reach the merge before generic zero-input repair. */
export function hasPriorInputForTrailingUsage(payload: unknown, previous: unknown): boolean {
  const event = payload as { choices?: unknown[]; usage?: UsageRecord } | null;
  const prior = previous as UsageRecord | null;
  return (
    Array.isArray(event?.choices) &&
    event.choices.length === 0 &&
    !!event.usage &&
    event.usage.prompt_tokens == null &&
    event.usage.input_tokens == null &&
    usableTokenCounter(prior?.prompt_tokens) &&
    deriveUsageEvidence(previous).input.source !== "unknown"
  );
}
