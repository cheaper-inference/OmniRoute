import assert from "node:assert/strict";
import test from "node:test";

// Isolate DATA_DIR before the stream's imports can open SQLite or initialize logging.
await import("../_setup/isolateDataDir.ts");

const { aliasMuseToolNames } = await import("../../open-sse/executors/museToolNameAliases.ts");
const { extractRequestToolMetadata } =
  await import("../../open-sse/handlers/chatCore/requestToolIdentity.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { resolveStreamStateBody } =
  await import("../../open-sse/handlers/chatCore/streamStateBody.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type JsonRecord = Record<string, unknown>;
type StreamOptions = NonNullable<Parameters<typeof createSSEStream>[0]>;
type StreamCompletion = Parameters<NonNullable<StreamOptions["onComplete"]>>[0];
type RequestFixture = {
  providerBody: JsonRecord;
  metadata: ReturnType<typeof extractRequestToolMetadata>;
  wireName: string;
  namespace?: string;
};
type SchemaCase = {
  name: string;
  events: (fixture: RequestFixture) => JsonRecord[];
  terminateLastFrame?: boolean;
  expectsNamedDelta?: boolean;
};

const TOOL_SCHEMA = {
  type: "object",
  properties: {
    path: { type: "string" },
    mode: { type: "string", default: "auto" },
  },
  required: ["path"],
};
const UPSTREAM_ARGUMENTS = JSON.stringify({ path: "a.txt", mode: "auto" });
const UPSTREAM_NAMESPACE = "provider-internal";
const EXPECTED_USAGE = { input_tokens: 4, output_tokens: 2, total_tokens: 6 };
// Actual newline bytes keep these fixtures independent of escaped delimiter text.
const NEWLINE = String.fromCharCode(10);
const SSE_DELIMITER = NEWLINE + NEWLINE;

test.after(() => {
  resetDbInstance();
});

function record(value: unknown): JsonRecord {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as JsonRecord;
}

function records(value: unknown): JsonRecord[] {
  assert.ok(Array.isArray(value));
  return value.map(record);
}

function stringValue(value: unknown): string {
  assert.equal(typeof value, "string");
  return value as string;
}

function makeRequestFixture(namespace?: string): RequestFixture {
  const declaration = { type: "function", name: "read_file", parameters: TOOL_SCHEMA };
  const clientBody = {
    model: "muse-test",
    stream: true,
    input: "Read a.txt",
    tools: namespace
      ? [{ type: "namespace", name: namespace, tools: [declaration] }]
      : [declaration],
  };
  const providerBody = record(aliasMuseToolNames(clientBody));
  const metadata = extractRequestToolMetadata(providerBody);
  const tools = records(providerBody.tools);
  const providerDeclaration = namespace ? records(tools[0].tools)[0] : tools[0];
  const wireName = stringValue(providerDeclaration.name);

  assert.notEqual(wireName, "read_file", "the fixture must exercise a real Task 1 alias");
  assert.equal(metadata.toolNameAliasMap?.get(wireName), "read_file");
  assert.deepEqual(providerDeclaration.parameters, TOOL_SCHEMA);
  if (namespace) {
    assert.deepEqual(metadata.requestToolIdentityMap?.get(wireName), {
      namespace,
      name: "read_file",
    });
  }
  return { providerBody, metadata, wireName, namespace };
}

function callItem(fixture: RequestFixture): JsonRecord {
  return {
    id: "fc_18600",
    type: "function_call",
    call_id: "call_18600",
    name: fixture.wireName,
    ...(fixture.namespace ? { namespace: UPSTREAM_NAMESPACE } : {}),
    arguments: UPSTREAM_ARGUMENTS,
    status: "completed",
  };
}

function completedEvent(item: JsonRecord): JsonRecord {
  return {
    type: "response.completed",
    response: {
      id: "resp_18600",
      object: "response",
      model: "muse-test",
      status: "completed",
      output: [item],
      usage: { ...EXPECTED_USAGE },
    },
  };
}

function parseSse(text: string): JsonRecord[] {
  return text
    .split(NEWLINE)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .filter((payload) => payload && payload !== "[DONE]")
    .map((payload) => record(JSON.parse(payload)));
}

async function runStream(
  fixture: RequestFixture,
  events: JsonRecord[],
  mode: "translate" | "passthrough",
  terminateLastFrame = true,
  rawInput?: string
): Promise<{ output: string; frames: JsonRecord[]; completion: StreamCompletion }> {
  const eventText = events.map((event) => `data: ${JSON.stringify(event)}`).join(SSE_DELIMITER);
  const input = rawInput ?? eventText + (terminateLastFrame ? SSE_DELIMITER : "");
  if (!terminateLastFrame) {
    assert.equal(input.endsWith(NEWLINE), false, "the last frame must reach the EOF flush seam");
  }
  const bytes = new TextEncoder().encode(input);
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (let offset = 0; offset < bytes.length; offset += 7) {
        controller.enqueue(bytes.slice(offset, offset + 7));
      }
      controller.close();
    },
  });
  const completions: StreamCompletion[] = [];
  const output = await new Response(
    source.pipeThrough(
      createSSEStream({
        mode,
        provider: "muse-code",
        model: "muse-test",
        targetFormat: FORMATS.OPENAI_RESPONSES,
        sourceFormat: mode === "translate" ? FORMATS.OPENAI : FORMATS.OPENAI_RESPONSES,
        clientResponseFormat: mode === "translate" ? FORMATS.OPENAI : FORMATS.OPENAI_RESPONSES,
        body: fixture.providerBody,
        toolNameMap: fixture.metadata.toolNameAliasMap,
        requestToolIdentityMap: fixture.metadata.requestToolIdentityMap,
        streamBufferBytes: undefined,
        dropResponsesCommentary: false,
        onComplete(payload) {
          completions.push(payload);
        },
      })
    )
  ).text();

  assert.equal(completions.length, 1, "onComplete must report exactly one successful completion");
  assert.equal(completions[0].status, 200);
  return { output, frames: parseSse(output), completion: completions[0] };
}

