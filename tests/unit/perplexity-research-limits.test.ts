// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

const { clampResearchResult, LIMITS } =
  await import("../../open-sse/mcp-server/tools/perplexityResearchLimits.ts");

function parsed(report, citations) {
  return { outcome: "success", report, citations, warnings: [] };
}

test("a report over 256 KiB is cut on a paragraph boundary", () => {
  const paragraph = "a".repeat(4000);
  const report = Array.from({ length: 400 }, () => paragraph).join("\n\n");
  const out = clampResearchResult(parsed(report, []));
  assert.equal(out.truncated, true);
  assert.ok(out.report.length <= LIMITS.reportChars);
  assert.ok(out.report.endsWith(paragraph));
});

test("citations past 100 are dropped whole, never sliced mid entry", () => {
  const citations = Array.from({ length: 130 }, (_, i) => ({
    name: `source ${i}`,
    url: `https://example.test/${i}`,
    snippet: "s".repeat(3000),
  }));
  const out = clampResearchResult(parsed("body", citations));
  assert.equal(out.citations.length, 100);
  assert.equal(out.citations[99].url, "https://example.test/99");
  assert.equal(out.truncated, true);
});

test("the clamped json stays within 512 KiB", () => {
  const citations = Array.from({ length: 100 }, () => ({
    name: "n".repeat(2000),
    url: "https://example.test/" + "u".repeat(4000),
    snippet: "s".repeat(8000),
  }));
  const out = clampResearchResult(parsed("r".repeat(300 * 1024), citations));
  const size = Buffer.byteLength(JSON.stringify(out), "utf8");
  assert.ok(size <= LIMITS.responseChars, `json is ${size} bytes`);
});
