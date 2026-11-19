import { collapseRepeated } from "./collapseRepeated.ts";
import { MCP_ACCESSIBILITY_TAIL_RESERVE, type McpAccessibilityConfig } from "./constants.ts";

// Per-line (non-global, anchored) noise matchers. Used to DELETE whole noise lines rather than
// blank them: `replace(pattern, "")` would leave empty strings behind, and a blank line between two
// sibling headers breaks collapseRepeated's sibling run (an empty line is neither a sibling header
// nor an indented child), so collapse would never fire on realistic interleaved trees.
const NOISE_LINE_PATTERNS: RegExp[] = [/^\s*-\s*generic:?\s*$/, /^\s*-\s*text:\s*""\s*$/];

function isNoiseLine(line: string): boolean {
  return NOISE_LINE_PATTERNS.some((p) => p.test(line));
}

/**
 * Generic pagination hint for truncated tool results. Deliberately NOT a
 * web-page hint (no "scroll/navigate", no "click an element"): the filter also
 * truncates non-navigable tool output (retrieve results, corpus dumps), where
 * the old wording was wrong. Names the concrete ways to re-run a tool call
 * with a bounded slice: a narrower query, limit/offset pagination, or a
 * `mode` (`"lines"` / `"grep"`) with an offset.
 */
export const MCP_TEXT_TRUNCATION_HINT =
  "The result exceeded the size limit and was truncated. Re-run the same tool call with a bounded " +
  'slice to read the rest: a narrower query, limit/offset pagination, or mode: "lines" / mode: "grep" with an offset.';

/** Mark set on a JSON result (and each truncated block) whose `content` was truncated. */
const MCP_JSON_TRUNCATED_FIELD = "truncated";

type JsonRecord = Record<string, unknown>;

function tryParseMcpJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function isTextBlock(value: unknown): value is { type: string; text: string } {
  return (
    !!value &&
    typeof value === "object" &&
    (value as JsonRecord).type === "text" &&
    typeof (value as JsonRecord).text === "string"
  );
}

/**
 * True when the parsed JSON carries a `content` field the filter can shrink:
 * a plain string, or an array of `{type:"text", text}` blocks. Anything else
 * (absent/other-shaped content) is not truncatable here — the filter must not
 * invent a new shape on an opaque result.
 */
function hasTruncatableContent(value: JsonRecord): boolean {
  const content = value.content;
  if (typeof content === "string") return true;
  if (Array.isArray(content)) {
    return content.length > 0 && content.every((block) => isTextBlock(block));
  }
  return false;
}

/** Shallow copy of the JSON with `content` emptied and the truncation marks applied. */
function buildEnvelope(value: JsonRecord, indented: boolean): number {
  const clone: JsonRecord = { ...value };
  if (typeof clone.content === "string") clone.content = "";
  else if (Array.isArray(clone.content)) {
    clone.content = (clone.content as unknown[]).map((block) =>
      isTextBlock(block) ? { ...block, text: "" } : block
    );
  }
  clone[MCP_JSON_TRUNCATED_FIELD] = true;
  clone.hint = MCP_TEXT_TRUNCATION_HINT;
  return JSON.stringify(clone, null, indented ? 2 : undefined).length ?? 0;
}

function isIndentedJson(text: string): boolean {
  // Compact JSON has no newlines; a newline followed by indentation in the
  // head of the document marks the pretty-printed shape.
  return text.slice(0, 200).includes("\n  ");
}

/**
 * Shrink the `content` field of a shallow clone to fit the budget (a string is
 * cut, each text block gets its even share). Returns `true` when anything was
 * shrunk; the truncation marks are applied on the affected blocks here and on
 * the object by the caller.
 */
function shrinkContentField(clone: JsonRecord, budget: number): boolean {
  let changed = false;
  if (typeof clone.content === "string") {
    if (clone.content.length > budget) {
      clone.content = clone.content.slice(0, budget);
      changed = true;
    }
    return changed;
  }
  const blocks = clone.content as unknown[];
  const share = Math.floor(budget / blocks.length);
  clone.content = blocks.map((block) => {
    if (!isTextBlock(block) || block.text.length <= share) return block;
    changed = true;
    return {
      ...block,
      text: block.text.slice(0, share),
      [MCP_JSON_TRUNCATED_FIELD]: true,
      hint: MCP_TEXT_TRUNCATION_HINT,
    };
  });
  return changed;
}

