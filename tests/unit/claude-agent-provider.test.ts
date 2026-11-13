/**
 * Registration tests for the "claude-agent" provider (Claude Agent SDK,
 * no-OAuth local CLI). Mirrors tests/unit/zcode-provider.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { claude_agentProvider } from "../../open-sse/config/providers/registry/claude-agent/index.ts";
import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { NOAUTH_PROVIDERS } from "../../src/shared/constants/providers/noauth.ts";

test("claude-agent is registered in the provider REGISTRY", () => {
  assert.ok(REGISTRY["claude-agent"], "REGISTRY['claude-agent']");
  assert.equal(REGISTRY["claude-agent"], claude_agentProvider);
});

test("claude-agent registry entry shape matches the contract", () => {
  assert.equal(claude_agentProvider.id, "claude-agent");
  assert.equal(claude_agentProvider.alias, "ca");
  assert.equal(claude_agentProvider.format, "claude");
  assert.equal(claude_agentProvider.executor, "claude-agent");
  assert.equal(claude_agentProvider.baseUrl, "claude-agent://stdio");
});

test("claude-agent has no OAuth credential block (login owned by host Claude Code)", () => {
  assert.ok(!("oauth" in claude_agentProvider), "must not declare oauth config");
  assert.ok(
    !("oauthConfig" in claude_agentProvider),
    "must not declare oauthConfig"
  );
});

test("claude-agent exposes the 5.5-generation Claude model catalog", () => {
  const ids = claude_agentProvider.models.map((m) => m.id);
  assert.deepEqual(ids, [
    "claude-sonnet-5-5",
    "claude-opus-5-5",
    "claude-haiku-5-5",
  ]);
  for (const model of claude_agentProvider.models) {
    assert.equal(model.contextLength, 1000000, model.id);
    assert.equal(model.maxOutputTokens, 128000, model.id);
    assert.deepEqual(
      model.unsupportedParams,
      ["temperature", "top_p", "top_k"],
      model.id
    );
  }
  const opus = claude_agentProvider.models.find((m) => m.id === "claude-opus-5-5");
  assert.ok(opus?.supportsVision, "opus supports vision");
  assert.ok(
    !claude_agentProvider.models.find((m) => m.id === "claude-sonnet-5-5")
      ?.supportsVision,
    "sonnet does not support vision"
  );
});

test("claude-agent is a no-auth local CLI provider with emulated tool calling", () => {
  const entry = NOAUTH_PROVIDERS["claude-agent"];
  assert.ok(entry, "NOAUTH_PROVIDERS['claude-agent']");
  assert.equal(entry.id, "claude-agent");
  assert.equal(entry.alias, "ca");
  assert.equal(entry.noAuth, true);
  assert.equal(entry.isLocalCli, true);
  assert.equal(entry.toolCalling, "emulated");
  assert.equal(entry.hasFree, false);
  // The provider must not declare any OAuth/credential fields: the CLI auth
  // belongs to the host's Claude Code login, never to OmniRoute storage.
  const declared = Object.keys(entry);
  for (const field of declared) {
    if (field === "noAuth") continue; // the no-auth marker itself
    assert.ok(
      !field.toLowerCase().includes("oauth"),
      `unexpected OAuth field: ${field}`
    );
    assert.ok(
      !/credential|apikey|api_key/i.test(field),
      `unexpected credential field: ${field}`
    );
  }
  // No device-code/login flow shape like the other no-auth CLIs.
  assert.ok(!("deviceCode" in entry));
});
