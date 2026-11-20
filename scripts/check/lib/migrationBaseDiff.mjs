// scripts/check/lib/migrationBaseDiff.mjs
// Comparison of the HEAD migrations with those of the BASE (the branch that will receive the merge, or the
// latest release tag with --base-latest-tag). Used by
// scripts/check/check-migration-numbering.mjs. JS puro: roda em node sem tsx.
//
// WHY: in the date format the numbering gate no longer sees gaps (the timestamp is not
// sequential). Deleting or renaming an ALREADY MERGED migration would go unnoticed:
//   - deleted: a new installation lacks the schema, an updated database has it (divergence);
//   - renamed: every database that already applied it runs it again (duplicate DML, CREATE without
//     IF NOT EXISTS breaks boot). Repro: adversarial review R3-1 of 2026-11-13.
// So the gate compares the disk with the base and:
//   (a) a base file that disappeared from disk → FAIL, whether or not it shipped in a tag: every push
//       on a release/v* publishes Docker :next and runs in homologation, VPS and the sync of
//       Enterprise, so a merged migration has already run in real databases. Only exception:
//       a rename covered by a RENAMED_MIGRATION_COMPATIBILITY entry (in HEAD) with
//       identical content → warning + commutation check, whatever the new timestamp is
//       (the rename changes the position in new installations, not in updated databases), with
//       `--must-not-apply <target>`: the checker fails if the real runner applies the target
//       again to the updated database (wrong entry, or constants.ts text that the parser
//       read differently from TypeScript); different content → FAIL; a rename that keeps the
//       version (only the description changes) → FAIL, with or without an entry (the runner would apply it
//       again with the entry, or skip it by version without it);
//   (b) a base file with different content → warning + commutation check;
//   (c) a date-based migration added with timestamp ≤ the largest timestamp in the base → check of
//       commutation (scripts/check/migration-commutation.ts), which builds the "updated" database
//       (base, then HEAD) and the "new" one (HEAD at once) and compares;
//   (d) a legacy-format file added below the largest legacy number in the base → FAIL
//       (the legacy series is frozen).
//
// This file has the PURE part (findBaseDiffAnomalies, classifyRemovals, parsers) separated
// from the orchestration (git and child process), so tests can cover the rules without a repository.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Path of the migrations directory relative to the repository root (git format). */
export const MIGRATIONS_REL_DIR = "src/lib/db/migrations";

/** GitHub Actions events in which the base is required (PR and merge queue). */
export const BASE_REQUIRED_EVENTS = new Set(["pull_request", "pull_request_target", "merge_group"]);

/** Maximum time for the commutation checker (two boot paths with all migrations). */
export const COMMUTATION_TIMEOUT_MS = 10 * 60 * 1000;

const LIB_DIR = path.dirname(fileURLToPath(import.meta.url));
/** Root of the repository containing this gate (checker cwd, for `@/` aliases). */
export const GATE_REPO_ROOT = path.resolve(LIB_DIR, "..", "..", "..");
/** Default commutation checker; `MIGRATION_COMMUTATION_SCRIPT` overrides (tests only). */
export const DEFAULT_COMMUTATION_SCRIPT = path.resolve(LIB_DIR, "..", "migration-commutation.ts");

/** File of the runner compatibility tables, relative to the repository root. */
export const COMPAT_CONSTANTS_REL_PATH = "src/lib/db/migrationRunner/constants.ts";

/**
 * Tag de release publicada: exatamente `vX.Y.Z`. Fica de fora o que tem sufixo
 * (`v3.8.51-nightly.20260915.21a0ee1`, `v3.8.52-hdl-20261009.1`).
 */
export const RELEASE_TAG_RE = /^v(\d+)\.(\d+)\.(\d+)$/;

/**
 * Release tag of the Enterprise repository (`v3.8.54-ee.1`): it never receives the CE tags,
 * so --base-latest-tag falls back to it when there is no pure `vX.Y.Z` in the history.
 */
export const ENTERPRISE_RELEASE_TAG_RE = /^v(\d+)\.(\d+)\.(\d+)-ee\.(\d+)$/;

const TIMESTAMP_PREFIX_RE = /^(\d{14})_(.+)\.sql$/;
const LEGACY_PREFIX_RE = /^(\d{3})_(.+)\.sql$/;
const MIGRATION_NAME_RE = /^(\d+)_(.+)\.sql$/;

function descriptionOf(name) {
  const match = name.match(MIGRATION_NAME_RE);
  return match ? match[2] : null;
}

