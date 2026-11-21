/**
 * tests/unit/quota-self-view-members.test.ts
 *
 * Member usage slices in the self-service quota view. A pool option turns them on. They are sent
 * only for a pool of three or more keys, to a key that may see account data, and for a window
 * whose reading is available. A slice carries `slot`, `consumed` and `isYou` and nothing else.
 * Slot 1 is the asking key. The other slots come from a keyed hash per asking key and pool.
 */

import test, { mock } from "node:test";
import assert from "node:assert/strict";

import type { LedgerKey, LedgerSnapshot, LedgerState } from "../../src/lib/quota/types.ts";
import type { SelfQuotaResponse } from "../../src/shared/schemas/selfQuota.ts";
import type { QuotaSelfViewDeps, QuotaSelfViewInput } from "../../src/lib/quota/selfViewTypes.ts";
import { SELF_USAGE_SCOPE } from "../../src/shared/constants/selfServiceScopes.ts";
import {
  BOTH,
  PERCENT_PLAN,
  TEST_POOL_REF_SECRET,
  alloc,
  input,
  makeDeps,
} from "./fixtures/quotaSelfView.ts";
import type { MakeDepsOverrides } from "./fixtures/quotaSelfView.ts";

// The floor is read from the environment on every call: a value in the shell must not change
// the arithmetic below.
const savedFloor = process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;

// Server-side warnings of the view are captured: the view's modules build their logger on import.
const { logger } = await import("../../src/shared/utils/logger.ts");
const warnings: Array<{ obj: unknown; msg: unknown }> = [];
const realChild = logger.child.bind(logger);
mock.method(logger, "child", (...args: Parameters<typeof logger.child>) => {
  const child = realChild(...args);
  if ((args[0] as { module?: string })?.module === "quota:self-view") {
    (child as unknown as { warn: (obj: unknown, msg: unknown) => void }).warn = (obj, msg) => {
      warnings.push({ obj, msg });
    };
  }
  return child;
});

const { buildQuotaSelfView } = await import("../../src/lib/quota/selfView.ts");
const { buildMemberSlices } = await import("../../src/lib/quota/selfViewMembers.ts");

test.after(() => {
  if (savedFloor === undefined) delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
  else process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT = savedFloor;
});

/** The view's clock: the same instant as the fixture's `now`. */
const NOW = Date.parse("2026-05-27T15:30:00.000Z");
const S = TEST_POOL_REF_SECRET;

const THREE = [alloc("key-a", 50), alloc("key-b", 30), alloc("key-c", 20)];
const usage: Record<string, number> = { "key-a": 120, "key-b": 300, "key-c": 0 };

function near(a: number | null | undefined, b: number) {
  assert.ok(typeof a === "number" && Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);
}

function on(over: MakeDepsOverrides = {}): QuotaSelfViewDeps {
  return makeDeps({
    pool: { allocations: THREE },
    getPoolMemberBreakdown: () => true,
    store: { peek: async (id: string) => usage[id] },
    ...over,
  });
}

function view(deps: QuotaSelfViewDeps, over: Partial<QuotaSelfViewInput> = {}) {
  return buildQuotaSelfView(
    input({ apiKeyId: "key-a", scopes: BOTH, provider: "claude", ...over }),
    deps
  );
}

function ids(n: number): string[] {
  return Array.from({ length: n }, (_, i) => `k${String(i).padStart(2, "0")}`);
}

type SliceOver = { ids?: string[]; viewerApiKeyId?: string; poolId?: string; secret?: string };

/** Slices of `ids`, each one consuming the number of its own id, so a value tells whose it is. */
function slices(over: SliceOver = {}) {
  const result = buildMemberSlices({
    poolId: "p",
    viewerApiKeyId: "k00",
    secret: S,
    ...over,
    consumed: (over.ids ?? ids(20)).map((apiKeyId) => ({
      apiKeyId,
      consumed: Number(apiKeyId.slice(1)),
    })),
  });
  assert.ok(result, "slices expected");
  return result;
}

/** The ids of the other members, in slot order. */
function order(over: SliceOver = {}): string[] {
  return slices(over)
    .filter((s) => !s.isYou)
    .map((s) => "k" + String(s.consumed).padStart(2, "0"));
}

