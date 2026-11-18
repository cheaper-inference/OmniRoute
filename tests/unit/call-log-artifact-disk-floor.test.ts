// Call log artifacts are written into the same DATA_DIR volume as storage.sqlite. With no
// free-space check, artifacts could take the last free bytes and make the usage ledger and
// call log row writes fail. Below a floor of free space the artifact write is skipped and the
// row ends as detail_state "missing" (the state a failed write already produces).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-disk-floor-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const artifacts = await import("../../src/lib/usage/callLogArtifacts.ts");

const MIB = 1024 ** 2;
const DEFAULT_FLOOR = 512 * MIB;

test.after(() => {
  artifacts.setFreeBytesProbeForTest(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  const dir = artifacts.getCallLogsDir();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

test.afterEach(() => artifacts.setFreeBytesProbeForTest(null));

function save(id: string) {
  return callLogs.saveCallLog({
    id,
    timestamp: "2026-03-30T12:34:56.789Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    duration: 1,
    requestBody: { messages: [{ role: "user", content: "hello" }] },
    responseBody: { choices: [{ message: { content: "world" } }] },
  });
}

function artifactFiles(): string[] {
  const dir = artifacts.getCallLogsDir();
  if (!dir || !fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => e.name);
}

async function detailStateOf(id: string) {
  const rows = await callLogs.getCallLogs({ limit: 50 });
  return rows.find((row: { id: string }) => row.id === id)?.detailState;
}

test("below the floor the artifact write is skipped and the row ends as missing", async () => {
  artifacts.setFreeBytesProbeForTest(() => DEFAULT_FLOOR - 1);

  await save("floor_low");

  assert.equal(await detailStateOf("floor_low"), "missing");
  assert.deepEqual(artifactFiles(), [], "no artifact file may be written");
});

test("at or above the floor the artifact is written as before", async () => {
  artifacts.setFreeBytesProbeForTest(() => DEFAULT_FLOOR);

  await save("floor_ok");

  assert.equal(await detailStateOf("floor_ok"), "ready");
  assert.equal(artifactFiles().length, 1);
});

test("CALL_LOG_MIN_FREE_DISK_MB moves the floor, and 0 turns the check off", async () => {
  artifacts.setFreeBytesProbeForTest(() => 100 * MIB);
  try {
    process.env.CALL_LOG_MIN_FREE_DISK_MB = "50";
    assert.equal(artifacts.hasRoomForCallLogArtifact(), true);
    process.env.CALL_LOG_MIN_FREE_DISK_MB = "200";
    assert.equal(artifacts.hasRoomForCallLogArtifact(), false);
    process.env.CALL_LOG_MIN_FREE_DISK_MB = "0";
    artifacts.setFreeBytesProbeForTest(() => 0);
    assert.equal(artifacts.hasRoomForCallLogArtifact(), true);
    process.env.CALL_LOG_MIN_FREE_DISK_MB = "not-a-number";
    artifacts.setFreeBytesProbeForTest(() => DEFAULT_FLOOR - 1);
    assert.equal(artifacts.hasRoomForCallLogArtifact(), false, "invalid value keeps the default");
  } finally {
    delete process.env.CALL_LOG_MIN_FREE_DISK_MB;
  }
});

test("a free-space probe that throws fails open, so logs are never dropped by the check", async () => {
  artifacts.setFreeBytesProbeForTest(() => {
    throw new Error("statfs not supported");
  });

  await save("floor_probe_throws");

  assert.equal(await detailStateOf("floor_probe_throws"), "ready");
});

test("the probe measures the call_logs volume, not an unrelated path", () => {
  const seen: string[] = [];
  artifacts.setFreeBytesProbeForTest((dir: string) => {
    seen.push(dir);
    return 10 * 1024 * MIB;
  });

  assert.equal(artifacts.hasRoomForCallLogArtifact(), true);
  assert.equal(seen.length, 1);
  assert.ok(
    path.resolve(seen[0]).startsWith(path.resolve(TEST_DATA_DIR)),
    `probed ${seen[0]}, expected a path under DATA_DIR`
  );
});

test("a fractional or partly numeric CALL_LOG_MIN_FREE_DISK_MB keeps the default floor, it does not turn the check off", () => {
  artifacts.setFreeBytesProbeForTest(() => DEFAULT_FLOOR - 1);
  try {
    for (const bad of ["0.5", "0.9", "1e3", "12abc", "-5"]) {
      process.env.CALL_LOG_MIN_FREE_DISK_MB = bad;
      assert.equal(artifacts.hasRoomForCallLogArtifact(), false, `"${bad}" must keep the default`);
    }
  } finally {
    delete process.env.CALL_LOG_MIN_FREE_DISK_MB;
  }
});

function seedLegacyInlineRow(id: string) {
  const db = core.getDbInstance();
  db.exec(`CREATE TABLE IF NOT EXISTS call_logs_v1_legacy (
    id TEXT PRIMARY KEY, timestamp TEXT, method TEXT, path TEXT, status INTEGER, model TEXT,
    requested_model TEXT, provider TEXT, account TEXT, connection_id TEXT, duration INTEGER,
    tokens_in INTEGER, tokens_out INTEGER, tokens_cache_read INTEGER, tokens_cache_creation INTEGER,
    tokens_reasoning INTEGER, tokens_compressed INTEGER, request_type TEXT, source_format TEXT,
    target_format TEXT, api_key_id TEXT, api_key_name TEXT, combo_name TEXT, combo_step_id TEXT,
    combo_execution_key TEXT, request_body TEXT, response_body TEXT, error TEXT)`);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, detail_state)
     VALUES (?, '2026-03-30T12:34:56.789Z', 'POST', '/v1/chat/completions', 200, 'm', 'p', 'legacy-inline')`
  ).run(id);
  db.prepare(
    `INSERT INTO call_logs_v1_legacy (id, timestamp, request_body, response_body) VALUES (?, '2026-03-30T12:34:56.789Z', '{"a":1}', '{"b":2}')`
  ).run(id);
}

function legacyState(id: string) {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT detail_state FROM call_logs WHERE id = ?").get(id) as
    { detail_state: string } | undefined;
  const legacyTable = db
    .prepare("SELECT 1 AS present FROM sqlite_master WHERE name = 'call_logs_v1_legacy'")
    .get();
  return { state: row?.detail_state, legacyTable: Boolean(legacyTable) };
}

test("the legacy offload at startup honours the floor: the row stays legacy-inline and is offloaded later", () => {
  seedLegacyInlineRow("legacy_floor");
  artifacts.setFreeBytesProbeForTest(() => DEFAULT_FLOOR - 1);

  core.resetDbInstance();
  assert.deepEqual(legacyState("legacy_floor"), { state: "legacy-inline", legacyTable: true });
  assert.deepEqual(artifactFiles(), [], "no artifact file may be written below the floor");

  artifacts.setFreeBytesProbeForTest(() => DEFAULT_FLOOR);
  core.resetDbInstance();
  assert.deepEqual(legacyState("legacy_floor"), { state: "ready", legacyTable: false });
  assert.equal(artifactFiles().length, 1);
});
