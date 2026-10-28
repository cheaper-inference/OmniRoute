/** Synthetic official-contract fixtures, not captured live OpenAI responses. */
import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-openai-"));
process.env.DATA_DIR = directory;
const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemOne.ts");
const { resolveSystemOneCandidates } = await import("../../open-sse/config/systemOneRegistry.ts");
const { systemOneUrl } = await import("../../open-sse/handlers/systemOneTransport.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { dispatchSystemOne } = await import("../../src/app/api/v1/systemone/dispatch.ts");
const { validateSystemOneBackendBody } =
  await import("../../open-sse/services/typesafe/systemOneAnswers.ts");
after(() => {
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

const PRIVATE_STATE = "Synthetic private statement not for logs";
const KEY = "fixture-openai-key";
const body = {
  model: "gpt-6-luna",
  state: PRIVATE_STATE,
  questions: {
    lamp: { type: "noul", instructions: "Is the lamp on?" },
    color: { type: "choice", instructions: "Which color?", criteria: { red: "Red", blue: null } },
    amount: { type: "score", instructions: "Rate the amount", criteria: ["Low", "High"] },
  },
};
function upstream() {
  return {
    model: "gpt-6-luna",
    answers: [
      { name: "lamp", type: "predicate", probability: 0.97 },
      {
        name: "color",
        type: "choice",
        choice: "red",
        confidence: 1,
        probabilities: [
          { value: "red", probability: 1 },
          { value: "blue", probability: 0 },
        ],
      },
      {
        name: "amount",
        type: "score",
        score: 0.5,
        confidence: 0,
        probabilities: [
          { value: 0, label: "Low", probability: 0.5 },
          { value: 1, label: "High", probability: 0.5 },
        ],
      },
    ],
    usage: { input_tokens: 31, output_tokens: 4 },
  };
}
function options(patch: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    body,
    canonicalModel: "openai/gpt-6-luna",
    requestedModel: "openai/gpt-6-luna",
    credentials: { connectionId: "fixture-openai-connection", apiKey: KEY },
    apiKeyInfo: { id: "fixture-client-key", name: "fixture client" },
    ...patch,
  };
}
function harness(response: unknown = upstream(), status = 200) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const logs: Record<string, unknown>[] = [];
  const usage: Record<string, unknown>[] = [];
  const costs: number[] = [];
  const unpriced: string[] = [];
  const cooldowns: unknown[][] = [];
  let admissions = 0;
  const deps = {
    withCapacity: async (_options: unknown, _signal: AbortSignal, run: () => Promise<Response>) => {
      admissions++;
      return run();
    },
    fetchSystemOne: async (url: string, _credentials: unknown, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(JSON.stringify(response), {
        status,
        headers: { "content-type": "application/json" },
      });
    },
    saveCallLog: async (entry: Record<string, unknown>) => {
      logs.push(entry);
    },
    saveRequestUsage: async (entry: Record<string, unknown>) => {
      usage.push(entry);
    },
    recordCost: (_key: string, cost: number) => {
      costs.push(cost);
    },
    recordUnpricedCost: (key: string) => {
      unpriced.push(key);
    },
    calculateCost: async () => ({ costUsd: 0, priced: false }),
    markAccountUnavailable: async (...args: unknown[]) => {
      cooldowns.push(args);
    },
  };
  return { deps, calls, logs, usage, costs, unpriced, cooldowns, admissions: () => admissions };
}

test("actual native proxy sends OpenAI format once and returns canonical modes with unknown cost", async () => {
  const h = harness();
  const result = await handleSystemOneProxy(options(), h.deps);
  assert.equal(result.status, 200);
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].url, "https://api.openai.com/v1/decisions");
  const sent = JSON.parse(String(h.calls[0].init.body));
  assert.equal(sent.input, PRIVATE_STATE);
  assert.equal(sent.state, undefined);
  assert.equal(sent.questions[0].type, "predicate");
  assert.equal(sent.questions[1].choices[0].value, "red");
  assert.equal(sent.questions[2].levels[1].label, "High");
  assert.equal(new Headers(h.calls[0].init.headers).get("authorization"), `Bearer ${KEY}`);
  const response = await result.json();
  assert.equal(response.model, "gpt-6-luna");
  assert.deepEqual(response.answers.lamp, { type: "noul", noul: 0.97 });
  assert.equal(response.answers.amount.score, 0.5);
  assert.equal(response.answers.amount.confidence, 0);
  assert.equal(result.headers.get("x-omniroute-cost-status"), "unknown");
  assert.equal(result.headers.get("x-omniroute-response-cost"), null);
  assert.equal(h.usage.length, 1);
  assert.equal(h.logs.length, 1);
  assert.equal(h.unpriced.length, 1);
  assert.equal(h.costs.length, 0);
  assert.equal(h.usage[0].provider, "openai");
  assert.equal(h.usage[0].model, "gpt-6-luna");
  assert.equal((h.usage[0].tokens as Record<string, unknown>).cost_usd, undefined);
  assert.doesNotMatch(
    JSON.stringify({ logs: h.logs, usage: h.usage }),
    /fixture-openai-key|Synthetic private statement/
  );
});

