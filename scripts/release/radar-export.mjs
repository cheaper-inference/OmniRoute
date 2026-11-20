#!/usr/bin/env node
// Generates the stable export of the OmniRoute catalog consumed by OmniRoute Radar
// (`RADAR_EXPORT_URL` → `${DATA_DIR}/export-omniroute.json` on private server).
//
// Why it exists: Radar server (1 GB RAM on Akamai) NEVER clones or installs
// o OmniRoute; it only downloads this JSON from a stable URL. Before export came
// of the snapshot recorded in the deploy, attached to the operator's machine. This script runs
// in the OmniRoute CI (which has the tsx catalog modules), issue the export with
// PROVENANCE and the workflow publishes it as a fixed URL release asset.
//
// Contrato do consumidor (`src/feed/exportSource.ts` no radar-server): exige
// `budgets[]` non-empty and reads `generatedIn`; extra keys are ignored, so
// `totais`, `registry` e `provenance` viajam junto sem quebrar retrocompat.
//
// Usage (needs tsx, as it reads .ts):
// node --import tsx/esm scripts/release/radar-export.mjs [output.json]

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(DIR, "../.."); // …/OmniRoute
const OUTPUT = process.argv[2] || path.join(REPO, "export-omniroute.json");

const { FREE_MODEL_BUDGETS } = await import(
  path.join(REPO, "open-sse/config/freeModelCatalog.data.ts")
);
const { computeFreeModelTotals } = await import(
  path.join(REPO, "open-sse/config/freeModelCatalog.ts")
);
const { REGISTRY } = await import(path.join(REPO, "open-sse/config/providerRegistry.ts"));

/**
 * Provenance: who/when/from-which-commit generated the export. Each field is `null`
 * when the origin is unknown — we NEVER invent a value (D16: unknown
 * remains `null`). In CI, GitHub populates the variables; locally we fall into
 * `git` and, without repository, in `null`.
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
    return execFileSync("git", ["-C", REPO, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim() || null;
  } catch {
    return null;
  }
}

function buildProvenance(geradoEm) {
  const sourceCommit = firstEnv("GITHUB_SHA") ?? gitHead();
  const sourceRef = firstEnv("GITHUB_REF_NAME", "GITHUB_REF");
  const server = firstEnv("GITHUB_SERVER_URL");
  const repository = firstEnv("GITHUB_REPOSITORY");
  const runId = firstEnv("GITHUB_RUN_ID");
  const runUrl = server && repository && runId ? `${server}/${repository}/actions/runs/${runId}` : null;
  return {
    generatedAt: geradoEm,
    generator: "scripts/release/radar-export.mjs",
    generatedBy: firstEnv("GITHUB_ACTIONS") ? "github-actions" : "manual",
    sourceCommit,
    sourceRef,
    runUrl,
  };
}

const geradoEm = new Date().toISOString();
const dados = {
  geradoEm,
  budgets: FREE_MODEL_BUDGETS,
  totais: computeFreeModelTotals(),
  // Just the keys: the consumer just asks "do we know how to route this provider?".
  registry: Object.keys(REGISTRY).sort(),
  provenance: buildProvenance(geradoEm),
};

fs.mkdirSync(path.dirname(path.resolve(OUTPUT)), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(data));
console.log(
  `exported catalog → ${path.basename(OUTPUT)}: ` +
    `${dados.budgets.length} modelos, ${dados.registry.length} providers no registry` +
    ` (commit ${dados.provenance.sourceCommit ?? "desconhecido"})`
);
