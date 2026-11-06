import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { smartTruncate } from "../../../open-sse/services/compression/engines/rtk/smartTruncate.ts";

describe("RTK smart truncate", () => {
  it("leaves short text unchanged", () => {
    const result = smartTruncate("short\ntext", { maxLines: 10 });
    assert.equal(result.truncated, false);
    assert.equal(result.text, "short\ntext");
  });

  it("preserves head, tail and priority lines", () => {
    const text = Array.from({ length: 20 }, (_, index) =>
      index === 10 ? "ERROR important failure" : `line ${index}`
    ).join("\n");
    const result = smartTruncate(text, {
      maxLines: 8,
      preserveHead: 2,
      preserveTail: 2,
      priorityPatterns: [/ERROR/],
    });

    assert.equal(result.truncated, true);
    assert.ok(result.text.includes("line 0"));
    assert.ok(result.text.includes("ERROR important failure"));
    assert.ok(result.text.includes("line 19"));
    assert.ok(result.text.includes("[rtk:truncated"));
  });

  it("respects maxChars as alternate limit", () => {
    const result = smartTruncate("x".repeat(500), { maxChars: 80 });
    assert.equal(result.truncated, true);
    assert.ok(result.text.length <= 80);
  });

  it("respects maxChars when the marker consumes the full char budget", () => {
    const result = smartTruncate("x".repeat(500), { maxChars: 10 });

    assert.equal(result.truncated, true);
    assert.ok(result.text.length <= 10);
  });

  // Char cap cut whole lines only, and the marker must name what was really dropped: a
  // `[rtk:truncated 0 lines]` next to a halved grep result is worse than no marker at all.
  it("reports the real dropped count and never cuts a line in half when maxChars binds", () => {
    const lines = Array.from(
      { length: 400 },
      (_, i) => `src/lib/queue${i}.ts:${i * 3}:export function fn${i}(wid: string): Result`
    );
    const result = smartTruncate(lines.join("\n"), {
      maxLines: 300,
      maxChars: 12000,
      preserveHead: 200,
      preserveTail: 100,
      priorityPatterns: [/export/], // matches every line: must not claim 0 dropped
    });
    const out = result.text.split("\n");

    assert.equal(result.truncated, true);
    assert.ok(result.text.length <= 12000);
    for (const line of out) {
      if (line === "" || line.startsWith("[rtk:")) continue;
      assert.ok(lines.includes(line), `partial line survived the cut: ${JSON.stringify(line)}`);
    }
    assert.match(result.text, /\[rtk:truncated/);
    assert.doesNotMatch(result.text, /truncated 0 lines/);
    assert.ok(result.droppedLines > 100, `claims ${result.droppedLines} dropped lines`);
  });
});
