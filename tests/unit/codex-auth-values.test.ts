import assert from "node:assert/strict";
import test from "node:test";
import {
  decodeJwtPayload,
  toNonEmptyString,
  toRecord,
} from "../../src/lib/oauth/utils/codexAuthValues.ts";

test("preserves object identity and rejects non-record values", () => {
  const value = { account_id: "test-account" };
  assert.equal(toRecord(value), value);
  for (const invalid of [null, undefined, [], "value", 0, false])
    assert.deepEqual(toRecord(invalid), {});
});

test("trims only nonempty strings", () => {
  assert.equal(toNonEmptyString("  account  "), "account");
  for (const invalid of [null, undefined, "", " \n ", 42, {}, []])
    assert.equal(toNonEmptyString(invalid), null);
});

test("decodes payload claims without interpreting the header or signature", () => {
  const payload = { email: "test@example.invalid", exp: 123, label: "ü" };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  assert.deepEqual(decodeJwtPayload(`header.${encoded}.signature`), payload);
});

test("distinguishes malformed payloads from valid non-object JSON", () => {
  for (const invalid of ["", "one.two", "a.b.c.d", "a.!.c", "a..c"])
    assert.equal(decodeJwtPayload(invalid), null);
  for (const payload of [null, [], "text", 42, true]) {
    const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
    assert.deepEqual(decodeJwtPayload(`a.${encoded}.c`), {});
  }
});
