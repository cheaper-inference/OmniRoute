/**
 * tests/unit/quota-self-view-percent.test.ts
 *
 * The key's own part of a percent plan window in the self-service quota view, read from the
 * attribution book without writing it. Every state of the book has its own status and reason,
 * and none of them is shown as zero.
 */

import test from "node:test";
import assert from "node:assert/strict";

import type { LedgerKey, LedgerSnapshot, LedgerState } from "../../src/lib/quota/types.ts";
import type { SelfQuotaResponse, SelfQuotaShare } from "../../src/shared/schemas/selfQuota.ts";
import { SELF_USAGE_SCOPE } from "../../src/shared/constants/selfServiceScopes.ts";
import { BOTH, PERCENT_PLAN, ctx, input, makeDeps } from "./fixtures/quotaSelfView.ts";
import type { MakeDepsOverrides } from "./fixtures/quotaSelfView.ts";

// The floor is read from the environment on every call: a value in the shell must not change
// the arithmetic below.
const savedFloor = process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;

const { buildQuotaSelfView } = await import("../../src/lib/quota/selfView.ts");
const { buildSelfViewAccounts } = await import("../../src/lib/quota/selfViewAccounts.ts");

test.after(() => {
  if (savedFloor === undefined) delete process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT;
  else process.env.QUOTA_PERCENT_MIN_TOKENS_PER_POINT = savedFloor;
});

/** The view's clock: the same instant as the fixture's `now`. */
const NOW = Date.parse("2026-05-27T15:30:00.000Z");

function near(a: number | null | undefined, b: number) {
  assert.ok(typeof a === "number" && Math.abs(a - b) < 1e-6, `${a} ≈ ${b}`);
}

function state(over: Partial<LedgerState> = {}): LedgerState {
  return {
    rev: 1,
    last: 0.6,
    baseline: 0,
    resetAt: NOW + 3_600_000,
    readAt: NOW - 60_000,
    updatedAt: NOW - 60_000,
    keys: { "key-a": { startTokens: 0 }, "key-b": { startTokens: 0 } },
    ...over,
  };
}

function counters(a: number, b: number): LedgerSnapshot["counters"] {
  return {
    "key-a": { tokens: a, updatedAt: NOW - 120_000 },
    "key-b": { tokens: b, updatedAt: NOW - 120_000 },
  };
}

/** A store whose book reads answer by connection and are recorded; writes fail the test. */
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
    ledgerCommit: async (): Promise<boolean> => assert.fail("the view must not write the book"),
    ledgerRecordTokens: async (): Promise<void> => assert.fail("the view must not record tokens"),
  };
}

function view(over: MakeDepsOverrides = {}) {
  return buildQuotaSelfView(
    input({ apiKeyId: "key-a", scopes: BOTH, provider: "claude" }),
    makeDeps({ plan: PERCENT_PLAN, ...over })
  );
}

function share(v: SelfQuotaResponse, account = 0): SelfQuotaShare {
  return v.pools[0].accounts[account].dimensions[0].yourShare;
}

test("a usable book gives the share its numbers, stale without a fresh reading", async () => {
  const s = share(
    await view({
      getQuotaStore: async () =>
        ledger({ "conn-secret-1": { state: state(), counters: counters(900_000, 100_000) } }),
    })
  );
  assert.equal(s.status, "stale");
  assert.equal(s.fairShare, 50);
  near(s.consumed, 54);
  near(s.attributed, 54);
  near(s.external, 0);
  near(s.remaining, 0);
});

test("a reading still in the gate's cache confirms the share", async () => {
  const s = share(
    await view({
      getQuotaStore: async () =>
        ledger({ "conn-secret-1": { state: state(), counters: counters(900_000, 100_000) } }),
      peekPlanWindowReading: () => ({
        used: 0.7,
        resetAt: NOW + 3_600_000,
        fetchedAt: NOW - 1_000,
      }),
    })
  );
  assert.equal(s.status, "ok");
  near(s.consumed, 63);
});

