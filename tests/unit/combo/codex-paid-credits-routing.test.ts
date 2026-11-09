import test, { after, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-paid-credits-"));
process.env.DATA_DIR = dataDir;
const db = await import("../../../src/lib/db/providers.ts");
const core = await import("../../../src/lib/db/core.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const {
  orderTargetsByQuotaWeighted,
  getQuotaWeightedDrawWeight,
  QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS,
} = await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { applyStrategyOrdering } =
  await import("../../../open-sse/services/combo/applyStrategyOrdering.ts");
const { _clearInflightForTest, incrementInflight } =
  await import("../../../open-sse/services/combo/quotaShareInflight.ts");
const { _setSecureRandomFloatSource } = await import("../../../src/shared/utils/secureRandom.ts");

const log = { info() {}, warn() {}, debug() {}, error() {} };

after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

afterEach(() => {
  _setSecureRandomFloatSource(null);
  quotaCache.__clearForTests();
  _clearInflightForTest();
});

type Credits = {
  hasCredits: boolean;
  unlimited: boolean;
  overageLimitReached: boolean;
  balance: number | null;
};

function quotaFor(paidCredits?: Credits) {
  return {
    used: 100,
    total: 100,
    percentUsed: 1,
    resetAt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    ...(paidCredits ? { paidCredits } : {}),
  };
}

const liveCredits: Credits = {
  hasCredits: true,
  unlimited: false,
  overageLimitReached: false,
  balance: 57_927.79,
};

function target(connectionId: string, model = "codex/gpt-6.1-sol-xhigh") {
  return {
    kind: "model" as const,
    stepId: randomUUID(),
    executionKey: randomUUID(),
    modelStr: model,
    provider: "codex",
    providerId: "codex",
    connectionId,
    weight: 1,
    label: null,
  };
}

async function connection(allowPaidCredits: boolean) {
  return db.createProviderConnection({
    provider: "codex",
    name: `codex-${randomUUID()}`,
    isActive: true,
    testStatus: "active",
    authType: "oauth",
    providerSpecificData: allowPaidCredits ? { allowPaidCredits: true } : {},
  } as never);
}

async function withQuota<T>(quota: unknown, run: () => Promise<T>): Promise<T> {
  registerQuotaFetcher("codex", async () => quota as never);
  return run();
}

test("quota-weighted keeps a codex target that paid credits can absorb", async () => {
  const row = await connection(true);
  const ordered = await withQuota(quotaFor(liveCredits), () =>
    orderTargetsByQuotaWeighted([target(row.id)], "combo", {}, log)
  );
  assert.equal(ordered.length, 1);
  assert.ok(ordered[0]);
  assert.equal(ordered[0].connectionId, row.id);
});

test("quota-weighted drops a codex target when the balance is empty", async () => {
  const row = await connection(true);
  const ordered = await withQuota(quotaFor({ ...liveCredits, hasCredits: false, balance: 0 }), () =>
    orderTargetsByQuotaWeighted([target(row.id)], "combo", {}, log)
  );
  assert.deepEqual(ordered, []);
});

test("quota-weighted drops a codex target when paid credits are not opted in", async () => {
  const row = await connection(false);
  const ordered = await withQuota(quotaFor(liveCredits), () =>
    orderTargetsByQuotaWeighted([target(row.id)], "combo", {}, log)
  );
  assert.deepEqual(ordered, []);
});

test("quota-weighted ranks an account with subscription room above a credit-backed one", async () => {
  const healthy = await connection(false);
  const creditBacked = await connection(true);
  registerQuotaFetcher("codex", async (connectionId: string) => {
    if (connectionId === healthy.id) {
      return { used: 20, total: 100, percentUsed: 0.2, resetAt: null } as never;
    }
    return quotaFor(liveCredits) as never;
  });
  const ordered = await orderTargetsByQuotaWeighted(
    [target(creditBacked.id), target(healthy.id)],
    "combo",
    {},
    log
  );
  assert.equal(ordered.length, 2, "both accounts stay reachable");
  assert.equal(ordered[0].connectionId, healthy.id, "free quota is spent before credits");
  assert.equal(
    ordered[1].connectionId,
    creditBacked.id,
    "the credit-backed account is the fallback"
  );
});

// Regression matrix, not feature coverage: only quota-weighted reads the flag,
// so these cases mostly prove the other orderers never learn to drop a target
// that still has credits behind it.
const ORDERING_KINDS = [
  "lkgp",
  "strict-random",
  "random",
  "fill-first",
  "p2c",
  "least-used",
  "cost-optimized",
  "reset-aware",
  "reset-window",
  "expiry-first",
  "context-optimized",
  "cache-optimized",
  "headroom",
  "quota-weighted",
] as const;

for (const kind of ORDERING_KINDS) {
  test(`${kind} keeps a credit-backed codex target`, async () => {
    const row = await connection(true);
    const deps = {
      combo: { name: `combo-${kind}`, models: [] } as never,
      config: {},
      body: { model: "codex/gpt-6.1-sol-xhigh", messages: [] },
      log,
      apiKeyAllowedConnections: null,
      sessionKey: null,
      exclusions: [],
    };
    const result = await withQuota(quotaFor(liveCredits), () =>
      applyStrategyOrdering(kind, [target(row.id)], deps as never)
    );
    assert.equal(
      result.orderedTargets.length,
      1,
      `${kind} must not empty a combo whose only target runs on credits`
    );
  });
}

test("a credit-backed target is weighted by its balance, not by a spent window", () => {
  const weight = (remainingPercent: number, balance: number | null) =>
    getQuotaWeightedDrawWeight({
      target: target("connection"),
      index: 0,
      score: 0,
      remainingPercent,
      paidCreditsBacked: true,
      paidCreditsBalance: balance,
    } as never);

  assert.equal(weight(0, 900), 900);
  assert.equal(weight(0, 100), 100);
  assert.equal(weight(0, null), 1, "a missing balance still gets one draw slot");
  assert.equal(weight(0, 0), 1, "an empty balance still gets one draw slot");
});

test("overage limit reached drops a codex target even with a balance left", async () => {
  const row = await connection(true);
  const ordered = await withQuota(
    quotaFor({ ...liveCredits, balance: 500, overageLimitReached: true }),
    () => orderTargetsByQuotaWeighted([target(row.id)], "combo", {}, log)
  );
  assert.deepEqual(ordered, []);
});

// Paid credits are the last resort. The draw below lands on the second slot, which is
// the credit-backed account whenever that account shares a pool with its peer.
function quotaAt(percentUsed: number) {
  return { used: percentUsed * 100, total: 100, percentUsed, resetAt: null };
}

function drawSecondSlot() {
  _setSecureRandomFloatSource(() => 0.5);
}

function serveQuotas(byConnection: Map<string, unknown>) {
  registerQuotaFetcher("codex", async (connectionId: string) => {
    return byConnection.get(connectionId) as never;
  });
}

test("floor 0 does not put a spent credit-backed account in the same draw as real room", async () => {
  const healthy = await connection(false);
  const creditBacked = await connection(true);
  serveQuotas(
    new Map([
      [healthy.id, quotaAt(0.4)],
      [creditBacked.id, quotaFor(liveCredits)],
    ])
  );
  drawSecondSlot();
  const ordered = await orderTargetsByQuotaWeighted(
    [target(healthy.id), target(creditBacked.id)],
    "combo",
    { quotaWeightedFloorPercent: 0 },
    log
  );
  assert.deepEqual(
    ordered.map((entry) => entry.connectionId),
    [healthy.id, creditBacked.id]
  );
});

test("an account below the floor is still spent before paid credits", async () => {
  const nearlySpent = await connection(false);
  const creditBacked = await connection(true);
  serveQuotas(
    new Map([
      [nearlySpent.id, quotaAt(0.995)],
      [creditBacked.id, quotaFor(liveCredits)],
    ])
  );
  drawSecondSlot();
  const ordered = await orderTargetsByQuotaWeighted(
    [target(nearlySpent.id), target(creditBacked.id)],
    "combo",
    {},
    log
  );
  assert.deepEqual(
    ordered.map((entry) => entry.connectionId),
    [nearlySpent.id, creditBacked.id]
  );
});

test("an account with a stale snapshot is still spent before paid credits", async () => {
  const stale = await connection(false);
  const creditBacked = await connection(true);
  serveQuotas(
    new Map([
      [stale.id, quotaAt(0.2)],
      [creditBacked.id, quotaFor(liveCredits)],
    ])
  );
  quotaCache.setQuotaCache(stale.id, "codex", {
    session: { remainingPercentage: 80, resetAt: null },
  });
  const entry = quotaCache.getQuotaCache(stale.id);
  assert.ok(entry);
  entry.fetchedAt = Date.now() - QUOTA_WEIGHTED_MAX_SNAPSHOT_AGE_MS - 60_000;

  drawSecondSlot();
  const ordered = await orderTargetsByQuotaWeighted(
    [target(stale.id), target(creditBacked.id)],
    "combo",
    {},
    log
  );
  assert.deepEqual(
    ordered.map((entry) => entry.connectionId),
    [stale.id, creditBacked.id]
  );
});

test("credit-backed fallbacks queue by balance behind real room", async () => {
  const healthy = await connection(false);
  const small = await connection(true);
  const large = await connection(true);
  serveQuotas(
    new Map([
      [healthy.id, quotaAt(0.2)],
      [small.id, quotaFor({ ...liveCredits, balance: 100 })],
      [large.id, quotaFor({ ...liveCredits, balance: 900 })],
    ])
  );
  const ordered = await orderTargetsByQuotaWeighted(
    [target(small.id), target(large.id), target(healthy.id)],
    "combo",
    {},
    log
  );
  assert.deepEqual(
    ordered.map((entry) => entry.connectionId),
    [healthy.id, large.id, small.id]
  );
});

test("a credit-only pool is drawn by balance", async () => {
  const small = await connection(true);
  const large = await connection(true);
  serveQuotas(
    new Map([
      [small.id, quotaFor({ ...liveCredits, balance: 100 })],
      [large.id, quotaFor({ ...liveCredits, balance: 900 })],
    ])
  );
  drawSecondSlot();
  const ordered = await orderTargetsByQuotaWeighted(
    [target(small.id), target(large.id)],
    "combo",
    {},
    log
  );
  assert.deepEqual(
    ordered.map((entry) => entry.connectionId),
    [large.id, small.id]
  );
});

test("a credit-backed account marked out of credits by a 402 is dropped", async () => {
  const row = await connection(true);
  serveQuotas(new Map([[row.id, quotaFor(liveCredits)]]));
  quotaCache.markAccountExhaustedFromCredits(row.id, "codex");
  const ordered = await orderTargetsByQuotaWeighted([target(row.id)], "combo", {}, log);
  assert.deepEqual(ordered, []);
});

test("a 402-marked account does not outbid a credit-backed peer", async () => {
  const refused = await connection(true);
  const peer = await connection(true);
  serveQuotas(
    new Map([
      [refused.id, quotaFor(liveCredits)],
      [peer.id, quotaFor({ ...liveCredits, balance: 100 })],
    ])
  );
  quotaCache.markAccountExhaustedFromCredits(refused.id, "codex");
  drawSecondSlot();
  const ordered = await orderTargetsByQuotaWeighted(
    [target(peer.id), target(refused.id)],
    "combo",
    {},
    log
  );
  assert.deepEqual(
    ordered.map((entry) => entry.connectionId),
    [peer.id]
  );
});

test("a window that is merely spent is not read as an upstream refusal", async () => {
  const row = await connection(true);
  serveQuotas(new Map([[row.id, quotaFor(liveCredits)]]));
  quotaCache.setQuotaCache(row.id, "codex", {
    session: { remainingPercentage: 0, resetAt: new Date(Date.now() + 3_600_000).toISOString() },
  });
  assert.equal(quotaCache.getQuotaWeightedRemainingPercent(row.id), 0);
  assert.equal(quotaCache.isQuotaRefusalMarked(row.id), false);
  const ordered = await orderTargetsByQuotaWeighted([target(row.id)], "combo", {}, log);
  assert.equal(ordered.length, 1);
});

test("the refusal mark lifts when the exhaustion window it set runs out", () => {
  const id = `refused-${randomUUID()}`;
  quotaCache.markAccountExhaustedFromCredits(id, "codex");
  assert.equal(quotaCache.isQuotaRefusalMarked(id), true);
  const entry = quotaCache.getQuotaCache(id);
  assert.ok(entry);
  entry.fetchedAt = Date.now() - 60 * 60 * 1000;
  assert.equal(quotaCache.isQuotaRefusalMarked(id), false);
});

test("a credit-backed draw weight yields to in-flight load like any other entry", () => {
  const id = `busy-${randomUUID()}`;
  incrementInflight(id);
  const weight = getQuotaWeightedDrawWeight({
    target: target(id),
    index: 0,
    score: 0,
    remainingPercent: 0,
    paidCreditsBacked: true,
    paidCreditsBalance: 900,
  } as never);
  assert.equal(weight, 450);
});
