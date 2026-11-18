import assert from "node:assert/strict";
import { createHash, randomBytes } from "node:crypto";
import { createServer } from "node:http";
import { test } from "node:test";
import { gunzipSync } from "node:zlib";
import {
  sendCIPayload,
  CI_PAYLOAD_PART_BYTES,
  CI_WIRE_BODY_BYTES,
} from "../../open-sse/utils/ciPayloadTransport.ts";

const url = "https://api.cheaperinference.com/v1/responses";
const init = (body: string, signal?: AbortSignal): RequestInit => ({
  method: "POST",
  body,
  signal,
  headers: {
    authorization: "Bearer fixture",
    "content-type": "application/json",
    "content-length": String(Buffer.byteLength(body)),
  },
});
const id = "10000000-0000-4000-8000-000000000001";
const largeBody = () =>
  JSON.stringify({
    model: "test",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_file",
            filename: "report.pdf",
            file_data:
              "data:application/pdf;base64," + randomBytes(6 * 1024 * 1024).toString("base64"),
          },
          { type: "input_image", image_url: "data:image/png;base64,fixture" },
          { type: "input_audio", input_audio: { data: "audio-fixture", format: "wav" } },
          { type: "input_video", video_url: "https://media.example/clip.mp4?signature=preserve" },
          { type: "input_text", text: "Keep all media and tool history intact. 你好 🦉" },
        ],
      },
    ],
    stream: true,
  });

