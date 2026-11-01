import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const isolated = fs.mkdtempSync(path.join(os.tmpdir(), "reasoning-fields-17291-"));
process.env.HOME = isolated;
process.env.DATA_DIR = path.join(isolated, "data");
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
process.env.PII_TEST_BYPASS_MIN_WINDOW = "true";
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("Offline streaming test forbids fetch");
};
const { createPiiSseTransform } = await import("../../src/lib/streamingPiiTransform.ts");
const { createCredentialSseTransform } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  globalThis.fetch = originalFetch;
  fs.rmSync(isolated, { recursive: true, force: true });
});

type TextField = "content" | "reasoning" | "reasoning_content";
type Delta = Partial<Record<TextField, string>> & {
  role?: string;
  signature?: string;
  tool_calls?: Array<{
    index: number;
    id?: string;
    type?: string;
    function: { name?: string; arguments: string };
  }>;
};
type Event = {
  id?: string;
  model?: string;
  request_id?: string;
  usage?: { total_tokens: number };
  choices?: Array<{ index?: number; delta?: Delta; finish_reason?: string }>;
};
function event(delta: Delta, index = 0): string {
  return `data: ${JSON.stringify({ choices: [{ index, delta }] })}\n\n`;
}
async function run(
  transform: TransformStream,
  chunks: string[],
  byteSize?: number
): Promise<Event[]> {
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        const bytes = new TextEncoder().encode(chunk);
        for (let at = 0; at < bytes.length; at += byteSize ?? bytes.length) {
          controller.enqueue(bytes.slice(at, at + (byteSize ?? bytes.length)));
        }
      }
      controller.close();
    },
  });
  const text = await new Response(source.pipeThrough(transform)).text();
  return text
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice(6)) as Event);
}
function field(events: Event[], name: TextField, index = 0): string {
  return events
    .flatMap((e) => e.choices ?? [])
    .filter((c) => (c.index ?? 0) === index)
    .map((c) => c.delta?.[name] ?? "")
    .join("");
}
for (const [name, factory] of [
  ["PII", createPiiSseTransform],
  ["credential", createCredentialSseTransform],
] as const) {
  test(`${name}: simultaneous reasoning fields retain their own bytes (#17291)`, async () => {
    const reasoning = "reason-A ".repeat(100);
    const reasoningContent = "reason-B ".repeat(100);
    const out = await run(factory(), [
      event({ reasoning, reasoning_content: reasoningContent }),
      "data: [DONE]\n\n",
    ]);
    assert.equal(field(out, "reasoning"), reasoning);
    assert.equal(field(out, "reasoning_content"), reasoningContent);
  });
}

