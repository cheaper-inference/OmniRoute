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

test("cloudflare: upstream error text never echoes the account id or token", async () => {
  const cases: Array<[number, string]> = [
    [403, `Account ${ACCOUNT} is not authorized to run model`],
    [401, "Invalid token cf-test-token supplied"],
  ];
  for (const [status, message] of cases) {
    const { response } = await call(
      "cloudflare-ai/jev",
      jsonResponse(status, { success: false, errors: [{ message }] })
    );
    assert.equal(response.status, status);
    const text = await response.text();
    assert.equal(text.includes(ACCOUNT), false, text);
    assert.equal(text.includes("cf-test-token"), false, text);
  }
});

test("cloudflare: a transport failure naming the URL does not leak the account id", async () => {
  const response = await handleSystemOneProxy({
    path: "/v1/systemone",
    target: resolveSystemOneTarget("cf/clef")!,
    body: { model: "cf/clef", state: "s", questions: { q: { type: "noul" } } },
    credentials: { apiKey: "cf-test-token", providerSpecificData: { accountId: ACCOUNT } },
    fetchImpl: async (url) => {
      throw new Error(`Request to ${String(url)} failed with token cf-test-token`);
    },
  });
  assert.equal(response.status, 500);
  const text = await response.text();
  assert.equal(text.includes(ACCOUNT), false, text);
  assert.equal(text.includes("cf-test-token"), false, text);
});

test("cloudflare: secrets cut off by the 500-character error cap are still redacted", async () => {
  for (const secret of [ACCOUNT, "cf-test-token"]) {
    // A non-JSON body whose secret straddles the truncation point.
    const raw = "Denied ".padEnd(500 - secret.length + 1, ".") + secret + " rejected";
    const { response } = await call(
      "cf/clef",
      new Response(raw, { status: 403, headers: { "content-type": "text/plain" } })
    );
    assert.equal(response.status, 403);
    const text = await response.text();
    assert.equal(text.includes(secret.slice(0, -1)), false, secret);
  }
});

test("cloudflare: an escaped secret in an error message is not decoded back into the response", async () => {
  // "\u0063" is "c": the shared sanitizer decodes the escape, so redaction must run after it.
  const escaped = "\\u0063" + "f-test-token";
  const { response } = await call(
    "cloudflare-ai/jev",
    jsonResponse(403, { success: false, errors: [{ message: `Denied ${escaped}` }] })
  );
  assert.equal(response.status, 403);
  const text = await response.text();
  assert.equal(text.includes("cf-test-token"), false, text);
});

test("cloudflare: success results keep only model, answers and usage, without secrets", async () => {
  for (const secret of [ACCOUNT, "cf-test-token"]) {
    const { response } = await call(
      "cloudflare-ai/jev",
      jsonResponse(200, {
        success: true,
        result: {
          state: "Completed",
          result: {
            model: `jev-${secret}`,
            answers: ANSWERS,
            usage: { input_tokens: 5, output_tokens: 1, debug: secret },
            diagnostic: { account: ACCOUNT, credential: "cf-test-token" },
          },
        },
      })
    );
    assert.equal(response.status, 200);
    const text = await response.text();
    assert.equal(text.includes(secret), false, text);
    assert.equal((response.headers.get("x-omniroute-model") ?? "").includes(secret), false);
    assert.deepEqual(JSON.parse(text), {
      model: "typesafe/jev",
      answers: ANSWERS,
      usage: { input_tokens: 5, output_tokens: 1 },
    });
  }
});

test("cloudflare: partial and encoded secrets are redacted in errors, exceptions and answers", async () => {
  const token = "cf-test-token";
  const variants = [
    "%63" + token.slice(1),
    "\\x63" + token.slice(1),
    "\\\\u0063" + token.slice(1),
    token.slice(0, -1),
  ];
  for (const variant of variants) {
    const err = await call(
      "cloudflare-ai/jev",
      jsonResponse(403, { success: false, errors: [{ message: `Denied ${variant}` }] })
    );
    assert.equal((await err.response.text()).includes("f-test-tok"), false, variant);
    const ok = await call(
      "cloudflare-ai/clef",
      jsonResponse(200, {
        success: true,
        result: { model: "clef", answers: { q: { answer: `x ${variant}` } }, usage: {} },
      })
    );
    assert.equal((await ok.response.text()).includes("f-test-tok"), false, variant);
  }
  const long = "Denied ".padEnd(4097 - ACCOUNT.length, ".") + ACCOUNT + " rejected";
  const capped = await call(
    "cloudflare-ai/jev",
    jsonResponse(200, { success: false, errors: [{ message: long }] })
  );
  assert.equal(capped.response.status, 502);
  assert.equal((await capped.response.text()).includes(ACCOUNT.slice(0, 12)), false);
});

test("cloudflare: quoted error messages survive intact and short tokens are still redacted", async () => {
  const message = 'Invalid value for "questions": expected an object';
  const { response } = await call(
    "cloudflare-ai/jev",
    jsonResponse(400, { success: false, errors: [{ code: 7003, message }] })
  );
  assert.equal(response.status, 400);
  assert.equal(((await response.json()) as { error: { message: string } }).error.message, message);

  const short = await handleSystemOneProxy({
    path: "/v1/systemone",
    target: resolveSystemOneTarget("cf/clef")!,
    body: { model: "cf/clef", state: "s", questions: { q: { type: "noul" } } },
    credentials: { apiKey: "qZ7vX2a", providerSpecificData: { accountId: ACCOUNT } },
    fetchImpl: async () =>
      jsonResponse(401, { success: false, errors: [{ message: "Rejected qZ7vX2a" }] }),
  });
  assert.equal(short.status, 401);
  assert.equal((await short.text()).includes("qZ7vX2a"), false);
});
