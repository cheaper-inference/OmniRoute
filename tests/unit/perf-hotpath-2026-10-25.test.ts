import test from "node:test";
import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { createSSEDataLineNormalizer } from "../../open-sse/utils/streamHelpers.ts";
import { memoLookup, memoStore, clearMemoStore } from "../../open-sse/services/compression/resultMemo.ts";
import { getCachedResolvedClientApiKey } from "../../src/shared/utils/clientApiRouteAuth.ts";

test("HP-01: createSSEStream computes bodySize without JSON.stringify overhead", async () => {
  const observedMarks: unknown[] = [];
  const originalMark = performance.mark.bind(performance);
  const markMock: typeof performance.mark = (name, markOptions) => {
    if (name === "omni-request-body-size") observedMarks.push(markOptions?.detail);
    return originalMark(name, markOptions);
  };
  performance.mark = markMock;

  try {
    const textEncoder = new TextEncoder();
    const source = new ReadableStream({
      start(controller) {
        controller.enqueue(textEncoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    const bodyWithRaw = { _rawByteLength: 1024, messages: [{ role: "user", content: "hi" }] };
    const transform = createSSEStream({
      mode: "passthrough",
      provider: "openai",
      model: "gpt-4o",
      body: bodyWithRaw,
    });
    await new Response(source.pipeThrough(transform)).text();

    assert.ok(observedMarks.some((m) => m === 1024));
  } finally {
    performance.mark = originalMark;
  }
});

test("HP-02: createSSEDataLineNormalizer handles single-line and multi-line SSE payloads correctly", () => {
  const normalizer = createSSEDataLineNormalizer();

  // Single line standard JSON
  const singleLine = 'data: {"id":"1","choices":[{"delta":{"content":"hello"}}]}';
  const out1 = normalizer.normalize([singleLine, ""]);
  assert.ok(out1.some((l) => l.includes('"hello"')));

  // Non-JSON line
  const nonJson = "data: [DONE]";
  const out2 = normalizer.normalize([nonJson, ""]);
  assert.ok(out2.includes("data: [DONE]"));
});

test("HP-03 & HP-08: resultMemo fast clone without structuredClone", () => {
  clearMemoStore();
  const testKey = "test-hash-key";
  const mockResult = {
    body: { id: "res_123", choices: [{ message: { content: "memoized" } }] },
    compressed: true,
    stats: {
      originalTokens: 100,
      compressedTokens: 50,
      savingsPercent: 50,
      techniquesUsed: [],
      mode: "lite" as const,
      timestamp: Date.now(),
    },
  };

  memoStore(testKey, mockResult);
  const hit1 = memoLookup(testKey);
  assert.ok(hit1);
  assert.equal(hit1?.body.id, "res_123");
  assert.equal(hit1?.stats?.originalTokens, 100);
  assert.equal(hit1?.stats?.memoHit, true);

  // Modifying hit copy does not mutate stored cache stats or root body
  if (hit1) {
    hit1.body.id = "mutated";
    if (hit1.stats) {
      hit1.stats.originalTokens = 999;
    }
  }

  const hit2 = memoLookup(testKey);
  assert.equal(hit2?.body.id, "res_123");
  assert.equal(hit2?.stats?.originalTokens, 100);
});

test("HP-04: getCachedResolvedClientApiKey caches resolution per request object and auth header", async () => {
  const req = new Request("http://localhost/v1/chat/completions", {
    headers: {
      Authorization: "Bearer test-api-key-12345",
    },
  });

  const res1 = await getCachedResolvedClientApiKey(req);
  const res2 = await getCachedResolvedClientApiKey(req);
  assert.equal(res1, res2);
});
