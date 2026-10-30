// Phase E — CodeBuddy International device login, refresh and dated lockout.
//
// Captured login: `POST /v2/plugin/auth/state?platform=CLI` with a literal `{}`
// body, and a polling loop that answers code 11217 ("login ing...") until the
// user authorizes. 11217 must surface as PENDING, not as a failure.
import test from "node:test";
import assert from "node:assert/strict";

import {
  CODEBUDDY_LOGIN_PENDING_CODE,
  normalizeCodeBuddyPollResponse,
  buildCodeBuddyStateRequestBody,
} from "../../src/lib/oauth/providers/codebuddyDeviceAuth.ts";

test("the login state request body is the literal empty object", () => {
  const body = buildCodeBuddyStateRequestBody();
  assert.equal(body, "{}");
  assert.equal(new TextEncoder().encode(body).byteLength, 2);
});

test("code 11217 is a pending login, never an error", () => {
  const result = normalizeCodeBuddyPollResponse({
    code: CODEBUDDY_LOGIN_PENDING_CODE,
    msg: "login ing...",
  });

  assert.equal(result.ok, false);
  assert.equal(result.data.error, "authorization_pending");
  assert.equal(result.data.pending, true);
});

test("an authorized response yields the captured token payload", () => {
  const result = normalizeCodeBuddyPollResponse({
    code: 0,
    data: { accessToken: "at", refreshToken: "rt", tokenType: "Bearer", expiresIn: 86400 },
  });

  assert.equal(result.ok, true);
  assert.equal(result.data.access_token, "at");
  assert.equal(result.data.refresh_token, "rt");
});

test("a genuine failure stays a failure", () => {
  const result = normalizeCodeBuddyPollResponse({ code: 40001, msg: "denied" });
  assert.equal(result.ok, false);
  assert.equal(result.data.pending, undefined);
  assert.equal(result.data.error, 40001);
});

test("a pending response with no message still maps to pending", () => {
  const result = normalizeCodeBuddyPollResponse({ code: CODEBUDDY_LOGIN_PENDING_CODE });
  assert.equal(result.data.pending, true);
});
