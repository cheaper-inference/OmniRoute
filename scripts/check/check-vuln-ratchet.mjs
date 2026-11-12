#!/usr/bin/env node
// scripts/check/check-vuln-ratchet.mjs
// Catraca de vulnerabilidades de dependências via osv-scanner (Task 7.2 — Fase 7).
//
// Saída (stdout):
//   vulnCount=N         — applicable findings after exact, reviewed dispositions
//   rawVulnCount=N      — original scanner count; never hidden
//   notAffectedCount=N — exact non-applicable artifacts (version + integrity + expiry)
//   vulnCount=SKIP reason=binary-absent   — osv-scanner não está no PATH
//
// Advisory mode reports findings without blocking. With --ratchet, exit 1 means
// a measured regression and exit 2 means INCOMPLETE (tool/report/baseline missing).
// An unavailable measurement never establishes zero vulnerabilities.
//
// NB (variância de CVE): osv mede contra um banco de CVEs que cresce de forma
// contínua. Um PR que NÃO toca dependências pode subitamente medir vulnCount >
// baseline porque um novo CVE foi divulgado nas deps existentes — isso é o
// comportamento ESPERADO de um gate de CVE bloqueante, não uma regressão de
// produto. O remédio é (a) bumpar a dep afetada (preferível) ou, se não houver
// fix, preserve the blocker. A proven absent vulnerable mechanism can be recorded
// in vulnerability-dispositions.json with exact artifact identity and a tracking issue.
// Ver docs/security/SUPPLY_CHAIN.md → "Variância de CVE".
//
// Uso:
//   node scripts/check/check-vuln-ratchet.mjs
//   node scripts/check/check-vuln-ratchet.mjs --json    # OSV JSON plus explicit disposition assessment
//   node scripts/check/check-vuln-ratchet.mjs --quiet   # suprime logs de diagnóstico
//   node scripts/check/check-vuln-ratchet.mjs --ratchet  # falha (exit 1) numa regressão

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
 * Formato do osv-scanner v1+:
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
 * Contagem: cada entrada em `vulnerabilities[]` de cada package conta como 1 vuln.
 * Se `groups` estiver presente e tiver menos entradas que `vulnerabilities`, usamos
 * `groups.length` para deduplificar (mesma vuln em múltiplos pacotes conta 1x por
 * grupo). Caso contrário, contamos `vulnerabilities.length`.
 *
 * @param {object|null} osvJson - Objeto JSON parseado do osv-scanner
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

