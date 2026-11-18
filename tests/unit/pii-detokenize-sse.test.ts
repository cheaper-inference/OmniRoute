// Streaming half of the reversible PII vault (owner design 2026-11-08, section 4): tokens are
// restored per field on the parsed SSE, so a token split across events still resolves, the
// escape follows the layer, snapshots are not duplicated and nothing unrelated is held back.
import test from "node:test";
import assert from "node:assert/strict";

import { RequestTokenVault } from "../../src/lib/pii/tokenVault.ts";
import {
  createDetokenizeCounters,
  createDetokenizeSseTransform,
} from "../../src/lib/pii/detokenizeSseTransform.ts";
import { transformToOllama } from "../../open-sse/utils/ollamaTransform.ts";

const enc = new TextEncoder();
const dec = new TextDecoder();

function vaultWith(value: string, type = "email") {
  const vault = new RequestTokenVault({ nonce: "QAZWSXED" });
  const token = vault.tokenize(type, value)!;
  return { vault, token };
}

const sse = (frames: Array<{ event?: string; data: unknown }>) =>
  frames
    .map(
      (f) =>
        `${f.event ? `event: ${f.event}\n` : ""}data: ${typeof f.data === "string" ? f.data : JSON.stringify(f.data)}\n\n`
    )
    .join("");

async function run(
  vault: RequestTokenVault,
  input: string | Uint8Array[],
  counters = createDetokenizeCounters()
): Promise<string> {
  const chunks = typeof input === "string" ? [enc.encode(input)] : input;
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
  const out = source.pipeThrough(createDetokenizeSseTransform(vault, { counters }));
  let text = "";
  const reader = out.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    text += dec.decode(value, { stream: true });
  }
  return text + dec.decode();
}

function dataFrames(output: string): unknown[] {
  return output
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice(6)));
}

const chars = (s: string) => Array.from(s);

// Read a nested field of a parsed frame without typing every provider shape.
const at = (value: unknown, ...path: Array<string | number>): unknown =>
  path.reduce<unknown>(
    (node, key) =>
      node && typeof node === "object"
        ? (node as Record<string | number, unknown>)[key]
        : undefined,
    value
  );
const str = (value: unknown) => (typeof value === "string" ? value : "");

test("OpenAI chat: a token split one character per event is restored", async () => {
  const { vault, token } = vaultWith("jane@example.com");
  const text = `Mail ${token} today.`;
  const frames = chars(text).map((c) => ({
    data: {
      id: "c1",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { content: c } }],
    },
  }));
  frames.push({ data: { id: "c1", choices: [{ index: 0, delta: {}, finish_reason: "stop" }] } });
  const out = await run(vault, sse(frames) + "data: [DONE]\n\n");
  const restored = dataFrames(out)
    .map((f) => str(at(f, "choices", 0, "delta", "content")))
    .join("");
  assert.equal(restored, "Mail jane@example.com today.");
  assert.ok(out.trimEnd().endsWith("data: [DONE]"));
  assert.doesNotMatch(out, /<<PII_/);
});

test("Claude messages: a token split per text_delta event is restored, event lines kept", async () => {
  const { vault, token } = vaultWith("+55 11 98888-7777", "phone_br");
  const text = `Call ${token}.`;
  const frames: Array<{ event?: string; data: unknown }> = [
    {
      event: "message_start",
      data: { type: "message_start", message: { id: "m", role: "assistant", content: [] } },
    },
    {
      event: "content_block_start",
      data: { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
    },
    ...chars(text).map((c) => ({
      event: "content_block_delta",
      data: { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: c } },
    })),
    { event: "content_block_stop", data: { type: "content_block_stop", index: 0 } },
    { event: "message_delta", data: { type: "message_delta", delta: { stop_reason: "end_turn" } } },
    { event: "message_stop", data: { type: "message_stop" } },
  ];
  const out = await run(vault, sse(frames));
  const restored = dataFrames(out)
    .map((f) => (at(f, "type") === "content_block_delta" ? str(at(f, "delta", "text")) : ""))
    .join("");
  assert.equal(restored, "Call +55 11 98888-7777.");
  assert.match(out, /event: message_stop\ndata: /);
});

