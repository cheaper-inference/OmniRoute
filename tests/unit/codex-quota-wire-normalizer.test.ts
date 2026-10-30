import assert from "node:assert/strict";
import test from "node:test";
import {
  parseCodexOfficialQuotaHeaders,
  parseCodexQuotaWindow,
  parseCodexRateLimitEvent,
  parseCodexUsageSignal,
} from "../../open-sse/services/codexQuotaSignals.ts";

const now = Date.parse("2026-10-28T00:00:00.000Z");
const reset = now / 1000 + 120;
const sparkModel = "gpt-5.3-codex-spark";
const window = { used_percent: 99, reset_at: reset, limit_window_seconds: 18000 };
const eventWindow = { used_percent: 99, reset_at: reset, window_minutes: 300 };

// These are new pure-parser controls, in addition to the existing-entrypoint
// red/green regression. They do not claim live WS persistence/admission coverage.
test("usage, HTTP and WS normalize to the same fraction, duration and epoch reset", () => {
  const usage = parseCodexUsageSignal({ rate_limit: { primary_window: window } }, null, now);
  const headers = parseCodexOfficialQuotaHeaders(
    {
      "x-codex-primary-used-percent": "99",
      "x-codex-primary-window-minutes": "300",
      "x-codex-primary-reset-at": String(reset),
    },
    null,
    now
  );
  const websocket = parseCodexRateLimitEvent(
    { type: "codex.rate_limits", rate_limits: { primary: eventWindow } },
    now
  );
  assert.ok(usage && headers && websocket);
  assert.deepEqual(usage.windows, headers.windows);
  assert.deepEqual(usage.windows, websocket.windows);
  assert.equal(usage.windows[0].percentUsed, 0.99);
  assert.equal(usage.windows[0].usedPercent, 99);
  assert.equal(usage.windows[0].windowSeconds, 18000);
  assert.equal(usage.windows[0].resetAt, new Date(reset * 1000).toISOString());
});

test("unknown named HTTP and WS meters do not become normal Codex", () => {
  assert.equal(
    parseCodexOfficialQuotaHeaders({ "x-other-primary-used-percent": "100" }, null, now),
    null
  );
  assert.equal(
    parseCodexRateLimitEvent(
      {
        type: "codex.rate_limits",
        metered_limit_name: "other",
        rate_limits: { primary: eventWindow },
      },
      now
    ),
    null
  );
});

test("Spark HTTP meter is selected only for the Spark request scope", () => {
  const headers = {
    "x-codex-primary-used-percent": "10",
    "x-codex-bengalfox-primary-used-percent": "100",
    "x-codex-bengalfox-primary-window-minutes": "300",
  };
  assert.equal(parseCodexOfficialQuotaHeaders(headers, null, now)?.windows[0].percentUsed, 0.1);
  const spark = parseCodexOfficialQuotaHeaders(headers, sparkModel, now);
  assert.equal(spark?.scope, "spark");
  assert.equal(spark?.limitId, "codex_bengalfox");
  assert.equal(spark?.windows[0].percentUsed, 1);
});

test("named Spark WS events retain scope and real nonstandard window duration", () => {
  const spark = parseCodexRateLimitEvent(
    {
      type: "codex.rate_limits",
      metered_limit_name: "codex_bengalfox",
      rate_limits: { secondary: { used_percent: 100, window_minutes: 60, reset_at: reset } },
    },
    now
  );
  assert.equal(spark?.scope, "spark");
  assert.equal(spark?.windows[0].id, "secondary");
  assert.equal(spark?.windows[0].windowSeconds, 3600);
});

test("a bad WS primary does not discard a valid exhausted secondary", () => {
  const result = parseCodexRateLimitEvent(
    {
      type: "codex.rate_limits",
      rate_limits: {
        primary: { used_percent: "NaN" },
        secondary: { ...eventWindow, used_percent: 100 },
      },
    },
    now
  );
  assert.equal(result?.windows.length, 1);
  assert.equal(result?.windows[0].id, "secondary");
  assert.equal(result?.windows[0].percentUsed, 1);
});

