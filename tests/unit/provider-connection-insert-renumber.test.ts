import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Creating a connection renumbers every row of the provider. The renumber used to run one UPDATE per
 * row outside any transaction (one WAL commit each), even for rows whose priority did not change.
 * It now skips unchanged rows and shares one transaction with the insert. The resulting order is the
 * same as before.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-insert-renumber-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "insert-renumber-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const add = (name: string, extra: Record<string, unknown> = {}) =>
  providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey: `sk-${name}-secret`,
    ...extra,
  }) as Promise<{ id: string }>;

const order = async () =>
  (await providersDb.getProviderConnections({ provider: "openai" })).map(
    (row: { name: string; priority: number }) => `${row.name}:${row.priority}`
  );

/** Count the priority UPDATE statements and the transactions opened while `fn` runs. */
async function countWrites(fn: () => Promise<unknown>) {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { run: (...a: unknown[]) => unknown };
    transaction: (f: () => unknown) => () => unknown;
  };
  const prepare = db.prepare;
  const transaction = db.transaction;
  let priorityUpdates = 0;
  let transactions = 0;
  db.prepare = ((sql: string) => {
    const stmt = prepare.call(db, sql) as { run: (...a: unknown[]) => unknown };
    if (/UPDATE provider_connections SET priority/i.test(sql)) {
      const run = stmt.run.bind(stmt);
      stmt.run = (...a: unknown[]) => {
        priorityUpdates += 1;
        return run(...a);
      };
    }
    return stmt;
  }) as typeof db.prepare;
  db.transaction = ((f: () => unknown) => {
    transactions += 1;
    return transaction.call(db, f);
  }) as typeof db.transaction;
  try {
    await fn();
  } finally {
    db.prepare = prepare;
    db.transaction = transaction;
  }
  return { priorityUpdates, transactions };
}

test("appending a connection leaves the existing rows alone and keeps the order", async () => {
  for (const name of ["a", "b", "c", "d"]) await add(name);
  assert.deepEqual(await order(), ["a:1", "b:2", "c:3", "d:4"]);

  const writes = await countWrites(() => add("e"));

  assert.deepEqual(await order(), ["a:1", "b:2", "c:3", "d:4", "e:5"]);
  assert.equal(writes.priorityUpdates, 0, "no row moved, so no priority UPDATE is needed");
});

test("inserting at the top renumbers only the rows that move, in one transaction", async () => {
  for (const name of ["a", "b", "c", "d"]) await add(name);

  const writes = await countWrites(() => add("top", { priority: 1 }));

  assert.deepEqual(await order(), ["top:1", "a:2", "b:3", "c:4", "d:5"]);
  assert.equal(
    writes.priorityUpdates,
    4,
    "the four older rows each shift by one; the new row is already 1"
  );
  assert.ok(writes.transactions >= 1, "the insert and the renumber share a transaction");
});
