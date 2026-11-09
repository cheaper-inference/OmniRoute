import { DEFAULT_MAX_TOKENS, DEFAULT_MIN_TOKENS } from "../../config/constants.ts";

export interface AdjustMaxTokensOptions {
  /**
   * Keep a positive explicit client cap (max_tokens / max_completion_tokens) instead of
   * raising it to the tool floor, so e.g. a 1-token prompt-cache warm request stays 1 token.
   */
  honorExplicitCap?: boolean;
}

/**
 * Adjust max_tokens based on request context
 * @param {object} body - Request body
 * @param {AdjustMaxTokensOptions} [options]
 * @returns {number} Adjusted max_tokens
 */
export function adjustMaxTokens(body, options: AdjustMaxTokensOptions = {}) {
  const requestedMaxTokens = body.max_tokens ?? body.max_completion_tokens;
  let maxTokens = requestedMaxTokens || DEFAULT_MAX_TOKENS;
  const hasExplicitCap = typeof requestedMaxTokens === "number" && requestedMaxTokens > 0;

  // Auto-increase for tool calling to prevent truncated arguments
  // Tool calls with large content (like writing files) need more tokens
  if (
    !(options.honorExplicitCap && hasExplicitCap) &&
    body.tools &&
    Array.isArray(body.tools) &&
    body.tools.length > 0
  ) {
    if (maxTokens < DEFAULT_MIN_TOKENS) {
      maxTokens = DEFAULT_MIN_TOKENS;
    }
  }

  return Math.max(1, maxTokens);
}
