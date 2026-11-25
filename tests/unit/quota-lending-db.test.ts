/**
 * Lending consent per allocation and the borrow mode per quota pool, at the
 * database layer. An admin edit of a pool keeps the consent already recorded.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-lending-db-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const {
  createPool,
  getPool,
  listPools,
  updatePool,
  upsertAllocations,
  ensurePool,
  listAllocationsForApiKey,
} = await import("../../src/lib/db/quotaPools.ts");
const { createGroup } = await import("../../src/lib/db/quotaGroups.ts");
const { getAllocationLending, setAllocationLending, normalizeBorrowMode, normalizeLendingPercent } =
  await import("../../src/lib/db/quotaLending.ts");
const consentBorrow = await import("../../src/lib/quota/consentBorrow.ts");

const alloc = (apiKeyId: string, weight: number) => ({
  apiKeyId,
  weight,
  policy: "hard" as const,
});
const UNTIL = 4102444800000; // 2100-01-01T00:00:00Z
const lendingOf = (poolId: string, key: string) => getAllocationLending(poolId, key);

const id = createPool({
  connectionId: "c2",
  name: "shared",
  allocations: [alloc("a", 50), alloc("b", 50)],
}).id;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a new pool is in saturation mode and its allocations carry no lending", () => {
  const pool = createPool({
    connectionId: "c1",
    name: "p1",
    allocations: [alloc("a", 50), alloc("b", 50)],
  });
  assert.equal(getPool(pool.id)?.borrowMode, "saturation");
  assert.equal(listPools().items.find((p) => p.id === pool.id)?.borrowMode, "saturation");
  assert.deepEqual(getPool(pool.id)?.allocations, [alloc("a", 50), alloc("b", 50)]);
  assert.deepEqual(lendingOf(pool.id, "a"), { lendingPercent: 0, lendingUntil: null });
  assert.equal(lendingOf(pool.id, "nobody"), null);
});

test("consent is stored per allocation and reported as changed only when it changes", () => {
  const next = { lendingPercent: 30, lendingUntil: UNTIL };
  assert.deepEqual(setAllocationLending(id, "a", next), {
    changed: true,
    previous: { lendingPercent: 0, lendingUntil: null },
  });
  assert.deepEqual(setAllocationLending(id, "a", next), { changed: false, previous: next });
  assert.equal(setAllocationLending(id, "nobody", next), null);
  const a = getPool(id)?.allocations.find((x) => x.apiKeyId === "a");
  assert.deepEqual([a?.lendingPercent, a?.lendingUntil], [30, UNTIL]);
  assert.equal(
    listAllocationsForApiKey("a").find((x) => x.poolId === id)?.allocation.lendingPercent,
    30
  );
});

test("a zero percentage clears the deadline", () => {
  setAllocationLending(id, "a", { lendingPercent: 0, lendingUntil: UNTIL });
  assert.deepEqual(lendingOf(id, "a"), { lendingPercent: 0, lendingUntil: null });
});

test("editing the pool keeps the consent of the keys that stay", () => {
  setAllocationLending(id, "a", { lendingPercent: 30, lendingUntil: UNTIL });
  updatePool(id, { name: "renamed", allocations: [alloc("a", 70), alloc("c", 30)] });
  assert.deepEqual(lendingOf(id, "a"), { lendingPercent: 30, lendingUntil: UNTIL });
  assert.deepEqual(lendingOf(id, "c"), { lendingPercent: 0, lendingUntil: null });
  assert.equal(lendingOf(id, "b"), null); // removed with its consent
  updatePool(id, { allocations: [alloc("a", 70), alloc("b", 30)] });
  assert.deepEqual(lendingOf(id, "b"), { lendingPercent: 0, lendingUntil: null }); // a returning key starts at zero
});

test("upsertAllocations keeps each pool's own consent", () => {
  const group = createGroup("g-lend");
  const p1 = createPool({
    connectionId: "c3",
    name: "lend-1",
    groupId: group.id,
    allocations: [alloc("a", 50), alloc("b", 50)],
  }).id;
  const p2 = createPool({
    connectionId: "c4",
    name: "lend-2",
    groupId: group.id,
    allocations: [alloc("a", 50), alloc("b", 50)],
  }).id;
  setAllocationLending(p1, "a", { lendingPercent: 30, lendingUntil: null });
  setAllocationLending(p2, "a", { lendingPercent: 60, lendingUntil: null });
  upsertAllocations(p1, [alloc("a", 40), alloc("b", 60)]);
  assert.equal(lendingOf(p1, "a")?.lendingPercent, 30);
  assert.equal(lendingOf(p2, "a")?.lendingPercent, 60);
});

test("ensurePool sees no change when only consent differs, and keeps it when weights change", () => {
  const group = createGroup("g-ens");
  const ensId = createPool({
    connectionId: "c9",
    name: "ens",
    groupId: group.id,
    allocations: [alloc("a", 50), alloc("b", 50)],
  }).id;
  setAllocationLending(ensId, "a", { lendingPercent: 30, lendingUntil: UNTIL });
  assert.equal(
    ensurePool({
      connectionId: "c9",
      name: "ens",
      groupId: group.id,
      allocations: [alloc("a", 50), alloc("b", 50)],
    }).updated,
    false
  );
  assert.equal(
    ensurePool({
      connectionId: "c9",
      name: "ens",
      groupId: group.id,
      allocations: [alloc("a", 60), alloc("b", 40)],
    }).updated,
    true
  );
  assert.deepEqual(lendingOf(ensId, "a"), { lendingPercent: 30, lendingUntil: UNTIL });
});

test("the borrow mode is saved by create and update, and an unknown stored value reads as saturation", () => {
  const p = createPool({
    connectionId: "c5",
    name: "mode",
    borrowMode: "consent",
    allocations: [],
  });
  assert.equal(getPool(p.id)?.borrowMode, "consent");
  assert.equal(updatePool(p.id, { name: "mode2" })?.borrowMode, "consent"); // untouched when absent
  assert.equal(updatePool(p.id, { borrowMode: "saturation" })?.borrowMode, "saturation");
  core
    .getDbInstance()
    .prepare("UPDATE quota_pools SET borrow_mode = 'other' WHERE id = ?")
    .run(p.id);
  assert.equal(getPool(p.id)?.borrowMode, "saturation");
  assert.deepEqual(["consent", "CONSENT", undefined, 1].map(normalizeBorrowMode), [
    "consent",
    "saturation",
    "saturation",
    "saturation",
  ]);
  assert.deepEqual(
    [30, 30.5, -1, 101, "30", null].map(normalizeLendingPercent),
    [30, 0, 0, 0, 0, 0]
  );
});

test("an unreadable stored deadline reads as expired through both readers, also after an edit", () => {
  const { activeLendingPercent, computeBorrowAvailable } = consentBorrow;
  const pool = createPool({
    connectionId: "c-text-until",
    name: "text-until",
    allocations: [alloc("a", 50), alloc("b", 50)],
  });
  // A damaged row: text where the deadline should be an epoch ms number.
  core
    .getDbInstance()
    .prepare(
      "UPDATE quota_allocations SET lending_percent = 50, lending_until = 'soon' WHERE pool_id = ? AND api_key_id = ?"
    )
    .run(pool.id, "b");
  const lendsNothing = () => {
    const viaLending = lendingOf(pool.id, "b");
    assert.equal(viaLending?.lendingPercent, 50);
    assert.notEqual(viaLending?.lendingUntil, null);
    assert.equal(activeLendingPercent(viaLending ?? {}, Date.now()), 0);
    const allocations = getPool(pool.id)?.allocations ?? [];
    const b = allocations.find((x) => x.apiKeyId === "b");
    assert.notEqual(b?.lendingUntil, undefined);
    assert.equal(activeLendingPercent(b ?? {}, Date.now()), 0);
    const borrow = computeBorrowAvailable({
      allocations,
      requesterKeyId: "a",
      limit: 1000,
      consumedByKey: { a: 600, b: 0 },
      nowMs: Date.now(),
    });
    assert.equal(borrow, 0);
  };
  lendsNothing();
  updatePool(pool.id, { name: "text-until-2", allocations: [alloc("a", 60), alloc("b", 40)] });
  lendsNothing();
  // A real null deadline still lends with no end.
  setAllocationLending(pool.id, "b", { lendingPercent: 50, lendingUntil: null });
  assert.deepEqual(lendingOf(pool.id, "b"), { lendingPercent: 50, lendingUntil: null });
  assert.equal(activeLendingPercent(lendingOf(pool.id, "b") ?? {}, Date.now()), 50);
});

test("lending fields in an admin allocation payload are never written", () => {
  const lent = (apiKeyId: string, weight: number) => ({
    ...alloc(apiKeyId, weight),
    lendingPercent: 90,
    lendingUntil: UNTIL,
  });
  const zero = { lendingPercent: 0, lendingUntil: null };
  const pool = createPool({
    connectionId: "c-payload",
    name: "payload",
    allocations: [lent("a", 50), lent("b", 50)],
  });
  assert.deepEqual([lendingOf(pool.id, "a"), lendingOf(pool.id, "b")], [zero, zero]);

  setAllocationLending(pool.id, "a", { lendingPercent: 30, lendingUntil: UNTIL + 1 });
  const kept = { lendingPercent: 30, lendingUntil: UNTIL + 1 };
  updatePool(pool.id, { allocations: [lent("a", 40), lent("b", 30), lent("c", 30)] });
  assert.deepEqual(
    [lendingOf(pool.id, "a"), lendingOf(pool.id, "b"), lendingOf(pool.id, "c")],
    [kept, zero, zero]
  );

  upsertAllocations(pool.id, [lent("a", 50), lent("d", 50)]);
  assert.deepEqual([lendingOf(pool.id, "a"), lendingOf(pool.id, "d")], [kept, zero]);
});

test("a stored deadline past the largest Date reads as expired through both readers", () => {
  const { activeLendingPercent } = consentBorrow;
  const pool = createPool({
    connectionId: "c-huge-until",
    name: "huge-until",
    allocations: [alloc("a", 50), alloc("b", 50)],
  });
  const store = (until: number) =>
    core
      .getDbInstance()
      .prepare(
        "UPDATE quota_allocations SET lending_percent = 50, lending_until = ? WHERE pool_id = ? AND api_key_id = ?"
      )
      .run(until, pool.id, "b");
  const readUntil = () => {
    const b = (getPool(pool.id)?.allocations ?? []).find((x) => x.apiKeyId === "b");
    return [lendingOf(pool.id, "b")?.lendingUntil, b?.lendingUntil];
  };
  store(8_640_000_000_000_001);
  assert.deepEqual(readUntil(), [0, 0]);
  assert.equal(activeLendingPercent(lendingOf(pool.id, "b") ?? {}, Date.now()), 0);
  store(8_640_000_000_000_000);
  assert.deepEqual(readUntil(), [8_640_000_000_000_000, 8_640_000_000_000_000]);
});
