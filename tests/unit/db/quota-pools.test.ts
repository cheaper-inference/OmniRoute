/**
 * Unit tests for src/lib/db/quotaPools.ts — pagination and batchBuildPools.
 *
 * Uses isolated DATA_DIR per run; each test gets a fresh DB.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-pools-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const qp = await import("../../../src/lib/db/quotaPools.ts");
const { getDbInstance } = await import("../../../src/lib/db/core.ts");
const schedules = await import("../../../src/lib/db/quotaSchedules.ts");

type ScheduleInput = Parameters<typeof schedules.replaceSchedules>[1][number];

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Insert a pool + optional connection row directly (bypass create for speed).
function insertPool(
  id: string,
  name: string,
  connectionId: string,
  createdAt = new Date().toISOString()
) {
  const db = getDbInstance();
  db.prepare(
    "INSERT INTO quota_pools (id, name, group_id, connection_id, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run(id, name, "default", connectionId, createdAt);
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─────────────────────────────────────────────────────────────────────────────
// listPools — pagination
// ─────────────────────────────────────────────────────────────────────────────

test("listPools without limit/offset returns all pools", () => {
  insertPool("p1", "Alpha", "c1");
  insertPool("p2", "Beta", "c2");
  const result = qp.listPools();
  assert.equal(result.total, 2);
  assert.equal(result.items.length, 2);
});

test("listPools with limit returns ≤ limit items, total unchanged", () => {
  insertPool("p1", "Alpha", "c1");
  insertPool("p2", "Beta", "c2");
  insertPool("p3", "Gamma", "c3");
  const result = qp.listPools({ limit: 2 });
  assert.equal(result.total, 3);
  assert.equal(result.items.length, 2);
});

test("listPools with limit+offset returns correct slice", () => {
  insertPool("p1", "Alpha", "c1", "2024-01-01T00:00:00Z");
  insertPool("p2", "Beta", "c2", "2024-01-02T00:00:00Z");
  insertPool("p3", "Gamma", "c3", "2024-01-03T00:00:00Z");
  const result = qp.listPools({ limit: 1, offset: 1 });
  assert.equal(result.total, 3);
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].name, "Beta");
});

test("listPools with only offset (no limit) ignores offset", () => {
  insertPool("p1", "Alpha", "c1");
  insertPool("p2", "Beta", "c2");
  // offset without limit — should not add OFFSET clause (was a bug)
  const result = qp.listPools({ offset: 1 });
  assert.equal(result.total, 2);
  assert.equal(result.items.length, 2);
});

test("listPools with zero limit treated as no limit", () => {
  insertPool("p1", "Alpha", "c1");
  // limit=0 is invalid in SQL — code treats it as "no limit"
  const result = qp.listPools({ limit: 0 });
  assert.equal(result.total, 1);
  assert.equal(result.items.length, 1);
});

// ─────────────────────────────────────────────────────────────────────────────
// getPoolsByGroup — pagination
// ─────────────────────────────────────────────────────────────────────────────

test("getPoolsByGroup with limit returns correct count", () => {
  insertPool("p1", "A", "c1");
  insertPool("p2", "B", "c2");
  const items = qp.getPoolsByGroup("default", 1);
  assert.equal(items.length, 1);
});

test("getPoolsByGroup with limit+offset returns correct slice", () => {
  insertPool("p1", "Alpha", "c1", "2024-01-01T00:00:00Z");
  insertPool("p2", "Beta", "c2", "2024-01-02T00:00:00Z");
  insertPool("p3", "Gamma", "c3", "2024-01-03T00:00:00Z");
  const items = qp.getPoolsByGroup("default", 1, 2);
  assert.equal(items.length, 1);
  assert.equal(items[0].name, "Gamma");
});

test("getPoolsByGroup with only offset ignores offset", () => {
  insertPool("p1", "Alpha", "c1");
  insertPool("p2", "Beta", "c2");
  const items = qp.getPoolsByGroup("default", undefined, 1);
  assert.equal(items.length, 2);
});

test("getPoolsByGroup with empty group returns []", () => {
  const items = qp.getPoolsByGroup("nonexistent");
  assert.deepEqual(items, []);
});

// ─────────────────────────────────────────────────────────────────────────────
// batchBuildPools — allocations loaded in batch
// ─────────────────────────────────────────────────────────────────────────────

test("batchBuildPools loads allocations in single query", () => {
  const db = getDbInstance();
  db.prepare(
    "INSERT INTO quota_pools (id, name, group_id, connection_id, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run("p1", "PoolA", "default", "c1", new Date().toISOString());
  db.prepare(
    "INSERT INTO quota_allocations (pool_id, api_key_id, weight, cap_value) VALUES (?, ?, ?, ?)"
  ).run("p1", "ak_test", 1, 100);

  const result = qp.listPools();
  assert.equal(result.items.length, 1);
  assert.equal(result.total, 1);
  const pool = result.items[0];
  assert.equal(pool.name, "PoolA");
  assert.ok(pool.allocations !== undefined);
});

// ─────────────────────────────────────────────────────────────────────────────
// updatePool / ensurePool — schedules and member order
// ─────────────────────────────────────────────────────────────────────────────

/** A weekday 09:00 to 18:00 UTC allow window. */
function weekdayWindow(): ScheduleInput {
  return {
    id: "w1",
    days: [1, 2, 3, 4, 5],
    startMinute: 9 * 60,
    endMinute: 18 * 60,
    timezone: "UTC",
    mode: "allow",
    reserves: [],
    budgetWindow: "daily",
    priority: 0,
    enabled: true,
  };
}

