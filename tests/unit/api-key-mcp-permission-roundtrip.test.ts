import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { mock } from "node:test";
import { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "key-mcp-permissions-"));
process.env.DATA_DIR = data;
process.env.API_KEY_SECRET = "synthetic-mcp-permission-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
process.env.OMNIROUTE_MCP_ENFORCE_SCOPES = "true";
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;
mock.method(globalThis, "fetch", async () => {
  throw new Error("Unexpected network in synthetic key-permission test");
});
const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const settings = await import("../../src/lib/db/settings.ts");
const list = await import("../../src/app/api/keys/route.ts");
const item = await import("../../src/app/api/keys/[id]/route.ts");
const mcp = await import("../../src/app/api/mcp/stream/route.ts");
const transport = await import("../../open-sse/mcp-server/httpTransport.ts");
const ccr = await import("../../open-sse/services/compression/engines/ccr/index.ts");
const { createInitialFormState, buildApiKeyAccessPayload } =
  await import("../../src/app/(dashboard)/dashboard/api-manager/[id]/access/useApiKeyAccessForm.ts");
const { buildApiKeyCreateScopes } =
  await import("../../src/app/(dashboard)/dashboard/api-manager/apiManagerScopes.ts");
const { getApiKeyMetadata } = keys;

test.after(() => {
  transport.shutdownMcpHttp();
  ccr.resetCcrStore();
  core.resetDbInstance();
  keys.resetApiKeyState();
  mock.restoreAll();
  fs.rmSync(data, { recursive: true, force: true });
});

function params(id: string) {
  return { params: Promise.resolve({ id }) };
}
async function patch(id: string, body: Record<string, unknown>) {
  return item.PATCH(
    await makeManagementSessionRequest(`http://localhost/api/keys/${id}`, {
      method: "PATCH",
      body,
    }),
    params(id)
  );
}
async function rpc(key: string, method: string, input: unknown, session?: string, id?: number) {
  const headers = new Headers({
    authorization: `Bearer ${key}`,
    "content-type": "application/json",
    accept: "application/json, text/event-stream",
    "mcp-protocol-version": "2025-03-26",
  });
  if (session) headers.set("mcp-session-id", session);
  return mcp.POST(
    new NextRequest("http://localhost/api/mcp/stream", {
      method: "POST",
      headers,
      body: JSON.stringify({
        jsonrpc: "2.0",
        ...(id === undefined ? {} : { id }),
        method,
        params: input,
      }),
    })
  );
}
async function decoded(response: Response) {
  const text = await response.text();
  const data = text.split("\n").find((line) => line.startsWith("data:"));
  return JSON.parse(data ? data.slice(5) : text);
}
async function initialize(key: string) {
  const response = await rpc(
    key,
    "initialize",
    {
      protocolVersion: "2025-03-26",
      capabilities: {},
      clientInfo: { name: "synthetic", version: "1" },
    },
    undefined,
    1
  );
  assert.equal(response.status, 200);
  assert.ok((await decoded(response)).result);
  const session = response.headers.get("mcp-session-id")!;
  assert.ok(session);
  const notified = await rpc(key, "notifications/initialized", {}, session);
  await notified.text();
  return session;
}

test("authenticated create/edit/reload preserves key identity and refreshes exact narrow permissions", async () => {
  process.env.INITIAL_PASSWORD = "synthetic-password";
  await settings.updateSettings({
    requireLogin: true,
    cloudEnabled: false,
    mcpEnabled: true,
    mcpTransport: "streamable-http",
  });
  const scopes = buildApiKeyCreateScopes({
    manageEnabled: false,
    mcpConnectEnabled: true,
    compressionReadEnabled: true,
  });
  const created = await list.POST(
    await makeManagementSessionRequest("http://localhost/api/keys", {
      method: "POST",
      body: { name: "Synthetic MCP reader", scopes: [...scopes, "custom:keep"] },
    })
  );
  assert.equal(created.status, 201);
  const key = await created.json();
  const stored = await keys.getApiKeyById(key.id);
  assert.ok(stored);
  const originalSecret = stored.key;
  assert.equal(stored.scopes.includes("manage"), false);
  assert.equal((await getApiKeyMetadata(key.key)).scopes.includes("read:compression"), true);
  const reloaded = await item.GET(
    await makeManagementSessionRequest(`http://localhost/api/keys/${key.id}`),
    params(key.id)
  );
  const form = createInitialFormState(await reloaded.json());
  assert.equal(form.mcpConnectEnabled, true);
  assert.equal(form.compressionReadEnabled, true);
  form.name = "Synthetic renamed";
  form.compressionReadEnabled = false;
  assert.equal((await patch(key.id, buildApiKeyAccessPayload(form, stored))).status, 200);
  assert.equal((await getApiKeyMetadata(key.key)).scopes.includes("read:compression"), false);
  const after = await keys.getApiKeyById(key.id);
  assert.equal(after.id, stored.id);
  assert.equal(after.key, originalSecret);
  assert.ok(after.scopes.includes("custom:keep"));
  assert.ok(after.scopes.includes("self:usage"));
  assert.ok(after.scopes.includes("mcp:connect"));
  assert.equal(
    (
      await patch(key.id, {
        scopes: ["self:usage", "mcp:connect", "read:compression", "custom:keep"],
      })
    ).status,
    200
  );
  assert.equal((await getApiKeyMetadata(key.key)).scopes.includes("read:compression"), true);

  const hash = ccr.storeBlock("synthetic private CCR", String(key.id));
  const session = await initialize(key.key);
  const own = await decoded(
    await rpc(
      key.key,
      "tools/call",
      { name: "omniroute_ccr_retrieve", arguments: { hash } },
      session,
      2
    )
  );
  assert.notEqual(own.result?.isError, true);
  assert.match(JSON.stringify(own), /synthetic private CCR/);
  const other = await keys.createApiKey("Other reader", "synthetic-machine", scopes);
  const foreignSession = await initialize(other.key);
  const foreign = await decoded(
    await rpc(
      other.key,
      "tools/call",
      { name: "omniroute_ccr_retrieve", arguments: { hash } },
      foreignSession,
      3
    )
  );
  assert.doesNotMatch(JSON.stringify(foreign), /synthetic private CCR/);

  assert.equal((await patch(key.id, { scopes: ["self:usage", "mcp:connect"] })).status, 200);
  const missingRead = await decoded(
    await rpc(
      key.key,
      "tools/call",
      { name: "omniroute_ccr_retrieve", arguments: { hash } },
      session,
      4
    )
  );
  assert.doesNotMatch(JSON.stringify(missingRead), /synthetic private CCR/);
  assert.ok(missingRead.error || missingRead.result?.isError);
  assert.equal((await patch(key.id, { scopes: ["self:usage", "read:compression"] })).status, 200);
  const missingConnect = await rpc(key.key, "initialize", {}, undefined, 5);
  assert.equal(missingConnect.status, 403);
  await missingConnect.text();
  const forbidden = await list.POST(
    new Request("http://localhost/api/keys", {
      method: "POST",
      headers: { authorization: `Bearer ${key.key}`, "content-type": "application/json" },
      body: JSON.stringify({ name: "Forbidden", scopes: ["manage"] }),
    })
  );
  assert.equal(forbidden.status, 403);
  assert.equal(
    (
      await list.POST(
        new Request("http://localhost/api/keys", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: "{}",
        })
      )
    ).status,
    401
  );
  const invalid = await patch(key.id, { scopes: [42] });
  assert.equal(invalid.status, 400);
  assert.deepEqual((await keys.getApiKeyById(key.id)).scopes, ["self:usage", "read:compression"]);
});
