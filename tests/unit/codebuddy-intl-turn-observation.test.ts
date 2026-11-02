// I1 — the turn report must describe what the STREAM actually carried.
//
// `usage` and the first-token instant do not exist when `execute()` returns:
// the CLI asks for `stream_options.include_usage`, so both live in the SSE
// events. These tests pin the observation layer that reads them off the
// pass-through tap, and pin that a stream which never sends usage reports NO
// usage instead of a fabricated one.
import test from "node:test";
import assert from "node:assert/strict";

import {
  createTurnObservationSink,
  observePayload,
  tapResponseForObservation,
  type TurnObservation,
} from "../../open-sse/executors/codebuddy-intl/turnObservation.ts";

const sse = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;

function sinkOver(chunks: string[]) {
  const sink = createTurnObservationSink();
  for (const chunk of chunks) sink.observe(chunk);
  sink.end();
  return sink.state;
}

test("the usage block comes from the stream, not from a caller-supplied value", () => {
  const state = sinkOver([
    sse({ choices: [{ index: 0, delta: { role: "assistant", content: "" } }] }),
    sse({ choices: [{ index: 0, delta: { content: "hello" } }] }),
    sse({
      choices: [],
      usage: { prompt_tokens: 11, completion_tokens: 7, total_tokens: 18 },
    }),
    "data: [DONE]\n\n",
  ]);

  assert.deepEqual(state.usage, { prompt_tokens: 11, completion_tokens: 7, total_tokens: 18 });
});

test("the LAST usage block on the stream wins", () => {
  const state = sinkOver([
    sse({ choices: [{ delta: { content: "a" } }], usage: { total_tokens: 1 } }),
    sse({ choices: [{ delta: { content: "b" } }], usage: { total_tokens: 42 } }),
  ]);

  assert.deepEqual(state.usage, { total_tokens: 42 });
});

test("first-token time is stamped on the first chunk that carries output", () => {
  let now = 1_000;
  const sink = createTurnObservationSink(() => now);

  sink.observe(sse({ choices: [{ delta: { role: "assistant", content: "" } }] }));
  assert.equal(sink.state.firstTokenAtMs, undefined, "a role-only chunk is not a token");

  now = 1_750;
  sink.observe(sse({ choices: [{ delta: { content: "h" } }] }));
  assert.equal(sink.state.firstTokenAtMs, 1_750);

  now = 9_000;
  sink.observe(sse({ choices: [{ delta: { content: "i" } }] }));
  assert.equal(sink.state.firstTokenAtMs, 1_750, "only the FIRST token is stamped");
});

test("reasoning and tool-call deltas also count as the first token", () => {
  let now = 10;
  const reasoning = createTurnObservationSink(() => now);
  reasoning.observe(sse({ choices: [{ delta: { reasoning_content: "thinking" } }] }));
  assert.equal(reasoning.state.firstTokenAtMs, 10);

  now = 20;
  const toolCall = createTurnObservationSink(() => now);
  toolCall.observe(sse({ choices: [{ delta: { tool_calls: [{ index: 0 }] } }] }));
  assert.equal(toolCall.state.firstTokenAtMs, 20);
});

test("events split across chunk boundaries are still parsed", () => {
  const whole = sse({
    choices: [{ delta: { content: "x" } }],
    usage: { total_tokens: 5 },
  });
  const chunks: string[] = [];
  for (let i = 0; i < whole.length; i += 7) chunks.push(whole.slice(i, i + 7));

  const state = sinkOver(chunks);
  assert.deepEqual(state.usage, { total_tokens: 5 });
  assert.equal(typeof state.firstTokenAtMs, "number");
});

test("malformed and non-data lines are ignored, never thrown", () => {
  const state = sinkOver([
    ": keep-alive comment\n",
    "event: message\n",
    "data: not-json\n",
    sse({ choices: [{ delta: { content: "ok" } }] }),
  ]);

  assert.equal(state.sawEvent, true);
  assert.equal(typeof state.firstTokenAtMs, "number");
  assert.equal(state.usage, undefined);
});

test("a stream that never reports usage leaves usage undefined", () => {
  const state = sinkOver([
    sse({ choices: [{ delta: { content: "only text" } }] }),
    "data: [DONE]\n\n",
  ]);
  assert.equal(state.usage, undefined);
});

test("observePayload ignores a non-object usage instead of trusting it", () => {
  const state: TurnObservation = { sawEvent: false };
  observePayload({ choices: [], usage: "n/a" }, state);
  observePayload({ choices: [], usage: {} }, state);
  assert.equal(state.usage, undefined);
});

test("the tap forwards the exact bytes and reports on stream end", async () => {
  const encoder = new TextEncoder();
  const payload = sse({ choices: [{ delta: { content: "hi" } }] });
  const upstream = new Response(payload, { status: 200 });

  const sink = createTurnObservationSink();
  let observed: TurnObservation | undefined;
  const tapped = tapResponseForObservation(upstream, sink, (state) => {
    observed = state;
  });

  // The client sees the very same bytes.
  assert.equal(await tapped.text(), payload);
  assert.equal(observed?.sawEvent, true);
  assert.equal(typeof observed?.firstTokenAtMs, "number");
  // Encoding round-trip sanity: the tap does not re-encode the payload.
  assert.equal(
    encoder.encode(payload).length,
    encoder.encode(await new Response(payload).text()).length
  );
});

test("an abandoned stream still closes the observation exactly once", async () => {
  const upstream = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(sse({ choices: [{ delta: { content: "a" } }] }))
        );
        // Never closes: the client abandons the turn.
      },
    })
  );

  const sink = createTurnObservationSink();
  let calls = 0;
  const tapped = tapResponseForObservation(upstream, sink, () => {
    calls += 1;
  });

  const reader = tapped.body!.getReader();
  await reader.read();
  await reader.cancel("client went away");

  assert.equal(calls, 1);
});

test("a body-less response is returned untouched", () => {
  const response = new Response(null, { status: 204 });
  const sink = createTurnObservationSink();
  const tapped = tapResponseForObservation(response, sink, () => {
    throw new Error("must not report without a body");
  });
  assert.equal(tapped, response);
});
