/**
 * Regression tests for #21015:
 *   1. Data URLs (>=4 MiB base64) in the request-translation and chat-log paths must be
 *      parsed with bounded header slicing (`startsWith`/`indexOf`/`slice`), never with a
 *      RegExp executed over the full payload.
 *   2. `buildRequestTranslationErrorResult` must log a bounded, redacted stack trace for
 *      `RangeError` failures while keeping the client HTTP error response stack-free.
 */
import assert from "node:assert/strict";
import test from "node:test";

import { urlToClaudeImageBlock } from "../../open-sse/translator/request/openai-to-claude/imageBlocks.ts";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";
import { convertOpenAiMediaBlock } from "../../open-sse/services/ccOpenAiMediaBlocks.ts";
import { openaiToOpenAIResponsesRequest } from "../../open-sse/translator/request/openai-responses/toResponses.ts";
import { videoPartToGemini } from "../../open-sse/translator/helpers/mediaContentParts.ts";
import { collapseOversizedDataUrlForLog } from "../../open-sse/handlers/chatCore/logTruncation.ts";
import { buildRequestTranslationErrorResult } from "../../open-sse/handlers/chatCore/requestTranslationError.ts";

// 4.5 MiB base64 payload — above the ~4 MiB (4,194,304-char) V8 RegExpMatchFast threshold in #21015.
const BIG_BASE64_LEN = 4_718_592;
const BIG_BASE64 = "A".repeat(BIG_BASE64_LEN);
const BIG_IMAGE_DATA_URL = `data:image/png;base64,${BIG_BASE64}`;
const BIG_PDF_DATA_URL = `data:application/pdf;base64,${BIG_BASE64}`;
const BIG_VIDEO_DATA_URL = `data:video/mp4;base64,${BIG_BASE64}`;

/**
 * Guard helper: fails immediately if any RegExp execution (`String.prototype.match`,
 * `RegExp.prototype.exec`, or `RegExp.prototype.test`) is invoked on a large `data:` string.
 */
function withNoLargeDataUrlRegex<T>(fn: () => T): T {
  const origMatch = String.prototype.match;
  const origExec = RegExp.prototype.exec;
  const origTest = RegExp.prototype.test;

  const rejectIfLargeDataUrl = (input: unknown, op: string, pattern: unknown) => {
    if (typeof input === "string" && input.length >= 1024 && input.startsWith("data:")) {
      throw new Error(
        `Unexpected ${op} over ${input.length}-char data URL using ${String(pattern)}`
      );
    }
  };

  String.prototype.match = function (this: string, matcher: unknown) {
    rejectIfLargeDataUrl(this, "String.prototype.match", matcher);
    return origMatch.call(this, matcher as RegExp);
  } as typeof String.prototype.match;

  RegExp.prototype.exec = function (this: RegExp, str: string) {
    rejectIfLargeDataUrl(str, "RegExp.prototype.exec", this);
    return origExec.call(this, str);
  };

  RegExp.prototype.test = function (this: RegExp, str: string) {
    rejectIfLargeDataUrl(str, "RegExp.prototype.test", this);
    return origTest.call(this, str);
  };

  try {
    return fn();
  } finally {
    String.prototype.match = origMatch;
    RegExp.prototype.exec = origExec;
    RegExp.prototype.test = origTest;
  }
}

test("#21015 >4 MiB image and file data URLs translate across OpenAI->Claude without regex over the payload", () => {
  const translated = withNoLargeDataUrlRegex(() => {
    const imgBlock = urlToClaudeImageBlock(BIG_IMAGE_DATA_URL);
    assert.ok(imgBlock && imgBlock.source.type === "base64");
    assert.equal(imgBlock.source.media_type, "image/png");
    assert.equal(imgBlock.source.data.length, BIG_BASE64_LEN);

    return openaiToClaudeRequest(
      "claude-sonnet-4-5",
      {
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "analyze both" },
              { type: "image_url", image_url: { url: BIG_IMAGE_DATA_URL } },
              { type: "file", file: { filename: "large.pdf", file_data: BIG_PDF_DATA_URL } },
            ],
          },
        ],
      },
      false
    ) as {
      messages: Array<{
        content: Array<{
          type?: string;
          title?: string;
          source?: { type?: string; media_type?: string; data?: string };
        }>;
      }>;
    };
  });

  const blocks = translated.messages[0].content;
  const img = blocks.find((b) => b.type === "image");
  const doc = blocks.find((b) => b.type === "document");
  assert.equal(img?.source?.type, "base64");
  assert.equal(img?.source?.media_type, "image/png");
  assert.equal(img?.source?.data?.length, BIG_BASE64_LEN);
  assert.equal(doc?.title, "large.pdf");
  assert.equal(doc?.source?.media_type, "application/pdf");
  assert.equal(doc?.source?.data?.length, BIG_BASE64_LEN);
});

