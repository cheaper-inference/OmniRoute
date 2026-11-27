import type { RenderResult, CommandDetectionResult } from "./types.ts";
import { NO_RENDER } from "./types.ts";

/**
 * RTK semantic renderer for test suite output (pytest, jest, vitest, eslint).
 *
 * CRITICAL safety guard: only collapses when output indicates TOTAL success.
 * ANY sign of failure forces a no-op to preserve full diagnostics.
 *
 * Failure signals (force no-op):
 *  - /\bFAIL\b/ in the text
 *  - /failed/i paired with a nonzero count (e.g. "1 failed")
 *  - ✖ symbol
 *  - "Error" anywhere
 *  - "Traceback" (Python)
 *  - "AssertionError"
 *
 * When green, extract the summary line and return it.
 * If no recognizable summary line is found, no-op.
 */
export function renderTestGreen(text: string, _detection: CommandDetectionResult): RenderResult {
  // Strip ANSI color codes before applying the failure guards. jest/vitest emit a
  // colored "FAIL" status whose preceding ANSI byte ("m" of [31m) is a word
  // character, defeating a /\bFAIL\b/ boundary on the raw string. Guards run on the
  // stripped copy; the original `text` is what we return on a no-op (lossless).
  const stripped = text.replace(/\[[0-9;]*m/g, "");

  // Failure guard — must check FIRST; never weaken
  if (hasFailureSignal(stripped)) return NO_RENDER(text);

  // Try to extract a recognised summary line (from the stripped copy → ANSI-free)
  const summary = extractSummaryLine(stripped);
  if (!summary) return NO_RENDER(text);

  return { text: summary, changed: true, renderer: "test-green" };
}

/**
 * The failure guards shared by both test renderers. `stripped` must already be ANSI-free.
 * Never weaken: any sign of failure means the output has to stay whole.
 */
export function hasFailureSignal(stripped: string): boolean {
  if (/\bFAIL\b/.test(stripped)) return true;
  if (/✖/.test(stripped)) return true;
  if (/Error/.test(stripped)) return true;
  if (/Traceback/.test(stripped)) return true;
  if (/AssertionError/.test(stripped)) return true;

  // "failed" with a nonzero count, e.g. "1 failed" or "failed: 3"
  const failedMatch = stripped.match(/(\d+)\s+failed/i) ?? stripped.match(/failed[:\s]+(\d+)/i);
  return Boolean(failedMatch && parseInt(failedMatch[1], 10) > 0);
}

function extractSummaryLine(text: string): string | null {
  const lines = text.split("\n");

  // pytest: === N passed in X.Xs ===  (also handles variants like  === N passed, M warning ===)
  for (const line of lines) {
    if (/={3,}\s+\d+\s+passed/.test(line)) return line.trim();
  }

  // jest / vitest: "Tests: N passed, N total" or "Test Suites: ... Tests: ..."
  for (const line of lines) {
    if (/Tests:\s+\d+\s+passed/.test(line)) return line.trim();
  }

  // vitest / jest run summary line: "✓ N tests passed"
  for (const line of lines) {
    if (/\d+\s+tests?\s+passed/i.test(line)) return line.trim();
  }

  // eslint / build-eslint: empty output = clean; if we reach here with no failures, synthesize
  if (text.trim() === "" || text.trim().startsWith("\n")) {
    return "ESLint: 0 problems found";
  }

  return null;
}

// ── Structural test-run summary (opt-in; see structural.ts) ─────────────────────────────────
//
// `renderTestGreen` above only looks for failure words and a summary line. This renderer is the
// strict one the structural dispatcher uses for Vitest, Jest and pytest: every non-blank line of
// the run has to be one the runner prints for a PASSING run, the runner's own counts have to
// agree with each other and with the progress lines, and the final summary has to be there.
// Anything else (a failure, a console block, a warning section, terminal redraw codes, a
// missing summary, a format this parser does not know) answers "cannot render" and the caller
// keeps the original output whole, so a diagnostic can never reach a destructive filter.

type Runner = "vitest" | "jest" | "pytest";
type LineKind = "pass" | "meta" | "summary";

const RUNNER_BY_TYPE: Readonly<Record<string, Runner>> = {
  "test-vitest": "vitest",
  "test-jest": "jest",
  "test-pytest": "pytest",
};

/** The lines worth keeping and how many other (passing/meta) lines the summary drops. */
interface ParsedRun {
  kept: string[];
  omitted: number;
}

interface LineScan {
  pass: string[];
  meta: string[];
  summary: string[];
}

const ANSI_OSC_RE = /\u001b\][^\u0007\u001b]{0,512}(?:\u0007|\u001b\\)/g;
const ANSI_CSI_RE = /\u001b\[[0-?]{0,32}[ -/]{0,4}[@-~]/g;

/**
 * ANSI-free lines (CRLF folded to LF), or null when the output carries terminal redraw codes or
 * bare carriage returns: such a transcript is a screen, not a log, so it is not classified.
 */
function classifiableLines(text: string): string[] | null {
  let redraw = false;
  const bare = text.replace(ANSI_OSC_RE, "").replace(ANSI_CSI_RE, (sequence) => {
    if (!sequence.endsWith("m")) redraw = true;
    return "";
  });
  if (redraw || bare.includes("\u001b")) return null;
  const lines = bare.split("\n").map((line) => (line.endsWith("\r") ? line.slice(0, -1) : line));
  return lines.some((line) => line.includes("\r")) ? null : lines;
}

/** Classify every non-blank line; one unknown line, or any line after the summary, refuses. */
function scanLines(lines: string[], classify: (line: string) => LineKind | null): LineScan | null {
  const scan: LineScan = { pass: [], meta: [], summary: [] };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    const kind = classify(line);
    if (!kind) return null;
    if (scan.summary.length > 0 && kind !== "summary") return null;
    scan[kind].push(line);
  }
  return scan;
}

