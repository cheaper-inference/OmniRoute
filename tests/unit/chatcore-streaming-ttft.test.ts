// @ts-nocheck
// `usage_history.ttft_ms` for streamed requests must be the time from the start of
// handleChatCore (the same epoch as latency_ms) to the first delta that carries output —
// text, reasoning or a tool call — forwarded to the client. Before the fix it was either
// ~0 ms (the clock started after the first upstream frame) or equal to latency_ms (the
// Responses → Chat translation path never reported a value).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-streamed-ttft-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Keep Codex on the HTTP transport so the mocked fetch answers it.
process.env.OMNIROUTE_CODEX_WS_ENABLED = "false";

const core = await import("../../src/lib/db/core.ts");
const { getUsageHistory } = await import("../../src/lib/usage/usageHistory.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;
const CONTENT_DELAY_MS = 300;
// The stream keeps going after the first content, so latency_ms is clearly larger than ttft.
const TAIL_DELAY_MS = 300;

const noopLog = () => ({ debug() {}, info() {}, warn() {}, error() {} });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function delayedSse(frames, firstClientContent) {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      async start(controller) {
        for (const frame of frames) {
          // Cold request setup can outlast the producer's two timers. Start the
          // tail only after content reaches the client, so a prefilled queue
          // cannot collapse the interval this test is meant to measure.
          if (frame.afterClientContent) await firstClientContent;
          if (frame.delayMs) await sleep(frame.delayMs);
          controller.enqueue(encoder.encode(frame.text));
        }
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

const responsesEvent = (type, payload) =>
  `event: ${type}\ndata: ${JSON.stringify({ type, ...payload })}\n\n`;

function codexResponsesStream(firstClientContent) {
  const response = {
    id: "resp_1",
    object: "response",
    model: "gpt-5.6-sol",
    status: "in_progress",
  };
  return delayedSse(
    [
      { text: responsesEvent("response.created", { response }) },
      { text: responsesEvent("response.in_progress", { response }) },
      {
        delayMs: CONTENT_DELAY_MS,
        text: responsesEvent("response.output_item.added", {
          output_index: 0,
          item: { id: "msg_1", type: "message", role: "assistant", content: [] },
        }),
      },
      {
        text: responsesEvent("response.output_text.delta", {
          item_id: "msg_1",
          output_index: 0,
          content_index: 0,
          delta: "Hello",
        }),
      },
      {
        afterClientContent: true,
        delayMs: TAIL_DELAY_MS,
        text: responsesEvent("response.completed", {
          response: {
            ...response,
            status: "completed",
            output: [
              {
                id: "msg_1",
                type: "message",
                role: "assistant",
                content: [{ type: "output_text", text: "Hello", annotations: [] }],
              },
            ],
            usage: { input_tokens: 5, output_tokens: 1, total_tokens: 6 },
          },
        }),
      },
    ],
    firstClientContent
  );
}

function openAiChatStream(firstClientContent) {
  const chunk = (delta, extra = {}) =>
    `data: ${JSON.stringify({ id: "c1", object: "chat.completion.chunk", created: 1, model: "m", choices: [{ index: 0, delta, finish_reason: null }], ...extra })}\n\n`;
  return delayedSse(
    [
      { text: chunk({ role: "assistant", content: "" }) },
      { delayMs: CONTENT_DELAY_MS, text: chunk({ content: "Hello" }) },
      {
        afterClientContent: true,
        delayMs: TAIL_DELAY_MS,
        text: `data: ${JSON.stringify({ id: "c1", object: "chat.completion.chunk", created: 1, model: "m", choices: [{ index: 0, delta: {}, finish_reason: "stop" }], usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 } })}\n\ndata: [DONE]\n\n`,
      },
    ],
    firstClientContent
  );
}

async function drain(response, onFirstClientContent) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let content = "";
  let sawContent = false;
  let timedOut = false;
  // A pipeline that waits for the terminal event before forwarding content
  // must fail, rather than deadlock against the fixture's completion barrier.
  const timeout = setTimeout(() => {
    timedOut = true;
    void reader.cancel().catch(() => {});
  }, 4000);
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      content += decoder.decode(value, { stream: true });
      if (!sawContent && /"content"\s*:\s*"Hello"/.test(content)) {
        sawContent = true;
        onFirstClientContent();
      }
    }
    assert.equal(timedOut, false, "stream did not complete after forwarding content");
    assert.equal(sawContent, true, "expected translated content before the terminal event");
  } finally {
    clearTimeout(timeout);
  }
}

async function latestRow(provider, timeoutMs = 4000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const rows = await getUsageHistory({ provider });
    if (rows.length > 0) return rows.at(-1);
    await sleep(25);
  }
  return null;
}

async function runStreamed({ provider, model, credentials, upstream }) {
  const firstClientContent = Promise.withResolvers();
  globalThis.fetch = async () => upstream(firstClientContent.promise);
  const body = { model, stream: true, messages: [{ role: "user", content: "hi" }] };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider, model, extendedContext: false },
    credentials,
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "text/event-stream" }),
    },
    connectionId: `${provider}-conn`,
  });
  assert.equal(result.success, true, JSON.stringify(result.error ?? result.status));
  try {
    await drain(result.response, firstClientContent.resolve);
  } finally {
    firstClientContent.resolve();
  }
  return latestRow(provider);
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function assertTtftCoversContentDelay(row, label) {
  assert.ok(row, `${label}: expected a usage_history row`);
  const ttft = Number(row.timeToFirstTokenMs);
  const latency = Number(row.latencyMs);
  assert.ok(Number.isFinite(ttft), `${label}: ttft missing`);
  assert.ok(
    ttft >= CONTENT_DELAY_MS - 50,
    `${label}: ttft ${ttft} ms should include the ${CONTENT_DELAY_MS} ms before the first content`
  );
  assert.ok(
    ttft <= latency - (TAIL_DELAY_MS - 100),
    `${label}: ttft ${ttft} ms must end at the first content, well before latency ${latency} ms`
  );
}

test("Responses upstream translated to Chat Completions records the first-content time", async () => {
  const row = await runStreamed({
    provider: "codex",
    model: "gpt-5.6-sol",
    credentials: { accessToken: "codex-token", providerSpecificData: {} },
    upstream: codexResponsesStream,
  });
  assertTtftCoversContentDelay(row, "codex");
});

test("Chat Completions upstream records the first-content time, not the first frame", async () => {
  const row = await runStreamed({
    provider: "openai",
    model: "gpt-4o-mini",
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    upstream: openAiChatStream,
  });
  assertTtftCoversContentDelay(row, "openai");
});
