/**
 * SMOKE: every registered v2 tool must survive a real call.
 *
 * Why this file exists: the v2 sidecar shipped 49 passing tests while ALL 8
 * tools were broken at runtime. Declaring `outputSchema` without emitting
 * `structuredContent` makes the SDK reject every call with:
 *
 *   -32602 Output validation error: Tool <name> has an output schema but no
 *   structured content was provided
 *
 * Every pre-existing v2 test asserted on a HELPER (extractMeta, withCacheHints,
 * buildInputRequiredResult, routeByHeaders, handleListTools). Not one invoked a
 * registered tool, so the suite was green against a server no client could use.
 * A test that asserts the spec's vocabulary is not a test that asserts the wire.
 *
 * These call through a real MCP client over InMemoryTransport and assert only on
 * observable outcomes: the call resolves, and it is not an SDK-level error.
 * Network is mocked; the tool-call path is not.
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

vi.mock("../../../open-sse/mcp-server/internalFetch.ts", () => ({ omniRouteFetch: vi.fn() }));

// Mock audit logging so tool calls do not write to the database
vi.mock("../../../open-sse/mcp-server/audit.ts", () => ({
  logToolCall: vi.fn().mockResolvedValue(undefined),
}));

const { createMcpServerV2 } = await import("../../../open-sse/mcp-server/v2/server.js");
const { omniRouteFetch } = await import("../../../open-sse/mcp-server/internalFetch.js");

const mockedFetch = vi.mocked(omniRouteFetch);

afterAll(() => resetDbInstance());

/** Minimal args that satisfy each tool's input schema. */
const ARGS: Record<string, Record<string, unknown>> = {
  omniroute_get_health: {},
  omniroute_list_combos: {},
  omniroute_get_combo_metrics: {},
  omniroute_switch_combo: { comboId: "c1" },
  omniroute_create_combo: { name: "probe", models: [{ provider: "openai", model: "gpt-4o-mini" }] },
  omniroute_check_quota: {},
  omniroute_route_request: { prompt: "hello" },
  omniroute_cost_report: {},
};

async function connect() {
  const v2 = createMcpServerV2();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await v2.server.connect(serverTransport);
  const client = new Client({ name: "smoke-test-client", version: "1.0.0" });
  await client.connect(clientTransport);
  return client;
}

/** Extracts the response text, whether the call resolved or was rejected. */
function resultText(raw: unknown): string {
  return (raw as { content?: { type: string; text: string }[] })?.content?.[0]?.text ?? "";
}

