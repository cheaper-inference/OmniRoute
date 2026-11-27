import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { registerPluginRegistryRepositoriesConformance } from "../../../helpers/persistence/pluginRegistryRepositoryConformance.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugin-registry-repo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

const { sqlitePluginRegistryRepository: plugins, sqlitePluginExecutionLogRepository: executions } =
  await import("../../../../src/lib/db/repositories/sqlitePluginRegistryRepository.ts");
const { pluginRegistryRepositories } =
  await import("../../../../src/lib/db/repositories/pluginRegistryRepositories.ts");
const facade = await import("../../../../src/lib/db/plugins.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

registerPluginRegistryRepositoriesConformance(async () => ({
  plugins,
  executions,
  reset: resetStorage,
}));

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must not return Promises");
  return value;
}

test("composition root binds the SQLite repositories and their legacy sync helpers", () => {
  assert.equal(pluginRegistryRepositories.plugins, plugins);
  assert.equal(pluginRegistryRepositories.executions, executions);
  assert.equal(facade.getPluginRegistryRepository(), plugins);
  assert.equal(facade.getPluginExecutionLogRepository(), executions);
  for (const helpers of Object.values(pluginRegistryRepositories.legacySync)) {
    for (const fn of Object.values(helpers)) assert.equal(typeof fn, "function");
  }
});

test("async repositories and sync facade share the same rows", async () => {
  await resetStorage();

  await plugins.insert({
    id: "id-shared",
    name: "shared",
    version: "1.0.0",
    main: "index.js",
    manifest: {},
    pluginDir: "/plugins/shared",
  });
  assert.equal(synchronous(facade.getPluginByName("shared"))?.id, "id-shared");
  facade.updatePluginStatus("shared", "active");
  assert.equal((await plugins.findByName("shared"))?.enabled, 1);
  facade.updatePluginConfig("shared", { from: "facade" });
  assert.equal((await plugins.findById("id-shared"))?.config, '{"from":"facade"}');

  facade.recordPluginExecution("shared", "onRequest", 5, true);
  assert.equal((await executions.summarize("shared")).totalCalls, 1);
  await executions.record("shared", "onRequest", 15, false);
  assert.equal(synchronous(facade.getPluginAnalytics("shared")).length, 2);

  await plugins.deleteByName("shared");
  assert.equal(synchronous(facade.pluginExists("shared")), false);
});

test("repository reads resolve the database at call time after a reset", async () => {
  await resetStorage();
  await executions.record("p", "h", 1, true);
  await resetStorage();
  assert.deepEqual(await executions.listForPlugin("p"), []);
  await executions.record("p", "h", 2, true);
  assert.equal(facade.getPluginAnalytics("p")[0].durationMs, 2);
});
