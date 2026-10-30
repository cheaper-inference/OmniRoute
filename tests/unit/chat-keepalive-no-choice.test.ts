import test from "node:test";
import assert from "node:assert/strict";
import {
  OPENAI_KEEPALIVE_FRAME,
  OPENAI_STARTUP_FRAME,
  withEarlyStreamKeepalive,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";
import {
  createSseHeartbeatTransform,
  HEARTBEAT_SHAPES,
} from "../../open-sse/utils/sseHeartbeat.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const frame = (delta: object, finish_reason: string | null = null) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-real",
    object: "chat.completion.chunk",
    created: 42,
    model: "real-model",
    choices: [{ index: 0, delta, finish_reason }],
  })}\n\n`;
const toolFrames = [
  frame({ role: "assistant" }),
  frame({
    tool_calls: [
      {
        index: 0,
        id: "call-real",
        type: "function",
        function: { name: "get_self", arguments: '{"reason":"ready"}' },
      },
    ],
  }),
  frame({}, "tool_calls"),
];

function parseFrames(bytes: Uint8Array) {
  return decoder
    .decode(bytes)
    .split("\n\n")
    .filter((entry) => entry && entry !== "data: [DONE]")
    .map((entry) => {
      assert.match(entry, /^data: /, "strict JSON clients must not receive comments");
      return JSON.parse(entry.slice(6));
    });
}

for (const [name, bytes] of [
  ["startup", OPENAI_STARTUP_FRAME],
  ["recurring", OPENAI_KEEPALIVE_FRAME],
] as const) {
  test(`Chat Completions ${name} heartbeat cannot start an application message (#18410)`, () => {
    const [payload] = parseFrames(bytes);
    assert.equal(payload.object, "chat.completion.chunk");
    assert.deepEqual(payload.choices, [], "a heartbeat must not create an untyped choice");
    assert.equal(payload.usage, undefined, "a heartbeat must not fabricate token usage");
  });
}

test("slow startup keeps the first application choice and tool frames upstream-owned", async () => {
  let resolve!: (response: Response) => void;
  const upstream = new Promise<Response>((done) => {
    resolve = done;
  });
  const response = await withEarlyStreamKeepalive(upstream, {
    thresholdMs: 1,
    keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
    startupFrame: OPENAI_STARTUP_FRAME,
  });
  const reader = response.body!.getReader();
  const first = await reader.read();
  resolve(
    new Response(toolFrames.join("") + "data: [DONE]\n\n", {
      headers: { "content-type": "text/event-stream" },
    })
  );
  let forwarded = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    forwarded += decoder.decode(value);
  }
  assert.equal(forwarded, toolFrames.join("") + "data: [DONE]\n\n");
  const applicationFrames = parseFrames(
    encoder.encode(decoder.decode(first.value) + forwarded)
  ).filter((payload) => payload.choices.length > 0);
  assert.deepEqual(
    applicationFrames,
    toolFrames.flatMap((value) => parseFrames(encoder.encode(value)))
  );
});

test("midstream keepalives before and between tool fragments add no application choices", async (t) => {
  t.mock.timers.enable({ apis: ["setInterval"] });
  const transform = createSseHeartbeatTransform({
    intervalMs: 10,
    shape: HEARTBEAT_SHAPES.OPENAI_CHUNK,
  });
  const writer = transform.writable.getWriter();
  const output = new Response(transform.readable).text();
  t.mock.timers.tick(10);
  await writer.write(encoder.encode(toolFrames[0]));
  t.mock.timers.tick(10);
  await writer.write(encoder.encode(toolFrames[1]));
  t.mock.timers.tick(10);
  await writer.write(encoder.encode(toolFrames[2] + "data: [DONE]\n\n"));
  await writer.close();
  t.mock.timers.tick(10);
  const payloads = parseFrames(encoder.encode(await output));
  const keepalives = payloads.filter((payload) => payload.id === "chatcmpl-keepalive");
  assert.equal(keepalives.length, 3);
  for (const keepalive of keepalives) assert.deepEqual(keepalive.choices, []);
  assert.deepEqual(
    payloads.filter((payload) => payload.choices.length > 0),
    toolFrames.flatMap((value) => parseFrames(encoder.encode(value)))
  );
});
