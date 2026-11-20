// Google Flow Web (#18325) hardening: browser-lease concurrency, Flow RPC timeouts, host
// validation of resolved media URLs, rotated-cookie persistence through a caller-supplied
// persister (no raw SQL in the executor) and timer cleanup. Playwright is always faked.
import test from "node:test";
import assert from "node:assert/strict";

import {
  FLOW_BROWSER_IDLE_MS,
  acquireFlowBrowser,
  getStableFlowLauncher,
  releaseFlowBrowser,
  resetFlowBrowserLeaseForTests,
  type FlowBrowser,
} from "../../open-sse/executors/googleflow-web/browserLease.ts";
import {
  generateFlowImage,
  generateFlowVideo,
} from "../../open-sse/executors/googleflow-web/flowClient.ts";
import {
  flowErrorStatus,
  isFlowImageMediaUrl,
  isFlowSignedOutUrl,
  isFlowVideoMediaUrl,
  isSignedFlowVideoMediaUrl,
  mergeRotatedFlowCookies,
  persistRotatedFlowCookies,
  readFlowAspectRatio,
  setFlowPlaywrightLoaderForTests,
  toFlowCredentials,
} from "../../open-sse/executors/googleflow-web/flowPage.ts";
import { fetchFlowCredits } from "../../open-sse/services/usage/googleflow.ts";

type FakeBrowser = FlowBrowser & { closed: number };

function fakeBrowser(): FakeBrowser {
  const browser: FakeBrowser = {
    closed: 0,
    isConnected: () => true,
    close: async () => {
      browser.closed += 1;
    },
    newContext: async () => ({}),
  };
  return browser;
}

test.afterEach(async () => {
  setFlowPlaywrightLoaderForTests(null);
  await resetFlowBrowserLeaseForTests();
});

// ─── Browser lease ──────────────────────────────────────────────────────────

test("lease: concurrent cold acquires share one Chromium launch", async () => {
  let launches = 0;
  let resolveLaunch: (browser: FlowBrowser) => void = () => {};
  const browser = fakeBrowser();
  const launch = () => {
    launches += 1;
    return new Promise<FlowBrowser>((resolve) => {
      resolveLaunch = resolve;
    });
  };

  const first = acquireFlowBrowser(launch);
  const second = acquireFlowBrowser(launch);
  resolveLaunch(browser);

  assert.equal(await first, browser);
  assert.equal(await second, browser);
  assert.equal(launches, 1, "the second caller must not launch (and orphan) another process");
});

test("lease: a different launcher never closes a browser that is still in flight", async () => {
  const inUse = fakeBrowser();
  const other = fakeBrowser();

  const held = await acquireFlowBrowser(async () => inUse);
  const shared = await acquireFlowBrowser(async () => other);

  assert.equal(held, inUse);
  assert.equal(shared, inUse, "an in-flight browser is shared, not replaced");
  assert.equal(inUse.closed, 0, "the first request's browser must stay open");

  await releaseFlowBrowser(shared);
  await releaseFlowBrowser(held);
});

test("lease: a failed launch does not leak an in-flight slot", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  await assert.rejects(
    acquireFlowBrowser(async () => {
      throw new Error("launch failed");
    }),
    /launch failed/
  );

  const browser = fakeBrowser();
  const leased = await acquireFlowBrowser(async () => browser);
  await releaseFlowBrowser(leased);

  t.mock.timers.tick(FLOW_BROWSER_IDLE_MS + 1);
  assert.equal(browser.closed, 1, "idle close only happens when the in-flight count is back to 0");
});

test("lease: getStableFlowLauncher returns one launcher per Playwright launch function", () => {
  const chromium = { launch: async () => fakeBrowser() };
  assert.equal(getStableFlowLauncher(chromium), getStableFlowLauncher(chromium));
});

// ─── Host validation ────────────────────────────────────────────────────────

test("media URL validation parses the host instead of matching substrings", () => {
  const signed = "https://flow-content.google/video/abc?Expires=1&Signature=xyz";
  assert.equal(isFlowVideoMediaUrl(signed), true);
  assert.equal(isSignedFlowVideoMediaUrl(signed), true);
  assert.equal(isSignedFlowVideoMediaUrl("https://flow-content.google/video/abc"), false);
  assert.equal(
    isSignedFlowVideoMediaUrl("https://rr1---sn-abc.googlevideo.com/videoplayback?id=1&sig=AB"),
    true
  );

  for (const spoof of [
    "https://evil.example/?u=flow-content.google/video/abc&Signature=xyz",
    "https://flow-content.google.evil.example/video/abc?Signature=xyz",
    "http://flow-content.google/video/abc?Signature=xyz",
    "https://evil.example/googlevideo.com/videoplayback?sig=1",
    "not a url",
  ]) {
    assert.equal(isFlowVideoMediaUrl(spoof), false, spoof);
    assert.equal(isSignedFlowVideoMediaUrl(spoof), false, spoof);
  }

  assert.equal(isFlowImageMediaUrl("https://lh3.googleusercontent.com/asb/AbC_1-2"), true);
  assert.equal(isFlowImageMediaUrl("https://evil.example/?x=googleusercontent.com/asb/a"), false);
  assert.equal(isFlowImageMediaUrl("https://lh3.googleusercontent.com/other/a"), false);

  assert.equal(isFlowSignedOutUrl("https://accounts.google.com/ServiceLogin?x=1"), true);
  assert.equal(isFlowSignedOutUrl("https://flow.google.com/about"), true);
  assert.equal(isFlowSignedOutUrl("https://flow.google.com/project/p1"), false);
  assert.equal(
    isFlowSignedOutUrl("https://flow.google.com/project/p1?next=accounts.google.com"),
    false,
    "a query string mentioning accounts.google.com is not a sign-in redirect"
  );
});

