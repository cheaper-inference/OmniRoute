import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "proactive-copilot-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { checkAndRefreshToken } = await import("../../src/sse/services/tokenRefresh.ts");
const originalFetch = globalThis.fetch;

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

async function createConnection(provider: string, due = true) {
  return providers.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: "synthetic-github-access",
    refreshToken: "synthetic-github-refresh",
    expiresAt: new Date(Date.now() + 24 * 3600_000).toISOString(),
    testStatus: "active",
    isActive: true,
    providerSpecificData: {
      copilotToken: "synthetic-old-copilot",
      copilotTokenExpiresAt: Math.floor(Date.now() / 1000) + (due ? -60 : 24 * 3600),
      gheUrl: "https://enterprise.example.invalid/",
      retainedSetting: "preserved",
    },
  });
}

for (const provider of ["github", "ghe-copilot"]) {
  test(`${provider}: due Copilot refresh persists and returns the same token without changing OAuth credentials`, async () => {
    const connection = await createConnection(provider);
    const expiresAt = Math.floor(Date.now() / 1000) + 3600;
    const requests: string[] = [];
    globalThis.fetch = async (input, init) => {
      requests.push(String(input));
      assert.equal(
        new Headers(init?.headers).get("authorization"),
        "token synthetic-github-access"
      );
      return Response.json({ token: "synthetic-new-copilot", expires_at: expiresAt });
    };

    const result = await checkAndRefreshToken(provider, {
      ...connection,
      connectionId: connection.id,
    });
    const expectedBase =
      provider === "github"
        ? "https://api.github.com"
        : "https://enterprise.example.invalid/api/v3";
    assert.deepEqual(requests, [`${expectedBase}/copilot_internal/v2/token`]);
    assert.equal(result.copilotToken, "synthetic-new-copilot");
    assert.equal(result.accessToken, connection.accessToken);
    assert.equal(result.refreshToken, connection.refreshToken);
    assert.equal(result.expiresAt, connection.expiresAt);
    assert.deepEqual(result.providerSpecificData, {
      ...connection.providerSpecificData,
      copilotToken: "synthetic-new-copilot",
      copilotTokenExpiresAt: expiresAt,
    });
    assert.equal(connection.providerSpecificData.copilotToken, "synthetic-old-copilot");
    const stored = await providers.getProviderConnectionById(connection.id);
    assert.deepEqual(stored?.providerSpecificData, result.providerSpecificData);
    assert.equal(stored?.accessToken, connection.accessToken);
    assert.equal(stored?.refreshToken, connection.refreshToken);
  });

  test(`${provider}: unexpired Copilot credentials do not dispatch a refresh`, async () => {
    const connection = await createConnection(provider, false);
    globalThis.fetch = async () => {
      assert.fail("unexpired Copilot token must not trigger a network request");
    };
    const input = { ...connection, connectionId: connection.id };
    assert.deepEqual(await checkAndRefreshToken(provider, input), input);
  });
}

test("failed Copilot HTTP refresh preserves the existing token and durable credentials", async () => {
  const connection = await createConnection("github");
  let requests = 0;
  globalThis.fetch = async () => {
    requests++;
    return new Response(null, { status: 401 });
  };
  const input = { ...connection, connectionId: connection.id };
  const before = await providers.getProviderConnectionById(connection.id);
  assert.deepEqual(await checkAndRefreshToken("github", input), input);
  assert.equal(requests, 1);
  assert.deepEqual(await providers.getProviderConnectionById(connection.id), before);
});
