/**
 * Real provider-limits pipeline regression, with only the upstream HTTP call mocked.
 * This exercises OAuth connection persistence, quota parsing and paid-model routing.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const testDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-plan-usage-"));
process.env.DATA_DIR = testDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const db = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const limits = await import("../../src/lib/usage/providerLimits.ts");
const codex = await import("../../open-sse/services/usage/codex.ts");
const eligibility = await import("../../open-sse/services/codexPlanEligibility.ts");

test.beforeEach(() => {
  db.resetDbInstance();
  fs.rmSync(testDir, { recursive: true, force: true });
  fs.mkdirSync(testDir, { recursive: true });
});

test.after(() => {
  codex.setCodexUsageFetchForTests(null);
  db.resetDbInstance();
  fs.rmSync(testDir, { recursive: true, force: true });
});

test("Codex quota refresh persists Free -> Plus and fixes paid-model eligibility", async () => {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Synthetic Codex",
    email: "codex-plan-test@example.test",
    isActive: true,
    accessToken: "synthetic-access-token",
    refreshToken: "synthetic-refresh-token",
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    providerSpecificData: {
      chatgptPlanType: "free",
      workspacePlanType: "free",
      workspaceId: "workspace-test",
      workspaceInfoFetchedAt: new Date().toISOString(),
      codexLimitPolicy: { use5h: true },
    },
  });

  assert.equal(
    eligibility.isCodexPlanEligibleForModel(connection.providerSpecificData, "gpt-6-sol"),
    false
  );

  let usageCalls = 0;
  codex.setCodexUsageFetchForTests(async (url, init) => {
    assert.match(url, /\/backend-api\/wham\/usage$/);
    assert.equal(
      (init.headers as Record<string, string>)["chatgpt-account-id"],
      "workspace-test"
    );
    usageCalls++;
    return Response.json({
      plan_type: "plus",
      rate_limit: {
        primary_window: {
          limit_window_seconds: 18000,
          used_percent: 20,
          reset_after_seconds: 3600,
        },
        secondary_window: {
          limit_window_seconds: 604800,
          used_percent: 30,
          reset_after_seconds: 172800,
        },
      },
    });
  });

  try {
    const refreshed = await limits.fetchAndPersistProviderLimits(connection.id, "manual", {
      allowRotatingRefresh: false,
    });
    assert.equal(refreshed.usage.plan, "plus");
    assert.equal(refreshed.cache.plan, "plus");
    assert.equal(usageCalls, 1);

    const saved = await providers.getProviderConnectionById(connection.id);
    assert.ok(saved);
    assert.equal(saved.providerSpecificData.chatgptPlanType, "plus");
    assert.equal(saved.providerSpecificData.workspacePlanType, "plus");
    assert.equal(saved.providerSpecificData.workspaceId, "workspace-test");
    assert.deepEqual(saved.providerSpecificData.codexLimitPolicy, { use5h: true });
    assert.equal(
      eligibility.isCodexPlanEligibleForModel(saved.providerSpecificData, "gpt-6-sol"),
      true
    );
  } finally {
    codex.setCodexUsageFetchForTests(null);
  }
});
