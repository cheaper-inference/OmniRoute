import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { LATEST_PROTOCOL_VERSION } from "@modelcontextprotocol/sdk/types.js";
import { startBridgeTurn, BRIDGE_TOOL_NAME } from "../../open-sse/executors/grok-bot-bridge.ts";
import { GrokBotBridgeRegistry } from "../../open-sse/services/grokBotBridgeRegistry.ts";
import { handleGrokBridgeRequest } from "../../open-sse/services/grokBotBridgeProxy.ts";
import * as route from "../../src/app/grok-bridge/[nonce]/mcp/route.ts";

async function fixture() {
  const registry = new GrokBotBridgeRegistry();
  const turn = await startBridgeTurn({ registry, publicBaseUrl: "https://bridge.example.test" });
  const found = registry.lookup(turn.nonce);
  assert.equal(found.kind, "active");
  if (found.kind !== "active") assert.fail("turn registration failed");
  const localUrl = `http://127.0.0.1:${found.entry.port}/grok-bridge/${turn.nonce}/mcp`;
  const headers = { authorization: "Bearer " + turn.challenge };
  return { registry, turn, entry: found.entry, localUrl, headers };
}

async function waitUntil(predicate: () => boolean, message: string) {
  const deadline = Date.now() + 1500;
  while (!predicate() && Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  assert.ok(predicate(), message);
}

async function proxyGet(f: Awaited<ReturnType<typeof fixture>>, signal?: AbortSignal, timeoutMs = 1000) {
  return handleGrokBridgeRequest({
    request: new Request(f.turn.url, {
      method: "GET", headers: { ...f.headers, accept: "text/event-stream", "mcp-protocol-version": LATEST_PROTOCOL_VERSION }, signal,
    }),
    nonce: f.turn.nonce, upstreamPath: new URL(f.turn.url).pathname, registry: f.registry, timeoutMs,
  });
}

async function rpc(f: Awaited<ReturnType<typeof fixture>>, body: unknown) {
  return fetch(f.localUrl, {
    method: "POST", headers: { ...f.headers, "content-type": "application/json" },
    body: JSON.stringify(body), signal: AbortSignal.timeout(1500),
  });
}

describe("Grok Bot MCP transport", () => {
  it("answers initialize, notification, ping and tools/list on a real loopback listener", async () => {
    const f = await fixture();
    try {
      const response = await rpc(f, { jsonrpc: "2.0", id: 0, method: "initialize", params: { protocolVersion: LATEST_PROTOCOL_VERSION, capabilities: {}, clientInfo: { name: "wire-test", version: "1" } } });
      const message = await response.json();
      assert.equal(response.status, 200);
      assert.equal(message.id, 0);
      assert.equal(message.result?.protocolVersion, LATEST_PROTOCOL_VERSION);
      assert.deepEqual(message.result.capabilities, { tools: {} });
      assert.equal(message.result.serverInfo.name, "grok-bot-bridge");
      const notification = await rpc(f, { jsonrpc: "2.0", method: "notifications/initialized" });
      assert.equal(notification.status, 202);
      assert.equal(await notification.text(), "");
      assert.deepEqual(await (await rpc(f, { jsonrpc: "2.0", id: "ping", method: "ping" })).json(), { jsonrpc: "2.0", id: "ping", result: {} });
      const list = await (await rpc(f, { jsonrpc: "2.0", id: 2, method: "tools/list" })).json();
      assert.equal(list.result.tools[0].name, BRIDGE_TOOL_NAME);
      assert.throws(() => f.turn.call(f.turn.challenge), /was not called/);
    } finally { f.turn.close("cancel"); }
  });

  it("negotiates an unsupported version instead of claiming an arbitrary protocol", async () => {
    const f = await fixture();
    try {
      const response = await rpc(f, { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "9999-01-01", capabilities: {}, clientInfo: { name: "wire-test", version: "1" } } });
      assert.equal((await response.json()).result?.protocolVersion, LATEST_PROTOCOL_VERSION);
    } finally { f.turn.close("cancel"); }
  });

  it("GET opens a live event stream and closing the turn terminates it", async () => {
    const f = await fixture();
    try {
      const response = await fetch(f.localUrl, { headers: { ...f.headers, accept: "text/event-stream" }, signal: AbortSignal.timeout(1500) });
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/event-stream/);
      const reader = response.body!.getReader();
      const first = await reader.read();
      assert.equal(first.done, false);
      const frame = new TextDecoder().decode(first.value);
      assert.match(frame, new RegExp("^event: endpoint\ndata: /grok-bridge/" + f.turn.nonce + "/mcp\n\n"));
      f.turn.close("cancel");
      await reader.read().catch(() => ({ done: true }));
    } finally { f.turn.close("cancel"); }
  });

  it("local GET checks the challenge before opening a stream", async () => {
    const f = await fixture();
    try {
      for (const headers of [{}, { authorization: "Bearer wrong" }]) {
        const response = await fetch(f.localUrl, { headers, signal: AbortSignal.timeout(1000) });
        assert.equal(response.status, 400);
        await response.body?.cancel();
      }
    } finally { f.turn.close("cancel"); }
  });

  it("GET is forwarded without buffering and keeps its controller until cancel", async () => {
    const f = await fixture();
    try {
      const response = await proxyGet(f);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/event-stream/);
      assert.match(response.headers.get("cache-control") ?? "", /no-cache/);
      assert.equal(f.entry.slotsUsed, 1);
      assert.equal(f.entry.inflight.size, 1);
      const reader = response.body!.getReader();
      const first = await reader.read();
      assert.equal(first.done, false);
      assert.match(new TextDecoder().decode(first.value), new RegExp("^event: endpoint\ndata: /grok-bridge/" + f.turn.nonce + "/mcp\n\n"));
      await reader.cancel();
      await waitUntil(() => f.entry.inflight.size === 0, "cancel must release the in-flight controller");
      assert.equal(f.registry.lookup(f.turn.nonce).kind, "active", "closing a discovery stream must not close the tool turn");
    } finally { f.turn.close("cancel"); }
  });

  it("client abort still reaches upstream after the proxy has returned headers", async () => {
    const f = await fixture();
    const client = new AbortController();
    try {
      const response = await proxyGet(f, client.signal);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/event-stream/);
      const reader = response.body!.getReader();
      await reader.read();
      const pending = reader.read();
      client.abort();
      await pending.catch(() => ({ done: true }));
      await waitUntil(() => f.entry.inflight.size === 0, "client abort must release the stream controller");
      assert.equal(f.registry.lookup(f.turn.nonce).kind, "active");
    } finally { f.turn.close("cancel"); }
  });

  it("a streaming deadline terminates an unread body without a reader", async () => {
    const f = await fixture();
    try {
      const response = await proxyGet(f, undefined, 80);
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/event-stream/);
      await waitUntil(() => f.entry.inflight.size === 0, "unread stream must not retain an in-flight controller past its deadline");
      await response.body?.cancel().catch(() => {});
    } finally { f.turn.close("cancel"); }
  });

  it("the actual route GET handler reaches the registered listener", async () => {
    const registryModule = await import("../../open-sse/services/grokBotBridgeRegistry.ts");
    const registry = registryModule.getGrokBotBridgeRegistry();
    const turn = await startBridgeTurn({ registry, publicBaseUrl: "https://bridge.example.test" });
    try {
      const response = await route.GET(new Request(turn.url, { headers: { authorization: "Bearer " + turn.challenge, accept: "text/event-stream" } }), { params: Promise.resolve({ nonce: turn.nonce }) });
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type") ?? "", /^text\/event-stream/);
      await response.body?.cancel();
    } finally { turn.close("cancel"); }
  });

  it("a real SDK client initializes and calls the tool through the public proxy", async () => {
    const f = await fixture();
    const methods: string[] = [];
    const client = new Client({ name: "bridge-client", version: "1" });
    const transport = new StreamableHTTPClientTransport(new URL(f.turn.url), {
      requestInit: { headers: f.headers },
      fetch: async (url, init) => {
        methods.push(init?.method ?? "GET");
        const request = new Request(url, init);
        return handleGrokBridgeRequest({ request, nonce: f.turn.nonce, upstreamPath: new URL(request.url).pathname, registry: f.registry, timeoutMs: 1000 });
      },
    });
    try {
      await client.connect(transport, { timeout: 1500 });
      assert.equal((await client.listTools({}, { timeout: 1500 })).tools[0].name, BRIDGE_TOOL_NAME);
      const result = await client.callTool({ name: BRIDGE_TOOL_NAME, arguments: {} }, undefined, { timeout: 1500 });
      assert.deepEqual(result.content, [{ type: "text", text: "ok" }]);
      assert.equal(f.turn.call(f.turn.challenge), "ok");
      assert.ok(methods.includes("GET"));
      assert.ok(f.entry.slotsUsed <= 8, "the observed handshake and one tool call fit the existing admission budget");
    } finally { await client.close(); f.turn.close("cancel"); }
  });
});