/**
 * Pure function — compares the list of migrations in the base with those in HEAD.
 *
 * @param {{ baseFiles: Map<string, string>, headFiles: Map<string, string> }} input
 *   file name → git blob id in the base and in HEAD
 * @returns {{
 *   removed: Array<{ name: string, renamedTo?: string }>,
 *   modified: string[],
 *   addedOutOfOrder: string[],
 *   addedLegacyBelowBase: string[],
 *   baseMaxTimestamp: string | null,
 * }}
 *   `removed`: in the base and not on disk; `renamedTo` points to the new file with the same
 *   content or the same description (probable rename). `modified`: same name, different
 *   blob. `addedOutOfOrder`: date-based migrations not in the base whose timestamp
 *   is ≤ the largest timestamp in the base (they need the commutation check).
 *   `addedLegacyBelowBase`: legacy-format files (3 digits) not in the base and
 *   whose number is LOWER than the largest legacy number in the base — filling a gap in the
 *   frozen series, regardless of KNOWN_GAPS. Above the largest in the base is legitimate (a PR
 *   release/vX → main brings the legacy ones that main does not yet have).
 */
export function findBaseDiffAnomalies({ baseFiles, headFiles }) {
  const added = [...headFiles.keys()].filter((name) => !baseFiles.has(name)).sort();

  let baseMaxTimestamp = null;
  let baseMaxLegacy = null;
  for (const name of baseFiles.keys()) {
    const match = name.match(TIMESTAMP_PREFIX_RE);
    if (match && (baseMaxTimestamp === null || match[1] > baseMaxTimestamp)) {
      baseMaxTimestamp = match[1];
    }
    const legacy = name.match(LEGACY_PREFIX_RE);
    if (legacy && (baseMaxLegacy === null || Number(legacy[1]) > baseMaxLegacy)) {
      baseMaxLegacy = Number(legacy[1]);
    }
  }

  const addedLegacyBelowBase =
    baseMaxLegacy === null
      ? []
      : added.filter((name) => {
          const legacy = name.match(LEGACY_PREFIX_RE);
          return legacy !== null && Number(legacy[1]) < baseMaxLegacy;
        });

  const removed = [];
  const modified = [];
  for (const [name, blob] of [...baseFiles.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    if (!headFiles.has(name)) {
      const description = descriptionOf(name);
      const renamedTo =
        added.find((candidate) => headFiles.get(candidate) === blob) ??
        (description ? added.find((candidate) => descriptionOf(candidate) === description) : null);
      removed.push(renamedTo ? { name, renamedTo } : { name });
    } else if (headFiles.get(name) !== blob) {
      modified.push(name);
    }
  }

  const addedOutOfOrder = [];
  if (baseMaxTimestamp !== null) {
    for (const name of added) {
      const match = name.match(TIMESTAMP_PREFIX_RE);
      if (match && match[1] <= baseMaxTimestamp) addedOutOfOrder.push(name);
    }
  }

  return { removed, modified, addedOutOfOrder, addedLegacyBelowBase, baseMaxTimestamp };
}

/**
 * Pure function — two versions of a TS snippet with the SAME length and the same offsets as the
 * original: `code` replaces comments (`//`, `/* *\/`) with spaces and keeps strings;
 * `masked` also replaces the content of each literal ('…', "…", `…`) with spaces, keeping the
 * quotes. Line breaks are preserved in both (the `^` anchors with the m flag still
 * apply). Searching for the declaration in `masked` prevents an imitating string from counting.
 *
 * @param {string} source
 * @returns {{ code: string, masked: string }}
 */
function blankTsCommentsAndLiterals(source) {
  const blank = (text) => text.replace(/[^\n]/g, " ");
  let code = "";
  let masked = "";
  let i = 0;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (ch === "/" && next === "/") {
      let j = i;
      while (j < source.length && source[j] !== "\n") j += 1;
      const spaces = blank(source.slice(i, j));
      code += spaces;
      masked += spaces;
      i = j;
    } else if (ch === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const j = end === -1 ? source.length : end + 2;
      const spaces = blank(source.slice(i, j));
      code += spaces;
      masked += spaces;
      i = j;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      let j = i + 1;
      while (j < source.length && source[j] !== ch) j += source[j] === "\\" ? 2 : 1;
      const literal = source.slice(i, Math.min(j + 1, source.length));
      code += literal;
      masked += literal.length >= 2 ? ch + blank(literal.slice(1, -1)) + ch : blank(literal);
      i = j + 1;
    } else {
      code += ch;
      masked += ch;
      i += 1;
    }
  }
  return { code, masked };
}

