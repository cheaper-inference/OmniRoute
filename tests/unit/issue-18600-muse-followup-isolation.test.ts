import "../_setup/isolateDataDir.ts";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";

import { getDefaultExecutor } from "../../open-sse/executors/defaultResolver.ts";
import { finalizeTranslatedRequest } from "../../open-sse/handlers/chatCore/translatedRequestFinalize.ts";
import { translateNonStreamingClientResponse } from "../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts";
import { normalizeExecutorResult } from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

type JsonRecord = Record<string, unknown>;
type Finalized = ReturnType<typeof finalizeTranslatedRequest>;
type CapturedRequest = { url: string; serialized: string; body: JsonRecord };

const MODEL = "muse-spark-1.3";
const ORIGINAL_NAME = "read_file";
const NAMESPACE = "files";
const FUNCTION_ID = "fc_turn_1";
const CALL_ID = "call_turn_1";
const ARGUMENTS = '{"path":"notes.txt"}';
const RESULT_PAYLOAD = '{"contents":"alpha\\nbeta"}';
const MUSE_URL = "https://api.meta.ai/v1/responses";
const FALLBACK_PROVIDER = "openai-compatible-responses-issue18600";
const FALLBACK_URL = "https://fallback.example/v1/responses";
const TOOL_SCHEMA = {
  type: "object",
  properties: { path: { type: "string" } },
  required: ["path"],
};
const MUSE_CREDENTIALS_A = {
  apiKey: "LLM|fake-muse-account-a",
  connectionId: "muse-account-a",
  providerSpecificData: { baseUrl: "https://api.meta.ai/v1" },
};
const MUSE_CREDENTIALS_B = {
  apiKey: "LLM|fake-muse-account-b",
  connectionId: "muse-account-b",
  providerSpecificData: { baseUrl: "https://api.meta.ai/v1" },
};
const FALLBACK_CREDENTIALS = {
  apiKey: "fake-fallback-account",
  connectionId: "fallback-account",
  providerSpecificData: {
    apiType: "responses",
    baseUrl: "https://fallback.example/v1",
  },
};

function record(value: unknown): JsonRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as JsonRecord;
}

function array(value: unknown): unknown[] {
  assert.ok(Array.isArray(value));
  return value;
}

function records(value: unknown): JsonRecord[] {
  return array(value).map(record);
}

function deepFreeze(value: unknown): void {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return;
  const children = Array.isArray(value) ? value : Object.values(value as JsonRecord);
  for (const child of children) deepFreeze(child);
  Object.freeze(value);
}

function expectedAlias(namespace?: string): string {
  const hash = createHash("sha256")
    .update(JSON.stringify([namespace ?? "", ORIGINAL_NAME]))
    .digest("hex")
    .slice(0, 16);
  return `muse_${ORIGINAL_NAME}_${hash}`;
}

function functionDeclaration(namespace?: string): JsonRecord {
  const fn = {
    type: "function",
    name: ORIGINAL_NAME,
    description: "Read one UTF-8 text file",
    parameters: TOOL_SCHEMA,
  };
  return namespace ? { type: "namespace", name: namespace, tools: [fn] } : fn;
}

function originalClientCall(namespace?: string): JsonRecord {
  return {
    type: "function_call",
    id: FUNCTION_ID,
    call_id: CALL_ID,
    name: ORIGINAL_NAME,
    ...(namespace ? { namespace } : {}),
    arguments: ARGUMENTS,
    status: "completed",
  };
}

function initialClientBody(namespace?: string): JsonRecord {
  return {
    model: MODEL,
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Read notes.txt and report its contents." }],
      },
    ],
    tools: [functionDeclaration(namespace)],
    tool_choice: {
      type: "function",
      name: ORIGINAL_NAME,
      ...(namespace ? { namespace } : {}),
    },
  };
}

function followUpClientBody(first: JsonRecord, call: JsonRecord): JsonRecord {
  return {
    model: MODEL,
    input: [
      ...array(first.input).map((item) => structuredClone(item)),
      structuredClone(call),
      { type: "function_call_output", call_id: CALL_ID, output: RESULT_PAYLOAD },
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Summarize the file result." }],
      },
    ],
    tools: structuredClone(first.tools),
    tool_choice: structuredClone(first.tool_choice),
  };
}

