#!/usr/bin/env node
// scripts/check/check-vuln-ratchet.mjs
// Ratchet dependency vulnerabilities via osv-scanner (Task 7.2 — Phase 7).
//
// Output (stdout):
//   vulnCount=N         — total de vulnerabilidades encontradas (todos os severities)
// vulnCount=SKIP reason=<r> — measurement unavailable in advisory mode (exit 0)
// vulnCount=INCOMPLETE reason=<r> — measurement unavailable with --ratchet (exit 2);
//                                      <r> = binary-absent | invalid-report | parse-error | …
//
// Advisory mode reports findings without blocking. With --ratchet, exit 1 means
// a measured regression and exit 2 means INCOMPLETE (tool/report/baseline missing).
// An unavailable measurement never establishes zero vulnerabilities.
//
// NB (CVE variance): osv measures against a bank of CVEs that grows
// continuous. A PR that does NOT touch dependencies can suddenly measure vulnCount >
// baseline because a new CVE was released in existing deps — this is what
// EXPECTED behavior of a blocking CVE gate, not a regression of
// product. The remedy is (a) to bump the affected area (preferable) or, if there is no
// fix, (b) re-baseline metrics.vulnCount com justificativa + issue de tracking.
// See docs/security/SUPPLY_CHAIN.md → "CVE variance".
//
// Uso:
//   node scripts/check/check-vuln-ratchet.mjs
//   node scripts/check/check-vuln-ratchet.mjs --json    # imprime JSON bruto do osv-scanner
//   node scripts/check/check-vuln-ratchet.mjs --quiet   # suppress diagnostic logs
// node scripts/check/check-vuln-ratchet.mjs --ratchet # exit 1 in a regression, exit 2 if INCOMPLETE

import fs from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");
const RATCHET = process.argv.includes("--ratchet");
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Conta vulnerabilidades no JSON emitido por `osv-scanner --format json`.
 *
 * Format of osv-scanner v1+:
 * {
 *   results: [
 *     {
 *       packages: [
 *         {
 *           package: { name, version, ecosystem },
 *           vulnerabilities: [ { id, aliases, affected, ... }, ... ],
 *           groups: [ { ids: [...] }, ... ]
 *         },
 *         ...
 *       ]
 *     },
 *     ...
 *   ]
 * }
 *
 * Count: each entry in `vulnerabilities[]` of each package counts as 1 vuln.
 * Se `groups` estiver presente e tiver menos entradas que `vulnerabilities`, usamos
 * `groups.length` to deduplicate (same vuln in multiple packages counts 1x per
 * group). Otherwise we count `vulnerabilities.length`.
 *
 * @param {object|null} osvJson - JSON object parsed from osv-scanner
 * @returns {{ vulnCount: number, bySeverity: Record<string, number> }}
 */
export function parseOsvJson(osvJson) {
  if (!osvJson || !Array.isArray(osvJson.results)) {
    return { vulnCount: 0, bySeverity: {} };
  }

  let vulnCount = 0;
  const bySeverity = {};

  for (const result of osvJson.results) {
    if (!Array.isArray(result.packages)) continue;

    for (const pkg of result.packages) {
      if (!Array.isArray(pkg.vulnerabilities)) continue;

      // Use groups for deduplication when available (same vuln in multiple paths)
      const pkgCount =
        Array.isArray(pkg.groups) && pkg.groups.length > 0
          ? pkg.groups.length
          : pkg.vulnerabilities.length;

      vulnCount += pkgCount;

      // Collect severity info from the vulnerability entries
      for (const vuln of pkg.vulnerabilities) {
        const severity = extractSeverity(vuln);
        bySeverity[severity] = (bySeverity[severity] ?? 0) + 1;
      }
    }
  }

  return { vulnCount, bySeverity };
}

/**
 * Extracts the severity of a vulnerability entry from osv-scanner.
 * Tenta database_specific.severity, depois severity[0].type, depois "UNKNOWN".
 *
 * @param {object} vuln - osv-scanner vulnerability entry
 * @returns {string}
 */
export function extractSeverity(vuln) {
  if (!vuln) return "UNKNOWN";

  // osv-scanner v2 field: database_specific.severity (common in OSV schema)
  const dbSeverity = vuln.database_specific?.severity;
  if (typeof dbSeverity === "string" && dbSeverity.length > 0) {
    return dbSeverity.toUpperCase();
  }

  // CVSS severity array: [{ type: "CVSS_V3", score: "CVSS:3.1/..." }, ...]
  if (Array.isArray(vuln.severity) && vuln.severity.length > 0) {
    const first = vuln.severity[0];
    if (typeof first?.type === "string") {
      return first.type;
    }
  }

  return "UNKNOWN";
}

// ---------------------------------------------------------------------------
// Ratchet (direction:down) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Evaluates the MEASURE count of vulnerabilities against the baseline.
 * Direction: down (the count can only DOWN — more vulns = regression).
 *
 * @param {number} current - Vulnerability count measured now.
 * @param {number} baseline - Frozen count in quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateVulnRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

/**
 * Reads metrics.vulnCount.value from quality-baseline.json.
 * Returns null if the file or metric is missing (without baseline there is no
 * possible ratchet — the caller treats it as INCOMPLETE in mandatory mode).
 *
 * @param {string} baselinePath
 * @returns {number|null}
 */
