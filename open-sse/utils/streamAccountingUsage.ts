import { FORMATS } from "../translator/formats.ts";
import { finalizeStreamingUsage } from "./finalizeStreamingUsage.ts";
import type { UsageLike } from "./usageTracking.ts";

/** Normalize receipt aliases once so completion, partial usage and quota consumers agree. */
export function canonicalStreamingUsage(usage: UsageLike | null | undefined): UsageLike | null {
  if (!usage) return null;
  if (usage.promptTokenCount === undefined && usage.candidatesTokenCount === undefined)
    return usage;
  return {
    ...usage,
    prompt_tokens: usage.prompt_tokens ?? usage.input_tokens ?? usage.promptTokenCount,
    completion_tokens: usage.completion_tokens ?? usage.output_tokens ?? usage.candidatesTokenCount,
    total_tokens: usage.total_tokens ?? usage.totalTokenCount,
  };
}

type StreamAccountingInput = {
  usage: UsageLike | null | undefined;
  native: boolean;
  nativeUsage: UsageLike | null;
  body: unknown;
  contentLength: number;
  format: string;
};
export function resolveStreamAccountingUsage(input: StreamAccountingInput): UsageLike | null {
  if (input.native)
    return input.nativeUsage ?? finalizeStreamingUsage(null, input.body, input.contentLength);
  if (!input.usage && input.contentLength === 0) return null;
  return canonicalStreamingUsage(
    finalizeStreamingUsage(
      canonicalStreamingUsage(input.usage),
      input.body,
      input.contentLength,
      input.format
    )
  );
}

/** Claude's legacy OpenAI projection excludes cache creation from prompt, unlike accounting. */
export function projectStreamingClientUsage(
  usage: UsageLike | null | undefined,
  target: string,
  source: string
): UsageLike | null | undefined {
  if (!usage || target !== FORMATS.CLAUDE || source !== FORMATS.OPENAI) return usage;
  if (usage.prompt_tokens_details?.cache_creation_in_prompt !== true) return usage;
  const prompt = Math.max(0, (usage.prompt_tokens ?? 0) - (usage.cache_creation_input_tokens ?? 0));
  return {
    ...usage,
    prompt_tokens: prompt,
    total_tokens: prompt + (usage.completion_tokens ?? 0),
    prompt_tokens_details: { ...usage.prompt_tokens_details, cache_creation_in_prompt: false },
  };
}
