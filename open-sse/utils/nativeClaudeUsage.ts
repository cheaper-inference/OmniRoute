import { FORMATS } from "../translator/formats.ts";
import { sanitizeProviderUsageForRequest, type UsageLike } from "./usageTracking.ts";
import { mergeCacheCreationFields, readCacheWriteUsage } from "./cacheWriteUsage.ts";
import { deriveUsageEvidence, usableTokenCounter } from "./usageEvidence.ts";
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
function eventUsage(event: Record<string, unknown>): Record<string, unknown> | null {
  if (event.type === "message_start") return asRecord(asRecord(event.message)?.usage);
  if (event.type === "message_delta") return asRecord(event.usage);
  return null;
}
function copyCounters(counters: UsageLike, usage: Record<string, unknown>): boolean {
  let observed = false;
  for (const key of COUNTERS) {
    if (!usableTokenCounter(usage[key])) continue;
    counters[key] = usage[key];
    observed = true;
  }
  return observed;
}
function copyDiagnostics(counters: UsageLike, usage: Record<string, unknown>): void {
  if (usage.output_tokens_details)
    counters.output_tokens_details =
      usage.output_tokens_details as UsageLike["output_tokens_details"];
  const thinking = asRecord(usage.output_tokens_details)?.thinking_tokens;
  if (usableTokenCounter(thinking)) counters.reasoning_tokens = thinking;
  if (usableTokenCounter(usage.reasoning_tokens))
    counters.reasoning_tokens = usage.reasoning_tokens;
  if (usableTokenCounter(usage.no_cache_tokens)) counters.no_cache_tokens = usage.no_cache_tokens;
}
function normalizedReceipt(raw: UsageLike, body: unknown, finalOutput: boolean): UsageLike {
  const sanitized = sanitizeProviderUsageForRequest(raw, body, FORMATS.CLAUDE)!;
  const evidence = deriveUsageEvidence(sanitized);
  if (!finalOutput && !((sanitized.output_tokens ?? 0) > 0))
    evidence.output = { source: "unknown" };
  const cacheRead = sanitized.cache_read_input_tokens,
    cacheCreation = sanitized.cache_creation_input_tokens;
  const prompt = (sanitized.input_tokens ?? 0) + (cacheRead ?? 0) + (cacheCreation ?? 0);
  const completion = sanitized.output_tokens ?? 0;
  const { input_tokens: _input, output_tokens: _output, ...rest } = sanitized;
  return {
    ...rest,
    prompt_tokens: prompt,
    completion_tokens: completion,
    usage_evidence: evidence,
    prompt_tokens_details: {
      cache_creation_in_prompt: true,
      ...(cacheRead !== undefined ? { cached_tokens: cacheRead } : {}),
      ...(cacheCreation !== undefined ? { cache_creation_tokens: cacheCreation } : {}),
    },
  };
}
/** Request-local cumulative receipt, independent of translation and payload retention. */
export function createNativeClaudeUsageTracker(body: unknown) {
  const counters: UsageLike = {};
  let cacheWrite: Record<string, unknown> = {},
    observed = false,
    finalOutput = false;
  return {
    observe(payload: unknown): void {
      const event = asRecord(payload);
      if (!event) return;
      const usage = eventUsage(event);
      if (!usage || usage.estimated === true) return;
      cacheWrite = mergeCacheCreationFields(cacheWrite, usage);
      if (event.type === "message_delta" && usableTokenCounter(usage.output_tokens))
        finalOutput = true;
      const countersObserved = copyCounters(counters, usage);
      observed = observed || countersObserved || readCacheWriteUsage(cacheWrite).total !== null;
      copyDiagnostics(counters, usage);
    },
    hasFinalUsage(): boolean {
      return finalOutput;
    },
    getUsage(contentLength = 0): UsageLike | null {
      if (!observed)
        return contentLength > 0 ? finalizeStreamingUsage(null, body, contentLength) : null;
      return finalizeStreamingUsage(
        normalizedReceipt({ ...counters, ...cacheWrite }, body, finalOutput),
        body,
        contentLength
      );
    },
  };
}
