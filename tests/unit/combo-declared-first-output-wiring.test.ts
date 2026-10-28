/**
 * End-to-end wiring for declared first-output budgets in a combo: handleComboChat must hand
 * the target's declared budget to the per-target runner. FETCH_TIMEOUT_MS is lowered before
 * the combo loads so the default per-target budget (min(120s, FETCH_TIMEOUT_MS)) is 300ms;
 * GLM declares a 50-minute provider budget, which the runner caps at 180s for the
 * first-output wait. A GLM stream that starts answering after ~1s must therefore be served,
 * not abandoned for the backup.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-declared-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "combo-declared-wiring-secret";
process.env.FETCH_TIMEOUT_MS = "300";

const { handleComboChat } = await import("../../open-sse/services/combo.ts");

const noop = () => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };
const enc = new TextEncoder();

function frame(content: string) {
  return `data: ${JSON.stringify({
    id: "chatcmpl-wiring",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { content }, finish_reason: null }],
  })}\n\n`;
}

/** A stream that stays silent for `delayMs`, then answers and closes. */
function lateStream(delayMs: number, content: string, signal?: AbortSignal | null) {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        const timer = setTimeout(() => {
          controller.enqueue(enc.encode(frame(content)));
          controller.enqueue(enc.encode("data: [DONE]\n\n"));
          controller.close();
        }, delayMs);
        signal?.addEventListener(
          "abort",
          () => {
            clearTimeout(timer);
            try {
              controller.error(new Error("aborted"));
            } catch {
              // already closed
            }
          },
          { once: true }
        );
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
}

async function runCombo(settings: Record<string, unknown> | null) {
  const calls: string[] = [];
  const res = await handleComboChat({
    body: { messages: [{ role: "user", content: "ping" }], stream: true },
    combo: {
      name: "declared-first-output-wiring",
      strategy: "priority",
      models: ["glm/glm-4.6", "openai/backup-model"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async (_b: Record<string, unknown>, modelStr: string, target) => {
      calls.push(modelStr);
      if (modelStr === "glm/glm-4.6") {
        return lateStream(1_000, "glm-answer", target?.modelAbortSignal);
      }
      return lateStream(0, "backup-answer");
    },
    isModelAvailable: async () => true,
    log,
    settings,
    allCombos: null,
  } as Parameters<typeof handleComboChat>[0]);
  const text = await res.text();
  return { status: res.status, calls, text };
}

test("the combo waits on a declared budget instead of failing over at the 300ms default", async () => {
  const { status, calls, text } = await runCombo(null);
  assert.equal(status, 200);
  assert.deepEqual(calls, ["glm/glm-4.6"], "GLM's declared budget must reach the runner");
  assert.match(text, /glm-answer/);
});

test("an explicit global comboDefaults targetTimeoutMs keeps the short wait", async () => {
  const { status, calls, text } = await runCombo({ comboDefaults: { targetTimeoutMs: 300 } });
  assert.equal(status, 200);
  assert.deepEqual(calls, ["glm/glm-4.6", "openai/backup-model"]);
  assert.match(text, /backup-answer/);
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});
