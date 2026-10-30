import assert from "node:assert/strict";
import test from "node:test";
import { setImmediate as nextTurn } from "node:timers/promises";
import {
  CHATPLAYGROUND_FALLBACK_MODELS,
  clearChatPlaygroundCatalogCache,
  fetchChatPlaygroundModels,
} from "../../open-sse/services/chatplaygroundModels.ts";

test("ChatPlayground discovery accepts and caches a promptly completed catalog", async (t) => {
  clearChatPlaygroundCatalogCache();
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls += 1;
    return Response.json([{ botId: "catalog-fixture", modelName: "catalog-fixture" }]);
  });
  try {
    const first = await fetchChatPlaygroundModels();
    const cached = await fetchChatPlaygroundModels();
    assert.equal(first[0].id, "catalog-fixture");
    assert.deepEqual(cached, first);
    assert.equal(calls, 1);
  } finally {
    clearChatPlaygroundCatalogCache();
  }
});

test("ChatPlayground discovery falls back when its body stalls beyond the request deadline", async (t) => {
  clearChatPlaygroundCatalogCache();
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let body: ReadableStreamDefaultController<Uint8Array> | undefined;
  let settled = false;
  t.mock.method(globalThis, "fetch", async (_input: unknown, init?: RequestInit) => {
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        body = controller;
      },
    });
    init?.signal?.addEventListener(
      "abort",
      () => body?.error(new DOMException("catalog fixture timeout", "AbortError")),
      { once: true }
    );
    return new Response(stream, { headers: { "content-type": "application/json" } });
  });
  const pending = fetchChatPlaygroundModels().then((models) => {
    settled = true;
    return models;
  });
  try {
    await nextTurn();
    t.mock.timers.tick(15_001);
    await nextTurn();
    assert.equal(settled, true, "body consumption must remain covered by the discovery deadline");
    assert.deepEqual(await pending, CHATPLAYGROUND_FALLBACK_MODELS);
  } finally {
    // A RED run must also release its synthetic stream and restore the cache.
    if (!settled) body?.close();
    await pending;
    clearChatPlaygroundCatalogCache();
  }
});
