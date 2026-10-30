import { FORMATS } from "../translator/formats.ts";
import { sanitizeProviderUsageForRequest, type UsageLike } from "./usageTracking.ts";

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

/** Native receipt, independent of client translation and payload retention limits. */
export function createNativeClaudeUsageTracker(body: unknown) {
  const counters: UsageLike = {};
  let observed = false;
  return {
    observe(payload: unknown): void {
      const event = asRecord(payload);
      const usage = asRecord(
        event?.type === "message_start"
          ? asRecord(event.message)?.usage
          : event?.type === "message_delta"
            ? event.usage
            : null
      );
      if (!usage || usage.estimated === true) return;
      for (const key of COUNTERS) {
        const value = usage[key];
        if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
          // Anthropic usage is cumulative; presence (including zero), not
          // truthiness, determines whether a previous counter is replaced.
          counters[key] = value;
          observed = true;
        }
      }
    },
    getUsage(): UsageLike | null {
      if (!observed) return null;
      // Keep the existing implausible-input defense, but do not mistake a
      // locally repaired counter for an unchanged provider receipt.
      const sanitized = sanitizeProviderUsageForRequest(counters, body, FORMATS.CLAUDE)!;
      const cacheRead = sanitized.cache_read_input_tokens ?? 0;
      const cacheCreation = sanitized.cache_creation_input_tokens ?? 0;
      const prompt = (sanitized.input_tokens ?? 0) + cacheRead + cacheCreation;
      const completion = sanitized.output_tokens ?? 0;
      return {
        prompt_tokens: prompt,
        completion_tokens: completion,
        total_tokens: prompt + completion,
        cache_read_input_tokens: cacheRead,
        cache_creation_input_tokens: cacheCreation,
        prompt_tokens_details: {
          cached_tokens: cacheRead,
          cache_creation_tokens: cacheCreation,
          cache_creation_in_prompt: true,
        },
        ...(sanitized !== counters ? { estimated: true } : {}),
      };
    },
  };
}
