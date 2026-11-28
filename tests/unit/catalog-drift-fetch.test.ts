import assert from "node:assert/strict";
import { test } from "node:test";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const { CATALOG_DRIFT_USER_AGENT, createHostThrottle, fetchSource } =
  await import("../../scripts/quality/catalog-drift/fetchSource.mjs");

const url = "https://api.example.com/v1/models";

test("sends one GET with the generic user agent and no credentials", async () => {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  await fetchSource(url, {
    fetchImpl: async (input: string, init: RequestInit) => {
      calls.push({ url: input, init });
      return new Response("{}");
    },
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, url);
  const { init } = calls[0];
  const headers = new Headers(init.headers);
  assert.equal(init.method, "GET");
  assert.equal(headers.get("user-agent"), CATALOG_DRIFT_USER_AGENT);
  assert.equal(CATALOG_DRIFT_USER_AGENT, "catalog-drift-check/1.0");
  assert.equal(headers.has("authorization"), false);
  assert.equal(headers.has("cookie"), false);
  assert.equal(init.redirect, "follow");
});

test("classifies 404 and 410 as gone, 5xx and 429 as http, abort as timeout, ENOTFOUND as gone, other throws as network", async () => {
  for (const [status, failure] of [
    [404, "gone"],
    [410, "gone"],
    [503, "http"],
    [429, "http"],
  ] as const) {
    const result = await fetchSource(url, {
      fetchImpl: async () => new Response(null, { status }),
    });
    assert.equal(result.ok, false);
    assert.equal(result.failure, failure);
    assert.equal(result.status, status);
  }

  const failures = [
    [new DOMException("aborted", "AbortError"), "timeout"],
    [new DOMException("timed out", "TimeoutError"), "timeout"],
    [new Error("fetch failed", { cause: { code: "ENOTFOUND" } }), "gone"],
    [new Error("fetch failed", { cause: { code: "ECONNRESET" } }), "network"],
  ];
  for (const [error, failure] of failures) {
    const result = await fetchSource(url, {
      fetchImpl: async () => {
        throw error;
      },
    });
    assert.equal(result.ok, false);
    assert.equal(result.failure, failure);
    assert.equal(result.status, null);
  }
});

test("stops reading past maxBytes", async () => {
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array(2048));
    },
    cancel() {
      cancelled = true;
    },
  });
  const result = await fetchSource(url, {
    fetchImpl: async () => new Response(body),
    maxBytes: 1024,
  });
  assert.equal(result.ok, false);
  assert.equal(result.failure, "too-large");
  assert.equal(cancelled, true);
});

test("returns text and content type on 200", async () => {
  const text = '{"data":[]}';
  assert.deepEqual(
    await fetchSource(url, {
      fetchImpl: async () =>
        new Response(text, { headers: { "content-type": "application/json" } }),
    }),
    { ok: true, status: 200, contentType: "application/json", text }
  );
});

test("throttle waits minIntervalMs between two calls to the same host and not across hosts", async () => {
  let clock = 0;
  const delays: number[] = [];
  const throttle = createHostThrottle({
    minIntervalMs: 3000,
    now: () => clock,
    sleep: async (ms: number) => {
      delays.push(ms);
      clock += ms;
    },
  });
  await throttle.wait("a");
  await throttle.wait("a");
  await throttle.wait("b");
  assert.deepEqual(delays, [3000]);
});
