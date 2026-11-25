import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { parseArgs } from "node:util";

import { z } from "zod";

import { FREE_MODEL_BUDGETS } from "../../../open-sse/config/freeModelCatalog.data.ts";
import { isMainModule } from "../../lib/is-main-module.mjs";
import { byCodeUnit } from "./order.mjs";

export const EVIDENCE_MAX_AGE_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;
const ledgerSchema = z.object({
  evidence: z.array(
    z.object({ provider: z.string(), modelId: z.string(), checkedAt: z.iso.date() })
  ),
});

/** @typedef {{ provider: string, modelId: string, monthlyTokens: number, poolKey: string|null }} CatalogRow */
/** @typedef {{ provider: string, modelId: string, checkedAt: string }} Evidence */
/** @typedef {{ pool: string, providers: string[], monthlyTokens: number, rowsWithValue: number,
 *   rowsWithEvidence: number, freshestCheckedAt: string|null, ageDays: number|null,
 *   status: "fresh"|"stale"|"missing" }} PoolAge */
/** @typedef {{ schemaVersion: 1, today: string, maxAgeDays: 30, pools: PoolAge[],
 *   summary: { poolsWithValue: number, fresh: number, stale: number, missing: number,
 *     medianAgeDays: number|null, tokenWeightedMedianAgeDays: number|null, maxAgeDays: number|null },
 *   uncapped: { records: number, medianAgeDays: number|null } }} EvidenceAgeReport */

function modelKey({ provider, modelId }) {
  return provider + "/" + modelId;
}

function median(sorted) {
  if (!sorted.length) return null;
  return (sorted[Math.floor((sorted.length - 1) / 2)] + sorted[Math.floor(sorted.length / 2)]) / 2;
}

function weightedMedian(sortedPools) {
  if (!sortedPools.length) return null;
  const halfway = sortedPools.reduce((sum, pool) => sum + pool.monthlyTokens, 0) / 2;
  let cumulative = 0;
  return sortedPools.find((pool) => (cumulative += pool.monthlyTokens) >= halfway).ageDays;
}

/** @param {{ rows: CatalogRow[], evidence: Evidence[], today: string }} options
 *  @returns {EvidenceAgeReport} */
export function computeEvidenceAges({ rows, evidence, today }) {
  const todayMs = Date.parse(today);
  const ageInDays = (checkedAt) => (todayMs - Date.parse(checkedAt)) / DAY_MS;
  const latest = new Map();
  for (const record of evidence) {
    const key = modelKey(record);
    if (record.checkedAt > (latest.get(key) ?? "")) latest.set(key, record.checkedAt);
  }

  const poolRows = new Map();
  const zeroValueRows = new Set();
  for (const row of rows) {
    const key = modelKey(row);
    if (row.monthlyTokens === 0) zeroValueRows.add(key);
    if (row.monthlyTokens <= 0) continue;
    const pool = row.poolKey ?? key;
    if (!poolRows.has(pool)) poolRows.set(pool, []);
    poolRows.get(pool).push(row);
  }

  /** @type {PoolAge[]} */
  const pools = [...poolRows.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([pool, members]) => {
      const dates = members
        .map((row) => latest.get(modelKey(row)))
        .filter(Boolean)
        .sort(byCodeUnit);
      const freshestCheckedAt = dates.at(-1) ?? null;
      const ageDays = freshestCheckedAt === null ? null : ageInDays(freshestCheckedAt);
      return {
        pool,
        providers: [...new Set(members.map(({ provider }) => provider))].sort(byCodeUnit),
        monthlyTokens: Math.max(...members.map(({ monthlyTokens }) => monthlyTokens)),
        rowsWithValue: members.length,
        rowsWithEvidence: dates.length,
        freshestCheckedAt,
        ageDays,
        status: ageDays === null ? "missing" : ageDays > EVIDENCE_MAX_AGE_DAYS ? "stale" : "fresh",
      };
    });

  const datedPools = pools
    .filter(({ ageDays }) => ageDays !== null)
    .sort((a, b) => a.ageDays - b.ageDays);
  const ages = datedPools.map(({ ageDays }) => ageDays);
  const uncapped = evidence
    .filter((record) => zeroValueRows.has(modelKey(record)))
    .map(({ checkedAt }) => ageInDays(checkedAt))
    .sort((a, b) => a - b);

  return {
    schemaVersion: 1,
    today,
    maxAgeDays: EVIDENCE_MAX_AGE_DAYS,
    pools,
    summary: {
      poolsWithValue: pools.length,
      fresh: datedPools.filter(({ status }) => status === "fresh").length,
      stale: datedPools.filter(({ status }) => status === "stale").length,
      missing: pools.length - datedPools.length,
      medianAgeDays: median(ages),
      tokenWeightedMedianAgeDays: weightedMedian(datedPools),
      maxAgeDays: ages.at(-1) ?? null,
    },
    uncapped: { records: uncapped.length, medianAgeDays: median(uncapped) },
  };
}

