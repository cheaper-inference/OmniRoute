import { test } from "node:test";
import assert from "node:assert/strict";
import {
  smartFilterText,
  MCP_TEXT_TRUNCATION_HINT,
} from "@omniroute/open-sse/services/compression/engines/mcpAccessibility/index.ts";
import { DEFAULT_MCP_ACCESSIBILITY_CONFIG } from "@omniroute/open-sse/services/compression/engines/mcpAccessibility/constants.ts";

test("collapses ≥30 sibling buttons into head + summary + tail", () => {
  const lines = [];
  for (let i = 0; i < 50; i++) {
    lines.push(`  - button "Item ${i}" [ref=e${i}]`);
  }
  const input = lines.join("\n").padEnd(3000, " ");
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.ok(out.includes("Item 0"), "keeps head");
  assert.ok(out.includes("Item 49"), "keeps tail");
  assert.ok(out.includes('similar "button" items omitted'), "summarizes middle");
  assert.ok(out.length < input.length, "compressed");
});

test("preserves [ref=eXX] anchors during truncation", () => {
  const huge = '  - button "X" [ref=e123]\n' + "a".repeat(60000);
  const out = smartFilterText(huge, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.ok(out.includes("[ref=e123]"), "preserves refs even on truncate");
  assert.ok(out.length <= 50500, "respects maxTextChars + footer");
});

test('removes noise lines (- generic:, - text: "")', () => {
  const input = ['  - button "OK"', "  - generic:", '  - text: ""', '  - link "Sign in"']
    .join("\n")
    .padEnd(3000, " ");
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.ok(!out.includes("- generic:"), "drops generic noise");
  assert.ok(!out.match(/- text: ""/), "drops empty text noise");
  assert.ok(out.includes("button"), "keeps signal");
});

test("returns unchanged when below minLengthToProcess", () => {
  const small = "tiny";
  const out = smartFilterText(small, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.equal(out, small);
});

// JSON-aware truncation: an oversized JSON tool result must come back as VALID
// JSON (truncating the `content` field, not the raw text) so a caller can
// JSON.parse it and see the `truncated` flag + a generic pagination hint.

function bigJsonStringContent(size: number): string {
  // A realistic tool result shape: a string `content` field that must grow past
  // maxTextChars once the envelope overhead is added.
  return JSON.stringify({ found: true, content: "data ".repeat(Math.ceil(size / 5)) });
}

test("oversized JSON with a string content → valid JSON, truncated:true, generic hint", () => {
  const input = bigJsonStringContent(54000);
  assert.ok(input.length > 50000, "input must exceed maxTextChars");
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  let parsed: Record<string, unknown>;
  assert.doesNotThrow(() => {
    parsed = JSON.parse(out) as Record<string, unknown>;
  }, "output must still be valid JSON");
  assert.equal(parsed.found, true, "untouched fields are preserved");
  assert.equal(parsed.truncated, true, "truncated flag set");
  assert.equal(parsed.hint, MCP_TEXT_TRUNCATION_HINT, "generic hint carried on the object");
  assert.ok(
    typeof parsed.content === "string" && (parsed.content as string).length < 50000,
    "content field itself is truncated to a bounded size"
  );
});

test("oversized JSON with content[].text blocks → each block valid, truncated, hinted", () => {
  const blocks = [
    { type: "text", text: "data ".repeat(4000) },
    { type: "text", text: "data ".repeat(4000) },
    { type: "text", text: "data ".repeat(4000) },
  ];
  const input = JSON.stringify({ found: true, content: blocks });
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  let parsed: Record<string, unknown>;
  assert.doesNotThrow(() => {
    parsed = JSON.parse(out) as Record<string, unknown>;
  }, "output must still be valid JSON");
  assert.equal(parsed.truncated, true, "truncated flag set on the object");
  assert.equal(parsed.hint, MCP_TEXT_TRUNCATION_HINT, "generic hint carried on the object");
  const content = parsed.content as Array<Record<string, unknown>>;
  assert.ok(Array.isArray(content), "content stays an array");
  for (const block of content) {
    assert.equal(block.type, "text", "block shape preserved");
    assert.equal(block.truncated, true, "each block is marked truncated");
    assert.equal(block.hint, MCP_TEXT_TRUNCATION_HINT, "each block carries the generic hint");
    assert.ok(
      typeof block.text === "string" && (block.text as string).length > 0,
      "block text kept"
    );
  }
});

test("JSON with a mode field → the hint mentions the pagination modes", () => {
  assert.match(MCP_TEXT_TRUNCATION_HINT, /lines/i, "hint names the lines mode");
  assert.match(MCP_TEXT_TRUNCATION_HINT, /grep/i, "hint names the grep mode");
  const input = JSON.stringify({ found: true, mode: "lines", content: "data ".repeat(12000) });
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  const parsed = JSON.parse(out) as Record<string, unknown>;
  assert.equal(parsed.mode, "lines", "the mode field is preserved as-is");
  assert.equal(parsed.truncated, true);
  assert.equal(parsed.hint, MCP_TEXT_TRUNCATION_HINT);
});

test("JSON with mode:grep → still valid JSON, truncated, hint preserved", () => {
  const input = JSON.stringify({ found: true, mode: "grep", content: "line ".repeat(12000) });
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  let parsed: Record<string, unknown>;
  assert.doesNotThrow(() => {
    parsed = JSON.parse(out) as Record<string, unknown>;
  }, "output must still be valid JSON");
  assert.equal(parsed.mode, "grep", "the mode field is preserved as-is");
  assert.equal(parsed.found, true, "other fields untouched");
  assert.equal(parsed.truncated, true);
  assert.equal(parsed.hint, MCP_TEXT_TRUNCATION_HINT);
  assert.ok((parsed.content as string).length < 50000, "content bounded");
});

test("JSON without a content field → returned intact (not filtered)", () => {
  const input = JSON.stringify({ found: false, error: "x".repeat(60000) });
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.equal(out, input, "no truncatable content → the JSON is left untouched");
});

test("malformed JSON → falls back to the text path with the generic hint", () => {
  const input = '{"found": true, "content": "' + "data ".repeat(12000);
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.ok(out.length <= 50500, "still bounded by maxTextChars");
  assert.ok(out.includes(MCP_TEXT_TRUNCATION_HINT), "generic hint is used on the text path too");
  assert.ok(
    out.match(/truncated \d+ chars/),
    "keeps the truncated-N-chars form the clamp test pins"
  );
});

test("oversized non-JSON text → text path with the generic hint (no scroll/navigate)", () => {
  const input = "data ".repeat(11000); // 55000 chars, not JSON
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  assert.ok(out.length <= 50500, "bounded by maxTextChars");
  assert.ok(out.includes(MCP_TEXT_TRUNCATION_HINT), "generic hint present");
  assert.ok(!/scroll\/navigate/.test(out), "legacy scroll/navigate wording is gone");
});

test("54 145-char block (the real-world retrieve size) → valid JSON with the truncation marks", () => {
  // The production incident: a 54 145-char retrieve result was cut to 49 865 raw
  // chars and left an unparseable JSON (Unterminated string). The filter must now
  // return a parseable, bounded, flagged result.
  const inner = "data ".repeat(10824);
  const input = JSON.stringify({ found: true, content: inner });
  assert.ok(input.length >= 54145, `block must reach ~54 145 chars, got ${input.length}`);
  const out = smartFilterText(input, DEFAULT_MCP_ACCESSIBILITY_CONFIG);
  const parsed = JSON.parse(out) as Record<string, unknown>;
  assert.equal(parsed.truncated, true);
  assert.equal(parsed.hint, MCP_TEXT_TRUNCATION_HINT);
  assert.ok(typeof parsed.content === "string", "content remains a string");
  assert.ok((parsed.content as string).length < 50000, "content bounded");
});
