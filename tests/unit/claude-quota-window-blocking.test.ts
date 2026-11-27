import test from "node:test";
import assert from "node:assert/strict";
import {
  activeClaudeResetMs,
  isActiveClaudeExhaustion,
  isBlockingClaudeQuota,
  type ClaudeQuotaWindow,
} from "../../open-sse/services/usage/claudeQuota.ts";
import type { ClaudeQuotaMetadata } from "../../open-sse/services/usage/quota.ts";

const NOW = Date.UTC(2026, 10, 20, 12, 0, 0);
const FUTURE = new Date(NOW + 3 * 86_400_000).toISOString();
const PAST = new Date(NOW - 3_600_000).toISOString();

function scoped(
  over: Partial<ClaudeQuotaWindow> = {},
  meta: Partial<ClaudeQuotaMetadata> = {}
): ClaudeQuotaWindow {
  return {
    remainingPercentage: 0,
    resetAt: FUTURE,
    claudeQuota: {
      kind: "weekly_scoped",
      active: true,
      severity: "critical",
      scopeKey: "model:fable",
      modelId: "claude-fable-5-1",
      modelDisplayName: "Fable",
      ...meta,
    },
    ...over,
  };
}

test("an active critical window with nothing left and a future reset is exhausted", () => {
  assert.equal(isActiveClaudeExhaustion(scoped(), NOW), true);
  assert.equal(activeClaudeResetMs(scoped(), NOW), Date.parse(FUTURE));
});
test("a window that still reports quota is a warning: blocking metadata, no exhaustion", () => {
  const warning = scoped({ remainingPercentage: 20 });
  assert.equal(isBlockingClaudeQuota(warning), true);
  assert.equal(isActiveClaudeExhaustion(warning, NOW), false);
});
test("an inactive window never blocks, even with 0% left", () => {
  assert.equal(isActiveClaudeExhaustion(scoped({}, { active: false }), NOW), false);
});
test("a non-critical severity does not block; a missing severity does", () => {
  assert.equal(isActiveClaudeExhaustion(scoped({}, { severity: "warning" }), NOW), false);
  assert.equal(isActiveClaudeExhaustion(scoped({}, { severity: null }), NOW), true);
});
test("an unreported percentage does not count as quota left", () => {
  const unreported = scoped({ remainingPercentage: 100, fractionReported: false });
  assert.equal(isActiveClaudeExhaustion(unreported, NOW), true);
});
test("no reset time, or one already past, is not an exhaustion", () => {
  assert.equal(isActiveClaudeExhaustion(scoped({ resetAt: null }), NOW), false);
  assert.equal(isActiveClaudeExhaustion(scoped({ resetAt: PAST }), NOW), false);
});
test("a window without Claude metadata never blocks", () => {
  assert.equal(isActiveClaudeExhaustion({ remainingPercentage: 0, resetAt: FUTURE }, NOW), false);
});
