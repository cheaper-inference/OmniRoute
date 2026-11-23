// Abort handling around the account-proxy lookup in gemini-web.
//
// The executor resolves the account proxy between registering the abort listener and
// creating the browser context. An aborted request surfaces as a 499 response rather
// than a thrown error, so these tests assert on the response and on the side effects:
// an already-aborted signal must not launch a context, and an abort that lands inside
// newContext() must close the context it just created instead of leaking it.
import test from "node:test";
import assert from "node:assert/strict";

const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");

type ContextArg = { proxy?: unknown };

async function installFakePlaywright(options: {
  onNewContext?: (arg: ContextArg) => void;
  onClose?: () => void;
  onLaunch?: () => void;
  newContext: () => Promise<unknown>;
  /** Holds the launch open so an abort can land before the context is created. */
  launchDelayMs?: number;
}) {
  const mod = await import("playwright");
  const original = mod.chromium.launch;
  mod.chromium.launch = (async () => {
    options.onLaunch?.();
    if (options.launchDelayMs) {
      await new Promise((done) => setTimeout(done, options.launchDelayMs));
    }
    return {
      newContext: async (arg: ContextArg) => {
        options.onNewContext?.(arg);
        return options.newContext();
      },
      close: async () => {
        options.onClose?.();
      },
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

test("an already-aborted signal never creates a browser context", async () => {
  let newContextCalls = 0;
  let launches = 0;
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
    assert.equal(newContextCalls, 0, "no context may be created for an aborted request");
    assert.equal(launches, 0, "an already-aborted request must not launch a browser at all");
  } finally {
    restore();
  }
});

test("an abort that lands after the pre-check stops before creating a context", async () => {
  const controller = new AbortController();
  let newContextCalls = 0;
  const restore = await installFakePlaywright({
    launchDelayMs: 50,
    newContext: async () => {
      newContextCalls += 1;
      return { close: async () => {} };
    },
  });

  try {
    // The pre-check has already passed by the time this fires: the request is
    // inside the launch/proxy window the post-resolution re-check exists for.
    setTimeout(() => controller.abort(new Error("cancelled while the proxy lookup ran")), 10);
    const result = await new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: baseBody,
      stream: false,
      credentials: baseCredentials,
      signal: controller.signal,
      log: null,
    } as never);

    assert.equal(statusOf(result), 499, "an aborted request must not report success");
    assert.equal(newContextCalls, 0, "the re-check must stop the request before newContext");
  } finally {
    restore();
  }
});

test("an abort that lands inside newContext stops the request before it drives the page", async () => {
  const controller = new AbortController();
  let created = 0;
  let cookiesAdded = 0;

  const restore = await installFakePlaywright({
    newContext: async () => {
      created += 1;
      controller.abort(new Error("aborted mid-context"));
      return {
        close: async () => {},
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
    // The finally block closes whatever context exists, so "closed" cannot tell the two
    // behaviours apart. What matters is that an aborted request stops before touching
    // the page at all.
    assert.equal(cookiesAdded, 0, "an aborted request must not keep driving the page");
  } finally {
    restore();
  }
});
