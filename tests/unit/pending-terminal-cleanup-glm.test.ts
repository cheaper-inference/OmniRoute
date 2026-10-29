import assert from "node:assert/strict";
import test from "node:test";
import {
  cleanup,
  CONN,
  costRules,
  GLM_KEY,
  GLM_MODEL,
  GLM_PARTIAL_WIRE,
  GLM_PROVIDER,
  GLM_WIRE,
  history,
  PENDING_REQUEST_CLEARED_MARKER,
  stream,
  STREAM_IDLE_TIMEOUT_MS,
  translateSseResponse,
} from "./_helpers/pendingTerminalCleanup.ts";

test.beforeEach(() => {
  history.clearPendingRequests();
  costRules.resetCostData();
});
test.afterEach(async () => {
  await new Promise<void>((resolve) => setImmediate(resolve));
});
test.after(async () => {
  history.clearPendingRequests();
  costRules.resetCostData();
  await cleanup();
});

for (const indexed of [false, true]) {
  for (const mode of [
    "success",
    "bookkeeping",
    "idle",
    "error",
    "translated-error",
    "cancel",
  ] as const) {
    test(
      "real GLM " +
        (indexed ? "indexed" : "model-only") +
        " " +
        mode +
        " preserves a concurrent admission",
      async (t) => {
        const a = history.trackPendingRequest(
          GLM_MODEL,
          GLM_PROVIDER,
          indexed ? CONN : null,
          true,
          { clientRequest: { attempt: "A" } }
        );
        const b = history.trackPendingRequest(
          GLM_MODEL,
          GLM_PROVIDER,
          indexed ? CONN : null,
          true,
          { clientRequest: { attempt: "B" } }
        );
        const survivor = b ? history.getPendingById().get(b) : undefined;
        const survivorBytes = b ? history.getPendingRetainedBytes() / 2 : 0;
        assert.equal(history.getPendingRequests().byModel[GLM_KEY], 2);
        const intervals: Array<() => void> = [];
        const original = globalThis.setInterval;
        t.mock.method(globalThis, "setInterval", (callback: () => void, delay: number) => {
          if (delay === 10_000) intervals.push(callback);
          return original(callback, delay);
        });
        t.mock.method(console, "warn", () => {});
        t.mock.method(console, "debug", () => {});
        const result = await stream(
          a ?? "generated-glm-" + mode,
          mode === "bookkeeping" || mode === "idle",
          {
            rawConnectionId: indexed ? CONN : null,
            pendingConnectionId: indexed ? CONN : null,
            currentConnectionId: indexed ? CONN : null,
            provider: GLM_PROVIDER,
            model: GLM_MODEL,
            wire: GLM_WIRE,
            glmTransport: true,
            lifecycle:
              mode === "error" || mode === "translated-error" || mode === "cancel"
                ? mode
                : undefined,
            idle:
              mode === "idle"
                ? () => {
                    assert.ok(intervals[0], "real inner GLM stream arms its idle watchdog");
                    const now = Date.now();
                    t.mock.method(Date, "now", () => now + STREAM_IDLE_TIMEOUT_MS + 1_000);
                    intervals[0]();
                  }
                : undefined,
          }
        );
        if (mode === "success" || mode === "bookkeeping")
          assert.match(result.text, /actual GLM answer/);
        assert.equal(history.getPendingRequests().byModel[GLM_KEY], 1);
        assert.equal(history.getPendingRetainedBytes(), survivorBytes);
        if (b) {
          assert.equal(history.getPendingById().get(b), survivor);
          assert.equal(history.getPendingRequests().byAccount[CONN]?.[GLM_KEY], 1);
          assert.equal(history.getPendingById().has(a!), false);
          const state = history.getPendingRequests() as ReturnType<
            typeof history.getPendingRequests
          > & { details: Record<string, Record<string, Array<{ id: string }>>> };
          assert.deepEqual(
            state.details[CONN]?.[GLM_KEY]?.map((d) => d.id),
            [b]
          );
        }
        result.controller.handleDisconnect("duplicate GLM terminal");
        result.outcome.carry.onPipelineStreamError?.({
          message: "duplicate GLM terminal",
          statusCode: 502,
        });
        assert.equal(history.getPendingRequests().byModel[GLM_KEY], 1);
        assert.equal(history.getPendingRetainedBytes(), survivorBytes);
        assert.equal(result.released(), 1);
      }
    );
  }
}

// #18094: once content was forwarded, a failure keeps its queued error terminal
// for the reader and ends the stream instead of rejecting it; a failure before
// any content still rejects. Neither path may claim the outer pending cleanup.
for (const indexed of [false, true]) {
  for (const afterContent of [true, false]) {
    test(
      "GLM transport error " +
        (afterContent ? "after content" : "before content") +
        " leaves outer cleanup unclaimed for " +
        (indexed ? "indexed" : "model-only") +
        " admissions",
      async () => {
        const a = history.trackPendingRequest(
          GLM_MODEL,
          GLM_PROVIDER,
          indexed ? CONN : null,
          true,
          {
            clientRequest: { attempt: "A" },
          }
        );
        const b = history.trackPendingRequest(
          GLM_MODEL,
          GLM_PROVIDER,
          indexed ? CONN : null,
          true,
          {
            clientRequest: { attempt: "B" },
          }
        );
        const bytes = history.getPendingRetainedBytes();
        const wire =
          (afterContent ? GLM_PARTIAL_WIRE : "") +
          'event: error\ndata: {"type":"error","error":{"type":"overloaded_error","message":"GLM translated failure"}}\n\n';
        const translated = translateSseResponse(
          new Response(wire, { headers: { "content-type": "text/event-stream" } }),
          GLM_PROVIDER,
          GLM_MODEL
        );
        if (afterContent) {
          const text = await translated.text();
          assert.match(text, /actual GLM answer/);
          assert.match(text, /"error":\{"message":"GLM translated failure"/);
        } else {
          await assert.rejects(translated.text(), (error: unknown) => {
            assert.ok(error instanceof Error);
            assert.match(error.message, /GLM translated failure/);
            assert.notEqual(
              (error as Error & Record<string, unknown>)[PENDING_REQUEST_CLEARED_MARKER],
              true
            );
            return true;
          });
        }
        assert.equal(history.getPendingRequests().byModel[GLM_KEY], 2);
        assert.equal(history.getPendingRetainedBytes(), bytes);
        if (a && b) {
          assert.ok(history.getPendingById().has(a));
          assert.ok(history.getPendingById().has(b));
          assert.equal(history.getPendingRequests().byAccount[CONN]?.[GLM_KEY], 2);
        }
      }
    );
  }
}
