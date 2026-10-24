import test from "node:test";
import assert from "node:assert/strict";

import {
  TokenVaultManager,
  createDetokenizingStream,
  detokenizeResponsePayload,
  safeJsonEscape,
} from "../../../src/lib/pii/tokenVault.ts";

async function readAll(stream: TransformStream<Uint8Array | string, Uint8Array>, inputs: string[]): Promise<string> {
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  const dec = new TextDecoder("utf-8");
  const enc = new TextEncoder();

  const readPromise = (async () => {
    let res = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res += dec.decode(value);
    }
    return res;
  })();

  for (const chunk of inputs) {
    await writer.write(enc.encode(chunk));
  }
  await writer.close();

  return await readPromise;
}

test("TokenVaultManager - surrogate generation, reuse, and TTL expiration", async () => {
  const vault = new TokenVaultManager({ maxEntries: 10, ttlMs: 100 });

  const token1 = vault.getOrCreateToken("email", "admin@company.com");
  assert.match(token1, /^<<PII_EMAIL_\d+>>$/);
  assert.equal(vault.get(token1), "admin@company.com");

  // Re-requesting the same value yields identical token and refreshes TTL
  const token1Again = vault.getOrCreateToken("email", "admin@company.com");
  assert.equal(token1Again, token1);

  // Different value generates distinct token
  const token2 = vault.getOrCreateToken("phone", "+1-555-0199");
  assert.notEqual(token2, token1);
  assert.equal(vault.get(token2), "+1-555-0199");

  // Wait for TTL expiration
  await new Promise((r) => setTimeout(r, 120));
  assert.equal(vault.get(token1), undefined);
  assert.equal(vault.get(token2), undefined);
});

test("TokenVaultManager - LRU capacity eviction", () => {
  const vault = new TokenVaultManager({ maxEntries: 2, ttlMs: 60000 });

  const t1 = vault.getOrCreateToken("item1", "value1");
  const t2 = vault.getOrCreateToken("item2", "value2");
  const t3 = vault.getOrCreateToken("item3", "value3");

  // Earliest item (t1) should be evicted
  assert.equal(vault.get(t1), undefined);
  assert.equal(vault.get(t2), "value2");
  assert.equal(vault.get(t3), "value3");
});

test("createDetokenizingStream - Zero-TTFT fast path without tokens", async () => {
  const stream = createDetokenizingStream();
  const result = await readAll(stream, ["Hello world! How are you?"]);
  assert.equal(result, "Hello world! How are you?");
});

test("createDetokenizingStream - detokenizes single chunk with surrogate tokens", async () => {
  const vault = TokenVaultManager.getInstance();
  const emailToken = vault.getOrCreateToken("email", "user@example.com");

  const stream = createDetokenizingStream();
  const payload = `data: {"choices":[{"delta":{"content":"Contact me at ${emailToken}"}}]}\n\n`;
  const result = await readAll(stream, [payload]);

  assert.match(result, /Contact me at user@example\.com/);
  assert.doesNotMatch(result, /<<PII_EMAIL_/);
});

test("createDetokenizingStream - speculative buffer across split chunk boundary", async () => {
  const vault = TokenVaultManager.getInstance();
  const phoneToken = vault.getOrCreateToken("phone", "+1-800-555-0199");

  // Split surrogate token across two chunks: e.g. "<<PII_PH" and "ONE_...>>"
  const mid = Math.floor(phoneToken.length / 2);
  const part1 = `data: {"choices":[{"delta":{"content":"Call ` + phoneToken.slice(0, mid);
  const part2 = phoneToken.slice(mid) + ` anytime"}}]}\n\n`;

  const stream = createDetokenizingStream();
  const result = await readAll(stream, [part1, part2]);

  assert.match(result, /Call \+1-800-555-0199 anytime/);
  assert.doesNotMatch(result, /<<PII_PHONE_/);
});

test("detokenizeResponsePayload - non-streaming JSON body detokenization", () => {
  const vault = TokenVaultManager.getInstance();
  const ssnToken = vault.getOrCreateToken("ssn", "123-45-6789");

  const responseBody = {
    id: "chatcmpl-test",
    choices: [
      {
        message: {
          role: "assistant",
          content: `Verified SSN record: ${ssnToken}.`,
        },
      },
    ],
  };

  const restored = detokenizeResponsePayload(responseBody);
  assert.equal(
    restored.choices[0].message.content,
    "Verified SSN record: 123-45-6789."
  );
});

test("safeJsonEscape - preserves quotes and special characters inside SSE", () => {
  assert.equal(safeJsonEscape('Hello "world"'), 'Hello \\"world\\"');
  assert.equal(safeJsonEscape("Line 1\nLine 2"), "Line 1\\nLine 2");
});
