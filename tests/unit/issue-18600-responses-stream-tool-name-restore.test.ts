// #18600 Task 3 — streaming restoration of Muse tool-name aliases at the
// upstream Responses event boundary. The shared shape-safe restorer
// (`restoreResponsesToolNames`) must replace the passthrough-only identity
// restorer so both native Responses passthrough and Responses→Chat/Claude
// translation restore internal aliases before emission/translation, without
// corrupting #7936 namespace identities or #12996 follow-up turns.
import test from "node:test";
import assert from "node:assert/strict";

const { createPassthroughStreamWithLogger, createSSETransformStreamWithLogger } =
  await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type JsonRecord = Record<string, unknown>;

const ALIAS = "muse_read_file_9f2c";
const ALIAS_NS = "muse_files_read_file_9f2c";

function sseText(events: JsonRecord[], eol = "\n"): string {
  return events.map((e) => `data: ${JSON.stringify(e)}${eol}${eol}`).join("");
}

/** Stream the same bytes in tiny chunks so SSE frames split mid-line. */
function chunkedSse(events: JsonRecord[], size = 7, eol = "\n"): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(sseText(events, eol));
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (let i = 0; i < bytes.length; i += size) controller.enqueue(bytes.slice(i, i + size));
      controller.close();
    },
  });
}

function parseBlocks(text: string): JsonRecord[] {
  return text
    .split(/\r?\n\r?\n/)
    .filter((block) => block.includes("data:"))
    .map((block) => {
      const data = block.split(/\r?\n/).find((line) => line.startsWith("data:")) as string;
      const payload = data.slice(5).trim();
      return payload === "[DONE]" ? { done: true } : (JSON.parse(payload) as JsonRecord);
    });
}

async function drain(stream: ReadableStream<Uint8Array>): Promise<string> {
  return await new Response(stream).text();
}

const callItem = (name: string, extra: JsonRecord = {}): JsonRecord => ({
  type: "function_call",
  id: "fc_1",
  call_id: "call_1",
  name,
  arguments: '{"path":"a.txt"}',
  status: "completed",
  ...extra,
});

const aliasLedger = (): Map<string, string> => new Map([[ALIAS, "read_file"]]);
const identityLedger = (): Map<string, { namespace: string; name: string }> =>
  new Map([[ALIAS_NS, { namespace: "files", name: "read_file" }]]);

// ---------------------------------------------------------------------------
// Passthrough mode (native Responses client)
// ---------------------------------------------------------------------------

test("passthrough restores an aliased flat call on added/done/completed events", async () => {
  const upstream = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: callItem(ALIAS, { arguments: "" }),
    },
    {
      type: "response.function_call_arguments.delta",
      item_id: "fc_1",
      output_index: 0,
      delta: '{"path":"a.txt"}',
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_1",
      output_index: 0,
      arguments: '{"path":"a.txt"}',
    },
    { type: "response.output_item.done", output_index: 0, item: callItem(ALIAS) },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem(ALIAS)] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliasLedger(),
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
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));

  const added = blocks.find((b) => b.type === "response.output_item.added")?.item as JsonRecord;
  const done = blocks.find((b) => b.type === "response.output_item.done")?.item as JsonRecord;
  const completed = blocks.find((b) => b.type === "response.completed")?.response as JsonRecord;
  assert.equal(added.name, "read_file", "added event must not leak the alias");
  assert.equal(done.name, "read_file", "done event must not leak the alias");
  assert.equal(
    (completed.output as JsonRecord[])[0].name,
    "read_file",
    "terminal snapshot must not reintroduce the alias"
  );
  assert.equal("namespace" in added, false, "flat tool must stay flat");
});

test("passthrough backfills the restored pending call when output_item.done never arrives", async () => {
  // Stream shape: added → arguments deltas → arguments.done → completed with an
  // EMPTY output array (store: false). No `output_item.done` is ever sent, so
  // the completed merge must source the restored pending copy, not the alias.
  const upstream = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: callItem(ALIAS, { arguments: "" }),
    },
    {
      type: "response.function_call_arguments.delta",
      item_id: "fc_1",
      output_index: 0,
      delta: '{"pa',
    },
    {
      type: "response.function_call_arguments.delta",
      item_id: "fc_1",
      output_index: 0,
      delta: 'th":"a.txt"}',
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_1",
      output_index: 0,
      arguments: '{"path":"a.txt"}',
    },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliasLedger(),
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
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const completed = blocks.find((b) => b.type === "response.completed")?.response as JsonRecord;
  const output = completed.output as JsonRecord[];
  assert.equal(output.length, 1, "pending call must be backfilled into the empty snapshot");
  assert.equal(output[0].name, "read_file", "backfilled pending call must not leak the alias");
  assert.equal(output[0].arguments, '{"path":"a.txt"}');
});

