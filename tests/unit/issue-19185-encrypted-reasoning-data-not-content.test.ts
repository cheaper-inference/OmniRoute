import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { z } from "zod";
import { classifyField } from "../../src/lib/sseTextTransform.ts";
import { createCredentialSseTransform } from "../../src/lib/streamingCredentialTransform.ts";
import { createPiiSseTransform } from "../../src/lib/streamingPiiTransform.ts";

const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  PII_RESPONSE_SANITIZATION: process.env.PII_RESPONSE_SANITIZATION,
  PII_RESPONSE_SANITIZATION_MODE: process.env.PII_RESPONSE_SANITIZATION_MODE,
};
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-issue-19185-"));
process.env.DATA_DIR = tmpDir;
process.env.PII_RESPONSE_SANITIZATION = "true";
process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";

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

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
