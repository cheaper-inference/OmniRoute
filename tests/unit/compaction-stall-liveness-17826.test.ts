import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import test from "node:test";
import { setTimeout as sleep } from "node:timers/promises";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-17826-"));
process.env.DATA_DIR = dataDir;

const { pipeWithDisconnect, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");
const { createStreamContentWatcher, isCompactionProgressFrame, hasUsefulStreamContent } =
  await import("../../open-sse/utils/streamReadiness.ts");

const encoder = new TextEncoder();
const frame = (event: string, payload: Record<string, unknown>) =>
  encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`);
const COMPACTION_EVENT = "response.compaction.compacting";

// --- Unit level: the classifier and the watcher counter ---

test("#17826 compaction progress event frames are liveness, never content", () => {
  const wire = `event: ${COMPACTION_EVENT}\ndata: {"type":"${COMPACTION_EVENT}"}\n\n`;
  assert.equal(isCompactionProgressFrame(wire), true);
  // Progress frames are not user-visible output: the #8649 empty-content guard
  // must keep seeing a compaction-only stream as empty.
  assert.equal(hasUsefulStreamContent(wire), false);
  const watcher = createStreamContentWatcher();
  watcher.note(wire);
  watcher.finish();
  assert.equal(watcher.compactionProgress(), 1);
  assert.equal(watcher.sawContent(), false);
});

test("#17826 compaction progress rides the type field alone (no event line)", () => {
  const wire = `data: {"type":"${COMPACTION_EVENT}","item_id":"item_1"}\n\n`;
  assert.equal(isCompactionProgressFrame(wire), true);
  const watcher = createStreamContentWatcher();
  watcher.note(wire);
  watcher.finish();
  assert.equal(watcher.compactionProgress(), 1);
  assert.equal(watcher.sawContent(), false);
});

test("#17826 a compaction frame split across chunks is counted once", () => {
  const wire = `event: ${COMPACTION_EVENT}\ndata: {"type":"${COMPACTION_EVENT}"}\n\n`;
  const watcher = createStreamContentWatcher();
  watcher.note(wire.slice(0, 13));
  assert.equal(watcher.compactionProgress(), 0);
  watcher.note(wire.slice(13));
  watcher.finish();
  assert.equal(watcher.compactionProgress(), 1);
});

const nonProgressCases: [string, string][] = [
  ["Responses lifecycle event", `event: response.created\ndata: {"type":"response.created"}\n\n`],
  [
    "Responses in_progress keepalive",
    `event: response.in_progress\ndata: {"type":"response.in_progress"}\n\n`,
  ],
  ["ping event", `event: ping\ndata: {"type":"ping"}\n\n`],
  [
    "reasoning item event",
    `event: response.output_item.added\ndata: {"type":"response.output_item.added","item":{"type":"reasoning"}}\n\n`,
  ],
  ["plain chat delta", `data: {"choices":[{"index":0,"delta":{"role":"assistant"}}]}\n\n`],
];
for (const [name, wire] of nonProgressCases) {
  test(`#17826 ${name} is not a compaction progress frame`, () => {
    assert.equal(isCompactionProgressFrame(wire), false);
    const watcher = createStreamContentWatcher();
    watcher.note(wire);
    watcher.finish();
    assert.equal(watcher.compactionProgress(), 0);
  });
}

// --- Handler level: the content-stall watchdog under pipeWithDisconnect ---

type Step = { frame?: Uint8Array; delayMs: number; close?: boolean };

