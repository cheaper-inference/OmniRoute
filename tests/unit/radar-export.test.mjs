import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import evidencePolicy from "../../config/quality/free-catalog-evidence.json" with { type: "json" };
import * as catalog from "../../open-sse/config/freeModelCatalog.ts";
import * as counts from "../../open-sse/config/freeModelCatalog.counts.ts";
import {
  FREE_CATALOG_CURATED_AT,
  FREE_MODEL_BUDGETS,
} from "../../open-sse/config/freeModelCatalog.data.ts";
import { RETIRED_FREE_ROWS } from "../../open-sse/config/freeModelCatalog.retired.data.ts";
import { buildFreeCatalogFacts } from "../../scripts/release/lib/free-catalog-facts.mjs";
import { nativeCoverageArgs } from "../_helpers/nativeCoverageArgs.ts";
import { membershipFromProviderConstants } from "./_helpers/providerAccessMembership.ts";

// Gera o export estável do catálogo (scripts/release/radar-export.mjs) e valida
// o contrato consumido pelo OmniRoute Radar + a proveniência (D16: desconhecido
// permanece `null`, nunca inventado).

const DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(DIR, "../.."); // …/OmniRoute
const SCRIPT = path.join(REPO, "scripts/release/radar-export.mjs");

function runExport(extraEnv = {}) {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "radar-export-"));
  const outPath = path.join(outDir, "export-omniroute.json");
  execFileSync("node", [...nativeCoverageArgs(), "--import", "tsx/esm", SCRIPT, outPath], {
    cwd: REPO,
    stdio: ["ignore", "ignore", "inherit"],
    // Base limpa: sem herdar GITHUB_* do ambiente do CI que roda os testes.
    env: {
      PATH: process.env.PATH,
      HOME: process.env.HOME,
      GITHUB_SHA: undefined,
      GITHUB_REF_NAME: undefined,
      GITHUB_REF: undefined,
      GITHUB_ACTIONS: undefined,
      GITHUB_SERVER_URL: undefined,
      GITHUB_REPOSITORY: undefined,
      GITHUB_RUN_ID: undefined,
      ...extraEnv,
    },
  });
  const parsed = JSON.parse(fs.readFileSync(outPath, "utf8"));
  fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  return parsed;
}

test("radar export satisfies the Radar consumer contract with a fresh catalog", () => {
  const data = runExport();
  // Contrato mínimo de src/feed/exportSource.ts: budgets[] não-vazio + geradoEm.
  assert.ok(Array.isArray(data.budgets) && data.budgets.length > 0, "budgets não-vazio");
  assert.ok(Array.isArray(data.registry) && data.registry.length > 0, "registry não-vazio");
  assert.ok(
    typeof data.geradoEm === "string" && !Number.isNaN(Date.parse(data.geradoEm)),
    "geradoEm ISO válido"
  );
  assert.ok(data.totais && typeof data.totais === "object", "totais presente");
  // registry ordenado e sem duplicatas (chaves de provider).
  assert.deepEqual(data.registry, [...data.registry].sort());
});

test("radar export totals agree with the public free catalog and its steady fact", () => {
  const { totais } = runExport();
  const { headlineSteady } = buildFreeCatalogFacts({
    lib: { catalog, counts },
    membershipOf: membershipFromProviderConstants,
    hasFreeIds: new Set(),
    searchIds: new Set(),
    audioIds: new Set(),
    displayName: (id) => id,
  });

  assert.equal(totais.steadyRecurringTokens, headlineSteady);
  assert.deepEqual(totais, catalog.computePublicFreeHeadline());
});

test("radar export v2 includes the curation date, row-sum totals, and retired offers", () => {
  const data = runExport();
  assert.equal(data.exportVersion, 2);
  assert.equal(data.curatedAt, FREE_CATALOG_CURATED_AT);
  assert.deepEqual(data.rowSum, catalog.computeRowSumMirror());
  assert.equal(data.retired.length, RETIRED_FREE_ROWS.length);
});

