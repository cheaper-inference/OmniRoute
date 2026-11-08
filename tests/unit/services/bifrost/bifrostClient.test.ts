import { test } from "node:test";
import assert from "node:assert/strict";
import { dispatchToBifrost } from "../../../../src/shared/services/bifrost/bifrostClient.ts";

const ORIGINAL_FETCH = globalThis.fetch;

test("bifrostClient: dispatchToBifrost sends unary request and parses response", async () => {
  let capturedHeaders: Headers | null = null;
  let capturedBody: Record<string, unknown> | null = null;

  globalThis.fetch = async (_input, init) => {
    capturedHeaders = new Headers(init?.headers);
    capturedBody = JSON.parse(String(init?.body)) as Record<string, unknown>;
    return new Response(JSON.stringify({ id: "chatcmpl-123", choices: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const dummyReq = new Request("http://localhost:20128/v1/chat/completions", {
    method: "POST",
    headers: { "x-request-id": "req-xyz", authorization: "Bearer client-token" },
  });

  const result = await dispatchToBifrost({
    request: dummyReq,
    body: { model: "gpt-4", messages: [{ role: "user", content: "hello" }] },
    config: {
      baseUrl: "http://127.0.0.1:8080",
      apiKey: "bifrost-secret",
      timeoutMs: 5000,
      streamingEnabled: true,
      enabled: true,
    },
  });

  assert.equal(result.statusCode, 200);
  assert.equal(result.timedOut, false);
  assert.equal(result.response.headers.get("X-Routed-By"), "bifrost");
  assert.equal(capturedHeaders?.get("Authorization"), "Bearer bifrost-secret");
  assert.equal(capturedHeaders?.get("x-request-id"), "req-xyz");
  assert.equal(capturedBody?.model, "gpt-4");

  globalThis.fetch = ORIGINAL_FETCH;
});

test("bifrostClient: dispatchToBifrost handles streaming response and finalizer", async () => {
  let recordedStatus: string | null = null;
  let recordedCode: number | null = null;

  globalThis.fetch = async () => {
    return new Response(
      new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode('data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n')
          );
          controller.close();
        },
      }),
      {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      }
    );
  };

  const dummyReq = new Request("http://localhost:20128/v1/chat/completions", {
    method: "POST",
  });

  const result = await dispatchToBifrost({
    request: dummyReq,
    body: { model: "gpt-4", stream: true, messages: [] },
    config: {
      baseUrl: "http://127.0.0.1:8080",
      timeoutMs: 5000,
      streamingEnabled: true,
      enabled: true,
    },
    onUsageRecorded: (status, statusCode) => {
      recordedStatus = status;
      recordedCode = statusCode;
    },
  });

  assert.equal(result.statusCode, 200);
  assert.equal(result.response.headers.get("X-Routed-By"), "bifrost");

  const streamText = await result.response.text();
  assert.match(streamText, /Hi/);
  assert.equal(recordedStatus, "success");
  assert.equal(recordedCode, 200);

  globalThis.fetch = ORIGINAL_FETCH;
});

test("bifrostClient: dispatchToBifrost sanitizes a 4xx sidecar body instead of passing it through", async () => {
  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        error:
          "invalid request at /home/operator/.omniroute/data/bifrost/config.json: access_token=sk-leaked-secret",
      }),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  };

  const dummyReq = new Request("http://localhost:20128/v1/chat/completions", { method: "POST" });

  const result = await dispatchToBifrost({
    request: dummyReq,
    body: { model: "gpt-4", messages: [] },
    config: {
      baseUrl: "http://127.0.0.1:8080",
      timeoutMs: 5000,
      streamingEnabled: true,
      enabled: true,
    },
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.response.status, 400);
  assert.equal(result.response.headers.get("Content-Type"), "application/json");

  const parsed = (await result.response.json()) as { error: { message: string } };
  assert.ok(
    !parsed.error.message.includes("sk-leaked-secret"),
    "leaked credential must be redacted"
  );
  assert.ok(!parsed.error.message.includes("/home/operator"), "internal path must be redacted");

  globalThis.fetch = ORIGINAL_FETCH;
});

const ECHO_CONFIG = {
  baseUrl: "http://127.0.0.1:8080",
  apiKey: "bifrost-secret",
  timeoutMs: 5000,
  streamingEnabled: true,
  enabled: true,
};

test("bifrostClient: a 2xx sidecar response never relays echoed credentials, cookies or stale encoding", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "chatcmpl-1", choices: [] }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "content-encoding": "gzip",
        authorization: "Bearer bifrost-secret",
        "x-api-key": "bifrost-secret",
        "set-cookie": "session=sidecar-session; Path=/",
        "x-bifrost-trace": "trace-1",
      },
    });

  const dummyReq = new Request("http://localhost:20128/v1/chat/completions", { method: "POST" });
  const result = await dispatchToBifrost({
    request: dummyReq,
    body: { model: "gpt-4", messages: [] },
    config: ECHO_CONFIG,
  });

  const headers = result.response.headers;
  assert.equal(headers.get("authorization"), null);
  assert.equal(headers.get("x-api-key"), null);
  assert.equal(headers.get("set-cookie"), null);
  assert.equal(headers.get("content-encoding"), null);
  assert.equal(headers.get("x-bifrost-trace"), "trace-1", "non-sensitive headers still relay");
  assert.equal(headers.get("X-Routed-By"), "bifrost");

  globalThis.fetch = ORIGINAL_FETCH;
});

test("bifrostClient: a 4xx sidecar response never relays echoed credentials or cookies", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "bad request" }), {
      status: 400,
      headers: {
        "content-type": "application/json",
        "content-length": "999",
        authorization: "Bearer bifrost-secret",
        "set-cookie": "session=sidecar-session; Path=/",
        "proxy-authorization": "Basic abc",
      },
    });

  const dummyReq = new Request("http://localhost:20128/v1/chat/completions", { method: "POST" });
  const result = await dispatchToBifrost({
    request: dummyReq,
    body: { model: "gpt-4", messages: [] },
    config: ECHO_CONFIG,
  });

  const headers = result.response.headers;
  assert.equal(result.response.status, 400);
  assert.equal(headers.get("authorization"), null);
  assert.equal(headers.get("set-cookie"), null);
  assert.equal(headers.get("proxy-authorization"), null);
  assert.notEqual(headers.get("content-length"), "999");
  const parsed = (await result.response.json()) as { error: unknown };
  assert.ok(parsed.error);

  globalThis.fetch = ORIGINAL_FETCH;
});

test("bifrostClient: targetPath and the client's Anthropic protocol headers reach the sidecar", async () => {
  let capturedUrl = "";
  let capturedHeaders: Headers | null = null;
  globalThis.fetch = async (input, init) => {
    capturedUrl = String(input);
    capturedHeaders = new Headers(init?.headers);
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };

  const dummyReq = new Request("http://localhost:20128/v1/messages", {
    method: "POST",
    headers: { "anthropic-version": "2023-06-01", "anthropic-beta": "tools-2024-04-04" },
  });
  await dispatchToBifrost({
    request: dummyReq,
    body: { model: "anthropic/claude", messages: [] },
    config: ECHO_CONFIG,
    targetPath: "/anthropic/v1/messages",
  });

  assert.equal(capturedUrl, "http://127.0.0.1:8080/anthropic/v1/messages");
  assert.equal(capturedHeaders?.get("anthropic-version"), "2023-06-01");
  assert.equal(capturedHeaders?.get("anthropic-beta"), "tools-2024-04-04");

  globalThis.fetch = ORIGINAL_FETCH;
});
