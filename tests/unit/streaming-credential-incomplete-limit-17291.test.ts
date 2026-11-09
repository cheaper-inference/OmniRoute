import assert from "node:assert/strict";
import test from "node:test";
import { createCredentialSseTransform } from "../../src/lib/streamingCredentialTransform.ts";

async function consume(first: string, second: string) {
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const content of [first, second]) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content } }] })}\n\n`
          )
        );
      }
      controller.close();
    },
  });
  return new Response(
    source.pipeThrough(createCredentialSseTransform({ maxBufferedBytes: 1024 }))
  ).text();
}

test("oversized unterminated connection authority fails closed before losing its credential prefix", async () => {
  await assert.rejects(consume("mongodb://fixture:" + "P".repeat(1400), "@host/db after"), {
    message: "[PII] Credential stream buffer limit exceeded",
  });
});
test("oversized incomplete JWT fails closed before losing its signature context", async () => {
  await assert.rejects(
    consume("eyJ" + "A".repeat(1400), "." + "B".repeat(20) + "." + "C".repeat(20)),
    {
      message: "[PII] Credential stream buffer limit exceeded",
    }
  );
});
