import assert from "node:assert/strict";
import test from "node:test";

import { finalizeStreamRequestLog } from "../../open-sse/utils/streamFailureFinalization.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  finalizePendingScope,
  updatePendingScope,
  type PendingRequestScope,
} from "../../src/lib/usage/pendingRequestScope.ts";
import {
  clearPendingRequests,
  finalizePendingRequestById,
  getCompletedDetails,
  getPendingById,
  getPendingRequests,
  getPendingRetainedBytes,
  sweepStalePendingRequests,
  trackPendingRequest,
} from "../../src/lib/usage/usageHistory.ts";

const MODEL = "caller-identity-model";
const PROVIDER = "caller-identity-provider";
const CONNECTION = "caller-identity-connection";
const MODEL_KEY = `${MODEL} (${PROVIDER})`;
const RESPONSE = {
  providerResponse: { output: "provider result" },
  clientResponse: { output: "client result" },
  status: 502,
  error: "upstream failed",
  errorCode: "stream_terminated",
};
const callers = [
  {
    name: "scope update",
    run: (scope: PendingRequestScope) => updatePendingScope(scope, RESPONSE),
  },
  {
    name: "scope finalization",
    run: (scope: PendingRequestScope) => finalizePendingScope(scope, RESPONSE),
  },
  {
    name: "stream finalization",
    run: (scope: PendingRequestScope) => {
      assert.equal(typeof scope.id, "string");
      finalizeStreamRequestLog({ ...scope, pendingRequestId: scope.id as string, ...RESPONSE });
    },
  },
];

function start() {
  const id = trackPendingRequest(MODEL, PROVIDER, CONNECTION, true, { stage: "started" });
  assert.ok(id);
  return { id, model: MODEL, provider: PROVIDER, connectionId: CONNECTION };
}

function snapshot() {
  return structuredClone({
    pending: getPendingById(),
    completed: getCompletedDetails(),
    counters: getPendingRequests(),
    retainedBytes: getPendingRetainedBytes(),
  });
}

test.beforeEach(clearPendingRequests);
test.afterEach(clearPendingRequests);
test.after(resetDbInstance);

for (const caller of callers) {
  for (const missing of ["evicted", "removed", "finished", "unknown"] as const) {
    test(`${caller.name}: ${missing} explicit id cannot affect a matching peer`, () => {
      const target = start();
      const peer = start();
      if (missing === "evicted") {
        const detail = getPendingById().get(target.id);
        assert.ok(detail);
        detail.startedAt = 0;
        // Exceed the real count cap; only the aged target should be evicted.
        for (let i = 0; i < 4999; i++) {
          trackPendingRequest("filler", "provider", "filler-connection", true);
        }
        assert.equal(sweepStalePendingRequests(), 1);
      } else if (missing === "removed") {
        trackPendingRequest(MODEL, PROVIDER, CONNECTION, false, undefined, target.id);
      } else if (missing === "finished") {
        assert.equal(finalizePendingRequestById(target.id, RESPONSE), true);
      } else {
        target.id = "unknown-request-id";
      }
      assert.equal(getPendingById().has(target.id), false);
      assert.equal(getPendingById().has(peer.id), true);
      const before = snapshot();

      caller.run(target);

      assert.deepEqual(snapshot(), before, "late explicit-id call must leave tracking unchanged");
    });
  }

  for (const targetIndex of [0, 1]) {
    test(`${caller.name}: exact id targets request ${targetIndex + 1} with a matching peer`, () => {
      const requests = [start(), start()];
      const target = requests[targetIndex];
      const peer = requests[1 - targetIndex];
      const peerBefore = structuredClone(getPendingById().get(peer.id));

      caller.run(target);

      assert.deepEqual(getPendingById().get(peer.id), peerBefore);
      if (caller.name === "scope update") {
        assert.equal(getPendingById().get(target.id)?.status, RESPONSE.status);
        assert.deepEqual(
          getPendingById().get(target.id)?.providerResponse,
          RESPONSE.providerResponse
        );
        assert.equal(getPendingRequests().byModel[MODEL_KEY], 2);
        assert.equal(getCompletedDetails().size, 0);
      } else {
        assert.equal(getPendingById().has(target.id), false);
        const completed = getCompletedDetails().get(target.id);
        assert.ok(completed);
        for (const key of [
          "providerResponse",
          "clientResponse",
          "status",
          "error",
          "errorCode",
        ] as const) {
          assert.deepEqual(completed[key], RESPONSE[key]);
        }
        assert.equal(getPendingRequests().byModel[MODEL_KEY], 1);
        assert.equal(getPendingRequests().byAccount[CONNECTION]?.[MODEL_KEY], 1);
      }
    });
  }
}

for (const id of [null, undefined, ""]) {
  test(`scope update: legacy id ${String(id)} updates the newest request`, () => {
    const first = start();
    const second = start();
    updatePendingScope({ ...first, id }, RESPONSE);
    assert.equal(getPendingById().get(first.id)?.status, undefined);
    assert.equal(getPendingById().get(second.id)?.status, RESPONSE.status);
    assert.equal(getPendingRequests().byModel[MODEL_KEY], 2);
  });

  test(`scope finalization: legacy id ${String(id)} completes the oldest request`, () => {
    const first = start();
    const second = start();
    finalizePendingScope({ ...second, id }, RESPONSE);
    assert.equal(getPendingById().has(first.id), false);
    assert.equal(getPendingById().has(second.id), true);
    assert.equal(getCompletedDetails().get(first.id)?.status, RESPONSE.status);
    assert.equal(getPendingRequests().byModel[MODEL_KEY], 1);
  });
}

test("stream finalization: empty legacy id completes the newest request", () => {
  const first = start();
  const second = start();
  finalizeStreamRequestLog({ ...first, pendingRequestId: "", ...RESPONSE });
  assert.equal(getPendingById().has(first.id), true);
  assert.equal(getPendingById().has(second.id), false);
  assert.equal(getCompletedDetails().get(second.id)?.status, RESPONSE.status);
  assert.equal(getPendingRequests().byModel[MODEL_KEY], 1);
});
