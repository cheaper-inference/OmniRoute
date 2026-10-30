import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const isolated = fs.mkdtempSync(path.join(os.tmpdir(), "redaction-chain-17291-"));
process.env.HOME = isolated;
process.env.DATA_DIR = path.join(isolated, "data");
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("Offline pipeline test forbids fetch");
};
const { assembleStreamingPipeline } =
  await import("../../open-sse/handlers/chatCore/streamingPipeline.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  globalThis.fetch = originalFetch;
  fs.rmSync(isolated, { recursive: true, force: true });
});

type Delta = {
  content?: string;
  reasoning?: string;
  reasoning_content?: string;
  role?: string;
  tool_calls?: Array<{
    index: number;
    id?: string;
    function: { name?: string; arguments: string };
  }>;
};
type Event = {
  choices?: Array<{ index: number; delta?: Delta; finish_reason?: string }>;
  usage?: unknown;
};
const frame = (value: Event) => `data: ${JSON.stringify(value)}\n\n`;

async function exerciseChain(tag: string) {
  const key = "sk-" + "ABCD".repeat(12);
  const a = `request ${tag} key ${key} end`;
  const b = `request ${tag} email fixture@example.com end`;
  const keyCut = a.indexOf(key) + 25;
  const emailCut = b.indexOf("fixture@") + "fixture@".length;
  const args = JSON.stringify({ command: "echo safe 🦜 ".repeat(400), credential: key });
  const argsCut = args.indexOf(key) + 25;
  const expectedArgs = args.replace(key, "[REDACTED:openai]");
  const chunks = [
    frame({
      choices: [
        {
          index: 0,
          delta: {
            role: "assistant",
            content: "ready",
            reasoning: a.slice(0, keyCut),
            reasoning_content: b.slice(0, emailCut),
            tool_calls: [
              {
                index: 0,
                id: "call-fixture",
                function: { name: "terminal", arguments: args.slice(0, argsCut) },
              },
            ],
          },
        },
      ],
    }),
    frame({
      choices: [
        {
          index: 0,
          delta: {
            reasoning: a.slice(keyCut),
            reasoning_content: b.slice(emailCut),
            tool_calls: [{ index: 0, function: { arguments: args.slice(argsCut) } }],
          },
        },
      ],
    }),
    frame({
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      usage: { total_tokens: 9 },
    }),
    "data: [DONE]\n\n",
  ];
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
  const abort = new AbortController();
  const errors: unknown[] = [];
  const stream = assembleStreamingPipeline({
    providerResponse: new Response(source),
    transformStream: new TransformStream<Uint8Array, Uint8Array>(),
    streamController: {
      signal: abort.signal,
      startTime: Date.now(),
      isConnected: () => true,
      handleDisconnect: () => {},
      handleComplete: () => {},
      markClientTerminalSeen: () => {},
      handleError: (error) => {
        errors.push(error);
      },
      abort: () => abort.abort(),
      clientResponseFormat: "openai",
    },
    createPiiTransform: undefined,
    clientRawRequestHeaders: null,
    clientResponseFormat: "openai",
    echoModel: null,
    responseHeaders: {},
    credentialRedactionEnabled: true,
    credentialDisabledGuardrails: [],
    piiDisabledGuardrails: [],
  });
  const output = await new Response(stream).text();
  assert.deepEqual(errors, []);
  assert.equal(output.includes(key), false);
  assert.equal(output.includes("fixture@example.com"), false);
  const events = output
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice(6)) as Event);
  const deltas = events.flatMap((e) => e.choices ?? []).map((c) => c.delta ?? {});
  assert.equal(
    deltas.map((d) => d.reasoning ?? "").join(""),
    // PII runs first and owns this generic API-key match.
    `request ${tag} key [API_KEY_REDACTED] end`
  );
  assert.equal(
    deltas.map((d) => d.reasoning_content ?? "").join(""),
    `request ${tag} email [EMAIL_REDACTED] end`
  );
  assert.equal(deltas.map((d) => d.content ?? "").join(""), "ready");
  const calls = deltas.flatMap((d) => d.tool_calls ?? []);
  assert.equal(calls.map((c) => c.function.arguments).join(""), expectedArgs);
  assert.deepEqual(
    JSON.parse(calls.map((c) => c.function.arguments).join("")),
    JSON.parse(expectedArgs)
  );
  assert.equal(calls.filter((c) => c.id).length, 1);
  assert.equal(calls.filter((c) => c.function.name).length, 1);
  assert.equal(deltas.filter((d) => d.role).length, 1);
  assert.equal(events.filter((e) => e.usage).length, 1);
  assert.equal(events.filter((e) => e.choices?.some((c) => c.finish_reason)).length, 1);
  assert.equal(output.split("data: [DONE]").length - 1, 1);
}

test("real pipeline with both redaction flags retains reasoning aliases and multi-KB tool arguments", async () => {
  await exerciseChain("sequential");
});
test("eight concurrent real redaction chains keep their reasoning streams independent", async () => {
  await Promise.all(Array.from({ length: 8 }, (_, i) => exerciseChain(`parallel-${i}`)));
});
