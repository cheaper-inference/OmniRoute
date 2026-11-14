/**
 * Buffered Gemini/Antigravity SSE -> chat.completion: tool-call handling that must not
 * depend on how the upstream splits the stream.
 *
 * - A `[Tool call: name]\nArguments: {...}` marker is almost always split over many SSE
 *   events. It must still become one tool call (the joined text is parsed, not each part).
 * - A stream that produced only native tool calls and then closed without a finishReason
 *   (or `[DONE]`) was cut. It is tagged as cut so a combo can fail over, but its complete
 *   calls are kept.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { parseSSEToGeminiResponse } =
  await import("../../open-sse/handlers/sseParser/geminiResponse.ts");
const { isTruncatedStreamBody } = await import("../../open-sse/handlers/sseParser/truncation.ts");

type Body = {
  choices: {
    finish_reason: string;
    message: {
      content: string | null;
      tool_calls?: { function: { name: string; arguments: string } }[];
    };
  }[];
};

const event = (parts: unknown[], finishReason?: string) =>
  `data: ${JSON.stringify({
    response: { candidates: [{ content: { parts }, ...(finishReason ? { finishReason } : {}) }] },
  })}\n\n`;
const textEvent = (text: string, finishReason?: string) => event([{ text }], finishReason);
const nativeCall = { functionCall: { name: "get_weather", args: { city: "Oslo" } } };

test("a textual tool call split over several SSE parts becomes one tool call", () => {
  const raw =
    textEvent("[Tool call: get_wea") +
    textEvent('ther]\nArguments: {"city"') +
    textEvent(`: "Oslo"}`, "STOP");

  const body = parseSSEToGeminiResponse(raw, "gemini-2.5-flash") as unknown as Body;

  const message = body.choices[0].message;
  assert.equal(message.tool_calls?.length, 1);
  assert.equal(message.tool_calls?.[0].function.name, "get_weather");
  assert.deepEqual(JSON.parse(message.tool_calls![0].function.arguments), { city: "Oslo" });
  assert.equal(message.content, null);
  assert.equal(body.choices[0].finish_reason, "tool_calls");
  assert.equal(isTruncatedStreamBody(body), false);
});

test("plain text parts that are not a tool call stay text", () => {
  const raw = textEvent("Hello ") + textEvent("world", "STOP");

  const body = parseSSEToGeminiResponse(raw, "gemini-2.5-flash") as unknown as Body;

  assert.equal(body.choices[0].message.content, "Hello world");
  assert.equal(body.choices[0].message.tool_calls, undefined);
});

test("a tool-only stream closed without finishReason is tagged cut and keeps its call", () => {
  const body = parseSSEToGeminiResponse(event([nativeCall]), "gemini-2.5-flash") as unknown as Body;

  assert.equal(isTruncatedStreamBody(body), true);
  assert.equal(body.choices[0].message.tool_calls?.length, 1);
  assert.equal(body.choices[0].message.tool_calls?.[0].function.name, "get_weather");
  assert.equal(body.choices[0].finish_reason, "tool_calls");
});

test("a tool-only stream with finishReason is not tagged cut", () => {
  const raw = event([nativeCall], "STOP");

  const body = parseSSEToGeminiResponse(raw, "gemini-2.5-flash") as unknown as Body;

  assert.equal(isTruncatedStreamBody(body), false);
  assert.equal(body.choices[0].message.tool_calls?.length, 1);
});

test("a tool-only stream that ends with [DONE] is not tagged cut", () => {
  const raw = event([nativeCall]) + "data: [DONE]\n\n";

  const body = parseSSEToGeminiResponse(raw, "gemini-2.5-flash") as unknown as Body;

  assert.equal(isTruncatedStreamBody(body), false);
});
