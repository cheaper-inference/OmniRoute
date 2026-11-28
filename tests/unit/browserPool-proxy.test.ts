import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  acquireBrowserContext,
  getBrowserPoolMetrics,
  getBrowserPoolStatus,
  resolveBrowserContextProxy,
  resolvePlainBrowserLaunchOptions,
  resolvePlaywrightProxy,
  resolvePlaywrightProxyForConnection,
  resolveConnectionScopedProxy,
  shutdownPool,
  __resetBrowserPoolMetricsForTest,
} from "../../open-sse/services/browserPool.ts";

describe("resolvePlainBrowserLaunchOptions", () => {
  it("keeps existing browser-pool callers headless by default", () => {
    const options = resolvePlainBrowserLaunchOptions({});

    assert.equal(options.headless, true);
    assert.equal(options.executablePath, undefined);
    assert.equal(options.args?.includes("--window-position=-32000,-32000"), false);
  });

  it("uses an explicitly selected system browser for headed first-party sessions", () => {
    const options = resolvePlainBrowserLaunchOptions({
      headless: false,
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });

    assert.equal(options.headless, false);
    assert.equal(
      options.executablePath,
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    );
    assert.equal(options.args?.includes("--window-position=-32000,-32000"), true);
  });

  // A host can have Chrome installed and no Playwright-managed headless shell; before
  // this, the explicit path was dropped in headless mode and the launch failed with
  // "Executable doesn't exist at .../chromium_headless_shell-<rev>/...". The executor
  // resolves a real Chrome, so headless must honour it too.
  it("honours an explicitly selected system browser in headless mode", () => {
    const options = resolvePlainBrowserLaunchOptions({
      headless: true,
      executablePath: "/usr/bin/google-chrome",
    });

    assert.equal(options.headless, true);
    assert.equal(options.executablePath, "/usr/bin/google-chrome");
    assert.equal(options.args?.includes("--window-position=-32000,-32000"), false);
  });
});

describe("resolvePlaywrightProxy", () => {
  it("returns undefined when no proxy is configured", async () => {
    const proxy = await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async () => null,
    });
    assert.strictEqual(proxy, undefined);
  });

  it("formats http proxy server string", async () => {
    const proxy = await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async () => ({ type: "http", host: "proxy.example.com", port: 8080 }),
    });
    assert.deepStrictEqual(proxy, { server: "http://proxy.example.com:8080" });
  });

  it("formats socks5 proxy server string", async () => {
    const proxy = await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async () => ({ type: "socks5", host: "socks.example.com", port: 1080 }),
    });
    assert.deepStrictEqual(proxy, { server: "socks5://socks.example.com:1080" });
  });

  it("defaults to http scheme when type is absent", async () => {
    const proxy = await resolvePlaywrightProxy("claude-web", {
      resolveProxy: async () => ({ host: "proxy.example.com", port: 3128 }),
    });
    assert.deepStrictEqual(proxy, { server: "http://proxy.example.com:3128" });
  });

  it("includes credentials when username is set", async () => {
    const proxy = await resolvePlaywrightProxy("claude-web", {
      resolveProxy: async () => ({
        type: "http",
        host: "proxy.example.com",
        port: 3128,
        username: "user",
        password: "pass",
      }),
    });
    assert.deepStrictEqual(proxy, {
      server: "http://proxy.example.com:3128",
      username: "user",
      password: "pass",
    });
  });

  it("uses empty string for password when null", async () => {
    const proxy = await resolvePlaywrightProxy("claude-web", {
      resolveProxy: async () => ({
        type: "http",
        host: "proxy.example.com",
        port: 3128,
        username: "user",
        password: null,
      }),
    });
    assert.deepStrictEqual(proxy, {
      server: "http://proxy.example.com:3128",
      username: "user",
      password: "",
    });
  });

  it("rejects when the resolver throws instead of serving a direct context", async () => {
    await assert.rejects(
      resolvePlaywrightProxy("gemini-web", {
        resolveProxy: async () => {
          throw new Error("no such table: proxy_registry");
        },
      }),
      (err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        assert.match(message, /refusing direct connection \(fail-closed\)/);
        assert.match(message, /gemini-web/);
        return true;
      }
    );
  });

  it("passes the actual provider key to the resolver", async () => {
    let capturedKey = "";
    await resolvePlaywrightProxy("gemini-web", {
      resolveProxy: async (id) => {
        capturedKey = id;
        return null;
      },
    });
    assert.strictEqual(capturedKey, "gemini-web");
  });

  it("allows a scoped context key to use its stable provider key for proxy lookup", async () => {
    let capturedKey = "";
    const proxy = await resolveBrowserContextProxy(
      "claude-web:account-scope",
      { proxyProviderKey: "claude-web" },
      {
        resolveProxy: async (id) => {
          capturedKey = id;
          return { type: "http", host: "proxy.example.com", port: 8080 };
        },
      }
    );

    assert.equal(capturedKey, "claude-web");
    assert.deepEqual(proxy, { server: "http://proxy.example.com:8080" });
  });
});