const COMPAT_KEYS = ["fromVersion", "fromName", "toVersion", "toName"];

/**
 * Pure function — extracts, by text, the `RENAMED_MIGRATION_COMPATIBILITY` entries from
 * src/lib/db/migrationRunner/constants.ts (the gate is pure .mjs and does not import TS). Accepts
 * any key order, comments, single or double quotes and a trailing comma. The
 * declaration is searched outside comments and literals, at the start of a line, and must
 * exist exactly ONCE (a string imitating the declaration does not count). Unexpected
 * format (none or two declarations, an unclosed array, a missing key, a value that is
 * not a string literal) → error: better to fail than to ignore or invent an entry.
 *
 * @param {string} source content of constants.ts
 * @returns {Array<{ fromVersion: string, fromName: string, toVersion: string, toName: string }>}
 */
export function parseRenamedMigrationCompatibility(source) {
  const { code, masked } = blankTsCommentsAndLiterals(source);
  const declarations = [
    ...masked.matchAll(/^export\s+const\s+RENAMED_MIGRATION_COMPATIBILITY\b[^=]*=\s*\[/gm),
  ];
  if (declarations.length === 0) {
    throw new Error("RENAMED_MIGRATION_COMPATIBILITY not found in constants.ts");
  }
  if (declarations.length > 1) {
    throw new Error(
      `RENAMED_MIGRATION_COMPATIBILITY: ${declarations.length} declarations in constants.ts ` +
        `(exactly one expected, at the start of a line)`
    );
  }
  const declaration = declarations[0];
  const open = declaration.index + declaration[0].length - 1;
  let depth = 0;
  let close = -1;
  for (let i = open; i < masked.length && close === -1; i++) {
    const ch = masked[i];
    if (ch === "[") {
      depth += 1;
    } else if (ch === "]") {
      depth -= 1;
      if (depth === 0) close = i;
    }
  }
  if (close === -1) throw new Error("RENAMED_MIGRATION_COMPATIBILITY: array sem fechamento");
  // Same offsets in both texts: the values are read with their literals intact.
  const body = code.slice(open + 1, close);

  const entries = [];
  const objectRe = /\{([^{}]*)\}/g;
  let match;
  while ((match = objectRe.exec(body)) !== null) {
    const fields = {};
    const fieldRe = /([A-Za-z_$][\w$]*)\s*:\s*(?:"([^"\\]*)"|'([^'\\]*)')/g;
    let field;
    while ((field = fieldRe.exec(match[1])) !== null) {
      fields[field[1]] = field[2] ?? field[3];
    }
    const missing = COMPAT_KEYS.filter((key) => typeof fields[key] !== "string");
    if (missing.length > 0) {
      throw new Error(
        `RENAMED_MIGRATION_COMPATIBILITY: entry missing ${missing.join(", ")} (string literal): ` +
          `{${match[1].replace(/\s+/g, " ").trim()}}`
      );
    }
    entries.push({
      fromVersion: fields.fromVersion,
      fromName: fields.fromName,
      toVersion: fields.toVersion,
      toName: fields.toName,
    });
  }
  const leftover = body.replace(objectRe, "").replace(/[\s,]/g, "");
  if (leftover) {
    throw new Error(`RENAMED_MIGRATION_COMPATIBILITY: unexpected content in array: ${leftover}`);
  }
  return entries;
}

/**
 * Pure function — decides the fate of each base file that disappeared from disk. Strict rule:
 * only a rename covered by a compatibility entry (target in HEAD and outside the base, with
 * ANOTHER version) is accepted, and only with identical content; everything else (delete, rename without
 * an entry, an entry whose target is not on disk) goes to `forbidden`, whether or not the file shipped
 * in a tag.
 *
 * A rename that keeps the version (only the description changes) goes to `renamedSameVersion`, with
 * or without an entry (`covered` says whether there was one), and is always forbidden: with the entry, the runner
 * (reconcileRenumberedMigrations, when isSameSlotReplacement in
 * src/lib/db/migrationRunner/schemaState.ts) deletes the ledger line and applies the file
 * again; without it, the runner tracks only the version, skips the file in databases that already ran it and
 * flags the renumbering on every boot.
 *
 * @param {{
 *   removed: Array<{ name: string, renamedTo?: string }>,
 *   baseFiles: Map<string, string>,
 *   headFiles: Map<string, string>,
 *   compat: Array<{ fromVersion: string, fromName: string, toVersion: string, toName: string }>,
 * }} input
 * @returns {{
 *   renamedCovered: Array<{ name: string, to: string }>,
 *   renamedChanged: Array<{ name: string, to: string }>,
 *   renamedSameVersion: Array<{ name: string, to: string, covered: boolean }>,
 *   forbidden: Array<{ name: string, renamedTo?: string }>,
 * }}
 */
