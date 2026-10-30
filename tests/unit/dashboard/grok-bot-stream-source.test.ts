import test from "node:test";
import assert from "node:assert/strict";

const { readTranscriptStream } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/stream.ts");

function bodyOf(chunks: string[], status = 200): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(encoder.encode(chunk));
      controller.close();
    },
  });
  return new Response(body, { status });
}

async function drain(
  response: Response,
  cursor = { phase: "live", after: "10" },
  deps: Record<string, unknown> = {}
) {
  const frames: unknown[] = [];
  const stream = readTranscriptStream("conn-1", "agent-1", cursor, new AbortController().signal, {
    fetchImpl: async () => response,
    ...deps,
  });
  for await (const frame of stream) frames.push(frame);
  return frames;
}

test("frames split across reads are reassembled and yielded once each", async () => {
  const frames = await drain(
    bodyOf([
      'data: {"seq":"11","entryKind":"message"}\n\n',
      'event: message\ndata: {"seq":"12","entryKi',
      'nd":"send-message"}\n\n',
    ])
  );
  assert.deepEqual(
    frames.map((frame) => (frame as { seq: string }).seq),
    ["11", "12"]
  );
});

test("the cursor and account reach the route as query parameters", async () => {
  let seen = "";
  const stream = readTranscriptStream(
    "conn/1",
    "agent-1",
    { phase: "snapshot", after: "42" },
    new AbortController().signal,
    {
      fetchImpl: async (input: string | URL | Request) => {
        seen = String(input);
        return bodyOf([]);
      },
    }
  );
  for await (const frame of stream) void frame;
  assert.match(seen, /\/api\/providers\/conn%2F1\/grok-bot\/transcript\?/);
  assert.match(seen, /agentId=agent-1/);
  assert.match(seen, /after=42/);
  assert.match(seen, /phase=snapshot/);
});

test("a spent grant reports through onReauth and throws 409", async () => {
  let told = false;
  await assert.rejects(
    () =>
      drain(new Response(null, { status: 409 }), undefined, {
        onReauth: () => {
          told = true;
        },
      }),
    /transcript 409/
  );
  assert.equal(told, true);
});

test("a full watch table pauses, keeps reauth silent, and marks the fault admission", async () => {
  let told = false;
  let paused = 0;
  const failure = await drain(new Response(null, { status: 429 }), undefined, {
    onReauth: () => {
      told = true;
    },
    sleep: async (millis: number) => {
      paused = millis;
    },
  }).then(
    () => null,
    (error: Error & { admission?: boolean }) => error
  );
  assert.equal(failure?.message, "transcript 429");
  assert.equal(failure?.admission, true);
  assert.equal(paused, 2000);
  assert.equal(told, false, "an admission rejection is not a spent grant");
});

test("the route's error frame ends the read instead of yielding an empty object", async () => {
  await assert.rejects(() => drain(bodyOf(["event: error\ndata: {}\n\n"])), /reported an error/);
});

test("an event outside the whitelist is dropped", async () => {
  const frames = await drain(
    bodyOf(["event: secret\ndata: {\"token\":\"hidden\"}\n\n", "event: frame\ndata: {\"seq\":\"16\"}\n\n"])
  );
  assert.deepEqual(frames, [{ seq: "16" }]);
});

test("a malformed line is skipped and the stream keeps going", async () => {
  const frames = await drain(bodyOf(["data: not-json\n\n", 'data: {"seq":"13"}\n\n']));
  assert.deepEqual(
    frames.map((frame) => (frame as { seq: string }).seq),
    ["13"]
  );
});

test("a snapshot that outlives its byte budget throws; a live read ignores the budget", async () => {
  const response = () => bodyOf(['data: {"seq":"14"}\n\n', 'data: {"seq":"15"}\n\n']);
  await assert.rejects(
    () => drain(response(), { phase: "snapshot", after: "0" }, { budget: () => "over" }),
    /snapshot budget/
  );
  const live = await drain(response(), { phase: "live", after: "0" }, { budget: () => "over" });
  assert.equal(live.length, 2);
});
