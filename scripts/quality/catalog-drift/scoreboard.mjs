import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { z } from "zod";

import config from "../../../config/quality/catalog-scoreboard/config.json" with { type: "json" };
import { isMainModule } from "../../lib/is-main-module.mjs";

const LARGE_COUNT = 24;
const RANDOM_COUNT = 16;
const SAMPLE_SIZE = LARGE_COUNT + RANDOM_COUNT;
const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;
const DATE = z.iso.date();
const HTTPS_URL = z.url({ protocol: /^https$/ });
const LABEL_CLASS = z.enum(["C", "D", "E", "S", "I"]);
const PROVIDER_ID = z.string().min(1);
const COUNT = z.int().nonnegative();
const SAMPLE_SCHEMA = z.object({
  seed: COUNT,
  frozenAt: DATE,
  providers: z
    .object({
      large: z.array(PROVIDER_ID).length(LARGE_COUNT),
      random: z.array(PROVIDER_ID).length(RANDOM_COUNT),
    })
    .refine(({ large, random }) => new Set([...large, ...random]).size === SAMPLE_SIZE, {
      message: "Sample providers must be unique",
    }),
});
const CLASSIFICATION_ROW = z.looseObject({ id: PROVIDER_ID });
const PROBE_STATS = z
  .object({
    catalogIds: COUNT,
    aliveCatalogIds: COUNT,
  })
  .refine(({ catalogIds, aliveCatalogIds }) => aliveCatalogIds <= catalogIds, {
    message: "Alive catalog ids cannot exceed catalog ids",
  });
const DRIFT_REPORT_SCHEMA = z.object({
  schemaVersion: z.literal(1),
  probes: z.array(z.object({ provider: PROVIDER_ID, stats: PROBE_STATS.nullable() })),
});
const EVIDENCE_AGE_SCHEMA = z.object({
  schemaVersion: z.literal(1),
  maxAgeDays: z.literal(config.targets.evidenceMaxAgeDays),
  summary: z
    .object({
      poolsWithValue: COUNT,
      fresh: COUNT,
      tokenWeightedMedianAgeDays: z.number().nullable(),
    })
    .refine(({ poolsWithValue, fresh }) => fresh <= poolsWithValue, {
      message: "Fresh pools cannot exceed pools with value",
    }),
});

const INSTRUCTIONS = `Monthly catalog scoreboard

1. Run the live detector with --out <dir> to produce <dir>/report.json.
   npm run quality:catalog-drift -- --out <dir>
2. Generate the evidence age report.
   npm run quality:evidence-age -- --json <evidence-age.json> --md <evidence-age.md>
3. Check each sampled provider against its official source using our catalog.
   Save a JSON array with id, class, sourceUrl (HTTPS), checkedAt (YYYY-MM-DD
   in the scoreboard month), and a note for every class other than C.
   C = correct, D = outdated, E = incorrect, S = missing data, I = unverifiable.
4. Calculate the monthly scoreboard from those files.
   npm run quality:catalog-scoreboard -- --month YYYY-MM --sample <sample.json> --classification <classification.json> --drift-report <report.json> --evidence-age <evidence-age.json> --out <monthly.json>
   Add --public-providers to include provider details. Use --promote <latest.json>
   when publication is approved.
5. When publication is approved, open a PR from chore/catalog-scoreboard-<YYYY-MM>.

Run this command once to freeze the sample from the reviewed catalog.
   npm run quality:catalog-scoreboard -- --freeze-sample <sample.json> --frozen-at YYYY-MM-DD`;