test("gzip reaches a real HTTP receiver losslessly and streaming responses remain intact", async () => {
  const body = JSON.stringify({
    input: [
      { role: "user", content: "你好 🦉".repeat(40000) },
      { type: "function_call_output", call_id: "c1", output: "important tool output" },
    ],
    stream: true,
  });
  const server = createServer(async (request, response) => {
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(Buffer.from(chunk));
    assert.equal(request.headers["content-encoding"], "gzip");
    assert.equal(request.headers.authorization, "Bearer fixture");
    assert.equal(gunzipSync(Buffer.concat(chunks)).toString(), body);
    response.writeHead(200, { "content-type": "text/event-stream" });
    response.write("data: first\n\n");
    response.end("data: [DONE]\n\n");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const address = server.address() as { port: number };
    const response = await sendCIPayload(
      `http://127.0.0.1:${address.port}/v1/responses`,
      init(body),
      fetch
    );
    assert.equal(await response.text(), "data: first\n\ndata: [DONE]\n\n");
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("oversized compressed payloads use bounded chunks and one inference dispatch", async () => {
  const body = largeBody(),
    seen: string[] = [],
    parts: Buffer[] = [];
  let manifest: {
    size_bytes: number;
    decoded_size_bytes: number;
    sha256: string;
    endpoint: string;
  };
  const response = await sendCIPayload(url, init(body), async (target, options) => {
    const headers = new Headers(options.headers);
    assert.equal(headers.get("authorization"), "Bearer fixture");
    assert.equal(headers.get("content-encoding"), null);
    assert.equal(headers.get("content-length"), null);
    seen.push(options.method + " " + target);
    if (target.endsWith("/payload-uploads") && options.method === "POST") {
      manifest = JSON.parse(String(options.body));
      return Response.json({ id, part_bytes: CI_PAYLOAD_PART_BYTES });
    }
    if (options.method === "PUT") {
      const bytes = Buffer.from(options.body as Uint8Array);
      assert.ok(bytes.length <= CI_PAYLOAD_PART_BYTES);
      parts.push(bytes);
      return new Response(null, { status: 204 });
    }
    if (options.method === "DELETE") return new Response(null, { status: 204 });
    assert.equal(target, url);
    assert.equal(options.body, "{}");
    assert.equal(headers.get("x-ci-payload-upload"), id);
    const compressed = Buffer.concat(parts);
    assert.ok(compressed.length > CI_WIRE_BODY_BYTES);
    assert.equal(compressed.length, manifest!.size_bytes);
    assert.equal(Buffer.byteLength(body), manifest!.decoded_size_bytes);
    assert.equal(createHash("sha256").update(compressed).digest("hex"), manifest!.sha256);
    assert.equal(gunzipSync(compressed).toString(), body);
    return new Response("data: complete\n\n", { headers: { "content-type": "text/event-stream" } });
  });
  assert.equal(await response.text(), "data: complete\n\n");
  assert.equal(seen.filter((call) => call === "POST " + url).length, 1);
  assert.equal(
    seen.at(-1),
    "POST " + url,
    "streaming inference must not wait for a redundant cleanup round trip"
  );
});

test("a failed upload is cleaned up and never starts inference", async () => {
  let inference = 0,
    deleted = 0;
  const response = await sendCIPayload(url, init(largeBody()), async (target, options) => {
    if (target.endsWith("/payload-uploads"))
      return Response.json({ id, part_bytes: CI_PAYLOAD_PART_BYTES });
    if (options.method === "DELETE") {
      deleted++;
      return new Response(null, { status: 204 });
    }
    if (options.method === "PUT") return new Response("upload refused", { status: 429 });
    inference++;
    return new Response("unexpected");
  });
  assert.equal(response.status, 429);
  assert.equal(deleted, 1);
  assert.equal(inference, 0);
});

test("lost inference responses are never automatically replayed", async () => {
  let inference = 0;
  await assert.rejects(
    sendCIPayload(url, init(largeBody()), async (target, options) => {
      if (target.endsWith("/payload-uploads"))
        return Response.json({ id, part_bytes: CI_PAYLOAD_PART_BYTES });
      if (options.method !== "POST") return new Response(null, { status: 204 });
      inference++;
      throw new Error("connection lost");
    }),
    /connection lost/
  );
  assert.equal(inference, 1);
});

test("small bodies, encoded bodies and unrelated paths pass through; abort and size limits stop dispatch", async () => {
  let calls = 0;
  const send = async (_target: string, options: RequestInit) => {
    calls++;
    assert.equal(options.body, "{}");
    return new Response("ok");
  };
  await sendCIPayload(url, init("{}"), send);
  await sendCIPayload(url + "/other", init("{}"), send);
  const encoded = init("{}");
  encoded.headers = { "content-encoding": "gzip", "content-type": "application/json" };
  await sendCIPayload(url, encoded, send);
  assert.equal(calls, 3);
  const tooBig = await sendCIPayload(url, init("x".repeat(20 * 1024 * 1024 + 1)), send);
  assert.equal(tooBig.status, 413);
  assert.equal(calls, 3);
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(sendCIPayload(url, init("x".repeat(40000), controller.signal), send), {
    name: "AbortError",
  });
  assert.equal(calls, 3);
});

test("cancellation deletes a known upload with its own bounded signal", async () => {
  const controller = new AbortController();
  let deleted = 0;
  await assert.rejects(
    sendCIPayload(url, init(largeBody(), controller.signal), async (target, options) => {
      if (target.endsWith("/payload-uploads"))
        return Response.json({ id, part_bytes: CI_PAYLOAD_PART_BYTES });
      if (options.method === "DELETE") {
        deleted++;
        assert.notEqual(options.signal, controller.signal);
        assert.equal(options.signal?.aborted, false);
        assert.equal(options.redirect, "error");
        return new Response(null, { status: 204 });
      }
      controller.abort();
      controller.signal.throwIfAborted();
      throw new Error("inference must not run");
    }),
    { name: "AbortError" }
  );
  assert.equal(deleted, 1);
});

test("a malformed reservation still deletes its validated upload ID", async () => {
  let deleted = 0;
  await assert.rejects(
    sendCIPayload(url, init(largeBody()), async (target, options) => {
      if (target.endsWith("/payload-uploads")) return Response.json({ id, part_bytes: 123 });
      assert.equal(options.method, "DELETE");
      assert.equal(target, `https://api.cheaperinference.com/v1/payload-uploads/${id}`);
      deleted++;
      return new Response(null, { status: 204 });
    }),
    /invalid payload upload reservation/
  );
  assert.equal(deleted, 1);
});
