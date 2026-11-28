import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { after, before, describe, it } from "node:test";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-proxy-host-"));
const previousDataDir = process.env.DATA_DIR;
const previousSecret = process.env.API_KEY_SECRET;
process.env.DATA_DIR = root;
process.env.API_KEY_SECRET = "provider-proxy-host-test";

type Settings = typeof import("../../src/lib/db/settings.ts");
type Proxies = typeof import("../../src/lib/db/proxies.ts");
type ProxyContext = typeof import("../../open-sse/executors/gemini-web/proxyContext.ts");

let settings: Settings;
let proxies: Proxies;
let proxyContext: ProxyContext;

describe("a provider proxy record without a host", () => {
  before(async () => {
    settings = await import("../../src/lib/db/settings.ts");
    proxies = await import("../../src/lib/db/proxies.ts");
    proxyContext = await import("../../open-sse/executors/gemini-web/proxyContext.ts");
  });

  after(() => {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    if (previousSecret === undefined) delete process.env.API_KEY_SECRET;
    else process.env.API_KEY_SECRET = previousSecret;
    fs.rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("fails the lookup instead of falling back to the global proxy or direct", async () => {
    await settings.setProxyForLevel("provider", "gemini-web", { type: "socks5" });

    await assert.rejects(() => proxies.resolveProxyForProvider("gemini-web"), /has no host/);
    // The browser path inherits the refusal rather than creating a direct context.
    await assert.rejects(() => proxyContext.resolveGeminiWebProxy(null), /has no host/);
  });

  it("still resolves a record that has a host", async () => {
    await settings.setProxyForLevel("provider", "gemini-web", {
      type: "socks5h",
      host: "10.0.0.8",
      port: 1080,
      username: "u",
      password: "p",
    });

    const resolved = await proxies.resolveProxyForProvider("gemini-web");
    assert.equal(resolved?.host, "10.0.0.8");
    assert.equal(resolved?.port, 1080);
  });

  it("returns null when no provider proxy is configured", async () => {
    await settings.setProxyForLevel("provider", "gemini-web", null);
    assert.equal(await proxies.resolveProxyForProvider("gemini-web"), null);
  });
});