export function classifyRemovals({ removed, baseFiles, headFiles, compat }) {
  const result = { renamedCovered: [], renamedChanged: [], renamedSameVersion: [], forbidden: [] };
  for (const item of removed) {
    const sameVersion = findSameVersionTarget(item.name, { baseFiles, headFiles, compat });
    if (sameVersion) {
      result.renamedSameVersion.push({ name: item.name, ...sameVersion });
      continue;
    }
    const covered = findCompatTarget(item.name, { baseFiles, headFiles, compat });
    if (covered) {
      const bucket =
        headFiles.get(covered) === baseFiles.get(item.name)
          ? result.renamedCovered
          : result.renamedChanged;
      bucket.push({ name: item.name, to: covered });
      continue;
    }
    result.forbidden.push(item.renamedTo ? { name: item.name, renamedTo: item.renamedTo } : item);
  }
  return result;
}

/**
 * New file (in HEAD, outside the base) pointed to by a `from` = `name` entry with ANOTHER
 * version. An entry that keeps the version never covers (see findSameVersionTarget).
 */
function findCompatTarget(name, { baseFiles, headFiles, compat }) {
  const match = name.match(MIGRATION_NAME_RE);
  if (!match) return null;
  for (const entry of compat) {
    if (entry.fromVersion !== match[1] || entry.fromName !== match[2]) continue;
    if (entry.toVersion === entry.fromVersion) continue;
    const target = `${entry.toVersion}_${entry.toName}.sql`;
    if (headFiles.has(target) && !baseFiles.has(target)) return target;
  }
  return null;
}

/**
 * New file (in HEAD, outside the base) with the SAME version as `name` and a different description:
 * a rename that keeps the timestamp. `covered` says whether a compatibility entry points
 * from `name` to it.
 *
 * @returns {{ to: string, covered: boolean } | null}
 */
function findSameVersionTarget(name, { baseFiles, headFiles, compat }) {
  const match = name.match(MIGRATION_NAME_RE);
  if (!match) return null;
  const candidates = [...headFiles.keys()]
    .filter((candidate) => !baseFiles.has(candidate) && candidate !== name)
    .filter((candidate) => candidate.match(MIGRATION_NAME_RE)?.[1] === match[1])
    .sort();
  if (candidates.length === 0) return null;
  const coveredTarget = candidates.find((candidate) =>
    compat.some(
      (entry) =>
        entry.fromVersion === match[1] &&
        entry.fromName === match[2] &&
        entry.toVersion === match[1] &&
        `${entry.toVersion}_${entry.toName}.sql` === candidate
    )
  );
  return coveredTarget
    ? { to: coveredTarget, covered: true }
    : { to: candidates[0], covered: false };
}

const DML_KEYWORDS = new Set(["INSERT", "UPDATE", "DELETE", "REPLACE"]);

/**
 * Pure function — does the SQL have DML? A command is DML when it starts with INSERT, UPDATE, DELETE or
 * REPLACE, or when it starts with WITH [RECURSIVE] and the first of these words (or SELECT)
 * outside parentheses is DML (`WITH s AS (…) UPDATE …`). Ignores comments, literals and the
 * corpo de CREATE TRIGGER … BEGIN … END; dentro do gatilho cada CASE fecha com o seu END, e
 * only the END that closes the BEGIN ends the trigger.
 *
 * @param {string} sql
 * @returns {boolean}
 */
export function sqlHasDml(sql) {
  const tokens = tokenizeSqlForDml(sql);
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === ";") {
      i += 1;
      continue;
    }
    if (isCreateTrigger(tokens, i)) {
      i = skipTrigger(tokens, i);
      continue;
    }
    // One statement: up to the next ";" outside parentheses.
    const first = tokens[i];
    let depth = 0;
    let verdict = DML_KEYWORDS.has(first);
    let decided = first !== "WITH";
    let j = i + (first === "WITH" ? 1 : 0);
    for (; j < tokens.length; j++) {
      const token = tokens[j];
      if (token === "(") depth += 1;
      else if (token === ")") depth = Math.max(0, depth - 1);
      else if (token === ";" && depth === 0) break;
      else if (!decided && depth === 0 && (DML_KEYWORDS.has(token) || token === "SELECT")) {
        verdict = token !== "SELECT";
        decided = true;
      }
    }
    if (verdict) return true;
    i = j + 1;
  }
  return false;
}

