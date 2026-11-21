import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

type ProvidersBody = {
  providers: Array<{ id: string; prefixes: string[] }>;
  prefixes: string[];
};

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-launch-providers-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
process.env.API_KEY_SECRET = "launch-providers-api-key-secret";
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const core = await import("../../../src/lib/db/core.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const nodesDb = await import("../../../src/lib/db/providers/nodes.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../../src/lib/db/readCache.ts");
const sessionsRoute = await import("../../../src/app/api/launch/sessions/route.ts");
const providersRoute = await import("../../../src/app/api/launch/providers/route.ts");
const capsRoute = await import("../../../src/app/api/launch/capabilities/route.ts");
const { classifyRoute } = await import("../../../src/server/authz/classify.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const REMOTE = "http://gateway.example.com";
const SECRET = "sk-launch-providers-upstream-secret";
const NODE_ID = "launch-providers-node-0001";

function req(pathName: string, token?: string): Request {
  const headers: Record<string, string> = {};
  if (token) headers.authorization = `Bearer ${token}`;
  return new Request(`${REMOTE}${pathName}`, { method: "GET", headers });
}

async function newKey(name: string) {
  const created = await apiKeysDb.createApiKey(name, "machine-test", []);
  return created.key as string;
}

async function connect(provider: string, extra: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `conn-${provider}-name`,
    apiKey: SECRET,
    isActive: true,
    testStatus: "active",
    ...extra,
  });
}

async function list(token: string) {
  invalidateDbCache();
  const res = await providersRoute.GET(req("/api/launch/providers", token));
  const text = await res.text();
  return { res, text, body: JSON.parse(text) as ProvidersBody };
}

const ids = (body: ProvidersBody) => body.providers.map((p) => p.id);

test("401 without a credential and with a bad one", async () => {
  const none = await providersRoute.GET(req("/api/launch/providers"));
  assert.equal(none.status, 401);
  const bad = await providersRoute.GET(req("/api/launch/providers", "sk-not-a-real-key"));
  assert.equal(bad.status, 401);
  const badSession = await providersRoute.GET(req("/api/launch/providers", "olx_bogus"));
  assert.equal(badSession.status, 401);
});

test("empty install lists no providers", async () => {
  const key = await newKey("empty");
  const { res, body } = await list(key);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("cache-control"), "no-store");
  assert.deepEqual(body, { providers: [], prefixes: [] });
});

test("active, inactive, terminal, noAuth, blocked and compatible-node connections", async () => {
  const key = await newKey("mixed");
  await connect("cheaperinference");
  await connect("openai", { isActive: false });
  await connect("deepseek", { testStatus: "expired" });
  await connect("duckduckgo-web");
  await connect("groq");
  await nodesDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "Launch Node",
    prefix: "mynode",
    apiType: "chat",
    baseUrl: "http://127.0.0.1:9",
  });
  await connect(NODE_ID, { providerSpecificData: { prefix: "mynode" } });
  await settingsDb.updateSettings({ blockedProviders: ["groq"] });

  const { res, text, body } = await list(key);
  assert.equal(res.status, 200);
  assert.deepEqual(ids(body), ["cheaperinference", "mynode"]);

  const cinf = body.providers.find((p) => p.id === "cheaperinference");
  assert.ok(cinf?.prefixes.includes("cheaperinference"));
  assert.ok(cinf?.prefixes.includes("cinf"));
  assert.deepEqual(cinf?.prefixes, [...cinf!.prefixes].sort());
  assert.deepEqual(body.providers.find((p) => p.id === "mynode")?.prefixes, ["mynode"]);

  const union = [...new Set(body.providers.flatMap((p) => p.prefixes))].sort();
  assert.deepEqual(body.prefixes, union);
  for (const excluded of ["openai", "deepseek", "duckduckgo-web", "groq"]) {
    assert.ok(!body.prefixes.includes(excluded), excluded);
  }

  // No secrets, connection names/ids, or raw node ids.
  const connections = (await providersDb.getProviderConnections()) as Array<{ id: string }>;
  assert.ok(!text.includes(SECRET));
  assert.ok(!text.includes("conn-"));
  assert.ok(!text.includes(NODE_ID));
  for (const c of connections) assert.ok(!text.includes(c.id), "connection id leaked");
  for (const p of body.providers) assert.deepEqual(Object.keys(p).sort(), ["id", "prefixes"]);

  // Unblocking restores the provider.
  await settingsDb.updateSettings({ blockedProviders: [] });
  assert.ok(ids((await list(key)).body).includes("groq"));
});

test("a launch session token (olx_) is accepted", async () => {
  const key = await newKey("session-parent");
  const minted = await sessionsRoute.POST(
    new Request(`${REMOTE}/api/launch/sessions`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({ tool: "codex" }),
    })
  );
  assert.equal(minted.status, 201);
  const { token } = (await minted.json()) as { token: string };
  assert.match(token, /^olx_/);
  const { res, body } = await list(token);
  assert.equal(res.status, 200);
  assert.ok(ids(body).includes("cheaperinference"));
});

test("capabilities advertise connected providers; route is PUBLIC class", async () => {
  const key = await newKey("caps");
  const res = await capsRoute.GET(req("/api/launch/capabilities", key));
  assert.equal(res.status, 200);
  const body = (await res.json()) as { features: string[]; view: { connectedProviders: boolean } };
  assert.equal(body.view.connectedProviders, true);
  assert.ok(body.features.includes("connected-providers"));
  assert.equal(classifyRoute("/api/launch/providers", "GET").routeClass, "PUBLIC");
});
