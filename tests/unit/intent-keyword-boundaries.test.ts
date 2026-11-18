import test from "node:test";
import assert from "node:assert/strict";

const { classifyPromptIntent, classifyWithConfig, DEFAULT_INTENT_CONFIG } =
  await import("../../open-sse/services/intentClassifier.ts");

test("Latin keywords do not match inside longer words", () => {
  assert.equal(classifyPromptIntent("This detail is important"), "medium");
  assert.equal(classifyPromptIntent("Please classify this animal"), "medium");
});

test("Latin keywords accept common inflections", () => {
  assert.equal(classifyPromptIntent("Debugging this race condition"), "code");
  assert.equal(classifyPromptIntent("Importing the modules"), "code");
  assert.equal(classifyPromptIntent("Calculating the total"), "math");
});

test("CJK keywords and code fences keep substring matching", () => {
  assert.equal(classifyPromptIntent("このコードを説明して"), "code");
  assert.equal(classifyPromptIntent("x```y"), "code");
});

test("configured keywords use the same boundaries and suffixes", () => {
  const config = { ...DEFAULT_INTENT_CONFIG, extraCodeKeywords: ["deploy"] };
  assert.equal(classifyWithConfig("application deployment", config), "medium");
  assert.equal(classifyWithConfig("deploying the application", config), "code");
});
