/** Authored text-only contract fixtures from public vendor documentation; no live captures. */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  systemOneBackend,
  resolveSystemOneCandidates,
} from "../../open-sse/config/systemOneRegistry.ts";
import { validateSystemOneBackendBody } from "../../open-sse/services/typesafe/systemOneAnswers.ts";
import { handleSystemOneProxy } from "../../open-sse/handlers/systemOne.ts";
import { systemOneHeaders, systemOneUrl } from "../../open-sse/handlers/systemOneTransport.ts";
const rows = [
  ["liquid", "d1.1", "https://api.liquid.ai/decisions/v1/systemone", null, "Bearer"],
  ["perplexity", "pplx-decider-v1.2", "https://api.perplexity.ai/v1/decisions", null, "Bearer"],
  [
    "inception",
    "mercury-decide",
    "https://api.inceptionlabs.ai/v1/decisions",
    "https://api.inceptionlabs.ai/v1/models",
    "Bearer",
  ],
  [
    "baseten",
    "decision-models/baseten-elephant-9b-latest",
    "https://inference.baseten.co/v1/systemone",
    "https://inference.baseten.co/v1/models",
    "Api-Key",
  ],
  [
    "fireworks",
    "accounts/synthetic/models/synthetic-decision",
    "https://api.fireworks.ai/inference/v1/systemone",
    null,
    "Bearer",
  ],
] as const;
const questions = {
  yes: { type: "noul", instructions: "Synthetic?" },
  pick: { type: "choice", instructions: "Pick", criteria: { a: "A", b: "B" } },
  rank: { type: "score", instructions: "Rank", criteria: ["Low", "High"] },
};
const answers = {
  yes: { type: "noul", noul: 0.8 },
  pick: { type: "choice", choice: "a", probabilities: { a: 0.8, b: 0.2 }, confidence: 0.6 },
  rank: {
    type: "score",
    legend: { "0": "Low", "1": "High" },
    score: 0.2,
    probabilities: { "0": 0.8, "1": 0.2 },
    confidence: 0.6,
  },
};
for (const [provider, model, endpoint, catalog, scheme] of rows) {
  test(`${provider} has only documented native endpoints and preserves exact model identity`, () => {
    const backend = systemOneBackend(provider);
    assert.equal(backend.decisionUrl, endpoint);
    assert.equal(backend.modelsUrl, catalog);
    assert.equal(
      systemOneHeaders(provider, { apiKey: " synthetic-key " }).Authorization,
      `${scheme} synthetic-key`
    );
    assert.equal(resolveSystemOneCandidates(`${provider}/${model}`)[0].model, model);
    if (!catalog) assert.throws(() => systemOneUrl(provider, {}, "models"), { status: 501 });
  });
  test(`${provider} handler transports all three modes once and missing cost remains unknown`, async () => {
    let calls = 0;
    const usage: Record<string, unknown>[] = [];
    const response = await handleSystemOneProxy(
      {
        provider,
        canonicalModel: `${provider}/${model}`,
        credentials: { apiKey: "synthetic-key" },
        body: { model, state: { synthetic: true }, questions },
        requestedModel: `${provider}/${model}`,
      },
      {
        withCapacity: async (_options, _signal, run) => run(),
        fetchSystemOne: async (url, _credentials, init) => {
          calls++;
          assert.equal(url, endpoint);
          assert.equal(new Headers(init.headers).get("authorization"), `${scheme} synthetic-key`);
          assert.deepEqual(JSON.parse(String(init.body)), {
            model,
            state: { synthetic: true },
            questions,
          });
          return Response.json({
            model: provider === "baseten" ? "resolved-vendor-deployment" : model,
            answers,
            usage: { input_tokens: 20, output_tokens: 0 },
          });
        },
        saveCallLog: async () => {},
        saveRequestUsage: async (row) => {
          usage.push(row);
        },
        calculateCost: async () => ({ costUsd: 0, priced: false }),
        recordCost: () => {},
        recordUnpricedCost: () => {},
        markAccountUnavailable: async () => {},
      }
    );
    assert.equal(response.status, 200);
    assert.equal(calls, 1);
    assert.equal(response.headers.get("x-omniroute-cost-status"), "unknown");
    assert.deepEqual((await response.json()).answers, answers);
    assert.equal(usage.length, 1);
  });
}
const body = (model: string, count = 1, criteria: unknown = ["Only"]) => ({
  model,
  state: "synthetic",
  questions: Object.fromEntries(
    Array.from({ length: count }, (_, i) => [
      `q${i}`,
      { type: "score", instructions: "Rank", criteria },
    ])
  ),
});
test("explicit per-provider minima and question caps do not borrow TypeSafe defaults", () => {
  for (const provider of ["perplexity", "inception", "baseten"])
    assert.equal(
      validateSystemOneBackendBody(provider, body(rows.find((r) => r[0] === provider)![1])).ok,
      true
    );
  assert.equal(
    validateSystemOneBackendBody("liquid", body("d1.1")).ok,
    false,
    "undocumented Liquid minimum remains conservative"
  );
  assert.equal(validateSystemOneBackendBody("fireworks", body(rows[4][1])).ok, false);
  assert.equal(
    validateSystemOneBackendBody("perplexity", body("pplx-decider-latest", 129, ["Low", "High"]))
      .ok,
    false
  );
  assert.equal(
    validateSystemOneBackendBody("fireworks", body(rows[4][1], 257, ["Low", "High"])).ok,
    false
  );
  assert.equal(
    validateSystemOneBackendBody("fireworks", {
      ...body(rows[4][1], 1, ["Low", "High"]),
      questions: {
        q: {
          type: "choice",
          instructions: "Pick",
          criteria: Object.fromEntries(Array.from({ length: 209 }, (_, i) => [`v${i}`, "V"])),
        },
      },
    }).ok,
    false
  );
});
test("Baseten aggregate option and character guards reject before any physical request", () => {
  assert.equal(
    validateSystemOneBackendBody("baseten", body(rows[3][1], 256, ["Low", "High"])).ok,
    true
  );
  assert.equal(
    validateSystemOneBackendBody("baseten", body(rows[3][1], 257, ["Low", "High"])).ok,
    false
  );
  assert.equal(
    validateSystemOneBackendBody("baseten", {
      ...body(rows[3][1], 1, ["Low", "High"]),
      state: "s".repeat(50001),
    }).ok,
    false
  );
});
test("closed hosted native identities and Fireworks account paths reject chat substitutes", () => {
  for (const [provider] of rows)
    assert.throws(() => resolveSystemOneCandidates(`${provider}/ordinary-chat`));
});
test("backend question extensions stay rejected and Fireworks requires plain instructions", () => {
  assert.equal(
    validateSystemOneBackendBody("fireworks", {
      ...body(rows[4][1], 1, ["Low", "High"]),
      questions: { q: { type: "noul", instructions: { unsupported: "structured" } } },
    }).ok,
    false
  );
  for (const [provider, model] of rows)
    assert.equal(
      validateSystemOneBackendBody(provider, { ...body(model, 1, ["Low", "High"]), images: [] }).ok,
      false
    );
});

