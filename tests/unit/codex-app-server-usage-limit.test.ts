import test from "node:test";
import assert from "node:assert/strict";
import { translateNotification } from "../../open-sse/executors/codex/appServerEvents.ts";
import type { AdapterEvent } from "../../open-sse/vendor/codex-chatgpt-web/types.ts";

test("translateNotification: maps usageLimitExceeded to 429 rate_limit_error", () => {
  const events: AdapterEvent[] = [];
  const isTerminal = translateNotification(
    "error",
    {
      error: {
        message: "You've hit your usage limit. Upgrade to Pro ... or try again at 6:42 AM.",
        codexErrorInfo: "usageLimitExceeded",
        additionalDetails: null,
        misalignment: null,
      },
      willRetry: false,
    },
    (e) => events.push(e)
  );

  assert.equal(isTerminal, true);
  assert.equal(events.length, 1);
  assert.equal(events[0].type, "error");
  const err = events[0] as Extract<AdapterEvent, { type: "error" }>;
  assert.equal(err.status, 429);
  assert.equal(err.errorType, "rate_limit_error");
  assert.equal(err.code, "codex_app_server_usage_limit");
  assert.match(err.message, /hit your usage limit/);
});

test("translateNotification: maps top-level codexErrorInfo usageLimitExceeded to 429", () => {
  const events: AdapterEvent[] = [];
  const isTerminal = translateNotification(
    "error",
    {
      message: "Usage limit reached",
      codexErrorInfo: "usageLimitExceeded",
    },
    (e) => events.push(e)
  );

  assert.equal(isTerminal, true);
  assert.equal(events.length, 1);
  const err = events[0] as Extract<AdapterEvent, { type: "error" }>;
  assert.equal(err.status, 429);
  assert.equal(err.errorType, "rate_limit_error");
  assert.equal(err.code, "codex_app_server_usage_limit");
});

test("translateNotification: generic error still maps to 502 provider_error", () => {
  const events: AdapterEvent[] = [];
  const isTerminal = translateNotification(
    "error",
    {
      error: {
        message: "Internal server error occurred",
      },
    },
    (e) => events.push(e)
  );

  assert.equal(isTerminal, true);
  assert.equal(events.length, 1);
  const err = events[0] as Extract<AdapterEvent, { type: "error" }>;
  assert.equal(err.status, 502);
  assert.equal(err.errorType, "provider_error");
  assert.equal(err.code, "codex_app_server_turn_failed");
});
