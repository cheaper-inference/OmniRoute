// Abort handling around the account-proxy lookup in gemini-web.
//
// The executor resolves the account proxy between registering the abort listener and
// creating the browser context. An aborted request surfaces as a 499 response rather
// than a thrown error, so these tests assert on the response and on the side effects:
// an already-aborted signal must not launch a context, and an abort that lands inside
// newContext() must close the context it just created instead of leaking it.
import test from "node:test";
import assert from "node:assert/strict";

import "../_setup/isolateDataDir.ts";

const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");

test.after(async () => {
  const { shutdownDbInstance } = await import("../../src/lib/db/core.ts");
  await shutdownDbInstance();
});

type ContextArg = { proxy?: unknown };

async function installFakePlaywright(options: {
  onLaunch?: () => void;
  onNewContext?: (arg: ContextArg) => void;
  newContext: () => Promise<unknown>;
}) {
  const mod = await import("playwright");
  const original = mod.chromium.launch;
  mod.chromium.launch = (async () => {
    options.onLaunch?.();
    return {
      newContext: async (arg: ContextArg) => {
        options.onNewContext?.(arg);
        return options.newContext();
      },
      close: async () => {},
    };
  }) as unknown as typeof original;
  return () => {
    mod.chromium.launch = original;
  };
}

const baseBody = { messages: [{ role: "user", content: "hello" }], stream: false };
const baseCredentials = { apiKey: "k", cookie: "__Secure-1PSID=abc123" };

function statusOf(result: unknown): number | null {
  const resp = (result as { response?: Response }).response;
  return resp ? resp.status : null;
}

test("the executor passes the selected account proxy into the browser context", async () => {
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const { assignProxyToScope, createProxy } = await import("../../src/lib/db/proxies.ts");
  const connection = await createProviderConnection({
    provider: "gemini-web",
    authType: "apiKey",
    name: "browser context fixture",
    apiKey: "fixture-key",
    proxyEnabled: true,
  });
  const proxy = await createProxy({
    name: "browser context proxy fixture",
    type: "https",
    host: "127.0.0.1",
    port: 19010,
  });
  assert.ok(proxy);
  await assignProxyToScope("account", connection.id, proxy.id);
  const controller = new AbortController();
  const contextOptions: ContextArg[] = [];
  const restore = await installFakePlaywright({
    onNewContext: (options) => contextOptions.push(options),
    newContext: async () => {
      controller.abort(new Error("stop before navigation"));
      return { close: async () => {} };
    },
  });
  try {
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: baseBody,
      stream: false,
      credentials: { ...baseCredentials, connectionId: connection.id },
      signal: controller.signal,
      log: null,
    } as never);
    assert.equal(statusOf(result), 499);
    assert.equal(contextOptions.length, 1);
    assert.deepEqual(contextOptions[0].proxy, { server: "https://127.0.0.1:19010" });
  } finally {
    restore();
  }
});

test("an already-aborted signal never launches a browser or creates a context", async () => {
  let launches = 0;
  let newContextCalls = 0;
  const restore = await installFakePlaywright({
    onLaunch: () => {
      launches += 1;
    },
    newContext: async () => {
      newContextCalls += 1;
      return {};
    },
  });

  try {
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: baseBody,
      stream: false,
      credentials: baseCredentials,
      signal: AbortSignal.abort(new Error("cancelled before launch")),
      log: null,
    } as never);

    assert.equal(statusOf(result), 499, "an aborted request must not report success");
    assert.equal(launches, 0, "an already-aborted request must not launch Chromium");
    assert.equal(newContextCalls, 0, "no context may be created for an aborted request");
  } finally {
    restore();
  }
});

test("an abort while resolving the proxy stops before context creation", async () => {
  const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
  const connection = await createProviderConnection({
    provider: "gemini-web",
    authType: "apiKey",
    name: "cancel during proxy resolution",
    apiKey: "fixture-key",
    proxyEnabled: true,
  });
  const controller = new AbortController();
  const events: string[] = [];
  const restore = await installFakePlaywright({
    onLaunch: () => {
      events.push("launch");
    },
    newContext: async () => {
      events.push("newContext");
      return { close: async () => {} };
    },
  });
  const flagKey = Symbol.for("omniroute.featureFlagResolver");
  const globals = globalThis as Record<symbol, unknown>;
  const previous = globals[flagKey];
  globals[flagKey] = (flag: string) => {
    if (flag === "PROXY_AUTO_SELECT_ENABLED") {
      events.push("resolve proxy");
      controller.abort(new Error("aborted during proxy resolution"));
    }
    return false;
  };

  try {
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: baseBody,
      stream: false,
      credentials: { ...baseCredentials, connectionId: connection.id },
      signal: controller.signal,
      log: null,
    } as never);
    assert.equal(statusOf(result), 499);
    assert.deepEqual(events, ["launch", "resolve proxy"]);
  } finally {
    if (previous === undefined) delete globals[flagKey];
    else globals[flagKey] = previous;
    restore();
  }
});

test("an abort that lands inside newContext stops the request before it drives the page", async () => {
  const controller = new AbortController();
  let created = 0;
  let closes = 0;
  let cookiesAdded = 0;

  const restore = await installFakePlaywright({
    newContext: async () => {
      created += 1;
      controller.abort(new Error("aborted mid-context"));
      return {
        close: async () => {
          closes += 1;
        },
        addCookies: async () => {
          cookiesAdded += 1;
        },
      };
    },
  });

  try {
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: baseBody,
      stream: false,
      credentials: baseCredentials,
      signal: controller.signal,
      log: null,
    } as never);

    assert.equal(statusOf(result), 499, "an aborted request must not report success");
    assert.equal(created, 1);
    assert.equal(closes, 1, "the aborted context must close exactly once");
    assert.equal(cookiesAdded, 0, "an aborted request must not keep driving the page");
  } finally {
    restore();
  }
});

test("an abort after context creation shares cleanup with the finalizer", async () => {
  const controller = new AbortController();
  const events: string[] = [];
  const restore = await installFakePlaywright({
    newContext: async () => ({
      addCookies: async () => {
        events.push("abort");
        controller.abort(new Error("aborted while adding cookies"));
        await Promise.resolve();
        events.push("cookies unwound");
        throw controller.signal.reason;
      },
      close: async () => {
        events.push("close started");
        await new Promise<void>((done) => setImmediate(done));
        events.push("close finished");
      },
    }),
  });

  try {
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: baseBody,
      stream: false,
      credentials: baseCredentials,
      signal: controller.signal,
      log: null,
    } as never);
    assert.equal(statusOf(result), 499);
    assert.deepEqual(events, ["abort", "close started", "cookies unwound", "close finished"]);
  } finally {
    restore();
  }
});
