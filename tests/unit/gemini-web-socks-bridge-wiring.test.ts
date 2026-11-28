// The executor has to hand a provider-scope authenticated SOCKS5 proxy to the
// browser as a loopback bridge, and release that bridge when the request ends.
// Chromium cannot authenticate to SOCKS5, so a direct handoff would fail there.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-bridge-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const bridges = await import("../../open-sse/utils/socksBridge.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("gemini-web bridges a provider-scope authenticated SOCKS5 proxy and releases it", async () => {
  const created = await proxiesDb.createProxy({
    name: "socks upstream",
    type: "socks5",
    host: "127.0.0.1",
    port: 1,
    username: "alice",
    password: "secret",
  });
  await proxiesDb.assignProxyToScope("provider", "gemini-web", created.id);

  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;
  const contextOptions: Array<{ proxy?: { server?: string } }> = [];
  let contextClosed = false;
  playwright.chromium.launch = (async () => ({
    newContext: async (options: { proxy?: { server?: string } }) => {
      contextOptions.push(options);
      return {
        // The stub never fires "close"; only the executor's own cleanup can
        // release the bridge in this test.
        on: () => undefined,
        addCookies: async () => undefined,
        close: async () => {
          contextClosed = true;
        },
        newPage: async () => ({
          on: () => undefined,
          goto: async () => undefined,
          waitForTimeout: async () => undefined,
          waitForSelector: async (selector: string) =>
            selector.includes(".ql-editor") ? { click: async () => undefined } : null,
          keyboard: { insertText: async () => undefined, press: async () => undefined },
        }),
        cookies: async () => [],
      };
    },
    close: async () => undefined,
  })) as never;

  try {
    const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
    const { resetGeminiBrowserLeaseForTests } =
      await import("../../open-sse/executors/gemini-web/browserLease.ts");
    await resetGeminiBrowserLeaseForTests();
    await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "fake-cookie=abc" },
      signal: AbortSignal.timeout(5000),
      log: null,
    } as never);
    await resetGeminiBrowserLeaseForTests();
  } finally {
    playwright.chromium.launch = originalLaunch;
  }

  const server = contextOptions[0]?.proxy?.server ?? "";
  // Parse only after checking validity so a failed assertion never prints the bridge credential.
  assert.ok(URL.canParse(server), "the browser must receive a valid proxy URL");
  const local = new URL(server);
  assert.ok(
    local.protocol === "http:" && local.hostname === "127.0.0.1" && Number(local.port) > 1,
    "the browser must receive the bridge's allocated loopback HTTP address"
  );
  assert.ok(
    local.pathname === "/" && local.search === "" && local.hash === "",
    "the bridge URL must contain only its authority"
  );
  assert.ok(local.username.length > 0, "the loopback bridge needs its own username");
  assert.ok(local.password.length > 0, "the loopback bridge needs its own password");
  assert.equal(server.includes("alice"), false);
  assert.equal(server.includes("secret"), false);
  assert.equal(contextClosed, true);
  assert.equal(bridges.socksBridgeCount(), 0);
});
