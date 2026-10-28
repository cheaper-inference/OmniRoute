import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validateSystemOneRequestBody,
  validateSystemOneBackendBody,
  parseSystemOneAnswers,
} from "../../open-sse/services/typesafe/systemOneAnswers.ts";

const scoreBody = {
  model: "jev-1.14.0",
  state: "synthetic",
  questions: { q: { type: "score", instructions: "Rate", criteria: ["Only"] } },
};

test("canonical one-level score is representable but current TypeSafe and OpenAI keep their two-level minimum", () => {
  assert.equal(validateSystemOneRequestBody(scoreBody).ok, true);
  for (const provider of ["typesafe", "openai", "deepinfra"]) {
    assert.equal(validateSystemOneBackendBody(provider, scoreBody).ok, false, provider);
  }
});

test("a one-level score can only report zero and still requires honest confidence/distribution", () => {
  const answer = {
    type: "score",
    score: 0,
    probabilities: { "0": 1 },
    legend: { "0": "Only" },
    confidence: 1,
  };
  assert.equal(parseSystemOneAnswers({ answers: { q: answer } }, scoreBody).ok, true);
  assert.equal(
    parseSystemOneAnswers({ answers: { q: { ...answer, score: 0.1 } } }, scoreBody).ok,
    false
  );
  assert.equal(
    parseSystemOneAnswers({ answers: { q: { ...answer, confidence: undefined } } }, scoreBody).ok,
    false
  );
});

test("Drex Max uses the conservative sixteen-question intersection without restricting Clef or DrexV2 to that local cap", () => {
  const questions = Object.fromEntries(
    Array.from({ length: 17 }, (_, index) => [
      `q${index}`,
      { type: "noul", instructions: "Synthetic?" },
    ])
  );
  assert.equal(
    validateSystemOneBackendBody("deepinfra", {
      model: "nace-ai/drex-max",
      state: "synthetic",
      questions,
    }).ok,
    false
  );
  for (const model of ["Cloudflare/clef", "Cloudflare/clef-flash", "nace-ai/drex-v2.0"]) {
    assert.equal(
      validateSystemOneBackendBody("deepinfra", { model, state: "synthetic", questions }).ok,
      true
    );
  }
});
