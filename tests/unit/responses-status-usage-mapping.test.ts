import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { sanitizeResponsesApiResponse } from "../../open-sse/handlers/responseSanitizer.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "anthropic-accounting-contract-"));
process.env.DATA_DIR = dir;
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { isEstimatedUsage } = await import("../../open-sse/utils/usageTracking.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => {
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const [finish, status, reason] of [
  ["length", "incomplete", "max_output_tokens"],
  ["content_filter", "incomplete", "content_filter"],
  ["stop", "completed", undefined],
  ["tool_calls", "completed", undefined],
] as const)
  test(`Chat JSON to Responses maps ${finish} without losing partial output or usage`, () => {
    const converted = sanitizeResponsesApiResponse({
      id: "chatcmpl_fixture",
      object: "chat.completion",
      model: "fixture",
      choices: [
        {
          index: 0,
          message:
            finish === "tool_calls"
              ? {
                  role: "assistant",
                  content: null,
                  tool_calls: [
                    { id: "c", type: "function", function: { name: "lookup", arguments: "{}" } },
                  ],
                }
              : { role: "assistant", content: "partial🙂" },
          finish_reason: finish,
        },
      ],
      usage: { prompt_tokens: 8, completion_tokens: 4, total_tokens: 12 },
    });
    assert.equal(converted.status, status);
    assert.equal((converted.incomplete_details as { reason?: string } | undefined)?.reason, reason);
    if (reason) {
      const output = converted.output as Array<{
        content: Array<{ text: string }>;
        status?: string;
      }>;
      assert.equal(output[0].content[0].text, "partial🙂");
      assert.equal(output[0].status, "incomplete");
    }
    assert.equal((converted.usage as { total_tokens: number }).total_tokens, 12);
  });

for (const sourceFormat of [FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES])
  test(`native Anthropic accounting is independent of client cache-write projection / ${sourceFormat}`, async () => {
    const usage = {
      input_tokens: 5,
      cache_read_input_tokens: 3,
      cache_creation_input_tokens: 2,
      output_tokens: 1,
    };
    const events = [
      {
        type: "message_start",
        message: {
          id: "msg_fixture",
          type: "message",
          role: "assistant",
          model: "claude-opus-5",
          content: [],
          usage,
        },
      },
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "ok" } },
      { type: "content_block_stop", index: 0 },
      { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 4 } },
      { type: "message_stop" },
    ];
    let receipt: unknown;
    let completed = 0;
    const transform = createSSEStream({
      mode: "translate",
      targetFormat: FORMATS.CLAUDE,
      sourceFormat,
      provider: "anthropic",
      model: "claude-opus-5",
      onComplete(result) {
        completed++;
        receipt = result.usage;
      },
    });
    const raw = events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
    const clientWire = await new Response(new Response(raw).body!.pipeThrough(transform)).text();
    assert.equal(completed, 1);
    const actual = receipt as Record<string, number>;
    assert.equal(
      actual.prompt_tokens,
      10,
      "raw Anthropic input contains fresh +cache read +cache creation"
    );
    assert.equal(actual.completion_tokens, 4, "cumulative output is not added to earlier usage");
    assert.equal(actual.cache_creation_input_tokens, 2);
    assert.equal(actual.cache_read_input_tokens, 3);
    if (sourceFormat === FORMATS.OPENAI) {
      const chunks = clientWire
        .split("\n")
        .filter((line) => line.startsWith("data: {"))
        .map((line) => JSON.parse(line.slice(5)));
      const final = chunks.find((chunk) => chunk.choices?.[0]?.finish_reason != null);
      assert.equal(
        final.usage.prompt_tokens,
        8,
        "preserve existing #2215 client projection, do not rewrite the wire to fix internal accounting"
      );
      // The public stream normalizer uses the flat cache-write field; the
      // low-level translator's nested field is not retained on this wire path.
      assert.equal(final.usage.cache_creation_input_tokens, 2);
      assert.equal(final.usage.prompt_tokens_details.cache_creation_in_prompt, false);
    }
  });

for (const hasReceipt of [false, true])
  test(`native metering survives collector limits without manufacturing provider usage / receipt=${hasReceipt}`, async () => {
    const startUsage = {
      input_tokens: 5,
      cache_read_input_tokens: 3,
      cache_creation_input_tokens: 2,
      output_tokens: 1,
    };
    const events = [
      {
        type: "message_start",
        message: {
          id: "msg_limit",
          type: "message",
          role: "assistant",
          model: "claude-opus-5",
          ...(hasReceipt ? { usage: startUsage } : {}),
        },
      },
      ...Array.from({ length: 2100 }, () => ({ type: "ping" })),
      { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "receipt after collector retention cap" },
      },
      { type: "content_block_stop", index: 0 },
      {
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        ...(hasReceipt ? { usage: { output_tokens: 4 } } : {}),
      },
      { type: "message_stop" },
    ];
    let receipt: unknown;
    let completions = 0;
    const stream = createSSEStream({
      mode: "translate",
      sourceFormat: FORMATS.OPENAI,
      targetFormat: FORMATS.CLAUDE,
      provider: "anthropic",
      model: "claude-opus-5",
      body: { messages: [{ role: "user", content: "fixture" }] },
      onComplete(result) {
        completions++;
        receipt = result.usage;
      },
    });
    const raw = events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
    await new Response(new Response(raw).body!.pipeThrough(stream)).text();
    assert.equal(completions, 1);
    if (hasReceipt) {
      assert.equal((receipt as Record<string, number>).prompt_tokens, 10);
      assert.equal((receipt as Record<string, number>).completion_tokens, 4);
      assert.equal(isEstimatedUsage(receipt), false);
    } else
      assert.equal(
        isEstimatedUsage(receipt),
        true,
        "no raw receipt means estimate, never a billable synthetic receipt"
      );
  });
