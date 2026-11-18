// Retention cleanup of call_logs and usage_history must not delete a whole
// backlog in one statement. One DELETE over hundreds of thousands of rows holds
// the event loop and the SQLite write lock for its full duration; these tests
// check that the backlog goes in bounded statements, that the event loop runs
// between them, and that another connection can take the write lock then.
// usage_history goes one whole day per statement, so a run that stops part way
// never leaves a day half deleted for the next rollup to undercount.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-retention-batches-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const usagePurge = await import("../../src/lib/db/cleanup/usagePurge.ts");
const { getUserDatabaseSettings } = await import("../../src/lib/db/databaseSettings.ts");

const BATCH = 10_000;
const DAY_MS = 86_400_000;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function db() {
  return core.getDbInstance() as SqliteAdapter;
}

function daysAgo(days: number) {
  return new Date(Date.now() - days * DAY_MS).toISOString();
}

/**
 * The usage_history cutoff day, computed the way cleanupUsageHistory does it
 * (local-time setDate), so it matches on DST-change days too.
 */
function usageCutoffDay(days: number) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return cutoff.toISOString().slice(0, 10);
}

function usageTimestamps() {
  return db()
    .prepare("SELECT timestamp FROM usage_history ORDER BY timestamp")
    .all()
    .map((r) => (r as { timestamp: string }).timestamp);
}

function seedCallLogs(count: number, timestamp: string, prefix: string) {
  const insert = db().prepare("INSERT INTO call_logs (id, timestamp, model) VALUES (?, ?, 'm')");
  db().exec("BEGIN");
  for (let i = 0; i < count; i++) insert.run(`${prefix}-${i}`, timestamp);
  db().exec("COMMIT");
}

function seedUsageHistory(count: number, timestamp: string, model = "m") {
  const insert = db().prepare(
    "INSERT INTO usage_history (provider, model, tokens_input, tokens_output, timestamp) VALUES ('p', ?, 1, 1, ?)"
  );
  db().exec("BEGIN");
  for (let i = 0; i < count; i++) insert.run(model, timestamp);
  db().exec("COMMIT");
}

function summarizedRequests() {
  return (
    db().prepare("SELECT COALESCE(SUM(total_requests), 0) AS n FROM daily_usage_summary").get() as {
      n: number;
    }
  ).n;
}

/**
 * Make any DELETE of a row matching `when` (on `table`) abort its statement,
 * standing in for a statement that fails part way through a cleanup (a lock
 * held past busy_timeout, a full disk). Returns a function that removes it.
 */
function failDeleteOf(table: string, when: string) {
  db().exec(
    `CREATE TEMP TRIGGER fail_delete BEFORE DELETE ON ${table} WHEN ${when}
     BEGIN SELECT RAISE(ABORT, 'injected delete failure'); END`
  );
  return () => db().exec("DROP TRIGGER IF EXISTS temp.fail_delete");
}

