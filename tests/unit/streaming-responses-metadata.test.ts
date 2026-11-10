import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const isolated = fs.mkdtempSync(path.join(os.tmpdir(), "responses-metadata-"));
process.env.DATA_DIR = isolated;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
const { createCredentialSseTransform } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { createPiiSseTransform } = await import("../../src/lib/streamingPiiTransform.ts");
const { createSseTextTransform } = await import("../../src/lib/sseTextTransform.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  fs.rmSync(isolated, { recursive: true, force: true });
});

type Event = {
  type: string;
  delta?: string;
  text?: string;
  item_id?: string;
  output_index?: number;
  content_index?: number;
  summary_index?: number;
  sequence_number?: number;
  [key: string]: unknown;
};
/** Feed fragmented SSE through the real transforms and verify emitted event framing. */
async function run(transforms: TransformStream[], events: Event[], done = true) {
  const input = events.map((e) => `event: ${e.type}\ndata: ${JSON.stringify(e)}\n\n`);
  if (done) input.push("data: [DONE]\n\n");
  let stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const bytes = new TextEncoder().encode(input.join(""));
      for (let i = 0; i < bytes.length; i += 7) controller.enqueue(bytes.slice(i, i + 7));
      controller.close();
    },
  });
  for (const transform of transforms) stream = stream.pipeThrough(transform);
  const raw = await new Response(stream).text();
  const output: Event[] = [];
  let eventName = "";
  for (const line of raw.split("\n")) {
    if (line.startsWith("event: ")) eventName = line.slice(7);
    if (line.startsWith("data: {")) {
      const event = JSON.parse(line.slice(6)) as Event;
      if (eventName) assert.equal(eventName, event.type, "SSE event name matches its payload");
      output.push(event);
    }
    if (!line) eventName = "";
  }
  return output;
}
function text(events: Event[], type = "response.output_text.delta", index?: number) {
  return events
    .filter((e) => e.type === type && (index === undefined || e.output_index === index))
    .map((e) => e.delta ?? "")
    .join("");
}
const metadata = {
  access_programs: { cyber: "standard" },
  prompt_cache_key: "synthetic-cache-id",
  prompt_cache_retention: "24h",
  reasoning: { effort: "medium", summary: "high", context: "detailed", mode: "all_turns" },
  safety_identifier: "synthetic-user",
  metadata: { text: "not answer text", arguments: "not tool arguments", future_option: "opaque" },
};
const message = (value: string) => ({
  id: "msg_fixture",
  type: "message",
  role: "assistant",
  phase: "final_answer",
  content: [{ type: "output_text", text: value, annotations: [{ text: "citation metadata" }] }],
});
/**
 * Expected frame after the uppercasing test processor: payload snapshots and every other
 * non-protocol string are processed where they sit (here: uppercased), never buffered;
 * protocol keys keep their exact value.
 */
const PROTOCOL_KEYS = new Set(["type", "id", "name", "role", "phase", "call_id", "status"]);
function redactedInPlace<T>(value: T): T {
  return JSON.parse(JSON.stringify(value), (key, field) =>
    typeof field === "string" && !PROTOCOL_KEYS.has(key) ? field.toUpperCase() : field
  );
}
const delta = (value: string, index = 0): Event => ({
  type: "response.output_text.delta",
  item_id: index === 0 ? "msg_fixture" : `msg_other_${index}`,
  output_index: index,
  content_index: 0,
  delta: value,
});

for (const [name, factories] of [
  ["credential", [createCredentialSseTransform]],
  ["PII", [createPiiSseTransform]],
  ["PII + credential", [createPiiSseTransform, createCredentialSseTransform]],
] as const) {
  test(`${name}: Responses metadata never becomes text and snapshots do not replay`, async () => {
    const events: Event[] = [
      { type: "response.created", response: { ...metadata, output: [] } },
      { type: "response.in_progress", response: { ...metadata, output: [] } },
      { type: "response.output_item.added", output_index: 0, item: message("") },
      delta("OK 🦜"),
      {
        type: "response.metadata",
        metadata: { prompt: { omnimod: { protection_type: "omnimod" } } },
      },
      { type: "response.output_text.done", output_index: 0, text: "OK 🦜" },
      { type: "response.output_item.done", output_index: 0, item: message("OK 🦜") },
      { type: "response.completed", response: { ...metadata, output: [message("OK 🦜")] } },
    ];
    const out = await run(
      factories.map((factory) => factory()),
      events
    );
    assert.equal(text(out), "OK 🦜");
    assert.deepEqual(
      out.filter((e) => !e.type.endsWith(".delta")),
      events.filter((e) => !e.type.endsWith(".delta"))
    );
    const terminal = out.findIndex((e) => e.type === "response.output_text.done");
    assert.equal(text(out.slice(terminal + 1)), "", "no delta after its done snapshot");
  });
}

