#!/usr/bin/env node
// scripts/check/check-secrets.mjs
// Catraca de secret scanning via gitleaks (Task 7.18 — Fase 7).
//
// Complementa `check-public-creds.mjs` (Fase 6, cobre credenciais OAuth públicas
// conhecidas em 2 arquivos específicos): este gate pega a classe geral de secrets —
// `const API_KEY = "sk-…"`, tokens em config/teste/docs, secrets em histórico.
//
// Saída (stdout):
//   secretFindings=N      — número de findings do gitleaks
//   secretFindings=SKIP reason=binary-absent   — gitleaks não está no PATH
//
// Findings are advisory by default. With --ratchet, exit 1 is a measured
// regression and exit 2 is INCOMPLETE (missing tool, source, report or baseline).
// Invalid scanner output never becomes a measured zero, including in JSON mode.
//
// Uso:
//   node scripts/check/check-secrets.mjs
//   node scripts/check/check-secrets.mjs --json     # imprime JSON bruto do gitleaks
//   node scripts/check/check-secrets.mjs --quiet    # suprime logs de diagnóstico
//   node scripts/check/check-secrets.mjs --ratchet   # falha (exit 1) numa regressão

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
 * O gitleaks emite um array de findings (ou array vazio / null quando limpo):
 * [
 *   {
 *     Description: string,
 *     StartLine: number,
 *     EndLine: number,
 *     Match: string,       // valor mascarado ou trecho
 *     Secret: string,      // valor mascarado
 *     File: string,        // caminho relativo
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
  // null ou array vazio = nenhum finding
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

    // Agrupar por arquivo
    const file = finding.File ?? finding.file ?? "unknown";
    byFile[file] = (byFile[file] ?? 0) + 1;
  }

  return { findingCount, byRule, byFile };
}

// ---------------------------------------------------------------------------
// Ratchet (direction:down) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Avalia a contagem MEDIDA de secrets contra o baseline.
 * Direction: down (a contagem só pode CAIR — mais secrets = regressão).
 *
 * @param {number} current  - Contagem de findings medida agora.
 * @param {number} baseline - Contagem congelada em quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateSecretsRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

