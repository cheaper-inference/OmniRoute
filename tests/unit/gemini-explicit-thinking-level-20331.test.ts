import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-thinking-level-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type ThinkingConfigResult = {
  generationConfig: {
    thinkingConfig: { thinkingLevel?: string; thinkingBudget?: number };
  };
};

function translatedThinkingConfig(body: Record<string, unknown>, model = "gemini-3.5-flash-lite") {
  const result = openaiToGeminiRequest(model, body, false) as ThinkingConfigResult;
  return result.generationConfig.thinkingConfig;
}

test("normalizes explicit thinkingLevel enum values from nested overrides", () => {
  const config = translatedThinkingConfig({
    messages: [{ role: "user", content: "hello" }],
    reasoning_effort: "high",
    generationConfig: { thinkingConfig: { thinkingLevel: "  LOW  " } },
  });
  assert.equal(config.thinkingLevel, "low");
  assert.equal(config.thinkingBudget, undefined);
});

test("skips invalid nested levels and honors a valid top-level fallback", () => {
  const config = translatedThinkingConfig({
    messages: [{ role: "user", content: "hello" }],
    generationConfig: { thinkingConfig: { thinkingLevel: "extreme" } },
    thinking_level: " HIGH ",
  });
  assert.equal(config.thinkingLevel, "high");
  assert.equal(config.thinkingBudget, undefined);
});

test("rejects unknown explicit thinking levels without forwarding them", () => {
  const config = translatedThinkingConfig({
    messages: [{ role: "user", content: "hello" }],
    reasoning_effort: "high",
    thinkingLevel: "unsupported_level",
  }, "gemini-3.8-flash");
  assert.equal(config.thinkingLevel, "high");
  assert.equal(config.thinkingBudget, undefined);
});


test("legacy Gemini models preserve explicit passthrough for compatibility", () => {
  const request = (level: string) => translatedThinkingConfig({
    messages: [{ role: "user", content: "hello" }],
    generationConfig: { thinkingConfig: { thinkingLevel: level } },
  }, "gemini-3.1-pro-preview");
  assert.equal(request("bogus").thinkingLevel, "bogus");
  assert.equal(request("HIGH").thinkingLevel, "HIGH");
});
