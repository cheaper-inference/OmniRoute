import test from "node:test";
import assert from "node:assert/strict";

const { orderConnectionsForSelection } =
  await import("../../src/sse/services/connectionSelectionOrder.ts");
const oauthOccupancy = await import("../../open-sse/services/oauthSessionOccupancy.ts");

type Row = { id: string; provider: string; authType: "apikey" | "oauth"; priority: number };

const row = (id: string, provider: string, authType: Row["authType"], priority: number): Row => ({
  id,
  provider,
  authType,
  priority,
});
const ids = (rows: Row[]) => rows.map((r) => r.id);
const POOL = ["requested", "alias"];

test.beforeEach(() => {
  oauthOccupancy._clearOAuthSessionOccupancyForTest();
});

test("the requested id ranks before its aliases, then priority within each id", () => {
  const pool = [
    row("alias-oauth-1", "alias", "oauth", 1),
    row("requested-oauth-2", "requested", "oauth", 2),
    row("unknown-key-1", "unknown", "apikey", 1),
    row("alias-key-2", "alias", "apikey", 2),
    row("requested-key-1", "requested", "apikey", 1),
  ];

  assert.deepEqual(ids(orderConnectionsForSelection(pool, POOL)), [
    "requested-key-1",
    "requested-oauth-2",
    "alias-oauth-1",
    "alias-key-2",
    "unknown-key-1",
  ]);
  assert.deepEqual(
    ids(pool),
    ["alias-oauth-1", "requested-oauth-2", "unknown-key-1", "alias-key-2", "requested-key-1"],
    "the input is not mutated"
  );
});

test("a missing priority sorts as 999", () => {
  const pool = [
    row("alias-oauth-1", "alias", "oauth", 1),
    { ...row("requested-oauth-none", "requested", "oauth", 0), priority: null },
    row("requested-key-0", "requested", "apikey", 0),
    row("requested-oauth-3", "requested", "oauth", 3),
  ] as unknown as Row[];

  assert.deepEqual(ids(orderConnectionsForSelection(pool, POOL)), [
    "requested-oauth-3",
    "requested-oauth-none",
    "requested-key-0",
    "alias-oauth-1",
  ]);
});

test("OAuth accounts of one id and priority take the OAuth places in availability order", () => {
  const release = oauthOccupancy.reserveOAuthSession("oauth-busy", "foreign-session", 60_000);
  try {
    const pool = [
      row("alias-oauth-idle", "alias", "oauth", 1),
      row("oauth-busy", "requested", "oauth", 1),
      row("key", "requested", "apikey", 1),
      row("oauth-idle", "requested", "oauth", 1),
    ];
    assert.deepEqual(ids(orderConnectionsForSelection(pool, POOL, "my-session")), [
      "oauth-idle",
      "key",
      "oauth-busy",
      "alias-oauth-idle",
    ]);
    // The caller's own session does not count against an account.
    assert.deepEqual(ids(orderConnectionsForSelection(pool, POOL, "foreign-session")), [
      "oauth-busy",
      "key",
      "oauth-idle",
      "alias-oauth-idle",
    ]);
  } finally {
    release();
  }
});

test("availability does not move an OAuth account across ids or priorities", () => {
  const release = oauthOccupancy.reserveOAuthSession("requested-busy-1", "foreign-session", 60_000);
  try {
    const pool = [
      row("alias-idle-1", "alias", "oauth", 1),
      row("requested-busy-1", "requested", "oauth", 1),
      row("requested-idle-2", "requested", "oauth", 2),
    ];
    assert.deepEqual(ids(orderConnectionsForSelection(pool, POOL, "my-session")), [
      "requested-busy-1",
      "requested-idle-2",
      "alias-idle-1",
    ]);
  } finally {
    release();
  }
});

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items];
  return items.flatMap((item, i) =>
    permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest])
  );
}

test("the order depends only on pool order within each id and priority, not on arrival order", () => {
  const release = oauthOccupancy.reserveOAuthSession("oauth-1-busy", "foreign-session", 60_000);
  try {
    const pool = [
      row("oauth-1-busy", "requested", "oauth", 1),
      row("key-1", "requested", "apikey", 1),
      row("oauth-1-idle", "requested", "oauth", 1),
      row("key-2", "requested", "apikey", 2),
      row("alias-oauth-1", "alias", "oauth", 1),
      row("alias-key-1", "alias", "apikey", 1),
    ];
    const expected = [
      "oauth-1-idle",
      "key-1",
      "oauth-1-busy",
      "key-2",
      "alias-oauth-1",
      "alias-key-1",
    ];
    const sameGroup = (a: Row, b: Row) => a.provider === b.provider && a.priority === b.priority;
    const keepsGroupsInPoolOrder = (candidate: Row[]) =>
      candidate.every((r, i) =>
        candidate
          .slice(i + 1)
          .every((later) => !sameGroup(r, later) || pool.indexOf(later) > pool.indexOf(r))
      );

    const arrivals = permutations(pool).filter(keepsGroupsInPoolOrder);
    assert.equal(arrivals.length, 60);
    for (const arrival of arrivals) {
      assert.deepEqual(ids(orderConnectionsForSelection(arrival, POOL, "my-session")), expected);
    }
  } finally {
    release();
  }
});
