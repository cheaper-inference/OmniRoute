import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const { computeEvidenceAges, renderEvidenceMarkdown } =
  await import("../../scripts/quality/catalog-drift/evidence-age.mjs");

const today = "2026-11-18";

function row(provider: string, monthlyTokens: number, poolKey: string | null = provider) {
  return { provider, modelId: "model", monthlyTokens, poolKey };
}

function record(provider: string, checkedAt: string, claim = "recurring-free-access") {
  return { provider, modelId: "model", checkedAt, claim };
}

test("classifies pools as fresh, stale and missing", () => {
  const report = computeEvidenceAges({
    rows: [row("a", 100_000_000), row("b", 10_000_000), row("c", 5_000_000), row("d", 0)],
    evidence: [
      record("a", "2026-11-10", "recurring-quota"),
      record("b", "2026-09-02", "signup-credit"),
      record("d", "2026-11-12"),
      record("outside-catalog", "2026-11-18"),
    ],
    today,
  });
  assert.deepEqual(report.summary, {
    poolsWithValue: 3,
    fresh: 1,
    stale: 1,
    missing: 1,
    medianAgeDays: 42.5,
    tokenWeightedMedianAgeDays: 8,
    maxAgeDays: 77,
  });
  assert.deepEqual(
    report.pools.map(({ status }) => status),
    ["fresh", "stale", "missing"]
  );
  assert.deepEqual(report.uncapped, { records: 1, medianAgeDays: 6 });
  assert.match(renderEvidenceMarkdown(report), /42\.5/);
});

test("pool age is the freshest row", () => {
  const report = computeEvidenceAges({
    rows: [row("a", 100, "shared"), row("b", 50, "shared"), row("c", 60, "shared")],
    evidence: [record("a", "2026-09-02"), record("b", "2026-11-17")],
    today,
  });
  assert.deepEqual(report.pools, [
    {
      pool: "shared",
      providers: ["a", "b", "c"],
      monthlyTokens: 100,
      rowsWithValue: 3,
      rowsWithEvidence: 2,
      freshestCheckedAt: "2026-11-17",
      ageDays: 1,
      status: "fresh",
    },
  ]);
});

test("the 30-day boundary is fresh", () => {
  const report = computeEvidenceAges({
    rows: [row("a", 5, null), row("b", 5, null)],
    evidence: [record("a", "2026-10-19"), record("b", "2026-10-18")],
    today,
  });
  assert.deepEqual(
    report.pools.map(({ pool, ageDays, status }) => [pool, ageDays, status]),
    [
      ["a/model", 30, "fresh"],
      ["b/model", 31, "stale"],
    ]
  );
  assert.equal(report.summary.tokenWeightedMedianAgeDays, 30);
});

test("cli never fails the build", (t) => {
  mkdirSync("_artifacts", { recursive: true });
  const dir = mkdtempSync("_artifacts/catalog-drift-evidence-age-");
  t.after(() => rmSync(dir, { recursive: true }));
  const json = join(dir, "report.json");
  const markdown = join(dir, "report.md");
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "scripts/quality/catalog-drift/evidence-age.mjs",
      "--json",
      json,
      "--md",
      markdown,
      "--today",
      today,
    ],
    { encoding: "utf8" }
  );
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(readFileSync(json, "utf8"));
  assert.equal(report.today, today);
  assert.ok(report.summary.missing > 0);
  assert.match(readFileSync(markdown, "utf8"), /# Free-tier evidence age/);
});
