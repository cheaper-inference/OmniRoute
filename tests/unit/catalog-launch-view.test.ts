/**
 * Launch-session server view over `/v1/models` (architecture 3.2, 3.3 steps 4-5).
 *
 * Invariants under test:
 * - the served list is intersect(authorized catalog, view ids) in VIEW order;
 * - the view never adds an id, and never one the parent key cannot already see;
 * - every helper is inert (input reference / empty cache-key suffix) without an `olx_`
 *   bearer carrying a view, so no other caller's catalog or cache key changes.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-catalog-launch-view-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "catalog-launch-view-test-secret";
process.env.JWT_SECRET = "catalog-launch-view-test-jwt-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
// A cold catalog build can exceed the default bound on a loaded runner; the bound is not
// what this file covers.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;
delete process.env.INITIAL_PASSWORD;
delete process.env.REQUIRE_API_KEY;

const { unexpectedCatalogNetworkRequests } =
  await import("../_helpers/catalogNetworkGuard13389.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const launchSessions = await import("../../src/lib/db/launchSessions.ts");
const { viewHash } = await import("../../src/shared/launch/viewSelect.ts");
const { hasManageScope } = await import("../../src/shared/constants/managementScopes.ts");
const { aiHordeImageCatalog } = await import("../../open-sse/services/aihordeImageCatalog.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const { applyLaunchView, launchViewFromKeyMetadata, launchViewCacheKeySuffix } =
  await import("../../src/app/api/v1/models/catalogLaunchView.ts");

type Row = { id: string; [key: string]: unknown };

function view(ids: string[]) {
  return { hash: viewHash(ids), ids };
}

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  catalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(resetStorage);

test.afterEach(() => {
  assert.deepEqual(unexpectedCatalogNetworkRequests, [], "catalog tests must not use the network");
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ---------------------------------------------------------------- applyLaunchView (pure)

const ROWS: Row[] = [
  { id: "a/one", n: 1 },
  { id: "b/two", n: 2 },
  { id: "c/three", n: 3 },
  { id: "d/four", n: 4 },
];

test("applyLaunchView serves rows in view order, not catalog order", () => {
  const out = applyLaunchView(ROWS, view(["d/four", "a/one", "c/three"]));
  assert.deepEqual(
    out.map((row) => row.id),
    ["d/four", "a/one", "c/three"]
  );
  // The very same row objects, never copies or synthesized rows.
  assert.equal(out[0], ROWS[3]);
  assert.equal(out[1], ROWS[0]);
});

test("applyLaunchView drops view ids missing from the catalog and never adds a row", () => {
  const out = applyLaunchView(ROWS, view(["zz/missing", "b/two", "also/missing"]));
  assert.deepEqual(
    out.map((row) => row.id),
    ["b/two"]
  );
  for (const row of out) assert.ok(ROWS.includes(row), "every served row comes from the input");
  assert.deepEqual(applyLaunchView(ROWS, view(["zz/missing"])), []);
  assert.deepEqual(applyLaunchView(ROWS, view([])), []);
  assert.deepEqual(applyLaunchView([], view(["a/one"])), []);
});

test("applyLaunchView emits a duplicated view id once", () => {
  const out = applyLaunchView(ROWS, { hash: "x", ids: ["c/three", "a/one", "c/three"] });
  assert.deepEqual(
    out.map((row) => row.id),
    ["c/three", "a/one"]
  );
});

test("applyLaunchView keeps same-id rows together in their catalog order", () => {
  const transcription = { id: "openai/whisper", subtype: "transcription" };
  const speech = { id: "openai/whisper", subtype: "speech" };
  const rows: Row[] = [transcription, { id: "x/mid" }, speech, { id: "y/last" }];
  const out = applyLaunchView(rows, view(["y/last", "openai/whisper"]));
  assert.deepEqual(out, [rows[3], transcription, speech]);
});

test("applyLaunchView ignores rows without a string id and non-string view entries", () => {
  const rows = [{ id: 7 }, { id: "a/one" }, { name: "no id" }] as unknown as Row[];
  const out = applyLaunchView(rows, {
    hash: "x",
    ids: [7 as unknown as string, "a/one", null as unknown as string],
  });
  assert.deepEqual(out, [rows[1]]);
});

test("applyLaunchView without a view returns the input reference unchanged", () => {
  assert.equal(applyLaunchView(ROWS, null), ROWS);
  assert.equal(applyLaunchView(ROWS, undefined), ROWS);
  assert.equal(applyLaunchView(ROWS, { hash: 1, ids: [] } as never), ROWS);
  assert.equal(applyLaunchView(ROWS, { hash: "x" } as never), ROWS);
});

// ------------------------------------------------------- launchViewFromKeyMetadata (pure)

test("launchViewFromKeyMetadata returns the session view only when well formed", () => {
  const v = view(["a/one"]);
  assert.equal(launchViewFromKeyMetadata({ launchSession: { view: v } }), v);
  assert.equal(launchViewFromKeyMetadata(null), null);
  assert.equal(launchViewFromKeyMetadata(undefined), null);
  assert.equal(launchViewFromKeyMetadata({}), null);
  assert.equal(launchViewFromKeyMetadata({ launchSession: null }), null);
  assert.equal(launchViewFromKeyMetadata({ launchSession: { view: null } }), null);
  assert.equal(launchViewFromKeyMetadata({ launchSession: { view: { ids: [] } } }), null);
  assert.equal(launchViewFromKeyMetadata({ launchSession: { view: { hash: "h" } } }), null);
});

// ------------------------------------------------------------ launchViewCacheKeySuffix

test("launchViewCacheKeySuffix is empty for every non-olx credential", () => {
  assert.equal(launchViewCacheKeySuffix(null), "");
  assert.equal(launchViewCacheKeySuffix(undefined), "");
  assert.equal(launchViewCacheKeySuffix(""), "");
  assert.equal(launchViewCacheKeySuffix("sk-abc123"), "");
  assert.equal(launchViewCacheKeySuffix("OLX_not-a-launch-token"), "");
});

test("launchViewCacheKeySuffix is empty for an olx token without a view or unknown", async () => {
  const { key } = await apiKeysDb.createApiKey("parent-noview", "launch-view-test");
  const parent = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(parent);
  const { token } = launchSessions.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: key,
    toolId: "opencode",
  });
  assert.equal(launchViewCacheKeySuffix(token), "", "inject-only session has no view");

  // Malformed, and well formed but unknown (no such row).
  assert.equal(launchViewCacheKeySuffix("olx_garbage"), "");
  const unknown = `olx_${"a".repeat(26)}_${"b".repeat(52)}`;
  assert.equal(launchViewCacheKeySuffix(unknown), "");
  // Right session id, wrong secret.
  const forged = `${token.slice(0, 4 + 26 + 1)}${"c".repeat(52)}`;
  assert.notEqual(forged, token);
  assert.equal(launchViewCacheKeySuffix(forged), "");
});

test("launchViewCacheKeySuffix carries the view hash while active and drops it on revoke", async () => {
  const { key } = await apiKeysDb.createApiKey("parent-view", "launch-view-test");
  const parent = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(parent);
  const v = view(["a/one", "b/two"]);
  const { session, token } = launchSessions.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: key,
    toolId: "crush",
    view: v,
  });
  assert.equal(launchViewCacheKeySuffix(token), `|view=${v.hash}`);
  assert.equal(launchViewCacheKeySuffix(key), "", "the parent key's own cache key is unchanged");

  const next = view(["b/two"]);
  launchSessions.setLaunchSessionView(session.id, next);
  assert.equal(launchViewCacheKeySuffix(token), `|view=${next.hash}`, "a re-PATCH moves the key");

  assert.equal(launchSessions.revokeLaunchSession(session.id), true);
  assert.equal(launchViewCacheKeySuffix(token), "");
});

test("launchViewCacheKeySuffix is empty after the session expires", async () => {
  const { key } = await apiKeysDb.createApiKey("parent-expire", "launch-view-test");
  const parent = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(parent);
  const { token } = launchSessions.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: key,
    toolId: "crush",
    view: view(["a/one"]),
    ttlSeconds: 60,
    now: Date.now() - 120_000,
  });
  assert.equal(launchViewCacheKeySuffix(token), "");
});

// ------------------------------------------------------ key resolution of an olx bearer

test("an olx session narrows its parent: no management scope, same model rules", async () => {
  const { key } = await apiKeysDb.createApiKey("parent-manage", "launch-view-test", [
    "manage",
    "self:usage",
  ]);
  const parent = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(parent && hasManageScope(parent.scopes));
  const { session, token } = launchSessions.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: key,
    toolId: "opencode",
    view: view(["a/one"]),
  });

  assert.equal(await apiKeysDb.validateApiKey(token), true);
  const meta = await apiKeysDb.getApiKeyMetadata(token);
  assert.ok(meta);
  assert.equal(meta.id, parent.id, "usage and limits stay keyed by the parent id");
  assert.deepEqual(meta.scopes, ["self:usage"]);
  assert.equal(hasManageScope(meta.scopes), false);
  assert.equal(meta.modelAccessMode, parent.modelAccessMode);
  assert.deepEqual(meta.allowedModels, parent.allowedModels);
  assert.equal(meta.launchSession?.id, session.id);
  assert.deepEqual(launchViewFromKeyMetadata(meta), view(["a/one"]));
  // The parent's own metadata is not mutated by the session spread.
  const parentAgain = await apiKeysDb.getApiKeyMetadata(key);
  assert.ok(parentAgain && hasManageScope(parentAgain.scopes));
  assert.equal((parentAgain as { launchSession?: unknown }).launchSession, undefined);
});

test("a revoked session or a revoked parent rejects the olx bearer like a bad key", async () => {
  const { key, id: parentId } = await apiKeysDb.createApiKey("parent-revoke", "launch-view-test");
  const first = launchSessions.createLaunchSession({
    parentKeyId: parentId,
    parentCredential: key,
    toolId: "crush",
  });
  const second = launchSessions.createLaunchSession({
    parentKeyId: parentId,
    parentCredential: key,
    toolId: "crush",
  });
  assert.equal(await apiKeysDb.validateApiKey(first.token), true);

  launchSessions.revokeLaunchSession(first.session.id);
  assert.equal(await apiKeysDb.validateApiKey(first.token), false);
  assert.equal(await apiKeysDb.getApiKeyMetadata(first.token), null);
  assert.equal(await apiKeysDb.validateApiKey(second.token), true, "other sessions unaffected");

  assert.equal(await apiKeysDb.revokeApiKey(parentId), true);
  assert.equal(await apiKeysDb.validateApiKey(key), false);
  assert.equal(await apiKeysDb.validateApiKey(second.token), false);
  assert.equal(await apiKeysDb.getApiKeyMetadata(second.token), null);
});

// ---------------------------------------------- integration: getUnifiedModelsResponse

const FIXTURE_MODELS = ["lv-alpha", "lv-bravo", "lv-charlie", "lv-delta"];

async function seedCatalog() {
  aiHordeImageCatalog.setFetch(async () => Response.json([]));
  await aiHordeImageCatalog.ensureFresh();
  await settingsDb.updateSettings({
    password: "catalog-launch-view-test-password",
    requireLogin: true,
    requireAuthForModels: true,
    hideAutoCombos: true,
    hideNoThinkVariants: true,
  });
  const { id } = await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    name: "catalog-launch-view-groq",
    apiKey: "groq-launch-view-test-key",
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

async function readIds(credential: string): Promise<{ status: number; ids: string[] }> {
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { authorization: `Bearer ${credential}` },
    })
  );
  if (response.status !== 200) return { status: response.status, ids: [] };
  const body = (await response.json()) as { data: Row[] };
  return { status: response.status, ids: body.data.map((row) => row.id) };
}

test("a launch token sees intersect(parent catalog, view) in view order; parent unchanged", async () => {
  await seedCatalog();
  // The parent may see alpha, bravo and charlie, never delta.
  const parentKey = await apiKeysDb.createApiKey("launch-parent", "launch-view-test", [], {
    modelAccessMode: "restricted",
    allowedModels: ["groq/lv-alpha", "groq/lv-bravo", "groq/lv-charlie"],
  });
  const before = await readIds(parentKey.key);
  assert.equal(before.status, 200);
  for (const id of ["groq/lv-alpha", "groq/lv-bravo", "groq/lv-charlie"]) {
    assert.ok(before.ids.includes(id), `parent catalog must list ${id}`);
  }
  assert.equal(before.ids.includes("groq/lv-delta"), false, "fixture: delta is not authorized");

  const viewIds = [
    "groq/lv-charlie",
    "groq/lv-delta", // exists in the install, but the parent may not see it
    "unknown/never-listed",
    "groq/lv-alpha",
  ];
  const { session, token } = launchSessions.createLaunchSession({
    parentKeyId: parentKey.id,
    parentCredential: parentKey.key,
    toolId: "crush",
    view: view(viewIds),
  });

  const expected = viewIds.filter((id) => before.ids.includes(id));
  assert.deepEqual(expected, ["groq/lv-charlie", "groq/lv-alpha"]);
  const served = await readIds(token);
  assert.equal(served.status, 200);
  assert.deepEqual(served.ids, expected, "view order, only ids the parent can already see");
  assert.equal(served.ids.includes("groq/lv-delta"), false);
  // Served again from the cache: same list.
  assert.deepEqual((await readIds(token)).ids, expected);

  // The parent's own list is byte-for-byte the same id list as before the session existed.
  assert.deepEqual((await readIds(parentKey.key)).ids, before.ids);

  // A re-PATCHed view takes effect on the next request (the cache key moves with the hash).
  launchSessions.setLaunchSessionView(session.id, view(["groq/lv-bravo", "groq/lv-charlie"]));
  assert.deepEqual((await readIds(token)).ids, ["groq/lv-bravo", "groq/lv-charlie"]);

  // Revoked: rejected like a bad key, while the parent still works unchanged.
  launchSessions.revokeLaunchSession(session.id);
  const revoked = await readIds(token);
  assert.equal(revoked.status, 401);
  assert.deepEqual((await readIds(parentKey.key)).ids, before.ids);
});

test("a launch token without a view gets the parent's normal catalog", async () => {
  await seedCatalog();
  const parentKey = await apiKeysDb.createApiKey("launch-parent-noview", "launch-view-test", [], {
    modelAccessMode: "restricted",
    allowedModels: ["groq/lv-alpha", "groq/lv-bravo"],
  });
  const parent = await readIds(parentKey.key);
  assert.equal(parent.status, 200);
  const { token } = launchSessions.createLaunchSession({
    parentKeyId: parentKey.id,
    parentCredential: parentKey.key,
    toolId: "opencode",
  });
  const served = await readIds(token);
  assert.equal(served.status, 200);
  assert.deepEqual(served.ids, parent.ids);
});

// ------------------------------- regressions: anonymous posture and parent regeneration

async function seedOpenPostureConnection() {
  aiHordeImageCatalog.setFetch(async () => Response.json([]));
  await aiHordeImageCatalog.ensureFresh();
  await settingsDb.updateSettings({ hideAutoCombos: true, hideNoThinkVariants: true });
  const { id } = await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    name: "catalog-launch-view-open",
    apiKey: "groq-launch-view-open-key",
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

async function catalogStatus(url: string, credential: string): Promise<number> {
  catalog.__resetCatalogBuilderRunsForTest();
  const response = await catalog.getUnifiedModelsResponse(
    new Request(url, { headers: { authorization: `Bearer ${credential}` } })
  );
  await response.body?.cancel();
  return response.status;
}

test("an anonymous launch token is loopback only: remote peer gets 401, localhost 200", async () => {
  await seedOpenPostureConnection();
  assert.equal(await apiKeysDb.isLaunchAnonymousPostureOpen(), true, "fixture: open posture");
  const { token } = launchSessions.createLaunchSession({
    parentKeyId: null,
    toolId: "opencode",
    view: view(["groq/lv-bravo", "groq/lv-alpha"]),
  });
  assert.equal(await apiKeysDb.validateApiKey(token), true);

  assert.equal(await catalogStatus("http://gateway.example.com/api/v1/models", token), 401);
  assert.equal(await catalogStatus("http://localhost/api/v1/models", token), 200);
  const local = await readIds(token);
  assert.deepEqual(local.ids, ["groq/lv-bravo", "groq/lv-alpha"]);
});

test("an anonymous launch token dies once an API key exists", async () => {
  await seedOpenPostureConnection();
  const { token } = launchSessions.createLaunchSession({ parentKeyId: null, toolId: "crush" });
  assert.equal(await apiKeysDb.validateApiKey(token), true);
  assert.notEqual(await apiKeysDb.getApiKeyMetadata(token), null);

  await apiKeysDb.createApiKey("closes-the-posture", "launch-view-test");
  apiKeysDb.clearApiKeyCaches();
  assert.equal(await apiKeysDb.isLaunchAnonymousPostureOpen(), false);
  assert.equal(await apiKeysDb.validateApiKey(token), false);
  assert.equal(await apiKeysDb.getApiKeyMetadata(token), null);
});

test("a parent key without its credential cannot mint a session", async () => {
  const { id } = await apiKeysDb.createApiKey("no-credential", "launch-view-test");
  assert.throws(() => launchSessions.createLaunchSession({ parentKeyId: id, toolId: "crush" }));
});

test("regenerating the parent key kills its launch sessions (catalog answers 401)", async () => {
  await seedCatalog();
  const parentKey = await apiKeysDb.createApiKey("regen-parent", "launch-view-test");
  const { token } = launchSessions.createLaunchSession({
    parentKeyId: parentKey.id,
    parentCredential: parentKey.key,
    toolId: "crush",
    view: view(["groq/lv-alpha"]),
  });
  assert.equal(await catalogStatus("http://localhost/api/v1/models", token), 200);

  const regenerated = await apiKeysDb.regenerateApiKey(parentKey.id);
  assert.ok(regenerated?.key);
  assert.equal(await apiKeysDb.validateApiKey(token), false);
  assert.equal(await catalogStatus("http://localhost/api/v1/models", token), 401);
  // The regenerated parent itself keeps working.
  assert.equal(await catalogStatus("http://localhost/api/v1/models", regenerated.key), 200);
});
