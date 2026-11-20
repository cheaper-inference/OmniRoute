import assert from "node:assert/strict";
import net from "node:net";
import { describe, it } from "node:test";
import {
  SOCKS_CREDENTIAL_TOO_LONG,
  assertSocksCredentialFits,
  socksConnectorWithFamily,
} from "../../open-sse/utils/socksConnectorWithFamily.ts";
import { createProxyTunnelSocket } from "../../open-sse/executors/cursor/h2ProxyConnect.ts";
import { extractTransportCauseCode } from "../../open-sse/utils/proxyFetchRedaction.ts";

const LONG = "x".repeat(256);
const MAX = "x".repeat(255);
const GUARD = /255-byte length prefix/;

function proxyWith(over: Record<string, unknown> = {}) {
  return { host: "127.0.0.1", port: 1, type: 5, userId: "user", password: "pass", ...over } as never;
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
  const server = net.createServer((socket) => {
    connections += 1;
    socket.destroy();
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({
        port: typeof address === "object" && address ? address.port : 0,
        get connections() {
          return connections;
        },
        close: () => new Promise((done) => server.close(() => done())),
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
  it("refuses an over-long credential without opening a connection", async () => {
    const listener = await countingListener();
    try {
      const error = await dial(
        socksConnectorWithFamily(proxyWith({ port: listener.port, password: LONG }), null)
      );
      assert.match(String(error?.message), GUARD);
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

  it("lets a 255-byte credential through to the dial", async () => {
    // Nothing listens on port 1, so the connector fails at connect time; the
    // point is that it is not the credential guard that rejected it.
    const error = await dial(socksConnectorWithFamily(proxyWith({ password: MAX }), null));
    assert.ok(error, "expected a connection error");
    assert.doesNotMatch(String(error?.message), GUARD);
  });

  it("leaves SOCKS4 alone, where no length prefix exists", async () => {
    const error = await dial(
      socksConnectorWithFamily(proxyWith({ type: 4, userId: "x".repeat(300) }), null)
    );
    assert.doesNotMatch(String(error?.message), GUARD);
  });

  it("refuses either over-long field on the Cursor path without dialing", async () => {
    const listener = await countingListener();
    try {
      const longUser = await h2Error(`socks5://${"u".repeat(256)}:pass@127.0.0.1:${listener.port}`);
      assert.match(String(longUser.message), GUARD);
      const longPass = await h2Error(`socks5://user:${LONG}@127.0.0.1:${listener.port}`);
      assert.match(String(longPass.message), GUARD);
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
      const over = await h2Error(`socks5://user:${"%E5%AF%86".repeat(86)}@127.0.0.1:${listener.port}`);
      assert.match(String(over.message), GUARD);
      assert.equal(listener.connections, 1, "an over-long decoded credential dialed");
    } finally {
      await listener.close();
    }
  });

  it("treats a literal % in a credential as a character, not a parse error", async () => {
    const listener = await countingListener();
    try {
      const error = await h2Error(`socks5://user:pa%ss@127.0.0.1:${listener.port}`);
      assert.doesNotMatch(String(error.message), /URI malformed/);
      assert.doesNotMatch(String(error.message), GUARD);
      assert.equal(listener.connections, 1, "the credential with a literal % never dialed");
    } finally {
      await listener.close();
    }
  });

  it("lets 255 bytes reach the dial on the Cursor path", async () => {
    const error = await h2Error(`socks5://user:${MAX}@127.0.0.1:1`);
    assert.doesNotMatch(String(error.message), GUARD);
  });

  it("marks the refusal so the fetch path reports the cause", async () => {
    const error = await dial(socksConnectorWithFamily(proxyWith({ password: LONG }), null));
    assert.equal((error as (Error & { code?: string }) | null)?.code, SOCKS_CREDENTIAL_TOO_LONG);
    assert.equal(extractTransportCauseCode({ cause: error }), SOCKS_CREDENTIAL_TOO_LONG);
  });

  it("accepts the boundary values directly", () => {
    assert.doesNotThrow(() => assertSocksCredentialFits({ userId: "u", password: MAX }));
    assert.throws(() => assertSocksCredentialFits({ userId: "u", password: LONG }), GUARD);
    assert.doesNotThrow(() =>
      assertSocksCredentialFits({ userId: "x".repeat(300), password: LONG }, 4)
    );
  });
});
