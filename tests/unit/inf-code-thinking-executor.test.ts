import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-inf-code-thinking-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports AFTER DATA_DIR is set so any db/core.ts touched by the
// registry picks up the temp path.
const { InfCodeThinkingFilter, createInfCodeSseTransform, rewriteInfCodeNonStreamJson } =
  await import("../../open-sse/executors/inf-code-thinking.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { InfCodeExecutor, rewriteInfCodeResponse } =
  await import("../../open-sse/executors/inf-code.ts");
const { REGISTRY } = await import("../../open-sse/config/providers/index.ts");

test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
});

type JsonRecord = Record<string, unknown>;

/** Envelope copied from the live capture (2026-11-09, deepseek-v4-1-flash-261017). */
const BASE: JsonRecord = {
  id: "0217942041779844d0c5c47996149bb448eacb5e2f81b9b67827d",
  object: "chat.completion.chunk",
  created: 1794204179,
  model: "deepseek-v4-1-flash-261017",
};

function chunk(delta: JsonRecord, extra: JsonRecord = {}): JsonRecord {
  return {
    ...BASE,
    choices: [{ index: 0, delta: { role: "assistant", ...delta }, finish_reason: null }],
    ...extra,
  };
}

const KEEPALIVE: JsonRecord = {
  id: "chatcmpl-keepalive",
  object: "chat.completion.chunk",
  created: 0,
  model: "keepalive",
  choices: [],
};

const THINKING = "We need answer greeting. Need be helpful concise.";
const ANSWER = "Hi! How can I help you today?";

/** The live sample as discrete upstream chunks (one channel delta per chunk). */
function livePayloads(): JsonRecord[] {
  return [
    KEEPALIVE,
    chunk({}),
    chunk({ reasoning_content: "We" }),
    chunk({ content: "<thinking>\nWe" }),
    chunk({ reasoning_content: " need answer greeting. Need be" }),
    chunk({ content: " need answer greeting. Need be" }),
    chunk({ reasoning_content: " helpful concise" }),
    chunk({ content: " helpful concise" }),
    chunk({ reasoning_content: "." }),
    chunk({ content: "." }),
    chunk({ content: "\n</thinking>Hi" }),
    chunk({ content: "!" }),
    chunk({ content: " How" }),
    chunk({ content: " can I help you today?" }),
    {
      ...BASE,
      choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 31, completion_tokens: 20, total_tokens: 51 },
    },
  ];
}

function toSse(payloads: JsonRecord[]): string {
  return (
    payloads.map((payload) => `data: ${JSON.stringify(payload)}\n\n`).join("") + "data: [DONE]\n\n"
  );
}

function byteStream(parts: string[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const part of parts) controller.enqueue(encoder.encode(part));
      controller.close();
    },
  });
}

async function collect(stream: ReadableStream<Uint8Array>): Promise<string> {
  const decoder = new TextDecoder();
  let out = "";
  const reader = stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  return out + decoder.decode();
}

function parseDataLines(sse: string): JsonRecord[] {
  const out: JsonRecord[] = [];
  for (const line of sse.split("\n")) {
    const match = line.match(/^data:\s?(.*)$/);
    if (!match || match[1] === "[DONE]") continue;
    out.push(JSON.parse(match[1]) as JsonRecord);
  }
  return out;
}

function joinDelta(chunks: JsonRecord[], field: string): string {
  let out = "";
  for (const chunkRecord of chunks) {
    const choices = Array.isArray(chunkRecord.choices) ? chunkRecord.choices : [];
    for (const choice of choices) {
      const delta = (choice as JsonRecord)?.delta as JsonRecord | undefined;
      const value = delta?.[field];
      if (typeof value === "string") out += value;
    }
  }
  return out;
}

async function rewriteSse(parts: string[]): Promise<{ raw: string; chunks: JsonRecord[] }> {
  const raw = await collect(byteStream(parts).pipeThrough(createInfCodeSseTransform()));
  return { raw, chunks: parseDataLines(raw) };
}

