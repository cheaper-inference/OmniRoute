/**
 * getApiKeyUsageLimitStatus runs on every request of a limited key. It must not
 * (a) resolve the weekly window start (2-3 SQL statements) for every active
 * connection when only the earliest-reset one is used, nor (b) re-run the
 * per-window usage_history aggregate for the same key within a few seconds.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-key-limit-scan-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "usage-limit-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageLimits = await import("../../src/lib/usage/apiKeyUsageLimits.ts");

const NOW = Date.parse("2026-06-19T20:00:00.000Z");

/** Count prepared statements whose SQL matches, for the duration of `fn`. */
async function countStatements(pattern: RegExp, fn: () => Promise<unknown>): Promise<number> {
  const db = core.getDbInstance() as unknown as { prepare: (sql: string) => unknown };
  const original = db.prepare;
  let count = 0;
  db.prepare = function (this: unknown, sql: string) {
    if (pattern.test(sql)) count++;
    return original.call(this, sql);
  };
  try {
    await fn();
  } finally {
    db.prepare = original;
  }
  return count;
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("weekly window start is resolved for the earliest-reset connection only", async () => {
  const created = await apiKeysDb.createApiKey("Scan Key A", "machine-scan-a");
  const resets = {
    "conn-a": "2026-06-24T00:00:00.000Z",
    "conn-b": "2026-06-22T00:00:00.000Z", // earliest
    "conn-c": "2026-06-26T00:00:00.000Z",
  };
  const quotas = (resetAt: string) => ({ quotas: [{ name: "weekly (7d)", resetAt }] });
  const status = await (async () => {
    let result: Awaited<ReturnType<typeof usageLimits.getApiKeyUsageLimitStatus>> | undefined;
    const windowStatements = await countStatements(
      /quota_snapshots|provider_quota_reset_events/,
      async () => {
        result = await usageLimits.getApiKeyUsageLimitStatus(
          { id: created.id, usageLimitEnabled: true, weeklyUsageLimitUsd: 20 },
          {
            now: () => NOW,
            getProviderConnections: async () =>
              Object.keys(resets).map((id) => ({ id, provider: "claude", isActive: true })),
            getAllProviderLimitsCache: () =>
              Object.fromEntries(
                Object.entries(resets).map(([id, at]) => [id, quotas(at)])
              ) as never,
          }
        );
      }
    );
    return { result: result!, windowStatements };
  })();

  assert.equal(status.result.weeklyResetAtIso, resets["conn-b"], "earliest reset still wins");
  // One connection resolves its window start: at most 3 statements (recorded, observed, observed again).
  assert.ok(
    status.windowStatements <= 3,
    `window start resolved for more than one connection: ${status.windowStatements} statements`
  );
});

test("a second status call for the same key reuses the window spend for a few seconds", async () => {
  const created = await apiKeysDb.createApiKey("Scan Key B", "machine-scan-b");
  const metadata = { id: created.id, usageLimitEnabled: true, dailyUsageLimitUsd: 5 };
  const deps = {
    now: () => NOW,
    getProviderConnections: async () => [],
    getAllProviderLimitsCache: () => ({}),
  };

  const first = await countStatements(/FROM usage_history/, () =>
    usageLimits.getApiKeyUsageLimitStatus(metadata, deps)
  );
  const second = await countStatements(/FROM usage_history/, () =>
    usageLimits.getApiKeyUsageLimitStatus(metadata, deps)
  );

  assert.ok(first >= 2, `first call scans the daily and weekly windows (got ${first})`);
  assert.equal(second, 0, "second call within the TTL must not re-scan usage_history");
});
