#!/usr/bin/env node
// scripts/check/check-openapi-breaking.mjs
// Catraca de breaking-change na API pública (Fase 8 B.4 — backlog opcional).
//
// Diffa a spec do PR (docs/openapi.yaml na working tree = HEAD) contra
// a MESMA spec no branch base, via `oasdiff breaking`. Pega regressões de contrato:
// endpoint removido, parâmetro novo obrigatório, campo de resposta removido, enum
// estreitado, etc. — mudanças que quebram clientes existentes.
//
// Complementa os gates anti-alucinação existentes:
//   • check-openapi-routes.mjs   — toda `path` na spec resolve a uma rota real.
//   • check-openapi-coverage.mjs — % de rotas reais documentadas (ratchet).
// Nenhum dos dois compara DUAS versões da spec; este sim.
//
// A required (--ratchet) measurement fails closed: exit 1 is measured regression,
// exit 2 is INCOMPLETE (missing tool/base/spec/report/baseline). Advisory mode
// preserves SKIP/exit 0. GitHub event SHAs take precedence over local BASE_REF.
// PR heads compare at merge-base; synthetic merges compare to their pinned base.
// Local usage: BASE_REF=<commit-or-ref> node scripts/check/check-openapi-breaking.mjs
// --json preserves the raw scanner array; --assessment-json adds accepted/unknown evidence.
// Historical spec corrections are exact reviewed records; every unknown finding blocks --ratchet.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolveOpenapiBaseline } from "./openapiBaseline.mjs";
import {
  assessOpenapiHistoricalCorrections,
  validateOpenapiReport,
} from "./openapiHistoricalCorrections.mjs";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");
const PRINT_ASSESSMENT = process.argv.includes("--assessment-json");
const RATCHET = process.argv.includes("--ratchet");

const SPEC_REL = "docs/openapi.yaml";
const SPEC_PATH = path.join(ROOT, "docs", "openapi.yaml");

/**
 * Deriva o branch base de release a partir de uma versão semver
 * (ex.: "3.8.29" → "origin/release/v3.8.29"). Mantém o default sincronizado com
 * o ciclo de release SEM hard-code: o version-bump atualiza package.json a cada
 * ciclo, então o default nunca fica stale (era "origin/release/v3.8.27" fixo).
 * Ignora sufixos de prerelease/build (ex.: "3.8.29-dev.2" → v3.8.29).
 *
 * @param {string|null|undefined} version
 * @returns {string|null} branch base (sem `origin/` ausente) ou null se não-semver
 */
export function releaseBranchForVersion(version) {
  const m = String(version ?? "")
    .trim()
    .match(/^(\d+)\.(\d+)\.(\d+)/);
  return m ? `origin/release/v${m[1]}.${m[2]}.${m[3]}` : null;
}

function readPackageVersion() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  } catch {
    return null;
  }
}

// Only local runs use this default; event SHAs are resolved independently.
const DEFAULT_BASE_REF = releaseBranchForVersion(readPackageVersion());
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Conta breaking changes no JSON emitido por `oasdiff breaking --format json`.
 *
 * O oasdiff emite um array de objetos (ou array vazio quando não há breaking
 * change). Cada objeto tem a forma:
 * [
 *   {
 *     id: string,          // ex.: "api-path-removed-without-deprecation"
 *     text: string,        // descrição legível
 *     level: number,       // 3 = ERR, 2 = WARN, 1 = INFO
 *     operation: string,   // ex.: "GET"
 *     path: string,        // ex.: "/api/bar"
 *     section: string,
 *     source?: string,
 *     baseSource?: { file, line, column },
 *     fingerprint: string
 *   },
 *   ...
 * ]
 *
 * @param {Array|null} oasdiffJson - Array de breaking changes do oasdiff (ou null).
 * @returns {{ count: number, byId: Record<string, number>, byPath: Record<string, number>, items: Array }}
 */
export function parseOasdiffBreaking(oasdiffJson) {
  // null, undefined ou array vazio = nenhum breaking change.
  if (
    oasdiffJson === null ||
    oasdiffJson === undefined ||
    (Array.isArray(oasdiffJson) && oasdiffJson.length === 0)
  ) {
    return { count: 0, byId: {}, byPath: {}, items: [] };
  }

  // Defensivo: qualquer coisa que não seja array é tratada como "sem dados".
  if (!Array.isArray(oasdiffJson)) {
    return { count: 0, byId: {}, byPath: {}, items: [] };
  }

  let count = 0;
  const byId = {};
  const byPath = {};
  const items = [];

  for (const change of oasdiffJson) {
    if (!change || typeof change !== "object") continue;

    count++;
    items.push(change);

    const id = change.id ?? change.ID ?? "unknown";
    byId[id] = (byId[id] ?? 0) + 1;

    const p = change.path ?? change.Path ?? "unknown";
    byPath[p] = (byPath[p] ?? 0) + 1;
  }

  return { count, byId, byPath, items };
}

