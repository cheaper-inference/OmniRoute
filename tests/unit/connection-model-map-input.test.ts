import test from "node:test";
import assert from "node:assert/strict";
import {
  formatModelMapInput,
  parseModelMapInput,
} from "../../src/lib/providers/connectionModelMapInput.ts";

test("formatModelMapInput formats map to key-value lines", () => {
  assert.equal(formatModelMapInput(null), "");
  assert.equal(formatModelMapInput(undefined), "");
  assert.equal(formatModelMapInput({}), "");
  assert.equal(
    formatModelMapInput({ "gpt-4o": "gpt-4o-mini", "claude-3-7-sonnet": "claude-3-5-sonnet" }),
    "claude-3-7-sonnet: claude-3-5-sonnet\ngpt-4o: gpt-4o-mini"
  );
});

test("parseModelMapInput parses empty input to null map", () => {
  assert.deepEqual(parseModelMapInput(""), { map: null, error: null });
  assert.deepEqual(parseModelMapInput("   \n  "), { map: null, error: null });
});

test("parseModelMapInput parses colon-separated and equal-separated lines", () => {
  const result = parseModelMapInput(
    "gpt-4o: gpt-4o-mini\nclaude-3-7-sonnet = claude-3-5-sonnet\ngemini-2.0-flash -> gemini-1.5-flash"
  );
  assert.equal(result.error, null);
  assert.deepEqual(result.map, {
    "gpt-4o": "gpt-4o-mini",
    "claude-3-7-sonnet": "claude-3-5-sonnet",
    "gemini-2.0-flash": "gemini-1.5-flash",
  });
});

test("parseModelMapInput parses JSON input", () => {
  const result = parseModelMapInput('{"gpt-4o": "gpt-4o-mini", "deepseek-r1": "deepseek-v3"}');
  assert.equal(result.error, null);
  assert.deepEqual(result.map, {
    "gpt-4o": "gpt-4o-mini",
    "deepseek-r1": "deepseek-v3",
  });
});

test("parseModelMapInput detects invalid entries", () => {
  const badLine = parseModelMapInput("gpt-4o");
  assert.ok(badLine.error);
  assert.equal(badLine.map, null);

  const badJson = parseModelMapInput("{ invalid json }");
  assert.ok(badJson.error);
  assert.equal(badJson.map, null);
});

test("formatModelMapInput round-trips model ids that contain a colon", () => {
  // `provider:model` ids are common, and a plain `key: value` separator would re-parse
  // `openai:gpt-4o: openai:gpt-4o-mini` as the key `openai` with the target `gpt-4o: openai:...`.
  const map = {
    "openai:gpt-4o": "openai:gpt-4o-mini",
    "openrouter:qwen/qwen3": "anthropic:claude-3-5-sonnet",
    "gpt-4o": "gpt-4o-mini",
  };
  const formatted = formatModelMapInput(map);
  const parsed = parseModelMapInput(formatted);
  assert.equal(parsed.error, null);
  assert.deepEqual(parsed.map, map);
});

test("formatModelMapInput keeps the plain colon separator for colon-free ids", () => {
  assert.equal(formatModelMapInput({ "gpt-4o": "gpt-4o-mini" }), "gpt-4o: gpt-4o-mini");
});
