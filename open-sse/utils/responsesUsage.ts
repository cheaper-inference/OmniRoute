import { hasComputedUsageTotal, markComputedUsageTotal } from "./computedUsageTotals.ts";
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

function firstUsageNumber(...values: unknown[]): number | undefined {
  return values.map(usageNumber).find((value) => value !== undefined);
}

function retainedReportedTotal(
  before: UsageRecord,
  inputTokens: number,
  outputTokens: number
): number | undefined {
  const total = usageNumber(before.total_tokens);
  if (hasComputedUsageTotal(before, "total_tokens") || total === undefined || total <= 0)
    return undefined;
  // A start receipt with no output and a total equal to input is provisional.
  // Independent provider totals remain authoritative across partial updates.
  if (
    before.output_tokens === 0 &&
    total === before.input_tokens &&
    (outputTokens > 0 || inputTokens !== before.input_tokens)
  )
    return undefined;
  return total;
}

function usageDetails(record: UsageRecord, ...keys: string[]): UsageRecord {
  for (const key of keys) {
    const value = usageRecord(record[key]);
    if (Object.keys(value).length > 0) return value;
  }
  return {};
}

function normalizedInputDetails(
  source: UsageRecord,
  before: UsageRecord,
  cacheFields: UsageRecord
) {
  const beforeInputDetails = usageDetails(before, "input_tokens_details", "prompt_tokens_details");
  const inputDetails = usageDetails(
    source,
    "input_tokens_details",
    "prompt_tokens_details",
    "inputTokenDetails",
    "input_token_details"
  );
  const cachedTokens =
    firstUsageNumber(
      source.cache_read_input_tokens,
      source.cached_input_tokens,
      source.cachedInputTokens,
      source.cached_tokens,
      source.prompt_cache_hit_tokens,
      inputDetails.cached_tokens,
      inputDetails.cachedTokens,
      inputDetails.cacheReadTokens,
      beforeInputDetails.cached_tokens
    ) ?? 0;
  const cacheCreationTokens = firstUsageNumber(
    source.cache_creation_input_tokens,
    source.cache_write_tokens,
    inputDetails.cache_creation_tokens,
    inputDetails.cache_write_tokens,
    beforeInputDetails.cache_creation_tokens,
    beforeInputDetails.cache_write_tokens
  );
  const cacheCreationInPrompt = [inputDetails, beforeInputDetails]
    .map((details) => details.cache_creation_in_prompt)
    .find((flag): flag is boolean => typeof flag === "boolean");
  return {
    ...cacheFields,
    cached_tokens: cachedTokens,
    ...(cacheCreationTokens !== undefined ? { cache_creation_tokens: cacheCreationTokens } : {}),
    ...(cacheCreationTokens !== undefined && cacheCreationInPrompt !== undefined
      ? { cache_creation_in_prompt: cacheCreationInPrompt }
      : {}),
  };
}

/** Normalize Chat Completions and Responses usage into the Responses API shape. */
export function normalizeResponsesUsage(previous: unknown, raw: unknown): UsageRecord | null {
  const source = usageRecord(raw);
  if (Object.keys(source).length === 0) return usageRecord(previous);

  const before = usageRecord(previous);
  const beforeOutputDetails = usageDetails(
    before,
    "output_tokens_details",
    "completion_tokens_details"
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
    firstUsageNumber(
      source.input_tokens,
      source.prompt_tokens,
      source.inputTokens,
      source.promptTokens,
      before.input_tokens,
      before.prompt_tokens
    ) ?? 0;
  const outputTokens =
    firstUsageNumber(
      source.output_tokens,
      source.completion_tokens,
      source.outputTokens,
      source.completionTokens,
      before.output_tokens,
      before.completion_tokens
    ) ?? 0;
  const reasoningTokens =
    firstUsageNumber(
      source.reasoning_tokens,
      source.reasoningTokens,
      outputDetails.reasoning_tokens,
      outputDetails.reasoningTokens,
      beforeOutputDetails.reasoning_tokens
    ) ?? 0;
  const incomingTotal = hasComputedUsageTotal(source, "total_tokens")
    ? undefined
    : firstUsageNumber(source.total_tokens, source.totalTokens);
  const previousReportedTotal = retainedReportedTotal(before, inputTokens, outputTokens);
  const computedTotal = incomingTotal === undefined && previousReportedTotal === undefined;
  const totalTokens = incomingTotal ?? previousReportedTotal ?? inputTokens + outputTokens;
  const cacheFields = mergeCacheCreationFields(previous, raw);

  const result = {
    ...cacheFields,
    ...(source.provider_credits !== undefined ? { provider_credits: source.provider_credits } : {}),
    ...(source.cost_in_usd_ticks !== undefined
      ? { cost_in_usd_ticks: source.cost_in_usd_ticks }
      : {}),
    input_tokens: inputTokens,
    input_tokens_details: normalizedInputDetails(source, before, cacheFields),
    output_tokens: outputTokens,
    output_tokens_details: { reasoning_tokens: reasoningTokens },
    total_tokens: totalTokens,
  };
  if (computedTotal) markComputedUsageTotal(result, "total_tokens");
  return result;
}

/** An all-zero input/output placeholder is not a final receipt. Output-only zero is. */
export function hasUsageReceipt(raw: unknown): boolean {
  const usage = usageRecord(raw);
  const input = firstUsageNumber(
    usage.input_tokens,
    usage.prompt_tokens,
    usage.inputTokens,
    usage.promptTokens
  );
  const output = firstUsageNumber(
    usage.output_tokens,
    usage.completion_tokens,
    usage.outputTokens,
    usage.completionTokens
  );
  const total = firstUsageNumber(usage.total_tokens, usage.totalTokens);
  if ((input ?? 0) > 0 || (output ?? 0) > 0 || (total ?? 0) > 0) return true;
  const details = usageDetails(
    usage,
    "input_tokens_details",
    "prompt_tokens_details",
    "inputTokenDetails",
    "input_token_details"
  );
  const partial = [
    output,
    total,
    usageNumber(usage.cached_tokens),
    usageNumber(usage.cached_input_tokens),
    usageNumber(usage.cachedInputTokens),
    usageNumber(usage.prompt_cache_hit_tokens),
    usageNumber(usage.cache_read_input_tokens),
    usageNumber(usage.cache_creation_input_tokens),
    usageNumber(usage.cache_write_tokens),
    usageNumber(details.cached_tokens),
    usageNumber(details.cachedTokens),
    usageNumber(details.cacheReadTokens),
    usageNumber(details.cache_creation_tokens),
    usageNumber(details.cache_write_tokens),
  ];
  return input === undefined && partial.some((value) => value !== undefined && value >= 0);
}
