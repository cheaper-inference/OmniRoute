import assert from "node:assert/strict";
import test from "node:test";

import { aliasMuseToolNames } from "../../open-sse/executors/museToolNameAliases.ts";
import {
  translateNonStreamingClientResponse,
  type NonStreamingClientTranslateInput,
} from "../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts";
import { extractRequestToolMetadata } from "../../open-sse/handlers/chatCore/requestToolIdentity.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { restoreResponsesToolNames } from "../../open-sse/translator/helpers/responsesToolNameRestore.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

type JsonRecord = Record<string, unknown>;

const FLAT_ALIAS = "muse_ClientSearch_41f0";
const FLAT_CLIENT_NAME = "ClientSearch";
const NAMESPACE_ALIAS = "muse_read_7a12";
const EXPLICIT_FLAT_ALIAS = "muse_bash_8c34";
const IDENTITY_ONLY_WIRE_NAME = "muse_identity_only_99ab";

const ALIASES = new Map<string, string>([
  [FLAT_ALIAS, FLAT_CLIENT_NAME],
  [NAMESPACE_ALIAS, "read"],
  [EXPLICIT_FLAT_ALIAS, "Bash"],
]);
const IDENTITIES = new Map<string, unknown>([
  [NAMESPACE_ALIAS, { namespace: "mcp__files", name: "read" }],
  [EXPLICIT_FLAT_ALIAS, { namespace: "", name: "Bash" }],
  [IDENTITY_ONLY_WIRE_NAME, { namespace: "tools", name: "identity_only" }],
]);

test.after(() => {
  resetDbInstance();
});

function toRecord(value: unknown): JsonRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as JsonRecord;
}

function toArray(value: unknown): unknown[] {
  assert.ok(Array.isArray(value));
  return value;
}

function toStringValue(value: unknown): string {
  assert.equal(typeof value, "string");
  return value as string;
}

function firstOutputItem(response: unknown): JsonRecord {
  const root = toRecord(response);
  return toRecord(toArray(root.output)[0]);
}

function firstChatFunction(response: unknown): JsonRecord {
  const root = toRecord(response);
  const choice = toRecord(toArray(root.choices)[0]);
  const message = toRecord(choice.message);
  const toolCall = toRecord(toArray(message.tool_calls)[0]);
  return toRecord(toolCall.function);
}

function firstClaudeToolUse(response: unknown): JsonRecord {
  const root = toRecord(response);
  const block = toArray(root.content).find((entry) => toRecord(entry).type === "tool_use");
  assert.ok(block);
  return toRecord(block);
}

function makeResponsesInput(
  clientResponseFormat: string,
  phase: "intermediate" | "final"
): NonStreamingClientTranslateInput {
  const schema = {
    type: "object",
    properties: {
      query: { type: "string" },
      mode: { type: "string", default: "auto" },
    },
    required: ["query"],
  };
  const clientTool = {
    type: "function",
    name: FLAT_CLIENT_NAME,
    parameters: schema,
    input_schema: schema,
  };
  const providerTool = { ...clientTool, name: FLAT_ALIAS };

  return {
    responseBody: {
      id: `resp_${phase}`,
      object: "response",
      status: "completed",
      model: "muse-test",
      output: [
        {
          id: "fc_1",
          type: "function_call",
          call_id: "call_1",
          name: FLAT_ALIAS,
          arguments: JSON.stringify({ query: "docs", mode: "auto" }),
          status: "completed",
        },
      ],
      usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
    },
    responsePayloadFormat: FORMATS.OPENAI_RESPONSES,
    clientResponseFormat,
    sourceFormat: clientResponseFormat,
    provider: "muse-code",
    model: "muse-test",
    requestBody: { tools: [providerTool] },
    clientRequestBody: { tools: [clientTool] },
    responseToolNameMap: ALIASES,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase,
  };
}

