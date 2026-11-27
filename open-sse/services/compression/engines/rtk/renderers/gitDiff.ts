import type { RenderResult, CommandDetectionResult } from "./types.ts";
import { NO_RENDER } from "./types.ts";

/**
 * RTK semantic renderer for `git diff` / `git show` output.
 *
 * Keeps only:
 *  - `diff --git a/... b/...` file header lines
 *  - `@@ ... @@` hunk headers
 *  - change lines starting with `+` or `-` (but NOT `+++`/`---`)
 *
 * Everything else (context lines, index lines, mode lines, etc.) is dropped.
 * If no hunk header is found, returns no-op (input is not a real diff).
 */
export function renderGitDiff(text: string, _detection: CommandDetectionResult): RenderResult {
  // Guard: must have at least one hunk header
  if (!text.includes("@@ ")) {
    return NO_RENDER(text);
  }

  const kept: string[] = [];
  for (const line of text.split("\n")) {
    if (line.startsWith("diff --git ") || line.startsWith("@@ ")) {
      kept.push(line);
    } else if (/^[+-](?![+-])/.test(line)) {
      // change line (+foo or -foo) but NOT +++ or ---
      kept.push(line);
    }
    // drop: context lines (space), index lines, --- a/, +++ b/, mode lines, etc.
  }

  const out = kept.join("\n");
  if (out === text) return NO_RENDER(text);

  return { text: out, changed: true, renderer: "git-diff" };
}

// ── Structural unified diff (opt-in; see structural.ts) ─────────────────────────────────────
//
// Unlike `renderGitDiff` above, which keeps every `+`/`-` line it can find without checking that
// the text is a well-formed diff, this renderer parses the whole input first. It either returns a
// summary that provably holds every change of every file, or reports "cannot render" and the
// caller keeps the original untouched.

const HUNK_HEADER_RE = /^@@ -(\d{1,9})(?:,(\d{1,9}))? \+(\d{1,9})(?:,(\d{1,9}))? @@(?: .*)?$/;
const BLOB_INDEX_RE = /^index [0-9a-f]{4,64}\.\.[0-9a-f]{4,64}(?: [0-7]{6})?$/;
const FILE_METADATA_RE =
  /^(?:old mode|new mode|deleted file mode|new file mode|copy from|copy to|rename from|rename to|similarity index|dissimilarity index) \S/;
const GIT_FILE_HEADER = "diff --git ";

type Section = { kept: string[]; next: number };

/** Strip one trailing CR, for matching only: kept lines are copied verbatim. */
function bare(line: string): string {
  return line.endsWith("\r") ? line.slice(0, -1) : line;
}

function hasConflictMarker(content: string): boolean {
  return content.startsWith("<<<<<<<") || content.startsWith(">>>>>>>");
}

type HunkRead = { next: number; kept: string[]; adds: number; dels: number } | null;

interface HunkState {
  oldLeft: number;
  newLeft: number;
  adds: number;
  dels: number;
  afterChange: boolean;
  kept: string[];
}

function consumeContext(state: HunkState): boolean {
  if (state.oldLeft <= 0 || state.newLeft <= 0) return false;
  state.oldLeft--;
  state.newLeft--;
  state.afterChange = false;
  return true;
}

function consumeChange(state: HunkState, tag: string, line: string): boolean {
  if (tag === "-") {
    if (state.oldLeft <= 0) return false;
    state.oldLeft--;
    state.dels++;
  } else {
    if (state.newLeft <= 0) return false;
    state.newLeft--;
    state.adds++;
  }
  state.kept.push(line);
  state.afterChange = true;
  return true;
}

/** Apply one hunk body line to the running counts; false means the hunk is not well formed. */
function consumeHunkLine(state: HunkState, line: string): boolean {
  const text = bare(line);
  // An empty line is a context line whose single space was stripped in transit.
  const tag = text[0] ?? " ";
  if (tag === "\\") {
    // "\ No newline at end of file" belongs to the line before it: keep it only after a change.
    if (state.afterChange) state.kept.push(line);
    return true;
  }
  if (tag !== "+" && tag !== "-" && tag !== " ") return false;
  if (hasConflictMarker(text.slice(1))) return false;
  return tag === " " ? consumeContext(state) : consumeChange(state, tag, line);
}