function count(table: string) {
  return (db().prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n;
}

/**
 * Run `fn` and record, for every DELETE it runs against `table`, how many rows
 * that one statement removed. A setImmediate ticker counts how often the event
 * loop got to run while `fn` was in progress; `onTick` runs on each tick.
 * After `maxStatements` DELETEs the next one throws.
 */
async function observeDeletes(
  table: string,
  fn: () => Promise<unknown>,
  onTick?: () => void,
  maxStatements = Infinity
) {
  const adapter = db();
  const original = adapter.prepare;
  const perStatement: number[] = [];
  adapter.prepare = function (sql: string) {
    const stmt = original.call(this, sql);
    if (!/^\s*DELETE FROM/i.test(sql) || !sql.includes(table)) return stmt;
    return {
      ...stmt,
      get: stmt.get.bind(stmt),
      all: stmt.all.bind(stmt),
      run: (...params: unknown[]) => {
        // A delete loop that stops making progress fails here instead of
        // hanging the test run.
        if (perStatement.length >= maxStatements) {
          throw new Error(`more than ${maxStatements} DELETE statements on ${table}`);
        }
        const result = (stmt.run as (...args: unknown[]) => { changes: number })(...params);
        perStatement.push(Number(result.changes));
        return result;
      },
    } as typeof stmt;
  };
  let ticks = 0;
  let done = false;
  const tick = () => {
    if (done) return;
    ticks++;
    onTick?.();
    setImmediate(tick);
  };
  setImmediate(tick);
  try {
    const result = await fn();
    return { result, perStatement, ticks };
  } finally {
    done = true;
    adapter.prepare = original;
  }
}

function dbFile() {
  const rows = db().prepare("PRAGMA database_list").all() as Array<{ name: string; file: string }>;
  return rows.find((row) => row.name === "main")!.file;
}

test("call_logs retention deletes a backlog in batches of at most 10,000 rows", async () => {
  const days = getUserDatabaseSettings().retention.callLogs;
  seedCallLogs(25_000, daysAgo(days + 5), "old");
  seedCallLogs(50, daysAgo(0), "new");
  // call_logs keeps a timestamp cutoff, not a day boundary: a row older than
  // the cutoff goes even when it falls on the cutoff's own UTC day. The row
  // sits halfway between that day's UTC midnight and the cutoff, so it is on
  // the cutoff day at any time of day (a fixed two hours before the cutoff
  // fell on the day before between 00:00 and 02:00 UTC).
  const cutoffMs = Date.now() - days * DAY_MS;
  const cutoffDayStart = cutoffMs - (cutoffMs % DAY_MS);
  const edgeMs = cutoffDayStart + Math.floor((cutoffMs - cutoffDayStart) / 2);
  seedCallLogs(1, new Date(edgeMs).toISOString(), "edge");

  const { result, perStatement, ticks } = await observeDeletes("call_logs", () =>
    cleanup.cleanupCallLogs()
  );

  assert.deepEqual(result, { deleted: 25_001, errors: 0 });
  assert.equal(count("call_logs"), 50, "rows inside the retention window stay");
  assert.deepEqual(perStatement, [BATCH, BATCH, 5_001]);
  assert.ok(ticks >= perStatement.length - 1, `event loop ran ${ticks} times between batches`);
});

test("another connection can take the write lock between call_logs batches", async () => {
  assert.equal(
    (db().prepare("PRAGMA journal_mode").get() as { journal_mode: string }).journal_mode,
    "wal"
  );
  const days = getUserDatabaseSettings().retention.callLogs;
  seedCallLogs(30_000, daysAgo(days + 2), "lock");
  const other = new DatabaseSync(dbFile());
  other.exec("PRAGMA busy_timeout = 0");
  const writes: string[] = [];
  try {
    const { result } = await observeDeletes(
      "call_logs",
      () => cleanup.cleanupCallLogs(),
      () => {
        if (writes.length >= 2) return;
        // busy_timeout 0: this throws SQLITE_BUSY if the cleanup held the
        // write lock across the yield.
        const id = `during-${writes.length}`;
        other
          .prepare("INSERT INTO call_logs (id, timestamp, model) VALUES (?, ?, 'm')")
          .run(id, new Date().toISOString());
        writes.push(id);
      }
    );
    assert.deepEqual(result, { deleted: 30_000, errors: 0 });
  } finally {
    other.close();
  }
  assert.equal(writes.length, 2, "two writes from another connection landed during the cleanup");
  const kept = db()
    .prepare("SELECT id FROM call_logs WHERE id LIKE 'during-%' ORDER BY id")
    .all() as Array<{ id: string }>;
  assert.deepEqual(
    kept.map((row) => row.id),
    writes
  );
});

test("usage_history retention deletes one whole day per statement and keeps the day-boundary cutoff", async () => {
  const days = getUserDatabaseSettings().retention.usageHistory;
  const cutoffDay = usageCutoffDay(days);
  seedUsageHistory(7_000, daysAgo(days + 5));
  // A day larger than the call_logs batch size still goes in one statement:
  // splitting it would leave part of the day for the next rollup.
  seedUsageHistory(12_000, daysAgo(days + 4));
  seedUsageHistory(2_000, daysAgo(days + 3));
  // Same calendar day as the cutoff: the rollup only aggregates days before
  // it, so these rows must not be deleted.
  seedUsageHistory(5, `${cutoffDay}T00:00:01.000Z`);
  seedUsageHistory(5, daysAgo(0));

  const { result, perStatement, ticks } = await observeDeletes("usage_history", () =>
    cleanup.cleanupUsageHistory()
  );

  assert.deepEqual(result, { deleted: 21_000, errors: 0 });
  assert.equal(count("usage_history"), 10);
  assert.deepEqual(perStatement, [7_000, 12_000, 2_000], "oldest day first, one day each");
  assert.ok(ticks >= perStatement.length - 1, `event loop ran ${ticks} times between days`);
  assert.equal(summarizedRequests(), 21_000, "every deleted row was rolled up first");
});

test("an empty backlog runs one DELETE and deletes nothing", async () => {
  const before = count("call_logs");
  const { result, perStatement } = await observeDeletes("call_logs", () =>
    cleanup.cleanupCallLogs()
  );
  assert.deepEqual(result, { deleted: 0, errors: 0 });
  assert.deepEqual(perStatement, [0]);
  assert.equal(count("call_logs"), before);
});

test("a usage_history cleanup that fails part way leaves no half-deleted day", async () => {
  db().exec("DELETE FROM usage_history; DELETE FROM daily_usage_summary");
  const days = getUserDatabaseSettings().retention.usageHistory;
  seedUsageHistory(8_000, daysAgo(days + 5));
  seedUsageHistory(7_999, daysAgo(days + 4));
  // Last row of the second day: in 10,000-row batches the second batch hits
  // it after the first has removed 2,000 rows of this day.
  seedUsageHistory(1, daysAgo(days + 4), "fail-here");

  const restore = failDeleteOf("usage_history", "old.model = 'fail-here'");
  let first;
  try {
    first = await cleanup.cleanupUsageHistory();
  } finally {
    restore();
  }
  assert.deepEqual(first, { deleted: 8_000, errors: 1 }, "reports the day already deleted");
  assert.equal(count("usage_history"), 8_000, "the failed day is untouched");

  const second = await cleanup.cleanupUsageHistory();
  assert.deepEqual(second, { deleted: 8_000, errors: 0 });
  assert.equal(count("usage_history"), 0);
  assert.equal(summarizedRequests(), 16_000, "the retry must not undercount the failed day");
});

test("a call_logs cleanup that fails part way reports the rows it already deleted", async () => {
  db().exec("DELETE FROM call_logs");
  const days = getUserDatabaseSettings().retention.callLogs;
  seedCallLogs(25_000, daysAgo(days + 5), "partial");
  seedCallLogs(1, daysAgo(days + 5), "fail-here");

  const restore = failDeleteOf("call_logs", "old.id = 'fail-here-0'");
  let result;
  try {
    result = await cleanup.cleanupCallLogs();
  } finally {
    restore();
  }
  assert.deepEqual(result, { deleted: 2 * BATCH, errors: 1 });
  assert.equal(count("call_logs"), 25_001 - 2 * BATCH);
});

test("a failed usage_history rollup aborts the delete", async () => {
  db().exec("DELETE FROM usage_history; DELETE FROM daily_usage_summary");
  const days = getUserDatabaseSettings().retention.usageHistory;
  seedUsageHistory(500, daysAgo(days + 5));
  db().exec(
    `CREATE TEMP TRIGGER fail_rollup BEFORE INSERT ON daily_usage_summary
     BEGIN SELECT RAISE(ABORT, 'injected rollup failure'); END`
  );
  let result;
  try {
    result = await cleanup.cleanupUsageHistory();
  } finally {
    db().exec("DROP TRIGGER IF EXISTS temp.fail_rollup");
  }
  assert.deepEqual(result, { deleted: 0, errors: 1 });
  assert.equal(count("usage_history"), 500, "rows that were never rolled up stay");
  assert.equal(summarizedRequests(), 0);
});

test("the batched delete rejects a batch size that would never finish", async () => {
  const target = { table: "call_logs", column: "timestamp", cutoff: "iso" } as const;
  for (const batchSize of [0, -1, 1.5, Number.NaN]) {
    await assert.rejects(
      usagePurge.deleteFromTableBeforeInBatches(target, new Date().toISOString(), { batchSize }),
      RangeError,
      `batchSize ${batchSize}`
    );
  }
  db().exec("DELETE FROM call_logs");
  seedCallLogs(3, "2000-01-01T00:00:00.000Z", "tiny");
  // Exactly at the cutoff: the cutoff is exclusive, so this row stays.
  seedCallLogs(1, "2000-01-02T00:00:00.000Z", "at-cutoff");
  const { result, perStatement } = await observeDeletes("call_logs", () =>
    usagePurge.deleteFromTableBeforeInBatches(target, "2000-01-02T00:00:00.000Z", { batchSize: 2 })
  );
  assert.equal(result, 3);
  assert.deepEqual(perStatement, [2, 1]);
  assert.equal(count("call_logs"), 1);

  // 1 is the smallest batch size accepted.
  seedCallLogs(2, "2000-01-01T00:00:00.000Z", "single");
  const one = await observeDeletes("call_logs", () =>
    usagePurge.deleteFromTableBeforeInBatches(target, "2000-01-02T00:00:00.000Z", { batchSize: 1 })
  );
  assert.equal(one.result, 2);
  assert.deepEqual(one.perStatement, [1, 1, 0]);
  assert.equal(count("call_logs"), 1);
});

test("a usage_history row whose date part is not a real calendar day never moves the delete past the cutoff", async () => {
  db().exec("DELETE FROM usage_history");
  // '2025-09-31' sorts before the cutoff '2025-10-01', but Date.parse rolls it
  // forward to 10-01, so the next day would be 10-02, past the cutoff.
  seedUsageHistory(1, "2025-09-31T12:00:00.000Z");
  seedUsageHistory(1, "2025-10-01T08:00:00.000Z");
  const deleted = await usagePurge.deleteWholeDaysBefore(
    "usage_history",
    "timestamp",
    "2025-10-01"
  );
  assert.equal(deleted, 1);
  assert.deepEqual(usageTimestamps(), ["2025-10-01T08:00:00.000Z"]);
});

test("usage_history retention deletes the whole day before the cutoff day", async () => {
  db().exec("DELETE FROM usage_history; DELETE FROM daily_usage_summary");
  const cutoffDay = usageCutoffDay(getUserDatabaseSettings().retention.usageHistory);
  const dayBefore = new Date(Date.parse(`${cutoffDay}T00:00:00.000Z`) - DAY_MS)
    .toISOString()
    .slice(0, 10);
  seedUsageHistory(3, `${dayBefore}T23:59:59.999Z`);
  seedUsageHistory(2, `${cutoffDay}T00:00:00.000Z`);

  const result = await cleanup.cleanupUsageHistory();

  assert.deepEqual(result, { deleted: 3, errors: 0 });
  assert.deepEqual(usageTimestamps(), [`${cutoffDay}T00:00:00.000Z`, `${cutoffDay}T00:00:00.000Z`]);
  assert.equal(summarizedRequests(), 3);
});

test("usage_history days are split at UTC midnight in a timezone east of UTC", async () => {
  db().exec("DELETE FROM usage_history");
  seedUsageHistory(4, "2025-09-29T20:00:00.000Z");
  seedUsageHistory(3, "2025-09-30T01:00:00.000Z");
  seedUsageHistory(1, "2025-10-01T00:00:00.000Z");
  const savedTz = process.env.TZ;
  process.env.TZ = "Asia/Tokyo";
  try {
    assert.equal(new Date(2025, 0, 1).getTimezoneOffset(), -540, "TZ switched to Asia/Tokyo");
    const { result, perStatement } = await observeDeletes(
      "usage_history",
      () => usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", "2025-10-01"),
      undefined,
      5
    );
    assert.equal(result, 7);
    assert.deepEqual(perStatement, [4, 3]);
  } finally {
    if (savedTz === undefined) delete process.env.TZ;
    else process.env.TZ = savedTz;
  }
  assert.deepEqual(usageTimestamps(), ["2025-10-01T00:00:00.000Z"]);
});

test("usage_history days are split at UTC midnight across a local DST change", async () => {
  db().exec("DELETE FROM usage_history");
  // 2025-03-09 is the spring-forward day in America/New_York. A next day
  // computed with local-time setDate lands on 2025-03-09T23:00Z, the same UTC
  // day, and the delete never moves past it.
  seedUsageHistory(2, "2025-03-09T12:00:00.000Z");
  seedUsageHistory(3, "2025-03-10T12:00:00.000Z");
  seedUsageHistory(1, "2025-03-11T00:00:00.000Z");
  const savedTz = process.env.TZ;
  process.env.TZ = "America/New_York";
  try {
    assert.equal(new Date(2025, 0, 1).getTimezoneOffset(), 300, "TZ switched to America/New_York");
    const { result, perStatement } = await observeDeletes(
      "usage_history",
      () => usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", "2025-03-11"),
      undefined,
      5
    );
    assert.equal(result, 5);
    assert.deepEqual(perStatement, [2, 3]);
  } finally {
    if (savedTz === undefined) delete process.env.TZ;
    else process.env.TZ = savedTz;
  }
  assert.deepEqual(usageTimestamps(), ["2025-03-11T00:00:00.000Z"]);
});

test("an empty usage_history timestamp does not stop the delete", async () => {
  db().exec("DELETE FROM usage_history");
  // MIN(timestamp) is '' here; that is a value, not the end of the backlog.
  seedUsageHistory(1, "");
  seedUsageHistory(3, "2025-09-29T12:00:00.000Z");
  seedUsageHistory(1, "2025-10-01T08:00:00.000Z");
  const deleted = await usagePurge.deleteWholeDaysBefore(
    "usage_history",
    "timestamp",
    "2025-10-01"
  );
  assert.equal(deleted, 4);
  assert.deepEqual(usageTimestamps(), ["2025-10-01T08:00:00.000Z"]);
});

test("a usage_history timestamp with an extended year does not stall the delete", async () => {
  db().exec("DELETE FROM usage_history");
  // '+010000-…' and '-000001-…' sort before '2025-…' but their first 10
  // characters are not YYYY-MM-DD. Date.parse still accepts
  // '+010000-01T00:00:00Z', and the "next day" it gives, '+010000-01', sorts
  // before the row itself, so a delete bounded by it removes nothing.
  seedUsageHistory(1, "+010000-01-01T00:00:00.000Z");
  seedUsageHistory(1, "-000001-01-01T00:00:00.000Z");
  seedUsageHistory(2, "2025-09-29T12:00:00.000Z");
  seedUsageHistory(1, "2025-10-01T08:00:00.000Z");
  const { result, perStatement } = await observeDeletes(
    "usage_history",
    () => usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", "2025-10-01"),
    undefined,
    5
  );
  assert.equal(result, 4);
  assert.deepEqual(perStatement, [4]);
  assert.deepEqual(usageTimestamps(), ["2025-10-01T08:00:00.000Z"]);
});

test("a bare YYYY-MM-DD usage_history timestamp is deleted with its own day and kept on the cutoff day", async () => {
  db().exec("DELETE FROM usage_history");
  // DATE() in the rollup puts a bare '2025-09-30' on 09-30 and a bare
  // '2025-10-01' on the cutoff day, which the rollup has not summarized.
  seedUsageHistory(1, "2025-09-29T12:00:00.000Z");
  seedUsageHistory(1, "2025-09-30");
  seedUsageHistory(1, "2025-10-01");
  const { result, perStatement } = await observeDeletes(
    "usage_history",
    () => usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", "2025-10-01"),
    undefined,
    5
  );
  assert.equal(result, 2);
  assert.deepEqual(perStatement, [1, 1]);
  assert.deepEqual(usageTimestamps(), ["2025-10-01"]);
});

test("usage_history rows with an empty timestamp go even when no dated row is before the cutoff", async () => {
  db().exec("DELETE FROM usage_history");
  // The rollup has nothing to sum for these, and the old single DELETE removed
  // them. A MIN() that skipped '' would end the loop with them still there.
  seedUsageHistory(2, "");
  seedUsageHistory(1, "2025-10-01T08:00:00.000Z");
  const { result, perStatement } = await observeDeletes(
    "usage_history",
    () => usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", "2025-10-01"),
    undefined,
    5
  );
  assert.equal(result, 2);
  assert.deepEqual(perStatement, [2]);
  assert.deepEqual(usageTimestamps(), ["2025-10-01T08:00:00.000Z"]);
});

test("an empty usage_history timestamp sends the rest of the backlog in one statement", async () => {
  db().exec("DELETE FROM usage_history");
  seedUsageHistory(1, "");
  seedUsageHistory(2, "2025-09-28T12:00:00.000Z");
  seedUsageHistory(3, "2025-09-29T12:00:00.000Z");
  seedUsageHistory(1, "2025-10-01T08:00:00.000Z");
  const { result, perStatement } = await observeDeletes(
    "usage_history",
    () => usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", "2025-10-01"),
    undefined,
    5
  );
  assert.equal(result, 6);
  assert.deepEqual(perStatement, [6]);
  assert.deepEqual(usageTimestamps(), ["2025-10-01T08:00:00.000Z"]);
});

test("a usage_history timestamp that only starts like a date does not stall the delete", async () => {
  db().exec("DELETE FROM usage_history");
  // '2025-1(old)' sorts after the 09-29 rows and before the cutoff. Date.parse
  // accepts '2025-1(old' (it skips the '(' as a comment) and reads it as local
  // time, so the "next day" it gives is 2025-01-02 (or 2025-01-01 east of UTC).
  // Either sorts before the row itself, so only the full YYYY-MM-DD check sends
  // it to the one-statement fallback.
  seedUsageHistory(2, "2025-09-29T12:00:00.000Z");
  seedUsageHistory(1, "2025-1(old)");
  seedUsageHistory(1, "2025-10-01T08:00:00.000Z");
  const { result, perStatement } = await observeDeletes(
    "usage_history",
    () => usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", "2025-10-01"),
    undefined,
    5
  );
  assert.equal(result, 3);
  assert.deepEqual(perStatement, [2, 1]);
  assert.deepEqual(usageTimestamps(), ["2025-10-01T08:00:00.000Z"]);
});

test("a usage_history backlog of more than three days is deleted in one run", async () => {
  db().exec("DELETE FROM usage_history");
  const days = getUserDatabaseSettings().retention.usageHistory;
  for (let d = 2; d <= 7; d++) seedUsageHistory(1, daysAgo(days + d));
  const { result, perStatement, ticks } = await observeDeletes(
    "usage_history",
    () => cleanup.cleanupUsageHistory(),
    undefined,
    6
  );
  assert.deepEqual(result, { deleted: 6, errors: 0 });
  assert.deepEqual(perStatement, [1, 1, 1, 1, 1, 1]);
  assert.ok(ticks >= perStatement.length - 1, `event loop ran ${ticks} times between days`);
  assert.equal(count("usage_history"), 0);
});

test("another connection can take the write lock between usage_history days", async () => {
  // Start from a fresh connection. A test above can leave the singleton holding
  // an open read snapshot, and while it does, commits made by the second
  // connection stay invisible here -- the rows would read as missing even though
  // the cleanup never touched them.
  core.resetDbInstance();
  db().exec("DELETE FROM usage_history");
  const days = getUserDatabaseSettings().retention.usageHistory;
  for (let d = 2; d <= 4; d++) seedUsageHistory(5, daysAgo(days + d));
  const other = new DatabaseSync(dbFile());
  other.exec("PRAGMA busy_timeout = 0");
  const writes: string[] = [];
  try {
    const { result } = await observeDeletes(
      "usage_history",
      () => cleanup.cleanupUsageHistory(),
      () => {
        if (writes.length >= 2) return;
        // busy_timeout 0: this throws SQLITE_BUSY if the cleanup held the
        // write lock across the yield between days.
        const model = `during-${writes.length}`;
        other
          .prepare("INSERT INTO usage_history (provider, model, timestamp) VALUES ('p', ?, ?)")
          .run(model, new Date().toISOString());
        writes.push(model);
      },
      5
    );
    assert.deepEqual(result, { deleted: 15, errors: 0 });
  } finally {
    other.close();
  }
  assert.equal(writes.length, 2, "two writes from another connection landed during the cleanup");
  const kept = db()
    .prepare("SELECT model FROM usage_history WHERE model LIKE 'during-%' ORDER BY model")
    .all() as Array<{ model: string }>;
  assert.deepEqual(
    kept.map((row) => row.model),
    writes
  );
});
