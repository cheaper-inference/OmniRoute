import test, { after } from "node:test";
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
const { orderTargetsByQuotaWeighted, getQuotaWeightedDrawWeight } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { applyStrategyOrdering } =
  await import("../../../open-sse/services/combo/applyStrategyOrdering.ts");

const log = { info() {}, warn() {}, debug() {}, error() {} };

after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
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
