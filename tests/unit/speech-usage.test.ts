import test from "node:test";
import assert from "node:assert/strict";

const { trackOpenRouterSpeech, speechUsage } = await import("../../open-sse/utils/speechUsage.ts");
const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function upstream(id = "gen-test") {
  return new Response(new Uint8Array([1, 2, 3]), { headers: { "X-Generation-Id": id } });
}

test("TTS streams unchanged with backpressure and queries the selected EU generation only at completion", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (url, options) => {
    calls.push(String(url));
    assert.equal(new Headers(options?.headers).get("authorization"), "Bearer test-key");
    assert.equal(options?.redirect, "error");
    assert.ok(options?.signal);
    return Response.json({
      data: {
        id: "gen-test",
        total_cost: 0.001,
        native_tokens_prompt: 2,
        native_tokens_completion: 3,
      },
    });
  };
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://eu.openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(calls.length, 0);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), new Uint8Array([1, 2, 3]));
  assert.deepEqual(await speechUsage(response), {
    cost_usd: 0.001,
    input_tokens: 2,
    output_tokens: 3,
  });
  assert.deepEqual(calls, ["https://eu.openrouter.ai/api/v1/generation?id=gen-test"]);
});

test("TTS cancellation reconciles once without retrying synthesis", async () => {
  let count = 0;
  globalThis.fetch = async () => {
    count++;
    return Response.json({ data: { id: "gen-test", total_cost: 0 } });
  };
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await response.body!.cancel();
  assert.deepEqual(await speechUsage(response), { cost_usd: 0 });
  assert.equal(count, 1);
});

test("generation accounting never forwards credentials to unrecognized origins or invalid ids", async () => {
  globalThis.fetch = async () => {
    assert.fail("no metadata request allowed");
  };
  for (const url of [
    "http://openrouter.ai/api/v1/audio/speech",
    "https://openrouter.ai.evil.test/api/v1/audio/speech",
    "https://127.0.0.1/api/v1/audio/speech",
    "https://openrouter.ai:444/api/v1/audio/speech",
    "https://user:pass@openrouter.ai/api/v1/audio/speech",
    "https://openrouter.ai/other",
  ]) {
    const source = upstream();
    assert.equal(trackOpenRouterSpeech(source, source, url, "test-key"), source);
    assert.equal(speechUsage(source), undefined);
    await source.body!.cancel();
  }
  const source = upstream("../../other");
  assert.equal(
    trackOpenRouterSpeech(source, source, "https://openrouter.ai/api/v1/audio/speech", "test-key"),
    source
  );
  await source.body!.cancel();
});

for (const data of [
  { id: "different", total_cost: 0.1 },
  { id: "gen-test", total_cost: -1 },
  { id: "gen-test", total_cost: "0.01" },
]) {
  test(`invalid generation billing stays unknown: ${JSON.stringify(data)}`, async () => {
    globalThis.fetch = async () => Response.json({ data });
    const source = upstream();
    const response = trackOpenRouterSpeech(
      source,
      source,
      "https://openrouter.ai/api/v1/audio/speech",
      "test-key"
    );
    await response.arrayBuffer();
    assert.equal(await speechUsage(response), null);
  });
}

test("eventually consistent generation metadata retries only bounded read-only 404s", async () => {
  let calls = 0;
  globalThis.fetch = async () =>
    ++calls < 3
      ? new Response(null, { status: 404 })
      : Response.json({ data: { id: "gen-test", total_cost: 0.002 } });
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await response.arrayBuffer();
  assert.deepEqual(await speechUsage(response), { cost_usd: 0.002 });
  assert.equal(calls, 3);
});

test("oversized metadata is cancelled, never retained as an accounting payload", async () => {
  globalThis.fetch = async () => new Response("x".repeat(70_000));
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await response.arrayBuffer();
  assert.equal(await speechUsage(response), null);
});

test("multi-chunk metadata accepts the exact size limit and ignores invalid token counters", async () => {
  const json = JSON.stringify({
    data: {
      id: "gen-test",
      total_cost: 0.001,
      native_tokens_prompt: -1,
      native_tokens_completion: 1.5,
    },
    padding: "",
  });
  const bytes = new TextEncoder().encode(
    json.replace('"padding":""', `"padding":"${"x".repeat(65_536 - json.length)}"`)
  );
  assert.equal(bytes.length, 65_536);
  globalThis.fetch = async () =>
    new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(bytes.slice(0, 30_000));
          controller.enqueue(bytes.slice(30_000));
          controller.close();
        },
      })
    );
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await response.arrayBuffer();
  assert.deepEqual(await speechUsage(response), { cost_usd: 0.001 });
});

test("a non-retryable metadata error cancels its body without another fetch", async () => {
  let calls = 0;
  let cancelled = false;
  globalThis.fetch = async () => {
    calls++;
    return new Response(
      new ReadableStream({
        cancel() {
          cancelled = true;
        },
      }),
      { status: 500 }
    );
  };
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await response.arrayBuffer();
  assert.equal(await speechUsage(response), null);
  assert.equal(calls, 1);
  assert.equal(cancelled, true);
});

test("late generation records are reconciled without another paid synthesis", async (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  let calls = 0;
  globalThis.fetch = async () =>
    ++calls < 6
      ? new Response(null, { status: 404 })
      : Response.json({ data: { id: "gen-test", total_cost: 0.0004433 } });
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://eu.openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await response.arrayBuffer();
  for (let i = 0; i < 8; i++) {
    await new Promise((resolve) => setImmediate(resolve));
    context.mock.timers.tick(20_000);
  }
  assert.deepEqual(await speechUsage(response), { cost_usd: 0.0004433 });
  assert.equal(calls, 6);
});

test("a pending generation row is retried until its actual charge is populated", async (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  let calls = 0;
  globalThis.fetch = async () =>
    Response.json({ data: { id: "gen-test", total_cost: ++calls < 6 ? null : 0.0004433 } });
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://eu.openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await response.arrayBuffer();
  for (let i = 0; i < 8; i++) {
    await new Promise((resolve) => setImmediate(resolve));
    context.mock.timers.tick(20_000);
  }
  assert.deepEqual(await speechUsage(response), { cost_usd: 0.0004433 });
  assert.equal(calls, 6);
});

test("unavailable generation metadata stays bounded and unknown, never zero", async (context) => {
  context.mock.timers.enable({ apis: ["setTimeout"] });
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    return new Response(null, { status: 404 });
  };
  const source = upstream();
  const response = trackOpenRouterSpeech(
    source,
    source,
    "https://eu.openrouter.ai/api/v1/audio/speech",
    "test-key"
  );
  await response.arrayBuffer();
  for (let i = 0; i < 10; i++) {
    await new Promise((resolve) => setImmediate(resolve));
    context.mock.timers.tick(20_000);
  }
  assert.equal(await speechUsage(response), null);
  assert.equal(calls, 8);
});
