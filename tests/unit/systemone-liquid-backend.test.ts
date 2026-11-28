/**
 * Liquid AI serves its decisions models (d1, d1.2, d1.2-ultra, ...) natively at
 * https://api.liquid.ai/decisions/v1/systemone, on the same System One wire as
 * TypeSafe: `{ model, state, questions }` in, `{ model, answers, usage }` out,
 * Bearer auth. `liquid/<model>` routes there with the `liquid` connection's key.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  LIQUID_SYSTEMONE_URL,
  resolveSystemOneTarget,
} from "../../open-sse/config/systemOneRegistry.ts";
import { handleSystemOneProxy } from "../../open-sse/handlers/systemOne.ts";

test("liquid/<model> resolves to Liquid's native decisions endpoint", () => {
  assert.equal(LIQUID_SYSTEMONE_URL, "https://api.liquid.ai/decisions/v1/systemone");
  for (const [id, upstreamModel] of [
    ["liquid/d1", "d1"],
    ["liquid/d1.2", "d1.2"],
    [" liquid/d1.2-ultra ", "d1.2-ultra"],
  ]) {
    assert.deepEqual(resolveSystemOneTarget(id), {
      backend: "liquid",
      provider: "liquid",
      upstreamModel,
      upstreamUrl: LIQUID_SYSTEMONE_URL,
    });
  }
});

test("a malformed liquid model id is not a decisions model", () => {
  assert.equal(resolveSystemOneTarget("liquid/"), null);
  assert.equal(resolveSystemOneTarget("liquid/d1 2"), null);
  assert.equal(resolveSystemOneTarget("liquid/../d1"), null);
});

test("the OpenRouter-hosted Liquid models keep the OpenRouter backend", () => {
  const target = resolveSystemOneTarget("openrouter/liquid/d1.2");
  assert.equal(target?.backend, "openrouter");
  assert.equal(target?.upstreamModel, "liquid/d1.2");
});

test("a liquid decision posts the System One wire with the connection key", async () => {
  let captured: { url: string; init: RequestInit } | null = null;
  const upstream = {
    model: "d1.2",
    answers: { is_urgent: { type: "noul", answer: true, probability: 0.97 } },
    usage: { input_tokens: 120, output_tokens: 3 },
  };
  const response = await handleSystemOneProxy({
    path: "/v1/systemone",
    target: resolveSystemOneTarget("liquid/d1.2")!,
    body: {
      model: "liquid/d1.2",
      state: "Help! My payouts have been failing for 3 days.",
      questions: { is_urgent: { type: "noul", instructions: "Does this convey urgency?" } },
    },
    credentials: { apiKey: "liquid-test-key", connectionId: "conn-liquid" },
    fetchImpl: async (url, init) => {
      captured = { url: String(url), init: init! };
      return new Response(JSON.stringify(upstream), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    },
  });

  assert.equal(response.status, 200);
  assert.equal(captured!.url, LIQUID_SYSTEMONE_URL);
  assert.deepEqual(JSON.parse(String(captured!.init.body)), {
    model: "d1.2",
    state: "Help! My payouts have been failing for 3 days.",
    questions: { is_urgent: { type: "noul", instructions: "Does this convey urgency?" } },
  });
  const headers = captured!.init.headers as Record<string, string>;
  assert.equal(headers.Authorization, "Bearer liquid-test-key");
  const body = (await response.json()) as typeof upstream;
  assert.deepEqual(body.answers, upstream.answers);
});
