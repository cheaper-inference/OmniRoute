// A usage_history row can arrive for a day that was already rolled up and purged
// (a delayed batch write, an import). The daily rollup used to replace that day's
// summary with the rows it still found, so one late row erased the purged totals.
// Below the purged-through day the rollup now adds the late rows to the summary and
// consumes them in the same transaction, so a retry or a second rollup never counts
// a row twice.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rollup-late-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usagePurge = await import("../../src/lib/db/cleanup/usagePurge.ts");
const { rollupUsageHistoryBeforeDate } = await import("../../src/lib/usage/aggregateHistory.ts");
const { recordUsagePurgedBefore } = await import("../../src/lib/usage/usagePurgedBefore.ts");

const CUTOFF = "2026-09-10";
const DAY_1 = "2026-09-01";
const DAY_2 = "2026-09-02";
const DAY_3 = "2026-09-03";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test.beforeEach(() => {
  db().exec(
    "DELETE FROM usage_history; DELETE FROM daily_usage_summary; DELETE FROM key_value WHERE namespace = 'usageRollup'"
  );
});

function db() {
  return core.getDbInstance() as SqliteAdapter;
}

function seed(day: string, count: number, model = "m") {
  const insert = db().prepare(
    "INSERT INTO usage_history (provider, model, tokens_input, tokens_output, timestamp) VALUES ('p', ?, 100, 10, ?)"
  );
  for (let i = 0; i < count; i++) insert.run(model, `${day}T08:00:0${i}.000Z`);
}

function summary(day: string) {
  return db()
    .prepare(
      "SELECT total_requests AS requests, total_input_tokens AS input, total_output_tokens AS output FROM daily_usage_summary WHERE date = ?"
    )
    .get(day);
}

function rawCount(day: string) {
  return (
    db().prepare("SELECT COUNT(*) AS n FROM usage_history WHERE DATE(timestamp) = ?").get(day) as {
      n: number;
    }
  ).n;
}

/** The retention job: roll up everything before the cutoff, then delete it. */
async function rollupAndPurge() {
  const result = await rollupUsageHistoryBeforeDate(CUTOFF);
  assert.equal(result.errors, 0);
  await usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", CUTOFF);
}

test("a late row for a purged day is added to the day's summary", async () => {
  seed(DAY_1, 3);
  await rollupAndPurge();
  assert.deepEqual(summary(DAY_1), { requests: 3, input: 300, output: 30 });
  assert.equal(rawCount(DAY_1), 0);

  seed(DAY_1, 1);
  await rollupAndPurge();

  assert.deepEqual(summary(DAY_1), { requests: 4, input: 400, output: 40 });
  assert.equal(rawCount(DAY_1), 0);
});

test("a day that is not purged yet is still recomputed from its raw rows", async () => {
  seed(DAY_1, 3);
  const first = await rollupUsageHistoryBeforeDate(CUTOFF);
  const retry = await rollupUsageHistoryBeforeDate(CUTOFF);

  assert.equal(first.errors + retry.errors, 0);
  assert.deepEqual(summary(DAY_1), { requests: 3, input: 300, output: 30 });
  assert.equal(rawCount(DAY_1), 3, "the rollup keeps rows of a day that is not purged");
});

test("a retry after the late rows were added does not count them again", async () => {
  seed(DAY_1, 3);
  await rollupAndPurge();
  seed(DAY_1, 1);

  // The late rollup commits; the process stops before the purge runs.
  const added = await rollupUsageHistoryBeforeDate(CUTOFF);
  const retry = await rollupUsageHistoryBeforeDate(CUTOFF);

  assert.equal(added.errors + retry.errors, 0);
  assert.deepEqual(summary(DAY_1), { requests: 4, input: 400, output: 40 });
});

test("two rollups that read the same late row count it once and one reports an error", async () => {
  seed(DAY_1, 3);
  await rollupAndPurge();
  seed(DAY_1, 1);

  const results = await Promise.all([
    rollupUsageHistoryBeforeDate(CUTOFF),
    rollupUsageHistoryBeforeDate(CUTOFF),
  ]);

  assert.deepEqual(summary(DAY_1), { requests: 4, input: 400, output: 40 });
  assert.equal(
    results[0].errors + results[1].errors,
    1,
    "the loser must report an error so the caller keeps its raw rows"
  );
});

test("a purge that stops part way still protects the days it already deleted", async () => {
  seed(DAY_1, 2);
  seed(DAY_2, 2);
  seed(DAY_3, 2, "fail-here");
  assert.equal((await rollupUsageHistoryBeforeDate(CUTOFF)).errors, 0);
  db().exec(
    `CREATE TEMP TRIGGER fail_delete BEFORE DELETE ON usage_history WHEN old.model = 'fail-here'
     BEGIN SELECT RAISE(ABORT, 'injected delete failure'); END`
  );
  await assert.rejects(
    usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", CUTOFF),
    /injected delete failure/
  );
  db().exec("DROP TRIGGER temp.fail_delete");
  assert.equal(rawCount(DAY_1) + rawCount(DAY_2), 0);
  assert.equal(rawCount(DAY_3), 2);

  seed(DAY_1, 1);
  await rollupAndPurge();

  assert.deepEqual(summary(DAY_1), { requests: 3, input: 300, output: 30 });
  assert.deepEqual(summary(DAY_2), { requests: 2, input: 200, output: 20 });
  assert.deepEqual(summary(DAY_3), { requests: 2, input: 200, output: 20 });
});

