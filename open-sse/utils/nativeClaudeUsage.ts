import { FORMATS } from "../translator/formats.ts";
import { sanitizeProviderUsageForRequest, type UsageLike } from "./usageTracking.ts";
import { mergeCacheCreationFields } from "./cacheWriteUsage.ts";
import { deriveUsageEvidence, usableTokenCounter } from "@/lib/usage/usageEvidence";
import { finalizeStreamingUsage } from "./finalizeStreamingUsage.ts";
const COUNTERS = [
  "input_tokens",
  "output_tokens",
  "cache_read_input_tokens",
  "cache_creation_input_tokens",
] as const;
function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}
/** Request-local cumulative receipt, independent of translation and payload retention. */
export function createNativeClaudeUsageTracker(body: unknown) {
  const counters: UsageLike = {};
  let cacheWrite: Record<string, unknown> = {},
    observed = false,
    finalOutput = false;
  return {
    observe(payload: unknown): void {
      const event = asRecord(payload),
        usage = asRecord(
          event?.type === "message_start"
            ? asRecord(event.message)?.usage
            : event?.type === "message_delta"
              ? event.usage
              : null
        );
      if (!usage || usage.estimated === true) return;
      cacheWrite = mergeCacheCreationFields(cacheWrite, usage);
      if (event?.type === "message_delta" && usableTokenCounter(usage.output_tokens))
        finalOutput = true;
      for (const key of COUNTERS)
        if (usableTokenCounter(usage[key])) {
          counters[key] = usage[key];
          observed = true;
        }
      if (usage.output_tokens_details)
        counters.output_tokens_details =
          usage.output_tokens_details as UsageLike["output_tokens_details"];
      const thinking = asRecord(usage.output_tokens_details)?.thinking_tokens;
      if (usableTokenCounter(thinking)) counters.reasoning_tokens = thinking;
      if (usableTokenCounter(usage.reasoning_tokens))
        counters.reasoning_tokens = usage.reasoning_tokens;
      if (usableTokenCounter(usage.no_cache_tokens))
        counters.no_cache_tokens = usage.no_cache_tokens;
    },
    hasFinalUsage(): boolean {
      return finalOutput;
    },
    getUsage(contentLength = 0): UsageLike | null {
      if (!observed)
        return contentLength > 0 ? finalizeStreamingUsage(null, body, contentLength) : null;
      const raw: UsageLike = { ...counters, ...cacheWrite };
      const sanitized = sanitizeProviderUsageForRequest(raw, body, FORMATS.CLAUDE)!;
      const evidence = deriveUsageEvidence(sanitized);
      if (!finalOutput && !(sanitized.output_tokens > 0)) evidence.output = { source: "unknown" };
      const cacheRead = sanitized.cache_read_input_tokens,
        cacheCreation = sanitized.cache_creation_input_tokens;
      const prompt = (sanitized.input_tokens ?? 0) + (cacheRead ?? 0) + (cacheCreation ?? 0),
        completion = sanitized.output_tokens ?? 0;
      const { input_tokens: _input, output_tokens: _output, ...rest } = sanitized;
      return finalizeStreamingUsage(
        {
          ...rest,
          prompt_tokens: prompt,
          completion_tokens: completion,
          total_tokens: prompt + completion,
          usage_evidence: evidence,
          prompt_tokens_details: {
            cache_creation_in_prompt: true,
            ...(cacheRead !== undefined ? { cached_tokens: cacheRead } : {}),
            ...(cacheCreation !== undefined ? { cache_creation_tokens: cacheCreation } : {}),
          },
        },
        body,
        contentLength
      );
    },
  };
}