export function readBaselineVulnValue(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.vulnCount;
  if (!metric || !Number.isSafeInteger(metric.value) || metric.value < 0) return null;
  return metric.value;
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detects whether the `osv-scanner` binary is available in the PATH.
 * Uses `which` (Unix) without shell interpolation — Hard Rule
 *
 * @returns {string|null} Absolute path to the binary, or null if absent.
 */
export function findOsvScanner() {
  try {
    const result = spawnSync("which", ["osv-scanner"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.status === 0) {
      return result.stdout.trim();
    }
  } catch {
    // which not available — try command -v via sh
  }

  // Fallback: try to execute directly to check ENOENT
  try {
    const result = spawnSync("osv-scanner", ["--version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "osv-scanner"; // found in PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

/**
 * Runs osv-scanner on the lockfile/directory.
 * Usa execFileSync sem shell interpolation (Hard Rule #13).
 *
 * Execution or format failures return { skip: true, reason }; the mandatory mode
 * reports them as INCOMPLETE. Exit 1 of the scanner is a result with findings;
 *127/128 and signals are not measurements. See https://google.github.io/osv-scanner/output/.
 *
 * @param {string} osvBin - Path to the osv-scanner binary
 * @returns {{ json: object } | { skip: true, reason: string }}
 */
function runOsvScanner(osvBin) {
  const args = ["--format", "json", "--lockfile", path.join(ROOT, "package-lock.json")];

  if (!QUIET) {
    process.stderr.write("[vuln-ratchet] Rodando osv-scanner --format json ...\n");
  }

  let stdout;
  try {
    stdout = execFileSync(osvBin, args, {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      timeout: 120_000, // 2 min
    });
  } catch (err) {
    // osv-scanner exits with code != 0 when it finds vulnerabilities;
    // the JSON still goes on stdout.
    stdout = err.stdout ? String(err.stdout) : "";
    if (err.status !== 1 || err.signal || err.killed || !stdout.trim()) {
      process.stderr.write(`[vuln-ratchet] ERROR when running osv-scanner: ${err.message}\n`);
      return { skip: true, reason: "osv-error" };
    }
  }

  try {
    const json = JSON.parse(stdout);
    if (
      !Array.isArray(json?.results) ||
      json.results.some(
        (result) =>
          !Array.isArray(result?.packages) ||
          result.packages.some(
            (pkg) =>
              !Array.isArray(pkg?.vulnerabilities) ||
              pkg.vulnerabilities.some((vuln) => !vuln || typeof vuln.id !== "string" || !vuln.id)
          )
      )
    ) {
      return { skip: true, reason: "invalid-report" };
    }
    return { json };
  } catch (parseErr) {
    process.stderr.write(
      `[vuln-ratchet] ERRO ao parsear JSON do osv-scanner: ${parseErr.message}\n`
    );
    process.stderr.write(`[vuln-ratchet] stdout (primeiros 500 chars): ${stdout.slice(0, 500)}\n`);
    return { skip: true, reason: "parse-error" };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function incomplete(reason) {
  console.log(`vulnCount=${RATCHET ? "INCOMPLETE" : "SKIP"} reason=${reason}`);
  process.exitCode = RATCHET ? 2 : 0;
}

function main() {
  const osvBin = findOsvScanner();

  if (!osvBin) {
    incomplete("binary-absent");
    if (!QUIET)
      process.stderr.write("[vuln-ratchet] Install osv-scanner to complete this measurement.\n");
    return;
  }

  const osvResult = runOsvScanner(osvBin);
  if (osvResult.skip) {
    incomplete(osvResult.reason);
    return;
  }

  const osvJson = osvResult.json;

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(osvJson, null, 2) + "\n");
    applyRatchet(parseOsvJson(osvJson).vulnCount);
    return;
  }

  const { vulnCount, bySeverity } = parseOsvJson(osvJson);

  // Send in KEY=VALUE format to the metrics collector (collect-metrics.mjs)
  console.log(`vulnCount=${vulnCount}`);

  if (!QUIET) {
    const severitySummary =
      Object.entries(bySeverity)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ") || "nenhuma";
    process.stderr.write(
      `[vuln-ratchet] Total de vulnerabilidades: ${vulnCount} (${severitySummary})\n`
    );
  }

  // Measurement successful → applies ratchet (blocking only with --ratchet).
  applyRatchet(vulnCount);
}

/**
 * Applies the ratchet (direction:down) on the measured count vs the baseline.
 * Without --ratchet: advisory (exit 0). With --ratchet: exit 1 in a real regression
 * (measurement > baseline). Missing baseline → INCOMPLETE (exit 2).
 *
 * @param {number} vulnCount - MEASURED count (successful measurement).
 */
function applyRatchet(vulnCount) {
  if (!RATCHET) {
    if (!QUIET) {
      process.stderr.write(
        "[vuln-ratchet] ADVISORY — does not fail by count (pass --ratchet to block regression).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const baselineValue = readBaselineVulnValue(BASELINE_PATH);
  if (baselineValue === null) {
    incomplete("baseline-unresolved");
    return;
  }

  const { regressed } = evaluateVulnRatchet(vulnCount, baselineValue);
  if (regressed) {
    process.stderr.write(
      `[vuln-ratchet] REGRESSION — ${vulnCount} vulnerabilities > baseline ${baselineValue}\n` +
        " → Bump the affected dep(s) (preferable). If there is no fix, re-baseline\n" +
        "    metrics.vulnCount em config/quality/quality-baseline.json com justificativa\n" +
        "    + tracking issue. See docs/security/SUPPLY_CHAIN.md → 'CVE variance'.\n"
    );
    process.exitCode = 1;
    return;
  }

  if (!QUIET) {
    process.stderr.write(
      `[vuln-ratchet] OK — no regression (${vulnCount} vulns, baseline ${baselineValue}).\n`
    );
  }
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
