import "../_setup/isolateDataDir.ts";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  applyServerOwnedToolLoopIfNeeded,
  finalizeServerOwnedFollowUpRequest,
} from "../../open-sse/handlers/chatCore/serverOwnedToolLoopWire.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import type {
  NonStreamingProviderLegResult,
  ProviderLegReceipt,
} from "../../src/lib/skills/toolLoopTypes.ts";

type JsonRecord = Record<string, unknown>;
type OkLeg = Extract<NonStreamingProviderLegResult, { kind: "ok" }>;

const MODEL = "muse-spark-1.3";
const ORIGINAL_NAME = "read_file";
const CALL_ID = "call_server_read_1";
const ARGUMENTS = '{"path":"notes.txt"}';
const TOOL_RESULT = { contents: "alpha\nbeta" };
const TOOL_SCHEMA = {
  type: "object",
  properties: { path: { type: "string" } },
  required: ["path"],
};
const NON_STREAMING_RESPONSE_PATH = fileURLToPath(
  new URL("../../open-sse/handlers/chatCore/nonStreamingResponse.ts", import.meta.url)
);
const PRIVATE_CHANNELS = [
  "_toolNameMap",
  "_namespaceToolIdentityMap",
  "_disableToolPrefix",
] as const;

function record(value: unknown): JsonRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as JsonRecord;
}

function records(value: unknown): JsonRecord[] {
  assert.ok(Array.isArray(value));
  return value.map(record);
}

function expectedAlias(namespace = ""): string {
  const hash = createHash("sha256")
    .update(JSON.stringify([namespace, ORIGINAL_NAME]))
    .digest("hex")
    .slice(0, 16);
  return `muse_${ORIGINAL_NAME}_${hash}`;
}

function receipt(
  index: number,
  toolCalls: Array<{ id: string; name: string }>
): ProviderLegReceipt {
  return {
    index,
    connectionId: "conn-muse",
    provider: "muse-code",
    model: MODEL,
    startedAt: `2026-11-01T04:42:0${index}.000Z`,
    endedAt: `2026-11-01T04:42:0${index + 1}.000Z`,
    latencyMs: 10,
    httpStatus: 200,
    errorType: null,
    usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
    serviceTier: null,
    computedCostUsd: 0.001,
    toolCalls,
    termination: toolCalls.length > 0 ? "tool_calls" : "completed",
    clientVisible: true,
  };
}

