import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "codex-reset-recovery-"));
process.env.DATA_DIR = directory;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";
process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const cache = await import("../../src/domain/quotaCache.ts");
const auth = await import("../../src/sse/services/auth.ts");
const usage = await import("../../src/lib/usage/providerLimits.ts");
const codexUsage = await import("../../open-sse/services/usage/codex.ts");
const preflight = await import("../../open-sse/services/quotaPreflight.ts");
const originalFetch = globalThis.fetch;
let calls = 0;
let liveUsed = 5;
const ids: string[] = [];
const owner = `vlo_${"A".repeat(43)}`;
const resetAt = () => new Date(Date.now() + 600_000).toISOString();
function response(used = liveUsed) {
  return Response.json({
    plan_type: "pro",
    rate_limit: {
      primary_window: {
        used_percent: used,
        limit_window_seconds: 604800,
        reset_after_seconds: 600,
      },
    },
  });
}
async function seed(used = 99, priority = 1) {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    accessToken: `synthetic-${priority}`,
    isActive: true,
    testStatus: "active",
    priority,
    quotaWindowThresholds: { weekly: 10 },
    providerSpecificData: {
      codexLimitPolicy: { use5h: false, useWeekly: true },
      limitPolicy: { enabled: true, thresholdPercent: 90 },
      workspaceInfoFetchedAt: new Date().toISOString(),
      autoFetchModels: false,
    },
  });
  ids.push(connection.id);
  cache.setQuotaCache(connection.id, "codex", {
    weekly: { remainingPercentage: 100 - used, resetAt: resetAt() },
  });
  cache.getQuotaCache(connection.id)!.quotas.weekly.observedAt = Date.now() - 30_000;
  return connection;
}
function leaseOptions(id: string): auth.CredentialSelectionOptions {
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "test-key",
    provider: "codex",
    connectionId: id,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  return {
    lease: {
      apiKeyId: "test-key",
      mode: "request",
      context: {
        leaseOwnerId: owner,
        leaseOwnerHash: leases.hashLeaseOwnerId(owner),
        ownerDiagnostic: "test",
        generation: acquired.lease.generation,
      },
    },
  };
}
function select(allowed: string[], options: auth.CredentialSelectionOptions = {}) {
  return auth.getProviderCredentialsWithQuotaPreflight("codex", null, allowed, "gpt-5.5", options);
}
test.beforeEach(async () => {
  const activeLease = leases.getActiveExclusiveConnectionLease(owner);
  if (activeLease) {
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: owner,
      generation: activeLease.generation,
      apiKeyId: "test-key",
    });
  }
  for (const id of ids.splice(0)) await providers.deleteProviderConnection(id);
  cache.__clearForTests();
  calls = 0;
  liveUsed = 5;
  await settings.updateSettings({
    fallbackStrategy: "priority",
    resilienceSettings: { quotaPreflight: { enabled: false } },
  });
  globalThis.fetch = async () => {
    throw new Error("Unexpected external request");
  };
  codexUsage.setCodexUsageFetchForTests(async () => {
    calls++;
    return response();
  });
  preflight.registerQuotaFetcher("codex", async () => ({
    isExhausted: false,
    remainingPercent: 95,
  }));
});
test.after(() => {
  globalThis.fetch = originalFetch;
  codexUsage.setCodexUsageFetchForTests(null);
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});
for (const leased of [false, true]) {
  test(`external reset recovers ${leased ? "owned lease" : "unleased account"} without invalidation`, async () => {
    const connection = await seed();
    const options = leased ? leaseOptions(connection.id) : {};
    const selected = await select([connection.id], options);
    assert.equal(selected?.connectionId, connection.id);
    assert.equal(calls, 1);
    if (leased) assert.equal(leases.getActiveExclusiveConnectionLease(owner)?.generation, 1);
    selected?.releaseOAuthSession?.();
  });
}
test("eligible sibling avoids recovery", async () => {
  const blocked = await seed();
  const healthy = await seed(5, 2);
  const selected = await select([blocked.id, healthy.id]);
  assert.equal(selected?.connectionId, healthy.id);
  assert.equal(calls, 0);
  selected?.releaseOAuthSession?.();
});
for (const missing of [false, true]) {
  test(`weekly freshness ignores fresh Spark and entry timestamp; missing=${missing}`, async () => {
    const connection = await seed();
    const entry = cache.getQuotaCache(connection.id)!;
    entry.fetchedAt = Date.now();
    entry.quotas.gpt_5_3_codex_spark_weekly = { ...entry.quotas.weekly, observedAt: Date.now() };
    if (missing) delete entry.quotas.weekly.observedAt;
    assert.equal((await select([connection.id]))?.connectionId, connection.id);
    assert.equal(calls, 1);
  });
}
for (const failed of [false, true]) {
  test(`aged 94% cutoff remains blocked; refresh fails=${failed}`, async () => {
    const connection = await seed(94);
    liveUsed = 94;
    if (failed)
      codexUsage.setCodexUsageFetchForTests(async () => {
        calls++;
        throw new Error("offline refresh");
      });
    const options = leaseOptions(connection.id);
    const selected = await select([connection.id], options);
    assert.equal(selected?.allRateLimited, true);
    assert.equal(calls, 1);
    assert.equal(leases.getActiveExclusiveConnectionLease(owner), null);
    assert.equal((await select([connection.id]))?.allRateLimited, true);
    assert.equal(calls, 1, "failed or unchanged refresh reserves the attempt cooldown");
  });
}
test("non-quota cooldown never causes a refresh", async () => {
  const connection = await seed();
  await providers.updateProviderConnection(connection.id, {
    rateLimitedUntil: resetAt(),
    errorCode: "503",
    testStatus: "unavailable",
  });
  assert.equal((await select([connection.id]))?.allRateLimited, true);
  assert.equal(calls, 0);
});
test("direct selection keeps enumerable rejection shape and terminal lease side effect", async () => {
  const connection = await seed();
  const selected = await auth.getProviderCredentials(
    "codex",
    null,
    [connection.id],
    "gpt-5.5",
    leaseOptions(connection.id)
  );
  assert.deepEqual(Object.keys(selected!).sort(), [
    "allRateLimited",
    "lastError",
    "lastErrorCode",
    "retryAfter",
    "retryAfterHuman",
  ]);
  assert.equal(leases.getActiveExclusiveConnectionLease(owner), null);
  assert.equal(calls, 0);
});
test("scheduler, manual and request refresh share one connection flight", async () => {
  const connection = await seed();
  let finish!: () => void;
  let started!: () => void;
  const pending = new Promise<void>((resolve) => {
    finish = resolve;
  });
  const dispatched = new Promise<void>((resolve) => {
    started = resolve;
  });
  codexUsage.setCodexUsageFetchForTests(async () => {
    calls++;
    started();
    await pending;
    return response();
  });
  const scheduler = usage.syncAllProviderLimits({ source: "scheduled" });
  await dispatched;
  const manual = usage.fetchAndPersistProviderLimits(connection.id, "manual", {
    allowRotatingRefresh: true,
  });
  const request = select([connection.id]);
  finish();
  const [, , selected] = await Promise.all([scheduler, manual, request]);
  assert.equal(calls, 1);
  assert.equal(selected?.connectionId, connection.id);
});
test("live-preflight-excluded A stays excluded while cached-blocked B recovers", async () => {
  const first = await seed(5);
  const second = await seed(99, 2);
  const checked: string[] = [];
  preflight.registerQuotaFetcher("codex", async (id) => {
    checked.push(id);
    return {
      percentUsed: id === first.id ? 0.99 : 0.05,
      windows: {
        weekly: { percentUsed: id === first.id ? 0.99 : 0.05, resetAt: resetAt() },
      },
    };
  });
  const selected = await select([first.id, second.id]);
  assert.equal(selected?.connectionId, second.id);
  assert.deepEqual(checked, [first.id, second.id]);
  assert.equal(calls, 1, "only B is refreshed; A's live exclusion survives recovery");
});
test("accepted refresh invalidates the Codex live-preflight memo", async () => {
  const connection = await seed();
  const { fetchCodexQuota } = await import("../../open-sse/services/codexQuotaFetcher.ts");
  let preflightReads = 0;
  globalThis.fetch = async () => {
    preflightReads++;
    return response(preflightReads === 1 ? 99 : 5);
  };
  await fetchCodexQuota(connection.id, connection);
  await usage.fetchAndPersistProviderLimits(connection.id, "manual");
  const refreshed = await fetchCodexQuota(connection.id, connection);
  assert.equal(preflightReads, 2);
  assert.equal(refreshed?.percentUsed, 0.05);
});
test("a fresh authoritative blocking window suppresses recovery", async () => {
  const connection = await seed();
  cache.getQuotaCache(connection.id)!.quotas.weekly.observedAt = Date.now();
  assert.equal((await select([connection.id]))?.allRateLimited, true);
  assert.equal(calls, 0);
});
test("a foreign auxiliary lease cannot be refreshed by unleased recovery", async () => {
  const connection = await seed();
  leaseOptions(connection.id);
  assert.equal((await select([connection.id]))?.allRateLimited, true);
  assert.equal(calls, 0);
});
test("exhausted-only cache recovery uses the requested scope", async () => {
  const connection = await seed();
  await providers.updateProviderConnection(connection.id, {
    providerSpecificData: {
      ...connection.providerSpecificData,
      limitPolicy: { enabled: false },
    },
  });
  cache.setQuotaCache(connection.id, "codex", {
    weekly: { remainingPercentage: 0, resetAt: resetAt() },
  });
  cache.getQuotaCache(connection.id)!.quotas.weekly.observedAt = Date.now() - 30_000;
  assert.equal((await select([connection.id]))?.connectionId, connection.id);
  assert.equal(calls, 1);
});
test("slow pre-reset poll cannot replace newer accepted post-reset routing evidence", async () => {
  const connection = await seed();
  codexUsage.setCodexUsageFetchForTests(async () => {
    calls++;
    cache.setQuotaCache(connection.id, "codex", {
      weekly: { remainingPercentage: 95, resetAt: resetAt() },
    });
    cache.getQuotaCache(connection.id)!.quotas.weekly.observedAt = Date.now() + 1;
    await providers.updateCodexScopedQuotaState(connection.id, "codex", {
      quotaState: { usage7d: 5, limit7d: 100, observedAt: new Date(Date.now() + 1).toISOString() },
    });
    return response(99);
  });
  await usage.fetchAndPersistProviderLimits(connection.id, "manual");
  assert.equal(cache.getQuotaCache(connection.id)!.quotas.weekly.remainingPercentage, 95);
});
test("fresh blocking window suppressing recovery still invalidates held lease", async () => {
  const connection = await seed();
  cache.getQuotaCache(connection.id)!.quotas.weekly.observedAt = Date.now();
  const options = leaseOptions(connection.id);
  assert.equal((await select([connection.id], options))?.allRateLimited, true);
  assert.equal(calls, 0);
  assert.equal(leases.getActiveExclusiveConnectionLease(owner), null);
});
test("active recovery cooldown suppressing recovery still invalidates held lease", async () => {
  const connection = await seed(94);
  liveUsed = 94;
  assert.equal((await select([connection.id]))?.allRateLimited, true);
  assert.equal(calls, 1);
  const options = leaseOptions(connection.id);
  assert.equal((await select([connection.id], options))?.allRateLimited, true);
  assert.equal(calls, 1);
  assert.equal(leases.getActiveExclusiveConnectionLease(owner), null);
});
