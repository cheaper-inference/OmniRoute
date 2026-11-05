#!/usr/bin/env node
// The former default of 12000 files was a leak heuristic, not a quality ratchet.
// Legitimate source growth crossed it, while smaller accidental copies still passed.
// Check actual TypeScript roots, independent path policy and file provenance instead.
// Transitive imports are not enumerated; this is not a replacement for the build.
// Usage: node scripts/check/check-build-scope.mjs [--max N] [--json] [--root DIR]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const REQUIRED_EXCLUSIONS = [
  "node_modules",
  ".claude",
  ".worktrees",
  "_tasks",
  "_references",
  "_mono_repo",
  "_ideia",
];
// Repository source areas, deliberately independent of the current Git index.
const SOURCE_ROOTS = new Set([
  "src",
  "tests",
  "open-sse",
  "scripts",
  "bin",
  "electron",
  "packages",
  "examples",
  "public",
  "docs",
  "@omniroute",
  "vscode-extension",
]);
const FORBIDDEN_SEGMENTS = new Set(["node_modules", ".git", ".claude", ".worktrees"]);
const posix = (value) => value.split(path.sep).join("/");
function within(root, file) {
  const relative = path.relative(root, file);
  return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
class ScopeError extends Error {
  constructor(code, message, exitCode = 2, file = undefined) {
    super(message);
    this.findings = [{ code, message, ...(file === undefined ? {} : { path: file }) }];
    this.exitCode = exitCode;
  }
}
function generatedType(file) {
  return (
    file === "next-env.d.ts" ||
    /^(?:\.next(?:-playwright)?|\.build\/next)\/(?:dev\/){0,2}types\/(?:[^/]+\/)*[^/]+\.ts$/.test(
      file
    )
  );
}
function protectedPath(file) {
  const parts = file.split("/");
  return (
    parts.some((part) => FORBIDDEN_SEGMENTS.has(part)) ||
    parts[0].startsWith("_") ||
    file.startsWith("electron/dist-electron/")
  );
}
function allowedSource(file) {
  if (protectedPath(file)) return false;
  if (generatedType(file)) return true;
  const parts = file.split("/");
  if (parts.length === 1) return /^[\w.-]+\.config\.[cm]?[jt]sx?$/.test(file);
  return SOURCE_ROOTS.has(parts[0]);
}
function validateMax(max) {
  if (max !== null && (!Number.isSafeInteger(max) || max <= 0)) {
    throw new ScopeError("ARGUMENT", "--max must be a positive safe integer");
  }
}

/** Read-only inspection; injectable dependencies exercise failure paths without host mutations. */
export function inspectBuildScope(root, options = {}) {
  const fileSystem = options.fs ?? fs;
  const typescript = options.typescript ?? ts;
  const max = options.max ?? null;
  root = path.resolve(root);
  const report = {
    schema: "omniroute.build-scope.v2",
    status: "INCOMPLETE",
    exitCode: 2,
    root,
    typescriptVersion: typescript.version,
    scope: "Configured TypeScript root files; transitive imports are not measured",
    count: null,
    max,
    byTop: {},
    trackedCount: 0,
    generatedCount: 0,
    findings: [],
  };
  try {
    validateMax(max);
    // Runtime exports used by ts.sys itself, but not declared in typescript.d.ts.
    // A missing/incompatible API is incomplete evidence, never a permissive fallback.
    if (
      typeof typescript.matchFiles !== "function" ||
      typeof typescript.getFileMatcherPatterns !== "function"
    ) {
      throw new ScopeError(
        "TYPESCRIPT_API",
        "Installed TypeScript lacks the required scope matcher"
      );
    }
    const realRoot = fileSystem.realpathSync(root);
    const discoveredDirectories = new Set([root]);
    let exclusionsChecked = false;
    function verifyExclusions(excludes) {
      const patterns = typescript.getFileMatcherPatterns(
        root,
        excludes,
        undefined,
        typescript.sys.useCaseSensitiveFileNames,
        root
      );
      const excluded = patterns.excludePattern
        ? new RegExp(patterns.excludePattern, typescript.sys.useCaseSensitiveFileNames ? "" : "i")
        : null;
      // Test the directory barrier itself, not one guessed filename inside it.
      // A trailing slash also supports equivalent .claude/** exclusion syntax.
      const missing = REQUIRED_EXCLUSIONS.filter(
        (name) => !excluded?.test(`${posix(path.join(root, name))}/`)
      );
      if (missing.length) {
        const error = new ScopeError("MISSING_EXCLUSION", "Required scope barriers are absent", 1);
        error.findings = missing.map((name) => ({
          code: "MISSING_EXCLUSION",
          path: name,
          message: "Restore an effective exclusion for this entire directory",
        }));
        throw error;
      }
      exclusionsChecked = true;
    }
    function strictRealpath(file) {
      if (!within(root, path.resolve(file))) {
        throw new ScopeError(
          "SCOPE_ESCAPE",
          "Configured path escapes the repository",
          1,
          posix(file)
        );
      }
      let real;
      try {
        real = fileSystem.realpathSync(file);
      } catch (error) {
        // Optional glob bases such as .next/types may not exist yet. Losing a
        // previously discovered directory is instead incomplete evidence.
        if (error.code === "ENOENT" && !discoveredDirectories.has(path.resolve(file))) return file;
        throw error;
      }
      if (!within(realRoot, real))
        throw new ScopeError(
          "SCOPE_ESCAPE",
          "Included path escapes the repository",
          1,
          posix(file)
        );
      const physical = posix(path.relative(realRoot, real));
      const nominal = posix(path.relative(root, file));
      // Reject aliases before traversing their target. Direct files: entries are
      // still checked individually below, even when they override an exclusion.
      if (physical !== nominal && protectedPath(physical)) {
        throw new ScopeError(
          "FORBIDDEN_PHYSICAL_SOURCE",
          "Included directory resolves into a protected area",
          1,
          posix(file)
        );
      }
      return real;
    }
    function entries(directory) {
      let children;
      try {
        children = fileSystem.readdirSync(directory, { withFileTypes: true });
      } catch (error) {
        if (error.code === "ENOENT" && !discoveredDirectories.has(path.resolve(directory)))
          return { files: [], directories: [] };
        throw error;
      }
      const files = [],
        directories = [];
      for (const child of children) {
        const full = path.join(directory, child.name);
        const info = child.isSymbolicLink() ? fileSystem.statSync(full) : child;
        if (info.isFile()) files.push(child.name);
        else if (info.isDirectory()) {
          directories.push(child.name);
          discoveredDirectories.add(path.resolve(full));
        }
      }
      return { files, directories };
    }
    function readFile(file) {
      try {
        return fileSystem.readFileSync(file, "utf8");
      } catch (error) {
        if (error.code === "ENOENT") return undefined;
        throw error;
      }
    }
    const host = {
      useCaseSensitiveFileNames: typescript.sys.useCaseSensitiveFileNames,
      readFile,
      fileExists(file) {
        try {
          return fileSystem.statSync(file).isFile();
        } catch (error) {
          if (error.code === "ENOENT" || error.code === "ENOTDIR") return false;
          throw error;
        }
      },
      readDirectory(directory, extensions, excludes, includes, depth) {
        // Refuse a missing barrier before traversing every private worktree.
        verifyExclusions(excludes);
        return typescript.matchFiles(
          directory,
          extensions,
          excludes,
          includes,
          typescript.sys.useCaseSensitiveFileNames,
          root,
          depth,
          entries,
          strictRealpath
        );
      },
    };
    const configPath = path.join(root, "tsconfig.json");
    const loaded = typescript.readConfigFile(configPath, readFile);
    const parsed = loaded.error
      ? { errors: [loaded.error] }
      : typescript.parseJsonConfigFileContent(loaded.config, host, root, undefined, configPath);
    if (parsed.errors.length) {
      throw new ScopeError(
        "CONFIG_ERROR",
        parsed.errors
          .map(
            (error) =>
              `TS${error.code}: ${typescript.flattenDiagnosticMessageText(error.messageText, " ")}`
          )
          .join("; ")
      );
    }
    // A files-only config can avoid readDirectory but must preserve the barriers.
    if (!exclusionsChecked) verifyExclusions(parsed.raw.exclude);
    let tracked;
    try {
      const gitOptions = { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 };
      const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], gitOptions).trim();
      if (fileSystem.realpathSync(gitRoot) !== realRoot)
        throw new Error("Mismatched Git worktree root");
      tracked = new Set(
        execFileSync("git", ["ls-files", "--cached", "-z"], gitOptions).split("\0").filter(Boolean)
      );
    } catch {
      throw new ScopeError("GIT_ERROR", "Cannot verify the Git index for this exact worktree root");
    }
    report.count = parsed.fileNames.length;
    for (const file of parsed.fileNames) {
      const relative = posix(path.relative(root, file));
      const top = relative.includes("/") ? relative.split("/")[0] : "(root)";
      report.byTop[top] = (report.byTop[top] ?? 0) + 1;
      const real = fileSystem.realpathSync(file);
      // Explicit files entries need not have come from directory enumeration.
      // A directory or other special object named *.ts is never generated source.
      if (!fileSystem.statSync(file).isFile()) {
        report.findings.push({
          code: "NOT_FILE",
          path: relative,
          message: "Configured source does not resolve to a regular file",
        });
        continue;
      }
      const physical = posix(path.relative(realRoot, real));
      if (!within(root, file) || !within(realRoot, real))
        report.findings.push({
          code: "SCOPE_ESCAPE",
          path: relative,
          message: "Source escapes the repository",
        });
      if (!allowedSource(relative))
        report.findings.push({
          code: "FORBIDDEN_ROOT",
          path: relative,
          message: "Source is outside repository source areas or inside a protected directory",
        });
      // An indexed alias does not authorize its physical target. This also prevents
      // a generated-looking path from admitting private or unversioned source.
      if (physical !== relative && !allowedSource(physical)) {
        report.findings.push({
          code: "FORBIDDEN_PHYSICAL_SOURCE",
          path: relative,
          target: physical,
          message: "Source resolves outside repository source areas or into a protected directory",
        });
      }
      if (physical !== relative && !tracked.has(physical) && !generatedType(physical)) {
        report.findings.push({
          code: "UNTRACKED_PHYSICAL_SOURCE",
          path: relative,
          target: physical,
          message: "The physical source behind this alias is not in the Git index",
        });
      }
      if (tracked.has(relative)) report.trackedCount++;
      else if (
        generatedType(relative) &&
        allowedSource(relative) &&
        generatedType(physical) &&
        allowedSource(physical)
      )
        report.generatedCount++;
      else
        report.findings.push({
          code: "UNTRACKED_SOURCE",
          path: relative,
          message:
            "Included source is not in the Git index; review and stage intended new source, or remove the accidental copy from scope",
        });
    }
    if (max !== null && report.count > max)
      report.findings.push({
        code: "EXPLICIT_BUDGET",
        message: `Configured root-file count ${report.count} exceeds the explicitly requested budget ${max}`,
      });
    report.exitCode = report.findings.length ? 1 : 0;
    report.status = report.findings.length ? "FAIL" : "PASS";
  } catch (error) {
    report.exitCode = error instanceof ScopeError ? error.exitCode : 2;
    report.status = report.exitCode === 1 ? "FAIL" : "INCOMPLETE";
    report.findings.push(
      ...(error instanceof ScopeError
        ? error.findings
        : [
            {
              code: "IO_ERROR",
              message: `Scope inspection could not complete (${error.code ?? "unknown"})`,
            },
          ])
    );
  }
  return report;
}

