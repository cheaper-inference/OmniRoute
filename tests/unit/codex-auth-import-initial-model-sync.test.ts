import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { settleConnectionFollowUpsAfterEachTest } from "../helpers/connectionFollowUps.ts";

// A Codex account imported from an auth.json (single or bulk dashboard import) must join model
// auto-sync like a Codex OAuth login does, and get its first model inventory right away.
// Without it the sync cycle skips the account (isAutoSyncEnabled), its synced inventory stays
// empty, and routing filters it out as `modelNotAdvertised` for every model another account lists.
//
// Every loopback self-fetch is served by the real route, so the import → sync-models →
// models chain runs end to end; only the ChatGPT upstream is faked.

settleConnectionFollowUpsAfterEachTest();

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-import-sync-"));
Object.assign(process.env, {
  DATA_DIR: TEST_DATA_DIR,
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  API_KEY_SECRET: "codex-import-sync-fixture-secret",
  JWT_SECRET: "codex-import-sync-fixture-session-secret",
});

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const discoveryStateDb = await import("../../src/lib/db/discoveryState.ts");
const importRoute = await import("../../src/app/api/providers/codex-auth/import/route.ts");
const importBulkRoute = await import("../../src/app/api/providers/codex-auth/import-bulk/route.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");
const modelSyncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { clearCodexGithubCatalogCacheForTests } =
  await import("../../src/app/api/providers/[id]/models/discovery/codex.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");
const { waitForConnectionFollowUps } =
  await import("../../src/lib/providers/connectionFollowUps.ts");

const originalFetch = globalThis.fetch;
const FUTURE = Math.floor(Date.now() / 1000) + 86400;
const LIVE_MODEL = "codex-import-live-model";

type UpstreamMode = "ok" | "unauthorized";
let upstreamMode: UpstreamMode = "ok";
let syncCalls: string[] = [];
let upstreamModelCalls = 0;

function jwt(payload: Record<string, unknown>): string {
  return `header.${Buffer.from(JSON.stringify(payload)).toString("base64url")}.signature`;
}

function authJson(n: number) {
  return {
    tokens: {
      id_token: jwt({
        email: `import-${n}@example.com`,
        exp: FUTURE,
        "https://api.openai.com/auth": {
          chatgpt_account_id: `acc_import_${n}`,
          chatgpt_user_id: `user_import_${n}`,
        },
      }),
      access_token: jwt({ exp: FUTURE }),
      refresh_token: `rt_import_${n}`,
      account_id: `acc_import_${n}`,
    },
  };
}

function serve() {
  globalThis.fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    if (url.pathname.includes("__readiness_probe__")) return new Response(null, { status: 404 });
    const sync = url.pathname.match(/^\/api\/providers\/([^/]+)\/sync-models$/);
    if (sync) {
      const id = decodeURIComponent(sync[1]);
      syncCalls.push(id);
      return modelSyncRoute.POST(
        new Request(url.href, { method: "POST", headers: init?.headers }),
        { params: Promise.resolve({ id }) }
      );
    }
    const models = url.pathname.match(/^\/api\/providers\/([^/]+)\/models$/);
    if (models) {
      return providerModelsRoute.GET(new Request(url.href, { headers: init?.headers }), {
        params: Promise.resolve({ id: decodeURIComponent(models[1]) }),
      });
    }
    if (url.hostname === "chatgpt.com" && url.pathname.endsWith("/models")) {
      upstreamModelCalls += 1;
      if (upstreamMode === "unauthorized") {
        return Response.json({ detail: "Token invalid or revoked" }, { status: 401 });
      }
      return Response.json({
        models: [{ slug: LIVE_MODEL, visibility: "list", supported_in_api: true }],
      });
    }
    if (url.hostname === "raw.githubusercontent.com") {
      // The public Codex catalog answers, as it does in production: when the account's own
      // catalog fails, discovery falls back to it and reports the sync as degraded.
      return Response.json({
        models: [
          { slug: "codex-public-catalog-model", visibility: "list", supported_in_api: true },
        ],
      });
    }
    // Client-version probe, connection auto-test: nothing to offer.
    return new Response("not found", { status: 404 });
  };
}

async function importOne(n: number, extra: Record<string, unknown> = {}) {
  return importRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers/codex-auth/import", {
      method: "POST",
      body: { source: { kind: "json", json: authJson(n) }, ...extra },
    })
  );
}

async function importBulk(ns: number[], extra: Record<string, unknown> = {}) {
  return importBulkRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers/codex-auth/import-bulk", {
      method: "POST",
      body: { entries: ns.map((n) => ({ json: authJson(n) })), ...extra },
    })
  );
}

async function connection(id: string) {
  const row = (await providersDb.getProviderConnectionById(id)) as Record<string, unknown>;
  return { row, psd: (row.providerSpecificData || {}) as Record<string, unknown> };
}

