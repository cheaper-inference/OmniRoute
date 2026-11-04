/**
 * v2 HTTP route — the sidecar must be reachable over its own HTTP route with the
 * SAME auth classification as v1, and must be stateless (2026-07-28 has no
 * handshake). These tests drive the real route handler + the real v2 server over
 * a real WebStandardStreamableHTTPServerTransport, no HTTP socket needed.
 *
 * Diego's constraint #4: "its own route, loopback/auth classification the same as
 * v1's, and tool calls audited to mcp_tool_audit like v1."
 *
 * OMNIROUTE_MCP_V2 is read at module load (a requiresRestart flag), so in a shared
 * worker the value is fixed once any file imports the v2 server. The route's gating
 * CONTRACT is therefore tested by injecting the flag (vi.hoisted + mock of the v2
 * server's isMcpV2Enabled). The REAL module-load read is proven separately, in a
 * child process, by v2-feature-flag.test.ts. The env is set enabled at file scope
 * so the real transport/server path below executes end-to-end.
 */

import { describe, it, expect, afterAll, beforeEach, vi } from "vitest";

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

process.env.OMNIROUTE_MCP_V2 = "true";

const { flag } = vi.hoisted(() => ({ flag: { enabled: true } }));

vi.mock("@omniroute/open-sse/mcp-server/v2/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../open-sse/mcp-server/v2/server.ts")>();
  return { ...actual, isMcpV2Enabled: () => flag.enabled };
});

const settingsState = { mcpEnabled: true };
vi.mock("@/lib/db/settings", () => ({
  getCachedSettings: vi.fn(async () => settingsState),
}));

const authResult: { value: Response | null } = { value: null };
vi.mock("@/lib/api/requireManagementAuth", () => ({
  requireManagementAuth: vi.fn(async () => authResult.value),
}));

vi.mock("../../../open-sse/mcp-server/audit.ts", () => ({
  logToolCall: vi.fn(async () => undefined),
}));

vi.mock("../../../open-sse/mcp-server/internalFetch.ts", () => ({
  omniRouteFetch: vi.fn(async () => ({ uptime: "1h", version: "test" })),
}));

const { POST } = await import("../../../src/app/api/mcp/v2/route.ts");

afterAll(() => resetDbInstance());

beforeEach(() => {
  flag.enabled = true;
  settingsState.mcpEnabled = true;
  authResult.value = null;
});

function post(body: {
  method: string;
  params?: Record<string, unknown>;
  [key: string]: unknown;
}): Request {
  return new Request("http://localhost/api/mcp/v2", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      "MCP-Protocol-Version": "2026-07-28",
      "Mcp-Method": body.method,
      ...(typeof body.params?.name === "string"
        ? { "Mcp-Name": body.params.name, "Mcp-Param-Name": body.params.name }
        : {}),
    },
    body: JSON.stringify({
      ...body,
      params: {
        ...body.params,
        _meta: {
          "io.modelcontextprotocol/protocolVersion": "2026-07-28",
          "io.modelcontextprotocol/clientInfo": { name: "route-test", version: "1" },
          "io.modelcontextprotocol/clientCapabilities": {},
        },
      },
    }),
  });
}

describe("v2 HTTP route — gating", () => {
  it("answers 503 when the v2 flag is off (off by default)", async () => {
    flag.enabled = false;
    const res = await POST(post({ jsonrpc: "2.0", id: 1, method: "tools/list" }));
    expect(res.status).toBe(503);
    expect(JSON.stringify(await res.json())).toMatch(/v2 sidecar is disabled/i);
  });

  it("answers 503 when MCP itself is disabled", async () => {
    settingsState.mcpEnabled = false;
    const res = await POST(post({ jsonrpc: "2.0", id: 1, method: "tools/list" }));
    expect(res.status).toBe(503);
  });

  it("returns the auth error (does not serve) when requireManagementAuth refuses", async () => {
    authResult.value = new Response(JSON.stringify({ error: "nope" }), { status: 403 });
    const res = await POST(post({ jsonrpc: "2.0", id: 1, method: "tools/list" }));
    expect(res.status).toBe(403);
  });
});

describe("v2 HTTP route — stateless protocol (no handshake)", () => {
  it("serves server/discover with no initialize handshake", async () => {
    const res = await POST(post({ jsonrpc: "2.0", id: 1, method: "server/discover" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result?.supportedVersions).toContain("2026-07-28");
    expect(body.result.capabilities.tools).toEqual({ listChanged: false });
  }, 30_000);

  it("serves tools/list with no handshake and no Mcp-Session-Id", async () => {
    const res = await POST(post({ jsonrpc: "2.0", id: 2, method: "tools/list" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("mcp-session-id")).toBeNull();
    const body = await res.json();
    expect(Array.isArray(body.result?.tools)).toBe(true);
    expect(body.result.tools.length).toBeGreaterThan(0);
  }, 30_000);

  it("serves tools/call with no handshake and audits the call", async () => {
    const res = await POST(
      post({
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "omniroute_get_health", arguments: {} },
      })
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result?.content?.[0]?.text).toBeTruthy();
    const audit = await import("../../../open-sse/mcp-server/audit.ts");
    expect(audit.logToolCall).toHaveBeenCalled();
  }, 30_000);
});
