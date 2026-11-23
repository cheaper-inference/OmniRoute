import test, { after } from "node:test";
import assert from "node:assert/strict";
import { validateResponseQuality } from "../../open-sse/services/combo/validateQuality.ts";
import { handleComboChat } from "../../open-sse/services/combo.ts";
import { shutdownDbInstance } from "../../src/lib/db/core.ts";

after(async () => {
  await shutdownDbInstance();
});

const enc = new TextEncoder();
const noopLog = { warn: () => {}, info: () => {}, debug: () => {}, error: () => {} };

function makeJsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function makeSseResponse(chunks: string[], status = 200): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(enc.encode(chunk));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    status,
    headers: { "content-type": "text/event-stream" },
  });
}

const DEPRECATION_TEXT =
  "This model claude-opus-4-5-thinking is no longer available. Please switch to claude-opus-4-6-thinking.";

test("BDD-1a: non-streaming OpenAI HTTP 200 deprecation notice fails over with status 410", async () => {
  const res = makeJsonResponse({
    id: "chatcmpl-dep-1",
    object: "chat.completion",
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: DEPRECATION_TEXT },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 10, completion_tokens: 18, total_tokens: 28 },
  });

  const verdict = await validateResponseQuality(res, false, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.type, "model_unavailable");
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
  assert.equal(verdict.upstreamFailure?.requestScoped, false);
  assert.equal(verdict.upstreamFailure?.retryable, false);
});

test("BDD-1b: non-streaming Claude HTTP 200 deprecation notice fails over with status 410", async () => {
  const res = makeJsonResponse({
    id: "msg_dep_1",
    type: "message",
    role: "assistant",
    content: [{ type: "text", text: DEPRECATION_TEXT }],
    stop_reason: "end_turn",
  });

  const verdict = await validateResponseQuality(res, false, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.type, "model_unavailable");
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
  assert.equal(verdict.upstreamFailure?.requestScoped, false);
  assert.equal(verdict.upstreamFailure?.retryable, false);
});

test("BDD-1c: non-streaming Responses API HTTP 200 deprecation notice fails over with status 410", async () => {
  const res = makeJsonResponse({
    id: "resp_dep_1",
    object: "response",
    status: "completed",
    output: [
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: DEPRECATION_TEXT }],
      },
    ],
  });

  const verdict = await validateResponseQuality(res, false, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.type, "model_unavailable");
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
  assert.equal(verdict.upstreamFailure?.requestScoped, false);
  assert.equal(verdict.upstreamFailure?.retryable, false);
});