test("InfCodeThinkingFilter strips the block and keeps only the answer", () => {
  const filter = new InfCodeThinkingFilter();
  assert.equal(filter.push("<thinking>\nWe"), "");
  assert.equal(filter.push(" need help"), "");
  assert.equal(filter.push("\n</thinking>Hi"), "Hi");
  assert.equal(filter.flush(), "");
  assert.equal(filter.thinking, "\nWe need help\n");
  assert.equal(filter.isInsideThinking(), false);
});

test("SSE: the live deepseek-v4-1-flash stream loses the duplicated <thinking> block", async () => {
  const { raw, chunks } = await rewriteSse([toSse(livePayloads())]);

  assert.equal(joinDelta(chunks, "content"), ANSWER);
  assert.equal(joinDelta(chunks, "reasoning_content"), THINKING);
  for (const chunkRecord of chunks) {
    const content = joinDelta([chunkRecord], "content");
    assert.ok(!content.includes("<thinking"), "no <thinking> tag may reach the client");
    assert.ok(!content.includes("</thinking>"), "no </thinking> tag may reach the client");
  }
  assert.match(raw, /data: \[DONE\]/);
  assert.ok(
    raw.includes(`data: ${JSON.stringify(KEEPALIVE)}`),
    "the keepalive frame must pass through byte-for-byte"
  );
});

test("SSE: tags survive arbitrary byte-boundary splits", async () => {
  const sse = toSse(livePayloads());
  const parts: string[] = [];
  for (let index = 0; index < sse.length; index += 7) parts.push(sse.slice(index, index + 7));

  const { raw, chunks } = await rewriteSse(parts);

  assert.equal(joinDelta(chunks, "content"), ANSWER);
  assert.equal(joinDelta(chunks, "reasoning_content"), THINKING);
  assert.match(raw, /data: \[DONE\]/);
});

test("SSE: <thinking> and </thinking> split across two chunks", async () => {
  const payloads = [
    chunk({ reasoning_content: "We need help." }),
    chunk({ content: "<thin" }),
    chunk({ content: "king>\nWe need " }),
    chunk({ content: "help.\n</think" }),
    chunk({ content: "ing>Hi" }),
  ];

  const { chunks } = await rewriteSse([toSse(payloads)]);

  assert.equal(joinDelta(chunks, "content"), "Hi");
  assert.equal(joinDelta(chunks, "reasoning_content"), "We need help.");
});

test("SSE: promotes the stripped thinking when reasoning_content is absent", async () => {
  const payloads = [chunk({ content: "<thinking>\nWe need help.\n</thinking>Hi" })];

  const { chunks } = await rewriteSse([toSse(payloads)]);

  assert.equal(joinDelta(chunks, "content"), "Hi");
  assert.equal(joinDelta(chunks, "reasoning_content"), "\nWe need help.\n");
});

test("SSE: a held partial tag is delivered with the finish chunk, before [DONE]", async () => {
  const { raw, chunks } = await rewriteSse([
    toSse([
      chunk({ content: "Use Array<T" }),
      { ...BASE, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
    ]),
  ]);

  assert.equal(joinDelta(chunks, "content"), "Use Array<T");
  const finishIndex = chunks.findIndex(
    (item) => (item.choices as JsonRecord[])[0].finish_reason === "stop"
  );
  assert.equal(finishIndex, chunks.length - 1, "no content frame may follow the finish chunk");
  assert.ok(raw.lastIndexOf("<T") < raw.indexOf("[DONE]"));
});

test("SSE: without a finish chunk the held text still precedes [DONE]", async () => {
  const { raw, chunks } = await rewriteSse([toSse([chunk({ content: "ends with <" })])]);

  assert.equal(joinDelta(chunks, "content"), "ends with <");
  assert.ok(raw.lastIndexOf('<"') < raw.indexOf("[DONE]"));
});

test("non-stream: strips the block and preserves reasoning_content", () => {
  const payload = {
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "<thinking>\nWe need answer greeting.\n</thinking>Hi!",
          reasoning_content: "We need answer greeting.",
        },
      },
    ],
  };

  assert.equal(rewriteInfCodeNonStreamJson(payload), true);
  const message = (payload.choices[0] as JsonRecord).message as JsonRecord;
  assert.equal(message.content, "Hi!");
  assert.equal(message.reasoning_content, "We need answer greeting.");
});