test("credential: split secrets remain masked in Responses deltas and snapshot text", async () => {
  const secret = "sk-proj-" + "a".repeat(40);
  const out = await run(
    [createCredentialSseTransform()],
    [
      delta(`key ${secret.slice(0, 19)}`),
      { type: "response.metadata", metadata: { text: "unrelated metadata" } },
      delta(`${secret.slice(19)} end`),
      { type: "response.output_text.done", output_index: 0, text: `key ${secret} end` },
      { type: "response.output_item.done", output_index: 0, item: message(`key ${secret} end`) },
      {
        type: "response.completed",
        response: { ...metadata, output: [message(`key ${secret} end`)] },
      },
    ]
  );
  assert.equal(text(out), "key [REDACTED:openai] end");
  assert.ok(!JSON.stringify(out).includes(secret));
  assert.equal(
    out.find((e) => e.type === "response.output_text.done")?.text,
    "key [REDACTED:openai] end"
  );
});

for (const [name, factory] of [
  ["credential", createCredentialSseTransform],
  ["PII", createPiiSseTransform],
] as const) {
  for (const ending of ["done", "eof", "completed"] as const) {
    test(`${name}: interleaved output indexes drain separately at ${ending}`, async () => {
      const events = [delta("first 🦜", 0), delta("second 🌞", 1), delta(" tail", 0)];
      if (ending === "completed")
        events.push({ type: "response.completed", response: { output: [] } });
      const out = await run([factory()], events, ending === "done");
      assert.equal(text(out, undefined, 0), "first 🦜 tail");
      assert.equal(text(out, undefined, 1), "second 🌞");
    });
  }
}

test("credential: reasoning, refusal and tool arguments never drain into answer text", async () => {
  const out = await run(
    [createCredentialSseTransform()],
    [
      {
        type: "response.reasoning_summary_text.delta",
        output_index: 0,
        summary_index: 0,
        delta: "thinking",
      },
      {
        type: "response.reasoning_summary_text.done",
        output_index: 0,
        summary_index: 0,
        text: "thinking",
      },
      {
        type: "response.function_call_arguments.delta",
        output_index: 1,
        item_id: "fc_1",
        delta: '{"value":',
      },
      {
        type: "response.function_call_arguments.delta",
        output_index: 1,
        item_id: "fc_1",
        delta: "42}",
      },
      {
        type: "response.function_call_arguments.done",
        output_index: 1,
        item_id: "fc_1",
        arguments: '{"value":42}',
      },
      { type: "response.refusal.delta", output_index: 2, content_index: 0, delta: "refused" },
      { type: "response.refusal.done", output_index: 2, content_index: 0, refusal: "refused" },
      delta("answer", 3),
      { type: "response.completed", response: { output: [] } },
    ]
  );
  assert.equal(text(out), "answer");
  assert.equal(text(out, "response.reasoning_summary_text.delta"), "thinking");
  assert.equal(text(out, "response.function_call_arguments.delta"), '{"value":42}');
  assert.equal(text(out, "response.refusal.delta"), "refused");
});

test("Responses snapshot selection sanitizes payloads and redacts metadata only in place", async () => {
  const item = {
    type: "function_call",
    call_id: "call_1",
    name: "f",
    arguments: "sensitive",
    metadata: { arguments: "opaque", text: "opaque" },
  };
  const out = await run(
    [
      createSseTextTransform((value) => value.toUpperCase(), undefined, undefined, {
        processToolArgs: true,
      }),
    ],
    [
      {
        type: "response.created",
        response: {
          ...metadata,
          tools: [{ type: "function", name: "f", parameters: { description: "opaque" } }],
        },
      },
      { type: "response.output_item.done", output_index: 0, item },
      {
        type: "response.content_part.done",
        output_index: 1,
        part: { type: "refusal", refusal: "sensitive", annotations: [{ text: "opaque" }] },
      },
      {
        type: "response.reasoning_summary_part.done",
        output_index: 2,
        part: { type: "summary_text", text: "sensitive" },
      },
    ]
  );
  assert.equal(out.length, 4, "metadata strings never produce a buffered delta frame");
  assert.deepEqual(
    out[0].response,
    redactedInPlace({
      ...metadata,
      tools: [{ type: "function", name: "f", parameters: { description: "opaque" } }],
    })
  );
  assert.deepEqual(out[1].item, redactedInPlace(item));
  assert.equal((out[1].item as typeof item).arguments, "SENSITIVE");
  assert.deepEqual(out[2].part, {
    type: "refusal",
    refusal: "SENSITIVE",
    annotations: [{ text: "OPAQUE" }],
  });
  assert.deepEqual(out[3].part, { type: "summary_text", text: "SENSITIVE" });
});