function state(over: Partial<LedgerState> = {}): LedgerState {
  return {
    rev: 1,
    last: 0.6,
    baseline: 0,
    resetAt: NOW + 3_600_000,
    readAt: NOW - 60_000,
    updatedAt: NOW - 60_000,
    keys: {
      "key-a": { startTokens: 0 },
      "key-b": { startTokens: 0 },
      "key-c": { startTokens: 0 },
    },
    ...over,
  };
}

function counters(a: number, b: number, c: number): LedgerSnapshot["counters"] {
  const at = NOW - 120_000;
  return {
    "key-a": { tokens: a, updatedAt: at },
    "key-b": { tokens: b, updatedAt: at },
    "key-c": { tokens: c, updatedAt: at },
  };
}

/** A store whose book reads answer by connection and are recorded. */
function ledger(byConnection: Record<string, LedgerSnapshot>) {
  const read: LedgerKey[] = [];
  return {
    read,
    peek: async () => 120,
    poolConsumedTotal: async () => 400,
    ledgerRead: async (key: LedgerKey): Promise<LedgerSnapshot> => {
      read.push(key);
      return byConnection[key.connectionId] ?? { state: null, counters: {} };
    },
  };
}

const BOOK = { state: state(), counters: counters(900_000, 100_000, 0) };
const book = ledger({ "conn-secret-1": BOOK });
const idleBook = ledger({
  "conn-secret-1": { state: state({ baseline: 0.3 }), counters: counters(0, 0, 0) },
});
const emptyLedger = ledger({});
const bookOnBoth = ledger({ "conn-secret-1": BOOK, "conn-secret-2": BOOK });

/** Every id or name of another member, or of the pool and its accounts, the wire must not carry. */
const NEVER_SENT = ["key-b", "key-c", "pool-a-id", "pool-b-id", "group-pool", "conn-secret-1"];

function assertNothingLeaks(v: SelfQuotaResponse) {
  const wire = JSON.stringify(v);
  for (const leaked of NEVER_SENT) assert.equal(wire.includes(leaked), false, leaked);
}

test("the viewer is slot 1 and the others take 2 to n once each", () => {
  const six = slices({ viewerApiKeyId: "k03", ids: ids(6) });
  assert.deepEqual(
    six.map((s) => s.slot),
    [1, 2, 3, 4, 5, 6]
  );
  assert.deepEqual(six[0], { slot: 1, consumed: 3, isYou: true });
  assert.equal(six.filter((s) => s.isYou).length, 1);
});

test("slots depend on the secret, the pool and the viewer, not on the order the keys are listed", () => {
  assert.deepEqual(order({ ids: [...ids(20)].reverse() }), order({}));
  assert.deepEqual(order({}), order({})); // same request twice
  assert.notDeepEqual(order({}), ids(20).slice(1)); // not the id order, nor ascending use
  assert.notDeepEqual(order({}), ids(20).slice(1).reverse()); // nor descending use
  assert.notDeepEqual(order({ secret: S + "x" }), order({}));
  assert.notDeepEqual(order({ poolId: "q" }), order({}));
  const common = (list: string[]) => list.filter((id) => id !== "k00" && id !== "k01");
  assert.notDeepEqual(common(order({ viewerApiKeyId: "k01" })), common(order({})));
});

test("the others keep their relative order when a key leaves", () => {
  const full = order({ ids: ids(8) });
  assert.deepEqual(
    order({ ids: ids(8).filter((id) => id !== "k05") }),
    full.filter((id) => id !== "k05")
  );
});

test("a slice carries consumed, isYou and slot, and nothing else", () => {
  const built = buildMemberSlices({
    poolId: "p",
    viewerApiKeyId: "a",
    secret: S,
    consumed: [
      { apiKeyId: "a", consumed: 1 },
      { apiKeyId: "b", consumed: 2 },
      { apiKeyId: "c", consumed: 0 },
    ],
  });
  assert.ok(built);
  assert.deepEqual(
    built.map((s) => Object.keys(s).sort()),
    Array(3).fill(["consumed", "isYou", "slot"])
  );
  assert.deepEqual(
    built.map((s) => s.slot),
    [1, 2, 3]
  );
  assert.deepEqual(
    built.filter((s) => s.isYou),
    [{ slot: 1, consumed: 1, isYou: true }]
  );
});

