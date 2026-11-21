#!/usr/bin/env node
// scripts/check/check-codeql-ratchet.mjs
// CodeQL alert gate (Task 7.3 — Phase 7).
//
// Uses the GitHub API via the `gh` CLI to fetch open and
// non-dismissed (adheres to Hard Rule #14: dismissed alerts do not count).
//
// Output (stdout):
//   codeqlAlerts=N        — count of open, non-dismissed CodeQL alerts
//   codeqlAlerts=SKIP reason=binary-absent   — `gh` is not in the PATH
// codeqlAlerts=SKIP reason=no-auth — `gh` present but no authentication
//   codeqlAlerts=SKIP reason=api-error:<code>  — erro da API GitHub
//
// BLOCKING RATCHET (default): reads metrics.codeqlAlerts.value from
// config/quality/quality-baseline.json and RETURNS 1 IF — AND ONLY IF — the MEASUREMENT count
// MEASUREMENT is GREATER than the baseline (actual regression, more open CodeQL alerts).
// Any MEASUREMENT failure (gh missing / no auth / no repo / API error) is a
// Graceful SKIP that EXITS 0 — never blocks the build due to lack of infrastructure.
// Direction: down (the count can only GO DOWN). Supports --update for ratcheting.
//
// Uso:
//   node scripts/check/check-codeql-ratchet.mjs
//   node scripts/check/check-codeql-ratchet.mjs --json    # imprime array de alertas
// node scripts/check/check-codeql-ratchet.mjs --quiet
//   node scripts/check/check-codeql-ratchet.mjs --update  # ratchets the baseline (drop)
//   node scripts/check/check-codeql-ratchet.mjs --advisory  # never fails (collector mode)

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");
const UPDATE = process.argv.includes("--update");
// --advisory: never fails due to the count (legacy collector mode). Without this flag, the
// the gate is BLOCKING: exits with 1 in a real regression (measurement > baseline).
const ADVISORY = process.argv.includes("--advisory");

const ROOT = process.cwd();
const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/quality-baseline.json")
);

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Counts open and non-dismissed CodeQL alerts from the GitHub API JSON.
 *
 * A GitHub API /code-scanning/alerts retorna um array de:
 * {
 *   number: number,
 *   state: "open" | "dismissed" | "fixed",
 *   dismissed_reason: string | null,
 *   dismissed_at: string | null,
 *   tool: { name: string, ... },
 *   rule: { id: string, severity: string, security_severity_level?: string, ... },
 *   ...
 * }
 *
 * Hard Rule #14: Alerts with `state="dismissed"` DO NOT count, regardless of the reason.
 * Filtramos por state="open" E tool.name contendo "CodeQL" (case-insensitive).
 * Alerts from other tools (e.g. Semgrep) are ignored.
 *
 * @param {Array|null} alerts - Array de alertas da API GitHub
 * @returns {{ alertCount: number, bySeverity: Record<string, number>, byRule: Record<string, number> }}
 */
export function parseCodeQLAlerts(alerts) {
  if (!Array.isArray(alerts)) {
    return { alertCount: 0, bySeverity: {}, byRule: {} };
  }

  let alertCount = 0;
  const bySeverity = {};
  const byRule = {};

  for (const alert of alerts) {
    // Ignore non-CodeQL alerts (other code scanning tools)
    const toolName = alert?.tool?.name ?? "";
    if (!toolName.toLowerCase().includes("codeql")) continue;

    // Hard Rule #14: Dismissed alerts don't count
    if (alert.state === "dismissed") continue;

    
    if (alert.state !== "open") continue;

    alertCount++;

    // Coletar por severidade (security_severity_level ou severity da rule)
    const severity = (
      alert?.rule?.security_severity_level ??
      alert?.rule?.severity ??
      "unknown"
    ).toLowerCase();
    bySeverity[severity] = (bySeverity[severity] ?? 0) + 1;

    // Coletar por rule ID
    const ruleId = alert?.rule?.id ?? "unknown";
    byRule[ruleId] = (byRule[ruleId] ?? 0) + 1;
  }

  return { alertCount, bySeverity, byRule };
}

