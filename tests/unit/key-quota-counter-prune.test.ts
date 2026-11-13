import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-prune-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const quotaDb = await import("../../src/lib/db/keyQuota.ts");
const quotaDomain = await import("../../src/domain/keyQuota.ts");

const WINDOW = quotaDb.KEY_QUOTA_WINDOW_MS;
const t0 = Date.parse("2026-09-14T12:00:30.000Z");
const at = (ms: number) => ({ now: () => ms });

function bucketsOf(keyId: string): number[] {
  return (
    core
      .getDbInstance()
      .prepare(
        "SELECT DISTINCT bucket_index FROM api_key_quota_counters WHERE api_key_id = ? ORDER BY bucket_index"
      )
      .all(keyId) as Array<{ bucket_index: number }>
  ).map((row) => row.bucket_index);
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("minute counters older than the previous bucket are pruned, live buckets stay", () => {
  quotaDomain.recordKeyQuotaUsage("key-1", 100, at(t0));
  quotaDomain.recordKeyQuotaUsage("key-1", 100, at(t0 + 5 * WINDOW));
  quotaDomain.recordKeyQuotaUsage("key-1", 100, at(t0 + 6 * WINDOW));

  const current = Math.floor((t0 + 6 * WINDOW) / WINDOW);
  assert.deepEqual(bucketsOf("key-1"), [current - 1, current]);
});

test("pruning does not change the sliding-window count", () => {
  quotaDomain.recordKeyQuotaUsage("key-2", 1000, at(t0));
  quotaDomain.recordKeyQuotaUsage("key-2", 250, at(t0 + WINDOW));
  quotaDomain.recordKeyQuotaUsage("key-3", 1, at(t0 + 3 * WINDOW));

  const counters = quotaDb.getKeyQuotaCounters("key-2", { now: () => t0 + WINDOW });
  assert.equal(counters.tpmUsed, 1000 * (1 - 30_000 / WINDOW) + 250);
});

test("one write removes only a bounded part of a large backlog; later writes drain the rest", () => {
  const db = core.getDbInstance();
  const now = t0 + 20 * WINDOW;
  const current = Math.floor(now / WINDOW);
  const insert = db.prepare(
    "INSERT INTO api_key_quota_counters (api_key_id, dimension_key, bucket_index, consumed, updated_at) VALUES ('key-backlog', 'key-quota:tpm', ?, 1, ?)"
  );
  db.transaction(() => {
    for (let i = 2; i < 5002; i++) insert.run(current - i, now);
  })();
  const oldRows = () =>
    (
      db
        .prepare(
          "SELECT COUNT(*) AS n FROM api_key_quota_counters WHERE api_key_id = 'key-backlog' AND bucket_index < ?"
        )
        .get(current - 1) as { n: number }
    ).n;
  assert.equal(oldRows(), 5000);

  quotaDomain.recordKeyQuotaUsage("key-backlog", 100, at(now));
  const afterFirst = oldRows();
  assert.ok(afterFirst > 0, "one request must not delete the whole backlog");
  assert.ok(afterFirst < 5000, "the first request must still make progress");

  let writes = 1;
  while (oldRows() > 0 && writes < 50) {
    quotaDomain.recordKeyQuotaUsage("key-backlog", 100, at(now));
    writes++;
  }
  assert.equal(oldRows(), 0, "later writes drain the backlog");
  assert.deepEqual(bucketsOf("key-backlog"), [current]);
});
