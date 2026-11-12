import {
  deriveUsageEvidence,
  hasEstimatedUsageEvidence,
  usableTokenCounter,
  type UsageEvidence,
} from "./usageEvidence.ts";
import { FORMATS } from "../translator/formats.ts";
import { estimateInputTokens, estimateOutputTokens, type UsageLike } from "./usageTracking.ts";

function inputCount(usage: UsageLike): number {
  const value = usage.prompt_tokens ?? usage.input_tokens ?? usage.promptTokenCount;
  return usableTokenCounter(value) ? value : 0;
}
function outputCount(usage: UsageLike): number {
  const value = usage.completion_tokens ?? usage.output_tokens ?? usage.candidatesTokenCount;
  return usableTokenCounter(value) ? value : 0;
}
function finalizeInput(usage: UsageLike, evidence: UsageEvidence, body: unknown): number {
  if (evidence.input.source !== "unknown") return inputCount(usage);
  const estimate = estimateInputTokens(body);
  if (estimate <= 0) return inputCount(usage);
  evidence.input = { source: "estimated", method: "request_body_heuristic" };
  return estimate;
}
function finalizeOutput(usage: UsageLike, evidence: UsageEvidence, chars: number): number {
  const output = outputCount(usage);
  if (output > 0 || !(chars > 0)) return output;
  evidence.output = { source: "estimated", method: "observed_characters" };
  return estimateOutputTokens(chars);
}
/** Provider totals may contain modalities not represented by input/output aliases. */
function finalizedTotal(reported: unknown, input: number, output: number): number {
  return usableTokenCounter(reported) && reported > 0 ? reported : input + output;
}
function projectCounts(result: UsageLike, input: number, output: number, format: string): void {
  if (format === FORMATS.CLAUDE || format === FORMATS.OPENAI_RESPONSES) {
    result.input_tokens = input;
    result.output_tokens = output;
  } else if (format === FORMATS.GEMINI || format === FORMATS.ANTIGRAVITY) {
    result.promptTokenCount = input;
    result.candidatesTokenCount = output;
    result.totalTokenCount = finalizedTotal(result.totalTokenCount, input, output);
  } else {
    result.prompt_tokens = input;
    result.completion_tokens = output;
  }
}
function synchronizeAliases(result: UsageLike, input: number, output: number): void {
  if (result.prompt_tokens !== undefined) result.prompt_tokens = input;
  if (result.completion_tokens !== undefined) result.completion_tokens = output;
  if (result.output_tokens !== undefined) result.output_tokens = output;
}
/** Independently finalize fields: valid input never proves output metering is complete. */
export function finalizeStreamingUsage(
  usage: UsageLike | null | undefined,
  body: unknown,
  contentLength: number,
  targetFormat: string = FORMATS.OPENAI
): UsageLike {
  const result: UsageLike = { ...usage };
  const evidence = deriveUsageEvidence(usage);
  const input = finalizeInput(result, evidence, body);
  const output = finalizeOutput(result, evidence, contentLength);
  projectCounts(result, input, output, targetFormat);
  synchronizeAliases(result, input, output);
  if (result.total_tokens !== undefined || targetFormat === FORMATS.OPENAI)
    result.total_tokens = finalizedTotal(result.total_tokens, input, output);
  result.usage_evidence = evidence;
  if (hasEstimatedUsageEvidence(evidence)) result.estimated = true;
  else delete result.estimated;
  return result;
}