test("mixed refusal is returned and counted once without executing a replacement", async () => {
  const raw = upstream();
  const h = harness({
    ...raw,
    answers: [raw.answers[0], { type: "refusal", name: "color" }, raw.answers[2]],
  });
  const result = await handleSystemOneProxy(options(), h.deps);
  assert.equal(result.status, 200);
  const response = await result.json();
  assert.deepEqual(response.answers.color, { type: "refusal" });
  assert.equal(response.answers.lamp.noul, 0.97);
  assert.equal(h.calls.length, 1);
  assert.equal(h.usage.length, 1);
  assert.equal(h.unpriced.length, 1);
});

test("invalid model and unsupported request controls cause zero admissions or provider calls", async () => {
  for (const patch of [
    { model: "gpt-6" },
    { model: "openai/gpt-6-luna-decisions" },
    { temperature: 0 },
  ]) {
    const h = harness();
    const result = await handleSystemOneProxy(options({ body: { ...body, ...patch } }), h.deps);
    assert.equal(result.status, 400);
    assert.equal(h.admissions(), 0);
    assert.equal(h.calls.length, 0);
    assert.equal(h.usage.length, 0);
    assert.equal(h.costs.length, 0);
  }
});

test("malformed or substituted upstream answers preserve billed usage once and never succeed", async () => {
  for (const raw of [
    { ...upstream(), model: "gpt-6" },
    { ...upstream(), answers: { lamp: { type: "noul", noul: 0.9 } } },
    { ...upstream(), answers: [] },
    { ...upstream(), answers: [{ name: "lamp", type: "predicate", probability: 4 }] },
  ]) {
    const h = harness(raw);
    const result = await handleSystemOneProxy(options(), h.deps);
    assert.equal(result.status, 502);
    assert.equal(h.calls.length, 1);
    assert.equal(h.usage.length, 1);
    assert.equal(h.logs.length, 1);
    assert.equal(h.costs.length, 0);
    assert.equal(h.unpriced.length, 1);
    assert.deepEqual(h.logs[0].tokens, { prompt_tokens: 31, completion_tokens: 4 });
    assert.doesNotMatch(await result.text(), /Synthetic private statement|fixture-openai-key/);
  }
});

for (const status of [401, 403, 429]) {
  test(`upstream ${status} stops without retry, rotation or fabricated charge`, async () => {
    const h = harness(
      { error: { message: "Synthetic access restriction", type: "fixture_error" } },
      status
    );
    const result = await handleSystemOneProxy(options(), h.deps);
    assert.equal(result.status, status);
    assert.equal(h.calls.length, 1);
    assert.equal(h.usage.length, 1);
    assert.equal(h.costs.length, 0);
    assert.equal(h.unpriced.length, 1);
  });
}

