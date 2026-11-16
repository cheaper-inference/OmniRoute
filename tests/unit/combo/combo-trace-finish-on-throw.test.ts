import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// F-C4-18 (1): handleComboChat finished the decision trace only on the normal return path. When
// the combo handler threw, the terminal status stayed null, the summary log line was never
// written and the trace could not tell a crashed invocation from one still in flight.
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-trace-throw-"));

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { createInvocationId, getComboTrace, resetComboTraceStore } =
  await import("../../../open-sse/services/combo/decisionTrace.ts");

const noop = () => {};

function options(invocationId: string, info: (...args: unknown[]) => void = noop) {
  return {
    invocationId,
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: {
      name: "trace-throw",
      strategy: "priority",
      models: ["openai/a", "openai/b"],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () => new Response("{}", { status: 200 }),
    isModelAvailable: async () => true,
    // A signal whose reads throw stands in for any defect that escapes the combo loop after the
    // trace has started (the trace starts before the signal is first read).
    signal: new Proxy(
      {},
      {
        get() {
          throw new Error("combo exploded");
        },
      }
    ),
    log: { info, warn: noop, debug: noop, error: noop },
    settings: null,
    allCombos: null,
  } as unknown as Parameters<typeof handleComboChat>[0];
}

test.beforeEach(() => resetComboTraceStore());

test("a combo that throws still finishes its trace and logs the summary, and the error propagates", async () => {
  const invocationId = createInvocationId();
  const lines: string[] = [];
  await assert.rejects(
    handleComboChat(options(invocationId, (...args) => lines.push(args.join(" ")))),
    /combo exploded/
  );
  const trace = getComboTrace(invocationId);
  assert.ok(trace, "the trace must exist");
  assert.notEqual(trace.terminal, null, "a thrown combo must not leave the trace unfinished");
  assert.equal(trace.terminal?.status, 500);
  assert.ok(
    lines.some((line) => line.includes(`combo trace ${invocationId} terminal=`)),
    `the summary log line must be written, got ${JSON.stringify(lines)}`
  );
});

test("a combo that returns normally keeps its real terminal status", async () => {
  const invocationId = createInvocationId();
  const response = await handleComboChat({
    invocationId,
    body: { messages: [{ role: "user", content: "ping" }] },
    combo: { name: "trace-ok", strategy: "priority", models: ["openai/a"], config: {} },
    handleSingleModel: async () =>
      new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      ),
    isModelAvailable: async () => true,
    log: { info: noop, warn: noop, debug: noop, error: noop },
    settings: null,
    allCombos: null,
  } as unknown as Parameters<typeof handleComboChat>[0]);
  assert.equal(response.status, 200);
  assert.equal(getComboTrace(invocationId)?.terminal?.status, 200);
});

test("a trace log line that throws does not replace the combo's own error", async () => {
  const invocationId = createInvocationId();
  await assert.rejects(
    handleComboChat(
      options(invocationId, (...args) => {
        if (String(args[1]).startsWith("combo trace ")) throw new Error("log failed");
      })
    ),
    /combo exploded/
  );
  assert.equal(getComboTrace(invocationId)?.terminal?.status, 500);
});