function main(args) {
  const json = args.includes("--json");
  let root = ROOT,
    max = null,
    report;
  try {
    for (let i = 0; i < args.length; i++) {
      const argument = args[i];
      if (argument === "--json") continue;
      if (argument === "--root" && args[i + 1] && !args[i + 1].startsWith("--"))
        root = path.resolve(args[++i]);
      else if (argument === "--max" && /^[1-9]\d*$/.test(args[i + 1] ?? "")) {
        max = Number(args[++i]);
        validateMax(max);
      } else throw new ScopeError("ARGUMENT", `Invalid or incomplete argument: ${argument}`);
    }
    report = inspectBuildScope(root, { max });
  } catch (error) {
    report = { status: "INCOMPLETE", exitCode: 2, findings: error.findings };
  }
  if (json) console.log(JSON.stringify(report, null, 2));
  else {
    console.log(
      `[build-scope] ${report.status}: ${report.count ?? "unknown"} configured root files`
    );
    for (const finding of report.findings.slice(0, 20))
      console.error(
        `  ${finding.code}${finding.path ? ` ${finding.path}` : ""}: ${finding.message}`
      );
    if (report.findings.length > 20)
      console.error(`  ... ${report.findings.length - 20} more findings; use --json`);
  }
  process.exitCode = report.exitCode;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  main(process.argv.slice(2));
