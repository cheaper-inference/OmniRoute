import test from "node:test";
import assert from "node:assert/strict";
import {
  getRegisteredConnectionStore,
  registerConnectionStore,
  type RegisteredConnectionStore,
} from "../../open-sse/utils/registeredConnectionStore.ts";
import {
  captureCodexConnectionFence,
  getCodexOperationFence,
  inheritCodexResponseFence,
  isCodexConnectionFenceCurrent,
  isCodexResponseCurrent,
  bindCodexResponseFence,
  runWithCodexConnectionFence,
  runWithCodexResponseFence,
  bindCodexResponseCallbacks,
  StaleCodexOperationError,
  type CodexConnectionFence,
} from "../../open-sse/services/codexAccount/fences.ts";
import type { CodexFenceStore } from "../../open-sse/services/codexAccount/fenceTypes.ts";

const fence: CodexConnectionFence = Object.freeze({
  connectionId: "synthetic-connection",
  ownerEpoch: "synthetic-owner",
  credentialRevision: 1,
  failureRevision: 0,
  connectionBinding: "synthetic-binding",
});

function withStore(store: RegisteredConnectionStore | null, work: () => void): void {
  const previous = getRegisteredConnectionStore();
  if (store) registerConnectionStore(store);
  else Reflect.deleteProperty(globalThis, Symbol.for("omniroute.providerConnectionStore"));
  try {
    work();
  } finally {
    if (previous) registerConnectionStore(previous);
    else Reflect.deleteProperty(globalThis, Symbol.for("omniroute.providerConnectionStore"));
  }
}

const connectionStore: RegisteredConnectionStore = {
  getProviderConnectionById: async () => null,
  mergeConnectionProviderSpecificData: async () => {},
};
const runtime: CodexFenceStore = {
  captureCodexConnectionFence: () => fence,
  captureCodexConnectionOwnerFence: () => fence,
  adoptCodexConnectionFence: () => fence,
  isCodexConnectionFenceCurrent: () => true,
};

test("engine fence bridge fails closed without the durable application runtime", () => {
  for (const store of [null, connectionStore]) {
    withStore(store, () => {
      assert.throws(
        () => captureCodexConnectionFence({ connectionId: fence.connectionId }),
        (error: unknown) =>
          error instanceof StaleCodexOperationError &&
          error.status === 409 &&
          error.code === "codex_connection_changed"
      );
    });
  }
});

test("unbound non-Codex response helpers do not require a durable application store", () => {
  withStore(null, () => {
    const response = new Response("non-Codex body");
    const replacement = new Response("translated body");
    const value = { unchanged: true };
    assert.equal(
      runWithCodexConnectionFence(null, () => value),
      value
    );
    assert.equal(getCodexOperationFence("unbound"), null);
    assert.equal(inheritCodexResponseFence(response, replacement), replacement);
    assert.equal(isCodexResponseCurrent(replacement), true);
    assert.equal(
      runWithCodexResponseFence(replacement, () => value),
      value
    );
    const callbacks = bindCodexResponseCallbacks(replacement, { complete: () => value });
    assert.equal(callbacks.complete(), value);
  });
});

test("bound Codex callbacks retain their fence and fail closed without durable validation", () => {
  withStore(null, () => {
    const response = new Response("bound body");
    const replacement = new Response("translated body");
    bindCodexResponseFence(response, fence);
    inheritCodexResponseFence(response, replacement);
    let calls = 0;
    const callbacks = bindCodexResponseCallbacks(replacement, {
      complete() {
        calls += 1;
        return getCodexOperationFence(fence.connectionId);
      },
    });
    assert.throws(() => callbacks.complete(), StaleCodexOperationError);
    assert.equal(calls, 0);
    registerConnectionStore({
      ...connectionStore,
      codexFences: { ...runtime, isCodexConnectionFenceCurrent: () => false },
    });
    assert.equal(callbacks.complete(), undefined);
    assert.equal(calls, 0);
    registerConnectionStore({ ...connectionStore, codexFences: runtime });
    assert.equal(callbacks.complete(), fence);
    assert.equal(calls, 1);
    assert.equal(getCodexOperationFence(fence.connectionId), null);
  });
});

test("engine fence bridge resolves registration at call time and forwards return values", () => {
  withStore(null, () => {
    assert.equal(getCodexOperationFence(fence.connectionId), null);
    registerConnectionStore({ ...connectionStore, codexFences: runtime });
    assert.equal(captureCodexConnectionFence({ connectionId: fence.connectionId }), fence);
    const result = { preserved: true };
    assert.equal(
      runWithCodexConnectionFence(fence, () => {
        assert.equal(getCodexOperationFence(fence.connectionId), fence);
        return result;
      }),
      result
    );
    assert.equal(getCodexOperationFence(fence.connectionId), null);
    assert.equal(isCodexConnectionFenceCurrent(fence), true);
    registerConnectionStore({
      ...connectionStore,
      codexFences: { ...runtime, isCodexConnectionFenceCurrent: () => false },
    });
    assert.equal(isCodexConnectionFenceCurrent(fence), false);
  });
});
