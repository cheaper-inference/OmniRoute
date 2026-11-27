// Two enabled skills that map to the same MCP tool name must not abort the
// whole registration loop: a duplicate is skipped and later skills still get tools.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mcp-skill-dup-"));
const TEST_DATA_DIR = path.join(TEST_ROOT, "data");
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
process.env.DATA_DIR = TEST_DATA_DIR;

const { createMcpServer } = await import("../../open-sse/mcp-server/server.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const { closeAuditDb } = await import("../../open-sse/mcp-server/audit.ts");
const coreDb = await import("../../src/lib/db/core.ts");

const mutableRegistry = skillRegistry as unknown as {
  list: () => Array<{ name: string; description: string; enabled: boolean }>;
};
const originalList = mutableRegistry.list;
mutableRegistry.list = () => [
  { name: "dup.probe", description: "first", enabled: true },
  { name: "dup/probe", description: "second, collides", enabled: true },
  { name: "after_collision", description: "must still register", enabled: true },
];

const logged: string[] = [];
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  logged.push(args.map(String).join(" "));
};
const server = createMcpServer();
console.error = originalConsoleError;
const registered = Object.keys(
  (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools
);

test.after(() => {
  mutableRegistry.list = originalList;
  closeAuditDb();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_ROOT, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("a skill after a duplicate tool name is still registered", () => {
  assert.ok(
    registered.includes("skill_after_collision"),
    `skill_after_collision missing; registered: ${registered.filter((n) => n.startsWith("skill_")).join(", ")}`
  );
});

test("the first colliding skill keeps its tool", () => {
  assert.ok(registered.includes("skill_dup_probe"), "skill_dup_probe missing");
});

test("the duplicate is skipped with a log, not silently", () => {
  assert.ok(
    logged.some((line) => /dup_probe/.test(line) && /duplicate|already/i.test(line)),
    `no duplicate-skip log; got: ${logged.join(" | ")}`
  );
});