test("credential: another item finishing cannot expose a split secret", async () => {
  const secret = "sk-proj-" + "b".repeat(40);
  const out = await run(
    [createCredentialSseTransform()],
    [
      delta(`key ${secret.slice(0, 19)}`),
      {
        type: "response.output_item.done",
        output_index: 1,
        item: { id: "other", type: "message", content: [] },
      },
      { ...delta(`${secret.slice(19)} end`), item_id: undefined },
      { type: "response.incomplete", response: { output: [] } },
    ]
  );
  assert.equal(text(out), "key [REDACTED:openai] end");
  assert.ok(!JSON.stringify(out).includes(secret));
});

test("credential: multiple content parts have separate buffers and correct flush identities", async () => {
  const out = await run(
    [createCredentialSseTransform()],
    [
      { ...delta("part zero"), sequence_number: 1 },
      { ...delta("part one"), content_index: 1, sequence_number: 2 },
      {
        type: "response.content_part.done",
        output_index: 0,
        content_index: 1,
        part: { type: "output_text", text: "part one" },
      },
      { type: "response.completed", response: { output: [] } },
    ]
  );
  for (const [index, expected] of [
    [0, "part zero"],
    [1, "part one"],
  ] as const) {
    assert.equal(text(out.filter((e) => e.content_index === index)), expected);
  }
  const flushed = out.filter((e) => e.type === "response.output_text.delta" && e.delta);
  assert.ok(flushed.every((e) => e.item_id === "msg_fixture" && e.sequence_number === undefined));
});

for (const processToolArgs of [false, true]) {
  test(`custom tool input obeys processToolArgs=${processToolArgs} in deltas and snapshots`, async () => {
    const out = await run(
      [
        createSseTextTransform((value) => value.toUpperCase(), undefined, undefined, {
          processToolArgs,
        }),
      ],
      [
        { type: "response.custom_tool_call_input.delta", output_index: 0, delta: "run command" },
        { type: "response.custom_tool_call_input.done", output_index: 0, input: "run command" },
        {
          type: "response.output_item.done",
          output_index: 0,
          item: { type: "custom_tool_call", input: "run command" },
        },
      ]
    );
    const expected = processToolArgs ? "RUN COMMAND" : "run command";
    assert.equal(text(out, "response.custom_tool_call_input.delta"), expected);
    assert.equal(
      out.find((e) => e.type === "response.custom_tool_call_input.done")?.input,
      expected
    );
    assert.deepEqual(out.find((e) => e.type === "response.output_item.done")?.item, {
      type: "custom_tool_call",
      input: expected,
    });
  });
}

test("credential: split tool secrets are masked without becoming answer text", async () => {
  const secret = "sk-proj-" + "c".repeat(40);
  const out = await run(
    [createCredentialSseTransform()],
    [
      {
        type: "response.function_call_arguments.delta",
        output_index: 1,
        item_id: "fc_1",
        delta: `{"key":"${secret.slice(0, 20)}`,
      },
      delta("answer"),
      {
        type: "response.function_call_arguments.delta",
        output_index: 1,
        item_id: "fc_1",
        delta: `${secret.slice(20)}"}`,
      },
      { type: "response.completed", response: { output: [] } },
    ]
  );
  assert.equal(text(out), "answer");
  assert.equal(text(out, "response.function_call_arguments.delta"), '{"key":"[REDACTED:openai]"}');
  assert.ok(!JSON.stringify(out).includes(secret));
});

for (const terminal of [
  "response.completed",
  "response.done",
  "response.failed",
  "response.cancelled",
  "response.incomplete",
]) {
  test(`credential: ${terminal} drains exactly once before forwarding the terminal`, async () => {
    const out = await run(
      [createCredentialSseTransform()],
      [delta("OK"), { type: terminal, response: { output: [] } }]
    );
    assert.equal(text(out), "OK");
    const terminalIndex = out.findIndex((e) => e.type === terminal);
    assert.equal(text(out.slice(terminalIndex + 1)), "");
  });
}

