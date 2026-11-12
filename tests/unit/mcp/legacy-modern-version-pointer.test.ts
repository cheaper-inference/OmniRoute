/**
 * The 2025-era transports (POST /api/mcp/stream, /api/mcp/sse) must not answer a
 * modern `MCP-Protocol-Version` with the SDK's bare version list. A client asking
 * for 2026-07-28 is on the wrong endpoint, so it gets a pointer at /api/mcp/v2.
 */

import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../../open-sse/mcp-server/httpTransport.ts");

const MODERN = "2026-07-28";

function post(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

test("modern version on the legacy streamable route points at /api/mcp/v2", async () => {
  const response = await mod.handleMcpStreamableHTTP(
    post({ jsonrpc: "2.0", id: 7, method: "tools/list" }, { "mcp-protocol-version": MODERN })
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.jsonrpc, "2.0");
  assert.equal(body.id, 7, "the request id must be echoed so clients can match the error");
  assert.match(body.error.message, /\/api\/mcp\/v2/);
  assert.match(body.error.message, /OMNIROUTE_MCP_V2/);
  assert.doesNotMatch(body.error.message, /Unsupported protocol version/);
  assert.equal(body.error.data.modernEndpoint, "/api/mcp/v2");
  assert.equal(body.error.data.requestedProtocolVersion, MODERN);
});

test("modern version on the legacy SSE route points at /api/mcp/v2", async () => {
  const response = await mod.handleMcpSSE(
    new Request("http://localhost/api/mcp/sse", {
      headers: { "mcp-protocol-version": MODERN },
    })
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.id, null, "GET has no JSON-RPC id to echo");
  assert.match(body.error.message, /\/api\/mcp\/v2/);
});

test("an id-less POST still produces a well-formed error", async () => {
  const response = await mod.handleMcpStreamableHTTP(
    post(
      { jsonrpc: "2.0", method: "notifications/initialized" },
      { "mcp-protocol-version": MODERN }
    )
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.id, null);
  assert.equal(body.error.code, -32000);
});

test("the first id of a batch is echoed", async () => {
  const response = await mod.handleMcpStreamableHTTP(
    post(
      [
        { jsonrpc: "2.0", id: "a", method: "tools/list" },
        { jsonrpc: "2.0", id: "b", method: "tools/list" },
      ],
      { "mcp-protocol-version": MODERN }
    )
  );

  const body = await response.json();
  assert.equal(body.id, "a");
});

test("legacy revisions and absent headers fall through to the transport", async () => {
  // null means "not ours" — the transport keeps its existing behaviour.
  assert.equal(
    await mod.modernProtocolPointer(new Request("http://localhost/api/mcp/stream")),
    null
  );
  assert.equal(
    await mod.modernProtocolPointer(
      new Request("http://localhost/api/mcp/stream", {
        headers: { "mcp-protocol-version": "2025-11-25" },
      })
    ),
    null
  );
  assert.equal(
    await mod.modernProtocolPointer(
      new Request("http://localhost/api/mcp/stream", {
        headers: { "mcp-protocol-version": "2024-10-07" },
      })
    ),
    null
  );
});

test("malformed version values are left to the SDK's own validation", async () => {
  assert.equal(
    await mod.modernProtocolPointer(
      new Request("http://localhost/api/mcp/stream", {
        headers: { "mcp-protocol-version": "garbage" },
      })
    ),
    null
  );
  assert.equal(
    await mod.modernProtocolPointer(
      new Request("http://localhost/api/mcp/stream", {
        headers: { "mcp-protocol-version": "2026-07" },
      })
    ),
    null
  );
});

test("a later modern revision is still routed to v2", async () => {
  const response = await mod.modernProtocolPointer(
    new Request("http://localhost/api/mcp/stream", {
      headers: { "mcp-protocol-version": "2026-09-01" },
    })
  );
  assert.equal(response?.status, 400);
  assert.equal((await response?.json()).error.data.modernEndpoint, "/api/mcp/v2");
});
