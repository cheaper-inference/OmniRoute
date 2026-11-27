import { NO_RENDER } from "./types.ts";
import type { RenderResult, Renderer } from "./types.ts";

/**
 * Structural renderers for file listings: `ls -l`, `find`, `tree` (shell) and the path lists the
 * native Glob and directory-listing tools return (opt-in; see structural.ts).
 *
 * Each dialect is parsed whole. The summary keeps every name, path, size and count it replaces;
 * the only things dropped are columns that carry no path information (link counts, owner/group
 * when identical on every line, dates, tree drawing characters). One line the parser cannot
 * classify (a diagnostic, a truncation note, an unknown layout) makes the renderer decline, and
 * the caller then keeps the original text untouched.
 */

export type ListingDialect = "ls" | "find" | "tree";

/**
 * Non-shell tools whose result is a flat list of paths: the native Glob and the directory
 * listings Cursor's built-in tools are bridged onto (see `LS_TOOL_NAMES` in
 * `open-sse/executors/cursor/builtinToolBridge.ts`, plus Cursor's own `glob_file_search`).
 */
export const NATIVE_LISTING_TOOL_NAMES: readonly string[] = [
  "glob",
  "glob_file_search",
  "ls",
  "list",
  "list_dir",
  "list_directory",
  "listfiles",
  "list_files",
  "find_files",
  "file_search",
  "dir",
];

// ── Command routing ─────────────────────────────────────────────────────────────────────────

/** Later pipeline stages that only select or reorder lines, so the producer's format stays. */
const PASS_THROUGH_STAGES = new Set(["head", "tail", "sort", "uniq", "cat"]);
/** `find` actions whose output is not one path per line. */
const FIND_UNSAFE_ARGS = new Set([
  "-ls",
  "-fls",
  "-printf",
  "-fprintf",
  "-print0",
  "-fprint0",
  "-exec",
  "-execdir",
  "-ok",
  "-okdir",
  "-delete",
]);
/** `tree` options that change the layout of each line (sizes, permissions, full paths, JSON, …). */
const TREE_UNSUPPORTED_SHORT = /^-[A-Za-z]*[fFshpugDQiJXHS]/;
const TREE_UNSUPPORTED_LONG = new Set([
  "--json",
  "--xml",
  "--html",
  "--du",
  "--inodes",
  "--device",
  "--si",
  "--fromfile",
  "--timefmt",
  "--fflinks",
]);
const SHORT_OPTION_CLUSTER = /^-[A-Za-z0-9]+$/;
const MAX_COMMAND_TOKENS = 256;

/** Split on top-level `|` (quote and escape aware). `||` is not a pipe. */
function splitPipeline(command: string): string[] {
  const stages: string[] = [];
  let quote = "";
  let start = 0;
  for (let i = 0; i < command.length; i++) {
    const ch = command[i];
    if (quote) {
      if (ch === quote) quote = "";
      else if (ch === "\\" && quote === '"') i++;
    } else if (ch === "'" || ch === '"') {
      quote = ch;
    } else if (ch === "\\") {
      i++;
    } else if (ch === "|" && command[i + 1] === "|") {
      i++;
    } else if (ch === "|") {
      stages.push(command.slice(start, i));
      start = i + 1;
    }
  }
  stages.push(command.slice(start));
  return stages;
}

function programName(token: string | undefined): string {
  const word = token ?? "";
  return word.slice(word.lastIndexOf("/") + 1);
}

function commandTokens(stage: string): string[] {
  return stage.trim().split(/\s+/, MAX_COMMAND_TOKENS);
}

/** The first stage when every later stage keeps the line format, else null. */
function producerStage(command: string): string | null {
  const [producer, ...later] = splitPipeline(command);
  const passThrough = later.every((stage) =>
    PASS_THROUGH_STAGES.has(programName(commandTokens(stage)[0]))
  );
  return passThrough ? producer : null;
}

function treeOptionUnsupported(arg: string): boolean {
  return arg.startsWith("--")
    ? TREE_UNSUPPORTED_LONG.has(arg.split("=")[0])
    : TREE_UNSUPPORTED_SHORT.test(arg);
}

/**
 * Which listing dialect the correlated shell command produces, or null when it is not a listing
 * this module can read (`ls` without `-l`, `find -exec`, `tree -J`, a pipe into another filter…).
 */
