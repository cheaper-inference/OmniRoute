/**
 * Claude `document` blocks (base64 PDFs sent by Claude Code and other Claude-format
 * clients) must survive the Claude → OpenAI hub translation. Without a `document`
 * case the block was dropped silently, so every non-Claude target — Antigravity,
 * Gemini, OpenAI-compatible providers — answered without ever seeing the file.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");
await import("../../open-sse/translator/bootstrap.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

type Part = Record<string, unknown> & { type?: string };
type Message = { role: string; content: unknown; tool_call_id?: string };

const PDF_B64 = Buffer.from("%PDF-1.4 fake document body").toString("base64");
const PDF_DATA_URI = `data:application/pdf;base64,${PDF_B64}`;

function pdfDocument(extra: Record<string, unknown> = {}) {
  return {
    type: "document",
    source: { type: "base64", media_type: "application/pdf", data: PDF_B64 },
    ...extra,
  };
}

function translate(messages: unknown[], credentials: unknown = null) {
  return claudeToOpenAIRequest("gpt-4o", { messages }, false, credentials) as {
    messages: Message[];
  };
}

function userParts(result: { messages: Message[] }): Part[] {
  const user = result.messages.filter((m) => m.role === "user").at(-1);
  assert.ok(user, "expected a user message");
  assert.ok(Array.isArray(user.content), "expected array content on the user message");
  return user.content as Part[];
}

test("base64 PDF document becomes an OpenAI file part with a data URI", () => {
  const result = translate([
    {
      role: "user",
      content: [{ type: "text", text: "Summarise this PDF." }, pdfDocument()],
    },
  ]);
  const parts = userParts(result);
  assert.equal(parts.length, 2);
  assert.deepEqual(parts[0], { type: "text", text: "Summarise this PDF." });
  assert.equal(parts[1].type, "file");
  assert.deepEqual(parts[1].file, { file_data: PDF_DATA_URI });
});

test("document title is carried as the file name", () => {
  const parts = userParts(
    translate([
      {
        role: "user",
        content: [{ type: "text", text: "Read it" }, pdfDocument({ title: "spec.pdf" })],
      },
    ])
  );
  assert.deepEqual(parts[1].file, { file_data: PDF_DATA_URI, filename: "spec.pdf" });
});

test("base64 document without media_type defaults to application/pdf", () => {
  const parts = userParts(
    translate([
      {
        role: "user",
        content: [
          { type: "text", text: "Read it" },
          { type: "document", source: { type: "base64", data: PDF_B64 } },
        ],
      },
    ])
  );
  assert.deepEqual(parts[1].file, { file_data: PDF_DATA_URI });
});

test("plain-text document becomes a text part carrying the document text", () => {
  const result = translate([
    {
      role: "user",
      content: [
        {
          type: "document",
          title: "notes.txt",
          source: { type: "text", media_type: "text/plain", data: "The launch is on Tuesday." },
        },
      ],
    },
  ]);
  const user = result.messages.find((m) => m.role === "user");
  assert.ok(user);
  const text =
    typeof user.content === "string"
      ? user.content
      : (user.content as Part[]).map((p) => p.text).join("\n");
  assert.match(text, /notes\.txt/);
  assert.match(text, /The launch is on Tuesday\./);
});

test("URL document is kept as a text reference instead of being dropped", () => {
  const url = "https://example.com/report.pdf";
  const parts = userParts(
    translate([
      {
        role: "user",
        content: [
          { type: "text", text: "Read it" },
          { type: "document", source: { type: "url", url } },
        ],
      },
    ])
  );
  assert.equal(parts.length, 2);
  assert.equal(parts[1].type, "text");
  assert.match(String(parts[1].text), /https:\/\/example\.com\/report\.pdf/);
});

test("cache_control on a document survives only when preservation is requested", () => {
  const cache_control = { type: "ephemeral" };
  const messages = [
    { role: "user", content: [{ type: "text", text: "Read it" }, pdfDocument({ cache_control })] },
  ];
  const kept = userParts(translate(messages, { _preserveCacheControl: true }));
  assert.deepEqual(kept[1].cache_control, cache_control);
  const dropped = userParts(translate(messages));
  assert.equal(dropped[1].cache_control, undefined);
});

test("document returned inside a tool_result is lifted into a following user file part", () => {
  const result = translate([
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "tool-doc", name: "fetch_pdf", input: {} }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "tool-doc", content: [pdfDocument()] }],
    },
  ]);
  const toolMsg = result.messages.find((m) => m.role === "tool");
  assert.ok(toolMsg, "expected a tool message");
  assert.equal(toolMsg.tool_call_id, "tool-doc");
  assert.equal(typeof toolMsg.content, "string");
  assert.ok(
    !String(toolMsg.content).includes(PDF_B64),
    "base64 must not be stringified into the tool message"
  );
  const parts = userParts(result);
  const file = parts.find((p) => p.type === "file");
  assert.ok(file, "expected the document lifted as a user file part");
  assert.deepEqual(file.file, { file_data: PDF_DATA_URI });
});

test("Claude → Antigravity keeps the PDF as Gemini inlineData", () => {
  const body = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.ANTIGRAVITY,
    "gemini-3-pro",
    {
      model: "gemini-3-pro",
      max_tokens: 1024,
      messages: [
        { role: "user", content: [{ type: "text", text: "Summarise this PDF." }, pdfDocument()] },
      ],
    },
    false,
    { projectId: "test-project" },
    null,
    "antigravity"
  ) as { request: { contents: Array<{ parts: Array<Record<string, unknown>> }> } };
  const parts = body.request.contents.flatMap((c) => c.parts);
  const inline = parts.find((p) => p.inlineData) as
    { inlineData: { mimeType: string; data: string } } | undefined;
  assert.ok(inline, `expected an inlineData part, got ${JSON.stringify(parts)}`);
  assert.equal(inline.inlineData.mimeType, "application/pdf");
  assert.equal(inline.inlineData.data, PDF_B64);
});

test("the OpenAI-format filter keeps the emitted file part intact", async () => {
  const { filterToOpenAIFormat } =
    await import("../../open-sse/translator/helpers/openaiHelper.ts");
  const translated = translate([
    { role: "user", content: [{ type: "text", text: "Read it" }, pdfDocument({ title: "a.pdf" })] },
  ]);
  const filtered = filterToOpenAIFormat(structuredClone(translated)) as { messages: Message[] };
  const file = userParts(filtered).find((p) => p.type === "file");
  assert.ok(file, "file part must survive filterToOpenAIFormat");
  assert.deepEqual(file.file, { file_data: PDF_DATA_URI, filename: "a.pdf" });
});
