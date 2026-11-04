import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-reactive-owner-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
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

const rotated = () =>
  Response.json({
    access_token: "synthetic-rotated-access",
    refresh_token: "synthetic-rotated-refresh",
    expires_in: 3600,
  });
const success = () =>
  Response.json({
    id: "resp_refresh_fence",
    object: "response",
    status: "completed",
    model: "gpt-5.6-sol",
    output: [
      {
        id: "msg_refresh_fence",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "ok", annotations: [] }],
      },
    ],
    usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
  });
const safeLog = { debug() {}, info(..._args: unknown[]) {}, warn() {}, error() {} };

async function seed() {
  return providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    isActive: true,
    testStatus: "unavailable",
    accessToken: "synthetic-old-access",
    refreshToken: "synthetic-old-refresh",
    // Force the reactive 401 path, not BaseExecutor's proactive refresh.
    expiresAt: new Date(Date.now() + 24 * 3600_000).toISOString(),
    lastError: "synthetic expired access token",
    lastErrorType: "auth",
    errorCode: "401",
    providerSpecificData: { workspaceId: "synthetic-workspace", autoFetchModels: false },
  });
}

async function dispatch(connection: Awaited<ReturnType<typeof seed>>, log = safeLog) {
  const result = await handleChatCore({
    body: { model: "gpt-5.6-sol", input: "offline refresh test", stream: false },
    modelInfo: { provider: "codex", model: "gpt-5.6-sol", extendedContext: false },
    credentials: { ...connection, connectionId: connection.id },
    connectionId: connection.id,
    log,
    userAgent: "unit-test",
    clientRawRequest: { endpoint: "/v1/responses", headers: new Headers(), body: {} },
  });
  if (result.response && !result.response.bodyUsed) await result.response.text();
  return result;
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  _clearTokenRotationMap();
  const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  await waitForCallLogSaves(10_000);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

test(
  "reactive refresh waiters adopt one committed rotation including expiry and auth recovery",
  { timeout: 20_000 },
  async () => {
    const connection = await seed();
    const started = deferred<void>();
    const joined = deferred<void>();
    const release = deferred<Response>();
    let rotations = 0;
    const log = {
      ...safeLog,
      info(...args: unknown[]) {
        if (args.some((value) => String(value).includes("Concurrent refresh detected")))
          joined.resolve();
      },
    };
    globalThis.fetch = async (input, init) => {
      if (String(input).includes("auth.openai.com")) {
        rotations++;
        started.resolve();
        return release.promise;
      }
      const headers = new Headers(init?.headers);
      if (headers.get("authorization") === "Bearer synthetic-old-access") {
        return Response.json(
          { error: { message: "synthetic expired access token" } },
          { status: 401 }
        );
      }
      assert.equal(headers.get("authorization"), "Bearer synthetic-rotated-access");
      return success();
    };
    const first = dispatch(connection, log);
    await started.promise;
    const second = dispatch(connection, log);
    try {
      await joined.promise;
    } finally {
      release.resolve(rotated());
    }
    const results = await Promise.all([first, second]);
    assert.deepEqual(
      results.map((result) => result.response?.status),
      [200, 200]
    );
    assert.equal(rotations, 1);
    const persisted = await providers.getProviderConnectionById(connection.id);
    assert.equal(persisted?.refreshToken, "synthetic-rotated-refresh");
    assert.ok(Date.parse(persisted?.expiresAt) > Date.now() + 3_000_000);
    assert.notEqual(persisted?.expiresAt, connection.expiresAt);
    assert.equal(persisted?.tokenExpiresAt, persisted?.expiresAt);
    assert.equal(persisted?.testStatus, "active");
    assert.equal(persisted?.lastError ?? null, null);
    assert.equal(persisted?.errorCode ?? null, null);
  }
);

test(
  "reactive refresh cannot persist or dispatch a replaced owner's rotation",
  { timeout: 20_000 },
  async () => {
    const connection = await seed();
    const started = deferred<void>();
    const release = deferred<Response>();
    let rotatedDispatches = 0;
    globalThis.fetch = async (input, init) => {
      if (String(input).includes("auth.openai.com")) {
        started.resolve();
        return release.promise;
      }
      if (new Headers(init?.headers).get("authorization") === "Bearer synthetic-rotated-access") {
        rotatedDispatches++;
        return success();
      }
      return Response.json(
        { error: { message: "synthetic expired access token" } },
        { status: 401 }
      );
    };
    const operation = dispatch(connection).catch(() => null);
    await started.promise;
    await providers.updateProviderConnection(connection.id, {
      accessToken: "synthetic-replacement-access",
      refreshToken: "synthetic-replacement-refresh",
    });
    release.resolve(rotated());
    await operation;
    assert.equal(rotatedDispatches, 0);
    assert.equal(
      (await providers.getProviderConnectionById(connection.id))?.refreshToken,
      "synthetic-replacement-refresh"
    );
  }
);
