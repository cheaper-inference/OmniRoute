#!/usr/bin/env node
// scripts/check/check-dead-code.mjs
// Gate de dead-code via knip — unused exports, unused files.
// Phase 7 INT: Promoted from ADVISORY to blocking RATCHET.
// Reads the baseline from quality-baseline.json (metrics.deadExports), compares it and
// fails with exit 1 if the count INCREASES. Supports --update to ratchet the baseline.
//
// Output (stdout):
//   DEAD_EXPORTS=<n>    — exports/re-exports/unused types
//   DEAD_FILES=<n>      — files with no consumers
//   DEAD_TOTAL=<n>      — sum of both (primary metric for the ratchet)
//
// Use --json to print the full knip report in JSON.
// Use --quiet to suppress diagnostic logs.
// Use --update to ratchet the baseline when the count legitimately drops.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  baseRefArg,
  listChangedFiles,
  newDeadSymbols,
  resolveMergeBase,
  withBaseWorktree,
} from "./newCodeMode.mjs";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const BASE_REF = baseRefArg();
const PRINT_JSON = process.argv.includes("--json");
const UPDATE = process.argv.includes("--update");

const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/quality-baseline.json")
);

/**
 * Conta dead exports e dead files a partir do output JSON do knip.
 *
 * O reporter JSON do knip emite:
 *   { issues: Array<{ file, exports?, files?, types?, nsExports?, nsTypes?, ... }> }
 *
 * Each entry in `exports`, `types`, `nsExports`, `nsTypes` is a dead symbol in that
 * file. The presence of the file itself in the list (non-empty `files: []` field or file
 * without other relevant fields with `files: true` in the include) indicates a dead file.
 *
 * @param {object} knipJson - JSON object parsed from the knip output
 * @returns {{ deadExports: number, deadFiles: number, deadTotal: number }}
 */
export function parseKnipMetrics(knipJson) {
  if (!knipJson || !Array.isArray(knipJson.issues)) {
    return { deadExports: 0, deadFiles: 0, deadTotal: 0 };
  }

  let deadExports = 0;
  let deadFiles = 0;

  for (const fileEntry of knipJson.issues) {
    // Dead file: The file appears in the list with the `files` field populated
    // (knip outputs an entry with files:[] indicating "this file is dead")
    if (Array.isArray(fileEntry.files) && fileEntry.files.length > 0) {
      deadFiles += fileEntry.files.length;
    }
    // Some reporters indicate a dead file without a files field — the entry exists
    // without exports/types = the entire file has no consumer
    // (conservative: only count when files[] is present and populated)

    // Dead exports: sum all dead symbols by export type
    const exportFields = [
      "exports",
      "types",
      "nsExports",
      "nsTypes",
      "enumMembers",
      "namespaceMembers",
      "duplicates",
    ];
    for (const field of exportFields) {
      if (Array.isArray(fileEntry[field])) {
        deadExports += fileEntry[field].length;
      }
    }
  }

  return {
    deadExports,
    deadFiles,
    deadTotal: deadExports + deadFiles,
  };
}

/**
 * Exit taxonomy of this gate (G-07, #15159).
 *
 * Before this was documented, every failure path collapsed to exit 2, so a
 * missing knip binary and a genuine knip failure were indistinguishable — an
 * infra-down run presented exactly like a repo with dead code, and a reviewer
 * chasing exit 2 found nothing wrong with their code.
 *
 *   0  OK             no regression
 *   1  POLICY         dead-code regression — a REAL repo defect
 *   2  CONFIG         baseline missing / metric key absent / unparseable knip
 *                     output — an operator-config or tool-contract fault
 *   3  INFRASTRUCTURE knip missing or unrunnable — the TOOLCHAIN, not the repo
 *
 * Exit 3 is the load-bearing one: it is what lets CI and a reviewer tell "knip
 * isn't installed" from "your code has dead exports".
 */
export const DEAD_CODE_EXIT = {
  OK: 0,
  POLICY: 1,
  CONFIG: 2,
  INFRASTRUCTURE: 3,
};

