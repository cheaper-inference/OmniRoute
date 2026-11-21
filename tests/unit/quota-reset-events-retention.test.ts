import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-reset-retention-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { recordProviderQuotaResetEventIfChanged, getProviderQuotaWindowStartIso } =
  await import("../../src/lib/db/quotaResetEvents.ts");

const DAY = 24 * 60 * 60 * 1000;
const iso = (ms: number) => new Date(ms).toISOString();
const NOW = Date.parse("2026-09-01T12:00:00.000Z");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function insertEvent(
  connectionId: string,
  startedAt: string,
  resetsAt: string,
  observedAt: string
) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO provider_quota_reset_events
         (provider, connection_id, window_key, window_started_at, window_resets_at, observed_at)
       VALUES ('claude', ?, 'weekly (7d)', ?, ?, ?)`
    )
    .run(connectionId, startedAt, resetsAt, observedAt);
}

function countEvents(connectionId: string): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM provider_quota_reset_events WHERE connection_id = ?")
    .get(connectionId) as { n: number };
  return row.n;
}

test("recording a reset event deletes this connection's events older than the retention window", () => {
  const conn = "conn-retention-delete";
  const other = "conn-retention-other";
  insertEvent(conn, iso(NOW - 300 * DAY), iso(NOW - 293 * DAY), iso(NOW - 299 * DAY));
  insertEvent(conn, iso(NOW - 20 * DAY), iso(NOW - 13 * DAY), iso(NOW - 19 * DAY));
  insertEvent(other, iso(NOW - 300 * DAY), iso(NOW - 293 * DAY), iso(NOW - 299 * DAY));

  recordProviderQuotaResetEventIfChanged({
    provider: "claude",
    connectionId: conn,
    windowKey: "weekly (7d)",
    currentResetAt: iso(NOW + 7 * DAY),
    currentRemainingPercentage: 100,
    previousObservation: { resetAt: iso(NOW - 1 * DAY), remainingPercentage: 3 },
    observedAt: iso(NOW),
  });

  assert.equal(countEvents(conn), 2, "old row gone; 20-day row and the new row stay");
  assert.equal(countEvents(other), 1, "another connection is not pruned by this write");
});

test("the weekly window start lookup ignores events older than the retention window", () => {
  const conn = "conn-retention-read";
  const resetsAt = iso(NOW + 3 * DAY);
  insertEvent(conn, iso(NOW - 200 * DAY), resetsAt, iso(NOW - 199 * DAY));
  assert.equal(getProviderQuotaWindowStartIso(conn, resetsAt, NOW), null);
});

test("the weekly window start lookup still finds a recent event", () => {
  const conn = "conn-retention-recent";
  const resetsAt = iso(NOW + 3 * DAY);
  insertEvent(conn, iso(NOW - 4 * DAY), resetsAt, iso(NOW - 4 * DAY));
  assert.equal(getProviderQuotaWindowStartIso(conn, resetsAt, NOW), iso(NOW - 4 * DAY));
});
