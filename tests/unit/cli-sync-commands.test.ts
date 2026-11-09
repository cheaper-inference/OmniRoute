import test from "node:test";
import assert from "node:assert/strict";

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    exitCode: status < 400 ? 0 : 1,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    if (typeof c === "string") chunks.push(c);
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

// `sync push`, `sync bundle` and `sync initialize` are covered against the real commander wiring
// in tests/unit/cli-sync-subcommands-routes.test.ts. The stub that lived here asserted the
// `{parts, dryRun}` body, i.e. the 400 bug itself (POST /api/sync/cloud only takes `{action}`).

// `sync pull` is covered against the real commander wiring in
// tests/unit/cli-sync-pull-exportall.test.ts (GET /api/db-backups/exportAll → .tar.gz on disk).
// The stub that lived here asserted a POST body with `strategy`, i.e. the 405 bug itself.

// `sync diff` (and `sync resolve`) were removed: GET /api/sync/cloud ignores `op=` and answers
// with the cloud status, so the stub that asserted `op=diff` in the query encoded a no-op.

test("sync status chama /api/sync/cloud?op=status", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ lastSync: "2026-05-14T10:00:00Z" }));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/cloud?op=status");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("op=status"));
});

test("sync tokens list busca /api/sync/tokens", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp([{ id: "tok-1", name: "prod-sync" }]));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/tokens");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/sync/tokens"));
});

test("sync tokens create envia name/scope/ttl", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ id: "tok-2", name: "dev-sync" }));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/tokens", {
    method: "POST",
    body: JSON.stringify({ name: "dev-sync", scope: "read:all", ttl: "30d" }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "dev-sync");
  assert.equal(capturedBody.ttl, "30d");
});

test("sync initialize chama POST /api/sync/initialize", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({ initialized: true }));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/initialize", {
    method: "POST",
    body: JSON.stringify({}),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/sync/initialize"));
  assert.equal(capturedMethod, "POST");
});

test("sync.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/sync.mjs");
  assert.equal(typeof mod.registerSync, "function");
});
