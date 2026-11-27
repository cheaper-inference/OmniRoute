import type { RenderResult, CommandDetectionResult } from "./types.ts";
import { NO_RENDER } from "./types.ts";

/**
 * Structural renderer for `git status --porcelain=v1` / `--short` text.
 *
 * Only the textual v1 shape is accepted: an optional `## branch` line, then `XY path` entries
 * where XY are the two status axes (index, working tree). `-z` output (NUL separated), porcelain
 * v2, colour codes, unknown status letters, a rename without both sides or any stray line make the
 * renderer decline, and the caller keeps the original text.
 *
 * The summary keeps the branch line verbatim and splits the entries into staged, unstaged,
 * unmerged, untracked and ignored. A file changed on both axes appears under both, with the letter
 * of each axis. Staged, unstaged and unmerged entries are listed in full (renames keep both sides);
 * untracked and ignored files are grouped by directory with a total and the first few names.
 */

/** File names listed per directory before the rest of its untracked/ignored files is counted. */
const NAMES_PER_DIRECTORY = 3;

const STATUS_LETTERS = " MTADRCU";
const UNMERGED_CODES = new Set(["DD", "AU", "UD", "UA", "DU", "AA", "UU"]);
const RENAME_SEPARATOR = " -> ";

interface StatusEntry {
  x: string;
  y: string;
  path: string;
}

function bare(line: string): string {
  return line.endsWith("\r") ? line.slice(0, -1) : line;
}

function isRename(entry: StatusEntry): boolean {
  return "RC".includes(entry.x) || "RC".includes(entry.y);
}

/** A rename or copy entry must name exactly one origin and one destination. */
function hasBothRenameSides(path: string): boolean {
  const at = path.indexOf(RENAME_SEPARATOR);
  if (at <= 0 || path.indexOf(RENAME_SEPARATOR, at + RENAME_SEPARATOR.length) !== -1) return false;
  return at + RENAME_SEPARATOR.length < path.length;
}

function parseEntry(raw: string): StatusEntry | null {
  const line = bare(raw);
  if (line.length < 4 || line[2] !== " ") return null;
  const x = line[0];
  const y = line[1];
  const code = x + y;
  const tracked = STATUS_LETTERS.includes(x) && STATUS_LETTERS.includes(y) && code !== "  ";
  if (!tracked && code !== "??" && code !== "!!") return null;
  const entry = { x, y, path: line.slice(3) };
  if (isRename(entry) && !hasBothRenameSides(entry.path)) return null;
  return entry;
}

/** Cheap recognition used by the dispatcher: the first line is a branch line or a v1 entry. */
export function startsLikePorcelainV1(text: string): boolean {
  const end = text.indexOf("\n");
  const first = end === -1 ? text : text.slice(0, end);
  return (first.startsWith("## ") && first.length > 3) || parseEntry(first) !== null;
}

interface Groups {
  staged: string[];
  unstaged: string[];
  unmerged: string[];
  untracked: string[];
  ignored: string[];
}

function classify(entry: StatusEntry, groups: Groups): void {
  const code = entry.x + entry.y;
  if (code === "??") groups.untracked.push(entry.path);
  else if (code === "!!") groups.ignored.push(entry.path);
  else if (UNMERGED_CODES.has(code)) groups.unmerged.push(`${code} ${entry.path}`);
  else {
    if (entry.x !== " ") groups.staged.push(`${entry.x} ${entry.path}`);
    if (entry.y !== " ") groups.unstaged.push(`${entry.y} ${entry.path}`);
  }
}

function parseStatus(
  text: string
): { branch: string | null; groups: Groups; count: number } | null {
  if (text.includes("\0")) return null;
  const lines = text.split("\n");
  if (lines[lines.length - 1] === "") lines.pop();
  let branch: string | null = null;
  let from = 0;
  if (lines.length > 0 && lines[0].startsWith("## ")) {
    branch = bare(lines[0]);
    if (branch.length <= 3) return null;
    from = 1;
  }
  const groups: Groups = { staged: [], unstaged: [], unmerged: [], untracked: [], ignored: [] };
  let count = 0;
  for (let i = from; i < lines.length; i++) {
    const entry = parseEntry(lines[i]);
    if (!entry) return null;
    classify(entry, groups);
    count++;
  }
  return count === 0 ? null : { branch, groups, count };
}