describe("acquireBrowserContext proxy lookup failure", () => {
  it("rejects instead of creating a browser context without the assigned proxy", async () => {
    const playwright = await import("playwright");
    const originalLaunch = playwright.chromium.launch;
    const originalDataDir = process.env.DATA_DIR;
    const originalPoolFlag = process.env.OMNIROUTE_BROWSER_POOL;
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-browser-pool-proxy-"));
    let newContextCalls = 0;
    // A regular file used as a directory: the DB layer's module-level DATA_DIR calls
    // mkdirSync on first proxy lookup and fails with ENOTDIR, which resolveWritableDataDir
    // propagates. That failed module evaluation stays cached for the whole process, so no
    // test after this one in this file may touch the DB.
    fs.writeFileSync(path.join(root, "not-a-directory"), "");
    process.env.DATA_DIR = path.join(root, "not-a-directory", "data");
    process.env.OMNIROUTE_BROWSER_POOL = "on";
    playwright.chromium.launch = (async () => ({
      isConnected: () => true,
      newContext: async () => {
        newContextCalls++;
        return { close: async () => undefined };
      },
      close: async () => undefined,
    })) as never;
    __resetBrowserPoolMetricsForTest();
    try {
      await assert.rejects(
        acquireBrowserContext("gemini-web", { cookieDomain: "gemini-web.test" }),
        /fail-closed/
      );
      await assert.rejects(
        acquireBrowserContext("gemini-web", { cookieDomain: "gemini-web.test" }),
        /fail-closed/
      );
      assert.equal(newContextCalls, 0);
      assert.equal(getBrowserPoolStatus().contexts, 0);
      assert.equal(getBrowserPoolMetrics().metrics.contextCreateFailures, 2);
    } finally {
      playwright.chromium.launch = originalLaunch;
      if (originalDataDir === undefined) delete process.env.DATA_DIR;
      else process.env.DATA_DIR = originalDataDir;
      if (originalPoolFlag === undefined) delete process.env.OMNIROUTE_BROWSER_POOL;
      else process.env.OMNIROUTE_BROWSER_POOL = originalPoolFlag;
      await shutdownPool("test-cleanup");
      fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });
});

describe("acquireBrowserContext proxy forwarding", () => {
  it("hands the resolved provider proxy to browser.newContext", async () => {
    const playwright = await import("playwright");
    const originalLaunch = playwright.chromium.launch;
    const originalPoolFlag = process.env.OMNIROUTE_BROWSER_POOL;
    const seen: Array<Record<string, unknown>> = [];
    process.env.OMNIROUTE_BROWSER_POOL = "on";
    playwright.chromium.launch = (async () => ({
      isConnected: () => true,
      newContext: async (options: Record<string, unknown>) => {
        seen.push(options);
        return { close: async () => undefined, on: () => undefined, pages: () => [] };
      },
      close: async () => undefined,
    })) as never;
    __resetBrowserPoolMetricsForTest();
    try {
      const pooled = await acquireBrowserContext("gemini-web", {
        cookieDomain: "gemini-web.test",
        proxyDeps: {
          resolveProxy: async () => ({ host: "10.0.0.9", port: 1080, type: "socks5" }),
        },
      });
      assert.equal(seen.length, 1);
      assert.deepEqual(seen[0].proxy, { server: "socks5://10.0.0.9:1080" });
      assert.equal(typeof pooled.context.close, "function");
    } finally {
      playwright.chromium.launch = originalLaunch;
      if (originalPoolFlag === undefined) delete process.env.OMNIROUTE_BROWSER_POOL;
      else process.env.OMNIROUTE_BROWSER_POOL = originalPoolFlag;
      await shutdownPool("test-cleanup");
    }
  });
});

describe("resolvePlaywrightProxyForConnection", () => {
  it("prefers the connection-scoped proxy and never consults the provider resolver", async () => {
    let providerCalls = 0;
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", "conn-1", {
      resolveProxy: async () => {
        providerCalls += 1;
        return { host: "provider.example.com", port: 8080 };
      },
      resolveConnectionProxy: async () => ({
        type: "socks5",
        host: "acct.example.com",
        port: 1080,
      }),
    });

    assert.deepStrictEqual(proxy, { server: "socks5://acct.example.com:1080" });
    assert.equal(providerCalls, 0);
  });

  it("falls back to the provider-scoped proxy when the connection has none", async () => {
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", "conn-1", {
      resolveProxy: async () => ({ host: "provider.example.com", port: 8080 }),
      resolveConnectionProxy: async () => null,
    });

    assert.deepStrictEqual(proxy, { server: "http://provider.example.com:8080" });
  });

  it("keeps the provider-scoped behaviour when no connection id is known", async () => {
    let connectionCalls = 0;
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", undefined, {
      resolveProxy: async () => ({ host: "provider.example.com", port: 8080 }),
      resolveConnectionProxy: async () => {
        connectionCalls += 1;
        return null;
      },
    });

    assert.deepStrictEqual(proxy, { server: "http://provider.example.com:8080" });
    assert.equal(connectionCalls, 0);
  });

  // A connection whose assigned pool is dead must not quietly reach the provider
  // from the host IP just because the browser path resolves proxies separately.
  it("refuses direct egress when the connection lookup reports a blocking assignment", async () => {
    let providerCalls = 0;
    await assert.rejects(
      resolvePlaywrightProxyForConnection("gemini-web", "conn-1", {
        resolveProxy: async () => {
          providerCalls += 1;
          return { host: "provider.example.com", port: 8080 };
        },
        resolveConnectionProxy: async () => {
          throw new Error("PROXY_ASSIGNED_UNAVAILABLE: dead pool");
        },
      }),
      (err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        assert.match(message, /refusing direct connection \(fail-closed\)/);
        assert.match(message, /conn-1/);
        assert.match(message, /gemini-web/);
        assert.match(message, /PROXY_ASSIGNED_UNAVAILABLE/);
        return true;
      }
    );
    assert.equal(
      providerCalls,
      0,
      "a blocking assignment must not fall back to the provider proxy"
    );
  });

  it("includes proxy credentials for a connection-scoped proxy", async () => {
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", "conn-1", {
      resolveConnectionProxy: async () => ({
        type: "http",
        host: "acct.example.com",
        port: 3128,
        username: "user",
        password: "pass",
      }),
    });

    assert.deepStrictEqual(proxy, {
      server: "http://acct.example.com:3128",
      username: "user",
      password: "pass",
    });
  });

  it("omits credentials entirely when only a password is present", async () => {
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", "conn-1", {
      resolveConnectionProxy: async () => ({
        type: "http",
        host: "acct.example.com",
        port: 3128,
        username: null,
        password: "orphan-pass",
      }),
    });

    assert.deepStrictEqual(proxy, { server: "http://acct.example.com:3128" });
  });

  it("turns a null password into an empty string for a connection proxy", async () => {
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", "conn-1", {
      resolveConnectionProxy: async () => ({
        type: "http",
        host: "acct.example.com",
        port: 3128,
        username: "user",
        password: null,
      }),
    });

    assert.deepStrictEqual(proxy, {
      server: "http://acct.example.com:3128",
      username: "user",
      password: "",
    });
  });

  it("treats a whitespace-only connection id as absent", async () => {
    let connectionCalls = 0;
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", "   ", {
      resolveProxy: async () => ({ host: "provider.example.com", port: 8080 }),
      resolveConnectionProxy: async () => {
        connectionCalls += 1;
        return null;
      },
    });

    assert.deepStrictEqual(proxy, { server: "http://provider.example.com:8080" });
    assert.equal(connectionCalls, 0);
  });

  it("treats a null connection id as absent without hitting the lookup", async () => {
    let connectionCalls = 0;
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", null, {
      resolveProxy: async () => ({ host: "provider.example.com", port: 8080 }),
      resolveConnectionProxy: async () => {
        connectionCalls += 1;
        return null;
      },
    });

    assert.deepStrictEqual(proxy, { server: "http://provider.example.com:8080" });
    assert.equal(connectionCalls, 0);
  });

  // Trimming only for the truthiness check would still pass the padded value to the
  // lookup, which then misses the row and silently falls back to the provider proxy.
  it("trims a padded connection id before the lookup", async () => {
    let seen = "";
    await resolvePlaywrightProxyForConnection("gemini-web", "  conn-9  ", {
      resolveProxy: async () => null,
      resolveConnectionProxy: async (id: string) => {
        seen = id;
        return null;
      },
    });

    assert.equal(seen, "conn-9");
  });

  it("treats an empty host as no connection proxy and falls back to the provider", async () => {
    const proxy = await resolvePlaywrightProxyForConnection("gemini-web", "conn-1", {
      resolveProxy: async () => ({ host: "provider.example.com", port: 8080 }),
      resolveConnectionProxy: async () => ({ host: "", port: 0 }),
    });

    assert.deepStrictEqual(proxy, { server: "http://provider.example.com:8080" });
  });
});

