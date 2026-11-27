/**
 * #18838 (salvage) — native OpenAI Decisions: model ids, wire schema, upstream URL,
 * decision-catalog projection and the proxy handler.
 *
 * The handler must leave through the guarded decision transport of #20852 (same seam,
 * same 5 s ceiling, redirect refusal and 64 KB answer cap) and keep failures status-only.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openai-decisions-18838-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const native = await import("../../open-sse/services/decision/native/openaiDecisions.ts");
const { handleOpenAiDecisionsProxy } = await import("../../open-sse/handlers/openaiDecisions.ts");
const { MAX_DECISION_TIMEOUT_MS } = await import("../../open-sse/services/decision/config.ts");
const { MAX_DECISION_RESPONSE_BYTES } =
  await import("../../open-sse/services/decision/transport.ts");
const { DECISION_MODEL_REQUEST_HEADER } = await import("../../open-sse/services/decision/types.ts");
const core = await import("../../src/lib/db/core.ts");

type TransportInit = {
  method: string;
  headers: Record<string, string>;
  body?: string;
  timeoutMs: number;
  redirect: string;
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const VALID = {
  model: "openai/gpt-6-luna",
  input: "PRIVATE_PROMPT_TEXT",
  questions: [
    { type: "predicate", name: "safe", instructions: "Is it safe?" },
    {
      type: "choice",
      name: "tier",
      instructions: "Which tier?",
      choices: [{ value: "low" }, { value: "high", description: "hard tasks" }],
    },
    { type: "score", instructions: "Urgency", levels: [{ label: "low" }, { label: "high" }] },
  ],
};

const ANSWER = {
  model: "gpt-6-luna",
  answers: [{ type: "predicate", name: "safe", probability: 0.93 }],
  usage: { input_tokens: 12, output_tokens: 1, total_tokens: 13 },
};

test("resolveOpenAiDecisionModel accepts only the Decisions models", () => {
  assert.deepEqual(native.resolveOpenAiDecisionModel("openai/gpt-6-luna"), {
    qualified: "openai/gpt-6-luna",
    upstream: "gpt-6-luna",
  });
  assert.deepEqual(native.resolveOpenAiDecisionModel(" gpt-6-luna "), {
    qualified: "openai/gpt-6-luna",
    upstream: "gpt-6-luna",
  });
  for (const model of ["openai/gpt-6", "typesafe/jev-latest", "gpt-6-luna-max", "", 42, null]) {
    assert.equal(native.resolveOpenAiDecisionModel(model), null, String(model));
  }
});

test("resolveOpenAiDecisionsUrl: default host, the connection base URL, and refusals", () => {
  const port = process.env.PORT?.trim() || "20128";
  assert.equal(native.resolveOpenAiDecisionsUrl(null), "https://api.openai.com/v1/decisions");
  assert.equal(
    native.resolveOpenAiDecisionsUrl({ baseUrl: "  " }),
    "https://api.openai.com/v1/decisions"
  );
  assert.equal(
    native.resolveOpenAiDecisionsUrl({ baseUrl: "https://proxy.example.com/v1/" }),
    "https://proxy.example.com/v1/decisions"
  );
  assert.equal(
    native.resolveOpenAiDecisionsUrl({ baseUrl: "https://proxy.example.com/v1/chat/completions" }),
    "https://proxy.example.com/v1/decisions"
  );
  assert.equal(
    native.resolveOpenAiDecisionsUrl({ baseUrl: "https://proxy.example.com" }),
    "https://proxy.example.com/v1/decisions"
  );
  for (const baseUrl of [
    "ftp://proxy.example.com/v1",
    "https://user:pass@proxy.example.com/v1",
    "https://proxy.example.com/v1?key=x",
    "https://proxy.example.com/v1#frag",
    "not a url",
    `http://localhost:${port}/v1`,
    `http://127.0.0.1:${port}`,
    42,
  ]) {
    assert.equal(native.resolveOpenAiDecisionsUrl({ baseUrl }), null, String(baseUrl));
  }
});

test("openAiDecisionsRequestSchema accepts the documented shape and refuses System One fields", () => {
  const schema = native.openAiDecisionsRequestSchema;
  assert.equal(schema.safeParse(VALID).success, true);
  assert.equal(
    schema.safeParse({ ...VALID, input: [{ role: "user", content: "hi" }] }).success,
    true,
    "a message array input is forwarded"
  );
  assert.equal(schema.safeParse({ ...VALID, state: "x" }).success, false, "System One state");
  assert.equal(schema.safeParse({ ...VALID, stream: true }).success, false, "unknown field");
  assert.equal(schema.safeParse({ ...VALID, questions: [] }).success, false);
  assert.equal(schema.safeParse({ model: VALID.model, questions: VALID.questions }).success, false);
  const duplicateChoice = {
    ...VALID,
    questions: [{ type: "choice", instructions: "x", choices: [{ value: "a" }, { value: "a" }] }],
  };
  assert.equal(schema.safeParse(duplicateChoice).success, false);
  const duplicateNames = {
    ...VALID,
    questions: [
      { type: "predicate", name: "q", instructions: "a" },
      { type: "predicate", name: "q", instructions: "b" },
    ],
  };
  assert.equal(schema.safeParse(duplicateNames).success, false);
  const tooMany = {
    ...VALID,
    questions: Array.from({ length: 401 }, () => ({ type: "predicate", instructions: "x" })),
  };
  assert.equal(schema.safeParse(tooMany).success, false);
  const oneLevel = {
    ...VALID,
    questions: [{ type: "score", instructions: "x", levels: [{ label: "only" }] }],
  };
  assert.equal(schema.safeParse(oneLevel).success, false);
});

test("projectOpenAiDecisionRows re-emits only catalog rows of the Decisions models, once", () => {
  const rows = native.projectOpenAiDecisionRows([
    { id: "openai/gpt-6-luna", owned_by: "openai", root: "gpt-6-luna", type: "chat" },
    { id: "gpt-6-luna", owned_by: "openai", root: "gpt-6-luna" },
    { id: "openai/gpt-6.1-sol", owned_by: "openai", root: "gpt-6.1-sol" },
    { id: "codex/gpt-6-luna", owned_by: "codex", root: "gpt-6-luna" },
  ]);
  assert.deepEqual(rows, [
    {
      id: "openai/gpt-6-luna",
      object: "model",
      owned_by: "openai",
      type: "decisions",
      api_format: "decisions",
      supported_endpoints: ["decisions"],
      capabilities: { decision: true },
      pricing: null,
    },
  ]);
});

function captureTransport(response: () => Response) {
  const calls: { url: string; init: TransportInit }[] = [];
  const transport = async (url: string, init: TransportInit) => {
    calls.push({ url, init });
    return response();
  };
  return { calls, transport };
}

const CREDENTIALS = { apiKey: "sk-openai-SECRET-1234567890", connectionId: "conn-1" };

function proxy(transport: unknown, credentials: Record<string, unknown> = CREDENTIALS) {
  const parsed = native.openAiDecisionsRequestSchema.parse(VALID);
  return handleOpenAiDecisionsProxy({
    path: "/v1/decisions",
    model: native.resolveOpenAiDecisionModel(parsed.model)!,
    body: parsed,
    credentials,
    transport: transport as never,
  });
}

test("handler posts through the guarded transport contract and passes the answers through", async () => {
  const { calls, transport } = captureTransport(() => Response.json(ANSWER));
  const response = await proxy(transport);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), ANSWER);
  assert.equal(response.headers.get("Cache-Control"), "no-store");

  assert.equal(calls.length, 1);
  const [{ url, init }] = calls;
  assert.equal(url, "https://api.openai.com/v1/decisions");
  assert.equal(init.method, "POST");
  assert.equal(init.redirect, "error");
  assert.equal(init.timeoutMs, MAX_DECISION_TIMEOUT_MS);
  assert.equal(init.headers.Authorization, `Bearer ${CREDENTIALS.apiKey}`);
  assert.equal(init.headers[DECISION_MODEL_REQUEST_HEADER], "1");
  assert.match(init.headers["Idempotency-Key"], /^[0-9a-f-]{36}$/);
  const sent = JSON.parse(init.body!);
  assert.equal(sent.model, "gpt-6-luna", "the provider prefix is stripped upstream");
  assert.deepEqual(sent.questions, VALID.questions);
  assert.equal(sent.input, VALID.input);
});

test("handler sends a fresh idempotency key per attempt", async () => {
  const { calls, transport } = captureTransport(() => Response.json(ANSWER));
  await proxy(transport);
  await proxy(transport);
  assert.notEqual(
    calls[0].init.headers["Idempotency-Key"],
    calls[1].init.headers["Idempotency-Key"]
  );
});

test("handler failures are status-only: no upstream body, key or prompt leaks", async () => {
  const leaky = () =>
    new Response(`{"error":"bad PRIVATE_PROMPT_TEXT for ${CREDENTIALS.apiKey}"}`, { status: 400 });
  const cases: Array<[() => Response, number]> = [
    [leaky, 400],
    [() => new Response("rate", { status: 429 }), 429],
    [() => new Response(`upstream down ${CREDENTIALS.apiKey}`, { status: 503 }), 502],
    [() => new Response("x".repeat(MAX_DECISION_RESPONSE_BYTES + 1)), 502],
    [() => new Response("not json"), 502],
    [() => Response.json({ model: "gpt-6-luna", answers: { safe: 1 } }), 502],
  ];
  for (const [upstream, status] of cases) {
    const { transport } = captureTransport(upstream);
    const response = await proxy(transport);
    const text = await response.text();
    assert.equal(response.status, status, text);
    assert.ok(!text.includes(CREDENTIALS.apiKey), "no key in the error");
    assert.ok(!text.includes("PRIVATE_PROMPT_TEXT"), "no prompt in the error");
    assert.ok(!text.includes("api.openai.com"), "no upstream URL in the error");
  }
});

test("handler refuses without a key or with an unusable base URL, before any call", async () => {
  const { calls, transport } = captureTransport(() => Response.json(ANSWER));
  const missing = await proxy(transport, { connectionId: "conn-1" });
  assert.equal(missing.status, 401);
  const badBase = await proxy(transport, {
    ...CREDENTIALS,
    providerSpecificData: { baseUrl: "https://user:pw@proxy.example.com/v1" },
  });
  assert.equal(badBase.status, 400);
  assert.equal(calls.length, 0, "the key is never sent to a refused URL");

  const custom = await proxy(transport, {
    ...CREDENTIALS,
    providerSpecificData: { baseUrl: "https://proxy.example.com/v1" },
  });
  assert.equal(custom.status, 200);
  assert.equal(calls[0].url, "https://proxy.example.com/v1/decisions");
});
