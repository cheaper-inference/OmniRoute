import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-connection-fence-db-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const providers = await import("../../../src/lib/db/providers.ts");
const models = await import("../../../src/lib/db/models.ts");
const auth = await import("../../../src/sse/services/auth.ts");
const fences = await import("../../../src/lib/db/codexConnectionFences.ts");
const tokens = await import("../../../src/sse/services/tokenRefresh.ts");
const account = await import("../../../src/lib/db/providers/codexAccountRecovery.ts");
const owner = (tag: string) => ({
  accessToken: `synthetic-access-${tag}`,
  refreshToken: `synthetic-refresh-${tag}`,
  providerSpecificData: { workspaceId: `workspace-${tag}` },
  email: `${tag}@example.invalid`,
});
const seed = () =>
  providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    ...owner("a"),
  });
test.afterEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

for (const change of ["token", "workspace", "activation", "delete-recreate"] as const) {
  test(`immutable operation scope rejects late writes after ${change} ABA`, async () => {
    const c = await seed();
    const fence = fences.captureCodexConnectionFence(c, c.id);
    assert.ok(fence);
    if (change === "token") {
      await providers.updateProviderConnection(c.id, { accessToken: "synthetic-b" });
      await providers.updateProviderConnection(c.id, { accessToken: c.accessToken });
    } else if (change === "workspace") {
      await providers.updateProviderConnection(c.id, {
        providerSpecificData: { workspaceId: "b" },
      });
      await providers.updateProviderConnection(c.id, {
        providerSpecificData: c.providerSpecificData,
      });
    } else if (change === "activation") {
      await providers.updateProviderConnection(c.id, { isActive: false });
      await providers.updateProviderConnection(c.id, { isActive: true });
    } else {
      // Direct SQL models an independent process reusing the same id, bypassing domain helpers.
      const db = core.getDbInstance();
      const row = db.prepare("SELECT * FROM provider_connections WHERE id = ?").get(c.id) as Record<
        string,
        unknown
      >;
      db.prepare("DELETE FROM provider_connections WHERE id = ?").run(c.id);
      const columns = Object.keys(row);
      db.prepare(
        `INSERT INTO provider_connections (${columns.map((key) => `"${key}"`).join(",")}) VALUES (${columns.map(() => "?").join(",")})`
      ).run(...Object.values(row));
    }
    assert.equal(fences.isCodexConnectionFenceCurrent(fence), false);
    const result = await fences.runWithCodexConnectionFence(fence, () =>
      providers.updateProviderConnection(c.id, { lastError: "stale result", testStatus: "expired" })
    );
    assert.equal(result, null);
    assert.equal((await providers.getProviderConnectionById(c.id))?.testStatus, "active");
  });
}

test("capture never lends the current owner's version to old token/workspace material", async () => {
  const c = await seed();
  await providers.updateProviderConnection(c.id, owner("b"));
  assert.throws(() => fences.captureCodexConnectionFence(c, c.id), fences.StaleCodexOperationError);
});

test("late successful refresh keeps valid rotation but does not clear a newer hard stop", async () => {
  const c = await seed();
  const fence = fences.captureCodexConnectionFence(c, c.id);
  await providers.updateProviderConnection(c.id, {
    testStatus: "banned",
    lastError: "new hard stop",
    lastErrorType: "account_banned",
    lastErrorAt: new Date().toISOString(),
  });
  const persisted = await fences.runWithCodexConnectionFence(fence, () =>
    tokens.updateProviderCredentials(c.id, {
      accessToken: "synthetic-rotated",
      refreshToken: "synthetic-rotated-refresh",
      testStatus: "active",
    })
  );
  assert.equal(persisted, true);
  const after = await providers.getProviderConnectionById(c.id);
  assert.equal(after?.accessToken, "synthetic-rotated");
  assert.equal(after?.refreshToken, "synthetic-rotated-refresh");
  assert.equal(after?.testStatus, "banned");
  assert.equal(after?.lastError, "new hard stop");
});

