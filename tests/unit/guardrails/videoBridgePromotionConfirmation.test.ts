import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";

import { confirmVideoBridgePromotionRuns } from "../../../src/lib/guardrails/videoBridgePromotionConfirmation.ts";

function report(startedAt: string, finishedAt: string, digest: string) {
  return {
    comparison: "fu07" as "fu07" | "fu09",
    candidateModel: "same-model",
    execution: {
      state: "executed" as const,
      receipt: {
        runId: randomUUID(),
        candidateSha: "a".repeat(40),
        modelRevision: "same-model-revision-2026-10",
        manifestDigest: "b".repeat(64),
        startedAt,
        finishedAt,
        realModel: true as const,
        orderPolicy: "randomized-ab" as const,
        orderSeed: digest,
      },
    },
    observationsDigest: digest.repeat(64),
    fu07: { status: "eligible" as const, reasons: [] },
    fu09: { status: "eligible" as const, reasons: [] },
  };
}

test("promotion requires two distinct consecutive eligible executions of the same candidate", () => {
  const first = report("2026-10-09T10:00:00.000Z", "2026-10-09T11:00:00.000Z", "c");
  const second = report("2026-10-09T11:00:01.000Z", "2026-10-09T12:00:00.000Z", "d");
  assert.equal(confirmVideoBridgePromotionRuns([first]).fu07.status, "hold");
  assert.equal(confirmVideoBridgePromotionRuns([first, first]).fu09.status, "hold");
  assert.equal(confirmVideoBridgePromotionRuns([first, second]).fu07.status, "eligible");
  assert.equal(confirmVideoBridgePromotionRuns([first, second]).fu09.status, "hold");
  assert.equal(
    confirmVideoBridgePromotionRuns([
      { ...first, comparison: "fu09" },
      { ...second, comparison: "fu09" },
    ]).fu09.status,
    "eligible"
  );
  for (const patch of [
    { candidateSha: "e".repeat(40) },
    { modelRevision: "different-revision" },
    { modelRevision: undefined },
    { manifestDigest: "e".repeat(64) },
    { runId: first.execution.receipt.runId },
    { orderSeed: first.execution.receipt.orderSeed },
    { startedAt: first.execution.receipt.startedAt },
  ]) {
    assert.equal(
      confirmVideoBridgePromotionRuns([
        first,
        {
          ...second,
          execution: { ...second.execution, receipt: { ...second.execution.receipt, ...patch } },
        },
      ]).fu07.status,
      "hold"
    );
  }
  assert.equal(
    confirmVideoBridgePromotionRuns([first, { ...second, candidateModel: "other" }]).fu07.status,
    "hold"
  );
  assert.equal(
    confirmVideoBridgePromotionRuns([
      first,
      { ...second, observationsDigest: first.observationsDigest },
    ]).fu07.status,
    "hold"
  );
  assert.equal(
    confirmVideoBridgePromotionRuns([
      first,
      { ...second, fu07: { status: "experimental", reasons: ["NO_MATERIAL_GAIN"] } },
    ]).fu07.status,
    "hold"
  );
});

test("a structural-sampling receipt cannot confirm a contact-sheet experiment", () => {
  const first = {
    ...report("2026-10-09T10:00:00.000Z", "2026-10-09T11:00:00.000Z", "c"),
    comparison: "fu07" as const,
  };
  const second = {
    ...report("2026-10-09T11:00:01.000Z", "2026-10-09T12:00:00.000Z", "d"),
    comparison: "fu09" as const,
  };
  assert.equal(confirmVideoBridgePromotionRuns([first, second]).fu07.status, "hold");
  assert.equal(confirmVideoBridgePromotionRuns([first, second]).fu09.status, "hold");
});

test("confirmation keeps fail-closed reason precedence when several checks fail", () => {
  const first = report("2026-10-09T10:00:00.000Z", "2026-10-09T11:00:00.000Z", "c");
  const second = report("2026-10-09T11:00:01.000Z", "2026-10-09T12:00:00.000Z", "d");
  const expectHold = (current: typeof second, reason: string) => {
    assert.deepEqual(confirmVideoBridgePromotionRuns([first, current]), {
      fu07: { status: "hold", reasons: [reason] },
      fu09: { status: "hold", reasons: [reason] },
    });
  };

  second.execution.receipt.startedAt = first.execution.receipt.startedAt;
  expectHold(second, "EXECUTION_ORDER_INVALID");
  second.execution.receipt.orderSeed = first.execution.receipt.orderSeed;
  expectHold(second, "EXECUTIONS_NOT_INDEPENDENT");
  second.candidateModel = "different-model";
  expectHold(second, "EXECUTION_TARGET_MISMATCH");
  second.comparison = "fu09";
  expectHold(second, "COMPARISON_TARGET_MISMATCH");
  second.execution.receipt.runId = "invalid-uuid";
  expectHold(second, "EXECUTION_RECEIPT_INVALID");
});
