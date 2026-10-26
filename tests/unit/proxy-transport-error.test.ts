// A transport failure is rethrown as a fresh error that keeps only allowlisted fields: the message the
// caller supplies (never the source's), a code made of upper-case letters, digits, underscores, colons
// and dashes (otherwise the fallback code), the cause code under the same rule, a short errorCode and
// a finite numeric statusCode. No URL, credential token or free-form message can ride along.
import { test } from "node:test";
import assert from "node:assert/strict";

import { sanitizeTransportError } from "../../open-sse/utils/proxyTransportError.ts";

test("the message is the caller's and the source message is dropped", () => {
  const source = Object.assign(new Error("connect to https://user:secret@host failed"), {
    code: "ECONNREFUSED",
  });
  const result = sanitizeTransportError(source, "upstream unreachable", "FALLBACK");
  assert.ok(result instanceof Error);
  assert.equal(result.message, "upstream unreachable");
  assert.equal(result.code, "ECONNREFUSED");
});

test("a code outside the allowlist, or a non-string code, becomes the fallback", () => {
  assert.equal(sanitizeTransportError({ code: "econnrefused" }, "m", "FALLBACK").code, "FALLBACK");
  assert.equal(sanitizeTransportError({ code: "BAD CODE" }, "m", "FALLBACK").code, "FALLBACK");
  assert.equal(sanitizeTransportError({ code: 12 }, "m", "FALLBACK").code, "FALLBACK");
  assert.equal(sanitizeTransportError({ code: "A".repeat(65) }, "m", "FALLBACK").code, "FALLBACK");
  assert.equal(
    sanitizeTransportError({ code: "A".repeat(64) }, "m", "FALLBACK").code,
    "A".repeat(64)
  );
});

test("a non-object error yields the fallback code and no optional field", () => {
  for (const value of [null, undefined, "boom", 7]) {
    const result = sanitizeTransportError(value, "m", "FALLBACK");
    assert.equal(result.code, "FALLBACK", String(value));
    assert.equal("causeCode" in result, false);
    assert.equal("errorCode" in result, false);
    assert.equal("statusCode" in result, false);
  }
});

test("the cause code is kept only when it is allowlisted", () => {
  assert.equal(
    sanitizeTransportError({ cause: { code: "ENOTFOUND" } }, "m", "F").causeCode,
    "ENOTFOUND"
  );
  assert.equal(
    "causeCode" in sanitizeTransportError({ cause: { code: "not ok" } }, "m", "F"),
    false
  );
  assert.equal("causeCode" in sanitizeTransportError({ cause: "text" }, "m", "F"), false);
});

test("errorCode is kept only when it is a short word of safe characters", () => {
  assert.equal(
    sanitizeTransportError({ errorCode: "rate_limit:daily-1" }, "m", "F").errorCode,
    "rate_limit:daily-1"
  );
  assert.equal("errorCode" in sanitizeTransportError({ errorCode: "has space" }, "m", "F"), false);
  assert.equal(
    "errorCode" in sanitizeTransportError({ errorCode: "x".repeat(65) }, "m", "F"),
    false
  );
  assert.equal("errorCode" in sanitizeTransportError({ errorCode: 5 }, "m", "F"), false);
});

test("statusCode is kept only when it is a finite number", () => {
  assert.equal(sanitizeTransportError({ statusCode: 502 }, "m", "F").statusCode, 502);
  assert.equal("statusCode" in sanitizeTransportError({ statusCode: Number.NaN }, "m", "F"), false);
  assert.equal("statusCode" in sanitizeTransportError({ statusCode: Infinity }, "m", "F"), false);
  assert.equal("statusCode" in sanitizeTransportError({ statusCode: "502" }, "m", "F"), false);
});
