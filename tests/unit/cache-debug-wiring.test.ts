// @ts-nocheck
// The flag must reach the wire path: a real request through handleChatCore writes one tag-only
// record per upstream attempt when OMNIROUTE_CACHE_DEBUG is on, and nothing when it is off.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cache-debug-wire-"));
process.env.DATA_DIR = DATA_DIR;
const FLAG = "OMNIROUTE_CACHE_DEBUG";

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const originalFetch = globalThis.fetch;
const file = path.join(DATA_DIR, "cache-debug.jsonl");
const SECRET_TEXT = "a-very-distinctive-user-sentence";

function okResponse() {
  return new Response(
    JSON.stringify({
      id: "chatcmpl-1",
      object: "chat.completion",
      model: "gpt-4o-mini",
      choices: [{ index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 1, total_tokens: 4 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

async function send() {
  globalThis.fetch = async () => okResponse();
  try {
    return await handleChatCore({
      body: {
        model: "gpt-4o-mini",
        stream: false,
        messages: [
          { role: "system", content: "be brief" },
          { role: "user", content: SECRET_TEXT },
        ],
      },
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "test-key" },
      log: { debug() {}, info() {}, warn() {}, error() {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", body: {}, headers: new Headers() },
      connectionId: null,
      userAgent: "unit-test",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.afterEach(() => {
  delete process.env[FLAG];
  fs.rmSync(file, { force: true });
});
test.after(async () => {
  await (await import("../../src/lib/usage/callLogs.ts")).closeCallLogSaves(5000);
  core.resetDbInstance();
  fs.rmSync(DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("flag off: a request writes no cache-debug file", async () => {
  delete process.env[FLAG];
  const result = await send();
  assert.equal(result.success, true);
  assert.equal(fs.existsSync(file), false);
});

test("flag on: a request writes one tag-only record that names the route and shows no prompt text", async () => {
  process.env[FLAG] = "true";
  const result = await send();
  assert.equal(result.success, true);
  const lines = fs.readFileSync(file, "utf8").trim().split("\n");
  assert.equal(lines.length, 1);
  const record = JSON.parse(lines[0]);
  assert.equal(record.route, "openai/gpt-4o-mini");
  assert.ok(record.sections.messages.length >= 2, "the message blocks are tagged");
  assert.ok(record.wireSections.messages.length >= 2);
  assert.equal(lines[0].includes(SECRET_TEXT), false, "no prompt text in the record");
  assert.equal(lines[0].includes("be brief"), false);
});
