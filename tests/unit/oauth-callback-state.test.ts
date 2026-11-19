import test from "node:test";
import assert from "node:assert/strict";
import { isCallbackStateAcceptable } from "../../src/shared/components/oauthCallbackState.ts";

test("a relayed callback must echo the active attempt's state (GHSA-3fxv-j4h8-9mgg)", () => {
  assert.equal(isCallbackStateAcceptable("abc", "abc"), true);
  assert.equal(isCallbackStateAcceptable("abc", "other"), false);
  assert.equal(isCallbackStateAcceptable("abc", null), false);
  assert.equal(isCallbackStateAcceptable("abc", undefined), false);
  assert.equal(isCallbackStateAcceptable("abc", ""), false);
});

test("an attempt without a state has nothing to bind to", () => {
  assert.equal(isCallbackStateAcceptable(null, null), true);
  assert.equal(isCallbackStateAcceptable(undefined, "x"), true);
  assert.equal(isCallbackStateAcceptable("", null), true);
});

// #20576 (Cline) / #20580 (Zed Hosted): providers whose redirect cannot echo state.
test("#20576/#20580: stateless providers issue no state so a genuine relay is accepted", async () => {
  const { generateAuthData } = await import("../../src/lib/oauth/providers.ts");
  for (const id of ["cline", "zed-hosted"]) {
    const authData: { state?: string } = generateAuthData(id, "http://localhost:20128/callback");
    assert.equal(authData.state, undefined, `${id} issues no state`);
    assert.equal(isCallbackStateAcceptable(authData.state, null), true);
  }
});

test("#20576/#20580 negative: state-carrying providers still reject missing or wrong state", async () => {
  const { generateAuthData } = await import("../../src/lib/oauth/providers.ts");
  for (const id of ["github", "codex", "claude"]) {
    const authData: { state?: string } = generateAuthData(id, "http://localhost:20128/callback");
    assert.ok(authData.state, `${id} still issues a state`);
    assert.equal(isCallbackStateAcceptable(authData.state, null), false);
    assert.equal(isCallbackStateAcceptable(authData.state, undefined), false);
    assert.equal(isCallbackStateAcceptable(authData.state, "forged"), false);
    assert.equal(isCallbackStateAcceptable(authData.state, authData.state), true);
  }
});
