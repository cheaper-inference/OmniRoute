import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { readFileSync } from "node:fs";
import WebSocket from "ws";
import { encode, decode } from "@msgpack/msgpack";
import { FalClient, falTrackingUrl } from "../../open-sse/handlers/fal/client.ts";
import {
  falCapabilities,
  compileFalInput,
  type FalDefinition,
} from "../../open-sse/handlers/fal/schema.ts";
import { connectFalRealtime, falRealtimePath } from "../../open-sse/handlers/fal/realtime.ts";
import { connectFalHttpWebsocket } from "../../open-sse/handlers/fal/httpWebsocket.ts";
import { readFalEvents, type FalEvent } from "../../open-sse/handlers/fal/events.ts";

function fixture(id: string): FalDefinition {
  return JSON.parse(
    readFileSync(
      new URL(`../fixtures/fal/${id.replaceAll("/", "_")}.json`, import.meta.url),
      "utf8"
    )
  );
}

test("an exact native /stream endpoint keeps its HTTP schema and never duplicates the operation suffix", async () => {
  const endpoint = "fal-ai/any-llm/stream";
  const definition: FalDefinition = {
    endpoint_id: endpoint,
    openapi: {
      openapi: "3.0.0",
      paths: {
        [`/${endpoint}`]: {
          post: {
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { prompt: { type: "string" }, reasoning: { type: "boolean" } },
                    required: ["prompt"],
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  const input = { prompt: "test", reasoning: false };
  assert.deepEqual(compileFalInput(definition, "http-websocket")(input), input);
  assert.equal(falCapabilities(definition).transports["http-websocket"], true);
  const client = new FalClient("test", async (url) => {
    assert.equal(url, `https://fal.run/${endpoint}`);
    return new Response('data: {"partial":false,"output":"done"}\n\n');
  });
  await client.execute(endpoint, input, "stream");
});

test("direct reasoning output and progressive SSE retain native partial/final semantics", async () => {
  const definition = fixture("fal-ai/any-llm");
  const input = { prompt: "explain a cube", reasoning: true };
  compileFalInput(definition)(input);
  const chunks = [
    { output: "a", reasoning: "first", partial: true },
    { output: "a cube", reasoning: "upstream only", partial: false },
  ];
  let submissions = 0;
  const client = new FalClient("transport-test-key", async (url, init) => {
    submissions++;
    assert.equal(url, "https://fal.run/fal-ai/any-llm/stream");
    assert.deepEqual(JSON.parse(String(init?.body)), input);
    return new Response(
      new ReadableStream({
        start(controller) {
          for (const chunk of chunks)
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
          controller.close();
        },
      }),
      { headers: { "Content-Type": "text/event-stream" } }
    );
  });
  assert.equal(falCapabilities(definition).transports.stream, false);
  const registered = {
    ...definition,
    metadata: { ...definition.metadata, stream_url: "https://fal.run/fal-ai/any-llm/stream" },
  };
  assert.equal(falCapabilities(registered).transports.stream, true);
  const response = await client.execute(definition.endpoint_id, input, "stream");
  assert.equal(
    await response.text(),
    chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join("")
  );
  assert.equal(submissions, 1);
  await assert.rejects(
    client.execute(definition.endpoint_id, input, "stream", undefined, "https://evil.test/steal")
  );
});

test("safe reads retry within Retry-After bounds; a failed generation POST never retries", async () => {
  let reads = 0;
  const client = new FalClient("transport-test-key", async (_url, init) => {
    if (init?.method === "POST") return new Response("unknown submission", { status: 503 });
    reads++;
    return reads < 3
      ? new Response(null, { status: 429, headers: { "Retry-After": "0" } })
      : Response.json({ status: "IN_PROGRESS" });
  });
  await client.request("https://queue.fal.run/publisher/app/requests/request-1/status");
  assert.equal(reads, 3);
  await assert.rejects(client.execute("publisher/app", {}, "queue"), /503/);
  assert.throws(() =>
    falTrackingUrl("https://queue.fal.run/owner/app/requests/abc-extra/status", "abc")
  );
});

test("file URL arrays remain downloadable and all credentialed requests stay on Fal hosts", async () => {
  const { normalizeFalOutput } = await import("../../open-sse/handlers/fal/client.ts");
  assert.equal(
    normalizeFalOutput({
      meshes: ["https://example.com/model.glb", "https://example.com/model.obj"],
    }).artifacts.length,
    2
  );
  let calls = 0;
  const client = new FalClient("transport-test-key", async () => {
    calls++;
    return Response.json({});
  });
  await assert.rejects(client.request("https://evil.test/collect"), /Invalid fal request URL/);
  assert.equal(calls, 0);
});

test("timeout/abort signals reach the transport and do not resubmit", async () => {
  const controller = new AbortController();
  let calls = 0;
  const client = new FalClient("transport-test-key", async (_url, init) => {
    calls++;
    return new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
      controller.abort(new DOMException("deadline", "TimeoutError"));
    });
  });
  await assert.rejects(client.execute("publisher/app/nested", {}, "queue", controller.signal), {
    name: "TimeoutError",
  });
  assert.equal(calls, 1);
});

class MockSocket extends EventEmitter {
  readyState = WebSocket.OPEN;
  messages: Uint8Array[] = [];
  ended = false;
  send(data: Uint8Array) {
    this.messages.push(data);
  }
  pause() {
    /* The mock has no network buffers. */
  }
  resume() {
    /* The mock has no network buffers. */
  }
  terminate() {
    this.ended = true;
  }
}

test("documented realtime WebSockets use MessagePack, retain outputs and close on abort", async () => {
  const definition = fixture("fal-ai/fast-lcm-diffusion");
  const path = falRealtimePath(definition);
  assert.equal(path, "fal-ai/fast-lcm-diffusion/realtime");
  assert.equal(falCapabilities(definition).transports.realtime, true);
  assert.equal(falRealtimePath(fixture("fal-ai/any-llm")), null);
  const socket = new MockSocket();
  const abort = new AbortController();
  let closed = 0;
  const connection = await connectFalRealtime({
    path: path!,
    token: "realtime-test-key",
    signal: abort.signal,
    onClose() {
      closed++;
    },
    socketFactory(url, options) {
      assert.equal(url, `wss://fal.run/${path}`);
      assert.equal(
        (options.headers as Record<string, string>).Authorization,
        "Key realtime-test-key"
      );
      assert.equal(options.followRedirects, false);
      queueMicrotask(() => socket.emit("open"));
      return socket as unknown as WebSocket;
    },
  });
  const image = `data:image/png;base64,${readFileSync(new URL("../fixtures/fal/realtime-1px.png", import.meta.url)).toString("base64")}`;
  const input = compileFalInput(
    definition,
    "realtime"
  )({ prompt: "a cube", sync_mode: true, image_url: image, seed: 0 });
  assert.throws(() => compileFalInput(definition)(input), /Unsupported/);
  assert.throws(
    () => compileFalInput(definition, "realtime")({ ...input, num_images: 9 }),
    /Invalid/
  );
  assert.throws(
    () => compileFalInput(definition, "realtime")({ ...input, image_url: false }),
    /Invalid/
  );
  connection.send(input);
  assert.deepEqual(decode(socket.messages[0]), input);
  connection.send(compileFalInput(definition, "realtime")({ ...input, prompt: "later image" }));
  assert.deepEqual(decode(socket.messages[1]), { ...input, prompt: "later image" });
  const reader = connection.output.getReader();
  const output = {
    images: [{ url: "https://example.com/image.png", content_type: "image/png" }],
    seed: 0,
  };
  socket.emit("message", Buffer.from(encode(output)));
  const event = new TextDecoder().decode((await reader.read()).value);
  assert.deepEqual(JSON.parse(event.slice(6)).output, output);
  abort.abort();
  assert.equal(socket.ended, true);
  assert.equal(closed, 1);
  assert.equal((await reader.read()).done, true);
  assert.throws(() => connection.send(input), /ended/);
});

class MockHttpSocket extends EventEmitter {
  readyState = WebSocket.OPEN;
  bufferedAmount = 0;
  messages: string[] = [];
  ended = false;
  send(data: string, callback?: (error?: Error) => void) {
    this.messages.push(data);
    callback?.();
  }
  pause() {}
  resume() {}
  terminate() {
    this.ended = true;
  }
  text(value: unknown) {
    this.emit(
      "message",
      Buffer.from(typeof value === "string" ? value : JSON.stringify(value)),
      false
    );
  }
}

test("HTTP WebSockets preserve start/body/end, JSON, binary downloads and repeated invocations", async () => {
  const peer = new MockHttpSocket();
  const events: FalEvent[] = [];
  let closes = 0;
  let file: Uint8Array | undefined;
  const connection = await connectFalHttpWebsocket({
    endpoint: "openai/gpt-image-2.5/flare/text-to-image",
    token: "test-key",
    signal: new AbortController().signal,
    timeoutMs: 1000,
    onClose() {
      closes++;
    },
    artifact(bytes, type, name) {
      file = bytes;
      assert.equal(type, "image/png");
      assert.equal(name, "test.png");
      return "/api/v1/fal/jobs/job?artifact=file";
    },
    socketFactory(url, options) {
      assert.equal(url, "wss://ws.fal.run/openai/gpt-image-2.5/flare/text-to-image");
      assert.equal((options.headers as Record<string, string>).Authorization, "Key test-key");
      assert.equal(options.followRedirects, false);
      queueMicrotask(() => peer.emit("open"));
      return peer as unknown as WebSocket;
    },
  });
  const reading = readFalEvents(connection.output, (event) => events.push(event));
  connection.send({ prompt: "one" });
  assert.deepEqual(JSON.parse(peer.messages[0]), { prompt: "one" });
  assert.throws(() => connection.send({ prompt: "duplicate while pending" }), /not ended/);
  peer.text({
    type: "start",
    request_id: "one",
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  peer.text('{"answer":');
  peer.text('"one"}');
  peer.text({ type: "end", request_id: "one", status: 200, time_to_first_byte_seconds: 0.1 });
  connection.send({ prompt: "two" });
  peer.text({
    type: "start",
    request_id: "two",
    status: 200,
    headers: {
      "content-type": "image/png",
      "content-disposition": 'attachment; filename="test.png"',
    },
  });
  peer.emit("message", Buffer.from([0, 1, 255]), true);
  peer.text({ type: "end", request_id: "two", status: 200 });
  connection.send({ prompt: "error" });
  peer.text({
    type: "start",
    request_id: "three",
    status: 422,
    headers: { "Content-Type": "text/plain" },
  });
  peer.text("native validation message");
  peer.text({ type: "end", request_id: "three", status: 422 });
  connection.close();
  await reading;
  assert.equal(closes, 1);
  assert.deepEqual(file, Buffer.from([0, 1, 255]));
  assert.deepEqual((events[1].data as Record<string, unknown>).output, { answer: "one" });
  const binary = events.find(
    (e) =>
      e.event === "final" &&
      Array.isArray((e.data as Record<string, unknown>).artifacts) &&
      ((e.data as Record<string, unknown>).artifacts as unknown[]).length
  )!;
  assert.equal(
    ((binary.data as Record<string, unknown>).artifacts as Record<string, unknown>[])[0].url,
    "/api/v1/fal/jobs/job?artifact=file"
  );
  const error = events.find((e) => e.event === "error")!.data as Record<string, unknown>;
  assert.equal(error.output, "native validation message");
  assert.equal((error.http as Record<string, unknown>).status, 422);
  assert.equal(peer.messages.length, 3);
});

test("HTTP WebSocket connection loss and invalid order remain uncertain and never replay", async () => {
  for (const invalidOrder of [true, false]) {
    const peer = new MockHttpSocket();
    let uncertain = false;
    const connection = await connectFalHttpWebsocket({
      endpoint: "publisher/app",
      token: "test",
      signal: new AbortController().signal,
      timeoutMs: 1000,
      onClose(value) {
        uncertain = value;
      },
      artifact() {
        throw new Error("unexpected file");
      },
      socketFactory() {
        queueMicrotask(() => peer.emit("open"));
        return peer as unknown as WebSocket;
      },
    });
    const events: FalEvent[] = [];
    const reading = readFalEvents(connection.output, (event) => events.push(event));
    connection.send({ prompt: "bill once" });
    if (invalidOrder) peer.text("body before start");
    else peer.emit("close");
    await reading;
    assert.equal(uncertain, true);
    assert.equal(peer.messages.length, 1);
    assert.equal(events.at(-1)?.event, "error");
    assert.throws(() => connection.send({}), /expired/);
  }
});

test("HTTP WebSockets parse native SSE and close pending invocations on deadline or cancellation", async () => {
  for (const mode of ["sse", "deadline", "abort"]) {
    const peer = new MockHttpSocket();
    const abort = new AbortController();
    const events: FalEvent[] = [];
    let uncertain = false;
    const connection = await connectFalHttpWebsocket({
      endpoint: "fal-ai/any-llm/stream",
      token: "test",
      signal: abort.signal,
      timeoutMs: mode === "deadline" ? 10 : 1000,
      onClose(value) {
        uncertain = value;
      },
      artifact() {
        throw new Error("Unexpected binary");
      },
      socketFactory() {
        queueMicrotask(() => peer.emit("open"));
        return peer as unknown as WebSocket;
      },
    });
    const reading = readFalEvents(connection.output, (event) => events.push(event));
    connection.send({ prompt: "test", reasoning: false });
    if (mode === "sse") {
      peer.text({
        type: "start",
        request_id: "sse",
        status: 200,
        headers: { "Content-Type": "text/event-stream; charset=utf-8" },
      });
      const text =
        'event: token\r\ndata: {"partial":true,"output":"é"}\r\n\r\nevent: final\ndata: {"partial":false,"output":"é cube"}\n\n';
      for (const byte of new TextEncoder().encode(text))
        peer.emit("message", Buffer.from([byte]), true);
      peer.text({ type: "end", request_id: "sse", status: 200 });
      connection.close();
    } else if (mode === "abort") abort.abort();
    await reading;
    assert.equal(peer.ended, true);
    assert.equal(uncertain, mode !== "sse");
    assert.equal(peer.messages.length, 1);
    if (mode === "sse")
      assert.deepEqual(events.find((e) => e.event === "token")?.data, {
        partial: true,
        output: "é",
      });
    else assert.equal(events.at(-1)?.event, "error");
  }
});

test("realtime path-only overrides require an input schema and remain connection-local definitions", () => {
  const definition = fixture("fal-ai/fast-lcm-diffusion");
  const oldOverride = {
    ...definition,
    openapi: { ...definition.openapi, "x-fal-realtime": { path: "/realtime" } },
  };
  assert.equal(falCapabilities(oldOverride).transports.realtime, false);
  const upgraded = {
    ...definition,
    openapi: {
      ...definition.openapi,
      "x-fal-realtime": {
        path: "/realtime",
        input_schema: {
          type: "object",
          properties: { account_field: { type: "boolean" } },
          required: ["account_field"],
        },
      },
    },
  };
  assert.equal(falCapabilities(upgraded).transports.realtime, true);
  compileFalInput(upgraded, "realtime")({ account_field: false });
  assert.throws(
    () => compileFalInput(definition, "realtime")({ account_field: false }),
    /Unsupported/
  );
});

test("schema errors, unsupported thinking and invalid manual schemas fail before transport", () => {
  assert.throws(() =>
    falCapabilities({ endpoint_id: "publisher/app", openapi: { error: "schema unavailable" } })
  );
  const language = fixture("fal-ai/any-llm");
  assert.throws(
    () => compileFalInput(language)({ prompt: "x", enable_thinking: false }),
    /Unsupported/
  );
  assert.throws(() => compileFalInput(language)({ prompt: "x", reasoning: "max" }), /Invalid/);
  const audio = fixture("fal-ai/demucs");
  assert.deepEqual(
    compileFalInput(audio)({ audio_url: "https://example.com/source.wav", overlap: 0 }),
    { audio_url: "https://example.com/source.wav", overlap: 0 }
  );
});
