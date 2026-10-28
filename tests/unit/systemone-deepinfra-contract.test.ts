/** Synthetic contract fixtures derived from official docs, not captured provider responses.
 * https://docs.deepinfra.com/integrations/clef
 * https://docs.deepinfra.com/api-reference/decisions/list-models
 * https://deepinfra.com/Cloudflare/clef/api (Choice2–52, Score2–10,64questions)
 * https://deepinfra.com/nace-ai/drex-max/api
 */
import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-deepinfra-"));
process.env.DATA_DIR = directory;
const { systemOneBackend, resolveSystemOneCandidates } =
  await import("../../open-sse/config/systemOneRegistry.ts");
const { systemOneUrl } = await import("../../open-sse/handlers/systemOneTransport.ts");
const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemOne.ts");
const { handleSystemOneModels } = await import("../../open-sse/handlers/systemOneModels.ts");
const { dispatchSystemOne } = await import("../../src/app/api/v1/systemone/dispatch.ts");
const { parseSystemOneAnswers } =
  await import("../../open-sse/services/typesafe/systemOneAnswers.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
after(() => {
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});
const MODELS = [
  "Cloudflare/clef",
  "Cloudflare/clef-flash",
  "nace-ai/drex-max",
  "nace-ai/drex-v2.0",
];
const questions = {
  lamp: { type: "noul", instructions: "Is the synthetic lamp red?" },
  color: {
    type: "choice",
    instructions: "Which color?",
    criteria: { red: "Red", blue: "Blue", green: "Green" },
  },
  amount: {
    type: "score",
    instructions: "Rate the synthetic amount",
    criteria: ["Low", "Medium", "High"],
  },
};
const answers = {
  lamp: { type: "noul", noul: 0.93 },
  color: {
    type: "choice",
    choice: "red",
    probabilities: { red: 0.88, blue: 0.1, green: 0.02 },
    confidence: 0.88,
  },
  amount: {
    type: "score",
    score: 1.67,
    legend: { "0": "Low", "1": "Medium", "2": "High" },
    probabilities: { "0": 0.04, "1": 0.25, "2": 0.71 },
    confidence: 0.45,
  },
};
const body = (model = MODELS[0]) => ({
  model: `deepinfra/${model}`,
  state: { synthetic: "red lamp" },
  questions: structuredClone(questions),
});

function harness(
  responseFactory: (model: string, signal: AbortSignal) => Response | Promise<Response>
) {
  const calls: { provider: string; model: string; key: string | null | undefined }[] = [];
  const usage: Record<string, unknown>[] = [];
  let selections = 0,
    cooldowns = 0;
  return {
    calls,
    usage,
    counts: () => ({ selections, cooldowns }),
    deps: {
      authorizeAttempt: async () => null,
      selectCredentials: async ({ provider }: { provider: string }) => {
        assert.equal(provider, "deepinfra");
        selections++;
        return {
          apiKey: "synthetic-deepinfra-key",
          connectionId: "synthetic-deepinfra-connection",
        };
      },
      clearRecoveredProviderState: async () => {},
      dispatch: (attempt: import("../../open-sse/handlers/systemOne.ts").SystemOneProxyOptions) =>
        handleSystemOneProxy(attempt, {
          withCapacity: async (_options, _signal, run) => run(),
          fetchSystemOne: async (url, credentials, init) => {
            assert.equal(url, "https://api.deepinfra.com/v1/decisions");
            const wire = JSON.parse(String(init.body));
            assert.equal(
              new Headers(init.headers).get("authorization"),
              "Bearer synthetic-deepinfra-key"
            );
            assert.deepEqual(Object.keys(wire).sort(), ["model", "questions", "state"]);
            calls.push({ provider: attempt.provider, model: wire.model, key: credentials.apiKey });
            return responseFactory(wire.model, init.signal!);
          },
          saveCallLog: async () => {},
          saveRequestUsage: async (row) => {
            usage.push(row);
          },
          recordCost: () => {},
          calculateCost: async () => ({ costUsd: 0, priced: false }),
          markAccountUnavailable: async () => {
            cooldowns++;
          },
        }),
    },
  };
}
async function run(h: ReturnType<typeof harness>, input = body(), signal?: AbortSignal) {
  return dispatchSystemOne(
    {
      candidates: resolveSystemOneCandidates(input.model),
      body: input,
      requestedModel: input.model,
      signal,
    },
    h.deps
  );
}

test("DeepInfra registers its native endpoint and dedicated native model discovery", () => {
  const backend = systemOneBackend("deepinfra");
  assert.equal(backend.decisionUrl, "https://api.deepinfra.com/v1/decisions");
  assert.equal(backend.modelsUrl, "https://api.deepinfra.com/typesafe/v1/models");
  assert.deepEqual(backend.allowedHosts, ["api.deepinfra.com"]);
  assert.equal(backend.requiresKey, true);
  assert.equal(backend.limits.maxChoiceCriteria, 52);
  assert.equal(backend.limits.minCriteria, 2);
});
for (const model of MODELS) {
  test(`native DeepInfra ${model} preserves all three answer modes and confidence scales`, async () => {
    const h = harness((model) =>
      Response.json({ model, answers, usage: { input_tokens: 96, output_tokens: 3 } })
    );
    const response = await run(h, body(model));
    assert.equal(response.status, 200);
    assert.deepEqual((await response.json()).answers, answers);
    assert.deepEqual(h.calls, [{ provider: "deepinfra", model, key: "synthetic-deepinfra-key" }]);
    assert.deepEqual(h.counts(), { selections: 1, cooldowns: 0 });
    assert.equal(h.usage[0].provider, "deepinfra");
    assert.equal(h.usage[0].model, model);
    assert.equal(response.headers.get("x-omniroute-cost-status"), "unknown");
  });
}

for (const count of [1, 53]) {
  test(`DeepInfra refuses ${count} Choice options before credential selection`, async () => {
    const h = harness(() => {
      throw new Error("unexpected request");
    });
    const input = body();
    input.questions.color.criteria = Object.fromEntries(
      Array.from({ length: count }, (_, i) => [String(i), "synthetic"])
    ) as typeof questions.color.criteria;
    const response = await run(h, input);
    assert.equal(response.status, 400);
    assert.deepEqual(h.counts(), { selections: 0, cooldowns: 0 });
    assert.equal(h.calls.length, 0);
  });
}

test("DeepInfra rejects missing instructions, extension fields and image options before dispatch", async () => {
  for (const question of [
    { type: "choice", criteria: { red: "Red", blue: "Blue" } },
    { ...questions.lamp, extension: "unsupported" },
  ]) {
    const h = harness(() => {
      throw new Error("unexpected request");
    });
    const input = { ...body(), questions: { q: question } };
    const response = await run(h, input as ReturnType<typeof body>);
    assert.equal(response.status, 400);
    assert.equal(h.counts().selections, 0);
  }
  const h = harness(() => {
    throw new Error("unexpected image request");
  });
  const withImages = { ...body(), images: ["data:image/png;base64,synthetic"] };
  const imageResponse = await run(h, withImages);
  assert.equal(imageResponse.status, 400);
  assert.equal(h.counts().selections, 0);
});

for (const status of [401, 403, 429]) {
  test(`DeepInfra HTTP${status} stops without rotation or cross-provider fallback`, async () => {
    const h = harness(() => Response.json({ detail: "Synthetic access restriction" }, { status }));
    const response = await run(h);
    assert.equal(response.status, status);
    assert.equal(h.calls.length, 1);
    assert.equal(h.counts().selections, 1);
  });
}

test("DeepInfra native catalog uses its own credential and exposes the four native names", async () => {
  let reads = 0;
  const response = await handleSystemOneModels(
    {},
    {
      listConnections: async () => [
        {
          id: "synthetic-deepinfra-connection",
          provider: "deepinfra",
          apiKey: "synthetic-deepinfra-key",
        },
      ],
      isConnectionUnavailable: () => false,
      fetchSystemOne: async (url, credentials, init) => {
        reads++;
        assert.equal(url, "https://api.deepinfra.com/typesafe/v1/models");
        assert.equal(credentials.apiKey, "synthetic-deepinfra-key");
        assert.equal(
          new Headers(init.headers).get("authorization"),
          "Bearer synthetic-deepinfra-key"
        );
        return Response.json({
          models: MODELS.map((name) => ({
            name,
            description: "Synthetic decision model",
            release_date: "2026-10-27",
          })),
        });
      },
      getPricingForModel: async () => null,
    }
  );
  assert.equal(response.status, 200);
  assert.equal(reads, 1);
  const models = (await response.json()).data;
  assert.deepEqual(
    models.map((row: { id: string }) => row.id),
    MODELS.map((model) => `deepinfra/${model}`)
  );
  assert.ok(models.every((row: { pricing_status: unknown }) => row.pricing_status === "unknown"));
});

test("a DeepInfra key cannot be directed to another provider host", () => {
  assert.throws(() =>
    systemOneUrl("deepinfra", {
      providerSpecificData: { systemOneUrl: "https://openrouter.ai/api/v1/systemone" },
    })
  );
});

test("DeepInfra documented answer type defaults are request-derived and provider-specific", () => {
  const omitted = Object.fromEntries(
    Object.entries(answers).map(([name, answer]) => {
      const { type: _type, ...rest } = answer;
      return [name, rest];
    })
  );
  const response = { model: MODELS[0], answers: omitted };
  const result = parseSystemOneAnswers(response, body(), "deepinfra");
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.answers.lamp.type, "noul");
    assert.equal(result.answers.color.type, "choice");
    assert.equal(result.answers.amount.type, "score");
  }
  assert.equal(parseSystemOneAnswers(response, body(), "typesafe").ok, false);
  assert.equal(parseSystemOneAnswers(response, undefined, "deepinfra").ok, false);
  assert.equal(Object.hasOwn(omitted.lamp, "type"), false, "do not rewrite the upstream wire body");
});