async function runContentStallScenario(
  steps: Step[],
  contentStallTimeoutMs: number
): Promise<{ errors: string[]; errorTimes: number[]; chunks: number }> {
  let upstream!: ReadableStreamDefaultController<Uint8Array>;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      upstream = controller;
    },
  });
  const controller = createStreamController({
    clientResponseFormat: "openai",
    onError(_event) {
      return true;
    },
  });
  const errors: string[] = [];
  const errorElapsedMs: number[] = [];
  const startedAt = performance.now();
  // Observe through the wrapped controller: pipeWithDisconnect forwards to
  // streamController.handleError exactly once per watchdog kind.
  const observedController = {
    ...controller,
    handleError: (e: unknown) => {
      errors.push(e instanceof Error ? e.message : String(e));
      errorElapsedMs.push(performance.now() - startedAt);
      controller.handleError(e);
    },
  };
  const emitLoop = (async () => {
    for (const step of steps) {
      if (step.delayMs > 0) await sleep(step.delayMs);
      try {
        if (step.close) {
          upstream.close();
          return;
        }
        if (step.frame) upstream.enqueue(step.frame);
      } catch {
        // The watchdog (or a test race) already closed the source; stop emitting.
        return;
      }
    }
    try {
      upstream.close();
    } catch {
      // already closed by the watchdog path
    }
  })();
  const piped = pipeWithDisconnect(
    new Response(body, { headers: { "content-type": "text/event-stream" } }),
    new TransformStream<Uint8Array, Uint8Array>(),
    observedController,
    { contentStallTimeoutMs, stallTimeoutMs: 0, activeTimeoutMs: 0 }
  );
  const reader = piped.getReader();
  let chunks = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks += 1;
  }
  await emitLoop;
  return { errors, errorElapsedMs, chunks };
}

const CREATED = frame("response.created", { type: "response.created" });
const compactionStep = (delayMs: number): Step => ({
  frame: frame(COMPACTION_EVENT, { type: COMPACTION_EVENT }),
  delayMs,
});
const pingStep = (delayMs: number): Step => ({
  frame: frame("ping", { type: "ping" }),
  delayMs,
});

test("#17826 control: a lifecycle/ping-only stream still trips the content stall", async () => {
  const steps: Step[] = [
    { frame: CREATED, delayMs: 0 },
    pingStep(40),
    pingStep(40),
    pingStep(40),
    pingStep(40),
    pingStep(40),
    pingStep(40),
    { close: true, delayMs: 40 },
  ];
  const { errors } = await runContentStallScenario(steps, 120);
  assert.equal(
    errors.some((message) => message.includes("stream content stall")),
    true,
    `expected a content stall, got: ${JSON.stringify(errors)}`
  );
});

test("#17826 remote compaction progress keeps the content-stall watchdog standing down", async () => {
  const steps: Step[] = [
    { frame: CREATED, delayMs: 0 },
    // ~400ms of compaction progress against a 120ms budget: the pre-fix
    // watchdog fired at ~120ms even though upstream compaction was running.
    compactionStep(40),
    compactionStep(40),
    compactionStep(40),
    compactionStep(40),
    compactionStep(40),
    compactionStep(40),
    compactionStep(40),
    compactionStep(40),
    // The turn ends cleanly after compaction.
    { close: true, delayMs: 30 },
  ];
  const { errors } = await runContentStallScenario(steps, 120);
  assert.deepEqual(
    errors.filter((message) => message.includes("stream content stall")),
    [],
    `compaction progress must not be reported as a stall, got: ${JSON.stringify(errors)}`
  );
});

test("#17826 a stream that stops compacting and only pings afterwards is still caught", async () => {
  const steps: Step[] = [
    { frame: CREATED, delayMs: 0 },
    compactionStep(40),
    compactionStep(40),
    compactionStep(40),
    // Compaction stopped at ~120ms; from here only heartbeats arrive.
    pingStep(40),
    pingStep(40),
    pingStep(40),
    pingStep(40),
    pingStep(40),
    pingStep(40),
    pingStep(40),
    pingStep(40),
    { close: true, delayMs: 40 },
  ];
  const { errors, errorElapsedMs } = await runContentStallScenario(steps, 120);
  const stallIndex = errors.findIndex((message) => message.includes("stream content stall"));
  assert.notEqual(stallIndex, -1, "expected the watchdog to fire after progress stops");
  // The last progress frame landed ~120ms in; a restarted budget must push
  // the fire past ~240ms — a pre-fix watchdog fired at ~120ms instead.
  assert.ok(
    errorElapsedMs[stallIndex] >= 200,
    `watchdog fired at ${errorElapsedMs[stallIndex]}ms, expected a restarted budget (>=200ms)`
  );
});
