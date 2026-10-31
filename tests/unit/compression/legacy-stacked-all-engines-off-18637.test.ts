// #18637: a legacy install (no stored `engines` row) with master on and defaultMode "stacked"
// ran a stacked pipeline while the dashboard — which renders the backfilled engines map —
// showed every engine off. Dispatch must agree with the display: zero enabled engines → off.
// Real path: key_value rows → getCompressionSettings() → selectCompressionPlan().
import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-compression-18637-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { getCompressionSettings, updateCompressionSettings } =
  await import("../../../src/lib/db/compression.ts");
const { updateCompressionCombo } = await import("../../../src/lib/db/compressionCombos.ts");
const { selectCompressionPlan } =
  await import("../../../open-sse/services/compression/strategySelector.ts");
const { ENGINE_IDS } = await import("../../../open-sse/services/compression/types.ts");

beforeEach(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  getDbInstance(); // runs migrations: 034 seeds enabled=false/defaultMode=off, 042 seeds the default combo
});

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

function setRow(key: string, value: unknown) {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('compression',?,?)")
    .run(key, JSON.stringify(value));
}

// Legacy install: once ran stacked, every engine switched off, no `engines` row ever stored.
// The default combo is the pre-3.8.53 rtk+caveman seed kept by an operator rename (the 3.8.53
// upgrader only rewrites untouched seed metadata), so the backfill has no structural engine
// to turn on and caveman/rtk come from their (off) config blocks.
function seedLegacyStackedInstall(opts: { cavemanEnabled: boolean }) {
  updateCompressionCombo("default-caveman", {
    name: "Ops pipeline",
    pipeline: [
      { engine: "rtk", intensity: "standard" },
      { engine: "caveman", intensity: "full" },
    ],
  });
  setRow("enabled", true);
  setRow("defaultMode", "stacked");
  setRow("cavemanConfig", { enabled: opts.cavemanEnabled });
  setRow("rtkConfig", { enabled: false });
}

test("no engines row + defaultMode stacked + every backfilled engine off → dispatch is off", async () => {
  seedLegacyStackedInstall({ cavemanEnabled: false });
  const cfg = await getCompressionSettings();

  // Precondition: this is the state the dashboard renders as "everything off".
  assert.equal(cfg.enginesExplicit, false);
  assert.deepEqual(
    ENGINE_IDS.filter((id) => cfg.engines[id]?.enabled),
    [],
    "backfilled engines map must show zero enabled engines"
  );

  const plan = selectCompressionPlan(cfg, null, 0);
  assert.equal(plan.mode, "off");
  assert.deepEqual(plan.stackedPipeline, []);
});

test("no engines row + defaultMode stacked + caveman on → legacy stacked dispatch is preserved", async () => {
  seedLegacyStackedInstall({ cavemanEnabled: true });
  const cfg = await getCompressionSettings();

  assert.equal(cfg.enginesExplicit, false);
  assert.equal(cfg.engines.caveman.enabled, true);

  assert.equal(selectCompressionPlan(cfg, null, 0).mode, "stacked");
});

test("stored engines row with every engine off (panel/API save) → off, as before", async () => {
  setRow("defaultMode", "stacked");
  await updateCompressionSettings({
    enabled: true,
    engines: Object.fromEntries(ENGINE_IDS.map((id) => [id, { enabled: false }])),
  });
  const cfg = await getCompressionSettings();

  assert.equal(cfg.enginesExplicit, true);
  assert.equal(selectCompressionPlan(cfg, null, 0).mode, "off");
});

test("control: no engines row + defaultMode off → off", async () => {
  setRow("enabled", true);
  const cfg = await getCompressionSettings();

  assert.equal(cfg.enginesExplicit, false);
  assert.equal(selectCompressionPlan(cfg, null, 0).mode, "off");
});
