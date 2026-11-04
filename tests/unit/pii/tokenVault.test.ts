import test from "node:test";
import assert from "node:assert/strict";

import {
  TokenVault,
  TokenVaultManager,
  createDetokenizingStream,
  detokenizeResponsePayload,
  safeJsonEscape,
  runWithTokenVault,
  getActiveTokenVault,
  resolveVault,
} from "../../../src/lib/pii/tokenVault.ts";

async function readAll(
  stream: TransformStream<Uint8Array | string, Uint8Array>,
  inputs: string[]
): Promise<string> {
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
  assert.match(token1, /^<<PII_EMAIL_[A-Za-z0-9_]+>>$/);
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

  vault.dispose();
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

  vault.dispose();
});

test("TokenVault - LRU touch prevents eviction of frequently accessed items", () => {
  const vault = new TokenVault({ maxEntries: 3, ttlMs: 60000 });

  const t1 = vault.getOrCreateToken("item1", "val1");
  const t2 = vault.getOrCreateToken("item2", "val2");
  const t3 = vault.getOrCreateToken("item3", "val3");

  // Touch t1 so it moves to most-recently-used position
  const t1Again = vault.getOrCreateToken("item1", "val1");
  assert.equal(t1Again, t1);

  // Insert 4th item, exceeding capacity 3. Oldest item now should be t2 (not t1!)
  const t4 = vault.getOrCreateToken("item4", "val4");

  assert.equal(vault.get(t1), "val1", "t1 should NOT be evicted because of LRU touch");
  assert.equal(vault.get(t2), undefined, "t2 should be evicted as least recently used");
  assert.equal(vault.get(t3), "val3");
  assert.equal(vault.get(t4), "val4");

  vault.dispose();
});

test("createDetokenizingStream - Zero-TTFT fast path without tokens", async () => {
  const stream = createDetokenizingStream();
  const result = await readAll(stream, ["Hello world! How are you?"]);
  assert.equal(result, "Hello world! How are you?");
});

test("createDetokenizingStream - detokenizes single chunk with surrogate tokens", async () => {
  const vault = TokenVaultManager.getInstance();
  const emailToken = vault.getOrCreateToken("email", "user@example.com");

  const stream = createDetokenizingStream(vault);
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
  const part2 = phoneToken.slice(mid) + ` anytime"}]}\n\n`;

  const stream = createDetokenizingStream(vault);
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

  const restored = detokenizeResponsePayload(responseBody, vault);
  assert.equal(
    restored.choices[0].message.content,
    "Verified SSN record: 123-45-6789."
  );
});

test("safeJsonEscape - preserves quotes and special characters inside SSE", () => {
  assert.equal(safeJsonEscape('Hello "world"'), 'Hello \\"world\\"');
  assert.equal(safeJsonEscape("Line 1\nLine 2"), "Line 1\\nLine 2");
});

test("AsyncLocalStorage - parallel requests in runWithTokenVault are isolated", async () => {
  const vaultA = new TokenVault();
  const vaultB = new TokenVault();

  const tokenA = vaultA.getOrCreateToken("email", "alice@example.com");
  const tokenB = vaultB.getOrCreateToken("email", "bob@example.com");

  // Run two concurrent async requests
  const promiseA = runWithTokenVault(vaultA, async () => {
    // Verify active vault resolution
    assert.equal(getActiveTokenVault(), vaultA);
    assert.equal(resolveVault(), vaultA);

    // Simulate async tick
    await new Promise((r) => setTimeout(r, 10));

    // Detokenizing stream without explicit vault should pick up vaultA
    const stream = createDetokenizingStream();
    const input = `Client A: ${tokenA}, Alien B: ${tokenB}`;
    const result = await readAll(stream, [input]);
    return result;
  });

  const promiseB = runWithTokenVault(vaultB, async () => {
    assert.equal(getActiveTokenVault(), vaultB);
    assert.equal(resolveVault(), vaultB);

    await new Promise((r) => setTimeout(r, 10));

    // Detokenizing response payload without explicit vault should pick up vaultB
    const payload = {
      content: `Client B: ${tokenB}, Alien A: ${tokenA}`,
    };
    const detokenized = detokenizeResponsePayload(payload);
    return detokenized.content;
  });

  const [resultA, resultB] = await Promise.all([promiseA, promiseB]);

  // Request A: alice is detokenized, alien tokenB remains untouched (fail-closed)
  assert.match(resultA, /Client A: alice@example\.com/);
  assert.match(resultA, new RegExp(`Alien B: ${tokenB}`));
  assert.doesNotMatch(resultA, /bob@example\.com/);

  // Request B: bob is detokenized, alien tokenA remains untouched (fail-closed)
  assert.match(resultB, /Client B: bob@example\.com/);
  assert.match(resultB, new RegExp(`Alien A: ${tokenA}`));
  assert.doesNotMatch(resultB, /alice@example\.com/);

  vaultA.dispose();
  vaultB.dispose();
});

test("TokenVault - dispose() clears interval timer and empties internal storage", () => {
  const vault = new TokenVault();
  const token = vault.getOrCreateToken("card", "4111-2222-3333-4444");

  assert.equal(vault.hasTokens(), true);
  assert.equal(vault.size, 1);
  assert.equal(vault.get(token), "4111-2222-3333-4444");

  vault.dispose();

  assert.equal(vault.hasTokens(), false);
  assert.equal(vault.size, 0);
  assert.equal(vault.get(token), undefined);
});

test("Layer 2 Interceptor: Fail-Closed without active TokenVault context", () => {
  // When no active request vault exists in AsyncLocalStorage, resolveVault() fails closed
  const stream = createDetokenizingStream();
  assert.ok(stream);

  // detokenizeResponsePayload passes through safely when no active vault
  const payload = { text: "Unresolved <<PII_EMAIL_GUEST_1>>" };
  const restored = detokenizeResponsePayload(payload);
  assert.equal(restored.text, "Unresolved <<PII_EMAIL_GUEST_1>>");
});

test("Layer 2 Interceptor: End-to-end scoped request streaming detokenization", async () => {
  const requestVault = new TokenVault({ nonce: "E2ETEST1" });
  const secretPhone = "+7 (999) 123-45-67";
  const surrogateToken = requestVault.getOrCreateToken("phone", secretPhone);

  await runWithTokenVault(requestVault, async () => {
    const stream = createDetokenizingStream();
    const chunk1 = `data: {"choices":[{"delta":{"content":"Contact support at ${surrogateToken}"}}]}\n\n`;
    const chunk2 = `data: [DONE]\n\n`;

    const result = await readAll(stream, [chunk1, chunk2]);
    assert.match(result, /Contact support at \+7 \(999\) 123-45-67/);
    assert.doesNotMatch(result, /<<PII_/);
  });

  requestVault.dispose();
});
