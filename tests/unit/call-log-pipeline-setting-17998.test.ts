// @ts-nocheck
// #17998: the dashboard, isDetailedLoggingEnabled() and the chatCore request path must agree
// on whether call-log pipeline capture is on. Every case runs on a fresh database through the
// repo's own readers and writers: ENABLE_REQUEST_LOGS against the stored value, a legacy '1'
// carried over by migration 014, and JSON imports holding 1 / "yes" / "on" / "TRUE".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { CALL_LOG_SETTLE_TIMEOUT_MS } from "../helpers/callLogSettle.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-17998-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_ENV = process.env.ENABLE_REQUEST_LOGS;
delete process.env.ENABLE_REQUEST_LOGS;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { getUserDatabaseSettings, updateDatabaseSettings } =
  await import("../../src/lib/db/databaseSettings.ts");
const { isDetailedLoggingEnabled } = await import("../../src/lib/db/detailedLogs.ts");
const { resolveCallLogPipelineEnabled } = await import("../../src/lib/logEnv.ts");
const { getCachedSettings, invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { runJsonMigration } = await import("../../src/lib/db/jsonMigration.ts");
const { getCallLogs, getCallLogById, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

async function freshDb() {
  await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS);
  core.resetDbInstance();
  invalidateDbCache("settings");
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

async function withEnv(value: string | undefined, fn: () => Promise<void>) {
  if (value === undefined) delete process.env.ENABLE_REQUEST_LOGS;
  else process.env.ENABLE_REQUEST_LOGS = value;
  try {
    await fn();
  } finally {
    delete process.env.ENABLE_REQUEST_LOGS;
  }
}

async function views() {
  invalidateDbCache("settings");
  return {
    panel: getUserDatabaseSettings().logs.callLogPipelineEnabled,
    logger: await isDetailedLoggingEnabled(),
    requestPath: resolveCallLogPipelineEnabled(await getCachedSettings()),
  };
}

async function waitFor(fn, timeoutMs = CALL_LOG_SETTLE_TIMEOUT_MS) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const result = await fn();
    if (result) return result;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function latestCallLog() {
  const rows = await getCallLogs({ limit: 5 });
  if (!Array.isArray(rows) || rows.length === 0 || rows[0].detailState !== "ready") return null;
  return getCallLogById(rows[0].id);
}

// Drives the real handleChatCore with a failing upstream and reports whether the persisted
// call log carries pipeline payloads, i.e. whether chatCore decided capture was on.
async function chatCoreCaptures() {
  invalidateDbCache("settings");
  globalThis.fetch = async () => {
    throw new Error("Connection refused");
  };
  const body = { model: "gpt-4o-mini", stream: false, messages: [{ role: "user", content: "hi" }] };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    log: { debug() {}, info() {}, warn() {}, error() {} },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
  });
  assert.equal(result.success, false);
  const detail = await waitFor(latestCallLog);
  assert.ok(detail, "expected a call log to be persisted");
  return Boolean(detail.pipelinePayloads);
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.ENABLE_REQUEST_LOGS;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForCallLogSaves(CALL_LOG_SETTLE_TIMEOUT_MS);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_ENV === undefined) delete process.env.ENABLE_REQUEST_LOGS;
  else process.env.ENABLE_REQUEST_LOGS = ORIGINAL_ENV;
});

test("fresh database: all three readers agree", async () => {
  await freshDb();
  const v = await views();
  assert.equal(v.logger, v.panel);
  assert.equal(v.requestPath, v.panel);
});

test("ENABLE_REQUEST_LOGS=true overrides a stored false on the request path", async () => {
  await freshDb();
  await settingsDb.updateSettings({ call_log_pipeline_enabled: false });
  await withEnv("true", async () => {
    const v = await views();
    assert.equal(v.logger, true);
    assert.equal(v.requestPath, true);
    assert.equal(await chatCoreCaptures(), true);
  });
});

test("ENABLE_REQUEST_LOGS=false overrides a stored true on the request path", async () => {
  await freshDb();
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });
  await withEnv("false", async () => {
    const v = await views();
    assert.equal(v.logger, false);
    assert.equal(v.requestPath, false);
    assert.equal(await chatCoreCaptures(), false);
  });
});

test("legacy detailed_logs_enabled='1' carried over by migration 014 reads as on everywhere", async () => {
  await freshDb();
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value(namespace, key, value) VALUES('settings', 'detailed_logs_enabled', '1')"
  ).run();
  db.exec(
    fs.readFileSync(
      path.join(process.cwd(), "src/lib/db/migrations/014_unified_log_artifacts.sql"),
      "utf8"
    )
  );
  const v = await views();
  assert.equal(v.panel, true);
  assert.equal(v.logger, true);
  assert.equal(v.requestPath, true);
  assert.equal(await chatCoreCaptures(), true);
});

for (const value of [1, "yes", "on", "TRUE"]) {
  test(`JSON import with call_log_pipeline_enabled=${JSON.stringify(value)} is stored as true`, async () => {
    await freshDb();
    runJsonMigration(core.getDbInstance(), { settings: { call_log_pipeline_enabled: value } });
    const row = core
      .getDbInstance()
      .prepare(
        "SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'call_log_pipeline_enabled'"
      )
      .get();
    assert.equal(row.value, "true");
    const v = await views();
    assert.equal(v.panel, true);
    assert.equal(v.logger, true);
    assert.equal(v.requestPath, true);
  });
}

for (const value of [0, "no", "off", "FALSE", "garbage"]) {
  test(`JSON import with call_log_pipeline_enabled=${JSON.stringify(value)} is stored as false`, async () => {
    await freshDb();
    runJsonMigration(core.getDbInstance(), { settings: { call_log_pipeline_enabled: value } });
    const row = core
      .getDbInstance()
      .prepare(
        "SELECT value FROM key_value WHERE namespace = 'settings' AND key = 'call_log_pipeline_enabled'"
      )
      .get();
    assert.equal(row.value, "false");
    const v = await views();
    assert.equal(v.panel, false);
    assert.equal(v.logger, false);
    assert.equal(v.requestPath, false);
  });
}

test("a stored 'yes' that bypassed the importer reaches chatCore", async () => {
  await freshDb();
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value(namespace, key, value) VALUES('settings', 'call_log_pipeline_enabled', ?)"
    )
    .run(JSON.stringify("yes"));
  const v = await views();
  assert.equal(v.panel, true);
  assert.equal(v.requestPath, true);
  assert.equal(await chatCoreCaptures(), true);
});

test("panel save and request path stay in sync", async () => {
  await freshDb();
  const current = getUserDatabaseSettings();
  updateDatabaseSettings({ logs: { ...current.logs, callLogPipelineEnabled: true } });
  assert.deepEqual(await views(), { panel: true, logger: true, requestPath: true });
  updateDatabaseSettings({ logs: { ...current.logs, callLogPipelineEnabled: false } });
  assert.deepEqual(await views(), { panel: false, logger: false, requestPath: false });
});
