import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-context-cjk-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("estimateTokens prices CJK text near one token per character, not chars/4", () => {
  // Real tokenizers spend about one token per ideograph; chars/4 gave 100 here.
  assert.ok(estimateTokens("中".repeat(400)) >= 300);
  assert.ok(estimateTokens("こんにちは世界".repeat(50)) >= 300);
  assert.ok(estimateTokens("한국어".repeat(100)) >= 250);
});

test("estimateTokens prices CJK inside structured messages the same way", () => {
  const messages = [{ role: "user", content: "日本語のテキスト".repeat(50) }];
  assert.ok(estimateTokens(messages) >= 400);
});

test("estimateTokens keeps the chars/4 estimate for non-CJK text", () => {
  assert.equal(estimateTokens("a".repeat(100)), 25);
  assert.equal(estimateTokens("naïve café ✓ ".repeat(10)), Math.ceil(130 / 4));
});

test("estimateTokens gives supplementary Han (Extension B) characters the CJK weight", () => {
  // U+20000 is one character but two UTF-16 units; both units are outside the BMP ranges.
  const extB = "\u{20000}".repeat(400);
  assert.ok(estimateTokens(extB) >= 300, `got ${estimateTokens(extB)}`);
  const messages = [{ role: "user", content: "\u{2A6D6}".repeat(400) }];
  assert.ok(estimateTokens(messages) >= 300);
});
