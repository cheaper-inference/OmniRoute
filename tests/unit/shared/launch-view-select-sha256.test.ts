import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import { sha256Hex } from "../../../src/shared/launch/viewSelect.ts";

/** Reference digest over the same UTF-8 bytes Node produces (lone surrogates become U+FFFD). */
const nodeSha = (text: string): string =>
  createHash("sha256").update(Buffer.from(text, "utf8")).digest("hex");

const CASES: Array<[string, string]> = [
  ["empty", ""],
  ["abc", "abc"],
  ["1000 chars", "x".repeat(1000)],
  ["55 bytes (padding fits one block)", "a".repeat(55)],
  ["56 bytes (padding spills a block)", "a".repeat(56)],
  ["64 bytes (exactly one block)", "a".repeat(64)],
  ["1 byte chars", "hello, world"],
  ["2 byte chars", "café ñ ß ߿"],
  ["3 byte chars", "ࠀ € 中文 ￿"],
  ["4 byte chars", "\u{1f600} \u{10000} \u{10ffff}"],
  ["lone high surrogate", "a\ud800b"],
  ["lone low surrogate", "a\udc00b"],
  ["trailing high surrogate", "end\ud83d"],
  ["reversed pair", "\ude00\ud83d"],
  ["mixed", "id/é€\u{1f680}\ud800" + "z".repeat(200)],
];

for (const [name, text] of CASES) {
  test(`sha256Hex matches node:crypto: ${name}`, () => {
    assert.equal(sha256Hex(text), nodeSha(text));
  });
}

test("sha256Hex known vectors", () => {
  assert.equal(sha256Hex(""), "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
  assert.equal(
    sha256Hex("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
  );
});

test("lone surrogates hash as U+FFFD, like TextEncoder", () => {
  assert.equal(sha256Hex("a\ud800b"), sha256Hex("a�b"));
  assert.equal(sha256Hex("\udfff"), sha256Hex("�"));
});
