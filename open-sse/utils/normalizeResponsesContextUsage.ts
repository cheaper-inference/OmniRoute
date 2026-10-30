/**
 * Responses clients use input_tokens as the full context size. The internal
 * Claude-to-Chat billing contract can exclude cache writes and mark that fact
 * explicitly; fold those writes back in only at the Responses boundary.
 * Mark the result inclusive so subsequent sanitization cannot add them twice.
 */
export function normalizeResponsesContextUsage<T extends Record<string, unknown>>(usage: T): T {
  const details = usage.input_tokens_details;
  if (!details || typeof details !== "object" || Array.isArray(details)) return usage;
  const inputDetails = details as Record<string, unknown>;
  const creation = inputDetails.cache_creation_tokens;
  const input = usage.input_tokens;
  if (
    inputDetails.cache_creation_in_prompt !== false ||
    typeof creation !== "number" ||
    !Number.isFinite(creation) ||
    creation <= 0 ||
    typeof input !== "number" ||
    !Number.isFinite(input)
  )
    return usage;

  const output = typeof usage.output_tokens === "number" ? usage.output_tokens : 0;
  const total =
    typeof usage.total_tokens === "number" && Number.isFinite(usage.total_tokens)
      ? usage.total_tokens
      : input + output;
  return {
    ...usage,
    input_tokens: input + creation,
    total_tokens: total + creation,
    input_tokens_details: { ...inputDetails, cache_creation_in_prompt: true },
  };
}