test("PII: split email is redacted in deltas and lifecycle snapshots", async () => {
  const out = await run(
    [createPiiSseTransform()],
    [
      delta("contact alice@"),
      delta("example.com end"),
      { type: "response.output_text.done", output_index: 0, text: "contact alice@example.com end" },
      {
        type: "response.output_item.done",
        output_index: 0,
        item: message("contact alice@example.com end"),
      },
    ]
  );
  assert.ok(!JSON.stringify(out).includes("alice@example.com"));
  assert.match(text(out), /REDACTED/);
});

test("credential: Responses lane budget still fails closed", async () => {
  await assert.rejects(
    run(
      [createCredentialSseTransform({ maxBufferedChoices: 2 })],
      [delta("first", 0), delta("second", 1), delta("third", 2)]
    ),
    { message: "[PII] Credential stream choice limit exceeded" }
  );
});

test("added snapshots sanitize independently and unknown Responses deltas stay out of buffers", async () => {
  const out = await run(
    [createSseTextTransform((value) => value.toUpperCase())],
    [
      { type: "response.output_item.added", item: message("sensitive") },
      { type: "response.content_part.added", part: { type: "output_text", text: "sensitive" } },
      { type: "response.future_metadata.delta", delta: "opaque", metadata: { text: "opaque" } },
      delta("answer"),
    ]
  );
  assert.deepEqual(out[0].item, redactedInPlace(message("sensitive")));
  assert.deepEqual(out[1].part, { type: "output_text", text: "SENSITIVE" });
  assert.deepEqual(out[2], {
    type: "response.future_metadata.delta",
    delta: "OPAQUE",
    metadata: { text: "OPAQUE" },
  });
  assert.equal(text(out), "ANSWER", "the unknown delta is redacted in place, not spliced");
});

for (const [family, field, itemType] of [
  ["mcp_call_arguments", "arguments", "mcp_call"],
  ["code_interpreter_call_code", "code", "code_interpreter_call"],
] as const) {
  test(`credential: ${family} remains masked in deltas and snapshots`, async () => {
    const secret = "sk-proj-" + "d".repeat(40);
    const out = await run(
      [createCredentialSseTransform()],
      [
        { type: `response.${family}.delta`, output_index: 0, delta: secret.slice(0, 20) },
        { type: `response.${family}.delta`, output_index: 0, delta: secret.slice(20) },
        { type: `response.${family}.done`, output_index: 0, [field]: secret },
        {
          type: "response.output_item.done",
          output_index: 0,
          item: { type: itemType, [field]: secret },
        },
      ]
    );
    assert.equal(text(out, `response.${family}.delta`), "[REDACTED:openai]");
    assert.ok(!JSON.stringify(out).includes(secret));
  });
}

test("credential: non-payload strings are masked in place, never buffered as answer text", async () => {
  const secret = "sk-proj-" + "m".repeat(40);
  const mcpCall = {
    id: "mcp_1",
    type: "mcp_call",
    server_label: "files",
    name: "read",
    arguments: "{}",
    output: `token=${secret}`,
  };
  const search = {
    id: "ws_1",
    type: "web_search_call",
    status: "completed",
    action: { type: "search", query: `find ${secret}` },
  };
  const annotated = {
    ...message("answer"),
    content: [
      {
        type: "output_text",
        text: "answer",
        annotations: [{ type: "url_citation", url: `https://x.test/?k=${secret}`, title: "t" }],
      },
    ],
  };
  const out = await run(
    [createCredentialSseTransform()],
    [
      { type: "response.output_item.done", output_index: 0, item: mcpCall },
      { type: "response.output_item.done", output_index: 1, item: search },
      delta("answer", 2),
      { type: "response.output_item.done", output_index: 2, item: annotated },
      {
        type: "response.completed",
        response: { ...metadata, output: [mcpCall, search, annotated] },
      },
    ]
  );
  assert.ok(!JSON.stringify(out).includes(secret), "no frame leaks the secret");
  const items = out.filter((e) => e.type === "response.output_item.done");
  assert.equal(
    (items[0].item as typeof mcpCall).output,
    "token=[REDACTED:openai]",
    "mcp_call.output is masked where it sits"
  );
  assert.equal((items[0].item as typeof mcpCall).name, "read", "protocol names stay intact");
  assert.equal((items[1].item as typeof search).action.query, "find [REDACTED:openai]");
  assert.equal(text(out, undefined, 2), "answer", "metadata never splices into answer text");
});