// ---------------------------------------------------------------------------
// Ratchet (direction:down) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Evaluates the measured UNKNOWN findings after exact historical corrections.
 * A numeric ceiling is not permission for a different, unreviewed API break.
 *
 * Uma medição ausente (current null/undefined) OU um baseline ausente
 * (baseline null/undefined) → { regressed:false, skipped:true }: sem uma das
 * duas pontas não há ratchet possível. O caller exige medição completa no modo
 * obrigatório (exit 2 com --ratchet).
 *
 * @param {object} args
 * @param {number|null} args.current  - Unreviewed breaking changes (null = no measurement).
 * @param {number|null} args.baseline - Contagem congelada em quality-baseline.json (null = sem baseline).
 * @returns {{ regressed: boolean, skipped: boolean }}
 */
export function evaluateOpenapiRatchet({ current, baseline }) {
  if (current === null || current === undefined || baseline === null || baseline === undefined) {
    return { regressed: false, skipped: true };
  }
  return { regressed: current > 0, skipped: false };
}

/**
 * Lê metrics.openapiBreaking.value do quality-baseline.json.
 * Retorna null se o arquivo ou a métrica estiverem ausentes/inválidos (sem
 * baseline não há ratchet possível — o caller trata como INCOMPLETE no modo obrigatório).
 *
 * @param {string} baselinePath
 * @returns {number|null}
 */
