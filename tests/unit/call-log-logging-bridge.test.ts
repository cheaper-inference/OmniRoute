import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-log-bridge-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "log-bridge-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const databaseSettingsDb = await import("../../src/lib/db/databaseSettings.ts");

function put(namespace: string, key: string, value: string) {
  const db = core.getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    namespace,
    key,
    value
  );
}

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
      }
      break;
    } catch (error) {
      const code = (error as { code?: string }).code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 40 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

// The dashboard writes the logs section under the `databaseSettings` namespace
// while the request hot path reads the snake_case key from `settings`. Both must
// agree, otherwise toggling "call log pipeline" in the panel does nothing.
test("explicit databaseSettings pipeline flag reaches the hot-path key", async () => {
  put("databaseSettings", "logs.callLogPipelineEnabled", "true");
  put("settings", "call_log_pipeline_enabled", "false");

  const settings = await settingsDb.getSettings();
  assert.equal(settings.call_log_pipeline_enabled, true);
});

test("an explicit false in the new namespace wins over a stale true", async () => {
  put("databaseSettings", "logs.callLogPipelineEnabled", "false");
  put("settings", "call_log_pipeline_enabled", "true");

  const settings = await settingsDb.getSettings();
  assert.equal(settings.call_log_pipeline_enabled, false);
});

test("the flat key survives when the new namespace never set it", async () => {
  // "Never set" means the row is absent (migration 213 removes the seeded rows);
  // delete them here so the test does not depend on migration order.
  core
    .getDbInstance()
    .prepare(
      "DELETE FROM key_value WHERE namespace = 'databaseSettings' AND key IN ('logs.callLogPipelineEnabled', 'callLogPipelineEnabled')"
    )
    .run();
  put("settings", "call_log_pipeline_enabled", "true");

  const settings = await settingsDb.getSettings();
  assert.equal(settings.call_log_pipeline_enabled, true);
});

test("stored booleans are normalized regardless of casing or padding", async () => {
  put("databaseSettings", "logs.callLogPipelineEnabled", "  TRUE ");
  put("settings", "call_log_pipeline_enabled", "false");

  const settings = await settingsDb.getSettings();
  assert.equal(settings.call_log_pipeline_enabled, true);
});

test("a bridge on one key leaves the other key alone", async () => {
  put("databaseSettings", "logs.callLogPipelineEnabled", "true");
  put("settings", "detailed_logs_enabled", "true");

  const settings = await settingsDb.getSettings();
  assert.equal(settings.call_log_pipeline_enabled, true);
  assert.equal(settings.detailed_logs_enabled, true);
});

test("the legacy flat alias in the new namespace is bridged too", async () => {
  put("databaseSettings", "callLogPipelineEnabled", "true");
  put("settings", "call_log_pipeline_enabled", "false");

  const settings = await settingsDb.getSettings();
  assert.equal(settings.call_log_pipeline_enabled, true);
});

test("the nested logs key wins over the legacy flat alias", async () => {
  put("databaseSettings", "callLogPipelineEnabled", "true");
  put("databaseSettings", "logs.callLogPipelineEnabled", "false");
  put("settings", "call_log_pipeline_enabled", "true");

  const settings = await settingsDb.getSettings();
  assert.equal(settings.call_log_pipeline_enabled, false);
});

// A flattened legacy row must not override the namespace the panel writes to.
test("merged settings let the new namespace override the flattened legacy row", async () => {
  put("databaseSettings", "logs.callLogPipelineEnabled", "true");
  put("settings", "call_log_pipeline_enabled", "false");

  const merged = databaseSettingsDb.getUserDatabaseSettings();
  assert.equal(merged.logs.callLogPipelineEnabled, true);
});
