#!/usr/bin/env node
// scripts/check/check-secrets.mjs
// Secret scanning gate via gitleaks (Task 7.18 — Phase 7).
//
// Complements `check-public-creds.mjs` (Phase 6, covers known public OAuth credentials
// known in 2 specific files): This gate takes the general class of secrets —
// `const API_KEY = "sk-…"`, tokens in config/teste/docs, secrets in history.
//
// Output (stdout):
//   secretFindings=N      — number of gitleaks findings
//   secretFindings=SKIP reason=binary-absent   — gitleaks is not in the PATH
//
// By default, it is ADVISORY (always returns 0). Pass --ratchet to make it BLOCKING:
// reads metrics.secretFindings.value from config/quality/quality-baseline.json, compares
// the MEASURED count and EXITS 1 IF — AND ONLY IF — the measurement is GREATER than the baseline
// (actual regression, direction:down). Any graceful SKIP (missing binary, no
// source dir) EXITS 0 even with --ratchet — lack of infrastructure never blocks,
// only a measured regression blocks.
//
// Uso:
//   node scripts/check/check-secrets.mjs
//   node scripts/check/check-secrets.mjs --json     # imprime JSON bruto do gitleaks
// node scripts/check/check-secrets.mjs --quiet
// node scripts/check/check-secrets.mjs --ratchet # fails (exit 1) in a regression

import fs from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");
const RATCHET = process.argv.includes("--ratchet");
const GITLEAKS_CONFIG = path.join(ROOT, ".gitleaks.toml");
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");

// Source directories to scan for secrets. We deliberately scope to the
// production/source trees instead of scanning the whole working dir:
//   • `gitleaks dir .` (and `detect --no-git --source .`) WALKS the entire tree
//     and READS every file — including a real `node_modules/` (90k+ files) when
//     present (CI runs `npm ci`). gitleaks has no traversal-exclude flag: the
//     `.gitleaks.toml [allowlist].paths` list filters FINDINGS *after* each file
//     is read, so it does NOT speed up the walk. The full walk blows past the
//     timeout in CI (confirmed: ETIMEDOUT) → the gate silently never produces a
//     value. Scoping the scan to the source dirs keeps it fast (~6s) while still
//     covering every place an embedded secret would actually be a risk (the same
//     dirs Hard Rule #8 governs: src/open-sse/electron/bin, plus scripts/).
//   • We also drop git-history mode (scanning 4500+ commits is slow and grows
//     unbounded); the current working tree is what ships.
const SECRET_SCAN_DIRS = ["src", "open-sse", "bin", "electron", "scripts"];

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Conta findings no JSON emitido por `gitleaks detect --report-format json`.
 *
 * Gitleaks outputs an array of findings (or empty/null array when cleared):
 * [
 *   {
 *     Description: string,
 *     StartLine: number,
 *     EndLine: number,
 *     Match: string,       // valor mascarado ou trecho
 *     Secret: string,      // valor mascarado
 * File: string, // relative path
 *     Commit: string,
 *     Entropy: number,
 *     Author: string,
 *     Email: string,
 *     Date: string,
 *     Tags: string[],
 *     RuleID: string,
 *     Fingerprint: string
 *   },
 *   ...
 * ]
 *
 * @param {Array|null} gitleaksJson - Array de findings do gitleaks (ou null)
 * @returns {{ findingCount: number, byRule: Record<string, number>, byFile: Record<string, number> }}
 */
export function parseGitleaksJson(gitleaksJson) {
  // null or empty array = no finding
  if (gitleaksJson === null || (Array.isArray(gitleaksJson) && gitleaksJson.length === 0)) {
    return { findingCount: 0, byRule: {}, byFile: {} };
  }

  if (!Array.isArray(gitleaksJson)) {
    return { findingCount: 0, byRule: {}, byFile: {} };
  }

  let findingCount = 0;
  const byRule = {};
  const byFile = {};

  for (const finding of gitleaksJson) {
    if (!finding || typeof finding !== "object") continue;

    findingCount++;

    // Agrupar por RuleID (gitleaks usa PascalCase)
    const ruleId = finding.RuleID ?? finding.ruleId ?? "unknown";
    byRule[ruleId] = (byRule[ruleId] ?? 0) + 1;

    // Group by file
    const file = finding.File ?? finding.file ?? "unknown";
    byFile[file] = (byFile[file] ?? 0) + 1;
  }

  return { findingCount, byRule, byFile };
}

// ---------------------------------------------------------------------------
// Ratchet (direction:down) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Evaluates the MEASURED count of secrets against the baseline.
 * Direction: down (the count can only DOWN — more secrets = regression).
 *
 * @param {number} current - Count of findings measured now.
 * @param {number} baseline - Frozen count in quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateSecretsRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

/**
 * Reads metrics.secretFindings.value from quality-baseline.json.
 * Returns null if the file or metric is missing (without baseline there is no
 * ratchet possible — caller treats as graceful SKIP, exit 0).
 *
 * @param {string} baselinePath
 * @returns {number|null}
 */
