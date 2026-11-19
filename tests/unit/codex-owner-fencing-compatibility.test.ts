import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-owner-compatibility-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const tokens = await import("../../src/sse/services/tokenRefresh.ts");
const quota = await import("../../src/domain/quotaCache.ts");
const { _clearTokenRotationMap } =
  await import("../../open-sse/services/tokenRefresh/rotationMap.ts");
const originalFetch = globalThis.fetch;
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
const owner = (tag: string) => ({
  accessToken: `synthetic-${tag}`,
  refreshToken: `synthetic-refresh-${tag}`,
  email: `${tag}@example.invalid`,
  providerSpecificData: { workspaceId: `workspace-${tag}` },
});
const seed = () =>
  providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    testStatus: "active",
    isActive: true,
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
    ...owner("a"),
  });
test.afterEach(() => {
  globalThis.fetch = originalFetch;
  _clearTokenRotationMap();
  quota.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

test("identical concurrent proactive-refresh waiters share one valid persisted token", async () => {
  const connection = await seed();
  const started = deferred<void>();
  const release = deferred<Response>();
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    started.resolve();
    return release.promise;
  };
  const credentials = { ...connection, connectionId: connection.id };
  const first = tokens.checkAndRefreshToken("codex", credentials);
  await started.promise;
  const second = tokens.checkAndRefreshToken("codex", credentials);
  const results = Promise.all([first, second]);
  release.resolve(
    Response.json({
      access_token: "synthetic-rotated",
      refresh_token: "synthetic-rotated-refresh",
      expires_in: 3600,
    })
  );
  for (const result of await results) assert.equal(result.accessToken, "synthetic-rotated");
  assert.equal(calls, 1);
  assert.equal(
    (await providers.getProviderConnectionById(connection.id))?.refreshToken,
    "synthetic-rotated-refresh"
  );
});

test("expiry-first burn metrics coexist with owner epochs and reset on account replacement", async (t) => {
  let now = Date.now();
  t.mock.method(Date, "now", () => now);
  const connection = await seed();
  const resetAt = new Date(now + 3_600_000).toISOString();
  quota.setQuotaCache(connection.id, "codex", {
    session: { used: 10, total: 100, resetAt },
  });
  const first = quota.getQuotaCache(connection.id);
  assert.match(first?.codexOwnerEpoch ?? "", /^[a-f0-9]{32}$/);
  assert.equal(first?.burnMetrics?.observations.session.remainingPercentage, 90);

  now += 60_000;
  quota.setQuotaCache(connection.id, "codex", {
    session: { used: 20, total: 100, resetAt },
  });
  const measured = quota.getQuotaCache(connection.id);
  assert.equal(measured?.codexOwnerEpoch, first?.codexOwnerEpoch);
  assert.ok(measured?.burnMetrics?.rates.session.fractionPerHour > 0);

  await providers.updateProviderConnection(connection.id, owner("b"));
  // The first fresh write must invalidate the old metrics even without a prior cache read.
  quota.setQuotaCache(connection.id, "codex", {
    session: { used: 30, total: 100, resetAt },
  });
  const replacement = quota.getQuotaCache(connection.id);
  assert.notEqual(replacement?.codexOwnerEpoch, first?.codexOwnerEpoch);
  assert.equal(replacement?.burnMetrics?.observations.session.remainingPercentage, 70);
  assert.equal(replacement?.burnMetrics?.rates.session, undefined);
});

for (const aba of [false, true]) {
  test(`routing cache and persisted snapshots cannot survive ${aba ? "A-to-B-to-A" : "A-to-B"} owner replacement`, async () => {
    const connection = await seed();
    const resetAt = new Date(Date.now() + 600_000).toISOString();
    quota.setQuotaCache(connection.id, "codex", {
      session: { used: 100, total: 100, resetAt },
      weekly: { used: 100, total: 100, resetAt },
    });
    assert.equal(quota.isQuotaExhaustedForRequest(connection.id, "codex"), true);
    await providers.updateProviderConnection(connection.id, owner("b"));
    if (aba) await providers.updateProviderConnection(connection.id, owner("a"));
    assert.equal(quota.getQuotaCache(connection.id), null);
    assert.equal(quota.isQuotaExhaustedForRequest(connection.id, "codex"), false);
    assert.equal(quota.getQuotaWeightedRemainingPercent(connection.id), null);
    quota.__clearForTests(); // simulate restart: old SQLite snapshots must not rehydrate either
    assert.equal(quota.isQuotaExhaustedForRequest(connection.id, "codex"), false);
    assert.equal(quota.getQuotaWindowStatus(connection.id, "session"), null);
    quota.setQuotaCache(connection.id, "codex", { session: { used: 20, total: 100, resetAt } });
    quota.__clearForTests();
    assert.equal(quota.getQuotaWindowStatus(connection.id, "session")?.remainingPercentage, 80);
  });
}
