import assert from "node:assert/strict";
import net from "node:net";
import { describe, it } from "node:test";
import { SocksClient } from "socks";
import {
  SOCKS_CREDENTIAL_TOO_LONG,
  assertSocksCredentialFits,
  socksConnectorWithFamily,
} from "../../open-sse/utils/socksConnectorWithFamily.ts";
import {
  createProxyTunnelSocket,
  buildConnectRequest,
} from "../../open-sse/executors/cursor/h2ProxyConnect.ts";

const LONG = "x".repeat(256);
const MAX = "x".repeat(255);
const GUARD = /255-byte length prefix/;

function proxyWith(over: Record<string, unknown> = {}) {
  return {
    host: "127.0.0.1",
    port: 1,
    type: 5,
    userId: "user",
    password: "pass",
    ...over,
  } as never;
}

function dial(connector: ReturnType<typeof socksConnectorWithFamily>): Promise<Error | null> {
  return new Promise((resolve) => {
    connector({ protocol: "http:", hostname: "example.com", port: "80" } as never, (error) =>
      resolve((error as Error | null) ?? null)
    );
  });
}

interface Listener {
  port: number;
  connections: number;
  close: () => Promise<void>;
}

/** Accepts and counts connections, so "refused before the dial" is observable. */
function countingListener(): Promise<Listener> {
  let connections = 0;
  const server = net.createServer((socket) => socket.destroy());
  server.on("connection", () => {
    connections += 1;
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address !== "object" || !address) {
        reject(new Error("Counting listener did not bind"));
        return;
      }
      resolve({
        port: address.port,
        get connections() {
          return connections;
        },
        close: () => new Promise<void>((done) => server.close(() => done())),
      });
    });
  });
}

function socksAuthListener(): Promise<
  Listener & {
    nextCredential: () => Promise<{ userId: string; password: string }>;
  }
> {
  let connections = 0;
  const sockets = new Set<net.Socket>();
  const queued: Array<{ userId: string; password: string }> = [];
  const waiters: Array<(value: { userId: string; password: string }) => void> = [];
  const nextCredential = () => {
    const ready = queued.shift();
    if (ready) return Promise.resolve(ready);
    return new Promise<{ userId: string; password: string }>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("SOCKS auth packet missing")), 1500);
      waiters.push((value) => {
        clearTimeout(timer);
        resolve(value);
      });
    });
  };
  const server = net.createServer((socket) => {
    connections += 1;
    sockets.add(socket);
    socket.once("close", () => sockets.delete(socket));
    let buffer = Buffer.alloc(0);
    let state: "greeting" | "credentials" | "command" = "greeting";
    socket.on("data", (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (state === "greeting") {
        if (buffer.length < 2 || buffer.length < 2 + buffer[1]) return;
        const count = buffer[1];
        const methods = buffer.subarray(2, 2 + count);
        buffer = buffer.subarray(2 + count);
        if (!methods.includes(0x02)) {
          socket.end(Buffer.from([0x05, 0xff]));
          return;
        }
        state = "credentials";
        socket.write(Buffer.from([0x05, 0x02]));
      }
      if (state === "credentials") {
        if (buffer.length < 2) return;
        const userEnd = 2 + buffer[1];
        if (buffer.length < userEnd + 1) return;
        const passwordLength = buffer[userEnd];
        const end = userEnd + 1 + passwordLength;
        if (buffer.length < end) return;
        const received = {
          userId: buffer.subarray(2, userEnd).toString("utf8"),
          password: buffer.subarray(userEnd + 1, end).toString("utf8"),
        };
        const waiter = waiters.shift();
        if (waiter) waiter(received);
        else queued.push(received);
        buffer = buffer.subarray(end);
        state = "command";
        socket.write(Buffer.from([0x01, 0x00]));
      }
      if (state === "command" && buffer.length > 0) {
        buffer = Buffer.alloc(0);
        socket.end(Buffer.from([0x05, 0x05, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
      }
    });
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (typeof address !== "object" || !address) {
        reject(new Error("SOCKS listener did not bind"));
        return;
      }
      resolve({
        port: address.port,
        get connections() {
          return connections;
        },
        nextCredential,
        close: () =>
          new Promise<void>((done) => {
            for (const socket of sockets) socket.destroy();
            server.close(() => done());
          }),
      });
    });
  });
}

