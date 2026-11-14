import assert from "node:assert/strict";
import fs from "node:fs";
import { Socket } from "node:net";
import os from "node:os";
import path from "node:path";
import test, { type TestContext } from "node:test";
import { setImmediate as nextTurn } from "node:timers/promises";
import { kiroEventFrame } from "../_helpers/kiroEventStreamFixture.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15260-kiro-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  API_KEY_SECRET: "15260-synthetic-api-secret",
  JWT_SECRET: "15260-synthetic-jwt-secret",
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
  KIRO_VERIFY_FULL_CRC: "true",
});
const originalConnect = Socket.prototype.connect;
const originalFetch = globalThis.fetch;
let socketAttempts = 0;
Socket.prototype.connect = function () {
  socketAttempts++;
  throw new Error("#15260 fixture forbids network sockets");
};
globalThis.fetch = async () => {
  throw new Error("#15260 fixture has not installed its upstream response");
};

const { KiroExecutor } = await import("../../open-sse/executors/kiro.ts");
const { ensureStreamReadiness, createStreamContentWatcher } =
  await import("../../open-sse/utils/streamReadiness.ts");
const { createStreamController, pipeWithDisconnect } =
  await import("../../open-sse/utils/streamHandler.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const CONTENT_BUDGET_MS = 100;
const ANSWER = "ANSWER_15260";
type Step = { event: string; payload?: unknown; delayMs?: number; bytes?: Uint8Array };
type RunOptions = {
  activeTimeoutMs?: number;
  cancelAfterProgress?: number;
  thinkingExpected?: boolean;
};

async function runKiroStream(t: TestContext, steps: Step[], options: RunOptions = {}) {
  t.mock.timers.enable({ apis: ["Date", "setTimeout"], now: Date.now() });
  const errors: string[] = [];
  const errorTimes: number[] = [];
  const sentSteps: { event: string; at: number }[] = [];
  const snapshots: { text: string; sawContent: boolean; reasoningProgress: number }[] = [];
  let startedAt = 0;
  let cancelled = 0;
  let aborts = 0;
  let fetches = 0;
  let sourceClosed = false;
  let upstream!: ReadableStreamDefaultController<Uint8Array>;
  const controller = createStreamController({
    clientResponseFormat: "openai",
    onError(event) {
      errors.push(String(event.message));
      errorTimes.push(Date.now() - startedAt);
      return true;
    },
  });
  controller.signal.addEventListener("abort", () => aborts++);
  const body = new ReadableStream<Uint8Array>({
    start(streamController) {
      upstream = streamController;
      upstream.enqueue(kiroEventFrame("contextUsageEvent", { contextUsagePercentage: 5 }));
    },
    cancel() {
      cancelled++;
      sourceClosed = true;
    },
  });
  globalThis.fetch = async (input, init) => {
    // API-key connections run on the regional Amazon Q host, us-east-1 included.
    assert.match(String(input), /^https:\/\/q\.us-east-1\.amazonaws\.com\//);
    assert.equal(init?.signal, controller.signal);
    fetches++;
    return new Response(body, {
      headers: { "Content-Type": "application/vnd.amazon.eventstream" },
    });
  };

  const executed = await new KiroExecutor().execute({
    model: "claude-sonnet-4.6",
    body: {
      conversationState: {
        currentMessage: {
          userInputMessage: {
            content: options.thinkingExpected
              ? "<thinking_mode>enabled</thinking_mode>hello"
              : "hello",
          },
        },
      },
    },
    stream: true,
    credentials: {
      apiKey: "kiro-15260-fixture-only",
      providerSpecificData: { authMethod: "api_key", region: "us-east-1" },
    },
    signal: controller.signal,
  });
  const ready = await ensureStreamReadiness(executed.response, {
    timeoutMs: 1000,
    maxTimeoutMs: 1000,
    provider: "kiro",
    model: "claude-sonnet-4.6",
  });
  assert.equal(ready.ok, true, "the first complete metadata frame must hand off readiness");
  if (!ready.ok) throw new Error("invalid readiness fixture");

  const stream = pipeWithDisconnect(ready.response, new TransformStream(), controller, {
    contentStallTimeoutMs: CONTENT_BUDGET_MS,
    stallTimeoutMs: 5000,
    activeTimeoutMs: options.activeTimeoutMs ?? 5000,
  });
  startedAt = Date.now();
  let text = "";
  const decoder = new TextDecoder();
  const reader = stream.getReader();
  const watcher = createStreamContentWatcher();
  const consumer = (async () => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      text += chunk;
      watcher.note(chunk);
      snapshots.push({
        text: chunk,
        sawContent: watcher.sawContent(),
        reasoningProgress: watcher.reasoningProgress(),
      });
      if (
        options.cancelAfterProgress &&
        watcher.reasoningProgress() >= options.cancelAfterProgress
      ) {
        await reader.cancel("synthetic client cancellation");
        break;
      }
    }
    text += decoder.decode();
    watcher.finish();
  })();
  let finished = false;
  try {
    await nextTurn();
    for (const step of steps) {
      t.mock.timers.tick(step.delayMs ?? 25);
      await nextTurn();
      if (sourceClosed || controller.signal.aborted) break;
      sentSteps.push({ event: step.event, at: Date.now() - startedAt });
      upstream.enqueue(step.bytes ?? kiroEventFrame(step.event, step.payload));
      // Let the actual decoder and watchdog consume each fragment before advancing
      // logical time. A busy host must not turn a 5ms fixture gap into a 100ms stall.
      await nextTurn();
    }
    if (!sourceClosed && !controller.signal.aborted) {
      sourceClosed = true;
      upstream.close();
    }
    await consumer;
    finished = true;
    if (options.cancelAfterProgress) {
      t.mock.timers.tick(CONTENT_BUDGET_MS * 2);
      await nextTurn();
    }
  } finally {
    await reader.cancel().catch(() => {});
    if (!finished) controller.abort();
    await consumer;
  }
  assert.equal(fetches, 1);
  assert.equal(socketAttempts, 0);
  return {
    text,
    errors,
    errorTimes,
    sentSteps,
    snapshots,
    cancelled,
    aborts,
    durationMs: Date.now() - startedAt,
    watcher,
  };
}