test("a purge with an earlier cutoff does not move the purged-through day back", async () => {
  seed(DAY_3, 2);
  await rollupAndPurge();
  // An old row deleted under a cutoff far below the recorded day.
  seed("2026-08-20", 1);
  assert.equal(await usagePurge.deleteWholeDaysBefore("usage_history", "timestamp", DAY_1), 1);

  seed(DAY_3, 1);
  await rollupAndPurge();

  assert.deepEqual(summary(DAY_3), { requests: 3, input: 300, output: 30 });
});

test("a late row that arrives while the rollup prices its rows waits for the next run", async () => {
  seed(DAY_1, 3);
  await rollupAndPurge();
  seed(DAY_1, 1);

  // The rollup reads its rows before its first await; this row arrives after that.
  const running = rollupUsageHistoryBeforeDate(CUTOFF);
  seed(DAY_1, 1);
  const first = await running;

  assert.equal(first.errors, 0);
  assert.deepEqual(summary(DAY_1), { requests: 4, input: 400, output: 40 });

  await rollupAndPurge();
  assert.deepEqual(summary(DAY_1), { requests: 5, input: 500, output: 50 });
  assert.equal(rawCount(DAY_1), 0);
});

test("late rows are counted when the rollup cutoff is earlier than the purged day", async () => {
  seed(DAY_2, 2);
  await rollupAndPurge();
  seed(DAY_1, 1);
  seed(DAY_2, 1);

  // A raised retention moves the cutoff back below the purged-through day.
  const result = await rollupUsageHistoryBeforeDate(DAY_1);

  assert.equal(result.errors, 0);
  assert.deepEqual(summary(DAY_1), { requests: 1, input: 100, output: 10 });
  assert.deepEqual(summary(DAY_2), { requests: 3, input: 300, output: 30 });
});

test("a summary whose cache-read total is unknown stays unknown after a late row", async () => {
  seed(DAY_1, 2);
  await rollupAndPurge();
  db().exec("UPDATE daily_usage_summary SET total_cache_read_tokens = NULL");

  seed(DAY_1, 1);
  await rollupAndPurge();

  const row = db()
    .prepare(
      "SELECT total_requests AS n, total_cache_read_tokens AS cache FROM daily_usage_summary"
    )
    .get();
  assert.deepEqual(row, { n: 3, cache: null });
});

test("a late row that another writer commits between the id read and the row read is counted once", async () => {
  seed(DAY_1, 3);
  await rollupAndPurge();
  seed(DAY_1, 1);

  // Another process commits a late row right after this rollup reads MAX(id) and before
  // it reads the rows. The rollup must leave that row for the next run.
  const handle = db();
  const originalPrepare = handle.prepare;
  handle.prepare = ((sql: string) => {
    const statement = originalPrepare.call(handle, sql);
    if (!sql.includes("AS maxId FROM usage_history")) return statement;
    return {
      ...statement,
      get: (...args: unknown[]) => {
        const row = (statement.get as (...a: unknown[]) => unknown)(...args);
        seed(DAY_1, 1);
        return row;
      },
    };
  }) as typeof handle.prepare;
  let first;
  try {
    first = await rollupUsageHistoryBeforeDate(CUTOFF);
  } finally {
    handle.prepare = originalPrepare;
  }
  assert.equal(first.errors, 0);

  await rollupAndPurge();
  assert.deepEqual(summary(DAY_1), { requests: 5, input: 500, output: 50 });
  assert.equal(rawCount(DAY_1), 0);
});

test("a rollup that read a day before a concurrent purge does not replace that day's summary", async () => {
  seed(DAY_1, 2);

  // This rollup reads the day's two raw rows, then waits on pricing.
  const stale = rollupUsageHistoryBeforeDate(CUTOFF);
  // Meanwhile another writer rolls the day up, purges it and adds a late row: 3 requests.
  db()
    .prepare(
      `INSERT INTO daily_usage_summary
        (provider, model, date, total_requests, total_input_tokens, total_output_tokens, total_cache_read_tokens, total_cost, estimated_requests, unknown_evidence_requests, cached_input_unknown_requests)
       VALUES ('p', 'm', ?, 3, 300, 30, 0, 0, 0, 0, 0)`
    )
    .run(DAY_1);
  db().exec("DELETE FROM usage_history");
  recordUsagePurgedBefore(CUTOFF);

  const result = await stale;
  assert.equal(result.errors, 1, "the stale rollup must roll back and report an error");
  assert.deepEqual(summary(DAY_1), { requests: 3, input: 300, output: 30 });
});