test("non-stream: promotes thinking when the gateway omits reasoning_content", () => {
  const payload = {
    choices: [
      { index: 0, message: { role: "assistant", content: "<thinking>think</thinking>answer" } },
    ],
  };

  assert.equal(rewriteInfCodeNonStreamJson(payload), true);
  const message = (payload.choices[0] as JsonRecord).message as JsonRecord;
  assert.equal(message.content, "answer");
  assert.equal(message.reasoning_content, "think");
});

test("non-stream: ordinary content is left untouched", () => {
  const payload = {
    choices: [{ index: 0, message: { role: "assistant", content: "plain answer" } }],
  };

  assert.equal(rewriteInfCodeNonStreamJson(payload), false);
  const message = (payload.choices[0] as JsonRecord).message as JsonRecord;
  assert.equal(message.content, "plain answer");
  assert.equal(message.reasoning_content, undefined);
});

test("rewriteInfCodeResponse: SSE body is rewritten and a stale content-length is dropped", async () => {
  const response = new Response(toSse(livePayloads()), {
    status: 200,
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "content-length": "99999",
    },
  });

  const rewritten = await rewriteInfCodeResponse(response);
  assert.ok(rewritten, "the SSE body must be rewritten, not passed through");
  assert.equal(rewritten.headers.get("content-length"), null);
  assert.match(rewritten.headers.get("content-type") ?? "", /text\/event-stream/);

  const raw = await rewritten.text();
  const chunks = parseDataLines(raw);
  assert.equal(joinDelta(chunks, "content"), ANSWER);
  assert.equal(joinDelta(chunks, "reasoning_content"), THINKING);
});

test("rewriteInfCodeResponse: JSON body is rewritten in place", async () => {
  const payload = {
    choices: [
      { index: 0, message: { role: "assistant", content: "<thinking>x</thinking>answer" } },
    ],
  };
  const response = new Response(JSON.stringify(payload), {
    headers: { "content-type": "application/json", "content-length": "999" },
  });

  const rewritten = await rewriteInfCodeResponse(response);
  assert.ok(rewritten);
  assert.equal(rewritten.headers.get("content-length"), null);

  const body = (await rewritten.json()) as { choices: Array<{ message: JsonRecord }> };
  assert.equal(body.choices[0].message.content, "answer");
  assert.equal(body.choices[0].message.reasoning_content, "x");
});

test("rewriteInfCodeResponse: JSON without reasoning markers is handed back intact", async () => {
  const text = JSON.stringify({
    choices: [{ index: 0, message: { role: "assistant", content: "plain" } }],
  });
  const response = new Response(text, { headers: { "content-type": "application/json" } });

  const rewritten = await rewriteInfCodeResponse(response);
  assert.ok(rewritten);
  assert.equal(await rewritten.text(), text);
});

test("rewriteInfCodeResponse: unowned content types are left to the caller", async () => {
  const response = new Response("binary", {
    headers: { "content-type": "application/octet-stream" },
  });

  assert.equal(await rewriteInfCodeResponse(response), null);
});

test("registry wiring: inf-code resolves to the dedicated executor", async () => {
  assert.equal((REGISTRY["inf-code"] as { executor?: string }).executor, "inf-code");
  assert.equal(hasSpecializedExecutor("inf-code"), true);
  const executor = await getExecutor("inf-code");
  assert.ok(executor instanceof InfCodeExecutor);
});
