import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import {
  acceptsRelayedCallback,
  isCallbackStateAcceptable,
  MANUAL_CALLBACK_ONLY_PROVIDERS,
} from "../../src/shared/components/oauthCallbackState.ts";
import { createZedNativeAuthData, decryptZedAccessToken } from "../../open-sse/shared/zedAuth.ts";

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

// #20576: Cline's redirect carries no state and nothing else ties it to the attempt, so a relayed
// `?code=` could be any page's code (login CSRF, #15688). Cline completes only by manual paste.
test("#20576: a relayed Cline callback without state is never accepted", () => {
  assert.equal(MANUAL_CALLBACK_ONLY_PROVIDERS.has("cline"), true);
  assert.equal(acceptsRelayedCallback("cline"), false);
  // Providers bound by state or by an attempt key keep the automatic relay.
  for (const id of ["zed-hosted", "github", "codex", "claude"]) {
    assert.equal(acceptsRelayedCallback(id), true, `${id} keeps the relay`);
  }
});

test("#20576: OAuthModal attaches no relay listener for a manual-only provider", () => {
  const modal = readFileSync(
    new URL("../../src/shared/components/OAuthModal.tsx", import.meta.url),
    "utf8"
  );
  const effectStart = modal.indexOf("if (!authData || !acceptsRelayedCallback(provider)) return;");
  assert.ok(effectStart > 0, "listener effect gates on acceptsRelayedCallback");
  // The gate runs before any relay channel is opened.
  for (const listener of [
    'window.addEventListener("message", handleMessage)',
    'new BroadcastChannel("oauth_callback")',
    'window.addEventListener("storage", handleStorage)',
  ]) {
    const at = modal.indexOf(listener);
    assert.ok(at > effectStart, `${listener} comes after the gate`);
  }
  // The auth tab opens without an opener so /callback shows the URL to copy.
  assert.match(modal, /window\.open\(authUrl, "oauth_auth", "noopener"\)/);
});

// #20580: Zed Hosted needs no state because its access token is RSA-encrypted to the attempt's
// one-time key. A callback produced for a different key pair must never yield that token.
test("#20580: a Zed token encrypted to another attempt's key is never recovered", () => {
  const victim = createZedNativeAuthData();
  const { publicKey: attackerPublicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });
  const attackerToken = "zed_attacker_access_token";
  for (const padding of [
    crypto.constants.RSA_PKCS1_OAEP_PADDING,
    crypto.constants.RSA_PKCS1_PADDING,
  ]) {
    const foreign = crypto
      .publicEncrypt(
        { key: attackerPublicKey, padding, oaepHash: "sha256" },
        Buffer.from(attackerToken, "utf8")
      )
      .toString("base64url");
    let recovered: string | null = null;
    try {
      recovered = decryptZedAccessToken(foreign, victim.privateKeyVerifier);
    } catch {
      recovered = null; // rejected outright
    }
    // OpenSSL's PKCS#1 v1.5 implicit rejection may return random bytes instead of throwing;
    // either way the attacker's token must not come out.
    assert.notEqual(recovered, attackerToken);
  }
});