export function listingDialectForCommand(command: string): ListingDialect | null {
  const stage = producerStage(command);
  if (stage === null) return null;
  const [program, ...args] = commandTokens(stage);
  switch (programName(program)) {
    case "ls":
      return args.some((arg) => SHORT_OPTION_CLUSTER.test(arg) && arg.includes("l")) ? "ls" : null;
    case "find":
      return args.some((arg) => FIND_UNSAFE_ARGS.has(arg)) ? null : "find";
    case "tree":
      return args.some(treeOptionUnsupported) ? null : "tree";
    default:
      return null;
  }
}

// ── Shared line handling ────────────────────────────────────────────────────────────────────

/**
 * Split into lines. CRLF is accepted only when EVERY terminated line ends in CR (a lone CR in an
 * LF listing could be part of a file name, so mixed endings are refused). Null: not readable.
 */
function splitListingLines(text: string): string[] | null {
  const parts = text.split("\n");
  const last = parts.pop() ?? "";
  const crCount = parts.filter((line) => line.endsWith("\r")).length;
  if ((crCount !== 0 && crCount !== parts.length) || last.endsWith("\r")) return null;
  const lines = crCount > 0 ? parts.map((line) => line.slice(0, -1)) : parts;
  if (last !== "") lines.push(last);
  return lines.length > 0 ? lines : null;
}

function finish(text: string, lines: string[], renderer: string): RenderResult {
  const out = lines.join("\n") + (text.endsWith("\n") ? "\n" : "");
  return out === text ? NO_RENDER(text) : { text: out, changed: true, renderer };
}

// ── Path lists: find and native Glob / directory listings ───────────────────────────────────

const MAX_PATH_CHARS = 4096;
/** Smallest group worth a header line: below it the full paths are shorter. */
const MIN_GROUP = 3;
const SEARCH_MATCH_SHAPE = /:\d+:/;
const FOUND_HEADER = /^Found (\d{1,9}) files?$/;

/**
 * One path per line. Prose, diagnostics (`find: …: Permission denied`), search matches
 * (`path:12:text`), bullets and indented lines are not paths, so one of them voids the listing.
 */
function isPathLine(line: string): boolean {
  if (line.length === 0 || line.length > MAX_PATH_CHARS || line.trim() !== line) return false;
  if (line.startsWith("- ") || line.startsWith("* ") || line.includes(": ")) return false;
  if (SEARCH_MATCH_SHAPE.test(line)) return false;
  if (line.includes("/") || line.includes("\\")) return true;
  return line.includes(".") && !/\s/.test(line);
}

interface PathGroup {
  dir: string;
  names: string[];
}

function splitPath(path: string): [dir: string, name: string] {
  const cut = Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")) + 1;
  return [path.slice(0, cut), path.slice(cut)];
}

/**
 * `keepOrder` closes a group whenever the directory changes (the order of a Glob result is
 * meaningful); otherwise every directory is one group at its first appearance.
 */
function groupPaths(paths: string[], keepOrder: boolean): PathGroup[] {
  const groups: PathGroup[] = [];
  const byDir = new Map<string, PathGroup>();
  for (const path of paths) {
    let [dir, name] = splitPath(path);
    if (name === "") [dir, name] = ["", path];
    let group = keepOrder ? groups[groups.length - 1] : byDir.get(dir);
    if (!group || group.dir !== dir) {
      group = { dir, names: [] };
      groups.push(group);
      byDir.set(dir, group);
    }
    group.names.push(name);
  }
  return groups;
}

/** `dir/ (N)` then the N names indented; small groups and bare names stay as full paths. */
function groupLines(groups: PathGroup[]): string[] {
  const out: string[] = [];
  for (const { dir, names } of groups) {
    if (dir === "" || names.length < MIN_GROUP) {
      for (const name of names) out.push(dir + name);
      continue;
    }
    out.push(`${dir} (${names.length})`);
    for (const name of names) out.push(`  ${name}`);
  }
  return out;
}

function pathListLines(lines: string[], keepOrder: boolean): string[] | null {
  if (lines.length === 0 || !lines.every(isPathLine)) return null;
  return groupLines(groupPaths(lines, keepOrder));
}

/** Native path list, optionally behind a `Found N files` header whose count must be right. */
function renderNativePaths(lines: string[]): string[] | null {
  const header = FOUND_HEADER.exec(lines[0]);
  const paths = header ? lines.slice(1) : lines;
  if (header && Number(header[1]) !== paths.length) return null;
  const grouped = pathListLines(paths, true);
  return grouped && header ? [lines[0], ...grouped] : grouped;
}