test("no book is unavailable, never zero", async () => {
  assert.deepEqual(share(await view({ getQuotaStore: async () => ledger({}) })), {
    fairShare: 50,
    consumed: null,
    remaining: null,
    status: "unavailable",
    reason: "percent_attribution_unavailable",
  });
});

test("a book whose window ended is unavailable", async () => {
  const s = share(
    await view({
      getQuotaStore: async () =>
        ledger({
          "conn-secret-1": { state: state({ resetAt: NOW - 1 }), counters: counters(1, 1) },
        }),
    })
  );
  assert.deepEqual([s.status, s.reason, s.consumed], ["unavailable", "percent_window_ended", null]);
});

test("a store that throws, is missing or has no book reader is unavailable", async () => {
  const broken = {
    ...ledger({}),
    ledgerRead: async (): Promise<LedgerSnapshot> => {
      throw new Error("down");
    },
  };
  const stores: Array<NonNullable<MakeDepsOverrides["getQuotaStore"]>> = [
    async () => broken,
    async () => {
      throw new Error("no store");
    },
    async () => ({ peek: async () => 0, poolConsumedTotal: async () => 0 }),
  ];
  for (const getQuotaStore of stores) {
    const s = share(await view({ getQuotaStore }));
    assert.deepEqual(
      [s.status, s.reason, s.consumed, s.remaining],
      ["unavailable", "store_unavailable", null, null]
    );
  }
});

test("the external charge is part of consumed and reported apart", async () => {
  const snap = {
    "conn-secret-1": { state: state({ baseline: 0.3 }), counters: counters(10_000, 0) },
  };
  const s = share(await view({ getQuotaStore: async () => ledger(snap) }));
  near(s.attributed, 10);
  near(s.external, 25);
  near(s.consumed, 35);
  near(s.remaining, 15);
});

test("each account of a pool reads its own book with the limit of one account", async () => {
  const v = await view({
    pool: { connectionIds: ["conn-secret-1", "conn-secret-2"] },
    getQuotaStore: async () =>
      ledger({ "conn-secret-1": { state: state(), counters: counters(900_000, 100_000) } }),
  });
  near(share(v, 0).consumed, 54);
  assert.equal(share(v, 0).fairShare, 50);
  assert.equal(share(v, 1).reason, "percent_attribution_unavailable");
  assert.equal(share(v, 1).fairShare, 50);
});

test("an account the key may not use says so and is not read", async () => {
  const store = ledger({});
  const v = await buildQuotaSelfView(
    input({
      apiKeyId: "key-a",
      scopes: BOTH,
      provider: "claude",
      allowedConnections: ["conn-secret-1"],
    }),
    makeDeps({
      plan: PERCENT_PLAN,
      pool: { connectionIds: ["conn-secret-1", "conn-secret-2"] },
      getQuotaStore: async () => store,
    })
  );
  assert.equal(share(v, 1).reason, "account_not_used_by_key");
  assert.ok(store.read.length > 0);
  assert.ok(store.read.every((k) => k.connectionId === "conn-secret-1"));
});

test("one book read per account and window, for each pool", async () => {
  const store = ledger({});
  const v = await view({ getQuotaStore: async () => store });
  assert.equal(store.read.length, v.pools.length * 2); // PERCENT_PLAN has two windows, one account per pool
});

test("the share needs self:usage only, and no account bar leaks with it", async () => {
  const v = await buildQuotaSelfView(
    input({ apiKeyId: "key-a", scopes: [SELF_USAGE_SCOPE], provider: "claude" }),
    makeDeps({
      plan: PERCENT_PLAN,
      getQuotaStore: async () =>
        ledger({ "conn-secret-1": { state: state(), counters: counters(900_000, 100_000) } }),
    })
  );
  near(share(v).consumed, 54);
  assert.equal(v.pools[0].accounts[0].dimensions[0].account, undefined);
});

test("the builder without attribution keeps the unread share", () => {
  const [account] = buildSelfViewAccounts(ctx(), null, NOW);
  assert.equal(account.dimensions[0].yourShare.reason, "percent_attribution_unavailable");
});
