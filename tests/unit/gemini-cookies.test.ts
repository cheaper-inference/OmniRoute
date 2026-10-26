// A pasted Gemini credential can be a bare PSID value, a full Cookie header, or a browser-export JSON
// (flat, or wrapped in a `cookies` object). normalizeGeminiCookieInput turns each into a `name=value;`
// header, and normalizeGeminiValidationCookie also strips a pasted `Cookie:` prefix and returns null
// unless the result carries a non-empty __Secure-1PSID. All values below are obvious placeholders.
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  normalizeGeminiCookieInput,
  normalizeGeminiValidationCookie,
} from "../../open-sse/utils/geminiCookies.ts";

test("a bare value becomes the default PSID cookie, and a custom name is honoured", () => {
  assert.equal(normalizeGeminiCookieInput("  FAKE-PSID-VALUE  "), "__Secure-1PSID=FAKE-PSID-VALUE");
  assert.equal(normalizeGeminiCookieInput("FAKE", "OTHER"), "OTHER=FAKE");
});

test("empty and blank input stay empty", () => {
  assert.equal(normalizeGeminiCookieInput(""), "");
  assert.equal(normalizeGeminiCookieInput("   "), "");
});

test("a value that already holds a pair is kept as pasted", () => {
  assert.equal(normalizeGeminiCookieInput("a=1; b=2"), "a=1; b=2");
});

test("a flat JSON export becomes a cookie header, skipping blank and non-string values", () => {
  const raw = JSON.stringify({
    "__Secure-1PSID": " FAKE-1 ",
    "__Secure-1PSIDTS": "FAKE-2",
    empty: "  ",
    n: 5,
  });
  assert.equal(normalizeGeminiCookieInput(raw), "__Secure-1PSID=FAKE-1; __Secure-1PSIDTS=FAKE-2");
});

test("a JSON export wrapped in a cookies object is unwrapped", () => {
  const raw = JSON.stringify({ cookies: { "__Secure-1PSID": "FAKE-1" }, other: "ignored" });
  assert.equal(normalizeGeminiCookieInput(raw), "__Secure-1PSID=FAKE-1");
});

test("invalid or valueless JSON falls back to the bare-value rule", () => {
  assert.equal(normalizeGeminiCookieInput("{not json"), "__Secure-1PSID={not json");
  assert.equal(normalizeGeminiCookieInput('{"a":""}'), '__Secure-1PSID={"a":""}');
});

test("validation strips a Cookie: prefix and keeps a header that carries the PSID", () => {
  assert.equal(
    normalizeGeminiValidationCookie("Cookie: __Secure-1PSID=FAKE-1; other=2"),
    "__Secure-1PSID=FAKE-1; other=2"
  );
  assert.equal(normalizeGeminiValidationCookie("FAKE-BARE"), "__Secure-1PSID=FAKE-BARE");
});

test("validation returns null when the PSID is missing or empty", () => {
  assert.equal(normalizeGeminiValidationCookie("other=2; another=3"), null);
  assert.equal(normalizeGeminiValidationCookie("__Secure-1PSID=; other=2"), null);
  assert.equal(normalizeGeminiValidationCookie("   "), null);
});

test("the PSID name is matched without regard to case", () => {
  assert.equal(normalizeGeminiValidationCookie("__secure-1psid=FAKE-1"), "__secure-1psid=FAKE-1");
});
