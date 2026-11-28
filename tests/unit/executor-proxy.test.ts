import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { resolveExecutorProxy, type ResolvedProxy } from "../../open-sse/utils/executorProxy.ts";
import { closeAllSocksBridges, socksBridgeCount } from "../../open-sse/utils/socksBridge.ts";

afterEach(() => closeAllSocksBridges());

const socks = (over: Partial<ResolvedProxy> = {}): ResolvedProxy => ({
  type: "socks5",
  host: "10.0.0.8",
  port: 1080,
  username: "alice",
  password: "secret",
  ...over,
});

describe("resolveExecutorProxy", () => {
  it("fronts an authenticated SOCKS5 proxy with a loopback bridge", async () => {
    const { proxy, bridge } = await resolveExecutorProxy(socks());
    try {
      assert.equal(bridge !== null, true);
      assert.match(proxy?.server ?? "", /^http:\/\/forge:[^@]+@127\.0\.0\.1:\d+$/);
      assert.equal(proxy?.username, undefined);
      assert.equal(proxy?.password, undefined);
      assert.equal(proxy?.server.includes("alice"), false);
      assert.equal(proxy?.server.includes("secret"), false);
    } finally {
      await bridge?.close();
    }
  });

  it("passes an HTTP proxy through unchanged and builds no bridge", async () => {
    const { proxy, bridge } = await resolveExecutorProxy({
      type: "http",
      host: "10.0.0.9",
      port: 8080,
      username: "bob",
      password: "pw",
    });
    assert.equal(bridge, null);
    assert.equal(proxy?.server, "http://10.0.0.9:8080");
    assert.equal(proxy?.username, "bob");
    assert.equal(socksBridgeCount(), 0);
  });

  it("passes a SOCKS5 proxy without credentials through unchanged", async () => {
    const { proxy, bridge } = await resolveExecutorProxy(socks({ username: "", password: "" }));
    assert.equal(bridge, null);
    assert.equal(proxy?.server, "socks5://10.0.0.8:1080");
    assert.equal(socksBridgeCount(), 0);
  });

  it("refuses a SOCKS5 proxy with a password but no username", async () => {
    await assert.rejects(
      () => resolveExecutorProxy(socks({ username: "", password: "secret" })),
      /password but no username/
    );
    assert.equal(socksBridgeCount(), 0);
  });

  it("keeps the https scheme instead of downgrading it to http", async () => {
    const { proxy, bridge } = await resolveExecutorProxy({
      type: "https",
      host: "10.0.0.7",
      port: 8443,
    });
    assert.equal(bridge, null);
    assert.equal(proxy?.server, "https://10.0.0.7:8443");
  });

  it("keeps a socks4 proxy on its own scheme", async () => {
    const { proxy } = await resolveExecutorProxy({
      type: "socks4",
      host: "10.0.0.6",
      port: 1080,
    });
    assert.equal(proxy?.server, "socks4://10.0.0.6:1080");
  });

  it("bridges when the username is a number", async () => {
    const { bridge } = await resolveExecutorProxy(socks({ username: 5 as never }));
    try {
      assert.equal(bridge !== null, true);
    } finally {
      await bridge?.close();
    }
  });

  it("refuses an edge relay record instead of building an unusable proxy", async () => {
    await assert.rejects(
      () => resolveExecutorProxy({ type: "vercel", host: "relay.example.test", port: 443 }),
      /refusing a direct connection/
    );
  });

  it("refuses a mixed-case relay type", async () => {
    await assert.rejects(
      () => resolveExecutorProxy({ type: "Vercel", host: "relay.example.test", port: 443 }),
      /Edge relay/
    );
  });

  it("refuses a family directive that contradicts a literal address", async () => {
    await assert.rejects(
      () => resolveExecutorProxy(socks({ family: "ipv6" })),
      /contradicts its literal address/
    );
  });

  it("honours the family marker in a legacy proxy string", async () => {
    await assert.rejects(
      () => resolveExecutorProxy("socks5://alice:secret@10.0.0.8:1080?family=ipv6"),
      /contradicts its literal address/
    );
  });

  it("does not echo userinfo when a legacy string carries no scheme", async () => {
    await assert.rejects(
      () => resolveExecutorProxy("alice:secret@10.0.0.8:1080"),
      (err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        assert.equal(message.includes("alice"), false);
        assert.equal(message.includes("secret"), false);
        return true;
      }
    );
  });

  it("treats an empty legacy string as unset", async () => {
    const { proxy, bridge } = await resolveExecutorProxy("   ");
    assert.equal(proxy, undefined);
    assert.equal(bridge, null);
  });

  it("brackets an IPv6 proxy host in the Playwright URL", async () => {
    const { proxy, bridge } = await resolveExecutorProxy({
      type: "http",
      host: "2001:db8::1",
      port: 3128,
    });
    assert.equal(bridge, null);
    assert.equal(proxy?.server, "http://[2001:db8::1]:3128");
  });

  it("keeps an explicit default port instead of replacing it", async () => {
    const { proxy } = await resolveExecutorProxy("http://10.0.0.9:80");
    assert.equal(proxy?.server, "http://10.0.0.9:80");
  });

  it("uses the proxy default port when the legacy string carries none", async () => {
    const { proxy } = await resolveExecutorProxy("http://10.0.0.9");
    assert.equal(proxy?.server, "http://10.0.0.9:8080");
  });

  it("keeps a literal percent in a legacy credential instead of failing", async () => {
    const { bridge } = await resolveExecutorProxy("socks5://alice:p%zz@10.0.0.8:1080");
    try {
      assert.equal(bridge !== null, true);
    } finally {
      await bridge?.close();
    }
  });

  it("bridges an authenticated socks5h proxy the same way as socks5", async () => {
    const { proxy, bridge } = await resolveExecutorProxy(socks({ type: "socks5h" }));
    try {
      assert.equal(bridge !== null, true);
      assert.match(proxy?.server ?? "", /^http:\/\/forge:[^@]+@127\.0\.0\.1:\d+$/);
    } finally {
      await bridge?.close();
    }
  });

  it("resolves a missing record to no proxy", async () => {
    const { proxy, bridge } = await resolveExecutorProxy(null);
    assert.equal(proxy, undefined);
    assert.equal(bridge, null);
  });

  it("resolves a legacy URL string and bridges it when it carries a username", async () => {
    const { proxy, bridge } = await resolveExecutorProxy(
      "socks5://alice:secret@10.0.0.8:1080"
    );
    try {
      assert.equal(bridge !== null, true);
      assert.match(proxy?.server ?? "", /^http:\/\/forge:[^@]+@127\.0\.0\.1:\d+$/);
      assert.equal(proxy?.server.includes("alice"), false);
    } finally {
      await bridge?.close();
    }
  });

  it("resolves a legacy URL string without credentials without a bridge", async () => {
    const { proxy, bridge } = await resolveExecutorProxy("http://10.0.0.9:8080");
    assert.equal(bridge, null);
    assert.equal(proxy?.server, "http://10.0.0.9:8080");
    assert.equal(socksBridgeCount(), 0);
  });

  it("refuses a configured proxy whose port is not a number instead of going direct", async () => {
    await assert.rejects(
      () => resolveExecutorProxy(socks({ port: "not-a-port" })),
      /refusing a direct connection/
    );
    assert.equal(socksBridgeCount(), 0);
  });

  it("refuses a configured proxy without a host instead of going direct", async () => {
    await assert.rejects(
      () => resolveExecutorProxy(socks({ host: "   " })),
      /refusing a direct connection/
    );
    assert.equal(socksBridgeCount(), 0);
  });

  it("refuses a non-SOCKS proxy with no usable port instead of going direct", async () => {
    await assert.rejects(
      () => resolveExecutorProxy({ type: "http", host: "10.0.0.9", port: "not-a-port" }),
      /no usable host and port/
    );
    assert.equal(socksBridgeCount(), 0);
  });

  it("refuses a legacy proxy string it cannot parse instead of going direct", async () => {
    await assert.rejects(
      () => resolveExecutorProxy("10.0.0.8:1080"),
      /Invalid proxy URL; refusing a direct connection/
    );
  });

  it("refuses a legacy proxy string with an unsupported scheme", async () => {
    await assert.rejects(
      () => resolveExecutorProxy("ftp://10.0.0.8:1080"),
      /Unsupported proxy scheme/
    );
  });
});
