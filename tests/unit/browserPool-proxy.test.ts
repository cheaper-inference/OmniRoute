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
