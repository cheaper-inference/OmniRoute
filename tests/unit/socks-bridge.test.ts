import assert from "node:assert/strict";
import net from "node:net";
import os from "node:os";
import { afterEach, describe, it } from "node:test";
import { shutdownPool } from "../../open-sse/services/browserPool.ts";
import {
  acquireSocksBridge,
  closeAllSocksBridges,
  socksBridgeCount,
  type SocksBridgeCredential,
} from "../../open-sse/utils/socksBridge.ts";
import { resolveExecutorProxy } from "../../open-sse/utils/executorProxy.ts";

const USER = "bridge-user";
const PASS = "bridge-secret";

interface Upstream {
  port: number;
  connects: Array<[string, number]>;
  received: Buffer[];
  authFailures: number;
  close: () => Promise<void>;
}

function read(socket: net.Socket, n: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const take = () => {
      const chunk = socket.read(n);
      if (chunk) {
        cleanup();
        resolve(chunk);
      }
    };
    const fail = () => {
      cleanup();
      reject(new Error("short read"));
    };
    const cleanup = () => {
      socket.off("readable", take);
      socket.off("end", fail);
      socket.off("error", fail);
    };
    socket.on("readable", take);
    socket.on("end", fail);
    socket.on("error", fail);
    take();
  });
}

function startUpstream(
  user: string,
  password: string,
  options: { keepOpen?: boolean } = {}
): Promise<Upstream> {
  const connects: Array<[string, number]> = [];
  const received: Buffer[] = [];
  let authFailures = 0;
  const server = net.createServer((socket) => {
    void handshake(socket);
  });

  async function handshake(socket: net.Socket): Promise<void> {
    try {
      const header = await read(socket, 2);
      if (header[0] !== 5) return socket.end();
      const methods = await read(socket, header[1]);
      if (!methods.includes(2)) return socket.end(Buffer.from([5, 0xff]));
      socket.write(Buffer.from([5, 2]));
      const ulen = (await read(socket, 2))[1];
      const gotUser = await read(socket, ulen);
      const plen = (await read(socket, 1))[0];
      const gotPass = await read(socket, plen);
      if (gotUser.toString() !== user || gotPass.toString() !== password) {
        authFailures += 1;
        return socket.end(Buffer.from([1, 1]));
      }
      socket.write(Buffer.from([1, 0]));
      const req = await read(socket, 4);
      let host: string;
      if (req[3] === 3) host = (await read(socket, (await read(socket, 1))[0])).toString();
      else if (req[3] === 1) host = (await read(socket, 4)).join(".");
      else host = (await read(socket, 16)).toString("hex");
      const port = (await read(socket, 2)).readUInt16BE(0);
      connects.push([host, port]);
      socket.write(Buffer.from([5, 0, 0, 1, 0, 0, 0, 0, 0, 0]));
      if (!options.keepOpen) {
        socket.end();
        return;
      }
      // Echo mode: keep the tunnel open and record every byte the bridge sends.
      socket.on("data", (chunk) => {
        received.push(chunk);
        socket.write(chunk);
      });
    } catch {
      socket.destroy();
    }
  }

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({
        port: typeof address === "object" && address ? address.port : 0,
        connects,
        received,
        get authFailures() {
          return authFailures;
        },
        close: () => new Promise((done) => server.close(() => done())),
      });
    });
  });
}

function credential(upstream: Upstream, password = PASS): SocksBridgeCredential {
  return { host: "127.0.0.1", port: upstream.port, username: USER, password };
}

