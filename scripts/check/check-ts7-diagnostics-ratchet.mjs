#!/usr/bin/env node
// Blocks TypeScript 7 diagnostic regressions without requiring the existing
// migration backlog to be clean. The PR base and checked-out head are compiled
// with the same compiler and tsconfig, then compared as duplicate-preserving
// multisets of: relative file | TS code | normalized message.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const DEFAULT_TSCONFIG = "tsconfig.typecheck-core.json";
const DEFAULT_COMPILER_VERSION = "7.0.2";
const DIAGNOSTIC_START = /^(.+?)\((\d+),(\d+)\): error (TS\d+):\s*(.*)$/;
const GLOBAL_DIAGNOSTIC_START = /^error (TS\d+):\s*(.*)$/;

function normalizeSlashes(value) {
  return String(value).replaceAll("\\", "/");
}

function stripRoot(value, root) {
  const normalizedValue = normalizeSlashes(value);
  const normalizedRoot = normalizeSlashes(path.resolve(root)).replace(/\/$/, "");
  return normalizedValue === normalizedRoot
    ? "."
    : normalizedValue.startsWith(`${normalizedRoot}/`)
      ? normalizedValue.slice(normalizedRoot.length + 1)
      : normalizedValue;
}

export function normalizeDiagnosticMessage(message, root = ROOT) {
  const normalizedRoot = normalizeSlashes(path.resolve(root)).replace(/\/$/, "");
  return normalizeSlashes(message)
    .replaceAll(normalizedRoot, "<repo>")
    .replace(/((?:[A-Za-z]:)?[^()\s]+\.(?:[cm]?[jt]sx?|json))\(\d+,\d+\)/gi, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Parse complete `tsc --pretty false` diagnostic blocks. */
export function parseTscDiagnostics(raw, { root = ROOT } = {}) {
  const diagnostics = [];
  let current = null;

  const flush = () => {
    if (!current) return;
    const message = normalizeDiagnosticMessage(current.messageLines.join("\n"), root);
    diagnostics.push({
      file: current.file,
      code: current.code,
      message,
      key: `${current.file}\u0000${current.code}\u0000${message}`,
    });
    current = null;
  };

  for (const line of String(raw).split(/\r?\n/)) {
    const located = DIAGNOSTIC_START.exec(line);
    if (located) {
      flush();
      current = {
        file: stripRoot(located[1], root),
        code: located[4],
        messageLines: [located[5]],
      };
      continue;
    }

    const global = GLOBAL_DIAGNOSTIC_START.exec(line);
    if (global) {
      flush();
      current = { file: "<global>", code: global[1], messageLines: [global[2]] };
      continue;
    }

    if (current && /^\s/.test(line) && line.trim()) current.messageLines.push(line);
  }
  flush();
  return diagnostics;
}

export function toDiagnosticMultiset(diagnostics) {
  const counts = new Map();
  for (const diagnostic of diagnostics) {
    const entry = counts.get(diagnostic.key) ?? { ...diagnostic, count: 0 };
    entry.count += 1;
    counts.set(diagnostic.key, entry);
  }
  return counts;
}

export function diffDiagnosticMultisets(baseDiagnostics, headDiagnostics) {
  const base = toDiagnosticMultiset(baseDiagnostics);
  const head = toDiagnosticMultiset(headDiagnostics);
  const added = [];
  const removed = [];

  for (const [key, entry] of head) {
    const baseCount = base.get(key)?.count ?? 0;
    if (entry.count > baseCount) {
      added.push({ ...entry, baseCount, headCount: entry.count, delta: entry.count - baseCount });
    }
  }
  for (const [key, entry] of base) {
    const headCount = head.get(key)?.count ?? 0;
    if (entry.count > headCount) {
      removed.push({ ...entry, baseCount: entry.count, headCount, delta: entry.count - headCount });
    }
  }

  const order = (a, b) => a.key.localeCompare(b.key);
  return { added: added.sort(order), removed: removed.sort(order) };
}

export function hasParserPrerequisite(diagnostics) {
  return diagnostics.some((diagnostic) => diagnostic.code === "TS1005");
}

function argument(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    ...options,
  });
}

function resolveCommit(ref) {
  const result = run("git", ["rev-parse", "--verify", `${ref}^{commit}`]);
  if (result.status !== 0) {
    throw new Error(`cannot resolve base ref ${ref}: ${result.stderr.trim()}`);
  }
  return result.stdout.trim();
}

function sameLockfile(baseRoot) {
  const head = path.join(ROOT, "package-lock.json");
  const base = path.join(baseRoot, "package-lock.json");
  return (
    fs.existsSync(head) &&
    fs.existsSync(base) &&
    fs.readFileSync(head).equals(fs.readFileSync(base))
  );
}

function linkDependencies(baseRoot) {
  const source = path.join(ROOT, "node_modules");
  const target = path.join(baseRoot, "node_modules");
  if (!fs.existsSync(source)) throw new Error("node_modules is missing; run npm ci first");

  fs.mkdirSync(target);
  for (const entry of fs.readdirSync(source)) {
    if (entry === "@omniroute") continue;
    fs.symlinkSync(path.join(source, entry), path.join(target, entry), "junction");
  }

  const scope = path.join(target, "@omniroute");
  fs.mkdirSync(scope);
  fs.symlinkSync(path.join(baseRoot, "open-sse"), path.join(scope, "open-sse"), "junction");
  fs.symlinkSync(
    path.join(baseRoot, "packages", "browser-pool"),
    path.join(scope, "browser-pool"),
    "junction"
  );
}

