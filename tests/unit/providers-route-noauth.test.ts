import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { MockAgent, setGlobalDispatcher } from "undici";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

// uncloseai is in NOAUTH_PROVIDERS and is not in FREE_APIKEY_PROVIDER_IDS, so
// isManagedProviderConnectionId() does not admit it. POST still returned
// { error: "Invalid provider" } for that real catalog id. (opencode is not the
// witness: it is already on the free-apikey allowlist.)
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-providers-noauth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-for-noauth-providers";
process.env.API_KEY_SECRET = "test-api-key-secret-for-noauth-providers";
process.env.INITIAL_PASSWORD = "admin-secret";
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

// The create handler fire-and-forgets a connection test. Keep that probe off
// the network so it cannot hold SQLite open across the assertions.
const network = new MockAgent();
network.disableNetConnect();
setGlobalDispatcher(network);
globalThis.fetch = async () => Response.json({ data: [], models: [] });

const core = await import("../../src/lib/db/core.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 20));
  core.resetDbInstance();
  await network.close();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type ProviderCreateBody = {
  error?: unknown;
  connection?: { provider?: string };
};

async function postProvider(
  provider: string
): Promise<{ status: number; body: ProviderCreateBody }> {
  const response = await providersRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/providers", {
      method: "POST",
      headers: { "X-Skip-Model-Sync": "true" },
      body: {
        provider,
        name: `Noauth fixture ${provider}`,
        apiKey: "fixture-key-not-used-for-catalog-membership",
      },
    })
  );
  return { status: response.status, body: (await response.json()) as ProviderCreateBody };
}

test("POST /api/providers accepts catalogued noauth ids and rejects unknown ids", async () => {
  const unknown = await postProvider("not-a-real-provider-16430");
  assert.equal(unknown.status, 400);
  assert.deepEqual(unknown.body, { error: "Invalid provider" });
  assert.equal(JSON.stringify(unknown.body).includes("at /"), false);

  // `in` would treat Object.prototype keys as catalog members. They are not.
  const inherited = await postProvider("toString");
  assert.equal(inherited.status, 400);
  assert.deepEqual(inherited.body, { error: "Invalid provider" });

  const noauth = await postProvider("uncloseai");
  assert.notDeepEqual(noauth.body, { error: "Invalid provider" });
  assert.equal(noauth.status, 201, JSON.stringify(noauth.body));
  assert.equal(noauth.body.connection?.provider, "uncloseai");
  assert.equal(JSON.stringify(noauth.body).includes("at /"), false);
});
