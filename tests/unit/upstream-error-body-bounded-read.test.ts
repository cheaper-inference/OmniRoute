/**
 * An upstream error body is read with a 64 KiB byte cap and a 5 s time cap. A body that stalls
 * after a few bytes must not hold the request slot until the 600 s body timeout, and a large error
 * page must not be buffered whole. Timers are mocked so the 5 s cap runs without waiting.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-error-body-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { parseUpstreamError } = await import("../../open-sse/utils/error.ts");
const { runNonStreamingProviderLeg } =
  await import("../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { baseInput } = await import("./_helpers/nonStreamingProviderLegFixtures.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

/** A body that sends `first`, then stalls until it is cancelled. */
function stalledBody(first: string) {
  const state = { cancelled: false };
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(first));
    },
    cancel() {
      state.cancelled = true;
    },
  });
  return { body, state };
}

/** Advance the mocked clock in 5 s steps until the promise settles; false if it never does. */
async function settleWithin5sSteps<T>(promise: Promise<T>, steps = 6) {
  let settled = false;
  void promise.then(
    () => (settled = true),
    () => (settled = true)
  );
  for (let i = 0; i < steps && !settled; i++) {
    for (let j = 0; j < 5; j++) await tick();
    mock.timers.tick(5000);
    for (let j = 0; j < 5; j++) await tick();
  }
  return settled;
}

test("parseUpstreamError returns after 5 s when the error body stalls", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const { body, state } = stalledBody('{"error":{"message":"partial');
    const res = new Response(body, { status: 503 });
    const pending = parseUpstreamError(res, "mock");
    assert.equal(await settleWithin5sSteps(pending), true, "stalled error body held the read");
    const parsed = await pending;
    assert.equal(parsed.statusCode, 503);
    assert.equal(state.cancelled, true, "the stalled body must be cancelled");
  } finally {
    mock.timers.reset();
  }
});

test("parseUpstreamError stops reading an error body past 64 KiB", async () => {
  let pulled = 0;
  const state = { cancelled: false };
  const chunk = new TextEncoder().encode("a".repeat(16 * 1024));
  const body = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (pulled >= 100) return controller.close();
      pulled += 1;
      controller.enqueue(chunk);
    },
    cancel() {
      state.cancelled = true;
    },
  });
  const parsed = await parseUpstreamError(new Response(body, { status: 500 }), "mock");
  assert.equal(parsed.statusCode, 500);
  assert.equal(parsed.message, "Provider error body exceeded response size limit");
  assert.equal(state.cancelled, true);
  assert.ok(pulled < 20, `read ${pulled * 16} KiB of a 1600 KiB error body`);
});

test("parseUpstreamError still parses a small JSON error body", async () => {
  const res = new Response(JSON.stringify({ error: { message: "bad key" } }), { status: 401 });
  const parsed = await parseUpstreamError(res, "mock");
  assert.equal(parsed.statusCode, 401);
  assert.equal(parsed.message, "bad key");
});

test("non-stream provider leg returns an error result when the error body stalls", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    const { body } = stalledBody('{"error":{"message":"partial');
    const pending = runNonStreamingProviderLeg(
      baseInput({
        executeProviderRequest: async () => ({
          response: new Response(body, { status: 500 }),
          url: "https://api.openai.com/v1/chat/completions",
          headers: {},
          transformedBody: {},
        }),
      })
    );
    assert.equal(await settleWithin5sSteps(pending), true, "stalled error body held the leg");
    const result = await pending;
    assert.equal(result.kind, "error");
    if (result.kind === "error") assert.equal(result.result.status, 500);
  } finally {
    mock.timers.reset();
  }
});

test("executor 400 probe reads its error-body clone for at most 5 s", async () => {
  // The recovery helpers after the inline probes read their own clones; only the first clone
  // (the thinking-budget probe) is checked, so execute() itself is left pending on purpose.
  const originalFetch = globalThis.fetch;
  const clones: Array<{ cancelled: boolean }> = [];
  globalThis.fetch = (async () => {
    const res = new Response("{}", {
      status: 400,
      headers: { "content-type": "application/json" },
    });
    res.clone = () => {
      const { body, state } = stalledBody('{"error":{"message":"partial');
      clones.push(state);
      return new Response(body, { status: 400 });
    };
    return res;
  }) as never;
  mock.timers.enable({ apis: ["setTimeout"] });
  try {
    void new DefaultExecutor("openai")
      .execute({
        model: "gpt-4o",
        body: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: "sk-test" },
      } as never)
      .catch(() => {});
    for (let j = 0; j < 20; j++) await tick();
    assert.ok(clones.length >= 1, "the 400 probe must read a clone");
    assert.equal(clones[0].cancelled, false, "the probe must wait for the body before 5 s");
    mock.timers.tick(5000);
    for (let j = 0; j < 20; j++) await tick();
    assert.equal(clones[0].cancelled, true, "the probe must cancel a stalled body after 5 s");
  } finally {
    mock.timers.reset();
    globalThis.fetch = originalFetch;
  }
});
