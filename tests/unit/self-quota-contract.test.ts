import test from "node:test";
import assert from "node:assert/strict";

import { buildPoolRef } from "../../src/lib/quota/selfPoolRef.ts";
import { selfQuotaResponseSchema } from "../../src/shared/schemas/selfQuota.ts";

const POOL = "0b6c3f0e-1111-4222-8333-444455556666";

test("pool ref is opaque, stable, and bound to the key, the pool and the server secret", () => {
  const a = buildPoolRef("key-a", POOL, "s3cret");
  assert.match(a, /^qpr_[A-Za-z0-9_-]{22}$/);
  assert.equal(a, buildPoolRef("key-a", POOL, "s3cret"));
  for (const other of [
    buildPoolRef("key-b", POOL, "s3cret"),
    buildPoolRef("key-a", "another", "s3cret"),
    buildPoolRef("key-a", POOL, "x"),
  ])
    assert.notEqual(a, other);
  assert.ok(!a.includes("0b6c3f0e"));
  assert.throws(() => buildPoolRef("key-a", POOL, ""));
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
