// Heuristic token estimation constants
const CHARS_PER_TOKEN_SCHEMA = 6; // ~6 chars/token for JSON schemas (more verbose per token)
const MAX_REGEX_ESTIMATE_CHARS = 32 * 1024; // 32 KB threshold for regex sub-word splitting

const inputTokenEstimateCache = new WeakMap<object, number>();

/**
 * Improved token estimation heuristic (no dependency).
 * Splits text on common token boundaries (whitespace, punctuation, camelCase)
 * and applies a sub-word correction factor. Better accuracy for:
 * - English text (~4 chars/token)
 * - CJK text (~1 char/token for ideographs)
 * - Code (~3.5 chars/token, more punctuation-heavy)
 *
 * For very large text (>32KB), running regex split with lookbehinds allocates
 * hundreds of thousands of substrings and starves the event loop. In those cases,
 * a fast linear estimate (~3.8 chars/token) is used instead.
 *
 * @param {string} text - Text to estimate tokens for
 * @returns {number} Estimated token count
 */
function estimateTokenCount(text: unknown) {
  if (!text || typeof text !== "string") return 0;
  if (text.length > MAX_REGEX_ESTIMATE_CHARS) {
    return Math.ceil(text.length / 3.8);
  }

  // Count CJK ideographs separately — each is roughly 1 token
  const cjkMatches = text.match(/[　-鿿豈-﫿\u{20000}-\u{2fa1f}]/gu);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;

  // Remove CJK chars for the remaining estimation
  const nonCJK = text.replace(/[　-鿿豈-﫿]/g, " ");

  // Split on token boundaries: whitespace, punctuation, camelCase transitions
  const tokens = nonCJK
    .split(/(\s+|[^\w\s]|(?<=[a-z])(?=[A-Z]))/)
    .filter((t) => t && t.trim().length > 0);

  // Apply sub-word correction: BPE tokenizers often split long words
  // into sub-word pieces, so raw token count underestimates slightly
  const estimatedNonCJK = Math.ceil(tokens.length * 1.3);

  return cjkCount + estimatedNonCJK;
}

/**
 * Estimate input tokens from request body.
 * Separates tool definitions (JSON schemas) from message content
 * for more accurate estimation since JSON schemas are more verbose but
 * compress into fewer tokens than plain text.
 * Memoized via WeakMap so repeated calls across stream chunks do not re-serialize.
 */
export function estimateInputTokens(body: unknown) {
  if (!body || typeof body !== "object") return 0;
  const cached = inputTokenEstimateCache.get(body);
  if (cached !== undefined) return cached;

  const record = body as Record<string, unknown>;

  try {
    let toolTokens = 0;
    let messageTokens = 0;

    // Separate tool definitions from the rest of the body
    if (record.tools && Array.isArray(record.tools)) {
      const toolStr = JSON.stringify(record.tools);
      toolTokens = Math.ceil(toolStr.length / CHARS_PER_TOKEN_SCHEMA);
      // Estimate messages without tools
      const { tools, ...bodyWithoutTools } = record;
      messageTokens = estimateTokenCount(JSON.stringify(bodyWithoutTools));
    } else {
      messageTokens = estimateTokenCount(JSON.stringify(record));
    }

    const total = messageTokens + toolTokens;
    inputTokenEstimateCache.set(body, total);
    return total;
  } catch {
    // Fallback if stringify fails
    return 0;
  }
}

/**
 * Estimate output tokens from content length.
 * Uses improved heuristic when possible, falls back to length-based estimation.
 */
export function estimateOutputTokens(contentLength: number | null | undefined) {
  if (!contentLength || contentLength <= 0) return 0;
  // When we only have a character count, use 4 chars/token with sub-word correction
  return Math.max(1, Math.ceil(contentLength / 3.5));
}
