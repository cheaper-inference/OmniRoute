// The compat-rejected fallback used to log its decisions and nothing else, so a request that
// skipped every rejected target traced as if those targets were never considered.
import test from "node:test";
import assert from "node:assert/strict";

import { attemptCompatRejectedFallback } from "../../open-sse/services/combo/comboCompatFallback.ts";

const log = { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
const target = (modelStr: string) => ({ modelStr, executionKey: modelStr, provider: "acme" }) as never;

test("a target dropped as unavailable is reported with that reason", async () => {
  const skips: Array<[string, string]> = [];

  const result = await attemptCompatRejectedFallback([target("m1")], {}, {
    handleSingleModel: async () => {
      throw new Error("must not dispatch an unavailable target");
    },
    isModelAvailable: async () => false,
    log,
    strategy: "round-robin",
    onSkip: (_t, modelStr, reason) => skips.push([modelStr, reason]),
  } as never);

  assert.equal(result, null);
  assert.deepEqual(skips, [["m1", "availability"]]);
});

test("a target dropped on provider cooldown is reported with that reason", async () => {
  const skips: Array<[string, string]> = [];

  const result = await attemptCompatRejectedFallback([target("m2")], {}, {
    handleSingleModel: async () => {
      throw new Error("must not dispatch a target in cooldown");
    },
    isProviderInCooldown: () => true,
    log,
    strategy: "round-robin",
    onSkip: (_t, modelStr, reason) => skips.push([modelStr, reason]),
  } as never);

  assert.equal(result, null);
  assert.deepEqual(skips, [["m2", "provider_cooldown"]]);
});

test("the target that serves the request is reported as dispatched", async () => {
  const dispatched: string[] = [];

  const result = await attemptCompatRejectedFallback([target("m3")], {}, {
    handleSingleModel: async () => ({ ok: true, status: 200 }) as never,
    log,
    strategy: "round-robin",
    onDispatch: (_t, modelStr) => dispatched.push(modelStr),
  } as never);

  assert.ok(result, "the fallback serves the request");
  assert.deepEqual(dispatched, ["m3"]);
});
