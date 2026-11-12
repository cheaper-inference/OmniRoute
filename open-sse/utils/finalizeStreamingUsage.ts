import {
  deriveUsageEvidence,
  hasEstimatedUsageEvidence,
  usableTokenCounter,
} from "@/lib/usage/usageEvidence";
import { FORMATS } from "../translator/formats.ts";
import { estimateInputTokens, estimateOutputTokens, type UsageLike } from "./usageTracking.ts";
/** Independently finalize fields: valid input never proves output metering is complete. */
export function finalizeStreamingUsage(
  usage: UsageLike | null | undefined,
  body: unknown,
  contentLength: number,
  targetFormat: string = FORMATS.OPENAI
): UsageLike {
  const result: UsageLike = { ...usage },
    evidence = deriveUsageEvidence(usage);
  const input = result.prompt_tokens ?? result.input_tokens ?? result.promptTokenCount;
  const output = result.completion_tokens ?? result.output_tokens ?? result.candidatesTokenCount;
  let finalInput = usableTokenCounter(input) ? input : 0,
    finalOutput = usableTokenCounter(output) ? output : 0;
  if (evidence.input.source === "unknown") {
    const estimate = estimateInputTokens(body);
    if (estimate > 0) {
      finalInput = estimate;
      evidence.input = { source: "estimated", method: "request_body_heuristic" };
    }
  }
  if (finalOutput === 0 && contentLength > 0) {
    finalOutput = estimateOutputTokens(contentLength);
    evidence.output = { source: "estimated", method: "observed_characters" };
  }
  if (targetFormat === FORMATS.CLAUDE || targetFormat === FORMATS.OPENAI_RESPONSES) {
    result.input_tokens = finalInput;
    result.output_tokens = finalOutput;
  } else if (targetFormat === FORMATS.GEMINI || targetFormat === FORMATS.ANTIGRAVITY) {
    result.promptTokenCount = finalInput;
    result.candidatesTokenCount = finalOutput;
    result.totalTokenCount = finalInput + finalOutput;
  } else {
    result.prompt_tokens = finalInput;
    result.completion_tokens = finalOutput;
  }
  if (result.completion_tokens !== undefined) result.completion_tokens = finalOutput;
  if (result.output_tokens !== undefined) result.output_tokens = finalOutput;
  if (result.total_tokens !== undefined || targetFormat === FORMATS.OPENAI)
    result.total_tokens = finalInput + finalOutput;
  result.usage_evidence = evidence;
  if (hasEstimatedUsageEvidence(evidence)) result.estimated = true;
  else delete result.estimated;
  return result;
}
