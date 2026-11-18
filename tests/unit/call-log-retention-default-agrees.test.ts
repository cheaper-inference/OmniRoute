// One effective call-log age for display, scheduled cleanup and request-log rotation.
// Migration 046 seeds the flat `callLogs` key with 90. Rotation discards that exact seed on purpose
// (#13308 guard) and falls back to the documented default (CALL_LOG_RETENTION_DAYS, else 7), but the
// dashboard value and the scheduled cleanup used the seed: a fresh install showed 90 days while
// rotation removed rows after 7. A value the operator saved still wins everywhere.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retention-agree-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const SAVED_ENV = process.env.CALL_LOG_RETENTION_DAYS;

const core = await import("../../src/lib/db/core.ts");
const { getUserDatabaseSettings, updateDatabaseSettings } =
  await import("../../src/lib/db/databaseSettings.ts");
const { resolveCallLogRetentionDays } = await import("../../src/lib/usage/callLogRetention.ts");
const { cleanupCallLogs } = await import("../../src/lib/db/cleanup.ts");

const DAY_MS = 24 * 60 * 60 * 1000;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.CALL_LOG_RETENTION_DAYS;
});

test.after(() => {
  if (SAVED_ENV === undefined) delete process.env.CALL_LOG_RETENTION_DAYS;
  else process.env.CALL_LOG_RETENTION_DAYS = SAVED_ENV;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a fresh install shows the same call-log age that rotation enforces", () => {
  core.getDbInstance();
  const displayed = getUserDatabaseSettings().retention.callLogs;
  assert.equal(displayed, resolveCallLogRetentionDays());
  assert.equal(displayed, 7, "the documented default applies when nothing is saved");
});

test("an unsaved install follows CALL_LOG_RETENTION_DAYS in the display too", () => {
  core.getDbInstance();
  process.env.CALL_LOG_RETENTION_DAYS = "14";
  assert.equal(getUserDatabaseSettings().retention.callLogs, 14);
  assert.equal(resolveCallLogRetentionDays(), 14);
});

test("scheduled cleanup removes a call log older than the age rotation enforces", async () => {
  const db = core.getDbInstance();
  const insert = db.prepare("INSERT INTO call_logs (id, timestamp) VALUES (?, ?)");
  insert.run("ten-days", new Date(Date.now() - 10 * DAY_MS).toISOString());
  insert.run("one-day", new Date(Date.now() - 1 * DAY_MS).toISOString());

  assert.deepEqual(await cleanupCallLogs(), { deleted: 1, errors: 0 });
  const left = db.prepare("SELECT id FROM call_logs").all() as Array<{ id: string }>;
  assert.deepEqual(
    left.map((row) => row.id),
    ["one-day"]
  );
});

test("a value the operator saved wins on every path, including 90", () => {
  core.getDbInstance();
  for (const days of [45, 90]) {
    updateDatabaseSettings({ retention: { callLogs: days } } as never);
    assert.equal(getUserDatabaseSettings().retention.callLogs, days);
    assert.equal(resolveCallLogRetentionDays(), days);
  }
});

test("saving an unrelated setting on an unsaved install does not change the call-log age", () => {
  core.getDbInstance();
  updateDatabaseSettings({ backup: { keepLastNBackups: 4 } } as never);
  assert.equal(getUserDatabaseSettings().retention.callLogs, 7);
  assert.equal(resolveCallLogRetentionDays(), 7);
});

test("an unrelated save does not freeze the inherited age: a later env override still applies", () => {
  core.getDbInstance();
  updateDatabaseSettings({ backup: { keepLastNBackups: 4 } } as never);

  process.env.CALL_LOG_RETENTION_DAYS = "14";

  assert.equal(resolveCallLogRetentionDays(), 14, "rotation follows the override");
  assert.equal(getUserDatabaseSettings().retention.callLogs, 14, "display and cleanup follow it");
});

test("scheduled cleanup also ages out bodies kept in the legacy table after a failed offload", async () => {
  const db = core.getDbInstance();
  db.exec(
    "CREATE TABLE call_logs_v1_legacy (id TEXT PRIMARY KEY, timestamp TEXT, request_body TEXT, response_body TEXT, error TEXT)"
  );
  const insert = db.prepare("INSERT INTO call_logs (id, timestamp) VALUES (?, ?)");
  const insertLegacy = db.prepare(
    "INSERT INTO call_logs_v1_legacy (id, timestamp, request_body) VALUES (?, ?, ?)"
  );
  for (const [id, days] of [
    ["ten-days", 10],
    ["one-day", 1],
  ] as const) {
    const timestamp = new Date(Date.now() - days * DAY_MS).toISOString();
    insert.run(id, timestamp);
    insertLegacy.run(id, timestamp, JSON.stringify({ body: id }));
  }

  assert.deepEqual(await cleanupCallLogs(), { deleted: 1, errors: 0 });

  const left = db.prepare("SELECT id FROM call_logs_v1_legacy").all() as Array<{ id: string }>;
  assert.deepEqual(
    left.map((row) => row.id),
    ["one-day"],
    "an expired body must not outlive its call log row"
  );
});
