import test from "node:test";
import assert from "node:assert/strict";
import v8 from "node:v8";
import vm from "node:vm";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

// Tool-argument deltas must be emitted as the incoming fragment itself. Slicing the
// grown buffer flattens it and makes every emitted delta a view that pins the whole
// old prefix, so a live stream retained O(n^2) bytes (94 MiB for 94 KiB of arguments).
v8.setFlagsFromString("--expose-gc");
const gc = vm.runInNewContext("gc") as () => void;

const FRAGMENTS = 2000;
const FRAGMENT_LEN = 48;
const MAX_RETAINED_BYTES = 20 * 1024 * 1024;

const fragment = (i: number) => String(i).padStart(FRAGMENT_LEN, "a");
const chunk = (args: string, extra: Record<string, unknown> = {}) => ({
  id: "chatcmpl-pin",
  model: "gpt-test",
  choices: [
    {
      index: 0,
      delta: { tool_calls: [{ index: 0, function: { arguments: args }, ...extra }] },
      finish_reason: null,
    },
  ],
});
const head = chunk("", { id: "call_pin", type: "function" });
(head.choices[0].delta.tool_calls[0].function as Record<string, unknown>).name = "write_file";

function heapAfterGc(): number {
  gc();
  gc();
  return process.memoryUsage().heapUsed;
}

function retainedBytes(run: () => unknown): number {
  const before = heapAfterGc();
  const kept = run();
  const after = heapAfterGc();
  assert.ok(kept);
  return after - before;
}

test("Claude stream: emitted tool-argument deltas do not pin the accumulated prefix", () => {
  const retained = retainedBytes(() => {
    const state = { toolCalls: new Map() };
    const deltas: string[] = [];
    for (const first of [head]) openaiToClaudeResponse(first, state);
    for (let i = 0; i < FRAGMENTS; i++) {
      for (const ev of openaiToClaudeResponse(chunk(fragment(i)), state) || []) {
        if (ev.delta?.type === "input_json_delta") deltas.push(ev.delta.partial_json);
      }
    }
    assert.equal(
      deltas.join(""),
      Array.from({ length: FRAGMENTS }, (_, i) => fragment(i)).join("")
    );
    // Drop the translator state but keep the emitted deltas, like a live summary does.
    return deltas;
  });
  assert.ok(retained < MAX_RETAINED_BYTES, `retained ${retained} bytes for emitted deltas`);
});

test("Responses stream: emitted tool-argument deltas do not pin the accumulated prefix", () => {
  const retained = retainedBytes(() => {
    const state = initState(FORMATS.OPENAI_RESPONSES) as Record<string, unknown>;
    state.toolSchemas = new Map([["write_file", {}]]); // declared names publish at once
    const deltas: string[] = [];
    const collect = (events: Array<{ data?: { type?: string; delta?: string } }>) => {
      for (const ev of events || []) {
        if (ev.data?.type === "response.function_call_arguments.delta") deltas.push(ev.data.delta!);
      }
    };
    collect(openaiToOpenAIResponsesResponse(head, state));
    for (let i = 0; i < FRAGMENTS; i++) {
      collect(openaiToOpenAIResponsesResponse(chunk(fragment(i)), state));
    }
    assert.equal(
      deltas.join(""),
      Array.from({ length: FRAGMENTS }, (_, i) => fragment(i)).join("")
    );
    return deltas;
  });
  assert.ok(retained < MAX_RETAINED_BYTES, `retained ${retained} bytes for emitted deltas`);
});

test("Claude stream: snapshot repeat, snapshot growth and incremental repeats keep exact bytes", () => {
  const state = { toolCalls: new Map() };
  openaiToClaudeResponse(head, state);
  const emitted: string[] = [];
  for (const args of ['{"a":', '{"a":', '{"a":1', "1,", "1,", '"b":2}']) {
    for (const ev of openaiToClaudeResponse(chunk(args), state) || []) {
      if (ev.delta?.type === "input_json_delta") emitted.push(ev.delta.partial_json);
    }
  }
  // repeat is dropped, growth emits only the new tail, "1," twice is incremental (kept).
  assert.deepEqual(emitted, ['{"a":', "1", "1,", "1,", '"b":2}']);
});

test("Responses stream: emitted deltas from growing snapshots do not pin each snapshot", () => {
  const SNAPSHOTS = 1500; // 48 B * 1500 * 1501 / 2 = ~54 MB if every snapshot stays pinned
  const retained = retainedBytes(() => {
    const state = initState(FORMATS.OPENAI_RESPONSES) as Record<string, unknown>;
    state.toolSchemas = new Map([["write_file", {}]]);
    const deltas: string[] = [];
    const collect = (events: Array<{ data?: { type?: string; delta?: string } }>) => {
      for (const ev of events || []) {
        if (ev.data?.type === "response.function_call_arguments.delta") deltas.push(ev.data.delta!);
      }
    };
    collect(openaiToOpenAIResponsesResponse(head, state));
    // Upstream re-sends the whole argument string on every chunk (a growing snapshot).
    let snapshot = "";
    for (let i = 0; i < SNAPSHOTS; i++) {
      snapshot += fragment(i);
      collect(openaiToOpenAIResponsesResponse(chunk(snapshot), state));
    }
    assert.equal(
      deltas.join(""),
      Array.from({ length: SNAPSHOTS }, (_, i) => fragment(i)).join("")
    );
    return deltas;
  });
  assert.ok(retained < MAX_RETAINED_BYTES, `retained ${retained} bytes for emitted deltas`);
});
