import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Rosebud discovery and catalog sync both run the local CLI. The two routes used to
// judge the peer differently (one read the pipeline header directly, the other used
// the shared peer helper and only refused "remote") and answered with different
// error bodies. They now share one helper with one allowed set: loopback or LAN.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rosebud-peer-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= `test-rosebud-peer-${Date.now()}`;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { requireRosebudLocalPeer } = await import("../../src/lib/rosebud/authorization.ts");
const { AUTHZ_HEADER_PEER_LOCALITY } = await import("../../src/server/authz/headers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const syncRoute = await import("../../src/app/api/providers/[id]/sync-models/route.ts");

const previousStamp = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
process.env.OMNIROUTE_PEER_STAMP_TOKEN = "test-only-rosebud-peer-stamp";

test.after(() => {
  if (previousStamp === undefined) delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  else process.env.OMNIROUTE_PEER_STAMP_TOKEN = previousStamp;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function peerRequest(url: string, locality: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set(AUTHZ_HEADER_PEER_LOCALITY, locality);
  return new Request(url, { ...init, headers });
}

test("the Rosebud peer helper admits loopback and LAN and refuses every other verdict", async () => {
  assert.equal(requireRosebudLocalPeer(peerRequest("http://localhost/x", "loopback")), null);
  assert.equal(requireRosebudLocalPeer(peerRequest("http://localhost/x", "lan")), null);
  for (const verdict of ["remote", "unknown", ""]) {
    const denied = requireRosebudLocalPeer(peerRequest("http://localhost/x", verdict));
    assert.equal(denied?.status, 403, `verdict ${JSON.stringify(verdict)} must be refused`);
  }
});

test("discovery and sync refuse an authenticated remote peer with the same answer", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "rosebud",
    authType: "noauth",
    name: "Rosebud peer test",
  });
  const { key } = await apiKeysDb.createApiKey("rosebud-peer-manage", "machine-test", ["manage"]);
  const auth = { Authorization: `Bearer ${key}` };
  const params = { params: Promise.resolve({ id: connection.id }) };

  const discovery = await modelsRoute.GET(
    peerRequest(`http://localhost/api/providers/${connection.id}/models`, "remote", {
      headers: auth,
    }),
    params
  );
  const sync = await syncRoute.POST(
    peerRequest(`http://localhost/api/providers/${connection.id}/sync-models`, "remote", {
      method: "POST",
      headers: auth,
    }),
    params
  );

  assert.equal(discovery.status, 403);
  assert.equal(sync.status, 403);
  assert.deepEqual(await sync.json(), await discovery.json());
});
