import test from "node:test";
import assert from "node:assert/strict";
import {
  configureWafRateLimit,
  gateOutboundRequest,
  resetWafRateLimit,
} from "../../open-sse/services/wafRateLimit.ts";

test.after(() => {
  resetWafRateLimit();
  configureWafRateLimit({ minGapMs: 500 });
});

test("concurrent calls leave the gate at least minGapMs apart", async () => {
  resetWafRateLimit();
  configureWafRateLimit({ minGapMs: 50 });
  const completedAt: number[] = [];

  await Promise.all(
    Array.from({ length: 4 }, async () => {
      await gateOutboundRequest("agentrouter:https://example.com/v1/messages");
      completedAt.push(Date.now());
    })
  );

  const gaps = completedAt.slice(1).map((time, index) => time - completedAt[index]);
  assert.ok(
    gaps.every((gap) => gap >= 45),
    `concurrent calls shared one wait; completion gaps were ${gaps.join(", ")}ms`
  );
});