test("passthrough restores a namespaced call using the identity ledger", async () => {
  const upstream = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: callItem(ALIAS_NS, { arguments: "" }),
    },
    { type: "response.output_item.done", output_index: 0, item: callItem(ALIAS_NS) },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem(ALIAS_NS)] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliasLedger(),
    "muse-model",
    null,
    null,
    null,
    null,
    null,
    FORMATS.OPENAI_RESPONSES,
    identityLedger(),
    null,
    null
  );
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));

  for (const frame of [
    blocks.find((b) => b.type === "response.output_item.added")?.item,
    blocks.find((b) => b.type === "response.output_item.done")?.item,
    (blocks.find((b) => b.type === "response.completed")?.response as JsonRecord).output[0],
  ]) {
    const item = frame as JsonRecord;
    assert.equal(item.name, "read_file");
    assert.equal(item.namespace, "files", "namespace must survive passthrough");
  }
});

test("passthrough backfills an empty completed output from restored done items", async () => {
  // store:false upstreams emit an empty terminal output; the backfill buffer is
  // seeded from output_item.done items, so those must be restored BEFORE the
  // backfill copy is taken or the alias returns through the snapshot.
  const upstream = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: callItem(ALIAS, { arguments: "" }),
    },
    { type: "response.output_item.done", output_index: 0, item: callItem(ALIAS) },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliasLedger(),
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
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const completed = blocks.find((b) => b.type === "response.completed")?.response as JsonRecord;
  const output = completed.output as JsonRecord[];
  assert.equal(output.length, 1, "empty terminal output must be backfilled");
  assert.equal(output[0].name, "read_file", "backfilled snapshot must carry the client name");
});

test("passthrough leaves unknown calls untouched and never invents a namespace", async () => {
  const upstream = [
    { type: "response.output_item.done", output_index: 0, item: callItem("unrelated_tool") },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem("unrelated_tool")] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliasLedger(),
    "muse-model",
    null,
    null,
    null,
    null,
    null,
    FORMATS.OPENAI_RESPONSES,
    identityLedger(),
    null,
    null
  );
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const done = blocks.find((b) => b.type === "response.output_item.done")?.item as JsonRecord;
  assert.equal(done.name, "unrelated_tool");
  assert.equal("namespace" in done, false, "unknown flat call must not gain a namespace");
});

test("passthrough restores a final frame without a trailing newline (tail buffer)", async () => {
  // The completed event is the last line and arrives WITHOUT its trailing
  // delimiter, so it is processed by the flush path, not the line loop.
  const upstream: JsonRecord[] = [
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem(ALIAS)] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const bytes = new TextEncoder().encode(sseText(upstream).replace(/\n\n$/, ""));
  const noTrailingDelimiter = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliasLedger(),
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
  const blocks = parseBlocks(await drain(noTrailingDelimiter.pipeThrough(stream)));
  const completed = blocks.find((b) => b.type === "response.completed")?.response as JsonRecord;
  assert.equal(
    (completed.output as JsonRecord[])[0].name,
    "read_file",
    "flush-path terminal frame must also be restored"
  );
});

test("passthrough keeps concurrent call identities separate across interleaved events", async () => {
  const alias2 = "muse_bash_77aa";
  const aliases = new Map<string, string>([
    [ALIAS, "read_file"],
    [alias2, "bash"],
  ]);
  const upstream = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: callItem(ALIAS, { id: "fc_1", call_id: "call_1", arguments: "" }),
    },
    {
      type: "response.output_item.added",
      output_index: 1,
      item: callItem(alias2, { id: "fc_2", call_id: "call_2", arguments: "" }),
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_2",
      output_index: 1,
      arguments: '{"cmd":"ls"}',
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_1",
      output_index: 0,
      arguments: '{"path":"a.txt"}',
    },
    {
      type: "response.output_item.done",
      output_index: 1,
      item: callItem(alias2, { id: "fc_2", call_id: "call_2", arguments: '{"cmd":"ls"}' }),
    },
    {
      type: "response.output_item.done",
      output_index: 0,
      item: callItem(ALIAS, { id: "fc_1", call_id: "call_1", arguments: '{"path":"a.txt"}' }),
    },
    {
      type: "response.completed",
      response: {
        id: "resp_1",
        output: [
          callItem(ALIAS, { id: "fc_1", call_id: "call_1", arguments: '{"path":"a.txt"}' }),
          callItem(alias2, { id: "fc_2", call_id: "call_2", arguments: '{"cmd":"ls"}' }),
        ],
      },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliases,
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
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const completed = blocks.find((b) => b.type === "response.completed")?.response as JsonRecord;
  const output = completed.output as JsonRecord[];
  assert.equal(output[0].name, "read_file");
  assert.equal(output[1].name, "bash");
  assert.equal(output[0].call_id, "call_1", "call ids must be preserved");
  assert.equal(output[1].call_id, "call_2", "call ids must be preserved");
});

