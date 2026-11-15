import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("capacity-shared-");
const engineProbe = await import("../../../open-sse/utils/providerProbeResult.ts");
const appProbe = await import("../../../src/shared/utils/providerProbeResult.ts");
const engineCaps = await import("../../../open-sse/services/connectionConcurrency.ts");
const appCaps = await import("../../../src/sse/services/connectionConcurrencyFields.ts");
const defaults = await import("../../../open-sse/config/requestQueueDefaults.ts");
const settings = await import("../../../src/lib/resilience/settings.ts");
const { requestQueueState } =
  await import("../../../open-sse/services/rateLimitManager/queueSettings.ts");
test.after(cleanup);

test("engine and compatibility paths share provider probe identity", () => {
  const source = new Response("probe");
  const inherited = new Response("inherited");
  const unrelated = new Response("ordinary");
  appProbe.markProviderProbeResponse(source);
  engineProbe.inheritProviderProbeResponse(source, inherited);
  assert.equal(appProbe.isProviderProbeResponse(inherited), true);
  engineProbe.markProviderProbeResponse(unrelated);
  const fromEngine = new Response("compatibility");
  appProbe.inheritProviderProbeResponse(unrelated, fromEngine);
  assert.equal(engineProbe.isProviderProbeResponse(fromEngine), true);
  assert.equal(engineProbe.isProviderProbeResponse(new Response("unmarked")), false);
});

test("app compatibility exports retain engine cap functions and queue defaults", () => {
  assert.equal(
    appCaps.resolveConnectionConcurrencyCeiling,
    engineCaps.resolveConnectionConcurrencyCeiling
  );
  assert.equal(appCaps.resolveAccountConcurrencyLimit, engineCaps.resolveAccountConcurrencyLimit);
  assert.equal(
    settings.DEFAULT_RESILIENCE_SETTINGS.requestQueue,
    defaults.DEFAULT_REQUEST_QUEUE_SETTINGS
  );
  assert.equal(requestQueueState.settings, defaults.DEFAULT_REQUEST_QUEUE_SETTINGS);
  assert.equal(
    settings.DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS,
    defaults.DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS
  );
  assert.equal(
    settings.DEFAULT_REQUEST_QUEUE_EXECUTION_MAX_WAIT_MS,
    defaults.DEFAULT_REQUEST_QUEUE_EXECUTION_MAX_WAIT_MS
  );
  assert.equal(settings.DEFAULT_REQUEST_QUEUE_MAX_DEPTH, defaults.DEFAULT_REQUEST_QUEUE_MAX_DEPTH);
});

test("queue defaults read environment overrides before first import", () => {
  const output = execFileSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--input-type=module",
      "-e",
      'const m = await import("./open-sse/config/requestQueueDefaults.ts"); console.log(JSON.stringify(m.DEFAULT_REQUEST_QUEUE_SETTINGS));',
    ],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        RATE_LIMIT_MAX_WAIT_MS: "125.9",
        RATE_LIMIT_EXECUTION_MAX_WAIT_MS: "987.9",
        RATE_LIMIT_MAX_QUEUE_DEPTH: "7.9",
      },
    }
  );
  const value = JSON.parse(output.trim());
  assert.equal(value.maxWaitMs, 125);
  assert.equal(value.executionMaxWaitMs, 987);
  assert.equal(value.maxQueueDepth, 7);
});

for (const finish of ["consume", "cancel"] as const) {
  test(`capacity handoff preserves no-replay ownership on ${finish}`, async (t) => {
    const sem = await import("../../../open-sse/services/accountSemaphore.ts");
    const { handoffCapacityResponse } =
      await import("../../../open-sse/services/combo/commonCapacity.ts");
    const { runComboWithNoReplayLatch } =
      await import("../../../open-sse/services/combo/noReplayLatch.ts");
    const { markNoReplayResponse, isNoReplayResponse } =
      await import("../../../open-sse/utils/noReplayResponse.ts");
    const owner = sem.createAccountCapacityWait({ deadline: Date.now() + 60_000 });
    const close = t.mock.method(owner, "close");
    let wrapped: Response | undefined;
    let latched: Response | undefined;
    let controller: ReadableStreamDefaultController<Uint8Array> | undefined;
    let sourceFinished = false;
    t.after(async () => {
      if (!sourceFinished) controller?.close();
      await Promise.allSettled([wrapped?.body?.cancel(), latched?.body?.cancel()]);
      owner.close();
    });
    const key = `fixture:no-replay-${finish}`;
    const held = await sem.acquire(key, { maxConcurrency: 1 });
    const parked = owner.wait([{ key, maxConcurrency: 1 }]);
    held();
    await parked;
    const source = markNoReplayResponse(
      new Response(
        new ReadableStream<Uint8Array>({
          start(value) {
            controller = value;
          },
        })
      )
    );
    const clone = source.clone.bind(source);
    // Retain the latch's spare branch so cancellation can clean up both tee branches.
    t.mock.method(source, "clone", () => (latched = clone()));
    const handleSingleModel = t.mock.fn(async () => source);
    const options = {
      handleSingleModel,
    } as import("../../../open-sse/services/combo/types.ts").HandleComboChatOptions;
    const result = await runComboWithNoReplayLatch(options, async (inner) => {
      const response = await inner.handleSingleModel({}, "fixture/model");
      wrapped = handoffCapacityResponse(response, owner);
      return wrapped;
    });
    assert.equal(result, wrapped);
    assert.equal(isNoReplayResponse(result), true);
    assert.equal(handleSingleModel.mock.callCount(), 1);
    assert.equal(close.mock.callCount(), 0);
    if (finish === "consume") {
      controller!.enqueue(new TextEncoder().encode("first second"));
      controller!.close();
      sourceFinished = true;
      assert.equal(await result.text(), "first second");
    } else {
      const cancelled = result.body!.cancel();
      assert.equal(close.mock.callCount(), 1);
      controller!.close();
      sourceFinished = true;
      await Promise.all([cancelled, latched!.body!.cancel()]);
    }
    assert.equal(close.mock.callCount(), 1);
  });
}
