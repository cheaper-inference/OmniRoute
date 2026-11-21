import test from "node:test";
import assert from "node:assert/strict";

import { buildQuotaSelfView } from "../../src/lib/quota/selfView.ts";
import { buildSelfViewAccounts } from "../../src/lib/quota/selfViewAccounts.ts";
import type { ProviderPlan } from "../../src/lib/quota/dimensions.ts";
import { BOTH, PERCENT_PLAN, ctx, input, makeDeps } from "./fixtures/quotaSelfView.ts";

const R1 = "2026-05-27T18:00:00.000Z";
const R2 = "2026-06-01T00:00:00.000Z";
/** The builder's clock: the same instant as the fixture's `now`, before R1 and R2. */
const NOW = Date.parse("2026-05-27T15:30:00.000Z");
const PAST = "2026-05-27T15:00:00.000Z";

function w(pct: number, resetAt: string | null) {
  return { usedPercentage: pct, remainingPercentage: 100 - pct, resetAt };
}

const CACHE = {
  "session (5h)": w(40, R1),
  "weekly (7d)": w(81, R2),
  "weekly fable (7d)": w(12, R2),
};

test("one neutral entry per pool connection, with account bars from the cached snapshot", () => {
  const accounts = buildSelfViewAccounts(
    ctx({ connectionIds: ["conn-secret-1", "conn-secret-2"] }),
    [
      { connectionId: "conn-secret-1", quotas: CACHE },
      { connectionId: "conn-secret-2", quotas: CACHE, stale: true },
    ],
    NOW
  );
  assert.deepEqual(
    accounts.map((a) => [a.slot, a.label]),
    [
      [1, "Account 1"],
      [2, "Account 2"],
    ]
  );
  assert.deepEqual(accounts[0].dimensions[0].account, { used: 40, status: "ok", resetAt: R1 });
  assert.equal(accounts[1].dimensions[1].account?.status, "stale");
  assert.deepEqual(accounts[0].modelWindows, {
    status: "ok",
    windows: [{ label: "weekly fable (7d)", usedPercent: 12, resetAt: R2 }],
  });
  assert.deepEqual(accounts[0].dimensions[0].yourShare, {
    fairShare: 50,
    consumed: null,
    remaining: null,
    status: "unavailable",
    reason: "percent_attribution_unavailable",
  });
});

test("an unavailable, missing or unmapped account window is flagged, not zeroed", () => {
  const failed = buildSelfViewAccounts(
    ctx(),
    [{ connectionId: "conn-secret-1", available: false, reason: "fetch_failed" }],
    NOW
  );
  assert.deepEqual(failed[0].dimensions[0].account, {
    used: null,
    status: "unavailable",
    reason: "fetch_failed",
  });
  const absent = buildSelfViewAccounts(
    ctx({ connectionIds: ["conn-secret-1", "conn-secret-2"] }),
    [{ connectionId: "conn-secret-2", quotas: CACHE }],
    NOW
  );
  assert.deepEqual([absent[0].dimensions[0].account?.reason, absent[1].slot], ["not_available", 2]);
  assert.equal(absent[1].dimensions[0].account?.used, 40);
  const bailian = buildSelfViewAccounts(
    ctx({ provider: "bailian" }),
    [{ connectionId: "conn-secret-1", quotas: { other: w(5, null) } }],
    NOW
  );
  assert.equal(bailian[0].dimensions[0].account?.reason, "window_not_reported");
});

test("hidden account data leaves no account bar and no model windows", () => {
  const [a] = buildSelfViewAccounts(ctx(), null, NOW);
  assert.deepEqual(["account" in a.dimensions[0], "modelWindows" in a], [false, false]);
});

test("only the pool's own connections are ever asked for, and only for a key allowed to see them", async () => {
  const asked: string[][] = [];
  const resolveAccountQuotaEntries = async (m: { allowedConnections: string[] }) => {
    asked.push(m.allowedConnections);
    return [
      { connectionId: "conn-secret-1", quotas: CACHE },
      { connectionId: "someone-else", quotas: CACHE },
    ];
  };
  const deps = makeDeps({
    pool: { connectionIds: [] },
    plan: PERCENT_PLAN,
    resolveAccountQuotaEntries,
  });
  const view = await buildQuotaSelfView(input({ scopes: BOTH }), deps);
  assert.deepEqual(asked, [["conn-secret-1"], ["conn-secret-1"]]); // two claude pools; never an empty list
  assert.equal(view.pools[0].accounts.length, 1);
  asked.length = 0;
  const hidden = await buildQuotaSelfView(input(), deps);
  assert.deepEqual([asked.length, hidden.pools[0].accounts.length], [0, 1]);
  assert.ok(!JSON.stringify(view).includes("conn-secret-1"));
});

