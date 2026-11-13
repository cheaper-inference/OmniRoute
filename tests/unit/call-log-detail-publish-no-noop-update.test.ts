// A call log with a detail artifact is inserted as detail_state 'pending'. A successful publish
// moves it to 'ready'. The terminal 'missing' UPDATE exists only for a skipped, null or failed
// write, so a successful publish must not run it (it matches zero rows but still takes the
// writer lock).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-no-noop-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const artifacts = await import("../../src/lib/usage/callLogArtifacts.ts");

const MIB = 1024 ** 2;

test.after(() => {
  artifacts.setFreeBytesProbeForTest(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

function stateOf(id: string): string | undefined {
  const row = core
    .getDbInstance()
    .prepare("SELECT detail_state FROM call_logs WHERE id = ?")
    .get(id) as { detail_state: string } | undefined;
  return row?.detail_state;
}

/** Runs fn and counts the statements that fail a still-pending detail row. */
async function countFailStatements(fn: () => Promise<void>): Promise<number> {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const prepare = db.prepare.bind(db);
  let count = 0;
  db.prepare = (sql: string) => {
    if (
      /SET detail_state = 'missing'/.test(sql) &&
      /WHERE id = \? AND detail_state = 'pending'/.test(sql)
    ) {
      count += 1;
    }
    return prepare(sql);
  };
  try {
    await fn();
  } finally {
    db.prepare = prepare;
  }
  return count;
}

test("a successful artifact publish runs no failure UPDATE", async () => {
  artifacts.setFreeBytesProbeForTest(() => 10 * 1024 * MIB);

  const failStatements = await countFailStatements(() => save("publish_ok"));

  assert.equal(stateOf("publish_ok"), "ready");
  assert.equal(failStatements, 0, "the failure UPDATE must not run after a successful publish");
});

test("a skipped artifact write still ends the row as missing", async () => {
  artifacts.setFreeBytesProbeForTest(() => 0);

  const failStatements = await countFailStatements(() => save("publish_skipped"));

  assert.equal(stateOf("publish_skipped"), "missing");
  assert.equal(failStatements, 1);
});

test("a throwing artifact write still ends the row as missing", async () => {
  artifacts.setFreeBytesProbeForTest(() => 10 * 1024 * MIB);
  const dir = artifacts.getCallLogsDir();
  assert.ok(dir);
  // A plain file where the artifact directory must be makes the write throw.
  fs.rmSync(dir, { recursive: true, force: true });
  fs.writeFileSync(dir, "not a directory");

  try {
    const failStatements = await countFailStatements(() => save("publish_throws").catch(() => {}));
    assert.equal(stateOf("publish_throws"), "missing");
    assert.equal(failStatements, 1);
  } finally {
    fs.rmSync(dir, { force: true });
  }
});

test("a publish that lost its pending window still ends the row as missing", async () => {
  artifacts.setFreeBytesProbeForTest(() => 10 * 1024 * MIB);
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => unknown;
    exec: (sql: string) => void;
  };
  const prepare = db.prepare.bind(db);
  // Expire the pending window just before the publish UPDATE runs: it then matches no row.
  db.prepare = (sql: string) => {
    if (/SET detail_state = 'ready'/.test(sql)) {
      db.exec("UPDATE call_logs SET detail_pending_until = 1 WHERE id = 'publish_expired'");
    }
    return prepare(sql);
  };
  try {
    const failStatements = await countFailStatements(() => save("publish_expired"));
    assert.equal(stateOf("publish_expired"), "missing");
    assert.equal(failStatements, 1);
  } finally {
    db.prepare = prepare;
  }
});
