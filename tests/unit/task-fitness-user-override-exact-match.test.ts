import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A user override is written per exact model id: it must not leak to prefix-matching
// variants the way benchmark (arena_elo) rows legitimately do.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fitness-override-exact-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const intel = await import("../../src/lib/db/modelIntelligence.ts");
const { getTaskFitnessWithSource, invalidateFitnessCache } =
  await import("../../open-sse/services/autoCombo/taskFitness.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("user_override on a model does not apply to a longer prefix-matching model id", () => {
  invalidateFitnessCache();
  intel.setUserFitnessOverrideEntry("override-probe-base", "coding", 0.11);

  const exact = getTaskFitnessWithSource("override-probe-base", "coding");
  assert.deepEqual(exact, { score: 0.11, source: "user_override" });

  const variant = getTaskFitnessWithSource("override-probe-base-mini", "coding");
  assert.notEqual(variant.source, "user_override");
});

test("arena_elo rows still resolve through prefix matching", () => {
  invalidateFitnessCache();
  intel.upsertModelIntelligence({
    model: "arena-probe-base",
    source: "arena_elo",
    category: "coding",
    score: 0.77,
    eloRaw: 1300,
    confidence: "high",
    expiresAt: null,
  });

  const variant = getTaskFitnessWithSource("arena-probe-base-mini", "coding");
  assert.equal(variant.source, "arena_elo");
  assert.equal(variant.score, 0.77);
});
