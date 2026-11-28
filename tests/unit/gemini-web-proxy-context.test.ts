import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import type { Browser } from "playwright";
import {
  openGeminiContext,
  resolveGeminiWebProxy,
} from "../../open-sse/executors/gemini-web/proxyContext.ts";
import { closeAllSocksBridges, socksBridgeCount } from "../../open-sse/utils/socksBridge.ts";

afterEach(() => closeAllSocksBridges());

const AUTH_SOCKS = {
  type: "socks5",
  host: "127.0.0.1",
  port: 1080,
  username: "u",
  password: "p",
};

const HTTP_PROXY = { type: "http", host: "10.0.0.10", port: 3128 };

type NewContext = Pick<Browser, "newContext">;

function fakeContext() {
  const handlers = new Map<string, Array<() => void>>();
  return {
    on(event: string, callback: () => void) {
      handlers.set(event, [...(handlers.get(event) ?? []), callback]);
    },
    fire(event: string) {
      for (const callback of handlers.get(event) ?? []) callback();
    },
  };
}

async function waitForCount(expected: number): Promise<number> {
  for (let i = 0; i < 100 && socksBridgeCount() !== expected; i += 1) {
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  return socksBridgeCount();
}

describe("resolveGeminiWebProxy", () => {
  it("uses the connection proxy when one resolves", async () => {
    let providerCalls = 0;
    const resolved = await resolveGeminiWebProxy("conn-1", {
      resolveConnectionProxy: async () => ({
        proxy: { type: "http", host: "10.0.0.9", port: 8080 },
      }),
      resolveProviderProxy: async () => {
        providerCalls += 1;
        return undefined;
      },
    });
    assert.equal(resolved.proxy?.server, "http://10.0.0.9:8080");
    assert.equal(resolved.bridge, null);
    assert.equal(providerCalls, 0);
  });

  it("falls back to the gemini-web provider key without a connection id", async () => {
    const keys: string[] = [];
    const resolved = await resolveGeminiWebProxy(undefined, {
      resolveConnectionProxy: async () => {
        throw new Error("connection resolution must not run without an id");
      },
      resolveProviderProxy: async (key) => {
        keys.push(key);
        return HTTP_PROXY;
      },
    });
    assert.deepEqual(keys, ["gemini-web"]);
    assert.equal(resolved.proxy?.server, "http://10.0.0.10:3128");
    assert.equal(resolved.bridge, null);
  });

  it("bridges an authenticated SOCKS5 proxy configured at provider scope", async () => {
    const resolved = await resolveGeminiWebProxy(undefined, {
      resolveProviderProxy: async () => AUTH_SOCKS,
    });
    try {
      assert.equal(resolved.bridge !== null, true);
      assert.match(resolved.proxy?.server ?? "", /^http:\/\/forge:[^@]+@127\.0\.0\.1:\d+$/);
      assert.equal(socksBridgeCount(), 1);
    } finally {
      await resolved.bridge?.close();
    }
  });

  it("falls back to the provider key when the connection has no proxy", async () => {
    const resolved = await resolveGeminiWebProxy("conn-2", {
      resolveConnectionProxy: async () => ({ proxy: null }),
      resolveProviderProxy: async () => HTTP_PROXY,
    });
    assert.equal(resolved.proxy?.server, "http://10.0.0.10:3128");
  });

  it("keeps a connection that turned proxying off direct", async () => {
    let providerCalls = 0;
    const resolved = await resolveGeminiWebProxy("conn-3", {
      resolveConnectionProxy: async () => ({ proxy: null, directBy: "connection-disabled" }),
      resolveProviderProxy: async () => {
        providerCalls += 1;
        return HTTP_PROXY;
      },
    });
    assert.equal(providerCalls, 0);
    assert.equal(resolved.proxy, undefined);
    assert.equal(resolved.bridge, null);
  });

  it("does not fall back past a connection proxy it cannot read", async () => {
    await assert.rejects(
      () =>
        resolveGeminiWebProxy("conn-4", {
          resolveConnectionProxy: async () => ({ proxy: "not a url" }),
          resolveProviderProxy: async () => HTTP_PROXY,
        }),
      /refusing a direct connection/
    );
  });
});

describe("openGeminiContext", () => {
  it("releases the bridge when the context is never created", async () => {
    const browser = {
      newContext: async () => {
        throw new Error("proxy validation failed");
      },
    };
    await assert.rejects(
      () =>
        openGeminiContext(browser as unknown as NewContext, { userAgent: "ua" }, "conn-4", {
          resolveConnectionProxy: async () => ({ proxy: AUTH_SOCKS }),
        }),
      /proxy validation failed/
    );
    assert.equal(socksBridgeCount(), 0);
  });

  it("hands the bridge to the context and releases it on close", async () => {
    const context = fakeContext();
    const browser = { newContext: async () => context };
    const opened = await openGeminiContext(
      browser as unknown as NewContext,
      { userAgent: "ua" },
      "conn-5",
      { resolveConnectionProxy: async () => ({ proxy: AUTH_SOCKS }) }
    );
    assert.equal(opened.bridge !== null, true);
    assert.equal(socksBridgeCount(), 1);
    context.fire("close");
    assert.equal(await waitForCount(0), 0);
  });

  it("passes the provider proxy to newContext when the connection has none", async () => {
    const seen: unknown[] = [];
    const browser = {
      newContext: async (options: unknown) => {
        seen.push(options);
        return fakeContext();
      },
    };
    await openGeminiContext(browser as unknown as NewContext, { userAgent: "ua" }, undefined, {
      resolveProviderProxy: async () => HTTP_PROXY,
    });
    assert.deepEqual(seen[0], { userAgent: "ua", proxy: { server: "http://10.0.0.10:3128" } });
  });
});