test("radar export v2 includes sorted social pool boosts with valid budget references", () => {
  const { budgets, poolBoosts } = runExport();
  assert.ok(Array.isArray(poolBoosts) && poolBoosts.length > 0);
  const pairs = new Set();
  for (const boost of poolBoosts) {
    assert.deepEqual(Object.keys(boost).sort(), ["gate", "poolId", "tokensPerMonth"]);
    const { poolId, gate, tokensPerMonth } = boost;
    for (const value of [poolId, gate]) {
      assert.equal(typeof value, "string");
      assert.ok(value.trim().length > 0);
      assert.doesNotMatch(value, /\p{Cc}|:\/\/|www\./iu);
      assert.equal(URL.canParse(value), false);
    }
    assert.ok(catalog.SOCIAL_GATES.has(gate), gate);
    assert.ok(Number.isSafeInteger(tokensPerMonth) && tokensPerMonth >= 0);
    assert.ok(
      budgets.some((row) => row.poolKey === poolId || row.gatedPoolId === poolId),
      poolId
    );
    const pair = JSON.stringify([poolId, gate]);
    assert.ok(!pairs.has(pair), pair);
    pairs.add(pair);
  }
  assert.deepEqual([...pairs], [...pairs].sort());
});

test("radar export accounts for social gated totals with gated rows and pool boosts", () => {
  const { budgets, poolBoosts = [], totais } = runExport();
  const gatedRowTokens = budgets
    .filter((row) => row.gates?.length)
    .reduce((sum, row) => sum + (row.gatedTokensPerMonth ?? row.monthlyTokens), 0);
  const poolBoostTokens = poolBoosts.reduce((sum, boost) => sum + boost.tokensPerMonth, 0);
  assert.ok(totais.socialGatedRecurringTokens <= gatedRowTokens + poolBoostTokens);

  const { socialGatedRecurringTokens: socialRowTokens } = catalog.computeFreeModelTotals({
    excludeTosAvoid: true,
    entries: FREE_MODEL_BUDGETS.filter(catalog.isSocialGated),
  });
  const { socialGatedRecurringTokens } = catalog.computeFreeModelTotals({ excludeTosAvoid: true });
  const socialBoostTokens = poolBoosts
    .filter((boost) => catalog.SOCIAL_GATES.has(boost.gate))
    .reduce((sum, boost) => sum + boost.tokensPerMonth, 0);
  assert.equal(socialBoostTokens, socialGatedRecurringTokens - socialRowTokens);
});

test("radar export accepts a gated pool ID and rejects an unreferenced live pool", async () => {
  const { buildExportPoolBoosts } = await import("../../scripts/release/radar-export.mjs");
  const perModel = catalog
    .computePublicFreeHeadline()
    .perModel.filter((row) => row.poolKey === "xkiro-free");
  const boost = catalog.FREE_TIER_BOOSTS["xkiro-free"];
  assert.deepEqual(buildExportPoolBoosts(perModel, [{ gatedPoolId: "xkiro-free" }]), [
    { poolId: "xkiro-free", gate: boost.gate, tokensPerMonth: boost.boostMonthlyTokens },
  ]);
  assert.throws(() => buildExportPoolBoosts(perModel, []), /poolBoosts: pool "xkiro-free"/);
});

test("radar export adds gate, quota unit, and evidence metadata to catalog budgets", () => {
  const { budgets } = runExport();
  assert.equal(budgets.length, FREE_MODEL_BUDGETS.length);
  for (const [index, row] of FREE_MODEL_BUDGETS.entries()) {
    const budget = budgets[index];
    const label = `${row.provider}/${row.modelId}`;
    assert.equal(budget.provider, row.provider, label);
    assert.equal(budget.modelId, row.modelId, label);
    assert.deepEqual(budget.gates, row.gates, label);
    if (row.gates?.length) {
      assert.equal(budget.gatedTokensPerMonth, budget.monthlyTokens, label);
    } else {
      assert.equal(Object.hasOwn(budget, "gatedTokensPerMonth"), false, label);
    }
    if (row.gates?.length && row.poolKey) {
      assert.equal(budget.gatedPoolId, budget.poolKey, label);
    } else {
      assert.equal(Object.hasOwn(budget, "gatedPoolId"), false, label);
    }

    assert.equal(budget.quotaUnit, catalog.resolveFreeQuotaUnit(row) ?? null, label);
    if (row.monthlyTokens > 0) {
      assert.ok(["tokens", "requests", "credits", "neurons"].includes(budget.quotaUnit), label);
    }

    const source = evidencePolicy.evidence.find(
      ({ provider, modelId }) => provider === row.provider && modelId === row.modelId
    );
    assert.deepEqual(
      budget.evidence,
      source
        ? { url: source.sourceUrl, checkedAt: source.checkedAt, sourceType: source.sourceType }
        : null,
      label
    );
  }
});

