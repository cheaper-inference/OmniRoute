/**
 * System One on Cloudflare Workers AI — a third systemOneRegistry backend.
 *
 * Cloudflare serves TypeSafe Jev (`typesafe/jev`, billed to AI Gateway credits)
 * and its own Clef models (`clef`, `clef-flash`, billed to Workers AI neurons)
 * behind the existing `cloudflare-ai` connection. The public contract stays
 * POST /v1/systemone; only the wire to Cloudflare differs.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveSystemOneTarget } from "../../open-sse/config/systemOneRegistry.ts";
import { handleSystemOneProxy } from "../../open-sse/handlers/systemOne.ts";

const ACCOUNT = "0123456789abcdef0123456789abcdef";
const RUN_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/ai/run`;
const ANSWERS = { risk: { type: "choice", choice: "low", confidence: 0.9 } };

function jsonResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

type Captured = { url: string; body: Record<string, unknown>; headers: Record<string, string> };

async function call(model: string, upstream: Response, accountId: unknown = ACCOUNT) {
  // Callers pass null (not undefined) to simulate a connection without an account id.
  const captured: Captured[] = [];
  const response = await handleSystemOneProxy({
    path: "/v1/systemone",
    target: resolveSystemOneTarget(model)!,
    body: { model, state: "s", questions: { risk: { type: "choice", choices: ["low", "high"] } } },
    credentials: {
      apiKey: "cf-test-token",
      connectionId: "c1",
      providerSpecificData: { accountId },
    },
    requestedModel: model,
    fetchImpl: async (url, init) => {
      captured.push({
        url: String(url),
        body: JSON.parse(String(init!.body)),
        headers: init!.headers as Record<string, string>,
      });
      return upstream;
    },
  });
  return { response, captured };
}

test("cloudflare: provider-prefixed and cf/ ids resolve to the cloudflare-ai backend", () => {
  for (const id of ["cloudflare-ai/jev", "cf/jev"]) {
    const target = resolveSystemOneTarget(id);
    assert.equal(target?.backend, "cloudflare", id);
    assert.equal(target?.provider, "cloudflare-ai", id);
    assert.equal(target?.upstreamModel, "typesafe/jev", id);
  }
  assert.equal(resolveSystemOneTarget("cloudflare-ai/clef")?.upstreamModel, "clef");
  assert.equal(resolveSystemOneTarget("cf/clef-flash")?.upstreamModel, "clef-flash");
});

test("cloudflare: only allow-listed models resolve (ids reach the URL path)", () => {
  for (const id of [
    "cloudflare-ai/llama-3.1-8b",
    "cloudflare-ai/../clef",
    "cf/clef/../../x",
    "cloudflare-ai/",
    "cf/CLEF",
  ]) {
    assert.equal(resolveSystemOneTarget(id), null, id);
  }
});

test("cloudflare: existing typesafe and openrouter resolution is unchanged", () => {
  assert.equal(resolveSystemOneTarget("jev-latest")?.backend, "typesafe");
  assert.equal(resolveSystemOneTarget("typesafe/jev-1.13")?.backend, "typesafe");
  assert.equal(resolveSystemOneTarget("openrouter/typesafe/jev-1.13")?.backend, "openrouter");
  assert.equal(resolveSystemOneTarget("openai/gpt-6"), null);
});

test("cloudflare: Jev posts an input-wrapped body to /ai/run and unwraps the double result", async () => {
  const { response, captured } = await call(
    "cloudflare-ai/jev",
    jsonResponse(200, {
      result: {
        state: "Completed",
        result: {
          model: "jev-1.13.0",
          answers: ANSWERS,
          usage: { input_tokens: 367, output_tokens: 61 },
        },
      },
      success: true,
      errors: [],
      messages: [],
    })
  );
  assert.equal(response.status, 200);
  assert.equal(captured.length, 1);
  assert.equal(captured[0].url, RUN_BASE);
  assert.deepEqual(captured[0].body, {
    model: "typesafe/jev",
    input: { state: "s", questions: { risk: { type: "choice", choices: ["low", "high"] } } },
  });
  assert.equal(captured[0].headers.Authorization, "Bearer cf-test-token");
  const payload = (await response.json()) as Record<string, unknown>;
  assert.deepEqual(payload, {
    model: "jev-1.13.0",
    answers: ANSWERS,
    usage: { input_tokens: 367, output_tokens: 61 },
  });
  assert.match(response.headers.get("x-omniroute-model") ?? "", /jev-1\.13\.0/);
});

test("cloudflare: Clef posts a flat body to /ai/run/@cf/cloudflare/<model>", async () => {
  for (const model of ["clef", "clef-flash"]) {
    const { response, captured } = await call(
      `cloudflare-ai/${model}`,
      jsonResponse(200, {
        result: { model, answers: ANSWERS, usage: { input_tokens: 297, output_tokens: 0 } },
        success: true,
        errors: [],
        messages: [],
      })
    );
    assert.equal(response.status, 200, model);
    assert.equal(captured[0].url, `${RUN_BASE}/@cf/cloudflare/${model}`);
    assert.deepEqual(captured[0].body, {
      model,
      state: "s",
      questions: { risk: { type: "choice", choices: ["low", "high"] } },
    });
    const payload = (await response.json()) as { model: string; answers: unknown };
    assert.equal(payload.model, model);
    assert.deepEqual(payload.answers, ANSWERS);
  }
});

test("cloudflare: an invalid or missing account id is refused without an upstream call", async () => {
  for (const accountId of [null, "", "../x", ACCOUNT.toUpperCase(), "abc", `${ACCOUNT}0`]) {
    const { response, captured } = await call("cf/clef", jsonResponse(200, {}), accountId);
    assert.equal(response.status, 400, String(accountId));
    assert.equal(captured.length, 0, String(accountId));
    const text = await response.text();
    assert.doesNotMatch(text, /cf-test-token/);
    if (typeof accountId === "string" && accountId) {
      assert.equal(text.includes(accountId), false, String(accountId));
    }
  }
});

test("cloudflare: error envelopes surface Cloudflare's message with the upstream status", async () => {
  const cases: Array<[number, unknown, RegExp]> = [
    [
      400,
      {
        success: false,
        errors: [{ code: 7003, message: "Model execution failed (User Input Error): bad type" }],
        result: {},
      },
      /User Input Error/,
    ],
    [
      402,
      { success: false, errors: [{ message: "Insufficient balance; add money to your gateway" }] },
      /Insufficient balance/,
    ],
    [429, { success: false, errors: [{ message: "Rate limited" }] }, /Rate limited/],
  ];
  for (const [status, payload, pattern] of cases) {
    const { response } = await call("cloudflare-ai/jev", jsonResponse(status, payload));
    assert.equal(response.status, status);
    const body = (await response.json()) as { error: { message: string } };
    assert.match(body.error.message, pattern);
  }
});

test("cloudflare: a 200 with success=false or a malformed result is a gateway error", async () => {
  for (const payload of [
    { success: false, errors: [{ message: "Model execution failed" }], result: null },
    { success: true, result: { state: "Running" } },
  ]) {
    const { response } = await call("cloudflare-ai/jev", jsonResponse(200, payload));
    assert.equal(response.status, 502);
  }
});
