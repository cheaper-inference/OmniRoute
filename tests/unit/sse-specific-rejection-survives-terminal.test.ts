/**
 * #17049 follow-up: a provider safety stop must survive a generic terminal snapshot.
 *
 * A Responses stream can carry a specific rejection as a bare `error` frame (e.g. a safety
 * stop) and then close with a generic `response.failed` (`server_error`). Keeping only the
 * terminal snapshot turned a non-retryable, request-scoped refusal into a retryable server
 * error, so the routing layer re-sent the refused conversation.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { parseSSEToResponsesOutput } from "../../open-sse/handlers/sseParser.ts";

const rejection = {
  type: "invalid_request_error",
  code: "misalignment_policy_violation",
  message:
    "This request was blocked by our safety systems. Reason: Potentially unintended activity.",
};
const created = {
  type: "response.created",
  response: { id: "resp-fixture", status: "in_progress", output: [] },
};
const sse = (events: unknown[]) => events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join("");
const genericFailed = {
  type: "response.failed",
  response: {
    id: "resp-fixture",
    status: "failed",
    error: { type: "server_error", code: "server_error", message: "Upstream failure" },
    output: [],
  },
};

test("a later generic response.failed cannot hide an earlier specific rejection", () => {
  const parsed = parseSSEToResponsesOutput(
    sse([created, { type: "error", error: rejection }, genericFailed]),
    "fixture"
  ) as { status?: string; error?: unknown } | null;
  assert.equal(parsed?.status, "failed");
  assert.deepEqual(parsed?.error, rejection);
});

test("the first of two root errors is retained", () => {
  const parsed = parseSSEToResponsesOutput(
    sse([
      created,
      { type: "error", error: rejection },
      { type: "error", error: { type: "server_error", message: "generic later failure" } },
    ]),
    "fixture"
  ) as { error?: unknown } | null;
  assert.deepEqual(parsed?.error, rejection);
});

test("guards: a terminal failure with no earlier error frame, and a completed stream, are unchanged", () => {
  const onlyTerminal = parseSSEToResponsesOutput(sse([created, genericFailed]), "fixture") as {
    error?: unknown;
  } | null;
  assert.deepEqual(onlyTerminal?.error, genericFailed.response.error);
  const completed = parseSSEToResponsesOutput(
    sse([
      created,
      { type: "error", error: rejection },
      {
        type: "response.completed",
        response: { id: "resp-fixture", status: "completed", output: [] },
      },
    ]),
    "fixture"
  ) as { status?: string } | null;
  assert.equal(completed?.status, "completed");
});
