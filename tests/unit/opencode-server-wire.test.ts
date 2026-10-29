import assert from "node:assert/strict";
import test from "node:test";

import {
  OpencodeTurnCollector,
  buildTurns,
  collectFiles,
  createSseSink,
  createStreamFrames,
  finalStreamFrames,
  firstExistingPath,
  opencodeBinaryCandidates,
  parseCatalog,
  parseToolEnvelope,
  partTextEmission,
  turnResultFromParts,
} from "../../open-sse/services/opencodeServerWire.ts";

// Pure helpers extracted from open-sse/executors/opencodeServer.ts. The end-to-end
// wire behaviour stays covered by tests/unit/opencode-server-executor.test.ts
// against a fake `opencode serve`; these pin the branches one by one.

const TOOLS = [{ name: "get_weather", description: "weather", parameters: {} }];

function frameData(frame: string): unknown {
  assert.ok(frame.startsWith("data: ") && frame.endsWith("\n\n"), `not an SSE frame: ${frame}`);
  return JSON.parse(frame.slice("data: ".length, -2));
}

test("opencodeBinaryCandidates: POSIX install locations, then the bare command", () => {
  const { candidates, fallback } = opencodeBinaryCandidates("linux", { HOME: "/home/op" });
  assert.deepEqual(candidates, [
    "/home/op/.bun/bin/opencode",
    "/usr/local/bin/opencode",
    "/opt/homebrew/bin/opencode",
  ]);
  assert.equal(fallback, "opencode");
});

test("opencodeBinaryCandidates: Windows skips LOCALAPPDATA when unset", () => {
  const withLocal = opencodeBinaryCandidates("win32", { USERPROFILE: "U", LOCALAPPDATA: "L" });
  assert.equal(withLocal.candidates.length, 4);
  assert.match(withLocal.candidates[0], /opencode\.exe$/);
  assert.equal(withLocal.fallback, "opencode.cmd");
  const withoutLocal = opencodeBinaryCandidates("win32", { USERPROFILE: "U" });
  assert.equal(withoutLocal.candidates.length, 3);
});

test("firstExistingPath: returns the first hit and survives a throwing probe", () => {
  const exists = (candidate: string): boolean => {
    if (candidate === "b") throw new Error("EACCES");
    return candidate === "c";
  };
  assert.equal(firstExistingPath(["a", "b", "c", "d"], exists), "c");
  assert.equal(firstExistingPath(["a", "b"], exists), null);
});

test("parseCatalog: indexes models, derives free/limits/capabilities, first provider wins", () => {
  const { byModel, defaultProvider } = parseCatalog({
    providers: [
      {
        id: "opencode",
        models: {
          "free-model": {
            name: "Free Model",
            cost: { input: 0, output: 0 },
            limit: { context: 200000, output: 8192 },
            capabilities: { toolcall: true, reasoning: true, input: { image: true } },
          },
          "paid-model": { cost: { input: 1, output: 2 } },
        },
      },
      { id: "other", models: { "free-model": { name: "Shadowed" } } },
    ],
    default: { other: "x" },
  });
  assert.deepEqual(byModel.get("free-model"), {
    providerID: "opencode",
    modelID: "free-model",
    name: "Free Model",
    isFree: true,
    contextLength: 200000,
    outputLimit: 8192,
    toolCalling: true,
    reasoning: true,
    image: true,
  });
  const paid = byModel.get("paid-model");
  assert.equal(paid?.isFree, false);
  assert.equal(paid?.name, "paid-model");
  assert.equal(paid?.contextLength, 0);
  assert.equal(paid?.image, false);
  assert.equal(defaultProvider, "other");
  assert.equal(
    parseCatalog({ default: { opencode: "x", other: "y" } }).defaultProvider,
    "opencode"
  );
  assert.equal(parseCatalog(null).defaultProvider, "opencode");
  assert.equal(parseCatalog(null).byModel.size, 0);
});

