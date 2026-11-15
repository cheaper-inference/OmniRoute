// x-omniroute-cache-threshold may only tighten matching. A caller-supplied value
// below the configured similarityThreshold must not lower the similarity floor,
// or any caller can probe for the nearest cached entry (even 0 -> always a hit).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-threshold-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { SemanticCacheManager } =
  await import("../../open-sse/services/cache/semanticCacheManager.ts");
const { MemoryVectorStore } = await import("../../open-sse/services/cache/memoryVectorStore.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

const RESPONSE = {
  id: "res-1",
  choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content: "ans" } }],
};

// Embedding of "query-1" is [1,0,0]; "query-2" has cosine similarity 0.5 with it.
const embed = async (text: string) =>
  text.includes("query-1")
    ? { embedding: [1, 0, 0], inputTokens: 5 }
    : { embedding: [0.5, 0.8660254, 0], inputTokens: 5 };

async function lookupWith(threshold: string | undefined, similarityFloor = 0.8) {
  const manager = new SemanticCacheManager(
    { enabled: true, similarityThreshold: similarityFloor },
    new MemoryVectorStore(),
    embed
  );
  await manager.store({
    body: { model: "gpt-4o", messages: [{ role: "user", content: "query-1" }], temperature: 0 },
    response: RESPONSE,
    model: "gpt-4o",
    provider: "openai",
  });
  return manager.lookup({
    body: { model: "gpt-4o", messages: [{ role: "user", content: "query-2" }], temperature: 0 },
    headers: threshold === undefined ? {} : { "x-omniroute-cache-threshold": threshold },
    model: "gpt-4o",
    provider: "openai",
  });
}

test("threshold header 0 cannot lower the floor to return the nearest entry", async () => {
  const result = await lookupWith("0");
  assert.equal(result.hit, false, "similarity 0.5 is below the configured floor 0.8");
});

test("a header below the configured floor is ignored", async () => {
  const result = await lookupWith("0.3");
  assert.equal(result.hit, false);
});

test("a header above the floor still tightens matching", async () => {
  // similarity 0.5 would pass a floor of 0.4; a header of 0.9 must still be able to raise it.
  const result = await lookupWith("0.9", 0.4);
  assert.equal(result.hit, false);
  const noHeader = await lookupWith(undefined, 0.4);
  assert.equal(noHeader.hit, true, "without a header the configured floor 0.4 admits 0.5");
});
