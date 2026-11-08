import assert from "node:assert/strict";
import { AsyncResource } from "node:async_hooks";
import test from "node:test";

import {
  captureCurrentProviderBody,
  createPreparedRequestLogger,
  isProviderRequestCaptureActive,
  runWithCapture,
} from "../../open-sse/utils/providerRequestLogging.ts";

const CAPTURE_STATE_KEY = Symbol.for("omniroute.providerRequestCapture.state");

// The AsyncLocalStorage store a dispatch (and any async resource created in it) holds on to.
function dispatchStore(): { capture: unknown } | undefined {
  const state = (globalThis as Record<symbol, unknown>)[CAPTURE_STATE_KEY] as {
    context: { getStore: () => { capture: unknown } | undefined };
  };
  return state.context.getStore();
}

function makeCapture() {
  return createPreparedRequestLogger(
    { logTargetRequest() {} },
    { id: null, model: "synthetic-model", provider: "synthetic-provider", connectionId: null }
  );
}

test("after a dispatch settles chatCore can still read the wire body, but the ALS store no longer holds the Capture", async () => {
  const capture = makeCapture();
  const fallback = { model: "fallback", messages: [] };
  const upstream = { model: "serialized", messages: [{ role: "user", content: "payload" }] };
  let resource: AsyncResource | undefined;
  try {
    const result = await runWithCapture(capture, async () => {
      await captureCurrentProviderBody(
        "https://synthetic.invalid/chat",
        {},
        JSON.stringify(upstream)
      );
      assert.deepEqual(capture.body(fallback), upstream);
      assert.ok(capture.latest?.());
      assert.equal(
        dispatchStore()?.capture,
        capture,
        "the live dispatch store carries the capture"
      );
      resource = new AsyncResource("synthetic-provider-socket");
      return "dispatch-result";
    });
    assert.equal(result, "dispatch-result");

    // Readers in chatCore run after runWithCapture settled: the exact wire body must survive
    // (signature-failure diagnostics via getLastOutboundBody, call-log request body).
    assert.deepEqual(capture.latest?.()?.body, upstream);
    assert.equal(capture.latest?.()?.url, "https://synthetic.invalid/chat");
    assert.deepEqual(capture.body(fallback), upstream);

    // ...while whatever async resource outlived the dispatch no longer reaches the Capture.
    assert.ok(resource);
    resource.runInAsyncScope(() => {
      const store = dispatchStore();
      assert.ok(store, "the resource still sees its (now empty) holder");
      assert.equal(store.capture, null);
    });
  } finally {
    resource?.emitDestroy();
  }
});

test("a rejected dispatch detaches the capture, keeps the body readable and rethrows the original error", async () => {
  const capture = makeCapture();
  const failure = new Error("synthetic dispatch failure");
  let resource: AsyncResource | undefined;
  try {
    await assert.rejects(
      runWithCapture(capture, async () => {
        await captureCurrentProviderBody(
          "https://synthetic.invalid/chat",
          {},
          '{"model":"failed"}'
        );
        assert.ok(capture.latest?.());
        resource = new AsyncResource("synthetic-provider-socket");
        throw failure;
      }),
      (error) => error === failure
    );
    assert.deepEqual(capture.latest?.()?.body, { model: "failed" });
    assert.deepEqual(capture.body({ model: "caller-body" }), { model: "failed" });
    resource?.runInAsyncScope(() => assert.equal(dispatchStore()?.capture, null));
  } finally {
    resource?.emitDestroy();
  }
});

test("tool-name metadata survives both during and after the dispatch", async () => {
  const capture = makeCapture();
  const names = new Map([["WorkspaceRead", "workspace_read"]]);
  const fallback = { model: "fallback" };
  Object.defineProperty(fallback, "_toolNameMap", { value: names, enumerable: false });
  await runWithCapture(capture, async () => {
    await captureCurrentProviderBody("https://synthetic.invalid/chat", {}, '{"model":"upstream"}');
    const body = capture.body(fallback) as Record<string, unknown>;
    assert.equal(body.model, "upstream");
    assert.equal(body._toolNameMap, names);
    assert.equal(Object.getOwnPropertyDescriptor(body, "_toolNameMap")?.enumerable, false);
    assert.doesNotMatch(JSON.stringify(body), /_toolNameMap/);
  });
  const body = capture.body(fallback) as Record<string, unknown>;
  assert.equal(body.model, "upstream");
  assert.equal(body._toolNameMap, names);
  assert.equal(Object.getOwnPropertyDescriptor(body, "_toolNameMap")?.enumerable, false);
  assert.doesNotMatch(JSON.stringify(body), /_toolNameMap/);
});

test("an async resource from a settled dispatch cannot capture anything or overwrite a retry", async () => {
  const capture = makeCapture();
  let resource: AsyncResource | undefined;
  try {
    await runWithCapture(capture, async () => {
      await captureCurrentProviderBody("https://synthetic.invalid/chat", {}, '{"model":"first"}');
      resource = new AsyncResource("synthetic-provider-socket");
    });
    assert.ok(resource);
    await resource.runInAsyncScope(async () => {
      assert.equal(isProviderRequestCaptureActive(), false);
      await captureCurrentProviderBody("https://synthetic.invalid/late", {}, '{"model":"late"}');
    });
    assert.deepEqual(
      capture.latest?.()?.body,
      { model: "first" },
      "late ALS work must not replace the captured body"
    );

    await runWithCapture(capture, async () => {
      assert.equal(isProviderRequestCaptureActive(), true);
      await captureCurrentProviderBody("https://synthetic.invalid/retry", {}, '{"model":"retry"}');
      assert.deepEqual(capture.body(null), { model: "retry" });
      // Through the ALS path (holder already emptied)...
      await resource.runInAsyncScope(() =>
        captureCurrentProviderBody("https://synthetic.invalid/stale", {}, '{"model":"stale"}')
      );
      // ...and by calling the same Capture directly from the old resource's scope.
      await resource.runInAsyncScope(() =>
        capture.capture({
          url: "https://synthetic.invalid/old-resource",
          headers: {},
          body: { model: "stale" },
          bodyString: '{"model":"stale"}',
        })
      );
      assert.deepEqual(capture.body(null), { model: "retry" });
    });
    assert.deepEqual(capture.latest?.()?.body, { model: "retry" });
  } finally {
    resource?.emitDestroy();
  }
});
