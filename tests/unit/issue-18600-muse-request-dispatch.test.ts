import "../_setup/isolateDataDir.ts";
import assert from "node:assert/strict";
import test from "node:test";

import { getDefaultExecutor } from "../../open-sse/executors/defaultResolver.ts";
import { finalizeTranslatedRequest } from "../../open-sse/handlers/chatCore/translatedRequestFinalize.ts";
import { translateNonStreamingClientResponse } from "../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts";
import { normalizeExecutorResult } from "../../open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { checkFallbackError } from "../../open-sse/services/accountFallback.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  buildErrorBody,
  createErrorResult,
  parseUpstreamError,
} from "../../open-sse/utils/error.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

type JsonRecord = Record<string, unknown>;
type Finalized = ReturnType<typeof finalizeTranslatedRequest>;

const MODEL = "muse-spark-1.3";
const COLLISIONS = new Set([
  "read_file",
  "write_file",
  "edit_file",
  "bash",
  "web_search",
  "tool_search",
  "subagent_send_message",
  "subagent_cancel",
]);
const CREDENTIALS = {
  apiKey: "LLM|fake-muse-test-key",
  providerSpecificData: { baseUrl: "https://api.meta.ai/v1" },
};
const SCHEMA = {
  type: "object",
  properties: { path: { type: "string" }, mode: { type: "string", default: "auto" } },
  required: ["path"],
};
const ARGUMENTS = { path: "a.txt", mode: "auto" };

function record(value: unknown): JsonRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as JsonRecord;
}

function array(value: unknown): unknown[] {
  assert.ok(Array.isArray(value));
  return value;
}

function functions(body: JsonRecord): JsonRecord[] {
  return array(body.tools).flatMap((value) => {
    const tool = record(value);
    if (tool.type === "namespace") {
      return array(tool.tools)
        .map(record)
        .filter((child) => child.type === "function" || child.type === undefined)
        .map((child) => ({ ...child, namespace: tool.name }));
    }
    if (tool.type !== "function") return [];
    return [tool.function ? record(tool.function) : tool];
  });
}