test(
  "#15260 setup control: real Kiro executor/readiness/watchdog deliver text",
  { timeout: 5000 },
  async (t) => {
    const result = await runKiroStream(t, [
      { event: "assistantResponseEvent", payload: { content: ANSWER } },
      { event: "messageStopEvent", payload: {} },
    ]);
    assert.deepEqual(result.errors, []);
    assert.match(result.text, /ANSWER_15260/);
    assert.equal(result.cancelled, 0);
    assert.equal(result.aborts, 0);
  }
);

test(
  "#15260 Kiro signatures keep the real content watchdog live until the answer",
  { timeout: 5000 },
  async (t) => {
    const result = await runKiroStream(t, [
      ...Array.from({ length: 12 }, (_, i) => ({
        event: "reasoningContentEvent",
        payload: { signature: `synthetic-signature-${i}` },
      })),
      { event: "assistantResponseEvent", payload: { content: ANSWER } },
      { event: "messageStopEvent", payload: {} },
    ]);
    console.log(
      "KIRO_15260_LIVENESS",
      JSON.stringify({
        errors: result.errors,
        cancelled: result.cancelled,
        durationMs: result.durationMs,
      })
    );
    assert.deepEqual(result.errors, [], "active native reasoning must not trigger content stall");
    assert.match(result.text, /ANSWER_15260/);
    assert.doesNotMatch(result.text, /synthetic-signature/);
    assert.equal(result.cancelled, 0);
    assert.equal(result.aborts, 0);
    const firstAnswer = result.snapshots.findIndex((entry) => entry.text.includes(ANSWER));
    const reasoning = result.snapshots
      .slice(0, firstAnswer)
      .filter((entry) => entry.reasoningProgress > 0);
    assert.equal(Math.max(...reasoning.map((entry) => entry.reasoningProgress)), 12);
    assert.equal(
      reasoning.every((entry) => entry.sawContent === false),
      true
    );
  }
);

test("#15260 native reasoning text still keeps the watchdog live", { timeout: 5000 }, async (t) => {
  const result = await runKiroStream(t, [
    ...Array.from({ length: 12 }, () => ({
      event: "reasoningContentEvent",
      payload: { reasoningText: { text: "thinking" } },
    })),
    { event: "assistantResponseEvent", payload: { content: ANSWER } },
  ]);
  assert.deepEqual(result.errors, []);
  assert.match(result.text, /thinking/);
  assert.match(result.text, /ANSWER_15260/);
  assert.equal(result.aborts, 0);
});

test("#15260 inline thinking still keeps the watchdog live", { timeout: 5000 }, async (t) => {
  const result = await runKiroStream(
    t,
    [
      { event: "assistantResponseEvent", payload: { content: "<thinking>" } },
      ...Array.from({ length: 12 }, () => ({
        event: "assistantResponseEvent",
        payload: { content: "thinking" },
      })),
      { event: "assistantResponseEvent", payload: { content: `</thinking>${ANSWER}` } },
    ],
    { thinkingExpected: true }
  );
  assert.deepEqual(result.errors, []);
  assert.match(result.text, /reasoning_content/);
  assert.match(result.text, /ANSWER_15260/);
});

