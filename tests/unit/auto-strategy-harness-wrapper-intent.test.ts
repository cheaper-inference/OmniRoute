import test from "node:test";
import assert from "node:assert/strict";
const { extractPromptForIntent } = await import("../../open-sse/services/combo/autoStrategy.ts");
const { classifyWithConfig, DEFAULT_INTENT_CONFIG } =
  await import("../../open-sse/services/intentClassifier.ts");
test("extractPromptForIntent skips harness wrappers", () => {
  const body = {
    messages: [
      {
        role: "user",
        content:
          "<system-reminder>use function and class, import const async</system-reminder>\nName three mammals that live in the ocean.",
      },
    ],
  };
  const prompt = extractPromptForIntent(body);
  assert.equal(prompt.trim(), "Name three mammals that live in the ocean.");
  assert.equal(classifyWithConfig(prompt, DEFAULT_INTENT_CONFIG), "medium");
});

const WRAPPED = "<system-reminder>use function and class, import const async</system-reminder>\n";
const ASK = "Name three mammals that live in the ocean.";

test("extractPromptForIntent skips harness wrappers in input and prompt bodies too", () => {
  const bodies = [
    { input: `${WRAPPED}${ASK}` },
    { input: [{ content: `${WRAPPED}${ASK}` }] },
    { input: [{ text: `${WRAPPED}${ASK}` }] },
    { prompt: `${WRAPPED}${ASK}` },
  ];
  for (const body of bodies) {
    const prompt = extractPromptForIntent(body);
    assert.equal(prompt.trim(), ASK, JSON.stringify(body));
    assert.equal(classifyWithConfig(prompt, DEFAULT_INTENT_CONFIG), "medium");
  }
});
