// #16935: gemini-web lifecycle defects reproduced offline (no live Google account needed).
import test from "node:test";
import assert from "node:assert/strict";
import {
  acquireGeminiBrowser,
  releaseGeminiBrowser,
  resetGeminiBrowserLeaseForTests,
  type GeminiBrowser,
} from "../../open-sse/executors/gemini-web/browserLease.ts";

function fakeBrowser(state: { closed: boolean }): GeminiBrowser {
  return {
    close: async () => {
      state.closed = true;
    },
    newContext: async () => ({}),
    isConnected: () => true,
  };
}

test("#16935 a second request with a fresh launcher wrapper must not close the first request's active browser", async () => {
  await resetGeminiBrowserLeaseForTests();
  const first = { closed: false };
  const second = { closed: false };
  // gemini-web.ts passes `(options) => chromium.launch(options)` — a NEW closure per request.
  const a = await acquireGeminiBrowser(async () => fakeBrowser(first));
  const b = await acquireGeminiBrowser(async () => fakeBrowser(second));
  assert.equal(first.closed, false, "request A's browser was closed while A is still in flight");
  await releaseGeminiBrowser(a);
  await releaseGeminiBrowser(b);
  await resetGeminiBrowserLeaseForTests();
});

test("#16935 two cold concurrent acquisitions launch exactly one Chromium", async () => {
  await resetGeminiBrowserLeaseForTests();
  let launches = 0;
  const state = { closed: false };
  const launch = async () => {
    launches += 1;
    await new Promise((r) => setTimeout(r, 20));
    return fakeBrowser(state);
  };
  const [a, b] = await Promise.all([acquireGeminiBrowser(launch), acquireGeminiBrowser(launch)]);
  assert.equal(launches, 1);
  await releaseGeminiBrowser(a);
  await releaseGeminiBrowser(b);
  await resetGeminiBrowserLeaseForTests();
});

test("#16935 'page.waitForTimeout: ...browser has been closed' is not a terminal 400", async () => {
  await resetGeminiBrowserLeaseForTests();
  const playwright = await import("playwright");
  const originalLaunch = playwright.chromium.launch;
  playwright.chromium.launch = async () =>
    ({
      newContext: async () => ({
        addCookies: async () => undefined,
        newPage: async () => ({
          on: () => undefined,
          goto: async () => undefined,
          waitForTimeout: async (ms: number) => {
            if (ms === 30000) {
              throw new Error(
                "page.waitForTimeout: Target page, context or browser has been closed"
              );
            }
          },
          waitForSelector: async () => ({ click: async () => undefined }),
          keyboard: { insertText: async () => undefined, press: async () => undefined },
        }),
        cookies: async () => [],
        close: async () => undefined,
      }),
      close: async () => undefined,
    }) as never;
  try {
    const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "fake-cookie=abc" },
      signal: AbortSignal.timeout(5000),
      log: null,
    } as never);
    assert.notEqual(
      result.response.status,
      400,
      "context-closed error was classified as terminal 400"
    );
  } finally {
    playwright.chromium.launch = originalLaunch;
    await resetGeminiBrowserLeaseForTests();
  }
});

import { resolveResponseTimeoutMs } from "../../open-sse/executors/gemini-web/browserErrors.ts";

test("#16935 response budget is configurable and longer for Argon", () => {
  assert.equal(resolveResponseTimeoutMs("gemini-3.1-pro", {}), 30_000);
  assert.equal(resolveResponseTimeoutMs("gemini-4-argon", {}), 180_000);
  assert.equal(
    resolveResponseTimeoutMs("gemini-3.1-pro", { GEMINI_WEB_RESPONSE_TIMEOUT_MS: "90000" }),
    90_000
  );
  assert.equal(
    resolveResponseTimeoutMs("gemini-3.1-pro", { GEMINI_WEB_RESPONSE_TIMEOUT_MS: "5" }),
    30_000
  );
});
