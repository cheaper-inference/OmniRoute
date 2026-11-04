/**
 * Self-built SSE responses that bypass the central response-header path must
 * still tell buffering reverse proxies (nginx X-Accel-Buffering, and the
 * equivalent for other accelerators) not to sit on the stream. The central
 * path (chatCore/responseHeaders.ts) and the stream-error path already set
 * `X-Accel-Buffering: no`; these three bypass constructors did not:
 * the early-keepalive slow-path response (the one the client actually
 * receives while the real turn is prefilling), the synthetic bypass stream,
 * and the MCP SSE transport wrapper.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");

const { protectMcpSseResponse } = await import("../../open-sse/mcp-server/httpTransport.ts");

function post() {
  return new Request("http://localhost/mcp", { method: "POST" });
}

test("1. protectMcpSseResponse stamps X-Accel-Buffering: no on SSE responses", () => {
  const sse = new Response("event: message\n", {
    headers: { "content-type": "text/event-stream" },
  });
  const protectedResponse = protectMcpSseResponse(post(), sse);
  assert.equal(protectedResponse.headers.get("x-accel-buffering"), "no");
  assert.match(protectedResponse.headers.get("cache-control") ?? "", /no-transform/);
});

test("2. protectMcpSseResponse leaves non-SSE responses untouched", () => {
  const json = new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
  const untouched = protectMcpSseResponse(post(), json);
  assert.equal(untouched.headers.get("x-accel-buffering"), null);
  assert.equal(untouched.headers.get("cache-control"), null);
});

test("3. the early-keepalive and bypass-stream constructors carry the header", () => {
  const keepalive = fs.readFileSync(
    path.join(ROOT, "open-sse/utils/earlyStreamKeepalive.ts"),
    "utf-8"
  );
  assert.ok(
    keepalive.includes('"X-Accel-Buffering": "no"'),
    "earlyStreamKeepalive's self-built SSE response must set X-Accel-Buffering: no"
  );
  const bypass = fs.readFileSync(
    path.join(ROOT, "open-sse/utils/bypassResponse.ts"),
    "utf-8"
  );
  assert.ok(
    bypass.includes('"X-Accel-Buffering": "no"'),
    "bypassResponse's synthetic SSE response must set X-Accel-Buffering: no"
  );
});

test("4. the semantic-cache SSE hit carries the header; JSON hits stay clean", () => {
  const semanticCache = fs.readFileSync(
    path.join(ROOT, "open-sse/handlers/chatCore/semanticCache.ts"),
    "utf-8"
  );
  assert.match(
    semanticCache,
    /if \(cachedSse\) \{\s*\n\s*headers\["X-Accel-Buffering"\] = "no";/,
    "the X-Accel-Buffering header must be set only for cachedSse responses"
  );
});
