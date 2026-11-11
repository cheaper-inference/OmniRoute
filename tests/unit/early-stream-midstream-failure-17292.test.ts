import assert from "node:assert/strict";
import { getEventListeners } from "node:events";
import test from "node:test";

import {
  ANTHROPIC_PING_FRAME,
  OPENAI_CHAT_ERROR_FRAME,
  OPENAI_KEEPALIVE_FRAME,
  OPENAI_RESPONSES_ERROR_FRAME,
  withEarlyStreamKeepalive,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const protocols = [
  { name: "chat", keepaliveFrame: OPENAI_KEEPALIVE_FRAME, errorFrame: OPENAI_CHAT_ERROR_FRAME },
  {
    name: "responses",
    keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  },
  { name: "messages", keepaliveFrame: ANTHROPIC_PING_FRAME },
];

async function fixture(protocol: (typeof protocols)[number]) {
  const handler = Promise.withResolvers<Response>();
  const client = new AbortController();
  const deadline = new AbortController();
  let upstream!: ReadableStreamDefaultController<Uint8Array>;
  let cancellations = 0;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      upstream = controller;
    },
    cancel() {
      cancellations++;
    },
  });
  const response = await withEarlyStreamKeepalive(handler.promise, {
    ...protocol,
    thresholdMs: 0,
    intervalMs: 250,
    signal: client.signal,
    deadlineController: deadline,
    slowPathDeadlineMs: 2000,
  });
  const reader = response.body!.getReader();
  assert.deepEqual((await reader.read()).value, protocol.keepaliveFrame);
  handler.resolve(new Response(body, { headers: { "content-type": "text/event-stream" } }));
  return { upstream, reader, client, deadline, cancellations: () => cancellations };
}

