import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "zcode-cn-routing-"));
process.env.DATA_DIR = dir;
process.env.API_KEY_SECRET = "fixture-key";
const db = await import("../../src/lib/db/providers.ts");
const core = await import("../../src/lib/db/core.ts");
const quota = await import("../../src/domain/quotaCache.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { isZcodeTariffQuota429 } = await import("../../open-sse/handlers/chatCore/keyHealth.ts");

test.after(() => {
  quota.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});

test("OAuth route selects the proper family, respects pins and never falls across families", async () => {
  const accounts = [];
  for (const family of ["zai", "bigmodel"]) {
    accounts.push(
      await db.createProviderConnection({
        provider: "zcode",
        authType: "oauth",
        name: family,
        accessToken: family,
        isActive: true,
        testStatus: "active",
        providerSpecificData: { family },
      })
    );
  }
  for (const [provider, index] of [
    ["zcode-start", 0],
    ["zcode-individual", 0],
    ["zcode-cn-start", 1],
    ["zcode-cn-individual", 1],
  ] as const) {
    const selected = await auth.getProviderCredentials(provider, null, null, "glm-5.3-flash");
    assert.equal(selected?.connectionId, accounts[index].id, provider);
    const pinned = await auth.getProviderCredentials(provider, null, null, "glm-5.3-flash", {
      forcedConnectionId: accounts[index].id,
    });
    assert.equal(pinned?.connectionId, accounts[index].id, `${provider} pinned`);
    const crossPinned = await auth.getProviderCredentials(provider, null, null, "glm-5.3-flash", {
      forcedConnectionId: accounts[1 - index].id,
    });
    assert.equal(crossPinned?.connectionId, accounts[1 - index].id, `${provider} explicit pin`);
    const wrongOnly = await auth.getProviderCredentials(
      provider,
      null,
      [accounts[1 - index].id],
      "glm-5.3-flash"
    );
    assert.notEqual(
      wrongOnly?.connectionId,
      accounts[1 - index].id,
      `${provider} must not cross families`
    );
    assert.notEqual(wrongOnly?.connectionId, "noauth", `${provider} must not use synthetic`);
  }
});

test("CN OAuth quota is isolated by tariff and never hides auth or provider errors", () => {
  const id = "cn-quota-fixture";
  const exhausted = {
    tokens: { remainingPercentage: 0, resetAt: new Date(Date.now() + 120_000).toISOString() },
  };
  quota.setQuotaCache(id, "zcode-cn-individual", exhausted);
  assert.equal(quota.isQuotaScopeApplicable(id, "zcode-cn-start", "oauth"), false);
  assert.equal(quota.isQuotaScopeApplicable(id, "zcode-cn-individual", "oauth"), true);
  assert.equal(quota.isQuotaScopeApplicable(id, "zcode-cn-start", "apikey"), true);
  quota.setQuotaCache(id, "zcode-cn-start", exhausted);
  assert.equal(quota.isQuotaScopeApplicable(id, "zcode-cn-individual", "oauth"), false);
  assert.equal(quota.isQuotaScopeApplicable(id, "zcode-cn-start", "oauth"), true);
  for (const provider of ["zcode-cn-start", "zcode-cn-individual"]) {
    assert.equal(isZcodeTariffQuota429(provider, "oauth", 429, "quota exhausted"), true);
    for (const detail of ["banned", "invalid token", "provider error"])
      assert.equal(isZcodeTariffQuota429(provider, "oauth", 429, detail), false);
    assert.equal(isZcodeTariffQuota429(provider, "apikey", 429, "quota exhausted"), false);
  }
});

test("CN 429 locks the exact account, plan and model while auth failures remain global", async () => {
  const { isModelLocked } = await import("../../open-sse/services/accountFallback.ts");
  const create = () =>
    db.createProviderConnection({
      provider: "zcode",
      authType: "oauth",
      name: "locks",
      accessToken: "fixture",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { family: "bigmodel" },
    });
  const first = await create();
  const second = await create();
  await auth.markAccountUnavailable(
    first.id,
    429,
    "1310 Weekly/Monthly Limit Exhausted",
    "zcode-cn-individual",
    "glm-5.3-flash"
  );
  assert.equal(isModelLocked("zcode-cn-individual", first.id, "glm-5.3-flash"), true);
  assert.equal(isModelLocked("zcode-cn-start", first.id, "glm-5.3-flash"), false);
  assert.equal(isModelLocked("zcode-cn-individual", second.id, "glm-5.3-flash"), false);
  assert.equal(isModelLocked("zcode-cn-individual", first.id, "glm-5.3"), false);
  const third = await create();
  await auth.markAccountUnavailable(
    third.id,
    429,
    "1310 Weekly/Monthly Limit Exhausted",
    "zcode-cn-start",
    "glm-5.3-flash"
  );
  assert.equal(isModelLocked("zcode-cn-start", third.id, "glm-5.3-flash"), true);
  assert.equal(isModelLocked("zcode-cn-individual", third.id, "glm-5.3-flash"), false);
  await auth.markAccountUnavailable(
    second.id,
    401,
    "invalid token",
    "zcode-cn-start",
    "glm-5.3-flash"
  );
  const row = await db.getProviderConnectionById(second.id);
  assert.ok(row?.rateLimitedUntil || row?.testStatus === "expired" || row?.testStatus === "banned");
});

test("inactive banned OAuth pool never falls through to synthetic credentials", async () => {
  await db.createProviderConnection({
    provider: "zcode",
    authType: "oauth",
    name: "inactive",
    accessToken: "fixture",
    isActive: false,
    testStatus: "banned",
    providerSpecificData: { family: "zai" },
  });
  const rows = await db.getProviderConnections({ provider: "zcode" });
  for (const row of rows) {
    await db.updateProviderConnection(row.id, { isActive: false, testStatus: "banned" });
  }
  const selected = await auth.getProviderCredentials("zcode-start", null, null, "glm-5.3-flash");
  assert.notEqual(selected?.connectionId, "noauth");
  assert.equal(selected?.allExpired, true);
});
