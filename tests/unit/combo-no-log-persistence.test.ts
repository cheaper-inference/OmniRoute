import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// `config.noLog` must survive the combo store round-trip: the UI writes it through
// the combos API, which persists the whole `config` object in the combo's data
// JSON. This proves the flag is readable back and that the resolver sees it.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-nolog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { resolveComboNoLog } = await import("../../open-sse/handlers/chatCore/comboNoLog.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("config.noLog round-trips through the combo store", async () => {
  const created = await combosDb.createCombo({
    id: "combo-nolog-1",
    name: "privacy-combo",
    strategy: "round-robin",
    config: { noLog: true, maxRetries: 2 },
    models: [],
  } as Record<string, unknown>);

  const readBack = await combosDb.getComboById(created.id as string);
  assert.ok(readBack, "combo was persisted");
  const config = readBack!.config as Record<string, unknown>;
  assert.equal(config.noLog, true);
  assert.equal(config.maxRetries, 2, "other config keys are untouched");

  // The resolver reads the persisted row exactly as the hot path does.
  const all = await combosDb.getCombos();
  assert.equal(resolveComboNoLog({ comboName: "privacy-combo", combos: all }), true);
  assert.equal(
    resolveComboNoLog({ comboId: created.id as string, combos: all }),
    true,
    "id lookup finds it too"
  );
});

test("turning the toggle back on persists noLog=false and stops withholding", async () => {
  const created = await combosDb.createCombo({
    id: "combo-nolog-2",
    name: "logging-combo",
    strategy: "round-robin",
    config: { noLog: true },
    models: [],
  } as Record<string, unknown>);

  await combosDb.updateCombo(
    created.id as string,
    {
      name: "logging-combo",
      strategy: "round-robin",
      config: { noLog: false },
      models: [],
    } as Record<string, unknown>
  );

  const all = await combosDb.getCombos();
  assert.equal(resolveComboNoLog({ comboName: "logging-combo", combos: all }), false);
});

test("a combo without the flag never withholds", async () => {
  await combosDb.createCombo({
    id: "combo-nolog-3",
    name: "default-combo",
    strategy: "round-robin",
    config: { maxRetries: 1 },
    models: [],
  } as Record<string, unknown>);

  const all = await combosDb.getCombos();
  assert.equal(resolveComboNoLog({ comboName: "default-combo", combos: all }), false);
});
