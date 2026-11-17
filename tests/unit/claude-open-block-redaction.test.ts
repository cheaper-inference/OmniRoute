import test from "node:test";
import assert from "node:assert/strict";
import { createCredentialSseTransform } from "../../src/lib/streamingCredentialTransform.ts";
import { createPiiSseTransform } from "../../src/lib/streamingPiiTransform.ts";

const originalPii = process.env.PII_RESPONSE_SANITIZATION;
process.env.PII_RESPONSE_SANITIZATION = "true";

type Event = {
  type: string;
  index?: number;
  delta?: Record<string, string>;
};

/** Exercise the actual transform using fragmented native Claude SSE frames. */
async function transform(stream: TransformStream, events: Event[]): Promise<Event[]> {
  const bytes = new TextEncoder().encode(
    events.map((event) => `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`).join("")
  );
  const source = new ReadableStream({
    start(controller) {
      for (let i = 0; i < bytes.length; i += 7) controller.enqueue(bytes.slice(i, i + 7));
      controller.close();
    },
  });
  const output = await new Response(source.pipeThrough(stream)).text();
  return output
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => JSON.parse(line.slice(6)));
}

/** Reassemble one block and verify that its payload precedes its own stop. */
function blockText(
  events: Event[],
  index: number,
  field = "text",
  deltaType = "text_delta"
): string {
  const stop = events.findIndex(
    (event) => event.type === "content_block_stop" && event.index === index
  );
  assert.ok(stop >= 0);
  const deltas = events.filter(
    (event) => event.type === "content_block_delta" && event.index === index
  );
  assert.ok(deltas.every((event) => event.delta?.type === deltaType));
  assert.ok(
    events
      .slice(stop + 1)
      .every((event) => event.type !== "content_block_delta" || event.index !== index)
  );
  return deltas.map((event) => event.delta?.[field] ?? "").join("");
}

for (const bodyLength of [100, 1500]) {
  test(`an unrelated block stop preserves private-key masking (${bodyLength} chars)`, async () => {
    const laterBody = "SYNTHETIC_PRIVATE_KEY_BODY";
    const output = await transform(createCredentialSseTransform({ maxBufferedBytes: 1024 }), [
      {
        type: "content_block_delta",
        index: 0,
        delta: {
          type: "text_delta",
          text: "-----BEGIN PRIVATE KEY-----\n" + "A".repeat(bodyLength),
        },
      },
      { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "done" } },
      { type: "content_block_stop", index: 1 },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: laterBody + "\n-----END PRIVATE KEY-----" },
      },
      { type: "content_block_stop", index: 0 },
    ]);
    const text = blockText(output, 0);
    assert.match(text, /\[REDACTED:private_key\]/);
    assert.ok(!text.includes(laterBody), "the continued private-key body must remain masked");
    assert.equal(blockText(output, 1), "done");
  });
}

for (const [field, deltaType] of [
  ["text", "text_delta"],
  ["thinking", "thinking_delta"],
]) {
  for (const empty of [false, true]) {
    test(`PII retains open ${field} across an ${empty ? "empty" : "occupied"} block stop`, async () => {
      const output = await transform(createPiiSseTransform(), [
        {
          type: "content_block_delta",
          index: 0,
          delta: { type: deltaType, [field]: "contact alice@example.co" },
        },
        ...(empty
          ? []
          : [
              {
                type: "content_block_delta",
                index: 1,
                delta: { type: "text_delta", text: "second block" },
              },
            ]),
        { type: "content_block_stop", index: 1 },
        { type: "content_block_delta", index: 0, delta: { type: deltaType, [field]: "m done" } },
        { type: "content_block_stop", index: 0 },
        { type: "message_stop" },
      ]);
      assert.equal(blockText(output, 0, field, deltaType), "contact [EMAIL_REDACTED] done");
      assert.equal(blockText(output, 1), empty ? "" : "second block");
      assert.ok(!JSON.stringify(output).includes("alice@example"));
    });
  }
}

test("retained credential buffers still count toward the limit after another block stops", async () => {
  await assert.rejects(
    transform(createCredentialSseTransform({ maxBufferedBytes: 1024 }), [
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "a".repeat(500) },
      },
      { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "done" } },
      { type: "content_block_stop", index: 1 },
      {
        type: "content_block_delta",
        index: 2,
        delta: { type: "text_delta", text: "b".repeat(500) },
      },
      {
        type: "content_block_delta",
        index: 3,
        delta: { type: "text_delta", text: "c".repeat(500) },
      },
    ]),
    /Credential stream buffer limit exceeded/
  );
});

test("closing a credential block releases its own buffer budget", async () => {
  const values = ["a".repeat(500), "b".repeat(400), "c".repeat(500)];
  const output = await transform(createCredentialSseTransform({ maxBufferedBytes: 1024 }), [
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: values[0] } },
    { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: values[1] } },
    { type: "content_block_stop", index: 1 },
    { type: "content_block_delta", index: 2, delta: { type: "text_delta", text: values[2] } },
    { type: "content_block_stop", index: 0 },
    { type: "content_block_stop", index: 2 },
  ]);
  for (const [index, expected] of values.entries())
    assert.equal(blockText(output, index), expected);
});

test.after(async () => {
  if (originalPii === undefined) delete process.env.PII_RESPONSE_SANITIZATION;
  else process.env.PII_RESPONSE_SANITIZATION = originalPii;
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
});