// Reviewed non-applicability is narrower than ignoring an advisory or a package.
// Every match is bound to advisory, ecosystem, exact version, lock integrity and expiry.
export function applyVulnerabilityDispositions(osvJson, policy, lock, now = new Date()) {
  if (policy?.schemaVersion !== 1 || !Array.isArray(policy.dispositions)) {
    throw new Error("Invalid vulnerability disposition policy");
  }
  const today = now.toISOString().slice(0, 10);
  const rules = policy.dispositions.map((entry) => {
    if (
      entry?.status !== "not_affected" ||
      entry.justification !== "vulnerable_code_not_present" ||
      !/^GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/.test(entry.advisory || "") ||
      entry.ecosystem !== "npm" ||
      !/^(?:@[a-z0-9._-]+\/)?[a-z0-9._-]+$/.test(entry.name || "") ||
      !/^\d+\.\d+\.\d+$/.test(entry.version || "") ||
      !/^sha512-[A-Za-z0-9+/]{86}==$/.test(entry.integrity || "") ||
      !/^\d{4}-\d{2}-\d{2}$/.test(entry.expiresOn || "") ||
      new Date(`${entry.expiresOn}T00:00:00Z`).toISOString().slice(0, 10) !== entry.expiresOn ||
      !/^https:\/\/github\.com\/cheaper-inference\/OmniRoute\/issues\/\d+$/.test(
        entry.trackingIssue || ""
      ) ||
      typeof entry.reason !== "string" ||
      entry.reason.trim().length < 40 ||
      !Array.isArray(entry.references) ||
      entry.references.length < 2 ||
      !entry.references.every((url) => typeof url === "string" && url.startsWith("https://"))
    ) {
      throw new Error("Unbounded or undocumented vulnerability disposition");
    }
    if (!lock || !lock.packages || typeof lock.packages !== "object") {
      throw new Error("Lock identity is required for vulnerability dispositions");
    }
    const suffix = `node_modules/${entry.name}`;
    const matches = Object.entries(lock.packages).filter(([location, pkg]) => {
      const matchesPath = location === suffix || location.endsWith(`/${suffix}`);
      const matchesName = pkg.name === entry.name || (matchesPath && !pkg.name);
      return matchesName && pkg.version === entry.version;
    });
    return {
      ...entry,
      applicable:
        entry.expiresOn > today &&
        matches.length > 0 &&
        matches.every(([, pkg]) => pkg.integrity === entry.integrity),
    };
  });

  const rawVulnCount = parseOsvJson(osvJson).vulnCount;
  const applied = [];
  const report = {
    ...osvJson,
    results: osvJson.results.map((result) => ({
      ...result,
      packages: result.packages.map((pkg) => {
        const removedIds = new Set();
        const vulnerabilities = pkg.vulnerabilities.filter((vuln) => {
          const rule = rules.find(
            (entry) =>
              entry.applicable &&
              pkg.package?.ecosystem === entry.ecosystem &&
              pkg.package.name === entry.name &&
              pkg.package.version === entry.version &&
              vuln.id === entry.advisory
          );
          if (!rule) return true;
          for (const id of [vuln.id, ...(vuln.aliases || [])]) removedIds.add(id);
          applied.push({
            advisory: rule.advisory,
            name: rule.name,
            version: rule.version,
            trackingIssue: rule.trackingIssue,
            expiresOn: rule.expiresOn,
          });
          return false;
        });
        if (!removedIds.size) return pkg;
        const keptIds = new Set(
          vulnerabilities.flatMap((vuln) => [vuln.id, ...(vuln.aliases || [])])
        );
        const groups = pkg.groups?.filter((group) => {
          if (!Array.isArray(group.ids) || group.ids.length === 0) {
            throw new Error("Unknown vulnerability group cannot be adjudicated");
          }
          // An unknown ID or a finding still present in a shared group remains blocking.
          return group.ids.some((id) => keptIds.has(id) || !removedIds.has(id));
        });
        return { ...pkg, vulnerabilities, ...(groups ? { groups } : {}) };
      }),
    })),
  };
  const applicableVulnCount = parseOsvJson(report).vulnCount;
  if (applicableVulnCount > rawVulnCount) {
    throw new Error("Inconsistent vulnerability groups cannot be adjudicated");
  }
  return { report, rawVulnCount, notAffectedCount: rawVulnCount - applicableVulnCount, applied };
}

function readVulnerabilityDispositions(osvJson) {
  const policyPath = path.join(ROOT, "config/quality/vulnerability-dispositions.json");
  if (!fs.existsSync(policyPath)) {
    return {
      report: osvJson,
      rawVulnCount: parseOsvJson(osvJson).vulnCount,
      notAffectedCount: 0,
      applied: [],
    };
  }
  const policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
  const lock = JSON.parse(fs.readFileSync(path.join(ROOT, "package-lock.json"), "utf8"));
  return applyVulnerabilityDispositions(osvJson, policy, lock);
}

