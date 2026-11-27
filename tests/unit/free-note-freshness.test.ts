import test from "node:test";
import assert from "node:assert/strict";
import { getProviderById } from "../../src/shared/constants/providers.ts";

const note = (id: string): string => getProviderById(id)?.freeNote ?? "";

test("kiro freeNote reflects the current 50-credit/month reality + ToS warning", () => {
  const n = note("kiro");
  assert.match(n, /50 credits\/month/i);
  assert.match(n, /ToS|proxy/i);
});

test("LongCat freeNote describes paid API billing", () => {
  // https://longcat.chat/platform/docs/change-log (2026-11-27).
  assert.match(note("longcat"), /balance top-ups or prepaid token packs/i);
  assert.doesNotMatch(note("longcat"), /(?:5M|10M).*tokens?/i);
});

test("cerebras freeNote reflects the $5 card-gated signup credit (#11773)", () => {
  const n = note("cerebras");
  assert.match(n, /\$5/);
  assert.match(n, /payment method|credit card/i);
  assert.equal(/1M tokens\/day|30K TPM/.test(n), false);
});