test("positive recovery cannot clear a newer parent or scoped hard stop", async () => {
  const c = await seed();
  const fence = fences.captureCodexConnectionFence(c, c.id);
  const until = new Date(Date.now() + 600_000).toISOString();
  await providers.updateProviderConnection(c.id, {
    testStatus: "unavailable",
    lastError: "new rate limit",
    rateLimitedUntil: until,
  });
  await providers.updateCodexScopedQuotaState(c.id, "spark", {
    rateLimitedUntil: until,
    rateLimitSource: "quota_reset",
  });
  const before = await providers.getProviderConnectionById(c.id);
  await fences.runWithCodexConnectionFence(
    fence,
    async () => {
      await auth.clearAccountError(c.id, { testStatus: "unavailable", lastError: "old failure" });
      await account.syncCodexQuotaObservation(
        c.id,
        { quotas: { session: { used: 1, total: 100 }, weekly: { used: 1, total: 100 } } },
        before?.providerSpecificData
      );
    },
    true
  );
  const after = await providers.getProviderConnectionById(c.id);
  assert.equal(after?.rateLimitedUntil, until);
  assert.deepEqual(after?.providerSpecificData, before?.providerSpecificData);
});

test("catalog and synced_models_at roll back atomically if the timestamp write fails", async () => {
  const c = await seed();
  await models.replaceSyncedAvailableModelsForConnection("codex", c.id, [{ id: "before" }]);
  const before = await providers.getProviderConnectionById(c.id);
  const db = core.getDbInstance();
  db.exec(
    "CREATE TRIGGER abort_test_timestamp BEFORE UPDATE OF synced_models_at ON provider_connections BEGIN SELECT RAISE(ABORT, 'synthetic timestamp failure'); END;"
  );
  try {
    await assert.rejects(
      models.replaceSyncedAvailableModelsForConnection("codex", c.id, [{ id: "after" }]),
      /synthetic timestamp failure/
    );
  } finally {
    db.exec("DROP TRIGGER abort_test_timestamp");
  }
  assert.deepEqual(
    (await models.getSyncedAvailableModelsForConnection("codex", c.id)).map((m) => m.id),
    ["before"]
  );
  assert.equal(
    (await providers.getProviderConnectionById(c.id))?.syncedModelsAt,
    before?.syncedModelsAt
  );
});

test("independent immutable async scopes cannot authorize each other's late callbacks", async () => {
  const c = await seed();
  const a = fences.captureCodexConnectionFence(c, c.id);
  let release!: () => void;
  const blocked = new Promise<void>((done) => {
    release = done;
  });
  const old = fences.runWithCodexConnectionFence(a, async () => {
    await blocked;
    return providers.updateCodexScopeCooldown(
      c.id,
      "codex",
      new Date(Date.now() + 600_000).toISOString()
    );
  });
  await providers.updateProviderConnection(c.id, owner("b"));
  const current = await providers.getProviderConnectionById(c.id);
  const b = fences.captureCodexConnectionFence(current, c.id);
  const until = new Date(Date.now() + 900_000).toISOString();
  await fences.runWithCodexConnectionFence(b, () =>
    providers.updateCodexScopeCooldown(c.id, "spark", until)
  );
  release();
  assert.equal(await old, null);
  const after = await providers.getProviderConnectionById(c.id);
  assert.equal(after?.providerSpecificData?.codexScopeRateLimitedUntil?.spark, until);
  assert.equal(after?.providerSpecificData?.codexScopeRateLimitedUntil?.codex, undefined);
});

test("owner replacement returns the same cleaned metadata it actually committed", async () => {
  const connection = await seed();
  await providers.updateCodexScopedQuotaState(connection.id, "spark", {
    rateLimitedUntil: new Date(Date.now() + 600_000).toISOString(),
    rateLimitSource: "quota_reset",
    quotaState: { session: { used: 100, total: 100 } },
  });
  const result = await providers.updateProviderConnection(connection.id, {
    email: "replacement@example.invalid",
  });
  const stored = await providers.getProviderConnectionById(connection.id);
  assert.equal(stored?.providerSpecificData?.codexScopeRateLimitedUntil, undefined);
  assert.deepEqual(result?.providerSpecificData, stored?.providerSpecificData);
});
