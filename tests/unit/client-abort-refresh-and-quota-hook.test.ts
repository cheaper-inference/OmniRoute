/**
 * Regression tests for #21276: client abort must interrupt credential refresh
 * retries, proactive refresh, executor retry backoff, and the quota-share
 * pre-hook without falling back to another URL or account, while allowing any
 * already in-flight refresh to finish safely in the background and cleaning up
 * abort listeners on settle.
 */
import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("client-abort-refresh-quota-hook");

const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
const { getCircuitBreakerStatus, refreshWithRetry } =
  await import("../../open-sse/services/tokenRefresh/circuitBreaker.ts");
const { admitQuotaShareRotation, runQuotaSharePreHook } =
  await import("../../open-sse/handlers/chatCore/quotaSharePreHook.ts");
const { createClientAbortError, raceClientAbort, sleepWithAbort } =
  await import("../../open-sse/utils/clientAbort.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const modelCapsDb = await import("../../src/lib/db/quotaModelCaps.ts");
const { getQuotaStore, resetQuotaStoreSingleton } =
  await import("../../src/lib/quota/QuotaStore.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");

const silentLog = {
  debug() {},
  info() {},
  warn() {},
  error() {},
};

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const TIMED_OUT = Symbol("TIMED_OUT");

async function settleWithin<T>(promise: Promise<T>, ms = 600): Promise<T | typeof TIMED_OUT> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<typeof TIMED_OUT>((resolve) => {
        timer = setTimeout(() => resolve(TIMED_OUT), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

type PreHookStructuredResult = {
  success: boolean;
  status: number;
  error?: string;
  errorCode?: string;
  response: Response;
};

class TestAbortExecutor extends BaseExecutor {
  public dispatchCount = 0;
  public refreshCount = 0;
  private readonly onDispatch: (
    url: string,
    init: RequestInit,
    attempt: number
  ) => Promise<Response>;
  private readonly onRefresh: () => Promise<Record<string, unknown> | null>;
  private readonly shouldRefresh: boolean;
  private readonly urls: string[];

  constructor(opts: {
    provider?: string;
    urls?: string[];
    shouldRefresh?: boolean;
    onRefresh?: () => Promise<Record<string, unknown> | null>;
    onDispatch?: (url: string, init: RequestInit, attempt: number) => Promise<Response>;
  }) {
    const urls = opts.urls ?? ["https://primary.example.test/v1/chat/completions"];
    super(opts.provider ?? "openai", {
      baseUrl: urls[0],
      baseUrls: urls,
      format: "openai",
      headers: {},
    });
    this.urls = urls;
    this.shouldRefresh = opts.shouldRefresh ?? false;
    this.onRefresh = opts.onRefresh ?? (async () => null);
    this.onDispatch =
      opts.onDispatch ??
      (async () =>
        new Response(JSON.stringify({ id: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }));
  }

  override getFallbackCount(): number {
    return this.urls.length;
  }

  override buildUrl(_model: string, _stream: boolean, urlIndex = 0): string {
    return this.urls[urlIndex] ?? this.urls[0];
  }

  override needsRefresh(): boolean {
    return this.shouldRefresh;
  }

  override async refreshCredentials(): Promise<Record<string, unknown> | null> {
    this.refreshCount += 1;
    return this.onRefresh();
  }

  override async dispatchRequest(url: string, init: RequestInit): Promise<Response> {
    this.dispatchCount += 1;
    return this.onDispatch(url, init, this.dispatchCount);
  }
}

test.beforeEach(async () => {
  await h.resetStorage();
  resetQuotaStoreSingleton();
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await h.settingsDb.updateSettings({ requestRetry: 0, maxRetryIntervalSec: 0 });
});

test.afterEach(async () => {
  flushProxyLogsSync();
  BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await h.resetStorage();
});

test.after(() => {
  flushProxyLogsSync();
  return h.cleanup();
});

// ─── 1. refreshWithRetry ────────────────────────────────────────────────────

test("refreshWithRetry: pre-aborted signal short-circuits without calling refreshFn or tripping breaker", async () => {
  const provider = "abort-pre-" + Math.random().toString(36).slice(2);
  const ac = new AbortController();
  ac.abort("client_gone");

  let attempts = 0;
  const started = Date.now();
  const result = await refreshWithRetry(
    async () => {
      attempts += 1;
      return { accessToken: "should-not-run" };
    },
    3,
    silentLog,
    provider,
    { signal: ac.signal }
  );

  assert.equal(result, null);
  assert.equal(attempts, 0, "pre-aborted signal must not invoke refreshFn");
  assert.equal(getCircuitBreakerStatus()[provider], undefined, "abort must not record a failure");
  assert.ok(Date.now() - started < 200);
  assert.equal(getEventListeners(ac.signal, "abort").length, 0);
});

test("refreshWithRetry: abort during retry backoff wakes promptly, skips next attempt, and cleans listener", async () => {
  const provider = "abort-backoff-" + Math.random().toString(36).slice(2);
  const ac = new AbortController();

  let attempts = 0;
  let enteredBackoff = false;
  const log = {
    debug(_scope: string, message: string) {
      if (/Retry 1\/3 after \d+ms/.test(message)) {
        enteredBackoff = true;
        setTimeout(() => ac.abort("client_gone"), 20);
      }
    },
    info() {},
    warn() {},
    error() {},
  };

  const started = Date.now();
  const result = await refreshWithRetry(
    async () => {
      attempts += 1;
      return null;
    },
    3,
    log,
    provider,
    { signal: ac.signal }
  );
  const elapsedMs = Date.now() - started;

  assert.equal(enteredBackoff, true, "the configured retry path should enter its backoff");
  assert.equal(result, null);
  assert.equal(attempts, 1, "abort during backoff must prevent attempt 2");
  assert.ok(elapsedMs < 400, `expected prompt wake-up during 1000ms backoff, took ${elapsedMs}ms`);
  assert.equal(getCircuitBreakerStatus()[provider], undefined, "abort must not record a failure");
  assert.equal(getEventListeners(ac.signal, "abort").length, 0);
});

test("refreshWithRetry: abort during in-flight refresh unblocks caller while background refresh finishes safely", async () => {
  const provider = "abort-inflight-" + Math.random().toString(36).slice(2);
  const ac = new AbortController();

  let attempts = 0;
  let persistedInBackground = false;
  let resolveInflight!: (value: { accessToken: string }) => void;

  const started = Date.now();
  const pending = refreshWithRetry(
    async () => {
      attempts += 1;
      const token = await new Promise<{ accessToken: string }>((resolve) => {
        resolveInflight = resolve;
      });
      persistedInBackground = true;
      return token;
    },
    3,
    silentLog,
    provider,
    { signal: ac.signal }
  );

  await sleep(15);
  ac.abort("client_gone");
  const outcome = await settleWithin(pending, 600);
  const elapsedMs = Date.now() - started;

  try {
    assert.notEqual(outcome, TIMED_OUT, "caller must unblock promptly on abort instead of waiting");
    assert.equal(outcome, null);
    assert.equal(attempts, 1, "must not start a second attempt after abort");
    assert.ok(elapsedMs < 400, `caller should unblock promptly on abort, took ${elapsedMs}ms`);
    assert.equal(getCircuitBreakerStatus()[provider], undefined);
    assert.equal(getEventListeners(ac.signal, "abort").length, 0);
  } finally {
    // In-flight refresh settles later in the background so token persistence never half-writes.
    resolveInflight({ accessToken: "persisted-safely" });
  }
  await sleep(20);
  assert.equal(persistedInBackground, true);
  assert.equal(attempts, 1);
});

test("refreshWithRetry: normal completion removes abort listener without leaking", async () => {
  const provider = "abort-clean-" + Math.random().toString(36).slice(2);
  const ac = new AbortController();

  let attempts = 0;
  const result = await refreshWithRetry(
    async () => {
      attempts += 1;
      if (attempts === 1) return null;
      return { accessToken: "fresh" };
    },
    3,
    silentLog,
    provider,
    { signal: ac.signal }
  );

  assert.equal(result?.accessToken, "fresh");
  assert.equal(attempts, 2);
  assert.equal(
    getEventListeners(ac.signal, "abort").length,
    0,
    "abort listener must be removed after normal completion"
  );
});

// ─── 2. BaseExecutor.execute() ──────────────────────────────────────────────

test("BaseExecutor.execute: abort during proactive refresh unblocks without dispatching and lets refresh finish", async () => {
  const ac = new AbortController();
  let resolveRefresh!: (val: Record<string, unknown>) => void;
  let persistCompleted = false;

  const executor = new TestAbortExecutor({
    urls: [
      "https://primary.example.test/v1/chat/completions",
      "https://fallback.example.test/v1/chat/completions",
    ],
    shouldRefresh: true,
    onRefresh: async () => {
      const refreshed = await new Promise<Record<string, unknown>>((resolve) => {
        resolveRefresh = resolve;
      });
      return refreshed;
    },
  });

  const started = Date.now();
  const execPromise = executor.execute({
    model: "gpt-4o-mini",
    body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: {
      accessToken: "stale-token",
      refreshToken: "rt-1",
      expiresAt: new Date(Date.now() - 10_000).toISOString(),
    },
    signal: ac.signal,
    log: silentLog,
    onCredentialsRefreshed: async () => {
      persistCompleted = true;
    },
  });

  await sleep(15);
  ac.abort("client_gone");

  const settled = await settleWithin(
    execPromise.then(
      () => ({ rejected: false as const, error: null }),
      (error: unknown) => ({ rejected: true as const, error })
    ),
    600
  );
  const elapsedMs = Date.now() - started;

  try {
    assert.notEqual(settled, TIMED_OUT, "proactive refresh must unblock promptly on abort");
    assert.equal(settled.rejected, true);
    assert.ok(settled.error instanceof Error && settled.error.name === "AbortError");
    assert.ok(elapsedMs < 400, `proactive refresh should unblock promptly, took ${elapsedMs}ms`);
    assert.equal(executor.refreshCount, 1);
    assert.equal(executor.dispatchCount, 0, "aborted request must not dispatch any upstream URL");
    assert.equal(getEventListeners(ac.signal, "abort").length, 0);
  } finally {
    // Let the in-flight refresh settle cleanly in background (no unhandled rejection).
    resolveRefresh({ accessToken: "rotated-token" });
  }
  await sleep(20);
  assert.equal(persistCompleted, false);
});

test("BaseExecutor.execute: pre-aborted signal skips proactive refresh and URL dispatch", async () => {
  const ac = new AbortController();
  ac.abort("already_gone");

  const executor = new TestAbortExecutor({
    urls: [
      "https://primary.example.test/v1/chat/completions",
      "https://fallback.example.test/v1/chat/completions",
    ],
    shouldRefresh: true,
    onRefresh: async () => ({ accessToken: "new-token" }),
  });

  await assert.rejects(
    executor.execute({
      model: "gpt-4o-mini",
      body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { accessToken: "stale-token", refreshToken: "rt-1" },
      signal: ac.signal,
      log: silentLog,
    }),
    (err: unknown) => err instanceof Error && err.name === "AbortError"
  );

  assert.equal(executor.refreshCount, 0);
  assert.equal(executor.dispatchCount, 0);
  assert.equal(getEventListeners(ac.signal, "abort").length, 0);
});

test("BaseExecutor.execute: abort during 429 intra-URL backoff escapes promptly without fallback URL", async () => {
  const ac = new AbortController();
  BaseExecutor.RETRY_CONFIG.delayMs = 2000;

  let enteredBackoff = false;
  const log = {
    debug(scope: string, message: string) {
      if (scope === "RETRY" && /429 intra-retry 1\//.test(message)) {
        enteredBackoff = true;
        setTimeout(() => ac.abort("client_gone"), 20);
      }
    },
    info() {},
    warn() {},
    error() {},
  };

  const executor = new TestAbortExecutor({
    urls: [
      "https://primary.example.test/v1/chat/completions",
      "https://fallback.example.test/v1/chat/completions",
    ],
    shouldRefresh: false,
    onDispatch: async () =>
      new Response(JSON.stringify({ error: { message: "rate limited" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }),
  });

  const started = Date.now();
  await assert.rejects(
    executor.execute({
      model: "gpt-4o-mini",
      body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "sk-test" },
      signal: ac.signal,
      log,
    }),
    (err: unknown) => err instanceof Error && err.name === "AbortError"
  );
  const elapsedMs = Date.now() - started;

  assert.equal(enteredBackoff, true, "the configured retry path should enter its backoff");
  assert.equal(
    executor.dispatchCount,
    1,
    "abort during backoff should escape without fallback or retry"
  );
  assert.ok(elapsedMs < 400, `expected prompt wake-up during 2000ms backoff, took ${elapsedMs}ms`);
  assert.equal(getEventListeners(ac.signal, "abort").length, 0);
});

// ─── 3. quotaSharePreHook ───────────────────────────────────────────────────

async function seedQuotaPool(connectionId: string, apiKeyId: string, model: string) {
  const pool = poolsDb.createPool({
    connectionId,
    name: `abort-pool-${connectionId}`,
    allocations: [{ apiKeyId, weight: 100, policy: "hard" }],
  });
  modelCapsDb.setModelCap({
    poolId: pool.id,
    apiKeyId,
    model,
    capValue: 10,
    capUnit: "requests",
  });
  return pool;
}

test("runQuotaSharePreHook: abort while enforceQuotaShare is pending returns 499, finalizes slot, and cleans listener", async () => {
  const connectionId = "conn-qs-abort-1";
  const apiKeyId = "key-qs-abort-1";
  const model = "gpt-5.6-luna";
  await seedQuotaPool(connectionId, apiKeyId, model);

  const store = await getQuotaStore();
  const originalPeek = store.peek.bind(store);
  let resolveUsage!: (val: number) => void;
  let usageCalls = 0;

  store.peek = async () => {
    usageCalls += 1;
    return new Promise<number>((resolve) => {
      resolveUsage = resolve;
    });
  };

  const ac = new AbortController();
  let finalized = 0;

  try {
    const started = Date.now();
    const pending = runQuotaSharePreHook({
      apiKeyInfo: { id: apiKeyId },
      credentials: { connectionId },
      provider: "codex",
      model,
      isCombo: false,
      comboStepId: null,
      comboExecutionKey: null,
      finalizePendingRequest: () => {
        finalized += 1;
      },
      log: silentLog,
      signal: ac.signal,
    }) as Promise<PreHookStructuredResult | null>;

    await sleep(20);
    assert.equal(usageCalls, 1, "enforceQuotaShare should be awaiting the quota store");
    ac.abort("client_gone");

    const result = await settleWithin(pending, 600);
    const elapsedMs = Date.now() - started;

    assert.notEqual(result, TIMED_OUT, "aborted pre-hook must not hang on QuotaStore");
    assert.ok(result, "aborted pre-hook must return a 499 result instead of failing open");
    assert.equal(result.success, false);
    assert.equal(result.status, 499);
    assert.ok(result.response instanceof Response);
    assert.equal(finalized, 1, "pending-request slot must be finalized on abort");
    assert.ok(elapsedMs < 400, `expected prompt abort return, took ${elapsedMs}ms`);
    assert.equal(getEventListeners(ac.signal, "abort").length, 0);
  } finally {
    resolveUsage?.(0);
    await sleep(10);
    store.peek = originalPeek;
  }
});

test("runQuotaSharePreHook: pre-aborted signal returns 499 immediately without querying QuotaStore", async () => {
  const connectionId = "conn-qs-preabort";
  const apiKeyId = "key-qs-preabort";
  const model = "gpt-5.6-luna";
  await seedQuotaPool(connectionId, apiKeyId, model);

  const store = await getQuotaStore();
  const originalPeek = store.peek.bind(store);
  let usageCalls = 0;
  store.peek = async (...args) => {
    usageCalls += 1;
    return originalPeek(...args);
  };

  const ac = new AbortController();
  ac.abort("already_gone");
  let finalized = 0;

  try {
    const result = (await runQuotaSharePreHook({
      apiKeyInfo: { id: apiKeyId },
      credentials: { connectionId },
      provider: "codex",
      model,
      isCombo: false,
      comboStepId: null,
      comboExecutionKey: null,
      finalizePendingRequest: () => {
        finalized += 1;
      },
      log: silentLog,
      signal: ac.signal,
    })) as PreHookStructuredResult | null;

    assert.ok(result);
    assert.equal(result.status, 499);
    assert.equal(finalized, 1);
    assert.equal(usageCalls, 0, "pre-aborted signal must not query QuotaStore");
    assert.equal(getEventListeners(ac.signal, "abort").length, 0);
  } finally {
    store.peek = originalPeek;
  }
});

test("runQuotaSharePreHook & admitQuotaShareRotation: live signal preserves normal allow and removes listeners", async () => {
  const connectionId = "conn-qs-normal";
  const apiKeyId = "key-qs-normal";
  const model = "gpt-5.6-luna";
  await seedQuotaPool(connectionId, apiKeyId, model);

  const ac = new AbortController();
  const preHookResult = await runQuotaSharePreHook({
    apiKeyInfo: { id: apiKeyId },
    credentials: { connectionId },
    provider: "codex",
    model,
    isCombo: false,
    comboStepId: null,
    comboExecutionKey: null,
    finalizePendingRequest: () => {},
    log: silentLog,
    signal: ac.signal,
  });

  assert.equal(preHookResult, null);
  assert.equal(getEventListeners(ac.signal, "abort").length, 0);

  const admitted = await admitQuotaShareRotation({
    apiKeyInfo: { id: apiKeyId },
    connectionId,
    provider: "codex",
    model,
    signal: ac.signal,
  });

  assert.equal(admitted, true);
  assert.equal(getEventListeners(ac.signal, "abort").length, 0);
});

test("admitQuotaShareRotation: abort while pending rejects promptly with AbortError", async () => {
  const connectionId = "conn-qs-rot-abort";
  const apiKeyId = "key-qs-rot-abort";
  const model = "gpt-5.6-luna";
  await seedQuotaPool(connectionId, apiKeyId, model);

  const store = await getQuotaStore();
  const originalPeek = store.peek.bind(store);
  let resolveUsage!: (val: number) => void;
  store.peek = async () =>
    new Promise<number>((resolve) => {
      resolveUsage = resolve;
    });

  const ac = new AbortController();
  try {
    const started = Date.now();
    const pending = admitQuotaShareRotation({
      apiKeyInfo: { id: apiKeyId },
      connectionId,
      provider: "codex",
      model,
      signal: ac.signal,
    });

    await sleep(20);
    ac.abort("client_gone");

    const settled = await settleWithin(
      pending.then(
        () => ({ rejected: false as const, error: null }),
        (error: unknown) => ({ rejected: true as const, error })
      ),
      600
    );
    assert.notEqual(settled, TIMED_OUT, "admitQuotaShareRotation must not hang on abort");
    assert.equal(settled.rejected, true);
    assert.ok(settled.error instanceof Error && settled.error.name === "AbortError");
    assert.ok(Date.now() - started < 400);
    assert.equal(getEventListeners(ac.signal, "abort").length, 0);
  } finally {
    resolveUsage?.(0);
    await sleep(10);
    store.peek = originalPeek;
  }
});

// ─── 4. clientAbort utility edge cases ──────────────────────────────────────

test("clientAbort helpers: late background rejection after abort does not trigger unhandledRejection and preserves TimeoutError", async () => {
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => {
    unhandled.push(reason);
  };
  process.on("unhandledRejection", onUnhandled);

  try {
    const ac = new AbortController();
    let rejectBg!: (err: Error) => void;
    const bgPromise = new Promise<string>((_resolve, reject) => {
      rejectBg = reject;
    });

    const raced = raceClientAbort(bgPromise, ac.signal);
    ac.abort("client_gone");
    await assert.rejects(
      raced,
      (err: unknown) => err instanceof Error && err.name === "AbortError"
    );
    assert.equal(getEventListeners(ac.signal, "abort").length, 0);

    // Late rejection of the detached background promise must be absorbed cleanly.
    rejectBg(new Error("late background failure"));
    await sleep(20);
    assert.equal(unhandled.length, 0, "background rejection after abort must not be unhandled");

    // Pre-aborted signal with TimeoutError preserves TimeoutError name for 504 mapping.
    const timeoutAc = new AbortController();
    const timeoutErr = new Error("deadline reached");
    timeoutErr.name = "TimeoutError";
    timeoutAc.abort(timeoutErr);
    assert.equal(createClientAbortError(timeoutAc.signal), timeoutErr);

    // sleepWithAbort removes its listener on normal expiry.
    const sleepAc = new AbortController();
    await sleepWithAbort(10, sleepAc.signal);
    assert.equal(getEventListeners(sleepAc.signal, "abort").length, 0);
  } finally {
    process.off("unhandledRejection", onUnhandled);
  }
});

// ─── 5. End-to-end chatCore reactive 401 refresh abort ──────────────────────

for (const stream of [false, true]) {
  const mode = stream ? "streaming" : "non-streaming";

  test(`handleChat (${mode}) reactive 401 refresh: client abort during refresh retry backoff returns 499 without retry or account fallback`, async () => {
    await providersDb.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: `codex-primary-abort-${mode}`,
      accessToken: "expired-access-primary",
      refreshToken: "refresh-token-primary",
      expiresAt: new Date(Date.now() + 3600_000).toISOString(),
      isActive: true,
      testStatus: "active",
      priority: 1,
      providerSpecificData: {},
    });
    await providersDb.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: `codex-fallback-abort-${mode}`,
      accessToken: "valid-access-fallback",
      refreshToken: "refresh-token-fallback",
      expiresAt: new Date(Date.now() + 3600_000).toISOString(),
      isActive: true,
      testStatus: "active",
      priority: 2,
      providerSpecificData: {},
    });

    const key = await h.seedApiKey();
    const ac = new AbortController();
    const upstreamTokens: string[] = [];
    let refreshCalls = 0;
    let abortedAt = 0;

    globalThis.fetch = async (input, init: RequestInit = {}) => {
      const url = String(input instanceof Request ? input.url : input);
      if (/auth\.openai\.com\/oauth\/token/.test(url)) {
        refreshCalls += 1;
        // Fail attempt 1 transiently so refreshWithRetry enters its 1000ms backoff sleep.
        setTimeout(() => {
          abortedAt = Date.now();
          ac.abort("client_gone");
        }, 30);
        return new Response(JSON.stringify({ error: "temporarily_unavailable" }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (/chatgpt\.com\/backend-api\/codex\/responses/.test(url)) {
        const token = (new Headers(init.headers).get("authorization") || "").replace(
          /^Bearer\s+/i,
          ""
        );
        upstreamTokens.push(token);
        if (token === "expired-access-primary") {
          return new Response(JSON.stringify({ error: { message: "Unauthorized" } }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ error: { message: "unexpected fallback call" } }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
    };

    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key.key}`,
      },
      body: JSON.stringify({
        model: "codex/gpt-5.6-luna",
        stream,
        messages: [{ role: "user", content: `Hello ${mode}` }],
      }),
      signal: ac.signal,
    });

    const response = await h.handleChat(req);
    const elapsedAfterAbortMs = abortedAt > 0 ? Date.now() - abortedAt : Number.POSITIVE_INFINITY;

    assert.equal(response.status, 499, `expected 499 on client abort, got ${response.status}`);
    assert.equal(refreshCalls, 1, "must not launch refresh attempt 2 after client abort");
    assert.deepEqual(
      upstreamTokens,
      ["expired-access-primary"],
      "must not fall back to the second account for an aborted request"
    );
    assert.ok(
      elapsedAfterAbortMs < 400,
      `expected prompt abort after client disconnect during refresh backoff, took ${elapsedAfterAbortMs}ms`
    );
  });
}
