import test from "node:test";
import assert from "node:assert/strict";
import { parseChatGptManualCallback } from "../../src/shared/utils/chatgptCallback.ts";

const redirectUri = "http://127.0.0.1:1455/auth/callback";
const expected = { redirectUri, state: "expected-state" };
const valid = `${redirectUri}?code=one-time-code&state=expected-state&client_id=oaiapp_test`;

test("manual callback preserves the code and issued client for this exact attempt", () => {
  assert.deepEqual(parseChatGptManualCallback(`  ${valid}  `, expected), {
    code: "one-time-code",
    clientId: "oaiapp_test",
  });
  assert.equal(
    parseChatGptManualCallback(`${redirectUri}?state=expected-state&code=a%2Bb`, expected).code,
    "a+b"
  );
});

test("manual callback rejects malformed, foreign, incomplete and ambiguous URLs without leaking them", () => {
  for (const value of [
    "one-time-code",
    valid.replace("http:", "https:"),
    valid.replace("127.0.0.1", "localhost"),
    valid.replace("127.0.0.1", "evil.example"),
    valid.replace("1455", "1456"),
    valid.replace("/auth/callback", "/callback"),
    valid.replace("127.0.0.1", "user:pass@127.0.0.1"),
    valid.replace("expected-state", "other-state"),
    valid.replace("code=one-time-code", "code="),
    `${valid}&code=second-code`,
    `${valid}&state=other-state`,
    `${valid}&client_id=oaiapp_other`,
    `${valid}&error=access_denied`,
    `${valid}#fragment`,
    `${valid}&padding=${"x".repeat(17000)}`,
  ]) {
    assert.throws(
      () => parseChatGptManualCallback(value, expected),
      (error: Error) => {
        assert.ok(!error.message.includes("one-time-code"));
        return true;
      }
    );
  }
});