test("radar export emits valid evidence on every budget with evidence", () => {
  const { budgets } = runExport();
  const budgetsWithEvidence = budgets.filter((budget) => budget.evidence !== null);
  assert.ok(budgetsWithEvidence.length > 0);
  for (const { provider, modelId, evidence } of budgetsWithEvidence) {
    const label = `${provider}/${modelId}`;
    for (const field of ["url", "checkedAt", "sourceType"]) {
      assert.equal(typeof evidence[field], "string", `${label} evidence.${field}`);
      assert.ok(evidence[field].trim().length > 0, `${label} evidence.${field}`);
    }
    assert.doesNotThrow(() => new URL(evidence.url), `${label} evidence.url`);
  }
});

test("radar export rejects evidence with a missing or blank sourceType", async () => {
  const { buildExportBudgets } = await import("../../scripts/release/radar-export.mjs");
  const { sourceType: _sourceType, ...source } = evidencePolicy.evidence[0];
  const row = FREE_MODEL_BUDGETS.find(
    ({ provider, modelId }) => provider === source.provider && modelId === source.modelId
  );
  assert.ok(row);
  const expectedMessage = `Invalid evidence for ${source.provider}/${source.modelId}: sourceType must be a non-empty string`;
  for (const entry of [source, { ...source, sourceType: "" }, { ...source, sourceType: " " }]) {
    assert.throws(() => buildExportBudgets([row], [entry]), { message: expectedMessage });
  }
});

test("radar export keeps the gated quota for a row without a pool and leaves the input intact", async () => {
  const { buildExportBudgets } = await import("../../scripts/release/radar-export.mjs");
  const row = Object.freeze({
    provider: "fixture",
    modelId: "fixture-gated-model",
    monthlyTokens: 100,
    poolKey: null,
    gates: ["card"],
  });
  const [budget] = buildExportBudgets([row]);
  assert.notEqual(budget, row);
  assert.equal(budget.gatedTokensPerMonth, row.monthlyTokens);
  assert.equal(Object.hasOwn(budget, "gatedPoolId"), false);
});

test("radar export provenance never fabricates unknown fields", () => {
  const data = runExport();
  const p = data.provenance;
  assert.ok(p && typeof p === "object", "provenance presente");
  assert.equal(p.generatedAt, data.geradoEm);
  assert.equal(p.generator, "scripts/release/radar-export.mjs");
  // Fora de um runner do GitHub Actions: manual, e ref/runUrl desconhecidos = null.
  assert.equal(p.generatedBy, "manual");
  assert.equal(p.sourceRef, null);
  assert.equal(p.runUrl, null);
  // sourceCommit: SHA de 40 hex (via git no checkout) ou null se indisponível.
  assert.ok(
    p.sourceCommit === null || /^[0-9a-f]{40}$/.test(p.sourceCommit),
    "sourceCommit sha|null"
  );
});

test("radar export provenance reflects the GitHub Actions environment when present", () => {
  const sha = "0123456789abcdef0123456789abcdef01234567";
  const data = runExport({
    GITHUB_ACTIONS: "true",
    GITHUB_SHA: sha,
    GITHUB_REF_NAME: "release/v9.9.9",
    GITHUB_SERVER_URL: "https://github.com",
    GITHUB_REPOSITORY: "cheaper-inference/OmniRoute",
    GITHUB_RUN_ID: "42",
  });
  const p = data.provenance;
  assert.equal(p.generatedBy, "github-actions");
  assert.equal(p.sourceCommit, sha);
  assert.equal(p.sourceRef, "release/v9.9.9");
  assert.equal(p.runUrl, "https://github.com/cheaper-inference/OmniRoute/actions/runs/42");
});

test("radar export provenance prefers the checked-out release over the workflow trigger", () => {
  const sourceCommit = "b".repeat(40);
  const { provenance } = runExport({
    GITHUB_REF_NAME: "main",
    GITHUB_SHA: "a".repeat(40),
    RADAR_EXPORT_SOURCE_REF: "release/v9.9.9",
    RADAR_EXPORT_SOURCE_SHA: sourceCommit,
  });
  assert.equal(provenance.sourceRef, "release/v9.9.9");
  assert.equal(provenance.sourceCommit, sourceCommit);
});
