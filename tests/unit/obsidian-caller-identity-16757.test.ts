import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "obsidian-caller-16757-"));
process.env.DATA_DIR = dataDir;
const originalFetch = globalThis.fetch;
const originalEnv = [process.env.OMNIROUTE_API_KEY, process.env.ROUTER_API_KEY];
const { obsidianTools } = await import("../../open-sse/mcp-server/tools/obsidianTools.ts");
const { withMcpHttpAuthContext } = await import("../../open-sse/mcp-server/httpAuthContext.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { setObsidianToken, setObsidianBaseUrl } = await import("../../src/lib/db/obsidian.ts");
const { setApiKeyContextSource } = await import("../../src/lib/db/apiKeyContextSources.ts");
const { setSyncToken } = await import("../../src/lib/obsidian/api.ts");
const calls: { url: string; authorization: string | null }[] = [];
const args = {
  path: "test.md",
  content: "test",
  query: "test",
  jsonLogic: {},
  period: "daily",
  operation: "append",
  targetType: "heading",
  target: "test",
  commandId: "test",
  newPath: "new.md",
  resolution: "local",
};
const nonSync = obsidianTools.filter((tool) => !tool.name.startsWith("obsidian_sync_"));
const statusTool = obsidianTools.find((tool) => tool.name === "obsidian_check_status")!;

test.before(() => {
  const db = getDbInstance();
  for (const id of ["per-key", "global-key"]) {
    db.prepare(
      "INSERT INTO api_keys (id, name, key, machine_id, scopes, created_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(id, id, `sk-16757-${id}`, "test", "[]", new Date().toISOString());
  }
  setObsidianToken("test-global-token");
  setObsidianBaseUrl("http://127.0.0.1:27123");
  setApiKeyContextSource("per-key", "obsidian", {
    token: "test-per-key-token",
    baseUrl: "http://127.0.0.2:27123",
    enabled: true,
  });
});

test.beforeEach(() => {
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  calls.length = 0;
  globalThis.fetch = async (input, init) => {
    calls.push({
      url: String(input instanceof Request ? input.url : input),
      authorization: new Headers(init?.headers).get("authorization"),
    });
    return Response.json({ authenticated: true, running: true });
  };
});

test.after(() => {
  globalThis.fetch = originalFetch;
  for (const [index, key] of ["OMNIROUTE_API_KEY", "ROUTER_API_KEY"].entries()) {
    if (originalEnv[index] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[index];
  }
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const clientId of [undefined, "", "   ", "anonymous", "env-key"]) {
  test(`all non-sync tools deny unresolved caller ${JSON.stringify(clientId)} before outbound`, async () => {
    assert.equal(nonSync.length, 18);
    const extra = clientId === undefined ? undefined : { authInfo: { clientId } };
    for (const tool of nonSync) {
      await assert.rejects(
        () => tool.handler(args as never, extra),
        /Obsidian API token not configured/,
        tool.name
      );
      assert.deepEqual(calls, [], `${tool.name} must not touch a vault`);
    }
  });
}

test("authenticated per-key caller uses its own vault", async () => {
  await statusTool.handler({}, { authInfo: { clientId: "per-key" } });
  assert.deepEqual(calls, [
    { url: "http://127.0.0.2:27123/", authorization: "Bearer test-per-key-token" },
  ]);
});

test("authenticated caller without per-key config retains global fallback", async () => {
  await statusTool.handler({}, { authInfo: { clientId: "global-key" } });
  assert.deepEqual(calls, [
    { url: "http://127.0.0.1:27123/", authorization: "Bearer test-global-token" },
  ]);
});

for (const headers of [
  { authorization: "Bearer sk-16757-per-key" },
  { "x-api-key": "sk-16757-per-key", "anthropic-version": "2023-06-01" },
]) {
  test(`HTTP identity resolves from ${Object.keys(headers)[0]} without extra`, async () => {
    await withMcpHttpAuthContext(new Request("http://localhost/mcp", { headers }), () =>
      statusTool.handler({})
    );
    assert.deepEqual(calls, [
      { url: "http://127.0.0.2:27123/", authorization: "Bearer test-per-key-token" },
    ]);
  });
}

for (const authorization of [undefined, "Bearer invalid-16757"]) {
  test(`HTTP unresolved caller cannot inherit server environment (${authorization ?? "absent"})`, async () => {
    process.env.OMNIROUTE_API_KEY = "test-env-key";
    const headers = authorization ? { authorization } : {};
    await withMcpHttpAuthContext(new Request("http://localhost/mcp", { headers }), async () => {
      await assert.rejects(() => statusTool.handler({}), /Obsidian API token not configured/);
    });
    assert.deepEqual(calls, []);
  });
}

test("valid stdio environment identity retains global fallback", async () => {
  process.env.OMNIROUTE_API_KEY = "test-env-key";
  await statusTool.handler({});
  assert.equal(calls[0]?.authorization, "Bearer test-global-token");
  assert.equal(calls.length, 1);
});

test("resolved HTTP env-key is an authenticated principal", async () => {
  process.env.OMNIROUTE_API_KEY = "test-env-key";
  await withMcpHttpAuthContext(
    new Request("http://localhost/mcp", {
      headers: { authorization: "Bearer test-env-key" },
    }),
    () => statusTool.handler({}, { authInfo: { clientId: "env-key" } })
  );
  assert.equal(calls[0]?.authorization, "Bearer test-global-token");
  assert.equal(calls.length, 1);
});

test("all sync tools retain their configured sync-token path without caller identity", async () => {
  setSyncToken("test-sync-token");
  const sync = obsidianTools.filter((tool) => tool.name.startsWith("obsidian_sync_"));
  assert.equal(sync.length, 4);
  for (const tool of sync) await tool.handler(args as never);
  assert.equal(calls.length, 4);
  for (const call of calls) {
    assert.ok(call.url.startsWith("http://127.0.0.1:27781/"));
    assert.equal(call.authorization, "Bearer test-sync-token");
  }
});