function escapeCell(value) {
  return String(value)
    .replace(/[\r\n]+/g, " ")
    .replace(/[\\`*_[\]<>|]/g, "\\$&");
}

/** @param {EvidenceAgeReport} report */
export function renderEvidenceMarkdown({ today, maxAgeDays, summary, uncapped, pools }) {
  const lines = [
    "# Free-tier evidence age",
    "",
    "As of " + today + " (UTC). Evidence is fresh for " + maxAgeDays + " days.",
    "",
    "| Metric | Value |",
    "| --- | ---: |",
    "| Pools with a token allowance | " + summary.poolsWithValue + " |",
    "| Fresh pools | " + summary.fresh + " |",
    "| Stale pools | " + summary.stale + " |",
    "| Pools missing evidence | " + summary.missing + " |",
    "| Median age (days) | " + (summary.medianAgeDays ?? "—") + " |",
    "| Token-weighted median age (days) | " + (summary.tokenWeightedMedianAgeDays ?? "—") + " |",
    "| Oldest pool evidence (days) | " + (summary.maxAgeDays ?? "—") + " |",
    "| Evidence records on zero-token rows | " + uncapped.records + " |",
    "| Median age on zero-token rows (days) | " + (uncapped.medianAgeDays ?? "—") + " |",
    "",
    "| Pool | Providers | Monthly tokens | Rows with evidence | Most recent evidence | Age (days) | Status |",
    "| --- | --- | ---: | ---: | --- | ---: | --- |",
  ];
  for (const pool of pools) {
    const cells = [
      pool.pool,
      pool.providers.join(", "),
      pool.monthlyTokens,
      pool.rowsWithEvidence + "/" + pool.rowsWithValue,
      pool.freshestCheckedAt ?? "—",
      pool.ageDays ?? "—",
      pool.status,
    ];
    lines.push("| " + cells.map(escapeCell).join(" | ") + " |");
  }
  return lines.join("\n") + "\n";
}

async function main() {
  const { values } = parseArgs({
    options: { json: { type: "string" }, md: { type: "string" }, today: { type: "string" } },
  });
  if (!values.json || !values.md) throw new Error("--json <file> and --md <file> are required");
  const today = z.iso.date().parse(values.today ?? new Date().toISOString().slice(0, 10));
  const file = new URL("../../../config/quality/free-catalog-evidence.json", import.meta.url);
  const { evidence } = ledgerSchema.parse(JSON.parse(await readFile(file, "utf8")));
  const report = computeEvidenceAges({ rows: FREE_MODEL_BUDGETS, evidence, today });
  await Promise.all([
    mkdir(dirname(values.json), { recursive: true }),
    mkdir(dirname(values.md), { recursive: true }),
  ]);
  await Promise.all([
    writeFile(values.json, JSON.stringify(report, null, 2) + "\n"),
    writeFile(values.md, renderEvidenceMarkdown(report)),
  ]);
}

if (isMainModule(import.meta.url)) {
  try {
    await main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
