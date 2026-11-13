import test from "node:test";
import assert from "node:assert/strict";
import { getEventListeners } from "node:events";

const { mergeAbortSignals } = await import("../../open-sse/executors/base/mergeAbortSignals.ts");

const listenerCount = (signal: AbortSignal) =>
  getEventListeners(signal as unknown as EventTarget, "abort").length;

test("merges that never abort leave no listener on the long-lived signal", () => {
  const longLived = new AbortController();
  for (let i = 0; i < 50; i++) {
    const merged = mergeAbortSignals(longLived.signal, new AbortController().signal);
    assert.equal(merged.aborted, false);
  }
  assert.equal(listenerCount(longLived.signal), 0);
});

test("the merged signal still aborts with the reason of the source that fired", () => {
  const primary = new AbortController();
  const secondary = new AbortController();
  const merged = mergeAbortSignals(primary.signal, secondary.signal);
  const reason = new Error("secondary fired");
  secondary.abort(reason);
  assert.equal(merged.aborted, true);
  assert.equal(merged.reason, reason);
});

test("an already aborted input gives an aborted merged signal with its reason", () => {
  const primary = new AbortController();
  const reason = new Error("primary done");
  primary.abort(reason);
  const merged = mergeAbortSignals(primary.signal, new AbortController().signal);
  assert.equal(merged.aborted, true);
  assert.equal(merged.reason, reason);
});
