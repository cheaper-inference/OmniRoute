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

test("streamed tool call arguments larger than window size are not duplicated (#17291)", async () => {
  const toolArgs = JSON.stringify({ command: "echo " + "x".repeat(1500) });
  const chunk1 =
    "data: " +
    JSON.stringify({
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_abc123",
                type: "function",
                function: { name: "terminal", arguments: toolArgs },
              },
            ],
          },
        },
      ],
    }) +
    "\n\n";
  const chunk2 = "data: [DONE]\n\n";

  const output = await runTransform(createCredentialSseTransform({ windowSize: 512 }), [
    chunk1,
    chunk2,
  ]);

  const lines = output.split("\n").filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"));
  const receivedArgs: string[] = [];
  for (const line of lines) {
    const json = JSON.parse(line.slice(6));
    const tc = json.choices?.[0]?.delta?.tool_calls;
    if (tc) {
      for (const t of tc) {
        if (typeof t.function?.arguments === "string") {
          receivedArgs.push(t.function.arguments);
        }
      }
    }
  }

  const concatenated = receivedArgs.join("");
  assert.equal(concatenated, toolArgs, "concatenated tool arguments must equal original arguments");
  assert.doesNotThrow(() => JSON.parse(concatenated), "concatenated arguments must be valid JSON");
});

test("multi-chunk streamed tool call arguments with finish_reason are not duplicated (#17291)", async () => {
  const part1 = '{"command":"set -u; ';
  const part2 = "echo " + "y".repeat(1200) + '"}';
  const expected = part1 + part2;

  const chunk1 =
    "data: " +
    JSON.stringify({
      choices: [
        {
          index: 0,
          delta: {
            role: "assistant",
            tool_calls: [
              {
                index: 0,
                id: "call_123",
                type: "function",
                function: { name: "terminal", arguments: part1 },
              },
            ],
          },
        },
      ],
    }) +
    "\n\n";
  const chunk2 =
    "data: " +
    JSON.stringify({
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                function: { arguments: part2 },
              },
            ],
          },
        },
      ],
    }) +
    "\n\n";
  const chunk3 =
    "data: " +
    JSON.stringify({
      choices: [
        {
          index: 0,
          delta: {},
          finish_reason: "tool_calls",
        },
      ],
    }) +
    "\n\n";
  const chunk4 = "data: [DONE]\n\n";

  const output = await runTransform(createCredentialSseTransform({ windowSize: 512 }), [
    chunk1,
    chunk2,
    chunk3,
    chunk4,
  ]);

  const lines = output.split("\n").filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"));
  const receivedArgs: string[] = [];
  for (const line of lines) {
    const json = JSON.parse(line.slice(6));
    const tc = json.choices?.[0]?.delta?.tool_calls;
    if (tc) {
      for (const t of tc) {
        if (typeof t.function?.arguments === "string") {
          receivedArgs.push(t.function.arguments);
        }
      }
    }
  }

  const concatenated = receivedArgs.join("");
  assert.equal(concatenated, expected, "concatenated tool arguments must equal original arguments");
  assert.doesNotThrow(() => JSON.parse(concatenated), "concatenated arguments must be valid JSON");
});

test("streamed tool call arguments carrying secrets are redacted without duplication (#17291)", async () => {
  const secretPart = `echo ${OPENAI_KEY} && `;
  const filler = "z".repeat(1200);
  const toolArgs = JSON.stringify({ command: secretPart + filler });

  const chunk1 =
    "data: " +
    JSON.stringify({
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                function: { name: "terminal", arguments: toolArgs },
              },
            ],
          },
        },
      ],
    }) +
    "\n\n";
  const chunk2 = "data: [DONE]\n\n";

  const output = await runTransform(createCredentialSseTransform({ windowSize: 512 }), [
    chunk1,
    chunk2,
  ]);

  assert.ok(!output.includes(OPENAI_KEY), "raw key must not leak in streamed tool call");
  assert.match(output, /\[REDACTED:openai\]/);

  const lines = output.split("\n").filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"));
  const receivedArgs: string[] = [];
  for (const line of lines) {
    const json = JSON.parse(line.slice(6));
    const tc = json.choices?.[0]?.delta?.tool_calls;
    if (tc) {
      for (const t of tc) {
        if (typeof t.function?.arguments === "string") {
          receivedArgs.push(t.function.arguments);
        }
      }
    }
  }

  const concatenated = receivedArgs.join("");
  const expected = redactCredentials(toolArgs).text;
  assert.equal(
    concatenated,
    expected,
    "concatenated tool arguments must match expected redacted payload"
  );
  assert.doesNotThrow(() => JSON.parse(concatenated), "concatenated arguments must be valid JSON");
});
