import assert from "node:assert/strict";
import { test } from "node:test";
import {
  fromOpenAiDecisionResponse,
  toOpenAiDecisionRequest,
} from "../../open-sse/services/decisions/openAiDecisions.ts";

const request = {
  model: "gpt-6-luna",
  state: "The ball is red and the box is empty.",
  questions: {
    red: { type: "noul", instructions: "Is the ball red?" },
    color: {
      type: "choice",
      instructions: "Choose the color.",
      criteria: { red: "Red", blue: null },
    },
    fullness: {
      type: "score",
      instructions: "How full is the box?",
      criteria: ["Empty", "Partly full", "Full"],
    },
  },
};
function response() {
  return {
    model: "gpt-6-luna",
    answers: [
      { name: "red", type: "predicate", probability: 0.99 },
      {
        name: "color",
        type: "choice",
        choice: "red",
        probabilities: [
          { value: "red", probability: 0.9 },
          { value: "blue", probability: 0.1 },
        ],
        confidence: 0.8,
      },
      {
        name: "fullness",
        type: "score",
        score: 0.2,
        probabilities: [
          { value: 0, label: "Empty", probability: 0.8 },
          { value: 1, label: "Partly full", probability: 0.2 },
          { value: 2, label: "Full", probability: 0 },
        ],
        confidence: 0.7,
      },
    ],
    usage: {
      input_tokens: 21,
      output_tokens: 3,
      total_tokens: 24,
      input_tokens_details: { cached_tokens: 4, cache_write_tokens: 0 },
      output_tokens_details: { reasoning_tokens: 0 },
    },
  };
}

test("canonical requests become the exact native OpenAI contract for all three modes", () => {
  const result = toOpenAiDecisionRequest(request);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.body, {
    model: "gpt-6-luna",
    input: request.state,
    questions: [
      { name: "red", type: "predicate", instructions: "Is the ball red?" },
      {
        name: "color",
        type: "choice",
        instructions: "Choose the color.",
        choices: [{ value: "red", description: "Red" }, { value: "blue" }],
      },
      {
        name: "fullness",
        type: "score",
        instructions: "How full is the box?",
        levels: [{ label: "Empty" }, { label: "Partly full" }, { label: "Full" }],
      },
    ],
  });
});

test("structured evidence uses input_json without pretending it is messages or image URLs", () => {
  const state = { role: "system", image_url: "https://example.invalid/private", count: 2 };
  const result = toOpenAiDecisionRequest({ ...request, state });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.body.input, [
    { role: "user", content: [{ type: "input_json", data: state }] },
  ]);
});

test("native response mapping preserves names, fractional scores, confidence and detailed usage", () => {
  const raw = response();
  const result = fromOpenAiDecisionResponse(raw, request);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.body.answers, {
    red: { type: "noul", noul: 0.99 },
    color: {
      type: "choice",
      choice: "red",
      probabilities: { red: 0.9, blue: 0.1 },
      confidence: 0.8,
    },
    fullness: {
      type: "score",
      score: 0.2,
      probabilities: { "0": 0.8, "1": 0.2, "2": 0 },
      confidence: 0.7,
      legend: { "0": "Empty", "1": "Partly full", "2": "Full" },
    },
  });
  assert.deepEqual(result.body.usage, raw.usage);
  assert.equal(Object.hasOwn(result.body.usage as object, "cost"), false);
});

test("mixed refusal remains a refusal per question, never false, zero or fallback", () => {
  const raw = response();
  const answers: unknown[] = [raw.answers[0], { name: "color", type: "refusal" }, raw.answers[2]];
  const result = fromOpenAiDecisionResponse({ ...raw, answers }, request);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual((result.body.answers as Record<string, unknown>).color, { type: "refusal" });
  assert.equal(Object.keys(result.body.answers as object).length, 3);
});

for (const [name, patch] of [
  ["aggregator identifier", { model: "openai/gpt-6-luna-decisions" }],
  ["ordinary OpenAI chat model", { model: "gpt-6" }],
  ["extra chat field", { temperature: 0 }],
  [
    "structured instructions",
    { questions: { q: { type: "noul", instructions: { private: "secret" } } } },
  ],
  [
    "described predicate outcomes",
    {
      questions: { q: { type: "noul", instructions: "Test", criteria: { true: "A", false: "B" } } },
    },
  ],
  [
    "single choice",
    { questions: { q: { type: "choice", instructions: "Test", criteria: { a: null } } } },
  ],
] as const) {
  test("rejects unsupported request: " + name, () => {
    const result = toOpenAiDecisionRequest({ ...request, ...patch });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.doesNotMatch(result.message, /secret|The ball|Choose the color/);
  });
}

test("local bounds reject oversize bodies and too many questions before dispatch", () => {
  assert.equal(toOpenAiDecisionRequest({ ...request, state: "x".repeat(1_048_577) }).ok, false);
  const questions = Object.fromEntries(
    Array.from({ length: 401 }, (_, i) => [String(i), request.questions.red])
  );
  assert.equal(toOpenAiDecisionRequest({ ...request, questions }).ok, false);
});