type Counts = Map<string, number>;

const COUNT_LABELS = new Set([
  "passed",
  "failed",
  "skipped",
  "todo",
  "pending",
  "total",
  "obsolete",
  "written",
  "updated",
  "removed",
  "unchecked",
  "xfailed",
  "xpassed",
  "deselected",
  "errors",
  "error",
]);

/**
 * "19 passed | 1 skipped (20)" / "97 passed, 97 total" -> counts and the declared total. Unknown
 * labels, repeated labels and any failed/error count above zero refuse.
 */
function parseCounts(segment: string): { counts: Counts; total: number | null } | null {
  let body = segment.trim();
  let parenTotal: number | null = null;
  if (body.endsWith(")")) {
    const open = body.lastIndexOf("(");
    const inner = open < 0 ? "" : body.slice(open + 1, -1);
    if (!/^\d{1,9}$/.test(inner)) return null;
    parenTotal = Number(inner);
    body = body.slice(0, open).trimEnd();
  }
  const counts: Counts = new Map();
  for (const part of body.split(/[|,]/)) {
    const match = /^(\d{1,9}) ([a-z]{2,12})$/.exec(part.trim());
    if (!match || !COUNT_LABELS.has(match[2]) || counts.has(match[2])) return null;
    counts.set(match[2], Number(match[1]));
  }
  for (const bad of ["failed", "errors", "error"]) if ((counts.get(bad) ?? 0) > 0) return null;
  return { counts, total: parenTotal ?? counts.get("total") ?? null };
}

const OUTCOME_LABELS = ["passed", "failed", "skipped", "todo", "pending"];

/** Counts of a "files / suites / tests" line: the declared total must equal the outcomes. */
function parseTotals(value: string | undefined): Counts | null {
  if (value === undefined) return null;
  const parsed = parseCounts(value);
  if (!parsed || parsed.total === null) return null;
  const sum = OUTCOME_LABELS.reduce((acc, label) => acc + (parsed.counts.get(label) ?? 0), 0);
  return sum === parsed.total ? parsed.counts : null;
}

/** "Key  value" summary lines to a map; a repeated key refuses. Lines that do not fit are skipped. */
function summaryMap(summary: string[], keyed: RegExp): Map<string, string> | null {
  const map = new Map<string, string>();
  for (const line of summary) {
    const match = keyed.exec(line);
    if (!match) continue;
    if (map.has(match[1])) return null;
    map.set(match[1], match[2]);
  }
  return map;
}

// Vitest -------------------------------------------------------------------------------------

const VITEST_RUN_RE = /^RUN\s{1,4}v\d{1,3}(?:\.\d{1,4}){1,3}\S{0,32}(?:\s.{0,1024})?$/;
const VITEST_SUMMARY_RE = /^(Test Files|Tests|Snapshots|Start at|Duration)\s{1,8}(\S.{0,1024})$/;
const VITEST_FILE_TAIL_RE = /^\(\d{1,6} tests?(?: \| \d{1,6} (?:skipped|todo))*\)(?: \S{1,16})?$/;

