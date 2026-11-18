// One pasted screenshot (a base64 data URL in the request) is larger than the 512 KiB
// call log artifact cap. The size ladder then replaced the WHOLE stored requestBody with an
// omission marker, so the request text was lost with the image. The stored request copy now
// carries a short size marker in place of each inline image and keeps the text.
// The pipeline copy is NOT redacted: the Responses continuation store rebuilds
// previous_response_id history from it, and a marker there would be replayed upstream.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-images-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { redactInlineImageDataUrls } = await import("../../src/lib/logPayloads.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// 800,000 base64 chars = 600,000 bytes, above the 512 KiB artifact cap.
const BIG_BASE64 = "A".repeat(800_000);
const BIG_MARKER = "[inline image: image/png, 600000 bytes, 800000 base64 chars]";

function logEntry(id: string, requestBody: unknown, pipelinePayloads?: unknown) {
  return {
    id,
    timestamp: "2026-03-30T12:34:56.789Z",
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "openai/gpt-4.1",
    provider: "openai",
    duration: 1,
    requestBody,
    responseBody: { id: "resp_1", choices: [{ message: { content: "ok" } }] },
    ...(pipelinePayloads ? { pipelinePayloads } : {}),
  };
}

test("a large inline screenshot no longer erases the request text from the call log", async () => {
  const requestBody = {
    model: "gpt-4.1",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "what is in this screenshot?" },
          { type: "image_url", image_url: { url: `data:image/png;base64,${BIG_BASE64}` } },
        ],
      },
    ],
  };

  await callLogs.saveCallLog(logEntry("img_big", requestBody));
  const detail = await callLogs.getCallLogById("img_big");

  const content = (detail?.requestBody as typeof requestBody).messages[0].content;
  assert.equal(content[0].text, "what is in this screenshot?");
  assert.equal((content[1] as { image_url: { url: string } }).image_url.url, BIG_MARKER);
});

test("the pipeline copy keeps the image, so a continued Responses turn can replay it", async () => {
  const imageUrl = `data:image/png;base64,${"B".repeat(64)}`;
  const raw = { effectiveInput: [{ type: "input_image", image_url: imageUrl }] };

  await callLogs.saveCallLog(
    logEntry(
      "img_pipeline",
      { input: [{ type: "input_image", image_url: imageUrl }] },
      {
        clientRawRequest: raw,
      }
    )
  );
  const detail = await callLogs.getCallLogById("img_pipeline");

  const stored = detail?.pipelinePayloads?.clientRawRequest as typeof raw;
  assert.equal(stored.effectiveInput[0].image_url, imageUrl);
  const body = detail?.requestBody as { input: Array<{ image_url: string }> };
  assert.match(
    body.input[0].image_url,
    /^\[inline image: image\/png, 48 bytes, 64 base64 chars\]$/
  );
});

test("redactInlineImageDataUrls handles OpenAI, Anthropic and Google image shapes", () => {
  const out = redactInlineImageDataUrls({
    a: { type: "input_image", image_url: "data:image/jpeg;base64,QUJD" },
    b: { type: "image", source: { type: "base64", media_type: "image/webp", data: "QUJDRA==" } },
    c: { inlineData: { mimeType: "image/png", data: "QUJDRA==" } },
    d: { inline_data: { mime_type: "image/gif", data: "QUJD" } },
  }) as {
    a: { image_url: string };
    b: { source: { data: string; media_type: string } };
    c: { inlineData: { data: string } };
    d: { inline_data: { data: string } };
  };

  assert.equal(out.a.image_url, "[inline image: image/jpeg, 3 bytes, 4 base64 chars]");
  assert.equal(out.b.source.data, "[inline image: image/webp, 4 bytes, 8 base64 chars]");
  assert.equal(out.b.source.media_type, "image/webp");
  assert.equal(out.c.inlineData.data, "[inline image: image/png, 4 bytes, 8 base64 chars]");
  assert.equal(out.d.inline_data.data, "[inline image: image/gif, 3 bytes, 4 base64 chars]");
});

test("redactInlineImageDataUrls leaves everything else alone and keeps identity", () => {
  const text = { role: "user", content: "see data:image/png;base64,QUJD inside prose" };
  const remote = { type: "image_url", image_url: { url: "https://example.com/a.png" } };
  const pdf = {
    type: "document",
    source: { type: "base64", media_type: "application/pdf", data: "QUJD" },
  };
  const input = { messages: [text, remote, pdf], n: 3, nothing: null };

  const out = redactInlineImageDataUrls(input) as typeof input;

  assert.equal(out, input, "no image found: the same object comes back");
  assert.equal(redactInlineImageDataUrls("plain"), "plain");
  assert.equal(redactInlineImageDataUrls(null), null);
});

test("redactInlineImageDataUrls never mutates its input and shares unchanged subtrees", () => {
  const untouched = { role: "system", content: "be brief" };
  const input = {
    messages: [untouched, { image_url: "data:image/png;base64,QUJD" }],
  };
  const before = JSON.stringify(input);

  const out = redactInlineImageDataUrls(input) as typeof input;

  assert.equal(JSON.stringify(input), before);
  assert.notEqual(out, input);
  assert.equal(out.messages[0], untouched, "an unchanged subtree keeps its identity");
});