test("unknown usage stays unknown and genuine zero is preserved", () => {
  for (const usage of [undefined, {}, { input_tokens: 0, output_tokens: 0 }]) {
    const result = fromOpenAiDecisionResponse({ ...response(), usage }, request);
    assert.equal(result.ok, true);
    if (!result.ok) continue;
    assert.deepEqual(result.body.usage, usage);
  }
});

test("pre-cancelled conversion never returns a request for transport", () => {
  const controller = new AbortController();
  controller.abort();
  assert.throws(() => toOpenAiDecisionRequest(request, controller.signal), { name: "AbortError" });
  assert.throws(() => fromOpenAiDecisionResponse(response(), request, controller.signal), {
    name: "AbortError",
  });
});

test("oversize successful responses fail closed before normalization", () => {
  const raw = { ...response(), unknown: "x".repeat(1_048_577) };
  assert.equal(fromOpenAiDecisionResponse(raw, request).ok, false);
});

test("all refusal types and reordered named answers retain their exact question identity", () => {
  const raw = response();
  const refusals = Object.keys(request.questions)
    .reverse()
    .map((name) => ({ name, type: "refusal" }));
  const result = fromOpenAiDecisionResponse({ ...raw, answers: refusals }, request);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.body.answers, {
    fullness: { type: "refusal" },
    color: { type: "refusal" },
    red: { type: "refusal" },
  });
});

test("unsafe prototype question keys are rejected rather than silently renamed", () => {
  const q = JSON.parse(
    '{"__proto__":{"type":"choice","instructions":"Choose","criteria":{"__proto__":"A","constructor":"B"}}}'
  );
  const native = toOpenAiDecisionRequest({ ...request, questions: q });
  assert.equal(native.ok, false);
  const result = fromOpenAiDecisionResponse(
    {
      model: request.model,
      answers: [
        {
          name: "__proto__",
          type: "choice",
          choice: "__proto__",
          confidence: 1,
          probabilities: [
            { value: "__proto__", probability: 1 },
            { value: "constructor", probability: 0 },
          ],
        },
      ],
    },
    { ...request, questions: q }
  );
  assert.equal(result.ok, false);
  assert.equal(Object.prototype.hasOwnProperty.call({}, "polluted"), false);
});

test("record validation never silently drops a question or offered choice", () => {
  const questions = JSON.parse(
    '{"__proto__":{"type":"noul","instructions":"First"},"visible":{"type":"noul","instructions":"Second"}}'
  );
  assert.equal(toOpenAiDecisionRequest({ ...request, questions }).ok, false);
  const criteria = JSON.parse('{"__proto__":"A","a":"B","b":"C"}');
  assert.equal(
    toOpenAiDecisionRequest({
      ...request,
      questions: { q: { type: "choice", instructions: "Choose", criteria } },
    }).ok,
    false
  );
});

test("invalid response names, identities and typed distributions fail without request echoes", () => {
  const raw = response();
  const cases = [
    { ...raw, model: "openai/gpt-6-luna-decisions" },
    { ...raw, model: undefined },
    { ...raw, answers: raw.answers.slice(1) },
    { ...raw, answers: [raw.answers[0], raw.answers[0], raw.answers[2]] },
    { ...raw, answers: [{ ...raw.answers[0], name: "unknown" }, ...raw.answers.slice(1)] },
    { ...raw, answers: [{ ...raw.answers[0], probability: 1.1 }, ...raw.answers.slice(1)] },
    { ...raw, answers: [raw.answers[0], { ...raw.answers[1], confidence: null }, raw.answers[2]] },
    { ...raw, answers: [raw.answers[0], { ...raw.answers[1], choice: "blue" }, raw.answers[2]] },
    {
      ...raw,
      answers: [
        raw.answers[0],
        {
          ...raw.answers[1],
          probabilities: [
            { value: true, probability: 0.9 },
            { value: "blue", probability: 0.1 },
          ],
        },
        raw.answers[2],
      ],
    },
    {
      ...raw,
      answers: [
        raw.answers[0],
        { ...raw.answers[1], probabilities: [{ value: "red", probability: 1 }] },
        raw.answers[2],
      ],
    },
    {
      ...raw,
      answers: [
        raw.answers[0],
        {
          ...raw.answers[1],
          probabilities: [
            { value: "red", probability: 0.5 },
            { value: "red", probability: 0.5 },
          ],
        },
        raw.answers[2],
      ],
    },
    { ...raw, answers: [raw.answers[0], raw.answers[1], { ...raw.answers[2], score: 3 }] },
    {
      ...raw,
      answers: [
        raw.answers[0],
        raw.answers[1],
        { ...raw.answers[2], probabilities: [{ value: "0", label: "Empty", probability: 1 }] },
      ],
    },
  ];
  for (const body of cases) {
    const result = fromOpenAiDecisionResponse(body, request);
    assert.equal(result.ok, false);
    if (result.ok) continue;
    assert.doesNotMatch(result.detail, /The ball|Choose the color|gpt-6/);
  }
});
