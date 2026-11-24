// MCP tools/list filtered by the caller's scopes (opt-in, OMNIROUTE_MCP_SCOPE_TOOLS_LIST=1).
// A key that cannot call a tool should not be offered it: the model would only waste calls on
// refusals. Call-time enforcement is unchanged and stays the real guard.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-mcp-scope-list-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "mcp-scope-list-secret";
delete process.env.OMNIROUTE_MCP_SCOPES;
delete process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST;

const core = await import("../../src/lib/db/core.ts");
const { createMcpServer } = await import("../../open-sse/mcp-server/server.ts");
const { evaluateToolScopes } = await import("../../open-sse/mcp-server/scopeEnforcement.ts");
const { MCP_TOOL_MAP } = await import("../../open-sse/mcp-server/schemas/tools.ts");

test.after(() => {
  delete process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Raw JSON-RPC tools/list over the in-memory transport; `authInfo` rides on the request. */
async function listTools(authInfo?: { token: string; clientId: string; scopes: string[] }) {
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const server = createMcpServer();
  await server.connect(serverTransport);
  const reply = new Promise<{ result?: { tools: Array<{ name: string }> } }>((resolve) => {
    clientTransport.onmessage = (message) => resolve(message as never);
  });
  await clientTransport.start();
  await clientTransport.send({ jsonrpc: "2.0", id: 1, method: "tools/list", params: {} }, {
    authInfo,
  } as never);
  const names = ((await reply).result?.tools ?? []).map((tool) => tool.name);
  await clientTransport.close();
  return names;
}

const caller = (...scopes: string[]) => ({ token: "t", clientId: "key-1", scopes });

test("flag off: a narrow key still sees every tool, as before", async () => {
  const all = await listTools(caller("manage"));
  const narrow = await listTools(caller("mcp:connect"));
  assert.ok(all.length > 20, `expected the full tool list, got ${all.length}`);
  assert.deepEqual(narrow, all);
});

test("flag on: a read-only key sees only the tools its scopes allow", async () => {
  process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST = "1";
  const names = await listTools(caller("read:health"));
  assert.ok(names.includes("omniroute_get_health"));
  assert.ok(!names.includes("omniroute_switch_combo"), "write:combos tool must be hidden");
  assert.ok(!names.includes("omniroute_route_request"), "execute:completions tool must be hidden");
});

test("flag on: a tool that needs two scopes shows only when both are held", async () => {
  process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST = "1";
  assert.ok(!(await listTools(caller("read:health"))).includes("omniroute_simulate_route"));
  assert.ok(
    (await listTools(caller("read:health", "read:combos"))).includes("omniroute_simulate_route")
  );
});

test("flag on: a manage key sees the full list", async () => {
  process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST = "1";
  const withFlag = await listTools(caller("manage"));
  delete process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST;
  assert.deepEqual(withFlag, await listTools(caller("manage")));
});

test("flag on: a caller with no per-key identity (stdio, no enforcement) sees the full list", async () => {
  process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST = "1";
  const withFlag = await listTools(undefined);
  delete process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST;
  assert.deepEqual(withFlag, await listTools(undefined));
});

test("flag on: an unmatched scope list hides everything it cannot call, and never throws", async () => {
  process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST = "1";
  const names = await listTools(caller("unrelated:scope"));
  assert.ok(!names.includes("omniroute_get_health"));
});

test("flag on: the list shows exactly the tools the call-time guard would allow", async () => {
  const everyTool = await listTools(caller("manage"));
  for (const scopes of [
    ["read:health"],
    ["read:health", "read:combos"],
    ["write:combos"],
    ["execute:*"],
    ["unrelated:scope"],
  ]) {
    process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST = "1";
    const shown = new Set(await listTools(caller(...scopes)));
    delete process.env.OMNIROUTE_MCP_SCOPE_TOOLS_LIST;
    for (const name of everyTool.filter((tool) => MCP_TOOL_MAP[tool])) {
      const allowed = evaluateToolScopes(name, scopes, true).allowed;
      assert.equal(
        shown.has(name),
        allowed,
        `${name} with [${scopes}]: listed=${shown.has(name)} guard=${allowed}`
      );
    }
  }
});