test("DeepInfra explicit refusal is not converted to a selected option or inferred default", () => {
  const result = parseSystemOneAnswers(
    {
      model: MODELS[0],
      answers: { lamp: { type: "refusal" }, color: answers.color, amount: answers.amount },
    },
    body(),
    "deepinfra"
  );
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.answers.lamp.type, "refusal");
});

for (const count of [2, 52]) {
  test(`DeepInfra accepts its documented ${count}-option Choice boundary`, async () => {
    const input = body();
    input.questions.color.criteria = Object.fromEntries(
      Array.from({ length: count }, (_, index) => [String(index), "Synthetic option"])
    ) as typeof questions.color.criteria;
    const { validateSystemOneBackendBody } =
      await import("../../open-sse/services/typesafe/systemOneAnswers.ts");
    assert.equal(
      validateSystemOneBackendBody("deepinfra", { ...input, model: MODELS[0] }).ok,
      true
    );
  });
}

for (const cost of [0, 0.001]) {
  test(`DeepInfra reported cost ${cost} remains known without an invented estimate`, async () => {
    const h = harness((model) =>
      Response.json({ model, answers, usage: { input_tokens: 96, output_tokens: 3, cost } })
    );
    const response = await run(h);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-omniroute-cost-status"), "known");
    assert.equal(Number(response.headers.get("x-omniroute-response-cost")), cost);
    assert.equal((h.usage[0].tokens as Record<string, unknown>).cost_usd, cost);
    assert.equal(h.calls.length, 1);
  });
}

test("DeepInfra cancellation before selection and during dispatch never rotates", async () => {
  for (const preAborted of [true, false]) {
    const controller = new AbortController();
    const h = harness(
      (_model, signal) =>
        new Promise<Response>((_resolve, reject) => {
          signal.addEventListener("abort", () => reject(new Error("synthetic aborted")), {
            once: true,
          });
          setImmediate(() => controller.abort());
        })
    );
    if (preAborted) controller.abort();
    const response = await run(h, body(), controller.signal);
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(response.status, 499);
    assert.equal(h.calls.length, preAborted ? 0 : 1);
    assert.equal(h.counts().selections, preAborted ? 0 : 1);
    assert.equal(h.counts().cooldowns, 0);
  }
});

test("DeepInfra malformed distributions terminate instead of silently choosing or falling back", async () => {
  const h = harness((model) =>
    Response.json({
      model,
      answers: {
        ...answers,
        color: { ...answers.color, probabilities: { red: 0.6, blue: 0.1, green: 0.02 } },
      },
    })
  );
  const response = await run(h);
  assert.equal(response.status, 502);
  assert.equal(h.calls.length, 1);
  assert.equal(h.counts().selections, 1);
});