export function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = Math.imul(seed ^ (seed >>> 15), seed | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Code-unit order, the same order as Array.prototype.sort() on strings.
const byCodeUnit = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

export function drawSample(names, seed, k) {
  const shuffled = names.slice();
  const next = mulberry32(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, k);
}

export function freezeSample({ universe, poolValues, seed, largeCount, randomCount }) {
  const poolValue = (id) => (Object.hasOwn(poolValues, id) ? poolValues[id] : 0);
  // Stable sorting keeps equal-value providers in ascending id order.
  const ranked = universe
    .slice()
    .sort(byCodeUnit)
    .sort((a, b) => poolValue(b) - poolValue(a));
  return {
    large: ranked.slice(0, largeCount),
    random: drawSample(ranked.slice(largeCount).sort(byCodeUnit), seed, randomCount),
  };
}

export function validateClassification(sample, classification, { month }) {
  if (!Array.isArray(classification)) return ["classification must be an array"];

  const expected = new Set([...sample.providers.large, ...sample.providers.random]);
  const seen = new Set();
  const errors = [];
  for (const [index, entry] of classification.entries()) {
    if (!CLASSIFICATION_ROW.safeParse(entry).success) {
      errors.push(`invalid classification row: ${index + 1}`);
      continue;
    }
    const { id, class: label, sourceUrl, checkedAt, note } = entry;
    if (!expected.has(id)) {
      errors.push(`unexpected classification: ${id}`);
      continue;
    }
    if (seen.has(id)) {
      errors.push(`duplicate classification: ${id}`);
      continue;
    }
    seen.add(id);
    if (!LABEL_CLASS.safeParse(label).success) {
      errors.push(
        `${id}: invalid class ${typeof label === "string" ? label : "(expected a string)"}`
      );
    } else if (label !== "C" && (typeof note !== "string" || !note.trim())) {
      errors.push(`${id}: note required for class ${label}`);
    }
    if (!HTTPS_URL.safeParse(sourceUrl).success || !/^https:\/\//i.test(sourceUrl)) {
      errors.push(`${id}: source must be https`);
    }
    if (!DATE.safeParse(checkedAt).success || checkedAt.slice(0, 7) !== month) {
      errors.push(`${id}: checkedAt outside ${month}`);
    }
  }
  for (const id of expected) {
    if (!seen.has(id)) errors.push(`missing classification: ${id}`);
  }
  return errors;
}

const roundFraction = (fraction) => Math.round(fraction * 1000) / 1000;

export function computeScoreboard({
  config,
  sample,
  classification,
  driftReport,
  evidenceAges,
  month,
  generatedAt,
  publicProviders,
}) {
  const { large, random } = sample.providers;
  const size = large.length + random.length;
  const counts = { C: 0, D: 0, E: 0, S: 0, I: 0 };
  for (const entry of classification) counts[entry.class]++;
  const correct = counts.C;
  const verifiable = size - counts.I;
  const excludingGaps = verifiable - counts.S;
  const correctFraction = verifiable ? correct / verifiable : 0;

  const modelListProviders = new Set(config.modelListProviders);
  let catalogIds = 0;
  let aliveCatalogIds = 0;
  for (const { provider, stats } of driftReport.probes) {
    if (modelListProviders.has(provider) && stats?.catalogIds > 0) {
      catalogIds += stats.catalogIds;
      aliveCatalogIds += stats.aliveCatalogIds;
    }
  }
  const aliveFraction = catalogIds ? aliveCatalogIds / catalogIds : null;
  const { poolsWithValue, fresh, tokenWeightedMedianAgeDays } = evidenceAges.summary;
  const freshFraction = poolsWithValue ? fresh / poolsWithValue : null;

  const scoreboard = {
    schemaVersion: 1,
    method: config.method,
    month,
    generatedAt,
    sample: {
      size,
      seed: sample.seed,
      frozenAt: sample.frozenAt,
      strata: { large: large.length, random: random.length },
    },
    labels: {
      counts,
      verifiable,
      correct,
      correctPct: roundFraction(correctFraction),
      correctPctExcludingGaps: excludingGaps ? roundFraction(correct / excludingGaps) : 0,
      target: config.targets.labelsCorrect,
      meetsTarget: verifiable > 0 && correctFraction >= config.targets.labelsCorrect,
    },
    modelLists: {
      providers: config.modelListProviders,
      catalogIds,
      aliveCatalogIds,
      alivePct: aliveFraction === null ? null : roundFraction(aliveFraction),
      target: config.targets.modelListsAlive,
      meetsTarget: aliveFraction !== null && aliveFraction >= config.targets.modelListsAlive,
    },
    evidence: {
      poolsWithValue,
      freshWithin30Days: fresh,
      freshPct: freshFraction === null ? null : roundFraction(freshFraction),
      target: 1,
      meetsTarget: freshFraction === 1,
      tokenWeightedMedianAgeDays,
    },
  };
  if (publicProviders) {
    const byId = new Map(classification.map((entry) => [entry.id, entry]));
    scoreboard.providers = [
      ...large.map((id) => [id, "large"]),
      ...random.map((id) => [id, "random"]),
    ].map(([id, stratum]) => {
      const { class: label, sourceUrl, checkedAt } = byId.get(id);
      return { id, stratum, class: label, sourceUrl, checkedAt };
    });
  }
  return scoreboard;
}

async function writeFrozenSample(path, frozenAt) {
  if (!frozenAt) throw new Error("--frozen-at is required with --freeze-sample");
  DATE.parse(frozenAt);
  const { FREE_MODEL_BUDGETS } = await import("../../../open-sse/config/freeModelCatalog.data.ts");
  // The largest row value also gives the largest pool value for each provider.
  const largestPools = new Map();
  for (const { provider, tos, monthlyTokens } of FREE_MODEL_BUDGETS) {
    if (tos !== "avoid") {
      largestPools.set(provider, Math.max(largestPools.get(provider) ?? 0, monthlyTokens));
    }
  }
  const universe = [...largestPools.keys()].sort(byCodeUnit);
  if (universe.length < SAMPLE_SIZE) {
    throw new Error(
      `The sample requires at least ${SAMPLE_SIZE} providers; found ${universe.length}`
    );
  }
  const poolValues = Object.fromEntries(universe.map((id) => [id, largestPools.get(id)]));
  const { seed } = config;
  const providers = freezeSample({
    universe,
    poolValues,
    seed,
    largeCount: LARGE_COUNT,
    randomCount: RANDOM_COUNT,
  });
  const sample = {
    instructions: INSTRUCTIONS,
    largeDescription: `The ${LARGE_COUNT} providers with the largest monthly pools in our catalog on ${frozenAt}.`,
    universe,
    poolValues,
    frozenAt,
    seed,
    providers,
  };
  writeFileSync(path, `${JSON.stringify(sample, null, 2)}\n`);
  console.log(
    `Froze ${SAMPLE_SIZE} providers (${LARGE_COUNT} large, ${RANDOM_COUNT} random) in ${path}`
  );
}

function readJson(path, schema) {
  try {
    const data = JSON.parse(readFileSync(path, "utf8"));
    return schema ? schema.parse(data) : data;
  } catch (error) {
    throw new Error(`${path}: ${error.message}`);
  }
}

function showMetric(label, fraction, target, meetsTarget) {
  const actual = fraction === null ? "unavailable" : `${(fraction * 100).toFixed(1)}%`;
  console.log(
    `${label}: ${actual} (target ${Math.round(target * 100)}%, ${meetsTarget ? "met" : "unmet"})`
  );
}

async function main(args) {
  const { values } = parseArgs({
    args,
    options: {
      help: { type: "boolean" },
      "freeze-sample": { type: "string" },
      "frozen-at": { type: "string" },
      month: { type: "string" },
      sample: { type: "string" },
      classification: { type: "string" },
      "drift-report": { type: "string" },
      "evidence-age": { type: "string" },
      out: { type: "string" },
      "public-providers": { type: "boolean" },
      promote: { type: "string" },
    },
  });
  if (values.help) {
    console.log(INSTRUCTIONS);
    return;
  }
  if (values["freeze-sample"] !== undefined) {
    if (Object.keys(values).some((flag) => !["freeze-sample", "frozen-at"].includes(flag))) {
      throw new Error("--freeze-sample only accepts --frozen-at");
    }
    await writeFrozenSample(values["freeze-sample"], values["frozen-at"]);
    return;
  }
  if (values["frozen-at"] !== undefined) throw new Error("--frozen-at requires --freeze-sample");
  if (!MONTH.test(values.month ?? "")) throw new Error("--month must be YYYY-MM");
  for (const flag of ["sample", "classification", "drift-report", "evidence-age", "out"]) {
    if (!values[flag]) throw new Error(`--${flag} is required`);
  }
  const sample = readJson(values.sample, SAMPLE_SCHEMA);
  const classification = readJson(values.classification);
  const errors = validateClassification(sample, classification, { month: values.month });
  if (errors.length) throw new Error(errors.join("\n"));

  const scoreboard = computeScoreboard({
    config,
    sample,
    classification,
    driftReport: readJson(values["drift-report"], DRIFT_REPORT_SCHEMA),
    evidenceAges: readJson(values["evidence-age"], EVIDENCE_AGE_SCHEMA),
    month: values.month,
    generatedAt: new Date().toISOString(),
    publicProviders: values["public-providers"],
  });
  const output = `${JSON.stringify(scoreboard, null, 2)}\n`;
  writeFileSync(values.out, output);
  if (values.promote !== undefined) writeFileSync(values.promote, output);
  const { labels, modelLists, evidence } = scoreboard;
  showMetric("Correct labels", labels.correctPct, labels.target, labels.meetsTarget);
  showMetric("Live catalog ids", modelLists.alivePct, modelLists.target, modelLists.meetsTarget);
  showMetric("Fresh evidence", evidence.freshPct, evidence.target, evidence.meetsTarget);
}

if (isMainModule(import.meta.url)) {
  try {
    await main(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
