import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// A Codex request gets a 401, the refresh call is rejected with
// refresh_token_invalidated (the account's grant was revoked upstream). The
// connection can never serve again until the owner re-authenticates, so the
// real request path must park it as expired + inactive instead of leaving it
// active and re-selecting it after every short cooldown.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-revoked-refresh-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const settings = await import("../../src/lib/db/settings.ts");
await import("../../src/sse/services/tokenRefresh.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const originalFetch = globalThis.fetch;
const safeLog = { debug() {}, info() {}, warn() {}, error() {} };

test.beforeEach(async () => {
  await settings.updateSettings({ hideAutoCombos: true, blockedProviders: ["aihorde"] });
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

async function run(refreshStatus: number, refreshBody: unknown, rotateMeanwhile = false) {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "revoked refresh test",
    isActive: true,
    testStatus: "active",
    accessToken: "synthetic-access-revoked",
    refreshToken: "synthetic-refresh-revoked",
    email: "revoked@example.invalid",
    providerSpecificData: { workspaceId: "workspace-revoked", autoFetchModels: false },
  });
  const calls: string[] = [];
  globalThis.fetch = async (input: RequestInfo | URL) => {
    const url = String(input instanceof Request ? input.url : input);
    calls.push(url);
    if (url.includes("auth.openai.com/oauth/token")) {
      // A concurrent refresh or a re-login stored a newer token while ours was in flight.
      if (rotateMeanwhile) {
        await providers.updateProviderConnection(connection.id, {
          refreshToken: "synthetic-refresh-newer",
        });
      }
      return Response.json(refreshBody, { status: refreshStatus });
    }
    return Response.json(
      {
        error: {
          message: "Your authentication token has been invalidated.",
          code: "token_invalidated",
        },
      },
      { status: 401 }
    );
  };
  const result = await handleChatCore({
    body: { model: "gpt-5.6-sol", input: "offline test", stream: false },
    modelInfo: { provider: "codex", model: "gpt-5.6-sol", extendedContext: false },
    credentials: {
      connectionId: connection.id,
      accessToken: connection.accessToken,
      refreshToken: connection.refreshToken,
      providerSpecificData: connection.providerSpecificData,
    },
    log: safeLog,
    connectionId: connection.id,
    userAgent: "unit-test",
    clientRawRequest: { endpoint: "/v1/responses", headers: new Headers(), body: {} },
    onCredentialsRefreshed: async (creds: Record<string, unknown>) => {
      await providers.updateProviderConnection(connection.id, {
        ...(creds.testStatus ? { testStatus: creds.testStatus } : {}),
        ...(creds.isActive !== undefined ? { isActive: creds.isActive } : {}),
      });
    },
  });
  if (result.response && !result.response.bodyUsed) await result.response.text();
  return {
    after: await providers.getProviderConnectionById(connection.id),
    refreshCalls: calls.filter((u) => u.includes("oauth/token")).length,
  };
}

test("revoked refresh token (refresh_token_invalidated) deactivates the Codex connection", async () => {
  const { after, refreshCalls } = await run(401, {
    error: {
      code: "refresh_token_invalidated",
      message: "Your refresh token has been invalidated.",
    },
  });
  assert.equal(refreshCalls, 1);
  assert.equal(after?.isActive, false);
  assert.equal(after?.testStatus, "expired");
});

test("transient refresh failure (503) keeps the Codex connection active", async () => {
  const { after } = await run(503, { error: "temporarily_unavailable" });
  assert.equal(after?.isActive, true);
});

test("revoked refresh keeps the connection active when a newer token was stored meanwhile", async () => {
  const { after } = await run(
    401,
    {
      error: {
        code: "refresh_token_invalidated",
        message: "Your refresh token has been invalidated.",
      },
    },
    true
  );
  assert.equal(after?.isActive, true);
  assert.notEqual(after?.testStatus, "expired");
});