export function readBaselineOpenapiValue(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.openapiBreaking;
  if (!metric || !Number.isSafeInteger(metric.value) || metric.value < 0) return null;
  return metric.value;
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detecta se o binário `oasdiff` está disponível no PATH.
 * Usa `which` (Unix) sem interpolação de shell — Hard Rule #13.
 *
 * @returns {string|null} Caminho para o binário, ou null se ausente.
 */
export function findOasdiff() {
  try {
    const result = spawnSync("which", ["oasdiff"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.status === 0 && result.stdout.trim()) {
      return result.stdout.trim();
    }
  } catch {
    // which não disponível
  }

  // Fallback: tentar executar diretamente para distinguir ENOENT de "existe".
  try {
    const result = spawnSync("oasdiff", ["--version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "oasdiff"; // encontrado no PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// Base spec resolution
// ---------------------------------------------------------------------------

/**
 * Extrai a spec base via `git show <BASE_REF>:<SPEC_REL>` para um arquivo temp.
 * Retorna o caminho do temp (chamador é responsável por limpar), ou null se a
 * spec não pôde ser resolvida (ref ausente em clone shallow, ou arquivo não
 * existia naquele ref). NUNCA lança — falha → null → medição indisponível.
 *
 * @param {string} baseRef
 * @returns {string|null} caminho do arquivo temp com a spec base, ou null.
 */
export function resolveBaseSpec(baseRef) {
  let stdout;
  try {
    stdout = execFileSync("git", ["show", `${baseRef}:${SPEC_REL}`], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      timeout: 30_000,
      stdio: ["ignore", "pipe", "ignore"], // descarta stderr ruidoso do git
    });
  } catch {
    // ref desconhecido (shallow clone), arquivo inexistente no base, etc.
    return null;
  }

  if (!stdout || !stdout.trim()) return null;

  const tmpFile = path.join(
    os.tmpdir(),
    `oasdiff-base-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.yaml`
  );
  try {
    fs.writeFileSync(tmpFile, stdout, "utf8");
  } catch {
    return null;
  }
  return tmpFile;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function incomplete(reason) {
  console.log(`openapiBreaking=${RATCHET ? "INCOMPLETE" : "SKIP"} reason=${reason}`);
  process.exitCode = RATCHET ? 2 : 0;
}

function main() {
  // 1) HEAD spec precisa existir (working tree).
  if (!fs.existsSync(SPEC_PATH)) {
    incomplete("head-spec-absent");
    if (!QUIET) {
      process.stderr.write(`[openapi-breaking] SKIP — spec não encontrada: ${SPEC_PATH}\n`);
    }
    return;
  }

  // 2) Binário oasdiff precisa estar no PATH.
  const oasdiffBin = findOasdiff();
  if (!oasdiffBin) {
    incomplete("binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[openapi-breaking] SKIP — oasdiff não encontrado no PATH.\n" +
          "[openapi-breaking] Instale via: https://github.com/oasdiff/oasdiff\n" +
          "[openapi-breaking] Required measurements must complete before acceptance.\n"
      );
    }
    return;
  }

  let comparison;
  try {
    comparison = resolveOpenapiBaseline({ defaultRef: DEFAULT_BASE_REF });
  } catch (error) {
    incomplete("base-unresolved");
    if (!QUIET) process.stderr.write(`[openapi-breaking] ${error.message}\n`);
    return;
  }
  const baseRef = comparison.baseSha;
  if (process.env.GITHUB_EVENT_NAME) {
    const candidateTmp = resolveBaseSpec(comparison.candidateSha);
    if (!candidateTmp) {
      incomplete("candidate-spec-unresolved");
      return;
    }
    try {
      if (!fs.readFileSync(candidateTmp).equals(fs.readFileSync(SPEC_PATH))) {
        incomplete("candidate-spec-mismatch");
        return;
      }
    } finally {
      fs.unlinkSync(candidateTmp);
    }
  }
  if (!PRINT_JSON && !PRINT_ASSESSMENT) {
    console.log(
      `openapiBaseSha=${baseRef} openapiCandidateSha=${comparison.candidateSha} source=${comparison.source}`
    );
  }
  const baseTmp = resolveBaseSpec(baseRef);
  if (!baseTmp) {
    incomplete("base-spec-unresolved");
    return;
  }

  try {
    // 4) Rodar `oasdiff breaking --format json <baseTmp> <headSpec>`.
    //    oasdiff sai 0 por padrão mesmo com breaking changes (só com --fail-on
    //    é que sai 1). Qualquer erro de execução é medição incompleta.
    const args = ["breaking", "--format", "json", baseTmp, SPEC_PATH];

    if (!QUIET) {
      process.stderr.write(
        `[openapi-breaking] Rodando: oasdiff breaking --format json <base:${baseRef}> ${SPEC_REL} ...\n`
      );
    }

    let stdout = "";
    try {
      stdout = execFileSync(oasdiffBin, args, {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
        timeout: 90_000,
      });
    } catch (err) {
      incomplete("oasdiff-error");
      if (!QUIET) process.stderr.write(`[openapi-breaking] oasdiff failed: ${err.message}\n`);
      return;
    }

    const trimmed = stdout.trim();
    if (!trimmed) {
      incomplete("invalid-report");
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch (parseErr) {
      // JSON inesperado não é uma medição válida.
      incomplete("parse-error");
      if (!QUIET) {
        process.stderr.write(
          `[openapi-breaking] SKIP — JSON do oasdiff não parseável: ${parseErr.message}\n` +
            `[openapi-breaking] stdout (primeiros 500): ${trimmed.slice(0, 500)}\n`
        );
      }
      return;
    }

    try {
      validateOpenapiReport(parsed);
    } catch {
      incomplete("invalid-report");
      return;
    }
    let assessment;
    try {
      const policyPath = path.join(ROOT, "config/quality/openapi-historical-corrections.json");
      let policy = { schemaVersion: 1, corrections: [] };
      if (fs.existsSync(policyPath)) {
        if (!fs.lstatSync(policyPath).isFile()) throw new Error("Correction policy is not a file");
        policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
      }
      let scannerVersion = null;
      if (policy.corrections?.some((entry) => entry?.baseSha === comparison.baseSha)) {
        const versionOutput = execFileSync(oasdiffBin, ["--version"], {
          cwd: ROOT,
          encoding: "utf8",
          maxBuffer: 4096,
          timeout: 5000,
        });
        const versions = [...versionOutput.matchAll(/\b(?:v)?(\d+\.\d+\.\d+)\b/g)];
        if (versions.length !== 1) throw new Error("Unknown scanner version");
        scannerVersion = versions[0][1];
      }
      const committedSource = (sha, relative) =>
        execFileSync("git", ["show", `${sha}:${relative}`], {
          cwd: ROOT,
          maxBuffer: 8 * 1024 * 1024,
          timeout: 30000,
          stdio: ["ignore", "pipe", "pipe"],
        });
      assessment = assessOpenapiHistoricalCorrections({
        report: parsed,
        policy,
        comparison,
        baseSpec: fs.readFileSync(baseTmp),
        candidateSpec: fs.readFileSync(SPEC_PATH),
        scannerVersion,
        readContract(relative) {
          const candidatePath = path.join(ROOT, relative);
          if (!fs.lstatSync(candidatePath).isFile())
            throw new Error("Contract source is not a file");
          return {
            base: committedSource(comparison.baseSha, relative),
            candidate: committedSource(comparison.candidateSha, relative),
            worktree: fs.readFileSync(candidatePath),
          };
        },
      });
    } catch {
      incomplete("historical-correction-unresolved");
      return;
    }
    if (PRINT_JSON || PRINT_ASSESSMENT) {
      process.stdout.write(
        JSON.stringify(PRINT_ASSESSMENT ? { comparison, ...assessment } : parsed, null, 2) + "\n"
      );
      applyRatchet(assessment.unknownCount);
      return;
    }

    const { count, byId, byPath, items } = parseOasdiffBreaking(parsed);

    // Preserve the raw measurement separately; accepted findings are never hidden.
    console.log(`openapiBreakingRaw=${assessment.rawCount}`);
    console.log(`openapiBreakingAccepted=${assessment.acceptedCount}`);
    console.log(`openapiBreakingUnknown=${assessment.unknownCount}`);
    console.log(`openapiBreaking=${assessment.unknownCount}`);

    if (!QUIET) {
      if (count > 0) {
        const topIds = Object.entries(byId)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([id, n]) => `${id}(${n})`)
          .join(", ");
        process.stderr.write(
          `[openapi-breaking] ⚠️  ${count} breaking change(s) vs '${baseRef}' (top: ${topIds})\n`
        );
        for (const it of items.slice(0, 20)) {
          const op = it.operation ?? it.Operation ?? "?";
          const p = it.path ?? it.Path ?? "?";
          const txt = it.text ?? it.Text ?? it.id ?? "";
          process.stderr.write(`[openapi-breaking]   ✗ ${op} ${p} — ${txt}\n`);
        }
        if (items.length > 20) {
          process.stderr.write(`[openapi-breaking]   … +${items.length - 20} more\n`);
        }
        // Pista de mitigação: por path.
        const topPaths = Object.entries(byPath)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([p, n]) => `${p}(${n})`)
          .join(", ");
        process.stderr.write(`[openapi-breaking]   affected paths: ${topPaths}\n`);
        if (RATCHET) {
          process.stderr.write(
            "[openapi-breaking] Historical spec corrections require exact reviewed evidence.\n" +
              "[openapi-breaking] Every unknown finding blocks; do not raise the numeric ceiling.\n"
          );
        } else {
          process.stderr.write(
            "[openapi-breaking] ADVISORY — passe --ratchet para BLOQUEAR uma regressão. Se a quebra é\n" +
              "[openapi-breaking] intencional (major bump), documente no PR; senão, ajuste a spec.\n"
          );
        }
      } else {
        process.stderr.write(
          `[openapi-breaking] OK — nenhuma breaking change na spec vs '${baseRef}'.\n`
        );
      }
    }

    // Medição bem-sucedida → aplica o ratchet (bloqueante só com --ratchet).
    applyRatchet(assessment.unknownCount);
  } finally {
    // Limpa o arquivo temp da spec base.
    try {
      fs.unlinkSync(baseTmp);
    } catch {
      // best-effort
    }
  }
}

/**
 * Aplica o ratchet (direction:down) sobre a contagem medida vs o baseline.
 * Sem --ratchet: advisory (exit 0). Com --ratchet: exit 1 numa regressão real
 * (unknown findings > 0). Baseline ausente → INCOMPLETE (exit 2).
 *
 * @param {number} count - Measured unknown findings after exact historical corrections.
 */
function applyRatchet(count) {
  if (!RATCHET) {
    process.exitCode = 0;
    return;
  }

  const baselineValue = readBaselineOpenapiValue(BASELINE_PATH);
  const { regressed, skipped } = evaluateOpenapiRatchet({
    current: count,
    baseline: baselineValue,
  });

  if (skipped) {
    incomplete("baseline-unresolved");
    if (!QUIET) {
      process.stderr.write(
        "[openapi-breaking] baseline ausente (metrics.openapiBreaking) — medição INCOMPLETE, sai 2.\n"
      );
    }
    return;
  }

  if (regressed) {
    process.stderr.write(
      `[openapi-breaking] REGRESSÃO — ${count} unreviewed breaking change(s) (stored ceiling ${baselineValue}).\n` +
        "  Preserve the real API contract. A numeric ceiling does not authorize unknown findings.\n"
    );
    process.exitCode = 1;
    return;
  }

  if (!QUIET) {
    process.stderr.write(
      `[openapi-breaking] OK — sem regressão (${count} breaking change(s), baseline ${baselineValue}).\n`
    );
  }
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
