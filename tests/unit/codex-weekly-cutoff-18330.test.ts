import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Refs #18330: 94% used, 6% remaining, saved 10% weekly cutoff, 5h/paid credits off.
const home = fs.mkdtempSync(path.join(os.tmpdir(), "codex-issue-18330-"));
process.env.HOME = home;
process.env.DATA_DIR = path.join(home, "data");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");
const cache = await import("../../src/domain/quotaCache.ts");
const { fetchCodexQuota, unregisterCodexConnection } =
  await import("../../open-sse/services/codexQuotaFetcher.ts");
const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
const connections: string[] = [];
const usage = new Map<string, number>();
const calls: string[] = [];

async function seed(
  weeklyUsed: number,
  priority: number,
  options: {
    cachedUsed?: number;
    cutoff?: number;
    providerSpecificData?: Record<string, unknown>;
  } = {}
) {
  const token = `synthetic-issue-18330-${connections.length}`;
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    name: `issue-18330-${priority}`,
    accessToken: token,
    priority,
    quotaWindowThresholds: { weekly: options.cutoff ?? 10 },
    providerSpecificData: {
      codexLimitPolicy: { use5h: false, useWeekly: true },
      allowPaidCredits: false,
      ...options.providerSpecificData,
    },
  });
  connections.push(connection.id);
  usage.set(token, weeklyUsed);
  if (options.cachedUsed !== undefined) {
    cache.setQuotaCache(connection.id, "codex", {
      weekly: {
        remainingPercentage: 100 - options.cachedUsed,
        resetAt: new Date(Date.now() + 600_000).toISOString(),
      },
    });
  }
  cache.markQuotaHealthy(connection.id);
  const saved = await providers.getProviderConnectionById(connection.id);
  assert.deepEqual(saved?.quotaWindowThresholds, { weekly: options.cutoff ?? 10 });
  return connection;
}

async function select() {
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.5"
  );
  selected?.releaseOAuthSession?.();
  return selected;
}

test.beforeEach(async (t) => {
  for (const id of connections.splice(0)) {
    unregisterCodexConnection(id);
    await providers.deleteProviderConnection(id);
  }
  usage.clear();
  calls.length = 0;
  cache.__clearForTests();
  t.mock.method(globalThis, "fetch", async (input: string, init: RequestInit) => {
    assert.equal(input, "https://chatgpt.com/backend-api/wham/usage");
    const token = new Headers(init.headers).get("authorization")?.replace(/^Bearer /, "");
    assert.ok(token && usage.has(token), "only a seeded offline account may be queried");
    return Response.json({
      plan_type: "pro",
      rate_limit: {
        primary_window: {
          used_percent: usage.get(token),
          limit_window_seconds: 604800,
          reset_after_seconds: 600,
        },
      },
      credits: { has_credits: true, unlimited: false, balance: "20" },
    });
  });
  registerQuotaFetcher("codex", async (id, connection) => {
    calls.push(id);
    return fetchCodexQuota(id, connection);
  });
  await settings.updateSettings({
    fallbackStrategy: "priority",
    resilienceSettings: { quotaPreflight: { enabled: false } },
  });
});

test.after(() => {
  for (const id of connections) unregisterCodexConnection(id);
  core.resetDbInstance();
  fs.rmSync(home, { recursive: true, force: true });
});

for (const enabled of [false, true]) {
  for (const weeklyUsed of [94, 90, 85]) {
    test(`#18330 live ${weeklyUsed}% used overrides old healthy evidence; global preflight ${enabled}`, async () => {
      await settings.updateSettings({
        resilienceSettings: { quotaPreflight: { enabled } },
      });
      const account = await seed(weeklyUsed, 1, { cachedUsed: 50 });
      const fallback = weeklyUsed >= 90 ? await seed(20, 2) : null;
      const selected = await select();
      assert.equal(selected?.connectionId, fallback?.id ?? account.id);
      assert.deepEqual(calls, fallback ? [account.id, fallback.id] : [account.id]);
      assert.deepEqual(
        (await providers.getProviderConnectionById(account.id))?.quotaWindowThresholds,
        { weekly: 10 },
        "quota selection must not rewrite the saved cutoff"
      );
    });
  }
  for (const strategy of ["priority", "round-robin", "p2c"]) {
    test(`#18330 cached weekly policy filters before ${strategy} selection; global preflight ${enabled}`, async () => {
      await settings.updateSettings({
        fallbackStrategy: strategy,
        resilienceSettings: { quotaPreflight: { enabled } },
      });
      const providerSpecificData = {
        limitPolicy: { enabled: true, thresholdPercent: 90, windows: ["weekly"] },
      };
      const low = await seed(94, 1, { cachedUsed: 94, providerSpecificData });
      const healthy = await seed(85, 2, { cachedUsed: 85, providerSpecificData });
      assert.equal(auth.evaluateQuotaLimitPolicy("codex", low).blocked, true);
      assert.equal(auth.evaluateQuotaLimitPolicy("codex", healthy).blocked, false);
      const selected = await select();
      assert.equal(selected?.connectionId, healthy.id);
      assert.deepEqual(calls, [healthy.id], "filtered accounts must not be probed or selected");
    });
  }
  test(`#18330 no eligible accounts returns a retry result, not the below-cutoff account; global ${enabled}`, async () => {
    await settings.updateSettings({
      resilienceSettings: { quotaPreflight: { enabled } },
    });
    const low = await seed(94, 1);
    const boundary = await seed(90, 2);
    const selected = await select();
    assert.equal(selected?.allRateLimited, true);
    assert.equal(selected?.connectionId, undefined);
    assert.deepEqual(calls, [low.id, boundary.id]);
  });
  test(`#18330 saving a stricter weekly cutoff affects the next selection; global ${enabled}`, async () => {
    await settings.updateSettings({
      resilienceSettings: { quotaPreflight: { enabled } },
    });
    const account = await seed(94, 1, { cachedUsed: 50, cutoff: 5 });
    assert.equal((await select())?.connectionId, account.id, "6% remains above a 5% cutoff");
    await providers.updateProviderConnection(account.id, { quotaWindowThresholds: { weekly: 10 } });
    const fallback = await seed(85, 2);
    assert.equal((await select())?.connectionId, fallback.id, "saved 10% cutoff takes effect");
    assert.deepEqual(calls, [account.id, account.id, fallback.id]);
  });
}

for (const providerSpecificData of [
  { quotaPreflightEnabled: false, allowPaidCredits: false },
  { quotaPreflightEnabled: true, allowPaidCredits: true },
]) {
  test(`#18330 explicit ${providerSpecificData.allowPaidCredits ? "paid-credit consent" : "preflight opt-out"} remains intentional`, async () => {
    const account = await seed(94, 1, { providerSpecificData });
    assert.equal((await select())?.connectionId, account.id);
    assert.deepEqual(calls, providerSpecificData.allowPaidCredits ? [account.id] : []);
  });
}
