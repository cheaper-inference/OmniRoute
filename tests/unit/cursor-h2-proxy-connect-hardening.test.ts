/**
 * Hardening of the Cursor HTTP/2 proxy tunnel:
 *   1. a CONNECT response header block is bounded, so a proxy that streams
 *      header bytes forever fails fast instead of buffering until the timer;
 *   2. the TLS session over the tunnel must negotiate ALPN "h2", otherwise the
 *      request fails with a clear error instead of an opaque HTTP/2 one;
 *   3. a request pinned to a context proxy that cannot be resolved fails
 *      instead of silently leaving on the host IP.
 *
 * Every peer here is a loopback server; nothing reaches the network.
 */
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import http2 from "node:http2";
import net from "node:net";
import tls from "node:tls";
import test from "node:test";
import selfsigned from "selfsigned";

import {
  createProxyTunnelSocket,
  resolveCursorH2ProxyUrl,
  tlsConnectOverTunnel,
} from "../../open-sse/executors/cursor/h2ProxyConnect.ts";
import { openCursorH2 } from "../../open-sse/executors/cursor/h2AgentStream.ts";
import { runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const originalCa = tls.getCACertificates("default");
const PROXY_ENV_KEYS = [
  "HTTPS_PROXY",
  "HTTP_PROXY",
  "ALL_PROXY",
  "https_proxy",
  "http_proxy",
  "all_proxy",
  "ENABLE_SOCKS5_PROXY",
] as const;
const savedEnv: Record<string, string | undefined> = {};
// A missing guard must fail the test, not hang the runner.
const NET_TEST = { timeout: 15_000 };
// Not a loopback name, so the proxy resolver does not bypass the tunnel for it.
const TLS_HOST = "cursor-h2.test";

let pems: { private: string; cert: string };

test.before(async () => {
  for (const key of PROXY_ENV_KEYS) {
    savedEnv[key] = process.env[key];
    delete process.env[key];
  }
  pems = await selfsigned.generate([{ name: "commonName", value: "localhost" }], {
    keySize: 2048,
    algorithm: "sha256",
    extensions: [{ name: "subjectAltName", altNames: [{ type: 2, value: TLS_HOST }] }],
  });
  tls.setDefaultCACertificates([...originalCa, pems.cert]);
});

test.after(() => {
  tls.setDefaultCACertificates(originalCa);
  for (const key of PROXY_ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
  resetDbInstance();
});

async function listen(server: net.Server): Promise<number> {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  return (server.address() as net.AddressInfo).port;
}

function closeServer(server: net.Server, peers: Set<net.Socket>): Promise<void> {
  for (const peer of peers) peer.destroy();
  return new Promise((resolve) => server.close(() => resolve()));
}

/** A CONNECT proxy that pipes the tunnel to `targetPort` on loopback. */
function startTunnelProxy(targetPort: number) {
  const peers = new Set<net.Socket>();
  const server = net.createServer((client) => {
    peers.add(client);
    client.once("close", () => peers.delete(client));
    client.on("error", () => {});
    client.once("data", () => {
      const upstream = net.connect({ host: "127.0.0.1", port: targetPort }, () => {
        client.write("HTTP/1.1 200 Connection established\r\n\r\n");
        client.pipe(upstream).pipe(client);
      });
      peers.add(upstream);
      upstream.once("close", () => peers.delete(upstream));
      upstream.on("error", () => client.destroy());
    });
  });
  return { server, peers };
}

/** A TLS server that never negotiates ALPN, so the client ends with `alpnProtocol === false`. */
function startNoAlpnTlsServer() {
  const peers = new Set<net.Socket>();
  const server = tls.createServer({ key: pems.private, cert: pems.cert }, (socket) => {
    peers.add(socket);
    socket.once("close", () => peers.delete(socket));
    socket.on("error", () => {});
  });
  server.on("tlsClientError", () => {});
  return { server, peers };
}

test(
  "a proxy streaming an unterminated CONNECT header is rejected before the timer fires",
  NET_TEST,
  async () => {
    const peers = new Set<net.Socket>();
    const proxy = net.createServer((client) => {
      peers.add(client);
      client.once("close", () => peers.delete(client));
      client.on("error", () => {});
      client.once("data", () => {
        // 70 KiB of header bytes and never a blank line.
        client.write(`HTTP/1.1 200 OK\r\nX-Pad: ${"a".repeat(70 * 1024)}`);
      });
    });
    const proxyPort = await listen(proxy);
    const started = Date.now();

    try {
      await assert.rejects(
        createProxyTunnelSocket({
          targetHost: "api5.cursor.sh",
          targetPort: 443,
          proxyUrl: `http://127.0.0.1:${proxyPort}`,
          timeoutMs: 8_000,
        }),
        /CONNECT response headers too large/
      );
      assert.ok(Date.now() - started < 4_000, "must fail on size, not on the 8 s timer");
    } finally {
      await closeServer(proxy, peers);
    }
  }
);

test(
  "a CONNECT response whose header block ends past the limit is rejected",
  NET_TEST,
  async () => {
    const peers = new Set<net.Socket>();
    const proxy = net.createServer((client) => {
      peers.add(client);
      client.once("close", () => peers.delete(client));
      client.on("error", () => {});
      client.once("data", () => {
        client.write(`HTTP/1.1 200 OK\r\nX-Pad: ${"a".repeat(70 * 1024)}\r\n\r\n`);
      });
    });
    const proxyPort = await listen(proxy);

    try {
      await assert.rejects(
        createProxyTunnelSocket({
          targetHost: "api5.cursor.sh",
          targetPort: 443,
          proxyUrl: `http://127.0.0.1:${proxyPort}`,
          timeoutMs: 8_000,
        }),
        /CONNECT response headers too large/
      );
    } finally {
      await closeServer(proxy, peers);
    }
  }
);

test(
  "a valid CONNECT with tunnelled bytes coalesced into the same segment still tunnels",
  NET_TEST,
  async () => {
    const peers = new Set<net.Socket>();
    const proxy = net.createServer((client) => {
      peers.add(client);
      client.once("close", () => peers.delete(client));
      client.on("error", () => {});
      client.once("data", () => {
        client.write("HTTP/1.1 200 Connection established\r\n\r\nHELLO");
      });
    });
    const proxyPort = await listen(proxy);

    try {
      const socket = await createProxyTunnelSocket({
        targetHost: "api5.cursor.sh",
        targetPort: 443,
        proxyUrl: `http://127.0.0.1:${proxyPort}`,
        timeoutMs: 5_000,
      });
      // The TLS wrapper drains the tunnel with read(); the bytes must still be buffered.
      assert.equal(String(socket.read()), "HELLO");
      socket.destroy();
    } finally {
      await closeServer(proxy, peers);
    }
  }
);

test(
  "a TLS peer behind the tunnel that does not negotiate ALPN h2 is rejected",
  NET_TEST,
  async () => {
    const target = startNoAlpnTlsServer();
    const targetPort = await listen(target.server);
    const proxy = startTunnelProxy(targetPort);
    const proxyPort = await listen(proxy.server);

    try {
      const tunnel = await createProxyTunnelSocket({
        targetHost: TLS_HOST,
        targetPort,
        proxyUrl: `http://127.0.0.1:${proxyPort}`,
        timeoutMs: 5_000,
      });
      const tlsSocket = tlsConnectOverTunnel(tunnel, TLS_HOST);
      const outcome = await new Promise<{ error?: Error; alpn?: string | false }>((resolve) => {
        tlsSocket.once("error", (error) => resolve({ error }));
        tlsSocket.once("secureConnect", () => {
          // Give a deferred destroy(error) the chance to surface first.
          setImmediate(() => resolve({ alpn: tlsSocket.alpnProtocol }));
        });
      });
      tlsSocket.destroy();
      assert.ok(outcome.error, `expected an ALPN error, got alpn=${String(outcome.alpn)}`);
      assert.match(outcome.error.message, /did not negotiate h2 via ALPN/);
    } finally {
      await closeServer(proxy.server, proxy.peers);
      await closeServer(target.server, target.peers);
    }
  }
);

test("openCursorH2 surfaces the ALPN error through a real HTTP/2 client", NET_TEST, async () => {
  const target = startNoAlpnTlsServer();
  const targetPort = await listen(target.server);
  const proxy = startTunnelProxy(targetPort);
  const proxyPort = await listen(proxy.server);

  try {
    await assert.rejects(
      runWithProxyContext({ type: "http", host: "127.0.0.1", port: proxyPort }, () =>
        openCursorH2(
          http2,
          `https://${TLS_HOST}:${targetPort}/agent.v1.AgentService/Run`,
          {},
          new Uint8Array(0)
        )
      ),
      /did not negotiate h2 via ALPN/
    );
  } finally {
    await closeServer(proxy.server, proxy.peers);
    await closeServer(target.server, target.peers);
  }
});

test("a pinned context proxy that fails to resolve throws instead of returning direct", async () => {
  const target = "https://api5.cursor.sh/agent.v1.AgentService/Run";

  await runWithProxyContext({ type: "socks5", host: "127.0.0.1", port: 1 }, async () => {
    // The proxy was valid when pinned; it stops resolving once SOCKS5 is disabled.
    process.env.ENABLE_SOCKS5_PROXY = "false";
    try {
      assert.throws(
        () => resolveCursorH2ProxyUrl(target),
        /refusing to fall back to a direct connection/
      );
    } finally {
      delete process.env.ENABLE_SOCKS5_PROXY;
    }
  });
});

test(
  "openCursorH2 never opens a direct HTTP/2 session when the pinned proxy fails to resolve",
  NET_TEST,
  async () => {
    let connectCalls = 0;
    const fakeHttp2 = {
      connect: () => {
        connectCalls += 1;
        return new EventEmitter();
      },
    } as unknown as typeof import("node:http2");

    await runWithProxyContext({ type: "socks5", host: "127.0.0.1", port: 1 }, async () => {
      process.env.ENABLE_SOCKS5_PROXY = "false";
      try {
        await assert.rejects(
          openCursorH2(
            fakeHttp2,
            "https://api5.cursor.sh/agent.v1.AgentService/Run",
            {},
            new Uint8Array(0)
          ),
          /refusing to fall back to a direct connection/
        );
      } finally {
        delete process.env.ENABLE_SOCKS5_PROXY;
      }
    });
    assert.equal(connectCalls, 0, "no direct connection may be attempted");
  }
);

test("without a context proxy or proxy env, resolution stays direct", () => {
  assert.equal(resolveCursorH2ProxyUrl("https://api5.cursor.sh/agent.v1.AgentService/Run"), null);
});
