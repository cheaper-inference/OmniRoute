import test from "node:test";
import assert from "node:assert/strict";

import {
  isAcceptableStorageToken,
  isValidDeepSeekUserToken,
} from "../../open-sse/services/tokenExtractionConfig.ts";
import { extractUserToken } from "../../open-sse/executors/deepseek-web.ts";

// Obviously-fake token body, long enough to pass the minimum-length check.
const REAL = "x".repeat(40);

test("deepseek-web validator rejects the anonymous-visitor placeholder", () => {
  assert.equal(isValidDeepSeekUserToken('{"value":null,"__version":"0"}'), false);
  assert.equal(isValidDeepSeekUserToken('{"value":"","__version":"0"}'), false);
});

test("deepseek-web validator rejects a JSON wrapper without a long-enough string value", () => {
  assert.equal(isValidDeepSeekUserToken(JSON.stringify({ value: "short", __version: "0" })), false);
  assert.equal(isValidDeepSeekUserToken(JSON.stringify({ __version: "0" })), false);
  assert.equal(isValidDeepSeekUserToken("null"), false);
});

test("deepseek-web validator accepts a wrapped or raw logged-in token", () => {
  assert.equal(isValidDeepSeekUserToken(JSON.stringify({ value: REAL, __version: "0" })), true);
  assert.equal(isValidDeepSeekUserToken(REAL), true);
  assert.equal(isValidDeepSeekUserToken(""), false);
  assert.equal(isValidDeepSeekUserToken("short"), false);
});

test("login harvest only accepts deepseek-web userToken values that pass the validator", () => {
  const placeholder = '{"value":null,"__version":"0"}';
  assert.equal(isAcceptableStorageToken("deepseek-web", "userToken", placeholder), false);
  assert.equal(
    isAcceptableStorageToken("deepseek-web", "userToken", JSON.stringify({ value: REAL })),
    true
  );
  // Providers/keys without a validator keep the previous "any non-empty string" behavior.
  assert.equal(isAcceptableStorageToken("some-other-web", "userToken", placeholder), true);
  assert.equal(isAcceptableStorageToken("deepseek-web", "otherKey", "abc"), true);
  assert.equal(isAcceptableStorageToken("deepseek-web", "userToken", ""), false);
  assert.equal(isAcceptableStorageToken("some-other-web", "userToken", null), false);
});

test("extractUserToken does not return the raw JSON of an empty wrapper", () => {
  assert.equal(extractUserToken({ apiKey: '{"value":null,"__version":"0"}' }), null);
  assert.equal(extractUserToken({ apiKey: '{"value":"","__version":"0"}' }), null);
  assert.equal(extractUserToken({ apiKey: '{"__version":"0"}' }), null);
});

test("extractUserToken still unwraps real tokens and passes raw tokens through", () => {
  assert.equal(extractUserToken({ apiKey: JSON.stringify({ value: REAL, __version: "0" }) }), REAL);
  assert.equal(extractUserToken({ apiKey: REAL }), REAL);
  assert.equal(extractUserToken({ accessToken: REAL }), REAL);
  assert.equal(extractUserToken({ apiKey: "" }), null);
  assert.equal(extractUserToken({}), null);
});