test("credential: audio transcript text is masked but audio bytes are opaque", async () => {
  const secret = "sk-proj-" + "e".repeat(40);
  const out = await run(
    [createCredentialSseTransform()],
    [
      { type: "response.audio.delta", delta: "opaque-audio-data" },
      { type: "response.audio.transcript.delta", delta: secret },
      { type: "response.audio.transcript.done" },
    ]
  );
  assert.equal(text(out, "response.audio.transcript.delta"), "[REDACTED:openai]");
  assert.equal(text(out, "response.audio.delta"), "opaque-audio-data");
});

test("credential: an omitted output_index cannot split one item's secret buffer", async () => {
  const secret = "sk-proj-" + "f".repeat(40);
  const out = await run(
    [createCredentialSseTransform()],
    [
      { ...delta(secret.slice(0, 19)), item_id: "m" },
      { type: "response.output_text.delta", item_id: "m", delta: secret.slice(19) },
      { type: "response.completed", response: { output: [] } },
    ]
  );
  assert.equal(text(out), "[REDACTED:openai]");
});

test("credential: an unindexed other item is not drained by output_index zero", async () => {
  const secret = "sk-proj-" + "g".repeat(40);
  const out = await run(
    [createCredentialSseTransform()],
    [
      { type: "response.output_text.delta", item_id: "other", delta: secret.slice(0, 19) },
      { type: "response.output_text.done", output_index: 0, item_id: "m", text: "answer" },
      { type: "response.output_text.delta", item_id: "other", delta: secret.slice(19) },
      { type: "response.completed", response: { output: [] } },
    ]
  );
  assert.equal(text(out), "[REDACTED:openai]");
});

test("credential: omitted item_id preserves routing and drains before item-only done", async () => {
  const out = await run(
    [createCredentialSseTransform()],
    [
      { ...delta("Hello"), item_id: "m" },
      { type: "response.output_text.delta", output_index: 0, delta: " world" },
      { type: "response.output_text.done", item_id: "m", text: "Hello world" },
      { type: "response.completed", response: { output: [] } },
    ]
  );
  const done = out.findIndex((e) => e.type === "response.output_text.done");
  assert.equal(text(out.slice(0, done)), "Hello world");
  assert.equal(text(out.slice(done + 1)), "");
  assert.equal(out.find((e) => e.delta)?.item_id, "m");
});

test("credential: completed Responses lanes release their budget without reusing secret state", async () => {
  const events: Event[] = [];
  for (let i = 0; i < 40; i++) {
    events.push(delta(`item ${i}`, i), {
      type: "response.output_text.done",
      output_index: i,
      text: `item ${i}`,
    });
  }
  const out = await run([createCredentialSseTransform({ maxBufferedChoices: 2 })], events);
  for (let i = 0; i < 40; i++) assert.equal(text(out, undefined, i), `item ${i}`);
});

test("credential: indexed done cannot prematurely drain an anonymous split secret", async () => {
  const secret = "sk-proj-" + "h".repeat(40);
  const out = await run(
    [createCredentialSseTransform()],
    [
      { type: "response.output_text.delta", delta: secret.slice(0, 19) },
      { type: "response.output_text.done", output_index: 0, text: "answer" },
      { type: "response.output_text.delta", delta: secret.slice(19) },
      { type: "response.completed", response: { output: [] } },
    ]
  );
  assert.equal(text(out), "[REDACTED:openai]");
});

test("credential: conflicting Responses identities fail closed without logging the raw chunk", async (t) => {
  const logged: unknown[][] = [];
  t.mock.method(console, "error", (...args: unknown[]) => logged.push(args));
  const secret = "synthetic-sensitive-payload";
  const events: Event[] = [
    { type: "response.output_text.delta", item_id: "m", delta: "first" },
    { type: "response.output_text.delta", output_index: 0, delta: "second" },
    { type: "response.output_text.delta", output_index: 0, item_id: "m", delta: secret },
  ];
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const event of events) {
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`));
      }
      controller.close();
    },
  });
  await assert.rejects(
    new Response(source.pipeThrough(createCredentialSseTransform())).text(),
    /Conflicting Responses stream identities/
  );
  assert.equal(logged.length, 1);
  assert.equal(logged[0].at(-1), "[REDACTED_DUE_TO_PII]");
  assert.ok(!JSON.stringify(logged).includes(secret));
});
