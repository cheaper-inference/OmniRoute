import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Isolate the DB per test run before anything imports `core.ts`.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "quota-alert-latch-"));
process.env.DATA_DIR = dataDir;

const db = await import("../../src/lib/db/quotaAlertLatch.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  const instance = core.getDbInstance() as unknown as { close?: () => void };
  instance?.close?.();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("returns an empty latch when nothing was ever stored", () => {
  assert.deepEqual(db.getQuotaAlertLatch(), {});
});

test("round-trips a latch through key_value", () => {
  db.setQuotaAlertLatch({ "conn-1:session": 12, "conn-2:credit:abc": 1_700_000_000_000 });

  assert.deepEqual(db.getQuotaAlertLatch(), {
    "conn-1:session": 12,
    "conn-2:credit:abc": 1_700_000_000_000,
  });
});

test("overwrites the previous latch instead of accumulating", () => {
  db.setQuotaAlertLatch({ "conn-1:session": 12 });
  db.setQuotaAlertLatch({ "conn-9:weekly": 30 });

  assert.deepEqual(db.getQuotaAlertLatch(), { "conn-9:weekly": 30 });
});

test("drops non-numeric entries instead of poisoning the latch", () => {
  const instance = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { run: (...params: unknown[]) => unknown };
  };
  instance
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(
      "quotaAlertLatch",
      "state",
      JSON.stringify({ latches: { "conn-1:session": 12, "conn-2:weekly": "oops", bad: null } })
    );

  assert.deepEqual(db.getQuotaAlertLatch(), { "conn-1:session": 12 });
});

test("survives a corrupted row", () => {
  const instance = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { run: (...params: unknown[]) => unknown };
  };
  instance
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run("quotaAlertLatch", "state", "{not json");

  assert.deepEqual(db.getQuotaAlertLatch(), {});
});

test("clear removes the row so the next read is empty", () => {
  db.setQuotaAlertLatch({ "conn-1:session": 3 });
  db.clearQuotaAlertLatch();

  assert.deepEqual(db.getQuotaAlertLatch(), {});
});
