import type { RenderResult, CommandDetectionResult } from "./types.ts";
import { NO_RENDER } from "./types.ts";

/**
 * Structural renderer for content-mode search output (`rg -n`, `grep -rn`, a native Grep tool).
 *
 * The listing must be strictly `path:line:text` from the first line to the last (an optional
 * envelope header and pagination footer are allowed and kept verbatim). One line that does not
 * fit (a context separator, a binary-file notice, an I/O error, a Windows drive path whose colon
 * is ambiguous, a blank line) makes the whole listing untrustworthy, and the renderer declines:
 * no partial count is ever emitted.
 *
 * The summary keeps, per file in first-seen order: the path, the total number of matches, the
 * first samples verbatim (line number included) and how many were omitted.
 */

/** Matches shown verbatim per file; the rest of the group is counted, not listed. */
const SAMPLES_PER_FILE = 5;

const MAX_LINE_DIGITS = 9;
const ENVELOPE_HEADER_RE = /^Found \d{1,9} (?:matching )?(?:lines?|matches|match)\b.{0,80}$/;
const ENVELOPE_FOOTER_RE = /^\[Showing results with pagination = [^\]]{0,160}\]$/;

/** Strip one trailing CR, for matching only. */
function bare(line: string): string {
  return line.endsWith("\r") ? line.slice(0, -1) : line;
}

interface MatchLine {
  path: string;
  /** `line:text` exactly as the tool printed it (CR removed). */
  rest: string;
}

/** Linear scan, no regex over the line: `path:digits:text`, the path holds no colon. */
function parseMatchLine(raw: string): MatchLine | null {
  const line = bare(raw);
  const first = line.indexOf(":");
  if (first <= 0) return null;
  let i = first + 1;
  const limit = Math.min(line.length, first + MAX_LINE_DIGITS + 2);
  while (i < limit) {
    const code = line.charCodeAt(i);
    if (code < 48 || code > 57) break;
    i++;
  }
  const digits = i - first - 1;
  if (digits < 1 || digits > MAX_LINE_DIGITS || line[i] !== ":") return null;
  return { path: line.slice(0, first), rest: line.slice(first + 1) };
}

function isEnvelopeHeader(line: string): boolean {
  return ENVELOPE_HEADER_RE.test(bare(line));
}

function isEnvelopeFooter(line: string): boolean {
  return ENVELOPE_FOOTER_RE.test(bare(line));
}

/**
 * Cheap recognition used by the dispatcher: does the text open like a content-mode listing
 * (optionally after the envelope header)? It only looks at the first lines.
 */
export function startsLikeSearchMatches(text: string): boolean {
  const firstEnd = text.indexOf("\n");
  const first = firstEnd === -1 ? text : text.slice(0, firstEnd);
  if (parseMatchLine(first)) return true;
  if (firstEnd === -1 || !isEnvelopeHeader(first)) return false;
  const secondEnd = text.indexOf("\n", firstEnd + 1);
  const second = text.slice(firstEnd + 1, secondEnd === -1 ? text.length : secondEnd);
  return parseMatchLine(second) !== null;
}

interface Group {
  total: number;
  samples: string[];
}

interface ParsedSearch {
  header: string | null;
  footer: string | null;
  groups: Map<string, Group>;
  total: number;
}

function splitEnvelope(lines: string[]): {
  header: string | null;
  footer: string | null;
  from: number;
  to: number;
} {
  let from = 0;
  let to = lines.length;
  let header: string | null = null;
  let footer: string | null = null;
  if (to > 0 && isEnvelopeHeader(lines[0])) {
    header = bare(lines[0]);
    from = 1;
  }
  if (to > from && isEnvelopeFooter(lines[to - 1])) {
    footer = bare(lines[to - 1]);
    to--;
    // one blank separator may sit between the matches and the footer
    if (to > from && bare(lines[to - 1]) === "") to--;
  }
  return { header, footer, from, to };
}

function parseSearch(text: string): ParsedSearch | null {
  const lines = text.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  const { header, footer, from, to } = splitEnvelope(lines);
  const groups = new Map<string, Group>();
  let total = 0;
  for (let i = from; i < to; i++) {
    const match = parseMatchLine(lines[i]);
    if (!match) return null;
    let group = groups.get(match.path);
    if (!group) {
      group = { total: 0, samples: [] };
      groups.set(match.path, group);
    }
    group.total++;
    total++;
    if (group.samples.length < SAMPLES_PER_FILE) group.samples.push(match.rest);
  }
  return total === 0 ? null : { header, footer, groups, total };
}

function renderGroups(groups: Map<string, Group>): string[] {
  const out: string[] = [];
  for (const [file, group] of groups) {
    out.push(`${file} (${group.total})`);
    for (const sample of group.samples) out.push(`  ${sample}`);
    const omitted = group.total - group.samples.length;
    if (omitted > 0) out.push(`  (+${omitted} omitted)`);
  }
  return out;
}

export function renderSearchMatches(
  text: string,
  _detection: CommandDetectionResult
): RenderResult {
  const parsed = parseSearch(text);
  if (!parsed) return NO_RENDER(text);
  const out: string[] = [];
  if (parsed.header) out.push(parsed.header);
  else out.push(`${parsed.total} matches in ${parsed.groups.size} files`);
  out.push(...renderGroups(parsed.groups));
  if (parsed.footer) out.push(parsed.footer);
  return { text: out.join("\n"), changed: true, renderer: "search-matches" };
}