test("collectFiles: reads the three OpenAI file shapes and drops unsafe or unknown parts", () => {
  const png = "data:image/png;base64,AAAA";
  const files = collectFiles([
    { type: "image_url", image_url: png },
    { type: "image_url", image_url: { url: "https://example.com/a.webp", mime: "image/x-own" } },
    { type: "input_image", image_url: { url: "https://example.com/b.jpg" } },
    { type: "input_image", url: "https://example.com/c.gif", mime_type: "image/gif" },
    { type: "input_file", file_url: "https://example.com/d.pdf" },
    { type: "input_file", url: "file:///etc/passwd" },
    { type: "image_url", image_url: "http://127.0.0.1/x.png" },
    // A prototype key must not resolve to a reader.
    { type: "constructor", url: "https://example.com/e.png" },
    { type: "text", text: "ignored" },
    null,
  ]);
  assert.deepEqual(files, [
    { url: png, mime: "image/png" },
    { url: "https://example.com/a.webp", mime: "image/x-own" },
    { url: "https://example.com/b.jpg", mime: "image/jpeg" },
    { url: "https://example.com/c.gif", mime: "image/gif" },
    { url: "https://example.com/d.pdf", mime: "application/pdf" },
  ]);
  assert.deepEqual(collectFiles("not an array"), []);
});

test("buildTurns: system chunks, function outputs as tool turns, Responses string input", () => {
  const { systemChunks, turns } = buildTurns({
    messages: [
      { role: "system", content: "be terse" },
      { role: "developer", content: [{ type: "text", text: "dev rule" }] },
      { role: "system", content: "" },
      { role: "user", content: "hi" },
      { type: "function_call_output", name: "get_weather", content: "sunny" },
      "garbage",
    ],
  });
  assert.deepEqual(systemChunks, ["be terse", "dev rule"]);
  assert.deepEqual(turns, [
    { role: "user", text: "hi", files: [] },
    { role: "tool", text: "get_weather -> sunny", files: [] },
  ]);

  assert.deepEqual(buildTurns({ input: "  just say OK " }).turns, [
    { role: "user", text: "  just say OK ", files: [] },
  ]);
  assert.deepEqual(buildTurns({ input: "   " }).turns, []);
  assert.deepEqual(buildTurns({ input: [{ role: "assistant", content: "prev" }] }).turns, [
    { role: "assistant", text: "prev", files: [] },
  ]);
});

test("parseToolEnvelope: plain and fenced envelopes become tool_calls", () => {
  const plain = parseToolEnvelope(
    '{"tool_calls":[{"name":"get_weather","arguments":{"city":"Lisboa"}}]}',
    TOOLS
  );
  assert.equal(plain?.length, 1);
  assert.equal(plain?.[0].type, "function");
  assert.match(String(plain?.[0].id), /^call_[0-9a-f]{32}$/);
  assert.deepEqual(plain?.[0].function, {
    name: "get_weather",
    arguments: '{"city":"Lisboa"}',
  });

  const fenced = parseToolEnvelope(
    'Sure:\n```json\n{"tool_calls":[{"name":"get_weather","arguments":"{\\"city\\":\\"Porto\\"}"}]}\n```',
    TOOLS
  );
  assert.equal(fenced?.[0].function.arguments, '{"city":"Porto"}');

  const noArgs = parseToolEnvelope('{"tool_calls":[{"name":"anything"}]}', []);
  assert.equal(noArgs?.[0].function.arguments, "{}");
});

test("parseToolEnvelope: prose, broken JSON, empty lists and unknown tools are rejected", () => {
  assert.equal(parseToolEnvelope("", TOOLS), null);
  assert.equal(parseToolEnvelope("just prose", TOOLS), null);
  assert.equal(parseToolEnvelope("{not json}", TOOLS), null);
  assert.equal(parseToolEnvelope('{"tool_calls":[]}', TOOLS), null);
  assert.equal(parseToolEnvelope('{"answer":"x"}', TOOLS), null);
  // One unknown or nameless call rejects the whole envelope.
  assert.equal(
    parseToolEnvelope('{"tool_calls":[{"name":"get_weather"},{"name":"rm_rf"}]}', TOOLS),
    null
  );
  assert.equal(parseToolEnvelope('{"tool_calls":[{"arguments":{}}]}', TOOLS), null);
});

