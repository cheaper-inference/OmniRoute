// GET /api/settings/proxy?resolveIds=id1,id2,... — batch per-connection proxy
// resolution. The dashboard used to fire one `?resolve=` request per connection;
// with many connections that burst slowed both the UI and the shared proxy
// process, so the hook now sends one request for the whole page.
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-resolveids-"));

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "proxy-resolveids-api-key-secret";
delete process.env.INITIAL_PASSWORD;

// Static imports cannot work here: DATA_DIR (and the API-key secret) must be set
// before src/lib/db/* resolves its storage paths at module load, so the modules
// are imported after the environment is prepared.
const core = await import("../../../src/lib/db/core.ts");
const settings = await import("../../../src/lib/db/settings.ts");
const proxies = await import("../../../src/lib/db/proxies.ts");
const route = await import("../../../src/app/api/settings/proxy/route.ts");

let proxyId: string;

async function get(query: string): Promise<Response> {
  return route.GET(new Request(`http://localhost/api/settings/proxy${query}`));
}

before(async () => {
  core.resetDbInstance();
  core.getDbInstance();
  // Fresh isolated DB: disarms requireManagementAuth (cf. isAuthRequired).
  await settings.updateSettings({ requireLogin: false });
  const proxy = await proxies.createProxy({
    name: "Batch proxy",
    type: "http",
    host: "10.0.0.7",
    port: 3128,
  });
  proxyId = proxy.id;
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("resolveIds answers every requested id in one response", async () => {
  const response = await get("?resolveIds=conn-a,conn-b");
  assert.equal(response.status, 200);

  const body = (await response.json()) as { results: Record<string, unknown> };
  assert.deepEqual(Object.keys(body.results).sort(), ["conn-a", "conn-b"]);
  assert.equal(body.results["conn-a"], null, "an unknown connection resolves to null");
  assert.equal(body.results["conn-b"], null);
});

test("resolveIds returns the assigned proxy for a key-scoped connection", async () => {
  await proxies.assignProxyToScope("account", "conn-with-proxy", proxyId);

  const response = await get("?resolveIds=conn-with-proxy");
  const body = (await response.json()) as {
    results: Record<string, { proxy?: { host?: string }; level?: string } | null>;
  };
  const entry = body.results["conn-with-proxy"];

  assert.ok(entry, "an assigned connection must resolve to an entry");
  assert.equal(entry!.proxy?.host, "10.0.0.7");
  assert.equal(entry!.level, "account");
});

test("resolveIds ignores blank entries and de-duplicates ids", async () => {
  const response = await get("?resolveIds=conn-dup,,conn-dup");
  const body = (await response.json()) as { results: Record<string, unknown> };

  assert.deepEqual(Object.keys(body.results), ["conn-dup"]);
});

test("an empty resolveIds value falls through to the full-config branch", async () => {
  const response = await get("?resolveIds=");
  assert.equal(response.status, 200);

  const body = (await response.json()) as Record<string, unknown>;
  assert.equal("results" in body, false, "the batch shape must not be returned");
});

test("resolveIds caps the fan-out instead of resolving an unbounded list", async () => {
  const ids = Array.from({ length: 250 }, (_, index) => `conn-${index}`);
  const response = await get(`?resolveIds=${ids.join(",")}`);
  const body = (await response.json()) as { results: Record<string, unknown> };

  assert.equal(Object.keys(body.results).length, 200);
});
