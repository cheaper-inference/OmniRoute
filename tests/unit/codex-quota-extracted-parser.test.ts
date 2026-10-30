import assert from "node:assert/strict";
import test from "node:test";
import { parseCodexUsageResponse } from "../../open-sse/services/codexQuotaParser.ts";

for (const camelCase of [false, true]) {
  test(`extracted parser preserves plan and duration-based weekly identity (${camelCase})`, () => {
    const window = camelCase
      ? { usedPercent: "94", windowSeconds: "604800", resetAfterSeconds: 600 }
      : { used_percent: 94, limit_window_seconds: 604800, reset_after_seconds: 600 };
    const payload = camelCase
      ? { planType: " pro ", rateLimit: { primaryWindow: window, allowed: false } }
      : { plan_type: " pro ", rate_limit: { primary_window: window, allowed: false } };
    const quota = parseCodexUsageResponse(payload);
    assert.equal(quota?.plan, "pro");
    assert.equal(quota?.limitReached, true);
    assert.equal(quota?.windows?.weekly?.percentUsed, 0.94);
    assert.equal(quota?.window7d?.percentUsed, 0.94);
    assert.equal(quota?.window5h, undefined);
    assert.equal(quota?.windows?.session, undefined);
  });
}

test("extracted parser rejects malformed measurements and truthy non-boolean flags", () => {
  assert.equal(
    parseCodexUsageResponse({ rate_limit: { primary_window: { used_percent: "94junk" } } }),
    null
  );
  const quota = parseCodexUsageResponse({
    rate_limit: {
      limit_reached: "false",
      primary_window: { used_percent: 94, limit_window_seconds: 3600 },
    },
  });
  assert.equal(quota?.limitReached, false);
  assert.equal(quota?.window5h, undefined);
  assert.equal(quota?.window7d, undefined);
  assert.equal(quota?.windows?.unknown_primary?.percentUsed, 0.94);
});

test("extracted parser selects Spark by duration without mixing normal model quota", () => {
  const payload = {
    plan_type: "plus",
    rate_limit: {
      primary_window: { used_percent: 20, limit_window_seconds: 18000 },
    },
    additional_rate_limits: [
      {
        limit_id: "codex_bengalfox",
        rate_limit: {
          primary_window: { used_percent: 94, limit_window_seconds: 604800 },
        },
      },
    ],
  };
  const spark = parseCodexUsageResponse(payload, "gpt-5.3-codex-spark");
  assert.equal(spark?.window7d?.percentUsed, 0.94);
  assert.equal(spark?.window5h, undefined);
  assert.equal(spark?.windows?.gpt_5_3_codex_spark_weekly?.percentUsed, 0.94);
  assert.equal(spark?.windows?.session, undefined);
  assert.equal(spark?.allWindows?.session?.percentUsed, 0.2);
  const normal = parseCodexUsageResponse(payload, "gpt-5.5");
  assert.equal(normal?.window5h?.percentUsed, 0.2);
  assert.equal(normal?.window7d, undefined);
  assert.equal(normal?.windows?.gpt_5_3_codex_spark_weekly, undefined);
});
