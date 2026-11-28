import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";

import { createNodeSqliteAdapter } from "../../src/lib/db/adapters/nodeSqliteAdapter";
import { releaseExclusiveLock } from "../../src/lib/db/exclusiveLockRelease";

test("node:sqlite lock release skips the explicit checkpoint but still cleans up", async (t) => {
  const originalEmit = process.emit;
  t.after(() => {
    process.emit = originalEmit;
  });
  const events = ["beforeExit", "SIGINT", "SIGTERM"] as const;
  const listeners = () => events.map((event) => process.listeners(event));
  const before = listeners();
  const adapter = await createNodeSqliteAdapter(":memory:");
  t.after(() => {
    if (adapter.open) adapter.close();
  });

  const db = adapter.raw as DatabaseSync;
  const exec = db.exec.bind(db);
  const calls: string[] = [];
  db.exec = (sql: string) => {
    calls.push(sql);
    exec(sql);
  };
  assert.deepEqual(
    listeners().map((current, index) => current.length - before[index].length),
    [1, 1, 1]
  );
  assert.deepEqual(releaseExclusiveLock(adapter), { kind: "CLOSED" });
  assert.equal(db.isOpen, false);
  assert.deepEqual(calls, []);
  assert.deepEqual(listeners(), before);

  const ordinary = await createNodeSqliteAdapter(":memory:");
  t.after(() => {
    if (ordinary.open) ordinary.close();
  });
  const ordinaryDb = ordinary.raw as DatabaseSync;
  const ordinaryExec = ordinaryDb.exec.bind(ordinaryDb);
  ordinaryDb.exec = (sql: string) => {
    calls.push(sql);
    ordinaryExec(sql);
  };
  ordinary.close();
  assert.equal(ordinaryDb.isOpen, false);
  assert.deepEqual(calls, ["PRAGMA wal_checkpoint(TRUNCATE)"]);
  assert.deepEqual(listeners(), before);
});
