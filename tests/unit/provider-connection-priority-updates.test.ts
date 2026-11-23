import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildPriorityUpdates,
  buildSwapPriorityUpdates,
  persistPriorityUpdates,
  sortConnectionsByAvailability,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/connectionRowHelpers";
import { updateProviderConnectionSchema } from "../../src/shared/validation/schemas/provider";

// Connection reorder writes go through PUT /api/providers/:id, whose body is
// validated by `updateProviderConnectionSchema` (`priority` is an integer >= 1).
// Before this fix the ▲/▼ swap wrote `priority ± 0.5` on tied rows and
// "Reorder by availability" wrote 0-based indices (first row → priority 0):
// both are rejected with a 400 that nobody checked, so the saved order silently
// diverged from the requested one.

type Row = { id: string; priority: number; updatedAt?: string };

function rows(priorities: number[]): Row[] {
  return priorities.map((priority, i) => ({
    id: `c${i}`,
    priority,
    updatedAt: new Date(2026, 0, i + 1).toISOString(),
  }));
}

function assertSchemaAccepts(updates: { id: string; priority: number }[]) {
  for (const update of updates) {
    const parsed = updateProviderConnectionSchema.safeParse({ priority: update.priority });
    assert.equal(parsed.success, true, `priority ${update.priority} must pass the PUT schema`);
  }
}

// Mirrors the server read order: priority ASC, ties broken by updated_at DESC
// (src/lib/db/providers/deletion.ts::reorderConnections).
function serverOrder(current: Row[], updates: { id: string; priority: number }[]): string[] {
  const byId = new Map(updates.map((u) => [u.id, u.priority]));
  let clock = 0;
  const db = current.map((row) => {
    if (!byId.has(row.id)) return { ...row };
    clock += 1;
    return {
      ...row,
      priority: byId.get(row.id) as number,
      updatedAt: new Date(2026, 5, 1, 0, 0, 0, clock).toISOString(),
    };
  });
  return db
    .sort((a, b) => {
      const diff = a.priority - b.priority;
      if (diff !== 0) return diff;
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    })
    .map((row) => row.id);
}

test("buildPriorityUpdates emits 1-based integer positions that pass the PUT schema", () => {
  for (const shape of [
    [1, 2, 3],
    [1, 3, 1],
    [2, 2, 2, 2],
    [0, 1, 2],
    [7, 7, 1, 1, 4, 4],
  ]) {
    const next = rows(shape);
    const updates = buildPriorityUpdates(next);
    assertSchemaAccepts(updates);
    for (const update of updates) {
      assert.ok(Number.isInteger(update.priority) && update.priority >= 1);
    }
    assert.deepEqual(
      serverOrder(next, updates),
      next.map((row) => row.id)
    );
  }
});

test("buildPriorityUpdates writes only rows not already at their final position", () => {
  assert.deepEqual(buildPriorityUpdates(rows([1, 2, 3])), []);
  assert.deepEqual(buildPriorityUpdates(rows([1, 2, 2, 10])), [
    { id: "c2", priority: 3 },
    { id: "c3", priority: 4 },
  ]);
});

test("reorder-by-availability payload starts at priority 1 (was 0-based → 400 on the first row)", () => {
  const connections = [
    { id: "down", priority: 1, testStatus: "error" },
    { id: "up-1", priority: 2, testStatus: "active" },
    { id: "up-2", priority: 3, testStatus: "success" },
  ];
  const sorted = sortConnectionsByAvailability(connections);
  const updates = buildPriorityUpdates(sorted);

  assert.deepEqual(updates, [
    { id: "up-1", priority: 1 },
    { id: "up-2", priority: 2 },
    { id: "down", priority: 3 },
  ]);
  assertSchemaAccepts(updates);
});

test("buildSwapPriorityUpdates swaps stored values when priorities differ (keeps operator gaps)", () => {
  const [a, b, c] = rows([10, 20, 30]);
  const updates = buildSwapPriorityUpdates([a, b, c], b, a);

  assert.deepEqual(updates, [
    { id: "c1", priority: 10 },
    { id: "c0", priority: 20 },
  ]);
  assertSchemaAccepts(updates);
});

test("buildSwapPriorityUpdates on tied priorities writes valid integers and lands the move", () => {
  const current = rows([2, 2]);
  const [a, b] = current;

  // Moving b up (b was rendered after a).
  const up = buildSwapPriorityUpdates(current, b, a);
  assertSchemaAccepts(up);
  assert.deepEqual(serverOrder(current, up), ["c1", "c0"]);

  // Moving a down.
  const down = buildSwapPriorityUpdates(current, a, b);
  assertSchemaAccepts(down);
  assert.deepEqual(serverOrder(current, down), ["c1", "c0"]);
});

test("buildSwapPriorityUpdates on a tie inside a larger list only reorders the swapped pair", () => {
  const current = rows([1, 3, 3, 4]);
  const updates = buildSwapPriorityUpdates(current, current[2], current[1]);

  assertSchemaAccepts(updates);
  assert.deepEqual(serverOrder(current, updates), ["c0", "c2", "c1", "c3"]);
});

test("persistPriorityUpdates sends PUTs sequentially and throws on the first non-OK response", async () => {
  const calls: { url: string; body: unknown }[] = [];
  const fetchImpl = async (url: string, init?: { body?: string }) => {
    calls.push({ url, body: JSON.parse(String(init?.body)) });
    return { ok: calls.length !== 2, status: calls.length !== 2 ? 200 : 400 };
  };

  await assert.rejects(
    persistPriorityUpdates(
      [
        { id: "a", priority: 1 },
        { id: "b", priority: 2 },
        { id: "c", priority: 3 },
      ],
      fetchImpl
    ),
    /400/
  );
  assert.deepEqual(calls, [
    { url: "/api/providers/a", body: { priority: 1 } },
    { url: "/api/providers/b", body: { priority: 2 } },
  ]);
});
