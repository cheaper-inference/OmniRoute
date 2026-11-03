import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { MockAgent, getGlobalDispatcher, setGlobalDispatcher } from "undici";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const fixtureRoot = path.resolve("_artifacts/new-connection-proxy-api");
fs.mkdirSync(fixtureRoot, { recursive: true });
const dataDir = fs.mkdtempSync(path.join(fixtureRoot, "db-"));
const originalEnv = { ...process.env };
const originalFetch = globalThis.fetch;
const originalDispatcher = getGlobalDispatcher();
const network = new MockAgent();
network.disableNetConnect();
network
  .get("https://api.openai.com")
  .intercept({ path: "/v1/models", method: "GET" })
  .reply(200, { data: [] })
  .persist();
setGlobalDispatcher(network);
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
process.env.JWT_SECRET = "synthetic-proxy-api-session-secret";
process.env.API_KEY_SECRET = "synthetic-proxy-api-key-secret";
delete process.env.INITIAL_PASSWORD;
// Only the automatic credential probe is stubbed; validation, auth, settings,
// HTTP handlers and SQLite persistence below are the real production modules.
globalThis.fetch = async () => Response.json({ data: [], models: [] });

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const providers = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/providers/route.ts");
const createdIds: string[] = [];

test.after(async () => {
  try {
    // Wait for the real background probes to persist their result before closing
    // SQLite. Never turn a late probe's storage failure into a passing fixture.
    const deadline = Date.now() + 5000;
    let complete = false;
    while (Date.now() < deadline) {
      const rows = await Promise.all(
        createdIds.map((id) => providers.getProviderConnectionById(id))
      );
      complete = rows.every((row) => typeof row?.lastTested === "string");
      if (complete) break;
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
    assert.ok(complete, "all automatic fixture probes must finish before cleanup");
    await new Promise((resolve) => setImmediate(resolve));
  } finally {
    core.resetDbInstance();
    await network.close();
    setGlobalDispatcher(originalDispatcher);
    globalThis.fetch = originalFetch;
    fs.rmSync(dataDir, { recursive: true, force: true });
    for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
    Object.assign(process.env, originalEnv);
  }
});

test("POST /api/providers validates and forwards explicit booleans, leaving omission to persistence", async (t) => {
  await settings.updateSettings({ requireLogin: true, setupComplete: true });
  for (const [saved, explicit] of [
    [false, undefined],
    [false, true],
    [true, false],
  ] as const) {
    await t.test(`default=${saved}, explicit=${explicit}`, async () => {
      await settings.updateSettings({ defaultNewConnectionProxyEnabled: saved });
      const response = await route.POST(
        await makeManagementSessionRequest("http://localhost/api/providers", {
          method: "POST",
          headers: { "X-Skip-Model-Sync": "true" },
          body: {
            provider: "openai",
            name: `synthetic-${saved}-${explicit}`,
            apiKey: `sk-synthetic-${saved}-${explicit}`,
            ...(explicit === undefined ? {} : { proxyEnabled: explicit }),
          },
        })
      );
      assert.equal(response.status, 201);
      const body = await response.json();
      createdIds.push(body.connection.id);
      const expected = explicit ?? saved;
      assert.equal(body.connection.proxyEnabled, expected);
      assert.equal(
        (await providers.getProviderConnectionById(body.connection.id))?.proxyEnabled,
        expected
      );
      const stored = core
        .getDbInstance()
        .prepare("SELECT proxy_enabled FROM provider_connections WHERE id = ?")
        .get(body.connection.id) as { proxy_enabled: number };
      assert.equal(stored.proxy_enabled, expected ? 1 : 0);
    });
  }
  const count = (await providers.getProviderConnections()).length;
  for (const invalid of [null, "false", 0, 1, [], {}]) {
    const response = await route.POST(
      await makeManagementSessionRequest("http://localhost/api/providers", {
        method: "POST",
        body: { provider: "openai", name: "invalid", apiKey: "sk-invalid", proxyEnabled: invalid },
      })
    );
    assert.equal(response.status, 400);
  }
  assert.equal((await providers.getProviderConnections()).length, count);
});
