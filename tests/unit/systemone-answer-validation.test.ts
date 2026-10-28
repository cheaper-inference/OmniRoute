import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSystemOneAnswers } from "../../open-sse/services/typesafe/systemOneAnswers.ts";
import {
  handleSystemOneProxy,
  type SystemOneProxyDeps,
} from "../../open-sse/handlers/systemOne.ts";

const questions = {
  route: { type: "choice", instructions: "Route", criteria: { billing: null, support: null } },
  severity: { type: "score", instructions: "Rate", criteria: ["low", "medium", "high"] },
};
const answers = {
  route: {
    type: "choice",
    choice: "billing",
    probabilities: { billing: 0.8, support: 0.2 },
    confidence: 0.6,
  },
  severity: {
    type: "score",
    score: 1.5,
    probabilities: { "0": 0, "1": 0.5, "2": 0.5 },
    legend: { "0": "low", "1": "medium", "2": "high" },
    confidence: 0.5,
  },
};
const request = { model: "typesafe/jev-1.13", state: "private fixture state", questions };
const usage = { input_tokens: 10, output_tokens: 2, cost: 0.001 };

const malformed: [string, string, Record<string, unknown>][] = [
  ["missing choice probabilities", "route", { ...answers.route, probabilities: undefined }],
  ["null choice probabilities", "route", { ...answers.route, probabilities: null }],
  ["empty choice probabilities", "route", { ...answers.route, probabilities: {} }],
  ["missing choice confidence", "route", { ...answers.route, confidence: undefined }],
  ["null choice confidence", "route", { ...answers.route, confidence: null }],
  ["missing score probabilities", "severity", { ...answers.severity, probabilities: undefined }],
  ["missing score confidence", "severity", { ...answers.severity, confidence: undefined }],
  ["missing score legend", "severity", { ...answers.severity, legend: undefined }],
  ["null score legend", "severity", { ...answers.severity, legend: null }],
  ["empty score legend", "severity", { ...answers.severity, legend: {} }],
  ["incomplete choice distribution", "route", { ...answers.route, probabilities: { billing: 1 } }],
  [
    "incomplete score distribution",
    "severity",
    { ...answers.severity, probabilities: { "1": 0.5, "2": 0.5 } },
  ],
  [
    "zero probability mass",
    "route",
    { ...answers.route, probabilities: { billing: 0, support: 0 } },
  ],
  [
    "too little probability mass",
    "route",
    { ...answers.route, probabilities: { billing: 0.5, support: 0.2 } },
  ],
  [
    "too much probability mass",
    "severity",
    { ...answers.severity, probabilities: { "0": 0, "1": 0.8, "2": 0.8 } },
  ],
  ["choice absent from distribution", "route", { ...answers.route, probabilities: { support: 1 } }],
  ["choice is not highest probability", "route", { ...answers.route, choice: "support" }],
  [
    "choice outside requested options",
    "route",
    { ...answers.route, choice: "other", probabilities: { other: 1 } },
  ],
  [
    "noncanonical score index",
    "severity",
    { ...answers.severity, probabilities: { "0": 0, "01": 0.5, "2": 0.5 } },
  ],
  ["score outside rubric", "severity", { ...answers.severity, score: 3 }],
  ["negative score", "severity", { ...answers.severity, score: -0.1 }],
  ["incomplete legend", "severity", { ...answers.severity, legend: { "0": "low", "1": "medium" } }],
  [
    "extra legend level",
    "severity",
    { ...answers.severity, legend: { ...answers.severity.legend, "3": "other" } },
  ],
  [
    "invalid legend description",
    "severity",
    { ...answers.severity, legend: { ...answers.severity.legend, "1": 42 } },
  ],
];

for (const [name, id, answer] of malformed) {
  test("rejects " + name, () => {
    const result = parseSystemOneAnswers(
      { model: request.model, answers: { ...answers, [id]: answer }, usage },
      request
    );
    assert.equal(result.ok, false);
    if (!result.ok) {
      assert.equal(result.reason, "invalid_response");
      assert.doesNotMatch(result.detail, /private fixture state|billing|medium/);
    }
  });
}

test("choice selection and score rubric are validated even without the request", () => {
  for (const answer of [
    { ...answers.route, choice: "other" },
    { ...answers.route, choice: "support" },
    { ...answers.severity, score: -1 },
    { ...answers.severity, score: 3 },
  ]) {
    assert.equal(parseSystemOneAnswers({ answers: { q: answer } }).ok, false);
  }
});

test("rounded distributions, ties, fractional scores and SDK structured legends are preserved", () => {
  const rounded = {
    route: { ...answers.route, choice: "support", probabilities: { billing: 0.5, support: 0.5 } },
    severity: {
      ...answers.severity,
      score: 1.01,
      probabilities: { "0": 0.3333333, "1": 0.3333333, "2": 0.3333333 },
      legend: { "0": { description: "low" }, "1": ["medium"], "2": null },
    },
  };
  const result = parseSystemOneAnswers({ answers: rounded }, request);
  assert.equal(result.ok, true);
  if (result.ok) assert.deepEqual(result.answers, rounded);
});

test("choice labels that coincide with object properties remain ordinary options", () => {
  const probabilities = JSON.parse('{"__proto__":0.8,"constructor":0.2}');
  const result = parseSystemOneAnswers(
    { answers: { route: { ...answers.route, choice: "__proto__", probabilities } } },
    {
      questions: {
        route: { type: "choice", criteria: JSON.parse('{"__proto__":null,"constructor":null}') },
      },
    }
  );
  assert.equal(result.ok, true);
  if (result.ok) assert.deepEqual(result.answers.route.probabilities, probabilities);
});

test("malformed successful answers return a controlled 502 before successful accounting", async () => {
  for (const [name, id, answer] of malformed) {
    const logs: Record<string, unknown>[] = [];
    const payload = { model: request.model, answers: { ...answers, [id]: answer }, usage };
    let usageWrites = 0;
    let costWrites = 0;
    let cooldowns = 0;
    let costCalculations = 0;
    const deps: SystemOneProxyDeps = {
      withCapacity: async (_options, _signal, run) => run(),
      generateRequestId: () => "validation-fixture",
      fetchSystemOne: async () => Response.json(payload),
      saveCallLog: async (entry) => {
        logs.push(entry as Record<string, unknown>);
      },
      saveRequestUsage: async (entry) => {
        assert.equal(entry.success, false);
        usageWrites++;
      },
      recordCost: () => {
        costWrites++;
      },
      markAccountUnavailable: async () => {
        cooldowns++;
      },
      calculateCost: async () => {
        costCalculations++;
        return { costUsd: 0, priced: false };
      },
    };
    const response = await handleSystemOneProxy(
      {
        provider: "openrouter",
        body: request,
        canonicalModel: "openrouter/typesafe/jev-1.13",
        tier: "paid",
        credentials: { apiKey: "fixture-key", connectionId: "fixture-connection" },
      },
      deps
    );
    assert.equal(response.status, 502, name);
    const responseBody = await response.json();
    assert.equal(responseBody.error.code, "upstream_protocol_error", name);
    assert.doesNotMatch(JSON.stringify(responseBody), /private fixture state|fixture-key/);
    assert.equal(logs.length, 1, name);
    assert.equal(logs[0].status, 502, name);
    assert.equal(usageWrites, 1, name);
    assert.equal(costWrites, 0, name);
    assert.equal(cooldowns, 0, name);
    assert.equal(costCalculations, 0, name);
  }
});
