#!/usr/bin/env node
// Gera o export estável do catálogo OmniRoute consumido pelo OmniRoute Radar
// (`RADAR_EXPORT_URL` → `${DATA_DIR}/export-omniroute.json` no servidor privado).
//
// Por que existe: o servidor Radar (1 GB RAM na Akamai) NUNCA clona nem instala
// o OmniRoute; ele só baixa este JSON de uma URL estável. Antes o export vinha
// do snapshot gravado no deploy, preso à máquina do operador. Este script roda
// no CI do OmniRoute (que tem os módulos de catálogo + tsx), emite o export com
// PROVENIÊNCIA e o workflow o publica como asset de release de URL fixa.
//
// Contrato do consumidor (`src/feed/exportSource.ts` no radar-server): exige
// `budgets[]` não-vazio e lê `geradoEm`; chaves extras são ignoradas, então
// `totais`, `registry` e `provenance` viajam junto sem quebrar retrocompat.
//
// Uso (precisa de tsx, pois lê .ts):
//   node --import tsx/esm scripts/release/radar-export.mjs [saída.json]

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import evidencePolicy from "../../config/quality/free-catalog-evidence.json" with { type: "json" };
import {
  FREE_CATALOG_CURATED_AT,
  FREE_MODEL_BUDGETS,
} from "../../open-sse/config/freeModelCatalog.data.ts";
import { RETIRED_FREE_ROWS } from "../../open-sse/config/freeModelCatalog.retired.data.ts";
import {
  computePublicFreeHeadline,
  computeRowSumMirror,
  resolveFreeQuotaUnit,
} from "../../open-sse/config/freeModelCatalog.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { catalogKey } from "../check/freeCatalogEvidence.mjs";
import { isMainModule } from "../lib/is-main-module.mjs";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(DIR, "../.."); // …/OmniRoute
const evidenceByRow = new Map(evidencePolicy.evidence.map((entry) => [catalogKey(entry), entry]));

/**
 * Proveniência: quem/quando/de-qual-commit gerou o export. Cada campo é `null`
 * quando a origem é desconhecida — NUNCA inventamos um valor (D16: desconhecido
 * permanece `null`). No CI o GitHub popula as variáveis; localmente caímos no
 * `git` e, sem repositório, em `null`.
 */
function firstEnv(...names) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return null;
}

function gitHead() {
  try {
    return (
      execFileSync("git", ["-C", REPO, "rev-parse", "HEAD"], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }).trim() || null
    );
  } catch {
    return null;
  }
}

function buildProvenance(geradoEm) {
  const sourceCommit = firstEnv("RADAR_EXPORT_SOURCE_SHA", "GITHUB_SHA") ?? gitHead();
  const sourceRef = firstEnv("RADAR_EXPORT_SOURCE_REF", "GITHUB_REF_NAME", "GITHUB_REF");
  const server = firstEnv("GITHUB_SERVER_URL");
  const repository = firstEnv("GITHUB_REPOSITORY");
  const runId = firstEnv("GITHUB_RUN_ID");
  const runUrl =
    server && repository && runId ? `${server}/${repository}/actions/runs/${runId}` : null;
  return {
    generatedAt: geradoEm,
    generator: "scripts/release/radar-export.mjs",
    generatedBy: firstEnv("GITHUB_ACTIONS") ? "github-actions" : "manual",
    sourceCommit,
    sourceRef,
    runUrl,
  };
}

export function buildExportBudgets(rows) {
  return rows.map((row) => {
    const source = evidenceByRow.get(catalogKey(row));
    const budget = {
      ...row,
      quotaUnit: resolveFreeQuotaUnit(row) ?? null,
      evidence: source ? { url: source.sourceUrl, checkedAt: source.checkedAt } : null,
    };
    if (row.gates?.length) {
      budget.gatedTokensPerMonth = row.monthlyTokens;
      if (row.poolKey) budget.gatedPoolId = row.poolKey;
    }
    return budget;
  });
}

function main() {
  const saida = process.argv[2] || path.join(REPO, "export-omniroute.json");
  const geradoEm = new Date().toISOString();
  const dados = {
    exportVersion: 2,
    geradoEm,
    curatedAt: FREE_CATALOG_CURATED_AT,
    budgets: buildExportBudgets(FREE_MODEL_BUDGETS),
    totais: computePublicFreeHeadline(),
    rowSum: computeRowSumMirror(),
    retired: RETIRED_FREE_ROWS,
    // Só as chaves: o consumidor apenas pergunta "sabemos rotear este provider?".
    registry: Object.keys(REGISTRY).sort(),
    provenance: buildProvenance(geradoEm),
  };

  fs.mkdirSync(path.dirname(path.resolve(saida)), { recursive: true });
  fs.writeFileSync(saida, JSON.stringify(dados));
  console.log(
    `catálogo exportado → ${path.basename(saida)}: ` +
      `${dados.budgets.length} modelos, ${dados.registry.length} providers no registry` +
      ` (commit ${dados.provenance.sourceCommit ?? "desconhecido"})`
  );
}

if (isMainModule(import.meta.url)) main();
