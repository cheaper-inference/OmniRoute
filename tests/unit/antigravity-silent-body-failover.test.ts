import { describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import {
  peekFirstAntigravitySseEvent,
  AntigravityPreResponseTimeoutError,
} from "../../open-sse/executors/antigravity/executeAttempt.ts";
import {
  seedAntigravityIdeVersionCache,
  seedAntigravityCliVersionCache,
  clearAntigravityVersionCaches,
} from "../../open-sse/services/antigravityVersion.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { ANTIGRAVITY_RUNTIME_BASE_URLS } from "../../open-sse/config/antigravityUpstream.ts";

// The execute() tests below run the readiness watchdog on mocked timers. With a real
// wall-clock budget (it used to be 50ms) the same budget also covers the healthy attempt,
// so an event-loop or CPU-scheduling stall longer than the budget on a loaded runner turned
// the healthy URL into a watchdog timeout as well (#18791). On a virtual clock the watchdog
// only fires when the test advances it, so the outcome no longer depends on runner speed.
const VIRTUAL_READINESS_TIMEOUT_MS = 30_000;

/**
 * A 200 body that never yields a chunk. `readPending` resolves once a reader is parked on it,
 * i.e. once the readiness watchdog has started waiting for the first SSE event.
 */
function createSilentBody() {
  let markReadPending: () => void = () => {};
  const readPending = new Promise<void>((resolve) => {
    markReadPending = resolve;
  });
  const body = new ReadableStream<Uint8Array>(
    {
      pull() {
        markReadPending();
        // Never enqueue and never close: a silent open body.
        return new Promise<void>(() => {});
      },
    },
    { highWaterMark: 0 }
  );
  return { body, readPending };
}

describe("Part D - Antigravity silent-body watchdog and failover", () => {
  it("peekFirstAntigravitySseEvent throws AntigravityPreResponseTimeoutError on silent body", async () => {
    // A 200 response whose body never yields any chunks (silent open body)
    const silentStream = new ReadableStream<Uint8Array>({
      start() {
        // never enqueues, never closes
      },
    });
    const silentResponse = new Response(silentStream, { status: 200 });

    await assert.rejects(
      async () => {
        await peekFirstAntigravitySseEvent(silentResponse, "https://api.test/silent", 50);
      },
      (err: unknown) => {
        assert.ok(err instanceof AntigravityPreResponseTimeoutError);
        assert.equal(err.status, 504);
        assert.equal(err.code, "ANTIGRAVITY_PRE_RESPONSE_TIMEOUT");
        return true;
      }
    );
  });

  it("peekFirstAntigravitySseEvent returns replayable response intact when first event arrives", async () => {
    const encoder = new TextEncoder();
    const healthyStream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          encoder.encode('data: {"candidates":[{"content":{"parts":[{"text":"hi"}]}}]}\n\n')
        );
        controller.enqueue(
          encoder.encode('data: {"candidates":[{"content":{"parts":[{"text":" world"}]}}]}\n\n')
        );
        controller.close();
      },
    });
    const healthyResponse = new Response(healthyStream, { status: 200 });

    const result = await peekFirstAntigravitySseEvent(
      healthyResponse,
      "https://api.test/healthy",
      500
    );
    assert.equal(result.status, 200);

    const reader = result.body!.getReader();
    const chunks: string[] = [];
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(decoder.decode(value));
    }
    const fullText = chunks.join("");
    assert.ok(fullText.includes("hi"));
    assert.ok(fullText.includes("world"));
  });

  it("execute fails over when first base URL has a silent 200 response and returns intact stream from second base URL", async () => {
    seedAntigravityIdeVersionCache("1.11.5");
    seedAntigravityCliVersionCache("1.11.5");

    mock.timers.enable({ apis: ["setTimeout", "Date"] });
    const executor = new AntigravityExecutor({
      streamReadinessTimeoutMs: VIRTUAL_READINESS_TIMEOUT_MS,
    });
    // Default generation now stays on the daily endpoint only (#18706), so the failover
    // path needs a second base URL configured explicitly to be exercised.
    executor.config = { ...executor.config, baseUrls: [...ANTIGRAVITY_RUNTIME_BASE_URLS] };
    const encoder = new TextEncoder();

    const silent = createSilentBody();
    let streamGenAttempt = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      const urlStr = String(input);
      if (!urlStr.includes("v1internal:streamGenerateContent")) {
        return new Response(JSON.stringify({ version: "1.11.5" }), { status: 200 });
      }

      streamGenAttempt++;
      if (streamGenAttempt === 1) {
        // First endpoint: silent body (never enqueues, never closes)
        return new Response(silent.body, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      } else {
        // Second endpoint: healthy stream
        const healthyStream = new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(
              encoder.encode(
                'data: {"candidates":[{"content":{"parts":[{"text":"success from fallback"}]}}]}\n\n'
              )
            );
            controller.close();
          },
        });
        return new Response(healthyStream, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      }
    }) as unknown as typeof fetch;

    try {
      const creds = {
        accessToken: "test-token",
        projectId: "test-project",
      };

      const pending = executor.execute({
        model: "gemini-2.5-flash",
        stream: true,
        body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
        credentials: creds,
      });

      // The watchdog is now waiting on the silent first URL. Nothing may fail over until
      // the readiness budget has elapsed.
      await silent.readPending;
      await new Promise<void>((resolve) => setImmediate(resolve));
      assert.equal(streamGenAttempt, 1, "must not fail over before the readiness budget elapses");

      // Spend exactly the readiness budget: the silent URL times out, the executor moves to
      // the second base URL, whose healthy stream is ready without any further clock advance.
      mock.timers.tick(VIRTUAL_READINESS_TIMEOUT_MS);
      const res = await pending;

      assert.equal(
        streamGenAttempt,
        2,
        `failed over to second base URL (attempts=${streamGenAttempt})`
      );
      assert.ok(res.response.ok);

      // Drain the response body and assert exact SSE content intact
      const reader = res.response.body!.getReader();
      const chunks: string[] = [];
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(decoder.decode(value));
      }
      const fullText = chunks.join("");
      assert.ok(
        fullText.includes("success from fallback"),
        `Expected body to contain 'success from fallback', got: ${fullText}`
      );
    } finally {
      mock.timers.reset();
      globalThis.fetch = originalFetch;
      clearAntigravityVersionCaches();
    }
  });

  it("execute does NOT fail over when first base URL is healthy and preserves stream", async () => {
    seedAntigravityIdeVersionCache("1.11.5");
    seedAntigravityCliVersionCache("1.11.5");

    // Virtual clock: the clock never advances here, so the watchdog cannot fire on a
    // slow runner and only the healthy-stream path is exercised.
    mock.timers.enable({ apis: ["setTimeout", "Date"] });
    const executor = new AntigravityExecutor({
      streamReadinessTimeoutMs: VIRTUAL_READINESS_TIMEOUT_MS,
    });
    const encoder = new TextEncoder();

    let streamGenAttempt = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock.fn(async (input: RequestInfo | URL, _init?: RequestInit) => {
      const urlStr = String(input);
      if (!urlStr.includes("v1internal:streamGenerateContent")) {
        return new Response(JSON.stringify({ version: "1.11.5" }), { status: 200 });
      }

      streamGenAttempt++;
      const healthyStream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              'data: {"candidates":[{"content":{"parts":[{"text":"healthy first attempt"}]}}]}\n\n'
            )
          );
          controller.close();
        },
      });
      return new Response(healthyStream, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }) as unknown as typeof fetch;

    try {
      const creds = {
        accessToken: "test-token",
        projectId: "test-project",
      };

      const res = await executor.execute({
        model: "gemini-2.5-flash",
        stream: true,
        body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
        credentials: creds,
      });

      assert.equal(streamGenAttempt, 1, `only made 1 attempt (attempts=${streamGenAttempt})`);
      assert.ok(res.response.ok);

      const reader = res.response.body!.getReader();
      const chunks: string[] = [];
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(decoder.decode(value));
      }
      const fullText = chunks.join("");
      assert.ok(
        fullText.includes("healthy first attempt"),
        `Expected body to contain 'healthy first attempt', got: ${fullText}`
      );
    } finally {
      mock.timers.reset();
      globalThis.fetch = originalFetch;
      clearAntigravityVersionCaches();
    }
  });
});