describe("resolveConnectionScopedProxy", () => {
  it("returns the account proxy when one is assigned", async () => {
    const proxy = await resolveConnectionScopedProxy("conn-1", {
      resolveProxyForConnection: async () => ({
        proxy: { type: "socks5", host: "acct.example.com", port: 1080 },
      }),
      hasBlockingProxyAssignment: () => false,
    });

    assert.deepStrictEqual(proxy, { type: "socks5", host: "acct.example.com", port: 1080 });
  });

  it("returns null when the account has no proxy and nothing is blocking", async () => {
    const proxy = await resolveConnectionScopedProxy("conn-1", {
      resolveProxyForConnection: async () => ({ proxy: null }),
      hasBlockingProxyAssignment: () => false,
    });

    assert.strictEqual(proxy, null);
  });

  // Without this branch the account would egress from the host IP while the
  // non-browser path refuses, so the browser path would be the leak.
  it("throws PROXY_ASSIGNED_UNAVAILABLE when the account pool is dead", async () => {
    let guardArg = "";
    await assert.rejects(
      resolveConnectionScopedProxy("conn-1", {
        resolveProxyForConnection: async () => ({ proxy: null }),
        hasBlockingProxyAssignment: (id: string) => {
          guardArg = id;
          return true;
        },
      }),
      /PROXY_ASSIGNED_UNAVAILABLE/
    );
    assert.equal(
      guardArg,
      "conn-1",
      "the guard must receive the connection id, not the provider key"
    );
  });

  // The composed production path: the default lookup validates through toProxyRecord, so
  // a malformed payload never reaches Playwright even when the guard says nothing.
  it("rejects a non-numeric port coming through the validating lookup", async () => {
    for (const badPort of [true, [3128], {}, null]) {
      const proxy = await resolveConnectionScopedProxy("conn-1", {
        resolveProxyForConnection: async () => ({
          proxy: { host: "acct.example.com", port: badPort },
        }),
        hasBlockingProxyAssignment: () => false,
      });
      assert.strictEqual(proxy, null, `port ${JSON.stringify(badPort)} must be rejected`);
    }
  });

  // A resolver that resolves to undefined (rather than an object with proxy:null) must
  // behave the same as an unassigned connection: fall through to the provider proxy.
  it("treats an undefined lookup result as unassigned", async () => {
    const proxy = await resolveConnectionScopedProxy("conn-1", {
      resolveProxyForConnection: async () => undefined,
      hasBlockingProxyAssignment: () => false,
    });
    assert.strictEqual(proxy, null);
  });

  // A host-less record must not be mistaken for a usable proxy and fall through to
  // direct egress while the guard says the account's pool is dead.
  it("fails closed when the lookup returns a host-less record but the pool is dead", async () => {
    await assert.rejects(
      resolveConnectionScopedProxy("conn-1", {
        resolveProxyForConnection: async () => ({ proxy: { host: "" } }),
        hasBlockingProxyAssignment: () => true,
      }),
      /PROXY_ASSIGNED_UNAVAILABLE/
    );
  });

  it("passes the connection id through to the lookup unchanged", async () => {
    let seen = "";
    await resolveConnectionScopedProxy("conn-42", {
      resolveProxyForConnection: async (id: string) => {
        seen = id;
        return { proxy: null };
      },
      hasBlockingProxyAssignment: () => false,
    });

    assert.equal(seen, "conn-42");
  });

  // The DB payload is untyped, so a bad port would otherwise reach Playwright as
  // `http://host:NaN` and fail there instead of being rejected here.
  it("rejects a record whose port is not numeric", async () => {
    const proxy = await resolveConnectionScopedProxy("conn-1", {
      resolveProxyForConnection: async () => ({ proxy: { host: "acct.example.com", port: "abc" } }),
      hasBlockingProxyAssignment: () => false,
    });

    assert.strictEqual(proxy, null);
  });

  it("rejects a record whose port is out of range", async () => {
    for (const port of [0, -1, 70000]) {
      const proxy = await resolveConnectionScopedProxy("conn-1", {
        resolveProxyForConnection: async () => ({ proxy: { host: "acct.example.com", port } }),
        hasBlockingProxyAssignment: () => false,
      });
      assert.strictEqual(proxy, null, `port ${port} should be rejected`);
    }
  });

  it("accepts a numeric string port", async () => {
    const proxy = await resolveConnectionScopedProxy("conn-1", {
      resolveProxyForConnection: async () => ({
        proxy: { host: "acct.example.com", port: "3128" },
      }),
      hasBlockingProxyAssignment: () => false,
    });

    assert.deepStrictEqual(proxy, { host: "acct.example.com", port: 3128 });
  });

  it("trims surrounding whitespace from the host", async () => {
    const proxy = await resolveConnectionScopedProxy("conn-1", {
      resolveProxyForConnection: async () => ({
        proxy: { host: "  acct.example.com  ", port: 3128 },
      }),
      hasBlockingProxyAssignment: () => false,
    });

    assert.deepStrictEqual(proxy, { host: "acct.example.com", port: 3128 });
  });

  // A healthy account must not depend on the guard at all: the guard exists to refuse
  // an egress, not to gate a working one. (The import timing itself cannot be unit
  // tested because the deps injection bypasses it; this pins the call order.)
  it("returns a usable proxy even when the blocking guard would throw", async () => {
    const proxy = await resolveConnectionScopedProxy("conn-1", {
      resolveProxyForConnection: async () => ({
        proxy: { host: "acct.example.com", port: 3128 },
      }),
      hasBlockingProxyAssignment: () => {
        throw new Error("guard exploded");
      },
    });

    assert.deepStrictEqual(proxy, { host: "acct.example.com", port: 3128 });
  });
});

describe("call-site contract", () => {
  // The helpers are unit tested, but nothing would catch the executor passing the
  // wrong field (or none) into them. mock.module() is unusable under this runner, so
  // pin the call site by reading the source.
  it("gemini-web passes credentials.connectionId to the connection-scoped resolver", () => {
    const src = fs.readFileSync(
      path.join(process.cwd(), "open-sse/executors/gemini-web.ts"),
      "utf8"
    );
    const call = src.match(
      /resolvePlaywrightProxyForConnection\(\s*"gemini-web",\s*([\s\S]*?)\)\s*;/
    );
    assert.ok(call, "gemini-web no longer calls resolvePlaywrightProxyForConnection");
    assert.match(call[1], /credentials\.connectionId/);
  });

  it("resolves the account proxy before creating the browser context", () => {
    const src = fs.readFileSync(
      path.join(process.cwd(), "open-sse/executors/gemini-web.ts"),
      "utf8"
    );
    const resolverAt = src.indexOf("resolvePlaywrightProxyForConnection(");
    const contextAt = src.indexOf("browser.newContext({", resolverAt);
    assert.ok(resolverAt > 0, "resolver call missing");
    assert.ok(contextAt > resolverAt, "newContext must come after the proxy lookup");
  });
});
