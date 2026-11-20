import { test } from "node:test";
import assert from "node:assert";

// Deterministic key to exercise the real auth-tag path (without it the decrypt
// short-circuit the "no key" branch). Defined BEFORE import — key derivation
// is lazy cached on first use.
process.env.STORAGE_ENCRYPTION_KEY = "unit-test-storage-encryption-key-0123456789";

const { decrypt } = await import("../../../src/lib/db/encryption.ts");

// Current contract (hardening): decrypt failure → null + log, NEVER the raw ciphertext
// (returning the encrypted blob would leak the encrypted data to UI/API). This file was
// a glob orphan (never run on CI) and encoded the old pre-hardening contract —
// alinhado ao comportamento real/shipped em 2026-07 (plano mestre testes+CI, QW-c).
test("decrypt() with invalid auth tag should not crash and return null", () => {
  const invalidCiphertext = "enc:v1:0000:0000:0000";
  const result = decrypt(invalidCiphertext);

  assert.strictEqual(result, null, "Failed auth-tag decrypt must return null (never the raw blob)");
});

test("decrypt() with malformed ciphertext should not crash and return null", () => {
  const malformed = "enc:v1:invalid";
  const result = decrypt(malformed);

  assert.strictEqual(result, null, "Malformed encrypted value must return null");
});

test("decrypt() with null should return null", () => {
  const result = decrypt(null);
  assert.strictEqual(result, null, "Should return null for null input");
});

test("decrypt() with undefined should return undefined", () => {
  const result = decrypt(undefined);
  assert.strictEqual(result, undefined, "Should return undefined for undefined input");
});

test("decrypt() with non-encrypted string should return as-is", () => {
  const plaintext = "this-is-not-encrypted";
  const result = decrypt(plaintext);
  assert.strictEqual(result, plaintext, "Should return plaintext unchanged");
});
