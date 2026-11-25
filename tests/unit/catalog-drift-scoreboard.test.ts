import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import test, { type TestContext } from "node:test";
import { fileURLToPath } from "node:url";

import baseline from "../fixtures/catalog-drift/scoreboard/classification.baseline.synthetic.json" with { type: "json" };
import classification from "../fixtures/catalog-drift/scoreboard/classification.synthetic.synthetic.json" with { type: "json" };
import driftReport from "../fixtures/catalog-drift/scoreboard/drift-report.synthetic.json" with { type: "json" };
import evidenceAges from "../fixtures/catalog-drift/scoreboard/evidence-age.synthetic.json" with { type: "json" };
import sample from "../fixtures/catalog-drift/scoreboard/sample.synthetic.json" with { type: "json" };

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const { computeScoreboard, drawSample, freezeSample, mulberry32, validateClassification } =
  await import("../../scripts/quality/catalog-drift/scoreboard.mjs");

const fixtures = fileURLToPath(new URL("../fixtures/catalog-drift/scoreboard/", import.meta.url));
const script = fileURLToPath(
  new URL("../../scripts/quality/catalog-drift/scoreboard.mjs", import.meta.url)
);
const config = JSON.parse(
  readFileSync(
    new URL("../../config/quality/catalog-scoreboard/config.json", import.meta.url),
    "utf8"
  )
);
const month = "2026-12";
const seed = 20261118;
const generatedAt = "2026-12-01T12:00:00.000Z";
const inputs = {
  config: { ...config, modelListProviders: sample.universe.slice(0, 7) },
  sample,
  classification,
  driftReport,
  evidenceAges,
  month,
  generatedAt,
};

