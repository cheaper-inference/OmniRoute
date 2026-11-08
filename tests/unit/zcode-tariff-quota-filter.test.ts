import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "zcode-tariff-quota-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "fixture-key";
const db = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const quota = await import("../../src/domain/quotaCache.ts");
const auth = await import("../../src/sse/services/auth.ts");
const exhausted = {
  tokens: { remainingPercentage: 0, resetAt: new Date(Date.now() + 120_000).toISOString() },
};

test.after(() => {
  quota.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

test("OAuth Individual exhaustion does not prevent Start selection; Individual remains blocked", async () => {
  const account = await db.createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "fixture",
    accessToken: "fixture",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      limitPolicy: { enabled: true, thresholdPercent: 99, windows: ["tokens"] },
    },
  });
  quota.setQuotaCache(account.id, "zcode-individual", exhausted);
  const start = await auth.getProviderCredentials("zcode-start", null, null, "glm-5.3-flash", {
    forcedConnectionId: account.id,
  });
  assert.equal(start?.connectionId, account.id, "Individual quota cannot block Start");
  const individual = await auth.getProviderCredentials(
    "zcode-individual",
    null,
    null,
    "glm-5.3-flash",
    { forcedConnectionId: account.id }
  );
  assert.equal(individual?.allRateLimited, true, "the exhausted Individual plan is blocked");
  quota.setQuotaCache(account.id, "zcode-start", exhausted);
  const other = await auth.getProviderCredentials("zcode-individual", null, null, "glm-5.3-flash", {
    forcedConnectionId: account.id,
  });
  assert.equal(other?.connectionId, account.id, "Start quota cannot block Individual");
  const startExhausted = await auth.getProviderCredentials(
    "zcode-start",
    null,
    null,
    "glm-5.3-flash",
    { forcedConnectionId: account.id }
  );
  assert.equal(startExhausted?.allRateLimited, true, "the exhausted Start plan is blocked");
});

test("unknown quota scope is not applied to an OAuth tariff, but never exempts API keys", async () => {
  const oauth = await db.createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "unknown",
    accessToken: "fixture",
    isActive: true,
    testStatus: "active",
  });
  quota.setQuotaCache(oauth.id, "zcode", exhausted);
  const selected = await auth.getProviderCredentials("zcode-start", null, null, "glm-5.3-flash", {
    forcedConnectionId: oauth.id,
  });
  assert.equal(selected?.connectionId, oauth.id);
  const api = await db.createProviderConnection({
    provider: "zcode",
    authType: "apikey",
    name: "api",
    apiKey: "fixture",
    isActive: true,
    testStatus: "active",
  });
  quota.setQuotaCache(api.id, "zcode-individual", exhausted);
  const blocked = await auth.getProviderCredentials("zcode-start", null, null, "glm-5.3-flash", {
    forcedConnectionId: api.id,
  });
  assert.equal(blocked?.allRateLimited, true);
});

test("real OAuth terminal statuses remain unavailable", async () => {
  for (const status of ["banned", "expired", "credits_exhausted"]) {
    const account = await db.createProviderConnection({
      provider: "zcode",
      authType: "oauth",
      name: status,
      accessToken: "fixture",
      isActive: true,
      testStatus: status,
    });
    quota.setQuotaCache(account.id, "zcode-individual", exhausted);
    const selected = await auth.getProviderCredentials("zcode-start", null, null, "glm-5.3-flash", {
      forcedConnectionId: account.id,
    });
    assert.notEqual(selected?.connectionId, account.id);
  }
});

