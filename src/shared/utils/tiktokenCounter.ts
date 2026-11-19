import type { Tiktoken } from "js-tiktoken";
import { createRequire } from "module";

const _require = createRequire(import.meta.url);

export type TokenizerEncoding = "cl100k_base" | "o200k_base";

export interface TokenizerContext {
  provider?: string | null;
  model?: string | null;
}

export function tokenizerContextFromBody(body: unknown): TokenizerContext {
  if (!body || typeof body !== "object" || Array.isArray(body)) return {};
  const record = body as Record<string, unknown>;
  return {
    provider: typeof record.provider === "string" ? record.provider : undefined,
    model: typeof record.model === "string" ? record.model : undefined,
  };
}

const encoders = new Map<TokenizerEncoding, Tiktoken>();

/**
 * Above this many characters the exact tokenizer is skipped in favor of the linear estimate.
 * js-tiktoken's pure-JS encoder runs synchronously on the event loop and is slow enough that a
 * few tens of KB of ordinary text already cost seconds on a loaded host — a 10 MB base64 image
 * payload blocked it for tens of seconds (OmniRoute worker wedge incident). Token counting feeds
 * estimates and compression budgets, so an estimate on larger input keeps the loop responsive.
 */
export const MAX_EXACT_TOKEN_COUNT_CHARS = 8_000;

/**
 * The encoder is quadratic in the length of one pre-tokenizer piece: a run of letters, digits,
 * whitespace or punctuation. 8,000 spaces or `!` took over a minute. Longer runs get the estimate.
 */
export const MAX_EXACT_RUN_CHARS = 32;

/** Non-ASCII text (CJK above all) is several times slower to encode than ASCII. */
export const MAX_EXACT_NON_ASCII_CHARS = 1_000;

// One pass over the same piece classes the cl100k/o200k pre-tokenizer splits on. Each
// alternative is a single character class, so matching stays linear.
const PIECE_RE = /\p{L}+|\p{N}+|\s+|[^\p{L}\p{N}\s]+/gu;
const NON_ASCII_RE = /[^\x00-\x7f]/g;

function hasLongPiece(text: string): boolean {
  for (const match of text.matchAll(PIECE_RE)) {
    if (match[0].length > MAX_EXACT_RUN_CHARS) return true;
  }
  return false;
}

/**
 * Linear estimate: ASCII text averages about four characters per token, while CJK and other
 * non-ASCII characters are close to one token each (an overcount for accented Latin, which only
 * reaches this path when the text is already too costly to encode exactly).
 */
function estimateTokens(text: string, nonAsciiChars: number): number {
  return Math.ceil((text.length - nonAsciiChars) / 4 + nonAsciiChars);
}

/**
 * Base64 data URIs (e.g. OpenAI-style `image_url.url`) must not be tokenized:
 * they are image payloads, not text. Matching a data URI of any `image/*`
 * media type and stripping it keeps the count accurate (the raw bytes of an
 * image are not meaningful "text" tokens) while avoiding the quadratic encode
 * cost on large attachments.
 */
const BASE64_DATA_URI_RE = /data:image\/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]+/gi;

function stripBase64DataUris(text: string): string {
  return text.replace(BASE64_DATA_URI_RE, "");
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

export function isCodexTokenizerContext(context?: TokenizerContext): boolean {
  const provider = normalize(context?.provider);
  const model = normalize(context?.model);
  return (
    provider === "codex" ||
    provider === "cx" ||
    model.startsWith("codex/") ||
    model.startsWith("cx/") ||
    model.includes("codex")
  );
}

export function resolveTokenizerEncoding(context?: TokenizerContext): TokenizerEncoding {
  return isCodexTokenizerContext(context) ? "o200k_base" : "cl100k_base";
}

function getEncoder(encoding: TokenizerEncoding): Tiktoken {
  const cached = encoders.get(encoding);
  if (cached) return cached;
  let tiktoken: { getEncoding: (name: string) => Tiktoken } | null = null;
  try {
    tiktoken ??= _require("js-tiktoken") as { getEncoding: (name: string) => Tiktoken };
    const created = tiktoken.getEncoding(encoding);
    encoders.set(encoding, created);
    return created;
  } catch {
    throw new Error(`js-tiktoken not available: cannot create encoder for ${encoding}`);
  }
}

/**
 * Exact token count for a string using the selected offline tokenizer.
 * Existing callers retain cl100k_base; Codex callers may pass provider/model context
 * to use o200k_base.
 * Defensive: never throws in a counting path — falls back to the linear estimate.
 * Base64 image data URIs are never tokenized, and input that is too large, too long in one
 * piece or too heavy in non-ASCII text gets the estimate: the encoder runs on the event loop
 * (worker wedge regression).
 */
export function countTextTokens(text: string, context?: TokenizerContext): number {
  if (!text || typeof text !== "string") return 0;
  const stripped = stripBase64DataUris(text);
  if (stripped.length > MAX_EXACT_TOKEN_COUNT_CHARS) {
    return estimateTokens(stripped, stripped.match(NON_ASCII_RE)?.length ?? 0);
  }
  const nonAsciiChars = stripped.match(NON_ASCII_RE)?.length ?? 0;
  if (nonAsciiChars > MAX_EXACT_NON_ASCII_CHARS || hasLongPiece(stripped)) {
    return estimateTokens(stripped, nonAsciiChars);
  }
  try {
    return getEncoder(resolveTokenizerEncoding(context)).encode(stripped).length;
  } catch {
    return estimateTokens(stripped, nonAsciiChars);
  }
}