for (const [provider, model] of rows) {
  for (const status of [401, 403, 429]) {
    test(`${provider} ${status} stops after its single native request with unknown cost`, async () => {
      const { dispatchSystemOne } = await import("../../src/app/api/v1/systemone/dispatch.ts");
      let calls = 0,
        selections = 0;
      const usage: Record<string, unknown>[] = [];
      const response = await dispatchSystemOne(
        {
          candidates: resolveSystemOneCandidates(`${provider}/${model}`),
          requestedModel: `${provider}/${model}`,
          body: { model, state: "synthetic", questions },
        },
        {
          authorizeAttempt: async () => null,
          selectCredentials: async () => {
            selections++;
            return { apiKey: "synthetic-key", connectionId: "synthetic-connection" };
          },
          clearRecoveredProviderState: async () => {},
          dispatch: (attempt) =>
            handleSystemOneProxy(attempt, {
              withCapacity: async (_options, _signal, run) => run(),
              fetchSystemOne: async () => {
                calls++;
                return Response.json(
                  {
                    title: status === 429 ? "FreeUsageLimitError" : "AccessDenied",
                    detail: "Synthetic rejection",
                  },
                  { status }
                );
              },
              saveCallLog: async () => {},
              saveRequestUsage: async (row) => {
                usage.push(row);
              },
              calculateCost: async () => {
                throw new Error("An error receipt must never be estimated");
              },
              recordCost: () => {},
              recordUnpricedCost: () => {},
              markAccountUnavailable: async () => {},
            }),
        }
      );
      assert.equal(response.status, status);
      assert.equal(calls, 1);
      assert.equal(selections, 1);
      assert.equal(usage.length, 1);
      assert.equal(response.headers.get("x-omniroute-cost-status"), "unknown");
      if (status === 429)
        assert.equal(response.headers.get("x-omniroute-provider-auth-scope"), "unknown");
    });
  }
  test(`${provider} native unknown USD cannot inherit a same-name chat tariff`, async () => {
    let estimates = 0;
    const response = await handleSystemOneProxy(
      {
        provider,
        canonicalModel: `${provider}/${model}`,
        credentials: { apiKey: "synthetic-key" },
        body: { model, state: "synthetic", questions },
      },
      {
        withCapacity: async (_options, _signal, run) => run(),
        fetchSystemOne: async () =>
          Response.json({ model, answers, usage: { input_tokens: 20, output_tokens: 0 } }),
        saveCallLog: async () => {},
        saveRequestUsage: async () => {},
        recordCost: () => {},
        recordUnpricedCost: () => {},
        markAccountUnavailable: async () => {},
        calculateCost: async () => {
          estimates++;
          return { costUsd: 12, priced: true };
        },
      }
    );
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-omniroute-cost-status"), "unknown");
    assert.equal(estimates, 0);
  });
}