function assertCleanChatArguments(frames: JsonRecord[], expectsNamedDelta: boolean): void {
  let toolDeltaCount = 0;
  let namedDeltaCount = 0;
  let emittedArguments = "";
  for (const frame of frames) {
    if (!Array.isArray(frame.choices)) continue;
    for (const choice of records(frame.choices)) {
      const delta = record(choice.delta);
      if (!Array.isArray(delta.tool_calls)) continue;
      for (const toolDelta of records(delta.tool_calls)) {
        toolDeltaCount++;
        assert.equal(toolDelta.index, 0, "all deltas belong to the same call");
        const fn = record(toolDelta.function);
        // Arguments-only continuation deltas intentionally have no function.name.
        if ("name" in fn) {
          namedDeltaCount++;
          assert.equal(fn.name, "read_file", "every emitted tool name must be restored");
        }
        if ("arguments" in fn) emittedArguments += stringValue(fn.arguments);
      }
    }
  }
  assert.ok(toolDeltaCount > 0, "the stream must emit tool-call deltas");
  if (expectsNamedDelta) assert.ok(namedDeltaCount > 0, "a restored call header must be emitted");
  assert.deepEqual(
    JSON.parse(emittedArguments),
    { path: "a.txt" },
    "restoring the name must preserve schema-aware cleanup of the optional mode default"
  );
}

const schemaCases: SchemaCase[] = [
  {
    name: "incremental added/deltas/arguments.done/output_item.done",
    events(fixture) {
      const item = callItem(fixture);
      const splitAt = Math.floor(UPSTREAM_ARGUMENTS.length / 2);
      return [
        {
          type: "response.output_item.added",
          output_index: 0,
          item: { ...item, arguments: "", status: "in_progress" },
        },
        {
          type: "response.function_call_arguments.delta",
          item_id: item.id,
          output_index: 0,
          delta: UPSTREAM_ARGUMENTS.slice(0, splitAt),
        },
        {
          type: "response.function_call_arguments.delta",
          item_id: item.id,
          output_index: 0,
          delta: UPSTREAM_ARGUMENTS.slice(splitAt),
        },
        {
          type: "response.function_call_arguments.done",
          item_id: item.id,
          output_index: 0,
          arguments: UPSTREAM_ARGUMENTS,
        },
        { type: "response.output_item.done", output_index: 0, item },
        completedEvent(item),
      ];
    },
  },
  {
    name: "done-only call with a completed snapshot echo",
    expectsNamedDelta: false,
    events(fixture) {
      const item = callItem(fixture);
      return [{ type: "response.output_item.done", output_index: 0, item }, completedEvent(item)];
    },
  },
  {
    name: "completed-only snapshot",
    events: (fixture) => [completedEvent(callItem(fixture))],
  },
  {
    name: "final completed snapshot without a trailing newline",
    terminateLastFrame: false,
    events: (fixture) => [completedEvent(callItem(fixture))],
  },
];

for (const scenario of schemaCases) {
  test(
    `translated Chat retains aliased request schema cleanup: ${scenario.name}`,
    { timeout: 10000 },
    async () => {
      const fixture = makeRequestFixture();
      const result = await runStream(
        fixture,
        scenario.events(fixture),
        "translate",
        scenario.terminateLastFrame ?? true
      );
      assertCleanChatArguments(result.frames, scenario.expectsNamedDelta ?? true);
    }
  );
}

