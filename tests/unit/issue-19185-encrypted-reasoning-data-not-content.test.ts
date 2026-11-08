import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";
import { classifyField } from "../../src/lib/sseTextTransform.ts";

const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  PII_RESPONSE_SANITIZATION: process.env.PII_RESPONSE_SANITIZATION,
  PII_RESPONSE_SANITIZATION_MODE: process.env.PII_RESPONSE_SANITIZATION_MODE,
};
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-issue-19185-"));
process.env.DATA_DIR = tmpDir;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";

// Static imports are hoisted and src/lib/db/core.ts reads DATA_DIR at load, so the transforms
// load only now: an ambient DB override could otherwise switch redaction off under this test.
const { createCredentialSseTransform } =
  await import("../../src/lib/streamingCredentialTransform.ts");
const { createPiiSseTransform } = await import("../../src/lib/streamingPiiTransform.ts");

const opaque = "orsr1_" + "X".repeat(400);
const encryptedDetail = {
  type: "reasoning.encrypted",
  data: opaque,
  format: "unknown",
  index: 0,
};
const eventSchema = z.object({
  choices: z.array(
    z.object({
      delta: z.object({
        content: z.string().optional(),
        reasoning: z.string().optional(),
        reasoning_content: z.string().optional(),
        reasoning_details: z
          .array(
            z.object({
              type: z.string(),
              data: z.string().optional(),
              text: z.string().optional(),
              format: z.string(),
              index: z.number(),
            })
          )
          .optional(),
      }),
    })
  ),
});

async function runStream(transforms: TransformStream[], chunks: string[]) {
  let stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
  for (const transform of transforms) stream = stream.pipeThrough(transform);
  const output = await new Response(stream).text();
  return output
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => {
      const json: unknown = JSON.parse(line.slice(6));
      return eventSchema.parse(json);
    });
}

test("#19185: encrypted reasoning data is metadata", () => {
  assert.equal(classifyField("data", "reasoning_details"), null);
});

test("#19185: ordinary data and reasoning text keep their existing categories", () => {
  assert.equal(classifyField("data"), "content");
  assert.equal(classifyField("data", "delta"), "content");
  assert.equal(classifyField("text", "reasoning_details"), "reasoning");
  assert.equal(classifyField("format", "reasoning_details"), null);
});

for (const mode of ["credential", "pii-redact", "both"]) {
  for (const withContent of [true, false]) {
    for (const termination of ["stop", "done", "close"]) {
      test(`#19185: ${mode} preserves encrypted metadata ${withContent ? "with" : "without"} content on ${termination}`, async () => {
        const transforms =
          mode === "credential"
            ? [createCredentialSseTransform()]
            : mode === "pii-redact"
              ? [createPiiSseTransform()]
              : [createCredentialSseTransform(), createPiiSseTransform()];
        const chunks = [
          `data: ${JSON.stringify({
            choices: [{ index: 0, delta: { reasoning_details: [encryptedDetail] } }],
          })}\n\n`,
        ];
        if (withContent) {
          chunks.push('data: {"choices":[{"index":0,"delta":{"content":"Hello world."}}]}\n\n');
        }
        if (termination === "stop") {
          chunks.push('data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n');
        }
        if (termination !== "close") chunks.push("data: [DONE]\n\n");

        const events = await runStream(transforms, chunks);
        const deltas = events.flatMap((event) => event.choices.map((choice) => choice.delta));
        assert.equal(
          deltas.map((delta) => delta.content ?? "").join(""),
          withContent ? "Hello world." : ""
        );
        assert.equal(
          deltas.map((delta) => delta.reasoning ?? delta.reasoning_content ?? "").join(""),
          ""
        );
        const details = deltas.flatMap((delta) => delta.reasoning_details ?? []);
        assert.ok(details.length > 0, "encrypted reasoning metadata must remain in the stream");
        for (const detail of details) assert.deepEqual(detail, encryptedDetail);
      });
    }
  }
}

test("#19185: PII redaction stays active beside encrypted metadata", async () => {
  const events = await runStream(
    [createPiiSseTransform()],
    [
      `data: ${JSON.stringify({
        choices: [{ index: 0, delta: { reasoning_details: [encryptedDetail] } }],
      })}\n\n`,
      'data: {"choices":[{"index":0,"delta":{"content":"Mail alice@example.com now."}}]}\n\n',
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
      "data: [DONE]\n\n",
    ]
  );
  const deltas = events.flatMap((event) => event.choices.map((choice) => choice.delta));
  assert.equal(deltas.map((delta) => delta.content ?? "").join(""), "Mail [EMAIL_REDACTED] now.");
  assert.deepEqual(
    deltas.flatMap((delta) => delta.reasoning_details ?? []),
    [encryptedDetail]
  );
});

test("#19185: a secret split around encrypted metadata is still masked", async () => {
  const secret = `sk-${"A".repeat(48)}`;
  const contentChunk = (content: string) =>
    `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content } }] })}\n\n`;
  const events = await runStream(
    [createCredentialSseTransform()],
    [
      contentChunk(`key ${secret.slice(0, 20)}`),
      `data: ${JSON.stringify({
        choices: [{ index: 0, delta: { reasoning_details: [encryptedDetail] } }],
      })}\n\n`,
      contentChunk(`${secret.slice(20)} end`),
      'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n',
      "data: [DONE]\n\n",
    ]
  );
  const deltas = events.flatMap((event) => event.choices.map((choice) => choice.delta));
  const content = deltas.map((delta) => delta.content ?? "").join("");
  assert.ok(!content.includes(secret.slice(0, 20)), "secret head must not reach the client");
  assert.ok(!content.includes(secret.slice(20)), "secret tail must not reach the client");
  assert.match(content, /^key .+ end$/);
  assert.deepEqual(
    deltas.flatMap((delta) => delta.reasoning_details ?? []),
    [encryptedDetail]
  );
});

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
