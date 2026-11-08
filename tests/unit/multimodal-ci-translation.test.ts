import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const dataDir = mkdtempSync(join(tmpdir(), "omni-media-translation-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { geminiToOpenAIRequest } =
  await import("../../open-sse/translator/request/gemini-to-openai.ts");
const { convertOpenAIContentToParts } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");
const { writeCompatList } = await import("../../src/lib/db/models/compat.ts");
test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

const content = [
  { type: "image_url", image_url: { url: "data:image/png;base64,image" } },
  { type: "input_audio", input_audio: { data: "audio", format: "wav" } },
  { type: "video_url", video_url: { url: "https://example.com/movie.mp4?signed=keep" } },
  {
    type: "file",
    file: { filename: "report.pdf", file_data: "data:application/pdf;base64,JVBERfixture" },
  },
];

test("Chat and Responses conversions preserve CI image/audio/video/PDF carriers", () => {
  for (const provider of ["cheaperinference", "cinf"]) {
    const chat = translateRequest(
      FORMATS.OPENAI,
      FORMATS.OPENAI,
      "gemini-4-argon",
      { messages: [{ role: "user", content: structuredClone(content) }] },
      false,
      null,
      provider
    );
    assert.deepEqual(chat.messages[0].content, content);
    const input = content.map((p) =>
      p.type === "file"
        ? { type: "input_file", ...p.file }
        : p.type === "image_url"
          ? { type: "input_image", image_url: p.image_url!.url }
          : p
    );
    const response = translateRequest(
      FORMATS.OPENAI_RESPONSES,
      FORMATS.OPENAI,
      "gemini-4-argon",
      { input: [{ role: "user", content: input }] },
      false,
      null,
      provider
    );
    assert.deepEqual(response.messages[0].content, content);
  }
});
test("Gemini media retains its MIME semantics through OpenAI conversion", () => {
  const converted = geminiToOpenAIRequest(
    "gemini-4-argon",
    {
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: "image/png", data: "image" } },
            { inlineData: { mimeType: "audio/wav", data: "audio" } },
            {
              fileData: {
                mimeType: "video/mp4",
                fileUri: "https://example.com/movie.mp4?signed=keep",
              },
            },
            { inlineData: { mimeType: "application/pdf", data: "JVBERfixture" } },
          ],
        },
      ],
    },
    false
  );
  const actual = converted.messages[0].content as Array<{
    type: string;
    file?: { file_data: string };
  }>;
  assert.deepEqual(
    actual.map((p) => p.type),
    ["image_url", "input_audio", "video_url", "file"]
  );
  assert.equal(actual[3].file!.file_data, content[3].file!.file_data);
});
test("video URLs and embedded PDFs reach native Gemini as video and PDF, rather than disappearing", () => {
  const parts = convertOpenAIContentToParts(content.slice(2));
  assert.deepEqual(parts, [
    { fileData: { mimeType: "video/mp4", fileUri: "https://example.com/movie.mp4?signed=keep" } },
    { inlineData: { mimeType: "application/pdf", data: "JVBERfixture" } },
  ]);
});

test("CI translation fails explicitly if a compatibility override would discard an attachment", () => {
  writeCompatList("cheaperinference", [{ id: "gemini-4-argon", preserveVideoUrl: false }]);
  try {
    assert.throws(
      () =>
        translateRequest(
          FORMATS.OPENAI,
          FORMATS.OPENAI,
          "gemini-4-argon",
          { messages: [{ role: "user", content: structuredClone(content) }] },
          false,
          null,
          "cheaperinference"
        ),
      (error: unknown) =>
        error instanceof Error && "statusCode" in error && error.statusCode === 400
    );
  } finally {
    writeCompatList("cheaperinference", []);
  }
});

test("PDF URLs remain resolvable file parts across Chat, Responses and Anthropic inputs", () => {
  const url = "https://example.com/report.pdf?signature=unchanged";
  const requests = [
    {
      format: FORMATS.OPENAI,
      body: { messages: [{ role: "user", content: [{ type: "file_url", file_url: { url } }] }] },
    },
    {
      format: FORMATS.OPENAI_RESPONSES,
      body: {
        input: [
          {
            role: "user",
            content: [{ type: "input_file", filename: "report.pdf", file_url: url }],
          },
        ],
      },
    },
    {
      format: FORMATS.CLAUDE,
      body: {
        messages: [
          {
            role: "user",
            content: [{ type: "document", title: "Report", source: { type: "url", url } }],
          },
        ],
      },
    },
  ];
  for (const request of requests) {
    const result = translateRequest(
      request.format,
      FORMATS.OPENAI,
      "gemini-4-argon",
      request.body,
      false,
      null,
      "cheaperinference"
    );
    assert.equal(result.messages[0].content[0].type, "file");
    assert.equal(result.messages[0].content[0].file.file_data, url);
  }
});
