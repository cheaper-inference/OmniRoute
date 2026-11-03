import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { chromium, type Browser, type BrowserContext } from "playwright-core";
import { ChatGptBrowserWorker } from "../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/browser-worker.ts";
import { loginVerificationMarkerPath } from "../../open-sse/vendor/codex-chatgpt-web/browser-login.ts";

test("a browser restart replaces stale CDP ownership once for concurrent callers", async () => {
  const dir = mkdtempSync(join(tmpdir(), "chatgpt-cdp-reconnect-"));
  const storageStatePath = join(dir, "state.json");
  const cookies = [
    {
      name: "_account",
      value: "workspace",
      domain: ".chatgpt.com",
      path: "/",
      expires: -1,
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    },
  ];
  writeFileSync(
    storageStatePath,
    JSON.stringify({ cookies, origins: [], omnirouteUserId: "user-a" }),
    { mode: 0o600 }
  );
  writeFileSync(loginVerificationMarkerPath(storageStatePath), "{}", { mode: 0o600 });
  let currentUser = "user-a";
  const page = {
    url: () => "https://chatgpt.com/",
    bringToFront: async () => {},
    waitForLoadState: async () => {},
    evaluate: async () => currentUser,
  };
  const context = {
    cookies: async () => cookies,
    pages: () => [page],
  } as unknown as BrowserContext;
  const replacement = {
    contexts: () => [context],
    isConnected: () => true,
    close: async () => {},
  } as unknown as Browser;
  const stale = { isConnected: () => false } as unknown as Browser;
  const original = chromium.connectOverCDP;
  const previous = process.env.CHATGPT_WEB_CODEX_USE_CDP_PROFILE;
  process.env.CHATGPT_WEB_CODEX_USE_CDP_PROFILE = "1";
  let connections = 0;
  chromium.connectOverCDP = (async () => {
    connections += 1;
    return replacement;
  }) as typeof chromium.connectOverCDP;
  const worker = ChatGptBrowserWorker.forProvider({
    adapter: "chatgpt-web",
    baseUrl: "https://chatgpt.com",
    defaultModel: "gpt-5.6-sol",
    models: ["gpt-5.6-sol"],
    chatgptWeb: {
      appName: "Codex Native2",
      storageStatePath,
      cdpEndpoint: "http://127.0.0.1:9223",
      headed: true,
      solAvailable: true,
      proAvailable: true,
      localToolsEnabled: false,
    },
  }) as unknown as {
    managedBrowserReady: Promise<{ browser: Browser; context: BrowserContext }>;
    browser: Browser;
    ensureManagedBrowser(): Promise<{ browser: Browser; context: BrowserContext }>;
    close(): Promise<void>;
  };
  worker.browser = stale;
  worker.managedBrowserReady = Promise.resolve({ browser: stale, context });
  try {
    const results = await Promise.all([
      worker.ensureManagedBrowser(),
      worker.ensureManagedBrowser(),
    ]);
    assert.equal(connections, 1);
    assert.equal(results[0].browser, replacement);
    assert.equal(results[1].context, context);
    await worker.ensureManagedBrowser();
    assert.equal(connections, 1);
    currentUser = "user-b";
    await assert.rejects(worker.ensureManagedBrowser(), /account does not match/);
    assert.equal(connections, 1);
  } finally {
    chromium.connectOverCDP = original;
    if (previous === undefined) delete process.env.CHATGPT_WEB_CODEX_USE_CDP_PROFILE;
    else process.env.CHATGPT_WEB_CODEX_USE_CDP_PROFILE = previous;
    await worker.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
