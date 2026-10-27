/**
 * System One typed answers (`noul` / `choice` / `score`) and request validation.
 *
 * The decision semantics are the product: a parsed answer must keep the typed
 * value, the calibrated probabilities, the confidence and the usage/cost the
 * upstream reported. Validation rejects malformed envelopes before a credential
 * is spent, and no error message may echo the caller's state or instructions.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { v1SystemOneSchema } from "../../src/shared/validation/schemas/apiV1.ts";

import {
  parseSystemOneAnswers,
  validateSystemOneRequestBody,
  validateSystemOneBackendBody,
} from "../../open-sse/services/typesafe/systemOneAnswers.ts";

const STATE = "patient record: Jane Doe, 1980-02-02, diagnosed with a secret condition";

function body(overrides: Record<string, unknown> = {}) {
  return {
    model: "openrouter/typesafe/jev-1.13",
    state: STATE,
    questions: {
      urgent: { type: "noul", instructions: "Is this urgent?" },
    },
    ...overrides,
  };
}

test("a noul answer keeps its probability value", () => {
  const result = parseSystemOneAnswers({
    model: "jev-1.13",
    answers: {
      urgent: {
        type: "noul",
        noul: 0.91,
      },
    },
    usage: { input_tokens: 120, output_tokens: 3 },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.model, "jev-1.13");
  assert.deepEqual(result.answers.urgent, {
    type: "noul",
    noul: 0.91,
    probabilities: null,
    confidence: null,
  });
  assert.deepEqual(result.usage, { inputTokens: 120, outputTokens: 3, costUsd: null });
});

test("choice field preservation keeps independent confidence without claiming calibration", () => {
  const result = parseSystemOneAnswers({
    answers: {
      route: {
        type: "choice",
        choice: "gpt-5",
        probabilities: { "gpt-5": 0.7, "claude-4": 0.3 },
        confidence: 0.66,
      },
    },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.answers.route, {
    type: "choice",
    choice: "gpt-5",
    probabilities: { "gpt-5": 0.7, "claude-4": 0.3 },
    confidence: 0.66,
  });
  assert.deepEqual(result.usage, { inputTokens: null, outputTokens: null, costUsd: null });
});

test("score field preservation keeps fractional level and independent confidence", () => {
  const result = parseSystemOneAnswers({
    answers: {
      severity: {
        type: "score",
        score: 1.5,
        probabilities: { "0": 0, "1": 0.5, "2": 0.5 },
        legend: { "0": "low", "1": "medium", "2": "high" },
        confidence: 0.5,
      },
    },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.answers.severity.type, "score");
  assert.deepEqual(result.answers.severity, {
    type: "score",
    score: 1.5,
    probabilities: { "0": 0, "1": 0.5, "2": 0.5 },
    legend: { "0": "low", "1": "medium", "2": "high" },
    confidence: 0.5,
  });
});

test("several typed questions are answered in one response", () => {
  const result = parseSystemOneAnswers({
    answers: {
      urgent: { type: "noul", noul: 0.1 },
      route: { type: "choice", choice: "a", probabilities: { a: 1 }, confidence: 1 },
      severity: {
        type: "score",
        score: 2,
        probabilities: { "0": 0, "1": 0, "2": 1 },
        legend: { "0": "low", "1": "medium", "2": "high" },
        confidence: 1,
      },
    },
    usage: { input_tokens: 10, output_tokens: 1, cost: 0.000042 },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(Object.keys(result.answers).sort(), ["route", "severity", "urgent"]);
  assert.equal(result.usage.costUsd, 0.000042);
  // Required Choice/Score metadata stays intact.
  assert.equal(result.answers.severity.confidence, 1);
  assert.deepEqual(result.answers.severity.probabilities, { "0": 0, "1": 0, "2": 1 });
});

test("a reported zero cost is preserved as a known zero, not as unknown", () => {
  const result = parseSystemOneAnswers({
    answers: { q: { type: "noul", noul: 1 } },
    usage: { input_tokens: 5, output_tokens: 0, cost: 0 },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.usage.costUsd, 0);
  assert.equal(result.usage.outputTokens, 0);
});

test("malformed answer bodies are rejected without echoing the request state", () => {
  const cases: unknown[] = [
    null,
    "not json",
    [],
    {},
    { answers: null },
    { answers: [] },
    { answers: {} },
    { answers: { q: { type: "telepathy", noul: 1 } } },
    { answers: { q: { type: "noul" } } },
    { answers: { q: { type: "noul", noul: "yes" } } },
    { answers: { q: { type: "choice", probabilities: { a: 1 } } } },
    { answers: { q: { type: "choice", choice: "   " } } },
    { answers: { q: { type: "score", score: "high" } } },
    { answers: { q: { type: "choice", choice: "a", probabilities: { a: -1 } } } },
    { answers: { q: { type: "noul", noul: 2 } } },
  ];
  for (const payload of cases) {
    const result = parseSystemOneAnswers(payload);
    assert.equal(result.ok, false, `accepted ${JSON.stringify(payload)}`);
    if (result.ok) continue;
    assert.equal(result.reason, "invalid_response");
    assert.ok(result.detail.length > 0);
    assert.doesNotMatch(result.detail, /Jane Doe/);
  }
});

test("a valid request envelope passes validation", () => {
  const result = validateSystemOneRequestBody(body());
  assert.deepEqual(result, { ok: true });
});

test("choice and score questions carry their criteria", () => {
  assert.deepEqual(
    validateSystemOneRequestBody(
      body({
        questions: {
          route: { type: "choice", instructions: "pick", criteria: { a: "A", b: null } },
          severity: { type: "score", instructions: "rate", criteria: ["low", "high"] },
        },
      })
    ),
    { ok: true }
  );
});

test("an invalid request envelope is rejected with a 400 and no state echo", () => {
  const cases: unknown[] = [
    {},
    { model: "", state: "x", questions: { q: { type: "noul" } } },
    { model: "m", state: STATE },
    { model: "m", state: STATE, questions: {} },
    { model: "m", state: STATE, questions: [] },
    { model: "m", state: STATE, questions: { q: {} } },
    { model: "m", state: STATE, questions: { q: { type: "unknown" } } },
    { model: "m", state: STATE, questions: { q: { type: "choice" } } },
    { model: "m", state: STATE, questions: { q: { type: "choice", criteria: {} } } },
    { model: "m", state: STATE, questions: { q: { type: "choice", criteria: [] } } },
    { model: "m", state: STATE, questions: { q: { type: "score", criteria: {} } } },
    { model: "m", state: 42, questions: { q: { type: "noul" } } },
  ];
  for (const payload of cases) {
    const result = validateSystemOneRequestBody(payload);
    assert.equal(result.ok, false, `accepted ${JSON.stringify(payload)}`);
    if (result.ok) continue;
    assert.equal(result.status, 400);
    assert.doesNotMatch(result.message, /Jane Doe/);
  }
});

test("the shared envelope is validated once and the state is never truncated", () => {
  const long = "x".repeat(50_000);
  const result = validateSystemOneRequestBody(body({ state: long }));
  assert.deepEqual(result, { ok: true });
});

test("per-backend limits bound the number of candidates and questions", () => {
  const criteria: Record<string, string> = {};
  for (let index = 0; index < 300; index++) criteria[`option-${index}`] = "x";
  const tooManyChoices = validateSystemOneBackendBody(
    "openrouter",
    body({ questions: { route: { type: "choice", criteria } } })
  );
  assert.equal(tooManyChoices.ok, false);
  if (!tooManyChoices.ok) assert.equal(tooManyChoices.status, 400);

  const tooManyLevels = validateSystemOneBackendBody(
    "opencode-zen",
    body({ questions: { severity: { type: "score", criteria: Array(40).fill("level") } } })
  );
  assert.equal(tooManyLevels.ok, false);

  const questions: Record<string, unknown> = {};
  for (let index = 0; index < 200; index++) questions[`q${index}`] = { type: "noul" };
  const tooManyQuestions = validateSystemOneBackendBody("vercel-ai-gateway", body({ questions }));
  assert.equal(tooManyQuestions.ok, false);
});

test("a request within the backend limits is accepted on every backend", () => {
  for (const provider of ["opencode-zen", "openrouter", "vercel-ai-gateway"]) {
    assert.deepEqual(
      validateSystemOneBackendBody(
        provider,
        body({
          questions: {
            route: { type: "choice", criteria: { a: "A", b: "B" } },
            severity: { type: "score", criteria: ["low", "high"] },
            urgent: { type: "noul", instructions: "Urgent?" },
          },
        })
      ),
      { ok: true },
      provider
    );
  }
});

test("a backend body that exceeds the backend byte budget is rejected with 413", () => {
  const huge = "y".repeat(3_000_000);
  const result = validateSystemOneBackendBody("openrouter", body({ state: huge }));
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.equal(result.status, 413);
    assert.doesNotMatch(result.message, /yyy/);
  }
});

test("structured state and instructions survive both request gates unchanged", () => {
  for (const state of [{ ticket: STATE, priority: 3 }, [STATE, { active: true }]]) {
    const request = body({
      state,
      questions: {
        urgent: { type: "noul", instructions: { question: "Is this urgent?", facts: [1, null] } },
        route: {
          type: "choice",
          instructions: ["Pick a team", { rule: "Use the ticket" }],
          criteria: { billing: { description: "Charges" }, support: ["Bugs"], other: null },
        },
        severity: {
          type: "score",
          instructions: "Rate urgency",
          criteria: [{ description: "Routine" }, ["Urgent"]],
        },
      },
    });
    const validated = v1SystemOneSchema.safeParse(request);
    assert.equal(validated.success, true);
    if (validated.success) assert.deepEqual(validated.data, request);
    assert.deepEqual(validateSystemOneRequestBody(request), { ok: true });
  }
});

test("a Noul without instructions or a described outcome is rejected", () => {
  for (const instructions of [undefined, null, 42, false]) {
    const result = validateSystemOneRequestBody(
      body({ questions: { urgent: { type: "noul", instructions } } })
    );
    assert.equal(result.ok, false, `accepted instructions ${String(instructions)}`);
  }
});

test("SDK-compatible criteria can supply the question when instructions are absent or null", () => {
  for (const instructions of [undefined, null]) {
    for (const question of [
      { type: "noul", criteria: { true: "The ticket is urgent" } },
      { type: "noul", criteria: { false: { description: "The ticket can wait" } } },
      { type: "choice", criteria: { billing: "Charges", support: "Bugs" } },
      { type: "score", criteria: ["Routine", "Urgent"] },
    ]) {
      assert.deepEqual(
        validateSystemOneRequestBody(body({ questions: { q: { ...question, instructions } } })),
        { ok: true }
      );
    }
  }
  for (const criteria of [undefined, null, {}, { true: null, false: null }]) {
    assert.equal(
      validateSystemOneRequestBody(body({ questions: { q: { type: "noul", criteria } } })).ok,
      false
    );
  }
});

test("question criteria reject unsupported shapes before dispatch", () => {
  const cases = [
    { type: "noul", criteria: [] },
    { type: "noul", criteria: { yes: "Yes", no: "No" } },
    { type: "noul", criteria: { true: 1, false: "No" } },
    { type: "choice", criteria: { a: true, b: "B" } },
    { type: "choice", criteria: { a: 1 } },
    { type: "score", criteria: ["only one"] },
    { type: "score", criteria: ["low", null] },
    { type: "score", criteria: ["low", 1] },
  ];
  for (const question of cases) {
    const result = validateSystemOneRequestBody(
      body({ questions: { q: { ...question, instructions: "Judge the state" } } })
    );
    assert.equal(result.ok, false, `accepted ${JSON.stringify(question)}`);
  }
  for (const criteria of [
    { true: { description: "Time-sensitive" }, false: ["Routine"] },
    { true: "Yes" },
    { false: null },
    null,
  ]) {
    assert.deepEqual(
      validateSystemOneRequestBody(
        body({
          questions: { q: { type: "noul", instructions: "Is this urgent?", criteria } },
        })
      ),
      { ok: true }
    );
  }
});

test("non-finite nested JSON content is rejected without echoing its values", () => {
  for (const request of [
    body({ state: { amount: Infinity } }),
    body({ questions: { q: { type: "noul", instructions: { amount: Infinity } } } }),
    body({
      questions: { q: { type: "choice", instructions: "Pick", criteria: { a: { amount: NaN } } } },
    }),
  ]) {
    assert.equal(validateSystemOneRequestBody(request).ok, false);
  }
});

test("structured input respects the documented 64-level JSON nesting limit", () => {
  let state: unknown = "ticket";
  for (let depth = 0; depth < 64; depth++) state = [state];
  assert.deepEqual(validateSystemOneRequestBody(body({ state })), { ok: true });
  assert.equal(validateSystemOneRequestBody(body({ state: [state] })).ok, false);
});

test("probability-map values above one are rejected", () => {
  const result = parseSystemOneAnswers({
    answers: { route: { type: "choice", choice: "a", probabilities: { a: 1.1 } } },
  });
  assert.equal(result.ok, false);
});

test("Vercel gateway metadata supplies reported decimal cost including zero", () => {
  for (const [cost, expected] of [
    ["0.00001155", 0.00001155],
    ["0", 0],
  ] as const) {
    const result = parseSystemOneAnswers({
      answers: { q: { type: "noul", noul: 1 } },
      usage: { input_tokens: 275, output_tokens: 20 },
      provider_metadata: { gateway: { cost } },
    });
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.usage.costUsd, expected);
  }
});

test("numeric usage cost takes precedence over gateway metadata cost", () => {
  const result = parseSystemOneAnswers({
    answers: { q: { type: "noul", noul: 1 } },
    usage: { cost: 0 },
    provider_metadata: { gateway: { cost: "0.00001155" } },
  });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.usage.costUsd, 0);
});

test("invalid gateway costs remain unknown instead of becoming known zero", () => {
  for (const cost of [
    "",
    " ",
    "-1",
    "NaN",
    "Infinity",
    "0x10",
    "1e400",
    "9".repeat(400),
    null,
    false,
  ]) {
    const result = parseSystemOneAnswers({
      answers: { q: { type: "noul", noul: 1 } },
      provider_metadata: { gateway: { cost } },
    });
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(result.usage.costUsd, null, `accepted cost ${String(cost)}`);
  }
});

test("response answers must match every requested question and type", () => {
  const request = body({
    questions: {
      urgent: { type: "noul", instructions: "Is urgent?" },
      route: {
        type: "choice",
        instructions: "Pick",
        criteria: { billing: "Charges", support: "Bugs" },
      },
      severity: { type: "score", instructions: "Rate", criteria: ["low", "medium", "high"] },
    },
  });
  const answers = {
    urgent: { type: "noul", noul: 0.9 },
    route: {
      type: "choice",
      choice: "billing",
      probabilities: { billing: 0.8, support: 0.2 },
      confidence: 0.6,
    },
    severity: {
      type: "score",
      score: 1.5,
      legend: { "0": "low", "1": "medium", "2": "high" },
      probabilities: { "0": 0, "1": 0.5, "2": 0.5 },
      confidence: 0.5,
    },
  };
  assert.equal(parseSystemOneAnswers({ answers }, request).ok, true);
  for (const invalidAnswers of [
    { urgent: answers.urgent },
    { ...answers, extra: answers.urgent },
    { ...answers, urgent: { type: "score", score: 1 } },
    { ...answers, route: { ...answers.route, choice: "sales" } },
    { ...answers, route: { ...answers.route, probabilities: { billing: 0.8, sales: 0.2 } } },
    { ...answers, severity: { ...answers.severity, score: 3 } },
    { ...answers, severity: { ...answers.severity, score: -0.1 } },
    { ...answers, severity: { ...answers.severity, probabilities: { "3": 1 } } },
  ]) {
    assert.equal(parseSystemOneAnswers({ answers: invalidAnswers }, request).ok, false);
  }
});

test("parser failures never echo caller-supplied question ids", () => {
  const result = parseSystemOneAnswers({
    answers: { [STATE]: { type: "noul", noul: 2 } },
  });
  assert.equal(result.ok, false);
  if (!result.ok) assert.doesNotMatch(result.detail, /Jane Doe/);
});
