import test from "node:test";
import assert from "node:assert/strict";

import { isRegisteredFeatureFlagEnabled } from "../../open-sse/utils/registeredFeatureFlag.ts";

const RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");
type Store = Record<symbol, unknown>;

function withResolver(resolver: unknown, fn: () => void): void {
  const store = globalThis as unknown as Store;
  const had = RESOLVER_KEY in store;
  const previous = store[RESOLVER_KEY];
  if (resolver === undefined) delete store[RESOLVER_KEY];
  else store[RESOLVER_KEY] = resolver;
  try {
    fn();
  } finally {
    if (had) store[RESOLVER_KEY] = previous;
    else delete store[RESOLVER_KEY];
  }
}

test("without a registered resolver the environment decides (true/1/yes only)", () => {
  withResolver(undefined, () => {
    assert.equal(isRegisteredFeatureFlagEnabled("X_FLAG", {}), false);
    assert.equal(isRegisteredFeatureFlagEnabled("X_FLAG", { X_FLAG: "true" }), true);
    assert.equal(isRegisteredFeatureFlagEnabled("X_FLAG", { X_FLAG: "1" }), true);
    assert.equal(isRegisteredFeatureFlagEnabled("X_FLAG", { X_FLAG: "yes" }), true);
    assert.equal(isRegisteredFeatureFlagEnabled("X_FLAG", { X_FLAG: "false" }), false);
  });
});

test("the registered server resolver takes precedence over the environment", () => {
  withResolver(
    (key: string) => key === "X_FLAG",
    () => {
      assert.equal(isRegisteredFeatureFlagEnabled("X_FLAG", {}), true);
      assert.equal(isRegisteredFeatureFlagEnabled("Y_FLAG", { Y_FLAG: "true" }), false);
    }
  );
});

test("fails closed when the resolver throws", () => {
  withResolver(
    () => {
      throw new Error("db unavailable");
    },
    () => {
      assert.equal(isRegisteredFeatureFlagEnabled("X_FLAG", { X_FLAG: "true" }), false);
    }
  );
});
