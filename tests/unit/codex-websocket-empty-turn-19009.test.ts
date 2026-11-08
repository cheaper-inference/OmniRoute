import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  hasTrustedEmptyTurn,
  markEmptyTurnExecution,
} from "../../open-sse/utils/emptyTurnPolicy.ts";

// #19009: a Codex connection on the Responses-over-WebSocket transport
// (codexTransport=websocket) reports the executed URL as the wss twin of the
// registry endpoint. A normal empty turn there must be trusted like the HTTP one.

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-ws-empty-19009-"));
const savedDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;
const originalFetch = globalThis.fetch;

const completedEmpty = `event: response.completed\ndata: ${JSON.stringify({
  type: "response.completed",
  response: { id: "resp_ws", status: "completed", output: [], usage: { output_tokens: 4 } },
})}\n\n`;
const credentials = { connectionId: "fixture-connection", accessToken: "synthetic-token" };

async function trusted(url: string): Promise<boolean> {
  const response = markEmptyTurnExecution(
    new Response(completedEmpty, { headers: { "content-type": "text/event-stream" } }),
    url,
    credentials
  );
  await response.text();
  return hasTrustedEmptyTurn(response);
}

test("#19009 the Codex WebSocket endpoint establishes a normal empty stop", async () => {
  assert.equal(await trusted("wss://chatgpt.com/backend-api/codex/responses"), true);
});

test("#19009 other WebSocket origins and paths keep the empty-content guard", async () => {
  for (const url of [
    "wss://chatgpt.com.attacker.invalid/backend-api/codex/responses",
    "wss://chatgpt.com/backend-api/codex/responses/compact",
    "ws://chatgpt.com/backend-api/codex/responses",
    "wss://user:pass@chatgpt.com/backend-api/codex/responses",
    "wss://api.openai.com/v1/responses",
  ]) {
    assert.equal(await trusted(url), false, url);
  }
});

await test.describe("#19009 chat completions over the Codex WebSocket transport", async () => {
  const core = await import("../../src/lib/db/core.ts");
  const providers = await import("../../src/lib/db/providers.ts");
  const route = await import("../../src/app/api/v1/chat/completions/route.ts");
  const { __setCodexWebSocketTransportForTesting } =
    await import("../../open-sse/executors/codex.ts");
  const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");

  await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "codex-ws-empty-19009",
    accessToken: "synthetic-codex-token",
    refreshToken: "synthetic-refresh",
    expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
    providerSpecificData: { accountId: "synthetic-account", codexTransport: "websocket" },
    isActive: true,
    testStatus: "active",
  });

  test.after(async () => {
    __setCodexWebSocketTransportForTesting(null);
    await waitForCallLogSaves(10_000);
    core.resetDbInstance();
    globalThis.fetch = originalFetch;
    if (savedDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = savedDataDir;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  async function stream(events: Record<string, unknown>[]) {
    globalThis.fetch = async (input) => {
      if (String(input).includes("/__omniroute_event")) return new Response(null, { status: 204 });
      throw new Error(`unexpected HTTP request to ${String(input)}`);
    };
    let sends = 0;
    const ws = {
      send() {
        sends++;
        queueMicrotask(() => {
          for (const event of events) ws.onmessage?.({ data: JSON.stringify(event) });
          ws.onclose?.();
        });
      },
      close() {},
      onmessage: null as ((event: { data: unknown }) => void) | null,
      onerror: null,
      onclose: null as (() => void) | null,
    };
    __setCodexWebSocketTransportForTesting(async () => ws);
    const response = await route.POST(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", "x-omniroute-no-cache": "true" },
        body: JSON.stringify({
          model: "cx/gpt-6.1-sol",
          stream: true,
          messages: [
            { role: "user", content: "finish the task" },
            {
              role: "assistant",
              content: null,
              tool_calls: [
                { id: "call_1", type: "function", function: { name: "finish", arguments: "{}" } },
              ],
            },
            { role: "tool", tool_call_id: "call_1", content: "done" },
          ],
          tools: [
            {
              type: "function",
              function: { name: "finish", parameters: { type: "object", properties: {} } },
            },
          ],
        }),
      })
    );
    return { response, text: await response.text(), sends };
  }

  const created = { type: "response.created", response: { id: "resp_ws", status: "in_progress" } };

  test("an empty turn after a tool result ends as a clean stop", async () => {
    const { response, text, sends } = await stream([
      created,
      {
        type: "response.completed",
        response: { id: "resp_ws", status: "completed", output: [], usage: { output_tokens: 4 } },
      },
    ]);
    assert.equal(response.status, 200, text);
    assert.match(text, /"finish_reason":"stop"/);
    assert.doesNotMatch(text, /"error"/);
    assert.equal(sends, 1, "a valid empty turn must not be generated again");
  });

  test("a socket closed before any terminal still fails", async () => {
    const { response, text } = await stream([created]);
    assert.ok(response.status >= 400 || text.includes('"error"'), text);
  });
});