// ─── Rotated cookies ────────────────────────────────────────────────────────

test("mergeRotatedFlowCookies updates stored cookies and the PSID family only", () => {
  const stored = "__Secure-1PSID=sid; __Secure-1PSIDTS=old; SAPISID=sap";
  const merged = mergeRotatedFlowCookies(stored, [
    { name: "__Secure-1PSIDTS", value: "new" },
    { name: "__Secure-1PSIDCC", value: "cc" },
    { name: "_ga", value: "analytics" },
    { name: "SAPISID", value: "sap" },
  ]);
  assert.equal(
    merged,
    "__Secure-1PSID=sid; __Secure-1PSIDTS=new; SAPISID=sap; __Secure-1PSIDCC=cc"
  );
  assert.equal(
    mergeRotatedFlowCookies(stored, [{ name: "__Secure-1PSIDTS", value: "old" }]),
    null,
    "nothing rotated → nothing to persist"
  );
});

test("persistRotatedFlowCookies hands the merged cookie to the persister and never throws", async () => {
  const persisted: string[] = [];
  const context = { cookies: async () => [{ name: "__Secure-1PSIDTS", value: "new" }] };
  await persistRotatedFlowCookies(
    context as never,
    "__Secure-1PSID=sid; __Secure-1PSIDTS=old",
    async (cookie) => {
      persisted.push(cookie);
    }
  );
  assert.deepEqual(persisted, ["__Secure-1PSID=sid; __Secure-1PSIDTS=new"]);

  await persistRotatedFlowCookies(context as never, "__Secure-1PSID=sid", async () => {
    throw new Error("db down");
  });
});

// ─── Flow RPC timeouts ──────────────────────────────────────────────────────

test("fetchFlowCredits bounds every Flow RPC with an abort signal", async () => {
  const signals: Array<AbortSignal | null | undefined> = [];
  const fetchImpl = async (_url: unknown, init?: RequestInit) => {
    signals.push(init?.signal);
    if (signals.length === 1) {
      return new Response('["xsrf","token-1"]', { status: 400 });
    }
    return new Response(`)]}'\n[["wrb.fr","nzlxg","[7]",null,null,null,"generic"]]`, {
      status: 200,
    });
  };
  const result = await fetchFlowCredits("__Secure-1PSID=sid", fetchImpl as typeof fetch);
  assert.equal(result.credits, 7);
  assert.equal(signals.length, 2, "the xsrf retry is a second RPC");
  for (const signal of signals) assert.ok(signal instanceof AbortSignal);
});

test("fetchFlowCredits rejects a stalled Flow RPC instead of hanging", async () => {
  const stalled = (_url: unknown, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
    });
  await assert.rejects(
    fetchFlowCredits("__Secure-1PSID=sid", stalled as typeof fetch, 20),
    (err: Error) => err.name === "TimeoutError" || err.name === "AbortError"
  );
});

// ─── Generation flows (fake Playwright) ─────────────────────────────────────

type FakeFlowOptions = {
  editorThrows?: boolean;
  imgSrcs?: string[];
  jarCookies?: Array<{ name: string; value: string }>;
};

function fakePlaywright(opts: FakeFlowOptions = {}) {
  const state = { launches: 0, contextsClosed: 0 };
  const locator: Record<string, unknown> = {
    first: () => locator,
    filter: () => locator,
    isVisible: async () => false,
    waitFor: async () => undefined,
    click: async () => undefined,
    innerText: async () => "Veo 3.1",
    getAttribute: async () => null,
  };
  const editor: Record<string, unknown> = {
    ...locator,
    first: () => editor,
    waitFor: async () => {
      if (opts.editorThrows) throw new Error("editor never appeared");
    },
  };
  const page = {
    goto: async () => undefined,
    waitForTimeout: async () => undefined,
    waitForURL: async () => undefined,
    url: () => "https://flow.google.com/project/p1",
    locator: (selector: string) => (selector === ".ProseMirror" ? editor : locator),
    on: () => undefined,
    off: () => undefined,
    keyboard: { type: async () => undefined, press: async () => undefined },
    content: async () => "",
    evaluate: async () => null,
    $$eval: async (selector: string) => (selector === "img" ? (opts.imgSrcs ?? []) : []),
  };
  const context = {
    addCookies: async () => undefined,
    newPage: async () => page,
    cookies: async () => opts.jarCookies ?? [],
    close: async () => {
      state.contextsClosed += 1;
    },
  };
  const browser = {
    isConnected: () => true,
    close: async () => undefined,
    newContext: async () => context,
  };
  const chromium = {
    launch: async () => {
      state.launches += 1;
      return browser;
    },
  };
  setFlowPlaywrightLoaderForTests(async () => ({ chromium }));
  return state;
}