describe("v2 smoke — every registered tool survives a real call", () => {
  beforeEach(() => {
    mockedFetch.mockReset();
    // The stub must return SHAPE-VALID payloads, not `{}`. Each handler maps
    // response fields straight into its result, and the outputSchemas are strict
    // with required keys — so an empty stub makes the SDK reject the result
    // with "expected object, received undefined at <field>", which would fail
    // this smoke test for a reason unrelated to the call path it exists to test.
    // This tests the CALL PATH (no -32602 structural rejection), not handler output.
    mockedFetch.mockImplementation((async (path: string) => {
      if (path.includes("combos") && path.includes("metrics")) {
        return { metrics: {} };
      }
      if (path.includes("combos")) {
        return { combos: [], metrics: {} };
      }
      if (path.includes("quota")) {
        return { providers: [] };
      }
      if (path.includes("route") || path.includes("completion")) {
        return { model: "probe-model", provider: "probe-provider", content: "ok" };
      }
      if (path.includes("cost") || path.includes("usage")) {
        return { budget: {}, total: 0, breakdown: [] };
      }
      return {};
    }) as never);
  });

  it("registers 8 tools", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools).toHaveLength(8);
    await client.close();
  });

  for (const [name, args] of Object.entries(ARGS)) {
    it(`${name} never hits a structural SDK rejection`, async () => {
      const client = await connect();
      // Structure matters here. client.callTool THROWS on an SDK rejection, and
      // an expect() failure also throws — so putting the assertions inside a
      // try whose catch handles rejections would swallow the assertion failure
      // and downgrade it to a warning. That is exactly the defect this file
      // exists to catch, silently disarmed by its own harness.
      // So: capture the call outcome (never assert inside try), THEN assert.
      let outcome: { kind: "ok"; result: unknown } | { kind: "rejected"; message: string };
      try {
        outcome = { kind: "ok", result: await client.callTool({ name, arguments: args }) };
      } catch (err) {
        outcome = { kind: "rejected", message: String(err) };
      }

      const text = outcome.kind === "rejected" ? outcome.message : resultText(outcome.result);

      // 1. Declared outputSchema but no structured content — the shipped bug.
      expect(text, `tool ${name}: no structuredContent despite declaring outputSchema`).not.toMatch(
        /has an output schema but no structured content was provided/
      );
      // 2. Envelope leaking into structured data — resultType is not tool data.
      expect(text, `tool ${name}: envelope field leaked into structuredContent`).not.toMatch(
        /must NOT have additional properties/
      );
      // A payload/schema mismatch (e.g. "expected object, received undefined at
      // budget") is a DIFFERENT defect: the handler's output does not satisfy its
      // own declared outputSchema. Real, but stub-shape dependent and out of
      // scope for this file. Surface it loudly instead of asserting or hiding it.
      if (/MCP error -32602/.test(text)) {
        console.warn(`[v2-smoke] ${name}: schema mismatch — ${text.slice(0, 200)}`);
      }
      await client.close();
    });
  }

  it("at least one tool returns structuredContent on a clean path", async () => {
    const client = await connect();
    const result = (await client.callTool({
      name: "omniroute_get_health",
      arguments: {},
    })) as { structuredContent?: unknown; isError?: boolean };
    // The regression this guards: outputSchema declared with no structuredContent
    // at all. get_health is the tool whose schema the stub satisfies, so this
    // asserts the real contract on a path that is not stub-limited.
    expect(result.structuredContent).toBeDefined();
    expect(result.structuredContent).not.toHaveProperty("resultType");
    await client.close();
  });

  // A GENERIC per-tool "no -32602" assertion is too weak to catch a missing
  // required field: a tool can reject for one field's absence and still pass an
  // assertion that only bans two specific messages. Verified by mutation —
  // deleting `budget: toBudget(raw.budget)` from handleCostReport left all 10
  // smoke tests green. So this asserts the STRONG property directly: the tool
  // must return, not reject, when the endpoint returns a shape-valid payload.
  it("cost_report returns rather than rejecting when the payload is well-formed", async () => {
    mockedFetch.mockResolvedValue({
      totalCost: 1.5,
      requestCount: 2,
      tokenCount: { prompt: 10, completion: 20 },
      byProvider: [{ name: "openai", cost: 1, requests: 1 }],
      byModel: [{ model: "gpt-4o-mini", cost: 1, requests: 1 }],
      budget: { limit: 10, remaining: 8.5 },
    } as never);

    const client = await connect();
    const result = (await client.callTool({
      name: "omniroute_cost_report",
      arguments: {},
    })) as { structuredContent?: { budget?: unknown }; isError?: boolean };

    expect(result.isError, `cost_report rejected: ${resultText(result)}`).not.toBe(true);
    expect(result.structuredContent, "cost_report returned no structuredContent").toBeDefined();
    // The specific regression: costReportOutput requires `budget`, and the
    // handler omitted it, so EVERY call was rejected with -32602.
    expect(result.structuredContent?.budget, "cost_report omitted required `budget`").toEqual({
      limit: 10,
      remaining: 8.5,
    });
    await client.close();
  });

  it("cost_report still reports a null budget when the endpoint omits one", async () => {
    // The schema allows null for both fields, so "no budget configured" must
    // serialise as nulls rather than dropping the key (dropping it is what
    // broke output validation).
    mockedFetch.mockResolvedValue({ totalCost: 0, requestCount: 0 } as never);
    const client = await connect();
    const result = (await client.callTool({
      name: "omniroute_cost_report",
      arguments: {},
    })) as { structuredContent?: { budget?: unknown }; isError?: boolean };
    expect(result.isError, `cost_report rejected: ${resultText(result)}`).not.toBe(true);
    expect(result.structuredContent?.budget).toEqual({ limit: null, remaining: null });
    await client.close();
  });

  // The endpoint this tool calls must be one that EXISTS. v1's cost_report hits
  // /api/usage/analytics; the v2 handler was written against /api/costs/report,
  // which has no route in src/app/api/. A mocked network cannot see that — the
  // stub answers whatever path is asked — so this asserts the PATH itself.
  it("cost_report calls a real endpoint, not /api/costs/report", async () => {
    mockedFetch.mockResolvedValue({ summary: {}, byModel: [], byProvider: [] } as never);
    const client = await connect();
    await client.callTool({ name: "omniroute_cost_report", arguments: {} });
    const calledPath = String(mockedFetch.mock.calls[0]?.[0] ?? "");
    expect(calledPath, `cost_report called a non-existent endpoint: ${calledPath}`).not.toContain(
      "/api/costs/report"
    );
    expect(calledPath).toContain("/api/usage/analytics");
    await client.close();
  });

  // The real /api/usage/analytics nests totals under `summary` (see
  // analyticsShape.ts:4-10). The handler read them from the TOP LEVEL, so every
  // number it reported was zero even when the endpoint answered correctly.
  it("cost_report reads totals from the real analytics `summary` shape", async () => {
    mockedFetch.mockResolvedValue({
      summary: {
        totalRequests: 7,
        promptTokens: 100,
        completionTokens: 50,
        totalCost: 3.25,
      },
      byModel: [{ model: "gpt-4o-mini", cost: 3.25, requests: 7 }],
      byProvider: [{ provider: "OpenAI", cost: 3.25, requests: 7 }],
    } as never);

    const client = await connect();
    const result = (await client.callTool({
      name: "omniroute_cost_report",
      arguments: {},
    })) as {
      structuredContent?: {
        totalCost?: number;
        requestCount?: number;
        tokenCount?: { prompt?: number; completion?: number };
        byProvider?: { name?: string }[];
      };
      isError?: boolean;
    };

    expect(result.isError, `cost_report rejected: ${resultText(result)}`).not.toBe(true);
    expect(result.structuredContent?.totalCost, "totalCost read from wrong level").toBe(3.25);
    expect(result.structuredContent?.requestCount).toBe(7);
    expect(result.structuredContent?.tokenCount?.prompt).toBe(100);
    expect(result.structuredContent?.tokenCount?.completion).toBe(50);
    // byProvider rows carry `provider`, but the output schema requires `name`.
    expect(result.structuredContent?.byProvider?.[0]?.name).toBe("OpenAI");
    await client.close();
  });
});