test("passthrough preserves usage, arguments and ordering while restoring", async () => {
  const upstream = [
    { type: "response.output_item.done", output_index: 0, item: callItem(ALIAS) },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem(ALIAS)] },
      usage: { input_tokens: 7, output_tokens: 3, total_tokens: 10 },
    },
  ];
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliasLedger(),
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
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const done = blocks.find((b) => b.type === "response.output_item.done")?.item as JsonRecord;
  assert.equal(done.arguments, '{"path":"a.txt"}');
  const completed = blocks.find((b) => b.type === "response.completed") as JsonRecord;
  assert.deepEqual(completed.usage, { input_tokens: 7, output_tokens: 3, total_tokens: 10 });
});

// ---------------------------------------------------------------------------
// Translate mode: openai-responses upstream → openai (Chat) client
// ---------------------------------------------------------------------------

test("translate mode restores aliases before Responses→Chat conversion", async () => {
  const upstream = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: callItem(ALIAS, { arguments: "" }),
    },
    {
      type: "response.function_call_arguments.delta",
      item_id: "fc_1",
      output_index: 0,
      delta: '{"path":',
    },
    {
      type: "response.function_call_arguments.delta",
      item_id: "fc_1",
      output_index: 0,
      delta: '"a.txt"}',
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_1",
      output_index: 0,
      arguments: '{"path":"a.txt"}',
    },
    { type: "response.output_item.done", output_index: 0, item: callItem(ALIAS) },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem(ALIAS)] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    "muse-code",
    null,
    aliasLedger(),
    "muse-model",
    null,
    null,
    null,
    null,
    false,
    false,
    undefined,
    new Set<string>(),
    null,
    null,
    null,
    undefined
  );
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const toolChunks = blocks.filter(
    (b) => Array.isArray(b.choices) && (b.choices as JsonRecord[])[0]?.delta?.tool_calls
  );
  assert.ok(toolChunks.length > 0, "expected translated tool_call deltas");
  // Chat streaming shape: only the opening delta of a tool_call carries
  // `function.name`; continuation deltas carry arguments only. Assert the name
  // wherever it exists (the red phase leaked the alias here) and that at least
  // one named delta is present.
  const namedFns = toolChunks.flatMap((chunk) =>
    ((chunk.choices as JsonRecord[])[0].delta.tool_calls as JsonRecord[]).map(
      (call) => call.function as JsonRecord
    )
  );
  assert.ok(
    namedFns.some((fn) => fn.name !== undefined),
    "expected at least one tool_call delta carrying a function name"
  );
  for (const fn of namedFns) {
    if (fn.name !== undefined) {
      assert.equal(fn.name, "read_file", "translated Chat deltas must carry the client name");
    }
  }
  const finish = blocks.find(
    (b) =>
      Array.isArray(b.choices) && (b.choices as JsonRecord[])[0]?.finish_reason === "tool_calls"
  );
  assert.ok(finish, "expected a tool_calls finish chunk");
});

test("translate mode restores namespaced aliases before Responses→Claude conversion", async () => {
  const upstream = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: callItem(ALIAS_NS, { arguments: "" }),
    },
    {
      type: "response.function_call_arguments.done",
      item_id: "fc_1",
      output_index: 0,
      arguments: '{"path":"a.txt"}',
    },
    { type: "response.output_item.done", output_index: 0, item: callItem(ALIAS_NS) },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem(ALIAS_NS)] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "muse-code",
    null,
    aliasLedger(),
    "muse-model",
    null,
    null,
    null,
    null,
    false,
    false,
    undefined,
    new Set<string>(),
    null,
    identityLedger(),
    null,
    undefined
  );
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const uses = blocks.filter((b) => b.type === "content_block_start");
  assert.ok(uses.length > 0, "expected content_block_start tool_use blocks");
  for (const block of uses) {
    const content = (block.content_block ?? {}) as JsonRecord;
    if (content.type === "tool_use") {
      assert.equal(content.name, "read_file");
    }
  }
});