const STORED_COOKIE = "__Secure-1PSID=sid; __Secure-1PSIDTS=old";

test("generateFlowImage persists rotated cookies and reuses one browser across requests", async () => {
  const state = fakePlaywright({
    imgSrcs: ["https://lh3.googleusercontent.com/asb/generated-1"],
    jarCookies: [{ name: "__Secure-1PSIDTS", value: "rotated" }],
  });
  const persisted: string[] = [];
  const onSessionCookieRotated = async (cookie: string) => {
    persisted.push(cookie);
  };

  for (let i = 0; i < 2; i++) {
    const result = await generateFlowImage({
      prompt: "a lighthouse",
      credentials: { apiKey: STORED_COOKIE },
      onSessionCookieRotated,
    });
    assert.equal(result.url, "https://lh3.googleusercontent.com/asb/generated-1");
  }

  assert.equal(state.launches, 1, "the stable launcher keeps the warm browser");
  assert.equal(state.contextsClosed, 2);
  assert.deepEqual(persisted, [
    "__Secure-1PSID=sid; __Secure-1PSIDTS=rotated",
    "__Secure-1PSID=sid; __Secure-1PSIDTS=rotated",
  ]);
});

test("generateFlowImage fails instead of returning an empty or off-host image URL", async () => {
  fakePlaywright({ imgSrcs: ["https://evil.example/?x=googleusercontent.com/asb/a"] });
  await assert.rejects(
    generateFlowImage({ prompt: "a lighthouse", credentials: { apiKey: STORED_COOKIE } }),
    /without producing an image URL/
  );
});

function captureUnhandledRejections() {
  const seen: unknown[] = [];
  const onRejection = (reason: unknown) => seen.push(reason);
  process.on("unhandledRejection", onRejection);
  return {
    seen,
    stop: () => process.off("unhandledRejection", onRejection),
  };
}

const flushMicrotasks = () => new Promise((resolve) => setImmediate(resolve));

test("generateFlowImage clears its generation timer when the page fails early", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  fakePlaywright({ editorThrows: true });
  const rejections = captureUnhandledRejections();
  try {
    await assert.rejects(
      generateFlowImage({ prompt: "a lighthouse", credentials: { apiKey: STORED_COOKIE } }),
      /editor never appeared/
    );
    t.mock.timers.tick(61_000);
    await flushMicrotasks();
    assert.deepEqual(rejections.seen, [], "the 60s timeout must not reject unobserved");
  } finally {
    rejections.stop();
  }
});

test("generateFlowVideo clears its generation timer when the page fails early", async (t) => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw new Error("offline test: Flow credits RPC unavailable");
  }) as typeof fetch;
  t.mock.timers.enable({ apis: ["setTimeout"] });
  fakePlaywright({ editorThrows: true });
  const rejections = captureUnhandledRejections();
  try {
    await assert.rejects(
      generateFlowVideo({ prompt: "a wave", credentials: { apiKey: STORED_COOKIE } }),
      /editor never appeared/
    );
    t.mock.timers.tick(601_000);
    await flushMicrotasks();
    assert.deepEqual(rejections.seen, [], "the 600s timeout must not reject unobserved");
  } finally {
    rejections.stop();
    globalThis.fetch = originalFetch;
  }
});

// ─── Handler request helpers ────────────────────────────────────────────────

test("handler helpers read the aspect ratio, cookie credentials and error status", () => {
  assert.equal(readFlowAspectRatio({ aspect_ratio: "9:16", size: "1:1" }), "9:16");
  assert.equal(readFlowAspectRatio({ aspectRatio: "4:3" }), "4:3");
  assert.equal(readFlowAspectRatio({ size: "1:1" }), "1:1");
  assert.equal(readFlowAspectRatio({ aspect_ratio: 16 }), undefined);

  assert.deepEqual(toFlowCredentials({ apiKey: "__Secure-1PSID=sid", accessToken: 1 }), {
    apiKey: "__Secure-1PSID=sid",
    accessToken: undefined,
  });
  assert.deepEqual(toFlowCredentials(null), { apiKey: undefined, accessToken: undefined });

  assert.equal(flowErrorStatus("Google Flow quota exhausted (3 Veo credits remaining)"), 429);
  assert.equal(
    flowErrorStatus("Google Flow session is expired or requires re-authentication"),
    401
  );
  assert.equal(flowErrorStatus("Polling loop finished without finding video asset"), 502);
});
