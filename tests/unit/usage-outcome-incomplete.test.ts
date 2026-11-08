/**
 * Usage outcome classes. A recorded terminal fact (for example a Responses
 * `response.incomplete` on an HTTP 200) must beat the numeric status, so a truncated
 * turn stops counting as completed. Only a row with no terminal fact falls back to the
 * HTTP status. The ledger summary keeps incomplete turns apart from successes and failures.
 */
import test from "node:test";
import assert from "node:assert/strict";

import * as ledger from "@/lib/usage/usageLedger";

const classify = (facts: Parameters<typeof ledger.classifyUsageOutcome>[0]) =>
  ledger.classifyUsageOutcome(facts);

test("an HTTP 200 carrying response.incomplete is incomplete, not completed", () => {
  assert.equal(classify({ status: 200, terminalStatus: "response.incomplete" }), "incomplete");
  assert.equal(classify({ status: 200, terminalStatus: "incomplete" }), "incomplete");
});

test("body stall and body overflow are incomplete", () => {
  assert.equal(classify({ status: 200, terminalStatus: "body_stall" }), "incomplete");
  assert.equal(classify({ status: 200, terminalStatus: "body_overflow" }), "incomplete");
});

test("a recorded terminal fact beats the numeric status in both directions", () => {
  assert.equal(classify({ status: 200, terminalStatus: "response.failed" }), "failed");
  assert.equal(classify({ status: 500, terminalStatus: "response.completed" }), "completed");
  // A turn that finished before the client left is completed, not a false abort.
  assert.equal(classify({ status: 499, terminalStatus: "response.completed" }), "completed");
});

test("client cancel and status 499 are aborted", () => {
  assert.equal(classify({ status: 200, aborted: true }), "aborted");
  assert.equal(classify({ status: 499 }), "aborted");
  assert.equal(classify({ terminalStatus: "response.cancelled" }), "aborted");
});

test("a row with no terminal fact falls back to the HTTP status", () => {
  assert.equal(classify({ status: 200 }), "completed");
  assert.equal(classify({ status: 302 }), "completed");
  assert.equal(classify({ status: 429 }), "failed");
  assert.equal(classify({ status: 504 }), "failed");
  assert.equal(classify({}), "failed");
  assert.equal(classify({ status: 200, terminalStatus: "something_new" }), "completed");
});

test("summarizeUsage counts an incomplete record apart from successes and failures", () => {
  const base = { providerId: "p", modelId: "m", latencyMs: 5, createdAt: "2026-01-01T00:00:00Z" };
  const summary = ledger.summarizeUsage([
    ledger.createUsageRecord({ ...base, id: "a", status: "success" }),
    ledger.createUsageRecord({ ...base, id: "b", status: "incomplete" }),
    ledger.createUsageRecord({ ...base, id: "c", status: "failed" }),
  ]);

  assert.equal(summary.requests, 3);
  assert.equal(summary.successes, 1);
  assert.equal(summary.failures, 1);
  assert.equal(summary.incomplete, 1);
});
