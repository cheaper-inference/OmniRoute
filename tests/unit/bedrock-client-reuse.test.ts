import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-bedrock-cache-"));

const { BedrockExecutor } = await import("../../open-sse/executors/bedrock.ts");

function credentials(apiKey = "key-a", region = "eu-west-2", customUserAgent?: string) {
  return {
    apiKey,
    providerSpecificData: { region, ...(customUserAgent ? { customUserAgent } : {}) },
  };
}

test("Bedrock clients are reused only for the same region, user agent, and key", () => {
  let constructions = 0;
  const executor = new BedrockExecutor(() => {
    constructions++;
    return { send: async () => ({}) };
  });

  const first = executor.createClient(credentials());
  assert.strictEqual(executor.createClient(credentials()), first);
  assert.notStrictEqual(executor.createClient(credentials("key-a", "us-east-1")), first);
  assert.notStrictEqual(executor.createClient(credentials("key-b")), first);
  assert.notStrictEqual(executor.createClient(credentials("key-a", "eu-west-2", "agent")), first);
  assert.equal(constructions, 4);
});

test("Bedrock client eviction destroys the oldest client and keeps the cache bounded", () => {
  let constructions = 0;
  let firstClientDestroyCalls = 0;
  const executor = new BedrockExecutor(() => {
    const id = constructions++;
    return {
      send: async () => ({}),
      destroy: () => {
        if (id === 0) firstClientDestroyCalls++;
      },
    };
  });

  for (let i = 0; i < 32; i++) {
    executor.createClient(credentials(`key-${i}`));
  }
  assert.equal(firstClientDestroyCalls, 0);

  executor.createClient(credentials("key-32"));
  assert.equal(constructions, 33);
  assert.equal(firstClientDestroyCalls, 1);
});
