import { identicalRunLength } from "../deduplicator.ts";
import { severityPattern } from "../severityVocabulary.ts";
import { NO_RENDER } from "./types.ts";
import type { CommandDetectionResult, RenderResult } from "./types.ts";

/**
 * Structural renderer for `docker logs` / `docker compose logs` (opt-in, see structural.ts).
 *
 * It collapses runs of IDENTICAL, CONSECUTIVE, ROUTINE single-line records and says how many
 * lines it dropped: the first line of the run stays, followed by `[N repetições omitidas]`.
 * Everything else is copied verbatim, in order:
 *
 *  - diagnostic levels (warn, error, fatal, ...) even when identical and consecutive;
 *  - routine lines that mention a failure word or carry a result (started, finished, ...);
 *  - continuation lines (stack frames, payloads, blank lines, the compose header);
 *  - a routine record that owns continuation lines, because it is not a single-line record.
 *
 * A burst is never merged with another one: any line between two runs, however small, ends the
 * first. When the input already holds a line shaped like the omission marker the text is
 * ambiguous and is returned untouched. The run counter is the one the legacy deduplicator uses.
 */

const RENDERER_NAME = "repeated-logs";
/** Shorter runs would save nothing once the marker line is paid for. */
const MIN_COLLAPSED_RUN = 3;

const ROUTINE_LEVELS = new Set(["TRACE", "DEBUG", "INFO", "NOTICE"]);

// Every repetition below is bounded and the pieces cannot overlap, so a hostile line costs
// O(line length) at most.
const COMPOSE_PREFIX_RE = /^[\w.-]{1,64} {1,32}\| ?/;
const TIMESTAMP_RE =
  /^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}(?:[.,]\d{1,9})?(?:Z|[+-]\d{2}:?\d{2})?[ \t]{1,8}/;
const LEVEL_RE =
  /^\[?(TRACE|DEBUG|INFO|NOTICE|WARNING|WARN|ERROR|ERR|FATAL|CRITICAL|PANIC|SEVERE)\]?(?=[\s:|-]|$)/i;
const MARKER_RE = /^\[\d{1,9} repetições omitidas\]$/;
const RESULT_RE =
  /\b(?:result|started|starting|listening|ready|completed?|finished|succe(?:ss|eded|ssful(?:ly)?)|done|exit(?:ed|ing)?|stopped|shutdown|shutting down|passed|summary|total)\b/i;

const SEVERITY = severityPattern();

function withoutCr(line: string): string {
  return line.endsWith("\r") ? line.slice(0, -1) : line;
}

/** The upper-cased level when the line opens a log record, else null (a continuation line). */
function recordLevel(line: string): string | null {
  let rest = withoutCr(line);
  const prefix = COMPOSE_PREFIX_RE.exec(rest);
  if (prefix) rest = rest.slice(prefix[0].length);
  const stamp = TIMESTAMP_RE.exec(rest);
  if (stamp) rest = rest.slice(stamp[0].length);
  const level = LEVEL_RE.exec(rest);
  return level ? level[1].toUpperCase() : null;
}

/** A routine record that carries neither a diagnostic word nor a result. */
function isCollapsible(line: string): boolean {
  const level = recordLevel(line);
  if (level === null || !ROUTINE_LEVELS.has(level)) return false;
  return !SEVERITY.test(line) && !RESULT_RE.test(line);
}

/** How many leading lines of the run starting at `start` may be collapsed. */
function collapsibleRunLength(lines: string[], start: number): number {
  const run = identicalRunLength(lines, start);
  const after = start + run;
  // Only the last member can own continuation lines: every other one is followed by an
  // identical record line. Such a record is multi-line, so it stays out of the run.
  const ownsContinuation = after < lines.length && recordLevel(lines[after]) === null;
  return ownsContinuation ? run - 1 : run;
}

export function renderRepeatedLogs(text: string, _detection: CommandDetectionResult): RenderResult {
  const lines = text.split("\n");
  if (lines.some((line) => MARKER_RE.test(withoutCr(line)))) return NO_RENDER(text);

  const out: string[] = [];
  let changed = false;
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    const run = isCollapsible(line) ? collapsibleRunLength(lines, index) : 1;
    if (run < MIN_COLLAPSED_RUN) {
      out.push(line);
      index++;
      continue;
    }
    out.push(line, `[${run - 1} repetições omitidas]`);
    changed = true;
    index += run;
  }
  return changed ? { text: out.join("\n"), changed, renderer: RENDERER_NAME } : NO_RENDER(text);
}
