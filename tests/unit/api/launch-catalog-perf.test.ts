/**
 * Launch sessions share their parent's `/v1/models` cache entry.
 *
 * - sessions of one parent (no view) and the parent key itself share one build;
 * - a revoked or expired token is refused at once, never served from the parent's entry;
 * - a view adds `|view=<hash>` to the key: same view shares, a different view does not;
 * - a restricted parent's session never sees the unrestricted parent's catalog;
 * - `launchCatalogCacheIdentity` / `guardLaunchCatalogBuild` contracts, and a build that
 *   finishes after its session changed is never stored under the parent's entry.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

type CatalogBody = { data: Array<{ id: string }> };

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-launch-catalog-perf-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "launch-catalog-perf-test-secret";
process.env.JWT_SECRET = "launch-catalog-perf-test-jwt-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";
delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;
delete process.env.INITIAL_PASSWORD;
delete process.env.REQUIRE_API_KEY;

const { unexpectedCatalogNetworkRequests } =
  await import("../../_helpers/catalogNetworkGuard13389.ts");
const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const launchSessions = await import("../../../src/lib/db/launchSessions.ts");
const { invalidateDbCache } = await import("../../../src/lib/db/readCache.ts");
const { viewHash } = await import("../../../src/shared/launch/viewSelect.ts");
const { opaqueTokenFingerprint } =
  await import("../../../open-sse/utils/opaqueTokenFingerprint.ts");
const { aiHordeImageCatalog } = await import("../../../open-sse/services/aihordeImageCatalog.ts");
const catalog = await import("../../../src/app/api/v1/models/catalog.ts");
const cache = await import("../../../src/app/api/v1/models/catalogCache.ts");
const launchView = await import("../../../src/app/api/v1/models/catalogLaunchView.ts");

test.afterEach(() => {
  assert.deepEqual(unexpectedCatalogNetworkRequests, [], "catalog tests must not use the network");
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const FIXTURE_MODELS = ["cp-alpha", "cp-bravo", "cp-charlie"];

let seeded = false;
async function seedCatalog() {
  if (seeded) return;
  seeded = true;
  aiHordeImageCatalog.setFetch(async () => Response.json([]));
  await aiHordeImageCatalog.ensureFresh();
  await settingsDb.updateSettings({
    password: "launch-catalog-perf-test-password",
    requireLogin: true,
    requireAuthForModels: true,
    hideAutoCombos: true,
    hideNoThinkVariants: true,
  });
  const { id } = await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    name: "launch-catalog-perf-groq",
    apiKey: "groq-launch-catalog-perf-test-key",
    isActive: true,
    testStatus: "active",
  });
  assert.ok(typeof id === "string");
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "groq",
    id,
    FIXTURE_MODELS.map((model) => ({ id: model, name: model, supportedEndpoints: ["chat"] }))
  );
}

function request(token?: string): Request {
  return new Request("http://localhost/api/v1/models", {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
}

async function read(token: string): Promise<{ status: number; text: string }> {
  const response = await catalog.getUnifiedModelsResponse(request(token));
  return { status: response.status, text: await response.text() };
}

const ids = (text: string): string[] => (JSON.parse(text) as CatalogBody).data.map((m) => m.id);

async function newParent(name: string) {
  const created = await apiKeysDb.createApiKey(name, "launch-catalog-perf");
  return { id: created.id as string, key: created.key as string };
}

function mintSession(
  parent: { id: string; key: string },
  extra: { ids?: string[]; now?: number; ttlSeconds?: number } = {}
) {
  return launchSessions.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: parent.key,
    toolId: "opencode",
    view: extra.ids ? { hash: viewHash(extra.ids), ids: extra.ids } : undefined,
    now: extra.now,
    ttlSeconds: extra.ttlSeconds,
  });
}

function resetCounter() {
  cache.__resetCatalogBuilderRunsForTest();
}

test("sessions of one parent and the parent key share one catalog build", async () => {
  await seedCatalog();
  const parent = await newParent("share-parent");
  const a = mintSession(parent);
  const b = mintSession(parent);
  invalidateDbCache();
  resetCounter();

  const first = await read(a.token);
  assert.equal(first.status, 200);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 1);

  const second = await read(b.token);
  const third = await read(parent.key);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 1, "no further builds");
  assert.equal(second.status, 200);
  assert.equal(third.status, 200);
  assert.equal(second.text, first.text);
  assert.equal(third.text, first.text);
});

test("a revoked or expired session token is refused at once", async () => {
  await seedCatalog();
  const parent = await newParent("revoke-parent");
  const { session, token } = mintSession(parent);
  invalidateDbCache();
  resetCounter();

  assert.equal((await read(token)).status, 200);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 1);

  assert.equal(launchSessions.revokeLaunchSession(session.id), true);
  assert.equal((await read(token)).status, 401, "revoked token must not hit the cache");
  const viaParent = await read(parent.key);
  assert.equal(viaParent.status, 200);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), 1, "parent still served from cache");

  const expired = mintSession(parent, { now: Date.now() - 2 * 60 * 60 * 1000, ttlSeconds: 60 });
  assert.equal((await read(expired.token)).status, 401);
});

test("sessions with the same view share a build, a different view gets its own", async () => {
  await seedCatalog();
  const parent = await newParent("view-parent");
  const viewIds = ["groq/cp-charlie", "groq/cp-alpha"];
  const otherIds = ["groq/cp-bravo"];
  const a = mintSession(parent, { ids: viewIds });
  const b = mintSession(parent, { ids: viewIds });
  const c = mintSession(parent, { ids: otherIds });
  invalidateDbCache();
  resetCounter();

  const parentRead = await read(parent.key);
  const parentIds = ids(parentRead.text);
  const afterParent = cache.__getCatalogBuilderRunsForTest();
  assert.equal(afterParent, 1);

  const first = await read(a.token);
  assert.equal(first.status, 200);
  const afterFirst = cache.__getCatalogBuilderRunsForTest();
  assert.equal(afterFirst, 2, "a view gets its own entry");

  const second = await read(b.token);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), afterFirst, "same view shares the build");
  assert.deepEqual(ids(first.text), viewIds);
  assert.deepEqual(ids(second.text), viewIds);
  for (const id of viewIds) assert.ok(parentIds.includes(id), `${id} is in the parent catalog`);

  const other = await read(c.token);
  assert.equal(other.status, 200);
  assert.equal(cache.__getCatalogBuilderRunsForTest(), afterFirst + 1, "different view builds");
  assert.deepEqual(ids(other.text), otherIds);
});

test("a session of a restricted parent never sees the unrestricted parent's catalog", async () => {
  await seedCatalog();
  const open = await newParent("iso-open");
  const restricted = await newParent("iso-restricted");
  await apiKeysDb.updateApiKeyPermissions(restricted.id, {
    modelAccessMode: "restricted",
    allowedModels: ["groq/cp-alpha"],
  });
  const openSession = mintSession(open);
  const restrictedSession = mintSession(restricted);
  invalidateDbCache();
  resetCounter();

  const openIds = ids((await read(open.key)).text);
  assert.ok(openIds.includes("groq/cp-bravo"), "unrestricted parent sees the fixture models");
  const openSessionIds = ids((await read(openSession.token)).text);
  assert.deepEqual(openSessionIds, openIds);

  const restrictedParentIds = ids((await read(restricted.key)).text);
  const restrictedSessionIds = ids((await read(restrictedSession.token)).text);
  assert.deepEqual(restrictedParentIds, ["groq/cp-alpha"]);
  assert.deepEqual(restrictedSessionIds, restrictedParentIds);
});

test("launchCatalogCacheIdentity: null for non-launch bearers, parent identity for sessions", async () => {
  await seedCatalog();
  const parent = await newParent("identity-parent");
  const { session, token } = mintSession(parent);

  assert.equal(launchView.launchCatalogCacheIdentity(request()), null);
  assert.equal(launchView.launchCatalogCacheIdentity(request(parent.key)), null);
  assert.equal(launchView.launchCatalogCacheIdentity(request("sk-not-a-launch-token")), null);

  assert.deepEqual(launchView.launchCatalogCacheIdentity(request(token)), {
    credential: opaqueTokenFingerprint(parent.key),
    viewSuffix: "",
    shared: true,
  });

  launchSessions.revokeLaunchSession(session.id);
  const revoked = launchView.launchCatalogCacheIdentity(request(token));
  assert.ok(revoked);
  assert.equal(revoked.shared, false);
  assert.notEqual(revoked.credential, opaqueTokenFingerprint(parent.key));

  const garbage = launchView.launchCatalogCacheIdentity(request("olx_garbage"));
  assert.ok(garbage);
  assert.equal(garbage.shared, false);
  assert.notEqual(garbage.credential, opaqueTokenFingerprint(parent.key));
});

test("guardLaunchCatalogBuild: passes, rejects on a mid-build revoke, or returns the builder", async () => {
  await seedCatalog();
  const parent = await newParent("guard-parent");

  const ok = mintSession(parent);
  const okRequest = request(ok.token);
  const okIdentity = launchView.launchCatalogCacheIdentity(okRequest);
  assert.ok(okIdentity?.shared);
  const unchanged = launchView.guardLaunchCatalogBuild(async () => "built", okIdentity);
  assert.equal(await unchanged(okRequest), "built");

  const doomed = mintSession(parent);
  const doomedRequest = request(doomed.token);
  const doomedIdentity = launchView.launchCatalogCacheIdentity(doomedRequest);
  const guarded = launchView.guardLaunchCatalogBuild(async () => {
    launchSessions.revokeLaunchSession(doomed.session.id);
    return "built";
  }, doomedIdentity);
  await assert.rejects(guarded(doomedRequest), launchView.LaunchSessionChangedError);

  const plain = async () => "plain";
  assert.equal(launchView.guardLaunchCatalogBuild(plain, null), plain);
});

test("a build that finishes after its session was revoked is never stored", async () => {
  await seedCatalog();
  const parent = await newParent("race-parent");
  const { session, token } = mintSession(parent);
  invalidateDbCache();
  resetCounter();

  const leak = {
    body: '{"object":"list","data":[{"id":"LEAK"}]}',
    headers: {},
    status: 200,
    cacheTTL: 60000,
  };
  // A refused build must reach the caller only: the in-flight cleanup chain must not raise
  // an unhandledRejection (a crash under Node's default mode). Listen for one here.
  const previous = process.listeners("unhandledRejection");
  process.removeAllListeners("unhandledRejection");
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", onUnhandled);
  await assert.rejects(
    cache.resolveCachedCatalogResponse(
      request(token),
      { corsHeaders: {}, diagnosticHeaders: {} },
      async () => {
        launchSessions.revokeLaunchSession(session.id);
        return leak;
      }
    ),
    launchView.LaunchSessionChangedError
  );

  await new Promise((resolve) => setImmediate(resolve));
  process.off("unhandledRejection", onUnhandled);
  for (const listener of previous) process.on("unhandledRejection", listener);
  assert.deepEqual(unhandled, [], "a refused launch build raises no unhandledRejection");

  const viaParent = await read(parent.key);
  assert.equal(viaParent.status, 200);
  assert.ok(!ids(viaParent.text).includes("LEAK"));
});
