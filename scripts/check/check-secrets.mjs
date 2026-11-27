#!/usr/bin/env node
// scripts/check/check-secrets.mjs
// Catraca de secret scanning via gitleaks (Task 7.18 — Fase 7).
//
// Complementa `check-public-creds.mjs` (Fase 6, cobre credenciais OAuth públicas
// conhecidas em 2 arquivos específicos): este gate pega a classe geral de secrets —
// `const API_KEY = "sk-…"` e tokens indevidamente incluídos nos arquivos.
//
// Saída (stdout):
//   secretFindings=N      — número de findings do gitleaks
//   secretFindings=SKIP reason=binary-absent   — gitleaks não está no PATH
//
// A varredura por diretório é ADVISORY. Passe --ratchet para tornar BLOQUEANTE:
// lê metrics.secretFindings.value de config/quality/quality-baseline.json, compara
// a contagem MEDIDA e SAI 1 SE — E SOMENTE SE — a medida for MAIOR que o baseline
// (regressão real, direction:down). Qualquer SKIP gracioso (binário ausente, nenhum
// dir de fonte) SAI 0 mesmo com --ratchet — falta de infraestrutura nunca bloqueia,
// só uma regressão medida bloqueia.
//
// Uso:
//   node scripts/check/check-secrets.mjs
//   node scripts/check/check-secrets.mjs --json     # imprime JSON com valores mascarados
//   node scripts/check/check-secrets.mjs --quiet    # suprime logs de diagnóstico
//   node scripts/check/check-secrets.mjs --ratchet   # falha (exit 1) numa regressão
//   node scripts/check/check-secrets.mjs --staged   # 1 para achados, 2 para erro do scanner

import fs from "node:fs";
import { execFileSync, spawnSync } from "node:child_process";
import path from "node:path";

import { isMainModule } from "../lib/is-main-module.mjs";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");
const RATCHET = process.argv.includes("--ratchet");
const STAGED = process.argv.includes("--staged");
const GITLEAKS_CONFIG = path.join(ROOT, ".gitleaks.toml");
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");

// The bounded CI scan covers source, deployment and configuration directories.
// A full directory walk reads node_modules before applying path allowlists and
// has timed out in CI. The staged scan below covers the index across all paths.
const SECRET_SCAN_DIRS = [
  "src",
  "open-sse",
  "bin",
  "electron",
  "scripts",
  "packages",
  "@omniroute",
  "deploy",
  "docker",
  ".github",
  "config",
  "contrib",
  "examples",
  "skills",
];

// Gitleaks can exit 1 for operational errors. Reserve a distinct code for findings.
const STAGED_FINDINGS_EXIT_CODE = 99;

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
    const file = String(finding.File ?? finding.file ?? "unknown").replaceAll("\\", "/");
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
 * ratchet possível — o caller trata como SKIP gracioso, exit 0).
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
    if (result.error?.code !== "ENOENT") return "gitleaks";
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
    if (STAGED || !QUIET) {
      process.stderr.write(
        "[check-secrets] AVISO: gitleaks não encontrado no PATH. Varredura de segredos ignorada.\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  if (STAGED) {
    process.exitCode = runStagedScan(gitleaksBin);
    return;
  }

  // Resolver os diretórios de fonte que realmente existem (robusto se um sumir).
  const scanDirs = SECRET_SCAN_DIRS.filter((d) => fs.existsSync(path.join(ROOT, d)));

  if (scanDirs.length === 0) {
    // Nenhum dir de fonte encontrado — nada a escanear (advisory, sai 0).
    console.log("secretFindings=0");
    if (!QUIET) {
      process.stderr.write("[check-secrets] Nenhum diretório de fonte encontrado para escanear.\n");
    }
    process.exitCode = 0;
    return;
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
      "--redact=100",
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
      // exit 1 com stdout = findings encontrados (comportamento esperado do gitleaks)
      stdout = err.stdout ? String(err.stdout) : "";
      const stderr = err.stderr ? String(err.stderr) : "";

      if (err.status === 1 && stdout.trim()) {
        // Normal: gitleaks achou findings neste dir e saiu com exit 1
      } else if (!stdout.trim()) {
        process.stderr.write(
          `[check-secrets] ERRO ao executar gitleaks em '${dir}': ${err.message}\n`
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
          "[check-secrets] adicione entradas em .gitleaks.toml [[allowlists]] com comentário.\n"
      );
    } else {
      process.stderr.write("[check-secrets] Nenhum finding detectado.\n");
    }
  }

  // Medição bem-sucedida → aplica o ratchet (bloqueante só com --ratchet).
  applyRatchet(findingCount);
}

