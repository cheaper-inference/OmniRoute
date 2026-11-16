// The private_key credential pattern must stay linear. A lazy `[\s\S]*?` body restarted at
// every BEGIN header and ran to the end of the text when no END marker followed, so a body
// of repeated headers cost the square of its size on the event loop.
import test from "node:test";
import assert from "node:assert/strict";

const { redactCredentials } = await import("../../src/lib/guardrails/credentialMasker.ts");
const { CREDENTIAL_PATTERNS } = await import("../../open-sse/utils/credentialPatterns.ts");

const privateKeyPattern = CREDENTIAL_PATTERNS.find((p) => p.name === "private_key");
assert.ok(privateKeyPattern, "private_key pattern exists");

const KEY = [
  "-----BEGIN RSA PRIVATE KEY-----",
  "MIIEowIBAAKCAQEAs3f1vR8nq2J5mJ0kP9yWq3xLbT7cG4hZ2uE6sQ1mN8dF0aB",
  "c5Y7tK2pR9wX4zV1nM6qL3jH8gD0fS5aE2rT7yU9iO4pA1sD6fG3hJ8kL2zX5cV",
  "-----END RSA PRIVATE KEY-----",
].join("\n");

const ENCRYPTED_KEY = [
  "-----BEGIN RSA PRIVATE KEY-----",
  "Proc-Type: 4,ENCRYPTED",
  "DEK-Info: DES-EDE3-CBC,3F17F5316E2BAC89",
  "",
  "hJ8kL2zX5cVb7nM1qW4eR6tY9uI0oP3aS5dF8gH2jK4lZ7xC9vB1nM3qW5eR7tY",
  "-----END RSA PRIVATE KEY-----",
].join("\n");

test("repeated BEGIN headers without an END marker are scanned in linear time", () => {
  const attack = "-----BEGIN PRIVATE KEY-----\n".repeat(64_000); // about 1.8 MB
  const started = performance.now();
  const result = redactCredentials(attack);
  const elapsed = performance.now() - started;
  assert.equal(result.text, attack, "nothing to redact without an END marker");
  // The quadratic pattern took several seconds here; the linear one takes a few ms.
  assert.ok(elapsed < 1000, `redaction took ${Math.round(elapsed)} ms`);
});

test("a private key is still redacted", () => {
  const result = redactCredentials(`before\n${KEY}\nafter`);
  assert.equal(result.text, "before\n[REDACTED:private_key]\nafter");
});

test("an encrypted PEM with dashes in its headers is still redacted", () => {
  const result = redactCredentials(ENCRYPTED_KEY);
  assert.equal(result.text, "[REDACTED:private_key]");
});

test("two keys are redacted separately and the text between them stays", () => {
  const result = redactCredentials(`${KEY}\nmiddle\n${KEY}`);
  assert.equal(result.text, "[REDACTED:private_key]\nmiddle\n[REDACTED:private_key]");
});

test("a key after an unmatched BEGIN header is still redacted", () => {
  const result = redactCredentials(`-----BEGIN PRIVATE KEY-----\nnoise\n${KEY}`);
  assert.equal(result.text, "-----BEGIN PRIVATE KEY-----\nnoise\n[REDACTED:private_key]");
});