/** Cheap first-line check (the whole text is validated only by the renderer, inside the budget). */
export function looksLikeNativeListing(text: string): boolean {
  const end = text.indexOf("\n");
  const first = (end === -1 ? text : text.slice(0, end)).replace(/\r$/, "");
  return FOUND_HEADER.test(first) || isPathLine(first);
}

export const renderNativeListing: Renderer = (text) => {
  const lines = splitListingLines(text);
  const out = lines && renderNativePaths(lines);
  return out ? finish(text, out, "path-list") : NO_RENDER(text);
};

// ── ls -l ───────────────────────────────────────────────────────────────────────────────────

const LS_TOTAL = /^total \d{1,12}[KMGTPE]?$/;
const LS_MODE = /^[-bcdlps][-rwxsStT]{9}[.+@]?$/;
const LS_COUNT = /^\d{1,10}$/;
const LS_SIZE = /^\d{1,15}(?:\.\d)?[KMGTPE]?$/;
const LS_MONTH = /^\p{L}{3,5}\.?$/u;
const LS_DAY = /^\d{1,2}$/;
const LS_TIME_OR_YEAR = /^(?:\d{2}:\d{2}|\d{4})$/;
const LS_ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const LS_ISO_TIME = /^\d{2}:\d{2}$/;

interface LsEntry {
  mode: string;
  owner: string;
  group: string;
  size: string;
  name: string;
}

/** Next space-delimited token at or after `from`: [token, index after it], or null at the end. */
function takeToken(line: string, from: number): [string, number] | null {
  let start = from;
  while (start < line.length && line[start] === " ") start++;
  let end = start;
  while (end < line.length && line[end] !== " ") end++;
  return end > start ? [line.slice(start, end), end] : null;
}

function takeTokens(line: string, from: number, count: number): [string[], number] | null {
  const tokens: string[] = [];
  let pos = from;
  for (let i = 0; i < count; i++) {
    const next = takeToken(line, pos);
    if (!next) return null;
    tokens.push(next[0]);
    pos = next[1];
  }
  return [tokens, pos];
}

/** Index of the first character of the name after the date columns (two layouts), or -1. */
function nameStart(line: string, from: number): number {
  const iso = takeTokens(line, from, 2);
  if (iso && LS_ISO_DATE.test(iso[0][0]) && LS_ISO_TIME.test(iso[0][1])) {
    return line[iso[1]] === " " ? iso[1] + 1 : -1;
  }
  const classic = takeTokens(line, from, 3);
  const matches =
    classic &&
    LS_MONTH.test(classic[0][0]) &&
    LS_DAY.test(classic[0][1]) &&
    LS_TIME_OR_YEAR.test(classic[0][2]);
  return matches && line[classic[1]] === " " ? classic[1] + 1 : -1;
}

function parseLsLine(line: string): LsEntry | null {
  const head = takeTokens(line, 0, 5);
  if (!head) return null;
  const [mode, links, owner, group, size] = head[0];
  if (!LS_MODE.test(mode) || !LS_COUNT.test(links) || !LS_SIZE.test(size)) return null;
  const start = nameStart(line, head[1]);
  const name = start < 0 ? "" : line.slice(start);
  return name ? { mode, owner, group, size, name } : null;
}

function lsLines(lines: string[]): string[] | null {
  const hasTotal = LS_TOTAL.test(lines[0]);
  const entries: LsEntry[] = [];
  for (const line of lines.slice(hasTotal ? 1 : 0)) {
    const entry = parseLsLine(line);
    if (!entry) return null;
    entries.push(entry);
  }
  if (entries.length === 0) return null;
  const { owner, group } = entries[0];
  const uniform = entries.every((e) => e.owner === owner && e.group === group);
  const out = hasTotal ? [lines[0]] : [];
  if (uniform) out.push(`owner:group ${owner}:${group}`);
  for (const e of entries) {
    out.push(
      uniform
        ? `${e.mode} ${e.size} ${e.name}`
        : `${e.mode} ${e.owner}:${e.group} ${e.size} ${e.name}`
    );
  }
  return out;
}

// ── tree ────────────────────────────────────────────────────────────────────────────────────

/** Indentation units and connectors, with a non-breaking space normalised to a plain one. */
const TREE_CONTINUATIONS = new Set(["│   ", "    ", "|   "]);
const TREE_CONNECTORS = new Set(["├── ", "└── ", "|-- ", "`-- "]);
const TREE_FOOTER = /^(\d{1,9}) directories?(?:, (\d{1,9}) files?)?$/;

interface TreeNode {
  name: string;
  children: TreeNode[];
}

interface ParsedTree {
  root: TreeNode;
  entries: number;
  footer: string | null;
}

