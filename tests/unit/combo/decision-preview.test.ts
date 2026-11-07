import assert from "node:assert/strict";
import test from "node:test";
import { buildDecisionPreview } from "../../../src/lib/combos/decisionPreview.ts";
import type { DecisionModelTransport } from "../../../open-sse/services/autoCombo/decisionModelStrategy.ts";

const prices: Record<string, { input: number; output: number }> = {
  "openai/cheap": { input: 1, output: 1 },
  "anthropic/capable": { input: 10, output: 10 },
};
const getPricing = async (provider: string, model: string) => prices[`${provider}/${model}`];
const models = ["openai/cheap", "anthropic/capable", "openai/cheap"];
const decisionModel = {
  baseUrl: "https://decision.invalid",
  model: "router",
  apiKey: "secret-key",
  descriptions: { cheap: "Small and fast" },
};

test("without a prompt the preview returns menu and generated text and makes no call", async () => {
  let calls = 0;
  const result = await buildDecisionPreview(
    { strategy: "decision-openai", models, decisionModel },
    {
      getPricing,
      transport: async () => {
        calls += 1;
        return Response.json({});
      },
    }
  );
  assert.equal(calls, 0);
  assert.deepEqual(result.menu, ["cheap", "capable"]);
  assert.match(result.generated.cheap, /cost rank 1 of 2/);
  assert.match(result.generated.capable, /cost rank 2 of 2/);
  assert.equal(result.test, undefined);
});

test("a prompt runs one decision with operator descriptions and returns the full answer", async () => {
  let sent: { url: string; body: Record<string, unknown>; auth?: string } | undefined;
  const transport: DecisionModelTransport = async (url, init) => {
    sent = { url, body: JSON.parse(init.body), auth: init.headers.Authorization };
    return Response.json({
      model: "backend",
      answers: [
        {
          type: "choice",
          name: "route_model",
          choice: "capable",
          confidence: 0.7,
          probabilities: [
            { value: "capable", probability: 0.75 },
            { value: "cheap", probability: 0.25 },
          ],
        },
      ],
    });
  };
  let clock = 1_000;
  const result = await buildDecisionPreview(
    { strategy: "decision-openai", models, decisionModel, prompt: "Prove this theorem" },
    { getPricing, transport, now: () => (clock += 40) }
  );
  assert.equal(sent?.url, "https://decision.invalid/v1/decisions");
  assert.equal(sent?.auth, "Bearer secret-key");
  const choices = (sent?.body.questions as Array<{ choices: unknown }>)[0].choices;
  assert.deepEqual(choices, [
    { value: "cheap", description: "Small and fast" },
    { value: "capable", description: result.generated.capable },
  ]);
  assert.deepEqual(result.test, {
    status: "selected",
    choice: "capable",
    refused: false,
    confidence: 0.7,
    probabilities: { capable: 0.75, cheap: 0.25 },
    backendModel: "backend",
    latencyMs: 40,
  });
});

test("out-of-menu answers are reported as unusable", async () => {
  const result = await buildDecisionPreview(
    { strategy: "decision-systemone", models, decisionModel, prompt: "Hi" },
    {
      getPricing,
      transport: async () =>
        Response.json({ answers: { route_model: { type: "choice", choice: "other" } } }),
    }
  );
  assert.equal(result.test?.status, "unusable");
});

test("skips without enough models or configuration and redacts failures", async () => {
  const saved = [
    process.env.OMNIROUTE_OPENAI_DECISION_BASE_URL,
    process.env.OMNIROUTE_OPENAI_DECISION_MODEL,
  ];
  delete process.env.OMNIROUTE_OPENAI_DECISION_BASE_URL;
  delete process.env.OMNIROUTE_OPENAI_DECISION_MODEL;
  try {
    const single = await buildDecisionPreview(
      { strategy: "decision-openai", models: ["openai/cheap"], decisionModel, prompt: "Hi" },
      { getPricing }
    );
    assert.deepEqual(single.test, {
      status: "skipped",
      reason: "at least two distinct models are needed",
    });
    const unconfigured = await buildDecisionPreview(
      { strategy: "decision-openai", models, prompt: "Hi" },
      { getPricing }
    );
    assert.equal(unconfigured.test?.status, "skipped");
    const failed = await buildDecisionPreview(
      { strategy: "decision-openai", models, decisionModel, prompt: "Hi" },
      {
        getPricing,
        transport: async () => new Response("secret-key upstream body", { status: 502 }),
      }
    );
    assert.deepEqual(failed.test, { status: "failed", reason: "HTTP 502" });
  } finally {
    if (saved[0] !== undefined) process.env.OMNIROUTE_OPENAI_DECISION_BASE_URL = saved[0];
    if (saved[1] !== undefined) process.env.OMNIROUTE_OPENAI_DECISION_MODEL = saved[1];
  }
});