test("a pool with no usable connection id never asks with an empty list", async () => {
  const asked: string[][] = [];
  const deps = makeDeps({
    pool: { connectionIds: [], connectionId: "" },
    plan: PERCENT_PLAN,
    resolveConnectionProvider: async () => "unknown",
    resolveAccountQuotaEntries: async (m) => {
      asked.push(m.allowedConnections);
      return [{ connectionId: "conn-secret-1", quotas: CACHE }];
    },
  });
  const view = await buildQuotaSelfView(input({ scopes: BOTH }), deps);
  assert.deepEqual(asked, []);
  assert.equal(view.pools.length, 2);
  assert.deepEqual(view.pools[0].accounts[0].dimensions[0].account, {
    used: null,
    status: "unavailable",
    reason: "not_available",
  });
});

test("a provider that is not shared hides account data and is not asked for", async () => {
  let calls = 0;
  const deps = makeDeps({
    plan: PERCENT_PLAN,
    resolveAccountQuotaEntries: async () => {
      calls += 1;
      return [{ connectionId: "conn-secret-1", quotas: CACHE }];
    },
  });
  const view = await buildQuotaSelfView(
    input({ scopes: BOTH, sharedQuotaProviders: ["codex"] }),
    deps
  );
  assert.equal(calls, 0);
  const [account] = view.pools[0].accounts;
  assert.deepEqual(["account" in account.dimensions[0], "modelWindows" in account], [false, false]);
});

test("a failed account lookup is reported as unavailable for every account", async () => {
  const deps = makeDeps({
    plan: PERCENT_PLAN,
    resolveAccountQuotaEntries: async () => {
      throw new Error("conn-secret-1 lookup failed");
    },
  });
  const view = await buildQuotaSelfView(input({ scopes: BOTH }), deps);
  const [account] = view.pools[0].accounts;
  assert.deepEqual(account.dimensions[0].account, {
    used: null,
    status: "unavailable",
    reason: "not_available",
  });
  assert.deepEqual(account.modelWindows, {
    status: "unavailable",
    reason: "not_available",
    windows: [],
  });
  assert.ok(!JSON.stringify(view).includes("conn-secret-1"));
});

test("an account dimension uses the plan limit of one account and skips placeholders", () => {
  const plan = {
    ...PERCENT_PLAN,
    dimensions: [
      { unit: "percent", window: "5h", limit: 100 },
      { unit: "percent", window: "weekly", limit: Number.EPSILON },
      { unit: "tokens", window: "daily", limit: 1000 },
    ],
  } as ProviderPlan;
  const accounts = buildSelfViewAccounts(
    ctx({ plan, connectionIds: ["conn-secret-1", "conn-secret-2", "conn-secret-4"] }),
    [{ connectionId: "conn-secret-1", quotas: CACHE }],
    NOW
  );
  assert.equal(accounts.length, 3);
  assert.deepEqual(
    accounts[0].dimensions.map((d) => [d.unit, d.window, d.limit]),
    [["percent", "5h", 100]]
  );
  assert.equal(accounts[0].dimensions[0].yourShare.fairShare, 50);
});

test("codex windows map to its own cache keys; a non-finite reading is not reported", () => {
  const [codex] = buildSelfViewAccounts(
    ctx({ provider: "codex" }),
    [
      {
        connectionId: "conn-secret-1",
        quotas: { session: w(25, R1), weekly: w(Number.NaN, R2), "gpt-5 weekly": w(3, R2) },
      },
    ],
    NOW
  );
  assert.deepEqual(codex.dimensions[0].account, { used: 25, status: "ok", resetAt: R1 });
  assert.deepEqual(codex.dimensions[1].account, {
    used: null,
    status: "unavailable",
    reason: "window_not_reported",
  });
  assert.deepEqual(
    codex.modelWindows?.windows.map((x) => x.label),
    ["gpt-5 weekly"]
  );
});