/**
 * Extrai a severidade de uma entrada de vulnerabilidade do osv-scanner.
 * Tenta database_specific.severity, depois severity[0].type, depois "UNKNOWN".
 *
 * @param {object} vuln - Entrada de vulnerabilidade do osv-scanner
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
 * Avalia a contagem MEDIDA de vulnerabilidades contra o baseline.
 * Direction: down (a contagem só pode CAIR — mais vulns = regressão).
 *
 * @param {number} current  - Contagem de vulnerabilidades medida agora.
 * @param {number} baseline - Contagem congelada em quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateVulnRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

/**
 * Lê metrics.vulnCount.value do quality-baseline.json.
 * Retorna null se o arquivo ou a métrica estiverem ausentes (sem baseline não há
 * ratchet possível — o caller trata como INCOMPLETE no modo obrigatório).
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
 * Detecta se o binário `osv-scanner` está disponível no PATH.
 * Usa `which` (Unix) sem interpolação de shell — Hard Rule #13.
 *
 * @returns {string|null} Caminho absoluto para o binário, ou null se ausente.
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
    // which não disponível — tentar command -v via sh
  }

  // Fallback: tentar executar diretamente para verificar ENOENT
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
 * Executa o osv-scanner sobre o lockfile/diretório.
 * Usa execFileSync sem shell interpolation (Hard Rule #13).
 *
 * Falhas de execução ou formato retornam { skip: true, reason }; o modo obrigatório
 * as reporta como INCOMPLETE. Exit 1 do scanner é um resultado com findings;
 * 127/128 e sinais não são medições. Ver https://google.github.io/osv-scanner/output/.
 *
 * @param {string} osvBin - Caminho para o binário osv-scanner
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
    // osv-scanner sai com código != 0 quando encontra vulnerabilidades;
    // o JSON ainda vai no stdout.
    stdout = err.stdout ? String(err.stdout) : "";
    if (err.status !== 1 || err.signal || err.killed || !stdout.trim()) {
      process.stderr.write(`[vuln-ratchet] ERRO ao executar osv-scanner: ${err.message}\n`);
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
  let assessment;
  try {
    assessment = readVulnerabilityDispositions(osvJson);
  } catch {
    incomplete("disposition-unresolved");
    return;
  }
  const { vulnCount, bySeverity } = parseOsvJson(assessment.report);
  const dispositionMetadata = {
    rawVulnCount: assessment.rawVulnCount,
    notAffectedCount: assessment.notAffectedCount,
    applicableVulnCount: vulnCount,
    dispositions: assessment.applied,
  };
  if (PRINT_JSON) {
    process.stdout.write(
      JSON.stringify({ ...osvJson, omnirouteAssessment: dispositionMetadata }, null, 2) + "\n"
    );
    applyRatchet(vulnCount);
    return;
  }
  console.log(`rawVulnCount=${assessment.rawVulnCount}`);
  console.log(`notAffectedCount=${assessment.notAffectedCount}`);

  // Emitir em formato KEY=VALUE para o coletor de métricas (collect-metrics.mjs)
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

  // Medição bem-sucedida → aplica o ratchet (bloqueante só com --ratchet).
  applyRatchet(vulnCount);
}

/**
 * Aplica o ratchet (direction:down) sobre a contagem medida vs o baseline.
 * Sem --ratchet: advisory (exit 0). Com --ratchet: exit 1 numa regressão real
 * (medida > baseline). Baseline ausente → INCOMPLETE (exit 2).
 *
 * @param {number} vulnCount - Contagem MEDIDA (medição bem-sucedida).
 */
function applyRatchet(vulnCount) {
  if (!RATCHET) {
    if (!QUIET) {
      process.stderr.write(
        "[vuln-ratchet] ADVISORY — não falha pela contagem (passe --ratchet para bloquear regressão).\n"
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
      `[vuln-ratchet] REGRESSÃO — ${vulnCount} vulnerabilidades > baseline ${baselineValue}\n` +
        "  → Atualize as dependências afetadas e preserve o bloqueio enquanto faltarem correções.\n" +
        "    Uma não aplicabilidade comprovada exige identidade exata, evidência e expiração\n" +
        "    em config/quality/vulnerability-dispositions.json; não eleve o baseline.\n"
    );
    process.exitCode = 1;
    return;
  }

  if (!QUIET) {
    process.stderr.write(
      `[vuln-ratchet] OK — sem regressão (${vulnCount} vulns, baseline ${baselineValue}).\n`
    );
  }
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
