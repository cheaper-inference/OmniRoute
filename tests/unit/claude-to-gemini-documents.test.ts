// A Claude `document` block (PDF etc.) must reach Gemini: base64 becomes an
// inlineData part, an HTTPS URL becomes fileData, a text source becomes text.
// Before the fix the block was dropped in user turns and JSON.stringify'd as
// text inside tool_result (the whole base64 PDF as a text context part).
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");

type Part = Record<string, unknown> & {
  text?: string;
  inlineData?: { mimeType: string; data: string };
  fileData?: { fileUri: string; mimeType: string };
};
type Out = { contents: Array<{ role: string; parts: Part[] }> };

function toGemini(content: unknown): Out {
  const r = claudeToGeminiRequest(
    "gemini-2.5-pro",
    { messages: [{ role: "user", content }] },
    false
  );
  return r as unknown as Out;
}

const base64Document = {
  type: "document",
  source: { type: "base64", media_type: "application/pdf", data: "JVBERi0xLjQ=" },
};

function allParts(out: Out): Part[] {
  return out.contents.flatMap((c) => c.parts);
}

test("user-turn document block reaches Gemini as inlineData", () => {
  const out = toGemini([base64Document, { type: "text", text: "summarise" }]);
  const doc = allParts(out).find((p) => p.inlineData?.data === "JVBERi0xLjQ=");
  assert.ok(doc, JSON.stringify(allParts(out)));
  assert.equal(doc!.inlineData!.mimeType, "application/pdf");
  assert.ok(allParts(out).some((p) => p.text === "summarise"));
});

test("document inside tool_result is attached, not JSON-stringified as text", () => {
  const out = toGemini([{ type: "tool_result", tool_use_id: "t", content: [base64Document] }]);
  const parts = allParts(out);
  const textual = parts.filter((p) => p.text !== undefined || p.functionResponse !== undefined);
  assert.ok(
    !JSON.stringify(textual).includes("JVBERi0xLjQ="),
    "base64 leaked as text: " + JSON.stringify(textual)
  );
  assert.ok(
    parts.some((p) => p.inlineData?.data === "JVBERi0xLjQ="),
    JSON.stringify(parts)
  );
});

test("document with an HTTPS url source becomes fileData", () => {
  const out = toGemini([
    { type: "document", source: { type: "url", url: "https://example.com/doc.pdf" } },
  ]);
  const doc = allParts(out).find((p) => p.fileData?.fileUri === "https://example.com/doc.pdf");
  assert.ok(doc, JSON.stringify(allParts(out)));
  assert.equal(doc!.fileData!.mimeType, "application/pdf");
});

test("document with a text source becomes a text part", () => {
  const out = toGemini([
    { type: "document", source: { type: "text", media_type: "text/plain", data: "release notes" } },
  ]);
  assert.ok(
    allParts(out).some((p) => p.text === "release notes"),
    JSON.stringify(allParts(out))
  );
});
