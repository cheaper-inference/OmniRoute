import assert from "node:assert/strict";
import test from "node:test";

import { matchAdobeForterTimestamp } from "../../open-sse/services/adobeFireflySecurity.ts";

const MS = 1761600000000; // 2025-10-27

test("legacy delimited forter token still parses", () => {
  assert.equal(matchAdobeForterTimestamp(`ftr_${MS}__UDF43_9cc`), MS);
});

test("modern undelimited colligo token parses", () => {
  assert.equal(matchAdobeForterTimestamp(`UDF43-${MS}-v2_tt`), MS);
  assert.equal(matchAdobeForterTimestamp(String(MS)), MS);
});

test("does not match digits inside a longer run", () => {
  assert.equal(matchAdobeForterTimestamp(`x${MS}9`), 0);
  assert.equal(matchAdobeForterTimestamp("12345678901234567"), 0);
});

test("rejects out-of-range undelimited values and short values", () => {
  assert.equal(matchAdobeForterTimestamp("prefix-1000000000000-suffix"), 0);
  assert.equal(matchAdobeForterTimestamp("_176160000000__"), 0);
  assert.equal(matchAdobeForterTimestamp(""), 0);
});

test("legacy marker takes priority over an earlier unrelated timestamp", () => {
  assert.equal(matchAdobeForterTimestamp(`id-1700000000000-ftr_${MS}__UDF43`), MS);
});

test("preserves the legacy 13-digit range outside the fallback window", () => {
  assert.equal(matchAdobeForterTimestamp("ftr_1000000000000__UDF43"), 1000000000000);
  assert.equal(matchAdobeForterTimestamp("ftr_2000000000000__UDF43"), 2000000000000);
});

test("bounded fallback includes both endpoints without matching adjacent digits", () => {
  for (const ms of [1600000000000, 1999999999999]) {
    assert.equal(matchAdobeForterTimestamp(`prefix-${ms}-suffix`), ms);
    assert.equal(matchAdobeForterTimestamp(`prefix-9${ms}-suffix`), 0);
    assert.equal(matchAdobeForterTimestamp(`prefix-${ms}9-suffix`), 0);
  }
  assert.equal(matchAdobeForterTimestamp("prefix-1599999999999-suffix"), 0);
  assert.equal(matchAdobeForterTimestamp("prefix-2000000000000-suffix"), 0);
});

test("pattern is stateless across calls", () => {
  assert.equal(matchAdobeForterTimestamp(`a_${MS}__`), MS);
  assert.equal(matchAdobeForterTimestamp(`prefix-${MS}-suffix`), MS);
  assert.equal(matchAdobeForterTimestamp(`a_${MS}__`), MS);
});
