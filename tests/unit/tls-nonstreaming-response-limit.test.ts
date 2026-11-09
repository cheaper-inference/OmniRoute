import test from "node:test";
import assert from "node:assert/strict";

import { createTlsClientModule } from "../../open-sse/services/tlsClientBase.ts";

const encoder = new TextEncoder();
const EXPECTED_BODY = '{"error":{"message":"Response too large","type":"upstream_error"}}';
const ONE_MIB = 1024 * 1024;

function chunkedStream(totalBytes: number, chunkBytes = 64 * 1024): ReadableStream<Uint8Array> {
  const piece = encoder.encode("x".repeat(chunkBytes));
  let remaining = totalBytes;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (remaining <= 0) {
        controller.close();
        return;
      }
      const size = Math.min(chunkBytes, remaining);
      remaining -= size;
      controller.enqueue(size === piece.byteLength ? piece : piece.subarray(0, size));
    },
  });
}

function streamingModule(responseValidation: "sse" | "cf" = "sse") {
  return createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation,
    exportCloudflareCheck: false,
    exposeStreamingForTesting: true,
  });
}

function streamingClient(status: number, totalBytes: number, headers: Record<string, string> = {}) {
  return {
    request: async () =>
      new Response(chunkedStream(totalBytes), {
        status,
        headers: { "content-type": "text/plain", ...headers },
      }),
  };
}

async function streamedResult(
  status: number,
  totalBytes: number,
  headers: Record<string, string> = {},
  responseValidation: "sse" | "cf" = "sse"
) {
  const module = streamingModule(responseValidation);
  return module.__tlsFetchStreamingForTesting!(
    streamingClient(status, totalBytes, headers),
    "https://example.test/plain",
    { method: "GET" },
    "",
    null,
    30_000,
    30_000
  );
}

function fetchModule() {
  return createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    wreqRuntimeLoader: async () => ({
      async createTransport() {
        return { async close() {} };
      },
      async fetch() {
        return {
          status: 200,
          headers: {},
          body: "x".repeat(11 * ONE_MIB),
        };
      },
    }),
  });
}

function fetchBytesModule() {
  return createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    wreqRuntimeLoader: async () => ({
      async createTransport() {
        return { async close() {} };
      },
      async fetch() {
        return {
          status: 200,
          headers: new Headers({ "content-type": "text/plain" }),
          body: null,
          async bytes() {
            return encoder.encode("x".repeat(11 * ONE_MIB));
          },
        };
      },
    }),
  });
}

function fetchTextModule() {
  return createTlsClientModule({
    providerName: "Test",
    tlsProfile: "chrome_146",
    domain: "https://example.test",
    streamEofPolicy: "none",
    responseValidation: "sse",
    exportCloudflareCheck: false,
    wreqRuntimeLoader: async () => ({
      async createTransport() {
        return { async close() {} };
      },
      async fetch() {
        return {
          status: 200,
          headers: {},
          body: null,
          async text() {
            return "x".repeat(11 * ONE_MIB);
          },
        };
      },
    }),
  });
}

function checkBoundedJson(result: { text: string | null; body: unknown; headers: Headers }) {
  assert.equal(result.text, EXPECTED_BODY);
  assert.equal(result.body, null);
  assert.equal(result.headers.get("content-type"), "application/json");
  assert.equal(result.headers.get("content-length"), null);
}

test("large non-SSE body is bounded instead of buffered", async () => {
  const result = await streamedResult(200, 11 * ONE_MIB);
  assert.equal(result.status, 502);
  checkBoundedJson(result);
});

test("small non-SSE body is unchanged", async () => {
  const before = "x".repeat(ONE_MIB);
  const module = streamingModule();
  const client = {
    request: async () =>
      new Response(before, { status: 200, headers: { "content-type": "text/plain" } }),
  };
  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/plain",
    { method: "GET" },
    "",
    null,
    30_000,
    30_000
  );
  assert.equal(result.status, 200);
  assert.equal(result.body, null);
  assert.equal(result.text, before);
});

test("normal streaming response stays streamed", async () => {
  const module = streamingModule();
  const client = {
    request: async () =>
      new Response('data: {"answer":"ok"}\n\n[DONE]', {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      }),
  };
  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "[DONE]",
    null,
    30_000,
    30_000
  );
  assert.equal(result.status, 200);
  assert.ok(result.body);
  assert.equal(result.text, null);
});

test("large error body keeps its upstream status with a bounded body", async () => {
  const result = await streamedResult(400, 11 * ONE_MIB);
  assert.equal(result.status, 400);
  checkBoundedJson(result);
});

test("large materialized body is bounded", async () => {
  const result = await fetchModule().tlsFetch("https://example.test/plain");
  assert.equal(result.status, 502);
  checkBoundedJson(result);
});

test("large byte response is bounded", async () => {
  const result = await fetchBytesModule().tlsFetch("https://example.test/file", {
    byteResponse: true,
  });
  assert.equal(result.status, 502);
  checkBoundedJson(result);
});

test("large text response is bounded", async () => {
  const result = await fetchTextModule().tlsFetch("https://example.test/plain");
  assert.equal(result.status, 502);
  checkBoundedJson(result);
});

test("declared content length bounds a small body without reading it", async () => {
  let reads = 0;
  const module = streamingModule();
  const client = {
    request: async () => ({
      status: 200,
      headers: {
        "content-type": ["text/plain"],
        "content-length": [String(11 * ONE_MIB)],
      },
      body: {
        getReader: () => {
          let sent = false;
          return {
            read: async () => {
              reads += 1;
              if (sent) return { done: true, value: undefined };
              sent = true;
              return { done: false, value: encoder.encode("short") };
            },
            cancel: async () => {},
          };
        },
      },
    }),
  };
  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/plain",
    { method: "GET" },
    "",
    null,
    30_000,
    30_000
  );
  assert.equal(result.status, 502);
  checkBoundedJson(result);
  assert.equal(reads, 0);
});

test("declared content length does not hide a large body", async () => {
  const result = await streamedResult(200, 11 * ONE_MIB, {
    "content-length": String(ONE_MIB),
  });
  assert.equal(result.status, 502);
  checkBoundedJson(result);
});

test("empty non-SSE body is unchanged", async () => {
  const result = await streamedResult(200, 0);
  assert.equal(result.status, 200);
  assert.equal(result.body, null);
  assert.equal(result.text, "");
});

test("declared content length does not bound a streaming response", async () => {
  const module = streamingModule();
  const client = {
    request: async () =>
      new Response('data: {"answer":"ok"}\n\n[DONE]', {
        status: 200,
        headers: {
          "content-type": "text/event-stream",
          "content-length": String(11 * ONE_MIB),
        },
      }),
  };
  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "[DONE]",
    null,
    30_000,
    30_000
  );
  assert.equal(result.status, 200);
  assert.ok(result.body);
  assert.equal(result.text, null);
});

test("declared content length does not bound a mixed-case streaming response", async () => {
  const module = streamingModule();
  const client = {
    request: async () =>
      new Response('data: {"answer":"ok"}\n\n[DONE]', {
        status: 200,
        headers: {
          "content-type": "Text/Event-Stream",
          "content-length": String(11 * ONE_MIB),
        },
      }),
  };
  const result = await module.__tlsFetchStreamingForTesting!(
    client,
    "https://example.test/stream",
    { method: "POST" },
    "[DONE]",
    null,
    30_000,
    30_000
  );
  assert.equal(result.status, 200);
  assert.ok(result.body);
  assert.equal(result.text, null);
});
