import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// applyJsonSchemaFallback (DefaultExecutor) for kilocode and openai-compatible-*:
//  1. the JSON instruction must not be pushed into the caller's array-valued system
//     content, otherwise every retry inside one execute() (the 429 intra-URL retry
//     re-runs transformRequest on the same body) stacks another copy;
//  2. only json_schema / json_object are JSON requests; for `text` (or any other type)
//     no JSON instruction is added and the messages stay untouched. kilocode rejects ANY
//     response_format, so it still drops the field; openai-compatible-* forwards it as-is.
//  Every transformRequest case snapshots the input first and compares against the snapshot,
//  so an in-place write into the caller's body cannot pass.

const INSTRUCTION = "You must respond with valid JSON";
const OPENAI_COMPAT_BASE = "https://compat.example/v1";
const PROVIDERS = [
  {
    name: "openai-compatible-*",
    id: "openai-compatible-deepseek",
    credentials: { apiKey: "k", providerSpecificData: { baseUrl: OPENAI_COMPAT_BASE } },
    urlPrefix: OPENAI_COMPAT_BASE,
    stripsNonJson: false,
  },
  {
    name: "kilocode",
    id: "kilocode",
    credentials: { apiKey: "k" },
    urlPrefix: "https://api.kilo.ai/",
    stripsNonJson: true,
  },
] as const;

const SCHEMA = {
  type: "object",
  properties: { answer: { type: "string" } },
  required: ["answer"],
};

type Message = { role?: string; content?: unknown };
type Sent = { messages: Message[]; response_format?: unknown } & Record<string, unknown>;
type Out = Sent;

function countInstructions(messages: Message[]): number {
  let n = 0;
  for (const m of messages) {
    const parts = Array.isArray(m.content)
      ? (m.content as Array<{ text?: unknown }>).map((p) => p?.text ?? "")
      : [m.content];
    for (const text of parts) {
      if (typeof text === "string") n += text.split(INSTRUCTION).length - 1;
    }
  }
  return n;
}

// Drives the real BaseExecutor.execute(): the first upstream call is a 429 (retried
// intra-URL after the 1 ms Retry-After hint), the second is a 200. The fetch stub
// fails closed on any URL outside the provider's own endpoint.
async function runWithRetry(provider: (typeof PROVIDERS)[number], body: Record<string, unknown>) {
  const originalFetch = globalThis.fetch;
  const sent: Sent[] = [];
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) => {
    const target = String(url instanceof Request ? url.url : url);
    if (!target.startsWith(provider.urlPrefix)) {
      throw new Error(`unexpected outbound URL in test: ${target}`);
    }
    sent.push(JSON.parse(String(init.body)));
    if (sent.length === 1) {
      return new Response(JSON.stringify({ error: { message: "slow down" } }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "0.001" },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;
  try {
    const executor = new DefaultExecutor(provider.id);
    const result = await executor.execute({
      model: "deepseek-chat",
      body,
      stream: false,
      credentials: provider.credentials,
    } as unknown as Parameters<DefaultExecutor["execute"]>[0]);
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return sent;
}

for (const provider of PROVIDERS) {
  test(`${provider.name}: array system content gets ONE instruction across a 429 retry and the caller body is untouched`, async () => {
    const body = {
      model: "deepseek-chat",
      messages: [
        { role: "system", content: [{ type: "text", text: "Be terse." }] },
        { role: "user", content: "give me JSON" },
      ],
      response_format: { type: "json_schema", json_schema: { name: "s", schema: SCHEMA } },
    };
    const snapshot = structuredClone(body);

    const sent = await runWithRetry(provider, body);

    assert.equal(sent.length, 2, "expected exactly one 429 attempt and one retry");
    assert.deepStrictEqual(body, snapshot, "caller body was mutated");
    assert.equal(countInstructions(sent[0].messages), 1, "first attempt");
    assert.equal(countInstructions(sent[1].messages), 1, "retry must not stack a second copy");
  });

  for (const [label, system] of [
    ["array", [{ type: "text", text: "Be terse." }]],
    ["string", "Be terse."],
  ] as const) {
    test(`${provider.name}: response_format text with ${label} system content gets no JSON instruction through execute()`, async () => {
      const body = {
        model: "deepseek-chat",
        messages: [
          { role: "system", content: system },
          { role: "user", content: "hello" },
        ],
        response_format: { type: "text" },
      };
      const snapshot = structuredClone(body);

      const sent = await runWithRetry(provider, body);

      assert.equal(sent.length, 2);
      for (const upstream of sent) {
        if (provider.stripsNonJson) assert.equal("response_format" in upstream, false);
        else assert.deepStrictEqual(upstream.response_format, { type: "text" });
        assert.equal(countInstructions(upstream.messages), 0, "no JSON instruction for text");
        assert.deepStrictEqual(upstream.messages, snapshot.messages);
      }
      assert.deepStrictEqual(body, snapshot, "caller body was mutated");
    });
  }

  for (const responseFormat of [
    { type: "text" },
    { type: "something_new" },
    {},
    "json_object",
  ] as const) {
    test(`${provider.name}: transformRequest adds no instruction for response_format ${JSON.stringify(responseFormat)}`, () => {
      const executor = new DefaultExecutor(provider.id);
      const body = {
        model: "deepseek-chat",
        messages: [{ role: "user", content: "hello" }],
        response_format: responseFormat,
      };
      const snapshot = structuredClone(body);

      const out = executor.transformRequest(
        "deepseek-chat",
        body,
        false,
        provider.credentials
      ) as Out;

      assert.deepStrictEqual(body, snapshot, "caller body was mutated");
      assert.deepStrictEqual(out.messages, snapshot.messages);
      assert.equal(countInstructions(out.messages), 0);
      if (provider.stripsNonJson) assert.equal("response_format" in out, false);
      else assert.deepStrictEqual(out.response_format, snapshot.response_format);
    });
  }

  test(`${provider.name}: json_schema without a schema is forwarded unchanged`, () => {
    const executor = new DefaultExecutor(provider.id);
    const body = {
      model: "m",
      messages: [{ role: "user", content: "hello" }],
      response_format: { type: "json_schema", json_schema: { name: "s" } },
    };
    const snapshot = structuredClone(body);

    const out = executor.transformRequest("m", body, false, provider.credentials) as Out;

    assert.deepStrictEqual(body, snapshot, "caller body was mutated");
    assert.deepStrictEqual(out.response_format, snapshot.response_format);
    assert.deepStrictEqual(out.messages, snapshot.messages);
    assert.equal(countInstructions(out.messages), 0);
  });
}
