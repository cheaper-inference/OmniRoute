import test from "node:test";
import assert from "node:assert/strict";

const { wildcardMatch, getSpecificity, resolveWildcardAlias, resolveModel } =
  await import("../../open-sse/services/wildcardRouter.ts");

// ─── wildcardMatch ──────────────────────────────────────────────────────────

test("wildcardMatch: exact match", () => {
  assert.equal(wildcardMatch("gpt-4o", "gpt-4o"), true);
});

test("wildcardMatch: star catches all", () => {
  assert.equal(wildcardMatch("anything", "*"), true);
});

test("wildcardMatch: prefix star", () => {
  assert.equal(wildcardMatch("claude-sonnet-4-20250514", "claude-*"), true);
  assert.equal(wildcardMatch("gpt-4o", "claude-*"), false);
});

test("wildcardMatch: middle star", () => {
  assert.equal(wildcardMatch("claude-sonnet-4-20250514", "claude-*-4*"), true);
  assert.equal(wildcardMatch("claude-haiku-4-20250514", "claude-*-4*"), true);
});

test("wildcardMatch: question mark single char", () => {
  assert.equal(wildcardMatch("gpt-4o", "gpt-?o"), true);
  assert.equal(wildcardMatch("gpt-4o", "gpt-??"), true);
  assert.equal(wildcardMatch("gpt-4o", "gpt-???"), false);
});

test("wildcardMatch: case insensitive", () => {
  assert.equal(wildcardMatch("GPT-4o", "gpt-*"), true);
});

test("wildcardMatch: null/empty", () => {
  assert.equal(wildcardMatch(null, "*"), false);
  assert.equal(wildcardMatch("model", null), false);
});

// ─── getSpecificity ─────────────────────────────────────────────────────────

test("getSpecificity: more specific > less specific", () => {
  assert.ok(getSpecificity("claude-sonnet-4") > getSpecificity("claude-*"));
  assert.ok(getSpecificity("claude-sonnet-*") > getSpecificity("claude-*"));
  assert.ok(getSpecificity("*") < getSpecificity("claude-*"));
});

test("getSpecificity: exact > wildcard", () => {
  assert.ok(getSpecificity("claude-sonnet-4-20250514") > getSpecificity("claude-sonnet-4-*"));
});

// ─── resolveWildcardAlias ───────────────────────────────────────────────────

test("resolveWildcardAlias: picks most specific match", () => {
  const aliases = [
    { pattern: "claude-*", target: "generic-claude" },
    { pattern: "claude-sonnet-*", target: "sonnet-claude" },
    { pattern: "claude-sonnet-4-*", target: "sonnet4-claude" },
  ];
  const result = resolveWildcardAlias("claude-sonnet-4-20250514", aliases);
  assert.equal(result.target, "sonnet4-claude");
});

test("resolveWildcardAlias: returns null for no match", () => {
  const aliases = [{ pattern: "gpt-*", target: "openai" }];
  assert.equal(resolveWildcardAlias("claude-sonnet-4", aliases), null);
});

test("resolveWildcardAlias: handles empty/null", () => {
  assert.equal(resolveWildcardAlias("model", null), null);
  assert.equal(resolveWildcardAlias("model", []), null);
  assert.equal(resolveWildcardAlias(null, []), null);
});

test("resolveWildcardAlias: stored specificity does not outrank a specific pattern", () => {
  const aliases = [
    { pattern: "claude-*", target: "generic", specificity: 9999 },
    { pattern: "claude-sonnet-4-*", target: "specific" },
  ];
  const result = resolveWildcardAlias("claude-sonnet-4-20250514", aliases);
  assert.equal(result.target, "specific");
});

test("resolveWildcardAlias: returns the computed specificity when none is stored", () => {
  const aliases = [{ pattern: "claude-sonnet-4-*", target: "sonnet4" }];
  const result = resolveWildcardAlias("claude-sonnet-4-20250514", aliases);
  assert.equal(result.specificity, getSpecificity("claude-sonnet-4-*"));
});

test("resolveWildcardAlias: first declared wins on equal computed specificity", () => {
  const aliases = [
    { pattern: "claude-?-*", target: "first", specificity: 1 },
    { pattern: "claude-*-?", target: "second", specificity: 9999 },
  ];
  const result = resolveWildcardAlias("claude-x-y", aliases);
  assert.equal(result.target, "first");
  assert.equal(result.specificity, 35);
});

test("resolveWildcardAlias: keeps extra fields but replaces stored specificity with the computed score", () => {
  const aliases = [
    { pattern: "claude-*", target: "generic", specificity: 9999, weight: "preserved" },
  ];
  const result = resolveWildcardAlias("claude-sonnet-4", aliases);
  assert.equal(result.weight, "preserved");
  assert.equal(result.specificity, 28);
});

// ─── resolveModel ───────────────────────────────────────────────────────────

test("resolveModel: exact alias takes priority", () => {
  const exact = { "my-claude": "claude-sonnet-4-20250514" };
  const wildcards = [{ pattern: "my-*", target: "generic" }];
  assert.equal(resolveModel("my-claude", exact, wildcards), "claude-sonnet-4-20250514");
});

test("resolveModel: falls back to wildcard", () => {
  const exact = {};
  const wildcards = [{ pattern: "my-*", target: "wildcard-match" }];
  assert.equal(resolveModel("my-model", exact, wildcards), "wildcard-match");
});

test("resolveModel: returns original if no match", () => {
  assert.equal(resolveModel("unknown", {}, []), "unknown");
});

test("resolveModel: works with Map for exact aliases", () => {
  const exact = new Map([["alias1", "target1"]]);
  assert.equal(resolveModel("alias1", exact, []), "target1");
});
