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

test("claude-agent mirrors the native claude model catalog (sonnet default, fable included)", () => {
  const ids = claude_agentProvider.models.map((m) => m.id);
  // Same list as the native claude registry, sonnet 5.5 hoisted as default.
  assert.deepEqual(ids, [
    "claude-sonnet-5-5",
    "claude-fable-5-1",
    "claude-fable-5",
    "claude-opus-5",
    "claude-opus-5-5",
    "claude-opus-4-8",
    "claude-opus-4-7",
    "claude-opus-4-6",
    "claude-opus-4-5-20251101",
    "claude-sonnet-5",
    "claude-sonnet-4-6",
    "claude-sonnet-4-5-20250929",
    "claude-haiku-4-5-20251001",
    "claude-haiku-5-5",
  ]);
  // 5.5-generation entries keep the sampling-param restrictions; older
  // generations may differ (mirrored from the native claude registry).
  for (const id of ["claude-sonnet-5-5", "claude-opus-5-5", "claude-haiku-5-5"]) {
    const model = claude_agentProvider.models.find((m) => m.id === id);
    assert.ok(model, id);
    assert.equal(model.contextLength, 1000000, id);
    assert.equal(model.maxOutputTokens, 128000, id);
    assert.deepEqual(model.unsupportedParams, ["temperature", "top_p", "top_k"], id);
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