test("credits-only, coupon-only, empty and unrelated WS frames are not subscription health", () => {
  for (const payload of [
    {},
    null,
    { type: "rate_limits.updated", rate_limits: { primary: eventWindow } },
    { type: "codex.rate_limits", credits: { has_credits: true, unlimited: true, balance: "4" } },
    { type: "codex.rate_limits", rate_limit_reset_credits: { available_count: 9 } },
  ])
    assert.equal(parseCodexRateLimitEvent(payload, now), null);
});

test("unlimited paid credits do not mark exhausted subscription telemetry unlimited", () => {
  const result = parseCodexRateLimitEvent(
    {
      type: "codex.rate_limits",
      rate_limits: { primary: { used_percent: 100 } },
      credits: { has_credits: true, unlimited: true },
    },
    now
  );
  assert.equal(result?.windows[0].percentUsed, 1);
  assert.equal(Object.hasOwn(result, "unlimited"), false);
});

test("null additional meters do not invalidate normal usage", () => {
  const result = parseCodexUsageSignal(
    { rate_limit: { primary_window: window }, additional_rate_limits: null },
    null,
    now
  );
  assert.equal(result?.windows[0].percentUsed, 0.99);
});

test("Spark usage never falls back to a normal or unknown additional meter", () => {
  assert.equal(
    parseCodexUsageSignal(
      {
        rate_limit: { primary_window: window },
        additional_rate_limits: [{ limit_id: "other", rate_limit: { primary_window: window } }],
      },
      sparkModel,
      now
    ),
    null
  );
});

test("percentage strings have full decimal validation, not parseFloat prefixes", () => {
  for (const used_percent of [null, "", "12oops", true, [], {}, -1, 101, NaN, Infinity]) {
    assert.equal(parseCodexQuotaWindow({ used_percent }, "primary", now), null);
  }
  assert.equal(parseCodexQuotaWindow({ used_percent: "0.5" }, "primary", now)?.percentUsed, 0.005);
  assert.equal(parseCodexQuotaWindow({ used_percent: 0 }, "primary", now)?.percentUsed, 0);
});

test("bad optional dates and durations keep exhaustion but cannot become enormous cooldowns", () => {
  const result = parseCodexQuotaWindow(
    { used_percent: 100, reset_at: 1e20, limit_window_seconds: 1e20 },
    "primary",
    now
  );
  assert.equal(result?.percentUsed, 1);
  assert.equal(result?.resetAt, null);
  assert.equal(result?.windowSeconds, null);
  assert.equal(result?.durationProvided, true);
});

test("reset unit conversions are explicit and relative zero means now", () => {
  assert.equal(
    parseCodexQuotaWindow({ used_percent: 1, reset_after_seconds: 120 }, "primary", now)?.resetAt,
    new Date(now + 120000).toISOString()
  );
  assert.equal(
    parseCodexQuotaWindow({ used_percent: 1, reset_after_seconds: 0 }, "primary", now)?.resetAt,
    new Date(now).toISOString()
  );
  assert.equal(
    parseCodexQuotaWindow({ used_percent: 1, reset_at: now + 120000 }, "primary", now)?.resetAt,
    null
  );
});

test("31-day proxy scheduling guard rejects absurd relative resets, not valid percentages", () => {
  assert.equal(
    parseCodexQuotaWindow({ used_percent: 100, reset_after_seconds: 32 * 86400 }, "primary", now)
      ?.resetAt,
    null
  );
  assert.ok(
    parseCodexQuotaWindow({ used_percent: 100, reset_after_seconds: 30 * 86400 }, "primary", now)
      ?.resetAt
  );
});

test("explicit boolean allowance stays separate from unknown quota windows", () => {
  const result = parseCodexUsageSignal({ rate_limit: { allowed: false } }, null, now);
  assert.equal(result?.allowed, false);
  assert.equal(result?.limitReached, true);
  assert.deepEqual(result?.windows, []);
  assert.equal(parseCodexUsageSignal({ rate_limit: { allowed: "false" } }, null, now), null);
});
