import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-bedrock-cache-"));

const { BedrockExecutor } = await import("../../open-sse/executors/bedrock.ts");
const { opaqueTokenFingerprint } = await import("../../open-sse/utils/opaqueTokenFingerprint.ts");

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

test("the client cache key holds a fingerprint of the API key, never the key itself", () => {
  const executor = new BedrockExecutor(() => ({ send: async () => ({}) }));
  const apiKey = "bedrock-secret-key-for-cache-test";
  executor.createClient(credentials(apiKey));

  const keys = [...(executor as unknown as { clients: Map<string, unknown> }).clients.keys()];
  assert.equal(keys.length, 1);
  assert.ok(!keys[0].includes(apiKey), "the raw API key must not be part of the cache key");
  // The helper's plain mode is the historical sha256 hex (covered by its own tests), so the
  // cache keeps the meaning of its existing entries.
  assert.ok(
    keys[0].includes(opaqueTokenFingerprint(apiKey)),
    "the cache key carries the key fingerprint"
  );
});
