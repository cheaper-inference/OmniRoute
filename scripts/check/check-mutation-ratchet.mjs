#!/usr/bin/env node
// scripts/check/check-mutation-ratchet.mjs
// MutationScore ratchet (Quality Gate v2 / Phase 9 T5 — Wave 2, Task 3).
//
// Mirrors check-bundle-size.mjs: ADVISORY by default (always exit 0), BLOCKING only
// with --ratchet — and even then exits 1 IF — AND ONLY IF — a measured module REGRESSED
// vs the baseline (direction: UP, the score can only go up). Graceful skip (exit 0) when
// there is no mutation.json (e.g. the nightly did not run) or there is no baseline for the module —
// Lack of data NEVER blocks; only a measured regression blocks.
//
// Score per module = COVERED score = detected / (detected survived), where
// detected = Killed Timeout. NoCoverage is EXCLUDED from the denominator (it is a gap of
// coverage, not a sign of test quality) — same denominator as the X-ray
// (scripts/quality/mutation-radiography.mjs).
//
// O nightly divide o `mutate` em batches paralelos (um reports/mutation/mutation.json
// per job). This script runs INSIDE each job on the report for that batch and compares
// only the modules present in it. Accepts multiple paths for local/aggregated use.
//
// Uso:
//   node scripts/check/check-mutation-ratchet.mjs                 (advisory; report default)
//   node scripts/check/check-mutation-ratchet.mjs reports/mutation/mutation.json
//   node scripts/check/check-mutation-ratchet.mjs <a.json> <b.json> ... --ratchet
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.cwd();
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");
const DEFAULT_REPORT = path.join(ROOT, "reports/mutation/mutation.json");
const BASELINE_PREFIX = "mutationScore.";
const RATCHET = process.argv.includes("--ratchet");

// Anti-flake tolerance (percentage points). The tap-runner runs at concurrency 4 and a
// mutant whose tests sit near the `timeoutMS` boundary can flip Killed/Timeout/Survived
// between runs, jittering a module's covered score by a fraction of a point. Only a drop
// LARGER than this counts as a regression — same idea as the coverage ratchet's `eps`. It
// does NOT lower the baseline; it absorbs run-to-run noise so the blocking gate stays
// deterministic. Real test-quality regressions (the headers.ts/telemetry-scale drops that
// motivated the tap.testFiles coverage fix) are far larger than EPS and still fire.
export const MUTATION_RATCHET_EPS = 1.0;

const DETECTED = new Set(["Killed", "Timeout"]);
const SURVIVED = new Set(["Survived"]);

/**
 * Evaluates the MEASURED score of a module against the baseline. Direction: UP (the score only
 * can increase — lower = regression), with anti-flake tolerance `eps`: only counts as
 * regression if there is a drop GREATER than `eps` points.
 * @param {number} current
 * @param {number} baseline
 * @param {number} [eps] anti-flake tolerance in percentage points
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateMutationRatchet(current, baseline, eps = MUTATION_RATCHET_EPS) {
  return {
    regressed: current < baseline - eps,
    improved: current > baseline,
  };
}

/**
 * Covered mutation score of a file: detected/(detected+survived)*100.
 * NoCoverage/Ignored/RuntimeError/CompileError ficam fora do denominador.
 * @param {{mutants?: Array<{status: string}>}} fileData
 * @returns {number|null} score in %, or null if there are no covered mutants
 */
export function mutationScoreForFile(fileData) {
  let detected = 0;
  let survived = 0;
  for (const m of fileData?.mutants || []) {
    if (DETECTED.has(m.status)) detected += 1;
    else if (SURVIVED.has(m.status)) survived += 1;
  }
  const denom = detected + survived;
  return denom === 0 ? null : (detected / denom) * 100;
}

/**
 * Score per file from one or more reports (batches). Files without mutants
 * covered (score null) are omitted.
 *
 * ⭐ Sibling batches that split the SAME file (auth.ts split into a1:1-1109 + a2:1110-2218
 * por mutation range; accountFallback em b1/b2) carregam fatias DISJUNTAS dos mutantes
 * of that file. The true score of the file needs ALL the slices together, so
 * we combine `files[<arquivo>].mutants` between reports BEFORE scoring — do not overwrite
 * (Otherwise, the last slice would expire and only report half of the file).
 * @param {object|object[]} reportOrReports parsed mutation.json (ou array)
 * @returns {Record<string, number>}
 */
export function measureMutationScores(reportOrReports) {
  const reports = Array.isArray(reportOrReports) ? reportOrReports : [reportOrReports];
  const mutantsByFile = {};
  for (const report of reports) {
    for (const [file, data] of Object.entries(report?.files || {})) {
      (mutantsByFile[file] ||= []).push(...(data?.mutants || []));
    }
  }
  const out = {};
  for (const [file, mutants] of Object.entries(mutantsByFile)) {
    const score = mutationScoreForFile({ mutants });
    if (score !== null) out[file] = score;
  }
  return out;
}

/**
 * Reads metrics["mutationScore.<path>"].value from quality-baseline.json.
 * Returns {} if the file or keys are missing (without a baseline, there is no
 * ratchet possible — the caller treats it as a graceful SKIP, exit 0).
 * @param {string} baselinePath
 * @returns {Record<string, number>}
 */
export function readBaselineMutationScores(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return {};
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return {};
  }
  const metrics = baselineJson?.metrics || {};
  const out = {};
  for (const [key, val] of Object.entries(metrics)) {
    if (key.startsWith(BASELINE_PREFIX) && val && typeof val.value === "number") {
      out[key.slice(BASELINE_PREFIX.length)] = val.value;
    }
  }
  return out;
}

function loadReport(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function main(argv) {
  const paths = argv.slice(2).filter((a) => !a.startsWith("--"));
  const reportPaths = paths.length > 0 ? paths : [DEFAULT_REPORT];
  const existing = reportPaths.filter((p) => fs.existsSync(p));
  if (existing.length === 0) {
    process.stdout.write("mutationScore=SKIP reason=no-report\n");
    process.exit(0);
  }

  const measured = measureMutationScores(existing.map(loadReport));
  const baseline = readBaselineMutationScores();

  const regressions = [];
  const modules = Object.keys(measured).sort();
  for (const mod of modules) {
    const current = measured[mod];
    if (!(mod in baseline)) {
      process.stdout.write(`mutationScore.${mod}=${current.toFixed(2)} (no baseline — advisory)\n`);
      continue;
    }
    const { regressed } = evaluateMutationRatchet(current, baseline[mod]);
    const tag = regressed ? "REGRESSED" : "ok";
    process.stdout.write(
      `mutationScore.${mod}=${current.toFixed(2)} baseline=${baseline[mod].toFixed(2)} ${tag}\n`
    );
    if (regressed) regressions.push({ mod, current, baseline: baseline[mod] });
  }

  if (regressions.length > 0 && RATCHET) {
    process.stderr.write(
      `\nMutation ratchet FAILED — ${regressions.length} module(s) dropped below baseline:\n`
    );
    for (const r of regressions) {
      process.stderr.write(`  ${r.mod}: ${r.current.toFixed(2)} < ${r.baseline.toFixed(2)}\n`);
    }
    process.exit(1);
  }
  process.exit(0);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv);
}
