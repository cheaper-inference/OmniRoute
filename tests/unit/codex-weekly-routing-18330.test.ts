import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const isolatedHome = fs.mkdtempSync(path.join(os.tmpdir(), "codex-weekly-18330-"));
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
const usage = new Map<string, number>();
const calls: string[] = [];

async function seed(used: number, priority: number, extra: Record<string, unknown> = {}) {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    name: `weekly-${used}-${priority}`,
    accessToken: `fixture-${used}-${priority}`,
    priority,
    quotaWindowThresholds: { weekly: 10 },
    providerSpecificData: {
      codexLimitPolicy: { use5h: false, useWeekly: true },
      allowPaidCredits: false,
      ...extra,
    },
  });
  connections.push(connection.id);
  usage.set(connection.id, used);
  cache.markQuotaHealthy(connection.id);
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
          primary_window: {
            used_percent: usage.get(id),
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
  test(`routing honors per-account weekly cutoff with global preflight ${enabled}`, async () => {
    await settings.updateSettings({
      fallbackStrategy: "priority",
      resilienceSettings: { quotaPreflight: { enabled } },
    });
    const low = await seed(94, 1);
    const healthy = await seed(85, 2);
    const selected = await auth.getProviderCredentialsWithQuotaPreflight(
      "codex",
      null,
      null,
      "gpt-5.5"
    );
    assert.equal(selected?.connectionId, healthy.id);
    assert.deepEqual(calls, [low.id, healthy.id]);
    selected?.releaseOAuthSession?.();
  });
}
test("all accounts at or below the weekly minimum return no eligible account", async () => {
  const low = await seed(94, 1);
  const boundary = await seed(90, 2);
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.5"
  );
  assert.equal(selected?.allRateLimited, true);
  assert.equal(selected?.connectionId, undefined);
  assert.deepEqual(calls, [low.id, boundary.id]);
});
test("explicit connection preflight opt-out keeps its documented bypass", async () => {
  const low = await seed(94, 1, { quotaPreflightEnabled: false });
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.5"
  );
  assert.equal(selected?.connectionId, low.id);
  assert.deepEqual(calls, []);
  selected?.releaseOAuthSession?.();
});
test("explicit paid-credit consent can use credits below subscription cutoff", async () => {
  const paid = await seed(94, 1, { allowPaidCredits: true });
  const selected = await auth.getProviderCredentialsWithQuotaPreflight(
    "codex",
    null,
    null,
    "gpt-5.5"
  );
  assert.equal(selected?.connectionId, paid.id);
  assert.deepEqual(calls, [paid.id]);
  selected?.releaseOAuthSession?.();
});
