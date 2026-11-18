import test from "node:test";
import assert from "node:assert/strict";
import {
  isRequestScopedUpstreamFailure,
  shouldSkipConnDisable,
} from "../../open-sse/services/combo/comboPredicates.ts";

const authCodes = [
  "token_expired",
  "expired_token",
  "invalid_token",
  "invalid_api_key",
  "authentication_error",
  "unauthorized",
];

test("credential errors remain account-scoped under invalid_request_error wrappers", () => {
  for (const code of authCodes) {
    assert.equal(
      isRequestScopedUpstreamFailure({ code, type: "invalid_request_error" }),
      false,
      code
    );
    assert.equal(
      shouldSkipConnDisable(
        { status: 401, errorCode: code, errorType: "invalid_request_error", error: "invalid credential" },
        true,
        false,
        "codex"
      ),
      false,
      "allow the failed connection to be excluded and a sibling attempted"
    );
  }
});

test("genuine malformed request stays request-scoped", () => {
  assert.equal(
    isRequestScopedUpstreamFailure({ code: "invalid_request", type: "invalid_request_error" }),
    true
  );
  assert.equal(
    shouldSkipConnDisable(
      { status: 400, errorCode: "invalid_request", errorType: "invalid_request_error", error: "Invalid request body" },
      false,
      false,
      "codex"
    ),
    true
  );
});