/** Re-fit attempts when JSON escaping makes the re-serialized result overshoot the budget. */
const MAX_JSON_FIT_ATTEMPTS = 8;

/**
 * Serialize `value` with its `content` shrunk to `budget` and the truncation
 * marks applied. Returns `null` when the content already fits the budget
 * (nothing to shrink).
 */
function serializeShrunk(value: JsonRecord, budget: number, indented: boolean): string | null {
  const clone: JsonRecord = { ...value };
  if (!shrinkContentField(clone, budget)) return null;
  clone[MCP_JSON_TRUNCATED_FIELD] = true;
  clone.hint = MCP_TEXT_TRUNCATION_HINT;
  const serialized = JSON.stringify(clone, null, indented ? 2 : undefined);
  return typeof serialized === "string" ? serialized : null;
}

/**
 * JSON-aware truncation of a tool result: shrink the `content` field (string,
 * or the `text` of every text block) so the RE-SERIALIZED JSON fits
 * `maxTextChars`, set `truncated: true` + the generic `hint` on the object and
 * on each truncated block, and return the new string. JSON escaping can make
 * the re-serialized text longer than the kept chars, so the budget shrinks by
 * the overshoot until it fits. Returns `null` when the result has no
 * truncatable `content`, or when shrinking `content` cannot bring it under the
 * limit (its other fields alone are too large) — the caller then falls back to
 * the bounded preview envelope. The output is always valid JSON — a raw slice
 * of a JSON string is never produced.
 */
function truncateJsonContent(
  text: string,
  parsed: unknown,
  config: McpAccessibilityConfig
): string | null {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  const value = parsed as JsonRecord;
  if (!hasTruncatableContent(value)) return null;

  const indented = isIndentedJson(text);
  let budget = Math.max(0, config.maxTextChars - buildEnvelope(value, indented));
  for (let attempt = 0; attempt < MAX_JSON_FIT_ATTEMPTS; attempt++) {
    const serialized = serializeShrunk(value, budget, indented);
    if (serialized === null) return null;
    if (serialized.length <= config.maxTextChars) return serialized;
    if (budget === 0) return null;
    budget = Math.max(0, budget - (serialized.length - config.maxTextChars));
  }
  return null;
}

/**
 * Bounded, valid envelope for an oversized JSON result that cannot be shrunk in
 * place (no truncatable `content` — e.g. a large array or catalog object — or
 * sibling fields that alone exceed the limit): `{ truncated, hint,
 * originalChars, preview }`, where `preview` is the head of the raw JSON text
 * carried as a string. Stays valid JSON and within `maxTextChars`, so a large
 * result never reaches the model unbounded.
 */
function buildJsonPreviewEnvelope(text: string, config: McpAccessibilityConfig): string {
  const build = (keep: number) =>
    JSON.stringify({
      [MCP_JSON_TRUNCATED_FIELD]: true,
      hint: MCP_TEXT_TRUNCATION_HINT,
      originalChars: text.length,
      preview: text.slice(0, keep),
    });
  let keep = Math.max(0, config.maxTextChars - build(0).length);
  let out = build(keep);
  // Escaping (quotes, backslashes, newlines) expands the preview: drop the overshoot.
  while (out.length > config.maxTextChars && keep > 0) {
    keep = Math.max(0, keep - (out.length - config.maxTextChars));
    out = build(keep);
  }
  return out;
}

/**
 * Plain-text path of `smartFilterText`: drop noise lines, collapse sibling
 * runs, and when the result is still over budget keep a bounded head plus a
 * truncation notice carrying the generic hint.
 */