function historyOnlyClientBody(namespace?: string): JsonRecord {
  return {
    model: MODEL,
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Continue the restored tool turn." }],
      },
      originalClientCall(namespace),
      { type: "function_call_output", call_id: CALL_ID, output: RESULT_PAYLOAD },
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Use that result without redeclaring tools." }],
      },
    ],
  };
}

function prepare(
  clientBody: JsonRecord,
  stream: boolean,
  provider = "muse-code",
  credentials: JsonRecord = MUSE_CREDENTIALS_A
): Finalized {
  const translatedBody = record(
    translateRequest(
      FORMATS.OPENAI_RESPONSES,
      FORMATS.OPENAI_RESPONSES,
      MODEL,
      clientBody,
      stream,
      null,
      provider
    )
  );
  return finalizeTranslatedRequest({
    translatedBody,
    body: clientBody,
    provider,
    alias: provider === "muse-code" ? "mc" : null,
    effectiveModel: `${provider}/${MODEL}`,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    targetFormat: FORMATS.OPENAI_RESPONSES,
    isClaudePassthrough: false,
    credentials,
    previousResponseIdMode: "off",
  });
}

async function dispatch(
  provider: string,
  prepared: Finalized,
  stream: boolean,
  credentials: JsonRecord
) {
  return normalizeExecutorResult(
    await getDefaultExecutor(provider).execute({
      model: MODEL,
      body: prepared.translatedBody,
      stream,
      credentials,
    })
  );
}

function upstreamToolResponse(wireName: string, namespace?: string): JsonRecord {
  return {
    id: "resp_tool_turn_1",
    object: "response",
    created_at: 1_799_999_001,
    status: "completed",
    model: MODEL,
    output: [
      {
        type: "function_call",
        id: FUNCTION_ID,
        call_id: CALL_ID,
        name: wireName,
        ...(namespace ? { namespace } : {}),
        arguments: ARGUMENTS,
        status: "completed",
      },
    ],
    parallel_tool_calls: true,
    usage: { input_tokens: 12, output_tokens: 4, total_tokens: 16 },
  };
}

function upstreamFinalResponse(): JsonRecord {
  return {
    id: "resp_final_turn_2",
    object: "response",
    created_at: 1_799_999_002,
    status: "completed",
    model: MODEL,
    output: [
      {
        id: "msg_final_turn_2",
        type: "message",
        status: "completed",
        role: "assistant",
        content: [
          {
            type: "output_text",
            text: "notes.txt contains alpha followed by beta.",
            annotations: [],
          },
        ],
      },
    ],
    usage: { input_tokens: 20, output_tokens: 8, total_tokens: 28 },
  };
}

function toolResponseSse(body: JsonRecord): string {
  const item = record(array(body.output)[0]);
  const events: JsonRecord[] = [
    {
      type: "response.created",
      response: {
        id: body.id,
        object: "response",
        status: "in_progress",
        model: MODEL,
        output: [],
      },
    },
    {
      type: "response.output_item.added",
      output_index: 0,
      item: { ...item, arguments: "", status: "in_progress" },
    },
    {
      type: "response.function_call_arguments.delta",
      output_index: 0,
      item_id: item.id,
      delta: ARGUMENTS,
    },
    {
      type: "response.function_call_arguments.done",
      output_index: 0,
      item_id: item.id,
      arguments: ARGUMENTS,
    },
    { type: "response.output_item.done", output_index: 0, item },
    { type: "response.completed", response: body },
  ];
  return events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
}

function completedResponseSse(body: JsonRecord): string {
  return `data: ${JSON.stringify({ type: "response.completed", response: body })}\n\n`;
}

