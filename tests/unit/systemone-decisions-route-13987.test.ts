/**
 * #13987 — System One decisions route.
 *
 * Pure dispatch tests for resolveSystemOneTarget (backend selection by model
 * id) plus proxy behavior with an injected fetch: model rewrite, usage/cost
 * logging fields, and upstream error passthrough.
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  OPENROUTER_DECISIONS_URL,
  resolveSystemOneTarget,
  TYPESAFE_SYSTEMONE_URL,
} from "../../open-sse/config/systemOneRegistry.ts";
import { handleSystemOneProxy } from "../../open-sse/handlers/systemOne.ts";

// ─── resolveSystemOneTarget ────────────────────────────────────────────────

test("#13987: a bare jev alias routes natively to api.typesafe.ai", () => {
  const target = resolveSystemOneTarget("jev-latest");
  assert.equal(target?.backend, "typesafe");
  assert.equal(target?.upstreamModel, "jev-latest");
  assert.equal(target?.upstreamUrl, TYPESAFE_SYSTEMONE_URL);
});

test("#13987: a missing model defaults to the native Jev alias", () => {
  const target = resolveSystemOneTarget(undefined);
  assert.equal(target?.backend, "typesafe");
  assert.equal(target?.upstreamModel, "jev-latest");
});

test("#13987: typesafe-prefixed ids strip the prefix for the native API", () => {
  const target = resolveSystemOneTarget("typesafe/jev-1.13");
  assert.equal(target?.provider, "typesafe");
  assert.equal(target?.upstreamModel, "jev-1.13");
  assert.equal(target?.upstreamUrl, TYPESAFE_SYSTEMONE_URL);
});

test("#13987: versioned jev aliases are forwarded even when unadvertised", () => {
  for (const id of ["jev-1.13", "jev-1.14", "jev-preview"]) {
    const target = resolveSystemOneTarget(id);
    assert.equal(target?.backend, "typesafe", id);
    assert.equal(target?.upstreamModel, id);
  }
});

test("#13987: openrouter-prefixed ids route to the alpha decisions endpoint", () => {
  const target = resolveSystemOneTarget("openrouter/typesafe/jev-1.13");
  assert.equal(target?.backend, "openrouter");
  assert.equal(target?.provider, "openrouter");
  assert.equal(target?.upstreamModel, "typesafe/jev-1.13");
  assert.equal(target?.upstreamUrl, OPENROUTER_DECISIONS_URL);
});

test("#13987: any OpenRouter vendor id (with colon suffixes) is forwarded verbatim", () => {
  const target = resolveSystemOneTarget("openrouter/inception/mercury-decide:free");
  assert.equal(target?.backend, "openrouter");
  assert.equal(target?.upstreamModel, "inception/mercury-decide:free");
});

test("#13987: chat model ids are not decisions models", () => {
  assert.equal(resolveSystemOneTarget("openai/gpt-6"), null);
  assert.equal(resolveSystemOneTarget("anthropic/claude-opus-5"), null);
});

// ─── handleSystemOneProxy (injected fetch) ─────────────────────────────────

function jsonResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("#13987: rewrites the model and passes answers/usage through untouched", async () => {
  let captured: { url: string; init: RequestInit } | null = null;
  const upstream = {
    model: "typesafe/jev-1.14-20261014",
    answers: { risk: { type: "choice", choice: "low", confidence: 1 } },
    usage: { input_tokens: 320, output_tokens: 31, cost: 0.00001344 },
    id: "gen-dec-1",
    provider: "TypeSafe",
  };
  const response = await handleSystemOneProxy({
    path: "/v1/decisions",
    target: resolveSystemOneTarget("openrouter/typesafe/jev-1.14")!,
    body: { model: "openrouter/typesafe/jev-1.14", state: "s", questions: { q: {} } },
    credentials: { apiKey: "test-key", connectionId: "conn-1" },
    fetchImpl: async (url, init) => {
      captured = { url: String(url), init: init! };
      return jsonResponse(200, upstream);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(captured!.url, OPENROUTER_DECISIONS_URL);
  const sentBody = JSON.parse(String(captured!.init.body));
  assert.equal(sentBody.model, "typesafe/jev-1.14");
  assert.equal(sentBody.state, "s");
  assert.deepEqual(Object.keys(sentBody.questions), ["q"]);
  const sentHeaders = captured!.init.headers as Record<string, string>;
  assert.match(sentHeaders.Authorization, /Bearer test-key/);

  const echoed = (await response.json()) as typeof upstream;
  assert.deepEqual(echoed.answers, upstream.answers);
  assert.equal(echoed.usage.cost, upstream.usage.cost);
  // answered model is the upstream-reported versioned id
  assert.match(response.headers.get("x-omniroute-model") ?? "", /jev-1\.14/);
});

test("#13987: surfaces upstream error payloads with their status", async () => {
  const response = await handleSystemOneProxy({
    path: "/v1/systemone",
    target: resolveSystemOneTarget("typesafe/jev-latest")!,
    body: { state: "s", questions: { q: {} } },
    credentials: { apiKey: "k" },
    fetchImpl: async () =>
      jsonResponse(429, { error: { message: "Rate limited on decisions endpoint" } }),
  });
  assert.equal(response.status, 429);
  const payload = (await response.json()) as { error: { message: string } };
  assert.match(payload.error.message, /Rate limited/);
});

test("#13987: missing credentials 401 without calling upstream", async () => {
  let called = false;
  const response = await handleSystemOneProxy({
    path: "/v1/systemone",
    target: resolveSystemOneTarget("jev-latest")!,
    body: { state: "s", questions: { q: {} } },
    credentials: { apiKey: null },
    fetchImpl: async () => {
      called = true;
      return jsonResponse(200, {});
    },
  });
  assert.equal(response.status, 401);
  assert.equal(called, false);
});
