import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-no-log-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("combo noLog persists through create and update", async () => {
  const combo = await combosDb.createCombo({
    name: "No Log Combo",
    models: [{ provider: "openai", model: "gpt-4.1" }],
    config: { noLog: true },
  });
  assert.equal(combo.config?.noLog, true);

  const reloaded = await combosDb.getComboByName("No Log Combo");
  assert.equal(reloaded?.config?.noLog, true);

  const updated = await combosDb.updateCombo(String(combo.id), {
    config: { noLog: false },
  });
  assert.equal(updated?.config?.noLog, false);
  const reloadedUpdated = await combosDb.getComboById(String(combo.id));
  assert.equal(reloadedUpdated?.config?.noLog, false);
});
