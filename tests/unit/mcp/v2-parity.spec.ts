/**
 * RED tests for v2 sidecar parity gaps found against the v1 reference.
 *
 * Every assertion compares v2 against the SAME field in v1
 * (open-sse/mcp-server/server.ts), because v1 is the production-tested
 * reference. A v2 handler that silently drops a field v1 returns is a
 * spec-shaped bug: the v2 client sees a shorter object with no way to know
 * the data existed.
 *
 * Driven through a real MCP client over InMemoryTransport (same seam as
 * v2-scope-enforcement.test.ts), so a green run means the actually-registered
 * tool returns the right shape — not that a test hook does.
 */
import { describe, it, expect, vi, beforeEach, afterAll } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

// Run before application imports: real MCP modules must never discover the
// developer's data/plugins. Reuse the repository's trust, DNS and browser guards.
await vi.hoisted(async () => {
  delete process.env.DATA_DIR;
  delete process.env.OMNIROUTE_PLUGINS_DIR;
  process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  await import("../../_setup/isolateDataDir.ts");
  const { mkdirSync } = await import("node:fs");
  mkdirSync(process.env.OMNIROUTE_PLUGINS_DIR!, { recursive: true });
});
const { resetDbInstance } = await import("../../../src/lib/db/core.ts");

// Intercept the network layer before v2 imports it (v2 pulls omniRouteFetch
// from ../../../open-sse/mcp-server/internalFetch.ts as a value import, so the module specifier must be mocked).
vi.mock("../../../open-sse/mcp-server/internalFetch.ts", () => ({ omniRouteFetch: vi.fn() }));

// Mock audit logging so tool calls do not write to the database
vi.mock("../../../open-sse/mcp-server/audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
}));

const { createMcpServerV2 } = await import("../../../open-sse/mcp-server/v2/server.js");
const { omniRouteFetch } = await import("../../../open-sse/mcp-server/internalFetch.js");

const mockedFetch = vi.mocked(omniRouteFetch);

afterAll(() => resetDbInstance());

async function connect() {
  const v2 = createMcpServerV2();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await v2.server.connect(serverTransport);
  const client = new Client({ name: "parity-test-client", version: "1.0.0" });
  await client.connect(clientTransport);
  return client;
}

async function callListCombos(args: Record<string, unknown> = {}) {
  const client = await connect();
  const result = (await client.callTool({
    name: "omniroute_list_combos",
    arguments: args,
  })) as { content?: Array<{ type: string; text: string }> };
  const text = result.content?.[0]?.text ?? "{}";
  // Surface the raw body on parse failure — an "MCP error ..." string here
  // means the SDK rejected the call, and the message is the only clue.
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`list_combos returned non-JSON: ${text}`);
  }
}

describe("v2 list_combos — field parity with v1", () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it("returns models for each combo (v1 server.ts:414 sets models)", async () => {
    mockedFetch.mockResolvedValueOnce({
      combos: [
        {
          id: "c1",
          name: "fast",
          strategy: "priority",
          enabled: true,
          models: [{ provider: "openai", model: "gpt-4o-mini" }],
        },
      ],
    } as never);

    const result = await callListCombos();
    // v1's normalizeComboModels (server.ts:185) returns provider/model/priority,
    // with `model` as the COMBINED "provider/model" string — not the raw slug.
    // Asserting the bare slug here would encode a different normalizer's shape.
    expect(result.combos[0].models).toEqual([
      { provider: "openai", model: "openai/gpt-4o-mini", priority: 1 },
    ]);
  });

  it("falls back to combo.data.models when combo.models is absent", async () => {
    // v1 server.ts:410 — combo.models wins when non-empty, else comboData.models.
    mockedFetch.mockResolvedValueOnce({
      combos: [
        {
          id: "c2",
          name: "nested",
          data: { models: [{ provider: "anthropic", model: "claude-sonnet-4" }] },
        },
      ],
    } as never);

    const result = await callListCombos();
    expect(result.combos[0].models).toEqual([
      { provider: "anthropic", model: "anthropic/claude-sonnet-4", priority: 1 },
    ]);
  });

  it("returns models: [] rather than dropping the key when a combo has none", async () => {
    mockedFetch.mockResolvedValueOnce({ combos: [{ id: "c3", name: "empty" }] } as never);

    const result = await callListCombos();
    // The key must EXIST. Omitting it makes the field optional-by-accident,
    // which is exactly the silent drop this file exists to catch.
    expect(result.combos[0]).toHaveProperty("models");
    expect(result.combos[0].models).toEqual([]);
  });
});

describe("v2 tools/call over a real client — the seam the 49 helper tests missed", () => {
  beforeEach(() => {
    mockedFetch.mockReset();
    mockedFetch.mockResolvedValue({ health: { status: "ok" } } as never);
  });

  it("a registered tool returns content WITHOUT tripping the -32602 output-schema guard", async () => {
    // The original suite tested extractMeta/withCacheHints/routeByHeaders and
    // never called a registered tool, so all 8 tools shipped broken (every call
    // rejected with "has an output schema but no structured content"). This
    // asserts the call REACHES a handler and returns.
    const client = await connect();
    const result = (await client.callTool({
      name: "omniroute_list_combos",
      arguments: {},
    })) as { isError?: boolean; content?: Array<{ type: string; text: string }> };

    const text = result.content?.[0]?.text ?? "";
    expect(text).not.toContain("-32602");
    expect(text).not.toContain("MCP error");
    expect(result.isError).not.toBe(true);
  });

  it("structuredContent is present on a schema-bearing result", async () => {
    const client = await connect();
    const result = (await client.callTool({
      name: "omniroute_list_combos",
      arguments: {},
    })) as { structuredContent?: Record<string, unknown> };
    expect(result.structuredContent).toBeDefined();
  });
});