function readHunk(lines: string[], start: number): HunkRead {
  const header = HUNK_HEADER_RE.exec(bare(lines[start]));
  if (!header) return null;
  const state: HunkState = {
    oldLeft: Number(header[2] ?? 1),
    newLeft: Number(header[4] ?? 1),
    adds: 0,
    dels: 0,
    afterChange: false,
    kept: [lines[start]],
  };
  let i = start + 1;
  while (
    i < lines.length &&
    (state.oldLeft > 0 || state.newLeft > 0 || lines[i].startsWith("\\"))
  ) {
    if (i === start + 1 && lines[i].startsWith("\\")) return null;
    if (!consumeHunkLine(state, lines[i])) return null;
    i++;
  }
  if (state.oldLeft > 0 || state.newLeft > 0) return null;
  return { next: i, kept: state.kept, adds: state.adds, dels: state.dels };
}

/** Keep significant file metadata, drop the blob-id line; returns the index after the block. */
function readFileMetadata(lines: string[], from: number, kept: string[]): number {
  let i = from;
  while (i < lines.length) {
    const line = bare(lines[i]);
    if (BLOB_INDEX_RE.test(line)) {
      i++;
    } else if (FILE_METADATA_RE.test(line)) {
      kept.push(lines[i]);
      i++;
    } else {
      break;
    }
  }
  return i;
}

/**
 * Read the optional `---`/`+++` pair in header position; they are dropped when they only repeat
 * the paths of the `diff --git` line. Returns the next index, or -1 for an unpaired `---`.
 */
function readPathHeaders(lines: string[], from: number, header: string, kept: string[]): number {
  if (from >= lines.length || !lines[from].startsWith("--- ")) return from;
  if (from + 1 >= lines.length || !lines[from + 1].startsWith("+++ ")) return -1;
  const oldPath = bare(lines[from]).slice(4);
  const newPath = bare(lines[from + 1]).slice(4);
  const redundant =
    oldPath.startsWith("a/") &&
    newPath.startsWith("b/") &&
    header === `${GIT_FILE_HEADER}${oldPath} ${newPath}`;
  if (!redundant) kept.push(lines[from], lines[from + 1]);
  return from + 2;
}

type HunksRead = { next: number; body: string[]; adds: number; dels: number; count: number };

function readHunks(lines: string[], from: number): HunksRead | null {
  const read: HunksRead = { next: from, body: [], adds: 0, dels: 0, count: 0 };
  while (read.next < lines.length && lines[read.next].startsWith("@@")) {
    const hunk = readHunk(lines, read.next);
    if (!hunk) return null;
    read.body.push(...hunk.kept);
    read.adds += hunk.adds;
    read.dels += hunk.dels;
    read.count++;
    read.next = hunk.next;
  }
  return read;
}

function readFileSection(lines: string[], start: number): Section | null {
  const header = bare(lines[start]);
  if (!header.startsWith(GIT_FILE_HEADER)) return null;
  const kept = [lines[start]];
  const afterMetadata = readFileMetadata(lines, start + 1, kept);
  const afterPaths = readPathHeaders(lines, afterMetadata, header, kept);
  if (afterPaths < 0) return null;
  const hunks = readHunks(lines, afterPaths);
  if (!hunks) return null;
  // Anything else before the next file (binary notice, stray text) is not a plain diff.
  if (hunks.next < lines.length && !lines[hunks.next].startsWith(GIT_FILE_HEADER)) return null;
  if (hunks.count > 0) kept.push(`# +${hunks.adds} -${hunks.dels}`);
  return { kept: [...kept, ...hunks.body], next: hunks.next };
}

/**
 * Summarise a plain `diff --git` listing: keep every file header, significant metadata (create,
 * delete, rename, copy, mode), every hunk header and every changed line, add a per-file `+N -M`
 * count computed from the whole input, and drop blob ids and unchanged context.
 *
 * Refuses (`changed: false`) anything it cannot prove complete: combined or conflicted diffs,
 * binary sections, hunks whose declared line counts do not match, truncated or trailing text.
 */
export function renderUnifiedDiff(text: string, _detection: CommandDetectionResult): RenderResult {
  const lines = text.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  if (lines.length === 0) return NO_RENDER(text);
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const section = readFileSection(lines, i);
    if (!section) return NO_RENDER(text);
    out.push(...section.kept);
    i = section.next;
  }
  return { text: out.join("\n"), changed: true, renderer: "unified-diff" };
}