test(
  "#15260 fragmented prelude, headers and payload preserve complete reasoning events",
  { timeout: 5000 },
  async (t) => {
    const steps: Step[] = [];
    for (let i = 0; i < 12; i++) {
      const frame = kiroEventFrame("reasoningContentEvent", {
        signature: `synthetic-signature-${i}`,
      });
      const headerEnd = 12 + new DataView(frame.buffer).getUint32(4, false);
      const boundaries = [0, 7, 12, headerEnd, frame.length - 4, frame.length];
      for (let j = 1; j < boundaries.length; j++) {
        steps.push({
          event: "fragment",
          bytes: frame.slice(boundaries[j - 1], boundaries[j]),
          delayMs: 5,
        });
      }
    }
    steps.push({ event: "assistantResponseEvent", payload: { content: ANSWER } });
    const result = await runKiroStream(t, steps);
    assert.deepEqual(result.errors, []);
    assert.equal(result.watcher.reasoningProgress(), 12);
    assert.match(result.text, /ANSWER_15260/);
    assert.doesNotMatch(result.text, /synthetic-signature/);
  }
);

for (const [label, event, payload] of [
  ["metadata", "contextUsageEvent", { contextUsagePercentage: 8 }],
  ["unknown event with a signature", "unknownEvent", { signature: "not-reasoning" }],
  ["empty reasoning signature", "reasoningContentEvent", { text: "", signature: " " }],
] as const) {
  test(`#15260 ${label} does not postpone content stall`, { timeout: 5000 }, async (t) => {
    const result = await runKiroStream(
      t,
      Array.from({ length: 12 }, () => ({ event, payload }))
    );
    assert.equal(result.errors.length, 1);
    assert.match(result.errors[0], /stream content stall/);
    assert.equal(result.watcher.reasoningProgress(), 0);
    assert.equal(result.watcher.sawContent(), false);
    assert.equal(result.cancelled, 1);
    assert.equal(result.aborts, 1);
  });
}

test(
  "#15260 incomplete and corrupt reasoning frames are not progress",
  { timeout: 5000 },
  async (t) => {
    const corrupt = kiroEventFrame("reasoningContentEvent", { signature: "corrupt" });
    corrupt[corrupt.length - 1] ^= 0xff;
    const incomplete = kiroEventFrame("reasoningContentEvent", { signature: "incomplete" });
    const result = await runKiroStream(t, [
      { event: "corrupt", bytes: corrupt },
      ...Array.from({ length: 12 }, (_, i) => ({
        event: "incomplete",
        bytes: incomplete.slice(i, i + 1),
        delayMs: 10,
      })),
    ]);
    assert.equal(result.errors.length, 1);
    assert.match(result.errors[0], /stream content stall/);
    assert.equal(result.watcher.reasoningProgress(), 0);
    assert.equal(result.cancelled, 1);
  }
);

test(
  "#15260 metadata after reasoning stops still expires one content budget later",
  { timeout: 5000 },
  async (t) => {
    const result = await runKiroStream(t, [
      ...Array.from({ length: 4 }, () => ({
        event: "reasoningContentEvent",
        payload: { signature: "synthetic" },
      })),
      ...Array.from({ length: 12 }, () => ({
        event: "contextUsageEvent",
        payload: { contextUsagePercentage: 8 },
      })),
    ]);
    assert.equal(result.errors.length, 1);
    assert.match(result.errors[0], /stream content stall/);
    assert.equal(result.watcher.reasoningProgress(), 4);
    const lastProgress = result.sentSteps
      .filter((step) => step.event === "reasoningContentEvent")
      .at(-1)!;
    assert.equal(result.errorTimes[0] - lastProgress.at, CONTENT_BUDGET_MS);
    assert.equal(result.cancelled, 1);
  }
);

test(
  "#15260 opaque reasoning cannot extend the independent active timeout",
  { timeout: 5000 },
  async (t) => {
    const result = await runKiroStream(
      t,
      Array.from({ length: 30 }, () => ({
        event: "reasoningContentEvent",
        payload: { signature: "synthetic" },
      })),
      { activeTimeoutMs: 175 }
    );
    assert.deepEqual(result.errors, ["stream active timeout"]);
    assert.equal(result.cancelled, 1);
    assert.equal(result.aborts, 1);
    assert.equal(result.watcher.sawContent(), false);
  }
);

test(
  "#15260 client cancellation stops reasoning and clears watchdogs",
  { timeout: 5000 },
  async (t) => {
    const result = await runKiroStream(
      t,
      Array.from({ length: 30 }, () => ({
        event: "reasoningContentEvent",
        payload: { signature: "synthetic" },
      })),
      { cancelAfterProgress: 2, activeTimeoutMs: 175 }
    );
    assert.deepEqual(result.errors, []);
    assert.equal(result.cancelled, 1);
    assert.equal(result.aborts, 1);
    assert.equal(result.watcher.reasoningProgress(), 2);
  }
);

test.after(() => {
  globalThis.fetch = originalFetch;
  Socket.prototype.connect = originalConnect;
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