function scheduledPool(name: string, connectionIds: string[]) {
  const pool = qp.createPool({ name, connectionId: connectionIds[0], connectionIds });
  schedules.replaceSchedules(pool.id, [weekdayWindow()]);
  assert.equal(schedules.listSchedules(pool.id).length, 1);
  return pool;
}

test("updatePool with the same members in another order and a new borrow mode keeps the schedules", () => {
  const pool = scheduledPool("Kept", ["conn-a", "conn-b"]);
  const updated = qp.updatePool(pool.id, {
    name: "Kept renamed",
    connectionIds: ["conn-b", "conn-a"],
    borrowMode: "consent",
  });
  assert.equal(updated?.borrowMode, "consent");
  assert.deepEqual(
    schedules.listSchedules(pool.id).map((s) => s.id),
    ["w1"]
  );
  assert.deepEqual(qp.getPool(pool.id)?.connectionIds, ["conn-b", "conn-a"]);
  assert.equal(qp.getPool(pool.id)?.connectionId, "conn-b");
});

test("ensurePool with the same members keeps the schedules", () => {
  const pool = scheduledPool("Ensured", ["conn-a", "conn-b"]);
  const result = qp.ensurePool({
    name: "Ensured",
    connectionId: "conn-a",
    connectionIds: ["conn-a", "conn-b"],
    borrowMode: "consent",
  });
  assert.equal(result.updated, true);
  assert.equal(result.pool.id, pool.id);
  assert.deepEqual(
    schedules.listSchedules(pool.id).map((s) => s.id),
    ["w1"]
  );
});

test("updatePool with a different set of members deletes the schedules", () => {
  const pool = scheduledPool("Changed", ["conn-a", "conn-b"]);
  qp.updatePool(pool.id, { connectionIds: ["conn-a", "conn-c"] });
  assert.deepEqual(schedules.listSchedules(pool.id), []);
  assert.deepEqual(qp.getPool(pool.id)?.connectionIds, ["conn-a", "conn-c"]);
});

test("the primary connection stays first when its id sorts after the second member", () => {
  const created = qp.createPool({
    name: "Primary first",
    connectionId: "conn-z",
    connectionIds: ["conn-z", "conn-a"],
  });
  assert.deepEqual(qp.getPool(created.id)?.connectionIds, ["conn-z", "conn-a"]);
  assert.deepEqual(qp.listPools().items.find((pool) => pool.id === created.id)?.connectionIds, [
    "conn-z",
    "conn-a",
  ]);

  qp.updatePool(created.id, { connectionIds: ["conn-y", "conn-b"] });
  assert.deepEqual(qp.getPool(created.id)?.connectionIds, ["conn-y", "conn-b"]);
  assert.equal(qp.getPool(created.id)?.connectionId, "conn-y");
});

test("the member order does not depend on which index the query uses", () => {
  // Without the pool_id index, SQLite scans the (pool_id, connection_id) key.
  // Members that share a created_at then come back sorted by id unless rowid breaks the tie.
  getDbInstance().prepare("DROP INDEX IF EXISTS idx_quota_pool_connections_pool").run();
  const created = qp.createPool({
    name: "Primary first without index",
    connectionId: "conn-z",
    connectionIds: ["conn-z", "conn-a"],
  });
  const db = getDbInstance();
  db.prepare("UPDATE quota_pool_connections SET created_at = ? WHERE pool_id = ?").run(
    "2026-01-01 00:00:00",
    created.id
  );
  assert.deepEqual(qp.getPool(created.id)?.connectionIds, ["conn-z", "conn-a"]);
  assert.deepEqual(qp.listPools().items.find((pool) => pool.id === created.id)?.connectionIds, [
    "conn-z",
    "conn-a",
  ]);
});
