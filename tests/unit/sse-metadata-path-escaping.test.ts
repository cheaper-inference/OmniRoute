// Metadata paths are joined with "/", so a key that itself contains one has to be escaped or it
// would forge a different path and share another field's redaction window.
import test from "node:test";
import assert from "node:assert/strict";

import { escapePathSegment } from "../../src/lib/sseTextTransform.ts";

test("a key containing a slash cannot forge a nested path", () => {
  const flat = escapePathSegment("a/b");
  const nested = `${escapePathSegment("a")}/${escapePathSegment("b")}`;
  assert.notEqual(flat, nested);
  assert.equal(flat, "a~1b");
});

test("a key containing the escape character round-trips unambiguously", () => {
  assert.equal(escapePathSegment("a~b"), "a~0b");
  assert.notEqual(escapePathSegment("a~1b"), escapePathSegment("a/b"));
});
