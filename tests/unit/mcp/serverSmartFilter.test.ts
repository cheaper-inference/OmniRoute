import { test, before } from "node:test";
import assert from "node:assert/strict";
import { getMcpAccessibilityConfig, setMcpAccessibilityConfig } from "@/lib/db/compression";
import {
  smartFilterText,
  propagateTruncationToStructuredContent,
  MCP_TEXT_TRUNCATION_HINT,
} from "@omniroute/open-sse/services/compression/engines/mcpAccessibility/index.ts";
import { DEFAULT_MCP_ACCESSIBILITY_CONFIG } from "@omniroute/open-sse/services/compression/engines/mcpAccessibility/constants.ts";

// The server wrapper filters each `content[].text` via smartFilterText. If the
// result ALSO carries a `structuredContent` object, the two views must not diverge:
// a JSON-truncated text (flagged `truncated:true`) must flag structuredContent too.
// `isError` is never touched by the filter.

type Block = { type: "text"; text: string };
type ToolResult = {
  content: Block[];
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
};

function applyServerFilter(result: ToolResult): ToolResult {
  // Mirrors the open-sse/mcp-server/server.ts wrapper: filter the text blocks, then
  // propagate the JSON-truncation mark to structuredContent.
  const filtered: ToolResult = {
    ...result,
    content: result.content.map((block) => ({
      ...block,
      text: smartFilterText(block.text, DEFAULT_MCP_ACCESSIBILITY_CONFIG),
    })),
  };
  return propagateTruncationToStructuredContent(filtered);
}

function bigJsonText(size: number): string {
  return JSON.stringify({ found: true, content: "data ".repeat(Math.ceil(size / 5)) });
}

before(async () => {
  // Reset to defaults before each test suite
  await setMcpAccessibilityConfig({
    enabled: true,
    maxTextChars: 50000,
    collapseThreshold: 30,
    collapseKeepHead: 10,
    collapseKeepTail: 5,
    minLengthToProcess: 2000,
  });
});

test("config defaults are returned when DB has default values", async () => {
  const cfg = await getMcpAccessibilityConfig();
  assert.equal(cfg.enabled, true);
  assert.equal(cfg.maxTextChars, 50000);
  assert.equal(cfg.collapseThreshold, 30);
  assert.equal(cfg.collapseKeepHead, 10);
  assert.equal(cfg.collapseKeepTail, 5);
  assert.equal(cfg.minLengthToProcess, 2000);
});

test("setMcpAccessibilityConfig clamps invalid maxTextChars to default", async () => {
  await setMcpAccessibilityConfig({ maxTextChars: -1 });
  const cfg = await getMcpAccessibilityConfig();
  assert.equal(cfg.maxTextChars, 50000);
});

test("setMcpAccessibilityConfig clamps invalid collapseThreshold to default", async () => {
  await setMcpAccessibilityConfig({ collapseThreshold: 0 });
  const cfg = await getMcpAccessibilityConfig();
  assert.equal(cfg.collapseThreshold, 30);
});

test("setMcpAccessibilityConfig persists valid custom values", async () => {
  await setMcpAccessibilityConfig({ maxTextChars: 25000, collapseThreshold: 15 });
  const cfg = await getMcpAccessibilityConfig();
  assert.equal(cfg.maxTextChars, 25000);
  assert.equal(cfg.collapseThreshold, 15);
});

test("structuredContent mirrors the JSON-truncated text mark (no divergence)", () => {
  const text = bigJsonText(54000);
  const result = applyServerFilter({
    content: [{ type: "text", text }],
    structuredContent: { found: true, content: "full body".repeat(2000) },
  });
  const parsedText = JSON.parse(result.content[0].text) as Record<string, unknown>;
  assert.equal(parsedText.truncated, true, "the filtered text is flagged truncated");
  assert.ok(result.structuredContent, "structuredContent survives the filter");
  assert.equal(
    (result.structuredContent as Record<string, unknown>).truncated,
    true,
    "structuredContent carries the same truncated mark"
  );
  assert.equal(
    (result.structuredContent as Record<string, unknown>).hint,
    MCP_TEXT_TRUNCATION_HINT,
    "structuredContent carries the same generic hint"
  );
});

test("isError is preserved while structuredContent is flagged", () => {
  const text = bigJsonText(54000);
  const result = applyServerFilter({
    content: [{ type: "text", text }],
    structuredContent: { error: "upstream failed" },
    isError: true,
  });
  assert.equal(result.isError, true, "isError must survive the filter untouched");
  assert.equal(
    (result.structuredContent as Record<string, unknown>).truncated,
    true,
    "structuredContent still flagged when the result is an error"
  );
});

test("text-path (non-JSON) truncation does NOT flag structuredContent", () => {
  const text = "data ".repeat(11000); // 55000 chars, not JSON
  const result = applyServerFilter({
    content: [{ type: "text", text }],
    structuredContent: { page: 1 },
  });
  assert.equal(
    (result.structuredContent as Record<string, unknown>).truncated,
    undefined,
    "a non-JSON text path leaves structuredContent unflagged"
  );
});

test("no structuredContent → propagation is a no-op, text still filtered", () => {
  const text = bigJsonText(54000);
  const result = propagateTruncationToStructuredContent({
    content: [{ type: "text", text: smartFilterText(text, DEFAULT_MCP_ACCESSIBILITY_CONFIG) }],
  });
  assert.equal(result.structuredContent, undefined);
  const parsedText = JSON.parse(result.content[0].text) as Record<string, unknown>;
  assert.equal(parsedText.truncated, true, "text filter still applies on its own");
});