test("fewer than three distinct keys, or one unread value, gives no slices", () => {
  const row = (apiKeyId: string, consumed: number | null) => ({ apiKeyId, consumed });
  const build = (consumed: Array<{ apiKeyId: string; consumed: number | null }>) =>
    buildMemberSlices({ poolId: "p", viewerApiKeyId: "a", secret: S, consumed });
  assert.equal(build([row("a", 1), row("b", 2)]), undefined);
  assert.equal(build([row("a", 1), row("b", 2), row("b", 3)]), undefined);
  for (const bad of [null, Number.NaN, -1, Number.POSITIVE_INFINITY]) {
    assert.equal(build([row("a", 1), row("b", bad), row("c", 0)]), undefined);
  }
  // The asking key must be one of the members.
  assert.equal(build([row("b", 1), row("c", 2), row("d", 0)]), undefined);
});

test("an empty secret is refused", () => {
  assert.throws(() =>
    buildMemberSlices({
      poolId: "p",
      viewerApiKeyId: "a",
      secret: "",
      consumed: ["a", "b", "c"].map((apiKeyId) => ({ apiKeyId, consumed: 0 })),
    })
  );
});

test("with the option on, a countable window lists every member's use", async () => {
  const v = await view(on());
  const dim = v.pools[0].dimensions[0];
  assert.ok(dim.members);
  assert.deepEqual(
    dim.members.map((m) => m.consumed).sort((a, b) => a - b),
    [0, 120, 300]
  );
  assert.equal(dim.members.find((m) => m.isYou)?.consumed, dim.yourShare.consumed);
  assertNothingLeaks(v);
});

test("the slices are in slot order, the same for the same key on every request", async () => {
  const first = (await view(on())).pools[0].dimensions[0].members;
  const again = (await view(on())).pools[0].dimensions[0].members;
  assert.ok(first);
  assert.deepEqual(
    first.map((m) => m.slot),
    [1, 2, 3]
  );
  assert.deepEqual(again, first);
});

test("one slice per allocated key, and a member with no use is a real zero", async () => {
  const dim = (await view(on())).pools[0].dimensions[0];
  assert.equal(dim.members?.length, THREE.length);
  assert.equal(dim.members?.filter((m) => m.consumed === 0).length, 1);
});

test("the option is off by default and then nothing is sent", async () => {
  const v = await view(on({ getPoolMemberBreakdown: () => false }));
  assert.equal(JSON.stringify(v).includes('"members"'), false);
  const plain = await view(makeDeps({ pool: { allocations: THREE } }));
  assert.equal(JSON.stringify(plain).includes('"members"'), false);
});

test("a key that may not see account data gets no member slices", async () => {
  const v = await view(on(), { scopes: [SELF_USAGE_SCOPE] });
  assert.equal(JSON.stringify(v).includes('"members"'), false);
  assert.equal(v.pools[0].dimensions[0].total, undefined);
});

test("a pool that shrinks to two keys stops sending slices", async () => {
  let allocations = THREE;
  const deps = on();
  const getPool = deps.getPool!;
  deps.getPool = (id) => {
    const found = getPool(id);
    return found ? { ...found, allocations } : null;
  };
  assert.equal((await view(deps)).pools[0].dimensions[0].members?.length, 3);
  allocations = THREE.slice(0, 2);
  const shrunk = (await view(deps)).pools[0].dimensions[0];
  assert.equal(shrunk.members, undefined);
  assert.equal("members" in shrunk, false);
});

test("one member that cannot be read hides the whole bar, and the share stays", async () => {
  const v = await view(
    on({
      store: {
        peek: async (id: string) => {
          if (id === "key-c") throw new Error("down");
          return usage[id];
        },
      },
    })
  );
  assert.equal(v.pools[0].dimensions[0].members, undefined);
  assert.equal(v.pools[0].dimensions[0].yourShare.consumed, 120);
});

test("an unread share has no member slices", async () => {
  const v = await view(
    on({
      store: {
        peek: async () => {
          throw new Error("down");
        },
      },
    })
  );
  assert.equal(v.pools[0].dimensions[0].yourShare.status, "unavailable");
  assert.equal(v.pools[0].dimensions[0].members, undefined);
});

