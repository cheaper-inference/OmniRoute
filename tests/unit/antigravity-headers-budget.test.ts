import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { setImmediate as flush } from "node:timers/promises";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "agi-headers-budget-"));
process.env.DATA_DIR = dataDir;
process.env.FETCH_TIMEOUT_MS = "600000";
process.env.STREAM_READINESS_TIMEOUT_MS = "80000";
const { fetchAntigravityWithReadinessTimeout: fetchHeaders } =
  await import("../../open-sse/executors/antigravity/executeAttempt.ts");
const { FETCH_TIMEOUT_MS, ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE } =
  await import("../../open-sse/config/constants.ts");
const { executeWithUpstreamStartTimeout } =
  await import("../../open-sse/handlers/chatCore/upstreamTimeouts.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function delayedHeaders(t: TestContext, delayMs: number) {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let sentSignal: AbortSignal | null = null;
  t.mock.method(globalThis, "fetch", (_url: unknown, init: RequestInit) => {
    sentSignal = init.signal ?? null;
    return new Promise<Response>((resolve, reject) => {
      setTimeout(() => resolve(new Response("OK")), delayMs);
      sentSignal?.addEventListener("abort", () => reject(sentSignal?.reason), { once: true });
    });
  });
  return () => sentSignal;
}

test("default headers budget admits reasoning that stays silent beyond SSE readiness", async (t) => {
  const sentSignal = delayedHeaders(t, 170_000);
  const pending = fetchHeaders("https://example.invalid/generate", {});
  pending.catch(() => {});
  t.mock.timers.tick(80_001);
  await flush();
  assert.equal(sentSignal()?.aborted, false);
  t.mock.timers.tick(89_999);
  assert.equal((await pending).status, 200);
});

test("default headers wait still expires at the global startup deadline", async (t) => {
  const sentSignal = delayedHeaders(t, FETCH_TIMEOUT_MS + 1);
  const pending = fetchHeaders("https://example.invalid/generate", {});
  pending.catch(() => {});
  t.mock.timers.tick(FETCH_TIMEOUT_MS - 1);
  assert.equal(sentSignal()?.aborted, false);
  t.mock.timers.tick(1);
  await assert.rejects(pending, (error: Error & { code?: string; status?: number }) => {
    assert.equal(error.code, ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE);
    assert.equal(error.status, 504);
    return true;
  });
});

test("caller cancellation preserves its reason before headers", async (t) => {
  delayedHeaders(t, 170_000);
  const caller = new AbortController();
  const reason = new Error("caller cancelled");
  const pending = fetchHeaders("https://example.invalid/generate", { signal: caller.signal });
  caller.abort(reason);
  await assert.rejects(pending, (error) => error === reason);
});

test("a shorter outer startup budget still cancels the helper", async (t) => {
  delayedHeaders(t, 170_000);
  const caller = new AbortController();
  const pending = executeWithUpstreamStartTimeout({
    executor: { getTimeoutMs: () => FETCH_TIMEOUT_MS },
    provider: "antigravity",
    model: "fixture",
    connectionTimeoutMs: 25,
    signal: caller.signal,
    execute: (signal) => fetchHeaders("https://example.invalid/generate", { signal }),
  });
  pending.catch(() => {});
  t.mock.timers.tick(25);
  await assert.rejects(pending, (error: Error & { code?: string }) => {
    assert.equal(error.code, ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE);
    assert.match(error.message, /25ms/);
    return true;
  });
});

test("explicit helper timeout remains supported", async (t) => {
  delayedHeaders(t, 100);
  const pending = fetchHeaders("https://example.invalid/generate", {}, 20);
  pending.catch(() => {});
  t.mock.timers.tick(20);
  await assert.rejects(pending, { code: ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE });
});

test("explicit zero disables the helper timer", async (t) => {
  delayedHeaders(t, FETCH_TIMEOUT_MS + 1);
  const pending = fetchHeaders("https://example.invalid/generate", {}, 0);
  t.mock.timers.tick(FETCH_TIMEOUT_MS + 1);
  assert.equal((await pending).status, 200);
});

test("headers success clears its timer while retaining caller cancellation", async (t) => {
  const sentSignal = delayedHeaders(t, 10);
  const caller = new AbortController();
  const pending = fetchHeaders("https://example.invalid/generate", { signal: caller.signal });
  t.mock.timers.tick(10);
  await pending;
  t.mock.timers.tick(FETCH_TIMEOUT_MS + 1);
  assert.equal(sentSignal()?.aborted, false);
  caller.abort();
  assert.equal(sentSignal()?.aborted, true);
});

test("network failure keeps its identity and clears the header timer", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const failure = new TypeError("fixture network failure");
  let sentSignal: AbortSignal | null = null;
  t.mock.method(globalThis, "fetch", async (_url: unknown, init: RequestInit) => {
    sentSignal = init.signal ?? null;
    throw failure;
  });
  await assert.rejects(
    fetchHeaders("https://example.invalid/generate", {}),
    (error) => error === failure
  );
  t.mock.timers.tick(FETCH_TIMEOUT_MS + 1);
  assert.equal(sentSignal?.aborted, false);
});
