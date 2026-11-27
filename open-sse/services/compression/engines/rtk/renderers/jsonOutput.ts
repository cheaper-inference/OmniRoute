import type { CommandDetectionResult } from "../commandDetector.ts";
import { NO_RENDER, type RenderResult } from "./types.ts";

/**
 * Structural JSON renderer (opt-in; see structural.ts).
 *
 * It compacts one whole JSON document by removing the whitespace that sits between tokens, and
 * nothing else: no re-serialisation, so key order, duplicate keys, number lexemes (an id past
 * 2^53 keeps every digit, `1.50` stays `1.50`) and string escapes come out exactly as they went
 * in. `JSON.parse` only validates; its value is never used to build the output.
 *
 * A text that is not one valid document, or that has no whitespace to remove, is declined
 * (`changed: false`) and the caller keeps the original. Size limits are the dispatcher's job:
 * this function is never reached for an input over the analysis budget.
 */

const QUOTE = 0x22;
const BACKSLASH = 0x5c;

function isJsonSpace(code: number): boolean {
  return code === 0x20 || code === 0x0a || code === 0x0d || code === 0x09;
}

/** Index just past the string that opens at `from` (a validated document has no open string). */
function skipString(text: string, from: number): number {
  let i = from + 1;
  while (i < text.length) {
    const code = text.charCodeAt(i);
    if (code === QUOTE) return i + 1;
    i += code === BACKSLASH ? 2 : 1;
  }
  return i;
}

/** Linear scan over a text already validated by JSON.parse: drops the four JSON space characters outside strings. */
function stripStructuralWhitespace(text: string): string {
  const parts: string[] = [];
  let kept = 0;
  let i = 0;
  while (i < text.length) {
    const code = text.charCodeAt(i);
    if (code === QUOTE) {
      i = skipString(text, i);
    } else if (isJsonSpace(code)) {
      if (i > kept) parts.push(text.slice(kept, i));
      while (i < text.length && isJsonSpace(text.charCodeAt(i))) i++;
      kept = i;
    } else {
      i++;
    }
  }
  if (kept < text.length) parts.push(text.slice(kept));
  return parts.join("");
}

function isValidJsonDocument(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

export function renderJsonOutput(text: string, _detection: CommandDetectionResult): RenderResult {
  if (!isValidJsonDocument(text)) return NO_RENDER(text);
  const compact = stripStructuralWhitespace(text);
  if (compact.length >= text.length) return NO_RENDER(text);
  return { text: compact, changed: true, renderer: "json-compact" };
}

const JSON_CAT_RE = /^cat\s+.*\.json\b/i;
const AWS_COMMAND_RE = /^aws\b/i;
const AWS_OUTPUT_FLAG_RE = /(?:^|\s)--output(?:=|\s+)(\S+)/i;

/**
 * The structural format a command produces JSON for, or null. `jq` and `cat x.json` print JSON by
 * construction; `aws` prints JSON unless its `--output` flag names another format. The name is the
 * same one the legacy detector uses, so the `renderers` allowlist reads the same on both paths.
 */
export function jsonCommandType(command: string): "json-output" | "aws" | null {
  if (/^jq\b/i.test(command) || JSON_CAT_RE.test(command)) return "json-output";
  if (!AWS_COMMAND_RE.test(command)) return null;
  const format = AWS_OUTPUT_FLAG_RE.exec(command)?.[1]?.replace(/^["']|["']$/g, "");
  return format === undefined || format.toLowerCase() === "json" ? "aws" : null;
}

/** Cheap pre-check, no body scan: true when the first non-space character opens an object or array. */
export function startsLikeJsonContainer(text: string): boolean {
  let i = 0;
  while (i < text.length && isJsonSpace(text.charCodeAt(i))) i++;
  const code = text.charCodeAt(i);
  return code === 0x7b || code === 0x5b;
}
