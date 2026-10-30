import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-quota-batch-owner-"));
process.env.DATA_DIR = dataDir;
process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const limits = await import("../../src/lib/usage/providerLimits.ts");
const { setCodexUsageFetchForTests } = await import("../../open-sse/services/usage/codex.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
function usage(percent: number) {
  return Response.json({
    rate_limit: {
      primary_window: { used_percent: percent, reset_after_seconds: 300 },
      secondary_window: { used_percent: percent, reset_after_seconds: 600 },
    },
  });
}
const owner = (tag: string) => ({
  accessToken: `synthetic-${tag}`,
  email: `${tag}@example.invalid`,
  providerSpecificData: { workspaceId: `workspace-${tag}` },
});
test.afterEach(() => {
  setCodexUsageFetchForTests(null);
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

test("deferred batch persistence rechecks the owner of an earlier completed quota response", async () => {
  const first = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    priority: 1,
    ...owner("a"),
  });
  const second = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    priority: 2,
    ...owner("second"),
  });
  const started = deferred<void>();
  const release = deferred<Response>();
  setCodexUsageFetchForTests(async (_input, init) => {
    const authorization = new Headers(init.headers).get("authorization");
    if (authorization === "Bearer synthetic-a") return usage(10);
    assert.equal(authorization, "Bearer synthetic-second");
    started.resolve();
    return release.promise;
  });
  const operation = limits.syncAllProviderLimits({ source: "manual" });
  await Promise.race([
    started.promise,
    operation.then(() => {
      throw new Error("batch did not reach second account");
    }),
  ]);
  await providers.updateProviderConnection(first.id, owner("b"));
  release.resolve(usage(20));
  const result = await operation;
  assert.equal(
    limits.getCachedProviderLimitsMap()[first.id],
    undefined,
    "late batch must not store first owner's quota on the replacement"
  );
  assert.equal(
    result.caches[first.id],
    undefined,
    "batch response must not advertise the replaced owner's quota"
  );
  assert.ok(limits.getCachedProviderLimitsMap()[second.id]);
});

test("owner replacement invalidates already-hydrated routing quota rather than blocking the new owner", async () => {
  const c = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "active",
    ...owner("a"),
  });
  setCodexUsageFetchForTests(async () => usage(100));
  await limits.fetchAndPersistProviderLimits(c.id);
  assert.ok(quotaCache.getQuotaCache(c.id));
  await providers.updateProviderConnection(c.id, owner("b"));
  assert.equal(quotaCache.getQuotaCache(c.id), null);
  assert.equal(limits.getCachedProviderLimitsMap()[c.id], undefined);
});