test("helper restores flat and real namespace identities without touching call data", () => {
  const output: JsonRecord[] = [
    {
      id: "fc_flat",
      type: "function_call",
      call_id: "call_flat",
      name: FLAT_ALIAS,
      arguments: '{"query":"docs"}',
      status: "completed",
      marker: 1,
    },
    {
      id: "fc_namespace",
      type: "custom_tool_call",
      call_id: "call_namespace",
      name: NAMESPACE_ALIAS,
      input: "README.md",
      status: "in_progress",
      marker: 2,
    },
    {
      id: "fc_explicit_flat",
      type: "function_call",
      call_id: "call_explicit_flat",
      namespace: "muse",
      name: EXPLICIT_FLAT_ALIAS,
      arguments: "{}",
    },
    {
      id: "fc_identity_only",
      type: "function_call",
      call_id: "call_identity_only",
      name: IDENTITY_ONLY_WIRE_NAME,
      arguments: "{}",
    },
    { type: "message", role: "assistant", content: [] },
  ];

  assert.equal(restoreResponsesToolNames(output, ALIASES, IDENTITIES), true);
  assert.deepEqual(output[0], {
    id: "fc_flat",
    type: "function_call",
    call_id: "call_flat",
    name: FLAT_CLIENT_NAME,
    arguments: '{"query":"docs"}',
    status: "completed",
    marker: 1,
  });
  assert.deepEqual(output[1], {
    id: "fc_namespace",
    type: "custom_tool_call",
    call_id: "call_namespace",
    namespace: "mcp__files",
    name: "read",
    input: "README.md",
    status: "in_progress",
    marker: 2,
  });
  assert.deepEqual(output[2], {
    id: "fc_explicit_flat",
    type: "function_call",
    call_id: "call_explicit_flat",
    name: "Bash",
    arguments: "{}",
  });
  assert.deepEqual(output[3], {
    id: "fc_identity_only",
    type: "function_call",
    call_id: "call_identity_only",
    namespace: "tools",
    name: "identity_only",
    arguments: "{}",
  });
  assert.equal(restoreResponsesToolNames(output, ALIASES, IDENTITIES), false);
});

test("helper uses alias and identity ledgers independently with identity precedence", () => {
  const aliasOnly: JsonRecord = {
    output: [{ type: "function_call", name: FLAT_ALIAS, arguments: "{}" }],
  };
  assert.equal(restoreResponsesToolNames(aliasOnly, ALIASES, null), true);
  assert.deepEqual(firstOutputItem(aliasOnly), {
    type: "function_call",
    name: FLAT_CLIENT_NAME,
    arguments: "{}",
  });

  const identityOnly: JsonRecord = {
    output: [{ type: "function_call", name: IDENTITY_ONLY_WIRE_NAME, arguments: "{}" }],
  };
  assert.equal(restoreResponsesToolNames(identityOnly, null, IDENTITIES), true);
  assert.deepEqual(firstOutputItem(identityOnly), {
    type: "function_call",
    namespace: "tools",
    name: "identity_only",
    arguments: "{}",
  });

  const malformedIdentity: JsonRecord = {
    output: [{ type: "function_call", name: FLAT_ALIAS, arguments: "{}" }],
  };
  assert.equal(
    restoreResponsesToolNames(
      malformedIdentity,
      ALIASES,
      new Map<string, unknown>([[FLAT_ALIAS, "not-an-identity"]])
    ),
    true
  );
  assert.equal(firstOutputItem(malformedIdentity).name, FLAT_CLIENT_NAME);
});

test("helper restores output-item events and completed/incomplete terminal snapshots", () => {
  for (const eventType of ["response.output_item.added", "response.output_item.done"]) {
    const event: JsonRecord = {
      type: eventType,
      output_index: 0,
      item: {
        type: "function_call",
        name: NAMESPACE_ALIAS,
        arguments: "{}",
      },
    };
    assert.equal(restoreResponsesToolNames(event, ALIASES, IDENTITIES), true, eventType);
    assert.deepEqual(toRecord(event.item), {
      type: "function_call",
      namespace: "mcp__files",
      name: "read",
      arguments: "{}",
    });
    assert.equal(restoreResponsesToolNames(event, ALIASES, IDENTITIES), false, eventType);
  }

  for (const status of ["completed", "incomplete"] as const) {
    const event: JsonRecord = {
      type: `response.${status}`,
      response: {
        id: `resp_${status}`,
        object: "response",
        status,
        output: [{ type: "custom_tool_call", name: FLAT_ALIAS, input: "query" }],
      },
    };
    assert.equal(restoreResponsesToolNames(event, ALIASES, IDENTITIES), true, status);
    const response = toRecord(event.response);
    assert.deepEqual(firstOutputItem(response), {
      type: "custom_tool_call",
      name: FLAT_CLIENT_NAME,
      input: "query",
    });
  }
});

