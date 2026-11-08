/**
 * Cloudflare Workers AI (for example `@cf/mistralai/mistral-small-3.1-24b-instruct`) sometimes
 * streams `choices[].delta.content` as a JSON number instead of a string:
 *
 *   {"delta":{"content":"A"}} {"delta":{"content":7}} {"delta":{"content":"."}}
 *
 * The passthrough only counted string content as text, so those chunks were dropped and the
 * digits disappeared from the reply (OmniRoute#16554).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-numeric-delta-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { normalizeArrayContentDelta } = await import("../../open-sse/utils/arrayContentDelta.ts");

const textEncoder = new TextEncoder();

test.after(() => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

function chunk(delta: Record<string, unknown>, finishReason: string | null = null) {
  return `data: ${JSON.stringify({
    id: "cmpl_cf",
    object: "chat.completion.chunk",
    created: 1,
    model: "@cf/mistralai/mistral-small-3.1-24b-instruct",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  })}\n\n`;
}

// "A", "B", 7, ".", 1, ".", 9, then a zero, which must not be mistaken for an empty delta.
const STREAM = [
  chunk({ role: "assistant", content: "" }),
  chunk({ content: "A" }),
  chunk({ content: "B" }),
  chunk({ content: 7 }),
  chunk({ content: "." }),
  chunk({ content: 1 }),
  chunk({ content: "." }),
  chunk({ content: 9 }),
  chunk({ content: 0 }),
  chunk({}, "stop"),
  "data: [DONE]\n\n",
];

async function run(options: object): Promise<string> {
  const source = new ReadableStream({
    start(controller) {
      for (const c of STREAM) controller.enqueue(textEncoder.encode(c));
      controller.close();
    },
  });
  return new Response(source.pipeThrough(createSSEStream(options))).text();
}

test("passthrough keeps numeric delta.content as string text", async () => {
  const text = await run({
    mode: "passthrough",
    provider: "cloudflare-ai",
    model: "@cf/mistralai/mistral-small-3.1-24b-instruct",
    clientResponseFormat: FORMATS.OPENAI,
    body: { messages: [{ role: "user", content: "copy 7.1.9" }] },
  });
  const deltas = text
    .split("\n")
    .filter((l) => l.startsWith("data: ") && !l.includes("[DONE]"))
    .map((l) => JSON.parse(l.slice(6)))
    .flatMap((e) =>
      ((e.choices as Array<{ delta?: Record<string, unknown> }>) ?? []).map((c) => c.delta ?? {})
    );
  for (const d of deltas) {
    if ("content" in d) assert.equal(typeof d.content, "string", JSON.stringify(d));
  }
  assert.equal(deltas.map((d) => d.content ?? "").join(""), "AB7.1.9" + "0");
});

test("normalizeArrayContentDelta turns a finite number into its decimal string", () => {
  const seven: Record<string, unknown> = { content: 7 };
  assert.equal(normalizeArrayContentDelta(seven), true);
  assert.deepEqual(seven, { content: "7" });

  const zero: Record<string, unknown> = { content: 0 };
  assert.equal(normalizeArrayContentDelta(zero), true);
  assert.deepEqual(zero, { content: "0" });

  const notFinite: Record<string, unknown> = { content: Number.NaN };
  assert.equal(normalizeArrayContentDelta(notFinite), false);

  const plain = { content: "x" };
  assert.equal(normalizeArrayContentDelta(plain), false);
  assert.deepEqual(plain, { content: "x" });
});