function filterPlainText(text: string, config: McpAccessibilityConfig): string {
  // Drop noise lines entirely (not blank them) so interleaved noise does not split sibling runs.
  let out = text
    .split("\n")
    .filter((line) => !isNoiseLine(line))
    .join("\n");
  out = collapseRepeated(
    out,
    config.collapseThreshold,
    config.collapseKeepHead,
    config.collapseKeepTail
  );

  if (out.length > config.maxTextChars) {
    // Clamp to >=0: a maxTextChars below the tail reservation would make headSize negative, and
    // slice(0, negative) counts from the END — silently keeping a wrong, oversized fragment
    // instead of the intended head. (clampMcpAccessibilityConfig keeps maxTextChars sane, but
    // smartFilterText is also called with raw configs in tests, so the clamp stays here too.)
    const headSize = Math.max(0, config.maxTextChars - MCP_ACCESSIBILITY_TAIL_RESERVE);
    const head = out.slice(0, headSize);
    // Measure omitted against the FILTERED text (out), not the raw input (text), which may
    // have shrunk via noise removal / collapse above.
    const omitted = out.length - head.length;
    out =
      `${head}\n\n... [truncated ${omitted} chars by OmniRoute MCP filter. ` +
      `${MCP_TEXT_TRUNCATION_HINT}`;
  }
  return out;
}

export function smartFilterText(text: string, config: McpAccessibilityConfig): string {
  if (typeof text !== "string" || text.length < config.minLengthToProcess) {
    return text;
  }

  if (text.length > config.maxTextChars) {
    // JSON-aware path: a valid JSON tool result must stay valid. Parse the RAW
    // text (before the line pipeline — noise/collapse would otherwise corrupt
    // it), shrink its `content` field, and re-serialize. A JSON result that
    // cannot be shrunk in place gets the bounded preview envelope: the filter
    // must never turn a valid JSON into an unparseable slice, nor let it through
    // unbounded.
    const parsed = tryParseMcpJson(text);
    if (parsed !== null) {
      return truncateJsonContent(text, parsed, config) ?? buildJsonPreviewEnvelope(text, config);
    }
  }

  return filterPlainText(text, config);
}

/**
 * `true` when the text block (already filtered) is a JSON result carrying the
 * `truncated` mark set by the JSON path of `smartFilterText` — i.e. the text
 * view of this result is a bounded slice, not the full content.
 */
function jsonBlockIsTruncated(block: unknown): boolean {
  if (!block || typeof block !== "object" || (block as JsonRecord).type !== "text") return false;
  const text = (block as JsonRecord).text;
  if (typeof text !== "string") return false;
  const parsed = tryParseMcpJson(text);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return false;
  return (parsed as JsonRecord)[MCP_JSON_TRUNCATED_FIELD] === true;
}

/**
 * Keep `structuredContent` consistent with the text blocks the filter just
 * rewrote. A text block that was JSON-truncated carries `truncated: true`
 * (set by `smartFilterText`); when the result also ships a `structuredContent`
 * object, that view would otherwise still claim the full content — two truths
 * for one result. Re-parse the filtered text (at most once per block, and only
 * when a `structuredContent` object is present) and mirror the mark onto
 * `structuredContent` when the JSON-truncated brand is found. `isError` and
 * every other field are untouched. A failed parse (text path) or a missing
 * brand leaves the result as-is: the text stays human-readable and there is no
 * divergence to signal.
 */
export function propagateTruncationToStructuredContent(result: {
  content?: unknown;
  structuredContent?: unknown;
  [key: string]: unknown;
}): typeof result {
  if (!result || typeof result !== "object") return result;
  const structured = result.structuredContent;
  if (!structured || typeof structured !== "object" || Array.isArray(structured)) {
    return result;
  }
  const blocks = Array.isArray(result.content) ? (result.content as unknown[]) : [];
  if (blocks.some((block) => jsonBlockIsTruncated(block))) {
    (structured as JsonRecord)[MCP_JSON_TRUNCATED_FIELD] = true;
    (structured as JsonRecord).hint = MCP_TEXT_TRUNCATION_HINT;
  }
  return result;
}

export type { McpAccessibilityConfig } from "./constants.ts";
export {
  DEFAULT_MCP_ACCESSIBILITY_CONFIG,
  clampMcpAccessibilityConfig,
  MCP_ACCESSIBILITY_TAIL_RESERVE,
} from "./constants.ts";
