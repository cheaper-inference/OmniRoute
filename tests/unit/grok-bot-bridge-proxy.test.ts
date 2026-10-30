import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import type { AddressInfo } from "node:net";

const {
  GrokBotBridgeRegistry,
  generateBridgeNonce,
  BRIDGE_ABSOLUTE_CAP_MS,
  BRIDGE_IDLE_TTL_MS,
  bridgeMaxRequestsPerNonce,
} = await import("../../open-sse/services/grokBotBridgeRegistry.ts");
const {
  handleGrokBridgeRequest,
  handleGrokBridgeOptions,
  handleGrokBridgeMethodNotAllowed,
  BRIDGE_BODY_LIMIT_BYTES,
} = await import("../../open-sse/services/grokBotBridgeProxy.ts");

type TimerFn = () => void;

type FakeClock = {
  now: () => number;
  advance: (ms: number) => void;
  setTimeout: (fn: TimerFn, ms: number) => number;
  clearTimeout: (id: number) => void;
};

function makeFakeClock(start = 1_000_000_000): FakeClock {
  let now = start;
  let nextId = 1;
  const timers = new Map<number, { due: number; fn: TimerFn }>();
  const runDue = () => {
    let guard = 0;
    for (;;) {
      let earliest: { id: number; due: number; fn: TimerFn } | null = null;
      for (const [id, t] of timers) {
        if (t.due <= now && (!earliest || t.due < earliest.due)) {
          earliest = { id, ...t };
        }
      }
      if (!earliest) return;
      timers.delete(earliest.id);
      earliest.fn();
      guard += 1;
      assert.ok(guard < 10_000, "runaway timer loop");
    }
  };
  return {
    now: () => now,
    advance: (ms: number) => {
      now += ms;
      runDue();
    },
    setTimeout: (fn: TimerFn, ms: number) => {
      const id = nextId++;
      timers.set(id, { due: now + ms, fn });
      return id;
    },
    clearTimeout: (id: number) => {
      timers.delete(id);
    },
  };
}

const silentHooks = {
  onDraining: () => {},
  onForcedAbort: () => {},
  onLocallyClosed: () => {},
};

type RecordedRequest = {
  method: string;
  url: string;
  headers: http.IncomingHttpHeaders;
  bodyLength: number;
};

type FixtureServer = {
  port: number;
  requests: RecordedRequest[];
  setHandler: (handler: (req: http.IncomingMessage, res: http.ServerResponse) => void) => void;
  close: () => Promise<void>;
};

function makeFixtureServer(): Promise<FixtureServer> {
  const requests: RecordedRequest[] = [];
  let currentHandler: (req: http.IncomingMessage, res: http.ServerResponse) => void = (req, res) => {
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
    });
    req.on("end", () => {
      requests.push({ method: req.method ?? "", url: req.url ?? "", headers: req.headers, bodyLength: size });
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
    });
  };
  const server = http.createServer((req, res) => currentHandler(req, res));
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const port = (server.address() as AddressInfo).port;
      resolve({
        port,
        requests,
        setHandler: (handler) => {
          currentHandler = handler;
        },
        close: () => new Promise((done) => server.close(() => done())),
      });
    });
  });
}

function postRequest(nonce: string, options: { challenge?: string | null; body?: BodyInit; headers?: HeadersInit } = {}): Request {
  const headers = new Headers(options.headers);
  if (options.challenge !== null) {
    headers.set("authorization", `Bearer ${options.challenge ?? "test-challenge"}`);
  }
  return new Request(`https://bridge.example.test/grok-bridge/${nonce}/mcp`, {
    method: "POST",
    headers,
    body: options.body ?? JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
  });
}