test("claude model windows come from the entry's model-scoped readings, plan windows left out", () => {
  const planOnly = { "session (5h)": w(40, R1), "weekly (7d)": w(81, R2) };
  const modelQuotas = { "weekly Opus (7d)": w(30, R2), "weekly (7d)": w(81, R2) };
  const [claude] = buildSelfViewAccounts(
    ctx(),
    [{ connectionId: "conn-secret-1", quotas: planOnly, modelQuotas }],
    NOW
  );
  assert.deepEqual(claude.modelWindows, {
    status: "ok",
    windows: [{ label: "weekly Opus (7d)", usedPercent: 30, resetAt: R2 }],
  });
  assert.deepEqual(claude.dimensions[1].account, { used: 81, status: "ok", resetAt: R2 });

  const [past] = buildSelfViewAccounts(
    ctx(),
    [
      {
        connectionId: "conn-secret-1",
        quotas: planOnly,
        modelQuotas: { "weekly Opus (7d)": w(30, PAST) },
      },
    ],
    NOW
  );
  assert.equal(past.modelWindows?.status, "stale");

  const [unmapped] = buildSelfViewAccounts(
    ctx({ provider: "tokenrouter" }),
    [{ connectionId: "conn-secret-1", quotas: {}, modelQuotas: { "key:alice-prod": w(5, R1) } }],
    NOW
  );
  assert.deepEqual(unmapped.modelWindows, { status: "ok", windows: [] });
});

test("an unexpected entry reason is replaced by a fixed one", () => {
  const [account] = buildSelfViewAccounts(
    ctx(),
    [{ connectionId: "conn-secret-1", available: false, reason: "lookup of conn-secret-1 failed" }],
    NOW
  );
  assert.equal(account.dimensions[0].account?.reason, "not_available");
  assert.equal(account.modelWindows?.reason, "not_available");
});

test("a provider without a plan-window mapping reports no model windows and copies no label", async () => {
  const quotas = { "key:alice-prod": w(10, R1), "upstream-limit-7f3a9c": w(20, R2) };
  const deps = makeDeps({
    plan: PERCENT_PLAN,
    resolveConnectionProvider: async () => "tokenrouter",
    resolveAccountQuotaEntries: async () => [{ connectionId: "conn-secret-1", quotas }],
  });
  const view = await buildQuotaSelfView(input({ provider: "tokenrouter", scopes: BOTH }), deps);
  const [account] = view.pools[0].accounts;
  assert.deepEqual(account.modelWindows, { status: "ok", windows: [] });
  const serialized = JSON.stringify(view);
  assert.ok(!serialized.includes("key:alice-prod"));
  assert.ok(!serialized.includes("upstream-limit-7f3a9c"));

  const [direct] = buildSelfViewAccounts(
    ctx({ provider: "megabrain" }),
    [{ connectionId: "conn-secret-1", quotas, stale: true }],
    NOW
  );
  assert.deepEqual(direct.modelWindows, { status: "stale", windows: [] });
});

test("a reading whose reset time already passed is stale, with its numbers kept", () => {
  const reading = (resetAt: string | null) => ({
    "session (5h)": w(40, resetAt),
    "weekly (7d)": w(81, R2),
    "weekly fable (7d)": w(12, resetAt),
  });
  const [past] = buildSelfViewAccounts(
    ctx(),
    [{ connectionId: "conn-secret-1", quotas: reading(PAST) }],
    NOW
  );
  assert.deepEqual(past.dimensions[0].account, { used: 40, status: "stale", resetAt: PAST });
  assert.deepEqual(past.dimensions[1].account, { used: 81, status: "ok", resetAt: R2 });
  assert.deepEqual(past.modelWindows, {
    status: "stale",
    windows: [{ label: "weekly fable (7d)", usedPercent: 12, resetAt: PAST }],
  });

  const [future] = buildSelfViewAccounts(
    ctx(),
    [{ connectionId: "conn-secret-1", quotas: reading(R1) }],
    NOW
  );
  assert.deepEqual(future.dimensions[0].account, { used: 40, status: "ok", resetAt: R1 });
  assert.equal(future.modelWindows?.status, "ok");

  const [alreadyStale] = buildSelfViewAccounts(
    ctx(),
    [{ connectionId: "conn-secret-1", quotas: reading(PAST), stale: true }],
    NOW
  );
  assert.deepEqual(alreadyStale.dimensions[0].account, {
    used: 40,
    status: "stale",
    resetAt: PAST,
  });
  assert.equal(alreadyStale.modelWindows?.status, "stale");

  const [unparseable] = buildSelfViewAccounts(
    ctx(),
    [{ connectionId: "conn-secret-1", quotas: reading("not a date") }],
    NOW
  );
  assert.equal(unparseable.dimensions[0].account?.status, "ok");
  assert.equal(unparseable.modelWindows?.status, "ok");
});

