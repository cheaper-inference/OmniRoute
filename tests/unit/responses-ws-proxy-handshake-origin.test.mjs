// The Responses WS proxy must hand the bridge what its Origin check needs: the
// handshake Host / forwarding headers and a peer stamp it computed itself. A
// client-sent `x-omniroute-peer-ip` must never reach the bridge, and the bridge's
// refusal must surface as an HTTP error instead of a 101.
import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

process.env.OMNIROUTE_PEER_STAMP_TOKEN = "handshake-origin-peer-token";

const { createResponsesWsProxy, getHandshakeOriginHeaders } =
  await import("../../scripts/dev/responses-ws-proxy.mjs");

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

test("getHandshakeOriginHeaders stamps the real peer and drops a forged stamp", () => {
  const req = {
    headers: {
      host: "127.0.0.1:20128",
      origin: "https://evil.example",
      "x-forwarded-proto": "https",
      "x-omniroute-peer-ip": "attacker|127.0.0.1",
      authorization: "Bearer not-forwarded-here",
    },
    socket: { remoteAddress: "203.0.113.9" },
  };
  const headers = getHandshakeOriginHeaders(req);
  assert.deepEqual(headers, {
    host: "127.0.0.1:20128",
    "x-forwarded-proto": "https",
    "x-omniroute-peer-ip": "handshake-origin-peer-token|203.0.113.9",
  });
  // The upgrade request itself is left untouched.
  assert.equal(req.headers["x-omniroute-peer-ip"], "attacker|127.0.0.1");
});

test("upgrade forwards handshake headers and maps a bridge 403 to an HTTP 403", async () => {
  const authBodies = [];
  const server = http.createServer(async (req, res) => {
    const body = JSON.parse((await readBody(req)) || "{}");
    authBodies.push(body);
    res.writeHead(403, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        error: { code: "ws_origin_forbidden", message: "WebSocket origin not allowed" },
      })
    );
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const proxy = createResponsesWsProxy({
    baseUrl: `http://127.0.0.1:${port}`,
    bridgeSecret: "bridge-secret",
    wsFactory: async () => {
      throw new Error("upstream must not be reached");
    },
  });
  server.on("upgrade", async (req, socket, head) => {
    const handled = await proxy.handleUpgrade(req, socket, head);
    if (!handled && !socket.destroyed) socket.destroy();
  });

  try {
    const statusLine = await new Promise((resolve, reject) => {
      const req = http.request({
        host: "127.0.0.1",
        port,
        path: "/v1/responses",
        headers: {
          connection: "Upgrade",
          upgrade: "websocket",
          "sec-websocket-version": "13",
          "sec-websocket-key": "dGhlIHNhbXBsZSBub25jZQ==",
          origin: "https://evil.example",
          "x-omniroute-peer-ip": "attacker|127.0.0.1",
        },
      });
      req.on("upgrade", () => reject(new Error("upgrade must be refused")));
      req.on("response", (res) => {
        res.resume();
        resolve(res.statusCode);
      });
      req.on("error", reject);
      req.end();
    });

    assert.equal(statusLine, 403);
    assert.equal(authBodies.length, 1);
    assert.equal(authBodies[0].action, "authenticate");
    assert.equal(authBodies[0].headers.origin, "https://evil.example");
    assert.equal(authBodies[0].handshake.host, `127.0.0.1:${port}`);
    assert.equal(
      authBodies[0].handshake["x-omniroute-peer-ip"],
      "handshake-origin-peer-token|127.0.0.1"
    );
  } finally {
    proxy.close?.();
    server.closeAllConnections?.();
    await new Promise((resolve) => server.close(resolve));
  }
});
