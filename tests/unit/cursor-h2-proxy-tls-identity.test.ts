/** Verify DNS/IP certificate identity while omitting SNI for IP literals. */
import assert from "node:assert/strict";
import { once } from "node:events";
import net from "node:net";
import tls from "node:tls";
import test from "node:test";
import selfsigned from "selfsigned";

import { tlsConnectOverTunnel } from "../../open-sse/executors/cursor/h2ProxyConnect.ts";

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const originalCa = tls.getCACertificates("default");
const NET_TEST = { timeout: 15_000 };
const TLS_HOST = "cursor-h2.test";
let pems: { private: string; cert: string };

test.before(async () => {
  pems = await selfsigned.generate([{ name: "commonName", value: "localhost" }], {
    keySize: 2048,
    algorithm: "sha256",
    extensions: [
      {
        name: "subjectAltName",
        altNames: [
          { type: 2, value: TLS_HOST },
          { type: 7, ip: "127.0.0.1" },
          { type: 7, ip: "::1" },
        ],
      },
    ],
  });
  tls.setDefaultCACertificates([...originalCa, pems.cert]);
});

test.after(() => {
  tls.setDefaultCACertificates(originalCa);
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

/** TLS peer with a trusted DNS/IP certificate and HTTP/2 ALPN. */
function startH2TlsServer() {
  const peers = new Set<net.Socket>();
  const server = tls.createServer({
    key: pems.private,
    cert: pems.cert,
    ALPNProtocols: ["h2"],
  });
  server.on("connection", (socket) => {
    peers.add(socket);
    socket.once("close", () => peers.delete(socket));
    socket.on("error", () => {});
  });
  server.on("tlsClientError", () => {});
  return { server, peers };
}

test(
  "tunneled TLS sends only DNS SNI and validates DNS, IPv4 and IPv6 identities",
  NET_TEST,
  async () => {
    const target = startH2TlsServer();
    const port = await listen(target.server);
    try {
      for (const hostname of [TLS_HOST, "127.0.0.1", "[::1]"]) {
        const accepted = once(target.server, "secureConnection");
        const socket = tlsConnectOverTunnel(net.connect(port, "127.0.0.1"), hostname);
        try {
          await once(socket, "secureConnect");
          const [peer] = (await accepted) as [tls.TLSSocket & { servername: string | false }];
          assert.equal(socket.authorized, true);
          assert.equal(socket.alpnProtocol, "h2");
          assert.equal(peer.servername, hostname === TLS_HOST ? TLS_HOST : false);
        } finally {
          socket.destroy();
        }
      }
    } finally {
      await closeServer(target.server, target.peers);
    }
  }
);

test(
  "tunneled TLS rejects a trusted certificate for the wrong DNS or IP identity",
  NET_TEST,
  async () => {
    const target = startH2TlsServer();
    const port = await listen(target.server);
    try {
      for (const hostname of ["unlisted.test", "127.0.0.2"]) {
        const socket = tlsConnectOverTunnel(net.connect(port, "127.0.0.1"), hostname);
        try {
          await assert.rejects(once(socket, "secureConnect"), {
            code: "ERR_TLS_CERT_ALTNAME_INVALID",
          });
        } finally {
          socket.destroy();
        }
      }
    } finally {
      await closeServer(target.server, target.peers);
    }
  }
);

test("tunneled TLS without SNI still rejects an untrusted certificate", NET_TEST, async () => {
  const target = startH2TlsServer();
  const port = await listen(target.server);
  tls.setDefaultCACertificates(originalCa);
  try {
    const socket = tlsConnectOverTunnel(net.connect(port, "127.0.0.1"), "127.0.0.1");
    try {
      await assert.rejects(once(socket, "secureConnect"), {
        code: "DEPTH_ZERO_SELF_SIGNED_CERT",
      });
    } finally {
      socket.destroy();
    }
  } finally {
    tls.setDefaultCACertificates([...originalCa, pems.cert]);
    await closeServer(target.server, target.peers);
  }
});
