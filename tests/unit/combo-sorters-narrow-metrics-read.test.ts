import test from "node:test";
import assert from "node:assert/strict";

const { sortTargetsByUsage, orderTargetsByPowerOfTwoChoices } =
  await import("../../open-sse/services/combo/targetSorters.ts");
const { recordComboRequest, resetComboMetrics } =
  await import("../../open-sse/services/comboMetrics.ts");

const COMBO = "sorter-narrow-read";

function target(executionKey: string) {
  return {
    kind: "model",
    stepId: executionKey,
    executionKey,
    modelStr: "codex/gpt-5.5",
    provider: "codex",
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  } as never;
}

function countFromEntries(fn: () => void): number {
  const original = Object.fromEntries;
  let calls = 0;
  Object.fromEntries = ((...args: Parameters<typeof Object.fromEntries>) => {
    calls++;
    return original(...args);
  }) as typeof Object.fromEntries;
  try {
    fn();
  } finally {
    Object.fromEntries = original;
  }
  return calls;
}

test("usage and P2C ordering do not copy the whole combo metrics view", () => {
  resetComboMetrics(COMBO);
  recordComboRequest(COMBO, "codex/gpt-5.5", {
    success: true,
    latencyMs: 10,
    target: { executionKey: "acct-a", provider: "codex" },
  });
  const targets = [target("acct-a"), target("acct-b")];

  const calls = countFromEntries(() => {
    const byUsage = sortTargetsByUsage(targets, COMBO);
    assert.equal((byUsage[0] as { executionKey: string }).executionKey, "acct-b");
    assert.equal(orderTargetsByPowerOfTwoChoices(targets, COMBO).length, 2);
  });

  assert.equal(calls, 0);
  resetComboMetrics(COMBO);
});

test("a combo with no metrics keeps the target order", () => {
  resetComboMetrics(COMBO);
  const targets = [target("acct-a"), target("acct-b"), target("acct-c")];

  const keys = sortTargetsByUsage(targets, COMBO).map(
    (t) => (t as { executionKey: string }).executionKey
  );

  assert.deepEqual(keys, ["acct-a", "acct-b", "acct-c"]);
});
