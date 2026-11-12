/**
 * The in-memory Gemini thought-signature cache evicts the least recently USED entry, not the
 * insertion-oldest one: a signature that is read on every turn of a long tool loop must survive
 * a burst of other signatures. The persisted copy is deleted in the test so only the memory
 * layer can answer.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sig-lru-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");

const MEMORY_CAP = 1000;

test.beforeEach(() => store.clearGeminiThoughtSignatures());

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function dropPersistedCopy(toolCallId: string) {
  core
    .getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run("gemini_thought_signatures", toolCallId);
}

test("a signature read during a burst survives memory eviction", () => {
  store.storeGeminiThoughtSignature("call-hot", "sig-hot");
  // Only the memory layer may answer: a persisted fallback would re-insert the entry as newest.
  dropPersistedCopy("call-hot");
  for (let i = 0; i < MEMORY_CAP + 50; i++) {
    store.storeGeminiThoughtSignature(`call-${i}`, `sig-${i}`);
    if (i % 100 === 0) assert.equal(store.getGeminiThoughtSignature("call-hot"), "sig-hot");
  }
  assert.equal(store.getGeminiThoughtSignatureMemorySizeForTests(), MEMORY_CAP);
  assert.equal(store.getGeminiThoughtSignature("call-hot"), "sig-hot");
});

test("an entry that is never read is still evicted oldest first", () => {
  store.storeGeminiThoughtSignature("call-cold", "sig-cold");
  for (let i = 0; i < MEMORY_CAP; i++) store.storeGeminiThoughtSignature(`call-${i}`, `sig-${i}`);

  dropPersistedCopy("call-cold");
  assert.equal(store.getGeminiThoughtSignature("call-cold"), null);
});

test("a read does not extend the memory time to live", () => {
  const realNow = Date.now;
  let now = realNow();
  Date.now = () => now;
  try {
    store.storeGeminiThoughtSignature("call-ttl", "sig-ttl");
    now += 59 * 60 * 1000;
    assert.equal(store.getGeminiThoughtSignature("call-ttl"), "sig-ttl");
    now += 2 * 60 * 1000;
    dropPersistedCopy("call-ttl");
    assert.equal(store.getGeminiThoughtSignature("call-ttl"), null);
  } finally {
    Date.now = realNow;
  }
});
