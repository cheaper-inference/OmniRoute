import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-unsigned-err-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Part = { text?: string; functionResponse?: unknown };

// No stored Gemini signature for tu1: the history is "signature-less" and a tool result becomes
// context text (the usual case for a Claude-format history).
function partsFor(toolResult: Record<string, unknown>): Part[] {
  const out = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        { role: "assistant", content: [{ type: "tool_use", id: "tu1", name: "Bash", input: {} }] },
        { role: "user", content: [{ type: "tool_result", tool_use_id: "tu1", ...toolResult }] },
      ],
    },
    false,
    { _signatureNamespace: "unsigned-error-ns" }
  ) as { contents: Array<{ parts: Part[] }> };
  return out.contents.flatMap((c) => c.parts);
}

test("a failed tool result in signature-less history keeps a failure marker", () => {
  const text = partsFor({ content: "boom", is_error: true })
    .map((p) => p.text ?? "")
    .join("\n");
  assert.match(text, /\[tool_error: true\]/);
  assert.match(text, /boom/);
});

test("a successful tool result carries no failure marker", () => {
  const text = partsFor({ content: "fine" })
    .map((p) => p.text ?? "")
    .join("\n");
  assert.doesNotMatch(text, /tool_error/);
  assert.match(text, /fine/);
  assert.match(
    partsFor({ content: "fine", is_error: false })
      .map((p) => p.text ?? "")
      .join("\n"),
    /fine/
  );
});
