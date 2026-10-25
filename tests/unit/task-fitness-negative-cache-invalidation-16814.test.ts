import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #16814 — cached misses in queryModelIntelligence must never hide a row written later.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fitness-neg-16814-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const intel = await import("../../src/lib/db/modelIntelligence.ts");
const { getTaskFitness, invalidateFitnessCache } =
  await import("../../open-sse/services/autoCombo/taskFitness.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#16814: an arena_elo row synced after a cached miss is picked up", () => {
  invalidateFitnessCache();
  const model = "fitness-neg-cache-probe-model";
  const before = getTaskFitness(model, "coding");
  getTaskFitness(model, "coding"); // second call served from the (negative) cache
  intel.upsertModelIntelligence({
    model,
    source: "arena_elo",
    category: "coding",
    score: 0.93,
    eloRaw: 1400,
    confidence: "high",
    expiresAt: null,
  });
  const after = getTaskFitness(model, "coding");
  assert.notEqual(after, before);
  assert.equal(after, 0.93);
});

test("#16814: bulk arena refresh and user overrides invalidate cached misses too", () => {
  const model = "fitness-neg-cache-probe-model-2";
  const before = getTaskFitness(model, "default");
  intel.applyArenaEloRefresh([
    {
      model,
      source: "arena_elo",
      category: "default",
      score: 0.81,
      eloRaw: null,
      confidence: null,
      expiresAt: null,
    },
  ]);
  assert.equal(getTaskFitness(model, "default"), 0.81);
  intel.setUserFitnessOverrideEntry(model, "default", 0.12);
  assert.equal(getTaskFitness(model, "default"), 0.12);
  assert.notEqual(before, 0.81);
});