function runStagedScan(gitleaksBin) {
  const args = [
    "git",
    "--pre-commit",
    "--staged",
    "--redact=100",
    "--exit-code",
    String(STAGED_FINDINGS_EXIT_CODE),
    "--report-format",
    "json",
    "--report-path",
    "-",
    "--no-banner",
  ];
  if (fs.existsSync(GITLEAKS_CONFIG)) args.push("--config", GITLEAKS_CONFIG);
  args.push(".");

  const { status, signal, error, stdout } = spawnSync(gitleaksBin, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    timeout: 60_000,
  });
  if (error || (status !== 0 && status !== STAGED_FINDINGS_EXIT_CODE)) {
    process.stderr.write(
      `[check-secrets --staged] ERRO ao executar gitleaks (${error?.code ?? signal ?? status}).\n`
    );
    return 2;
  }

  let findings;
  try {
    findings = JSON.parse(stdout);
  } catch {
    process.stderr.write("[check-secrets --staged] ERRO: JSON inválido do gitleaks.\n");
    return 2;
  }
  // Gitleaks versions may report a clean scan as either [] or null.
  findings ??= [];
  if (
    !Array.isArray(findings) ||
    findings.some(
      (item) =>
        typeof item?.File !== "string" ||
        !item.File ||
        typeof item.RuleID !== "string" ||
        !item.RuleID ||
        !Number.isInteger(item.StartLine) ||
        item.StartLine < 1
    ) ||
    (status === STAGED_FINDINGS_EXIT_CODE) !== findings.length > 0
  ) {
    process.stderr.write(
      `[check-secrets --staged] ERRO: relatório inconsistente do gitleaks (código ${status}).\n`
    );
    return 2;
  }

  const locations = findings.map(({ File, RuleID, StartLine }) => ({
    File: File.replaceAll("\\", "/"),
    RuleID,
    StartLine,
  }));
  if (PRINT_JSON) {
    console.log(JSON.stringify(locations, null, 2));
  } else if (!QUIET) {
    console.log(`stagedSecretFindings=${locations.length}`);
  }
  if (!locations.length) return 0;

  process.stderr.write(
    `[check-secrets] BLOQUEADO — ${locations.length} achado(s) de segredos no stage:\n`
  );
  for (const { File, RuleID, StartLine } of locations.slice(0, 20)) {
    process.stderr.write(`  • [${RuleID}] ${File}:${StartLine}\n`);
  }
  return 1;
}

/**
 * Aplica o ratchet (direction:down) sobre a contagem medida vs o baseline.
 * Sem --ratchet: advisory (exit 0). Com --ratchet: exit 1 numa regressão real
 * (medida > baseline). Baseline ausente → SKIP gracioso (exit 0).
 *
 * @param {number} findingCount - Contagem MEDIDA (medição bem-sucedida).
 */
function applyRatchet(findingCount) {
  if (!RATCHET) {
    if (!QUIET) {
      process.stderr.write(
        "[check-secrets] ADVISORY — não falha pela contagem (passe --ratchet para bloquear regressão).\n"
      );
    }
    process.exitCode = 0;
    return;
  }

  const baselineValue = readBaselineSecretsValue(BASELINE_PATH);
  if (baselineValue === null) {
    if (!QUIET) {
      process.stderr.write(
        "[check-secrets] baseline ausente (metrics.secretFindings) — SKIP gracioso, sai 0.\n"
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

if (isMainModule(import.meta.url)) main();
