import test from "node:test";
import assert from "node:assert/strict";

import type { PoolAllocation, QuotaPool } from "../../src/lib/db/quotaPools.ts";
import { buildQuotaSelfView } from "../../src/lib/quota/selfView.ts";
import {
  selfQuotaResponseSchema,
  type SelfQuotaPool,
  type SelfQuotaResponse,
} from "../../src/shared/schemas/selfQuota.ts";
import { alloc, input, makeDeps } from "./fixtures/quotaSelfView.ts";

const NOW = Date.parse("2026-05-27T15:30:00.000Z");
const POOL_ID = "pool-a-id";
const ME = "key-me";
const B = "key-lender-b";
const C = "key-zero-c";

type Consumption = { me: number; b: number; c: number };

function allocations(meExtra: Partial<PoolAllocation> = {}): PoolAllocation[] {
  return [alloc(ME, 50, meExtra), alloc(B, 30, { lendingPercent: 50 }), alloc(C, 0)];
}

async function view(opts: {
  mode?: QuotaPool["borrowMode"];
  meExtra?: Partial<PoolAllocation>;
  consumed?: Consumption;
  now?: number;
  failFor?: string;
}): Promise<SelfQuotaResponse> {
  const consumed = opts.consumed ?? { me: 0, b: 0, c: 0 };
  const byKey: Record<string, number> = { [ME]: consumed.me, [B]: consumed.b, [C]: consumed.c };
  const now = opts.now ?? NOW;
  return buildQuotaSelfView(
    input({ apiKeyId: ME }),
    makeDeps({
      now: () => now,
      pool: { allocations: allocations(opts.meExtra), borrowMode: opts.mode ?? "consent" },
      store: {
        peek: async (apiKeyId) => {
          if (apiKeyId === opts.failFor) throw new Error("store down");
          return byKey[apiKeyId] ?? 0;
        },
      },
    })
  );
}

function poolA(v: SelfQuotaResponse): SelfQuotaPool {
  const pool = v.pools.find((p) => p.name === "Pool A");
  assert.ok(pool);
  return pool;
}

const viewWith = async (consumed: Consumption) => poolA(await view({ consumed }));

test("a saturation pool reports the stored consent as inactive and no borrowAvailable", async () => {
  const pool = poolA(await view({ mode: "saturation", meExtra: { lendingPercent: 30 } }));
  assert.deepEqual(
    [pool.borrowMode, pool.lendingPercent, pool.lendingUntil, pool.lendingActive],
    ["saturation", 30, null, false]
  );
  assert.equal("borrowAvailable" in pool.dimensions[0].yourShare, false);
});

test("a consent pool reports the key's own percentage and deadline, active only while it holds", async () => {
  const meExtra = { lendingPercent: 30, lendingUntil: NOW + 1000 };
  const pool = poolA(await view({ meExtra }));
  assert.deepEqual(
    [pool.borrowMode, pool.lendingPercent, pool.lendingUntil, pool.lendingActive],
    ["consent", 30, NOW + 1000, true]
  );
  const later = poolA(await view({ meExtra, now: NOW + 1000 }));
  assert.deepEqual(
    [later.lendingPercent, later.lendingUntil, later.lendingActive],
    [30, NOW + 1000, false]
  );
});

test("borrowAvailable is the gate's figure, also while the key is under its share", async () => {
  assert.equal(
    (await viewWith({ me: 530, b: 100, c: 60 })).dimensions[0].yourShare.borrowAvailable,
    40
  );
  assert.equal(
    (await viewWith({ me: 100, b: 100, c: 60 })).dimensions[0].yourShare.borrowAvailable,
    40
  );
});

test("a failed read of another key is unavailable, never zero", async () => {
  const pool = poolA(await view({ consumed: { me: 100, b: 100, c: 60 }, failFor: B }));
  const share = pool.dimensions[0].yourShare;
  assert.equal(share.borrowAvailable, null);
  assert.equal(share.status, "ok");
  assert.equal(share.consumed, 100);
});

test("a failed read of the key's own consumption leaves borrowAvailable unavailable", async () => {
  const pool = poolA(await view({ consumed: { me: 100, b: 100, c: 60 }, failFor: ME }));
  const share = pool.dimensions[0].yourShare;
  assert.equal(share.status, "unavailable");
  assert.equal(share.borrowAvailable, null);
});

test("a soft or burst key in a consent pool gets null, the figure does not apply to it", async () => {
  for (const policy of ["soft", "burst"] as const) {
    const pool = poolA(await view({ meExtra: { policy }, consumed: { me: 530, b: 100, c: 60 } }));
    assert.equal(pool.dimensions[0].yourShare.borrowAvailable, null);
  }
});

test("nothing about other keys beyond the aggregate reaches the body", async () => {
  const body = JSON.stringify(await view({ consumed: { me: 530, b: 100, c: 60 } }));
  for (const leak of [B, C, '"lendingPercent":50', POOL_ID]) {
    assert.equal(body.includes(leak), false);
  }
});

test("a body without the new fields still parses, with the defaults", () => {
  const oldShape = {
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
        accountVisible: false,
        dimensions: [
          {
            unit: "tokens",
            window: "daily",
            limit: 100,
            yourShare: { fairShare: 50, consumed: 10, remaining: 40, status: "ok" },
          },
        ],
        accounts: [],
      },
    ],
    availableModels: [],
    expiresAt: null,
    apiBaseUrl: null,
    blocks: { schedules: [], modelCaps: [] },
  };
  const parsed = selfQuotaResponseSchema.parse(oldShape).pools[0];
  assert.deepEqual(
    [parsed.lendingPercent, parsed.lendingUntil, parsed.lendingActive],
    [0, null, false]
  );
  assert.equal("borrowAvailable" in parsed.dimensions[0].yourShare, false);
});
