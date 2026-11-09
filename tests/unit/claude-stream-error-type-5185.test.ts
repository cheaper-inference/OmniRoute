import { test } from "node:test";
import assert from "node:assert/strict";
import { formatTranslatedStreamError } from "../../open-sse/utils/streamErrorFormat.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

// Anthropic's documented error types (https://docs.anthropic.com/en/api/errors). A Claude
// client treats an unknown type like a bad request, so the translated `event: error` frame
// must never carry an OpenAI-only type such as `server_error`.
const ANTHROPIC_ERROR_TYPES = new Set([
  "invalid_request_error",
  "authentication_error",
  "billing_error",
  "permission_error",
  "not_found_error",
  "request_too_large",
  "rate_limit_error",
  "api_error",
  "overloaded_error",
]);

function claudeErrorFrame(payload: unknown): { type: string; error: { type: string } } {
  const wire = formatTranslatedStreamError(payload, FORMATS.CLAUDE);
  assert.ok(wire.startsWith("event: error\n"), "Claude clients get an `event: error` frame");
  const dataLine = wire.split("\n").find((line) => line.startsWith("data: {"));
  assert.ok(dataLine, "the frame carries a JSON data line");
  return JSON.parse(dataLine.slice(6));
}

test("#5185: Responses response.failed with server_error reaches Claude clients as api_error", () => {
  const frame = claudeErrorFrame({
    type: "response.failed",
    response: { status: "failed", error: { type: "server_error", message: "boom" }, output: [] },
  });
  assert.equal(frame.type, "error");
  assert.equal(frame.error.type, "api_error");
});

test("#5185: a failure without any type defaults to api_error for Claude clients", () => {
  const frame = claudeErrorFrame({ error: { message: "upstream went away" } });
  assert.equal(frame.error.type, "api_error");
});

test("#5185: a 504 stall reaches Claude clients as api_error, not server_error", () => {
  const frame = claudeErrorFrame({ error: { status: 504, message: "Gateway timeout" } });
  assert.equal(frame.error.type, "api_error");
});

test("#5185: a rate-limited failure with an OpenAI type maps to rate_limit_error", () => {
  const frame = claudeErrorFrame({
    error: { status: 429, type: "server_error", message: "Too many requests" },
  });
  assert.equal(frame.error.type, "rate_limit_error");
});

test("#5185: 401/403/404/413/4xx/529 map to their Anthropic types", () => {
  const cases: Array<[number, string]> = [
    [401, "authentication_error"],
    [403, "permission_error"],
    [404, "not_found_error"],
    [413, "request_too_large"],
    [422, "invalid_request_error"],
    [529, "overloaded_error"],
  ];
  for (const [status, expected] of cases) {
    const frame = claudeErrorFrame({ error: { status, type: "server_error", message: "x" } });
    assert.equal(frame.error.type, expected, `status ${status}`);
  }
});

test("#5185: an upstream type already in the Anthropic set is preserved", () => {
  const frame = claudeErrorFrame({
    type: "error",
    error: { type: "overloaded_error", message: "Overloaded" },
  });
  assert.equal(frame.error.type, "overloaded_error");
});

test("#5185: every Claude frame type belongs to the Anthropic set", () => {
  for (const type of ["server_error", "upstream_error", "bad_type", "stream_error"]) {
    const frame = claudeErrorFrame({ error: { type, message: "x" } });
    assert.ok(ANTHROPIC_ERROR_TYPES.has(frame.error.type), `${type} -> ${frame.error.type}`);
  }
});

test("#5185: OpenAI-format clients keep the OpenAI error type", () => {
  const wire = formatTranslatedStreamError({ error: { type: "server_error", message: "boom" } });
  const dataLine = wire.split("\n").find((line) => line.startsWith("data: {"));
  assert.ok(dataLine);
  assert.equal(JSON.parse(dataLine.slice(6)).error.type, "server_error");
});
