/**
 * Scheduled cleanup must prune exclusive_connection_leases and
 * provider_quota_reset_events. Neither table had a DELETE path, so both grew
 * forever: every exclusive lease and every observed quota reset adds a row.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cleanup-lease-history-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { runAutoCleanup } = await import("../../src/lib/db/cleanup.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getUserDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const DAY_MS = 86_400_000;
// Both tables follow the call-log retention window.
const RETENTION = getUserDatabaseSettings().retention.callLogs;
const OLD = -(RETENTION + 10);
const iso = (offsetDays: number) => new Date(Date.now() + offsetDays * DAY_MS).toISOString();
const ownerHash = (n: number) => String(n).padStart(64, "0");

function insertLease(n: number, state: string, acquiredDays: number, endedDays: number | null) {
  getDbInstance()
    .prepare(
      `INSERT INTO exclusive_connection_leases
       (lease_owner_hash, api_key_id, provider, connection_id, generation, state,
        acquired_at, renewed_at, expires_at, ended_at, end_reason)
       VALUES (?, 'key', 'claude', ?, 1, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      ownerHash(n),
      `conn-${n}`,
      state,
      iso(acquiredDays),
      iso(acquiredDays),
      iso(acquiredDays),
      endedDays === null ? null : iso(endedDays),
      endedDays === null ? null : "OWNER_EXIT"
    );
}

function insertResetEvent(name: string, resetsInDays: number) {
  getDbInstance()
    .prepare(
      `INSERT INTO provider_quota_reset_events
       (provider, connection_id, window_key, window_started_at, window_resets_at, observed_at)
       VALUES ('claude', ?, 'weekly', ?, ?, ?)`
    )
    .run(name, iso(resetsInDays - 7), iso(resetsInDays), iso(resetsInDays - 7));
}

test("runAutoCleanup prunes ended leases past retention and keeps live and recent ones", async () => {
  const db = getDbInstance();
  insertLease(1, "RELEASED", OLD - 10, OLD); // ended past retention: delete
  insertLease(2, "EXPIRED", OLD - 10, OLD); // delete
  insertLease(3, "RELEASED", -5, -2); // recent history: keep
  insertLease(4, "ACTIVE", OLD - 10, null); // never delete a live lease row
  insertLease(5, "INVALIDATED", OLD - 10, OLD + 5); // delete

  const { results } = await runAutoCleanup();

  const remaining = db
    .prepare("SELECT lease_owner_hash AS h FROM exclusive_connection_leases ORDER BY h")
    .all()
    .map((row) => (row as { h: string }).h);
  assert.deepEqual(remaining, [ownerHash(3), ownerHash(4)]);
  assert.equal(results.exclusiveConnectionLeases?.deleted, 3);
  assert.equal(results.exclusiveConnectionLeases?.errors, 0);
});

test("runAutoCleanup prunes quota reset events of windows that ended, not the current window", async () => {
  const db = getDbInstance();
  insertResetEvent("old-window", OLD); // reset past retention: delete
  insertResetEvent("last-week-window", -3); // reset 3 days ago: keep
  insertResetEvent("current-window", 4); // resets in the future: keep

  const { results } = await runAutoCleanup();

  const remaining = db
    .prepare("SELECT connection_id AS c FROM provider_quota_reset_events ORDER BY c")
    .all()
    .map((row) => (row as { c: string }).c);
  assert.deepEqual(remaining, ["current-window", "last-week-window"]);
  assert.equal(results.providerQuotaResetEvents?.errors, 0);
});
