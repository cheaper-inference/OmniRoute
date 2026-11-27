import assert from "node:assert/strict";
import test from "node:test";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import type { StreamCompletePayload } from "../../open-sse/utils/streamCompletePayload.ts";
import { mergeResponsesUsage } from "../../open-sse/utils/streamUsageMerge.ts";
import { extractUsage } from "../../open-sse/utils/usageTracking.ts";

const model = "gpt-6-sol";
type WirePayload = {
  usage?: { total_tokens?: number };
  response?: { usage?: { total_tokens?: number } };
};

function event(type: string, fields: Record<string, unknown>, suffix = "\n\n"): string {
  return `event: ${type}\ndata: ${JSON.stringify({ type, ...fields })}${suffix}`;
}

async function replay(mode: "translate" | "passthrough", suffix: string, total?: unknown) {
  let complete: StreamCompletePayload | undefined;
  const stream = createSSEStream({
    mode,
    sourceFormat: mode === "translate" ? FORMATS.OPENAI : FORMATS.OPENAI_RESPONSES,
    targetFormat: FORMATS.OPENAI_RESPONSES,
    clientResponseFormat: mode === "translate" ? FORMATS.OPENAI : FORMATS.OPENAI_RESPONSES,
    provider: "codex",
    model,
    body: {
      model,
      messages: [{ role: "user", content: "synthetic token ".repeat(80) }],
      stream_options: { include_usage: true },
    },
    onComplete(payload) {
      complete = payload;
    },
  });
  const writer = stream.writable.getWriter();
  const reading = new Response(stream.readable).text();
  const encoder = new TextEncoder();
  const response = { id: "resp_test", model, object: "response", output: [] };
  await writer.write(
    encoder.encode(event("response.created", { response: { ...response, status: "in_progress" } }))
  );
  await writer.write(
    encoder.encode(event("response.output_text.delta", { item_id: "msg_test", delta: "Hello" }))
  );
  const receipt = {
    response: {
      ...response,
      status: "completed",
      usage: { input_tokens: 80, output_tokens: 9, total_tokens: total },
    },
  };
  const tail = suffix
    ? event("response.completed", receipt, suffix)
    : `data: ${JSON.stringify({ type: "response.completed", ...receipt })}`;
  await writer.write(encoder.encode(tail));
  await writer.close();
  const payloads: WirePayload[] = (await reading)
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)));
  assert.equal(complete?.status, 200);
  return {
    wire: payloads.flatMap((payload) => {
      const usage = payload.usage ?? payload.response?.usage;
      return usage ? [usage.total_tokens] : [];
    }),
    usage: (complete?.usage as WirePayload["usage"])?.total_tokens,
    summary: (complete?.responseBody as WirePayload | undefined)?.usage?.total_tokens,
  };
}

test("passthrough: merges components from a bare EOF receipt without a total", async () => {
  const actual = await replay("passthrough", "");
  assert.equal(actual.summary, 89);
});

test("a partial Responses receipt keeps an earlier valid total", () => {
  const earlier = { prompt_tokens: 80, completion_tokens: 3, total_tokens: 109 };
  const tail = extractUsage({
    type: "response.completed",
    response: { usage: { input_tokens: 80, output_tokens: 9, total_tokens: -1 } },
  });
  const merged = mergeResponsesUsage(earlier, tail);
  assert.equal(merged?.completion_tokens, 9);
  assert.equal(merged?.total_tokens, 109);
});

for (const mode of ["translate", "passthrough"] as const) {
  for (const [framing, suffix] of [
    ["complete frame", "\n\n"],
    ["line break at EOF", "\n"],
    ["bare data at EOF", ""],
  ]) {
    test(`${mode}: keeps independent Responses receipt total with ${framing}`, async () => {
      const actual = await replay(mode, suffix, 109);
      assert.deepEqual(actual, { wire: [109], usage: 109, summary: 109 });
    });
  }

  for (const [label, value] of [
    ["missing", undefined],
    ["zero", 0],
    ["negative", -1],
    ["string", "109"],
  ]) {
    test(`${mode}: uses component sum with a ${label} total`, async () => {
      const actual = await replay(mode, "\n\n", value);
      assert.equal(actual.summary, 89);
      if (mode === "translate") assert.deepEqual(actual.wire, [89]);
    });
  }
}