test("partTextEmission: first sight, growth, rewrite and repeat", () => {
  assert.deepEqual(partTextEmission(undefined, "Hel"), { chunk: "Hel", countsAsDelta: true });
  assert.deepEqual(partTextEmission(undefined, ""), { chunk: null, countsAsDelta: true });
  assert.deepEqual(partTextEmission("Hel", "Hello"), { chunk: "lo", countsAsDelta: true });
  assert.deepEqual(partTextEmission("Hello", "Bye"), { chunk: "Bye", countsAsDelta: false });
  assert.deepEqual(partTextEmission("abc", ""), { chunk: "", countsAsDelta: false });
  assert.equal(partTextEmission("Hello", "Hello"), null);
});

test("OpencodeTurnCollector: only assistant parts count; deltas and part updates both stream", () => {
  const text: string[] = [];
  const reasoning: string[] = [];
  const collector = new OpencodeTurnCollector({
    onText: (delta) => text.push(delta),
    onReasoning: (delta) => reasoning.push(delta),
  });

  // The echoed user prompt arrives before any assistant message is known.
  collector.handle({
    type: "message.part.updated",
    properties: { part: { id: "u1", type: "text", text: "user prompt", messageID: "m-user" } },
  });
  collector.handle({
    type: "message.updated",
    properties: { info: { id: "m-user", role: "user", sessionID: "s" } },
  });
  collector.handle({
    type: "message.updated",
    properties: { info: { id: "m1", role: "assistant", sessionID: "s", finish: "stop" } },
  });
  collector.handle({
    type: "message.part.delta",
    properties: { messageID: "m1", partID: "p1", field: "text", delta: "Hel" },
  });
  collector.handle({
    type: "message.part.delta",
    properties: { messageID: "m1", partID: "p1", field: "reasoning", delta: "think" },
  });
  collector.handle({
    type: "message.part.delta",
    properties: { messageID: "m-user", partID: "u1", field: "text", delta: "leak" },
  });
  // A growing part.text after the deltas forwards only the unseen tail.
  collector.handle({
    type: "message.part.updated",
    properties: { part: { id: "p1", type: "text", text: "Hello", messageID: "m1" } },
  });
  collector.handle({
    type: "message.part.updated",
    properties: { part: { id: "r1", type: "thinking", text: "deep", messageID: "m1" } },
  });
  collector.handle({ type: "session.idle", properties: {} });

  assert.deepEqual(text, ["Hel", "lo"]);
  assert.deepEqual(reasoning, ["think", "deep"]);
  const result = collector.result();
  assert.equal(result.text, "Hello");
  assert.equal(result.reasoning, "deep");
  assert.equal(result.info.id, "m1");
});

test("OpencodeTurnCollector: falls back to the delta transcript when no part snapshot arrives", () => {
  const collector = new OpencodeTurnCollector();
  collector.handle({
    type: "message.updated",
    properties: { info: { id: "m1", role: "assistant", sessionID: "s" } },
  });
  for (const delta of ["str", "eamed"]) {
    collector.handle({
      type: "message.part.delta",
      properties: { messageID: "m1", field: "text", delta },
    });
  }
  assert.equal(collector.result().text, "streamed");
  assert.equal(collector.result().reasoning, "");
});

test("turnResultFromParts: joins text and reasoning parts of a blocking turn", () => {
  const result = turnResultFromParts({ id: "m1" }, [
    { type: "text", text: "A" },
    { type: "reasoning", text: "r1" },
    { type: "tool" },
    { type: "text", text: "B" },
    { type: "thinking", text: "r2" },
  ]);
  assert.deepEqual(result, { info: { id: "m1" }, text: "AB", reasoning: "r1r2" });
  assert.deepEqual(turnResultFromParts(undefined, undefined), {
    info: {},
    text: "",
    reasoning: "",
  });
});