function classifyVitest(line: string): LineKind | null {
  if (VITEST_RUN_RE.test(line)) return "meta";
  if (/^[✓✔√↓]\s/.test(line)) return "pass";
  return VITEST_SUMMARY_RE.test(line) ? "summary" : null;
}

/** Default-reporter file lines ("✓ file (N tests) 12ms") must match the "Test Files" counts. */
function vitestFileLinesAgree(pass: string[], files: Counts): boolean {
  let done = 0;
  let skipped = 0;
  for (const line of pass) {
    const cut = line.lastIndexOf(" (");
    if (cut < 0 || !VITEST_FILE_TAIL_RE.test(line.slice(cut + 1))) continue;
    if (line.startsWith("↓")) skipped++;
    else done++;
  }
  if (done + skipped === 0) return true;
  return done === (files.get("passed") ?? 0) && skipped === (files.get("skipped") ?? 0);
}

function parseVitest(lines: string[]): ParsedRun | null {
  const scan = scanLines(lines, classifyVitest);
  const values = scan && summaryMap(scan.summary, VITEST_SUMMARY_RE);
  if (!scan || !values || !values.has("Duration")) return null;
  const files = parseTotals(values.get("Test Files"));
  const tests = parseTotals(values.get("Tests"));
  if (!files || !tests || (tests.get("passed") ?? 0) < 1) return null;
  if (values.has("Snapshots") && !parseCounts(values.get("Snapshots") ?? "")) return null;
  if (!vitestFileLinesAgree(scan.pass, files)) return null;
  return { kept: scan.summary, omitted: scan.pass.length + scan.meta.length };
}

// Jest ---------------------------------------------------------------------------------------

const JEST_SUMMARY_RE = /^(Test Suites|Tests|Snapshots|Time):\s{1,16}(\S.{0,256})$/;
const JEST_RAN_ALL_RE = /^Ran all test suites(?: .{0,512})?\.$/;

function classifyJest(line: string): LineKind | null {
  if (/^PASS\s/.test(line) || /^[✓✔√○✎]\s/.test(line)) return "pass";
  return JEST_SUMMARY_RE.test(line) || JEST_RAN_ALL_RE.test(line) ? "summary" : null;
}

function parseJest(lines: string[]): ParsedRun | null {
  const scan = scanLines(lines, classifyJest);
  const values = scan && summaryMap(scan.summary, JEST_SUMMARY_RE);
  if (!scan || !values || !values.has("Time")) return null;
  const suites = parseTotals(values.get("Test Suites"));
  const tests = parseTotals(values.get("Tests"));
  if (!suites || !tests || (tests.get("passed") ?? 0) < 1) return null;
  if (values.has("Snapshots") && !parseCounts(values.get("Snapshots") ?? "")) return null;
  // One PASS line per passing suite (none at all under a summary-only reporter).
  const passLines = scan.pass.filter((line) => line.startsWith("PASS")).length;
  if (passLines !== 0 && passLines !== (suites.get("passed") ?? 0)) return null;
  return { kept: scan.summary, omitted: scan.pass.length + scan.meta.length };
}

// pytest -------------------------------------------------------------------------------------

const PYTEST_META_RE =
  /^(?:=+ test session starts =+|(?:platform|rootdir:|configfile:|plugins:|cachedir:|testpaths:|inifile:)\s?.{0,1024})$/;
const PYTEST_COLLECTED_RE = /^collected \d{1,9} items?(?: \/ \d{1,9} (?:deselected|selected))*$/;
const PYTEST_VERBOSE_RE =
  /^\S{1,1024}::\S.{0,2048} (PASSED|SKIPPED|XFAIL|XPASS)(?: \(.{0,200}\))?(?: \[\s{0,3}\d{1,3}%\])?$/;
const PYTEST_FINAL_RE = /^(.{1,200}) in (\d{1,9}(?:\.\d{1,4})?)s(?: \(\d{1,3}:\d{2}:\d{2}\))?$/;
const PYTEST_MARK_LABEL: Readonly<Record<string, string>> = {
  ".": "passed",
  s: "skipped",
  x: "xfailed",
  X: "xpassed",
};
const PYTEST_VERBOSE_LABEL: Readonly<Record<string, string>> = {
  PASSED: "passed",
  SKIPPED: "skipped",
  XFAIL: "xfailed",
  XPASS: "xpassed",
};

