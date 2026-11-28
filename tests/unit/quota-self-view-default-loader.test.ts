/**
 * Runs buildQuotaSelfView with its DEFAULT account lookup (the real provider and provider-limits
 * modules plus the shared refresh tracker), against a temporary DATA_DIR of its own (set before
 * any module that can open the database is imported, so the file is safe to run on its own).
 * A fresh cached reading must be served as is, without any refresh attempt.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-self-view-loader-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { setProviderLimitsCache } = await import("../../src/lib/db/providerLimits.ts");
const { defaultQuotaRefreshTracker } =
  await import("../../src/lib/usage/apiKeySelfServiceAccounts.ts");
const { buildQuotaSelfView } = await import("../../src/lib/quota/selfView.ts");
const { BOTH, PERCENT_PLAN, input, makeDeps } = await import("./fixtures/quotaSelfView.ts");

const nowMs = Date.now();
const resetAt = new Date(nowMs + 60 * 60_000).toISOString();

const connection = await createProviderConnection({
  provider: "claude",
  authType: "oauth",
  name: "Self-service quota view default loader fixture",
  accessToken: "test-oauth-token",
  isActive: true,
  testStatus: "active",
});
const connectionId = (connection as { id?: string }).id ?? "";

setProviderLimitsCache(connectionId, {
  quotas: { "session (5h)": { usedPercentage: 37, remainingPercentage: 63, resetAt } },
  modelQuotas: { "weekly Opus (7d)": { usedPercentage: 21, remainingPercentage: 79, resetAt } },
  plan: null,
  message: null,
  fetchedAt: new Date(nowMs).toISOString(),
  source: "sync",
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("the default account lookup serves a fresh cached reading without a refresh", async () => {
  assert.ok(connectionId, "fixture connection created");
  const deps = makeDeps({
    now: () => nowMs,
    pool: { connectionId, connectionIds: [connectionId] },
    plan: PERCENT_PLAN,
    resolveConnectionProvider: async () => "claude",
    // An explicit undefined replaces the fixture's stub, so the builder loads its default lookup.
    resolveAccountQuotaEntries: undefined,
  });

  const view = await buildQuotaSelfView(input({ scopes: BOTH }), deps);

  assert.equal(view.pools.length, 2);
  for (const pool of view.pools) {
    assert.deepEqual(pool.accounts[0].dimensions[0].account, { used: 37, status: "ok", resetAt });
    assert.deepEqual(pool.accounts[0].modelWindows, {
      status: "ok",
      windows: [{ label: "weekly Opus (7d)", usedPercent: 21, resetAt }],
    });
  }
  assert.equal(defaultQuotaRefreshTracker.lastAttempt.has(connectionId), false);
  assert.equal(defaultQuotaRefreshTracker.inFlight.size, 0);
  assert.ok(!JSON.stringify(view).includes(connectionId));
});
