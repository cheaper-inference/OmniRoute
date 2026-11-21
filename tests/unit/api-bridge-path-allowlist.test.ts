/**
 * The API-only port (API_PORT) relays a fixed set of public LLM routes to the dashboard
 * port and answers 404 for everything else, so the dashboard UI and the management API
 * are never reachable through it. Gemini-native clients (Gemini CLI, google-genai SDK)
 * call /v1beta/models/...; those must be relayed like /v1, while /api/* (other than the
 * OAuth callback) stays blocked.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";

const bridge = await import("../../src/lib/apiBridgeServer.ts");

const RELAYED_BODY = "relayed-by-dashboard";

async function withBridge(fn: (apiPort: number, relayed: string[]) => Promise<void>) {
  const relayed: string[] = [];
  const dashboard = http.createServer((req, res) => {
    relayed.push(req.url || "");
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(RELAYED_BODY);
  });
  await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
  const dashboardPort = (dashboard.address() as net.AddressInfo).port;
  const apiServer = bridge.createApiBridgeServer(dashboardPort);
  await new Promise<void>((resolve) => apiServer.listen(0, "127.0.0.1", resolve));
  const apiPort = (apiServer.address() as net.AddressInfo).port;
  try {
    await fn(apiPort, relayed);
  } finally {
    apiServer.close();
    apiServer.closeAllConnections();
    dashboard.close();
    dashboard.closeAllConnections();
  }
}

function get(apiPort: number, path: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: "127.0.0.1", port: apiPort, path }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 0, body }));
    });
    req.on("error", reject);
    req.end();
  });
}

test("Gemini-native /v1beta routes are relayed to the dashboard port", async () => {
  await withBridge(async (apiPort, relayed) => {
    const paths = [
      "/v1beta/models",
      "/v1beta/models/gemini-2.5-pro:generateContent",
      "/v1beta/models/gemini-2.5-pro:streamGenerateContent?alt=sse",
      "/V1BETA/models",
    ];
    for (const path of paths) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 200, `${path} should be relayed`);
      assert.equal(res.body, RELAYED_BODY, `${path} should reach the dashboard`);
    }
    assert.deepEqual(relayed, paths);
  });
});

test("the existing OpenAI-compatible routes are still relayed", async () => {
  await withBridge(async (apiPort, relayed) => {
    for (const path of ["/v1/models", "/v1/chat/completions", "/responses", "/codex/x"]) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 200, `${path} should be relayed`);
    }
    assert.equal(relayed.length, 4);
  });
});

test("dashboard and management routes stay blocked on the API port", async () => {
  await withBridge(async (apiPort, relayed) => {
    const blocked = [
      "/",
      "/dashboard",
      "/api/keys",
      "/api/v1beta/models",
      "/v1betaX/models",
      "/v1beta2/models",
      "/xv1beta/models",
    ];
    for (const path of blocked) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 404, `${path} should be blocked`);
      assert.equal(JSON.parse(res.body).error, "not_found");
    }
    assert.deepEqual(relayed, []);
  });
});

test("paths with dot segments never reach the dashboard port", async () => {
  await withBridge(async (apiPort, relayed) => {
    const refused = [
      "/v1/../api/keys",
      "/v1/./../api/keys",
      "/v1/%2e%2e/api/keys",
      "/v1/%2E%2E/api/keys",
      "/v1/..%2fapi/keys",
      "/v1/..%5capi/keys",
      "/v1/..\\api/keys",
      "/v1/%252e%252e/api/keys",
      "/v1beta/../api/keys",
      "/codex/../api/keys",
      "/api/oauth/../keys",
      "/v1/.",
    ];
    for (const path of refused) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 404, `${path} should be refused`);
      assert.equal(JSON.parse(res.body).error, "not_found");
    }
    assert.deepEqual(relayed, []);
  });
});

test("paths that only look like dot segments are still relayed", async () => {
  await withBridge(async (apiPort, relayed) => {
    const paths = [
      "/v1/models/a..b",
      "/v1/files/.hidden",
      "/v1/models/openai%2Fgpt-4o",
      "/v1/chat/completions?next=../y",
    ];
    for (const path of paths) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 200, `${path} should be relayed`);
    }
    assert.deepEqual(relayed, paths);
  });
});

test("a path with a fragment marker is refused", async () => {
  await withBridge(async (apiPort, relayed) => {
    // A request target has no fragment, and parsers disagree on where a path with "#" ends:
    // one reads "/v1/..#" as "/v1/..", another reads "/v1/x#/../../api/keys" as "/api/keys".
    const refused = [
      "/v1/..#",
      "/v1/..#x",
      "/v1/%2e%2e#",
      "/v1beta/.#",
      "/codex/..#",
      "/api/oauth/..#/keys",
      "/v1/models/..#?x=1",
      "/v1/x#/../../api/keys",
      "/v1/models#section",
    ];
    for (const path of refused) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 404, `${path} should be refused`);
    }
    assert.deepEqual(relayed, []);

    // After the "?" the marker is part of the query for every parser, so it changes nothing.
    const allowed = ["/v1/chat/completions?next=1#../y"];
    for (const path of allowed) {
      const res = await get(apiPort, path);
      assert.equal(res.status, 200, `${path} should be relayed`);
    }
    assert.deepEqual(relayed, allowed);
  });
});

test("isRelayablePath refuses a fragment marker in the path and ignores one in the query", () => {
  assert.equal(bridge.isRelayablePath("/v1/..#"), false);
  assert.equal(bridge.isRelayablePath("/v1/models#"), false);
  assert.equal(bridge.isRelayablePath("/v1/x#/../../api/keys"), false);
  assert.equal(bridge.isRelayablePath("/api/keys#/v1/"), false);
  assert.equal(bridge.isRelayablePath("/v1/..?x"), false);
  assert.equal(bridge.isRelayablePath("/v1/x?a=1#/../api/keys"), true);
  assert.equal(bridge.isRelayablePath("/v1/models"), true);
});

test("hasDotSegment unwraps nested encodings and never throws", () => {
  assert.equal(bridge.hasDotSegment("/v1/%25252e%25252e/x"), true);
  // Seven levels deep: the percent sign of an encoded dot, itself encoded six times over.
  const deep = `%${"25".repeat(6)}2e`;
  assert.equal(bridge.hasDotSegment(`/v1/${deep}${deep}/x`), true);
  assert.equal(bridge.hasDotSegment("/v1/%zz/x"), false);
  assert.equal(bridge.hasDotSegment("/v1/models"), false);
  assert.equal(bridge.hasDotSegment("/v1/models/a..b"), false);
});

test("an upgrade request with a dot segment is refused before reaching the dashboard", async () => {
  const upgrades: string[] = [];
  const dashboard = http.createServer();
  dashboard.on("upgrade", (req, socket) => {
    upgrades.push(req.url || "");
    socket.destroy();
  });
  await new Promise<void>((resolve) => dashboard.listen(0, "127.0.0.1", resolve));
  const dashboardPort = (dashboard.address() as net.AddressInfo).port;
  const apiServer = bridge.createApiBridgeServer(dashboardPort);
  await new Promise<void>((resolve) => apiServer.listen(0, "127.0.0.1", resolve));
  const apiPort = (apiServer.address() as net.AddressInfo).port;
  try {
    const response = await new Promise<string>((resolve, reject) => {
      const socket = net.connect(apiPort, "127.0.0.1");
      let data = "";
      socket.setEncoding("utf8");
      socket.on("connect", () => {
        socket.write(
          "GET /v1/../api/keys HTTP/1.1\r\nHost: 127.0.0.1\r\nConnection: Upgrade\r\nUpgrade: websocket\r\n\r\n"
        );
      });
      socket.on("data", (chunk) => (data += chunk));
      socket.on("error", reject);
      socket.on("close", () => resolve(data));
    });
    assert.match(response, /^HTTP\/1\.1 404 /);
    assert.match(response, /"error":"not_found"/);
    assert.deepEqual(upgrades, []);
  } finally {
    apiServer.close();
    apiServer.closeAllConnections();
    dashboard.close();
    dashboard.closeAllConnections();
  }
});
