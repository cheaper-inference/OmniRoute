import test from "node:test";
import assert from "node:assert/strict";

// Queue wait: ms from execution start to the first upstream dispatch, derived
// from a sticky first-dispatch stamp on the applied-proxy capture sink (the
// same plumbing added_wait_ms uses). Fakes only — never a real fetch, never a
// real database.

const proxyFetch = await import("../../open-sse/utils/proxyFetch.ts");

test("1. sink round-trip: noteUpstreamDispatch then readUpstreamDispatchedAt returns the stamp", () => {
  const sink: { proxy: unknown } = { proxy: null };
  proxyFetch.runWithAppliedProxyCapture(sink as never, () => {
    const before = Date.now();
    proxyFetch.noteUpstreamDispatch();
    const stamp = proxyFetch.readUpstreamDispatchedAt();
    assert.ok(stamp !== null);
    assert.ok(stamp >= before && stamp <= Date.now());
  });
});

test("2. stamp is sticky: the first dispatch wins, later notes never rewrite it", () => {
  const sink: { proxy: unknown; upstreamDispatchedAt?: number | null } = { proxy: null };
  proxyFetch.runWithAppliedProxyCapture(sink as never, () => {
    // Simulate an earlier dispatch stamp (retry path), then dispatch "now":
    sink.upstreamDispatchedAt = 1_000;
    proxyFetch.noteUpstreamDispatch();
    assert.equal(proxyFetch.readUpstreamDispatchedAt(), 1_000);
    // An explicit null (nothing dispatched yet) is also treated as unset.
    sink.upstreamDispatchedAt = null;
    proxyFetch.noteUpstreamDispatch();
    assert.ok(proxyFetch.readUpstreamDispatchedAt() !== null);
  });
});

test("3. readUpstreamDispatchedAt outside a capture is null and never throws", () => {
  assert.equal(proxyFetch.readUpstreamDispatchedAt(), null);
  proxyFetch.noteUpstreamDispatch();
  assert.equal(proxyFetch.readUpstreamDispatchedAt(), null);
});

test("4. queueWaitMsFromDispatch: null propagates, deltas round, skew clamps at 0", () => {
  assert.equal(proxyFetch.queueWaitMsFromDispatch(null, 1_000), null);
  assert.equal(proxyFetch.queueWaitMsFromDispatch(Number.NaN, 1_000), null);
  assert.equal(proxyFetch.queueWaitMsFromDispatch(1_000, Number.NaN), null);
  assert.equal(proxyFetch.queueWaitMsFromDispatch(2_500, 1_000), 1_500);
  // Negative skew (stamp before start) must clamp to 0, never persist a negative wait.
  assert.equal(proxyFetch.queueWaitMsFromDispatch(900, 1_000), 0);
});

test("5. sink shape stays plain data (no getters/functions added by the stamp)", () => {
  const sink: { proxy: unknown } = { proxy: null };
  proxyFetch.runWithAppliedProxyCapture(sink as never, () => {
    proxyFetch.noteUpstreamDispatch();
  });
  const stamp = (sink as { upstreamDispatchedAt?: number | null }).upstreamDispatchedAt;
  assert.equal(typeof stamp, "number");
  assert.equal(Object.prototype.toString.call(stamp), "[object Number]");
});
