// tests/unit/sse-heartbeat-shape-and-abort.test.ts
// Covers Fix 2 (parseable heartbeat for unknown client formats) and
// Fix 3 (abort stops the heartbeat interval immediately, not on the next tick).
import test from "node:test";
import assert from "node:assert/strict";

import {
  createSseHeartbeatTransform,
  shapeForClientFormat,
  HEARTBEAT_SHAPES,
} from "../../open-sse/utils/sseHeartbeat.ts";

test("Fix 2: unknown client formats map to a parseable OPENAI_CHUNK heartbeat", () => {
  assert.equal(shapeForClientFormat("some-custom-gateway"), HEARTBEAT_SHAPES.OPENAI_CHUNK);
  assert.equal(shapeForClientFormat(undefined), HEARTBEAT_SHAPES.OPENAI_CHUNK);
  assert.equal(shapeForClientFormat(null), HEARTBEAT_SHAPES.OPENAI_CHUNK);
  // Known formats unchanged.
  assert.equal(shapeForClientFormat("claude"), HEARTBEAT_SHAPES.ANTHROPIC_PING);
  assert.equal(shapeForClientFormat("openai"), HEARTBEAT_SHAPES.OPENAI_CHUNK);
  assert.equal(
    shapeForClientFormat("openai-responses"),
    HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS
  );
  assert.equal(shapeForClientFormat("openai-response"), HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS);
});

test("native non-[OI] client formats get the payload-free blank-line keepalive", () => {
  // An [OI] chunk or a `:` comment injected into these envelopes is a protocol
  // error for the client SDK, so they must receive bytes with no payload.
  for (const format of ["gemini", "antigravity", "clova", "kiro"]) {
    assert.equal(
      shapeForClientFormat(format),
      HEARTBEAT_SHAPES.TRANSPORT_BLANK,
      `${format} must not receive an [OI] chunk heartbeat`
    );
  }
});

test("Fix 2: heartbeat transform for unknown format emits real data: frames, not comments", async () => {
  // OMNIROUTE_SSE_COMMENTS unset (default) previously made the COMMENT-shaped
  // heartbeat a complete no-op for unknown formats.
  delete process.env.OMNIROUTE_SSE_COMMENTS;
  const stream = createSseHeartbeatTransform({
    intervalMs: 20,
    shape: shapeForClientFormat("some-custom-gateway"),
  });
  // Hold the writable side open (like a live upstream) so the heartbeat
  // interval keeps ticking; closing it immediately would flush/stop the timer.
  let sourceClose!: () => void;
  const source = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(new TextEncoder().encode('data: {"kicker":true}\n\n'));
      sourceClose = () => c.close();
    },
  }).pipeThrough(stream);

  const reader = source.getReader();
  const decoder = new TextDecoder();
  const deadline = Date.now() + 300;
  let out = "";
  while (Date.now() < deadline) {
    const result = await Promise.race([
      reader.read(),
      new Promise<null>((r) => setTimeout(() => r(null), 25)),
    ]);
    if (!result) continue;
    if (result.done) break;
    out += decoder.decode(result.value, { stream: true });
  }
  sourceClose();
  try {
    await reader.cancel();
  } catch {
    /* ok */
  }
  assert.ok(out.includes('"kicker":true'), `original chunk must pass through, got: ${out}`);
  assert.ok(
    out.includes('"object":"chat.completion.chunk"'),
    `heartbeat must be a parseable [OI] chat chunk, not a no-op or comment, got: ${out}`
  );
  assert.ok(
    !out.includes(": keepalive"),
    `no comment-shaped frames for unknown formats, got: ${out}`
  );
});

test("Fix 2: a native Gemini-shaped stream receives only blank-line keepalives", async (t) => {
  // The [OI]-chunk default would corrupt a Gemini `candidates` SSE stream; the
  // transport-blank shape adds bytes with no parseable payload.
  t.mock.timers.enable({ apis: ["setInterval"] });
  delete process.env.OMNIROUTE_SSE_COMMENTS;
  const transform = createSseHeartbeatTransform({
    intervalMs: 20,
    shape: shapeForClientFormat("gemini"),
  });
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const decoder = new TextDecoder();
  const pump = (async () => {
    const chunks: string[] = [];
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      chunks.push(decoder.decode(value));
    }
    return chunks;
  })();

  await writer.write(new TextEncoder().encode('data: {"candidates":[]}\n\n'));
  t.mock.timers.tick(20);
  await writer.close();

  const chunks = await pump;
  assert.equal(chunks[0], 'data: {"candidates":[]}\n\n', "upstream bytes pass through");
  assert.ok(chunks.includes("\n\n"), `keepalive must be a payload-free blank line: ${chunks}`);
  for (const chunk of chunks) {
    assert.ok(!chunk.includes("chat.completion.chunk"), "no [OI] chunk in a Gemini stream");
    assert.ok(!chunk.includes("keepalive "), "no comment line in a Gemini stream");
  }
});

test("Fix 3: aborting the signal stops the heartbeat interval before its next tick", async () => {
  delete process.env.OMNIROUTE_SSE_COMMENTS;
  const controller = new AbortController();
  const stream = createSseHeartbeatTransform({
    intervalMs: 10_000, // long enough that no tick would fire during the test
    signal: controller.signal,
    shape: HEARTBEAT_SHAPES.OPENAI_CHUNK,
  });

  // Hold the writable side open so the heartbeat interval would keep ticking
  // if the abort listener failed to stop it.
  let sourceClose!: () => void;
  const readable = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(new TextEncoder().encode("data: {x}\n\n"));
      sourceClose = () => c.close();
    },
  }).pipeThrough(stream);

  // Consume one chunk then abort.
  const reader = readable.getReader();
  const first = await reader.read();
  assert.ok(first.value, "first chunk must pass through");
  controller.abort();
  sourceClose();
  // The heartbeat tick is 10s away; if the abort listener stopped the timer,
  // nothing further arrives (and the flush on writable close ends the stream).
  const next = await Promise.race([
    reader.read().then((r) => (r.done ? "done" : "chunk")),
    new Promise((r) => setTimeout(() => r("timeout"), 150)),
  ]);
  assert.notEqual(next, "chunk", "aborted heartbeat must not enqueue further frames");
  try {
    await reader.cancel();
  } catch {
    /* ok */
  }
});