test("helper ignores unknown names and malformed or mixed ledger entries safely", () => {
  const aliases = new Map<unknown, unknown>([
    ["Muse_good", "AliasShouldLose"],
    ["Muse_bad_identity", "BadIdentityFallback"],
    ["Muse_empty_identity", "EmptyIdentityFallback"],
    ["Muse_wrong_key", "WrongKeyFallback"],
    ["Muse_object_alias", { namespace: "muse", name: "invented" }],
    [42, "non-string-key"],
  ]) as unknown as ReadonlyMap<string, string>;
  const identities = new Map<unknown, unknown>([
    ["Muse_good", { namespace: "", name: "GoodClientTool" }],
    ["Muse_bad_identity", "BadClientTool"],
    ["Muse_empty_identity", { namespace: "", name: "" }],
    ["Muse_other_key", { namespace: "muse", name: "wrong" }],
    [7, { namespace: "muse", name: "wrong" }],
  ]) as unknown as ReadonlyMap<string, unknown>;
  const payload: JsonRecord = {
    output: [
      { type: "function_call", name: "Muse_good", arguments: "{}" },
      {
        type: "function_call",
        namespace: "legitimate",
        name: "Muse_bad_identity",
        arguments: "{}",
      },
      { type: "function_call", name: "Muse_empty_identity", arguments: "{}" },
      { type: "function_call", name: "Muse_wrong_key", arguments: "{}" },
      { type: "function_call", name: "Muse_object_alias", arguments: "{}" },
      { type: "function_call", name: "Muse_unknown", arguments: "{}" },
      { type: "function_call_output", name: "Muse_good", output: "unchanged" },
    ],
  };

  assert.equal(restoreResponsesToolNames(payload, aliases, identities), true);
  const items = toArray(payload.output).map(toRecord);
  assert.equal(items[0].name, "GoodClientTool");
  assert.equal("namespace" in items[0], false);
  assert.deepEqual(
    items.slice(1).map((item) => item.name),
    [
      "BadIdentityFallback",
      "EmptyIdentityFallback",
      "WrongKeyFallback",
      "Muse_object_alias",
      "Muse_unknown",
      "Muse_good",
    ]
  );
  assert.equal(items[1].namespace, "legitimate");

  for (const malformedPayload of [
    null,
    undefined,
    1,
    "response",
    {},
    { output: {} },
    { output: [null, [], { type: "function_call", name: 9 }] },
  ]) {
    assert.equal(restoreResponsesToolNames(malformedPayload, aliases, identities), false);
  }
  assert.equal(restoreResponsesToolNames(payload, null, identities), false);
  assert.equal(restoreResponsesToolNames(payload, aliases, null), false);
});

test("actual Task 1 ledgers keep flat and namespaced same-leaf calls distinct", () => {
  const schema = { type: "object", properties: { path: { type: "string" } } };
  const clientRequest: JsonRecord = {
    model: "muse-test",
    tools: [
      { type: "function", name: "read_file", parameters: schema },
      {
        type: "namespace",
        name: "files",
        tools: [{ type: "function", name: "read_file", parameters: schema }],
      },
    ],
  };
  const providerRequest = toRecord(aliasMuseToolNames(clientRequest));
  const declarations = toArray(providerRequest.tools).map(toRecord);
  const flatAlias = toStringValue(declarations[0].name);
  const namespacedAlias = toStringValue(toRecord(toArray(declarations[1].tools)[0]).name);

  const { requestToolIdentityMap, toolNameAliasMap } = extractRequestToolMetadata(providerRequest);
  assert.ok(toolNameAliasMap instanceof Map);
  assert.ok(requestToolIdentityMap instanceof Map);
  assert.equal(toolNameAliasMap.get(flatAlias), "read_file");
  assert.equal(toolNameAliasMap.get(namespacedAlias), "read_file");
  assert.equal(requestToolIdentityMap.has(flatAlias), false);
  assert.deepEqual(requestToolIdentityMap.get(namespacedAlias), {
    namespace: "files",
    name: "read_file",
  });
  assert.equal(Object.hasOwn(providerRequest, "_toolNameMap"), false);
  assert.equal(Object.hasOwn(providerRequest, "_namespaceToolIdentityMap"), false);
  assert.equal(JSON.stringify(providerRequest).includes("_toolNameMap"), false);

  const result = translateNonStreamingClientResponse({
    responseBody: {
      id: "resp_same_leaf",
      object: "response",
      status: "completed",
      output: [
        {
          id: "fc_flat",
          type: "function_call",
          call_id: "call_flat",
          name: flatAlias,
          arguments: '{"path":"flat.txt"}',
          status: "completed",
        },
        {
          id: "fc_namespaced",
          type: "function_call",
          call_id: "call_namespaced",
          name: namespacedAlias,
          arguments: '{"path":"namespaced.txt"}',
          status: "completed",
        },
      ],
    },
    responsePayloadFormat: FORMATS.OPENAI_RESPONSES,
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "muse-code",
    model: "muse-test",
    requestBody: providerRequest,
    clientRequestBody: clientRequest,
    responseToolNameMap: toolNameAliasMap,
    requestToolIdentityMap,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "intermediate",
  });
  const output = toArray(toRecord(result.response).output).map(toRecord);
  assert.equal(output[0].name, "read_file");
  assert.equal("namespace" in output[0], false, "flat alias must stay flat");
  assert.equal(output[0].id, "fc_flat");
  assert.equal(output[1].name, "read_file");
  assert.equal(output[1].namespace, "files");
  assert.equal(output[1].id, "fc_namespaced");
});

