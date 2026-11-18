import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const isolatedHome = fs.mkdtempSync(path.join(os.tmpdir(), "codex-dual-routing-18330-"));
process.env.HOME = isolatedHome;
process.env.DATA_DIR = path.join(isolatedHome, "data");
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
const originalFetch = globalThis.fetch;
const connections: string[] = [];
const usage = new Map<string, { session: number; weekly: number }>();
const calls: string[] = [];

async function seed(
  session: number,
  weekly: number,
  priority: number,
  use5h: boolean,
  useWeekly: boolean
) {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    name: `dual-${session}-${weekly}-${priority}`,
    accessToken: `fixture-${priority}`,
    priority,
    quotaWindowThresholds: { session: 10, weekly: 10 },
    providerSpecificData: {
      codexLimitPolicy: { use5h, useWeekly },
      allowPaidCredits: false,
      limitPolicy: { enabled: true, thresholdPercent: 90 },
    },
  });
  connections.push(connection.id);
  usage.set(connection.id, { session, weekly });
  cache.setQuotaCache(connection.id, "codex", {
    session: {
      remainingPercentage: 100 - session,
      resetAt: new Date(Date.now() + 600_000).toISOString(),
    },
    weekly: {
      remainingPercentage: 100 - weekly,
      resetAt: new Date(Date.now() + 600_000).toISOString(),
    },
  });
  return connection;
}
test.beforeEach(async () => {
  for (const id of connections.splice(0)) {
    unregisterCodexConnection(id);
    await providers.deleteProviderConnection(id);
  }
  cache.__clearForTests();
  calls.length = 0;
  registerQuotaFetcher("codex", async (id, connection) => {
    calls.push(id);
    globalThis.fetch = async () =>
      Response.json({
        rate_limit: {
          limit_reached: true,
          primary_window: {
            used_percent: usage.get(id)?.session,
            limit_window_seconds: 18000,
            reset_after_seconds: 600,
          },
          secondary_window: {
            used_percent: usage.get(id)?.weekly,
            limit_window_seconds: 604800,
            reset_after_seconds: 600,
          },
        },
        credits: { has_credits: true, unlimited: false, balance: "20" },
      });
    return fetchCodexQuota(id, connection);
  });
});
test.after(() => {
  globalThis.fetch = originalFetch;
  for (const id of connections) unregisterCodexConnection(id);
  core.resetDbInstance();
  fs.rmSync(isolatedHome, { recursive: true, force: true });
});

for (const enabled of [false, true]) {
  for (const use5h of [false, true]) {
    test(`routing respects disabled ${use5h ? "weekly" : "session"} with global preflight ${enabled}`, async () => {
      await settings.updateSettings({
        fallbackStrategy: "priority",
        resilienceSettings: { quotaPreflight: { enabled } },
      });
      const selectedAccount = await seed(use5h ? 85 : 100, use5h ? 100 : 85, 1, use5h, !use5h);
      await seed(85, 85, 2, true, true);
      const selected = await auth.getProviderCredentialsWithQuotaPreflight(
        "codex",
        null,
        null,
        "gpt-5.5"
      );
      assert.equal(selected?.connectionId, selectedAccount.id);
      assert.deepEqual(calls, [selectedAccount.id]);
      selected?.releaseOAuthSession?.();
    });
  }
}
test("cached selection skips an enabled exhausted window but accepts disabled exhaustion", async () => {
  const low = await seed(100, 94, 1, false, true);
  const healthy = await seed(100, 85, 2, false, true);
  assert.equal(auth.evaluateQuotaLimitPolicy("codex", low).blocked, true);
  assert.equal(auth.evaluateQuotaLimitPolicy("codex", healthy).blocked, false);
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.5"
  );
  assert.equal(selected?.connectionId, healthy.id);
  assert.deepEqual(calls, [healthy.id]);
  selected?.releaseOAuthSession?.();
});
test("both toggles disabled preserve eligibility despite explicit cutoffs and aggregate flag", async () => {
  const account = await seed(100, 100, 1, false, false);
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.5"
  );
  assert.equal(selected?.connectionId, account.id);
  assert.deepEqual(calls, [account.id]);
  selected?.releaseOAuthSession?.();
});
test("all accounts below enabled weekly cutoff are excluded", async () => {
  await seed(100, 94, 1, false, true);
  await seed(100, 90, 2, false, true);
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.5"
  );
  assert.equal(selected?.allRateLimited, true);
  assert.equal(selected?.connectionId, undefined);
});

test("cached observations remain intact for independent policy decisions", () => {
  const id = "dual-shared-observation";
  const resetAt = new Date(Date.now() + 600_000).toISOString();
  cache.setQuotaCache(id, "codex", {
    session: { remainingPercentage: 0, resetAt },
    weekly: { remainingPercentage: 0, resetAt },
  });
  const disabled = { codexLimitPolicy: { use5h: false, useWeekly: false } };
  const enabled = { codexLimitPolicy: { use5h: true, useWeekly: true } };
  for (const model of ["gpt-5.5", null]) {
    assert.equal(cache.isQuotaExhaustedForRequest(id, "codex", model, disabled), false);
    assert.equal(cache.isQuotaExhaustedForRequest(id, "codex", model, enabled), true);
    assert.equal(cache.isQuotaExhaustedForRequest(id, "codex", model, disabled), false);
  }
  assert.equal(cache.getQuotaCache(id)?.quotas.session.remainingPercentage, 0);
});
test("unknown cached exhaustion and an unattributed upstream 429 survive disabled toggles", () => {
  const disabled = { codexLimitPolicy: { use5h: false, useWeekly: false } };
  const resetAt = new Date(Date.now() + 600_000).toISOString();
  cache.setQuotaCache("dual-unknown", "codex", {
    session: { remainingPercentage: 0, resetAt },
    unknown_primary: { remainingPercentage: 0, resetAt },
  });
  assert.equal(
    cache.isQuotaExhaustedForRequest("dual-unknown", "codex", "gpt-5.5", disabled),
    true
  );
  cache.markAccountExhaustedFrom429("dual-no-windows", "codex");
  assert.equal(
    cache.isQuotaExhaustedForRequest("dual-no-windows", "codex", "gpt-5.5", disabled),
    true
  );
});
test("cached Spark identity remains separate while respecting toggles", () => {
  const resetAt = new Date(Date.now() + 600_000).toISOString();
  cache.setQuotaCache("dual-spark", "codex", {
    session: { remainingPercentage: 0, resetAt },
    weekly: { remainingPercentage: 0, resetAt },
    gpt_5_3_codex_spark_session: { remainingPercentage: 0, resetAt },
    gpt_5_3_codex_spark_weekly: { remainingPercentage: 15, resetAt },
  });
  const policy = { codexLimitPolicy: { use5h: false, useWeekly: true } };
  assert.equal(
    cache.isQuotaExhaustedForRequest("dual-spark", "codex", "gpt-5.3-codex-spark", policy),
    false
  );
  assert.equal(cache.isQuotaExhaustedForRequest("dual-spark", "codex", "gpt-5.5", policy), true);
});