function scratch(t: TestContext) {
  const dir = mkdtempSync(join(fixtures, ".run-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function runCli(
  args: string[],
  rows?: { provider: string; monthlyTokens: number; tos?: string }[]
) {
  const stub =
    rows &&
    `data:text/javascript,${encodeURIComponent(
      `export const FREE_MODEL_BUDGETS = ${JSON.stringify(rows)};`
    )}`;
  const preload = `
    import { registerHooks } from "node:module";
    globalThis.fetch = ${globalThis.fetch.toString()};
    registerHooks({
      resolve(specifier, context, nextResolve) {
        if (!specifier.endsWith("/open-sse/config/freeModelCatalog.data.ts")) {
          return nextResolve(specifier, context);
        }
        const url = ${JSON.stringify(stub ?? null)};
        if (!url) throw new Error("unexpected catalog import");
        return { url, shortCircuit: true };
      },
    });
  `;
  return spawnSync(
    process.execPath,
    [
      "--import",
      `data:text/javascript,${encodeURIComponent(preload)}`,
      "--import",
      "tsx/esm",
      script,
      ...args,
    ],
    { encoding: "utf8", timeout: 15_000 }
  );
}

test("mulberry32 matches the reference sequence", () => {
  const next = mulberry32(seed);
  assert.deepEqual(
    [next(), next(), next()],
    [0.02845785580575466, 0.23895404138602316, 0.2033751884009689]
  );
});

test("drawSample is the documented Fisher-Yates and preserves its input", () => {
  const names = sample.universe.slice(0, 20);
  assert.deepEqual(drawSample(names, seed, 5), ["p12", "p08", "p06", "p10", "p02"]);
  assert.deepEqual(names, sample.universe.slice(0, 20));
});

test("freezeSample takes the largest pools, breaks ties by id and draws the sorted remainder", () => {
  const names = sample.universe.slice(0, 20);
  const universe = names.slice().reverse();
  assert.deepEqual(
    freezeSample({
      universe,
      poolValues: { p01: 4, p02: 3, p03: 2, p04: 1 },
      seed,
      largeCount: 4,
      randomCount: 5,
    }),
    { large: ["p01", "p02", "p03", "p04"], random: drawSample(names.slice(4), seed, 5) }
  );
  assert.deepEqual(
    freezeSample({ universe, poolValues: { p02: 1, p01: 1 }, seed, largeCount: 2, randomCount: 0 })
      .large,
    ["p01", "p02"]
  );
});

test("the synthetic sample is reproducible and has 24 large and 16 random providers", () => {
  const { large, random } = sample.providers;
  assert.equal(sample.seed, seed);
  assert.equal(large.length, 24);
  assert.equal(random.length, 16);
  assert.equal(new Set([...large, ...random]).size, 40);
  assert.deepEqual([...large, ...random].sort(), sample.universe);
  assert.deepEqual(freezeSample({ ...sample, largeCount: 24, randomCount: 16 }), sample.providers);
});

test("validateClassification requires every sample provider exactly once", () => {
  assert.deepEqual(validateClassification(sample, classification, { month }), []);
  assert.deepEqual(validateClassification(sample, classification.slice(1), { month }), [
    "missing classification: p01",
  ]);
  const duplicate = [...classification, classification[0]];
  assert.deepEqual(validateClassification(sample, duplicate, { month }), [
    "duplicate classification: p01",
  ]);
  const unexpected = [...classification, { ...classification[0], id: "p41" }];
  assert.deepEqual(validateClassification(sample, unexpected, { month }), [
    "unexpected classification: p41",
  ]);
});

test("validateClassification requires a valid class, HTTPS source, calendar date and explanatory note", () => {
  for (const [change, message] of [
    [{ class: "X" }, "p01: invalid class X"],
    [{ sourceUrl: "http://p01.example.invalid/plan" }, "p01: source must be https"],
    [{ sourceUrl: "https://" }, "p01: source must be https"],
    [{ checkedAt: "2026-10-30" }, "p01: checkedAt outside 2026-12"],
    [{ checkedAt: "2026-12-32" }, "p01: checkedAt outside 2026-12"],
    [{ class: "D", note: " " }, "p01: note required for class D"],
  ] as const) {
    const invalid = [{ ...classification[0], ...change }, ...classification.slice(1)];
    assert.deepEqual(validateClassification(sample, invalid, { month }), [message]);
  }
});

test("reproduces the synthetic baseline proportions", () => {
  const { labels } = computeScoreboard({ ...inputs, classification: baseline });
  assert.deepEqual(labels, {
    counts: { C: 12, D: 6, E: 7, S: 9, I: 6 },
    verifiable: 34,
    correct: 12,
    correctPct: 0.353,
    correctPctExcludingGaps: 0.48,
    target: 0.9,
    meetsTarget: false,
  });
});

test("computes the label target with and without gaps", () => {
  const { labels } = computeScoreboard(inputs);
  assert.deepEqual(labels.counts, { C: 30, D: 3, E: 2, S: 2, I: 3 });
  assert.equal(labels.correctPct, 0.811);
  assert.equal(labels.correctPctExcludingGaps, 0.857);
  assert.equal(labels.meetsTarget, false);
});

test("aggregates model lists across list and JSON probes for configured providers", () => {
  const outsideScope = { ...driftReport.probes[0], provider: "p08" };
  const { modelLists } = computeScoreboard({
    ...inputs,
    driftReport: { ...driftReport, probes: [...driftReport.probes, outsideScope] },
  });
  assert.deepEqual(modelLists, {
    providers: ["p01", "p02", "p03", "p04", "p05", "p06", "p07"],
    catalogIds: 72,
    aliveCatalogIds: 10,
    alivePct: 0.139,
    target: 0.95,
    meetsTarget: false,
  });
});

test("zero active catalog ids leave the denominator and the target uses the unrounded fraction", () => {
  const probe = driftReport.probes[0];
  const noIds = { ...probe, stats: { liveIds: 5, catalogIds: 0, aliveCatalogIds: 0 } };
  const failed = { ...probe, status: "fetch-failed", stats: null };
  for (const [alive, total, fraction, meetsTarget] of [
    [47, 50, 0.94, false],
    [1899, 2000, 0.95, false],
    [19, 20, 0.95, true],
  ] as const) {
    const checked = {
      ...probe,
      stats: { liveIds: alive, catalogIds: total, aliveCatalogIds: alive },
    };
    const { modelLists } = computeScoreboard({
      ...inputs,
      driftReport: { ...driftReport, probes: [noIds, failed, checked] },
    });
    assert.equal(modelLists.catalogIds, total);
    assert.equal(modelLists.alivePct, fraction);
    assert.equal(modelLists.meetsTarget, meetsTarget);
  }
});

test("computes the evidence target and carries the token-weighted median", () => {
  assert.deepEqual(computeScoreboard(inputs).evidence, {
    poolsWithValue: 10,
    freshWithin30Days: 9,
    freshPct: 0.9,
    target: 1,
    meetsTarget: false,
    tokenWeightedMedianAgeDays: 10,
  });
});

test("empty denominators do not meet the targets", () => {
  const scoreboard = computeScoreboard({
    ...inputs,
    classification: classification.map((entry) => ({ ...entry, class: "I", note: "Unavailable." })),
    driftReport: { ...driftReport, probes: [] },
    evidenceAges: {
      ...evidenceAges,
      pools: [],
      summary: {
        ...evidenceAges.summary,
        poolsWithValue: 0,
        fresh: 0,
        tokenWeightedMedianAgeDays: null,
      },
    },
  });
  assert.equal(scoreboard.labels.correctPct, 0);
  assert.equal(scoreboard.labels.correctPctExcludingGaps, 0);
  assert.equal(scoreboard.modelLists.alivePct, null);
  assert.equal(scoreboard.evidence.freshPct, null);
  assert.equal(scoreboard.labels.meetsTarget, false);
  assert.equal(scoreboard.modelLists.meetsTarget, false);
  assert.equal(scoreboard.evidence.meetsTarget, false);
});

test("public output includes only the allowed provider fields when explicitly requested", () => {
  assert.equal("providers" in computeScoreboard(inputs), false);
  const result = computeScoreboard({ ...inputs, publicProviders: true });
  assert.equal(result.providers.length, 40);
  assert.deepEqual(result.providers[0], {
    id: "p01",
    class: "C",
    stratum: "large",
    sourceUrl: "https://p01.example.invalid/plan",
    checkedAt: "2026-12-01",
  });
  assert.equal(
    result.providers.filter((provider: { stratum: string }) => provider.stratum === "random")
      .length,
    16
  );
});

test("CLI reads the report files and promotes the explicitly requested monthly output", (t) => {
  const dir = scratch(t);
  const out = join(dir, "monthly.json");
  const latest = join(dir, "latest.json");
  const report = join(dir, "report.json");
  const probes = driftReport.probes.map((probe, i) => ({
    ...probe,
    provider: config.modelListProviders[i],
  }));
  writeFileSync(report, JSON.stringify({ ...driftReport, probes }));
  const args = [
    "--month",
    month,
    "--sample",
    join(fixtures, "sample.synthetic.json"),
    "--classification",
    join(fixtures, "classification.synthetic.synthetic.json"),
    "--drift-report",
    report,
    "--evidence-age",
    join(fixtures, "evidence-age.synthetic.json"),
    "--out",
    out,
  ];
  const result = runCli([...args, "--public-providers", "--promote", latest]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /90%/);
  assert.match(result.stdout, /95%/);
  assert.match(result.stdout, /100%/);
  assert.equal(readFileSync(out, "utf8"), readFileSync(latest, "utf8"));
  const monthly = JSON.parse(readFileSync(out, "utf8"));
  assert.deepEqual(monthly.sample, {
    size: 40,
    seed,
    frozenAt: sample.frozenAt,
    strata: { large: 24, random: 16 },
  });
  assert.equal(monthly.method, "catalog-scoreboard-v1");
  assert.equal(monthly.month, month);
  assert.equal(monthly.labels.correctPct, 0.811);
  assert.equal(monthly.modelLists.alivePct, 0.139);
  assert.equal(monthly.evidence.freshPct, 0.9);
  assert.equal(monthly.providers.length, 40);

  const wrongMonth = runCli(
    args.map((arg) => (arg === month ? "2027-01" : arg === out ? join(dir, "invalid.json") : arg))
  );
  assert.equal(wrongMonth.status, 1);
  assert.match(wrongMonth.stderr, /p01: checkedAt outside 2027-01/);
  assert.equal(existsSync(join(dir, "invalid.json")), false);
});

test("freeze CLI writes a reproducible synthetic sample and shares its instructions with help", (t) => {
  const out = join(scratch(t), "frozen.json");
  const args = ["--freeze-sample", out, "--frozen-at", sample.frozenAt];
  const rows = sample.universe
    .map((provider) => ({
      provider,
      monthlyTokens: sample.poolValues[provider as keyof typeof sample.poolValues],
      tos: "caution",
    }))
    .reverse();
  const tooSmall = runCli(args, rows.slice(1));
  assert.equal(tooSmall.status, 1);
  assert.match(tooSmall.stderr, /at least 40 providers/);
  assert.equal(existsSync(out), false);

  rows.push(
    { provider: "p01", monthlyTokens: 1, tos: "caution" },
    { provider: "p40", monthlyTokens: 100_000_000, tos: "avoid" },
    { provider: "p41", monthlyTokens: 100_000_000, tos: "avoid" }
  );
  const result = runCli(args, rows);
  assert.equal(result.status, 0, result.stderr);
  const json = readFileSync(out, "utf8");
  const frozen = JSON.parse(json);
  assert.deepEqual(frozen.universe, sample.universe);
  assert.deepEqual(frozen.poolValues, sample.poolValues);
  assert.deepEqual(frozen.providers, sample.providers);
  assert.equal(frozen.seed, seed);
  assert.equal(frozen.frozenAt, sample.frozenAt);
  assert.equal(
    frozen.largeDescription,
    `The 24 providers with the largest monthly pools in our catalog on ${sample.frozenAt}.`
  );
  assert.equal("catalogProviders" in frozen, false);

  const second = runCli(args, rows.slice().reverse());
  assert.equal(second.status, 0, second.stderr);
  assert.equal(readFileSync(out, "utf8"), json);
  const help = runCli(["--help"]);
  assert.equal(help.status, 0, help.stderr);
  assert.equal(help.stdout.trim(), frozen.instructions);
  assert.match(help.stdout, /quality:evidence-age/);
  assert.match(help.stdout, /--freeze-sample/);
});
