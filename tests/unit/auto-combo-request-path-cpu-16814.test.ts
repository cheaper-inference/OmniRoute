import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #16814 — a single auto/* request burned ~11 CPU-s and stalled the event loop 1-4 s.
// The per-candidate scoring/limit helpers redo registry scans and DB lookups on every call.
// These assertions count the repeated work instead of timing it, so they are load-independent.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-cpu-16814-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");
const { getTaskFitness, invalidateFitnessCache } =
  await import("../../open-sse/services/autoCombo/taskFitness.ts");
const { resolveScoresAs } = await import("../../open-sse/services/autoCombo/scoresAs.ts");
const { computeAdvertisedLimits } =
  await import("../../open-sse/services/autoCombo/advertisedLimits.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function sampleModelIds(count: number): Array<{ provider: string; id: string }> {
  const out: Array<{ provider: string; id: string }> = [];
  for (const [provider, models] of Object.entries(PROVIDER_MODELS)) {
    for (const m of models) {
      out.push({ provider, id: m.id });
      if (out.length === count) return out;
    }
  }
  return out;
}

function countDbPrepares<T>(fnUnderTest: () => T): { result: T; prepares: number } {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const original = db.prepare.bind(db);
  let prepares = 0;
  db.prepare = (sql: string) => {
    prepares++;
    return original(sql);
  };
  try {
    return { result: fnUnderTest(), prepares };
  } finally {
    db.prepare = original;
  }
}

test("#16814: getTaskFitness answers a repeated lookup from memory (no DB round-trip per call)", () => {
  invalidateFitnessCache();
  const [{ id }] = sampleModelIds(1);
  getTaskFitness(id, "default"); // first call may hit the DB and warm one-off state
  const { prepares } = countDbPrepares(() => {
    for (let i = 0; i < 50; i++) getTaskFitness(id, "default");
  });
  assert.equal(prepares, 0, `50 repeat getTaskFitness(${id}) issued ${prepares} DB statements`);
});

test("#16814: resolveScoresAs does not rescan the whole provider registry for an id it already resolved", () => {
  const [{ id }] = sampleModelIds(1);
  resolveScoresAs(id);
  let scans = 0;
  const realValues = Object.values;
  (Object as { values: unknown }).values = (o: unknown) => {
    if (o === PROVIDER_MODELS) scans++;
    return realValues(o as object);
  };
  try {
    for (let i = 0; i < 50; i++) resolveScoresAs(id);
  } finally {
    (Object as { values: unknown }).values = realValues;
  }
  assert.equal(scans, 0, `50 repeat resolveScoresAs(${id}) scanned PROVIDER_MODELS ${scans} times`);
});

test("#16814: computeAdvertisedLimits does not issue per-candidate DB statements on the request path", () => {
  const pool = sampleModelIds(120).map(({ provider, id }) => ({ provider, model: id }));
  computeAdvertisedLimits(pool.slice(0, 1)); // warm one-off init
  const { prepares } = countDbPrepares(() => computeAdvertisedLimits(pool));
  assert.ok(
    prepares < 10,
    `computeAdvertisedLimits over ${pool.length} candidates issued ${prepares} DB statements`
  );
});
