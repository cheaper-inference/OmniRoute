// #18600 — every tool name a Responses payload carries is restored, not only call items.
// Muse Code aliases every function name it is sent (museToolNameAliases), and its stream
// names the call again on response.function_call_arguments.* and echoes the aliased tool
// declarations (and tool_choice) on every event that carries the response object.
import test from "node:test";
import assert from "node:assert/strict";

const { restoreResponsesToolNames } =
  await import("../../open-sse/translator/helpers/responsesToolNameRestore.ts");
const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type JsonRecord = Record<string, unknown>;

const SHELL = "muse_shell_8d8943f1e9dfeacb";
const READ = "muse_read_04c0dfd923708b4e";
const LEAF = "muse_files_find_0123456789abcdef";
const aliases = (): Map<string, string> =>
  new Map([
    [SHELL, "shell"],
    [READ, "read"],
    [LEAF, "find"],
  ]);

const fn = (name: string): JsonRecord => ({
  type: "function",
  name,
  parameters: { type: "object", properties: {} },
});
const declaredTools = (): JsonRecord[] => [
  fn(SHELL),
  fn(READ),
  { type: "namespace", name: "files", tools: [fn(LEAF)] },
  { type: "web_search" },
];
const call = (name: string, extra: JsonRecord = {}): JsonRecord => ({
  type: "function_call",
  id: "fc_1",
  call_id: "call_1",
  name,
  arguments: '{"command":"echo hi"}',
  status: "completed",
  ...extra,
});

function names(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => names(v, out));
  else if (value && typeof value === "object") {
    for (const [key, v] of Object.entries(value)) {
      if (key === "name" && typeof v === "string") out.push(v);
      else names(v, out);
    }
  }
  return out;
}

test("argument events name their call with the client name", () => {
  for (const type of [
    "response.function_call_arguments.delta",
    "response.function_call_arguments.done",
    "response.custom_tool_call_input.done",
  ]) {
    const event: JsonRecord = { type, item_id: "fc_1", name: SHELL, arguments: "{}" };
    assert.equal(restoreResponsesToolNames(event, aliases()), true, type);
    assert.equal(event.name, "shell", type);
  }
});

test("every event carrying the response restores its echoed tools, tool_choice and output", () => {
  for (const type of ["response.created", "response.in_progress", "response.completed"]) {
    const event: JsonRecord = {
      type,
      response: {
        id: "resp_1",
        tools: declaredTools(),
        tool_choice: { type: "function", name: SHELL },
        output: type === "response.completed" ? [call(SHELL)] : [],
      },
    };
    assert.equal(restoreResponsesToolNames(event, aliases()), true, type);
    const response = event.response as JsonRecord;
    const tools = response.tools as JsonRecord[];
    assert.deepEqual(
      tools.map((tool) => tool.name),
      ["shell", "read", "files", undefined],
      `${type}: flat names restored, namespace container and built-in kept`
    );
    assert.equal((tools[2].tools as JsonRecord[])[0].name, "find", `${type}: namespace leaf`);
    assert.equal((response.tool_choice as JsonRecord).name, "shell", `${type}: tool_choice`);
    assert.equal(
      names(event).some((name) => name.startsWith("muse_")),
      false,
      type
    );
  }
});

test("an allowed_tools choice restores each descriptor", () => {
  const event: JsonRecord = {
    type: "response.created",
    response: {
      tool_choice: {
        type: "allowed_tools",
        mode: "auto",
        tools: [
          { type: "function", name: READ },
          { type: "function", name: SHELL },
        ],
      },
    },
  };
  restoreResponsesToolNames(event, aliases());
  const choice = (event.response as JsonRecord).tool_choice as JsonRecord;
  assert.deepEqual(
    (choice.tools as JsonRecord[]).map((tool) => tool.name),
    ["read", "shell"]
  );
  assert.equal(choice.mode, "auto");
});

test("a non-streaming response object restores its own tools, tool_choice and output", () => {
  const body: JsonRecord = {
    id: "resp_1",
    object: "response",
    tools: declaredTools(),
    tool_choice: { type: "function", name: READ },
    output: [call(SHELL)],
  };
  assert.equal(restoreResponsesToolNames(body, aliases()), true);
  assert.equal(
    names(body).some((name) => name.startsWith("muse_")),
    false
  );
  assert.equal(((body.output as JsonRecord[])[0] as JsonRecord).name, "shell");
});

test("unknown names, client names and namespace containers stay untouched", () => {
  const event: JsonRecord = {
    type: "response.completed",
    response: {
      tools: [fn("not_aliased"), { type: "namespace", name: SHELL, tools: [] }],
      tool_choice: "auto",
      output: [call("shell")],
    },
  };
  assert.equal(restoreResponsesToolNames(event, aliases()), false);
  const tools = (event.response as JsonRecord).tools as JsonRecord[];
  assert.equal(tools[0].name, "not_aliased");
  assert.equal(tools[1].name, SHELL, "a container is never renamed, even if its name is a key");
  assert.equal((event.response as JsonRecord).tool_choice, "auto");
  assert.equal("namespace" in ((event.response as JsonRecord).output as JsonRecord[])[0], false);
});

function sse(events: JsonRecord[], trailingNewline = true): ReadableStream<Uint8Array> {
  let text = events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
  if (!trailingNewline) text = text.replace(/\n\n$/, "");
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (let i = 0; i < bytes.length; i += 7) controller.enqueue(bytes.slice(i, i + 7));
      controller.close();
    },
  });
}

function museStream(): ReturnType<typeof createPassthroughStreamWithLogger> {
  return createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliases(),
    "muse-model",
    null,
    null,
    null,
    null,
    null,
    FORMATS.OPENAI_RESPONSES,
    null,
    null,
    null
  );
}

// The event shapes Muse Code streams for one tool call.
const museEvents = (): JsonRecord[] => [
  { type: "response.created", response: { id: "resp_1", tools: declaredTools(), output: [] } },
  { type: "response.in_progress", response: { id: "resp_1", tools: declaredTools(), output: [] } },
  { type: "response.output_item.added", output_index: 0, item: call(SHELL, { arguments: "" }) },
  {
    type: "response.function_call_arguments.delta",
    item_id: "fc_1",
    output_index: 0,
    name: SHELL,
    delta: '{"command":"echo hi"}',
  },
  {
    type: "response.function_call_arguments.done",
    item_id: "fc_1",
    output_index: 0,
    name: SHELL,
    arguments: '{"command":"echo hi"}',
  },
  { type: "response.output_item.done", output_index: 0, item: call(SHELL) },
  {
    type: "response.completed",
    response: { id: "resp_1", tools: declaredTools(), output: [call(SHELL)] },
  },
];

test("a Muse Code passthrough stream reaches the client without any alias", async () => {
  const text = await new Response(sse(museEvents()).pipeThrough(museStream())).text();
  assert.equal(text.includes("muse_"), false, "no alias may reach the client");
  const done = text
    .split("\n\n")
    .map((block) => block.split("\n").find((line) => line.startsWith("data: {")))
    .filter((line): line is string => !!line)
    .map((line) => JSON.parse(line.slice(6)) as JsonRecord)
    .find((event) => event.type === "response.function_call_arguments.done");
  assert.equal(done?.name, "shell");
});

test("a final response.completed frame without a trailing newline is restored too", async () => {
  const text = await new Response(sse(museEvents(), false).pipeThrough(museStream())).text();
  assert.equal(text.includes("muse_"), false, "the tail frame may not carry an alias");
  assert.match(text, /"type":"response\.completed"/);
});