function trimEquals(line: string): string {
  let start = 0;
  let end = line.length;
  while (start < end && line[start] === "=") start++;
  while (end > start && line[end - 1] === "=") end--;
  return line.slice(start, end).trim();
}

/** Marks of a progress line ("tests/a.py ..s.. [ 40%]"), or null when it is not one. */
function pytestProgressMarks(line: string): string | null {
  let body = line;
  if (body.endsWith("]")) {
    const open = body.lastIndexOf("[");
    if (open < 0 || !/^\d{1,3}%$/.test(body.slice(open + 1, -1).trim())) return null;
    body = body.slice(0, open).trimEnd();
  }
  const cut = body.lastIndexOf(" ");
  const marks = body.slice(cut + 1);
  const name = cut < 0 ? "" : body.slice(0, cut).trimEnd();
  if (!/^[.sxX]{1,4096}$/.test(marks) || name.length > 1024 || /\s/.test(name)) return null;
  return marks;
}

function pytestFinalCounts(line: string): Counts | null {
  const final = PYTEST_FINAL_RE.exec(trimEquals(line));
  const parsed = final && parseCounts(final[1]);
  return parsed && (parsed.counts.get("passed") ?? 0) >= 1 ? parsed.counts : null;
}

function classifyPytest(line: string): LineKind | null {
  if (PYTEST_META_RE.test(line) || PYTEST_COLLECTED_RE.test(line)) return "meta";
  if (pytestProgressMarks(line) !== null || PYTEST_VERBOSE_RE.test(line)) return "pass";
  return pytestFinalCounts(line) ? "summary" : null;
}

/** Outcome tallies read off the progress lines, to be compared with the final summary. */
function pytestTallies(pass: string[]): Counts {
  const tallies: Counts = new Map();
  const bump = (label: string, by: number) => tallies.set(label, (tallies.get(label) ?? 0) + by);
  for (const line of pass) {
    const marks = pytestProgressMarks(line);
    if (marks !== null) {
      for (const mark of marks) bump(PYTEST_MARK_LABEL[mark], 1);
    } else {
      const verbose = PYTEST_VERBOSE_RE.exec(line);
      if (verbose) bump(PYTEST_VERBOSE_LABEL[verbose[1]], 1);
    }
  }
  return tallies;
}

function parsePytest(lines: string[]): ParsedRun | null {
  const scan = scanLines(lines, classifyPytest);
  if (!scan || scan.summary.length !== 1) return null;
  const counts = pytestFinalCounts(scan.summary[0]);
  if (!counts) return null;
  const tallies = pytestTallies(scan.pass);
  const tallied = [...tallies.values()].reduce((acc, n) => acc + n, 0);
  if (
    tallied > 0 &&
    Object.values(PYTEST_MARK_LABEL).some((l) => (tallies.get(l) ?? 0) !== (counts.get(l) ?? 0))
  ) {
    return null;
  }
  const collected = scan.meta.filter((line) => line.startsWith("collected"));
  const dropped = scan.pass.length + scan.meta.length - collected.length;
  return { kept: [...collected, scan.summary[0]], omitted: dropped };
}

const PARSERS: Readonly<Record<Runner, (lines: string[]) => ParsedRun | null>> = {
  vitest: parseVitest,
  jest: parseJest,
  pytest: parsePytest,
};

/**
 * Structural test-output renderer: the run's totals (files/suites, tests, skips, snapshots,
 * duration) replace the per-file progress of a run that provably passed. Any other output,
 * and any run the parsers cannot fully account for, is declined (`changed: false`).
 */
export function renderTestSummary(text: string, detection: CommandDetectionResult): RenderResult {
  const runner = RUNNER_BY_TYPE[detection.type];
  const lines = runner ? classifiableLines(text) : null;
  const parsed = runner && lines ? PARSERS[runner](lines) : null;
  if (!parsed || parsed.omitted === 0) return NO_RENDER(text);
  if (hasFailureSignal(parsed.kept.join("\n"))) return NO_RENDER(text);
  const note = `[${parsed.omitted} progress lines omitted]`;
  return { text: [note, ...parsed.kept].join("\n"), changed: true, renderer: "test-summary" };
}