function parseTreeEntry(line: string): { depth: number; name: string } | null {
  for (let at = 0, depth = 0; at + 4 <= line.length; at += 4, depth++) {
    const unit = line.slice(at, at + 4).replaceAll(" ", " ");
    if (TREE_CONNECTORS.has(unit)) {
      const name = line.slice(at + 4);
      // A name with a slash is a full-path (`tree -f`) or suffixed (`-F`) layout, and one that
      // starts with whitespace would read as indentation in the summary: neither is handled.
      return name && !name.includes("/") && name.trimStart() === name ? { depth, name } : null;
    }
    if (!TREE_CONTINUATIONS.has(unit)) return null;
  }
  return null;
}

/** The footer, when `rest` is exactly [blank, footer] and its counts match the entries read. */
function readTreeFooter(rest: string[], entries: number): string | null | undefined {
  if (rest.length === 0) return null;
  const match = rest.length === 2 && rest[0] === "" ? TREE_FOOTER.exec(rest[1]) : null;
  if (!match || entries !== Number(match[1]) + Number(match[2] ?? 0)) return undefined;
  return rest[1];
}

function parseTree(lines: string[]): ParsedTree | null {
  if (lines.length < 2 || lines[0] === "") return null;
  const root: TreeNode = { name: lines[0], children: [] };
  const chain = [root];
  let at = 1;
  for (; at < lines.length && lines[at] !== ""; at++) {
    const entry = parseTreeEntry(lines[at]);
    if (!entry || entry.depth >= chain.length) return null;
    const node: TreeNode = { name: entry.name, children: [] };
    chain[entry.depth].children.push(node);
    chain.length = entry.depth + 1;
    chain.push(node);
  }
  const entries = at - 1;
  const footer = readTreeFooter(lines.slice(at), entries);
  return entries > 0 && footer !== undefined ? { root, entries, footer } : null;
}

/**
 * Pre-order, two spaces per level instead of drawing characters: the hierarchy (every ancestor of
 * every name) is kept by the indentation, and a directory that has children gets a trailing `/`.
 */
function treeLines(root: TreeNode): string[] {
  const out = [root.name];
  const pending: Array<[TreeNode, number]> = [];
  const pushChildren = (node: TreeNode, depth: number) => {
    for (let i = node.children.length - 1; i >= 0; i--) pending.push([node.children[i], depth]);
  };
  pushChildren(root, 1);
  for (let next = pending.pop(); next; next = pending.pop()) {
    const [node, depth] = next;
    out.push(`${"  ".repeat(depth)}${node.name}${node.children.length > 0 ? "/" : ""}`);
    pushChildren(node, depth + 1);
  }
  return out;
}

function renderTreeLines(lines: string[]): string[] | null {
  const tree = parseTree(lines);
  return tree ? [...treeLines(tree.root), ...(tree.footer ? [tree.footer] : [])] : null;
}

const TREE_SECOND_LINE_START = [...TREE_CONNECTORS];

/**
 * Strong signature for a tree whose call carried no command: a root line, a connector on the
 * second line, and a footer whose counts match the entries read.
 */
export function hasTreeSignature(text: string): boolean {
  const firstBreak = text.indexOf("\n");
  if (firstBreak < 0) return false;
  const second = text.slice(firstBreak + 1, firstBreak + 5).replaceAll(" ", " ");
  if (!TREE_SECOND_LINE_START.includes(second)) return false;
  const lines = splitListingLines(text);
  return lines !== null && Boolean(parseTree(lines)?.footer);
}

// ── Dispatch ────────────────────────────────────────────────────────────────────────────────

const DIALECT_RENDERERS: Record<
  ListingDialect,
  [name: string, lines: (lines: string[]) => string[] | null]
> = {
  ls: ["ls-long", lsLines],
  find: ["find-paths", (lines) => pathListLines(lines, false)],
  tree: ["tree", renderTreeLines],
};

/**
 * Shell listings. The dialect comes from the correlated command (the same source the dispatcher
 * routed with) and, without one, from the strong tree signature.
 */
export const renderFileListing: Renderer = (text, detection) => {
  const dialect =
    listingDialectForCommand(detection.command ?? "") ?? (hasTreeSignature(text) ? "tree" : null);
  const lines = dialect ? splitListingLines(text) : null;
  if (!dialect || !lines) return NO_RENDER(text);
  const [renderer, toLines] = DIALECT_RENDERERS[dialect];
  const out = toLines(lines);
  return out ? finish(text, out, renderer) : NO_RENDER(text);
};
