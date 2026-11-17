// A custom node mints its own provider id per connection, so it can never appear
// in the static provider list. What the usage sync can match on is the host the
// connection points at.
import test from "node:test";
import assert from "node:assert/strict";

const { isSupportedUsageConnection } = await import("../../src/lib/usage/providerLimits.ts");

test("a custom node pointing at the console host is supported", () => {
  const connection = {
    provider: "openai-compatible-chat-95565442-1b4b-4082-b428-9503ac8ca716",
    authType: "apikey",
    providerSpecificData: { baseUrl: "https://token.sensenova.cn/v1" },
  };

  assert.equal(isSupportedUsageConnection(connection), true);
});

test("a lookalike host is not treated as the console", () => {
  for (const baseUrl of [
    "https://token.sensenova.cn.evil.example/v1",
    "https://evil-token.sensenova.cn/v1",
    "https://api.tokenrouter.com/v1",
  ]) {
    const connection = {
      provider: "openai-compatible-chat-lookalike",
      authType: "apikey",
      providerSpecificData: { baseUrl },
    };
    assert.equal(isSupportedUsageConnection(connection), false, baseUrl);
  }
});

test("a connection without a base URL is not claimed", () => {
  const connection = {
    provider: "openai-compatible-chat-plain",
    authType: "apikey",
    providerSpecificData: {},
  };

  assert.equal(isSupportedUsageConnection(connection), false);
});