function installBaseDependencies(baseRoot) {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = run(
    npm,
    ["ci", "--ignore-scripts", "--prefer-offline", "--no-audit", "--no-fund"],
    { cwd: baseRoot, stdio: "inherit" }
  );
  if (result.status !== 0) throw new Error(`npm ci for the base worktree exited ${result.status}`);
}

function runTypeScript(root, tsconfig, compilerVersion) {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = run(
    npm,
    [
      "exec",
      "--yes",
      `--package=typescript@${compilerVersion}`,
      "--",
      "tsc",
      "--pretty",
      "false",
      "--noEmit",
      "-p",
      tsconfig,
    ],
    { cwd: root }
  );
  if (result.error) throw result.error;
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
  const diagnostics = parseTscDiagnostics(output, { root });
  if (result.status !== 0 && diagnostics.length === 0) {
    throw new Error(
      `TypeScript exited ${result.status} without a parseable diagnostic:\n${output}`
    );
  }
  return { diagnostics, status: result.status ?? 0 };
}

function formatEntry(entry) {
  return `${entry.file} ${entry.code}: ${entry.message} (${entry.baseCount} -> ${entry.headCount})`;
}

function appendSummary({ baseRef, baseCount, headCount, added, removed, skipped }) {
  const summary = process.env.GITHUB_STEP_SUMMARY;
  if (!summary) return;
  const lines = [
    "## TypeScript 7 zero-new-diagnostics ratchet",
    "",
    `- Base: \`${baseRef}\` (${baseCount} diagnostics)`,
    `- Head: ${headCount} diagnostics`,
    `- Added: ${added.reduce((sum, entry) => sum + entry.delta, 0)}`,
    `- Removed: ${removed.reduce((sum, entry) => sum + entry.delta, 0)}`,
  ];
  if (skipped) lines.push("- Status: parser prerequisite unresolved; comparison is advisory");
  if (added.length) {
    lines.push("", "### Added diagnostics", "", ...added.map((entry) => `- ${formatEntry(entry)}`));
  }
  fs.appendFileSync(summary, `${lines.join("\n")}\n`);
}

function main() {
  const baseRef = argument("--base-ref", process.env.TS7_BASE_REF ?? "");
  const tsconfig = argument("--tsconfig", DEFAULT_TSCONFIG);
  const compilerVersion = argument("--compiler-version", DEFAULT_COMPILER_VERSION);
  if (!baseRef) {
    console.log("[ts7-ratchet] SKIP — --base-ref is required outside a pull request");
    return 0;
  }
  if (!fs.existsSync(path.join(ROOT, tsconfig))) {
    throw new Error(`tsconfig not found: ${tsconfig}`);
  }

  const baseCommit = resolveCommit(baseRef);
  const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ts7-ratchet-"));
  const baseRoot = path.join(temporaryRoot, "base");
  let worktreeAdded = false;

  try {
    const add = run("git", ["worktree", "add", "--detach", baseRoot, baseCommit]);
    if (add.status !== 0) throw new Error(`cannot create base worktree: ${add.stderr.trim()}`);
    worktreeAdded = true;

    if (sameLockfile(baseRoot)) linkDependencies(baseRoot);
    else installBaseDependencies(baseRoot);

    console.log(
      `[ts7-ratchet] TypeScript ${compilerVersion}; base=${baseCommit}; config=${tsconfig}`
    );
    const base = runTypeScript(baseRoot, tsconfig, compilerVersion);
    const head = runTypeScript(ROOT, tsconfig, compilerVersion);
    const { added, removed } = diffDiagnosticMultisets(base.diagnostics, head.diagnostics);
    const parserBlocked = hasParserPrerequisite(base.diagnostics);

    console.log(`ts7DiagnosticsBase=${base.diagnostics.length}`);
    console.log(`ts7DiagnosticsHead=${head.diagnostics.length}`);
    console.log(`ts7DiagnosticsAdded=${added.reduce((sum, entry) => sum + entry.delta, 0)}`);
    console.log(`ts7DiagnosticsRemoved=${removed.reduce((sum, entry) => sum + entry.delta, 0)}`);

    appendSummary({
      baseRef: baseCommit,
      baseCount: base.diagnostics.length,
      headCount: head.diagnostics.length,
      added,
      removed,
      skipped: parserBlocked,
    });

    if (parserBlocked) {
      console.warn(
        "[ts7-ratchet] SKIP — the release base still has TS1005 parser diagnostics. " +
          "Resolve #10094 before making this comparison blocking; those errors are not accepted as baseline."
      );
      return 0;
    }

    if (added.length) {
      console.error(
        `[ts7-ratchet] FAIL — the PR adds ${added.reduce((sum, entry) => sum + entry.delta, 0)} ` +
          `normalized TypeScript 7 diagnostic(s):\n${added.map((entry) => `  ✗ ${formatEntry(entry)}`).join("\n")}`
      );
      return 1;
    }

    console.log(
      `[ts7-ratchet] OK — no new normalized diagnostics; ` +
        `${removed.reduce((sum, entry) => sum + entry.delta, 0)} removed.`
    );
    return 0;
  } finally {
    if (worktreeAdded) {
      const remove = run("git", ["worktree", "remove", "--force", baseRoot]);
      if (remove.status !== 0) {
        console.warn(`[ts7-ratchet] WARN — temporary worktree cleanup: ${remove.stderr.trim()}`);
      }
      run("git", ["worktree", "prune"]);
    }
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  try {
    process.exitCode = main();
  } catch (error) {
    console.error(`[ts7-ratchet] FAIL — ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 2;
  }
}
