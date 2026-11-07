import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import type { AddressInfo } from "node:net";

const require = createRequire(import.meta.url);
const h2cGuard = require("../../scripts/dev/h2c-upgrade-guard.cjs") as {
  isCleartextH2cUpgrade: (
    req: { headers: Record<string, string | string[] | undefined> },
    socket?: { encrypted?: boolean }
  ) => boolean;
  handleH2cUpgrade: (
    server: http.Server,
    req: http.IncomingMessage,
    socket: net.Socket,
    head: Buffer
  ) => boolean;
};

/**
 * HTTP/1.1 clients built on the JDK `java.net.http.HttpClient` (the JetBrains
 * IDEs / Air "Add an AI provider" connection test, among others) default to
 * HTTP/2 and open a cleartext connection with the RFC 9113 §3.2 upgrade dance:
 *
 *   POST /v1/messages HTTP/1.1
 *   Connection: Upgrade, HTTP2-Settings
 *   Upgrade: h2c
 *   HTTP2-Settings: <base64url>
 *
 * Node routes any request carrying an `Upgrade` header to the server's
 * `upgrade` listeners instead of `request` as soon as one is registered. The
 * server wrapper (and Next) register one, nobody claims `h2c`, and the socket
 * was dropped: the client saw "HTTP/1.1 header parser received no bytes".
 *
 * RFC 9110 §7.8 lets a server ignore `Upgrade` and keep answering in HTTP/1.1,
 * so `scripts/dev/h2c-upgrade-guard.cjs` hands such requests back to Node's
 * HTTP/1.1 parser. These tests drive real sockets through a real http.Server.
 */

type Echo = {
  method: string;
  url: string;
  upgrade: string | null;
  connection: string | null;
  http2Settings: string | null;
  body: string;
};

const servers: http.Server[] = [];
after(async () => {
  await Promise.all(servers.map((s) => new Promise<void>((resolve) => s.close(() => resolve()))));
});