for (const namespace of [undefined, "files"] as const) {
  const label = namespace ? "native namespace" : "flat";
  test(
    `unterminated completed ${label} summary matches the restored client snapshot`,
    { timeout: 10000 },
    async () => {
      const fixture = makeRequestFixture(namespace);
      const item = callItem(fixture);
      const result = await runStream(fixture, [completedEvent(item)], "passthrough", false);
      const completed = result.frames.filter((frame) => frame.type === "response.completed");
      assert.equal(completed.length, 1, "the client must receive one completed frame");
      const clientResponse = record(completed[0].response);
      const visibleOutput = records(clientResponse.output);
      assert.equal(visibleOutput.length, 1);
      const expectedItem: JsonRecord = { ...item, name: "read_file" };
      if (namespace) expectedItem.namespace = namespace;
      assert.deepEqual(visibleOutput[0], expectedItem, "the emitted call must already be restored");
      assert.equal(
        result.output.includes(fixture.wireName),
        false,
        "client bytes must not leak aliases"
      );

      assert.deepEqual(
        clientResponse.usage,
        EXPECTED_USAGE,
        "emitted terminal frame must preserve fixture usage"
      );
      const summary = record(record(result.completion.clientPayload).summary);
      const summaryOutput = records(summary.output);
      assert.equal(summaryOutput.length, 1);
      assert.deepEqual(summary.usage, clientResponse.usage, "summary must preserve terminal usage");
      for (const field of ["id", "call_id", "arguments"] as const) {
        assert.equal(summaryOutput[0][field], item[field], `summary must preserve ${field}`);
      }
      assert.deepEqual(
        summaryOutput,
        visibleOutput,
        "the client collector must snapshot the restored call, not its earlier provider identity"
      );
      const serializedSummary = JSON.stringify(summary);
      assert.equal(serializedSummary.includes(fixture.wireName), false, "no alias in summary");
      assert.equal(serializedSummary.includes(UPSTREAM_NAMESPACE), false, "no stale namespace");
    }
  );
}

test("delimited native response.done restores the client tool identity", async () => {
  const fixture = makeRequestFixture();
  const terminal = {
    type: "response.done",
    response: {
      id: "resp_done",
      object: "response",
      status: "completed",
      output: [callItem(fixture)],
      usage: { ...EXPECTED_USAGE },
    },
  };
  const result = await runStream(fixture, [terminal], "passthrough");
  const done = result.frames.find((frame) => frame.type === "response.done");
  assert.ok(done);
  assert.equal(records(record(done.response).output)[0].name, "read_file");
  assert.equal(result.output.includes(fixture.wireName), false);
});

test("multiline EOF tail restores a namespaced response.done identity", async () => {
  const fixture = makeRequestFixture("files");
  const terminal = {
    type: "response.done",
    response: {
      id: "resp_done_tail",
      object: "response",
      status: "completed",
      output: [callItem(fixture)],
      usage: { ...EXPECTED_USAGE },
    },
  };
  const serialized = JSON.stringify(terminal);
  const splitAt = serialized.indexOf('"response"');
  assert.ok(splitAt > 0);
  const rawInput =
    `data: ${serialized.slice(0, splitAt)}` + NEWLINE + `data: ${serialized.slice(splitAt)}`;
  const result = await runStream(fixture, [], "passthrough", false, rawInput);
  const done = result.frames.find((frame) => frame.type === "response.done");
  assert.ok(done);
  const restored = records(record(done.response).output)[0];
  assert.equal(restored.name, "read_file");
  assert.equal(restored.namespace, "files");
  assert.equal(result.output.includes(fixture.wireName), false);
  assert.equal(result.output.includes(UPSTREAM_NAMESPACE), false);
});

for (const format of [FORMATS.OPENAI, FORMATS.CLAUDE]) {
  test(`stream state uses the original ${format} client tool schema`, () => {
    const clientTools = [{ type: "function", name: "read_file", parameters: TOOL_SCHEMA }];
    const clientBody = { model: "client-model", tools: clientTools, marker: "client" };
    const providerTools = [
      { type: "function", name: "muse_read_file_wire", parameters: { type: "object" } },
    ];
    const finalBody = { model: "wire-model", tools: providerTools, marker: "provider" };
    const result = record(resolveStreamStateBody(format, clientBody, finalBody));

    assert.notStrictEqual(result, clientBody);
    assert.notStrictEqual(result, finalBody);
    assert.strictEqual(result.tools, clientTools, "response cleanup must use the client schema");
    assert.equal(result.model, "wire-model", "non-tool provider fields remain authoritative");
    assert.equal(result.marker, "provider");
    assert.strictEqual(clientBody.tools, clientTools, "client body remains untouched");
    assert.strictEqual(finalBody.tools, providerTools, "provider body remains untouched");
  });
}

test("native Responses stream state retains the finalized provider body", () => {
  const clientBody = { tools: [{ type: "function", name: "read_file" }] };
  const finalBody = { tools: [{ type: "function", name: "muse_read_file_wire" }] };
  assert.strictEqual(
    resolveStreamStateBody(FORMATS.OPENAI_RESPONSES, clientBody, finalBody),
    finalBody
  );
});

test("Chat stream state without client tools retains the finalized provider body", () => {
  const clientBody = { messages: [{ role: "user", content: "hello" }] };
  const finalBody = { input: "hello" };
  assert.strictEqual(resolveStreamStateBody(FORMATS.OPENAI, clientBody, finalBody), finalBody);
});
