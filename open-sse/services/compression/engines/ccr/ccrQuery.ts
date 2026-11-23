/**
 * ccrQuery.ts — ranged/grep/stats retrieval over a CCR block (pure).
 *
 * `full`/absent → whole text (backward-compat). All modes are fail-safe:
 * incoherent params or an unsafe regex yield { error }, never throw. The grep
 * mode validates the pattern with `safe-regex` (no nested quantifiers), allows at
 * most one unbounded quantifier, bounds matches/pattern length, and runs the scan
 * under a wall-clock budget (CodeQL #1349): a caller-supplied pattern can still be
 * super-linear (`.*x` is quadratic per line), so the budget is the hard bound.
 */
import vm from "node:vm";
import safeRegex from "safe-regex";

export type CcrMode = "full" | "head" | "tail" | "lines" | "grep" | "stats";

export interface CcrQuery {
  mode?: CcrMode;
  n?: number;
  start?: number;
  end?: number;
  pattern?: string;
  unique?: boolean;
}

export type CcrQueryResult = { content: string } | { error: string };

export const MAX_RANGE_LINES = 10_000;
export const MAX_GREP_MATCHES = 1_000;
export const MAX_PATTERN_LEN = 512;
/** Wall-clock budget for one grep scan over a block (ms). */
export const GREP_TIME_BUDGET_MS = 1_000;

const err = (m: string): CcrQueryResult => ({ error: m });
const ok = (c: string): CcrQueryResult => ({ content: c });

function clampCount(n: number | undefined): number | null {
  if (typeof n !== "number" || !Number.isFinite(n) || n < 1) return null;
  return Math.min(Math.floor(n), MAX_RANGE_LINES);
}

function sliceHead(lines: string[], n: number | undefined): CcrQueryResult {
  const c = clampCount(n);
  if (c === null) return err("head requires a positive 'n'");
  return ok(lines.slice(0, c).join("\n"));
}

function sliceTail(lines: string[], n: number | undefined): CcrQueryResult {
  const c = clampCount(n);
  if (c === null) return err("tail requires a positive 'n'");
  return ok(lines.slice(Math.max(0, lines.length - c)).join("\n"));
}

function sliceLines(lines: string[], start?: number, end?: number): CcrQueryResult {
  if (typeof start !== "number" || typeof end !== "number" || start < 1 || end < 1) {
    return err("lines requires positive 'start' and 'end' (1-indexed)");
  }
  if (start > end) return err("lines: 'start' must be <= 'end'");
  return ok(lines.slice(start - 1, Math.min(end, lines.length)).join("\n"));
}

/**
 * Number of unbounded quantifiers (`*`, `+`, `{n,}`) outside character classes and
 * escapes. Two or more in sequence make the backtracking polynomial in the line length
 * (`.*.*.*.*x` is O(n^4)), which `safe-regex`'s star-height check does not catch.
 */
export function countUnboundedQuantifiers(pattern: string): number {
  let count = 0;
  let i = 0;
  while (i < pattern.length) {
    const c = pattern[i];
    if (c === "\\") {
      i += 2;
    } else if (c === "[") {
      i = classEnd(pattern, i);
    } else {
      if (c === "*" || c === "+" || (c === "{" && isOpenRange(pattern, i))) count++;
      i++;
    }
  }
  return count;
}

/** Index just past the character class that opens at `start` (escapes honoured). */
function classEnd(pattern: string, start: number): number {
  let i = start + 1;
  while (i < pattern.length && pattern[i] !== "]") i += pattern[i] === "\\" ? 2 : 1;
  return i + 1;
}

/** True when an open range quantifier `{n,}` starts at `start`. */
function isOpenRange(pattern: string, start: number): boolean {
  let j = start + 1;
  while (j < pattern.length && pattern[j] >= "0" && pattern[j] <= "9") j++;
  return j > start + 1 && pattern[j] === "," && pattern[j + 1] === "}";
}

// The scan runs in a dedicated context only so `timeout` can stop a runaway regex.
// No host object enters it: inputs are primitives, the result leaves as a JSON string.
const GREP_SCRIPT = new vm.Script(`(() => {
  "use strict";
  let re;
  try { re = new RegExp(grepPattern); } catch { return JSON.stringify({ invalid: true }); }
  const matched = [];
  let truncated = false;
  for (const line of grepText.split("\\n")) {
    if (re.test(line)) {
      matched.push(line);
      if (matched.length >= grepMaxMatches) { truncated = true; break; }
    }
  }
  return JSON.stringify({ matched, truncated });
})()`);
let grepContext: vm.Context | null = null;

function runGrepScan(
  text: string,
  pattern: string
): { matched: string[]; truncated: boolean } | "invalid" | "timeout" {
  grepContext ??= vm.createContext(Object.create(null), {
    codeGeneration: { strings: false, wasm: false },
  });
  grepContext.grepPattern = pattern;
  grepContext.grepText = text;
  grepContext.grepMaxMatches = MAX_GREP_MATCHES;
  let raw: unknown;
  try {
    raw = GREP_SCRIPT.runInContext(grepContext, { timeout: GREP_TIME_BUDGET_MS });
  } catch (e) {
    if ((e as { code?: string })?.code === "ERR_SCRIPT_EXECUTION_TIMEOUT") return "timeout";
    throw e;
  } finally {
    grepContext.grepText = "";
    grepContext.grepPattern = "";
  }
  const parsed = JSON.parse(String(raw)) as {
    invalid?: boolean;
    matched?: string[];
    truncated?: boolean;
  };
  if (parsed.invalid === true) return "invalid";
  return { matched: parsed.matched ?? [], truncated: parsed.truncated === true };
}

function grepLines(text: string, pattern?: string, unique?: boolean): CcrQueryResult {
  if (!pattern) return err("grep requires a 'pattern'");
  if (pattern.length > MAX_PATTERN_LEN) return err(`pattern exceeds ${MAX_PATTERN_LEN} chars`);
  if (!safeRegex(pattern)) return err("pattern rejected: potentially catastrophic backtracking");
  if (countUnboundedQuantifiers(pattern) > 1) {
    return err("pattern rejected: at most one unbounded quantifier (*, +, {n,}) is allowed");
  }
  const scan = runGrepScan(text, pattern);
  if (scan === "invalid") return err("invalid regex pattern");
  if (scan === "timeout") {
    return err(`grep exceeded its ${GREP_TIME_BUDGET_MS} ms time budget; use a narrower pattern`);
  }
  const out = unique ? [...new Set(scan.matched)] : scan.matched;
  const body = out.join("\n");
  return ok(scan.truncated ? `${body}\n…[truncated at ${MAX_GREP_MATCHES} matches]` : body);
}

function blockStats(text: string, lines: string[]): CcrQueryResult {
  return ok(
    JSON.stringify({
      lines: lines.length,
      chars: text.length,
      bytes: Buffer.byteLength(text, "utf8"),
    })
  );
}

export function queryBlock(text: string, q: CcrQuery): CcrQueryResult {
  const mode = q.mode ?? "full";
  if (mode === "full") return ok(text);
  const lines = text.split("\n");
  switch (mode) {
    case "head":
      return sliceHead(lines, q.n);
    case "tail":
      return sliceTail(lines, q.n);
    case "lines":
      return sliceLines(lines, q.start, q.end);
    case "grep":
      return grepLines(text, q.pattern, q.unique);
    case "stats":
      return blockStats(text, lines);
    default:
      return err(`unknown mode: ${String(mode)}`);
  }
}