test("authorization changes while queued prevent provider dispatch", async () => {
  const h = harness();
  const result = await handleSystemOneProxy(
    options({
      authorizeDispatch: async () => new Response("denied", { status: 403 }),
    }),
    h.deps
  );
  assert.equal(result.status, 403);
  assert.equal(h.calls.length, 0);
  assert.equal(h.usage.length, 0);
});

test("pre-cancellation prevents a call; cancellation during a physical attempt records unknown once", async () => {
  const cancelled = new AbortController();
  cancelled.abort();
  const h = harness();
  const before = await handleSystemOneProxy(options({ signal: cancelled.signal }), h.deps);
  assert.equal(before.status, 499);
  assert.equal(h.calls.length, 0);
  assert.equal(h.usage.length, 0);
  const running = new AbortController();
  const next = harness();
  const during = await handleSystemOneProxy(options({ signal: running.signal }), {
    ...next.deps,
    fetchSystemOne: async (...args) => {
      await next.deps.fetchSystemOne(...args);
      running.abort();
      throw running.signal.reason;
    },
  });
  assert.equal(during.status, 499);
  assert.equal(next.calls.length, 1);
  assert.equal(next.usage.length, 1);
  assert.equal(next.unpriced.length, 1);
  assert.equal(next.costs.length, 0);
});

test("only exact provider-qualified OpenAI targets resolve and destinations remain allowlisted", () => {
  const candidates = resolveSystemOneCandidates("openai/gpt-6-luna");
  assert.equal(candidates.length, 1);
  assert.equal(candidates[0].pinned, true);
  assert.equal(candidates[0].canonicalModel, "openai/gpt-6-luna");
  assert.throws(() => resolveSystemOneCandidates("openai/gpt-6"));
  assert.throws(() => resolveSystemOneCandidates("openai/openai/gpt-6-luna-decisions"));
  assert.throws(() =>
    systemOneUrl("openai", {
      providerSpecificData: { systemOneUrl: "https://untrusted.example/v1/decisions" },
    })
  );
});

test("actual candidate dispatcher cannot retry or rotate an OpenAI access denial", async () => {
  for (const status of [401, 403, 429]) {
    const h = harness({ error: { message: "Fixture restriction" } }, status);
    let selections = 0;
    const result = await dispatchSystemOne(
      {
        body,
        candidates: resolveSystemOneCandidates("openai/gpt-6-luna"),
        requestedModel: "openai/gpt-6-luna",
      },
      {
        selectCredentials: async () => {
          selections++;
          return { connectionId: "fixture-openai-connection", apiKey: KEY };
        },
        dispatch: (options) => handleSystemOneProxy(options, h.deps),
        clearRecoveredProviderState: async () => null,
        validateRoutingTarget: async () => null,
        validateBackendBody: validateSystemOneBackendBody,
        authorizeAttempt: async () => null,
      }
    );
    assert.equal(result.status, status);
    assert.equal(selections, 1);
    assert.equal(h.calls.length, 1);
  }
});

test("OpenAI native billing never borrows the same model's ordinary chat tariff", async () => {
  const h = harness();
  let genericPrices = 0;
  const result = await handleSystemOneProxy(options(), {
    ...h.deps,
    calculateCost: async () => {
      genericPrices++;
      return { costUsd: 0.15, priced: true };
    },
  });
  assert.equal(result.status, 200);
  assert.equal(genericPrices, 0);
  assert.equal(result.headers.get("x-omniroute-cost-status"), "unknown");
  assert.equal(h.costs.length, 0);
  assert.equal(h.unpriced.length, 1);
});

test("an explicit upstream zero remains known instead of becoming an unknown or chat estimate", async () => {
  const raw = upstream();
  const h = harness({ ...raw, usage: { ...raw.usage, cost: 0 } });
  const result = await handleSystemOneProxy(options(), h.deps);
  assert.equal(result.status, 200);
  assert.equal(result.headers.get("x-omniroute-cost-status"), "known");
  assert.deepEqual(h.costs, [0]);
  assert.equal(h.unpriced.length, 0);
});