for (const protocol of protocols) {
  for (const [label, chunk] of [
    ["LF", 'data: {"delta":"hello"}\n\n'],
    ["CRLF", 'data: {"delta":"hello"}\r\n\r\n'],
  ] as const) {
    test(`${protocol.name}: read failure after a finished ${label} SSE event ends with one terminal error event (#18773)`, async () => {
      const f = await fixture(protocol);
      f.upstream.enqueue(encoder.encode(chunk));
      assert.equal(decoder.decode((await f.reader.read()).value), chunk);
      const pending = f.reader.read();
      const raw = new Error("secret-token upstream-private-host");
      raw.stack = "PRIVATE_UPSTREAM_STACK";
      f.upstream.error(raw);
      // Not a rejected body (Claude Code reports that as a malformed stream) and
      // not a quiet EOF (that would pass the failed turn off as complete).
      const next = await pending;
      assert.equal(next.done, false);
      const text = decoder.decode(next.value);
      if (protocol.errorFrame) {
        assert.equal(text, decoder.decode(protocol.errorFrame));
      } else {
        assert.match(text, /^event: error\ndata: /);
      }
      assert.equal((text.match(/\ndata: |^data: /g) || []).length, 1);
      const data = JSON.parse(text.split("data: ")[1].trim());
      assert.equal(data.error.message, "Upstream stream failed before completion.");
      assert.doesNotMatch(text, /secret-token|upstream-private-host|PRIVATE_UPSTREAM_STACK/);
      assert.equal((await f.reader.read()).done, true);
      await f.reader.closed;
      assert.equal(getEventListeners(f.client.signal, "abort").length, 0);
      assert.equal(getEventListeners(f.deadline.signal, "abort").length, 0);
      assert.equal(f.deadline.signal.aborted, false);
    });
  }

  test(`${protocol.name}: read failure after a finished SSE event split across chunks ends with a terminal error event (#18773)`, async () => {
    const f = await fixture(protocol);
    f.upstream.enqueue(encoder.encode('data: {"delta":"hello"}\n'));
    await f.reader.read();
    f.upstream.enqueue(encoder.encode("\n"));
    await f.reader.read();
    const pending = f.reader.read();
    f.upstream.error(new Error("secret-token"));
    const next = await pending;
    assert.equal(next.done, false);
    assert.match(decoder.decode(next.value), /Upstream stream failed before completion\./);
    assert.equal((await f.reader.read()).done, true);
  });

  test(`${protocol.name}: read failure after a single trailing newline still rejects (#17292)`, async () => {
    const f = await fixture(protocol);
    f.upstream.enqueue(encoder.encode('data: {"delta":"hello"}\n'));
    await f.reader.read();
    const pending = f.reader.read();
    f.upstream.error(new Error("secret-token"));
    await assert.rejects(pending, /Upstream stream failed before completion\./);
  });

  test(`${protocol.name}: clean upstream EOF after a finished SSE event adds no error frame (#18773)`, async () => {
    const chunk = 'data: {"delta":"hello"}\n\n';
    const f = await fixture(protocol);
    f.upstream.enqueue(encoder.encode(chunk));
    assert.equal(decoder.decode((await f.reader.read()).value), chunk);
    f.upstream.close();
    const next = await f.reader.read();
    assert.equal(next.done, true);
    assert.equal(next.value, undefined);
    await f.reader.closed;
    assert.equal((await f.reader.read()).done, true);
    assert.equal(getEventListeners(f.client.signal, "abort").length, 0);
    assert.equal(getEventListeners(f.deadline.signal, "abort").length, 0);
    assert.equal(f.deadline.signal.aborted, false);
  });

  test(`${protocol.name}: read failure after a partial SSE frame rejects instead of clean EOF (#17292)`, async () => {
    const chunk = 'data: {"delta":"hel';
    const f = await fixture(protocol);
    f.upstream.enqueue(encoder.encode(chunk));
    assert.equal(decoder.decode((await f.reader.read()).value), chunk);
    // Inject only after the caller has actually received the bytes.
    const pending = f.reader.read();
    const raw = new Error("secret-token upstream-private-host");
    raw.stack = "PRIVATE_UPSTREAM_STACK";
    f.upstream.error(raw);
    let failure: unknown;
    await assert.rejects(pending, (error: unknown) => {
      assert.ok(error instanceof Error);
      assert.equal(error.message, "Upstream stream failed before completion.");
      assert.notEqual(error, raw);
      assert.equal(error.cause, undefined);
      assert.doesNotMatch(
        String(error.stack),
        /secret-token|upstream-private-host|PRIVATE_UPSTREAM_STACK/
      );
      failure = error;
      return true;
    });
    // One terminal failure, not an appended frame or a second synthesized error.
    await assert.rejects(f.reader.closed, (error: unknown) => error === failure);
    await assert.rejects(f.reader.read(), (error: unknown) => error === failure);
    assert.equal(getEventListeners(f.client.signal, "abort").length, 0);
    assert.equal(getEventListeners(f.deadline.signal, "abort").length, 0);
    assert.equal(f.deadline.signal.aborted, false);
  });

  test(`${protocol.name}: failure before upstream bytes keeps one in-band error (#17292)`, async () => {
    const f = await fixture(protocol);
    f.upstream.error(new Error("secret-token"));
    const text = decoder.decode((await f.reader.read()).value);
    assert.equal((text.match(/\ndata: |^data: /g) || []).length, 1);
    const data = JSON.parse(text.split("data: ")[1].trim());
    assert.equal(data.error.message, "Upstream stream failed before completion.");
    assert.doesNotMatch(text, /secret-token/);
    assert.equal((await f.reader.read()).done, true);
  });

  test(`${protocol.name}: consumer cancel after bytes cancels upstream once (#17292)`, async () => {
    const f = await fixture(protocol);
    f.upstream.enqueue(encoder.encode('data: {"delta":"hello"}\n\n'));
    await f.reader.read();
    await f.reader.cancel();
    await f.reader.closed;
    assert.equal(f.cancellations(), 1);
    assert.equal((await f.reader.read()).done, true);
  });
}
