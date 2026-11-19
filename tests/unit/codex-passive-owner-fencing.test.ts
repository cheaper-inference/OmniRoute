import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { AsyncResource } from "node:async_hooks";
import type { BaseExecutor } from "../../open-sse/executors/base.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-passive-owner-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { refreshAndUpdateCredentialsWithResolver } =
  await import("../../src/lib/usage/providerLimits/credentialRefresh.ts");
const { checkAndRefreshToken } = await import("../../src/sse/services/tokenRefresh.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const originalPassive = process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS;
const originalFetch = globalThis.fetch;
const owner = (name: string) => ({
  email: `${name}@example.invalid`,
  accessToken: `synthetic-access-${name}`,
  refreshToken: `synthetic-refresh-${name}`,
  providerSpecificData: { workspaceId: `synthetic-workspace-${name}` },
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
const seed = () =>
  providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    testStatus: "active",
    isActive: true,
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
    ...owner("a"),
  });

test.beforeEach(() => {
  process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS = "codex";
  globalThis.fetch = async () => {
    throw new Error("passive adoption must not make network requests");
  };
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  globalThis.fetch = originalFetch;
  if (originalPassive === undefined) delete process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS;
  else process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS = originalPassive;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

for (const race of [
  "rotation",
  "replacement",
  "ABA",
  "token-ABA",
  "deactivation",
  "proxy",
  "hard-stop",
] as const) {
  test(`passive quota credential adoption respects an in-flight ${race}`, async () => {
    const connection = await seed();
    const started = deferred<void>();
    const release = deferred<BaseExecutor>();
    const operation = refreshAndUpdateCredentialsWithResolver(
      connection,
      async () => {
        started.resolve();
        return release.promise;
      },
      { allowRotatingRefresh: true, force: true }
    );
    const settled = operation.then(
      (value) => ({ value, error: null }),
      (error: unknown) => ({ value: null, error })
    );
    await started.promise;
    await providers.updateProviderConnection(connection.id, {
      ...(race === "rotation" ||
      race === "token-ABA" ||
      race === "deactivation" ||
      race === "proxy" ||
      race === "hard-stop"
        ? {
            accessToken: "synthetic-synchronized",
            refreshToken: "synthetic-synchronized-refresh",
            ...(race === "deactivation" ? { isActive: false } : {}),
            ...(race === "proxy" ? { perKeyProxyEnabled: true } : {}),
            ...(race === "hard-stop" ? { testStatus: "banned", lastError: "new hard stop" } : {}),
          }
        : owner("b")),
      expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    });
    if (race === "ABA") {
      await providers.updateProviderConnection(connection.id, {
        ...owner("a"),
        accessToken: "synthetic-synchronized",
        expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      });
    }
    if (race === "token-ABA") {
      await providers.updateProviderConnection(connection.id, {
        accessToken: connection.accessToken,
        refreshToken: connection.refreshToken,
      });
    }
    const before = await providers.getProviderConnectionById(connection.id);
    release.resolve({
      needsRefresh: () => true,
      refreshCredentials: async () => {
        throw new Error("passive adoption must not invoke the executor refresher");
      },
    } as unknown as BaseExecutor);
    const result = await settled;
    if (race === "rotation") {
      assert.equal(result.error, null);
      assert.equal(result.value?.adopted, true);
      assert.equal(result.value?.refreshed, false);
      assert.equal(result.value?.connection.accessToken, "synthetic-synchronized");
    } else {
      assert.equal((result.error as { code?: string })?.code, "codex_connection_changed");
      assert.equal(result.value, null, "replacement credentials must not escape into this request");
    }
    assert.deepEqual(await providers.getProviderConnectionById(connection.id), before);
  });
}

for (const stream of [false, true]) {
  for (const aba of [false, true]) {
    test(`passive chat cannot adopt a replacement owner: stream=${stream} ABA=${aba}`, async () => {
      const connection = await seed();
      await providers.updateProviderConnection(connection.id, {
        expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      });
      const credentials = await providers.getProviderConnectionById(connection.id);
      const sends: string[] = [];
      const replica = new AsyncResource("synthetic-codex-owner-replacement");
      let replacement: typeof credentials;
      globalThis.fetch = async (input, init) => {
        assert.ok(String(input).includes("/codex/responses"));
        sends.push(new Headers(init?.headers).get("authorization") || "");
        await replica.runInAsyncScope(async () => {
          await providers.updateProviderConnection(connection.id, {
            ...owner("b"),
            expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
          });
          if (aba) await providers.updateProviderConnection(connection.id, owner("a"));
        });
        replacement = await providers.getProviderConnectionById(connection.id);
        assert.equal(replacement.email, owner(aba ? "a" : "b").email);
        return Response.json({ error: { message: "synthetic unauthorized" } }, { status: 401 });
      };
      const result = await handleChatCore({
        body: { model: "gpt-5.5", input: "synthetic", stream },
        modelInfo: { provider: "codex", model: "gpt-5.5" },
        credentials: { ...credentials, connectionId: connection.id },
        log: { info() {}, debug() {}, warn() {}, error() {} },
        clientRawRequest: { endpoint: "/v1/responses", headers: new Headers(), body: {} },
      });
      await result.response.text();
      assert.equal(result.response.status, 401);
      assert.deepEqual(sends, ["Bearer synthetic-access-a"]);
      assert.deepEqual(await providers.getProviderConnectionById(connection.id), replacement);
    });
  }
}

for (const synchronizedBeforeEntry of [false, true]) {
  test(`proactive passive adoption is read-only when synchronization precedes entry=${synchronizedBeforeEntry}`, async () => {
    const connection = await seed();
    const synchronize = () =>
      providers.updateProviderConnection(connection.id, {
        accessToken: "synthetic-synchronized",
        refreshToken: "synthetic-synchronized-refresh",
        expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
      });
    if (synchronizedBeforeEntry) await synchronize();
    const operation = checkAndRefreshToken("codex", { ...connection, connectionId: connection.id });
    if (!synchronizedBeforeEntry) await synchronize();
    const before = await providers.getProviderConnectionById(connection.id);
    const result = await operation;
    assert.equal(result.accessToken, "synthetic-synchronized");
    assert.equal(result.refreshToken, "synthetic-synchronized-refresh");
    assert.deepEqual(await providers.getProviderConnectionById(connection.id), before);
  });
}
