import { mergeUsageEvidence } from "./usageEvidence.ts";
import type { UsageLike } from "./usageTracking.ts";

export function mergeUsageSnapshot(current: UsageLike | null, incoming: UsageLike): UsageLike {
  if (!current) return { ...incoming };
  return {
    ...current,
    ...incoming,
    usage_evidence: mergeUsageEvidence(current, incoming),
    // A provider may split usage across snapshots. Undefined fields do not
    // erase earlier evidence; explicit zero is meaningful (a cache miss).
    ...(incoming.cache_evidence === "invalid"
      ? { cached_tokens: undefined, cache_evidence: "invalid" }
      : incoming.cached_tokens !== undefined
        ? { cached_tokens: incoming.cached_tokens }
        : {}),
    ...(incoming.cache_read_input_tokens !== undefined
      ? { cache_read_input_tokens: incoming.cache_read_input_tokens }
      : {}),
    ...(incoming.cache_creation_input_tokens !== undefined
      ? { cache_creation_input_tokens: incoming.cache_creation_input_tokens }
      : {}),
    ...(incoming.cache_evidence !== undefined ? { cache_evidence: incoming.cache_evidence } : {}),
  };
}

/** Native output repair without projecting inclusive prompt totals onto fresh input. */
export function repairClaudeFinalWireUsage(
  value: unknown,
  receipt: UsageLike | null | undefined
): boolean {
  const event = value as { type?: string; usage?: UsageLike };
  if (event?.type !== "message_delta" || !receipt) return false;
  const output = receipt.completion_tokens ?? receipt.output_tokens ?? 0;
  if (event.usage?.output_tokens === output) return false;
  event.usage = {
    ...event.usage,
    output_tokens: output,
    usage_evidence: receipt.usage_evidence,
    ...(receipt.estimated ? { estimated: true } : {}),
  };
  return true;
}
