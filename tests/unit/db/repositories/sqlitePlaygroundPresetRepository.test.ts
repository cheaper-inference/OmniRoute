import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { registerPlaygroundPresetRepositoryConformance } from "../../../helpers/persistence/playgroundPresetRepositoryConformance.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-preset-repository-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const { sqlitePlaygroundPresetRepository: presets } =
  await import("../../../../src/lib/db/repositories/sqlitePlaygroundPresetRepository.ts");
const legacy = await import("../../../../src/lib/db/playgroundPresets.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

registerPlaygroundPresetRepositoryConformance(async () => ({
  presets,
  reset: resetStorage,
  async corruptParams(id, raw) {
    core
      .getDbInstance()
      .prepare("UPDATE playground_presets SET params_json = ? WHERE id = ?")
      .run(raw, id);
  },
  async setCreatedAt(id, timestamp) {
    core
      .getDbInstance()
      .prepare("UPDATE playground_presets SET created_at = ? WHERE id = ?")
      .run(timestamp, id);
  },
}));

const input = {
  name: "Shared",
  endpoint: "chat.completions",
  model: "gpt-4o",
  system: "Keep",
  params: {},
};

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must not return Promises");
  return value;
}

test("legacy sync facade and async entry point share data in both directions", async () => {
  await resetStorage();
  const repository = legacy.getPlaygroundPresetRepository();
  assert.equal(repository, presets);
  const created = synchronous(legacy.createPlaygroundPreset(input));
  assert.deepEqual(await repository.findById(created.id), created);
  const updated = synchronous(legacy.updatePlaygroundPreset(created.id, { name: "Sync" }));
  assert.deepEqual(await repository.findById(created.id), updated);
  const asyncUpdated = await repository.update(created.id, { name: "Async" });
  assert.deepEqual(synchronous(legacy.getPlaygroundPreset(created.id)), asyncUpdated);
  assert.deepEqual(synchronous(legacy.listPlaygroundPresets()), {
    items: [asyncUpdated],
    total: 1,
  });
  assert.equal(synchronous(legacy.deletePlaygroundPreset(created.id)), true);
  assert.equal(synchronous(legacy.deletePlaygroundPreset(created.id)), false);
  assert.equal(await repository.findById(created.id), null);
  const asyncCreated = await repository.create(input);
  assert.deepEqual(synchronous(legacy.getPlaygroundPreset(asyncCreated.id)), asyncCreated);
  assert.equal(await repository.deleteById(asyncCreated.id), true);
  assert.equal(synchronous(legacy.getPlaygroundPreset(asyncCreated.id)), null);
  assert.equal(synchronous(legacy.updatePlaygroundPreset("missing", {})), null);
});

test("repository updates do not write for missing, empty, or undefined-only patches", async () => {
  await resetStorage();
  const created = await presets.create(input);
  const changes = () => core.getDbInstance().prepare("SELECT total_changes() AS count").get();
  const before = changes();
  assert.equal(await presets.update("missing", { name: "Ghost" }), null);
  assert.deepEqual(await presets.update(created.id, {}), created);
  assert.deepEqual(
    await presets.update(created.id, {
      name: undefined,
      endpoint: undefined,
      model: undefined,
      params: undefined,
    }),
    created
  );
  assert.deepEqual(changes(), before);
});

test("both loaded boundaries reopen the recreated same-DATA_DIR database without stale handles", async () => {
  await resetStorage();
  const repository = legacy.getPlaygroundPresetRepository();
  const oldAsync = await repository.create(input);
  const oldSync = legacy.createPlaygroundPreset(input);
  await resetStorage();
  assert.deepEqual(await repository.list(), { items: [], total: 0 });
  assert.deepEqual(legacy.listPlaygroundPresets(), { items: [], total: 0 });
  assert.equal(await repository.findById(oldSync.id), null);
  assert.equal(legacy.getPlaygroundPreset(oldAsync.id), null);
  const freshSync = legacy.createPlaygroundPreset({ ...input, name: "Fresh sync" });
  const freshAsync = await repository.create({ ...input, name: "Fresh async" });
  assert.deepEqual(await repository.findById(freshSync.id), freshSync);
  assert.deepEqual(legacy.getPlaygroundPreset(freshAsync.id), freshAsync);
  assert.equal((await repository.list()).total, 2);
  assert.equal(legacy.listPlaygroundPresets().total, 2);
});
