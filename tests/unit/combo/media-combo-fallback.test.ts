import test from "node:test";
import assert from "node:assert/strict";

import {
  hasDistinctMediaFallback,
  isTargetLocalMediaStatus,
  isTerminalMediaFailure,
  narrowMediaConnectionScope,
  pinnedConnectionIds,
} from "../../../open-sse/services/mediaComboFallback.ts";
import { runImageComboTargets } from "../../../open-sse/services/imageCombo.ts";

test("400/401/403 are target-local upstream statuses", () => {
  assert.equal(isTargetLocalMediaStatus(400), true);
  assert.equal(isTargetLocalMediaStatus(401), true);
  assert.equal(isTargetLocalMediaStatus(403), true);
  assert.equal(isTargetLocalMediaStatus(422), false);
  assert.equal(isTargetLocalMediaStatus(429), false);
  assert.equal(isTargetLocalMediaStatus(500), false);
});

test("target-local failure advances to a distinct provider", () => {
  assert.equal(
    hasDistinctMediaFallback({
      currentProvider: "openrouter",
      currentConnectionId: "or-account-a",
      remaining: [
        { target: { connectionId: null }, provider: "fal-ai" },
        { target: { connectionId: null }, provider: "openrouter" },
      ],
    }),
    true
  );
});

test("target-local failure advances to an explicitly distinct account on the same provider", () => {
  assert.equal(
    hasDistinctMediaFallback({
      currentProvider: "openrouter",
      currentConnectionId: "or-account-a",
      remaining: [{ target: { connectionId: "or-account-b" }, provider: "openrouter" }],
    }),
    true
  );
});

test("target-local failure remains terminal for the same or unpinned same-provider account", () => {
  assert.equal(
    hasDistinctMediaFallback({
      currentProvider: "openrouter",
      currentConnectionId: "or-account-a",
      remaining: [
        { target: { connectionId: "or-account-a" }, provider: "openrouter" },
        { target: {}, provider: "openrouter" },
      ],
    }),
    false
  );
});

test("credential selection honors exact combo account pins and allowlists", () => {
  assert.deepEqual(
    pinnedConnectionIds({ connectionId: "account-b", allowedConnectionIds: ["account-a"] }),
    ["account-b"]
  );
  assert.deepEqual(pinnedConnectionIds({ allowedConnectionIds: ["account-a", "account-b"] }), [
    "account-a",
    "account-b",
  ]);
  assert.equal(pinnedConnectionIds({}), null);
});

test("target account pins only narrow the caller key connection scope", () => {
  assert.deepEqual(narrowMediaConnectionScope(["account-a", "account-b"], ["account-b"]), [
    "account-b",
  ]);
  assert.deepEqual(narrowMediaConnectionScope(null, ["account-b"]), ["account-b"]);
  assert.deepEqual(narrowMediaConnectionScope(["account-a"], null), ["account-a"]);
  assert.deepEqual(narrowMediaConnectionScope(["account-a"], ["account-b"]), [
    "__omniroute_key_scope_no_connection__",
  ]);
});

test("image combo advances a target-local auth failure to a distinct provider", async () => {
  const dispatched: string[] = [];
  const result = await runImageComboTargets(
    [
      { modelStr: "openrouter/model-a", connectionId: "or-a" },
      { modelStr: "fal-ai/model-b", connectionId: "fal-b" },
    ],
    {
      resolveProvider: (target) => ({
        provider: target.modelStr.split("/")[0],
        model: target.modelStr.slice(target.modelStr.indexOf("/") + 1),
      }),
      resolveCredentials: async (_provider, target) => ({ connectionId: target.connectionId }),
      isRateLimited: () => false,
      dispatch: async ({ provider }) => {
        dispatched.push(provider);
        return provider === "openrouter"
          ? { success: false, status: 401, error: "expired account" }
          : { success: true, data: { data: [{ b64_json: "image" }] } };
      },
    }
  );

  assert.equal(result.outcome, "success");
  assert.deepEqual(dispatched, ["openrouter", "fal-ai"]);
  assert.equal(result.fallbackCount, 1);
});

test("image combo keeps a target-local auth failure terminal without a distinct account", async () => {
  let dispatchCount = 0;
  const result = await runImageComboTargets(
    [{ modelStr: "openrouter/model-a", connectionId: "or-a" }, { modelStr: "openrouter/model-b" }],
    {
      resolveProvider: (target) => ({ provider: "openrouter", model: target.modelStr }),
      resolveCredentials: async (_provider, target) => ({ connectionId: target.connectionId }),
      isRateLimited: () => false,
      dispatch: async () => {
        dispatchCount += 1;
        return { success: false, status: 403, error: "account forbidden" };
      },
    }
  );

  assert.equal(result.outcome, "terminal");
  assert.equal(dispatchCount, 1);
});

test("isTerminalMediaFailure only continues on target-local status with a distinct later target", () => {
  const remainingDistinct = [{ target: { connectionId: null }, provider: "fal-ai" }];
  const remainingSame = [{ target: { connectionId: null }, provider: "openrouter" }];
  const base = {
    provider: "openrouter",
    credentials: { connectionId: "or-account-a" },
    target: { connectionId: null },
  };

  // target-local status + distinct later provider -> keep going
  assert.equal(
    isTerminalMediaFailure({ ...base, status: 403, remaining: remainingDistinct }),
    false
  );
  // target-local status + only the same unpinned provider left -> terminal
  assert.equal(isTerminalMediaFailure({ ...base, status: 403, remaining: remainingSame }), true);
  // target-local status + nothing left -> terminal
  assert.equal(isTerminalMediaFailure({ ...base, status: 401, remaining: [] }), true);
  // non target-local status is never terminal here (the caller already treats it as retryable)
  assert.equal(isTerminalMediaFailure({ ...base, status: 503, remaining: [] }), false);
  // credential connection id wins over the target pin; a different pinned account continues
  assert.equal(
    isTerminalMediaFailure({
      ...base,
      status: 400,
      remaining: [{ target: { connectionId: "or-account-b" }, provider: "openrouter" }],
    }),
    false
  );
});
