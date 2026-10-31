// scripts/check/ratchet.mjs
// Shared machinery for the per-file/per-TS-code typecheck ratchets.
//
// Three gates use this: the build program, the API-route program, and (via its
// own copy) the dashboard one. They differ in which tsconfig they compile and
// which baseline they compare against; everything about *how* a ratchet behaves
// is here so the three cannot drift apart.
//
// The rules this encodes, all learned from a gate that could be satisfied without
// fixing anything:
//
//   - a new or raised count is a regression; a lower count is an improvement you
//     may bank with --update
//   - --update refuses to bank a regression, because turning a red build green by
//     widening the baseline is the failure mode the ratchet exists to prevent
//   - @ts-nocheck makes a file report nothing, so it is invisible to every
//     diagnostic-based check; it is frozen by name and scanned separately
//   - @ts-ignore / @ts-expect-error are per-line and are counted, not frozen
//   - the program's own shape is frozen too, because removing a directory from
//     `include` makes diagnostics disappear and reads as an improvement

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { runScopedTypecheck } from "./run-scoped-typecheck.mjs";

// tsc's pragma shape: a single-line comment whose first word is the pragma,
// terminated by whitespace, a colon (`// @ts-nocheck: reason`), or end of line.
const PRAGMA = /^\/\/\/?\s*@ts-nocheck(?=[\s:]|$)/;

// tsc honours the line pragma as a leading comment, trailing after code, and
// inside both block-comment forms. Deliberately unanchored: over-counting a
// string literal fails a legitimate commit rather than passing an illegitimate one.
const LINE_PRAGMA = /(?:\/\/|\/\*)[^\n]*@ts-(?:expect-error|ignore)(?![a-z-])/;

/**
 * Offset of a `@ts-nocheck` that TypeScript will actually honour, or -1.
 *
 * tsc disables checking for the whole file when a single-line comment matching the
 * pragma appears in the file's leading trivia. This walks that trivia the way the
 * compiler does rather than approximating it, because every approximation misses a
 * different real case: a fixed read window misses a directive behind a long licence
 * banner, judging only the first textual occurrence is defeated by a comment that
 * mentions the pragma above the real directive, and treating `#!` as a statement
 * misses every file with a shebang.
 */
export function noCheckOffset(source) {
  let i = source.startsWith("#!") ? source.indexOf("\n") + 1 || source.length : 0;
  for (;;) {
    while (i < source.length && /\s/.test(source[i])) i++;
    if (source.startsWith("//", i)) {
      const end = source.indexOf("\n", i);
      const text = source.slice(i, end === -1 ? source.length : end);
      if (PRAGMA.test(text)) return i;
      if (end === -1) return -1;
      i = end;
    } else if (source.startsWith("/*", i)) {
      const end = source.indexOf("*/", i + 2);
      if (end === -1) return -1;
      i = end + 2;
    } else {
      return -1;
    }
  }
}

export function scanNoCheckFiles(files, root) {
  const found = [];
  for (const rel of files) {
    // Generated trees are rebuilt from their sources on every run, so a directive
    // inside one describes no file that anyone maintains.
    if (rel.startsWith(".source/")) continue;
    let source;
    try {
      source = fs.readFileSync(path.join(root, rel), "utf8");
    } catch {
      continue;
    }
    if (noCheckOffset(source) !== -1) found.push(rel);
  }
  return found.sort();
}

export function countLineSuppressions(files, root) {
  const counts = {};
  for (const rel of files) {
    let source;
    try {
      source = fs.readFileSync(path.join(root, rel), "utf8");
    } catch {
      continue;
    }
    let n = 0;
    for (const line of source.split(/\r?\n/)) {
      if (LINE_PRAGMA.test(line)) n++;
    }
    if (n > 0) counts[rel] = n;
  }
  return counts;
}

export function suppressionDrift(baselineCounts, liveCounts) {
  const regressions = [];
  for (const [file, live] of Object.entries(liveCounts)) {
    const was = baselineCounts[file] || 0;
    if (live > was) regressions.push({ file, was, live });
  }
  return regressions;
}

/**
 * Files that carry baselined errors and also opt out of checking.
 *
 * The two lists do not overlap in practice, because a file with @ts-nocheck
 * reports no diagnostics. That is why it is worth asserting: the day they overlap,
 * a frozen count is describing a file nobody checks, and the count will not shrink
 * on its own because nothing produces errors to clear.
 *
 * The first argument must be the baseline's file list, not the live one — a file
 * that gains the directive is exactly the file that leaves the live run, so
 * intersecting against live is empty by construction.
 */
export function suppressedIntersection(baselineFiles, noCheckFiles) {
  const optedOut = new Set(noCheckFiles);
  return [...baselineFiles].filter((f) => optedOut.has(f)).sort();
}

/**
 * Decides whether `--update` may rewrite the baseline. Returns null when it may,
 * or a reason when it may not. Exported for unit testing.
 */
export function updateRefusal(regressions, { force } = {}) {
  if (force) return null;
  if (regressions.length === 0) return null;
  return `${regressions.length} pair(s) would freeze a new or raised error`;
}

/** The exact set of files the compiler resolved, relative to `root`, slash-separated. */
export function programFiles(root, config, maxOldSpaceSizeMb) {
  const out = runScopedTypecheck(root, config, {
    maxOldSpaceSizeMb,
    incremental: false,
    listOnly: true,
  });
  return out
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.includes("node_modules"))
    .map((abs) => path.relative(root, abs).split(path.sep).join("/"))
    .filter((rel) => rel && !rel.startsWith(".."))
    .sort();
}

/**
 * Reads a tsconfig the way the compiler does. A regex that strips comments also
 * eats the `/*` inside a string like `"@/*"` and silently corrupts the config.
 */
function readTsConfig(root, file) {
  const require = createRequire(import.meta.url);
  const ts = require(path.join(root, "node_modules/typescript"));
  const { config, error } = ts.readConfigFile(file, ts.sys.readFile);
  if (error) {
    throw new Error(
      `cannot read ${path.relative(root, file)}: ${ts.flattenDiagnosticMessageText(error.messageText, " ")}`
    );
  }
  return config;
}

/**
 * The program's own shape, recorded in the baseline. Without this, the cheapest way
 * to satisfy a ratchet is not to silence a file but to shrink the program.
 */
export function programFingerprint(root, configPath, fileCount) {
  const build = readTsConfig(root, configPath);
  const base = build.extends ? readTsConfig(root, path.resolve(path.dirname(configPath), build.extends)) : {};
  return {
    files: fileCount,
    include: build.include || [],
    exclude: build.exclude || [],
    compilerOptions: { ...(base.compilerOptions || {}), ...(build.compilerOptions || {}) },
  };
}

export function fingerprintDrift(recorded, current) {
  if (!recorded) return [];
  const drift = [];
  for (const key of ["include", "exclude", "compilerOptions"]) {
    const a = JSON.stringify(recorded[key] ?? null);
    const b = JSON.stringify(current[key] ?? null);
    if (a !== b) drift.push(`${key} changed`);
  }
  // The file count is recorded for the audit trail but is not a drift signal:
  // adding or deleting a source file is ordinary work.
  return drift;
}