test("BDD-2a: streaming OpenAI SSE deprecation notice split across chunks fails over with status 410", async () => {
  const res = makeSseResponse([
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: { role: "assistant", content: "This model is no longer " }, finish_reason: null }] })}\n\n`,
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: "available. Please switch to claude-opus-4-6." }, finish_reason: null }] })}\n\n`,
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] })}\n\ndata: [DONE]\n\n`,
  ]);

  const verdict = await validateResponseQuality(res, true, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.type, "model_unavailable");
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
  assert.equal(verdict.upstreamFailure?.requestScoped, false);
  assert.equal(verdict.upstreamFailure?.retryable, false);
});

test("BDD-2b: streaming Claude SSE text_delta deprecation notice fails over with status 410", async () => {
  const res = makeSseResponse([
    `event: message_start\ndata: ${JSON.stringify({ type: "message_start", message: { id: "msg_1", role: "assistant" } })}\n\n`,
    `event: content_block_start\ndata: ${JSON.stringify({ type: "content_block_start", index: 0, content_block: { type: "text", text: "" } })}\n\n`,
    `event: content_block_delta\ndata: ${JSON.stringify({ type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Model is no longer available. " } })}\n\n`,
    `event: content_block_delta\ndata: ${JSON.stringify({ type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Please switch to a newer model." } })}\n\n`,
    `event: message_delta\ndata: ${JSON.stringify({ type: "message_delta", delta: { stop_reason: "end_turn" } })}\n\n`,
    `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
  ]);

  const verdict = await validateResponseQuality(res, true, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
});

test("BDD-2c: streaming Responses API SSE deprecation notice fails over with status 410", async () => {
  const res = makeSseResponse([
    `event: response.output_text.delta\ndata: ${JSON.stringify({ type: "response.output_text.delta", delta: "This model is no longer available. " })}\n\n`,
    `event: response.output_text.delta\ndata: ${JSON.stringify({ type: "response.output_text.delta", delta: "Please switch to gpt-5." })}\n\n`,
    `event: response.completed\ndata: ${JSON.stringify({ type: "response.completed", response: { status: "completed" } })}\n\n`,
  ]);

  const verdict = await validateResponseQuality(res, true, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
});

test("BDD-2d: streaming Gemini SSE deprecation notice fails over with status 410", async () => {
  const res = makeSseResponse([
    `data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: "This model is no longer available. " }] } }] })}\n\n`,
    `data: ${JSON.stringify({ response: { candidates: [{ content: { parts: [{ text: "Please switch to gemini-2.5-pro." }] } }] } })}\n\n`,
  ]);

  const verdict = await validateResponseQuality(res, true, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
});

test("BDD-3a: normal streaming SSE replays all buffered bytes intact", async () => {
  const chunks = [
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: "Hello " }, finish_reason: null }] })}\n\n`,
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: "world!" }, finish_reason: "stop" }] })}\n\ndata: [DONE]\n\n`,
  ];
  const res = makeSseResponse(chunks);

  const verdict = await validateResponseQuality(res, true, noopLog);
  assert.equal(verdict.valid, true);
  assert.ok(verdict.clonedResponse);
  const replayed = await verdict.clonedResponse.text();
  assert.equal(replayed, chunks.join(""));
});

test("BDD-3b: streaming SSE with tool_use / tool_calls / thinking_delta / >512 chars passes and replays intact", async () => {
  const toolChunks = [
    `event: message_start\ndata: ${JSON.stringify({ type: "message_start", message: { id: "msg_t" } })}\n\n`,
    `event: content_block_start\ndata: ${JSON.stringify({ type: "content_block_start", index: 0, content_block: { type: "tool_use", id: "tu_1", name: "lookup" } })}\n\n`,
    `event: content_block_delta\ndata: ${JSON.stringify({ type: "content_block_delta", index: 0, delta: { type: "input_json_delta", partial_json: "{}" } })}\n\n`,
  ];
  const toolVerdict = await validateResponseQuality(makeSseResponse(toolChunks), true, noopLog);
  assert.equal(toolVerdict.valid, true);
  assert.equal(await toolVerdict.clonedResponse?.text(), toolChunks.join(""));

  const longText = "A".repeat(600);
  const longChunks = [
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: longText }, finish_reason: null }] })}\n\n`,
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: " is no longer available. Please switch to x" }, finish_reason: "stop" }] })}\n\n`,
  ];
  const longVerdict = await validateResponseQuality(makeSseResponse(longChunks), true, noopLog);
  assert.equal(longVerdict.valid, true);
  assert.equal(await longVerdict.clonedResponse?.text(), longChunks.join(""));
});

test("BDD-1/2 integration: handleComboChat fails over from HTTP 200 deprecation target to sibling target", async () => {
  const tried: string[] = [];
  const res = await handleComboChat({
    body: { model: "dep-combo", stream: false, messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "dep-combo",
      strategy: "priority",
      models: [{ model: "openai/deprecated-model" }, { model: "openai/healthy-model" }],
    },
    handleSingleModel: async (_body, modelStr) => {
      tried.push(modelStr);
      if (modelStr.includes("deprecated-model")) {
        return makeJsonResponse({
          id: "chatcmpl-dep",
          object: "chat.completion",
          choices: [{ index: 0, message: { role: "assistant", content: DEPRECATION_TEXT }, finish_reason: "stop" }],
        });
      }
      return makeJsonResponse({
        id: "chatcmpl-ok",
        object: "chat.completion",
        choices: [{ index: 0, message: { role: "assistant", content: "Healthy reply" }, finish_reason: "stop" }],
      });
    },
    log: noopLog,
    settings: {},
    allCombos: [],
  });

  assert.equal(res.status, 200);
  const json = (await res.json()) as { choices: Array<{ message: { content: string } }> };
  assert.equal(json.choices[0].message.content, "Healthy reply");
  assert.deepEqual(tried, ["openai/deprecated-model", "openai/healthy-model"]);
});

test("Major #1: Responses API empty output_item.added / content_part.added stays in peek and catches deprecation deltas", async () => {
  const res = makeSseResponse([
    `event: response.output_item.added\ndata: ${JSON.stringify({
      type: "response.output_item.added",
      output_index: 0,
      item: { id: "msg_1", type: "message", role: "assistant", content: [] },
    })}\n\n`,
    `event: response.content_part.added\ndata: ${JSON.stringify({
      type: "response.content_part.added",
      output_index: 0,
      content_index: 0,
      part: { type: "output_text", text: "" },
    })}\n\n`,
    `event: response.output_text.delta\ndata: ${JSON.stringify({
      type: "response.output_text.delta",
      delta: "Claude Opus 4.6 is no longer available. ",
    })}\n\n`,
    `event: response.output_text.delta\ndata: ${JSON.stringify({
      type: "response.output_text.delta",
      delta: "Please switch to Claude Opus 5.5.",
    })}\n\n`,
    `event: response.completed\ndata: ${JSON.stringify({
      type: "response.completed",
      response: { status: "completed" },
    })}\n\n`,
  ]);

  const verdict = await validateResponseQuality(res, true, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
});

test("Major #2: keep-alive Gemini stream with text and finishReason STOP releases immediately without waiting for EOF", async () => {
  const frame = `data: ${JSON.stringify({
    candidates: [
      {
        content: { parts: [{ text: "Hello from Gemini!" }] },
        finishReason: "STOP",
      },
    ],
  })}\n\n`;

  let streamController: ReadableStreamDefaultController<Uint8Array> | null = null;
  const keepAliveStream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
      controller.enqueue(enc.encode(frame));
      // Intentionally keep stream open (keep-alive) without calling controller.close()
    },
  });
  const res = new Response(keepAliveStream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });

  const verdict = await Promise.race([
    validateResponseQuality(res, true, noopLog),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timed out waiting for keep-alive Gemini stream")), 500)
    ),
  ]);

  assert.equal(verdict.valid, true);
  assert.ok(verdict.clonedResponse);
  const reader = verdict.clonedResponse.body!.getReader();
  const firstRead = await reader.read();
  assert.equal(firstRead.done, false);
  assert.equal(new TextDecoder().decode(firstRead.value), frame);
  streamController?.close();
  await reader.cancel();
});

test("Minor #4: unrelated endpoint deprecation sentence passes as valid while model-specific notice fails over", async () => {
  const endpointControl = makeJsonResponse({
    id: "chatcmpl-ctrl",
    object: "chat.completion",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "The old endpoint is no longer available. Please switch to /v2.",
        },
        finish_reason: "stop",
      },
    ],
  });
  const controlVerdict = await validateResponseQuality(endpointControl, false, noopLog);
  assert.equal(controlVerdict.valid, true);

  const modelNotice = makeJsonResponse({
    id: "chatcmpl-model-dep",
    object: "chat.completion",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "Claude Opus 4.6 is no longer available. Please switch to Claude Opus 5.5.",
        },
        finish_reason: "stop",
      },
    ],
  });
  const modelVerdict = await validateResponseQuality(modelNotice, false, noopLog);
  assert.equal(modelVerdict.valid, false);
  assert.equal(modelVerdict.upstreamFailure?.status, 410);
  assert.equal(modelVerdict.upstreamFailure?.code, "model_deprecated");
});

test("Minor #5: empty Claude thinking_delta stays in peek and catches subsequent deprecation text_delta", async () => {
  const res = makeSseResponse([
    `event: message_start\ndata: ${JSON.stringify({ type: "message_start", message: { id: "msg_t2", role: "assistant" } })}\n\n`,
    `event: content_block_start\ndata: ${JSON.stringify({ type: "content_block_start", index: 0, content_block: { type: "thinking", thinking: "" } })}\n\n`,
    `event: content_block_delta\ndata: ${JSON.stringify({ type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "" } })}\n\n`,
    `event: content_block_start\ndata: ${JSON.stringify({ type: "content_block_start", index: 1, content_block: { type: "text", text: "" } })}\n\n`,
    `event: content_block_delta\ndata: ${JSON.stringify({ type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "This model is no longer available. Please switch to claude-opus-4-6." } })}\n\n`,
    `event: message_delta\ndata: ${JSON.stringify({ type: "message_delta", delta: { stop_reason: "end_turn" } })}\n\n`,
    `event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}\n\n`,
  ]);

  const verdict = await validateResponseQuality(res, true, noopLog);
  assert.equal(verdict.valid, false);
  assert.equal(verdict.upstreamFailure?.status, 410);
  assert.equal(verdict.upstreamFailure?.code, "model_deprecated");
});
