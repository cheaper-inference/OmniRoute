import test, { mock } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import {
  generateSignature,
  outputContractOf,
  isCacheableForWrite,
} from "../../src/lib/semanticCache.ts";
import {
  generateDirectHash,
  getSemanticCacheManager,
} from "../../open-sse/services/cache/semanticCacheManager.ts";
import { storeSemanticCacheResponse } from "../../open-sse/handlers/chatCore/semanticCacheStore.ts";
import { storeStreamingSemanticCacheResponse } from "../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts";

const messages = [{ role: "user", content: "Return two plus two." }];
const signature = (body: Record<string, unknown>, key = "synthetic-key") =>
  generateSignature("synthetic-model", messages, 0, 1, key, outputContractOf(body));
const direct = (body: Record<string, unknown>) =>
  generateDirectHash("synthetic-model", messages, 0, 1, {}, outputContractOf(body));

test("versioned signatures cannot read old incomplete plain-request entries", () => {
  const old = crypto
    .createHash("sha256")
    .update(
      JSON.stringify({
        model: "synthetic-model",
        messages,
        temperature: 0,
        top_p: 1,
      })
    )
    .digest("hex");
  assert.notEqual(signature({}), `synthetic-key.${old}`);
});

test("effort, each token cap, and supported response controls separate identities", () => {
  const controls = [
    { reasoning_effort: "low" },
    { reasoning: { effort: "low" } },
    { max_tokens: 4096 },
    { max_completion_tokens: 4096 },
    { max_output_tokens: 4096 },
    { effort: "low" },
    { thinking: false },
    { thinking: { type: "enabled", budget_tokens: 1024 } },
    { parallel_tool_calls: false },
    { functions: [{ name: "sum" }] },
    { function_call: "none" },
    { n: 2 },
    { logprobs: true },
    { top_logprobs: 2 },
    { text: { verbosity: "low" } },
    { verbosity: "low" },
    { output_config: { effort: "low" } },
    { generationConfig: { maxOutputTokens: 2048 } },
    { stop_sequences: ["END"] },
    { instructions: "Be brief." },
    { seed: 0 },
    { stop: "" },
    { presence_penalty: 0 },
    { frequency_penalty: 0 },
    { logit_bias: { "10": -1 } },
    { top_k: 0 },
    { response_format: { type: "json_object" } },
    { tool_choice: "none" },
    { tools: [{ type: "web_search" }] },
  ];
  for (const control of controls) {
    assert.notEqual(signature(control), signature({}), JSON.stringify(control));
    assert.notEqual(direct(control), direct({}), JSON.stringify(control));
  }
  for (const cap of ["max_tokens", "max_completion_tokens", "max_output_tokens"]) {
    assert.notEqual(signature({ [cap]: 4096 }), signature({ [cap]: 2048 }));
  }
});

test("nested key order is irrelevant while tool policy and array order remain significant", () => {
  const a = {
    reasoning: { effort: "low", summary: "auto" },
    tools: [
      {
        type: "function",
        function: {
          name: "sum",
          strict: true,
          parameters: { type: "object", properties: { a: { type: "number" } } },
        },
      },
    ],
  };
  const b = {
    tools: [
      {
        function: {
          parameters: { properties: { a: { type: "number" } }, type: "object" },
          strict: true,
          name: "sum",
        },
        type: "function",
      },
    ],
    reasoning: { summary: "auto", effort: "low" },
  };
  assert.equal(signature(a), signature(b));
  assert.equal(direct(a), direct(b));
  assert.notEqual(
    signature(a),
    signature({
      ...a,
      tools: [{ ...a.tools[0], function: { ...a.tools[0].function, strict: false } }],
    })
  );
  assert.notEqual(
    signature({ tools: [{ type: "web_search", search_context_size: "low" }] }),
    signature({ tools: [{ type: "web_search", search_context_size: "high" }] })
  );
  assert.notEqual(signature({ stop: ["A", "B"] }), signature({ stop: ["B", "A"] }));
});

test("identical/default requests hit, API namespaces stay separate, transport metadata is ignored", () => {
  assert.equal(signature({}), signature({ reasoning_effort: undefined }));
  assert.equal(
    signature({}),
    signature({ stream: true, request_id: "synthetic", authorization: "unused" })
  );
  assert.equal(signature({ max_tokens: 4096 }), signature({ max_tokens: 4096 }));
  assert.notEqual(signature({}, "synthetic-a"), signature({}, "synthetic-b"));
});

test("both stores use the read identity; complete replies cannot cross controls and length replies stay rejected", () => {
  // No database/backend writes: observe the real store helpers through their existing deps.
  const managerStore = mock.method(getSemanticCacheManager(), "store", async () => {});
  try {
    for (const streaming of [false, true]) {
      const entries = new Map<string, unknown>();
      const deps = {
        isCacheableForWrite,
        isSmallEnoughForSemanticCache: () => true,
        generateSignature,
        setCachedResponse: (key: string, _model: string, response: unknown) => {
          entries.set(key, response);
        },
      };
      const body = { messages, temperature: 0, max_tokens: 4096 };
      const complete = {
        choices: [{ finish_reason: "stop", message: { role: "assistant", content: "4" } }],
      };
      const length = {
        choices: [
          {
            finish_reason: "length",
            message: { role: "assistant", content: "", reasoning_content: "working" },
          },
        ],
      };
      const store = (response: typeof complete) =>
        streaming
          ? storeStreamingSemanticCacheResponse(
              {
                enabled: true,
                streamStatus: 200,
                streamResponseBody: response,
                body,
                headers: undefined,
                model: "synthetic-model",
                apiKeyId: "synthetic-key",
              },
              deps
            )
          : storeSemanticCacheResponse(
              {
                enabled: true,
                translatedResponse: response,
                body,
                headers: undefined,
                model: "synthetic-model",
                apiKeyId: "synthetic-key",
              },
              deps
            );
      store(complete);
      assert.deepEqual(entries.get(signature(body)), complete);
      assert.equal(entries.get(signature({ ...body, reasoning_effort: "low" })), undefined);
      assert.equal(entries.get(signature({ ...body, max_tokens: 2048 })), undefined);
      entries.clear();
      store(length);
      assert.equal(entries.size, 0);
    }
  } finally {
    managerStore.mock.restore();
  }
});