async function syncedIds(id: string) {
  return (await modelsDb.getSyncedAvailableModelsForConnection("codex", id)).map((m) => m.id);
}

test.beforeEach(() => {
  upstreamMode = "ok";
  syncCalls = [];
  upstreamModelCalls = 0;
  modelSyncRoute.__resetLoopbackReadinessForTests();
  clearCodexGithubCatalogCacheForTests();
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  serve();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("single import enables auto-sync and runs one model sync that fills the inventory", async () => {
  const res = await importOne(1);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { connection: { id: string }; created: boolean };
  assert.equal(body.created, true);
  assert.equal(await waitForConnectionFollowUps(10_000), true);

  const { psd } = await connection(body.connection.id);
  assert.equal(psd.autoSync, true);
  assert.deepEqual(syncCalls, [body.connection.id]);
  assert.deepEqual(await syncedIds(body.connection.id), [LIVE_MODEL]);
});

test("bulk import enables auto-sync and runs one model sync per imported account", async () => {
  const res = await importBulk([1, 2]);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { success: number; created: Array<{ id: string }> };
  assert.equal(body.success, 2);
  assert.equal(await waitForConnectionFollowUps(10_000), true);

  const ids = body.created.map((c) => c.id);
  assert.deepEqual([...syncCalls].sort(), [...ids].sort());
  for (const id of ids) {
    assert.equal((await connection(id)).psd.autoSync, true);
    assert.deepEqual(await syncedIds(id), [LIVE_MODEL]);
  }
});

test("a failing first sync does not fail the import and leaves the failure on the connection", async () => {
  upstreamMode = "unauthorized";
  const res = await importOne(3);
  assert.equal(res.status, 200);
  const body = (await res.json()) as { connection: { id: string }; created: boolean };
  assert.equal(body.created, true);
  assert.equal(await waitForConnectionFollowUps(10_000), true);

  const id = body.connection.id;
  assert.deepEqual(syncCalls, [id]);
  assert.ok(upstreamModelCalls >= 1, "the first sync must have asked the upstream");
  const { row, psd } = await connection(id);
  assert.equal(row.isActive, true, "a failed first sync must not disable the imported account");
  assert.equal(psd.autoSync, true, "the next sync cycle keeps retrying the account");
  assert.deepEqual(await syncedIds(id), []);

  // Same records a scheduled or manual sync leaves: the discovery state the connection list
  // shows, and the model-sync call log.
  const state = discoveryStateDb
    .getDiscoveryStatesForConnections([{ provider: "codex", id }])
    .get(`codex:${id}`);
  assert.equal(state?.status, "degraded");
  assert.equal(state?.cause, "HTTP 401");
  const logged = core
    .getDbInstance()
    .prepare(
      "SELECT COUNT(*) AS n FROM call_logs WHERE connection_id = ? AND request_type = 'model-sync' AND status >= 400"
    )
    .get(id) as { n: number };
  assert.ok(logged.n >= 1, "the failed sync must be in the model-sync call log");
});

test("an explicit autoSync:false import is honored: no auto-sync flag, no sync", async () => {
  const single = await importOne(4, { autoSync: false });
  assert.equal(single.status, 200);
  const singleId = ((await single.json()) as { connection: { id: string } }).connection.id;
  const bulk = await importBulk([5], { autoSync: false });
  assert.equal(bulk.status, 200);
  const bulkId = ((await bulk.json()) as { created: Array<{ id: string }> }).created[0].id;
  assert.equal(await waitForConnectionFollowUps(10_000), true);

  assert.equal((await connection(singleId)).psd.autoSync, false);
  assert.equal((await connection(bulkId)).psd.autoSync, false);
  assert.deepEqual(syncCalls, []);
});

test("re-importing over an account keeps the operator's earlier autoSync:false", async () => {
  const first = await importOne(6, { autoSync: false });
  const id = ((await first.json()) as { connection: { id: string } }).connection.id;
  assert.equal(await waitForConnectionFollowUps(10_000), true);

  const again = await importOne(6, { overwriteExisting: true });
  assert.equal(again.status, 200);
  const body = (await again.json()) as { connection: { id: string }; created: boolean };
  assert.equal(body.created, false);
  assert.equal(body.connection.id, id);
  assert.equal(await waitForConnectionFollowUps(10_000), true);

  assert.equal((await connection(id)).psd.autoSync, false);
  assert.deepEqual(syncCalls, []);
});

test("creating a connection through POST /api/providers is unchanged: no autoSync, no sync", async () => {
  const res = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      body: { provider: "openai", name: "plain api key", apiKey: "sk-import-sync-fixture" },
    })
  );
  assert.equal(res.status, 201);
  const created = (await res.json()) as { connection: { id: string } };
  assert.equal(await waitForConnectionFollowUps(10_000), true);

  assert.equal((await connection(created.connection.id)).psd.autoSync, undefined);
  assert.deepEqual(syncCalls, []);
});