/** The Cursor tunnel always ends in an error here; return it instead of throwing. */
async function h2Error(proxyUrl: string): Promise<Error> {
  return createProxyTunnelSocket({ targetHost: "example.com", targetPort: 443, proxyUrl }).then(
    () => {
      throw new Error("expected the tunnel to fail");
    },
    (error: Error) => error
  );
}

describe("SOCKS5 credential length", () => {
  it("refuses an over-long credential without opening a connection", async (t) => {
    const createConnection = t.mock.method(SocksClient, "createConnection");
    const connect = t.mock.method(net, "connect");
    const listener = await countingListener();
    try {
      const error = await dial(
        socksConnectorWithFamily(proxyWith({ port: listener.port, password: LONG }), null)
      );
      assert.match(String(error?.message), GUARD);
      assert.equal(createConnection.mock.calls.length, 0, "the SOCKS client was invoked");
      assert.equal(connect.mock.calls.length, 0, "TCP dialing was invoked");
      assert.equal(listener.connections, 0, "the connector dialed before refusing");
    } finally {
      await listener.close();
    }
  });

  it("counts bytes, not characters", async () => {
    const error = await dial(
      socksConnectorWithFamily(proxyWith({ userId: "密".repeat(90) }), null)
    );
    assert.match(String(error?.message), GUARD);
  });

  it("measures stored credentials without encoding them again", async () => {
    const listener = await countingListener();
    try {
      const raw = "%".repeat(255);
      const proxy = proxyWith({ port: listener.port, userId: raw, password: raw });
      const error = await dial(socksConnectorWithFamily(proxy, null));
      assert.doesNotMatch(String(error?.message), GUARD);
      assert.equal(listener.connections, 1, "the 255-byte stored credential did not dial");
    } finally {
      await listener.close();
    }
  });

  it("sends stored SOCKS credentials to the proxy without decoding them", async () => {
    const listener = await socksAuthListener();
    const percent = String.fromCharCode(37);
    const cases = [
      { userId: MAX, password: MAX },
      { userId: `user${percent}41`, password: "pass" },
      { userId: "user", password: `p${percent}41ss` },
    ];
    try {
      for (let index = 0; index < cases.length; index += 1) {
        const expected = cases[index];
        const proxy = proxyWith({ port: listener.port, ...expected });
        const received = listener.nextCredential();
        const operation = dial(socksConnectorWithFamily(proxy, null));
        const [error, actual] = await Promise.all([operation, received]);
        assert.ok(error, "expected the fixture to refuse the target connection");
        assert.doesNotMatch(String(error.message), GUARD);
        assert.deepEqual(actual, expected);
        assert.equal(listener.connections, index + 1);
      }
    } finally {
      await listener.close();
    }
  });

  it("counts spaces in both credential fields", () => {
    const padding = " ".repeat(45);
    const padded = [
      { userId: padding + MAX },
      { userId: MAX + padding },
      { password: padding + MAX },
      { password: MAX + padding },
    ];
    for (const credential of padded) {
      assert.throws(() => assertSocksCredentialFits(credential, 5), GUARD);
    }
  });

  it("dials the proxy for a 300-byte SOCKS4 user id", async () => {
    const listener = await countingListener();
    try {
      const userId = "x".repeat(300);
      const error = await dial(
        socksConnectorWithFamily(proxyWith({ port: listener.port, type: 4, userId }), null)
      );
      assert.doesNotMatch(String(error?.message), GUARD);
      assert.equal(listener.connections, 1, "the SOCKS4 connector did not dial");
    } finally {
      await listener.close();
    }
  });

  it("refuses either over-long field on the Cursor path without dialing", async (t) => {
    const connect = t.mock.method(net, "connect");
    const createConnection = t.mock.method(SocksClient, "createConnection");
    const listener = await countingListener();
    try {
      const longUser = await h2Error(`socks5://${"u".repeat(256)}:pass@127.0.0.1:${listener.port}`);
      assert.match(String(longUser.message), GUARD);
      const longPass = await h2Error(`socks5://user:${LONG}@127.0.0.1:${listener.port}`);
      assert.match(String(longPass.message), GUARD);
      assert.equal(connect.mock.calls.length, 0, "the Cursor path started a TCP dial");
      assert.equal(createConnection.mock.calls.length, 0, "the SOCKS client was invoked");
      assert.equal(listener.connections, 0, "the Cursor path dialed before refusing");
    } finally {
      await listener.close();
    }
  });

  it("leaves SOCKS4 alone on the Cursor path", async () => {
    const listener = await countingListener();
    try {
      const error = await h2Error(`socks4://${"x".repeat(300)}@127.0.0.1:${listener.port}`);
      assert.doesNotMatch(String(error.message), GUARD);
      assert.equal(listener.connections, 1, "the SOCKS4 tunnel never dialed");
    } finally {
      await listener.close();
    }
  });

  it("measures the decoded credential on the Cursor path", async () => {
    const listener = await countingListener();
    try {
      // 300 URL characters that decode to 100 bytes: allowed, and it dials.
      const fits = await h2Error(`socks5://user:${"%41".repeat(100)}@127.0.0.1:${listener.port}`);
      assert.doesNotMatch(String(fits.message), GUARD);
      assert.equal(listener.connections, 1, "a percent-encoded credential that fits did not dial");
      // 774 URL characters that decode to 258 bytes: refused, no dial.
      const over = await h2Error(
        `socks5://user:${"%E5%AF%86".repeat(86)}@127.0.0.1:${listener.port}`
      );
      assert.match(String(over.message), GUARD);
      assert.equal(listener.connections, 1, "an over-long decoded credential dialed");
    } finally {
      await listener.close();
    }
  });

  it("sends malformed-percent credentials as literal SOCKS5 auth bytes", async () => {
    const listener = await socksAuthListener();
    const percent = String.fromCharCode(37);
    try {
      const userId = `user${percent}zz`;
      const password = `p${percent}ss`;
      const proxy = new URL(`socks5://${userId}:${password}@127.0.0.1:${listener.port}`);
      assert.equal(proxy.username, userId);
      assert.equal(proxy.password, password);
      const received = listener.nextCredential();
      const operation = h2Error(proxy.href);
      const [error, actual] = await Promise.all([operation, received]);
      assert.doesNotMatch(String(error.message), GUARD);
      assert.deepEqual(actual, { userId, password });
      assert.equal(listener.connections, 1);
    } finally {
      await listener.close();
    }
  });

  it("sends exact SOCKS5 credentials for 255-byte and encoded inputs", async () => {
    const listener = await socksAuthListener();
    const at = String.fromCharCode(64);
    const colon = String.fromCharCode(58);
    const percent = String.fromCharCode(37);
    const cases = [
      { userId: "user", password: MAX },
      { userId: MAX, password: "pass" },
      { userId: percent.repeat(255), password: percent.repeat(255) },
      { userId: `user${percent}41`, password: "pass" },
      { userId: "user", password: `p${percent}41ss` },
      { userId: `user${at}x`, password: `p${colon}ss` },
    ];
    try {
      for (let index = 0; index < cases.length; index += 1) {
        const expected = cases[index];
        const proxy = new URL(`socks5://127.0.0.1:${listener.port}`);
        proxy.username = encodeURIComponent(expected.userId);
        proxy.password = encodeURIComponent(expected.password);
        const received = listener.nextCredential();
        const operation = h2Error(proxy.href);
        const [error, actual] = await Promise.all([operation, received]);
        assert.doesNotMatch(String(error.message), GUARD);
        assert.deepEqual(actual, expected);
        assert.equal(
          listener.connections,
          index + 1,
          "SOCKS authentication did not reach the proxy"
        );
      }
    } finally {
      await listener.close();
    }
  });

  it("reports cancellation before credential rejection", async () => {
    const listener = await countingListener();
    try {
      await assert.rejects(
        () =>
          createProxyTunnelSocket({
            targetHost: "example.com",
            targetPort: 443,
            proxyUrl: `socks5://user:${LONG}@127.0.0.1:${listener.port}`,
            signal: AbortSignal.abort(),
          }),
        { message: "aborted" }
      );
    } finally {
      await listener.close();
    }
  });

  it("sends decoded and literal-percent HTTP CONNECT credentials", () => {
    const headerName = String.fromCharCode(
      ...[80, 114, 111, 120, 121, 45, 65, 117, 116, 104, 111, 114, 105, 122, 97, 116, 105, 111, 110]
    );
    const percent = String.fromCharCode(37);
    const cases = [
      { user: "user%40x", pass: "p%3Ass", expected: "user@x:p:ss" },
      { user: "user%25x", pass: "p%25ss", expected: "user%x:p%ss" },
      { user: "user%2541", pass: "pass", expected: "user%41:pass" },
      { user: "user", pass: "p%2541ss", expected: "user:p%41ss" },
      { user: `user${percent}zz`, pass: `p${percent}ss`, expected: "user%zz:p%ss" },
    ];
    for (const { user, pass, expected } of cases) {
      const proxy = new URL("http://127.0.0.1:2080/");
      proxy.username = user;
      proxy.password = pass;
      const request = buildConnectRequest("example.com", 443, proxy).toString("utf8");
      const lines = request.split("\r\n");
      assert.equal(lines[0], "CONNECT example.com:443 HTTP/1.1");
      const headers = lines
        .slice(1)
        .filter((line) => line.toLowerCase().startsWith(headerName.toLowerCase() + ":"));
      const token = Buffer.from(expected, "utf8").toString("base64");
      assert.deepEqual(headers, [headerName + ": Basic " + token]);
    }
  });

  it("reports the credential cause through proxy-aware fetch", async () => {
    const { proxyFetch, runWithProxyContext } = await import("../../open-sse/utils/proxyFetch.ts");
    const { clearDispatcherCache } = await import("../../open-sse/utils/proxyDispatcher.ts");
    const listener = await countingListener();
    try {
      await assert.rejects(
        () =>
          runWithProxyContext(
            {
              type: "socks5",
              host: "127.0.0.1",
              port: listener.port,
              username: "user",
              password: LONG,
            },
            () =>
              proxyFetch("http://credential-cause.example.test/", {
                method: "POST",
                body: "probe",
                signal: AbortSignal.timeout(3000),
              })
          ),
        (error: unknown) => {
          assert.ok(error instanceof Error);
          assert.equal(
            (error as Error & { causeCode?: string }).causeCode,
            SOCKS_CREDENTIAL_TOO_LONG
          );
          assert.match(error.message, /cause SOCKS_CREDENTIAL_TOO_LONG/);
          return true;
        }
      );
      assert.equal(listener.connections, 0, "rejected fetch reached the proxy");
    } finally {
      clearDispatcherCache();
      await listener.close();
    }
  });

  it("accepts the boundary values directly", () => {
    assert.doesNotThrow(() => assertSocksCredentialFits({ userId: "u", password: MAX }));
    assert.throws(() => assertSocksCredentialFits({ userId: "u", password: LONG }), GUARD);
    assert.doesNotThrow(() =>
      assertSocksCredentialFits({ userId: "x".repeat(300), password: LONG }, 4)
    );
  });
});