// Mirrors the production wiring: the guard runs first inside the `upgrade`
// listener; whatever it does not claim ends up in the fallback (Next/WS logic),
// which here records the event and closes the socket exactly like the real
// fallback does for an upgrade nobody handles.
async function startServer(opts?: { onUnclaimedUpgrade?: (req: http.IncomingMessage) => void }) {
  const server = http.createServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const echo: Echo = {
        method: req.method ?? "",
        url: req.url ?? "",
        upgrade: req.headers.upgrade ?? null,
        connection: req.headers.connection ?? null,
        http2Settings: (req.headers["http2-settings"] as string | undefined) ?? null,
        body: Buffer.concat(chunks).toString("utf8"),
      };
      const payload = JSON.stringify(echo);
      res.writeHead(200, {
        "content-type": "application/json",
        "content-length": Buffer.byteLength(payload),
      });
      res.end(payload);
    });
  });
  server.on("upgrade", (req, socket, head) => {
    if (h2cGuard.handleH2cUpgrade(server, req, socket as net.Socket, head)) return;
    opts?.onUnclaimedUpgrade?.(req);
    socket.destroy();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  servers.push(server);
  return { server, port: (server.address() as AddressInfo).port };
}

// Minimal HTTP/1.1 response reader over a raw socket (Content-Length framing).
function createReader(socket: net.Socket) {
  let buffer = Buffer.alloc(0);
  let closed = false;
  const waiters: Array<() => void> = [];
  const wake = () => waiters.splice(0).forEach((w) => w());
  socket.on("data", (c) => {
    buffer = Buffer.concat([buffer, c]);
    wake();
  });
  socket.on("close", () => {
    closed = true;
    wake();
  });
  socket.on("error", () => {
    closed = true;
    wake();
  });
  return async function readResponse(): Promise<{ status: number; body: string } | null> {
    const deadline = Date.now() + 4000;
    for (;;) {
      const headEnd = buffer.indexOf("\r\n\r\n");
      if (headEnd >= 0) {
        const head = buffer.subarray(0, headEnd).toString("latin1");
        const length = Number(/content-length:\s*(\d+)/i.exec(head)?.[1] ?? 0);
        const total = headEnd + 4 + length;
        if (buffer.length >= total) {
          const status = Number(/^HTTP\/1\.1 (\d{3})/.exec(head)?.[1] ?? 0);
          const body = buffer.subarray(headEnd + 4, total).toString("utf8");
          buffer = buffer.subarray(total);
          return { status, body };
        }
      }
      if (closed || Date.now() > deadline) return null;
      await new Promise<void>((resolve) => {
        waiters.push(resolve);
        setTimeout(resolve, 50);
      });
    }
  };
}

function h2cRequest(method: string, url: string, body = "") {
  const lines = [
    `${method} ${url} HTTP/1.1`,
    "Host: 127.0.0.1",
    "Connection: Upgrade, HTTP2-Settings",
    "Upgrade: h2c",
    "HTTP2-Settings: AAMAAABkAAQAoAAAAAIAAAAA",
  ];
  if (body) {
    lines.push("Content-Type: application/json", `Content-Length: ${Buffer.byteLength(body)}`);
  }
  return `${lines.join("\r\n")}\r\n\r\n${body}`;
}

describe("h2c upgrade guard — isCleartextH2cUpgrade", () => {
  it("matches an Upgrade header that lists only h2c (case-insensitive)", () => {
    assert.equal(h2cGuard.isCleartextH2cUpgrade({ headers: { upgrade: "h2c" } }, {}), true);
    assert.equal(h2cGuard.isCleartextH2cUpgrade({ headers: { upgrade: " H2C " } }, {}), true);
  });

  it("leaves WebSocket and mixed upgrades to the existing handlers", () => {
    for (const upgrade of [
      "websocket",
      "WebSocket",
      "h2c, websocket",
      "websocket, h2c",
      "tls/1.3",
    ]) {
      assert.equal(
        h2cGuard.isCleartextH2cUpgrade({ headers: { upgrade } }, {}),
        false,
        `Upgrade: ${upgrade} must not be claimed by the h2c guard`
      );
    }
    assert.equal(h2cGuard.isCleartextH2cUpgrade({ headers: {} }, {}), false);
  });

  it("never applies over TLS (RFC 9113 §3.1 forbids h2c upgrade on https)", () => {
    assert.equal(
      h2cGuard.isCleartextH2cUpgrade({ headers: { upgrade: "h2c" } }, { encrypted: true }),
      false
    );
  });
});

describe("h2c upgrade guard — real sockets", () => {
  it("answers a POST that carries the h2c upgrade headers and its body in HTTP/1.1", async () => {
    const { port } = await startServer();
    const socket = net.connect(port, "127.0.0.1");
    const read = createReader(socket);
    const body = JSON.stringify({ model: "claude-sonnet-5-5", messages: [] });
    socket.write(h2cRequest("POST", "/v1/messages?beta=true", body));

    const res = await read();
    socket.destroy();
    assert.ok(res, "the server must answer instead of dropping the connection");
    assert.equal(res.status, 200);
    const echo = JSON.parse(res.body) as Echo;
    assert.equal(echo.method, "POST");
    assert.equal(echo.url, "/v1/messages?beta=true");
    assert.equal(echo.body, body, "the request body must arrive intact");
  });

  it("answers a bodiless GET that carries the h2c upgrade headers", async () => {
    const { port } = await startServer();
    const socket = net.connect(port, "127.0.0.1");
    const read = createReader(socket);
    socket.write(h2cRequest("GET", "/v1/models"));

    const res = await read();
    socket.destroy();
    assert.ok(res);
    assert.equal(res.status, 200);
    assert.equal((JSON.parse(res.body) as Echo).url, "/v1/models");
  });

  it("strips the h2c negotiation headers so downstream handlers never see an upgrade", async () => {
    const { port } = await startServer();
    const socket = net.connect(port, "127.0.0.1");
    const read = createReader(socket);
    socket.write(h2cRequest("GET", "/v1/models"));

    const res = await read();
    socket.destroy();
    assert.ok(res);
    const echo = JSON.parse(res.body) as Echo;
    assert.equal(echo.upgrade, null);
    assert.equal(echo.http2Settings, null);
    assert.ok(
      !/upgrade|http2-settings/i.test(echo.connection ?? ""),
      `Connection must not keep the stripped tokens, got: ${echo.connection}`
    );
  });

  it("keeps non-upgrade Connection tokens", async () => {
    const { port } = await startServer();
    const socket = net.connect(port, "127.0.0.1");
    const read = createReader(socket);
    socket.write(
      [
        "GET /v1/models HTTP/1.1",
        "Host: 127.0.0.1",
        "Connection: keep-alive, Upgrade, HTTP2-Settings",
        "Upgrade: h2c",
        "HTTP2-Settings: AAMAAABkAAQAoAAAAAIAAAAA",
        "",
        "",
      ].join("\r\n")
    );

    const res = await read();
    socket.destroy();
    assert.ok(res);
    assert.equal((JSON.parse(res.body) as Echo).connection, "keep-alive");
  });

  it("keeps the connection usable for further requests (keep-alive)", async () => {
    const { port } = await startServer();
    const socket = net.connect(port, "127.0.0.1");
    const read = createReader(socket);

    socket.write(h2cRequest("GET", "/first"));
    const first = await read();
    socket.write("GET /second HTTP/1.1\r\nHost: 127.0.0.1\r\n\r\n");
    const second = await read();
    socket.destroy();

    assert.equal((JSON.parse(first!.body) as Echo).url, "/first");
    assert.equal((JSON.parse(second!.body) as Echo).url, "/second");
  });

  it("handles a body that arrives after the headers (nothing buffered in `head`)", async () => {
    const { port } = await startServer();
    const socket = net.connect(port, "127.0.0.1");
    const read = createReader(socket);
    const body = JSON.stringify({ ping: "pong" });
    const request = h2cRequest("POST", "/v1/chat/completions", body);
    const split = request.indexOf("\r\n\r\n") + 4;

    socket.write(request.slice(0, split));
    await new Promise((resolve) => setTimeout(resolve, 80));
    socket.write(request.slice(split));

    const res = await read();
    socket.destroy();
    assert.ok(res);
    assert.equal((JSON.parse(res.body) as Echo).body, body);
  });

  it("does not claim WebSocket upgrades — they still reach the existing upgrade handlers", async () => {
    let seenUpgrade: string | undefined;
    const { port } = await startServer({
      onUnclaimedUpgrade: (req) => {
        seenUpgrade = req.headers.upgrade;
      },
    });
    const socket = net.connect(port, "127.0.0.1");
    const read = createReader(socket);
    socket.write(
      [
        "GET /v1/ws HTTP/1.1",
        "Host: 127.0.0.1",
        "Connection: Upgrade",
        "Upgrade: websocket",
        "Sec-WebSocket-Version: 13",
        "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==",
        "",
        "",
      ].join("\r\n")
    );

    const res = await read();
    socket.destroy();
    assert.equal(res, null, "the stub fallback closes the socket without answering");
    assert.equal(seenUpgrade, "websocket");
  });

  it("baseline: without the guard a listener that does not claim h2c drops the connection", async () => {
    // Documents the original failure mode (Node + an `upgrade` listener that
    // ignores the request) so the regression above cannot silently stop
    // exercising it.
    const server = http.createServer((_req, res) => res.end("ok"));
    server.on("upgrade", (_req, socket) => socket.destroy());
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    servers.push(server);
    const socket = net.connect((server.address() as AddressInfo).port, "127.0.0.1");
    const read = createReader(socket);
    socket.write(h2cRequest("GET", "/v1/models"));
    const res = await read();
    socket.destroy();
    assert.equal(res, null);
  });
});

describe("h2c upgrade guard — wiring", () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const read = (rel: string) => fs.readFileSync(path.resolve(here, "../..", rel), "utf8");

  it("standalone-server-ws.mjs consults the guard first in its upgrade wrapper", () => {
    const source = read("scripts/dev/standalone-server-ws.mjs");
    assert.match(source, /from\s+["']\.\/h2c-upgrade-guard\.cjs["']/);
    const wrapper = source.slice(source.indexOf("function wrapUpgradeListener"));
    const guardAt = wrapper.indexOf("handleH2cUpgrade(");
    const liveWsAt = wrapper.indexOf("LIVE_WS_PORT");
    assert.ok(guardAt > 0, "wrapUpgradeListener must call handleH2cUpgrade");
    assert.ok(guardAt < liveWsAt, "the h2c guard must run before any WebSocket routing");
  });

  it("run-next.mjs (npm start / dev) consults the same guard", () => {
    const source = read("scripts/dev/run-next.mjs");
    assert.match(source, /from\s+["']\.\/h2c-upgrade-guard\.cjs["']/);
    assert.match(source, /handleH2cUpgrade\(server,\s*req,\s*socket,\s*head\)/);
  });
});
