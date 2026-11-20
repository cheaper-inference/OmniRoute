/**
 * The `blocks` part of the self-service quota view (schedule windows and per-model caps), the
 * key's models and expiry, and listModelCapsForApiKey against a real database in a temporary
 * DATA_DIR of this file's own (set before any module that can open the database is imported).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { ModelCap } from "../../src/lib/db/quotaModelCaps.ts";
import type { QuotaSchedule } from "../../src/lib/quota/schedules.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-self-view-blocks-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { listModelCapsForApiKey, setModelCap } = await import("../../src/lib/db/quotaModelCaps.ts");
const { buildSelfViewBlocks } = await import("../../src/lib/quota/selfViewBlocks.ts");
const { buildQuotaSelfView } = await import("../../src/lib/quota/selfView.ts");
const { ctx, input, makeDeps } = await import("./fixtures/quotaSelfView.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const NOW = Date.UTC(2026, 4, 27, 15, 30);

function sched(over: Partial<QuotaSchedule>): QuotaSchedule {
  return {
    id: "s0",
    poolId: "pool-a-id",
    days: [0, 1, 2, 3, 4, 5, 6],
    startMinute: 0,
    endMinute: 1440,
    timezone: "UTC",
    mode: "allow",
    reserves: [],
    budgetWindow: "daily",
    priority: 0,
    enabled: true,
    ...over,
  };
}

function cap(model: string, capValue: number, capUnit: ModelCap["capUnit"]): ModelCap {
  return { poolId: "pool-a-id", apiKeyId: "key-a", model, capValue, capUnit };
}

function deps(
  over: {
    schedules?: QuotaSchedule[];
    caps?: ModelCap[];
    peek?: () => Promise<number>;
    poolConsumedTotal?: () => Promise<number>;
  } = {}
) {
  return {
    now: () => NOW,
    listEnabledSchedules: () => over.schedules ?? [],
    listModelCapsForApiKey: () => over.caps ?? [],
    getQuotaStore: async () => ({
      peek: over.peek ?? (async () => 0),
      poolConsumedTotal: over.poolConsumedTotal ?? (async () => 0),
    }),
  };
}

const fail = async (): Promise<number> => {
  throw new Error("x");
};

test("a pool without schedules or caps reports nothing", async () => {
  assert.deepEqual(await buildSelfViewBlocks("key-a", [ctx()], deps()), {
    schedules: [],
    modelCaps: [],
  });
});

test("a closed window says why and when it reopens; a blackout wins over an open window", async () => {
  const [outside] = (
    await buildSelfViewBlocks(
      "key-a",
      [ctx()],
      deps({ schedules: [sched({ endMinute: 60, label: "night" })] })
    )
  ).schedules;
  assert.deepEqual(
    [outside.state, outside.reason, outside.label],
    ["closed", "outside-window", null]
  );
  assert.ok((outside.retryAfterSeconds ?? 0) > 0);
  assert.deepEqual([outside.reserves, outside.budget], [[], null]);
  const [blackout] = (
    await buildSelfViewBlocks(
      "key-a",
      [ctx()],
      deps({ schedules: [sched({}), sched({ id: "s1", mode: "block", label: "freeze" })] })
    )
  ).schedules;
  assert.deepEqual([blackout.reason, blackout.label], ["blackout", "freeze"]);
});

test("an open window reports its reserves and whether its budget is spent", async () => {
  const s = sched({
    reserves: [{ window: "weekly", percent: 20 }],
    budgetValue: 100,
    budgetUnit: "requests",
  });
  let budgetKey: unknown;
  const spent = await buildSelfViewBlocks(
    "key-a",
    [ctx()],
    deps({
      schedules: [s],
      poolConsumedTotal: async (...args: unknown[]) => {
        budgetKey = args;
        return 100;
      },
    })
  );
  assert.deepEqual(spent.schedules[0], {
    pool: ctx().ref,
    state: "open",
    reason: null,
    label: null,
    retryAfterSeconds: null,
    reserves: [{ window: "weekly", percent: 20 }],
    budget: { unit: "requests", window: "daily", exhausted: true },
  });
  // The schedule's own budget bucket, as the quota gate reads it.
  assert.deepEqual(budgetKey, [
    "pool-a-id",
    { poolId: "pool-a-id:sched:s0", unit: "requests", window: "daily" },
  ]);
  const broken = await buildSelfViewBlocks(
    "key-a",
    [ctx()],
    deps({ schedules: [s], poolConsumedTotal: fail })
  );
  assert.equal(broken.schedules[0].budget?.exhausted, null);
});

test("model caps list the key's own caps with consumption; placeholders are skipped", async () => {
  const caps = [
    cap("claude-fable-5", 50, "requests"),
    cap("claude-haiku-5", Number.EPSILON, "requests"),
  ];
  let capKey: unknown;
  const out = await buildSelfViewBlocks(
    "key-a",
    [ctx()],
    deps({
      caps,
      peek: async (...args: unknown[]) => {
        capKey = args;
        return 50;
      },
    })
  );
  assert.deepEqual(out.modelCaps, [
    {
      pool: ctx().ref,
      model: "claude-fable-5",
      unit: "requests",
      window: "hourly",
      cap: 50,
      consumed: 50,
      reached: true,
    },
  ]);
  // The per-model bucket of this key, as the quota gate reads it.
  assert.deepEqual(capKey, [
    "key-a",
    { poolId: "pool-a-id:model:claude-fable-5", unit: "requests", window: "hourly" },
  ]);
  const failed = await buildSelfViewBlocks("key-a", [ctx()], deps({ caps, peek: fail }));
  assert.deepEqual([failed.modelCaps[0].consumed, failed.modelCaps[0].reached], [null, null]);
});

test("a failed schedule or cap lookup, or a failed store load, never throws", async () => {
  const throwing = {
    ...deps(),
    listEnabledSchedules: (): QuotaSchedule[] => {
      throw new Error("db down");
    },
    listModelCapsForApiKey: (): ModelCap[] => {
      throw new Error("db down");
    },
  };
  assert.deepEqual(await buildSelfViewBlocks("key-a", [ctx()], throwing), {
    schedules: [],
    modelCaps: [],
  });
  const noStore = {
    ...deps({
      schedules: [sched({ budgetValue: 5, budgetUnit: "tokens" })],
      caps: [cap("claude-fable-5", 50, "requests")],
    }),
    getQuotaStore: async (): Promise<never> => {
      throw new Error("store init failed");
    },
  };
  const out = await buildSelfViewBlocks("key-a", [ctx()], noStore);
  assert.equal(out.schedules[0].budget?.exhausted, null);
  assert.deepEqual([out.modelCaps[0].consumed, out.modelCaps[0].reached], [null, null]);
});

test("listModelCapsForApiKey returns one key's caps in one pool, ordered by model", () => {
  for (const [poolId, apiKeyId, model, capValue] of [
    ["p1", "key-a", "m-b", 5],
    ["p1", "key-a", "m-a", 9],
    ["p1", "key-b", "m-a", 1],
    ["p2", "key-a", "m-z", 1],
  ] as const)
    setModelCap({ poolId, apiKeyId, model, capValue, capUnit: "tokens" });
  assert.deepEqual(
    listModelCapsForApiKey("p1", "key-a").map((c) => [c.model, c.capValue]),
    [
      ["m-a", 9],
      ["m-b", 5],
    ]
  );
});

test("the view carries the key's models and expiry", async () => {
  const view = await buildQuotaSelfView(
    input({ expiresAt: "2026-12-01T02:59:59.000Z", allowedQuotas: ["pool-a-id"] }),
    makeDeps({ listQuotaKeyModels: async () => ["qtSd/teama/claude/claude-sonnet-5"] })
  );
  assert.deepEqual(
    [view.availableModels, view.expiresAt],
    [["qtSd/teama/claude/claude-sonnet-5"], "2026-12-01T02:59:59.000Z"]
  );
  const failed = await buildQuotaSelfView(
    input(),
    makeDeps({
      listQuotaKeyModels: async () => {
        throw new Error("db down");
      },
    })
  );
  assert.deepEqual(failed.availableModels, []);
});

test("the view loads the quota store once and the blocks reuse it", async () => {
  let loads = 0;
  const store = { peek: async () => 7, poolConsumedTotal: async () => 0 };
  const view = await buildQuotaSelfView(
    input(),
    makeDeps({
      getQuotaStore: async () => {
        loads += 1;
        return store;
      },
      listModelCapsForApiKey: (poolId) =>
        poolId === "pool-a-id" ? [cap("m-x", 10, "tokens")] : [],
    })
  );
  assert.equal(loads, 1);
  assert.deepEqual(
    [view.pools[0].dimensions[0].yourShare.consumed, view.blocks.modelCaps[0].consumed],
    [7, 7]
  );
});

test("the view's default lookups read each pool's caps of this key only, under that pool's own ref", async () => {
  // Rows this test needs, with model names no other test uses.
  const rows: Array<[string, string, string, number]> = [
    ["pool-a-id", "key-a", "e2e-model-in-a", 200],
    ["pool-b-id", "key-a", "e2e-model-in-b", 300],
    ["pool-a-id", "key-b", "e2e-other-key-model", 7],
    ["pool-codex-id", "key-a", "e2e-other-provider-model", 9],
    ["pool-unallocated-id", "key-a", "e2e-unallocated-pool-model", 11],
  ];
  for (const [poolId, apiKeyId, model, capValue] of rows)
    setModelCap({ poolId, apiKeyId, model, capValue, capUnit: "requests" });

  const view = await buildQuotaSelfView(
    input(),
    makeDeps({ listEnabledSchedules: undefined, listModelCapsForApiKey: undefined })
  );
  const refOf = (name: string) => view.pools.find((p) => p.name === name)?.ref;
  assert.ok(refOf("Pool A") && refOf("Pool B") && refOf("Pool A") !== refOf("Pool B"));
  const entry = (pool: string | undefined, model: string, capValue: number) => ({
    pool,
    model,
    unit: "requests",
    window: "hourly",
    cap: capValue,
    consumed: 120,
    reached: capValue <= 120,
  });
  // Pools in view order (Pool A, then Pool B); each cap only under its own pool's ref.
  assert.deepEqual(view.blocks, {
    schedules: [],
    modelCaps: [
      entry(refOf("Pool A"), "e2e-model-in-a", 200),
      entry(refOf("Pool B"), "e2e-model-in-b", 300),
    ],
  });
  const json = JSON.stringify(view);
  for (const secret of [
    "pool-a-id",
    "pool-b-id",
    "key-b",
    "e2e-other-key-model",
    "e2e-other-provider-model",
    "e2e-unallocated-pool-model",
  ])
    assert.ok(!json.includes(secret), secret);
});