test("translate mode restores a terminal snapshot without a trailing newline", async () => {
  const upstream: JsonRecord[] = [
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem(ALIAS)] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const bytes = new TextEncoder().encode(sseText(upstream).replace(/\n\n$/, ""));
  const noTrailingDelimiter = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
  const stream = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    "muse-code",
    null,
    aliasLedger(),
    "muse-model",
    null,
    null,
    null,
    null,
    false,
    false,
    undefined,
    new Set<string>(),
    null,
    null,
    null,
    undefined
  );
  const blocks = parseBlocks(await drain(noTrailingDelimiter.pipeThrough(stream)));
  const toolChunks = blocks.filter(
    (b) => Array.isArray(b.choices) && (b.choices as JsonRecord[])[0]?.delta?.tool_calls
  );
  // Chat streaming shape: only the opening delta carries `function.name`
  // (continuation deltas are arguments-only). The red phase leaked the alias on
  // the named delta; assert the name wherever it exists and that one exists.
  const namedFns = toolChunks.flatMap((chunk) =>
    ((chunk.choices as JsonRecord[])[0].delta.tool_calls as JsonRecord[]).map(
      (call) => call.function as JsonRecord
    )
  );
  assert.ok(
    namedFns.some((fn) => fn.name !== undefined),
    "expected at least one tool_call delta carrying a function name"
  );
  for (const fn of namedFns) {
    if (fn.name !== undefined) {
      assert.equal(fn.name, "read_file", "terminal snapshot must not reintroduce the alias");
    }
  }
});

// ---------------------------------------------------------------------------
// #7936/#12996 non-regression: namespace identity restoration still works when
// only the identity map is present (no alias ledger).
// ---------------------------------------------------------------------------

test("passthrough keeps restoring #7936 namespace identities without an alias ledger", async () => {
  const wireName = "mcp__node_repl__js";
  const identities = new Map<string, { namespace: string; name: string }>([
    [wireName, { namespace: "mcp__node_repl", name: "js" }],
  ]);
  const upstream = [
    {
      type: "response.output_item.done",
      output_index: 0,
      item: callItem(wireName, { id: "fc_9", call_id: "call_9" }),
    },
    {
      type: "response.completed",
      response: { id: "resp_1", output: [callItem(wireName, { id: "fc_9", call_id: "call_9" })] },
      usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
    },
  ];
  const stream = createPassthroughStreamWithLogger(
    "openai",
    null,
    null,
    "gpt-4o-mini",
    null,
    null,
    null,
    null,
    null,
    FORMATS.OPENAI_RESPONSES,
    identities,
    null,
    null
  );
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const done = blocks.find((b) => b.type === "response.output_item.done")?.item as JsonRecord;
  assert.equal(done.name, "js");
  assert.equal(done.namespace, "mcp__node_repl");
  const completed = blocks.find((b) => b.type === "response.completed")?.response as JsonRecord;
  const outputItem = (completed.output as JsonRecord[])[0];
  assert.equal(outputItem.name, "js");
  assert.equal(outputItem.namespace, "mcp__node_repl");
});

test("an incomplete termination with an aliased call still restores the done item", async () => {
  const upstream = [
    {
      type: "response.output_item.added",
      output_index: 0,
      item: callItem(ALIAS, { arguments: "" }),
    },
    { type: "response.output_item.done", output_index: 0, item: callItem(ALIAS) },
    { type: "response.incomplete", response: { id: "resp_1", output: [callItem(ALIAS)] } },
  ];
  const stream = createPassthroughStreamWithLogger(
    "muse-code",
    null,
    aliasLedger(),
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
  const blocks = parseBlocks(await drain(chunkedSse(upstream).pipeThrough(stream)));
  const done = blocks.find((b) => b.type === "response.output_item.done")?.item as JsonRecord;
  assert.equal(done.name, "read_file");
  const incomplete = blocks.find((b) => b.type === "response.incomplete")?.response as JsonRecord;
  assert.equal((incomplete.output as JsonRecord[])[0].name, "read_file");
});
