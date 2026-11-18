import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "combo-transport-default-gate-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.EMPTY_STREAM_SIBLING_RECOVERY_ENABLED = "false";
process.env.FETCH_TIMEOUT_MS = "600000";
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getComboMetrics } = await import("../../open-sse/services/comboMetrics.ts");
const { FETCH_TIMEOUT_MS } = await import("../../open-sse/config/constants.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { dispatchEvent } = await import("../../src/lib/webhookDispatcher.ts");
const noop = () => {};
const log = { info: noop, warn: noop, error: noop, debug: noop };
const answer =
  'data: {"choices":[{"delta":{"content":"default gate recovered"}}]}\n\ndata: [DONE]\n\n';

test.after(async () => {
  // Drain the same webhook import chain used by fire-and-forget combo notifications.
  await dispatchEvent("request.completed", {});
  await closeCallLogSaves(2000);
  resetDbInstance();
  fs.rmSync(data, { recursive: true, force: true });
});

for (const known of [true, false]) {
  test(`ordinary first-output gate preserves quality handling of a coded read error, known=${known}`, async () => {
    assert.equal(FETCH_TIMEOUT_MS, 600000);
    const calls: string[] = [];
    const model = "transport-default/one";
    const response = await handleComboChat({
      body: { stream: true, messages: [{ role: "user", content: "hello" }] },
      combo: {
        name: `transport-default-${known}`,
        strategy: "priority",
        models: [{ model }],
        config: { maxRetries: 1, retryDelayMs: 0 },
      },
      settings: { resilienceSettings: { streamRecovery: { enabled: true } } },
      hiddenModelsByProvider: new Map(),
      isModelAvailable: async () => true,
      log,
      handleSingleModel: async (_body, selected) => {
        calls.push(selected);
        if (calls.length > 1)
          return new Response(answer, { headers: { "Content-Type": "text/event-stream" } });
        return new Response(
          new ReadableStream<Uint8Array>({
            pull(controller) {
              controller.error(
                Object.assign(new Error("connection interrupted"), {
                  code: known ? "ECONNRESET" : "EAI_AGAIN",
                })
              );
            },
          }),
          { headers: { "Content-Type": "text/event-stream" } }
        );
      },
    });
    assert.deepEqual(calls, known ? [model, model] : [model]);
    if (known) assert.equal(await response.text(), answer);
    else await assert.rejects(response.text());
  });
}

for (const transport of [true, false]) {
  test(`review14: priority late transport cancellation preserves ordinary non-aborted HTTP retry, transport=${transport}`, async () => {
    const ac = new AbortController();
    const model = "transport-late/one";
    const name = `transport-late-${transport}`;
    const calls: string[] = [];
    const response = await handleComboChat({
      body: { stream: true, messages: [{ role: "user", content: "hello" }] },
      combo: {
        name,
        strategy: "priority",
        models: [{ model }],
        config: { maxRetries: 1, retryDelayMs: 0 },
      },
      settings: {
        resilienceSettings: { streamRecovery: { enabled: true }, modelLockout: { enabled: false } },
      },
      hiddenModelsByProvider: new Map(),
      isModelAvailable: async () => true,
      signal: ac.signal,
      log: {
        ...log,
        info: (_tag: string, message: string) => {
          if (transport && message.includes("(retry 1)")) ac.abort();
        },
      },
      handleSingleModel: async (_body, selected) => {
        calls.push(selected);
        if (calls.length > 1)
          return new Response(answer, { headers: { "Content-Type": "text/event-stream" } });
        if (!transport)
          return Response.json({ error: { message: "service busy" } }, { status: 503 });
        return new Response(
          new ReadableStream<Uint8Array>({
            pull(controller) {
              controller.error(
                Object.assign(new Error("connection interrupted"), { code: "ECONNRESET" })
              );
            },
          }),
          { headers: { "Content-Type": "text/event-stream" } }
        );
      },
    });
    assert.equal(response.status, transport ? 499 : 200);
    assert.deepEqual(calls, transport ? [model] : [model, model]);
    if (transport) assert.equal(getComboMetrics(name)?.totalFailures, 1);
    assert.equal(ac.signal.aborted, transport);
    const text = await response.text();
    if (!transport) assert.equal(text, answer);
  });
}