test("priority combo dispatches pinned Start when only Individual quota is exhausted", async () => {
  const account = await db.createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "combo",
    accessToken: "fixture",
    isActive: true,
    testStatus: "active",
  });
  quota.setQuotaCache(account.id, "zcode-individual", exhausted);
  const { handleComboChat } = await import("../../open-sse/services/combo.ts");
  let dispatches = 0;
  const combo = {
    name: "zcode-scope-test",
    strategy: "priority",
    models: [
      { model: "zc-start/glm-5.3-flash", providerId: "zcode-start", connectionId: account.id },
    ],
    config: { maxRetries: 0, maxSetRetries: 0 },
  };
  const response = await handleComboChat({
    body: {},
    combo,
    allCombos: [combo],
    settings: null,
    log: { info() {}, warn() {}, debug() {}, error() {} },
    isModelAvailable: async () =>
      (
        await auth.getProviderCredentials("zcode-start", null, null, "glm-5.3-flash", {
          forcedConnectionId: account.id,
        })
      )?.connectionId === account.id,
    handleSingleModel: async () => {
      dispatches++;
      return Response.json({
        id: "fixture",
        choices: [{ message: { role: "assistant", content: "ok" } }],
      });
    },
  });
  assert.equal(response.status, 200);
  assert.equal(dispatches, 1);
  const deadline = Date.now() + 5000;
  const { getLKGP } = await import("../../src/lib/db/settings/lkgp.ts");
  while ((await getLKGP("zcode-scope-test", "zcode-scope-test"))?.provider !== "zcode-start") {
    assert.ok(Date.now() < deadline);
    await new Promise<void>((resolve) => setTimeout(resolve, 5));
  }
});

test("quota-weighted ordering ignores a sibling tariff's cached zero", async () => {
  const account = await db.createProviderConnection({
    provider: "zcode-start",
    authType: "oauth",
    name: "weighted",
    accessToken: "fixture",
    isActive: true,
    testStatus: "active",
  });
  quota.setQuotaCache(account.id, "zcode-individual", exhausted);
  const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
  const { orderTargetsByQuotaWeighted } =
    await import("../../open-sse/services/combo/quotaStrategies.ts");
  registerQuotaFetcher("zcode-start", async () => ({
    used: 20,
    total: 100,
    percentUsed: 0.2,
    resetAt: new Date(Date.now() + 120_000).toISOString(),
  }));
  const targets = [
    {
      provider: "zcode-start",
      modelStr: "zc-start/glm-5.3-flash",
      executionKey: "weighted",
      connectionId: account.id,
    },
  ];
  const ordered = await orderTargetsByQuotaWeighted(targets, "weighted-zcode", {}, { warn() {} });
  assert.equal(ordered.length, 1, "Individual cached zero must not remove Start");
  quota.setQuotaCache(account.id, "zcode-start", exhausted);
  const samePlan = await orderTargetsByQuotaWeighted(targets, "weighted-same", {}, { warn() {} });
  assert.equal(samePlan.length, 0, "Start's own exhausted snapshot remains binding");
  const api = await db.createProviderConnection({
    provider: "zcode-start",
    authType: "apikey",
    name: "weighted-api",
    apiKey: "fixture",
    isActive: true,
    testStatus: "active",
  });
  quota.setQuotaCache(api.id, "zcode-individual", exhausted);
  const apiTargets = [{ ...targets[0], connectionId: api.id, executionKey: "weighted-api" }];
  const apiOrdered = await orderTargetsByQuotaWeighted(
    apiTargets,
    "weighted-api",
    {},
    { warn() {} }
  );
  assert.equal(apiOrdered.length, 0, "API-key filtering is unchanged");
});

test("mixed persisted tariff windows are unknown after cache rehydration", async () => {
  const account = await db.createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "mixed",
    accessToken: "fixture",
    isActive: true,
    testStatus: "active",
  });
  const resetAt = new Date(Date.now() + 120_000).toISOString();
  quota.setQuotaCache(account.id, "zcode-individual", {
    individual: { remainingPercentage: 0, resetAt },
  });
  quota.setQuotaCache(account.id, "zcode-start", { start: { remainingPercentage: 0, resetAt } });
  quota.__clearForTests();
  assert.equal(quota.isQuotaScopeApplicable(account.id, "zcode-start", "oauth"), false);
  assert.equal(quota.isQuotaScopeApplicable(account.id, "zcode-individual", "oauth"), false);
  assert.equal(quota.isQuotaScopeApplicable(account.id, "zcode-start", "apikey"), true);
});