test("stream frames (chat): role chunk, deltas, tool call, usage on the final chunk", () => {
  const frames = createStreamFrames("chat", { id: "chatcmpl-1", created: 7, model: "m" });
  assert.deepEqual(frameData(frames.created()), {
    id: "chatcmpl-1",
    object: "chat.completion.chunk",
    created: 7,
    model: "m",
    choices: [{ index: 0, delta: { role: "assistant", content: "" }, finish_reason: null }],
  });
  assert.deepEqual(dataChoiceDelta(frames.text("hi")), { content: "hi" });
  assert.deepEqual(dataChoiceDelta(frames.reasoning("r")), { reasoning_content: "r" });

  const out = finalStreamFrames(frames, { info: {}, text: "x", reasoning: "" }, TOOLS, false);
  assert.equal(out.length, 2);
  assert.equal(
    (frameData(out[0]) as { choices: Array<{ finish_reason: string }> }).choices[0].finish_reason,
    "stop"
  );
  assert.equal(out[1], "data: [DONE]\n\n");

  const toolOut = finalStreamFrames(
    frames,
    {
      info: { tokens: { input: 3, output: 2 } },
      text: '{"tool_calls":[{"name":"get_weather"}]}',
      reasoning: "",
    },
    TOOLS,
    true
  );
  assert.equal(toolOut.length, 3);
  assert.equal(
    (dataChoiceDelta(toolOut[0]) as { tool_calls: Array<{ function: { name: string } }> })
      .tool_calls[0].function.name,
    "get_weather"
  );
  const final = frameData(toolOut[1]) as {
    choices: Array<{ finish_reason: string }>;
    usage: { prompt_tokens: number; completion_tokens: number };
  };
  assert.equal(final.choices[0].finish_reason, "tool_calls");
  assert.equal(final.usage.prompt_tokens, 3);
  assert.equal(final.usage.completion_tokens, 2);
  assert.equal(toolOut[2], "data: [DONE]\n\n");
});

test("finalStreamFrames: in tool mode, plain prose is released at the end in one piece", () => {
  const frames = createStreamFrames("chat", { id: "c", created: 1, model: "m" });
  const out = finalStreamFrames(
    frames,
    { info: {}, text: "no tools needed", reasoning: "" },
    TOOLS,
    true
  );
  assert.equal(out.length, 3);
  assert.deepEqual(dataChoiceDelta(out[0]), { content: "no tools needed" });
  // Without tool mode the deltas already streamed, so nothing is repeated.
  const plain = finalStreamFrames(frames, { info: {}, text: "streamed", reasoning: "" }, [], false);
  assert.equal(plain.length, 2);
});

test("stream frames (responses): created, deltas, function_call item, completed, error", () => {
  const frames = createStreamFrames("responses", { id: "resp-1", created: 9, model: "m" });
  assert.deepEqual(frameData(frames.created()), {
    type: "response.created",
    response: {
      id: "resp-1",
      object: "response",
      created_at: 9,
      status: "in_progress",
      model: "m",
      output: [],
    },
  });
  assert.deepEqual(frameData(frames.text("d")), {
    type: "response.output_text.delta",
    item_id: "resp-1",
    output_index: 0,
    delta: "d",
  });
  assert.deepEqual(frameData(frames.reasoning("r")), {
    type: "response.reasoning_summary_text.delta",
    item_id: "resp-1",
    delta: "r",
  });
  const out = finalStreamFrames(
    frames,
    { info: {}, text: '{"tool_calls":[{"name":"get_weather","arguments":{}}]}', reasoning: "" },
    TOOLS,
    true
  );
  const item = frameData(out[0]) as { type: string; item: { type: string; name: string } };
  assert.equal(item.type, "response.output_item.done");
  assert.equal(item.item.type, "function_call");
  assert.equal(item.item.name, "get_weather");
  const completed = frameData(out[1]) as { type: string; response: { tool_choice: string } };
  assert.equal(completed.type, "response.completed");
  assert.equal(completed.response.tool_choice, "required");
  assert.deepEqual(frameData(frames.error({ message: "x" })), {
    type: "error",
    error: { message: "x" },
  });
  const chat = createStreamFrames("chat", { id: "c", created: 1, model: "m" });
  assert.deepEqual(frameData(chat.error({ message: "x" })), { error: { message: "x" } });
});

test("createSseSink: emits until closed, ignores empty text and a second close", async () => {
  const sink = createSseSink();
  sink.emit("data: a\n\n");
  sink.emit("");
  sink.close();
  sink.emit("data: late\n\n");
  sink.close();
  assert.equal(await new Response(sink.stream).text(), "data: a\n\n");
});

function dataChoiceDelta(frame: string): unknown {
  const parsed = frameData(frame) as { choices: Array<{ delta: unknown }> };
  return parsed.choices[0].delta;
}
