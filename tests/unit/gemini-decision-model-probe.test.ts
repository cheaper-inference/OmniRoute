import assert from "node:assert/strict";
import test from "node:test";
import {
  decisionProbeBody,
  decisionProbeText,
  isGeminiDecisionProbe,
} from "../../src/lib/api/geminiDecisionProbe.ts";

test("selects only the Gemini Developer API decision model", () => {
  for (const model of ["gemini-decision-1", "gemini/gemini-decision-1"]) {
    assert.equal(isGeminiDecisionProbe("gemini", model), true);
  }
  assert.equal(isGeminiDecisionProbe("vertex", "gemini-decision-1"), false);
  assert.equal(isGeminiDecisionProbe("openai", "gpt-6-luna"), false);
  assert.equal(isGeminiDecisionProbe("gemini", "gemini-3-flash"), false);
});
test("reads the typed answer to the probe, including a zero score", () => {
  assert.equal(decisionProbeBody().questions.damaged.type, "noul");
  assert.equal(decisionProbeText({ answers: { damaged: { type: "noul", noul: 0 } } }), "0");
  assert.equal(decisionProbeText({ answers: {} }), "");
  assert.equal(decisionProbeText({ error: "unavailable" }), "");
});
