/**
 * One request award used to cost six separate SQLite commits: three autocommit statements in
 * addXp (audit row, action counter, level row) and three leaderboard upserts (global, weekly,
 * monthly). The award is now one transaction. Anti-cheat, the lifetime action counter and the
 * leaderboard values stay the same.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "award-single-commit-"));
process.env.DATA_DIR = dataDir;

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { getXp } = await import("../../../src/lib/db/gamification.ts");
const { emitGamificationEvent } = await import("../../../src/lib/gamification/events.ts");

type SpyDb = {
  prepare: (sql: string) => { run: (...args: unknown[]) => unknown };
  transaction: (fn: (...args: unknown[]) => unknown) => (...args: unknown[]) => unknown;
  inTransaction?: boolean;
};

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

/** Counts SQLite commits: each write outside a transaction, plus each outermost transaction. */
async function countCommits(fn: () => Promise<void>): Promise<number> {
  const db = getDbInstance() as unknown as SpyDb;
  const prepare = db.prepare.bind(db);
  const transaction = db.transaction.bind(db);
  let commits = 0;
  db.prepare = (sql: string) => {
    const statement = prepare(sql);
    if (!/^\s*(INSERT|UPDATE|DELETE|REPLACE)/i.test(sql)) return statement;
    const run = statement.run.bind(statement);
    statement.run = (...args: unknown[]) => {
      if (!db.inTransaction) commits += 1;
      return run(...args);
    };
    return statement;
  };
  db.transaction = (inner) => {
    const wrapped = transaction(inner);
    return (...args: unknown[]) => {
      if (!db.inTransaction) commits += 1;
      return wrapped(...args);
    };
  };
  try {
    await fn();
  } finally {
    db.prepare = prepare;
    db.transaction = transaction;
  }
  return commits;
}

function scores(apiKeyId: string): Record<string, number> {
  const rows = getDbInstance()
    .prepare("SELECT scope, score FROM leaderboard WHERE api_key_id = ?")
    .all(apiKeyId) as Array<{ scope: string; score: number }>;
  return Object.fromEntries(rows.map((row) => [row.scope, row.score]));
}

function actionCount(apiKeyId: string, action: string): number {
  const row = getDbInstance()
    .prepare("SELECT count FROM xp_action_counts WHERE api_key_id = ? AND action = ?")
    .get(apiKeyId, action) as { count: number } | undefined;
  return row?.count ?? 0;
}

test("a request award after the first of the day commits once", async () => {
  const key = "single-commit-request";
  // The first request also starts the streak and unlocks the first badge.
  await emitGamificationEvent({ apiKeyId: key, action: "request" });

  const commits = await countCommits(() =>
    emitGamificationEvent({ apiKeyId: key, action: "request" })
  );

  assert.equal(commits, 1, "audit row, counter, level and three scores share one commit");
});

test("the single-commit award keeps XP, the lifetime counter and every score", async () => {
  const key = "single-commit-values";
  await emitGamificationEvent({ apiKeyId: key, action: "request" });
  await emitGamificationEvent({ apiKeyId: key, action: "request" });

  assert.equal(getXp(key)?.totalXp, 12, "1 + 1 request XP, 5 streak bonus, 5 badge bonus");
  assert.equal(actionCount(key, "request"), 2);
  assert.deepEqual(scores(key), { global: 12, monthly: 12, weekly: 12 });
});

test("a token_share award also credits the tokens_shared scope", async () => {
  const key = "single-commit-share";
  await emitGamificationEvent({ apiKeyId: key, action: "token_share", metadata: { amount: 4 } });

  assert.equal(actionCount(key, "token_share"), 4, "the counter weighs the metadata amount");
  assert.equal(scores(key).tokens_shared, 1);
  assert.equal(scores(key).global, getXp(key)?.totalXp);
});

test("an award that fails part-way leaves no partial XP rows", async () => {
  const key = "single-commit-rollback";
  const db = getDbInstance() as unknown as SpyDb;
  const prepare = db.prepare.bind(db);
  db.prepare = (sql: string) => {
    if (/INSERT INTO leaderboard/i.test(sql)) throw new Error("leaderboard unavailable");
    return prepare(sql);
  };
  try {
    await emitGamificationEvent({ apiKeyId: key, action: "request" });
  } finally {
    db.prepare = prepare;
  }

  const audit = getDbInstance()
    .prepare("SELECT COUNT(*) AS n FROM xp_audit_log WHERE api_key_id = ?")
    .get(key) as { n: number };
  assert.equal(audit.n, 0, "the audit row rolls back with the failed leaderboard write");
  assert.equal(actionCount(key, "request"), 0);
  assert.equal(getXp(key), null);
});
