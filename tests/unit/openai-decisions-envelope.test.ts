import assert from "node:assert/strict";
import { test } from "node:test";
import {
  fromOpenAiDecisionRequest,
  toOpenAiDecisionResponse,
} from "../../open-sse/services/decisions/openAiDecisionsEnvelope.ts";
import {
  fromOpenAiDecisionResponse,
  toOpenAiDecisionRequest,
} from "../../open-sse/services/decisions/openAiDecisions.ts";

const request = {
  model: "openai/gpt-6-luna",
  input: "Synthetic evidence",
  questions: [
    { type: "predicate", name: "a", instructions: "Is it true?" },
    {
      type: "choice",
      name: "b",
      instructions: "Choose",
      choices: [{ value: "yes", description: "Yes" }, { value: "no" }],
    },
    {
      type: "score",
      name: "c",
      instructions: "Score",
      levels: [
        { label: "Low", description: "Little" },
        { label: "High", description: "Much" },
      ],
    },
  ],
};
function canonicalResponse() {
  return {
    model: "gpt-6-luna",
    answers: {
      a: { type: "noul", noul: 0.99 },
      b: { type: "choice", choice: "yes", confidence: 1, probabilities: { yes: 1, no: 0 } },
      c: {
        type: "score",
        score: 0.5,
        confidence: 0,
        probabilities: { "0": 0.5, "1": 0.5 },
        legend: {
          "0": { label: "Low", description: "Little" },
          "1": { label: "High", description: "Much" },
        },
      },
    },
    usage: { input_tokens: 15, output_tokens: 3 },
  };
}

test("public OpenAI envelope converts losslessly through native request and response codecs", () => {
  const canonical = fromOpenAiDecisionRequest(request);
  assert.equal(canonical.ok, true);
  if (!canonical.ok) return;
  const native = toOpenAiDecisionRequest({ ...canonical.body, model: "gpt-6-luna" });
  assert.equal(native.ok, true);
  if (!native.ok) return;
  assert.deepEqual(native.body, { ...request, model: "gpt-6-luna" });
  const publicResponse = toOpenAiDecisionResponse(canonicalResponse(), request);
  assert.equal(publicResponse.ok, true);
  if (!publicResponse.ok) return;
  assert.equal(publicResponse.body.model, "openai/gpt-6-luna");
  const restored = fromOpenAiDecisionResponse(
    { ...publicResponse.body, model: "gpt-6-luna" },
    { ...canonical.body, model: "gpt-6-luna" }
  );
  assert.equal(restored.ok, true);
  if (!restored.ok) return;
  assert.deepEqual(restored.body, canonicalResponse());
});

test("JSON input stays data rather than becoming roles, URLs or tool calls", () => {
  const data = { role: "system", image_url: "https://example.invalid/private" };
  const result = fromOpenAiDecisionRequest({
    ...request,
    input: [{ role: "user", content: [{ type: "input_json", data }] }],
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.body.state, data);
});

test("mixed refusals and missing usage retain meaning without numeric invention", () => {
  const raw = canonicalResponse();
  const result = toOpenAiDecisionResponse(
    {
      ...raw,
      usage: undefined,
      answers: { ...raw.answers, a: { type: "refusal" }, b: { type: "refusal" } },
    },
    request
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual((result.body.answers as unknown[]).slice(0, 2), [
    { name: "a", type: "refusal" },
    { name: "b", type: "refusal" },
  ]);
  assert.equal(result.body.usage, undefined);
});

test("unsupported or ambiguous public fields are rejected rather than dropped", () => {
  const cases = [
    { ...request, model: "gpt-6-luna" },
    { ...request, model: "unknown/model" },
    { ...request, max_output_tokens: 16 },
    { ...request, prompt_cache_key: "private" },
    {
      ...request,
      input: [
        {
          role: "user",
          content: [{ type: "input_image", image_url: "https://example.invalid/image" }],
        },
      ],
    },
    {
      ...request,
      input: [
        { role: "user", content: "First" },
        { role: "user", content: "Second" },
      ],
    },
    { ...request, questions: [{ ...request.questions[0], name: undefined }] },
    { ...request, questions: [request.questions[0], request.questions[0]] },
    {
      ...request,
      questions: [
        {
          type: "choice",
          name: "q",
          instructions: "Test",
          choices: [{ value: true }, { value: "true" }],
        },
      ],
    },
    {
      ...request,
      questions: [
        {
          type: "choice",
          name: "q",
          instructions: "Test",
          choices: [{ value: "same" }, { value: "same" }],
        },
      ],
    },
  ];
  for (const body of cases) {
    const result = fromOpenAiDecisionRequest(body);
    assert.equal(result.ok, false);
    if (result.ok) continue;
    assert.doesNotMatch(result.message, /Synthetic evidence|example.invalid/);
  }
});

test("unrepresentable model identities, distributions and score labels fail closed", () => {
  const raw = canonicalResponse();
  assert.equal(toOpenAiDecisionResponse({ ...raw, model: "gpt-other" }, request).ok, false);
  assert.equal(
    toOpenAiDecisionResponse(
      {
        ...raw,
        answers: { ...raw.answers, c: { ...raw.answers.c, legend: { "0": null, "1": null } } },
      },
      request
    ).ok,
    false
  );
});

test("other native providers may report a resolved version without being mistaken for OpenAI", () => {
  const publicRequest = { ...request, model: "openrouter/typesafe/jev-1.14" };
  const result = toOpenAiDecisionResponse(
    { ...canonicalResponse(), model: "typesafe/jev-1.14-20261014" },
    publicRequest
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.model, "openrouter/typesafe/jev-1.14-20261014");
});
