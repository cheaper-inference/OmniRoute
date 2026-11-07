import { supportsClaudeMaxEffort, supportsXHighEffort } from "../../../config/providerModels.ts";
import {
  getDefaultThinkingBudget,
  isAdaptiveThinkingOnly,
} from "../../../../src/shared/constants/modelSpecs.ts";

// Reasoning-effort levels Anthropic accepts on `output_config.effort`. Used to steer
// adaptive-only Claude models (Opus 4.7+/Fable 5) without ever emitting a manual budget.
const ADAPTIVE_EFFORT_LEVELS = new Set(["low", "medium", "high", "xhigh", "max"]);

// Safe manual budget when `thinking:{type:"adaptive"}` must be downgraded to the
// compatible manual `type:"enabled"` form for a model that does not support adaptive
// thinking (#10119). 1024 is both Anthropic's MIN thinking budget (thinkingBudget.ts)
// and the `low` effort bucket, conservative for small-context models like Haiku.
const ADAPTIVE_DOWNGRADE_BUDGET = 1024;

const EFFORT_BUDGETS: Record<string, number> = {
  low: 1024,
  medium: 10240,
  high: 131072,
  max: 131072,
};

export interface ClaudeThinkingConfig {
  /** Claude `thinking` object, when the request asks for extended thinking. */
  thinking?: Record<string, unknown>;
  /** Claude `output_config.effort`, set together with adaptive thinking. */
  effort?: string;
}

/**
 * Map an OpenAI-shaped request's `thinking` / `reasoning_effort` to Claude's extended
 * thinking contract. Shared by the OpenAI to Claude translator and the Bedrock Converse
 * executor (which sends the same shape in `additionalModelRequestFields`).
 *
 * The result is the requested budget before it is fitted to the model's output cap;
 * callers run it through `fitThinkingToMaxTokens`.
 */
export function claudeThinkingFromOpenAIRequest(
  body: Record<string, unknown> | null | undefined,
  model: string
): ClaudeThinkingConfig {
  const thinking =
    body?.thinking && typeof body.thinking === "object"
      ? (body.thinking as Record<string, unknown>)
      : null;

  if (thinking) {
    const thinkingType = thinking.type || "enabled";
    if (thinkingType === "adaptive" && !isAdaptiveThinkingOnly(model)) {
      // Downgrade guard (#10119): a request can carry `thinking:{type:"adaptive"}` (the
      // shape built for an adaptive-only sibling such as Opus 4.7+/Sonnet-5 in a combo)
      // and be re-routed by combo/fallback to a model that only accepts manual extended
      // thinking (e.g. claude-haiku-4-5-20251001). Anthropic rejects `adaptive` on those
      // models, so convert to the compatible manual `enabled` form with a safe budget.
      const callerBudget = Number(thinking.budget_tokens);
      const safeBudget =
        (Number.isFinite(callerBudget) && callerBudget > 0 ? callerBudget : 0) ||
        getDefaultThinkingBudget(model) ||
        ADAPTIVE_DOWNGRADE_BUDGET;
      return { thinking: { type: "enabled", budget_tokens: safeBudget } };
    }
    return {
      thinking: {
        type: thinkingType,
        ...(thinking.budget_tokens && { budget_tokens: thinking.budget_tokens }),
        ...(thinking.max_tokens && { max_tokens: thinking.max_tokens }),
      },
    };
  }

  if (!body?.reasoning_effort) return {};

  // Convert OpenAI reasoning_effort to Claude thinking format (#627).
  // Clients like OpenCode send reasoning_effort via @ai-sdk/openai-compatible.
  const requestedEffort = String(body.reasoning_effort).toLowerCase();
  const normalizedEffort =
    requestedEffort === "max" && !supportsClaudeMaxEffort(model)
      ? "high"
      : requestedEffort === "xhigh" && !supportsXHighEffort("claude", model)
        ? "high"
        : requestedEffort;

  if (isAdaptiveThinkingOnly(model)) {
    // Opus 4.7+/Fable 5 removed manual extended thinking: a fixed `budget_tokens`
    // (or `type:"enabled"`) is a hard 400. Steer EVERY level via adaptive +
    // output_config.effort instead of the budget buckets below. Unrecognized levels
    // leave thinking unset so the model keeps its adaptive default rather than 400ing
    // on an invalid effort value.
    return ADAPTIVE_EFFORT_LEVELS.has(normalizedEffort)
      ? { thinking: { type: "adaptive" }, effort: normalizedEffort }
      : {};
  }
  if (normalizedEffort === "max" || normalizedEffort === "xhigh") {
    return { thinking: { type: "adaptive" }, effort: normalizedEffort };
  }
  const budget = EFFORT_BUDGETS[normalizedEffort];
  return budget !== undefined && budget > 0
    ? { thinking: { type: "enabled", budget_tokens: budget } }
    : {};
}
