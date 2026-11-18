import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prompt-cache-once-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { generatePromptCacheKey } = await import("../../src/lib/promptCache/prefixAnalyzer.ts");
const { resolvePromptCacheAffinityKey } =
  await import("../../open-sse/services/combo/promptCacheAffinity.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("cache affinity skips prefix work for explicit keys and analyzes a derived key once", () => {
  const prefixText = "system prompt";
  const messages = [
    { role: "system", content: prefixText },
    { role: "user", content: "hello" },
  ];
  const expectedKey = generatePromptCacheKey(messages);
  const originalCreateHash = crypto.createHash.bind(crypto);
  let prefixHashes = 0;
  crypto.createHash = ((algorithm: string) => {
    const hash = originalCreateHash(algorithm);
    const originalUpdate = hash.update.bind(hash);
    hash.update = ((data: Parameters<typeof hash.update>[0]) => {
      if (data === prefixText) prefixHashes++;
      return originalUpdate(data);
    }) as typeof hash.update;
    return hash;
  }) as typeof crypto.createHash;

  try {
    const explicit = resolvePromptCacheAffinityKey({ prompt_cache_key: "explicit", messages });
    const explicitPrefixHashes = prefixHashes;
    prefixHashes = 0;
    const derived = resolvePromptCacheAffinityKey({ messages });
    assert.equal(explicit?.key, "explicit");
    assert.equal(explicitPrefixHashes, 0, "an explicit key still hashed the prompt prefix");
    assert.equal(derived?.key, expectedKey, "the derived cache key bytes changed");
    assert.equal(prefixHashes, 1, "the derived key hashed the same prefix more than once");
  } finally {
    crypto.createHash = originalCreateHash;
  }
});