/** Node/child_process error codes that mean "the tool never ran". */
const INFRASTRUCTURE_ERROR_CODES = new Set([
  "ENOENT", // executable not found — knip not installed
  "EACCES", // not executable
  "EPERM",
  "ETIMEDOUT", // knip exceeded the 300s timeout
  "ESIGTERM", // killed by the OS / runner shutdown
  "ENOMEM",
  "EAGAIN",
  // Windows: a `.cmd` shim cannot be spawned by execFileSync without
  // `shell: true`, so it fails EINVAL. Found by running the gate end-to-end with
  // the Node entrypoint removed — this was classified as a CONFIG fault, which
  // is exactly the misattribution G-07 exists to eliminate: EINVAL here means
  // "this spawn cannot work", never "knip produced garbage".
  "EINVAL",
]);

/**
 * Resolve a runnable knip entrypoint (G-07 follow-up, found while verifying it).
 *
 * `node_modules/.bin/knip` is a `#!/bin/sh` wrapper. `execFileSync` cannot run a
 * POSIX shell script on Windows, so on that platform the gate failed with ENOENT
 * on EVERY run — the "infra-down presents as repo-broken" symptom with a
 * permanently-down cause, i.e. the ratchet was inert on Windows rather than
 * merely noisy.
 *
 * So on Windows prefer the package's own Node entrypoint
 * (`node_modules/knip/bin/knip.js`), which is a plain JS file any Node can run.
 * POSIX keeps the conventional `.bin` shim. Returns null when knip is genuinely
 * absent so the caller can report exit 3 instead of throwing ENOENT.
 *
 * Exported for unit testing.
 *
 * @param {{platform?: string, existsSync?: (p: string) => boolean}} [opts]
 * @returns {string | null} path to exec, or null when knip is not installed
 */
export function resolveKnipBin(opts = {}) {
  const platform = opts.platform ?? process.platform;
  const exists = opts.existsSync ?? ((p) => fs.existsSync(p));

  const candidates =
    platform === "win32"
      ? [
          // Authoritative, cross-platform entrypoint: a plain JS file any Node
          // can run. Preferred on Windows for exactly that reason.
          path.join("node_modules", "knip", "bin", "knip.js"),
          // `.cmd` is deliberately NOT a fallback: execFileSync cannot spawn one
          // without `shell: true` (it fails EINVAL), so listing it would resolve
          // to a path that is guaranteed to fail. Prefer reporting the real
          // "knip is not usable here" over picking an unrunnable candidate.
          path.join("node_modules", ".bin", "knip"),
        ]
      : [path.join("node_modules", ".bin", "knip")];

  for (const candidate of candidates) {
    if (exists(candidate)) return candidate;
  }
  return null;
}

/**
 * Parse knip's `--reporter json` stdout.
 *
 * knip >= 6.44 loads `next.config.*`, and ours calls fumadocs-mdx `createMDX()`,
 * which prints "[MDX] generated files in …ms" to stdout before the report. The
 * report is still intact, so read it from the first line that opens a JSON object.
 * Output with no JSON report still throws a SyntaxError.
 *
 * Exported for unit testing.
 *
 * @param {string} stdout
 * @returns {unknown} the parsed report
 */
export function parseKnipStdout(stdout) {
  const text = String(stdout ?? "").trim();
  try {
    return JSON.parse(text);
  } catch (err) {
    const lines = text.split(/\r?\n/);
    const start = lines.findIndex((line) => line.trimStart().startsWith("{"));
    if (start <= 0) throw err;
    return JSON.parse(lines.slice(start).join("\n"));
  }
}

/**
 * Classify a knip invocation outcome.
 *
 * The subtlety this exists for: knip LEGITIMATELY exits non-zero when it finds
 * issues — that is the entire purpose of this gate — and still prints a full
 * JSON report on stdout. So "threw" is not the same as "failed". A non-zero exit
 * WITH parseable JSON is a successful measurement (kind "ok"); only a run that
 * produced nothing usable is a failure.
 *
 * Exported for unit testing.
 *
 * @param {{code?: string, message?: string} | null} execError - the thrown error, or null on success
 * @param {string} stdout - whatever knip wrote to stdout
 * @returns {{kind: "ok"|"infra"|"unparseable", exitCode: number, reason: string}}
 */
