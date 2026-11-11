import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-legacy-offload-retry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

const CALL_LOGS_DIR = path.join(TEST_DATA_DIR, "call_logs");

function legacyTableExists() {
  const row = core
    .getDbInstance()
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'call_logs_v1_legacy'")
    .get();
  return Boolean(row);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a failed legacy offload keeps the bodies and the next boot retries them", () => {
  // Seed one legacy-inline row plus its legacy body table, then reopen the database.
  const seed = core.getDbInstance();
  seed.exec(
    "CREATE TABLE call_logs_v1_legacy (id TEXT PRIMARY KEY, timestamp TEXT, request_body TEXT, response_body TEXT, error TEXT)"
  );
  seed
    .prepare(
      `INSERT INTO call_logs (id, timestamp, method, path, status, model, provider, detail_state)
       VALUES ('legacy-1', '2026-03-30T12:34:56.000Z', 'POST', '/v1/chat/completions', 200, 'm', 'p', 'legacy-inline')`
    )
    .run();
  seed
    .prepare(
      "INSERT INTO call_logs_v1_legacy (id, timestamp, request_body, response_body) VALUES (?, ?, ?, ?)"
    )
    .run(
      "legacy-1",
      "2026-03-30T12:34:56.000Z",
      JSON.stringify({ keep: "request" }),
      JSON.stringify({ keep: "response" })
    );
  core.resetDbInstance();

  // Boot 1: a regular file where the artifact directory belongs, so every artifact write fails.
  fs.rmSync(CALL_LOGS_DIR, { recursive: true, force: true });
  fs.writeFileSync(CALL_LOGS_DIR, "not a directory");
  const originalError = console.error;
  const originalWarn = console.warn;
  console.error = () => {};
  console.warn = () => {};
  try {
    assert.equal(legacyTableExists(), true, "boot 1 must keep the legacy table after a failure");
  } finally {
    console.error = originalError;
    console.warn = originalWarn;
  }
  core.resetDbInstance();

  // Boot 2: the disk problem is fixed. The failed row must still be offloaded from the legacy table.
  fs.rmSync(CALL_LOGS_DIR, { force: true });
  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT detail_state, artifact_relpath FROM call_logs WHERE id = 'legacy-1'")
    .get() as { detail_state: string; artifact_relpath: string | null };
  assert.equal(row.detail_state, "ready");
  assert.ok(row.artifact_relpath, "boot 2 must write an artifact for the retried row");
  const artifact = JSON.parse(
    fs.readFileSync(path.join(CALL_LOGS_DIR, row.artifact_relpath), "utf8")
  );
  assert.deepEqual(artifact.requestBody, { keep: "request" });
  assert.deepEqual(artifact.responseBody, { keep: "response" });
  assert.equal(legacyTableExists(), false, "boot 2 drops the legacy table only after the offload");
});
