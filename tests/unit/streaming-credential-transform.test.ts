import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-streaming-credential-"));
process.env.DATA_DIR = tmpDir;

const { createCredentialSseTransform, findCredentialPartialTailIndex } =
  await import("../../src/lib/streamingCredentialTransform.ts");
import { redactCredentials } from "../../src/lib/guardrails/credentialMasker.ts";

async function runTransform(transform: TransformStream, inputChunks: string[]): Promise<string> {
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const writePromise = (async () => {
    for (const chunk of inputChunks) {
      await writer.write(new TextEncoder().encode(chunk));
    }
    try {
      await writer.close();
    } catch {
      // Stream may already be closed
    }
  })();
  const outputChunks: string[] = [];
  let res = await reader.read();
  while (!res.done) {
    outputChunks.push(new TextDecoder().decode(res.value));
    res = await reader.read();
  }
  await writePromise;
  return outputChunks.join("");
}

function sseContent(text: string): string {
  return `data: {"choices":[{"delta":{"content":${JSON.stringify(text)}}}]}\n\n`;
}

const OPENAI_KEY = "sk-ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv";
const AWS_KEY = "AKIAIOSFODNN7EXAMPLE";

test("factory returns a TransformStream", () => {
  assert.ok(createCredentialSseTransform() instanceof TransformStream);
});

test("streaming content carrying an OpenAI key is stamped with the openai label", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent(`the key is ${OPENAI_KEY} ok`),
  ]);
  assert.ok(!output.includes(OPENAI_KEY), "raw key must not leak to the client");
  assert.match(output, /\[REDACTED:openai\]/);
});

test("streaming content carrying an AWS key is stamped with the aws label", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent(`aws ${AWS_KEY} here`),
  ]);
  assert.ok(!output.includes(AWS_KEY));
  assert.match(output, /\[REDACTED:aws\]/);
});

test("content without credentials passes through byte-identical", async () => {
  const input = sseContent("hello world no secrets here");
  const output = await runTransform(createCredentialSseTransform(), [input]);
  assert.ok(output.includes("hello world no secrets here"));
});

