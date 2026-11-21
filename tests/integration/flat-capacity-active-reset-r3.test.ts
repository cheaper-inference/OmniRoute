import test from "node:test";
import assert from "node:assert/strict";
import { AsyncLocalStorage } from "node:async_hooks";
import { createComboRoutingHarness } from "./_comboRoutingHarness.ts";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const h = await createComboRoutingHarness("flat-active-reset-r3");
const sem = await import("../../open-sse/services/accountSemaphore.ts");
const providers = await import("../../src/lib/db/providers.ts");
const encoder = new TextEncoder();
const frame = (text: string) =>
  "data: " +
  JSON.stringify({
    id: "active-reset",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
  }) +
  "\n\n";
const terminal =
  'data: {"id":"active-reset","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n';
let sequence = 0;
test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
});
test.afterEach(async () => {
  sem.resetAll();
  await h.resetStorage();
});
test.after(h.cleanup);
for (const reset of ["key", "all"] as const) {
  test(
    "F6 real root stream survives owner retirement before successful body handoff: " + reset,
    async () => {
      const id = String(
        (
          await providers.createProviderConnection({
            provider: "openai",
            authType: "apikey",
            apiKey: "synthetic-reset-r3-" + ++sequence,
            maxConcurrent: 1,
            isActive: true,
          })
        ).id
      );
      const key = "openai:" + id,
        name = "active-reset-" + sequence;
      await h.combosDb.createCombo({
        name,
        strategy: "priority",
        models: [{ kind: "model", provider: "openai", model: "gpt-4o-mini", connectionId: id }],
        config: { maxRetries: 0, maxSetRetries: 0, targetTimeoutMs: 0, comboTimeoutMs: 3000 },
      });
      const request = () =>
        h.handleChat(
          h.buildRequest({
            body: {
              model: name,
              stream: true,
              messages: [{ role: "user", content: "active reset before response" }],
            },
          })
        );
      h.installRecordingFetch(
        () =>
          new Response(frame("warm") + terminal, {
            headers: { "content-type": "text/event-stream" },
          })
      );
      const warm = await request();
      assert.equal(warm.status, 200);
      await warm.text();
      const finish = Promise.withResolvers<void>();
      let future!: () => Promise<() => void>,
        finalized = 0,
        actual = 0;
      const prefix = "surviving active body " + "abcdef".repeat(12000);
      h.installRecordingFetch(() => {
        actual++;
        assert.ok(
          sem.captureAccountCapacityExecution(),
          "actual upstream dispatch owns an active phase"
        );
        future = AsyncLocalStorage.bind(() => sem.acquire(key, { maxConcurrency: 1 }));
        if (reset === "key") sem.reset(key);
        else sem.resetAll();
        let ended = false;
        return new Response(
          new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(encoder.encode(frame(prefix)));
            },
            async pull(controller) {
              if (ended) return;
              ended = true;
              await finish.promise;
              if (!finalized) {
                finalized++;
                controller.enqueue(encoder.encode(terminal));
                controller.close();
              }
            },
            cancel() {
              if (!finalized) finalized++;
              finish.resolve();
            },
          }),
          { headers: { "content-type": "text/event-stream" } }
        );
      });
      const held = await sem.acquire(key, { maxConcurrency: 1 });
      const pending = request();
      let selected: Response | undefined;
      try {
        assert.ok(
          await h.waitFor(() => sem.getStats()[key]?.queued === 1, 1500),
          "actual root parked before upstream dispatch"
        );
        held();
        const outcome = await pending.then(
          (response) => ({ response }),
          (error: unknown) => ({ error })
        );
        assert.ok(
          "response" in outcome,
          "retired consumed owner must not reject successful handoff"
        );
        if ("response" in outcome) selected = outcome.response;
        assert.equal(selected?.status, 200);
        assert.equal(actual, 1);
        assert.equal(finalized, 0, "selected live body remains owned until drain");
        finish.resolve();
        const text = await selected!.text();
        assert.match(text, /surviving active body/);
        assert.match(text, /\[DONE\]/);
        assert.equal(finalized, 1);
        await assert.rejects(future(), sem.isAccountCapacityContextError);
        assert.deepEqual(sem.getStats(), {});
      } finally {
        held();
        finish.resolve();
        await selected?.body?.cancel().catch(() => {});
        const response = await pending.catch(() => null);
        if (response && !response.bodyUsed) await response.body?.cancel().catch(() => {});
      }
    }
  );
}
