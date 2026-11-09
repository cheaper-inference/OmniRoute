import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeBaseUrl,
  hostLabel,
  buildConnectBody,
  isMfaRequiredResponse,
} from "../../bin/cli/commands/connect.mjs";
import { profileNameFromModel } from "../../bin/cli/commands/configure.mjs";

test("normalizeBaseUrl: bare host gets http:// and the default port", () => {
  assert.equal(normalizeBaseUrl("192.168.0.15", "20128"), "http://192.168.0.15:20128");
});

test("normalizeBaseUrl: host with explicit port keeps it", () => {
  assert.equal(normalizeBaseUrl("192.168.0.15:9000", "20128"), "http://192.168.0.15:9000");
});

test("normalizeBaseUrl: full https URL is preserved as origin", () => {
  assert.equal(normalizeBaseUrl("https://omni.example.com", "20128"), "https://omni.example.com");
  assert.equal(normalizeBaseUrl("http://host:1234/path", "20128"), "http://host:1234");
});

test("normalizeBaseUrl: empty input returns empty string", () => {
  assert.equal(normalizeBaseUrl("", "20128"), "");
});

test("hostLabel strips scheme and port", () => {
  assert.equal(hostLabel("https://omni.example.com:20128"), "omni.example.com");
  assert.equal(hostLabel("192.168.0.15:20128"), "192.168.0.15");
  assert.equal(hostLabel("http://10.0.0.1"), "10.0.0.1");
});

test("profileNameFromModel strips the provider prefix and non-alphanumerics", () => {
  assert.equal(profileNameFromModel("glm/glm-5.2"), "glm52");
  assert.equal(profileNameFromModel("kmc/kimi-k2.7"), "kimik27");
  assert.equal(profileNameFromModel("ollamacloud/gpt-oss:20b"), "gptoss20b");
  assert.equal(profileNameFromModel("cx/gpt-5.5"), "gpt55");
  assert.equal(profileNameFromModel("bare-model"), "baremodel");
});

test("buildConnectBody only sends totp when a code was given", () => {
  assert.deepEqual(buildConnectBody({ password: "pw", name: "n", scope: "admin" }), {
    password: "pw",
    name: "n",
    scope: "admin",
  });
  assert.deepEqual(buildConnectBody({ password: "pw", name: "n", totp: "  " }), {
    password: "pw",
    name: "n",
    scope: undefined,
  });
  assert.equal(buildConnectBody({ password: "pw", name: "n", totp: " 123456 " }).totp, "123456");
});

test("isMfaRequiredResponse recognises the two-factor refusal of /api/cli/connect", () => {
  assert.equal(isMfaRequiredResponse(401, { error: "x", mfaRequired: true }), true);
  assert.equal(isMfaRequiredResponse(401, { error: "Invalid password" }), false);
  assert.equal(isMfaRequiredResponse(429, { mfaRequired: true }), false);
  assert.equal(isMfaRequiredResponse(401, null), false);
});
