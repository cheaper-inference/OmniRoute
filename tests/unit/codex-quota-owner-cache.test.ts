import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "codex-owner-quota-cache-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";
const { registerCodexConnection, unregisterCodexConnection, fetchCodexQuota } =
  await import("../../open-sse/services/codexQuotaFetcher.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});
const id = "synthetic-quota-owner";
const a = { accessToken: "synthetic-a", workspaceId: "workspace-a" };
const b = { accessToken: "synthetic-b", workspaceId: "workspace-b" };

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
function usage(percent: number) {
  return Response.json({
    rate_limit: {
      primary_window: { used_percent: percent, reset_after_seconds: 300 },
      secondary_window: { used_percent: percent, reset_after_seconds: 600 },
    },
  });
}
function barrier() {
  const started = deferred<void>();
  const response = deferred<Response>();
  globalThis.fetch = async () => {
    started.resolve();
    return response.promise;
  };
  return { started: started.promise, release: response.resolve };
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  unregisterCodexConnection(id);
});

test("a newly registered credential cannot consume its predecessor's cached quota", async () => {
  globalThis.fetch = async () => usage(10);
  registerCodexConnection(id, a);
  assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.1);
  registerCodexConnection(id, b);
  globalThis.fetch = async () => usage(80);
  assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.8);
});

test("caller credentials are resolved before a connection-only cache lookup", async () => {
  globalThis.fetch = async () => usage(10);
  await fetchCodexQuota(id, { accessToken: a.accessToken });
  globalThis.fetch = async (_input, init) => {
    assert.equal(new Headers(init?.headers).get("authorization"), `Bearer ${b.accessToken}`);
    return usage(80);
  };
  assert.equal((await fetchCodexQuota(id, { accessToken: b.accessToken }))?.percentUsed, 0.8);
});

test("a late success cannot replace the new owner's cached quota", async () => {
  registerCodexConnection(id, a);
  const blocked = barrier();
  const old = fetchCodexQuota(id);
  await blocked.started;
  registerCodexConnection(id, b);
  globalThis.fetch = async () => usage(80);
  assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.8);
  blocked.release(usage(10));
  assert.equal(await old, null);
  assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.8);
});

for (const status of [401, 403]) {
  test(`a late ${status} cannot unregister new credentials or evict their quota`, async () => {
    registerCodexConnection(id, a);
    const blocked = barrier();
    const old = fetchCodexQuota(id);
    await blocked.started;
    registerCodexConnection(id, b);
    globalThis.fetch = async () => usage(80);
    assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.8);
    blocked.release(new Response(null, { status }));
    assert.equal(await old, null);
    assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.8);
  });
}

test("A-to-B-to-A registration cannot authorize the first A's in-flight result", async () => {
  registerCodexConnection(id, a);
  const blocked = barrier();
  const old = fetchCodexQuota(id);
  await blocked.started;
  registerCodexConnection(id, b);
  registerCodexConnection(id, a);
  blocked.release(usage(10));
  assert.equal(await old, null);
  globalThis.fetch = async () => usage(40);
  assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.4);
});

test("unregistering a connection prevents a pending success resurrecting its cache", async () => {
  registerCodexConnection(id, a);
  const blocked = barrier();
  const old = fetchCodexQuota(id);
  await blocked.started;
  unregisterCodexConnection(id);
  blocked.release(usage(10));
  assert.equal(await old, null);
  assert.equal(await fetchCodexQuota(id), null);
});

test("an identical registration preserves its current request and cache", async () => {
  registerCodexConnection(id, a);
  const blocked = barrier();
  const current = fetchCodexQuota(id);
  await blocked.started;
  registerCodexConnection(id, { ...a });
  blocked.release(usage(10));
  assert.equal((await current)?.percentUsed, 0.1);
  globalThis.fetch = async () => {
    throw new Error("cache should serve this request");
  };
  assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.1);
});

test("changing only the workspace invalidates both owner scopes", async () => {
  registerCodexConnection(id, a);
  globalThis.fetch = async () => usage(10);
  await fetchCodexQuota(id);
  registerCodexConnection(id, { ...a, workspaceId: b.workspaceId });
  globalThis.fetch = async () => usage(80);
  assert.equal((await fetchCodexQuota(id))?.percentUsed, 0.8);
});