/** CREATE [TEMP | TEMPORARY] TRIGGER at `i`? */
function isCreateTrigger(tokens, i) {
  if (tokens[i] !== "CREATE") return false;
  const next = tokens[i + 1] === "TEMP" || tokens[i + 1] === "TEMPORARY" ? i + 2 : i + 1;
  return tokens[next] === "TRIGGER";
}

/**
 * Index right after a CREATE TRIGGER statement that starts at `i`: the header (which can hold
 * a WHEN with CASE … END) runs to BEGIN; the body to the END that closes that BEGIN, counting
 * each CASE … END pair; then up to the ";" that ends the statement.
 */
function skipTrigger(tokens, i) {
  let j = i;
  let caseDepth = 0;
  for (; j < tokens.length; j++) {
    const token = tokens[j];
    if (token === "CASE") caseDepth += 1;
    else if (token === "END" && caseDepth > 0) caseDepth -= 1;
    else if (token === "BEGIN" && caseDepth === 0) break;
    else if (token === ";") return j + 1; // no BEGIN: malformed, end the statement here
  }
  let blockDepth = 1;
  for (j += 1; j < tokens.length && blockDepth > 0; j++) {
    if (tokens[j] === "CASE") blockDepth += 1;
    else if (tokens[j] === "END") blockDepth -= 1;
  }
  while (j < tokens.length && tokens[j] !== ";") j += 1;
  return j + 1;
}

/**
 * Words (upper case), "(", ")" and ";" of the SQL, with comments dropped and every literal
 * or quoted identifier ('…', "…", `…`, […]) replaced by the placeholder word `X`.
 *
 * @param {string} sql
 * @returns {string[]}
 */
function tokenizeSqlForDml(sql) {
  let clean = "";
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i];
    const next = sql[i + 1];
    if (ch === "-" && next === "-") {
      while (i < sql.length && sql[i] !== "\n") i += 1;
    } else if (ch === "/" && next === "*") {
      const end = sql.indexOf("*/", i + 2);
      i = end === -1 ? sql.length : end + 2;
      clean += " ";
    } else if (ch === "'" || ch === '"' || ch === "`" || ch === "[") {
      const closer = ch === "[" ? "]" : ch;
      let j = i + 1;
      while (j < sql.length) {
        if (sql[j] === closer) {
          if (closer !== "]" && sql[j + 1] === closer) {
            j += 2; // doubled quote = escaped quote
            continue;
          }
          break;
        }
        j += 1;
      }
      clean += " x ";
      i = j + 1;
    } else {
      clean += ch;
      i += 1;
    }
  }
  return (clean.match(/[A-Za-z_][A-Za-z0-9_$]*|[();]/g) ?? []).map((token) => token.toUpperCase());
}

/**
 * Pure function — sorts `vX.Y.Z` tags by version (largest first). Tags outside the format are
 * discarded.
 *
 * @param {string[]} tags
 * @returns {string[]}
 */
export function sortReleaseTagsDescending(tags, pattern = RELEASE_TAG_RE) {
  const parsed = [];
  for (const tag of tags) {
    const match = tag.match(pattern);
    if (match) parsed.push({ tag, parts: match.slice(1).map(Number) });
  }
  parsed.sort((a, b) => {
    for (let k = 0; k < a.parts.length; k++) {
      if (a.parts[k] !== b.parts[k]) return b.parts[k] - a.parts[k];
    }
    return 0;
  });
  return parsed.map((p) => p.tag);
}

// ---------------------------------------------------------------------------------------
// Orchestration (git, child process). Everything below receives the cwd of the analyzed repository.
// ---------------------------------------------------------------------------------------

function git(cwd, args, options = {}) {
  const binary = options.binary === true;
  return spawnSync("git", args, {
    cwd,
    // Binary mode returns Buffers (blob content is written byte for byte).
    ...(binary ? {} : { encoding: "utf-8" }),
    input: options.input === undefined ? undefined : Buffer.from(options.input, "utf-8"),
    maxBuffer: 256 * 1024 * 1024,
  });
}

