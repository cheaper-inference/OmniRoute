import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const originalDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-terminal-trace-"));
process.env.DATA_DIR = dataDir;

const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const { createInvocationId, getComboTrace, resetComboTraceStore } =
  await import("../../../open-sse/services/combo/decisionTrace.ts");
const { resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { dispatchEvent } = await import("../../../src/lib/webhookDispatcher.ts");

const SAFETY_MS = 31_337;
const RETRY_MS = 7_919;

function response(status: number): Response {
  return new Response(
    JSON.stringify(
      status === 200
        ? { choices: [{ message: { role: "assistant", content: "recovered" } }] }
        : { error: { message: "synthetic upstream unavailable" } }
    ),
    { status, headers: { "content-type": "application/json", "x-synthetic": "preserved" } }
  );
}

function retryingCombo(t: TestContext, finalStatus = 200) {
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const timers = new Map<ReturnType<typeof setTimeout>, { delay: number; fire(): void }>();
  const retryScheduled = Promise.withResolvers<void>();
  const secondStarted = Promise.withResolvers<void>();
  const secondResponse = Promise.withResolvers<Response>();
  const controller = new AbortController();
  const invocationId = createInvocationId();
  const info: string[] = [];
  let dispatches = 0;
  let request: Promise<Response>;

  // Control only this fixture's retry and safety clocks. Discard old set safety
  // handles on cleanup while the independent timer fix is pending.
  globalThis.setTimeout = ((
    callback: (...args: unknown[]) => void,
    delay?: number,
    ...args: unknown[]
  ) => {
    if (delay !== SAFETY_MS && delay !== RETRY_MS) {
      return originalSetTimeout(callback, delay, ...args);
    }
    const handle = { unref() {} } as unknown as ReturnType<typeof setTimeout>;
    timers.set(handle, { delay, fire: () => callback(...args) });
    if (delay === RETRY_MS) retryScheduled.resolve();
    return handle;
  }) as typeof setTimeout;
  globalThis.clearTimeout = ((handle: ReturnType<typeof setTimeout>) => {
    if (!timers.delete(handle)) originalClearTimeout(handle);
  }) as typeof clearTimeout;

  function fireLatest(delay: number) {
    const pending = [...timers.entries()].filter(([, timer]) => timer.delay === delay);
    assert.ok(pending.length, `expected a pending ${delay}ms timer`);
    const [handle, timer] = pending.at(-1)!;
    timers.delete(handle);
    timer.fire();
  }

  t.after(async () => {
    controller.abort();
    secondResponse.resolve(response(finalStatus));
    try {
      await request;
    } finally {
      timers.clear();
      globalThis.setTimeout = originalSetTimeout;
      globalThis.clearTimeout = originalClearTimeout;
    }
  });

  request = handleComboChat({
    invocationId,
    body: { messages: [{ role: "user", content: "synthetic request" }] },
    combo: {
      name: invocationId,
      strategy: "priority",
      models: ["synthetic/model"],
      config: {
        maxRetries: 0,
        maxSetRetries: 1,
        setRetryDelayMs: RETRY_MS,
        targetTimeoutMs: 0,
        comboTimeoutMs: SAFETY_MS,
      },
    },
    handleSingleModel: async () => {
      dispatches += 1;
      if (dispatches === 1) return response(502);
      secondStarted.resolve();
      return secondResponse.promise;
    },
    isModelAvailable: async () => true,
    signal: controller.signal,
    log: {
      info(_tag: string, message: string) {
        info.push(message);
      },
      warn() {},
      debug() {},
      error() {},
    },
    settings: {},
    allCombos: [],
  });

  return {
    invocationId,
    request,
    controller,
    retryScheduled: retryScheduled.promise,
    secondStarted: secondStarted.promise,
    releaseRetry: () => fireLatest(RETRY_MS),
    expire: () => fireLatest(SAFETY_MS),
    finish: () => secondResponse.resolve(response(finalStatus)),
    dispatches: () => dispatches,
    trace: () => getComboTrace(invocationId)!,
    summary: () => info.filter((line) => line.startsWith(`combo trace ${invocationId} `)),
  };
}

test.beforeEach(() => resetComboTraceStore());
test.after(async () => {
  // Drain earlier fire-and-forget notifications before closing the fixture DB.
  await dispatchEvent("request.failed", {});
  resetDbInstance();
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function assertTerminal(
  fixture: ReturnType<typeof retryingCombo>,
  result: Response,
  status: number
) {
  assert.equal(result.status, status);
  assert.equal(result.headers.get("X-OmniRoute-Combo-Trace"), fixture.invocationId);
  assert.equal(fixture.trace().terminal?.status, result.status);
  assert.equal(fixture.summary().length, 1);
  assert.ok(fixture.summary()[0].includes(`"status":${result.status}`));
}

for (const status of [200, 502, 429]) {
  test(`whole-set retry stays nonterminal until its final ${status} response`, async (t) => {
    const fixture = retryingCombo(t, status);
    await fixture.retryScheduled;
    assert.equal(fixture.dispatches(), 1);
    assert.equal(fixture.trace().terminal, null, "retry delay is still in flight");
    assert.deepEqual(fixture.summary(), []);

    fixture.releaseRetry();
    await fixture.secondStarted;
    assert.equal(fixture.trace().terminal, null, "second set is still in flight");
    assert.deepEqual(fixture.summary(), []);
    fixture.finish();
    const result = await fixture.request;
    assertTerminal(fixture, result, status);
    assert.equal(fixture.dispatches(), 2);
    if (status === 200) {
      assert.equal(result.headers.get("x-synthetic"), "preserved");
      assert.equal((await result.json()).choices[0].message.content, "recovered");
    }
  });
}

test("cancellation during whole-set retry delay records the returned 499", async (t) => {
  const fixture = retryingCombo(t);
  await fixture.retryScheduled;
  fixture.controller.abort();
  assertTerminal(fixture, await fixture.request, 499);
  assert.equal(fixture.dispatches(), 1);
});

test("a hanging second set records 504 only when its safety timeout returns", async (t) => {
  const fixture = retryingCombo(t);
  await fixture.retryScheduled;
  fixture.releaseRetry();
  await fixture.secondStarted;
  assert.equal(fixture.trace().terminal, null);
  fixture.expire();
  fixture.finish();
  assertTerminal(fixture, await fixture.request, 504);
  assert.equal(fixture.dispatches(), 2);
});

test("elapsed global budget records the aggregated 504 after a failed retry", async (t) => {
  const fixture = retryingCombo(t, 502);
  await fixture.retryScheduled;
  fixture.releaseRetry();
  await fixture.secondStarted;
  assert.equal(fixture.trace().terminal, null);
  const expiredAt = Date.now() + SAFETY_MS;
  t.mock.method(Date, "now", () => expiredAt);
  fixture.finish();
  const result = await fixture.request;
  assertTerminal(fixture, result, 504);
  assert.equal((await result.json()).error.code, "COMBO_TIMEOUT");
  assert.equal(fixture.dispatches(), 2);
});