test("Responses: split deltas restored, the .done snapshot restored once with no duplication", async () => {
  const { vault, token } = vaultWith("jane@example.com");
  const tokenized = `Hi ${token}!`;
  const frames = [
    ...chars(tokenized).map((c) => ({
      event: "response.output_text.delta",
      data: {
        type: "response.output_text.delta",
        item_id: "msg_1",
        output_index: 0,
        content_index: 0,
        delta: c,
      },
    })),
    {
      event: "response.output_text.done",
      data: {
        type: "response.output_text.done",
        item_id: "msg_1",
        output_index: 0,
        content_index: 0,
        text: tokenized,
      },
    },
    {
      event: "response.completed",
      data: {
        type: "response.completed",
        response: {
          id: "resp_1",
          status: "completed",
          output: [{ type: "message", content: [{ type: "output_text", text: tokenized }] }],
        },
      },
    },
  ];
  const out = await run(vault, sse(frames));
  const parsed = dataFrames(out);
  const deltas = parsed
    .filter((f) => at(f, "type") === "response.output_text.delta")
    .map((f) => str(at(f, "delta")))
    .join("");
  assert.equal(deltas, "Hi jane@example.com!");
  const done = parsed.find((f) => at(f, "type") === "response.output_text.done");
  assert.equal(at(done, "text"), "Hi jane@example.com!");
  const completed = parsed.find((f) => at(f, "type") === "response.completed");
  assert.equal(
    at(completed, "response", "output", 0, "content", 0, "text"),
    "Hi jane@example.com!"
  );
  assert.equal(at(completed, "response", "id"), "resp_1");
});

test("Gemini: a token split across candidate parts is restored", async () => {
  const { vault, token } = vaultWith("123.456.789-09", "cpf");
  const text = `CPF ${token}`;
  const frames = chars(text).map((c) => ({
    data: { candidates: [{ index: 0, content: { role: "model", parts: [{ text: c }] } }] },
  }));
  frames.push({
    data: {
      candidates: [
        { index: 0, content: { role: "model", parts: [{ text: "." }] }, finishReason: "STOP" },
      ],
    },
  });
  const out = await run(vault, sse(frames));
  const restored = dataFrames(out)
    .map((f) =>
      ((at(f, "candidates", 0, "content", "parts") as unknown[]) ?? [])
        .map((p) => str(at(p, "text")))
        .join("")
    )
    .join("");
  assert.equal(restored, "CPF 123.456.789-09.");
});

test("a byte stream cut inside multibyte UTF-8 characters still restores the token", async () => {
  const { vault, token } = vaultWith("josé@exemplo.com.br");
  const body = sse([
    { data: { choices: [{ index: 0, delta: { content: `olá ${token.slice(0, 9)}` } }] } },
    { data: { choices: [{ index: 0, delta: { content: `${token.slice(9)} 😀 fim` } }] } },
    { data: { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] } },
  ]);
  const bytes = enc.encode(body);
  const oneByteChunks = Array.from(bytes, (b) => Uint8Array.of(b));
  const out = await run(vault, oneByteChunks);
  const restored = dataFrames(out)
    .map((f) => str(at(f, "choices", 0, "delta", "content")))
    .join("");
  assert.equal(restored, "olá josé@exemplo.com.br 😀 fim");
});

test("tool-call arguments stay valid JSON when the value has quotes and backslashes", async () => {
  const value = 'Rua "A" \\ 12';
  const { vault, token } = vaultWith(value, "custom:address");
  const args = JSON.stringify({ address: token, n: 1 });
  const frames = chars(args).map((c) => ({
    data: {
      choices: [{ index: 0, delta: { tool_calls: [{ index: 0, function: { arguments: c } }] } }],
    },
  }));
  frames.unshift({
    data: {
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: "ship", arguments: "" },
              },
            ],
          },
        },
      ],
    },
  });
  frames.push({ data: { choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] } });
  const out = await run(vault, sse(frames));
  const joined = dataFrames(out)
    .flatMap((f) => (at(f, "choices", 0, "delta", "tool_calls") as unknown[]) ?? [])
    .map((t) => str(at(t, "function", "arguments")))
    .join("");
  assert.deepEqual(JSON.parse(joined), { address: value, n: 1 });
});