function clientBody(sourceFormat: string): JsonRecord {
  if (sourceFormat === FORMATS.OPENAI_RESPONSES) {
    return {
      model: MODEL,
      input: [
        { type: "message", role: "user", content: [{ type: "input_text", text: "Read old.txt" }] },
        {
          type: "function_call",
          id: "fc_previous",
          call_id: "call_previous",
          name: "read_file",
          arguments: '{"path":"old.txt"}',
        },
        { type: "function_call_output", call_id: "call_previous", output: "old contents" },
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Now read a.txt" }],
        },
      ],
      tools: [
        ...[...COLLISIONS].map((name) => ({ type: "function", name, parameters: SCHEMA })),
        { type: "function", name: "get_weather", parameters: SCHEMA },
        { type: "web_search" },
      ],
      tool_choice: { type: "function", name: "read_file" },
    };
  }
  if (sourceFormat === FORMATS.CLAUDE) {
    return {
      model: MODEL,
      max_tokens: 1024,
      messages: [
        { role: "user", content: "Read old.txt" },
        {
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: "call_previous",
              name: "read_file",
              input: { path: "old.txt" },
            },
          ],
        },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: "call_previous", content: "old contents" },
            { type: "text", text: "Now read a.txt" },
          ],
        },
      ],
      tools: [...COLLISIONS].map((name) => ({ name, description: name, input_schema: SCHEMA })),
      tool_choice: { type: "tool", name: "read_file" },
    };
  }
  return {
    model: MODEL,
    messages: [
      { role: "user", content: "Read old.txt" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          {
            id: "call_previous",
            type: "function",
            function: { name: "read_file", arguments: '{"path":"old.txt"}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "call_previous", content: "old contents" },
      { role: "user", content: "Now read a.txt" },
    ],
    tools: [...COLLISIONS].map((name) => ({
      type: "function",
      function: { name, parameters: SCHEMA },
    })),
    tool_choice: { type: "function", function: { name: "read_file" } },
  };
}

function prepare(
  client: JsonRecord,
  sourceFormat: string,
  stream: boolean,
  provider = "muse-code",
  targetFormat = FORMATS.OPENAI_RESPONSES,
  credentials: JsonRecord = CREDENTIALS
): Finalized {
  const translated = record(
    translateRequest(
      sourceFormat,
      targetFormat,
      MODEL,
      structuredClone(client),
      stream,
      credentials,
      provider
    )
  );
  return finalizeTranslatedRequest({
    translatedBody: translated,
    body: client,
    provider,
    alias: provider === "muse-code" ? "mc" : null,
    effectiveModel: `${provider}/${MODEL}`,
    sourceFormat,
    targetFormat,
    isClaudePassthrough: false,
    credentials,
    previousResponseIdMode: "off",
  });
}

function responseBody(fn: JsonRecord): JsonRecord {
  return {
    id: "resp_muse_mock",
    object: "response",
    model: MODEL,
    status: "completed",
    output: [
      {
        type: "function_call",
        id: "fc_mock",
        call_id: "call_mock",
        name: fn.name,
        ...(fn.namespace ? { namespace: fn.namespace } : {}),
        arguments: JSON.stringify(ARGUMENTS),
        status: "completed",
      },
    ],
    usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
  };
}

function sse(body: JsonRecord): string {
  const item = record(array(body.output)[0]);
  const added = { ...item, arguments: "", status: "in_progress" };
  const events = [
    { type: "response.created", response: { id: body.id, model: MODEL, output: [] } },
    { type: "response.output_item.added", output_index: 0, item: added },
    {
      type: "response.function_call_arguments.delta",
      output_index: 0,
      item_id: item.id,
      delta: item.arguments,
    },
    {
      type: "response.function_call_arguments.done",
      output_index: 0,
      item_id: item.id,
      arguments: item.arguments,
    },
    { type: "response.output_item.done", output_index: 0, item },
    { type: "response.completed", response: body },
  ];
  return events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
}

function parseSse(text: string): JsonRecord[] {
  return text
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:") && line.slice(5).trim() !== "[DONE]")
    .map((line) => record(JSON.parse(line.slice(5).trim())));
}

async function withMockUpstream<T>(
  stream: boolean,
  run: (requests: JsonRecord[]) => Promise<T>,
  genuineError: string | null = null
): Promise<T> {
  const originalFetch = globalThis.fetch;
  const requests: JsonRecord[] = [];
  globalThis.fetch = async (url, init) => {
    assert.equal(String(url), "https://api.meta.ai/v1/responses", "all inference is mocked");
    const wire = record(JSON.parse(String(init?.body)));
    requests.push(wire);
    const declarations = functions(wire);
    const rejected = declarations.some((fn) => COLLISIONS.has(String(fn.name)));
    if (genuineError || rejected) {
      const errorBody = genuineError
        ? { error: { message: genuineError, type: "invalid_request_error" } }
        : buildErrorBody(403, "Function name collides with a Muse builtin tool");
      return new Response(JSON.stringify(errorBody), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    const fn = declarations.find((candidate) =>
      String(candidate.name).startsWith("muse_read_file_")
    );
    assert.ok(fn, "mock must return an actual declared wire name");
    const payload = responseBody(fn);
    return new Response(stream ? sse(payload) : JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": stream ? "text/event-stream" : "application/json" },
    });
  };
  try {
    return await run(requests);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function dispatch(
  prepared: Finalized,
  stream: boolean,
  credentials: JsonRecord = CREDENTIALS
) {
  return normalizeExecutorResult(
    await getDefaultExecutor("muse-code").execute({
      model: MODEL,
      body: prepared.translatedBody,
      stream,
      credentials,
    })
  );
}

function assertWireIdentity(wire: JsonRecord, prepared: Finalized): string {
  assert.ok(prepared.toolNameMap instanceof Map, "finalization must capture the alias ledger");
  const declarations = functions(wire);
  assert.equal(
    declarations.some((fn) => COLLISIONS.has(String(fn.name))),
    false
  );
  const read = declarations.find(
    (fn) => prepared.toolNameMap?.get(String(fn.name)) === "read_file"
  );
  assert.ok(read);
  const alias = String(read.name);
  assert.match(alias, /^muse_[A-Za-z0-9_-]{1,59}$/);
  assert.ok(alias.length <= 64);
  const calls = array(wire.input)
    .map(record)
    .filter((item) => item.type === "function_call");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].name, alias, "history and declarations must agree");
  assert.equal(calls[0].arguments, '{"path":"old.txt"}');
  const choice = record(wire.tool_choice);
  if (choice.type === "allowed_tools") {
    assert.equal(record(array(choice.tools)[0]).name, alias);
  } else {
    assert.equal(choice.name, alias, "forced choice and declarations must agree");
  }
  for (const key of ["_toolNameMap", "_namespaceToolIdentityMap", "_disableToolPrefix"]) {
    assert.equal(key in prepared.translatedBody, false, `${key} consumed before execution`);
    assert.equal(key in wire, false, `${key} must not serialize upstream`);
  }
  assert.equal(wire.model, MODEL);
  return alias;
}

async function translateClient(
  prepared: Finalized,
  upstream: Response,
  client: JsonRecord,
  sourceFormat: string,
  stream: boolean
): Promise<{ payload: JsonRecord; text: string }> {
  if (!stream) {
    const result = translateNonStreamingClientResponse({
      responseBody: await upstream.json(),
      responsePayloadFormat: FORMATS.OPENAI_RESPONSES,
      clientResponseFormat: sourceFormat,
      sourceFormat,
      provider: "muse-code",
      model: MODEL,
      requestBody: prepared.translatedBody,
      clientRequestBody: client,
      responseToolNameMap: prepared.toolNameMap,
      requestToolIdentityMap: prepared.requestToolIdentityMap,
      reasoningCacheScope: null,
      clientHeaders: null,
      isClaudeCodeCompatible: false,
      phase: "final",
    });
    const payload = record(result.response);
    return { payload, text: JSON.stringify(payload) };
  }
  assert.ok(upstream.body);
  const transform = createSSEStream({
    mode: sourceFormat === FORMATS.OPENAI_RESPONSES ? "passthrough" : "translate",
    targetFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat,
    clientResponseFormat: sourceFormat,
    provider: "muse-code",
    model: MODEL,
    body:
      sourceFormat === FORMATS.OPENAI_RESPONSES
        ? prepared.translatedBody
        : { ...prepared.translatedBody, tools: client.tools },
    clientTools: array(client.tools),
    toolNameMap: prepared.toolNameMap,
    requestToolIdentityMap: prepared.requestToolIdentityMap,
  });
  const text = await new Response(upstream.body.pipeThrough(transform)).text();
  const events = parseSse(text);
  if (sourceFormat === FORMATS.OPENAI_RESPONSES) {
    const terminal = events.find((event) => event.type === "response.completed");
    assert.ok(terminal);
    return { payload: record(terminal.response), text };
  }
  if (sourceFormat === FORMATS.CLAUDE) {
    const start = events.find((event) => record(event.content_block ?? {}).type === "tool_use");
    assert.ok(start);
    const partial = events.map((event) => record(event.delta ?? {}).partial_json ?? "").join("");
    return {
      payload: { name: record(start.content_block).name, arguments: JSON.parse(partial) },
      text,
    };
  }
  const calls = events.flatMap((event) => {
    if (!Array.isArray(event.choices)) return [];
    const delta = record(record(event.choices[0]).delta ?? {});
    return Array.isArray(delta.tool_calls) ? delta.tool_calls.map(record) : [];
  });
  const named = calls.map((call) => record(call.function ?? {})).filter((fn) => fn.name);
  assert.ok(named.length > 0);
  assert.ok(named.every((fn) => fn.name === "read_file"));
  const args = calls.map((call) => record(call.function ?? {}).arguments ?? "").join("");
  return { payload: { name: named[0].name, arguments: JSON.parse(args) }, text };
}

function assertClientIdentity(payload: JsonRecord, format: string, stream: boolean): void {
  if (format === FORMATS.OPENAI_RESPONSES) {
    const call = record(array(payload.output)[0]);
    assert.equal(call.name, "read_file");
    assert.equal(call.call_id, "call_mock");
    return;
  }
  if (stream) {
    assert.equal(payload.name, "read_file");
    assert.deepEqual(payload.arguments, { path: "a.txt" });
    return;
  }
  if (format === FORMATS.CLAUDE) {
    const call = array(payload.content)
      .map(record)
      .find((block) => block.type === "tool_use");
    assert.ok(call);
    assert.equal(call.name, "read_file");
    assert.deepEqual(call.input, { path: "a.txt" });
    return;
  }
  const message = record(record(array(payload.choices)[0]).message);
  const fn = record(record(array(message.tool_calls)[0]).function);
  assert.equal(fn.name, "read_file");
  assert.deepEqual(JSON.parse(String(fn.arguments)), { path: "a.txt" });
}

for (const format of [FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, FORMATS.CLAUDE]) {
  for (const stream of [false, true]) {
    test(`Muse ${format} -> actual executor -> ${stream ? "SSE" : "JSON"} restores client identity`, async () => {
      const client = clientBody(format);
      const original = structuredClone(client);
      const prepared = prepare(client, format, stream);
      await withMockUpstream(stream, async (requests) => {
        const result = await dispatch(prepared, stream);
        assert.equal(
          result.response.status,
          200,
          "reserved declarations must no longer trigger the mocked 403"
        );
        assert.equal(requests.length, 1);
        const alias = assertWireIdentity(requests[0], prepared);
        const translated = await translateClient(prepared, result.response, client, format, stream);
        assertClientIdentity(translated.payload, format, stream);
        assert.equal(
          translated.text.includes(alias),
          false,
          "provider alias must not reach the client"
        );
        assert.deepEqual(client, original, "client history/tools must remain unchanged");
      });
    });
  }
}

for (const stream of [false, true]) {
  test(`native namespace identity survives actual Muse ${stream ? "SSE" : "JSON"} dispatch`, async () => {
    const client = clientBody(FORMATS.OPENAI_RESPONSES);
    client.tools = [
      {
        type: "namespace",
        name: "files",
        tools: [{ type: "function", name: "read_file", parameters: SCHEMA }],
      },
    ];
    record(array(client.input)[1]).namespace = "files";
    client.tool_choice = { type: "function", name: "read_file", namespace: "files" };
    const original = structuredClone(client);
    const prepared = prepare(client, FORMATS.OPENAI_RESPONSES, stream);
    await withMockUpstream(stream, async (requests) => {
      const result = await dispatch(prepared, stream);
      assert.equal(result.response.status, 200);
      const alias = assertWireIdentity(requests[0], prepared);
      assert.deepEqual(prepared.requestToolIdentityMap?.get(alias), {
        namespace: "files",
        name: "read_file",
      });
      const translated = await translateClient(
        prepared,
        result.response,
        client,
        FORMATS.OPENAI_RESPONSES,
        stream
      );
      const call = record(array(translated.payload.output)[0]);
      assert.equal(call.name, "read_file");
      assert.equal(call.namespace, "files");
      assert.equal(translated.text.includes(alias), false);
      assert.deepEqual(client, original);
    });
  });
}

test("native allowed_tools selection and hosted web_search remain consistent", async () => {
  const client = clientBody(FORMATS.OPENAI_RESPONSES);
  client.tool_choice = {
    type: "allowed_tools",
    mode: "required",
    tools: [{ type: "function", name: "read_file" }, { type: "web_search" }],
  };
  const prepared = prepare(client, FORMATS.OPENAI_RESPONSES, false);
  await withMockUpstream(false, async (requests) => {
    const result = await dispatch(prepared, false);
    assert.equal(result.response.status, 200);
    assertWireIdentity(requests[0], prepared);
    assert.ok(
      array(requests[0].tools)
        .map(record)
        .some((tool) => tool.type === "web_search")
    );
    assert.deepEqual(record(requests[0].tool_choice).mode, "required");
    assert.deepEqual(array(record(requests[0].tool_choice).tools)[1], { type: "web_search" });
  });
});

test("activation applies to access-token credentials as well as API keys", async () => {
  const credentials = {
    accessToken: "fake-muse-access-token",
    providerSpecificData: CREDENTIALS.providerSpecificData,
  };
  const client = clientBody(FORMATS.OPENAI_RESPONSES);
  const prepared = prepare(
    client,
    FORMATS.OPENAI_RESPONSES,
    false,
    "muse-code",
    FORMATS.OPENAI_RESPONSES,
    credentials
  );
  await withMockUpstream(false, async (requests) => {
    const result = await dispatch(prepared, false, credentials);
    assert.equal(result.response.status, 200);
    assertWireIdentity(requests[0], prepared);
  });
});

for (const provider of ["openai", "opencode-zen", "muse-code-other", "mc"]) {
  test(`the resolved provider gate does not rewrite ${provider}`, () => {
    const client = clientBody(FORMATS.OPENAI_RESPONSES);
    const prepared = prepare(client, FORMATS.OPENAI_RESPONSES, false, provider);
    assert.equal(functions(prepared.translatedBody)[0].name, "read_file");
    assert.equal(prepared.toolNameMap, null);
    assert.equal(JSON.stringify(prepared.translatedBody).includes("muse_read_file_"), false);
  });
}

test("Muse with a non-Responses target does not activate the helper", () => {
  const client = clientBody(FORMATS.OPENAI);
  const prepared = prepare(client, FORMATS.OPENAI, false, "muse-code", FORMATS.OPENAI);
  assert.equal(functions(prepared.translatedBody)[0].name, "read_file");
  assert.equal(prepared.toolNameMap, null);
});

test("genuine upstream 403 still follows sanitized errors and existing cooldown classification", async () => {
  const client = clientBody(FORMATS.OPENAI_RESPONSES);
  const prepared = prepare(client, FORMATS.OPENAI_RESPONSES, false);
  const message = "Subscription access denied\n    at providerInternal (/private/provider.js:12:3)";
  await withMockUpstream(
    false,
    async (requests) => {
      const result = await dispatch(prepared, false);
      assert.equal(result.response.status, 403);
      assert.equal(requests.length, 1, "name rewriting must not hide or retry a genuine 403");
      const parsed = await parseUpstreamError(result.response, "muse-code");
      const error = createErrorResult(parsed.statusCode, parsed.message, parsed.retryAfterMs);
      assert.equal(error.success, false);
      assert.equal(error.response.status, 403);
      const visible = JSON.stringify(await error.response.json());
      assert.equal(visible.includes("providerInternal"), false);
      assert.equal(visible.includes("/private/provider.js"), false);
      assert.deepEqual(checkFallbackError(403, message, 0, MODEL, "muse-code"), {
        shouldFallback: true,
        cooldownMs: 3000,
        baseCooldownMs: 3000,
        newBackoffLevel: 1,
        usedUpstreamRetryHint: false,
        reason: "auth_error",
      });
    },
    message
  );
});

test.after(() => resetDbInstance());
