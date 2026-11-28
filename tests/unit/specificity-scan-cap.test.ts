import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  detectCodeComplexity,
  detectDomainSpecificity,
  detectContextSize,
} from "../../open-sse/services/specificityRules.ts";

// The classifier must read a bounded slice of the history: one request with a long history
// otherwise costs a full regex pass over every message. The slice is the newest 100,000
// characters, and the last user turn is always in it.
const LEGAL = "pursuant statute liability jurisdiction hereby";
const MEDICAL = "diagnosis symptoms treatment patient clinical";
const filler = (n: number): string => "a".repeat(n);

describe("classifier scan cap", () => {
  test("a signal older than the newest 100,000 characters is not scanned", () => {
    const score = detectDomainSpecificity({
      messages: [
        { role: "user", content: `${LEGAL} ${filler(60_000)}` },
        { role: "assistant", content: filler(60_000) },
        { role: "user", content: "hello" },
      ],
    });
    assert.equal(score, 0);
  });

  test("a signal inside the newest 100,000 characters is still scanned", () => {
    const score = detectDomainSpecificity({
      messages: [
        { role: "user", content: filler(60_000) },
        { role: "assistant", content: `${LEGAL} ${filler(20_000)}` },
        { role: "user", content: "hello" },
      ],
    });
    assert.equal(score, 10); // five legal terms x 2, capped at 10
  });

  test("the last user turn is kept when later messages would fill the whole cap", () => {
    const score = detectDomainSpecificity({
      messages: [
        { role: "user", content: MEDICAL },
        { role: "tool", content: filler(150_000) },
      ],
    });
    assert.equal(score, 10);
  });

  test("a code fence in a huge last user turn is still counted from its newest part", () => {
    const fence = "```js\nconst a = 1;\n```";
    const score = detectCodeComplexity({
      messages: [{ role: "user", content: `${filler(300_000)}\n${fence}` }],
    });
    assert.ok(score >= 5, `expected the fence to count, got ${score}`);
  });

  test("context size still measures the whole history, not the scanned slice", () => {
    const score = detectContextSize({
      messages: [
        { role: "user", content: filler(200_000) },
        { role: "assistant", content: filler(200_000) },
        { role: "user", content: "hello" },
      ],
    });
    assert.equal(score, 15); // about 100,000 estimated tokens: above the 64,000 band
  });
});