/** A quoted path (git quotes names with spaces or special bytes) is never regrouped. */
function directoryOf(path: string): string | null {
  if (path.startsWith('"')) return null;
  const slash = path.lastIndexOf("/");
  return slash === -1 ? "" : path.slice(0, slash + 1);
}

/** Group unmodified-by-git files by directory: `dir/ (N): first names (+k more)`. */
function renderByDirectory(paths: string[]): string[] {
  const byDir = new Map<string, string[]>();
  const loose: string[] = [];
  for (const path of paths) {
    const dir = directoryOf(path);
    if (dir === null || dir === "") {
      loose.push(path);
      continue;
    }
    const list = byDir.get(dir);
    if (list) list.push(path.slice(dir.length));
    else byDir.set(dir, [path.slice(dir.length)]);
  }
  const out: string[] = [];
  for (const [dir, names] of byDir) {
    if (names.length <= NAMES_PER_DIRECTORY) {
      for (const name of names) out.push(`  ${dir}${name}`);
      continue;
    }
    const shown = names.slice(0, NAMES_PER_DIRECTORY).join(" ");
    out.push(`  ${dir} (${names.length}): ${shown} (+${names.length - NAMES_PER_DIRECTORY} more)`);
  }
  for (const path of loose) out.push(`  ${path}`);
  return out;
}

function section(label: string, entries: string[], nested: string[] | null): string[] {
  if (entries.length === 0) return [];
  const body = nested ?? entries.map((entry) => `  ${entry}`);
  return [`${label}: ${entries.length}`, ...body];
}

export function renderGitStatus(text: string, _detection: CommandDetectionResult): RenderResult {
  const parsed = parseStatus(text);
  if (!parsed) return NO_RENDER(text);
  const { branch, groups } = parsed;
  const out: string[] = branch ? [branch] : [];
  out.push(...section("staged", groups.staged, null));
  out.push(...section("unstaged", groups.unstaged, null));
  out.push(...section("unmerged", groups.unmerged, null));
  out.push(...section("untracked", groups.untracked, renderByDirectory(groups.untracked)));
  out.push(...section("ignored", groups.ignored, renderByDirectory(groups.ignored)));
  return { text: out.join("\n"), changed: true, renderer: "git-status" };
}

const STATUS_COMMAND_RE = /^git\s+status\b/i;

/**
 * What the `git status` command line says about the output format:
 *  - `v1`        short or porcelain v1 text (`--porcelain`, `--porcelain=v1`, `-s`, `--short`);
 *  - `integral`  a machine format this renderer does not summarise (`-z`, porcelain v2), kept whole;
 *  - `null`      anything else, including the human-readable layout: the legacy path handles it.
 */
type TokenEffect = "stop" | "integral" | "v1" | null;

function longFlagEffect(token: string): TokenEffect {
  const equals = token.indexOf("=");
  const name = equals === -1 ? token.slice(2) : token.slice(2, equals);
  const value = equals === -1 ? "" : token.slice(equals + 1);
  if (name === "porcelain" && (value === "v2" || value === "2")) return "integral";
  return name === "porcelain" || name === "short" ? "v1" : null;
}

function shortFlagEffect(flags: string): TokenEffect {
  if (flags.includes("z")) return "integral";
  return flags.includes("s") ? "v1" : null;
}

/** What one command-line token says about the output format. */
function tokenEffect(token: string): TokenEffect {
  if (token === "--" || token === "|") return "stop";
  if (token.startsWith("--")) return longFlagEffect(token);
  return token.startsWith("-") && token.length > 1 ? shortFlagEffect(token.slice(1)) : null;
}

export function gitStatusCommandKind(command: string): "v1" | "integral" | null {
  if (!STATUS_COMMAND_RE.test(command)) return null;
  let kind: "v1" | null = null;
  for (const token of command.split(/\s+/).slice(2)) {
    const effect = tokenEffect(token);
    if (effect === "stop") break;
    if (effect === "integral") return "integral";
    if (effect === "v1") kind = "v1";
  }
  return kind;
}
