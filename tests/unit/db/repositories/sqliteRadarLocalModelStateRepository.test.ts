import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { registerRadarLocalModelStateRepositoryConformance } from "../../../helpers/persistence/radarLocalModelStateRepositoryConformance.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-local-repository-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

const { sqliteRadarLocalModelStateRepository: states } =
  await import("../../../../src/lib/db/repositories/sqliteRadarLocalModelStateRepository.ts");
const { radarRepositories } =
  await import("../../../../src/lib/db/repositories/radarRepositories.ts");
const legacy = await import("../../../../src/lib/db/radar.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

registerRadarLocalModelStateRepositoryConformance(async () => ({
  states,
  reset: resetStorage,
}));

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must not return Promises");
  return value;
}

test("composition root binds the SQLite repository and its legacy sync helpers", () => {
  assert.equal(radarRepositories.localModelState, states);
  assert.equal(legacy.getRadarLocalModelStateRepository(), states);
  assert.equal(typeof radarRepositories.legacySync.localModelState.list, "function");
});

test("legacy sync facade and async repository share data in both directions", async () => {
  await resetStorage();
  const repository = legacy.getRadarLocalModelStateRepository();

  assert.equal(
    synchronous(legacy.setRadarLocalModelOverride("groq", "model", { displayName: "Sync" })),
    true
  );
  assert.equal((await repository.list())[0].displayName, "Sync");

  assert.equal(await repository.setTombstone("groq", "model", true), true);
  const syncState = synchronous(legacy.listRadarLocalModelState());
  assert.equal(syncState[0].tombstoned, true);
  assert.equal(syncState[0].displayName, "Sync");

  assert.deepEqual(
    [...synchronous(legacy.getRadarLocalMergeState()).tombstones],
    [...(await repository.getMergeState()).tombstones]
  );

  assert.equal(synchronous(legacy.clearRadarLocalModelOverride("groq", "model")), true);
  assert.equal(synchronous(legacy.setRadarModelTombstone("groq", "model", false)), true);
  assert.deepEqual(await repository.list(), []);
});

test("a rejected write propagates and leaves the existing row intact", async () => {
  await resetStorage();
  assert.equal(
    legacy.setRadarLocalModelOverride("groq", "model", { displayName: "Kept", enabled: true }),
    true
  );
  const db = core.getDbInstance();
  db.exec(
    "CREATE TRIGGER radar_local_fail BEFORE UPDATE ON radar_local_model_state " +
      "BEGIN SELECT RAISE(ABORT, 'forced'); END"
  );
  try {
    assert.throws(() => legacy.setRadarModelTombstone("groq", "model", true), /forced/);
    await assert.rejects(states.setOverride("groq", "model", { enabled: false }), /forced/);
  } finally {
    db.exec("DROP TRIGGER radar_local_fail");
  }
  const [row] = legacy.listRadarLocalModelState();
  assert.equal(row.displayName, "Kept");
  assert.equal(row.enabled, true);
  assert.equal(row.tombstoned, false);
});
