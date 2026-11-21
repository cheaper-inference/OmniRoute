import test from "node:test";
import assert from "node:assert/strict";

import { buildPoolRef } from "../../src/lib/quota/selfPoolRef.ts";
import { selfQuotaResponseSchema } from "../../src/shared/schemas/selfQuota.ts";

const POOL = "0b6c3f0e-1111-4222-8333-444455556666";

test("pool ref is opaque, stable, and bound to the key, the pool and the server secret", () => {
  const a = buildPoolRef("key-a", POOL, "s3cret");
  assert.match(a, /^qpr_[0-9a-f]{32}$/);
  assert.equal(a, buildPoolRef("key-a", POOL, "s3cret"));
  for (const other of [
    buildPoolRef("key-b", POOL, "s3cret"),
    buildPoolRef("key-a", "another", "s3cret"),
    buildPoolRef("key-a", POOL, "x"),
  ])
    assert.notEqual(a, other);
  assert.ok(!a.includes("0b6c3f0e"));
  assert.throws(() => buildPoolRef("key-a", POOL, ""));
  assert.notEqual(buildPoolRef("k\u0000x", "y", "s3cret"), buildPoolRef("k", "x\u0000y", "s3cret"));
});

test("the response schema drops keys outside the contract and rejects an unknown borrow mode", () => {
  const base = {
    provider: "claude",
    generatedAt: "2026-05-27T15:30:00.000Z",
    pools: [],
    availableModels: [],
    expiresAt: null,
    apiBaseUrl: null,
    blocks: { schedules: [], modelCaps: [] },
  };
  assert.deepEqual(
    selfQuotaResponseSchema.parse({ ...base, poolId: "leak", connectionId: "leak" }),
    base
  );
  const badPool = {
    ref: "qpr_x",
    name: "p",
    provider: "claude",
    borrowMode: "consent",
    policy: "hard",
    weight: 50,
    cap: null,
    accountVisible: false,
    dimensions: [],
    accounts: [],
  };
  assert.throws(() => selfQuotaResponseSchema.parse({ ...base, pools: [badPool] }));
});

test("the response schema drops leaked keys at every nesting level", () => {
  const leak = { poolId: "leak-pool", connectionId: "leak-conn", email: "leak@example.com" };
  const share = { fairShare: 50, consumed: 10, remaining: 40, status: "ok" };
  const clean = {
    provider: "claude",
    generatedAt: "2026-05-27T15:30:00.000Z",
    pools: [
      {
        ref: "qpr_x",
        name: "p",
        provider: "claude",
        borrowMode: "saturation",
        policy: "hard",
        weight: 50,
        cap: null,
        accountVisible: true,
        dimensions: [
          {
            unit: "tokens",
            window: "daily",
            limit: 100,
            total: { used: 20, status: "ok" },
            yourShare: share,
          },
        ],
        accounts: [
          {
            slot: 1,
            label: "Account 1",
            dimensions: [
              {
                unit: "percent",
                window: "5h",
                limit: 100,
                account: { used: 30, status: "ok", resetAt: null },
                yourShare: share,
              },
            ],
          },
        ],
      },
    ],
    availableModels: [],
    expiresAt: null,
    apiBaseUrl: null,
    blocks: {
      schedules: [
        {
          pool: "qpr_x",
          state: "open",
          reason: null,
          label: null,
          retryAfterSeconds: null,
          reserves: [],
          budget: null,
        },
      ],
      modelCaps: [],
    },
  };
  const [pool] = clean.pools;
  const leaky = {
    ...clean,
    pools: [
      {
        ...pool,
        ...leak,
        dimensions: [{ ...pool.dimensions[0], ...leak }],
        accounts: [
          {
            ...pool.accounts[0],
            ...leak,
            dimensions: [{ ...pool.accounts[0].dimensions[0], ...leak }],
          },
        ],
      },
    ],
    blocks: { ...clean.blocks, schedules: [{ ...clean.blocks.schedules[0], ...leak }] },
  };
  const parsed = selfQuotaResponseSchema.parse(leaky);
  assert.deepEqual(parsed, clean);
  const json = JSON.stringify(parsed);
  for (const value of Object.values(leak)) assert.ok(!json.includes(value));
});