export function classifyKnipFailure(execError, stdout) {
  const text = typeof stdout === "string" ? stdout.trim() : "";

  // No error at all: knip ran and succeeded.
  if (!execError) {
    return { kind: "ok", exitCode: DEAD_CODE_EXIT.OK, reason: "knip completed" };
  }

  // An error, but it still produced parseable JSON — a legitimate non-zero exit
  // reporting findings. This is a successful measurement, not a failure.
  if (text) {
    try {
      parseKnipStdout(text);
      return {
        kind: "ok",
        exitCode: DEAD_CODE_EXIT.OK,
        reason: `knip reported findings (exit ${execError.status ?? "non-zero"})`,
      };
    } catch {
      // fall through to the unparseable classification below
    }
  }

  // No usable output. Distinguish "the tool never ran" from "the tool ran but
  // its output is not the JSON contract we expect".
  const code = execError.code;
  if (code && INFRASTRUCTURE_ERROR_CODES.has(code)) {
    return {
      kind: "infra",
      exitCode: DEAD_CODE_EXIT.INFRASTRUCTURE,
      reason:
        `knip is unavailable (${code}) — this is a TOOLCHAIN problem, not a repo ` +
        `defect. Install dev dependencies (npm ci) and re-run; do not treat this as ` +
        `a dead-code finding. Original error: ${execError.message ?? "unknown"}`,
    };
  }

  return {
    kind: "unparseable",
    exitCode: DEAD_CODE_EXIT.CONFIG,
    reason:
      `knip produced no parseable JSON report — the tool exited abnormally ` +
      `(${execError.message ?? "unknown"}).`,
  };
}

/**
 * Evaluates the current total dead-code count against the baseline.
 * Direction: down (count can only DECREASE).
 *
 * Exported for unit testing.
 *
 * @param {number} current
 * @param {number} baseline
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateDeadCode(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

function runKnip(cwd = ROOT) {
  const knipBin = resolveKnipBin();
  if (!knipBin) {
    // Genuinely not installed — report it as infrastructure (exit 3), never as a
    // dead-code finding, so CI and a reviewer can tell the two apart.
    process.stderr.write(
      "[dead-code] knip is not installed (no runnable entrypoint found under " +
        "node_modules/). This is a TOOLCHAIN problem, not a repo defect: run " +
        "'npm ci' and re-run. Do not treat this as a dead-code finding.\n"
    );
    process.exit(DEAD_CODE_EXIT.INFRASTRUCTURE);
  }

  const knipArgs = [
    "--reporter",
    "json",
    "--no-progress",
    "--no-exit-code", // does not fail due to count — we only collect metrics
  ];
  // A `.js` entrypoint must be run through node; a `.bin`/`.cmd` shim is directly
  // executable on its own platform.
  const isNodeScript = knipBin.endsWith(".js");
  const command = isNodeScript ? process.execPath : knipBin;
  const args = isNodeScript ? [knipBin, ...knipArgs] : knipArgs;

  if (!QUIET) {
    process.stderr.write(`[dead-code] Rodando knip --reporter json (${knipBin}) ...\n`);
  }

  let stdout;
  let execError = null;
  try {
    stdout = execFileSync(command, args, {
      cwd,
      encoding: "utf8",
      maxBuffer: 128 * 1024 * 1024,
      timeout: 300_000, // 5 min (knip can be slow in large monorepos)
    });
  } catch (err) {
    // knip exits with code != 0 when it finds issues; the JSON still goes to stdout.
    // Do not treat "exited" as "failed": see classifyKnipFailure.
    execError = err;
    stdout = err.stdout ? String(err.stdout) : "";
  }

  // G-07: An infrastructure failure (knip missing/unrunnable) CANNOT return with the same
  // code as a config failure — otherwise "infra went down" and "repo has dead code"
  // are indistinguishable to the CI and to anyone reading the log.
  const outcome = classifyKnipFailure(execError, stdout);
  if (outcome.kind !== "ok") {
    process.stderr.write(`[dead-code] ${outcome.reason}\n`);
    if (outcome.kind === "unparseable") {
      process.stderr.write(
        `[dead-code] stdout (primeiros 500 chars): ${String(stdout).slice(0, 500)}\n`
      );
    }
    process.exit(outcome.exitCode);
  }

  let knipJson;
  try {
    knipJson = parseKnipStdout(stdout);
  } catch (parseErr) {
    // Unreachable via classifyKnipFailure (it already JSON-parsed), kept as a
    // defensive guard so a future change cannot turn this into exit 2.
    process.stderr.write(`[dead-code] ERRO ao parsear JSON do knip: ${parseErr.message}\n`);
    process.exit(DEAD_CODE_EXIT.CONFIG);
  }

  return knipJson;
}

/**
 * New-code mode (PR events, `--base-ref <sha>`): knip on HEAD and on the merge-base; blocking
 * only on dead symbols the PR introduced in files it touched. The global count is printed as
 * an advisory (the release reconciliation re-freezes it). See newCodeMode.mjs.
 */
