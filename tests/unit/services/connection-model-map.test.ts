import test from "node:test";
import assert from "node:assert/strict";
import {
  resolveConnectionMappedModel,
  applyConnectionModelMap,
} from "../../../open-sse/services/connectionModelMap.ts";

test("returns original model when no modelMap is provided", () => {
  assert.equal(resolveConnectionMappedModel("gpt-4o", null), "gpt-4o");
  assert.equal(resolveConnectionMappedModel("gpt-4o", undefined), "gpt-4o");
  assert.equal(resolveConnectionMappedModel("gpt-4o", {}), "gpt-4o");
});

test("maps model with exact match", () => {
  const map = {
    "gpt-4o": "gpt-4o-mini",
    "claude-3-7-sonnet": "claude-3-5-sonnet",
  };
  assert.equal(resolveConnectionMappedModel("gpt-4o", map), "gpt-4o-mini");
  assert.equal(resolveConnectionMappedModel("claude-3-7-sonnet", map), "claude-3-5-sonnet");
  assert.equal(resolveConnectionMappedModel("gemini-2.5-pro", map), "gemini-2.5-pro");
});

test("maps model with provider prefix preserved if mapped target is unprefixed", () => {
  const map = {
    "gemini-2.5-flash": "gemini-2.5-pro",
  };
  assert.equal(
    resolveConnectionMappedModel("antigravity/gemini-2.5-flash", map),
    "antigravity/gemini-2.5-pro"
  );
});

test("maps model with provider prefix override if mapped target contains prefix", () => {
  const map = {
    "claude-3-5-sonnet": "custom/claude-3-7-sonnet",
  };
  assert.equal(
    resolveConnectionMappedModel("anthropic/claude-3-5-sonnet", map),
    "custom/claude-3-7-sonnet"
  );
});

test("case-insensitive fallback mapping", () => {
  const map = {
    "GPT-4O": "gpt-4o-2024-11-20",
  };
  assert.equal(resolveConnectionMappedModel("gpt-4o", map), "gpt-4o-2024-11-20");
});

test("applyConnectionModelMap updates both input.model and input.body.model", () => {
  const map = {
    "gpt-4o": "gpt-4o-mini",
  };
  const input = {
    model: "gpt-4o",
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hi" }],
    },
  };
  const result = applyConnectionModelMap(input, map);
  assert.equal(result.model, "gpt-4o-mini");
  assert.equal((result.body as Record<string, unknown>).model, "gpt-4o-mini");
  // Original is not mutated
  assert.equal(input.model, "gpt-4o");
});