/**
 * Evaluates the MEASURED count of CodeQL alerts against the baseline.
 * Direction: down (the count can only GO DOWN — more alerts = regression).
 *
 * Exported for unit testing — espelha evaluateDeadCode em check-dead-code.mjs.
 *
 * @param {number} current  - Alert count measured now.
 * @param {number} baseline - Count frozen in quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateCodeqlRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

// ---------------------------------------------------------------------------
// Repository detection
// ---------------------------------------------------------------------------

/**
 * Detects the owner/repo of the current repository using `gh repo view`.
 * Returns null if `gh` is not available or not authenticated.
 *
 * @param {string} ghBin - Path to the gh binary
 * @returns {string|null} "owner/repo" ou null
 */
export function detectRepo(ghBin) {
  try {
    const stdout = execFileSync(
      ghBin,
      ["repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"],
      {
        encoding: "utf8",
        timeout: 15_000,
      }
    );
    return stdout.trim() || null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detects whether the `gh` binary is available in the PATH.
 * Uses `which` (Unix) without shell interpolation — Hard Rule
 *
 * @returns {string|null} Absolute path to the binary, or null if absent.
 */
export function findGhCli() {
  try {
    const result = spawnSync("which", ["gh"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.status === 0) {
      return result.stdout.trim();
    }
  } catch {
    // which not available
  }

  // Fallback: Try to run directly to check for ENOENT
  try {
    const result = spawnSync("gh", ["--version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "gh"; // found in PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// API caller
// ---------------------------------------------------------------------------

/**
 * Busca alertas CodeQL abertos via `gh api`.
 * Automatically paginates (GitHub returns a maximum of 100 per page).
 *
 * @param {string} ghBin - Path to the gh binary
 * @param {string} repo  - "owner/repo"
 * @returns {Array} Array de alertas
 */
function fetchCodeQLAlerts(ghBin, repo) {
  const allAlerts = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const endpoint = `/repos/${repo}/code-scanning/alerts?state=open&tool_name=CodeQL&per_page=${perPage}&page=${page}`;

    if (!QUIET) {
      process.stderr.write(`[codeql-ratchet] Fetching alerts: page ${page} ...\n`);
    }

    let stdout;
    try {
      stdout = execFileSync(ghBin, ["api", endpoint], {
        encoding: "utf8",
        timeout: 30_000,
        maxBuffer: 16 * 1024 * 1024,
      });
    } catch (err) {
      const errMsg = String(err.stderr ?? err.message ?? "");

      
      if (
        errMsg.includes("authentication") ||
        errMsg.includes("401") ||
        errMsg.includes("not logged")
      ) {
        return { error: "no-auth", message: errMsg };
      }

      // Rate limit ou outro erro HTTP
      const codeMatch = /HTTP (\d{3})/.exec(errMsg);
      const code = codeMatch ? codeMatch[1] : "unknown";
      return { error: `api-error:${code}`, message: errMsg };
    }

    let page_alerts;
    try {
      page_alerts = JSON.parse(stdout);
    } catch (parseErr) {
      // A malformed (but HTTP-200) API response is a MEASUREMENT failure, not a
      // regression. A blocking gate must never red on it — return the same
      // {error,message} shape the caller already maps to a graceful SKIP (exit 0).
      return { error: "parse-error", message: String(parseErr.message ?? parseErr) };
    }

    // The API returns null when there are no more pages (or an empty array)
    if (!Array.isArray(page_alerts) || page_alerts.length === 0) break;

    allAlerts.push(...page_alerts);

    // If it returned less than perPage, we have reached the last page
    if (page_alerts.length < perPage) break;

    page++;
  }

  return allAlerts;
}

// ---------------------------------------------------------------------------
// Baseline
// ---------------------------------------------------------------------------

/**
 * Reads metrics.codeqlAlerts.value from quality-baseline.json.
 * Returns null if the file or metric is missing (pure collector mode:
 * without a baseline, there is no ratchet, only the count is output).
 *
 * @returns {number|null}
 */
function readBaselineCodeqlValue() {
  if (!fs.existsSync(BASELINE_PATH)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.codeqlAlerts;
  if (!metric || typeof metric.value !== "number") return null;
  return metric.value;
}

/**
 * Applies the ratchet (direction:down) to the measured count vs. the baseline.
 * Sets process.exitCode = 1 in an actual regression (measurement > baseline) except
 * --advisory. Ratchets the baseline with --update when the count drops.
 *
 * Exported for unit testing (drives the effect in process.exitCode).
 *
 * @param {number} alertCount - MEASURED count (successful measurement).
 */
export function applyRatchet(alertCount) {
  const baselineValue = readBaselineCodeqlValue();

  // No baseline → pure collector mode (outputs the count, does not fail).
  if (baselineValue === null) {
    if (!QUIET) {
      process.stderr.write(
        "[codeql-ratchet] Baseline missing (metrics.codeqlAlerts) — collector mode, no ratchet.\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const { regressed, improved } = evaluateCodeqlRatchet(alertCount, baselineValue);

  if (UPDATE && improved) {
    const baselineJson = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
    baselineJson.metrics.codeqlAlerts.value = alertCount;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baselineJson, null, 2) + "\n");
    console.log(`[codeql-ratchet] ratcheted baseline: ${alertCount} (was ${baselineValue})`);
  }

  if (regressed && !ADVISORY) {
    process.stderr.write(
      `[codeql-ratchet] REGRESSION — ${alertCount} open CodeQL alerts > baseline ${baselineValue}\n` +
        "  → Fix the new alerts in Security → Code scanning, or run\n" +
        "    'node scripts/check/check-codeql-ratchet.mjs --update' if the count has legitimately dropped.\n"
    );
    process.exitCode = 1;
    return;
  }

  if (!QUIET) {
    const verdict = regressed ? "ADVISORY — regression ignored (--advisory)" : "OK — no regression";
    process.stderr.write(
      `[codeql-ratchet] ${verdict} — ${alertCount} alertas (baseline ${baselineValue})\n`
    );
  }
  process.exitCode = 0;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const ghBin = findGhCli();

  if (!ghBin) {
    console.log("codeqlAlerts=SKIP reason=binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[codeql-ratchet] SKIP — `gh` CLI not found in PATH.\n" +
          "[codeql-ratchet] Instale via: https://cli.github.com/\n" +
          "[codeql-ratchet] ADVISORY — This gate exits 0 (ratchet enters Phase 7 INT CI).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  
  const repo = detectRepo(ghBin);
  if (!repo) {
    console.log("codeqlAlerts=SKIP reason=no-repo");
    if (!QUIET) {
      process.stderr.write(
        "[codeql-ratchet] SKIP — Could not detect GitHub repository.\n" +
          "[codeql-ratchet] Execute dentro de um repositório GitHub com `gh` autenticado.\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  if (!QUIET) {
    process.stderr.write(`[codeql-ratchet] Repository detected: ${repo}\n`);
  }

  // Fetch alerts
  const result = fetchCodeQLAlerts(ghBin, repo);

  // Tratar erros da API com skip gracioso
  if (!Array.isArray(result)) {
    const { error, message } = result;
    console.log(`codeqlAlerts=SKIP reason=${error}`);
    if (!QUIET) {
      process.stderr.write(
        `[codeql-ratchet] SKIP — erro ao consultar API GitHub: ${message.slice(0, 200)}\n`
      );
    }
    process.exitCode = 0;
    return;
  }

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    return;
  }

  const { alertCount, bySeverity, byRule } = parseCodeQLAlerts(result);

  // Output in KEY=VALUE format for the metrics collector (collect-metrics.mjs)
  console.log(`codeqlAlerts=${alertCount}`);

  if (!QUIET) {
    const severitySummary =
      Object.entries(bySeverity)
        .map(([k, v]) => `${k}=${v}`)
        .join(", ") || "nenhum";
    const topRules =
      Object.entries(byRule)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([r, n]) => `${r}(${n})`)
        .join(", ") || "nenhum";

    process.stderr.write(
      `[codeql-ratchet] Open CodeQL alerts (not dismissed): ${alertCount}\n`
    );
    if (alertCount > 0) {
      process.stderr.write(`[codeql-ratchet]   Por severidade: ${severitySummary}\n`);
      process.stderr.write(`[codeql-ratchet]   Top rules: ${topRules}\n`);
    }
  }

  // Successful measurement → applies the ratchet (blocker except --advisory).
  // Any MEASUREMENT failure above has already returned with exit 0 (graceful skip).
  applyRatchet(alertCount);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