test("explicit-flat function calls survive custom classification without a namespace", () => {
  const aliases = new Map([[EXPLICIT_FLAT_ALIAS, "bash"]]);
  const identities = new Map([[EXPLICIT_FLAT_ALIAS, { namespace: "", name: "bash" }]]);
  const result = translateNonStreamingClientResponse({
    responseBody: {
      id: "resp_custom_flat",
      object: "response",
      status: "completed",
      output: [
        {
          id: "fc_custom_flat",
          type: "function_call",
          call_id: "call_custom_flat",
          namespace: "muse",
          name: EXPLICIT_FLAT_ALIAS,
          arguments: '{"input":"echo ok"}',
          status: "in_progress",
        },
      ],
    },
    responsePayloadFormat: FORMATS.OPENAI_RESPONSES,
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "muse-code",
    model: "muse-test",
    requestBody: { input: "run it" },
    responseToolNameMap: aliases,
    customToolNames: new Set(["bash"]),
    requestToolIdentityMap: identities,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "final",
  });

  assert.deepEqual(firstOutputItem(result.response), {
    id: "fc_custom_flat",
    type: "custom_tool_call",
    call_id: "call_custom_flat",
    name: "bash",
    input: "echo ok",
    status: "in_progress",
  });
});

test("native Responses JSON restores aliases in both phases and memory extraction", () => {
  for (const phase of ["intermediate", "final"] as const) {
    const result = translateNonStreamingClientResponse(
      makeResponsesInput(FORMATS.OPENAI_RESPONSES, phase)
    );
    const visible = firstOutputItem(result.response);
    const memory = firstOutputItem(result.responseForMemoryExtraction);

    assert.equal(visible.name, FLAT_CLIENT_NAME, phase);
    assert.equal(memory.name, FLAT_CLIENT_NAME, `${phase} memory extraction`);
    assert.equal("namespace" in visible, false, phase);
    assert.equal(visible.id, "fc_1");
    assert.equal(visible.call_id, "call_1");
    assert.equal(visible.status, "completed");
    assert.equal(visible.arguments, JSON.stringify({ query: "docs", mode: "auto" }));
  }
});

test("Responses to Chat restores the declared name before schema-aware argument cleanup", () => {
  const result = translateNonStreamingClientResponse(
    makeResponsesInput(FORMATS.OPENAI, "intermediate")
  );
  const fn = firstChatFunction(result.response);

  assert.equal(fn.name, FLAT_CLIENT_NAME);
  assert.deepEqual(JSON.parse(String(fn.arguments)), { query: "docs" });
  assert.equal(firstChatFunction(result.responseForMemoryExtraction).name, FLAT_CLIENT_NAME);
});

test("Responses to Claude restores the declared name and preserves schema cleanup", () => {
  const result = translateNonStreamingClientResponse(makeResponsesInput(FORMATS.CLAUDE, "final"));
  const toolUse = firstClaudeToolUse(result.response);

  assert.equal(toolUse.name, FLAT_CLIENT_NAME);
  assert.deepEqual(toolUse.input, { query: "docs" });
  assert.equal(firstClaudeToolUse(result.responseForMemoryExtraction).name, FLAT_CLIENT_NAME);
});
