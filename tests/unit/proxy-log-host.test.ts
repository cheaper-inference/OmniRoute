// Proxy log writes and (host, port) lookups share one host normalisation: trim, strip exactly one
// pair of surrounding brackets from an IPv6 literal, trim again and lowercase. Anything that is not a
// non-empty string normalises to null so readers can fall back to their previous behaviour.
import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeProxyHostForLog } from "../../src/lib/proxyLogHost.ts";

test("a host is trimmed and lowercased", () => {
  assert.equal(normalizeProxyHostForLog("  Proxy.Example.COM  "), "proxy.example.com");
  assert.equal(normalizeProxyHostForLog("10.0.0.1"), "10.0.0.1");
});

test("one pair of brackets around an IPv6 literal is removed", () => {
  assert.equal(normalizeProxyHostForLog("[2001:DB8::1]"), "2001:db8::1");
  assert.equal(normalizeProxyHostForLog("  [::1]  "), "::1");
});

test("whitespace inside the brackets is trimmed too", () => {
  assert.equal(normalizeProxyHostForLog("[ ::1 ]"), "::1");
});

test("only exactly one pair of brackets is removed", () => {
  assert.equal(normalizeProxyHostForLog("[[::1]]"), "[::1]");
});

test("a lone bracket or an unbalanced pair is kept as is", () => {
  assert.equal(normalizeProxyHostForLog("[::1"), "[::1");
  assert.equal(normalizeProxyHostForLog("::1]"), "::1]");
});

test("a pair of brackets with nothing inside is not unwrapped", () => {
  assert.equal(normalizeProxyHostForLog("[]"), "[]");
});

test("brackets that hold only whitespace, and blank strings, normalise to null", () => {
  assert.equal(normalizeProxyHostForLog("[  ]"), null);
  assert.equal(normalizeProxyHostForLog(""), null);
  assert.equal(normalizeProxyHostForLog("   "), null);
});

test("anything that is not a string normalises to null", () => {
  for (const value of [null, undefined, 42, true, {}, ["host"]]) {
    assert.equal(normalizeProxyHostForLog(value), null, String(value));
  }
});
