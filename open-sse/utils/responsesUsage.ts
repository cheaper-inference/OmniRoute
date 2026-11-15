import { mergeCacheCreationFields } from "./cacheWriteUsage.ts";

type UsageRecord = Record<string, unknown>;

function usageRecord(value: unknown): UsageRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as UsageRecord)
    : {};
}

function usageNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function usageDetails(record: UsageRecord, ...keys: string[]): UsageRecord {
  for (const key of keys) {
    const value = usageRecord(record[key]);
    if (Object.keys(value).length > 0) return value;
  }
  return {};
}

/** Normalize Chat Completions and Responses usage into the Responses API shape. */
export function normalizeResponsesUsage(previous: unknown, raw: unknown): UsageRecord | null {
  const source = usageRecord(raw);
  if (Object.keys(source).length === 0) return usageRecord(previous);

  const before = usageRecord(previous);
  const beforeInputDetails = usageDetails(before, "input_tokens_details", "prompt_tokens_details");
  const beforeOutputDetails = usageDetails(
    before,
    "output_tokens_details",
    "completion_tokens_details"
  );
  const inputDetails = usageDetails(
    source,
    "input_tokens_details",
    "prompt_tokens_details",
    "inputTokenDetails",
    "input_token_details"
  );
  const outputDetails = usageDetails(
    source,
    "output_tokens_details",
    "completion_tokens_details",
    "outputTokenDetails",
    "output_token_details",
    "reasoningTokenDetails",
    "reasoning_token_details"
  );

  const inputTokens =
    usageNumber(source.input_tokens) ??
    usageNumber(source.prompt_tokens) ??
    usageNumber(source.inputTokens) ??
    usageNumber(source.promptTokens) ??
    usageNumber(before.input_tokens) ??
    usageNumber(before.prompt_tokens) ??
    0;
  const cachedTokens =
    usageNumber(source.cache_read_input_tokens) ??
    usageNumber(source.cached_input_tokens) ??
    usageNumber(source.cachedInputTokens) ??
    usageNumber(source.cached_tokens) ??
    usageNumber(source.prompt_cache_hit_tokens) ??
    usageNumber(inputDetails.cached_tokens) ??
    usageNumber(inputDetails.cachedTokens) ??
    usageNumber(inputDetails.cacheReadTokens) ??
    usageNumber(beforeInputDetails.cached_tokens) ??
    0;
  const cacheCreationTokens =
    usageNumber(source.cache_creation_input_tokens) ??
    usageNumber(source.cache_write_tokens) ??
    usageNumber(inputDetails.cache_creation_tokens) ??
    usageNumber(inputDetails.cache_write_tokens) ??
    usageNumber(beforeInputDetails.cache_creation_tokens) ??
    usageNumber(beforeInputDetails.cache_write_tokens);
  const cacheCreationInPrompt = [inputDetails, beforeInputDetails]
    .map((details) => details.cache_creation_in_prompt)
    .find((flag): flag is boolean => typeof flag === "boolean");
  const outputTokens =
    usageNumber(source.output_tokens) ??
    usageNumber(source.completion_tokens) ??
    usageNumber(source.outputTokens) ??
    usageNumber(source.completionTokens) ??
    usageNumber(before.output_tokens) ??
    usageNumber(before.completion_tokens) ??
    0;
  const reasoningTokens =
    usageNumber(source.reasoning_tokens) ??
    usageNumber(source.reasoningTokens) ??
    usageNumber(outputDetails.reasoning_tokens) ??
    usageNumber(outputDetails.reasoningTokens) ??
    usageNumber(beforeOutputDetails.reasoning_tokens) ??
    0;
  const totalTokens =
    usageNumber(source.total_tokens) ??
    usageNumber(source.totalTokens) ??
    inputTokens + outputTokens;
  const cacheFields = mergeCacheCreationFields(previous, raw);

  return {
    ...cacheFields,
    ...(source.provider_credits !== undefined ? { provider_credits: source.provider_credits } : {}),
    ...(source.cost_in_usd_ticks !== undefined
      ? { cost_in_usd_ticks: source.cost_in_usd_ticks }
      : {}),
    input_tokens: inputTokens,
    input_tokens_details: {
      ...cacheFields,
      cached_tokens: cachedTokens,
      ...(cacheCreationTokens !== undefined ? { cache_creation_tokens: cacheCreationTokens } : {}),
      ...(cacheCreationTokens !== undefined && cacheCreationInPrompt !== undefined
        ? { cache_creation_in_prompt: cacheCreationInPrompt }
        : {}),
    },
    output_tokens: outputTokens,
    output_tokens_details: { reasoning_tokens: reasoningTokens },
    total_tokens: totalTokens,
  };
}

/** An all-zero input/output placeholder is not a final receipt. Output-only zero is. */
export function hasUsageReceipt(raw: unknown): boolean {
  const usage = usageRecord(raw);
  const input = usageNumber(usage.prompt_tokens ?? usage.input_tokens);
  const output = usageNumber(usage.completion_tokens ?? usage.output_tokens);
  const total = usageNumber(usage.total_tokens);
  if ((input ?? 0) > 0 || (output ?? 0) > 0 || (total ?? 0) > 0) return true;
  const details = usageDetails(usage, "input_tokens_details", "prompt_tokens_details");
  const partial = [
    output,
    total,
    usageNumber(usage.cached_tokens),
    usageNumber(usage.cache_read_input_tokens),
    usageNumber(usage.cache_creation_input_tokens),
    usageNumber(usage.cache_write_tokens),
    usageNumber(details.cached_tokens),
    usageNumber(details.cache_creation_tokens),
    usageNumber(details.cache_write_tokens),
  ];
  return input === undefined && partial.some((value) => value !== undefined && value >= 0);
}
