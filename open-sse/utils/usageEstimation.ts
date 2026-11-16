// Heuristic token estimation constants
const CHARS_PER_TOKEN_SCHEMA = 6; // ~6 chars/token for JSON schemas (more verbose per token)

// Same set as the regex \s (and String.trim) in V8.
function isSpaceCode(c: number) {
  return (
    c === 32 ||
    (c >= 9 && c <= 13) ||
    c === 0xa0 ||
    c === 0x1680 ||
    (c >= 0x2000 && c <= 0x200a) ||
    c === 0x2028 ||
    c === 0x2029 ||
    c === 0x202f ||
    c === 0x205f ||
    c === 0xfeff
  );
}

const CHAR_CJK = 0;
const CHAR_SPACE = 1;
const CHAR_LOWER = 2;
const CHAR_UPPER = 3;
const CHAR_WORD = 4; // digit or underscore
const CHAR_OTHER = 5;

function charKind(c: number) {
  if ((c >= 0x3000 && c <= 0x9fff) || (c >= 0xf900 && c <= 0xfaff)) return CHAR_CJK;
  if (isSpaceCode(c)) return CHAR_SPACE;
  if (c >= 97 && c <= 122) return CHAR_LOWER;
  if (c >= 65 && c <= 90) return CHAR_UPPER;
  if ((c >= 48 && c <= 57) || c === 95) return CHAR_WORD;
  return CHAR_OTHER;
}

// 1 when the high surrogate at `i` starts an astral CJK code point, else 0.
function astralCjkAt(text: string, i: number, c: number) {
  if (c < 0xd800 || c > 0xdbff) return 0;
  const cp = text.codePointAt(i)!;
  return cp >= 0x20000 && cp <= 0x2fa1f ? 1 : 0;
}

/**
 * Improved token estimation heuristic (no dependency).
 * Splits text on common token boundaries (whitespace, punctuation, camelCase)
 * and applies a sub-word correction factor. Better accuracy for:
 * - English text (~4 chars/token)
 * - CJK text (~1 char/token for ideographs)
 * - Code (~3.5 chars/token, more punctuation-heavy)
 *
 * @param {string} text - Text to estimate tokens for
 * @returns {number} Estimated token count
 */
function estimateTokenCount(text: unknown) {
  if (!text || typeof text !== "string") return 0;

  // One pass, no split/filter arrays (a 3 MiB body used to leave ~45 MiB of garbage).
  // Token boundaries: a run of [A-Za-z0-9_] (cut at each lower->UPPER step), or any other
  // non-space UTF-16 unit on its own. A BMP CJK unit counts 1 and acts as a space; an astral
  // CJK code point counts 1 and its two surrogate units still count as punctuation tokens.
  let cjkCount = 0;
  let tokens = 0;
  let inWord = false;
  let prevLower = false;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    const kind = charKind(c);
    if (kind === CHAR_CJK) {
      cjkCount++;
      inWord = false;
    } else if (kind === CHAR_SPACE) {
      inWord = false;
    } else if (kind === CHAR_OTHER) {
      cjkCount += astralCjkAt(text, i, c);
      tokens++;
      inWord = false;
    } else {
      if (!inWord || (prevLower && kind === CHAR_UPPER)) tokens++;
      inWord = true;
    }
    prevLower = kind === CHAR_LOWER;
  }

  // Apply sub-word correction: BPE tokenizers often split long words
  // into sub-word pieces, so raw token count underestimates slightly
  return cjkCount + Math.ceil(tokens * 1.3);
}

/**
 * Estimate input tokens from request body.
 * Separates tool definitions (JSON schemas) from message content
 * for more accurate estimation since JSON schemas are more verbose but
 * compress into fewer tokens than plain text.
 */
export function estimateInputTokens(body: unknown) {
  if (!body || typeof body !== "object") return 0;
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

    return messageTokens + toolTokens;
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