test("#21015 >4 MiB data URLs translate in ccOpenAiMediaBlocks, Responses, videoPartToGemini, and logTruncation without full-payload regex", () => {
  withNoLargeDataUrlRegex(() => {
    const ccImage = convertOpenAiMediaBlock({
      type: "image_url",
      image_url: { url: BIG_IMAGE_DATA_URL },
    }) as { type?: string; source?: { type?: string; media_type?: string; data?: string } } | null;
    assert.equal(ccImage?.type, "image");
    assert.equal(ccImage?.source?.media_type, "image/png");
    assert.equal(ccImage?.source?.data?.length, BIG_BASE64_LEN);

    const ccDoc = convertOpenAiMediaBlock({
      type: "file",
      file: { filename: "report.pdf", file_data: BIG_PDF_DATA_URL },
    }) as { type?: string; title?: string; source?: { media_type?: string; data?: string } } | null;
    assert.equal(ccDoc?.type, "document");
    assert.equal(ccDoc?.title, "report.pdf");
    assert.equal(ccDoc?.source?.data?.length, BIG_BASE64_LEN);

    const responsesBody = openaiToOpenAIResponsesRequest(
      "gpt-5",
      {
        messages: [
          {
            role: "user",
            content: [{ type: "image", image: BIG_IMAGE_DATA_URL }],
          },
        ],
      },
      false
    ) as { input?: Array<{ content?: Array<{ type?: string; image_url?: string }> }> };
    const inputImg = responsesBody.input?.[0]?.content?.[0];
    assert.equal(inputImg?.type, "input_image");
    assert.equal(inputImg?.image_url?.length, BIG_IMAGE_DATA_URL.length);

    const geminiVideo = videoPartToGemini({
      type: "video_url",
      video_url: { url: BIG_VIDEO_DATA_URL },
    }) as { inlineData?: { mimeType?: string; data?: string } } | null;
    assert.equal(geminiVideo?.inlineData?.mimeType, "video/mp4");
    assert.equal(geminiVideo?.inlineData?.data?.length, BIG_BASE64_LEN);

    const collapsed = collapseOversizedDataUrlForLog(BIG_IMAGE_DATA_URL) as Record<string, unknown>;
    assert.equal(collapsed._omniroute_image_ref, true);
    assert.equal(collapsed.mime, "image/png");
    assert.equal(collapsed.base64Bytes, BIG_BASE64_LEN);
  });
});

test("#21015 MIME-wrapped newlines in ccOpenAiMediaBlocks and bounded header guards behave safely", () => {
  const wrapped = convertOpenAiMediaBlock({
    type: "image_url",
    image_url: { url: "data:image/png;base64,AAAA\nBBBB\r\nCCCC" },
  }) as { type?: string; source?: { type?: string; media_type?: string; data?: string } } | null;
  assert.deepEqual(wrapped, {
    type: "image",
    source: { type: "base64", media_type: "image/png", data: "AAAABBBBCCCC" },
  });

  // Oversized header (>256 chars before `;base64,`) must be rejected without scanning the body.
  const hugeHeaderUrl = `data:image/${"x".repeat(300)};base64,AAAA`;
  assert.deepEqual(urlToClaudeImageBlock(hugeHeaderUrl), {
    type: "image",
    source: { type: "url", url: hugeHeaderUrl },
  });

  // Non-base64 data URL whose payload happens to contain `;base64,` must not be misparsed.
  const nonBase64 = "data:text/plain,hello;base64,world";
  assert.deepEqual(urlToClaudeImageBlock(nonBase64), {
    type: "image",
    source: { type: "url", url: nonBase64 },
  });
});

test("#21015 buildRequestTranslationErrorResult logs a bounded redacted stack for RangeError without leaking it to the client", async () => {
  const err = new RangeError("Maximum call stack size exceeded");
  const deepFrames = Array.from(
    { length: 30 },
    (_, i) => `    at frame${i} (/srv/omniroute/open-sse/translator/step${i}.ts:${10 + i}:5)`
  );
  err.stack = [
    "RangeError: Maximum call stack size exceeded (Bearer sk-secret-token-1234567890)",
    ...deepFrames,
  ].join("\n");

  const warnings: Array<[string, string]> = [];
  const result = await buildRequestTranslationErrorResult({
    error: err,
    traceId: "trace-21015",
    body: {},
    model: "claude-sonnet-4-5",
    provider: "claude",
    apiKeyInfo: null,
    log: {
      warn: (tag: unknown, msg: unknown) => {
        warnings.push([String(tag), String(msg)]);
      },
    },
  });

  assert.equal(result.status, 500);
  const clientBody = await result.response.text();
  assert.ok(!clientBody.includes("frame0"), "client response must never leak stack frames");
  assert.ok(!clientBody.includes("sk-secret-token"), "client response must not leak secrets");

  const translateWarn = warnings.find(([tag]) => tag === "TRANSLATE")?.[1] ?? "";
  assert.ok(translateWarn.includes("frame0"), "RangeError server log must include top stack frame");
  assert.ok(
    !translateWarn.includes("frame29"),
    "RangeError server log stack must be truncated rather than dumping unbounded frames"
  );
  assert.ok(
    !translateWarn.includes("sk-secret-token-1234567890"),
    "RangeError server log stack must redact credential tokens"
  );
});

test("#21015 buildRequestTranslationErrorResult keeps non-RangeError logs concise and survives hostile stack getters", async () => {
  const plainWarnings: string[] = [];
  const plainErr = new Error("Unsupported field");
  plainErr.stack = "Error: Unsupported field\n    at secretFrame (/app/internal.ts:1:1)";
  await buildRequestTranslationErrorResult({
    error: plainErr,
    traceId: "trace-plain",
    body: {},
    model: "claude-sonnet-4-5",
    provider: "claude",
    apiKeyInfo: null,
    log: { warn: (_tag: unknown, msg: unknown) => plainWarnings.push(String(msg)) },
  });
  assert.equal(plainWarnings.length, 1);
  assert.ok(!plainWarnings[0].includes("secretFrame"));

  const hostile = new RangeError("Boom");
  Object.defineProperty(hostile, "stack", {
    get() {
      throw new Error("hostile getter");
    },
  });
  const hostileWarnings: string[] = [];
  const res = await buildRequestTranslationErrorResult({
    error: hostile,
    traceId: "trace-hostile",
    body: {},
    model: "claude-sonnet-4-5",
    provider: "claude",
    apiKeyInfo: null,
    log: { warn: (_tag: unknown, msg: unknown) => hostileWarnings.push(String(msg)) },
  });
  assert.equal(res.status, 500);
  assert.equal(hostileWarnings.length, 1);
});
