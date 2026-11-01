import test from "node:test";
import assert from "node:assert/strict";

import {
  acquireTurnExecution,
  acquireTurnExecutionWithWait,
  clearTurnExecutionsForTesting,
} from "../../../open-sse/handlers/chatCore/turnExecutionGuard.ts";

test("acquires immediately when no turn is in flight", async () => {
  clearTurnExecutionsForTesting();
  const turn = await acquireTurnExecutionWithWait("k");
  assert.equal(turn.acquired, true);
});

test("null key remains an unconditional acquire", async () => {
  clearTurnExecutionsForTesting();
  const turn = await acquireTurnExecutionWithWait(null);
  assert.equal(turn.acquired, true);
});

test("waits for the in-flight turn to release, then acquires", async () => {
  clearTurnExecutionsForTesting();
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
});

test("falls back to the blocked result after the timeout", async () => {
  clearTurnExecutionsForTesting();
  const first = acquireTurnExecution("k");
  assert.equal(first.acquired, true);
  const started = Date.now();
  const second = await acquireTurnExecutionWithWait("k", { timeoutMs: 150, pollMs: 40 });
  assert.equal(second.acquired, false);
  assert.ok(Date.now() - started >= 140);
  first.release();
});

test("stops waiting when the caller aborts", async () => {
  clearTurnExecutionsForTesting();
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