function bridgeAuth(server: string): string {
  const url = new URL(server);
  const user = decodeURIComponent(url.username);
  const pass = decodeURIComponent(url.password);
  return `Proxy-Authorization: Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
}

function request(
  bridge: { port: number; server: string },
  payload: string
): Promise<{ status: number; body: string }> {
  const authed = payload.replace("\r\n", `\r\n${bridgeAuth(bridge.server)}\r\n`, 1);
  return new Promise((resolve) => {
    const socket = net.connect(bridge.port, "127.0.0.1");
    let buf = "";
    socket.on("data", (chunk) => {
      buf += chunk.toString();
    });
    socket.on("end", () => {
      const [head, body = ""] = buf.split("\r\n\r\n");
      const status = Number(head.split(" ")[1]);
      resolve({ status, body });
    });
    socket.on("error", () => resolve({ status: 0, body: "" }));
    socket.end(authed);
  });
}

// No credential injected: stands in for another local process that only knows the port.
function rawRequest(port: number, payload: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve) => {
    const socket = net.connect(port, "127.0.0.1");
    let buf = "";
    socket.on("data", (chunk) => {
      buf += chunk.toString();
    });
    socket.on("end", () => {
      const [head, body = ""] = buf.split("\r\n\r\n");
      resolve({ status: Number(head.split(" ")[1]), body });
    });
    socket.on("error", () => resolve({ status: 0, body: "" }));
    socket.end(payload);
  });
}

function sendAndCollect(
  bridge: { port: number; server: string },
  payload: string,
  until: string
): Promise<{ status: number; body: string }> {
  const authed = payload.replace("\r\n", `\r\n${bridgeAuth(bridge.server)}\r\n`, 1);
  return new Promise((resolve) => {
    const socket = net.connect(bridge.port, "127.0.0.1");
    let buf = "";
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      const [head, body = ""] = buf.split("\r\n\r\n");
      resolve({ status: Number(head.split(" ")[1]), body });
      socket.destroy();
    };
    socket.on("data", (chunk) => {
      buf += chunk.toString();
      if (buf.includes(until)) done();
    });
    socket.on("error", done);
    socket.on("end", done);
    setTimeout(done, 3000).unref();
    socket.write(authed);
  });
}

function startSilentUpstream(): Promise<{ port: number; close: () => Promise<void> }> {
  const sockets: net.Socket[] = [];
  const server = net.createServer((socket) => {
    // Accept and never answer the SOCKS handshake.
    sockets.push(socket);
    socket.on("error", () => socket.destroy());
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({
        port: typeof address === "object" && address ? address.port : 0,
        close: () =>
          new Promise((done) => {
            for (const socket of sockets) socket.destroy();
            server.close(() => done());
          }),
      });
    });
  });
}

describe("authenticated SOCKS5 bridge", () => {
  afterEach(() => closeAllSocksBridges());

  it("tunnels CONNECT through the upstream with the credential", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const res = await request(bridge, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      assert.equal(res.status, 200);
      assert.deepEqual(upstream.connects, [["example.com", 443]]);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("refuses a CONNECT that does not carry the bridge credential", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const res = await rawRequest(
        bridge.port,
        "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n"
      );
      assert.equal(res.status, 407);
      assert.deepEqual(upstream.connects, []);
      assert.match(bridge.server, /^http:\/\/forge:[^@]+@127\.0\.0\.1:\d+$/);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("rejects a wrong password with 502 and opens nothing onward", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream, "nope"));
    try {
      const res = await request(bridge, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      assert.equal(res.status, 502);
      assert.deepEqual(upstream.connects, []);
      assert.equal(upstream.authFailures, 1);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("shares one bridge per credential and separates different passwords", async () => {
    const upstream = await startUpstream(USER, PASS);
    const first = await acquireSocksBridge(credential(upstream));
    const second = await acquireSocksBridge(credential(upstream));
    const third = await acquireSocksBridge(credential(upstream, "different"));
    try {
      assert.equal(second.port, first.port);
      assert.notEqual(third.port, first.port);
      assert.equal(socksBridgeCount(), 2);
      const ok = await request(first, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      const foreign = await request(third, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      assert.equal(ok.status, 200);
      assert.equal(foreign.status, 502);
      assert.deepEqual(upstream.connects, [["example.com", 443]]);
      assert.equal(upstream.authFailures, 1);
    } finally {
      await first.close();
      await second.close();
      await third.close();
      await upstream.close();
    }
  });

  it("refuses GET, absolute-form CONNECT and userinfo without dialing", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const get = await request(bridge, "GET http://example.com/ HTTP/1.1\r\nHost: example.com\r\n\r\n");
      const absolute = await request(bridge, "CONNECT http://example.com:443 HTTP/1.1\r\n\r\n");
      const userinfo = await request(bridge, "CONNECT user:pass@example.com:443 HTTP/1.1\r\n\r\n");
      assert.deepEqual([get.status, absolute.status, userinfo.status], [405, 405, 405]);
      assert.deepEqual(upstream.connects, []);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("severs an established tunnel when the bridge closes", async () => {
    const upstream = await startUpstream(USER, PASS, { keepOpen: true });
    const bridge = await acquireSocksBridge(credential(upstream));
    const client = net.connect(bridge.port, "127.0.0.1");
    try {
      await new Promise<void>((resolve) => client.once("connect", () => resolve()));
      const established = new Promise<void>((resolve) => client.once("data", () => resolve()));
      client.write("CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      await established;
      const closed = new Promise<boolean>((resolve) => client.once("close", () => resolve(true)));
      await bridge.close();
      const severed = await Promise.race([
        closed,
        new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 300).unref()),
      ]);
      assert.equal(severed, true);
    } finally {
      client.destroy();
      await bridge.close();
      await upstream.close();
    }
  });

  it("resolves close when a client connects but never sends CONNECT", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    let idle: net.Socket | null = null;
    try {
      idle = net.connect(bridge.port, "127.0.0.1");
      await new Promise<void>((resolve) => idle?.once("connect", () => resolve()));
      // The accepted socket never becomes a tunnel; shutdown must not wait on it.
      const outcome = await Promise.race([
        bridge.close().then(() => "closed"),
        new Promise((resolve) => setTimeout(() => resolve("timeout"), 2000)),
      ]);
      assert.equal(outcome, "closed");
      assert.equal(socksBridgeCount(), 0);
    } finally {
      // Destroy first: if tracking regressed, close() would otherwise wait on
      // this socket and the failure would surface as a hang, not a red test.
      idle?.destroy();
      await bridge.close();
      await upstream.close();
    }
  });

  it("forwards a bracketed IPv6 CONNECT target as an address", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const res = await request(bridge, "CONNECT [::1]:443 HTTP/1.1\r\nHost: [::1]:443\r\n\r\n");
      assert.equal(res.status, 200);
      // ATYP 4 carries the 16-byte address, not a bracketed domain name.
      assert.deepEqual(upstream.connects, [["00000000000000000000000000000001", 443]]);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("refuses an unbracketed multi-colon authority", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const res = await request(bridge, "CONNECT a:b:443 HTTP/1.1\r\n\r\n");
      assert.equal(res.status, 405);
      assert.deepEqual(upstream.connects, []);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("a stale handle does not evict a successor built for the same credential", async () => {
    const upstream = await startUpstream(USER, PASS);
    const first = await acquireSocksBridge(credential(upstream));
    await closeAllSocksBridges();
    const second = await acquireSocksBridge(credential(upstream));
    try {
      await first.close();
      assert.equal(socksBridgeCount(), 1);
      const res = await request(second, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      assert.equal(res.status, 200);
    } finally {
      await second.close();
      await upstream.close();
    }
    assert.equal(socksBridgeCount(), 0);
  });

  it("bridges a proxy whose stored host still carries brackets", async () => {
    const upstream = await startUpstream(USER, PASS);
    const { bridge } = await resolveExecutorProxy({
      type: "socks5",
      host: "[127.0.0.1]",
      port: upstream.port,
      username: USER,
      password: PASS,
    });
    try {
      assert.ok(bridge);
      const res = await request(bridge, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      assert.equal(res.status, 200);
      assert.deepEqual(upstream.connects, [["example.com", 443]]);
    } finally {
      await bridge?.close();
      await upstream.close();
    }
  });

  it("forwards bytes pipelined behind the CONNECT headers", async () => {
    const upstream = await startUpstream(USER, PASS, { keepOpen: true });
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const res = await sendAndCollect(bridge,
        "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\nEARLYBYTES",
        "EARLYBYTES"
      );
      assert.equal(res.status, 200);
      assert.equal(res.body, "EARLYBYTES");
      assert.equal(Buffer.concat(upstream.received).toString(), "EARLYBYTES");
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("pins the hop to the requested family", async () => {
    const upstream = await startUpstream(USER, PASS);
    const base = {
      type: "socks5",
      host: "localhost",
      port: upstream.port,
      username: USER,
      password: PASS,
    };
    const four = await resolveExecutorProxy({ ...base, family: "ipv4" });
    const six = await resolveExecutorProxy({ ...base, family: "ipv6" });
    try {
      assert.ok(four.bridge);
      assert.ok(six.bridge);
      // Family is part of the credential identity: two directives, two bridges.
      assert.notEqual(four.bridge.port, six.bridge.port);
      const ok = await request(four.bridge,
        "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n"
      );
      assert.equal(ok.status, 200);
      // The upstream listens on IPv4 only, so an IPv6-pinned hop cannot reach it.
      const pinned = await request(six.bridge,
        "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n"
      );
      assert.equal(pinned.status, 502);
    } finally {
      await four.bridge?.close();
      await six.bridge?.close();
      await upstream.close();
    }
  });

  it("fails a stalled handshake when the timeout expires", async () => {
    const previous = process.env.SOCKS_HANDSHAKE_TIMEOUT_MS;
    process.env.SOCKS_HANDSHAKE_TIMEOUT_MS = "150";
    const silent = await startSilentUpstream();
    const bridge = await acquireSocksBridge({
      host: "127.0.0.1",
      port: silent.port,
      username: USER,
      password: PASS,
    });
    try {
      const started = Date.now();
      const res = await Promise.race([
        request(bridge, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n"),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000).unref()),
      ]);
      assert.ok(res, "handshake timeout not applied (request still pending after 5 s)");
      const elapsed = Date.now() - started;
      assert.equal(res.status, 502);
      assert.ok(elapsed < 2000, `handshake timeout not applied (${elapsed} ms)`);
    } finally {
      if (previous === undefined) delete process.env.SOCKS_HANDSHAKE_TIMEOUT_MS;
      else process.env.SOCKS_HANDSHAKE_TIMEOUT_MS = previous;
      await bridge.close();
      await silent.close();
    }
  });

  it("survives a client reset while the handshake is pending", async () => {
    const previousTimeout = process.env.SOCKS_HANDSHAKE_TIMEOUT_MS;
    process.env.SOCKS_HANDSHAKE_TIMEOUT_MS = "300";
    const silent = await startSilentUpstream();
    const bridge = await acquireSocksBridge({
      host: "127.0.0.1",
      port: silent.port,
      username: USER,
      password: PASS,
    });
    try {
      const client = net.connect(bridge.port, "127.0.0.1");
      await new Promise<void>((resolve) => client.once("connect", () => resolve()));
      client.write("CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      await new Promise((resolve) => setTimeout(resolve, 50));
      client.resetAndDestroy();
      // An unhandled 'error' on the accepted socket would take the process down
      // before the next line; the bridge itself must stay registered.
      await new Promise((resolve) => setTimeout(resolve, 300));
      assert.equal(socksBridgeCount(), 1);
    } finally {
      if (previousTimeout === undefined) delete process.env.SOCKS_HANDSHAKE_TIMEOUT_MS;
      else process.env.SOCKS_HANDSHAKE_TIMEOUT_MS = previousTimeout;
      await bridge.close();
      await silent.close();
    }
  });

  it("refuses a bracketed non-address authority", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const res = await request(bridge, "CONNECT [example.com]:443 HTTP/1.1\r\n\r\n");
      assert.equal(res.status, 405);
      assert.deepEqual(upstream.connects, []);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("refuses a zone-scoped IPv6 authority", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const res = await request(bridge, "CONNECT [fe80::1%eth0]:443 HTTP/1.1\r\n\r\n");
      assert.equal(res.status, 405);
      assert.deepEqual(upstream.connects, []);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("refuses a credential longer than the SOCKS5 length prefix", async () => {
    const upstream = await startUpstream(USER, PASS);
    try {
      await assert.rejects(
        () => acquireSocksBridge({ ...credential(upstream), password: "x".repeat(256) }),
        /exceeds the 255-byte length prefix/
      );
      // Bytes, not characters: 90 three-byte characters are already over.
      await assert.rejects(
        () => acquireSocksBridge({ ...credential(upstream), username: "密".repeat(90) }),
        /exceeds the 255-byte length prefix/
      );
      const fits = await acquireSocksBridge({ ...credential(upstream), password: "x".repeat(255) });
      await fits.close();
      assert.equal(socksBridgeCount(), 0);
    } finally {
      await upstream.close();
    }
  });

  it("normalises a non-string credential before the handshake", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge({
      host: "127.0.0.1",
      port: upstream.port,
      username: Buffer.from(USER) as never,
      password: Buffer.from(PASS) as never,
    });
    try {
      const res = await request(bridge,
        "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n"
      );
      assert.equal(res.status, 200);
      assert.deepEqual(upstream.connects, [["example.com", 443]]);
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("listens on loopback only", async (t) => {
    const external = Object.values(os.networkInterfaces())
      .flat()
      .find((info) => info?.family === "IPv4" && !info.internal)?.address;
    if (!external) {
      t.skip("no non-loopback IPv4 address on this host");
      return;
    }
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      const outcome = await new Promise<"reachable" | "refused" | "unknown">((resolve) => {
        const socket = net.connect(bridge.port, external);
        const finish = (value: "reachable" | "refused" | "unknown") => {
          socket.destroy();
          resolve(value);
        };
        socket.once("connect", () => finish("reachable"));
        socket.once("error", () => finish("refused"));
        setTimeout(() => finish("unknown"), 2000).unref();
      });
      // A timeout proves nothing either way (a firewall can drop the probe).
      if (outcome === "unknown") {
        t.skip("no verdict from the non-loopback address");
        return;
      }
      assert.equal(outcome, "refused");
    } finally {
      await bridge.close();
      await upstream.close();
    }
  });

  it("leaves a bridge owned by another executor alone when the pool shuts down", async () => {
    const upstream = await startUpstream(USER, PASS);
    const bridge = await acquireSocksBridge(credential(upstream));
    try {
      // gemini-web keeps its own browser lease, so a pool shutdown caused by an
      // unrelated context must not close the bridge a gemini request is using.
      await shutdownPool("bridge-test");
      assert.equal(socksBridgeCount(), 1);
      const res = await request(bridge, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      assert.equal(res.status, 200);
    } finally {
      await bridge.close();
      await upstream.close();
    }
    assert.equal(socksBridgeCount(), 0);
  });

  it("two callers arriving together share one listener", async () => {
    const upstream = await startUpstream(USER, PASS);
    const [first, second] = await Promise.all([
      acquireSocksBridge(credential(upstream)),
      acquireSocksBridge(credential(upstream)),
    ]);
    try {
      assert.equal(second.port, first.port);
      assert.equal(socksBridgeCount(), 1);
      // Each caller holds its own reference: releasing one must not tear down
      // the listener the other is still using.
      await first.close();
      assert.equal(socksBridgeCount(), 1);
      const res = await request(second,
        "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n"
      );
      assert.equal(res.status, 200);
    } finally {
      await first.close();
      await second.close();
      await upstream.close();
    }
    assert.equal(socksBridgeCount(), 0);
  });

  it("a second close does not release another caller's bridge", async () => {
    const upstream = await startUpstream(USER, PASS);
    const held = await acquireSocksBridge(credential(upstream));
    const extra = await acquireSocksBridge(credential(upstream));
    try {
      await extra.close();
      await extra.close();
      assert.equal(socksBridgeCount(), 1);
      const res = await request(held, "CONNECT example.com:443 HTTP/1.1\r\nHost: example.com:443\r\n\r\n");
      assert.equal(res.status, 200);
    } finally {
      await held.close();
      await upstream.close();
    }
    assert.equal(socksBridgeCount(), 0);
  });
});