test("a reset time that does not parse as a date is reported as null", () => {
  const [account] = buildSelfViewAccounts(
    ctx(),
    [
      {
        connectionId: "conn-secret-1",
        quotas: { "session (5h)": w(40, "garbage"), "weekly (7d)": w(81, R2) },
        modelQuotas: { "weekly Opus (7d)": w(30, "garbage") },
      },
    ],
    NOW
  );
  assert.deepEqual(account.dimensions[0].account, { used: 40, status: "ok", resetAt: null });
  assert.deepEqual(account.dimensions[1].account, { used: 81, status: "ok", resetAt: R2 });
  assert.deepEqual(account.modelWindows, {
    status: "ok",
    windows: [{ label: "weekly Opus (7d)", usedPercent: 30, resetAt: null }],
  });
});

test("two entries for the same connection: the first one wins", () => {
  const [account] = buildSelfViewAccounts(
    ctx(),
    [
      { connectionId: "conn-secret-1", quotas: { "session (5h)": w(40, R1) } },
      { connectionId: "conn-secret-1", quotas: { "session (5h)": w(90, R1) } },
    ],
    NOW
  );
  assert.deepEqual(account.dimensions[0].account, { used: 40, status: "ok", resetAt: R1 });
});

/** Two-account pools, an account lookup that records what it is asked for, both scopes. */
async function viewWithAllowedConnections(allowedConnections: string[] | undefined) {
  const asked: string[][] = [];
  const deps = makeDeps({
    pool: { connectionIds: ["conn-secret-1", "conn-secret-2"] },
    plan: PERCENT_PLAN,
    resolveAccountQuotaEntries: async (m) => {
      asked.push(m.allowedConnections);
      return m.allowedConnections.map((connectionId) => ({ connectionId, quotas: CACHE }));
    },
  });
  const view = await buildQuotaSelfView(input({ scopes: BOTH, allowedConnections }), deps);
  return { asked, accounts: view.pools[0].accounts };
}

const hasAccountData = (account: { dimensions: object[]; modelWindows?: object }) =>
  "modelWindows" in account || account.dimensions.some((d) => "account" in d);

test("a key's allowed connections limit its account bars; other accounts keep their entry", async () => {
  const { asked, accounts } = await viewWithAllowedConnections(["conn-secret-2", "conn-other"]);
  assert.deepEqual(asked, [["conn-secret-2"], ["conn-secret-2"]]);
  assert.deepEqual(
    accounts.map((a) => [a.label, hasAccountData(a)]),
    [
      ["Account 1", false],
      ["Account 2", true],
    ]
  );
  assert.equal(accounts[1].dimensions[0].account?.used, 40);
});

test("an absent or empty allowed-connections list is no restriction, as in /v1/me/status", async () => {
  for (const allowed of [undefined, []]) {
    const { asked, accounts } = await viewWithAllowedConnections(allowed);
    assert.deepEqual(asked[0], ["conn-secret-1", "conn-secret-2"]);
    assert.deepEqual(
      accounts.map((a) => hasAccountData(a)),
      [true, true]
    );
  }
});

test("allowed connections that exclude every pool account ask for nothing and show no bar", async () => {
  const { asked, accounts } = await viewWithAllowedConnections(["conn-other"]);
  assert.deepEqual(asked, []);
  assert.deepEqual(
    accounts.map((a) => [a.label, hasAccountData(a)]),
    [
      ["Account 1", false],
      ["Account 2", false],
    ]
  );
});