describe("grok bot bridge proxy pipeline", () => {
  let clock: FakeClock;
  let registry: InstanceType<typeof GrokBotBridgeRegistry>;
  let fixture: FixtureServer;

  function registerTurn(challenge = "test-challenge"): { nonce: string; challenge: string } {
    const nonce = generateBridgeNonce();
    const result = registry.register({
      nonce,
      port: fixture.port,
      createdAt: clock.now(),
      challenge,
      hooks: silentHooks,
    });
    assert.equal(result.ok, true);
    return { nonce, challenge };
  }

  function slotCount(nonce: string): number {
    const found = registry.lookup(nonce);
    assert.ok(found.kind === "active" || found.kind === "closed-replay");
    return found.entry.slotsUsed;
  }

  beforeEach(async () => {
    clock = makeFakeClock();
    registry = new GrokBotBridgeRegistry({ clock });
    fixture = await makeFixtureServer();
  });

  afterEach(async () => {
    await fixture.close();
  });

  it("proxies a valid request end to end and forwards only authorization and content-type", async () => {
    const { nonce, challenge } = registerTurn();
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge, headers: { "content-type": "application/json", "x-extra": "drop-me" } }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
    assert.equal(fixture.requests.length, 1);
    const upstream = fixture.requests[0];
    assert.equal(upstream.method, "POST");
    assert.equal(upstream.url, `/grok-bridge/${nonce}/mcp`);
    assert.equal(upstream.headers.authorization, `Bearer ${challenge}`);
    assert.equal(upstream.headers["content-type"], "application/json");
    assert.equal(upstream.headers["x-extra"], undefined, "hop-by-hop and unknown headers are dropped by construction");
  });

  it("preserves the upstream status and content-type on error responses", async () => {
    fixture.setHandler((_req, res) => {
      res.writeHead(500, { "content-type": "application/json", "x-upstream-secret": "no" });
      res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32603 } }));
    });
    const { nonce, challenge } = registerTurn();
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 500);
    assert.equal(res.headers.get("content-type"), "application/json");
    assert.equal(res.headers.get("x-upstream-secret"), null, "upstream response headers are not blindly copied");
  });

  it("returns 404 for an unknown nonce and consumes nothing", async () => {
    const nonce = generateBridgeNonce();
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge: "test-challenge" }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 404);
    assert.equal(fixture.requests.length, 0);
    assert.equal(registry.activeCount, 0);
  });

  it("returns 404 for a malformed nonce before any registry access", async () => {
    const res = await handleGrokBridgeRequest({
      request: postRequest("short", { challenge: "test-challenge" }),
      upstreamPath: "/grok-bridge/short/mcp",
      nonce: "short",
      registry,
    });
    assert.equal(res.status, 404);
    assert.equal(fixture.requests.length, 0);
  });

  it("returns 404 with no slot consumed for a missing or wrong challenge", async () => {
    const { nonce } = registerTurn("real-challenge");
    const missing = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge: null }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(missing.status, 404);
    assert.equal(slotCount(nonce), 0, "missing challenge consumes no slot");
    const wrong = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge: "wrong-value" }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(wrong.status, 404);
    assert.equal(slotCount(nonce), 0, "wrong challenge consumes no slot");
    assert.equal(fixture.requests.length, 0);
  });

  it("returns 410 for a closed nonce before the cap and 404 at or after it", async () => {
    const { nonce, challenge } = registerTurn();
    registry.close(nonce, "normal");
    const beforeCap = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(beforeCap.status, 410);
    assert.equal(slotCount(nonce), 0, "closed replay consumes no slot");
    clock.advance(BRIDGE_ABSOLUTE_CAP_MS);
    const afterCap = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(afterCap.status, 404);
  });

  it("returns 410 for an expired nonce and consumes no slot", async () => {
    const { nonce, challenge } = registerTurn();
    clock.advance(BRIDGE_IDLE_TTL_MS + 1);
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 410);
    assert.equal(slotCount(nonce), 0);
    assert.equal(fixture.requests.length, 0);
  });

  it("allows exactly 8 requests per nonce and rejects the 9th with 410", async () => {
    const { nonce, challenge } = registerTurn();
    for (let i = 0; i < bridgeMaxRequestsPerNonce(); i += 1) {
      const res = await handleGrokBridgeRequest({
        request: postRequest(nonce, { challenge }),
        upstreamPath: `/grok-bridge/${nonce}/mcp`,
        nonce,
        registry,
      });
      assert.equal(res.status, 200, `request ${i + 1}`);
    }
    assert.equal(slotCount(nonce), bridgeMaxRequestsPerNonce());
    const ninth = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(ninth.status, 410);
  });

  it("returns 413 for a request body over 1 MiB and never proxies the upload", async () => {
    const { nonce, challenge } = registerTurn();
    const oversized = Buffer.alloc(BRIDGE_BODY_LIMIT_BYTES + 2, 65);
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge, body: oversized }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 413);
    assert.equal(fixture.requests.length, 0, "the upload is aborted and never proxied");
    assert.equal(slotCount(nonce), 1, "the slot stays consumed");
  });

  it("counts a chunked body by bytes read, not by Content-Length", async () => {
    const { nonce, challenge } = registerTurn();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(Buffer.alloc(BRIDGE_BODY_LIMIT_BYTES + 2, 66));
        controller.close();
      },
    });
    const request = new Request(`https://bridge.example.test/grok-bridge/${nonce}/mcp`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${challenge}`,
        "content-type": "application/octet-stream",
      },
      body: stream,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      duplex: "half" as any,
    });
    const res = await handleGrokBridgeRequest({
      request,
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 413);
    assert.equal(fixture.requests.length, 0);
  });

  it("returns 502 for an unreachable local server and keeps the slot consumed", async () => {
    const dead = http.createServer();
    await new Promise<void>((resolve) => dead.listen(0, "127.0.0.1", () => resolve()));
    const deadPort = (dead.address() as AddressInfo).port;
    await new Promise<void>((resolve) => dead.close(() => resolve()));
    const nonce = generateBridgeNonce();
    const result = registry.register({
      nonce,
      port: deadPort,
      createdAt: clock.now(),
      challenge: "test-challenge",
      hooks: silentHooks,
    });
    assert.equal(result.ok, true);
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge: "test-challenge" }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 502);
    const body = (await res.json()) as { error: string };
    assert.equal(body.error, "bad_gateway");
    assert.equal(slotCount(nonce), 1, "failed proxy attempts still consume one request");
  });

  it("returns 502 for an upstream response body over 1 MiB", async () => {
    fixture.setHandler((_req, res) => {
      res.writeHead(200, { "content-type": "application/octet-stream" });
      res.end(Buffer.alloc(BRIDGE_BODY_LIMIT_BYTES + 2, 67));
    });
    const { nonce, challenge } = registerTurn();
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 502);
  });

  it("returns 504 when the upstream misses the deadline; the turn survives for the next request", async () => {
    // Deterministic single-timer design: the fixture holds its response
    // until the client goes away, so the only timer in the test is the
    // handler's own deadline -- no wall-clock race between two timers.
    fixture.setHandler((req, res) => {
      req.on("close", () => {
        try {
          res.end();
        } catch {
          // The socket is already destroyed; nothing is sent.
        }
      });
    });
    const { nonce, challenge } = registerTurn();
    const slow = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
      timeoutMs: 150,
    });
    assert.equal(slow.status, 504);
    assert.deepEqual(await slow.json(), { error: "gateway_timeout" });
    // Proof of turn survival (spec test 51): the second request on the same
    // nonce succeeds even though the timed-out slot is never refunded.
    fixture.setHandler((_req, res) => {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
    });
    const second = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
      timeoutMs: 5_000,
    });
    assert.equal(second.status, 200);
  });

  it("returns 504 when a slow chunked upload misses the deadline", async () => {
    const { nonce, challenge } = registerTurn();
    // A body stream that never produces data: only the handler deadline can
    // resolve this test, so there is no producer timer to race against.
    const stream = new ReadableStream<Uint8Array>({ start() {} });
    const request = new Request(`https://bridge.example.test/grok-bridge/${nonce}/mcp`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${challenge}`,
        "content-type": "application/octet-stream",
      },
      body: stream,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      duplex: "half" as any,
    });
    const res = await handleGrokBridgeRequest({
      request,
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
      timeoutMs: 150,
    });
    assert.equal(res.status, 504);
    assert.equal(fixture.requests.length, 0);
    assert.equal(slotCount(nonce), 1, "the slot stays consumed");
  });

  it("checks pipeline order: unknown nonce with an oversized body returns 404, not 413", async () => {
    const nonce = generateBridgeNonce();
    const oversized = Buffer.alloc(BRIDGE_BODY_LIMIT_BYTES + 2, 69);
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge: "test-challenge", body: oversized }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 404);
    assert.equal(registry.tombstoneCount + registry.activeCloseCount + registry.activeCount, 0);
  });

  it("checks pipeline order: wrong challenge with an oversized body returns 404 and consumes no slot", async () => {
    const { nonce } = registerTurn("real-challenge");
    const oversized = Buffer.alloc(BRIDGE_BODY_LIMIT_BYTES + 2, 70);
    const res = await handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge: "wrong", body: oversized }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    assert.equal(res.status, 404);
    assert.equal(slotCount(nonce), 0);
  });

  it("aborts an in-flight public-to-loopback fetch when the turn is force-closed (spec step 10)", async () => {
    const hang = http.createServer(() => {
      /* never respond */
    });
    await new Promise<void>((resolve) => hang.listen(0, "127.0.0.1", resolve));
    const port = (hang.address() as AddressInfo).port;
    const nonce = generateBridgeNonce();
    const challenge = "test-challenge";
    registry.register({
      nonce,
      port,
      createdAt: clock.now(),
      challenge,
      hooks: silentHooks,
    });
    const responsePromise = handleGrokBridgeRequest({
      request: postRequest(nonce, { challenge, headers: { "content-type": "application/json" } }),
      upstreamPath: `/grok-bridge/${nonce}/mcp`,
      nonce,
      registry,
    });
    // Wait for the in-flight fetch to register (condition poll, not a blind
    // sleep), then force-close.
    let polled = registry.lookup(nonce);
    for (let i = 0; i < 100; i += 1) {
      polled = registry.lookup(nonce);
      if (polled.kind === "active" && polled.entry.inflight.size === 1) break;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.ok(
      polled.kind === "active" && polled.entry.inflight.size === 1,
      "in-flight fetch must be registered before force-close"
    );
    registry.close(nonce, "cancel");
    const res = await responsePromise;
    assert.equal(res.status, 504);
    assert.equal((await res.json()).error, "gateway_timeout");
    await new Promise<void>((resolve) => hang.close(() => resolve()));
  });

  it("returns 204 with CORS headers for OPTIONS and 405 for other methods", async () => {
    const options = handleGrokBridgeOptions();
    assert.equal(options.status, 204);
    assert.equal(options.headers.get("access-control-allow-methods"), "GET, POST, OPTIONS");
    assert.equal(options.headers.get("access-control-allow-headers"), "authorization, content-type, accept, mcp-protocol-version");
    const other = handleGrokBridgeMethodNotAllowed();
    assert.equal(other.status, 405);
    assert.equal(other.headers.get("allow"), "GET, POST, OPTIONS");
  });
});
