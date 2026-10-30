import assert from "node:assert/strict";
import test from "node:test";
import { createCredentialSseTransform } from "../../src/lib/streamingCredentialTransform.ts";

function streamChoices(choices: unknown[], maxBufferedChoices = 32) {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ choices })}\n\n`));
      controller.close();
    },
  }).pipeThrough(createCredentialSseTransform({ maxBufferedChoices, maxBufferedBytes: 1024 }));
}

test("choice cap rejects instead of moving a partial secret to an unrelated index", async () => {
  const secret = "sk-" + "ABCD".repeat(12);
  const choices = [
    { index: 0, delta: { content: secret.slice(0, 25) } },
    { index: 1, delta: { content: "second choice" } },
    { index: 2, delta: { content: "third choice" } },
    { index: 0, delta: { content: secret.slice(25) } },
  ];
  await assert.rejects(new Response(streamChoices(choices, 2)).text(), {
    message: "[PII] Credential stream choice limit exceeded",
  });
});

test("aggregate pending text cannot exceed the configured buffer budget", async () => {
  const choices = Array.from({ length: 3 }, (_, index) => ({
    index,
    delta: { content: "A".repeat(500) },
  }));
  await assert.rejects(new Response(streamChoices(choices)).text(), {
    message: "[PII] Credential stream buffer limit exceeded",
  });
});

test("choices below the cap retain independent content and reasoning tails", async () => {
  const choices = [
    { index: 0, delta: { content: "first content", reasoning: "first thought" } },
    { index: 1, delta: { content: "second content", reasoning_content: "second thought" } },
  ];
  const wire = await new Response(streamChoices(choices, 2)).text();
  const frames = wire
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => JSON.parse(line.slice(6)) as { choices: typeof choices });
  const result = new Map<number, Record<string, string>>();
  for (const frame of frames)
    for (const choice of frame.choices) {
      const fields = result.get(choice.index) ?? {};
      for (const [field, text] of Object.entries(choice.delta))
        fields[field] = (fields[field] ?? "") + text;
      result.set(choice.index, fields);
    }
  assert.deepEqual(result.get(0), choices[0].delta);
  assert.deepEqual(result.get(1), choices[1].delta);
});