test("a countable window costs one more read per other member, all in parallel", async () => {
  const calls: Record<string, string[]> = {};
  let inFlight = 0;
  let most = 0;
  const peek = async (id: string, dim: { poolId: string }) => {
    (calls[dim.poolId] ??= []).push(id);
    inFlight += 1;
    most = Math.max(most, inFlight);
    await new Promise((resolve) => setTimeout(resolve, 5));
    inFlight -= 1;
    return usage[id];
  };
  const v = await view(on({ store: { peek } }));
  // Two claude pools, one countable window each: the share read, then the two other members.
  assert.equal(v.pools.length, 2);
  for (const poolId of ["pool-a-id", "pool-b-id"]) {
    assert.deepEqual([...calls[poolId]].sort(), ["key-a", "key-b", "key-c"]);
  }
  assert.ok(most >= 2, `member reads overlap (most in flight: ${most})`);
  const off: Record<string, number> = {};
  await view(
    on({
      getPoolMemberBreakdown: () => false,
      store: {
        peek: async (_id: string, dim: { poolId: string }) =>
          (off[dim.poolId] = 1 + (off[dim.poolId] ?? 0)),
      },
    })
  );
  assert.deepEqual(off, { "pool-a-id": 1, "pool-b-id": 1 });
});

test("a percent window lists the part each member routed", async () => {
  const v = await view(on({ plan: PERCENT_PLAN, getQuotaStore: async () => book }));
  const dim = v.pools[0].accounts[0].dimensions[0];
  assert.ok(dim.members);
  const sorted = dim.members.map((m) => m.consumed).sort((a, b) => a - b);
  near(sorted[0], 0);
  near(sorted[1], 6);
  near(sorted[2], 54);
  near(dim.members.find((m) => m.isYou)?.consumed, dim.yourShare.attributed ?? NaN);
  assertNothingLeaks(v);
});

test("a percent window costs no read beyond the share's book read", async () => {
  const store = ledger({ "conn-secret-1": BOOK });
  const v = await view(on({ plan: PERCENT_PLAN, getQuotaStore: async () => store }));
  assert.equal(v.pools[0].accounts[0].dimensions[0].members?.length, 3);
  assert.equal(store.read.length, v.pools.length * 2); // two windows, one account per pool
});

test("an idle percent pool sends zero slices while the share carries the external charge", async () => {
  const v = await view(on({ plan: PERCENT_PLAN, getQuotaStore: async () => idleBook }));
  const dim = v.pools[0].accounts[0].dimensions[0];
  assert.deepEqual(
    dim.members?.map((m) => m.consumed),
    [0, 0, 0]
  );
  near(dim.yourShare.external, 30);
  near(dim.yourShare.attributed, 0);
});

test("a percent window without a usable book, or on an account hidden from the key, has no slices", async () => {
  const none = (await view(on({ plan: PERCENT_PLAN, getQuotaStore: async () => emptyLedger })))
    .pools[0].accounts[0].dimensions[0];
  assert.equal(none.members, undefined);
  const hidden = await view(
    on({
      plan: PERCENT_PLAN,
      pool: { allocations: THREE, connectionIds: ["conn-secret-1", "conn-secret-2"] },
      getQuotaStore: async () => bookOnBoth,
    }),
    { allowedConnections: ["conn-secret-1"] }
  );
  assert.equal(hidden.pools[0].accounts[1].dimensions[0].members, undefined);
  assert.equal(hidden.pools[0].accounts[0].dimensions[0].members?.length, 3);
});

test("a percent window sends no slices to a key without account data", async () => {
  const v = await view(on({ plan: PERCENT_PLAN, getQuotaStore: async () => book }), {
    scopes: [SELF_USAGE_SCOPE],
  });
  near(v.pools[0].accounts[0].dimensions[0].yourShare.consumed, 54);
  assert.equal(JSON.stringify(v).includes('"members"'), false);
});

// ── Usable keys, ceiling, failing reads, two holders ────────────────────────

const FOUR = [...THREE, alloc("key-d", 10)];

test("the floor counts keys that can make requests, read once per pool at the view's instant", async () => {
  const asked: Array<[string, number]> = [];
  const count = (n: number) => (poolId: string, nowMs: number) => {
    asked.push([poolId, nowMs]);
    return n;
  };
  const two = await view(on({ countUsablePoolKeys: count(2) }));
  assert.equal(JSON.stringify(two).includes('"members"'), false);
  assert.deepEqual(asked.sort(), [
    ["pool-a-id", NOW],
    ["pool-b-id", NOW],
  ]);
  asked.length = 0;
  const dim = (await view(on({ countUsablePoolKeys: count(3) }))).pools[0].dimensions[0];
  assert.equal(dim.members?.length, 3);
});

