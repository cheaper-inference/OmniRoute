import test from "node:test";
import assert from "node:assert/strict";
import { createErrorResult, formatProviderError } from "../../open-sse/utils/error.ts";
import { createStreamingErrorResult } from "../../open-sse/handlers/chatCore/streamErrorResult.ts";
import {
  museFailureMarksAccount,
  museFailureResponse,
  type MuseOwner,
} from "../../src/sse/handlers/chat/museOwnership.ts";

const policyMessages = [
  "This API key is billed to a Muse Code subscription.",
  "Muse Code subscriptions cover requests from the Muse Code client only.",
];

// Match nonStreamingProviderLeg's formatted public error and original rawMessage.
function jsonFailure(status: number, message: string) {
  const result = createErrorResult(
    status,
    formatProviderError(new Error(message), "muse-code", "muse-spark-1.3", status)
  );
  result.rawMessage = message;
  return result;
}

// streamingResponse adds upstream metadata to the SSE result, which has no rawMessage.
function streamFailure(status: number, message: string) {
  return {
    ...createStreamingErrorResult(status, message, "upstream_error", "api_error"),
    errorCode: "upstream_error",
    errorType: "api_error",
  };
}

const owner: MuseOwner = {
  scope: "policy-test-session",
  connectionId: "policy-test-owner",
  emptyRetries: 0,
  emptyOriginal: null,
};

for (const [format, failure] of [
  ["JSON", jsonFailure],
  ["SSE", streamFailure],
] as const) {
  for (const message of policyMessages) {
    test(`${format} Muse subscription 403 preserves the response without marking the account: ${message}`, async () => {
      const result = failure(403, message);
      const originalBody = await result.response.clone().text();
      const response = museFailureResponse(owner, result);

      assert.equal(response.status, 403);
      assert.equal(await response.text(), originalBody);
      assert.equal(response.headers.get("X-OmniRoute-Selected-Connection-Id"), owner.connectionId);
      assert.equal(museFailureMarksAccount(result), false);
    });
  }
}

test("Muse subscription wording at 401 or 500 still marks the account", () => {
  for (const failure of [jsonFailure, streamFailure]) {
    for (const status of [401, 500]) {
      for (const message of policyMessages) {
        assert.equal(
          museFailureMarksAccount(failure(status, message)),
          true,
          `${status}: ${message}`
        );
      }
    }
  }
});

test("generic forbidden, real account bans, rate limits and upstream failures still mark the account", () => {
  for (const [status, message] of [
    [403, "Forbidden"],
    [403, "Your account has been banned for violating our terms of service."],
    [403, "Your Muse Code subscription account has been suspended."],
    [429, "Rate limit exceeded. Please try again later."],
    [500, "Internal server error"],
  ] as const) {
    assert.equal(museFailureMarksAccount(jsonFailure(status, message)), true, message);
  }
});

test("ownership fences, stream readiness failures and empty responses remain non-account failures", () => {
  for (const [status, code, type] of [
    [409, "MUSE_OWNERSHIP_REJECTED", "ownership_error"],
    [504, "STREAM_READINESS_TIMEOUT", "stream_timeout"],
    [502, "STREAM_EARLY_EOF", "stream_early_eof"],
    [502, "upstream_empty_response", "empty_content"],
    [502, "empty_response", "empty_content"],
  ] as const) {
    const result = createErrorResult(status, "Request failed", null, code, type);
    assert.equal(museFailureMarksAccount(result), false, code);
  }
});
