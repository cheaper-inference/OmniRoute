import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { BaseExecutor } from "../../open-sse/executors/base.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-owner-fence-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
const limits = await import("../../src/lib/usage/providerLimits.ts");
const { refreshAndUpdateCredentialsWithResolver } =
  await import("../../src/lib/usage/providerLimits/credentialRefresh.ts");
const { setCodexUsageFetchForTests } = await import("../../open-sse/services/usage/codex.ts");
const discovery = await import("../../src/lib/providerModels/modelDiscovery.ts");
const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
const { clearCodexGithubCatalogCacheForTests } =
  await import("../../src/app/api/providers/[id]/models/discovery/codex.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const originalFetch = globalThis.fetch;

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
function barrier<T>() {
  const started = deferred<void>();
  const result = deferred<T>();
  return {
    started: started.promise,
    release: result.resolve,
    async run() {
      started.resolve();
      return result.promise;
    },
  };
}
const owner = (tag: string) => ({
  accessToken: `synthetic-access-${tag}`,
  refreshToken: `synthetic-refresh-${tag}`,
  email: `${tag}@example.invalid`,
  providerSpecificData: { workspaceId: `workspace-${tag}`, autoFetchModels: false },
});
async function seed() {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "owner fencing test",
    isActive: true,
    testStatus: "active",
    ...owner("a"),
  });
}
function usage(used = 10) {
  return Response.json({
    rate_limit: {
      primary_window: { used_percent: used, reset_after_seconds: 300 },
      secondary_window: { used_percent: used, reset_after_seconds: 600 },
    },
  });
}
async function replace(id: string, aba: boolean) {
  await providers.updateProviderConnection(id, owner("b"));
  if (aba) await providers.updateProviderConnection(id, owner("a"));
}
const options = { allowRotatingRefresh: true, force: true };
const safeLog = { debug() {}, info() {}, warn() {}, error() {} };

