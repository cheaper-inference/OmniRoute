import { extractUsage, type UsageLike } from "../../utils/usageTracking.ts";
import { mergeCacheCreationFields } from "../../utils/cacheWriteUsage.ts";
import { mergeUsageEvidence } from "../../utils/usageEvidence.ts";
import { pickCacheCreationInPrompt } from "../../utils/pickCacheCreationTokens.ts";

type UsageState = {
  usage?: UsageLike;
  claudeUsage?: UsageLike;
  claudeAccountingUsage?: UsageLike;
  claudeCacheCreationInPrompt?: boolean;
};

function extractClaudeAccounting(raw: UsageLike, previous: UsageLike | undefined) {
  const incoming = extractUsage({
    usage: {
      ...raw,
      prompt_tokens: raw.prompt_tokens ?? raw.input_tokens ?? previous?.prompt_tokens ?? 0,
      completion_tokens: raw.completion_tokens ?? raw.output_tokens ?? previous?.completion_tokens,
    },
  });
  if (
    incoming &&
    raw.prompt_tokens === undefined &&
    raw.input_tokens === undefined &&
    previous?.prompt_tokens === undefined
  )
    delete incoming.prompt_tokens;
  return incoming;
}

function createClaudeClientUsage(
  accounting: UsageLike,
  previous: UsageLike | undefined,
  raw: UsageLike,
  creationInPrompt: boolean
): UsageLike {
  const cached = accounting.cached_tokens ?? accounting.cache_read_input_tokens;
  const created = accounting.cache_creation_input_tokens;
  const client: UsageLike = {
    ...mergeCacheCreationFields(previous, raw),
    input_tokens: Math.max(
      0,
      (accounting.prompt_tokens ?? 0) - (cached ?? 0) - (creationInPrompt ? (created ?? 0) : 0)
    ),
    output_tokens: accounting.completion_tokens ?? 0,
    ...(cached !== undefined ? { cache_read_input_tokens: cached } : {}),
    ...(created !== undefined ? { cache_creation_input_tokens: created } : {}),
    ...(accounting.reasoning_tokens > 0 ? { reasoning_tokens: accounting.reasoning_tokens } : {}),
  };
  return client;
}

/** Keep the native client projection separate from the inclusive accounting receipt. */
export function trackClaudeClientUsage(chunk: { usage?: UsageLike }, state: UsageState): void {
  const raw = chunk.usage;
  if (!raw || typeof raw !== "object") return;
  const previous = state.claudeAccountingUsage;
  const ownsSharedUsage = !state.usage || state.usage === state.claudeUsage;
  const incoming = extractClaudeAccounting(raw, previous);
  const accounting: UsageLike = {
    ...previous,
    ...incoming,
    ...mergeCacheCreationFields(previous, raw),
    usage_evidence: mergeUsageEvidence(previous, raw),
  };
  state.claudeAccountingUsage = accounting;
  const inclusion = pickCacheCreationInPrompt(raw);
  if (inclusion !== undefined) state.claudeCacheCreationInPrompt = inclusion;
  const client = createClaudeClientUsage(
    accounting,
    previous,
    raw,
    state.claudeCacheCreationInPrompt !== false
  );
  state.claudeUsage = client;
  // Standalone translator callers historically read native counts here. The stream
  // already owns an inclusive receipt with totals, costs and evidence: never replace it.
  if (ownsSharedUsage) state.usage = client;
  else {
    // A hub translator may have installed nested OpenAI details before this step.
    // Fill missing canonical aliases without replacing its inclusive input or evidence.
    state.usage = { ...accounting, ...state.usage };
    if (state.usage.output_tokens === undefined)
      state.usage.output_tokens = accounting.completion_tokens;
  }
}

/** Finalization may estimate missing output/input, without changing the cache split. */
export function projectClaudeClientUsage(
  usage: UsageLike | null,
  creationInPrompt = true
): UsageLike | null {
  if (!usage) return usage;
  const cached = usage.cached_tokens ?? usage.cache_read_input_tokens;
  const created = usage.cache_creation_input_tokens;
  return {
    ...usage,
    input_tokens: Math.max(
      0,
      (usage.prompt_tokens ?? usage.input_tokens ?? 0) -
        (cached ?? 0) -
        (creationInPrompt ? (created ?? 0) : 0)
    ),
    output_tokens: usage.completion_tokens ?? usage.output_tokens ?? 0,
    ...(cached !== undefined ? { cache_read_input_tokens: cached } : {}),
  };
}