function mockResponse(body: JsonRecord, stream: boolean, detailedToolStream = false): Response {
  const payload = stream
    ? detailedToolStream
      ? toolResponseSse(body)
      : completedResponseSse(body)
    : JSON.stringify(body);
  return new Response(payload, {
    status: 200,
    headers: { "Content-Type": stream ? "text/event-stream" : "application/json" },
  });
}

function parseSse(text: string): JsonRecord[] {
  return text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:") && line.slice(5).trim() !== "[DONE]")
    .map((line) => record(JSON.parse(line.slice(5).trim())));
}

async function restoreClientCall(
  prepared: Finalized,
  response: Response,
  clientBody: JsonRecord,
  stream: boolean
): Promise<{ call: JsonRecord; serialized: string }> {
  if (!stream) {
    const translated = translateNonStreamingClientResponse({
      responseBody: await response.json(),
      responsePayloadFormat: FORMATS.OPENAI_RESPONSES,
      clientResponseFormat: FORMATS.OPENAI_RESPONSES,
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      provider: "muse-code",
      model: MODEL,
      requestBody: prepared.translatedBody,
      clientRequestBody: clientBody,
      responseToolNameMap: prepared.toolNameMap,
      requestToolIdentityMap: prepared.requestToolIdentityMap,
      reasoningCacheScope: null,
      clientHeaders: null,
      isClaudeCodeCompatible: false,
      phase: "final",
    });
    const payload = record(translated.response);
    return {
      call: record(array(payload.output)[0]),
      serialized: JSON.stringify(payload),
    };
  }

  assert.ok(response.body);
  const transform = createSSEStream({
    mode: "passthrough",
    targetFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    provider: "muse-code",
    model: MODEL,
    body: prepared.translatedBody,
    clientTools: array(clientBody.tools),
    toolNameMap: prepared.toolNameMap,
    requestToolIdentityMap: prepared.requestToolIdentityMap,
  });
  const serialized = await new Response(response.body.pipeThrough(transform)).text();
  const completed = parseSse(serialized).find((event) => event.type === "response.completed");
  assert.ok(completed);
  const payload = record(completed.response);
  return { call: record(array(payload.output)[0]), serialized };
}