function revParseCommit(cwd, ref) {
  const r = git(cwd, ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`]);
  return r.status === 0 ? r.stdout.trim() : null;
}

/**
 * Reads `--base <ref>` / `--base=<ref>` and `--base-latest-tag` from the command line. An unknown
 * option, or both base forms together → error.
 *
 * @param {string[]} argv
 * @returns {{ base: string | null, baseLatestTag: boolean }}
 */
export function parseGateArgs(argv) {
  let base = null;
  let baseLatestTag = false;
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--base") {
      const value = argv[i + 1];
      if (!value || value.startsWith("--")) throw new Error("--base needs a git ref");
      base = value;
      i += 1;
    } else if (arg.startsWith("--base=")) {
      base = arg.slice("--base=".length);
      if (!base) throw new Error("--base needs a git ref");
    } else if (arg === "--base-latest-tag") {
      baseLatestTag = true;
    } else {
      throw new Error(
        `unknown option ${arg} (usage: check-migration-numbering [--base <ref> | --base-latest-tag])`
      );
    }
  }
  if (base && baseLatestTag) {
    throw new Error("use --base <ref> OR --base-latest-tag, not both");
  }
  return { base, baseLatestTag };
}

/**
 * Release tags (`vX.Y.Z`) of the repository, largest version first. With `mergedInto`, only those
 * reachable from that commit (`git tag --merged`).
 *
 * @param {string} cwd
 * @param {{ mergedInto?: string }} [options]
 * @returns {string[]}
 */
export function listReleaseTags(cwd, options = {}) {
  const args = ["tag", "--list", "v*"];
  if (options.mergedInto) args.push("--merged", options.mergedInto);
  const r = git(cwd, args);
  if (r.status !== 0) throw new Error(`git tag failed: ${r.stderr.trim()}`);
  return sortReleaseTagsDescending(
    r.stdout.split("\n").map((line) => line.trim()),
    options.pattern ?? RELEASE_TAG_RE
  );
}

/**
 * Reads RENAMED_MIGRATION_COMPATIBILITY from constants.ts at the root of the analyzed repository.
 * Missing file → empty list (no covered renames).
 *
 * @param {string} repoRoot
 * @returns {Array<{ fromVersion: string, fromName: string, toVersion: string, toName: string }>}
 */
export function readRenamedMigrationCompatibility(repoRoot) {
  const file = path.join(repoRoot, COMPAT_CONSTANTS_REL_PATH);
  if (!fs.existsSync(file)) return [];
  return parseRenamedMigrationCompatibility(fs.readFileSync(file, "utf-8"));
}

/**
 * Solves the basis of comparison, in this order:
 *   0. `--base-latest-tag`: the largest release tag `vX.Y.Z` (semver order) reachable from
 *      HEAD (a local tag outside the history does not count); none → fail closed;
 *   1. `--base <ref>`; 2. env `MIGRATION_BASE_REF`;
 *   3. em evento de PR/fila (`GITHUB_EVENT_NAME` ∈ BASE_REQUIRED_EVENTS):
 * a. HEAD is merge commit → 1st parent (GitHub merge ref and queue candidate are
 *         merges whose 1st parent is the base);
 *      b. `merge_group.base_sha` from the payload (squash queue: the candidate is not a merge);
 *      c. `git merge-base HEAD origin/$GITHUB_BASE_REF`;
 *      d. none of this → fail closed.
 *   Outside a PR/queue and with no base → skip the comparison.
 *
 * @param {{ cwd: string, cliBase: string | null, latestTag?: boolean,
 *   env: Record<string, string | undefined> }} input
 * @returns {{ status: "resolved", sha: string, label: string }
 *   | { status: "skipped" }
 *   | { status: "error", message: string }}
 */
export function resolveBaseRef({ cwd, cliBase, latestTag = false, env }) {
  if (latestTag) {
    let tags;
    try {
      tags = listReleaseTags(cwd, { mergedInto: "HEAD" });
      // The Enterprise repository only carries its own vX.Y.Z-ee.N tags.
      if (tags.length === 0) {
        tags = listReleaseTags(cwd, { mergedInto: "HEAD", pattern: ENTERPRISE_RELEASE_TAG_RE });
      }
    } catch (err) {
      return { status: "error", message: `--base-latest-tag: ${err.message}` };
    }
    if (tags.length === 0) {
      return {
        status: "error",
        message:
          "--base-latest-tag: no release tag (vX.Y.Z, or vX.Y.Z-ee.N in Enterprise) in " +
          "the HEAD history, so there is nothing to compare. Run git fetch --tags (in CI: " +
          "actions/checkout with fetch-depth: 0).",
      };
    }
    const sha = revParseCommit(cwd, tags[0]);
    if (!sha) return { status: "error", message: `--base-latest-tag: tag ${tags[0]} unreadable` };
    // kind "tag": every file between the tag and HEAD is already merged on the branch, so the
    // hints must say "fix forward", never "rename" (V3-2 of the final review).
    return { status: "resolved", sha, label: `tag ${tags[0]}`, kind: "tag" };
  }

  const explicit = cliBase || env.MIGRATION_BASE_REF || null;
  if (explicit) {
    const sha = revParseCommit(cwd, explicit);
    if (!sha) {
      return {
        status: "error",
        message: `the base "${explicit}" is not a commit of this repository (git rev-parse failed)`,
      };
    }
    return { status: "resolved", sha, label: explicit };
  }

  const event = env.GITHUB_EVENT_NAME || "";
  if (!BASE_REQUIRED_EVENTS.has(event)) return { status: "skipped" };

  const parents = git(cwd, ["rev-list", "--parents", "-n", "1", "HEAD"]);
  const ids = parents.status === 0 ? parents.stdout.trim().split(/\s+/) : [];
  if (ids.length >= 3) {
    return { status: "resolved", sha: ids[1], label: "HEAD^1 (1º pai do merge)" };
  }

  if (event === "merge_group" && env.GITHUB_EVENT_PATH) {
    try {
      const payload = JSON.parse(fs.readFileSync(env.GITHUB_EVENT_PATH, "utf-8"));
      const baseSha = payload?.merge_group?.base_sha;
      const sha = baseSha ? revParseCommit(cwd, baseSha) : null;
      if (sha) return { status: "resolved", sha, label: "merge_group.base_sha" };
    } catch {
      // Unreadable payload: fall through to the next strategy (and fail closed at the end).
    }
  }

  if (env.GITHUB_BASE_REF) {
    const remote = `origin/${env.GITHUB_BASE_REF}`;
    const mb = git(cwd, ["merge-base", "HEAD", remote]);
    if (mb.status === 0 && mb.stdout.trim()) {
      return { status: "resolved", sha: mb.stdout.trim(), label: `merge-base HEAD ${remote}` };
    }
  }

  return {
    status: "error",
    message:
      `base unresolved in event ${event}: HEAD is not a merge commit and neither ` +
      `merge_group.base_sha nor origin/$GITHUB_BASE_REF are available. Check out ` +
      `com fetch-depth: 0, ou passe --base <ref> / MIGRATION_BASE_REF.`,
  };
}

/**
 * Lists the base migrations: name → blob (`git ls-tree`). Only blob-type entries.
 *
 * @param {string} cwd
 * @param {string} sha
 * @returns {Map<string, string>}
 */
export function listBaseMigrations(cwd, sha) {
  const r = git(cwd, ["ls-tree", "-z", sha, "--", `${MIGRATIONS_REL_DIR}/`]);
  if (r.status !== 0) throw new Error(`git ls-tree ${sha} failed: ${r.stderr.trim()}`);
  const files = new Map();
  for (const record of r.stdout.split("\0")) {
    if (!record) continue;
    const tab = record.indexOf("\t");
    const [, type, blob] = record.slice(0, tab).split(" ");
    const name = path.posix.basename(record.slice(tab + 1));
    if (type === "blob") files.set(name, blob);
  }
  return files;
}

/**
 * Lists the disk migrations (regular files) with the blob that git would record.
 *
 * @param {string} cwd
 * @param {string[]} regularNames basenames of the regular files in the directory
 * @returns {Map<string, string>}
 */
export function listHeadMigrations(cwd, regularNames) {
  const files = new Map();
  if (regularNames.length === 0) return files;
  const rel = regularNames.map((name) => `${MIGRATIONS_REL_DIR}/${name}`);
  const r = git(cwd, ["hash-object", "--stdin-paths"], { input: rel.join("\n") + "\n" });
  if (r.status !== 0) throw new Error(`git hash-object failed: ${r.stderr.trim()}`);
  const blobs = r.stdout.trim().split("\n");
  regularNames.forEach((name, i) => files.set(name, blobs[i]));
  return files;
}

/**
 * Writes the content of the base blobs to `targetDir` (`git cat-file --batch`, one process).
 *
 * @param {string} cwd
 * @param {Map<string, string>} baseFiles nome → blob
 * @param {string} targetDir
 */
export function extractBaseMigrations(cwd, baseFiles, targetDir) {
  const entries = [...baseFiles.entries()];
  if (entries.length === 0) return;
  const r = git(cwd, ["cat-file", "--batch"], {
    input: entries.map(([, blob]) => blob).join("\n") + "\n",
    binary: true,
  });
  if (r.status !== 0) throw new Error(`git cat-file failed: ${String(r.stderr).trim()}`);
  const out = r.stdout;
  let offset = 0;
  for (const [name] of entries) {
    const headerEnd = out.indexOf(0x0a, offset);
    const header = out.subarray(offset, headerEnd).toString("utf-8").split(" ");
    if (header[1] !== "blob") throw new Error(`unreadable base blob for ${name}`);
    const size = Number(header[2]);
    const start = headerEnd + 1;
    fs.writeFileSync(path.join(targetDir, name), out.subarray(start, start + size));
    offset = start + size + 1;
  }
}

/**
 * Phrase that the commutation checker prints whenever a PR migration fails to be
 * applied on the updated path (with or without a failure on the new path too). Contract C1 with
 * scripts/check/migration-commutation.ts.
 */
export const NOT_AFTER_BASE_PHRASE = "does not apply after all base migrations";

/**
 * Phrase that the checker prints (with exit 1) when a file passed in
 * `--must-not-apply` is applied on the second boot of the updated path. Contract C2 with
 * scripts/check/migration-commutation.ts.
 */
export const APPLIED_AGAIN_PHRASE = "applied again on the updated database";

/**
 * Runs the commutation checker (contract in scripts/check/migration-commutation.ts):
 * base-dir = base migrations extracted from git; head-dir = copy of the disk directory.
 * `mergedBase` (base = release tag) becomes `--merged-base`: the checker's hints say
 * "fix forward", never "rename".
 * Each `mustNotApply` name becomes a `--must-not-apply <file.sql>`: the target of a
 * covered rename must not be applied on the updated database (the runner only moves the ledger
 * line), and the checker verifies this through the real runner's behavior, not the text
 * of constants.ts.
 * Exit 0 = identical schemas, 1 = they diverge, other = infrastructure error.
 *
 * @param {{ cwd: string, baseFiles: Map<string, string>, migrationsDir: string,
 *   headNames: string[], mustNotApply?: string[], mergedBase?: boolean,
 *   env: Record<string, string | undefined> }} input
 * @returns {{ status: "equal" | "different" | "error", output: string }}
 */
export function runCommutationCheck({
  cwd,
  baseFiles,
  migrationsDir,
  headNames,
  mustNotApply = [],
  mergedBase = false,
  env,
}) {
  const script = env.MIGRATION_COMMUTATION_SCRIPT || DEFAULT_COMMUTATION_SCRIPT;
  if (!fs.existsSync(script)) {
    return { status: "error", output: `commutation checker missing: ${script}` };
  }
  let tsxLoader;
  try {
    tsxLoader = import.meta.resolve("tsx/esm");
  } catch {
    return {
      status: "error",
      output: "tsx unavailable (npm ci): no way to run the checker",
    };
  }

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-commutation-"));
  try {
    const baseDir = path.join(tmp, "base");
    const headDir = path.join(tmp, "head");
    fs.mkdirSync(baseDir);
    fs.mkdirSync(headDir);
    extractBaseMigrations(cwd, baseFiles, baseDir);
    for (const name of headNames) {
      fs.copyFileSync(path.join(migrationsDir, name), path.join(headDir, name));
    }
    const args = ["--import", tsxLoader, script, "--base-dir", baseDir, "--head-dir", headDir];
    for (const name of [...new Set(mustNotApply)].sort()) args.push("--must-not-apply", name);
    if (mergedBase) args.push("--merged-base");
    const r = spawnSync(process.execPath, args, {
      cwd: GATE_REPO_ROOT,
      env,
      encoding: "utf-8",
      timeout: COMMUTATION_TIMEOUT_MS,
      maxBuffer: 64 * 1024 * 1024,
    });
    const output = [r.stdout, r.stderr].filter(Boolean).join("\n").trim();
    if (r.error) return { status: "error", output: `${r.error.message}\n${output}`.trim() };
    if (r.status === 0) return { status: "equal", output };
    if (r.status === 1) return { status: "different", output };
    return {
      status: "error",
      output: `verificador saiu com ${r.status ?? r.signal}${output ? `:\n${output}` : ""}`,
    };
  } catch (err) {
    return { status: "error", output: err instanceof Error ? err.message : String(err) };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
}
