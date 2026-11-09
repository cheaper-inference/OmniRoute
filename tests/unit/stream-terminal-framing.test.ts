import assert from "node:assert/strict";
import test from "node:test";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import {
  createDisconnectAwareStream,
  createStreamController,
} from "../../open-sse/utils/streamHandler.ts";

type Packet = Record<string, unknown>;
const frame = (value: Packet) => `data: ${JSON.stringify(value)}\n\n`;
// Independent client oracle: only complete SSE frames are dispatchable. Do not
// share the implementation's terminal detector or accept a regex in raw bytes.
function packets(raw: string): Packet[] {
  return raw
    .split(/\r\n\r\n|\n\n|\r\r/)
    .slice(0, -1)
    .flatMap((block) => {
      const data = block
        .split(/\r\n|\r|\n/)
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trimStart())
        .join("\n");
      if (!data || data === "[DONE]") return [];
      try {
        return [JSON.parse(data) as Packet];
      } catch {
        return [];
      }
    });
}
const formats = [
  {
    format: FORMATS.OPENAI,
    terminal: { choices: [{ delta: {}, finish_reason: "stop" }] },
    progress: { choices: [{ delta: { content: "partial🙂" }, finish_reason: null }] },
    poison: { finish_reason: "stop" },
    name: "chat",
  },
  {
    format: FORMATS.OPENAI_RESPONSES,
    terminal: { type: "response.completed", response: { status: "completed", output: [] } },
    progress: { type: "response.output_text.delta", delta: "partial🙂" },
    poison: { type: "response.completed" },
    name: "responses",
  },
  {
    format: FORMATS.CLAUDE,
    terminal: { type: "message_stop" },
    progress: {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "partial🙂" },
    },
    poison: { type: "message_stop" },
    name: "messages",
  },
] as const;
async function run(format: string, wire: string, bytewise: boolean | number) {
  const bytes = new TextEncoder().encode(wire);
  const size = typeof bytewise === "number" ? bytewise : bytewise ? 1 : bytes.length;
  const chunks = Array.from({ length: Math.ceil(bytes.length / size) }, (_, i) =>
    bytes.slice(i * size, (i + 1) * size)
  );
  let cursor = 0;
  let failures = 0;
  const source = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (cursor < chunks.length) controller.enqueue(chunks[cursor++]);
        else
          controller.error(
            Object.assign(new Error("synthetic transport failure"), { statusCode: 502 })
          );
      },
    },
    { highWaterMark: 0 }
  );
  const stream = createDisconnectAwareStream(
    { readable: source, writable: new WritableStream() },
    createStreamController({
      clientResponseFormat: format,
      onError: () => {
        failures++;
      },
    }),
    { highWaterMark: 0 }
  );
  const wireOut = await new Response(stream).text();
  return { wire: wireOut, events: packets(wireOut), failures };
}
function errors(events: Packet[]) {
  return events.filter(
    (event) => event.type === "error" || event.type === "response.failed" || event.error
  );
}
for (const spec of formats) {
  const traps = [
    {
      name: "terminal only inside nested metadata",
      wire: frame({ ...spec.progress, metadata: spec.poison }),
    },
    { name: "terminal quoted in a comment", wire: `: ${JSON.stringify(spec.poison)}\n\n` },
    {
      name: "terminal prefix in incomplete JSON",
      wire: `data: ${JSON.stringify(spec.terminal).slice(0, -1)}`,
    },
    {
      name: "terminal-looking nested value after a large nonterminal prefix",
      wire: frame({ ...spec.progress, padding: "x".repeat(70 * 1024), metadata: spec.poison }),
    },
    // Contradictory event labels and JSON types are a malformed-input policy
    // question, deliberately outside the portable protocol claim.
  ];
  for (const trap of traps)
    for (const bytewise of [false, true])
      test(
        `downstream terminal spoof / ${spec.name} / ${trap.name} / bytewise=${bytewise}`,
        { timeout: 10000 },
        async () => {
          const result = await run(spec.format, frame(spec.progress) + trap.wire, bytewise);
          assert.equal(
            result.failures,
            1,
            "nonterminal data cannot suppress a real transport failure"
          );
          assert.equal(
            errors(result.events).length,
            1,
            "the downstream parser must receive one complete, parseable error, even after truncated JSON"
          );
          // Security/private-diagnostic redaction has a separate disclosure path.
        }
      );
  for (const bytewise of [false, true])
    test(`real complete terminal suppresses only the later transport failure / ${spec.name} / bytewise=${bytewise}`, async () => {
      const result = await run(spec.format, frame(spec.progress) + frame(spec.terminal), bytewise);
      assert.equal(result.failures, 0);
      assert.equal(errors(result.events).length, 0);
      assert.equal(result.wire, frame(spec.progress) + frame(spec.terminal));
    });
  test(`large valid terminal is not a false failure after fragmentation / ${spec.name}`, async () => {
    const wire = frame(spec.progress) + frame({ ...spec.terminal, padding: "x".repeat(70 * 1024) });
    const result = await run(spec.format, wire, 97);
    assert.equal(result.failures, 0);
    assert.equal(errors(result.events).length, 0);
    assert.equal(result.wire, wire);
  });
  test(`folded CRLF terminal is still recognized / ${spec.name}`, async () => {
    const terminal =
      JSON.stringify(spec.terminal, null, 2)
        .split("\n")
        .map((line) => `data: ${line}\r\n`)
        .join("") + "\r\n";
    const result = await run(spec.format, frame(spec.progress) + terminal, true);
    assert.equal(result.failures, 0);
    assert.equal(errors(result.events).length, 0);
  });
  test(`unfinished nonterminal JSON cannot swallow a synthetic error / ${spec.name}`, async () => {
    const result = await run(spec.format, frame(spec.progress) + 'data: {"unclosed":', true);
    assert.equal(result.failures, 1);
    assert.equal(
      errors(result.events).length,
      1,
      "recovery error must start at a new SSE frame, not inside unfinished provider data"
    );
  });
  for (const completed of [false, true])
    test(`cancel after terminal-looking bytes counts only dispatchable completion / ${spec.name} / completed=${completed}`, async () => {
      const wire =
        frame(spec.progress) +
        (completed ? frame(spec.terminal) : `data: ${JSON.stringify(spec.terminal)}`);
      let disconnects = 0;
      let cancels = 0;
      let aborts = 0;
      const source = new ReadableStream<Uint8Array>(
        {
          start(controller) {
            controller.enqueue(new TextEncoder().encode(wire));
          },
          cancel() {
            cancels++;
          },
        },
        { highWaterMark: 0 }
      );
      const destination = new WritableStream({
        abort() {
          aborts++;
        },
      });
      const controller = createStreamController({
        clientResponseFormat: spec.format,
        onDisconnect: () => {
          disconnects++;
        },
      });
      const wrapped = createDisconnectAwareStream(
        { readable: source, writable: destination },
        controller,
        { highWaterMark: 0 }
      );
      const reader = wrapped.getReader();
      assert.equal(new TextDecoder().decode((await reader.read()).value), wire);
      await reader.cancel("cancel exactly after delivered bytes");
      assert.equal(disconnects, completed ? 0 : 1);
      assert.equal(controller.signal.aborted, !completed);
      assert.equal(cancels, 1);
      assert.equal(aborts, 1);
    });
}
