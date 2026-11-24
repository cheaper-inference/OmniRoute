import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-fallback-cancel-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const upstreamProxyDb = await import("../../src/lib/db/upstreamProxy.ts");
const { resolveExecutorWithProxy } =
  await import("../../open-sse/handlers/chatCore/executorProxy.ts");
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { clearUpstreamProxyConfigCache } =
  await import("../../open-sse/handlers/chatCore/comboContextCache.ts");

test.before(async () => {
  await core.ensureDbInitialized();
});

test.beforeEach(() => {
  clearUpstreamProxyConfigCache();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// A response whose body records when it is cancelled.
function trackedResponse(status: number): { response: Response; state: { cancelled: boolean } } {
  const state = { cancelled: false };
  const body = new ReadableStream<Uint8Array>({
    pull() {
      /* never produces: the body stays open until cancelled */
    },
    cancel() {
      state.cancelled = true;
    },
  });
  return { response: new Response(body, { status }), state };
}

// Cancel is asynchronous inside the stream machinery: give the event loop a bounded number of turns.
async function settle(): Promise<void> {
  for (let i = 0; i < 10; i++) await new Promise((resolve) => setImmediate(resolve));
}

async function runFallback(nativeStatus: number) {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "fallback",
    enabled: true,
  });
  const native = await getExecutor("openai");
  const originalExecute = native.execute.bind(native);
  const tracked = trackedResponse(nativeStatus);
  let proxyCalls = 0;
  native.execute = (async () => ({
    response: tracked.response,
    url: "https://native.example.test",
    headers: {},
    transformedBody: {},
  })) as never;
  const proxy = await getExecutor("cliproxyapi");
  const originalProxyExecute = proxy.execute.bind(proxy);
  proxy.execute = (async () => {
    proxyCalls++;
    return {
      response: new Response("{}", { status: 200 }),
      url: "https://proxy.example.test",
      headers: {},
      transformedBody: {},
    };
  }) as never;
  try {
    const wrapper = await resolveExecutorWithProxy("openai", undefined, null);
    const result = await wrapper.execute({
      model: "gpt-5",
      body: {},
      stream: false,
      credentials: { apiKey: "unit-test-key" },
    } as never);
    return { result, tracked, proxyCalls };
  } finally {
    native.execute = originalExecute as never;
    proxy.execute = originalProxyExecute as never;
  }
}

test("a retryable native failure is cancelled before the proxy leg answers", async () => {
  const { result, tracked, proxyCalls } = await runFallback(429);
  assert.equal(proxyCalls, 1, "the proxy leg ran");
  assert.equal(result.response.status, 200, "the proxy response is returned");
  await settle();
  assert.equal(tracked.state.cancelled, true, "the dropped native body must be cancelled");
});

test("a non-retryable native answer is returned untouched and not cancelled", async () => {
  const { result, tracked, proxyCalls } = await runFallback(200);
  assert.equal(proxyCalls, 0);
  assert.equal(result.response.status, 200);
  assert.equal(result.response.bodyUsed, false);
  await settle();
  assert.equal(tracked.state.cancelled, false);
  await result.response.body?.cancel();
});
