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

function fixture(id: string): FalDefinition {
  return JSON.parse(
    readFileSync(
      new URL(`../fixtures/fal/${id.replaceAll("/", "_")}.json`, import.meta.url),
      "utf8"
    )
  );
}

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
  const input = compileFalInput(definition)({ prompt: "a cube", seed: 0 });
  connection.send(input);
  assert.deepEqual(decode(socket.messages[0]), input);
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