/**
 * Lê metrics.secretFindings.value do quality-baseline.json.
 * Retorna null se o arquivo ou a métrica estiverem ausentes (sem baseline não há
 * ratchet possível — o caller obrigatório trata como INCOMPLETE, exit 2).
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
  if (!metric || !Number.isSafeInteger(metric.value) || metric.value < 0) return null;
  return metric.value;
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detecta se o binário `gitleaks` está disponível no PATH.
 * Usa `which` (Unix) sem interpolação de shell — Hard Rule #13.
 *
 * @returns {string|null} Caminho para o binário, ou null se ausente.
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
    // which não disponível
  }

  // Fallback: tentar executar diretamente para verificar ENOENT
  try {
    const result = spawnSync("gitleaks", ["version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "gitleaks"; // encontrado no PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function incomplete(reason, required = RATCHET) {
  console.log(`secretFindings=${required ? "INCOMPLETE" : "SKIP"} reason=${reason}`);
  if (!QUIET) process.stderr.write(`[check-secrets] Measurement unavailable: ${reason}.\n`);
  process.exitCode = required ? 2 : 0;
}

function main() {
  const baselineValue = RATCHET ? readBaselineSecretsValue(BASELINE_PATH) : null;
  if (RATCHET && baselineValue === null) return incomplete("baseline-invalid");
  const gitleaksBin = findGitleaks();

  if (!gitleaksBin) {
    return incomplete("binary-absent");
  }

  // Resolver os diretórios de fonte que realmente existem (robusto se um sumir).
  const scanDirs = SECRET_SCAN_DIRS.filter((d) => fs.existsSync(path.join(ROOT, d)));

  if (scanDirs.length === 0) {
    return incomplete("source-absent");
  }

  if (!QUIET) {
    process.stderr.write(
      `[check-secrets] Rodando gitleaks dir <dir> --report-format json para: ${scanDirs.join(", ")} ...\n`
    );
  }

  // `gitleaks dir` aceita UM ÚNICO path posicional (uso: `gitleaks dir [flags]
  // [path]`). Passar múltiplos paths faz o gitleaks ignorar os extras e cair para
  // escanear o CWD inteiro (`.`) — o que re-traz node_modules/docs/tests e o
  // timeout original. Por isso escaneamos CADA diretório de fonte em uma invocação
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
    let scannerStatus = 0;
    try {
      stdout = execFileSync(gitleaksBin, args, {
        cwd: ROOT,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        maxBuffer: 32 * 1024 * 1024,
        timeout: 90_000, // 90s por dir — o scan escopado completa em ~10s; folga ampla
      });
    } catch (err) {
      // Only gitleaks' documented findings exit can carry a usable report.
      stdout = err.stdout ? String(err.stdout) : "";
      scannerStatus = err.status;
      if (scannerStatus !== 1 || err.signal || err.code) {
        return incomplete("scanner-failed", true);
      }
    }

    if (!stdout.trim()) return incomplete("report-empty", true);
    let parsed;
    try {
      parsed = JSON.parse(stdout.trim());
    } catch {
      // The report and child stderr may contain credentials; never echo either.
      return incomplete("report-json-invalid", true);
    }
    if (parsed === null) parsed = [];
    if (
      !Array.isArray(parsed) ||
      parsed.some(
        (finding) =>
          !finding ||
          Array.isArray(finding) ||
          typeof finding !== "object" ||
          typeof (finding.RuleID ?? finding.ruleId) !== "string" ||
          !(finding.RuleID ?? finding.ruleId).trim() ||
          typeof (finding.File ?? finding.file) !== "string" ||
          !(finding.File ?? finding.file).trim()
      )
    ) {
      return incomplete("report-schema-invalid", true);
    }
    if (scannerStatus === 1 && parsed.length === 0) return incomplete("report-inconsistent", true);
    gitleaksJson.push(...parsed);
  }

  if (PRINT_JSON) {
    process.stdout.write(JSON.stringify(gitleaksJson, null, 2) + "\n");
    applyRatchet(gitleaksJson.length, baselineValue);
    return;
  }

  const { findingCount, byRule } = parseGitleaksJson(gitleaksJson);

  // Emitir em formato KEY=VALUE para o coletor de métricas (collect-metrics.mjs)
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
          "[check-secrets] adicione entradas em .gitleaks.toml [[allowlist]] com comentário.\n"
      );
    } else {
      process.stderr.write("[check-secrets] Nenhum finding detectado.\n");
    }
  }

  // Medição bem-sucedida → aplica o ratchet (bloqueante só com --ratchet).
  applyRatchet(findingCount, baselineValue);
}

/**
 * Aplica o ratchet (direction:down) sobre a contagem medida vs o baseline.
 * Sem --ratchet: advisory (exit 0). Com --ratchet: exit 1 numa regressão real
 * (medida > baseline). The required baseline is validated before scanning.
 *
 * @param {number} findingCount - Contagem MEDIDA (medição bem-sucedida).
 * @param {number|null} baselineValue - Validated baseline, null in advisory mode.
 */
function applyRatchet(findingCount, baselineValue) {
  if (!RATCHET) {
    if (!QUIET) {
      process.stderr.write(
        "[check-secrets] ADVISORY — não falha pela contagem (passe --ratchet para bloquear regressão).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const { regressed } = evaluateSecretsRatchet(findingCount, baselineValue);
  if (regressed) {
    process.stderr.write(
      `[check-secrets] REGRESSÃO — ${findingCount} secret findings > baseline ${baselineValue}\n` +
        "  → Remova o novo secret (ou allowliste em .gitleaks.toml se for falso-positivo legítimo),\n" +
        "    depois re-baseline metrics.secretFindings em config/quality/quality-baseline.json.\n"
    );
    process.exitCode = 1;
    return;
  }

  if (!QUIET) {
    process.stderr.write(
      `[check-secrets] OK — sem regressão (${findingCount} findings, baseline ${baselineValue}).\n`
    );
  }
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