export function readBaselineSecretsValue(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.secretFindings;
  if (!metric || typeof metric.value !== "number") return null;
  return metric.value;
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detects whether the `gitleaks` binary is available in the PATH.
 * Uses `which` (Unix) without shell interpolation — Hard Rule
 *
 * @returns {string|null} Path to the binary, or null if absent.
 */
export function findGitleaks() {
  try {
    const result = spawnSync("which", ["gitleaks"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.status === 0) {
      return result.stdout.trim();
    }
  } catch {
    // which not available
  }

  // Fallback: try to execute directly to check ENOENT
  try {
    const result = spawnSync("gitleaks", ["version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "gitleaks"; // found in PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const gitleaksBin = findGitleaks();

  if (!gitleaksBin) {
    console.log("secretFindings=SKIP reason=binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[check-secrets] SKIP — gitleaks not found in PATH.\n" +
          "[check-secrets] Instale via: https://github.com/gitleaks/gitleaks\n" +
          "[check-secrets] graceful SKIP — returns 0 even with --ratchet (missing binary never blocks).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  
  const scanDirs = SECRET_SCAN_DIRS.filter((d) => fs.existsSync(path.join(ROOT, d)));

  if (scanDirs.length === 0) {
    // No source dir found — nothing to scan (advisory, exits 0).
    console.log("secretFindings=0");
    if (!QUIET) {
      process.stderr.write("[check-secrets] No font directory found to scan.\n");
    }
    process.exitCode = 0;
    return;
  }

  if (!QUIET) {
    process.stderr.write(
      `[check-secrets] Rodando gitleaks dir <dir> --report-format json para: ${scanDirs.join(", ")} ...\n`
    );
  }

  // `gitleaks dir` accepts ONE SINGLE positional path (usage: `gitleaks dir [flags]
  // [path]`). Passar múltiplos paths faz o gitleaks ignorar os extras e cair para
  // scan the entire CWD (`.`) — which re-brings node_modules/docs/tests and the
  // original timeout. That's why we scan EVERY source directory in one invocation
  // separada e concatenamos os findings.
  const gitleaksJson = [];
  for (const dir of scanDirs) {
    const args = [
      "dir",
      dir,
      "--report-format",
      "json",
      "--report-path",
      "-", // output para stdout
      "--no-banner",
    ];
    if (fs.existsSync(GITLEAKS_CONFIG)) {
      args.push("--config", GITLEAKS_CONFIG);
    }

    let stdout = "";
    try {
      stdout = execFileSync(gitleaksBin, args, {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
        timeout: 90_000, // 90s por dir — o scan escopado completa em ~10s; folga ampla
      });
    } catch (err) {
      // exit 1 with stdout = findings found (expected gitleaks behavior)
      stdout = err.stdout ? String(err.stdout) : "";
      const stderr = err.stderr ? String(err.stderr) : "";

      if (err.status === 1 && stdout.trim()) {
        // Normal: gitleaks achou findings neste dir e saiu com exit 1
      } else if (!stdout.trim()) {
        process.stderr.write(
          `[check-secrets] ERROR when running gitleaks on '${dir}': ${err.message}\n`
        );
        if (stderr) process.stderr.write(`[check-secrets] stderr: ${stderr.slice(0, 500)}\n`);
        process.exit(2);
      }
    }

    if (!stdout.trim() || stdout.trim() === "null") {
      continue; // sem findings neste dir
    }
    let parsed;
    try {
      parsed = JSON.parse(stdout.trim());
    } catch (parseErr) {
      process.stderr.write(
        `[check-secrets] ERRO ao parsear JSON do gitleaks em '${dir}': ${parseErr.message}\n`
      );
      process.stderr.write(
        `[check-secrets] stdout (primeiros 500 chars): ${stdout.slice(0, 500)}\n`
      );
      process.exit(2);
    }
    if (Array.isArray(parsed)) {
      gitleaksJson.push(...parsed);
    }
  }

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(gitleaksJson, null, 2) + "\n");
    return;
  }

  const { findingCount, byRule, byFile } = parseGitleaksJson(gitleaksJson);

  // Send in KEY=VALUE format to the metrics collector (collect-metrics.mjs)
  console.log(`secretFindings=${findingCount}`);

  if (!QUIET) {
    if (findingCount > 0) {
      const topRules = Object.entries(byRule)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([r, n]) => `${r}(${n})`)
        .join(", ");
      process.stderr.write(`[check-secrets] Findings: ${findingCount} (top rules: ${topRules})\n`);
      process.stderr.write(
        "[check-secrets] Para allowlistar findings legítimos (fixtures de teste, creds públicas),\n" +
          "[check-secrets] add entries in .gitleaks.toml [[allowlist]] with comment.\n"
      );
    } else {
      process.stderr.write("[check-secrets] No findings detected.\n");
    }
  }

  // Measurement successful → applies ratchet (blocking only with --ratchet).
  applyRatchet(findingCount);
}

/**
 * Applies the ratchet (direction:down) on the measured count vs the baseline.
 * Without --ratchet: advisory (exit 0). With --ratchet: exit 1 in a real regression
 * (measurement > baseline). Missing baseline → Graceful SKIP (exit 0).
 *
 * @param {number} findingCount - MEASURED count (successful measurement).
 */
function applyRatchet(findingCount) {
  if (!RATCHET) {
    if (!QUIET) {
      process.stderr.write(
        "[check-secrets] ADVISORY — does not fail by count (pass --ratchet to block regression).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const baselineValue = readBaselineSecretsValue(BASELINE_PATH);
  if (baselineValue === null) {
    if (!QUIET) {
      process.stderr.write(
        "[check-secrets] missing baseline (metrics.secretFindings) — graceful SKIP, leaves 0.\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const { regressed } = evaluateSecretsRatchet(findingCount, baselineValue);
  if (regressed) {
    process.stderr.write(
      `[check-secrets] REGRESSION — ${findingCount} secret findings > baseline ${baselineValue}\n` +
        " → Remove the new secret (or allowlist it in .gitleaks.toml if it is a legitimate false positive),\n" +
        "    depois re-baseline metrics.secretFindings em config/quality/quality-baseline.json.\n"
    );
    process.exitCode = 1;
    return;
  }

  if (!QUIET) {
    process.stderr.write(
      `[check-secrets] OK — no regression (${findingCount} findings, baseline ${baselineValue}).\n`
    );
  }
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
