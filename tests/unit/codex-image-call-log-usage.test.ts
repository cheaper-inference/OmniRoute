import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-image-usage-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function sseWithUsage(): string {
  const item = {
    type: "response.output_item.done",
    item: { type: "image_generation_call", result: "aGVsbG8=", revised_prompt: "a cat" },
  };
  const completed = {
    type: "response.completed",
    response: {
      id: "resp_test",
      object: "response",
      tool_usage: {
        image_gen: {
          input_tokens: 12,
          input_tokens_details: { image_tokens: 0, text_tokens: 12 },
          output_tokens: 1056,
          output_tokens_details: { image_tokens: 1056, text_tokens: 0 },
        },
      },
    },
  };
  return [
    `data: ${JSON.stringify(item)}`,
    `data: ${JSON.stringify(completed)}`,
    "data: [DONE]",
    "",
  ].join("\n\n");
}

test("codex image: usage is written to the call log only, never to the returned data.usage", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(sseWithUsage(), { status: 200, headers: { "Content-Type": "text/event-stream" } });

  try {
    const result = (await handleImageGeneration({
      body: { model: "gpt-6.1-sol", prompt: "a cat", n: 1 },
      credentials: { accessToken: "oauth-token" },
      log: null,
      resolvedProvider: "codex",
    })) as { success: boolean; data?: { usage?: unknown } };

    assert.equal(result.success, true, "the image call must succeed");
    assert.equal(result.data?.usage, undefined, "data.usage must stay unset (budget guard)");

    // The call-log save is async; wait for it, then read the newest row's detail (the list omits the body).
    assert.equal(await callLogs.waitForCallLogSaves(5_000), true, "the call-log save must finish");
    const listed = (await callLogs.getCallLogs({ limit: 5 })) as Array<{ id: string }>;
    assert.ok(listed.length > 0, "a call-log row must be written");
    const detail = (await callLogs.getCallLogById(listed[0].id)) as {
      responseBody?: { usage?: { output_tokens?: number } };
    } | null;
    assert.equal(
      detail?.responseBody?.usage?.output_tokens,
      1056,
      "the image token usage must be in the call log"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
