import test from "node:test";
import assert from "node:assert/strict";
import { classifyGeminiProjectBlock } from "../../src/sse/services/geminiProjectBlock.ts";

test("Gemini: project free tier is unavailable (not a generic model cooldown)", () => {
  assert.equal(classifyGeminiProjectBlock("gemini", 403,
    "The Gemini API free tier is not available for this project. To use the Gemini API, please set up billing."),
    "gemini_free_tier_ineligible");
  assert.equal(classifyGeminiProjectBlock("gemini", 403,
    "Your project has been denied access. Please contact support."),
    "gemini_free_tier_ineligible");
});

test("Gemini: prepaid funds and monthly spend cap are project-scoped", () => {
  assert.equal(classifyGeminiProjectBlock("gemini", 402,
    "Your prepayment credits are depleted."),
    "gemini_prepay_depleted");
  assert.equal(classifyGeminiProjectBlock("gemini", 429,
    "Your project has exceeded its monthly spending cap."),
    "gemini_monthly_spend_cap");
});

test("Gemini: ordinary rate limiting and transient failures stay transient", () => {
  assert.equal(classifyGeminiProjectBlock("gemini", 429,
    "You exceeded your current quota, please check your plan and billing details."),
    null);
  assert.equal(classifyGeminiProjectBlock("gemini", 503,
    "The model is experiencing high demand"), null);
  assert.equal(classifyGeminiProjectBlock("gemini", 403, "Content not permitted"), null);
  assert.equal(classifyGeminiProjectBlock("antigravity", 403,
    "The Gemini API free tier is not available for this project"), null);
});
