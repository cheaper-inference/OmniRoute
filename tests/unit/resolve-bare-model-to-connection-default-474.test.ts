import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveBareModelToConnectionDefault } from "@omniroute/open-sse/services/model.ts";

// #474 — When a bare model name (no "/") reaches the upstream call and the
// selected connection declares a defaultModel, the bare name must resolve to
// that real model ID. A "/"-qualified model name is an explicit provider/model
// choice and must always be left untouched.

test("bare model name resolves to the connection defaultModel", () => {
  // "auto" came from an alias; the connection's defaultModel is the concrete ID.
  const effective = resolveBareModelToConnectionDefault("auto", "auto", "gpt-4o-mini");
  assert.equal(effective, "gpt-4o-mini");
});

test('"/"-qualified model name is left untouched even when a defaultModel exists', () => {
  const effective = resolveBareModelToConnectionDefault("openai/gpt-4o", "gpt-4o", "gpt-4o-mini");
  assert.equal(effective, "gpt-4o");
});

test("bare model name without a connection defaultModel falls back to the resolved model", () => {
  assert.equal(resolveBareModelToConnectionDefault("auto", "auto", null), "auto");
  assert.equal(resolveBareModelToConnectionDefault("auto", "auto", undefined), "auto");
  assert.equal(resolveBareModelToConnectionDefault("auto", "auto", ""), "auto");
});

test("empty defaultModel string does not override the resolved model", () => {
  assert.equal(resolveBareModelToConnectionDefault("auto", "resolved-auto", ""), "resolved-auto");
});

test("null/undefined requested model strings are treated as non-bare (no override)", () => {
  assert.equal(resolveBareModelToConnectionDefault(null, "resolved", "default"), "resolved");
  assert.equal(resolveBareModelToConnectionDefault(undefined, "resolved", "default"), "resolved");
});

test("null resolved model with no defaultModel returns null", () => {
  assert.equal(resolveBareModelToConnectionDefault("auto", null, null), null);
});

// The connection defaultModel only replaces a placeholder ("auto" or empty).
// A concrete bare model name (e.g. a catalog short name like
// "claude-haiku-4-5") is an explicit model choice: swapping it for the
// connection's defaultModel silently served a different model (a Gemini
// default answering a Claude request) with no error anywhere.

test("concrete bare model name is NOT replaced by the connection defaultModel", () => {
  assert.equal(
    resolveBareModelToConnectionDefault("claude-haiku-4-5", "claude-haiku-4-5", "gemini-2.5-flash"),
    "claude-haiku-4-5"
  );
  assert.equal(resolveBareModelToConnectionDefault("gpt-4o", "gpt-4o", "gpt-4o-mini"), "gpt-4o");
});

test("bare alias that resolved to a concrete model keeps the resolved model", () => {
  // The alias "haiku" resolved to a concrete id; the defaultModel must not win.
  assert.equal(
    resolveBareModelToConnectionDefault("haiku", "claude-haiku-4-5-20251001", "gemini-2.5-flash"),
    "claude-haiku-4-5-20251001"
  );
});

test("empty or null resolved model still falls back to the connection defaultModel", () => {
  assert.equal(resolveBareModelToConnectionDefault("auto", "", "gpt-4o-mini"), "gpt-4o-mini");
  assert.equal(resolveBareModelToConnectionDefault("auto", null, "gpt-4o-mini"), "gpt-4o-mini");
});

test("defaultModel equal to the resolved model is returned as-is", () => {
  assert.equal(
    resolveBareModelToConnectionDefault("gpt-4o-mini", "gpt-4o-mini", "gpt-4o-mini"),
    "gpt-4o-mini"
  );
});

test("BARE_MODEL_DEFAULT_OVERRIDE_LEGACY=true restores the old replacement", () => {
  const before = process.env.BARE_MODEL_DEFAULT_OVERRIDE_LEGACY;
  process.env.BARE_MODEL_DEFAULT_OVERRIDE_LEGACY = "true";
  try {
    assert.equal(
      resolveBareModelToConnectionDefault(
        "claude-haiku-4-5",
        "claude-haiku-4-5",
        "gemini-2.5-flash"
      ),
      "gemini-2.5-flash"
    );
  } finally {
    if (before === undefined) delete process.env.BARE_MODEL_DEFAULT_OVERRIDE_LEGACY;
    else process.env.BARE_MODEL_DEFAULT_OVERRIDE_LEGACY = before;
  }
});
