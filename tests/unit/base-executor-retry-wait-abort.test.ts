import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// The 429 and WAF intra-URL retries wait before they call the same URL again. That wait
// used a plain timer, so a client that had already disconnected kept the request alive
// for the whole delay, and the discarded 429 response was never released.

const RETRY = BaseExecutor.RETRY_CONFIG as { delayMs: number };
const WAF = BaseExecutor.WAF_RETRY_CONFIG as { delayMs: number };

function execute(signal?: AbortSignal) {
  return new DefaultExecutor("gemini").execute({
    model: "gemini-2.5-flash",
    body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
    stream: false,
    credentials: { apiKey: "synth...ey", connectionId: "conn-a" },
    signal,
  });
}

async function withFetch<T>(
  fetchImpl: () => Response,
  config: { delayMs: number },
  delayMs: number,
  run: (calls: () => number) => Promise<T>
): Promise<T> {
  const originalFetch = globalThis.fetch;
  const originalDelay = config.delayMs;
  let calls = 0;
  config.delayMs = delayMs;
  globalThis.fetch = (async () => {
    calls += 1;
    return fetchImpl();
  }) as typeof fetch;
  try {
    return await run(() => calls);
  } finally {
    globalThis.fetch = originalFetch;
    config.delayMs = originalDelay;
  }
}

const rateLimited = () =>
  new Response(JSON.stringify({ error: { message: "rate limited" } }), { status: 429 });
const contentBlocked = () =>
  new Response(JSON.stringify({ error: { message: "content_blocked by WAF" } }), { status: 400 });

test("a client abort ends the 429 retry wait at once", async () => {
  await withFetch(rateLimited, RETRY, 600, async (calls) => {
    const controller = new AbortController();
    const pending = execute(controller.signal);
    const settled = pending.then(
      () => "resolved",
      () => "rejected"
    );
    await new Promise((resolve) => setTimeout(resolve, 50));
    const abortedAt = Date.now();
    controller.abort(new Error("client gone"));

    assert.equal(await settled, "rejected", "execute must reject when the client aborts");
    assert.ok(Date.now() - abortedAt < 150, "execute must not sit out the retry delay");
    assert.equal(calls(), 1, "no further upstream call after the abort");
  });
});

test("a client abort ends the WAF retry wait at once", async () => {
  await withFetch(contentBlocked, WAF, 600, async (calls) => {
    const controller = new AbortController();
    const settled = execute(controller.signal).then(
      () => "resolved",
      () => "rejected"
    );
    await new Promise((resolve) => setTimeout(resolve, 50));
    const abortedAt = Date.now();
    controller.abort(new Error("client gone"));

    assert.equal(await settled, "rejected");
    assert.ok(Date.now() - abortedAt < 150, "execute must not sit out the WAF delay");
    assert.equal(calls(), 1);
  });
});

test("a 429 that is retried has its body cancelled before the next attempt", async () => {
  let cancelled = false;
  let cancelledBeforeRetry: boolean | null = null;
  let fetches = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    fetches += 1;
    if (fetches === 2) cancelledBeforeRetry = cancelled;
    if (fetches > 1) return new Response("{}", { status: 200 });
    // A Retry-After header keeps the executor from reading the body, so only an explicit
    // cancel can release this stream.
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('{"error":"slow down"}'));
      },
      cancel() {
        cancelled = true;
      },
    });
    return new Response(body, { status: 429, headers: { "Retry-After": "0.05" } });
  }) as typeof fetch;
  try {
    const result = await execute();
    assert.equal(result.response.status, 200);
    assert.equal(fetches, 2);
    assert.equal(cancelledBeforeRetry, true, "the discarded 429 body must be cancelled");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("an uninterrupted 429 retry still waits and retries", async () => {
  await withFetch(rateLimited, RETRY, 0, async (calls) => {
    const result = await execute(new AbortController().signal);
    assert.equal(result.response.status, 429);
    assert.equal(calls(), 1 + BaseExecutor.RETRY_CONFIG.maxAttempts);
  });
});