async function withMockFetch<T>(
  respond: (request: CapturedRequest, index: number) => Response,
  run: (requests: CapturedRequest[]) => Promise<T>
): Promise<T> {
  const originalFetch = globalThis.fetch;
  const requests: CapturedRequest[] = [];
  globalThis.fetch = async (input, init) => {
    const rawBody = init?.body;
    assert.equal(typeof rawBody, "string", "executor must serialize a JSON request body");
    const serialized = rawBody as string;
    const request = {
      url: String(input),
      serialized,
      body: record(JSON.parse(serialized)),
    };
    requests.push(request);
    return respond(request, requests.length - 1);
  };
  try {
    return await run(requests);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function assertNamespace(value: JsonRecord, namespace?: string): void {
  if (namespace) {
    assert.equal(value.namespace, namespace);
  } else {
    assert.equal("namespace" in value, false, "flat identities must stay flat");
  }
}

function assertNoSideChannels(body: JsonRecord, serialized = JSON.stringify(body)): void {
  for (const key of ["_toolNameMap", "_namespaceToolIdentityMap", "_disableToolPrefix"]) {
    assert.equal(Object.hasOwn(body, key), false, `${key} must be consumed before dispatch`);
    assert.equal(serialized.includes(key), false, `${key} must never serialize upstream`);
  }
}

function declaredFunction(body: JsonRecord, namespace?: string): JsonRecord {
  const tools = records(body.tools);
  assert.equal(tools.length, 1);
  if (!namespace) {
    assert.equal(tools[0].type, "function");
    return tools[0];
  }
  assert.equal(tools[0].type, "namespace");
  assert.equal(tools[0].name, namespace);
  const children = records(tools[0].tools);
  assert.equal(children.length, 1);
  assert.equal(children[0].type, "function");
  return children[0];
}

function assertDeclarationAndChoice(
  body: JsonRecord,
  expectedWireName: string,
  namespace?: string
): void {
  const declaration = declaredFunction(body, namespace);
  assert.equal(declaration.name, expectedWireName);
  assert.deepEqual(declaration.parameters, TOOL_SCHEMA);
  const choice = record(body.tool_choice);
  assert.equal(choice.type, "function");
  assert.equal(choice.name, expectedWireName);
  assertNamespace(choice, namespace);
  assert.equal(body.model, MODEL);
  assertNoSideChannels(body);
}

function assertPreparedLedgers(prepared: Finalized, wireName: string, namespace?: string): void {
  assert.ok(prepared.toolNameMap instanceof Map);
  assert.deepEqual([...prepared.toolNameMap], [[wireName, ORIGINAL_NAME]]);
  if (namespace) {
    assert.ok(prepared.requestToolIdentityMap instanceof Map);
    assert.deepEqual(
      [...prepared.requestToolIdentityMap],
      [[wireName, { namespace, name: ORIGINAL_NAME }]]
    );
  } else {
    // Without a dedicated namespace ledger, the legacy extractor returns the
    // string alias map through the identity slot as a compatibility fallback.
    assert.ok(prepared.requestToolIdentityMap instanceof Map);
    assert.deepEqual([...prepared.requestToolIdentityMap], [[wireName, ORIGINAL_NAME]]);
  }
  assertNoSideChannels(prepared.translatedBody);
}

function assertClientCall(call: JsonRecord, namespace?: string): void {
  assert.equal(call.type, "function_call");
  assert.equal(call.id, FUNCTION_ID);
  assert.equal(call.call_id, CALL_ID);
  assert.equal(call.name, ORIGINAL_NAME);
  assert.equal(call.arguments, ARGUMENTS);
  assert.equal(call.status, "completed");
  assertNamespace(call, namespace);
}

function assertFollowUpWire(body: JsonRecord, expectedWireName: string, namespace?: string): void {
  assertDeclarationAndChoice(body, expectedWireName, namespace);
  const input = records(body.input);
  const call = input.find((item) => item.type === "function_call");
  assert.ok(call);
  assert.equal(
    call.id,
    undefined,
    "the global Responses replay policy strips server item ids before redispatch"
  );
  assert.equal(call.call_id, CALL_ID);
  assert.equal(call.name, expectedWireName);
  assert.equal(call.arguments, ARGUMENTS);
  assert.equal(call.status, "completed");
  assertNamespace(call, namespace);
  const result = input.find((item) => item.type === "function_call_output");
  assert.ok(result);
  assert.equal(result.call_id, CALL_ID);
  assert.equal(result.output, RESULT_PAYLOAD);
}

function assertHistoryOnlyWire(
  body: JsonRecord,
  expectedWireName: string,
  namespace?: string
): void {
  assert.equal(body.tools, undefined, "history-only requests must remain declaration-free");
  assert.equal(body.tool_choice, undefined);
  const input = records(body.input);
  const call = input.find((item) => item.type === "function_call");
  assert.ok(call);
  assert.equal(
    call.id,
    undefined,
    "the global Responses replay policy strips server item ids before redispatch"
  );
  assert.equal(call.call_id, CALL_ID);
  assert.equal(call.name, expectedWireName);
  assert.equal(call.arguments, ARGUMENTS);
  assert.equal(call.status, "completed");
  assertNamespace(call, namespace);
  const result = input.find((item) => item.type === "function_call_output");
  assert.ok(result);
  assert.equal(result.call_id, CALL_ID);
  assert.equal(result.output, RESULT_PAYLOAD);
  assertNoSideChannels(body);
}

for (const namespace of [undefined, NAMESPACE] as const) {
  for (const stream of [false, true]) {
    const identity = namespace ? "native namespace" : "flat";
    const output = stream ? "SSE" : "JSON";
    const testName = `complete ${identity} ${output} tool turn aliases restored second request`;
    test(testName, async () => {
      const alias = expectedAlias(namespace);
      const firstClient = initialClientBody(namespace);
      const firstOriginal = structuredClone(firstClient);
      const firstPrepared = prepare(firstClient, stream);
      assertPreparedLedgers(firstPrepared, alias, namespace);

      await withMockFetch(
        (request, index) => {
          assert.equal(request.url, MUSE_URL, "all Muse inference must stay on the mock");
          if (index === 0) {
            assertDeclarationAndChoice(request.body, alias, namespace);
            assert.equal(
              records(request.body.input).some((item) => item.type === "function_call"),
              false
            );
            return mockResponse(upstreamToolResponse(alias, namespace), stream, true);
          }
          if (index === 1) return mockResponse(upstreamFinalResponse(), stream);
          assert.fail("the two-turn scenario must perform exactly two upstream calls");
        },
        async (requests) => {
          const firstResult = await dispatch(
            "muse-code",
            firstPrepared,
            stream,
            MUSE_CREDENTIALS_A
          );
          assert.equal(firstResult.response.status, 200);
          const restored = await restoreClientCall(
            firstPrepared,
            firstResult.response,
            firstClient,
            stream
          );
          assertClientCall(restored.call, namespace);
          assert.equal(
            restored.serialized.includes(alias),
            false,
            "the client must never see alias"
          );
          assertNoSideChannels(restored.call, restored.serialized);

          const secondClient = followUpClientBody(firstClient, restored.call);
          const secondOriginal = structuredClone(secondClient);
          const secondPrepared = prepare(secondClient, stream);
          assertPreparedLedgers(secondPrepared, alias, namespace);
          const secondResult = await dispatch(
            "muse-code",
            secondPrepared,
            stream,
            MUSE_CREDENTIALS_A
          );
          assert.equal(secondResult.response.status, 200);
          await secondResult.response.text();

          assert.equal(requests.length, 2);
          assertFollowUpWire(requests[1].body, alias, namespace);
          assertNoSideChannels(requests[1].body, requests[1].serialized);
          assert.deepEqual(firstClient, firstOriginal, "first client request must stay unchanged");
          assert.deepEqual(
            secondClient,
            secondOriginal,
            "follow-up client history must stay unchanged"
          );
        }
      );
    });
  }
}

for (const namespace of [undefined, NAMESPACE] as const) {
  for (const stream of [false, true]) {
    const identity = namespace ? "namespaced" : "flat";
    const output = stream ? "SSE" : "JSON";
    const testName = `history-only ${identity} ${output} follow-up stays deterministic`;
    test(testName, async () => {
      const alias = expectedAlias(namespace);
      const client = historyOnlyClientBody(namespace);
      const original = structuredClone(client);
      const first = prepare(client, stream);
      const equivalent = prepare(client, stream);

      assertPreparedLedgers(first, alias, namespace);
      assertPreparedLedgers(equivalent, alias, namespace);
      assertHistoryOnlyWire(first.translatedBody, alias, namespace);
      assertHistoryOnlyWire(equivalent.translatedBody, alias, namespace);
      const firstMap = first.toolNameMap;
      const equivalentMap = equivalent.toolNameMap;
      assert.ok(firstMap);
      assert.ok(equivalentMap);
      assert.deepEqual([...firstMap], [[alias, ORIGINAL_NAME]]);
      assert.deepEqual([...equivalentMap], [[alias, ORIGINAL_NAME]]);

      await withMockFetch(
        (request) => {
          assert.equal(request.url, MUSE_URL, "history-only dispatch must be mocked");
          return mockResponse(upstreamFinalResponse(), stream);
        },
        async (requests) => {
          const firstResult = await dispatch("muse-code", first, stream, MUSE_CREDENTIALS_A);
          const secondResult = await dispatch("muse-code", equivalent, stream, MUSE_CREDENTIALS_A);
          assert.equal(firstResult.response.status, 200);
          assert.equal(secondResult.response.status, 200);
          await firstResult.response.text();
          await secondResult.response.text();

          assert.equal(requests.length, 2);
          assertHistoryOnlyWire(requests[0].body, alias, namespace);
          assertHistoryOnlyWire(requests[1].body, alias, namespace);
          assert.equal(requests[0].serialized, requests[1].serialized);
          assert.deepEqual(requests[0].body, requests[1].body);
        }
      );

      assert.deepEqual(client, original);
    });
  }
}

test("one finalized Muse body is byte-stable across two account redispatches", async () => {
  const alias = expectedAlias();
  const initial = initialClientBody();
  const client = followUpClientBody(initial, originalClientCall());
  const originalClient = structuredClone(client);
  const prepared = prepare(client, false);
  const finalizedSnapshot = structuredClone(prepared.translatedBody);
  assertPreparedLedgers(prepared, alias);

  await withMockFetch(
    (request) => {
      assert.equal(request.url, MUSE_URL, "account redispatch must never reach live Muse");
      return mockResponse(upstreamFinalResponse(), false);
    },
    async (requests) => {
      const first = await dispatch("muse-code", prepared, false, MUSE_CREDENTIALS_A);
      const second = await dispatch("muse-code", prepared, false, MUSE_CREDENTIALS_B);
      assert.equal(first.response.status, 200);
      assert.equal(second.response.status, 200);
      await first.response.text();
      await second.response.text();

      assert.equal(requests.length, 2);
      assert.equal(requests[0].serialized, requests[1].serialized, "wire bytes must be stable");
      assert.deepEqual(requests[0].body, requests[1].body);
      for (const request of requests) {
        assertFollowUpWire(request.body, alias);
        assertNoSideChannels(request.body, request.serialized);
        const call = records(request.body.input).find((item) => item.type === "function_call");
        assert.ok(call);
        const names = new Set([
          declaredFunction(request.body).name,
          call.name,
          record(request.body.tool_choice).name,
        ]);
        assert.deepEqual([...names], [alias], "declaration, history, and choice use one alias");
      }
    }
  );

  assert.deepEqual(prepared.translatedBody, finalizedSnapshot);
  assert.deepEqual(client, originalClient);
});

test("Muse fallback preparation cannot contaminate a non-Muse Responses target", async () => {
  const alias = expectedAlias();
  const immutableClient = followUpClientBody(initialClientBody(), originalClientCall());
  const original = structuredClone(immutableClient);
  deepFreeze(immutableClient);

  const muse = prepare(immutableClient, false, "muse-code", MUSE_CREDENTIALS_A);
  const fallback = prepare(immutableClient, false, FALLBACK_PROVIDER, FALLBACK_CREDENTIALS);
  assertPreparedLedgers(muse, alias);
  assert.equal(fallback.toolNameMap, null, "Muse alias ledger must not leak to fallback");
  assert.equal(fallback.requestToolIdentityMap, null);
  assertFollowUpWire(fallback.translatedBody, ORIGINAL_NAME);
  assert.equal(JSON.stringify(fallback.translatedBody).includes(alias), false);

  await withMockFetch(
    (request) => {
      assert.ok(
        request.url === MUSE_URL || request.url === FALLBACK_URL,
        `unexpected unmocked target: ${request.url}`
      );
      return mockResponse(upstreamFinalResponse(), false);
    },
    async (requests) => {
      const museResult = await dispatch("muse-code", muse, false, MUSE_CREDENTIALS_A);
      const fallbackResult = await dispatch(
        FALLBACK_PROVIDER,
        fallback,
        false,
        FALLBACK_CREDENTIALS
      );
      assert.equal(museResult.response.status, 200);
      assert.equal(fallbackResult.response.status, 200);
      await museResult.response.text();
      await fallbackResult.response.text();

      assert.equal(requests.length, 2);
      assert.equal(requests[0].url, MUSE_URL);
      assert.equal(requests[1].url, FALLBACK_URL);
      assertFollowUpWire(requests[0].body, alias);
      assertFollowUpWire(requests[1].body, ORIGINAL_NAME);
      assertNoSideChannels(requests[0].body, requests[0].serialized);
      assertNoSideChannels(requests[1].body, requests[1].serialized);
      assert.equal(requests[1].serialized.includes(alias), false);
    }
  );

  assert.equal(Object.isFrozen(immutableClient), true);
  assert.deepEqual(immutableClient, original, "both targets must share an unchanged client body");
});

test.after(() => resetDbInstance());
