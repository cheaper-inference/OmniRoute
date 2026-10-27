// Dynamic skill tools must run as the authenticated key principal, never as the
// client-chosen session id: otherwise any MCP client can run a skill under
// another tenant's identity by naming it in `sessionId`.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dynamic-skill-owner-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY;
const ORIGINAL_ROUTER_API_KEY = process.env.ROUTER_API_KEY;
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;
// No resolvable key principal: case 2 proves the handler falls back to "mcp"
// instead of the caller-supplied session id. A key left in the shell would mask
// exactly what the test measures.
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const { createMcpServer } = await import("../../open-sse/mcp-server/server.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { skillExecutor } = await import("../../src/lib/skills/executor.ts");
const { closeAuditDb } = await import("../../open-sse/mcp-server/audit.ts");
const coreDb = await import("../../src/lib/db/core.ts");

type McpResult = {
  content?: Array<{ type: string; text: string }>;
  isError?: boolean;
};

type RegisteredTool = {
  handler: (args: unknown, extra?: unknown) => Promise<McpResult>;
};

function getRegisteredHandler(server: unknown, toolName: string): RegisteredTool["handler"] {
  const registry = (server as { _registeredTools?: Record<string, RegisteredTool> })
    ._registeredTools;
  assert.ok(registry, "McpServer should expose _registeredTools");
  const tool = registry[toolName];
  assert.ok(tool, `${toolName} must be registered on the live MCP server`);
  return tool.handler;
}

// Stub `list` before `createMcpServer`: the dynamic `skill_<name>` tools are
// registered from `skillRegistry.list()` during construction, so stubbing after
// would leave the probe tool unregistered for a reason outside the rule tested.
const mutableRegistry = skillRegistry as unknown as {
  list: () => Array<{ name: string; description: string; enabled: boolean }>;
};
const originalList = mutableRegistry.list;
mutableRegistry.list = () => [{ name: "owner_probe", description: "owner probe", enabled: true }];

const server = createMcpServer();
const dynamicHandler = getRegisteredHandler(server, "skill_owner_probe");

let capturedOwner: unknown;
const mutableExecutor = skillExecutor as unknown as {
  execute: (...args: unknown[]) => Promise<unknown>;
};
const originalExecute = mutableExecutor.execute;
mutableExecutor.execute = async (
  _skillName: unknown,
  _input: unknown,
  context: unknown
): Promise<unknown> => {
  capturedOwner = (context as { apiKeyId?: unknown }).apiKeyId;
  return { output: { ok: true } };
};

test.after(() => {
  mutableRegistry.list = originalList;
  mutableExecutor.execute = originalExecute;
  closeAuditDb();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_OMNIROUTE_API_KEY === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = ORIGINAL_OMNIROUTE_API_KEY;
  if (ORIGINAL_ROUTER_API_KEY === undefined) delete process.env.ROUTER_API_KEY;
  else process.env.ROUTER_API_KEY = ORIGINAL_ROUTER_API_KEY;
});

async function ownerFor(extra: unknown): Promise<unknown> {
  capturedOwner = undefined;
  const result = await dynamicHandler({}, extra);
  assert.equal(
    result.isError,
    undefined,
    `handler must not error; got: ${result.content?.[0]?.text}`
  );
  return capturedOwner;
}

const EXECUTE_SCOPES = ["execute:skills"];

test("key A plus a foreign session id still runs as A", async () => {
  assert.equal(
    await ownerFor({
      authInfo: { clientId: "tenant-a", scopes: EXECUTE_SCOPES },
      sessionId: "victim",
    }),
    "tenant-a"
  );
});

test("no key plus a chosen session id falls back to mcp, not the session id", async () => {
  assert.equal(
    await ownerFor({ authInfo: { scopes: EXECUTE_SCOPES }, sessionId: "victim" }),
    "mcp"
  );
});

test("key B plus tenant A's session id runs as B", async () => {
  assert.equal(
    await ownerFor({
      authInfo: { clientId: "tenant-b", scopes: EXECUTE_SCOPES },
      sessionId: "tenant-a",
    }),
    "tenant-b"
  );
});
