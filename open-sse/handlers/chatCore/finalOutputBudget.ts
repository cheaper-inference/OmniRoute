/**
 * chatCore final input/output token-budget gate (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from handleChatCore, after every compression pass: run
 * enforceOutputTokenBudget against the concrete target (the context window is bypassed when
 * context-window checks are disabled; the input-token gate arrives already resolved as
 * `effectiveInputCap`), and either reject an over-budget prompt (warn-logged message; the handler
 * finalizes the pending request and returns the 400 `context_length_exceeded` result) or log any
 * adjusted output-token fields and hand back the budgeted body. The model output cap is resolved
 * by the handler (src/lib/modelCapabilities) and passed in, so this engine leaf takes no new
 * open-sse → src import edge.
 */

import { DEFAULT_MAX_TOKENS } from "../../config/constants.ts";
import { FORMATS } from "../../translator/formats.ts";
import { adjustMaxTokens } from "../../translator/helpers/maxTokensHelper.ts";
import { fitThinkingToMaxTokens } from "../../translator/request/openai-to-claude/thinkingBudget.ts";
import { claudeThinkingFromOpenAIRequest } from "../../translator/request/openai-to-claude/thinkingConfig.ts";
import { enforceOutputTokenBudget } from "./outputTokenBudget.ts";

function forcesClaudeToolChoice(choice: unknown): boolean {
  if (choice === "required") return true;
  if (!choice || typeof choice !== "object" || Array.isArray(choice)) return false;
  const record = choice as Record<string, unknown>;
  if (record.type === "allowed_tools") {
    const spec =
      record.allowed_tools && typeof record.allowed_tools === "object"
        ? (record.allowed_tools as Record<string, unknown>)
        : record;
    return spec.mode === "required";
  }
  if (record.type === "required" || record.type === "any") return true;
  if (record.type === "tool") return Boolean(record.name);
  if (record.type === "function")
    return Boolean((record.function as Record<string, unknown> | undefined)?.name);
  return !record.type && Boolean((record.function as Record<string, unknown> | undefined)?.name);
}

/** Reserve output tokens that the OpenAI-to-Claude translator will request after the final gate. */
export function requiredOutputHeadroom(
  body: Record<string, unknown>,
  sourceFormat: string,
  targetFormat: string,
  model?: string,
  provider?: string
): number {
  if (targetFormat !== FORMATS.CLAUDE || sourceFormat === FORMATS.CLAUDE) return 0;
  const hasExplicitLimit = ["max_tokens", "max_completion_tokens"].some((field) => {
    const value = body[field];
    return typeof value === "number" && Number.isFinite(value) && value > 0;
  });
  if (!model || !provider || ["kimi-coding", "kimi-coding-apikey"].includes(provider)) {
    return hasExplicitLimit ? 0 : DEFAULT_MAX_TOKENS;
  }
  const thinking = forcesClaudeToolChoice(body.tool_choice)
    ? undefined
    : claudeThinkingFromOpenAIRequest(body, model).thinking;
  if (!thinking || Number(thinking.budget_tokens) <= 0) {
    return hasExplicitLimit ? 0 : DEFAULT_MAX_TOKENS;
  }
  // The final gate caps an explicit response limit to available room; the
  // translator can then add a fitted thinking budget on top of that limit.
  const translatedMaxTokens = fitThinkingToMaxTokens(
    model,
    adjustMaxTokens(body, { honorExplicitCap: true }),
    thinking,
    provider
  ).maxTokens;
  return hasExplicitLimit ? translatedMaxTokens : Math.max(DEFAULT_MAX_TOKENS, translatedMaxTokens);
}

type LoggerLike =
  { info?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null | undefined;

type RejectedBudget = {
  estimatedInputTokens: number;
  contextLimit: number;
  maxInputTokens?: number;
};

function rejectionMessage(
  budget: RejectedBudget,
  provider: string,
  effectiveModel: string
): string {
  const exceededInputCap = budget.maxInputTokens !== undefined;
  return (
    `Input exceeds ${exceededInputCap ? "maximum input tokens" : "context window"} for ${provider}/${effectiveModel}: ` +
    `estimated ${budget.estimatedInputTokens} input tokens, ${exceededInputCap ? `max input ${budget.maxInputTokens}` : `limit ${budget.contextLimit}`}. ` +
    `Reduce the prompt or route to a model with a larger ${exceededInputCap ? "input limit" : "context window"}.`
  );
}

function claudeOverflowMessage(budget: RejectedBudget): string {
  return `prompt is too long: ${budget.estimatedInputTokens} tokens > ${budget.maxInputTokens ?? budget.contextLimit} maximum`;
}

export function enforceFinalOutputTokenBudget({
  body,
  finalEstimatedInputTokens,
  finalContextLimit,
  contextWindowChecksDisabled,
  modelOutputCap,
  effectiveInputCap,
  provider,
  effectiveModel,
  sourceFormat,
  targetFormat,
  log,
}: {
  body: Record<string, unknown>;
  finalEstimatedInputTokens: number;
  finalContextLimit: number;
  contextWindowChecksDisabled: boolean;
  modelOutputCap: number | null;
  effectiveInputCap: number | null;
  provider: string;
  effectiveModel: string;
  sourceFormat: string;
  targetFormat: string;
  log?: LoggerLike;
}): { ok: false; message: string } | { ok: true; body: Record<string, unknown> } {
  const outputBudget = enforceOutputTokenBudget(
    body as Record<string, unknown>,
    finalEstimatedInputTokens,
    contextWindowChecksDisabled ? Number.MAX_SAFE_INTEGER : finalContextLimit,
    targetFormat === FORMATS.CLAUDE && sourceFormat !== FORMATS.CLAUDE ? DEFAULT_MAX_TOKENS : 0,
    modelOutputCap,
    effectiveInputCap
  );
  if (outputBudget.ok === false) {
    const message = rejectionMessage(outputBudget, provider, effectiveModel);
    log?.warn?.("CONTEXT", message);
    // Claude Code compacts only on Anthropic's own overflow wording and reads both counts from it.
    return {
      ok: false,
      message: sourceFormat === FORMATS.CLAUDE ? claudeOverflowMessage(outputBudget) : message,
    };
  }
  if (outputBudget.adjustedFields.length > 0) {
    // A field can also be adjusted by *removal* (invalid/non-positive value), which
    // the cap did not cause — so state the ceiling in effect rather than claiming
    // the cap drove this particular adjustment.
    const modelCapIsBinding =
      modelOutputCap != null && modelOutputCap < outputBudget.availableOutputTokens;
    log?.info?.(
      "CONTEXT",
      `Adjusted invalid or oversized output token fields (${outputBudget.adjustedFields.join(", ")}); ` +
        `${outputBudget.availableOutputTokens} tokens remain for output` +
        (modelCapIsBinding
          ? ` (output ceiling in effect: ${modelOutputCap}, ${provider}/${effectiveModel}'s own cap)`
          : "")
    );
  }
  return { ok: true, body: outputBudget.body };
}