test("Claude input_json_delta (partial_json) restores with JSON escaping", async () => {
  const value = 'say "x"\\y';
  const { vault, token } = vaultWith(value, "custom:note");
  const json = JSON.stringify({ note: token });
  const frames: Array<{ event?: string; data: unknown }> = [
    {
      event: "content_block_start",
      data: {
        type: "content_block_start",
        index: 1,
        content_block: { type: "tool_use", id: "toolu_1", name: "save", input: {} },
      },
    },
    ...chars(json).map((c) => ({
      event: "content_block_delta",
      data: {
        type: "content_block_delta",
        index: 1,
        delta: { type: "input_json_delta", partial_json: c },
      },
    })),
    { event: "content_block_stop", data: { type: "content_block_stop", index: 1 } },
    { event: "message_stop", data: { type: "message_stop" } },
  ];
  const out = await run(vault, sse(frames));
  const joined = dataFrames(out)
    .map((f) =>
      at(f, "delta", "type") === "input_json_delta" ? str(at(f, "delta", "partial_json")) : ""
    )
    .join("");
  assert.deepEqual(JSON.parse(joined), { note: value });
});

test("reasoning text is restored too", async () => {
  const { vault, token } = vaultWith("jane@example.com");
  const frames = chars(`think ${token}`).map((c) => ({
    data: { choices: [{ index: 0, delta: { reasoning_content: c } }] },
  }));
  frames.push({ data: { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] } });
  const out = await run(vault, sse(frames));
  const restored = dataFrames(out)
    .map((f) => str(at(f, "choices", 0, "delta", "reasoning_content")))
    .join("");
  assert.equal(restored, "think jane@example.com");
});

test("`a < b` and `<<EOF` are released with their own event, nothing held back", async () => {
  const { vault } = vaultWith("jane@example.com");
  const transform = createDetokenizeSseTransform(vault);
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  void writer.write(
    enc.encode(sse([{ data: { choices: [{ index: 0, delta: { content: "if a < b" } }] } }]))
  );
  let first = "";
  while (!first.includes("\n\n")) {
    const { value } = await reader.read();
    first += dec.decode(value);
  }
  assert.equal(
    at(JSON.parse(first.split("\n")[0].slice(6)), "choices", 0, "delta", "content"),
    "if a < b"
  );
  void writer.write(
    enc.encode(sse([{ data: { choices: [{ index: 0, delta: { content: "cat <<EOF" } }] } }]))
  );
  let second = "";
  while (!second.includes("\n\n")) {
    const { value } = await reader.read();
    second += dec.decode(value);
  }
  assert.equal(
    at(JSON.parse(second.split("\n")[0].slice(6)), "choices", 0, "delta", "content"),
    "cat <<EOF"
  );
  void writer.close();
});

test("an unknown token passes literally; a dangling prefix is flushed at the end", async () => {
  const { vault } = vaultWith("jane@example.com");
  const unknown = "<<PII_EMAIL_QAZWSXED_99>>";
  const frames = [
    { data: { choices: [{ index: 0, delta: { content: `x ${unknown} y` } }] } },
    { data: { choices: [{ index: 0, delta: { content: " tail <<PI" } }] } },
    { data: { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] } },
  ];
  const out = await run(vault, sse(frames) + "data: [DONE]\n\n");
  const restored = dataFrames(out)
    .map((f) => str(at(f, "choices", 0, "delta", "content")))
    .join("");
  assert.equal(restored, `x ${unknown} y tail <<PI`);
  assert.equal(vault.stats().unresolved, 1);
});

test("a stream with no tokens keeps its text and frame count", async () => {
  const { vault } = vaultWith("jane@example.com");
  const frames = [
    { data: { choices: [{ index: 0, delta: { content: "hello" } }] } },
    { data: { choices: [{ index: 0, delta: { content: " world" } }] } },
    { data: { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] } },
  ];
  const out = await run(vault, sse(frames) + "data: [DONE]\n\n");
  assert.equal(dataFrames(out).length, 3);
  assert.match(out, /"content":"hello"/);
});

test("Ollama NDJSON (converted after handleChat) carries the restored text", async () => {
  const { vault, token } = vaultWith("jane@example.com");
  const frames = chars(`ok ${token}`).map((c) => ({
    data: { choices: [{ index: 0, delta: { content: c } }] },
  }));
  frames.push({ data: { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] } });
  const body = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(enc.encode(sse(frames) + "data: [DONE]\n\n"));
      c.close();
    },
  }).pipeThrough(createDetokenizeSseTransform(vault));
  const ollama = transformToOllama(
    new Response(body, { headers: { "Content-Type": "text/event-stream" } }),
    "llama3.2"
  );
  const lines = (await ollama.text())
    .trim()
    .split("\n")
    .map((l) => JSON.parse(l));
  const text = lines.map((l) => str(at(l, "message", "content"))).join("");
  assert.equal(text, "ok jane@example.com");
});