function mainNewCode(baselineValue) {
  const mergeBase = resolveMergeBase(BASE_REF, { ref: process.env.GITHUB_REF });
  const changed = listChangedFiles(mergeBase, {
    dirs: ["src", "open-sse", "electron", "bin", "scripts"],
    exts: [".ts", ".tsx", ".js", ".mjs"],
    // Knip still reports vendor symbols in the global advisory total. Exclude them only from
    // the PR authorship comparison so vendored public APIs remain faithful to upstream.
    excludePrefixes: ["open-sse/vendor/"],
  });
  const headKnip = runKnip();
  const { deadTotal } = parseKnipMetrics(headKnip);
  console.log(`DEAD_TOTAL=${deadTotal}`);
  const over = deadTotal > baselineValue ? " — OVER, re-freeze at release" : "";
  console.log(
    `[dead-code] new-code mode: merge-base ${mergeBase.slice(0, 12)}, ${changed.length} changed file(s); global ${deadTotal} vs baseline ${baselineValue} (advisory${over})`
  );
  if (changed.length === 0) {
    console.log("[dead-code] OK — no source files changed; nothing to compare.");
    return;
  }
  const baseKnip = withBaseWorktree(mergeBase, (dir) => runKnip(dir));
  const added = newDeadSymbols(headKnip, baseKnip, changed);
  console.log(`deadExportsNewCode=${added.length}`);
  if (added.length) {
    process.stderr.write(
      `[dead-code] REGRESSION (new code) — ${added.length} dead symbol(s) introduced in the files touched:\n` +
        added.map((k) => `  ✗ ${k}`).join("\n") +
        "\n  → remove the export (or use it). The overall repo total doesn't count here.\n"
    );
    process.exit(DEAD_CODE_EXIT.POLICY);
  }
  console.log(
    `[dead-code] OK (new code) — no new dead code in the ${changed.length} file(s) touched`
  );
}

function main() {
  if (!fs.existsSync(BASELINE_PATH)) {
    process.stderr.write(`[dead-code] FAIL — ${path.basename(BASELINE_PATH)} missing.\n`);
    process.exit(DEAD_CODE_EXIT.CONFIG);
  }

  const baselineJson = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const baselineMetric = baselineJson.metrics && baselineJson.metrics.deadExports;
  if (!baselineMetric || typeof baselineMetric.value !== "number") {
    process.stderr.write(
      "[dead-code] FAIL — metrics.deadExports missing in quality-baseline.json.\n"
    );
    process.exit(DEAD_CODE_EXIT.CONFIG);
  }
  const baselineValue = baselineMetric.value;
  if (BASE_REF && !PRINT_JSON && !UPDATE) return mainNewCode(baselineValue);

  const knipJson = runKnip();

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(knipJson, null, 2) + "\n");
    return;
  }

  const { deadExports, deadFiles, deadTotal } = parseKnipMetrics(knipJson);

  // Output in KEY=VALUE format for the metrics collector (collect-metrics.mjs)
  console.log(`DEAD_EXPORTS=${deadExports}`);
  console.log(`DEAD_FILES=${deadFiles}`);
  console.log(`DEAD_TOTAL=${deadTotal}`);

  const { regressed, improved } = evaluateDeadCode(deadTotal, baselineValue);

  if (UPDATE && improved) {
    baselineJson.metrics.deadExports.value = deadTotal;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baselineJson, null, 2) + "\n");
    console.log(`[dead-code] ratcheted baseline: ${deadTotal} (was ${baselineValue})`);
  }

  if (regressed) {
    process.stderr.write(
      `[dead-code] REGRESSION — ${deadTotal} dead symbols > baseline ${baselineValue}\n` +
        `  → Remove unused exports/files or run\n` +
        `    'node scripts/check/check-dead-code.mjs --update' if the count has legitimately dropped.\n`
    );
    process.exit(DEAD_CODE_EXIT.POLICY);
  }

  console.log(`[dead-code] OK — ${deadTotal} dead symbols (baseline ${baselineValue})`);
  process.exitCode = DEAD_CODE_EXIT.OK;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
