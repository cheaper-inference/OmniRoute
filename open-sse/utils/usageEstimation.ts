// Heuristic token estimation constants
const CHARS_PER_TOKEN_SCHEMA = 6; // ~6 chars/token for JSON schemas (more verbose per token)
const MAX_REGEX_ESTIMATE_CHARS = 32 * 1024; // 32 KB threshold for regex sub-word splitting

/**
 * Linear token estimate for long text: one token per CJK ideograph (the ranges of the CJK
 * pattern in estimateTokenCount) and ~3.8 characters per token for everything else.
 */
function estimateLongTextTokens(text: string): number {
  let cjkChars = 0;
  let cjkCodeUnits = 0;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if ((code >= 0x3000 && code <= 0x9fff) || (code >= 0xf900 && code <= 0xfaff)) {
      cjkChars += 1;
      cjkCodeUnits += 1;
    } else if (code >= 0xd840 && code <= 0xd87e) {
      // U+20000..U+2FA1F arrive as a surrogate pair.
      const codePoint = text.codePointAt(i) ?? 0;
      if (codePoint >= 0x20000 && codePoint <= 0x2fa1f) {
        cjkChars += 1;
        cjkCodeUnits += 2;
        i += 1;
      }
    }
  }
  return cjkChars + Math.ceil((text.length - cjkCodeUnits) / 3.8);
}

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
 * estimateLongTextTokens() makes one linear pass instead.
 *
 * @param {string} text - Text to estimate tokens for
 * @returns {number} Estimated token count
 */
function estimateTokenCount(text: unknown) {
  if (!text || typeof text !== "string") return 0;
  if (text.length > MAX_REGEX_ESTIMATE_CHARS) return estimateLongTextTokens(text);

  // Count CJK ideographs separately — each is roughly 1 token
  const cjkMatches = text.match(/[\u3000-\u9fff\uf900-\ufaff\u{20000}-\u{2fa1f}]/gu);
  const cjkCount = cjkMatches ? cjkMatches.length : 0;

  // Remove CJK chars for the remaining estimation
  const nonCJK = text.replace(/[\u3000-\u9fff\uf900-\ufaff]/g, " ");

  // Split on token boundaries: whitespace, punctuation, camelCase transitions
  const tokens = nonCJK
    .split(/(\s+|[^\w\s]|(?<=[a-z])(?=[A-Z]))/)
    .filter((t) => t && t.trim().length > 0);

  // Apply sub-word correction: BPE tokenizers often split long words
  // into sub-word pieces, so raw token count underestimates slightly
  const estimatedNonCJK = Math.ceil(tokens.length * 1.3);

  return cjkCount + estimatedNonCJK;
}

// #20086: callers outside the stream (cursor executor, finalizeStreamingUsage, estimateUsage)
// re-estimated the whole request body on every call. Memoize per body object; entries go
// away with the body.
const estimatedInputTokensCache = new WeakMap<object, number>();

/**
 * Estimate input tokens from request body.
 * Separates tool definitions (JSON schemas) from message content
 * for more accurate estimation since JSON schemas are more verbose but
 * compress into fewer tokens than plain text.
 */
export function estimateInputTokens(body: unknown) {
  if (!body || typeof body !== "object") return 0;
  const cached = estimatedInputTokensCache.get(body);
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

    const result = messageTokens + toolTokens;
    estimatedInputTokensCache.set(body, result);
    return result;
  } catch {
    // Fallback if stringify fails
    estimatedInputTokensCache.set(body, 0);
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