test("three usable keys and a dead one give four slices", async () => {
  const use: Record<string, number> = { ...usage, "key-d": 7 };
  const v = await view(
    on({
      pool: { allocations: FOUR },
      countUsablePoolKeys: () => 3,
      store: { peek: async (id: string) => use[id] },
    })
  );
  const members = v.pools[0].dimensions[0].members;
  assert.deepEqual(
    members?.map((m) => m.consumed).sort((a, b) => a - b),
    [0, 7, 120, 300]
  );
});

test("the usable-key count is not read when the option is off or account data is hidden", async () => {
  let reads = 0;
  const counted = () => {
    reads += 1;
    return 3;
  };
  await view(on({ getPoolMemberBreakdown: () => false, countUsablePoolKeys: counted }));
  await view(on({ countUsablePoolKeys: counted }), { scopes: [SELF_USAGE_SCOPE] });
  assert.equal(reads, 0);
});

function many(n: number) {
  const keys = ["key-a", ...Array.from({ length: n - 1 }, (_, i) => `member-${i + 1}`)];
  return keys.map((id) => alloc(id, 1));
}

test("the bars exist for at most 20 allocated keys, in a countable window", async () => {
  const countable = (n: number) =>
    view(on({ pool: { allocations: many(n) }, store: { peek: async () => 1 } }));
  assert.equal((await countable(20)).pools[0].dimensions[0].members?.length, 20);
  const over = await countable(21);
  assert.equal(JSON.stringify(over).includes('"members"'), false);
  assert.equal(over.pools[0].dimensions[0].yourShare.consumed, 1);
});

test("the bars exist for at most 20 allocated keys, in a percent window", async () => {
  const percent = (n: number) =>
    view(
      on({ plan: PERCENT_PLAN, pool: { allocations: many(n) }, getQuotaStore: async () => book })
    );
  assert.equal((await percent(20)).pools[0].accounts[0].dimensions[0].members?.length, 20);
  const over = await percent(21);
  assert.equal(JSON.stringify(over).includes('"members"'), false);
  assert.equal(over.pools[0].accounts[0].dimensions[0].yourShare.status, "stale");
});

test("a failing read of the option or of the usable keys counts as off and is logged", async () => {
  const failing: MakeDepsOverrides[] = [
    {
      getPoolMemberBreakdown: () => {
        throw new Error("db down");
      },
    },
    {
      countUsablePoolKeys: () => {
        throw new Error("db down");
      },
    },
  ];
  for (const over of failing) {
    warnings.length = 0;
    const v = await view(on(over));
    assert.equal(v.pools.length, 2);
    assert.equal(v.pools[0].dimensions[0].yourShare.consumed, 120);
    assert.equal(JSON.stringify(v).includes('"members"'), false);
    const logged = warnings.map((w) => (w.obj as { poolId?: string }).poolId).sort();
    assert.deepEqual(logged, ["pool-a-id", "pool-b-id"]);
    for (const w of warnings) {
      const err = (w.obj as { err?: unknown }).err;
      assert.ok(err instanceof Error, "the error object is logged, so its stack is kept");
      assert.equal(err.message, "db down");
      assert.deepEqual(Object.keys(w.obj as object).sort(), ["err", "poolId"]);
    }
  }
});

test("two holders of the same pool get the same values in different slot orders", async () => {
  const keys = ["key-a", "key-b", ...Array.from({ length: 10 }, (_, i) => `member-${i + 1}`)];
  // Each member's use is unique, so the order of the values names the order of the members.
  const use = Object.fromEntries(keys.map((id, i) => [id, (i + 1) * 10]));
  const deps = on({
    pool: { allocations: keys.map((id) => alloc(id, 1)) },
    store: { peek: async (id: string) => use[id] },
  });
  const as = async (apiKeyId: string) =>
    (await view(deps, { apiKeyId })).pools[0].dimensions[0].members ?? [];
  const forA = await as("key-a");
  const forB = await as("key-b");
  for (const [members, own] of [
    [forA, use["key-a"]],
    [forB, use["key-b"]],
  ] as const) {
    assert.equal(members.length, keys.length);
    assert.deepEqual(
      members.filter((m) => m.isYou),
      [{ slot: 1, consumed: own, isYou: true }]
    );
    assert.equal(members[0].isYou, true);
  }
  const shared = (members: typeof forA) =>
    members
      .map((m) => m.consumed)
      .filter((value) => value !== use["key-a"] && value !== use["key-b"]);
  assert.equal(shared(forA).length, 10);
  assert.deepEqual([...shared(forA)].sort(), [...shared(forB)].sort());
  assert.notDeepEqual(shared(forA), shared(forB));
});