test.beforeEach(async () => {
  globalThis.fetch = async () => {
    throw new Error("unexpected offline-test request");
  };
  await settings.updateSettings({ hideAutoCombos: true, blockedProviders: ["aihorde"] });
});
test.afterEach(async () => {
  setCodexUsageFetchForTests(null);
  clearCodexGithubCatalogCacheForTests();
  globalThis.fetch = originalFetch;
  const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  await waitForCallLogSaves(10_000);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

for (const aba of [false, true]) {
  const race = aba ? "A-to-B-to-A" : "A-to-B";
  test(`refresh cannot overwrite credentials after ${race} replacement`, async () => {
    const connection = await seed();
    const blocked = barrier<{ accessToken: string; refreshToken: string; expiresIn: number }>();
    const operation = refreshAndUpdateCredentialsWithResolver(
      connection,
      async () =>
        ({ needsRefresh: () => true, refreshCredentials: blocked.run }) as unknown as BaseExecutor,
      options
    ).catch(() => null);
    await blocked.started;
    await replace(connection.id, aba);
    const before = await providers.getProviderConnectionById(connection.id);
    blocked.release({
      accessToken: "synthetic-late-token",
      refreshToken: "synthetic-late-refresh",
      expiresIn: 3600,
    });
    await operation;
    const after = await providers.getProviderConnectionById(connection.id);
    assert.equal(after?.accessToken, before?.accessToken);
    assert.equal(after?.refreshToken, before?.refreshToken);
    assert.deepEqual(after?.providerSpecificData, before?.providerSpecificData);
  });

  test(`quota observation cannot hydrate a replacement account after ${race}`, async () => {
    const connection = await seed();
    const blocked = barrier<Response>();
    setCodexUsageFetchForTests(blocked.run);
    const operation = limits.fetchAndPersistProviderLimits(connection.id).catch(() => null);
    await blocked.started;
    await replace(connection.id, aba);
    const before = await providers.getProviderConnectionById(connection.id);
    const cacheBefore = limits.getCachedProviderLimitsMap()[connection.id];
    blocked.release(usage());
    await operation;
    const after = await providers.getProviderConnectionById(connection.id);
    assert.deepEqual(after?.providerSpecificData, before?.providerSpecificData);
    assert.deepEqual(limits.getCachedProviderLimitsMap()[connection.id], cacheBefore);
  });

  test(`catalog discovery cannot replace the new owner's catalog after ${race}`, async () => {
    const connection = await seed();
    const blocked = barrier<Response>();
    globalThis.fetch = async (input) =>
      String(input).includes("chatgpt.com") ? blocked.run() : Response.json({ models: [] });
    const operation = GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    await blocked.started;
    await replace(connection.id, aba);
    await discovery.persistDiscoveredModels("codex", connection.id, [
      { id: "new-owner-model", name: "new-owner-model" },
    ]);
    const before = await providers.getProviderConnectionById(connection.id);
    blocked.release(
      Response.json({
        models: [{ slug: "old-owner-model", visibility: "list", supported_in_api: true }],
      })
    );
    const response = await operation;
    assert.deepEqual(
      (await discovery.getCachedDiscoveredModels("codex", connection.id)).map((m) => m.id),
      ["new-owner-model"]
    );
    const after = await providers.getProviderConnectionById(connection.id);
    assert.equal(
      after?.providerSpecificData?.syncedModelsAt,
      before?.providerSpecificData?.syncedModelsAt
    );
    assert.equal(response.status, 409);
    const body = JSON.stringify(await response.json());
    assert.ok(!body.includes("at /") && !body.includes("synthetic-access-"));
  });
}

test("current-owner discovery keeps upstream catalog projection and version diagnostics", async () => {
  const connection = await seed();
  const client = await import("../../open-sse/config/codexClient.ts");
  const originalVersion = process.env.CODEX_CLIENT_VERSION;
  process.env.CODEX_CLIENT_VERSION = "0.160.1";
  globalThis.fetch = async (input) =>
    Response.json({
      models: [
        {
          slug: String(input).includes("chatgpt.com") ? "current-owner-model" : "github-only-model",
          visibility: "list",
          supported_in_api: true,
        },
      ],
    });
  try {
    const response = await GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.source, "api");
    assert.deepEqual(
      body.models.map((model: { id: string }) => model.id),
      ["current-owner-model"]
    );
    assert.deepEqual(body.discovery.clientVersion, { version: "0.160.1", source: "override" });
    assert.equal(body.degraded, undefined);
    assert.deepEqual(
      (await discovery.getCachedDiscoveredModels("codex", connection.id)).map((model) => model.id),
      ["current-owner-model"]
    );
  } finally {
    if (originalVersion === undefined) delete process.env.CODEX_CLIENT_VERSION;
    else process.env.CODEX_CLIENT_VERSION = originalVersion;
    client.resetCodexClientVersionCacheForTests();
  }
});

test("a stale unauthorized usage result cannot mark replacement credentials expired", async () => {
  const connection = await seed();
  const blocked = barrier<Response>();
  setCodexUsageFetchForTests(blocked.run);
  const operation = limits.fetchAndPersistProviderLimits(connection.id).catch(() => null);
  await blocked.started;
  await replace(connection.id, false);
  blocked.release(new Response(null, { status: 401 }));
  await operation;
  const after = await providers.getProviderConnectionById(connection.id);
  assert.equal(after?.testStatus, "active");
  assert.equal(after?.lastErrorType, undefined);
});

test("changing only the workspace invalidates a pending quota observation", async () => {
  const connection = await seed();
  const blocked = barrier<Response>();
  setCodexUsageFetchForTests(blocked.run);
  const operation = limits.fetchAndPersistProviderLimits(connection.id).catch(() => null);
  await blocked.started;
  await providers.updateProviderConnection(connection.id, {
    providerSpecificData: { workspaceId: "new-workspace", autoFetchModels: false },
  });
  const before = await providers.getProviderConnectionById(connection.id);
  blocked.release(usage());
  await operation;
  assert.deepEqual(
    (await providers.getProviderConnectionById(connection.id))?.providerSpecificData,
    before?.providerSpecificData
  );
});

test("a same-owner refresh still persists rotation without clearing a newer hard stop", async () => {
  const connection = await seed();
  const blocked = barrier<{ accessToken: string; refreshToken: string }>();
  const operation = refreshAndUpdateCredentialsWithResolver(
    connection,
    async () =>
      ({ needsRefresh: () => true, refreshCredentials: blocked.run }) as unknown as BaseExecutor,
    options
  );
  await blocked.started;
  await providers.updateProviderConnection(connection.id, {
    testStatus: "banned",
    lastErrorType: "account_banned",
    lastError: "new hard stop",
  });
  blocked.release({ accessToken: "synthetic-rotated", refreshToken: "synthetic-rotated-refresh" });
  await operation;
  const after = await providers.getProviderConnectionById(connection.id);
  assert.equal(after?.accessToken, "synthetic-rotated");
  assert.equal(after?.refreshToken, "synthetic-rotated-refresh");
  assert.equal(after?.testStatus, "banned");
  assert.equal(after?.lastError, "new hard stop");
});

test("a fresh quota refresh preserves the independent Spark cooldown", async () => {
  const connection = await seed();
  const until = new Date(Date.now() + 600_000).toISOString();
  await providers.updateCodexScopedQuotaState(connection.id, "spark", {
    rateLimitedUntil: until,
    rateLimitSource: "fallback",
  });
  setCodexUsageFetchForTests(async () => usage());
  const result = await limits.fetchAndPersistProviderLimits(connection.id);
  assert.equal(result.usage.quotas !== undefined, true);
  const after = await providers.getProviderConnectionById(connection.id);
  assert.equal(after?.providerSpecificData?.codexScopeRateLimitedUntil?.spark, until);
  assert.equal(after?.providerSpecificData?.codexQuotaStateByScope?.codex?.usage5h, 10);
});

for (const aba of [false, true]) {
  test(`generation headers cannot write child quota into ${aba ? "A-to-B-to-A" : "A-to-B"} replacement`, async () => {
    const connection = await seed();
    const blocked = barrier<Response>();
    globalThis.fetch = blocked.run;
    const operation = handleChatCore({
      body: { model: "gpt-5.6-sol", input: "offline test", stream: false },
      modelInfo: { provider: "codex", model: "gpt-5.6-sol", extendedContext: false },
      credentials: {
        connectionId: connection.id,
        accessToken: connection.accessToken,
        providerSpecificData: connection.providerSpecificData,
      },
      log: safeLog,
      connectionId: connection.id,
      userAgent: "unit-test",
      clientRawRequest: { endpoint: "/v1/responses", headers: new Headers(), body: {} },
    });
    await Promise.race([
      blocked.started,
      operation.then((result) => {
        throw new Error(`Generation returned before mocked dispatch: ${result.status}`);
      }),
    ]);
    await replace(connection.id, aba);
    const before = await providers.getProviderConnectionById(connection.id);
    blocked.release(
      Response.json(
        {
          id: "resp_owner",
          object: "response",
          status: "completed",
          model: "gpt-5.6-sol",
          output: [
            {
              id: "msg_owner",
              type: "message",
              role: "assistant",
              content: [{ type: "output_text", text: "ok", annotations: [] }],
            },
          ],
          usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
        },
        {
          headers: {
            "x-codex-5h-usage": "50",
            "x-codex-5h-limit": "100",
            "x-codex-7d-usage": "10",
            "x-codex-7d-limit": "100",
            "x-codex-5h-reset-at": new Date(Date.now() + 300_000).toISOString(),
            "x-codex-7d-reset-at": new Date(Date.now() + 600_000).toISOString(),
          },
        }
      )
    );
    const result = await operation;
    if (result.response && !result.response.bodyUsed) await result.response.text();
    assert.deepEqual(
      (await providers.getProviderConnectionById(connection.id))?.providerSpecificData,
      before?.providerSpecificData
    );
  });
}