function initialToolLeg(): OkLeg {
  return {
    kind: "ok",
    response: {
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: CALL_ID,
                type: "function",
                function: { name: ORIGINAL_NAME, arguments: ARGUMENTS },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    responseForMemoryExtraction: {},
    providerBody: { id: "resp-initial" },
    providerRequest: {},
    usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
    responsePayloadFormat: FORMATS.OPENAI,
    looksLikeSSE: false,
    connectionId: "conn-muse",
    headers: new Headers(),
    receipt: receipt(0, [{ id: CALL_ID, name: ORIGINAL_NAME }]),
  };
}

function finalOkLeg(providerRequest: JsonRecord): OkLeg {
  return {
    kind: "ok",
    response: {
      choices: [
        {
          message: { role: "assistant", content: "notes.txt contains alpha then beta" },
          finish_reason: "stop",
        },
      ],
    },
    responseForMemoryExtraction: { text: "notes.txt contains alpha then beta" },
    providerBody: { id: "resp-final" },
    providerRequest,
    usage: { prompt_tokens: 8, completion_tokens: 3, total_tokens: 11 },
    responsePayloadFormat: FORMATS.OPENAI,
    looksLikeSSE: false,
    connectionId: "conn-muse",
    headers: new Headers(),
    receipt: receipt(1, []),
  };
}

function chatSourceBody(): JsonRecord {
  return {
    model: MODEL,
    messages: [{ role: "user", content: "Read notes.txt and summarize it." }],
    tools: [
      {
        type: "function",
        function: {
          name: ORIGINAL_NAME,
          description: "Read one UTF-8 text file",
          parameters: TOOL_SCHEMA,
        },
      },
    ],
    tool_choice: { type: "function", function: { name: ORIGINAL_NAME } },
  };
}

function assertNoPrivateChannels(body: JsonRecord): void {
  const serialized = JSON.stringify(body);
  for (const key of PRIVATE_CHANNELS) {
    assert.equal(Object.hasOwn(body, key), false, `${key} must be consumed before wire use`);
    assert.equal(serialized.includes(`"${key}"`), false, `${key} must not serialize upstream`);
  }
}

function assertFlatFollowUpWire(body: JsonRecord, alias: string): void {
  const declaration = record(records(body.tools)[0]);
  assert.equal(declaration.type, "function");
  assert.equal(declaration.name, alias);
  assert.deepEqual(declaration.parameters, TOOL_SCHEMA);

  const input = records(body.input);
  const call = input.find((item) => item.type === "function_call");
  const result = input.find((item) => item.type === "function_call_output");
  assert.ok(call);
  assert.ok(result);
  assert.equal(call.name, alias);
  assert.equal(call.call_id, CALL_ID);
  assert.equal(call.arguments, ARGUMENTS);
  assert.equal(result.call_id, CALL_ID);
  assert.equal(result.output, JSON.stringify(TOOL_RESULT));

  const choice = record(body.tool_choice);
  assert.equal(choice.type, "function");
  assert.equal(choice.name, alias);
  assertNoPrivateChannels(body);
}

function attachMetadata(body: JsonRecord): void {
  Object.defineProperty(body, "_toolNameMap", {
    value: new Map([["legacy_wire", ORIGINAL_NAME]]),
    configurable: true,
    writable: true,
  });
  Object.defineProperty(body, "_namespaceToolIdentityMap", {
    value: new Map([["legacy_wire", { namespace: "files", name: ORIGINAL_NAME }]]),
    configurable: true,
    writable: true,
  });
  body._disableToolPrefix = true;
}

function directResponsesBody(namespace?: string): JsonRecord {
  const declaration = {
    type: "function",
    name: ORIGINAL_NAME,
    description: "Read one UTF-8 text file",
    parameters: TOOL_SCHEMA,
  };
  return {
    model: MODEL,
    input: [
      {
        type: "function_call",
        call_id: CALL_ID,
        name: ORIGINAL_NAME,
        ...(namespace ? { namespace } : {}),
        arguments: ARGUMENTS,
        status: "completed",
      },
      {
        type: "function_call_output",
        call_id: CALL_ID,
        output: JSON.stringify(TOOL_RESULT),
        status: "completed",
      },
    ],
    tools: namespace
      ? [{ type: "namespace", name: namespace, tools: [declaration] }]
      : [declaration],
    tool_choice: {
      type: "function",
      name: ORIGINAL_NAME,
      ...(namespace ? { namespace } : {}),
    },
  };
}

test("server-owned Chat follow-up re-aliases a restored Muse read_file turn", async () => {
  const alias = expectedAlias();
  const sourceBody = chatSourceBody();
  const originalSourceBody = structuredClone(sourceBody);
  const nextSourceBodies: JsonRecord[] = [];
  const finalizedWires: JsonRecord[] = [];
  const loggedReceipts: number[] = [];

  const loopResult = await applyServerOwnedToolLoopIfNeeded({
    enabled: true,
    stream: false,
    isResponsesEndpoint: false,
    sourceFormat: FORMATS.OPENAI,
    initialLeg: initialToolLeg(),
    sourceBody,
    skillsModelId: "openai",
    executionContext: {
      apiKeyId: "issue-18600",
      sessionId: "server-owned-follow-up",
      requestId: "request-1",
      builtinToolNames: [ORIGINAL_NAME],
      provider: "muse-code",
      model: MODEL,
    },
    expectedConnectionId: "conn-muse",
    executeServerOwned: async (calls) => {
      assert.equal(calls.length, 1);
      assert.equal(calls[0].id, CALL_ID);
      assert.equal(calls[0].name, ORIGINAL_NAME, "the initial leg is already client-restored");
      assert.deepEqual(calls[0].arguments, { path: "notes.txt" });
      return [
        {
          id: calls[0].id,
          name: calls[0].name,
          result: TOOL_RESULT,
          replayed: false,
        },
      ];
    },
    followUpLeg: async (nextSourceBody) => {
      nextSourceBodies.push(nextSourceBody);
      const nextSourceSnapshot = structuredClone(nextSourceBody);
      const translatedBody = record(
        translateRequest(
          FORMATS.OPENAI,
          FORMATS.OPENAI_RESPONSES,
          MODEL,
          { ...nextSourceBody },
          false,
          null,
          "muse-code"
        )
      );
      const finalized = finalizeServerOwnedFollowUpRequest({
        translatedBody,
        provider: "muse-code",
        targetFormat: FORMATS.OPENAI_RESPONSES,
      });

      assert.deepEqual(
        nextSourceBody,
        nextSourceSnapshot,
        "translation/finalization must not mutate the loop transcript"
      );
      assert.ok(finalized.toolNameMap instanceof Map);
      assert.deepEqual([...finalized.toolNameMap], [[alias, ORIGINAL_NAME]]);
      assertFlatFollowUpWire(finalized.translatedBody, alias);
      finalizedWires.push(finalized.translatedBody);
      return finalOkLeg(finalized.translatedBody);
    },
    logReceipt: (providerReceipt) => loggedReceipts.push(providerReceipt.index),
  });

  assert.equal(loopResult.kind, "ok");
  if (loopResult.kind !== "ok") return;
  assert.equal(loopResult.loop.followUps, 1);
  assert.equal(loopResult.loop.termination, "completed");
  assert.deepEqual(loggedReceipts, [0, 1]);
  assert.equal(nextSourceBodies.length, 1);
  assert.equal(finalizedWires.length, 1);

  const transcript = records(nextSourceBodies[0].messages);
  const assistant = transcript.find((message) => message.role === "assistant");
  const toolResult = transcript.find((message) => message.role === "tool");
  assert.ok(assistant);
  assert.ok(toolResult);
  const restoredCall = record(records(assistant.tool_calls)[0]);
  const restoredFunction = record(restoredCall.function);
  assert.equal(restoredCall.id, CALL_ID);
  assert.equal(restoredFunction.name, ORIGINAL_NAME);
  assert.equal(restoredFunction.arguments, ARGUMENTS);
  assert.equal(toolResult.tool_call_id, CALL_ID);
  assert.equal(toolResult.content, JSON.stringify(TOOL_RESULT));

  assertFlatFollowUpWire(finalizedWires[0], alias);
  assert.deepEqual(loopResult.leg.providerRequest, finalizedWires[0]);
  assert.deepEqual(sourceBody, originalSourceBody, "the original Chat request must stay unchanged");
});

test("follow-up finalization preserves native namespace identity while aliasing Muse", () => {
  const namespace = "files";
  const alias = expectedAlias(namespace);
  const finalized = finalizeServerOwnedFollowUpRequest({
    translatedBody: directResponsesBody(namespace),
    provider: "muse-code",
    targetFormat: FORMATS.OPENAI_RESPONSES,
  });

  const namespaceTool = record(records(finalized.translatedBody.tools)[0]);
  const declaration = record(records(namespaceTool.tools)[0]);
  const call = records(finalized.translatedBody.input).find(
    (item) => item.type === "function_call"
  );
  const choice = record(finalized.translatedBody.tool_choice);
  assert.ok(call);
  assert.equal(namespaceTool.name, namespace);
  assert.equal(declaration.name, alias);
  assert.equal(call.name, alias);
  assert.equal(call.namespace, namespace);
  assert.equal(call.call_id, CALL_ID);
  assert.equal(call.arguments, ARGUMENTS);
  assert.equal(choice.name, alias);
  assert.equal(choice.namespace, namespace);
  assert.deepEqual(finalized.toolNameMap && [...finalized.toolNameMap], [[alias, ORIGINAL_NAME]]);
  assert.deepEqual(finalized.requestToolIdentityMap?.get(alias), {
    namespace,
    name: ORIGINAL_NAME,
  });
  assertNoPrivateChannels(finalized.translatedBody);
});

for (const guard of [
  {
    label: "non-Muse provider",
    provider: "openai",
    targetFormat: FORMATS.OPENAI_RESPONSES,
  },
  {
    label: "non-Responses target",
    provider: "muse-code",
    targetFormat: FORMATS.OPENAI,
  },
]) {
  test(`follow-up finalization leaves read_file unchanged for ${guard.label}`, () => {
    const translatedBody = directResponsesBody();
    attachMetadata(translatedBody);
    const finalized = finalizeServerOwnedFollowUpRequest({
      translatedBody,
      provider: guard.provider,
      targetFormat: guard.targetFormat,
    });

    const declaration = record(records(finalized.translatedBody.tools)[0]);
    const call = records(finalized.translatedBody.input).find(
      (item) => item.type === "function_call"
    );
    const choice = record(finalized.translatedBody.tool_choice);
    assert.ok(call);
    assert.equal(declaration.name, ORIGINAL_NAME);
    assert.equal(call.name, ORIGINAL_NAME);
    assert.equal(choice.name, ORIGINAL_NAME);
    assert.deepEqual(finalized.toolNameMap && [...finalized.toolNameMap], [
      ["legacy_wire", ORIGINAL_NAME],
    ]);
    assert.deepEqual(finalized.requestToolIdentityMap?.get("legacy_wire"), {
      namespace: "files",
      name: ORIGINAL_NAME,
    });
    assertNoPrivateChannels(finalized.translatedBody);
  });
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function assertReturnedMapForwarded(
  followUpBlock: string,
  finalizationName: string,
  field: "toolNameMap" | "requestToolIdentityMap"
): void {
  const resultName = escapeRegex(finalizationName);
  const direct = new RegExp(`${field}\\s*:\\s*${resultName}\\.${field}\\b`);
  if (direct.test(followUpBlock)) return;

  const localAssignment = followUpBlock.match(
    new RegExp(`(?:const|let)\\s+([A-Za-z_$][\\w$]*)\\s*=\\s*${resultName}\\.${field}\\b`)
  );
  const destructuredAssignment = followUpBlock.match(
    new RegExp(
      `(?:const|let)\\s*\\{[^}]*\\b${field}\\s*:\\s*([A-Za-z_$][\\w$]*)[^}]*\\}` +
        `\\s*=\\s*${resultName}\\b`
    )
  );
  const localName = localAssignment?.[1] ?? destructuredAssignment?.[1];
  assert.ok(localName, `${field} must be read from ${finalizationName}`);
  assert.match(
    followUpBlock,
    new RegExp(`${field}\\s*:\\s*${escapeRegex(localName)}\\b`),
    `${field} returned by follow-up finalization must reach followUpLegInput`
  );
}

test("nonStreamingResponse finalizes follow-up translation before sync and dispatch", async () => {
  const source = await readFile(NON_STREAMING_RESPONSE_PATH, "utf8");
  const followUpStart = source.indexOf("followUpLeg: async");
  const followUpEnd = source.indexOf("logReceipt:", followUpStart);
  assert.ok(followUpStart >= 0 && followUpEnd > followUpStart, "followUpLeg block must exist");
  const followUpBlock = source.slice(followUpStart, followUpEnd);

  const translateAt = followUpBlock.indexOf("translateRequest(");
  const finalizeAt = followUpBlock.indexOf("finalizeServerOwnedFollowUpRequest(");
  const syncAt = followUpBlock.indexOf("syncExecuteTranslatedBody(");
  const dispatchAt = followUpBlock.indexOf("return runNonStreamingProviderLeg(");
  assert.ok(translateAt >= 0, "followUpLeg must translate the actual next source body");
  assert.ok(finalizeAt > translateAt, "follow-up finalization must run after translation");
  assert.ok(syncAt > finalizeAt, "follow-up finalization must run before wire-state sync");
  assert.ok(dispatchAt > syncAt, "wire-state sync must precede follow-up provider dispatch");

  const finalizationAssignment = followUpBlock.match(
    /(?:const|let)\s+([A-Za-z_$][\w$]*)\s*=\s*finalizeServerOwnedFollowUpRequest\s*\(/
  );
  assert.ok(finalizationAssignment, "followUpLeg must retain the finalization result");
  const finalizationName = finalizationAssignment[1];
  assert.match(
    followUpBlock,
    new RegExp(`translatedBody\\s*=\\s*${escapeRegex(finalizationName)}\\.translatedBody\\b`)
  );
  assertReturnedMapForwarded(followUpBlock, finalizationName, "toolNameMap");
  assertReturnedMapForwarded(followUpBlock, finalizationName, "requestToolIdentityMap");
});

test.after(() => resetDbInstance());