test("image data URL carrying key-shaped base64 stays intact", async () => {
  const keyShaped = "AIza" + "B7qX".repeat(8);
  const url = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUg${keyShaped}AAAAAElFTkSuQmCC`;
  const output = await runTransform(createCredentialSseTransform(), [sseContent(`see ${url}`)]);
  assert.ok(output.includes(url), "image data URL must pass through unchanged");
});

test("secret split across chunk boundaries is still masked", async () => {
  const half = Math.floor(OPENAI_KEY.length / 2);
  const output = await runTransform(createCredentialSseTransform({ windowSize: 512 }), [
    sseContent(`key ${OPENAI_KEY.slice(0, half)}`),
    sseContent(OPENAI_KEY.slice(half)),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY.slice(0, 10)));
  assert.ok(
    output.includes("[REDACTED:openai]") || output.includes("[REDACTED:openai_compatible]")
  );
});

test("secret split inside the fixed prefix is never emitted in clear", async () => {
  const output = await runTransform(createCredentialSseTransform({ windowSize: 512 }), [
    sseContent("prefix sk-"),
    sseContent(`${OPENAI_KEY.slice(3)} suffix`),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY.slice(0, 10)));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("multiline private key split across chunks never leaks its head", async () => {
  const key =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASC\n-----END PRIVATE KEY-----";
  const cut = key.indexOf("MIIEvQ") + 4;
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent(`k ${key.slice(0, cut)}`),
    sseContent(`${key.slice(cut)} tail`),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes("MIIEvQIBADANBgkqhkiG9w0BAQEFAASC"));
  assert.match(output, /\[REDACTED:private_key\]/);
});

test("partial connection string across chunks is masked", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent("db mongodb://user:pa"),
    sseContent("ssword@host/db tail"),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes("mongodb://user:password@"));
  assert.match(output, /\[REDACTED:connection_string\]/);
});

test("tool call arguments carrying a key are masked like the non-streaming path", async () => {
  const payload = {
    choices: [
      {
        delta: {
          tool_calls: [{ function: { arguments: JSON.stringify({ api_key: OPENAI_KEY }) } }],
        },
      },
    ],
  };
  const direct = redactCredentials(JSON.stringify({ api_key: OPENAI_KEY })).text;
  const output = await runTransform(createCredentialSseTransform(), [
    `data: ${JSON.stringify(payload)}\n\n`,
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY));
  assert.ok(output.includes(direct.match(/\[REDACTED:[^\]]+\]/)?.[0] ?? "[REDACTED:openai]"));
});

test("snapshot event text is masked directly", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    `data: {"type":"response.output_text.done","text":"final ${OPENAI_KEY}"}\n\n`,
  ]);
  assert.ok(!output.includes(OPENAI_KEY));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("tool-args snapshot accumulated over deltas never leaks between deltas", async () => {
  const part1 = OPENAI_KEY.slice(0, 20);
  const part2 = OPENAI_KEY.slice(20);
  const output = await runTransform(createCredentialSseTransform(), [
    `data: {"type":"response.function_call_arguments.delta","delta":${JSON.stringify(part1)}}\n\n`,
    `data: {"type":"response.function_call_arguments.delta","delta":${JSON.stringify(part2)}}\n\n`,
    `data: {"type":"response.completed","response":{"output_text":"done ${OPENAI_KEY}"}}\n\n`,
  ]);
  assert.ok(!output.includes(OPENAI_KEY.slice(0, 10)));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("emoji at the emission boundary is not split", async () => {
  const emoji = "😀";
  const filler = "a".repeat(600);
  const output = await runTransform(createCredentialSseTransform({ windowSize: 64 }), [
    sseContent(`${filler}${emoji} tail ${OPENAI_KEY} end`),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY));
  assert.ok(output.includes(emoji));
});

test("oversized unclosed private-key head is emitted marked, never clear", async () => {
  const head = `-----BEGIN PRIVATE KEY-----\n${"A".repeat(70000)}`;
  const output = await runTransform(
    createCredentialSseTransform({ windowSize: 512, maxBufferedBytes: 65536 }),
    [sseContent(head), "data: [DONE]\n\n"]
  );
  assert.ok(!output.includes("A".repeat(100)));
  assert.match(output, /\[REDACTED:private_key\]/);
});

test("fresh factory per request emits complete output equal to direct marking", async () => {
  const payload = `order ${OPENAI_KEY} then ${AWS_KEY} done`;
  for (let i = 0; i < 3; i++) {
    const output = await runTransform(createCredentialSseTransform(), [
      sseContent(payload),
      "data: [DONE]\n\n",
    ]);
    const direct = redactCredentials(payload).text;
    assert.ok(!output.includes(OPENAI_KEY));
    assert.ok(!output.includes(AWS_KEY));
    for (const marker of direct.match(/\[REDACTED:[^\]]+\]/g) ?? []) {
      assert.ok(output.includes(marker), `expected marker ${marker} in stream output`);
    }
  }
});

test("fan-out beyond the choice cap keeps output complete", async () => {
  const output = await runTransform(createCredentialSseTransform({ maxBufferedChoices: 2 }), [
    `data: {"choices":[{"index":0,"delta":{"content":"a ${OPENAI_KEY}"}},{"index":1,"delta":{"content":"b"}},{"index":2,"delta":{"content":"c"}}]}\n\n`,
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(OPENAI_KEY));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("unclosed key header followed by a long gap never leaks in clear", async () => {
  const secret = `sk-${"A".repeat(48)}`;
  const output = await runTransform(createCredentialSseTransform(), [
    sseContent(`note -----BEGIN PRIVATE KEY-----\n${"x".repeat(600)}`),
    sseContent(`${secret} tail`),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes("-----BEGIN"), "unclosed key header must not leak in clear");
  assert.ok(!output.includes(secret.slice(0, 10)));
  assert.match(output, /\[REDACTED:openai\]/);
});

test("partial-tail probe finds a truncated fixed prefix touching the buffer end", () => {
  assert.equal(findCredentialPartialTailIndex("hello sk-ABCDEFGH"), 6);
  assert.equal(findCredentialPartialTailIndex("hello world"), undefined);
  assert.equal(findCredentialPartialTailIndex("data AKIAIOSFODNN7EX"), 5);
});

test("gate resolution honors the flag, the env fallback, and the opt-out", async () => {
  const { resolveCredentialGate, isCredentialTransformEnabled } =
    await import("../../src/lib/streamingCredentialTransform.ts");
  const on = await resolveCredentialGate({
    getSettings: async () => ({ credentialRedactionEnabled: true }),
    resolveDisabledGuardrails: () => [],
  });
  assert.equal(on.credentialRedactionEnabled, true);
  assert.equal(
    isCredentialTransformEnabled({
      credentialRedactionEnabled: on.credentialRedactionEnabled,
      credentialDisabledGuardrails: on.credentialDisabledGuardrails,
    }),
    true
  );
  const optedOut = await resolveCredentialGate({
    getSettings: async () => ({ credentialRedactionEnabled: true }),
    resolveDisabledGuardrails: () => ["credential-masker"],
  });
  assert.equal(
    isCredentialTransformEnabled({
      credentialRedactionEnabled: optedOut.credentialRedactionEnabled,
      credentialDisabledGuardrails: optedOut.credentialDisabledGuardrails,
    }),
    false
  );
  const original = process.env.CREDENTIAL_REDACTION_ENABLED;
  process.env.CREDENTIAL_REDACTION_ENABLED = "true";
  try {
    const viaEnv = await resolveCredentialGate({
      getSettings: async () => ({ credentialRedactionEnabled: false }),
      resolveDisabledGuardrails: () => [],
    });
    assert.equal(viaEnv.credentialRedactionEnabled, true);
  } finally {
    if (original === undefined) delete process.env.CREDENTIAL_REDACTION_ENABLED;
    else process.env.CREDENTIAL_REDACTION_ENABLED = original;
  }
});

// OpenAI Chat Completions streams: the end-of-stream flush must carry only the held-back
// tails. Re-sending the last forwarded delta duplicated tool_calls headers and made the
// client-side accumulated arguments invalid JSON.
const chatEnvelope = {
  id: "chatcmpl-flush",
  object: "chat.completion.chunk",
  created: 1,
  model: "m",
};
function chatChunk(delta: object, finish: string | null = null, extra: object = {}): string {
  const body = { ...chatEnvelope, ...extra, choices: [{ index: 0, delta, finish_reason: finish }] };
  return `data: ${JSON.stringify(body)}\n\n`;
}

type ChatToolCall = { id?: string; index: number; function?: { arguments?: string } };
type ChatEvent = {
  id?: string;
  usage?: unknown;
  choices?: Array<{
    finish_reason?: string | null;
    delta?: {
      content?: unknown;
      reasoning?: unknown;
      reasoning_content?: unknown;
      tool_calls?: ChatToolCall[];
    };
  }>;
};

function parseChatEvents(output: string): ChatEvent[] {
  return output
    .split("\n")
    .filter((line) => line.startsWith("data: ") && !line.includes("[DONE]"))
    .map((line) => JSON.parse(line.slice(6)) as ChatEvent);
}

function accumulateChat(events: ChatEvent[]) {
  const args = new Map<number, string>();
  const ids: string[] = [];
  let content = "";
  let reasoning = "";
  let usageEvents = 0;
  for (const event of events) {
    if (event.usage) usageEvents += 1;
    for (const choice of event.choices ?? []) {
      const delta = choice.delta ?? {};
      if (typeof delta.content === "string") content += delta.content;
      if (typeof delta.reasoning === "string") reasoning += delta.reasoning;
      if (typeof delta.reasoning_content === "string") reasoning += delta.reasoning_content;
      for (const call of delta.tool_calls ?? []) {
        if (call.id) ids.push(call.id);
        args.set(call.index, (args.get(call.index) ?? "") + (call.function?.arguments ?? ""));
      }
    }
  }
  return { args, ids, content, reasoning, usageEvents };
}

const memoryArgs = JSON.stringify({ action: "add", content: "cats sleep a lot" });
const delegateArgs = JSON.stringify({
  goal: "write a CLI",
  context: "Detailed briefing. ".repeat(600),
});

test("flush does not re-send tool_calls headers and keeps arguments valid JSON", async () => {
  const reasoningText = "Plan: call both tools in one turn. ".repeat(40);
  const output = await runTransform(createCredentialSseTransform(), [
    chatChunk({ role: "assistant", content: "", reasoning: "" }),
    chatChunk({ content: "", reasoning: reasoningText }),
    chatChunk({ content: "Calling both tools." }),
    chatChunk({
      content: "",
      tool_calls: [
        {
          id: "call_a",
          index: 0,
          type: "function",
          function: { name: "memory", arguments: memoryArgs },
        },
        {
          id: "call_b",
          index: 1,
          type: "function",
          function: { name: "delegate", arguments: delegateArgs },
        },
      ],
    }),
    chatChunk({}, "tool_calls"),
    chatChunk({}, null, {
      choices: [],
      usage: { prompt_tokens: 1, completion_tokens: 2, total_tokens: 3 },
    }),
    "data: [DONE]\n\n",
  ]);
  const { args, ids, content, reasoning, usageEvents } = accumulateChat(parseChatEvents(output));
  assert.deepEqual(ids.sort(), ["call_a", "call_b"], "each tool call header is sent exactly once");
  assert.equal(args.get(0), memoryArgs);
  assert.equal(args.get(1), delegateArgs);
  assert.equal(content, "Calling both tools.");
  assert.equal(reasoning, reasoningText);
  assert.equal(usageEvents, 1);
});

test("flush event carries only held-back tails, without finish_reason", async () => {
  const output = await runTransform(createCredentialSseTransform(), [
    chatChunk({
      tool_calls: [
        {
          id: "call_b",
          index: 1,
          type: "function",
          function: { name: "delegate", arguments: delegateArgs },
        },
      ],
    }),
    chatChunk({}, "tool_calls"),
    "data: [DONE]\n\n",
  ]);
  const events = parseChatEvents(output);
  const flush = events.find((event) => {
    const calls = event.choices?.[0]?.delta?.tool_calls;
    return Array.isArray(calls) && !calls.some((call) => call.id);
  });
  assert.ok(flush, "expected a flush event with the argument tail");
  assert.equal(flush.id, chatEnvelope.id);
  assert.equal(flush.choices?.[0]?.finish_reason, undefined);
  assert.deepEqual(Object.keys(flush.choices?.[0]?.delta ?? {}), ["tool_calls"]);
  assert.equal(accumulateChat(events).args.get(1), delegateArgs);
});

test("text and argument tails in the finish_reason chunk keep their order", async () => {
  const text = "Calling the worker now. ".repeat(40);
  const output = await runTransform(createCredentialSseTransform(), [
    chatChunk({ role: "assistant", content: text.slice(0, 600) }),
    chatChunk({
      tool_calls: [
        {
          id: "call_b",
          index: 0,
          type: "function",
          function: { name: "delegate", arguments: delegateArgs.slice(0, 4000) },
        },
      ],
    }),
    chatChunk(
      {
        content: text.slice(600),
        tool_calls: [{ index: 0, function: { arguments: delegateArgs.slice(4000) } }],
      },
      "tool_calls"
    ),
    "data: [DONE]\n\n",
  ]);
  const events = parseChatEvents(output);
  const { args, ids, content } = accumulateChat(events);
  assert.deepEqual(ids, ["call_b"]);
  assert.equal(args.get(0), delegateArgs);
  assert.equal(content, text);
  assert.equal(events.at(-1)?.choices?.[0]?.finish_reason, "tool_calls", "finish chunk stays last");
});

test("unclosed private key header in the finish_reason chunk is still stamped", async () => {
  const header = ["-----BEGIN", "PRIVATE", "KEY-----"].join(" ");
  const output = await runTransform(createCredentialSseTransform(), [
    chatChunk({ role: "assistant", content: "note " }),
    chatChunk({ content: `${header}\n${"Q".repeat(32)}` }, "stop"),
    "data: [DONE]\n\n",
  ]);
  assert.ok(!output.includes(header), "key header must not leak in clear");
  assert.match(output, /\[REDACTED:private_key\]/);
});
