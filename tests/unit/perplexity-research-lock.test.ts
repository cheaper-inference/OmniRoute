// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

const {
  acquireResearchLock,
  releaseResearchLock,
  markUpstreamUnconfirmed,
  sweepResearchLock,
  UNCONFIRMED_GRACE_MS,
} = await import("../../open-sse/mcp-server/tools/perplexityResearchLock.ts");

const MIN = 60_000;

test("a second acquire on the same connection is busy", () => {
  const a = acquireResearchLock({
    connectionId: "c1",
    invocationId: "inv-1",
    nowMs: 0,
    maxTotalMinutes: 45,
  });
  const b = acquireResearchLock({
    connectionId: "c1",
    invocationId: "inv-2",
    nowMs: 1000,
    maxTotalMinutes: 45,
  });
  assert.equal(a, "acquired");
  assert.equal(b, "research_busy");
});

test("releasing with the old invocation keeps the newer lock", () => {
  acquireResearchLock({ connectionId: "c2", invocationId: "old", nowMs: 0, maxTotalMinutes: 45 });
  releaseResearchLock("c2", "old");
  acquireResearchLock({
    connectionId: "c2",
    invocationId: "new",
    nowMs: 1000,
    maxTotalMinutes: 45,
  });
  releaseResearchLock("c2", "old");
  const again = acquireResearchLock({
    connectionId: "c2",
    invocationId: "third",
    nowMs: 2000,
    maxTotalMinutes: 45,
  });
  assert.equal(again, "research_busy");
});

test("two connections can each hold a lock", () => {
  const a = acquireResearchLock({
    connectionId: "c3",
    invocationId: "a",
    nowMs: 0,
    maxTotalMinutes: 45,
  });
  const b = acquireResearchLock({
    connectionId: "c4",
    invocationId: "b",
    nowMs: 0,
    maxTotalMinutes: 45,
  });
  assert.equal(a, "acquired");
  assert.equal(b, "acquired");
});

test("a 45 minute lock is still held at minute 12 and minute 44", () => {
  acquireResearchLock({ connectionId: "c5", invocationId: "held", nowMs: 0, maxTotalMinutes: 45 });
  assert.equal(sweepResearchLock("c5", 12 * MIN), "held");
  assert.equal(sweepResearchLock("c5", 44 * MIN), "held");
});

test("a 120 minute lock is still held at minute 60", () => {
  acquireResearchLock({ connectionId: "c6", invocationId: "long", nowMs: 0, maxTotalMinutes: 120 });
  assert.equal(sweepResearchLock("c6", 60 * MIN), "held");
});

test("an unconfirmed fetch stays busy one grace period past the deadline and a finished one is cleared", () => {
  acquireResearchLock({ connectionId: "c7", invocationId: "stuck", nowMs: 0, maxTotalMinutes: 45 });
  markUpstreamUnconfirmed("c7", "stuck");
  assert.equal(sweepResearchLock("c7", 46 * MIN), "upstream_unconfirmed");
  assert.equal(
    acquireResearchLock({
      connectionId: "c7",
      invocationId: "next",
      nowMs: 46 * MIN,
      maxTotalMinutes: 45,
    }),
    "research_busy"
  );

  acquireResearchLock({ connectionId: "c8", invocationId: "done", nowMs: 0, maxTotalMinutes: 120 });
  assert.equal(sweepResearchLock("c8", 121 * MIN), "expired");
  assert.equal(
    acquireResearchLock({
      connectionId: "c8",
      invocationId: "after",
      nowMs: 121 * MIN,
      maxTotalMinutes: 120,
    }),
    "acquired"
  );
});

test("an unconfirmed lock frees the connection once its deadline and grace have passed", () => {
  acquireResearchLock({ connectionId: "c9", invocationId: "lost", nowMs: 0, maxTotalMinutes: 45 });
  markUpstreamUnconfirmed("c9", "lost");
  const freeAt = 46 * MIN + UNCONFIRMED_GRACE_MS;
  assert.equal(UNCONFIRMED_GRACE_MS, 60_000);
  assert.equal(sweepResearchLock("c9", freeAt - 1), "upstream_unconfirmed");
  assert.equal(
    acquireResearchLock({
      connectionId: "c9",
      invocationId: "early",
      nowMs: freeAt - 1,
      maxTotalMinutes: 45,
    }),
    "research_busy"
  );
  assert.equal(sweepResearchLock("c9", freeAt), "expired");
  assert.equal(
    acquireResearchLock({
      connectionId: "c9",
      invocationId: "takeover",
      nowMs: freeAt,
      maxTotalMinutes: 45,
    }),
    "acquired"
  );
});
