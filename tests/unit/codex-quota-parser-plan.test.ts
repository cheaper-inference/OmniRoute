import test from "node:test";
import assert from "node:assert/strict";

import { parseCodexUsageResponse } from "../../open-sse/services/codexQuotaParser.ts";

const rateLimit = {
  primary_window: { used_percent: 10, reset_after_seconds: 600 },
  secondary_window: { used_percent: 20, reset_after_seconds: 6000 },
};

test("parseCodexUsageResponse surfaces the trimmed plan_type as quota.plan (#16572)", () => {
  const quota = parseCodexUsageResponse({ plan_type: " pro ", rate_limit: rateLimit });
  assert.equal(quota?.plan, "pro");
});

test("parseCodexUsageResponse reads camelCase planType", () => {
  const quota = parseCodexUsageResponse({
    planType: "plus",
    rateLimit: {
      primaryWindow: { usedPercent: 5, resetAfterSeconds: 60 },
    },
  });
  assert.equal(quota?.plan, "plus");
});

test("parseCodexUsageResponse omits plan when the payload does not report one", () => {
  const quota = parseCodexUsageResponse({ rate_limit: rateLimit });
  assert.ok(quota);
  assert.equal("plan" in quota, false);
  const blank = parseCodexUsageResponse({ plan_type: "  ", rate_limit: rateLimit });
  assert.equal("plan" in (blank ?? {}), false);
});
