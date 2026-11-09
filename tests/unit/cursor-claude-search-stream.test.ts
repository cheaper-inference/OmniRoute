import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cursor-search-stream-"));
process.env.DATA_DIR = dataDir;
process.env.SERVER_OWNED_TOOL_LOOP_ENABLED = "true";
process.env.APP_LOG_LEVEL = "error";
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { CursorExecutor } = await import("../../open-sse/executors/cursor.ts");

const name = "omniroute_web_search";
const finalText = "Guido van Rossum. https://www.python.org/";
const log = { debug() {}, info() {}, warn() {}, error() {} };

test.after(async () => {
  const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
  await closeCallLogSaves();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Claude streaming search executes both Cursor legs and returns a final Messages stream", async (t) => {
  await createProviderConnection({
    provider: "brave-search",
    authType: "apikey",
    name: "test search",
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const calls: Record<string, unknown>[] = [];
  let searches = 0;
  t.mock.method(globalThis, "fetch", async (url: RequestInfo | URL) => {
    assert.match(String(url), /api\.search\.brave\.com/);
    searches++;
    return Response.json({
      web: {
        results: [
          {
            title: "Python history",
            url: "https://www.python.org/",
            description: "Created by Guido van Rossum.",
          },
        ],
      },
    });
  });
  t.mock.method(
    CursorExecutor.prototype,
    "execute",
    async ({ body, stream }: { body: Record<string, unknown>; stream: boolean }) => {
      assert.equal(
        stream,
        false,
        "server-owned search must run before replaying the client stream"
      );
      calls.push(structuredClone(body));
      const first = calls.length === 1;
      assert.ok(calls.length <= 2, "the search must finish without a repeated forced call");
      const response = Response.json({
        id: "chatcmpl-cursor-search-test",
        object: "chat.completion",
        model: "claude-opus-5-thinking-1m",
        choices: [
          {
            index: 0,
            finish_reason: first ? "tool_calls" : "stop",
            message: first
              ? {
                  role: "assistant",
                  content: null,
                  tool_calls: [
                    {
                      id: "call_search",
                      type: "function",
                      function: { name, arguments: '{"query":"who created Python"}' },
                    },
                  ],
                }
              : { role: "assistant", content: finalText },
          },
        ],
        usage: { prompt_tokens: 20, completion_tokens: 10, total_tokens: 30 },
      });
      return { response, url: "https://cursor.example.test", headers: {}, transformedBody: body };
    }
  );
  const body = {
    model: "cursor/claude-opus-5-thinking-1m",
    max_tokens: 1024,
    stream: true,
    messages: [{ role: "user", content: "Search who created Python, then answer with a source." }],
    tools: [{ type: "web_search_20250305", name: "web_search" }],
    tool_choice: { type: "tool", name: "web_search" },
    output_config: { effort: "high" },
  };
  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "cursor", model: "claude-opus-5-thinking-1m" },
    credentials: { accessToken: "test-token", providerSpecificData: {} },
    log,
    clientRawRequest: {
      endpoint: "/v1/messages",
      body: structuredClone(body),
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "unit-test",
  });
  assert.equal(result.success, true);
  assert.equal(calls.length, 2);
  assert.equal(searches, 1);
  assert.deepEqual(calls[0].tool_choice, { type: "function", function: { name } });
  assert.equal(calls[0].reasoning_effort, "high");
  assert.equal(calls[1].reasoning_effort, "high");
  assert.match(JSON.stringify(calls[1].messages), /Created by Guido van Rossum/);
  assert.equal(result.response.headers.get("content-type"), "text/event-stream");
  const sse = await result.response.text();
  assert.match(sse, /event: message_start/);
  assert.match(sse, /Guido van Rossum/);
  assert.match(sse, /"stop_reason":"end_turn"/);
  assert.match(sse, /event: message_stop/);
  assert.doesNotMatch(sse, /"name":"omniroute_web_search"/);
});
