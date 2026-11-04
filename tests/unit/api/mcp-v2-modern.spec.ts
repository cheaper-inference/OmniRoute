import { describe, it, expect, vi, beforeEach } from "vitest";
import { Client as LegacyClient } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport as LegacyTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import {
  Client,
  StreamableHTTPClientTransport,
  specTypeSchemas,
} from "@modelcontextprotocol/client";

process.env.OMNIROUTE_MCP_V2 = "true";
process.env.OMNIROUTE_MCP_SCOPES = "*";
vi.mock("../../../open-sse/mcp-server/internalFetch.ts", () => ({
  omniRouteFetch: vi.fn(async () => ({ uptime: "1h", version: "test" })),
}));
vi.mock("../../../open-sse/mcp-server/audit.ts", () => ({ logToolCall: vi.fn() }));
vi.mock("../../../open-sse/mcp-server/httpAuthContext.ts", () => ({
  resolveMcpCallerAuthInfo: vi.fn(async (request: Request) => {
    const principal = request.headers.get("authorization");
    if (!principal) return undefined;
    return {
      token: "synthetic",
      clientId: principal,
      scopes: principal === "Bearer reader" ? ["read:health"] : [],
    };
  }),
  hasMcpHttpAuthContext: () => false,
  getMcpHttpAuthHeadersForInternalFetch: () => ({}),
  withMcpHttpAuthContext: async (_request: Request, callback: () => Promise<Response>) =>
    callback(),
}));
vi.mock("../../../src/shared/utils/featureFlags.ts", () => ({
  isMcpScopeEnforcementEnabled: () => true,
}));
const { handleMcpV2Http } = await import("../../../open-sse/mcp-server/v2/server.ts");
const { omniRouteFetch } = await import("../../../open-sse/mcp-server/internalFetch.ts");

function request(method: string, params: Record<string, unknown> = {}, principal?: string) {
  return new Request("http://localhost/api/mcp/v2", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2026-07-28",
      "Mcp-Method": method,
      ...(typeof params.name === "string"
        ? { "Mcp-Name": params.name, "Mcp-Param-Name": params.name }
        : {}),
      ...(principal ? { authorization: `Bearer ${principal}` } : {}),
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params: {
        ...params,
        _meta: {
          "io.modelcontextprotocol/protocolVersion": "2026-07-28",
          "io.modelcontextprotocol/clientInfo": { name: "compat-probe", version: "1" },
          "io.modelcontextprotocol/clientCapabilities": {},
          scopes: ["*"],
          auth: { scopes: ["*"] },
        },
      },
    }),
  });
}
beforeEach(() => vi.clearAllMocks());
describe("MCP 2026 real wire compatibility", () => {
  it("accepts the 2026 header and returns discovery accepted by the official schema", async () => {
    const response = await handleMcpV2Http(request("server/discover"));
    expect(response.status, await response.clone().text()).toBe(200);
    const body = await response.json();
    expect(body.result.supportedVersions).toContain("2026-07-28");
    expect(specTypeSchemas.DiscoverResult["~standard"].validate(body.result)).not.toHaveProperty(
      "issues"
    );
    expect(body.result.capabilities).toEqual({ tools: { listChanged: false } });
    expect(body.result.cacheScope).toBe("private");
  });
  it("connects a modern-only official client, lists and calls without a legacy fallback", async () => {
    const client = new Client(
      { name: "modern-probe", version: "1" },
      {
        versionNegotiation: { mode: { pin: "2026-07-28" } },
      }
    );
    const transport = new StreamableHTTPClientTransport(new URL("http://localhost/api/mcp/v2"), {
      fetch: (url, init) => handleMcpV2Http(new Request(url, init)),
      requestInit: { headers: { authorization: "Bearer reader" } },
    });
    try {
      await client.connect(transport);
      expect(client.getProtocolEra()).toBe("modern");
      expect((await client.listTools()).tools).toHaveLength(8);
      const result = await client.callTool({ name: "omniroute_get_health", arguments: {} });
      expect(result.isError).not.toBe(true);
      expect(result.structuredContent).toMatchObject({ uptime: "1h" });
    } finally {
      await client.close();
    }
  });
  it("serves a 2025 client initialize, list and call sequence on the sidecar", async () => {
    const client = new LegacyClient({ name: "legacy-probe", version: "1" });
    const transport = new LegacyTransport(new URL("http://localhost/api/mcp/v2"), {
      fetch: (url, init) => handleMcpV2Http(new Request(url, init)),
      requestInit: { headers: { authorization: "Bearer reader" } },
    });
    try {
      await client.connect(transport);
      expect((await client.listTools()).tools).toHaveLength(8);
      expect(
        (await client.callTool({ name: "omniroute_get_health", arguments: {} })).isError
      ).not.toBe(true);
    } finally {
      await client.close();
    }
  });
  it("sanitizes an upstream tool error before returning it", async () => {
    vi.mocked(omniRouteFetch).mockRejectedValueOnce(
      new Error(
        "upstream failed Authorization: Bearer sk-proj-abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\n    at request (/private/upstream/internal.ts:10:2)"
      )
    );
    const response = await handleMcpV2Http(
      request("tools/call", {
        name: "omniroute_list_combos",
        arguments: {},
      })
    );
    const body = await response.json();
    expect(body.result.isError).toBe(true);
    const text = body.result.content[0].text;
    expect(text).toContain("upstream failed");
    expect(text).not.toContain("sk-proj-");
    expect(text).not.toContain("/private/upstream");
    expect(text).not.toContain("at request");
  });
  it("keeps tool catalog caching private", async () => {
    const response = await handleMcpV2Http(request("tools/list"));
    const body = await response.json();
    expect(body.result.tools).toHaveLength(8);
    expect(body.result.cacheScope).toBe("private");
    expect(body.result.ttlMs).toBe(30000);
  });
  it("isolates concurrent principals and cannot self-grant or inherit env scopes", async () => {
    const params = { name: "omniroute_get_health", arguments: {} };
    const responses = await Promise.all([
      handleMcpV2Http(request("tools/call", params, "reader")),
      handleMcpV2Http(request("tools/call", params, "empty")),
    ]);
    const [allowed, denied] = await Promise.all(responses.map((response) => response.json()));
    expect(allowed.result.isError).not.toBe(true);
    expect(denied.result.isError).toBe(true);
    expect(denied.result.content[0].text).toMatch(/Insufficient MCP scopes/);
    expect(denied.result.content[0].text).not.toMatch(/Bearer|Caller=|source=/);
    expect(omniRouteFetch).toHaveBeenCalledTimes(3);
  });
});
