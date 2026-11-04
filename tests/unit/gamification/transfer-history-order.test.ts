import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gam-history-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "gam-test-secret";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../../src/lib/db/core.ts");
const sharing = await import("../../../src/lib/gamification/sharing.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("transfer history lists entries recorded in the same second newest first", async () => {
  const db = core.getDbInstance();
  const insert = db.prepare(
    `INSERT INTO token_ledger (from_api_key_id, to_api_key_id, amount, reason, idempotency_key, created_at)
     VALUES (?, ?, ?, ?, ?, '2026-01-01 00:00:00')`
  );
  insert.run("a", "b", 1, "first", "i1");
  insert.run("a", "b", 2, "second", "i2");
  insert.run("a", "b", 3, "third", "i3");
  const history = await sharing.getHistory("b");
  assert.deepEqual(
    history.map((entry: { reason: string }) => entry.reason),
    ["third", "second", "first"]
  );
});
