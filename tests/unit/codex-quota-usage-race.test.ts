import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-quota-usage-race-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const limits = await import("../../src/lib/db/providerLimits.ts");
const usage = await import("../../src/lib/usage/providerLimits.ts");
const codexUsage = await import("../../open-sse/services/usage/codex.ts");

const start = Date.parse("2026-01-01T00:00:00.000Z");
test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  codexUsage.setCodexUsageFetchForTests(null);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const scheduled of [false, true]) {
  test(`a slow ${scheduled ? "scheduled" : "manual"} usage fetch cannot hide newer inference evidence`, async (t) => {
    const connection = await providers.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      accessToken: "synthetic-race-access",
      isActive: true,
    });
    t.mock.timers.enable({ apis: ["Date"], now: start });
    let calls = 0;
    t.mock.method(globalThis, "fetch", () => {
      throw new Error("Unexpected external request");
    });
    codexUsage.setCodexUsageFetchForTests(async (url) => {
      assert.equal(url, "https://chatgpt.com/backend-api/wham/usage");
      calls++;
      t.mock.timers.setTime(start + 60000);
      await providers.updateCodexScopedQuotaState(connection.id, "codex", {
        quotaState: { usage5h: 75, limit5h: 100, observedAt: new Date().toISOString() },
      });
      t.mock.timers.setTime(start + 120000);
      return Response.json({
        plan_type: "pro",
        rate_limit: {
          allowed: true,
          primary_window: {
            used_percent: 10,
            limit_window_seconds: 18000,
            reset_at: 1893456000,
          },
        },
      });
    });
    t.after(() => codexUsage.setCodexUsageFetchForTests(null));
    if (scheduled) await usage.syncAllProviderLimits({ source: "scheduled" });
    else await usage.fetchAndPersistProviderLimits(connection.id, "manual");
    assert.equal(calls, 1);
    const entry = limits.getProviderLimitsCache(connection.id)!;
    assert.equal(
      (entry.quotas!.session as { remainingPercentage: number }).remainingPercentage,
      25
    );
    assert.equal(entry.fetchedAt, new Date(start + 60000).toISOString());
  });
}
