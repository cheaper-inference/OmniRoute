import { test } from "node:test";
import assert from "node:assert/strict";
import { isPaidModelTarget, matchesOnlyPaidModels } from "@/shared/utils/freeModels";

// openrouter/auto stopped being a documented free model in the November 2026 re-audit: the id is
// not on https://openrouter.ai/api/v1/models (2026-11-23) and the auto router can pick paid models.
test("isPaidModelTarget — documented free model → 'free'", () => {
  assert.equal(isPaidModelTarget("cohere/command-a-03-2025"), "free");
});

test("isPaidModelTarget — provider in free catalog but model not listed free → 'paid'", () => {
  assert.equal(isPaidModelTarget("gemini/gemini-3.1-pro-preview"), "paid");
});

test("isPaidModelTarget — no separator (combo/alias name) → 'unknown' (fail open)", () => {
  assert.equal(isPaidModelTarget("my-combo-name"), "unknown");
});

test("isPaidModelTarget — provider not in free catalog at all → 'unknown' (fail open)", () => {
  assert.equal(isPaidModelTarget("totally-unknown-provider/whatever"), "unknown");
});

test("isPaidModelTarget — comma-separated form matches slash form", () => {
  assert.equal(
    isPaidModelTarget("cohere,command-a-03-2025"),
    isPaidModelTarget("cohere/command-a-03-2025")
  );
});

test("isPaidModelTarget — empty/non-string input → 'unknown'", () => {
  assert.equal(isPaidModelTarget(""), "unknown");
  // @ts-expect-error — exercising runtime guard against non-string input
  assert.equal(isPaidModelTarget(undefined), "unknown");
});

test("matchesOnlyPaidModels — true when every match is paid", () => {
  assert.equal(matchesOnlyPaidModels("together/*"), true);
});

test("matchesOnlyPaidModels — false when at least one match is free", () => {
  // Since the November 2026 re-audit every registry model of openrouter is paid (its live free id is
  // pass-through only), so the mixed-catalog example moved to groq.
  assert.equal(matchesOnlyPaidModels("groq/*"), false);
});

test("matchesOnlyPaidModels — false (fail open) when there are zero matches", () => {
  assert.equal(matchesOnlyPaidModels("zzz-totally-nonexistent-pattern-*"), false);
});

test("matchesOnlyPaidModels — false on empty pattern", () => {
  assert.equal(matchesOnlyPaidModels(""), false);
});
