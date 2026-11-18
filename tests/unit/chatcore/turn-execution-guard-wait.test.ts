import test from "node:test";
import assert from "node:assert/strict";

import {
  acquireTurnExecution,
  acquireTurnExecutionWithWait,
  clearTurnExecutionsForTesting,
} from "../../../open-sse/handlers/chatCore/turnExecutionGuard.ts";
import {
  runWithTurnExecutionOwnership,
  runWithoutTurnExecutionOwnership,
} from "../../../open-sse/handlers/chatCore/turnExecutionContext.ts";

test.afterEach(() => {
  clearTurnExecutionsForTesting();
});

test("acquires immediately when no turn is in flight", async () => {
  const turn = await acquireTurnExecutionWithWait("k");
  assert.equal(turn.acquired, true);
  turn.release();
});

test("null key remains an unconditional acquire", async () => {
  const turn = await acquireTurnExecutionWithWait(null);
  assert.equal(turn.acquired, true);
});

test("waits for the in-flight turn to release, then acquires", async () => {
  const first = acquireTurnExecution("k");
  assert.equal(first.acquired, true);
  setTimeout(() => first.release(), 120);
  const waits: string[] = [];
  const second = await acquireTurnExecutionWithWait("k", {
    timeoutMs: 2_000,
    pollMs: 40,
    log: { warn: (tag, msg) => waits.push(`${tag}:${msg}`) },
    traceId: "cid-1",
  });
  assert.equal(second.acquired, true);
  assert.ok(waits.some((w) => w.startsWith("TURN_GUARD:duplicate waiting cid=cid-1")));
  second.release();
});

test("falls back to the blocked result after the timeout", async () => {
  const first = acquireTurnExecution("k");
  assert.equal(first.acquired, true);
  const started = Date.now();
  const second = await acquireTurnExecutionWithWait("k", { timeoutMs: 150, pollMs: 40 });
  assert.equal(second.acquired, false);
  assert.ok(Date.now() - started >= 140);
  first.release();
});

test("stops waiting when the caller aborts", async () => {
  const first = acquireTurnExecution("k");
  assert.equal(first.acquired, true);
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 80);
  const second = await acquireTurnExecutionWithWait("k", {
    timeoutMs: 10_000,
    pollMs: 40,
    signal: controller.signal,
  });
  assert.equal(second.acquired, false);
  first.release();
});

test("a re-entry under the owner's context reuses the slot instead of blocking", async () => {
  await runWithTurnExecutionOwnership(async () => {
    const first = acquireTurnExecution("owned");
    assert.equal(first.acquired, true);

    // Same-account retry / account rotation / combo leg of the same request:
    // same key, same ownership scope, must proceed immediately.
    const started = Date.now();
    const reentry = await acquireTurnExecutionWithWait("owned", { timeoutMs: 5_000 });
    assert.equal(reentry.acquired, true);
    assert.ok(Date.now() - started < 1_000, "re-entry must not wait out its own turn");

    // The nested release must not free the owner's slot: a caller outside
    // this request's ownership scope is still blocked.
    reentry.release();
    const foreign = runWithoutTurnExecutionOwnership(() => acquireTurnExecution("owned"));
    assert.equal(foreign.acquired, false);

    first.release();
    const after = acquireTurnExecution("owned");
    assert.equal(after.acquired, true);
    after.release();
  });
});

test("different keys in one ownership scope are tracked independently", async () => {
  await runWithTurnExecutionOwnership(async () => {
    const a = acquireTurnExecution("key-a");
    const b = acquireTurnExecution("key-b");
    assert.equal(a.acquired, true);
    assert.equal(b.acquired, true);
    a.release();
    const a2 = acquireTurnExecution("key-a");
    assert.equal(a2.acquired, true);
    a2.release();
    b.release();
  });
});