const factories = [
  ["PII", createPiiSseTransform],
  ["credential", createCredentialSseTransform],
] as const;
const done = "data: [DONE]\n\n";
const jsonEvent = (value: Event) => `data: ${JSON.stringify(value)}\n\n`;
for (const [name, factory] of factories) {
  for (const ending of ["done", "finish", "eof"] as const) {
    for (const windowSize of [8, 512]) {
      test(`${name}: alternating fields and interleaved choices survive ${ending}, window ${windowSize}`, async () => {
        const a = "Ação 🦜 ".repeat(80),
          b = "思考 🌞 ".repeat(80);
        const chunks = [
          event({ reasoning: a.slice(0, 17) }, 0),
          event({ reasoning_content: b.slice(0, 13) }, 1),
          event({ reasoning_content: "zero companion " }, 0),
          event({ reasoning: "one companion " }, 1),
          event({ reasoning: a.slice(17) }, 0),
          event({ reasoning_content: b.slice(13) }, 1),
        ];
        if (ending === "done") chunks.push(done);
        if (ending === "finish")
          chunks.push(
            jsonEvent({
              choices: [
                { index: 0, delta: {}, finish_reason: "stop" },
                { index: 1, delta: {}, finish_reason: "stop" },
              ],
            }),
            done
          );
        const out = await run(factory({ windowSize }), chunks, 7);
        assert.equal(field(out, "reasoning", 0), a);
        assert.equal(field(out, "reasoning_content", 0), "zero companion ");
        assert.equal(field(out, "reasoning", 1), "one companion ");
        assert.equal(field(out, "reasoning_content", 1), b);
        const terminal = out.findIndex((e) => e.choices?.some((c) => c.finish_reason));
        if (ending === "finish") {
          assert.ok(terminal >= 0);
          assert.equal(
            out
              .slice(terminal + 1)
              .some((e) =>
                e.choices?.some((c) => c.delta?.reasoning || c.delta?.reasoning_content)
              ),
            false
          );
        }
      });
    }
  }
  for (const key of ["reasoning", "reasoning_content"] as const) {
    test(`${name}: a single ${key} never becomes its alias at EOF`, async () => {
      const value = "short tail 🦜";
      const out = await run(factory(), [event({ [key]: value })]);
      assert.equal(field(out, key), value);
      assert.equal(field(out, key === "reasoning" ? "reasoning_content" : "reasoning"), "");
    });
  }
  test(`${name}: final-frame text drains in order without replaying headers, signatures or tool arguments`, async () => {
    const args = JSON.stringify({ command: "echo safe 🦜 ".repeat(400) });
    const chunks = [
      jsonEvent({
        id: "completion-fixture",
        model: "fixture",
        request_id: "request-fixture",
        choices: [
          {
            index: 0,
            delta: {
              role: "assistant",
              signature: "opaque-signature@example.com",
              reasoning: "first ".repeat(150),
              reasoning_content: "second ".repeat(150),
              tool_calls: [
                {
                  index: 0,
                  id: "call-fixture",
                  type: "function",
                  function: { name: "terminal", arguments: args },
                },
              ],
            },
          },
        ],
      }),
      jsonEvent({
        choices: [
          {
            index: 0,
            delta: { reasoning: "END A", reasoning_content: "END B" },
            finish_reason: "tool_calls",
          },
        ],
        usage: { total_tokens: 9 },
      }),
      done,
    ];
    const out = await run(factory(), chunks);
    assert.equal(field(out, "reasoning"), "first ".repeat(150) + "END A");
    assert.equal(field(out, "reasoning_content"), "second ".repeat(150) + "END B");
    const deltas = out.flatMap((e) => e.choices ?? []).map((c) => c.delta ?? {});
    const calls = deltas.flatMap((d) => d.tool_calls ?? []);
    const reconstructed = calls.map((c) => c.function.arguments).join("");
    assert.equal(reconstructed, args);
    assert.deepEqual(JSON.parse(reconstructed), JSON.parse(args));
    assert.equal(calls.filter((c) => c.id).length, 1);
    assert.equal(calls.filter((c) => c.function.name).length, 1);
    assert.equal(deltas.filter((d) => d.role).length, 1);
    assert.deepEqual(
      deltas.filter((d) => d.signature).map((d) => d.signature),
      ["opaque-signature@example.com"]
    );
    assert.equal(out.filter((e) => e.usage).length, 1);
    assert.equal(out.filter((e) => e.choices?.some((c) => c.finish_reason)).length, 1);
  });
  test(`${name}: fragmented sensitive text is masked independently in both reasoning fields`, async () => {
    const secret = name === "PII" ? "fixture@example.com" : "sk-" + "ABCD".repeat(12);
    const marker = name === "PII" ? "[EMAIL_REDACTED]" : "[REDACTED:openai]";
    // Split the credential prefix before it can match on its own. A longer partial
    // prefix is a separate pre-existing masker defect; #17291 preserves its policy.
    const cut = name === "PII" ? Math.floor(secret.length / 2) : 2;
    const out = await run(factory(), [
      event({
        reasoning: "A " + secret.slice(0, cut),
        reasoning_content: "B " + secret.slice(0, cut),
      }),
      event({ reasoning_content: secret.slice(cut) + " tail B" }),
      event({ reasoning: secret.slice(cut) + " tail A" }),
      done,
    ]);
    assert.equal(JSON.stringify(out).includes(secret), false);
    assert.equal(field(out, "reasoning"), "A " + marker + " tail A");
    assert.equal(field(out, "reasoning_content"), "B " + marker + " tail B");
  });
}
