import assert from "node:assert/strict";
import test from "node:test";
import { isFreeTestTarget, stripProviderQualifier } from "../../src/shared/utils/freeModels.ts";

// POST /api/models/test receives qualified ids from the dashboard: comboStepTest.ts sends
// `step.model` ("horde/google/gemma-4-31b") whenever the bare id contains "/". The
// hidePaidModels gate compared that qualified string against bare catalog ids, so
// catalogued free models were refused with "Paid model blocked while hidePaidModels is enabled".

test("keyless AI Horde model passes the gate bare and qualified by id or alias", () => {
  assert.equal(isFreeTestTarget("aihorde", "google/gemma-4-31b"), true);
  assert.equal(isFreeTestTarget("aihorde", "aihorde/google/gemma-4-31b"), true);
  assert.equal(isFreeTestTarget("aihorde", "horde/google/gemma-4-31b"), true);
});

test("a catalogued free model on another provider with a slash in its id passes when qualified", () => {
  assert.equal(isFreeTestTarget("groq", "groq/openai/gpt-oss-120b"), true);
});

test("UncloseAI stays blocked: its free tier is catalogued as discontinued (#19385)", () => {
  // Upstream answers HTTP 401 "public_beta_closed"; qualifying the id must not reopen it.
  assert.equal(isFreeTestTarget("uncloseai", "turboderp/Qwen3.8-27B-exl3"), false);
  assert.equal(isFreeTestTarget("uncloseai", "unc/turboderp/Qwen3.8-27B-exl3"), false);
});

test("paid models stay blocked in every form", () => {
  assert.equal(isFreeTestTarget("openrouter", "openrouter/anthropic/claude-sonnet-4.5"), false);
  assert.equal(isFreeTestTarget("openrouter", "anthropic/claude-sonnet-4.5"), false);
  assert.equal(isFreeTestTarget("openai", "gpt-5"), false);
  assert.equal(isFreeTestTarget("openai", "openai/gpt-5"), false);
});

test("a free model id under the wrong provider qualifier is not borrowed", () => {
  // Only the provider's own id/alias is stripped; another provider's prefix is kept.
  assert.equal(isFreeTestTarget("openrouter", "horde/google/gemma-4-31b"), false);
  assert.equal(stripProviderQualifier("aihorde", "groq/openai/gpt-oss-120b"), "groq/openai/gpt-oss-120b");
});

test("stripProviderQualifier removes only the provider's own id or alias", () => {
  assert.equal(stripProviderQualifier("aihorde", "horde/google/gemma-4-31b"), "google/gemma-4-31b");
  assert.equal(stripProviderQualifier("aihorde", "aihorde/google/gemma-4-31b"), "google/gemma-4-31b");
  assert.equal(stripProviderQualifier("aihorde", "google/gemma-4-31b"), "google/gemma-4-31b");
  assert.equal(stripProviderQualifier("uncloseai", "unc/turboderp/Qwen3.8-27B-exl3"), "turboderp/Qwen3.8-27B-exl3");
});
