import { adaptBodyForCompression } from "../../services/compression/bodyAdapter.ts";
import { estimateTokens } from "../../services/contextManager.ts";
import {
  applyEstimatorCalibration,
  recordEstimatorCalibrationFromUsage,
} from "../../services/estimatorCalibration.ts";

type JsonRecord = Record<string, unknown>;

function asJsonRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

export type FinalInputTokenBreakdown = {
  messages: number;
  tools: number;
  system: number;
  instructions: number;
  total: number;
};

export function estimateFinalInputTokenBreakdown(
  requestBody: JsonRecord | null | undefined
): FinalInputTokenBreakdown {
  const isResponsesInput =
    Array.isArray(requestBody?.input) ||
    (requestBody?.input !== null && typeof requestBody?.input === "object");
  const adapted =
    !isResponsesInput && requestBody ? adaptBodyForCompression(requestBody).body : null;
  const nestedRequest = asJsonRecord(requestBody?.request);
  const messages = isResponsesInput
    ? requestBody!.input
    : adapted?.messages ||
      requestBody?.messages ||
      requestBody?.contents ||
      nestedRequest?.contents ||
      [];
  const breakdown = {
    messages: estimateTokens(messages),
    tools: Array.isArray(requestBody?.tools) ? estimateTokens(requestBody.tools) : 0,
    system: estimateTokens(requestBody?.system),
    instructions: estimateTokens(requestBody?.instructions),
  };
  return { ...breakdown, total: Object.values(breakdown).reduce((sum, value) => sum + value, 0) };
}

export function estimateFinalInputTokens(requestBody: JsonRecord | null | undefined): number {
  return estimateFinalInputTokenBreakdown(requestBody).total;
}

function toolsPresentIn(requestBody: JsonRecord | null | undefined): boolean {
  const tools = requestBody?.tools;
  return Array.isArray(tools) && tools.length > 0;
}

/**
 * #14931: the raw chars/4 estimate scaled by the learned actual/estimated
 * ratio for this provider/model × tools shape (services/estimatorCalibration).
 * The factor is 1.0 on cold start, so callers see the raw estimate until
 * trusted observations exist. Sits next to estimateFinalInputTokens so the
 * calibrated and raw numbers share one code path (same breakdown, same basis).
 *
 * `precomputedBreakdown` lets a caller that already computed the breakdown for
 * this exact body snapshot (chatCore reuses it for the tools reserve and the
 * compaction log) skip the re-scan. It must belong to the same requestBody —
 * a stale snapshot silently shifts the context guard.
 */
export function estimateCalibratedFinalInputTokens(
  requestBody: unknown,
  provider: string | null | undefined,
  model: string | null | undefined,
  precomputedBreakdown?: FinalInputTokenBreakdown
): number {
  const record = asJsonRecord(requestBody);
  const estimated = precomputedBreakdown
    ? precomputedBreakdown.total
    : estimateFinalInputTokens(record);
  if (estimated <= 0) return estimated;
  return applyEstimatorCalibration(provider, model, estimated, toolsPresentIn(record));
}

/**
 * #14931: pair a guard-acted estimate with the provider's own prompt_tokens so
 * the calibration keeps learning. Thin adapter so the streaming and
 * non-streaming completion paths share one call shape; a no-op when the usage
 * carries no token count or the observation is rejected by the service.
 */
export function recordFinalInputCalibration(
  requestBody: unknown,
  provider: string | null | undefined,
  model: string | null | undefined,
  estimatedTokens: number,
  usage: unknown,
  aggregatedUsage = false
): void {
  recordEstimatorCalibrationFromUsage({
    provider,
    model,
    estimatedTokens,
    usage,
    toolsPresent: toolsPresentIn(asJsonRecord(requestBody)),
    aggregatedUsage,
  });
}

/**
 * Tokens in a Responses `input` that adaptBodyForCompression() leaves out of the adapted
 * `messages`: function_call and custom_tool_call items, reasoning items. Compaction only
 * shrinks the adapted messages, so its target must leave room for these items.
 */
export function estimateUnmappedResponsesInputTokens(
  requestBody: JsonRecord | null | undefined,
  adapter: Pick<ReturnType<typeof adaptBodyForCompression>, "adapted" | "body">
): number {
  const input = requestBody?.input;
  if (!adapter.adapted || !Array.isArray(input)) return 0;
  return Math.max(0, estimateTokens(input) - estimateTokens(adapter.body.messages));
}
